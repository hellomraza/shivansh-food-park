'use server';

import { GooglePlacesResponseSchema, PlaceDetails } from '@/lib/types';

const CACHE_DURATION = parseInt(process.env.NEXT_REVALIDATE_TIME || '3600', 10);
const placeId = process.env.GOOGLE_MAPS_PLACE_ID;
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
console.log({placeId, apiKey});

if (!placeId) {
  throw new Error('GOOGLE_MAPS_PLACE_ID is not set in environment variables');
}

if (!apiKey) {
  throw new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set in environment variables');
}

// In-memory cache with TTL (for single server instance)
// For production with multiple instances, use Redis or similar
interface CacheEntry {
  data: PlaceDetails;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

/**
 * Fetch restaurant details from Google Places API
 * Uses server-side caching to avoid excessive API calls
 */
export async function getRestaurantDetails(): Promise<PlaceDetails> {
  const cacheKey = `restaurant_${placeId}`;
  
  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION * 1000) {
    console.log('[Cache] Returning cached restaurant data');
    return cached.data;
  }

  console.log('[API] Fetching restaurant data from Google Places API');
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&fields=name,formatted_address,formatted_phone_number,international_phone_number,rating,user_ratings_total,photos,reviews,opening_hours,geometry,url,business_status,dine_in,takeout,types`,
      {
        next: {
          revalidate: CACHE_DURATION,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response with Zod
    const validatedData = GooglePlacesResponseSchema.parse(data);

    if (validatedData.status !== 'OK') {
      throw new Error(`Google Places API returned status: ${validatedData.status}`);
    }

    const result = validatedData.result;

    // Store in cache
    cache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });

    return result;
  } catch (error) {
    console.error('[API Error]', error);
    
    // If cache exists (even expired), return it as fallback
    if (cached) {
      console.log('[Fallback] Returning expired cached data');
      return cached.data;
    }

    throw new Error('Failed to fetch restaurant details. Please try again later.');
  }
}

/**
 * Get a specific photo URL from Google Places API (async version)
 */
export async function getPhotoUrl(photoReference: string, maxWidth: number = 800): Promise<string> {
  if (!apiKey) {
    throw new Error('API key not configured');
  }
  
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${apiKey}`;
}

/**
 * Clear cache (useful for testing or manual refresh)
 */
export async function clearCache(): Promise<void> {
  cache.clear();
  console.log('[Cache] Cleared');
}
