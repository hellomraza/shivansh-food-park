import { HomeServer } from '@/components/home-server';
import { getRestaurantDetails } from 'actions/google';
import { getContent } from 'lib/useContent';

export const revalidate = 3600; // ISR: revalidate every hour

export default async function Home() {
  const content = getContent();
  let restaurant = null;
  let error = null;

  try {
    restaurant = await getRestaurantDetails();
  } catch (err) {
    error = err instanceof Error ? err.message : content.messages.error;
    console.error('Error loading restaurant:', error);
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.common.brandName}</h1>
          <p className="text-gray-600 mb-6">
            {error || content.messages.error}
          </p>
          <p className="text-sm text-gray-500">
            {content.messages.errorConfig}
          </p>
        </div>
      </div>
    );
  }

  return <HomeServer restaurant={restaurant} />;
}

