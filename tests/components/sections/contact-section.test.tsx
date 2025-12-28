import { ContactSection } from '@/components/sections/contact-section';
import { render, screen } from '@testing-library/react';
import type { PlaceDetails } from 'lib/types';

const mockRestaurant: PlaceDetails = {
  name: 'Shivansh Food Park',
  formatted_address: 'Infront of Equitas bank, Ratna bandha road, Subhash Nagar, Dhamtari, Chhattisgarh 493773, India',
  formatted_phone_number: '098270 48957',
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
  opening_hours: {
    open_now: true,
    weekday_text: [
      'Monday: Open 24 hours',
      'Tuesday: Open 24 hours',
      'Wednesday: Open 24 hours',
      'Thursday: Open 24 hours',
      'Friday: Open 24 hours',
      'Saturday: Open 24 hours',
      'Sunday: Open 24 hours',
    ],
  },
};

describe('ContactSection Component', () => {
  it('should render visit us heading', () => {
    render(<ContactSection restaurant={mockRestaurant} />);
    expect(screen.getByText('Visit Us')).toBeInTheDocument();
  });

  it('should display address', () => {
    render(<ContactSection restaurant={mockRestaurant} />);
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText(mockRestaurant.formatted_address)).toBeInTheDocument();
  });

  it('should display phone number', () => {
    render(<ContactSection restaurant={mockRestaurant} />);
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText(mockRestaurant.formatted_phone_number)).toBeInTheDocument();
  });

  it('should display opening hours', () => {
    render(<ContactSection restaurant={mockRestaurant} />);
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Monday: Open 24 hours')).toBeInTheDocument();
  });

  it('should display CTA buttons', () => {
    render(<ContactSection restaurant={mockRestaurant} />);
    expect(screen.getByText('Call Now')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp Message')).toBeInTheDocument();
    expect(screen.getByText('Get Directions')).toBeInTheDocument();
  });

  it('should render Google Maps embed', () => {
    const { container } = render(<ContactSection restaurant={mockRestaurant} />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  it('should include coordinates in maps embed', () => {
    const { container } = render(<ContactSection restaurant={mockRestaurant} />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('20.7144585');
    expect(iframe?.src).toContain('81.5326135');
  });

  it('should have proper iframe attributes', () => {
    const { container } = render(<ContactSection restaurant={mockRestaurant} />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('height', '100%');
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  it('should display all contact info items', () => {
    const { container } = render(<ContactSection restaurant={mockRestaurant} />);
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(0);
    expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument();
  });
});
