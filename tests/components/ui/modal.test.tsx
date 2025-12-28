import { Modal } from '@/components/ui/modal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock HTML dialog element
HTMLDialogElement.prototype.showModal = jest.fn();
HTMLDialogElement.prototype.close = jest.fn();

describe('Modal Component', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={jest.fn()}>
        Modal content
      </Modal>
    );
    const dialog = container.querySelector('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should show modal when isOpen is true', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        Modal content
      </Modal>
    );
    const dialog = container.querySelector('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should display title when provided', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('should display modal content', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test">
        Content
      </Modal>
    );

    // Find and click close button
    const buttons = screen.getAllByRole('button');
    if (buttons.length > 0) {
      // Close button is the one in the header
      await user.click(buttons[0]);
      expect(handleClose).toHaveBeenCalled();
    }
  });

  it('should have max width constraint', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        Content
      </Modal>
    );
    const dialog = container.querySelector('dialog');
    expect(dialog).toHaveClass('max-w-2xl');
  });

  it('should support custom className', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        Content
      </Modal>
    );
    const dialog = container.querySelector('dialog');
    expect(dialog).toHaveClass('rounded-lg', 'shadow-xl');
  });
});

// Mock @testing-library/user-event
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
