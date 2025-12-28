import { z } from 'zod';

// Contact form schema
export const insertContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
