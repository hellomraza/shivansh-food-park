/**
 * Gallery Section with Lightbox - Client Component
 */
'use client';

import { getPhotoUrl } from '@/actions/photos';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import type { Photo } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface GallerySectionClientProps {
  photos: Photo[];
}

interface PhotoUrl {
  [key: string]: string;
}

export function GallerySectionClient({ photos }: GallerySectionClientProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [photoUrls, setPhotoUrls] = useState<PhotoUrl>({});
  const displayPhotos = photos.slice(0, 6); // Show first 6 for grid

  useEffect(() => {
    const loadPhotoUrls = async () => {
      const urls: PhotoUrl = {};
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const width = i < 6 ? 500 : 1200;
        const url = await getPhotoUrl(photo.photo_reference, width);
        urls[`photo_${i}`] = url;
      }
      setPhotoUrls(urls);
    };

    loadPhotoUrls();
  }, [photos]);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % photos.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Gallery
          </h2>
          <p className="text-xl text-gray-600">
            Discover the ambiance and culinary excellence at our restaurant
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {displayPhotos.map((photo, index) => (
            <Card
              key={index}
              className="h-64 md:h-72 overflow-hidden cursor-pointer group"
              onClick={() => setSelectedIndex(index)}
            >
              {photoUrls[`photo_${index}`] ? (
                <Image
                  src={photoUrls[`photo_${index}`]}
                  alt={`Restaurant photo ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-gray-700 to-gray-800 animate-pulse" />
              )}
            </Card>
          ))}
        </div>

        {photos.length > 6 && (
          <div className="text-center">
            <p className="text-gray-600">
              Showing {displayPhotos.length} of {photos.length} photos
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <Modal
          isOpen={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
          title={`Photo ${selectedIndex + 1} of ${photos.length}`}
        >
          <div className="space-y-4">
            {photoUrls[`photo_${selectedIndex}`] ? (
              <Image
                src={photoUrls[`photo_${selectedIndex}`]}
                alt={`Restaurant photo ${selectedIndex + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="w-full h-96 bg-linear-to-br from-gray-700 to-gray-800 animate-pulse rounded-lg" />
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>

              <span className="text-gray-600">
                {selectedIndex + 1} / {photos.length}
              </span>

              <button
                onClick={handleNext}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
