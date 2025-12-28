import { getPhotoUrl } from '@/actions/photos';
import type { PlaceDetails } from '@/lib/types';
import { HomeClient } from './home-client';

interface HomeServerProps {
  restaurant: PlaceDetails;
}

export async function HomeServer({ restaurant }: HomeServerProps) {
  // Load all photo URLs server-side
  const photoUrls: Record<string, string> = {};
  
  if (restaurant.photos) {
    for (let i = 0; i < Math.min(restaurant.photos.length, 9); i++) {
      const photo = restaurant.photos[i];
      const width = i === 0 ? 2000 : i === 1 ? 800 : 500;
      const url = await getPhotoUrl(photo.photo_reference, width);
      photoUrls[`photo_${i}`] = url;
    }
  }

  return <HomeClient restaurant={restaurant} initialPhotoUrls={photoUrls} />;
}
