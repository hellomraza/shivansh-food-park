import { ReviewsSection } from '@/components/sections/reviews-section';
import { render, screen } from '@testing-library/react';
import type { Review } from 'lib/types';

const mockReviews: Review[] = [
  {
    author_name: 'John Doe',
    author_url: 'https://maps.google.com/contrib/123',
    rating: 5,
    relative_time_description: '2 months ago',
    text: 'Excellent food and service!',
    profile_photo_url: 'https://example.com/photo1.jpg',
    time: 1756989690,
  },
  {
    author_name: 'Jane Smith',
    author_url: 'https://maps.google.com/contrib/456',
    rating: 4,
    relative_time_description: '3 months ago',
    text: 'Great ambiance and tasty food',
    profile_photo_url: 'https://example.com/photo2.jpg',
    time: 1756345890,
  },
  {
    author_name: 'Bob Wilson',
    author_url: 'https://maps.google.com/contrib/789',
    rating: 3,
    relative_time_description: '4 months ago',
    text: 'Good but could be better',
    profile_photo_url: 'https://example.com/photo3.jpg',
    time: 1755702090,
  },
  {
    author_name: 'Alice Brown',
    author_url: 'https://maps.google.com/contrib/101',
    rating: 2,
    relative_time_description: '5 months ago',
    text: 'Average experience',
    profile_photo_url: 'https://example.com/photo4.jpg',
    time: 1755058290,
  },
];

describe('ReviewsSection Component', () => {
  it('should render reviews heading', () => {
    render(
      <ReviewsSection
        reviews={mockReviews}
        rating={3.5}
        totalReviews={21}
        restaurantUrl="https://maps.google.com/?cid=123"
      />
    );
    expect(screen.getByText('Customer Reviews')).toBeInTheDocument();
  });

  it('should display rating summary', () => {
    render(
      <ReviewsSection
        reviews={mockReviews}
        rating={4}
        totalReviews={21}
        restaurantUrl="https://maps.google.com/?cid=123"
      />
    );
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('21 reviews')).toBeInTheDocument();
  });

  it('should display first 3 reviews by default', () => {
    render(
      <ReviewsSection
        reviews={mockReviews}
        rating={3.5}
        totalReviews={21}
        restaurantUrl="https://maps.google.com/?cid=123"
      />
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('should display review text', () => {
    render(
      <ReviewsSection
        reviews={mockReviews}
        rating={3.5}
        totalReviews={21}
        restaurantUrl="https://maps.google.com/?cid=123"
      />
    );
    expect(screen.getByText('Excellent food and service!')).toBeInTheDocument();
  });

  it('should display review timestamps', () => {
    render(
      <ReviewsSection
        reviews={mockReviews}
        rating={3.5}
        totalReviews={21}
        restaurantUrl="https://maps.google.com/?cid=123"
      />
    );
    expect(screen.getByText('2 months ago')).toBeInTheDocument();
  });

  it('should show "Load More Reviews" button when reviews exist beyond display', () => {
    render(
      <ReviewsSection
        reviews={mockReviews}
        rating={3.5}
        totalReviews={21}
        restaurantUrl="https://maps.google.com/?cid=123"
      />
    );
    expect(screen.getByText('Load More Reviews')).toBeInTheDocument();
  });

  it('should calculate rating distribution', () => {
    render(
      <ReviewsSection
        reviews={mockReviews}
        rating={3.5}
        totalReviews={21}
        restaurantUrl="https://maps.google.com/?cid=123"
      />
    );
    // Check that rating distribution is shown
    const stars = screen.getAllByText(/★/);
    expect(stars.length).toBeGreaterThan(0);
  });

  it('should handle empty reviews array', () => {
    render(
      <ReviewsSection
        reviews={[]}
        rating={0}
        totalReviews={0}
        restaurantUrl="https://maps.google.com/?cid=123"
      />
    );
    expect(screen.getByText('Customer Reviews')).toBeInTheDocument();
  });

  it('should display profile images', () => {
    const { container } = render(
      <ReviewsSection
        reviews={mockReviews.slice(0, 1)}
        rating={3.5}
        totalReviews={21}
        restaurantUrl="https://maps.google.com/?cid=123"
      />
    );
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });
});
