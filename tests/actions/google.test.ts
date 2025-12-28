import { clearCache, getPhotoUrl, getRestaurantDetails } from '@/actions/google';

// Mock fetch
global.fetch = jest.fn();

describe('Google Maps Server Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearCache();
  });

  describe('getRestaurantDetails', () => {
    const mockApiResponse = {
      result: {
        name: 'Shivansh Food Park',
        formatted_address: 'Dhamtari, India',
        formatted_phone_number: '+91 98270 48957',
        international_phone_number: '+91 98270 48957',
        rating: 3.5,
        user_ratings_total: 21,
        photos: [
          {
            height: 2296,
            width: 4080,
            html_attributions: [],
            photo_reference: 'ref123',
          },
        ],
        reviews: [
          {
            author_name: 'John Doe',
            author_url: 'https://maps.google.com/contrib/123',
            rating: 5,
            relative_time_description: 'a month ago',
            text: 'Great!',
            profile_photo_url: 'https://example.com/photo.jpg',
            time: 1756989690,
          },
        ],
        geometry: {
          location: {
            lat: 20.7144585,
            lng: 81.5326135,
          },
        },
        url: 'https://maps.google.com/?cid=123',
        business_status: 'OPERATIONAL',
        types: ['restaurant'],
      },
      status: 'OK',
      html_attributions: [],
    };

    it('should fetch and validate restaurant details', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      const result = await getRestaurantDetails();

      expect(result.name).toBe('Shivansh Food Park');
      expect(result.rating).toBe(3.5);
      expect(result.user_ratings_total).toBe(21);
    });

    it('should return cached data on second call', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      // First call
      const result1 = await getRestaurantDetails();

      // Second call should use cache
      const result2 = await getRestaurantDetails();

      expect(result1).toEqual(result2);
      expect(global.fetch).toHaveBeenCalledTimes(1); // Only called once due to caching
    });

    it('should throw error on invalid API response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Unauthorized',
      });

      await expect(getRestaurantDetails()).rejects.toThrow();
    });

    it('should throw error on invalid status', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: 'ZERO_RESULTS',
          result: {},
        }),
      });

      await expect(getRestaurantDetails()).rejects.toThrow();
    });

    it('should include required fields in API request', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      await getRestaurantDetails();

      const callUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(callUrl).toContain('place/details');
      expect(callUrl).toContain('json');
      expect(callUrl).toContain('name');
      expect(callUrl).toContain('photos');
      expect(callUrl).toContain('reviews');
    });
  });

  describe('getPhotoUrl', () => {
    it('should generate correct photo URL', () => {
      const url = getPhotoUrl('ref123', 800);
      expect(url).toContain('maps.googleapis.com');
      expect(url).toContain('place/photo');
      expect(url).toContain('ref123');
      expect(url).toContain('800');
    });

    it('should use default width of 800', () => {
      const url = getPhotoUrl('ref123');
      expect(url).toContain('800');
    });

    it('should accept custom width', () => {
      const url = getPhotoUrl('ref123', 1200);
      expect(url).toContain('1200');
    });

    it('should include API key', () => {
      const url = getPhotoUrl('ref123');
      expect(url).toContain('key=');
    });
  });

  describe('clearCache', () => {
    it('should clear cached data', async () => {
      const mockApiResponse = {
        result: {
          name: 'Test',
          formatted_address: 'Test',
          formatted_phone_number: '+91 98270 48957',
          international_phone_number: '+91 98270 48957',
          rating: 3.5,
          user_ratings_total: 21,
          photos: [],
          reviews: [],
          geometry: {
            location: { lat: 0, lng: 0 },
          },
          url: 'https://example.com',
          business_status: 'OPERATIONAL',
          types: [],
        },
        status: 'OK',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      // Fetch once
      await getRestaurantDetails();
      expect(global.fetch).toHaveBeenCalledTimes(1);

      // Clear cache
      clearCache();

      // Mock another fetch
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      // Fetch again - should call API again
      await getRestaurantDetails();
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
