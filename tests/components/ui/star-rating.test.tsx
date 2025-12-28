import { StarRating } from '@/components/ui/star-rating';
import { render, screen } from '@testing-library/react';

describe('StarRating Component', () => {
  it('should render rating and review count', () => {
    render(<StarRating rating={4.5} totalReviews={100} />);
    expect(screen.getByText(/4.5/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });

  it('should render 5 stars', () => {
    const { container } = render(<StarRating rating={3} totalReviews={50} />);
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBe(10); // 5 stars * 2 (empty + filled)
  });

  it('should apply correct size class', () => {
    const { container } = render(<StarRating rating={4} totalReviews={20} size="lg" />);
    const stars = container.querySelectorAll('svg');
    expect(stars[0]).toHaveClass('w-6', 'h-6');
  });

  it('should display different sizes', () => {
    const { container: smContainer } = render(<StarRating rating={4} totalReviews={20} size="sm" />);
    const smStars = smContainer.querySelectorAll('svg');
    expect(smStars[0]).toHaveClass('w-4', 'h-4');

    const { container: mdContainer } = render(<StarRating rating={4} totalReviews={20} size="md" />);
    const mdStars = mdContainer.querySelectorAll('svg');
    expect(mdStars[0]).toHaveClass('w-5', 'h-5');
  });

  it('should handle zero rating', () => {
    render(<StarRating rating={0} totalReviews={5} />);
    expect(screen.getByText(/0.0/)).toBeInTheDocument();
  });

  it('should handle full 5 stars', () => {
    render(<StarRating rating={5} totalReviews={100} />);
    expect(screen.getByText(/5.0/)).toBeInTheDocument();
  });
});
