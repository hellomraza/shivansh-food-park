import {
    formatAddress,
    formatOpeningHours,
    formatPhoneNumber,
    getDirectionsUrl,
    getPhoneUrl,
    getRelativeTime,
    getStarRating,
    getWhatsAppUrl,
    isOpen,
} from '@/lib/formatters';

describe('formatters', () => {
  describe('formatOpeningHours', () => {
    it('should return "Open 24 hours" if found in weekday text', () => {
      const result = formatOpeningHours(['Open 24 hours']);
      expect(result).toBe('Open 24 hours');
    });

    it('should return current day hours', () => {
      const hours = [
        'Monday: 10:00 AM – 10:00 PM',
        'Tuesday: 10:00 AM – 10:00 PM',
        'Wednesday: 10:00 AM – 10:00 PM',
        'Thursday: 10:00 AM – 10:00 PM',
        'Friday: 10:00 AM – 10:00 PM',
        'Saturday: 10:00 AM – 10:00 PM',
        'Sunday: 10:00 AM – 10:00 PM',
      ];
      const result = formatOpeningHours(hours);
      expect(result).toBeDefined();
      expect(result).toContain(':');
    });

    it('should return "Check hours" if weekday text is empty', () => {
      const result = formatOpeningHours([]);
      expect(result).toBe('Check hours');
    });
  });

  describe('formatPhoneNumber', () => {
    it('should trim phone number', () => {
      const result = formatPhoneNumber('  +91 9876543210  ');
      expect(result).toBe('+91 9876543210');
    });

    it('should return clean phone number', () => {
      const result = formatPhoneNumber('+91 98270 48957');
      expect(result).toBe('+91 98270 48957');
    });
  });

  describe('formatAddress', () => {
    it('should trim address', () => {
      const result = formatAddress('  123 Main St  ');
      expect(result).toBe('123 Main St');
    });

    it('should return clean address', () => {
      const address = 'Dhamtari, Chhattisgarh 493773, India';
      const result = formatAddress(address);
      expect(result).toBe(address);
    });
  });

  describe('getStarRating', () => {
    it('should return array of 5 elements for rating 4', () => {
      const result = getStarRating(4);
      expect(result.length).toBe(5);
      expect(result[0]).toBe(1);
      expect(result[3]).toBe(1);
      expect(result[4]).toBe(0);
    });

    it('should handle half stars', () => {
      const result = getStarRating(3.5);
      expect(result.length).toBe(5);
      expect(result[3]).toBe(0.5);
    });

    it('should handle zero rating', () => {
      const result = getStarRating(0);
      expect(result.every((r) => r === 0)).toBe(true);
    });

    it('should handle full 5 stars', () => {
      const result = getStarRating(5);
      expect(result.every((r) => r === 1)).toBe(true);
    });
  });

  describe('getRelativeTime', () => {
    it('should return "just now" for recent timestamps', () => {
      const now = Math.floor(Date.now() / 1000);
      const result = getRelativeTime(now);
      expect(result).toBe('just now');
    });

    it('should return minutes ago', () => {
      const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 5 * 60;
      const result = getRelativeTime(fiveMinutesAgo);
      expect(result).toContain('minutes ago');
    });

    it('should return hours ago', () => {
      const twoHoursAgo = Math.floor(Date.now() / 1000) - 2 * 3600;
      const result = getRelativeTime(twoHoursAgo);
      expect(result).toContain('hours ago');
    });

    it('should return days ago', () => {
      const threeDaysAgo = Math.floor(Date.now() / 1000) - 3 * 86400;
      const result = getRelativeTime(threeDaysAgo);
      expect(result).toContain('days ago');
    });

    it('should return months ago', () => {
      const twoMonthsAgo = Math.floor(Date.now() / 1000) - 60 * 86400;
      const result = getRelativeTime(twoMonthsAgo);
      expect(result).toContain('months ago');
    });
  });

  describe('isOpen', () => {
    it('should return true when open_now is true', () => {
      expect(isOpen(true)).toBe(true);
    });

    it('should return false when open_now is false', () => {
      expect(isOpen(false)).toBe(false);
    });
  });

  describe('getDirectionsUrl', () => {
    it('should generate valid Google Maps directions URL', () => {
      const url = getDirectionsUrl(20.7144585, 81.5326135);
      expect(url).toBe('https://www.google.com/maps/dir/?api=1&destination=20.7144585,81.5326135');
    });
  });

  describe('getWhatsAppUrl', () => {
    it('should generate valid WhatsApp URL with international number', () => {
      const url = getWhatsAppUrl('+91 98270 48957');
      expect(url).toBe('https://wa.me/919827048957');
    });

    it('should handle numbers with special characters', () => {
      const url = getWhatsAppUrl('+91 (9827) 0-48957');
      expect(url).toBe('https://wa.me/919827048957');
    });
  });

  describe('getPhoneUrl', () => {
    it('should generate valid tel: URL', () => {
      const url = getPhoneUrl('+91 98270 48957');
      expect(url).toBe('tel:+919827048957');
    });

    it('should handle formatted phone numbers', () => {
      const url = getPhoneUrl('(+91) 98270-48957');
      expect(url).toBe('tel:+919827048957');
    });
  });
});
