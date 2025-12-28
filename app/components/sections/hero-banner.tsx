/**
 * Hero Banner Section
 */
'use client';

import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';
import { getDirectionsUrl, getPhoneUrl } from '@/lib/formatters';
import type { PlaceDetails } from '@/lib/types';
import { MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface HeroBannerProps {
  restaurant: PlaceDetails;
  heroImageUrl: string;
}

export function HeroBanner({ restaurant, heroImageUrl }: HeroBannerProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Renders immediately, no mounting delay */}
      {!imageError && heroImageUrl ? (
        <Image
          src={heroImageUrl}
          alt={restaurant.name}
          fill
          priority
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover"
          sizes="100vw"
          quality={85}
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-r from-amber-900 to-amber-700" />
      )}
      {/* Fallback gradient - shown if image fails to load */}
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-4 space-y-8">
        <div className="space-y-4 animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {restaurant.name}
          </h1>
          
          <div className="flex justify-center">
            <StarRating
              rating={restaurant.rating}
              totalReviews={restaurant.user_ratings_total}
              size="lg"
            />
          </div>

          <p className="text-lg md:text-xl text-gray-200 flex items-center justify-center gap-2">
            <MapPin size={20} />
            {restaurant.formatted_address}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            size="lg"
            onClick={() => window.location.href = getPhoneUrl(restaurant.formatted_phone_number)}
            className="gap-2"
          >
            <Phone size={20} />
            Call Now
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              const { lat, lng } = restaurant.geometry.location;
              window.location.href = getDirectionsUrl(lat, lng);
            }}
            className="gap-2"
          >
            <MapPin size={20} />
            Get Directions
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
