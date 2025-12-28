/**
 * Star Rating Component
 */
'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  totalReviews: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ rating, totalReviews, size = 'md' }: StarRatingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const stars = Array.from({ length: 5 }, (_, i) => {
    const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;
    return fillPercentage;
  });

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {stars.map((fill, i) => (
          <div key={i} className="relative">
            <Star className={`${sizes[size]} text-gray-300`} />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill}%` }}
            >
              <Star className={`${sizes[size]} text-amber-400 fill-amber-400`} />
            </div>
          </div>
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700">
        {rating.toFixed(1)} ({totalReviews})
      </span>
    </div>
  );
}
