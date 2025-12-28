import { AboutSection } from '@/components/sections/about-section';
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
  dine_in: true,
  takeout: true,
  opening_hours: {
    open_now: true,
    weekday_text: ['Monday: Open 24 hours'],
  },
};

describe('AboutSection Component', () => {
  it('should render restaurant name', () => {
    render(<AboutSection restaurant={mockRestaurant} />);
    expect(screen.getByText(`Welcome to ${mockRestaurant.name}`)).toBeInTheDocument();
  });

  it('should display feature cards', () => {
    render(<AboutSection restaurant={mockRestaurant} />);
    expect(screen.getByText('Premium Dining')).toBeInTheDocument();
    expect(screen.getByText('Always Open')).toBeInTheDocument();
    expect(screen.getByText('Prime Location')).toBeInTheDocument();
  });

  it('should show opening hours', () => {
    render(<AboutSection restaurant={mockRestaurant} />);
    expect(screen.getByText('Monday: Open 24 hours')).toBeInTheDocument();
  });

  it('should display service information', () => {
    render(<AboutSection restaurant={mockRestaurant} />);
    expect(screen.getByText('Our Services')).toBeInTheDocument();
  });

  it('should show dine-in service', () => {
    render(<AboutSection restaurant={mockRestaurant} />);
    expect(screen.getByText('Dine In')).toBeInTheDocument();
  });

  it('should show takeout service', () => {
    render(<AboutSection restaurant={mockRestaurant} />);
    expect(screen.getByText('Takeout')).toBeInTheDocument();
  });

  it('should hide services that are not available', () => {
    const restaurantNoServices = { ...mockRestaurant, dine_in: false, takeout: false };
    const { container } = render(<AboutSection restaurant={restaurantNoServices} />);
    const serviceTexts = container.querySelectorAll('h4');
    const serviceNames = Array.from(serviceTexts).map((el) => el.textContent);
    expect(serviceNames).not.toContain('Dine In');
    expect(serviceNames).not.toContain('Takeout');
  });
});
