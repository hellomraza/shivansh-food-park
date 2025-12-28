import { z } from 'zod';

// Google Maps API Types
export const PhotoSchema = z.object({
  height: z.number(),
  width: z.number(),
  html_attributions: z.array(z.string()),
  photo_reference: z.string(),
});

export const ReviewSchema = z.object({
  author_name: z.string(),
  author_url: z.string().url(),
  rating: z.number().min(1).max(5),
  relative_time_description: z.string(),
  text: z.string(),
  profile_photo_url: z.string().url(),
  time: z.number(),
  language: z.string().optional(),
});

export const OpeningHoursSchema = z.object({
  open_now: z.boolean(),
  weekday_text: z.array(z.string()),
  periods: z.array(z.object({
    open: z.object({
      day: z.number(),
      time: z.string(),
    }).optional(),
    close: z.object({
      day: z.number(),
      time: z.string(),
    }).optional(),
  })).optional(),
});

export const GeometrySchema = z.object({
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  viewport: z.object({
    northeast: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    southwest: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }).optional(),
});

export const PlaceDetailsSchema = z.object({
  name: z.string(),
  formatted_address: z.string(),
  formatted_phone_number: z.string(),
  international_phone_number: z.string(),
  rating: z.number().min(0).max(5),
  user_ratings_total: z.number(),
  photos: z.array(PhotoSchema),
  reviews: z.array(ReviewSchema),
  opening_hours: OpeningHoursSchema.optional(),
  geometry: GeometrySchema,
  url: z.string().url(),
  business_status: z.enum(['OPERATIONAL', 'CLOSED_TEMPORARILY', 'CLOSED_PERMANENTLY']),
  dine_in: z.boolean().optional(),
  takeout: z.boolean().optional(),
  types: z.array(z.string()),
});

export const GooglePlacesResponseSchema = z.object({
  result: PlaceDetailsSchema,
  status: z.enum(['OK', 'ZERO_RESULTS', 'NOT_FOUND', 'INVALID_REQUEST']),
  html_attributions: z.array(z.string()).optional(),
});

export type Photo = z.infer<typeof PhotoSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type OpeningHours = z.infer<typeof OpeningHoursSchema>;
export type Geometry = z.infer<typeof GeometrySchema>;
export type PlaceDetails = z.infer<typeof PlaceDetailsSchema>;
export type GooglePlacesResponse = z.infer<typeof GooglePlacesResponseSchema>;
