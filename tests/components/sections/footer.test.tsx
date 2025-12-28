import { Footer } from '@/components/sections/footer';
import type { PlaceDetails } from '@/lib/types';
import { render, screen } from '@testing-library/react';

const mockRestaurant: PlaceDetails = {
  name: 'Shivansh Food Park',
  formatted_address: 'Dhamtari, India',
  formatted_phone_number: '+91 98270 48957',
  international_phone_number: '+91 98270 48957',
  rating: 3.5,
  user_ratings_total: 21,
  photos: [],
  reviews: [],
  geometry: {
    location: { lat: 20.7144585, lng: 81.5326135 },
  },
  url: 'https://maps.google.com/?cid=123',
  business_status: 'OPERATIONAL',
  types: ['restaurant'],
};

describe('Footer Component', () => {
  it('should render restaurant name', () => {
    render(<Footer restaurant={mockRestaurant} />);
    expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument();
  });

  it('should display Quick Links section', () => {
    render(<Footer restaurant={mockRestaurant} />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
  });

  it('should display Contact section', () => {
    render(<Footer restaurant={mockRestaurant} />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should include navigation links', () => {
    render(<Footer restaurant={mockRestaurant} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });

  it('should display copyright notice', () => {
    render(<Footer restaurant={mockRestaurant} />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('should have phone link', () => {
    render(<Footer restaurant={mockRestaurant} />);
    const phoneLink = screen.getByText(mockRestaurant.formatted_phone_number);
    expect(phoneLink.closest('a')).toHaveAttribute('href', expect.stringMatching(/^tel:/));
  });

  it('should have Google Maps link', () => {
    render(<Footer restaurant={mockRestaurant} />);
    const mapsLink = screen.getByText('Google Maps');
    expect(mapsLink).toHaveAttribute('href', mockRestaurant.url);
  });

  it('should include address in contact section', () => {
    render(<Footer restaurant={mockRestaurant} />);
    expect(screen.getByText(mockRestaurant.formatted_address)).toBeInTheDocument();
  });

  it('should display Terms and Privacy links', () => {
    render(<Footer restaurant={mockRestaurant} />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('should have dark theme styling', () => {
    const { container } = render(<Footer restaurant={mockRestaurant} />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-gray-900', 'text-gray-300');
  });
});
