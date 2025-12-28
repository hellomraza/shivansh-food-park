import { Card } from '@/components/ui/card';
import { render, screen } from '@testing-library/react';

describe('Card Component', () => {
  it('should render card with children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should apply base styles', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.querySelector('div');
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-md');
  });

  it('should apply custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.querySelector('div');
    expect(card).toHaveClass('custom-class');
  });

  it('should render multiple children', () => {
    render(
      <Card>
        <h1>Title</h1>
        <p>Description</p>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('should support all HTML attributes', () => {
    const { container } = render(
      <Card id="test-card" data-testid="card">
        Content
      </Card>
    );
    const card = container.querySelector('#test-card');
    expect(card).toHaveAttribute('data-testid', 'card');
  });
});
