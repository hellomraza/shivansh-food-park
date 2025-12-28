import { GallerySection } from '@/components/sections/gallery-section';
import { render, screen } from '@testing-library/react';
import type { Photo } from 'lib/types';

const mockPhotos: Photo[] = [
  {
    height: 2296,
    width: 4080,
    html_attributions: ['<a href="">Photo Credit</a>'],
    photo_reference: 'ref1',
  },
  {
    height: 4096,
    width: 2304,
    html_attributions: ['<a href="">Photo Credit</a>'],
    photo_reference: 'ref2',
  },
  {
    height: 4096,
    width: 3072,
    html_attributions: ['<a href="">Photo Credit</a>'],
    photo_reference: 'ref3',
  },
];

const mockGetPhotoUrl = (ref: string, width: number) => `https://example.com/photo?ref=${ref}&w=${width}`;

describe('GallerySection Component', () => {
  it('should render gallery heading', () => {
    render(
      <GallerySection photos={mockPhotos} getPhotoUrl={mockGetPhotoUrl} />
    );
    expect(screen.getByText('Our Gallery')).toBeInTheDocument();
  });

  it('should display gallery description', () => {
    render(
      <GallerySection photos={mockPhotos} getPhotoUrl={mockGetPhotoUrl} />
    );
    expect(screen.getByText(/Discover the ambiance/)).toBeInTheDocument();
  });

  it('should render photo grid', () => {
    const { container } = render(
      <GallerySection photos={mockPhotos} getPhotoUrl={mockGetPhotoUrl} />
    );
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('should display photo count message for galleries with more than 9 photos', () => {
    const manyPhotos = Array.from({ length: 15 }, (_, i) => ({
      height: 2000,
      width: 3000,
      html_attributions: [],
      photo_reference: `ref${i}`,
    }));
    
    render(
      <GallerySection photos={manyPhotos} getPhotoUrl={mockGetPhotoUrl} />
    );
    expect(screen.getByText(/Showing/)).toBeInTheDocument();
  });

  it('should handle empty photos array', () => {
    render(
      <GallerySection photos={[]} getPhotoUrl={mockGetPhotoUrl} />
    );
    expect(screen.getByText('Our Gallery')).toBeInTheDocument();
  });

  it('should call getPhotoUrl with correct parameters', () => {
    const mockGetUrl = jest.fn((ref: string, width: number) => `url-${ref}-${width}`);
    render(
      <GallerySection photos={mockPhotos} getPhotoUrl={mockGetUrl} />
    );
    expect(mockGetUrl).toHaveBeenCalledWith('ref1', 500);
  });

  it('should render images with alt text', () => {
    const { container } = render(
      <GallerySection photos={mockPhotos} getPhotoUrl={mockGetPhotoUrl} />
    );
    const images = container.querySelectorAll('img');
    images.forEach((img, index) => {
      expect(img).toHaveAttribute('alt', `Restaurant photo ${index + 1}`);
    });
  });
});
