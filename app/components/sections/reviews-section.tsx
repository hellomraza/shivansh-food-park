/**
 * Reviews Section
 */
'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Review } from '@/lib/types';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  totalReviews: number;
  restaurantUrl: string;
}

// Function to generate a consistent color based on user name
function getAvatarColor(name: string): string {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-cyan-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function ReviewsSection({
  reviews,
  rating,
  totalReviews,
  restaurantUrl,
}: ReviewsSectionProps) {
  const [displayedCount, setDisplayedCount] = useState(3);
  const displayedReviews = reviews.slice(0, displayedCount);

  // Calculate rating distribution
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const starCount = i + 1;
    return {
      stars: starCount,
      count: reviews.filter((r) => r.rating === starCount).length,
    };
  }).reverse();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
          Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Rating Summary */}
          <div className="md:col-span-1">
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-2">{rating.toFixed(1)}</p>
              <p className="text-gray-600 mb-6">{totalReviews} reviews</p>

              <div className="space-y-2">
                {ratingDistribution.map((dist) => (
                  <div key={dist.stars} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-12">{dist.stars}★</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-amber-400 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${totalReviews > 0 ? (dist.count / totalReviews) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">{dist.count}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="md:col-span-2 space-y-4">
            {displayedReviews.map((review, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  {review.profile_photo_url ? (
                    <Image
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      width={48}
                      height={48}
                      className="rounded-full shrink-0 object-cover"
                    />
                  ) : (
                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(review.author_name)} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      {review.author_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{review.author_name}</h4>
                      <span className="text-sm text-gray-500">{review.relative_time_description}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm">{review.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More / View All */}
        <div className="text-center">
          {displayedCount < reviews.length ? (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setDisplayedCount(displayedCount + 3)}
            >
              Load More Reviews
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.open(restaurantUrl, '_blank')}
            >
              See All Reviews on Google
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
