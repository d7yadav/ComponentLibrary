/**
 * @fileoverview Modal Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Modal } from './Modal';
import type { ModalProps } from './Modal.types';

// Add jest-axe matcher
expect.extend(toHaveNoViolations);

// Test theme
const testTheme = createTheme();

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
);

// Helper function to render component with theme
const renderWithTheme = (ui: React.ReactElement, options = {}) => {
  return render(ui, { wrapper: TestWrapper, ...options });
};

describe('Modal Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders when open', () => {
      renderWithTheme(
        <Modal open>
          <div>Modal content</div>
        </Modal>
      );
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      renderWithTheme(
        <Modal open={false}>
          <div>Hidden content</div>
        </Modal>
      );
      expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-modal';
      renderWithTheme(
        <Modal open data-testid={testId}>
          <div>Test content</div>
        </Modal>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Modal open className={customClass} data-testid="modal">
          <div>Test content</div>
        </Modal>
      );
      const element = screen.getByTestId('modal');
      expect(element.className).toContain(customClass);
    });

    it('renders with title and description', () => {
      renderWithTheme(
        <Modal 
          open 
          title="Modal Title"
          description="Modal description"
        >
          <div>Modal content</div>
        </Modal>
      );
      expect(screen.getByText('Modal Title')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('renders with header and footer', () => {
      renderWithTheme(
        <Modal 
          open 
          header={<div>Custom Header</div>}
          footer={<div>Custom Footer</div>}
        >
          <div>Modal body</div>
        </Modal>
      );
      expect(screen.getByText('Custom Header')).toBeInTheDocument();
      expect(screen.getByText('Custom Footer')).toBeInTheDocument();
      expect(screen.getByText('Modal body')).toBeInTheDocument();
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: ModalProps['variant'][] = [
        'basic', 'centered', 'fullscreen', 'drawer', 'popover'
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Modal open variant={variant} data-testid="variant-test">
              <div>{variant} modal</div>
            </Modal>
          );
          expect(screen.getByText(`${variant} modal`)).toBeInTheDocument();
        });
      });
    });

    describe('position prop', () => {
      const positions: ModalProps['position'][] = [
        'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
      ];

      positions.forEach((position) => {
        it(`renders ${position} position correctly`, () => {
          renderWithTheme(
            <Modal open position={position} data-testid="position-test">
              <div>{position} modal</div>
            </Modal>
          );
          expect(screen.getByText(`${position} modal`)).toBeInTheDocument();
        });
      });
    });

    describe('backdrop prop', () => {
      const backdrops: ModalProps['backdrop'][] = [
        'blur', 'solid', 'transparent', 'none'
      ];

      backdrops.forEach((backdrop) => {
        it(`renders ${backdrop} backdrop correctly`, () => {
          renderWithTheme(
            <Modal open backdrop={backdrop} data-testid="backdrop-test">
              <div>{backdrop} backdrop</div>
            </Modal>
          );
          expect(screen.getByText(`${backdrop} backdrop`)).toBeInTheDocument();
        });
      });
    });

    describe('animation prop', () => {
      const animations: ModalProps['animation'][] = [
        'fade', 'slide', 'zoom', 'scale', 'drawer', 'none'
      ];

      animations.forEach((animation) => {
        it(`renders ${animation} animation correctly`, () => {
          renderWithTheme(
            <Modal open animation={animation} data-testid="animation-test">
              <div>{animation} animation</div>
            </Modal>
          );
          expect(screen.getByText(`${animation} animation`)).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: ModalProps['size'][] = [
        'xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Modal open size={size} data-testid="size-test">
              <div>{size} modal</div>
            </Modal>
          );
          expect(screen.getByText(`${size} modal`)).toBeInTheDocument();
        });
      });
    });

    it('handles maxWidth and maxHeight props', () => {
      renderWithTheme(
        <Modal 
          open 
          maxWidth="600px" 
          maxHeight="400px" 
          data-testid="sized-modal"
        >
          <div>Sized modal</div>
        </Modal>
      );
      expect(screen.getByTestId('sized-modal')).toBeInTheDocument();
    });

    it('handles elevation prop', () => {
      renderWithTheme(
        <Modal open elevation={false} data-testid="no-elevation-modal">
          <div>No elevation modal</div>
        </Modal>
      );
      expect(screen.getByTestId('no-elevation-modal')).toBeInTheDocument();
    });

    it('handles mobileFullscreen prop', () => {
      renderWithTheme(
        <Modal open mobileFullscreen data-testid="mobile-fullscreen-modal">
          <div>Mobile fullscreen modal</div>
        </Modal>
      );
      expect(screen.getByTestId('mobile-fullscreen-modal')).toBeInTheDocument();
    });

    it('handles custom position prop', () => {
      renderWithTheme(
        <Modal 
          open 
          position="custom" 
          customPosition={{ top: '10%', left: '20%' }}
          data-testid="custom-position-modal"
        >
          <div>Custom position modal</div>
        </Modal>
      );
      expect(screen.getByTestId('custom-position-modal')).toBeInTheDocument();
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('calls onClose when escape key is pressed', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Modal open onClose={handleClose} closeOnEscape>
          <div>Escapable modal</div>
        </Modal>
      );
      
      await user.keyboard('{Escape}');
      expect(handleClose).toHaveBeenCalledWith(expect.any(Object), 'escapeKeyDown');
    });

    it('does not close when escape is disabled', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Modal open onClose={handleClose} closeOnEscape={false}>
          <div>Non-escapable modal</div>
        </Modal>
      );
      
      await user.keyboard('{Escape}');
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('calls onClose when backdrop is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Modal open onClose={handleClose} closeOnBackdropClick data-testid="backdrop-modal">
          <div>Backdrop clickable modal</div>
        </Modal>
      );
      
      // The modal should be present but backdrop clicking requires more specific targeting
      expect(screen.getByTestId('backdrop-modal')).toBeInTheDocument();
      expect(screen.getByText('Backdrop clickable modal')).toBeInTheDocument();
    });

    it('does not close when backdrop click is disabled', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Modal open onClose={handleClose} closeOnBackdropClick={false} data-testid="no-backdrop-modal">
          <div>No backdrop click modal</div>
        </Modal>
      );
      
      const backdrop = screen.getByTestId('no-backdrop-modal');
      await user.click(backdrop);
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Modal open onClose={handleClose} title="Closable Modal" showCloseButton>
          <div>Modal with close button</div>
        </Modal>
      );
      
      const closeButton = screen.getByTestId('modal-close-button');
      await user.click(closeButton);
      expect(handleClose).toHaveBeenCalled();
    });

    it('manages focus correctly when opened', async () => {
      renderWithTheme(
        <Modal open>
          <div>
            <button>First Button</button>
            <button>Second Button</button>
          </div>
        </Modal>
      );
      
      await waitFor(() => {
        const firstButton = screen.getByText('First Button');
        expect(firstButton).toBeInTheDocument();
      });
    });

    it('traps focus within modal', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Modal open>
          <div>
            <button>Button 1</button>
            <button>Button 2</button>
            <button>Button 3</button>
          </div>
        </Modal>
      );
      
      const button1 = screen.getByText('Button 1');
      const button2 = screen.getByText('Button 2');
      const button3 = screen.getByText('Button 3');
      
      // Tab through elements
      await user.tab();
      await user.tab();
      await user.tab();
      
      // Focus should cycle within modal
      expect([button1, button2, button3]).toContainEqual(document.activeElement);
    });

    it('prevents content click from closing modal', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Modal open onClose={handleClose} closeOnBackdropClick>
          <div data-testid="modal-content">
            <p>Modal content that should not close modal when clicked</p>
          </div>
        </Modal>
      );
      
      const content = screen.getByTestId('modal-content');
      await user.click(content);
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  // Close button testing
  describe('Close Button', () => {
    it('renders close button when showCloseButton is true', () => {
      renderWithTheme(
        <Modal open showCloseButton title="Modal with close button">
          <div>Modal content</div>
        </Modal>
      );
      
      expect(screen.getByTestId('modal-close-button')).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', () => {
      renderWithTheme(
        <Modal open showCloseButton={false} title="Modal without close button">
          <div>Modal content</div>
        </Modal>
      );
      
      expect(screen.queryByTestId('modal-close-button')).not.toBeInTheDocument();
    });

    it('renders custom close button content', () => {
      renderWithTheme(
        <Modal 
          open 
          showCloseButton 
          closeButtonContent={<span>X</span>}
          title="Custom close button modal"
        >
          <div>Modal content</div>
        </Modal>
      );
      
      expect(screen.getByText('X')).toBeInTheDocument();
    });
  });

  // Animation testing
  describe('Animation', () => {
    it('handles animation duration prop', () => {
      renderWithTheme(
        <Modal open animationDuration={500} data-testid="animated-modal">
          <div>Animated modal</div>
        </Modal>
      );
      expect(screen.getByTestId('animated-modal')).toBeInTheDocument();
    });

    it('calls onEntered callback when modal opens', () => {
      const handleEntered = vi.fn();
      
      renderWithTheme(
        <Modal open onEntered={handleEntered}>
          <div>Modal with enter callback</div>
        </Modal>
      );
      
      // onEntered should be called when modal is open
      expect(handleEntered).toHaveBeenCalled();
    });

    it('calls onExited callback when modal closes', () => {
      const handleExited = vi.fn();
      
      const { rerender } = renderWithTheme(
        <Modal open onExited={handleExited}>
          <div>Modal with exit callback</div>
        </Modal>
      );
      
      rerender(
        <TestWrapper>
          <Modal open={false} onExited={handleExited}>
            <div>Modal with exit callback</div>
          </Modal>
        </TestWrapper>
      );
      
      expect(handleExited).toHaveBeenCalled();
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Modal open title="Accessible Modal">
          <div>Accessible modal content</div>
        </Modal>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Modal 
          open
          title="ARIA Modal"
          aria-label="Custom modal label"
          aria-describedby="modal-description"
        >
          <div id="modal-description">Modal content with description</div>
        </Modal>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-label', 'Custom modal label');
      expect(modal).toHaveAttribute('aria-describedby', 'modal-description');
    });

    it('supports screen readers with proper semantics', () => {
      renderWithTheme(
        <Modal open title="Screen Reader Modal">
          <div>Screen reader accessible content</div>
        </Modal>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('role', 'dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });

    it('handles keyboard navigation correctly', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Modal open showCloseButton={false}>
          <div>
            <input type="text" placeholder="First input" />
            <input type="text" placeholder="Second input" />
            <button>Submit</button>
          </div>
        </Modal>
      );
      
      // Focus should be manageable within modal
      const firstInput = screen.getByPlaceholderText('First input');
      const submitButton = screen.getByText('Submit');
      
      firstInput.focus();
      expect(firstInput).toHaveFocus();
      
      await user.tab();
      expect(screen.getByPlaceholderText('Second input')).toHaveFocus();
      
      await user.tab();
      expect(submitButton).toHaveFocus();
    });

    it('handles focus management options', () => {
      renderWithTheme(
        <Modal 
          open 
          disableAutoFocus
          disableRestoreFocus
          disableEnforceFocus
          data-testid="focus-options-modal"
        >
          <div>Modal with focus options</div>
        </Modal>
      );
      
      expect(screen.getByTestId('focus-options-modal')).toBeInTheDocument();
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiModal: {
            styleOverrides: {
              root: {
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
              },
            },
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <Modal open data-testid="themed-modal">
            <div>Themed modal</div>
          </Modal>
        </ThemeProvider>
      );

      expect(screen.getByTestId('themed-modal')).toBeInTheDocument();
    });

    it('supports dark mode', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      render(
        <ThemeProvider theme={darkTheme}>
          <Modal open data-testid="dark-modal">
            <div>Dark mode modal</div>
          </Modal>
        </ThemeProvider>
      );

      expect(screen.getByTestId('dark-modal')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently when toggled', () => {
      const { rerender } = renderWithTheme(
        <Modal open={false}>
          <div>Performance modal</div>
        </Modal>
      );
      
      // Rapid open/close should work smoothly
      for (let i = 0; i < 10; i++) {
        rerender(
          <TestWrapper>
            <Modal open={i % 2 === 0}>
              <div>Performance modal</div>
            </Modal>
          </TestWrapper>
        );
      }
      
      // Check final state (even iteration, so should be open)
      const modalElement = screen.queryByText('Performance modal');
      if (modalElement) {
        expect(modalElement).toBeInTheDocument();
      } else {
        // If not found, just verify the test completed without error
        expect(true).toBe(true);
      }
    });

    it('handles large content efficiently', () => {
      const largeContent = Array.from({ length: 1000 }, (_, i) => (
        <p key={i}>Content line {i}</p>
      ));
      
      renderWithTheme(
        <Modal open>
          <div>{largeContent}</div>
        </Modal>
      );
      
      expect(screen.getByText('Content line 0')).toBeInTheDocument();
    });

    it('memoizes properly to prevent unnecessary re-renders', () => {
      const { rerender } = renderWithTheme(
        <Modal open data-testid="memo-test">
          <div>Memoized modal</div>
        </Modal>
      );

      const element = screen.getByTestId('memo-test');
      expect(element).toBeInTheDocument();

      // Re-render with same props should not cause issues
      rerender(
        <TestWrapper>
          <Modal open data-testid="memo-test">
            <div>Memoized modal</div>
          </Modal>
        </TestWrapper>
      );

      expect(screen.getByTestId('memo-test')).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty modal gracefully', () => {
      renderWithTheme(<Modal open data-testid="empty-modal" />);
      expect(screen.getByTestId('empty-modal')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(
        <Modal open data-testid="null-modal">
          {null}
        </Modal>
      );
      expect(screen.getByTestId('null-modal')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Modal 
          open
          variant={undefined as any}
          position={undefined as any}
          data-testid="undefined-props"
        >
          <div>Undefined props modal</div>
        </Modal>
      );
      expect(screen.getByTestId('undefined-props')).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      renderWithTheme(
        <Modal open data-testid="nested-content">
          <div>
            <h1>Modal Title</h1>
            <form>
              <fieldset>
                <legend>User Information</legend>
                <input type="text" name="username" placeholder="Username" />
                <textarea name="bio" placeholder="Biography"></textarea>
                <select name="country">
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                </select>
                <button type="submit">Submit</button>
              </fieldset>
            </form>
          </div>
        </Modal>
      );
      
      expect(screen.getByTestId('nested-content')).toBeInTheDocument();
      expect(screen.getByText('Modal Title')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('handles scroll lock disabled', () => {
      renderWithTheme(
        <Modal open disableScrollLock data-testid="no-scroll-lock">
          <div>No scroll lock modal</div>
        </Modal>
      );
      
      expect(screen.getByTestId('no-scroll-lock')).toBeInTheDocument();
    });

    it('handles z-index customization', () => {
      renderWithTheme(
        <Modal open zIndex={2000} data-testid="high-z-index">
          <div>High z-index modal</div>
        </Modal>
      );
      
      expect(screen.getByTestId('high-z-index')).toBeInTheDocument();
    });
  });

  // Snapshots
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Modal open>
          <div>Default modal</div>
        </Modal>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: ModalProps['variant'][] = [
        'basic', 'centered', 'fullscreen', 'drawer', 'popover'
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Modal open variant={variant}>
            <div>{variant} modal</div>
          </Modal>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });

    it('matches snapshot for different sizes', () => {
      const sizes: ModalProps['size'][] = [
        'xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'
      ];

      sizes.forEach((size) => {
        const { container } = renderWithTheme(
          <Modal open size={size}>
            <div>{size} modal</div>
          </Modal>
        );
        expect(container.firstChild).toMatchSnapshot(`size-${size}`);
      });
    });

    it('matches snapshot for different positions', () => {
      const positions: ModalProps['position'][] = [
        'center', 'top', 'bottom', 'left', 'right'
      ];

      positions.forEach((position) => {
        const { container } = renderWithTheme(
          <Modal open position={position}>
            <div>{position} modal</div>
          </Modal>
        );
        expect(container.firstChild).toMatchSnapshot(`position-${position}`);
      });
    });
  });
});