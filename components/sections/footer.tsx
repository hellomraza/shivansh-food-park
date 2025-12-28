/**
 * Footer Component
 */
'use client';

import type { PlaceDetails } from 'lib/types';
import { Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  restaurant: PlaceDetails;
}

export function Footer({ restaurant }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{restaurant.name}</h3>
            <p className="text-sm">
              Premium dining experience in the heart of Dhamtari. Serving quality food
              and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${restaurant.formatted_phone_number}`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Phone size={16} />
                {restaurant.formatted_phone_number}
              </a>
              <a
                href={`mailto:contact@${restaurant.name.toLowerCase().replace(/\s+/g, '')}.com`}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail size={16} />
                Contact us
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>{restaurant.formatted_address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {currentYear} {restaurant.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <a href={restaurant.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                Google Maps
              </a>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
