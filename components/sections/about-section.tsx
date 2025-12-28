/**
 * About & Highlights Section
 */
'use client';

import type { PlaceDetails } from 'lib/types';
import { Clock, MapPin, Utensils } from 'lucide-react';

interface AboutSectionProps {
  restaurant: PlaceDetails;
}

export function AboutSection({ restaurant }: AboutSectionProps) {
  const features = [
    {
      icon: Utensils,
      title: 'Premium Dining',
      description: 'Exceptional food crafted with care and the finest ingredients',
    },
    {
      icon: Clock,
      title: 'Always Open',
      description: restaurant.opening_hours?.weekday_text[0] || 'Open 24 hours',
    },
    {
      icon: MapPin,
      title: 'Prime Location',
      description: 'Conveniently located in the heart of Dhamtari',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Welcome to {restaurant.name}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the finest dining in Dhamtari. From authentic cuisine to warm hospitality,
            we offer a culinary journey you won&apos;t forget.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Icon className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Service Info */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h3>
          <div className="grid sm:grid-cols-2 gap-8">
            {restaurant.dine_in && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Dine In</h4>
                <p className="text-gray-600">
                  Enjoy your meal in our comfortable and welcoming dining area
                </p>
              </div>
            )}
            {restaurant.takeout && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Takeout</h4>
                <p className="text-gray-600">
                  Order ahead and pick up your favorite meals anytime
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
