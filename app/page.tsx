import { HomeServer } from '@/components/home-server';
import { getRestaurantDetails } from 'actions/google';

export const revalidate = 3600; // ISR: revalidate every hour

export default async function Home() {
  let restaurant = null;
  let error = null;

  try {
    restaurant = await getRestaurantDetails();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load restaurant data';
    console.error('Error loading restaurant:', error);
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shivansh Food Park</h1>
          <p className="text-gray-600 mb-6">
            {error || 'Unable to load restaurant details. Please try again later.'}
          </p>
          <p className="text-sm text-gray-500">
            Make sure your Google Maps API key is configured in .env.local
          </p>
        </div>
      </div>
    );
  }

  return <HomeServer restaurant={restaurant} />;
}

