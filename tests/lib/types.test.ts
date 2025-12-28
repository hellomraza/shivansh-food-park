import { GooglePlacesResponseSchema, PlaceDetailsSchema } from '@/lib/types';

describe('Zod Schemas', () => {
  describe('PlaceDetailsSchema', () => {
    const validPlaceData = {
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
          html_attributions: ['<a href="">Photo Credit</a>'],
          photo_reference: 'ref123',
        },
      ],
      reviews: [
        {
          author_name: 'John Doe',
          author_url: 'https://maps.google.com/contrib/123',
          rating: 4,
          relative_time_description: '3 months ago',
          text: 'Great food!',
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
      types: ['restaurant', 'food'],
    };

    it('should validate correct place details', () => {
      const result = PlaceDetailsSchema.safeParse(validPlaceData);
      expect(result.success).toBe(true);
    });

    it('should fail with invalid rating', () => {
      const invalid = { ...validPlaceData, rating: 6 };
      const result = PlaceDetailsSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should fail with missing required fields', () => {
      const invalid = { ...validPlaceData, name: undefined };
      const result = PlaceDetailsSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should allow optional fields', () => {
      const withoutOptional = { ...validPlaceData, dine_in: undefined, takeout: undefined };
      const result = PlaceDetailsSchema.safeParse(withoutOptional);
      expect(result.success).toBe(true);
    });
  });

  describe('GooglePlacesResponseSchema', () => {
    const validResponse = {
      status: 'OK',
      result: {
        name: 'Shivansh Food Park',
        formatted_address: 'Dhamtari, India',
        formatted_phone_number: '+91 98270 48957',
        international_phone_number: '+91 98270 48957',
        rating: 3.5,
        user_ratings_total: 21,
        photos: [],
        reviews: [],
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
      html_attributions: [],
    };

    it('should validate correct API response', () => {
      const result = GooglePlacesResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
    });

    it('should fail with invalid status', () => {
      const invalid = { ...validResponse, status: 'INVALID' };
      const result = GooglePlacesResponseSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should validate ZERO_RESULTS status', () => {
      const response = { ...validResponse, status: 'ZERO_RESULTS' };
      const result = GooglePlacesResponseSchema.safeParse(response);
      expect(result.success).toBe(true);
    });
  });
});
