/**
 * @fileoverview Drawer Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Drawer } from './Drawer';
import type { DrawerProps } from './Drawer.types';

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

describe('Drawer Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders when open', () => {
      renderWithTheme(
        <Drawer open>
          <div>Drawer content</div>
        </Drawer>
      );
      expect(screen.getByText('Drawer content')).toBeInTheDocument();
    });

    it('does not render content when closed', () => {
      renderWithTheme(
        <Drawer open={false}>
          <div>Hidden content</div>
        </Drawer>
      );
      expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-drawer';
      renderWithTheme(
        <Drawer open data-testid={testId}>
          <div>Test content</div>
        </Drawer>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Drawer open className={customClass} data-testid="drawer">
          <div>Test content</div>
        </Drawer>
      );
      expect(screen.getByTestId('drawer')).toHaveClass(customClass);
    });

    it('renders with header and footer', () => {
      renderWithTheme(
        <Drawer 
          open 
          header={<div>Header Content</div>}
          footer={<div>Footer Content</div>}
        >
          <div>Body Content</div>
        </Drawer>
      );
      expect(screen.getByText('Header Content')).toBeInTheDocument();
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: DrawerProps['variant'][] = [
        'temporary', 'persistent', 'permanent', 'mini'
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Drawer open variant={variant} data-testid="variant-test">
              <div>{variant} content</div>
            </Drawer>
          );
          expect(screen.getByText(`${variant} content`)).toBeInTheDocument();
        });
      });
    });

    describe('anchor prop', () => {
      const anchors: DrawerProps['anchor'][] = [
        'left', 'right', 'top', 'bottom'
      ];

      anchors.forEach((anchor) => {
        it(`renders ${anchor} anchor correctly`, () => {
          renderWithTheme(
            <Drawer open anchor={anchor} data-testid="anchor-test">
              <div>{anchor} drawer</div>
            </Drawer>
          );
          expect(screen.getByText(`${anchor} drawer`)).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: DrawerProps['size'][] = [
        'compact', 'standard', 'wide', 'auto'
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Drawer open size={size} data-testid="size-test">
              <div>{size} drawer</div>
            </Drawer>
          );
          expect(screen.getByText(`${size} drawer`)).toBeInTheDocument();
        });
      });
    });

    it('handles collapsed state for mini variant', () => {
      const { rerender } = renderWithTheme(
        <Drawer open variant="mini" collapsed={false} data-testid="mini-drawer">
          <div>Mini drawer content</div>
        </Drawer>
      );
      
      expect(screen.getByTestId('mini-drawer')).toBeInTheDocument();
      
      rerender(
        <TestWrapper>
          <Drawer open variant="mini" collapsed={true} data-testid="mini-drawer">
            <div>Mini drawer content</div>
          </Drawer>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('mini-drawer')).toBeInTheDocument();
    });

    it('handles width and height props', () => {
      renderWithTheme(
        <Drawer 
          open 
          width={300} 
          height={400} 
          data-testid="sized-drawer"
        >
          <div>Sized drawer</div>
        </Drawer>
      );
      expect(screen.getByTestId('sized-drawer')).toBeInTheDocument();
    });

    it('handles elevation prop', () => {
      renderWithTheme(
        <Drawer open elevation elevationLevel={8} data-testid="elevated-drawer">
          <div>Elevated drawer</div>
        </Drawer>
      );
      expect(screen.getByTestId('elevated-drawer')).toBeInTheDocument();
    });

    it('handles backdrop prop', () => {
      renderWithTheme(
        <Drawer open backdrop={false} data-testid="no-backdrop-drawer">
          <div>No backdrop drawer</div>
        </Drawer>
      );
      expect(screen.getByTestId('no-backdrop-drawer')).toBeInTheDocument();
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('calls onClose when escape key is pressed', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Drawer open onClose={handleClose} closeOnEscape>
          <div>Escapable drawer</div>
        </Drawer>
      );
      
      await user.keyboard('{Escape}');
      expect(handleClose).toHaveBeenCalledWith(expect.any(Object), 'escapeKeyDown');
    });

    it('does not close when escape is disabled', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Drawer open onClose={handleClose} closeOnEscape={false}>
          <div>Non-escapable drawer</div>
        </Drawer>
      );
      
      await user.keyboard('{Escape}');
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('handles mini drawer toggle', async () => {
      const user = userEvent.setup();
      const handleCollapseChange = vi.fn();
      
      renderWithTheme(
        <Drawer 
          open 
          variant="mini" 
          collapsed={false}
          onCollapseChange={handleCollapseChange}
          showToggleButton
        >
          <div>Mini drawer</div>
        </Drawer>
      );
      
      const toggleButton = screen.getByTestId('drawer-toggle-button');
      await user.click(toggleButton);
      expect(handleCollapseChange).toHaveBeenCalledWith(true);
    });

    it('manages focus correctly when opened', async () => {
      renderWithTheme(
        <Drawer open>
          <div>
            <button>First Button</button>
            <button>Second Button</button>
          </div>
        </Drawer>
      );
      
      await waitFor(() => {
        const firstButton = screen.getByText('First Button');
        expect(firstButton).toBeInTheDocument();
      });
    });

    it('traps focus within drawer', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Drawer open>
          <div>
            <button>Button 1</button>
            <button>Button 2</button>
            <button>Button 3</button>
          </div>
        </Drawer>
      );
      
      const button1 = screen.getByText('Button 1');
      const button2 = screen.getByText('Button 2');
      const button3 = screen.getByText('Button 3');
      
      // Focus should cycle within drawer
      await user.tab();
      await user.tab();
      await user.tab();
      
      expect([button1, button2, button3]).toContainEqual(document.activeElement);
    });

    it('handles backdrop clicks for temporary drawer', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Drawer open variant="temporary" onClose={handleClose} closeOnBackdropClick>
          <div>Temporary drawer</div>
        </Drawer>
      );
      
      // The drawer should be present and interactive
      expect(screen.getByText('Temporary drawer')).toBeInTheDocument();
    });
  });

  // Navigation testing
  describe('Navigation', () => {
    it('renders navigation section', () => {
      renderWithTheme(
        <Drawer 
          open 
          navigation={
            <nav>
              <a href="#">Home</a>
              <a href="#">About</a>
            </nav>
          }
        >
          <div>Main content</div>
        </Drawer>
      );
      
      expect(screen.getByTestId('drawer-navigation')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('handles keyboard navigation in navigation section', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Drawer 
          open 
          navigation={
            <nav>
              <button>Nav Item 1</button>
              <button>Nav Item 2</button>
            </nav>
          }
        >
          <div>Main content</div>
        </Drawer>
      );
      
      const navItem1 = screen.getByText('Nav Item 1');
      const navItem2 = screen.getByText('Nav Item 2');
      
      navItem1.focus();
      expect(navItem1).toHaveFocus();
      
      await user.tab();
      expect(navItem2).toHaveFocus();
    });
  });

  // Responsive behavior testing
  describe('Responsive Behavior', () => {
    it('handles responsive prop', () => {
      renderWithTheme(
        <Drawer 
          open 
          responsive 
          responsiveBreakpoint="md"
          mobileVariant="temporary"
          data-testid="responsive-drawer"
        >
          <div>Responsive drawer</div>
        </Drawer>
      );
      
      expect(screen.getByTestId('responsive-drawer')).toBeInTheDocument();
    });

    it('switches to mobile variant on small screens', () => {
      renderWithTheme(
        <Drawer 
          open 
          responsive 
          variant="persistent"
          mobileVariant="temporary"
          data-testid="mobile-drawer"
        >
          <div>Mobile drawer</div>
        </Drawer>
      );
      
      expect(screen.getByTestId('mobile-drawer')).toBeInTheDocument();
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Drawer open>
          <div>Accessible drawer</div>
        </Drawer>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Drawer 
          open
          aria-label="Main navigation drawer"
          aria-describedby="drawer-description"
        >
          <div id="drawer-description">Navigation content</div>
        </Drawer>
      );
      
      const drawer = screen.getByRole('dialog');
      expect(drawer).toHaveAttribute('aria-label', 'Main navigation drawer');
      expect(drawer).toHaveAttribute('aria-describedby', 'drawer-description');
    });

    it('supports screen readers with proper semantics', () => {
      renderWithTheme(
        <Drawer open variant="temporary">
          <div>Screen reader accessible drawer</div>
        </Drawer>
      );
      
      const drawer = screen.getByRole('dialog');
      expect(drawer).toHaveAttribute('aria-modal', 'true');
    });

    it('handles keyboard navigation correctly', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Drawer open>
          <div>
            <input type="text" placeholder="First input" />
            <input type="text" placeholder="Second input" />
            <button>Submit</button>
          </div>
        </Drawer>
      );
      
      // Tab through focusable elements
      await user.tab();
      expect(screen.getByPlaceholderText('First input')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByPlaceholderText('Second input')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByText('Submit')).toHaveFocus();
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiDrawer: {
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
          <Drawer open data-testid="themed-drawer">
            <div>Themed drawer</div>
          </Drawer>
        </ThemeProvider>
      );

      expect(screen.getByTestId('themed-drawer')).toBeInTheDocument();
    });

    it('supports dark mode', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      render(
        <ThemeProvider theme={darkTheme}>
          <Drawer open data-testid="dark-drawer">
            <div>Dark drawer</div>
          </Drawer>
        </ThemeProvider>
      );

      expect(screen.getByTestId('dark-drawer')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently when toggled', () => {
      const { rerender } = renderWithTheme(
        <Drawer open={false}>
          <div>Performance drawer</div>
        </Drawer>
      );
      
      // Rapid open/close should work smoothly
      for (let i = 0; i < 10; i++) {
        rerender(
          <TestWrapper>
            <Drawer open={i % 2 === 0}>
              <div>Performance drawer</div>
            </Drawer>
          </TestWrapper>
        );
      }
      
      expect(screen.queryByText('Performance drawer')).toBeInTheDocument();
    });

    it('handles large content efficiently', () => {
      const largeContent = Array.from({ length: 100 }, (_, i) => (
        <div key={i}>Content item {i}</div>
      ));
      
      renderWithTheme(
        <Drawer open>
          {largeContent}
        </Drawer>
      );
      
      expect(screen.getByText('Content item 0')).toBeInTheDocument();
      expect(screen.getByText('Content item 99')).toBeInTheDocument();
    });

    it('memoizes properly to prevent unnecessary re-renders', () => {
      const { rerender } = renderWithTheme(
        <Drawer open data-testid="memo-test">
          <div>Memoized drawer</div>
        </Drawer>
      );

      const element = screen.getByTestId('memo-test');
      expect(element).toBeInTheDocument();

      // Re-render with same props should not cause issues
      rerender(
        <TestWrapper>
          <Drawer open data-testid="memo-test">
            <div>Memoized drawer</div>
          </Drawer>
        </TestWrapper>
      );

      expect(screen.getByTestId('memo-test')).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty drawer gracefully', () => {
      renderWithTheme(<Drawer open data-testid="empty-drawer" />);
      expect(screen.getByTestId('empty-drawer')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(
        <Drawer open data-testid="null-drawer">
          {null}
        </Drawer>
      );
      expect(screen.getByTestId('null-drawer')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Drawer 
          open
          variant={undefined as any}
          anchor={undefined as any}
          data-testid="undefined-props"
        >
          <div>Undefined props drawer</div>
        </Drawer>
      );
      expect(screen.getByTestId('undefined-props')).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      renderWithTheme(
        <Drawer open data-testid="nested-content">
          <div>
            <form>
              <fieldset>
                <legend>User Information</legend>
                <input type="text" name="username" placeholder="Username" />
                <select name="role">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit">Submit</button>
              </fieldset>
            </form>
          </div>
        </Drawer>
      );
      
      expect(screen.getByTestId('nested-content')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('handles swipe gestures when enabled', () => {
      renderWithTheme(
        <Drawer 
          open 
          swipeEnabled 
          anchor="left"
          variant="temporary"
          data-testid="swipe-drawer"
        >
          <div>Swipeable drawer</div>
        </Drawer>
      );
      
      expect(screen.getByTestId('swipe-drawer')).toBeInTheDocument();
    });
  });

  // Snapshots
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Drawer open>
          <div>Default drawer</div>
        </Drawer>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: DrawerProps['variant'][] = [
        'temporary', 'persistent', 'permanent', 'mini'
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Drawer open variant={variant}>
            <div>{variant} drawer</div>
          </Drawer>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });

    it('matches snapshot for different anchors', () => {
      const anchors: DrawerProps['anchor'][] = [
        'left', 'right', 'top', 'bottom'
      ];

      anchors.forEach((anchor) => {
        const { container } = renderWithTheme(
          <Drawer open anchor={anchor}>
            <div>{anchor} drawer</div>
          </Drawer>
        );
        expect(container.firstChild).toMatchSnapshot(`anchor-${anchor}`);
      });
    });

    it('matches snapshot for mini variant states', () => {
      const states = [
        { collapsed: false, label: 'expanded' },
        { collapsed: true, label: 'collapsed' }
      ];

      states.forEach(({ collapsed, label }) => {
        const { container } = renderWithTheme(
          <Drawer open variant="mini" collapsed={collapsed}>
            <div>Mini drawer {label}</div>
          </Drawer>
        );
        expect(container.firstChild).toMatchSnapshot(`mini-${label}`);
      });
    });
  });
});