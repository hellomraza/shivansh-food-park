import { Button } from '@/components/ui/button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
  it('should render button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await user.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply primary variant styles', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-amber-600', 'text-white');
  });

  it('should apply secondary variant styles', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-gray-200', 'text-gray-900');
  });

  it('should apply ghost variant styles', () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('text-gray-900', 'hover:bg-gray-100');
  });

  it('should apply size classes', () => {
    const { container: smContainer } = render(<Button size="sm">Small</Button>);
    expect(smContainer.querySelector('button')).toHaveClass('px-3', 'py-2', 'text-sm');

    const { container: lgContainer } = render(<Button size="lg">Large</Button>);
    expect(lgContainer.querySelector('button')).toHaveClass('px-6', 'py-3', 'text-lg');
  });

  it('should be disabled when disabled prop is set', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    
    const button = screen.getByText('Disabled');
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    const { container } = render(<Button className="custom-class">Custom</Button>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });
});

// Mock @testing-library/user-event if needed
jest.mock('@testing-library/user-event', () => ({
  __esModule: true,
  default: {
    setup: jest.fn(() => ({
      click: jest.fn(async (element) => {
        const event = new MouseEvent('click', { bubbles: true });
        element.dispatchEvent(event);
      }),
    })),
  },
}));
