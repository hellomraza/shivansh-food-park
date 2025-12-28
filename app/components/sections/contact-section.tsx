/**
 * Contact & Location Section
 */
'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  getDirectionsUrl,
  getPhoneUrl,
  getWhatsAppUrl
} from '@/lib/formatters';
import type { PlaceDetails } from '@/lib/types';
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';

interface ContactSectionProps {
  restaurant: PlaceDetails;
}

export function ContactSection({ restaurant }: ContactSectionProps) {
  const { lat, lng } = restaurant.geometry.location;
  const openingHours = restaurant.opening_hours?.weekday_text || [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
          Visit Us
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-8">
              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-700">{restaurant.formatted_address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-700">{restaurant.formatted_phone_number}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Hours</h3>
                    <div className="space-y-1 text-gray-700 text-sm">
                      {openingHours.map((hour, index) => (
                        <p key={index}>{hour}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                variant="default"
                size="lg"
                className="w-full gap-2"
                onClick={() => window.location.href = getPhoneUrl(restaurant.formatted_phone_number)}
              >
                <Phone size={20} />
                Call Now
              </Button>
              <Button
                variant="default"
                size="lg"
                className="w-full gap-2"
                onClick={() => window.location.href = getWhatsAppUrl(restaurant.international_phone_number)}
              >
                <MessageCircle size={20} />
                WhatsApp Message
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full gap-2"
                onClick={() => window.location.href = getDirectionsUrl(lat, lng)}
              >
                <MapPin size={20} />
                Get Directions
              </Button>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="rounded-lg overflow-hidden shadow-md h-full min-h-96">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 'none', minHeight: '400px' }}
              loading="lazy"
              allowFullScreen={true}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
