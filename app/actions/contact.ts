'use server';

import { insertContactSchema, type InsertContact } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

// In-memory storage for contact submissions (for development)
// For production, replace with actual database
const contactSubmissions: (InsertContact & { id: string; createdAt: Date })[] = [];

/**
 * Submit a contact form message
 */
export async function submitContact(data: unknown) {
  try {
    // Validate input with Zod
    const validated = insertContactSchema.parse(data);

    // Store in database or in-memory (development only)
    const submission = {
      ...validated,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    contactSubmissions.push(submission);

    // Log the submission (replace with database call in production)
    console.log('[Contact] New submission:', submission);

    // Revalidate the page to show any success state if needed
    revalidatePath('/');

    return {
      success: true,
      message: 'Thank you for contacting us. We will get back to you shortly.',
    };
  } catch (error) {
    console.error('[Contact Error]', error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || 'Failed to submit contact form',
      };
    }

    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}

/**
 * Get all contact submissions (admin only - development only)
 */
export async function getContactSubmissions() {
  return contactSubmissions;
}

/**
 * Clear contact submissions (development only)
 */
export async function clearContactSubmissions() {
  contactSubmissions.length = 0;
  return { success: true };
}
