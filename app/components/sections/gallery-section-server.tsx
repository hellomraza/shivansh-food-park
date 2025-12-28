import type { PlaceDetails } from '@/lib/types';
import { GallerySectionClient } from './gallery-section-client';

interface GallerySectionServerProps {
  restaurant: PlaceDetails;
}

export async function GallerySection({ restaurant }: GallerySectionServerProps) {
  return <GallerySectionClient photos={restaurant.photos} />;
}
