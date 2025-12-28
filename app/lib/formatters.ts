/**
 * Utility functions for formatting restaurant data
 */

/**
 * Format opening hours for display
 */
export function formatOpeningHours(weekdayText: string[]): string {
  if (weekdayText.includes('Open 24 hours')) {
    return 'Open 24 hours';
  }
  return weekdayText[new Date().getDay()] || 'Check hours';
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  return phone.trim();
}

/**
 * Format address for display
 */
export function formatAddress(address: string): string {
  return address.trim();
}

/**
 * Get stars array for rating display (1-5)
 */
export function getStarRating(rating: number): number[] {
  return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? 1 : i < rating ? 0.5 : 0);
}

/**
 * Format time as relative (e.g., "2 months ago")
 */
export function getRelativeTime(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  
  const seconds = diff;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = months / 12;

  if (years > 1) return `${Math.floor(years)} years ago`;
  if (months > 1) return `${Math.floor(months)} months ago`;
  if (days > 1) return `${Math.floor(days)} days ago`;
  if (hours > 1) return `${Math.floor(hours)} hours ago`;
  if (minutes > 1) return `${Math.floor(minutes)} minutes ago`;
  return 'just now';
}

/**
 * Check if restaurant is currently open
 */
export function isOpen(openNow: boolean): boolean {
  return openNow;
}

/**
 * Generate Google Maps URL for directions
 */
export function getDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

/**
 * Generate WhatsApp message URL
 */
export function getWhatsAppUrl(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleaned}`;
}

/**
 * Generate phone call URL
 */
export function getPhoneUrl(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');
  return `tel:+${cleaned}`;
}
