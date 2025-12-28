'use client';

import dynamic from 'next/dynamic';
import { ReactNode, Suspense } from 'react';

// Skeleton loader for lazy components
const LoadingFallback = () => (
  <div className="w-full h-64 bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse rounded" />
);

// Dynamic imports with loading states
export const DynamicGallerySection = dynamic(
  () => import('@/components/sections/gallery-section-server').then(mod => mod.GallerySection),
  {
    loading: () => <LoadingFallback />,
    ssr: true,
  }
);

export const DynamicReviewsSection = dynamic(
  () => import('@/components/sections/reviews-section').then(mod => mod.ReviewsSection),
  {
    loading: () => <LoadingFallback />,
    ssr: true,
  }
);

export const DynamicContactSection = dynamic(
  () => import('@/components/sections/contact-section').then(mod => mod.ContactSection),
  {
    loading: () => <LoadingFallback />,
    ssr: true,
  }
);

export const DynamicFooter = dynamic(
  () => import('@/components/sections/footer').then(mod => mod.Footer),
  {
    loading: () => null,
    ssr: true,
  }
);

// Lazy load Toaster (non-critical UI)
export const DynamicToaster = dynamic(
  () => import('@/components/ui/toaster').then(mod => mod.Toaster),
  {
    ssr: false,
  }
);

interface DynamicSectionProps {
  children: ReactNode;
}

export function DynamicSectionWrapper({ children }: DynamicSectionProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  );
}
