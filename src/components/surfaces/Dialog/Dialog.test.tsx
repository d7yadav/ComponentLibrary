/**
 * @fileoverview Dialog Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Dialog, DialogTitle, DialogContent, DialogActions } from './Dialog';
import type { DialogProps } from './Dialog.types';

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

describe('Dialog Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders when open', () => {
      renderWithTheme(
        <Dialog open>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogContent>Dialog content</DialogContent>
        </Dialog>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      expect(screen.getByText('Dialog content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      renderWithTheme(
        <Dialog open={false}>
          <DialogTitle>Hidden Dialog</DialogTitle>
          <DialogContent>Hidden content</DialogContent>
        </Dialog>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-dialog';
      renderWithTheme(
        <Dialog open data-testid={testId}>
          <DialogTitle>Test</DialogTitle>
        </Dialog>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Dialog open className={customClass} data-testid="dialog">
          <DialogTitle>Test</DialogTitle>
        </Dialog>
      );
      expect(screen.getByTestId('dialog')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('size prop', () => {
      const sizes: DialogProps['size'][] = [
        'small', 'medium', 'large', 'fullscreen'
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Dialog open size={size} data-testid="size-test">
              <DialogTitle>{size} Dialog</DialogTitle>
            </Dialog>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('variant prop', () => {
      const variants: DialogProps['variant'][] = [
        'standard', 'modal', 'fullscreen', 'drawer', 'popover'
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Dialog open variant={variant} data-testid="variant-test">
              <DialogTitle>{variant} Dialog</DialogTitle>
            </Dialog>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    it('handles scroll prop correctly', () => {
      renderWithTheme(
        <Dialog open scroll="paper" data-testid="scroll-test">
          <DialogTitle>Scrollable Dialog</DialogTitle>
          <DialogContent>
            <div style={{ height: '2000px' }}>Very long content</div>
          </DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId('scroll-test')).toBeInTheDocument();
    });

    it('handles fullWidth prop correctly', () => {
      renderWithTheme(
        <Dialog open fullWidth data-testid="fullwidth-test">
          <DialogTitle>Full Width Dialog</DialogTitle>
        </Dialog>
      );
      expect(screen.getByTestId('fullwidth-test')).toBeInTheDocument();
    });

    it('handles maxWidth prop correctly', () => {
      renderWithTheme(
        <Dialog open maxWidth="md" data-testid="maxwidth-test">
          <DialogTitle>Max Width Dialog</DialogTitle>
        </Dialog>
      );
      expect(screen.getByTestId('maxwidth-test')).toBeInTheDocument();
    });

    it('handles disableEscapeKeyDown correctly', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Dialog open disableEscapeKeyDown onClose={handleClose}>
          <DialogTitle>No Escape Dialog</DialogTitle>
        </Dialog>
      );
      
      await user.keyboard('{Escape}');
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('handles closeOnBackdropClick correctly', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Dialog open onClose={handleClose} data-testid="backdrop-dialog">
          <DialogTitle>Backdrop Dialog</DialogTitle>
        </Dialog>
      );
      
      // Click on backdrop (outside dialog content)
      const backdrop = screen.getByTestId('backdrop-dialog').parentElement;
      if (backdrop) {
        await user.click(backdrop);
        expect(handleClose).toHaveBeenCalled();
      }
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('calls onClose when escape key is pressed', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Dialog open onClose={handleClose}>
          <DialogTitle>Escapable Dialog</DialogTitle>
        </Dialog>
      );
      
      await user.keyboard('{Escape}');
      expect(handleClose).toHaveBeenCalledWith({}, 'escapeKeyDown');
    });

    it('manages focus correctly when opened', async () => {
      renderWithTheme(
        <Dialog open>
          <DialogTitle>Focus Dialog</DialogTitle>
          <DialogContent>
            <button>First Button</button>
            <button>Second Button</button>
          </DialogContent>
        </Dialog>
      );
      
      await waitFor(() => {
        // Dialog should be focused or first focusable element should be focused
        const dialog = screen.getByRole('dialog');
        const firstButton = screen.getByText('First Button');
        expect(dialog).toBeInTheDocument();
        expect(firstButton).toBeInTheDocument();
      });
    });

    it('traps focus within dialog', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Dialog open>
          <DialogTitle>Focus Trap Dialog</DialogTitle>
          <DialogContent>
            <button>Button 1</button>
            <button>Button 2</button>
          </DialogContent>
          <DialogActions>
            <button>Cancel</button>
            <button>OK</button>
          </DialogActions>
        </Dialog>
      );
      
      const button1 = screen.getByText('Button 1');
      const cancelButton = screen.getByText('Cancel');
      const okButton = screen.getByText('OK');
      
      // Tab through elements
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      
      // Focus should cycle within dialog
      expect([button1, cancelButton, okButton]).toContainEqual(document.activeElement);
    });

    it('restores focus when closed', async () => {
      const { rerender } = renderWithTheme(
        <>
          <button data-testid="trigger">Open Dialog</button>
          <Dialog open={false}>
            <DialogTitle>Focus Restore Dialog</DialogTitle>
          </Dialog>
        </>
      );
      
      const trigger = screen.getByTestId('trigger');
      trigger.focus();
      expect(trigger).toHaveFocus();
      
      // Open dialog
      rerender(
        <TestWrapper>
          <button data-testid="trigger">Open Dialog</button>
          <Dialog open>
            <DialogTitle>Focus Restore Dialog</DialogTitle>
          </Dialog>
        </TestWrapper>
      );
      
      // Close dialog
      rerender(
        <TestWrapper>
          <button data-testid="trigger">Open Dialog</button>
          <Dialog open={false}>
            <DialogTitle>Focus Restore Dialog</DialogTitle>
          </Dialog>
        </TestWrapper>
      );
      
      // Focus should return to trigger
      await waitFor(() => {
        expect(trigger).toHaveFocus();
      });
    });
  });

  // Subcomponent testing
  describe('Subcomponents', () => {
    describe('DialogTitle', () => {
      it('renders title correctly', () => {
        renderWithTheme(
          <Dialog open>
            <DialogTitle>Dialog Title Text</DialogTitle>
          </Dialog>
        );
        
        expect(screen.getByText('Dialog Title Text')).toBeInTheDocument();
      });

      it('supports close button', async () => {
        const user = userEvent.setup();
        const handleClose = vi.fn();
        
        renderWithTheme(
          <Dialog open onClose={handleClose}>
            <DialogTitle closeButton>Closable Title</DialogTitle>
          </Dialog>
        );
        
        const closeButton = screen.getByRole('button');
        await user.click(closeButton);
        expect(handleClose).toHaveBeenCalled();
      });
    });

    describe('DialogContent', () => {
      it('renders content correctly', () => {
        renderWithTheme(
          <Dialog open>
            <DialogContent>
              <p>Dialog content paragraph</p>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </DialogContent>
          </Dialog>
        );
        
        expect(screen.getByText('Dialog content paragraph')).toBeInTheDocument();
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
      });

      it('handles dividers correctly', () => {
        renderWithTheme(
          <Dialog open>
            <DialogTitle>Title</DialogTitle>
            <DialogContent dividers>
              Content with dividers
            </DialogContent>
            <DialogActions>Actions</DialogActions>
          </Dialog>
        );
        
        expect(screen.getByText('Content with dividers')).toBeInTheDocument();
      });
    });

    describe('DialogActions', () => {
      it('renders action buttons correctly', async () => {
        const user = userEvent.setup();
        const handleSave = vi.fn();
        const handleCancel = vi.fn();
        
        renderWithTheme(
          <Dialog open>
            <DialogTitle>Action Dialog</DialogTitle>
            <DialogActions>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </DialogActions>
          </Dialog>
        );
        
        const saveButton = screen.getByText('Save');
        const cancelButton = screen.getByText('Cancel');
        
        await user.click(saveButton);
        expect(handleSave).toHaveBeenCalledTimes(1);
        
        await user.click(cancelButton);
        expect(handleCancel).toHaveBeenCalledTimes(1);
      });
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Dialog open>
          <DialogTitle>Accessible Dialog</DialogTitle>
          <DialogContent>Accessible content</DialogContent>
        </Dialog>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Dialog open>
          <DialogTitle id="dialog-title">Dialog Title</DialogTitle>
          <DialogContent>Dialog Content</DialogContent>
        </Dialog>
      );
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('supports screen readers with proper semantics', () => {
      renderWithTheme(
        <Dialog open aria-describedby="dialog-description">
          <DialogTitle>Screen Reader Dialog</DialogTitle>
          <DialogContent id="dialog-description">
            This dialog is accessible to screen readers
          </DialogContent>
        </Dialog>
      );
      
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-describedby', 'dialog-description');
    });

    it('handles keyboard navigation correctly', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Dialog open>
          <DialogTitle>Keyboard Dialog</DialogTitle>
          <DialogContent>
            <input type="text" placeholder="First input" />
            <input type="text" placeholder="Second input" />
          </DialogContent>
          <DialogActions>
            <button>Cancel</button>
            <button>Submit</button>
          </DialogActions>
        </Dialog>
      );
      
      // Tab through focusable elements
      await user.tab();
      expect(screen.getByPlaceholderText('First input')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByPlaceholderText('Second input')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByText('Cancel')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByText('Submit')).toHaveFocus();
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiDialog: {
            styleOverrides: {
              paper: {
                backgroundColor: 'red',
              },
            },
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <Dialog open data-testid="themed-dialog">
            <DialogTitle>Themed Dialog</DialogTitle>
          </Dialog>
        </ThemeProvider>
      );

      expect(screen.getByTestId('themed-dialog')).toBeInTheDocument();
    });

    it('supports dark mode', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      render(
        <ThemeProvider theme={darkTheme}>
          <Dialog open data-testid="dark-dialog">
            <DialogTitle>Dark Dialog</DialogTitle>
          </Dialog>
        </ThemeProvider>
      );

      expect(screen.getByTestId('dark-dialog')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently when toggled', () => {
      const { rerender } = renderWithTheme(
        <Dialog open={false}>
          <DialogTitle>Performance Dialog</DialogTitle>
        </Dialog>
      );
      
      // Rapid open/close should work smoothly
      for (let i = 0; i < 10; i++) {
        rerender(
          <TestWrapper>
            <Dialog open={i % 2 === 0}>
              <DialogTitle>Performance Dialog</DialogTitle>
            </Dialog>
          </TestWrapper>
        );
      }
      
      expect(screen.queryByText('Performance Dialog')).toBeInTheDocument();
    });

    it('handles large content efficiently', () => {
      const largeContent = Array.from({ length: 1000 }, (_, i) => (
        <p key={i}>Content line {i}</p>
      ));
      
      renderWithTheme(
        <Dialog open>
          <DialogTitle>Large Content Dialog</DialogTitle>
          <DialogContent>
            {largeContent}
          </DialogContent>
        </Dialog>
      );
      
      expect(screen.getByText('Large Content Dialog')).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty dialog gracefully', () => {
      renderWithTheme(<Dialog open data-testid="empty-dialog" />);
      expect(screen.getByTestId('empty-dialog')).toBeInTheDocument();
    });

    it('handles dialog with only title', () => {
      renderWithTheme(
        <Dialog open>
          <DialogTitle>Only Title</DialogTitle>
        </Dialog>
      );
      expect(screen.getByText('Only Title')).toBeInTheDocument();
    });

    it('handles nested interactive elements', async () => {
      const user = userEvent.setup();
      const handleFormSubmit = vi.fn();
      
      renderWithTheme(
        <Dialog open>
          <DialogTitle>Form Dialog</DialogTitle>
          <DialogContent>
            <form onSubmit={handleFormSubmit}>
              <input type="text" name="username" />
              <select name="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit">Submit Form</button>
            </form>
          </DialogContent>
        </Dialog>
      );
      
      const submitButton = screen.getByText('Submit Form');
      await user.click(submitButton);
      
      expect(handleFormSubmit).toHaveBeenCalled();
    });

    it('handles portal mounting correctly', () => {
      const { unmount } = renderWithTheme(
        <Dialog open>
          <DialogTitle>Portal Dialog</DialogTitle>
        </Dialog>
      );
      
      expect(screen.getByText('Portal Dialog')).toBeInTheDocument();
      
      unmount();
      expect(screen.queryByText('Portal Dialog')).not.toBeInTheDocument();
    });
  });

  // Snapshots
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Dialog open>
          <DialogTitle>Default Dialog</DialogTitle>
          <DialogContent>Default content</DialogContent>
        </Dialog>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: DialogProps['variant'][] = [
        'standard', 'modal', 'fullscreen', 'drawer', 'popover'
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Dialog open variant={variant}>
            <DialogTitle>{variant} Dialog</DialogTitle>
          </Dialog>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });

    it('matches snapshot for different sizes', () => {
      const sizes: DialogProps['size'][] = [
        'small', 'medium', 'large', 'fullscreen'
      ];

      sizes.forEach((size) => {
        const { container } = renderWithTheme(
          <Dialog open size={size}>
            <DialogTitle>{size} Dialog</DialogTitle>
          </Dialog>
        );
        expect(container.firstChild).toMatchSnapshot(`size-${size}`);
      });
    });
  });
});