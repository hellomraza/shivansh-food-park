'use client';

import Image from 'next/image';
import { ImgHTMLAttributes, useState } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  responsive?: boolean;
  sizes?: string;
}

/**
 * Optimized Image Component
 * - Automatically serves WebP/AVIF with fallbacks
 * - Lazy loads by default
 * - Responsive sizing
 * - Blur placeholder support
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  responsive = true,
  sizes,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!src) {
    return (
      <div
        className="bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse"
        style={{ width, height }}
      />
    );
  }

  const defaultSizes = responsive
    ? '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw'
    : sizes;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes={defaultSizes}
      quality={85}
      onLoadingComplete={() => setIsLoading(false)}
      placeholder="empty"
      {...props}
      className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${props.className || ''}`}
    />
  );
}
