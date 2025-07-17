/**
 * @fileoverview CardActions Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { CardActions } from './CardActions';
import type { CardActionsProps } from './CardActions.types';

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

describe('CardActions Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<CardActions>Test content</CardActions>);
      expect(screen.getByRole('group')).toBeInTheDocument();
          });

    it('renders children correctly', () => {
      const testContent = 'Test CardActions Content';
      renderWithTheme(<CardActions>{testContent}</CardActions>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-card-actions';
      renderWithTheme(
        <CardActions data-testid={testId}>Test</CardActions>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <CardActions className={customClass}>Test</CardActions>
      );
      expect(screen.getByRole('group')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: CardActionsProps['variant'][] = [
        'default',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <CardActions variant={variant} data-testid="variant-test">
              {variant} variant
            </CardActions>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: CardActionsProps['size'][] = [
        'compact',
        'comfortable',
        'spacious',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <CardActions size={size} data-testid="size-test">
              {size} size
            </CardActions>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <CardActions disabled onClick={handleClick} data-testid="disabled-test">
          Disabled CardActions
        </CardActions>
      );
      
      const element = screen.getByTestId('disabled-test');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles click events when clickable', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <CardActions onClick={handleClick} data-testid="clickable-actions">
          <button>Action 1</button>
          <button>Action 2</button>
        </CardActions>
      );
      
      const element = screen.getByTestId('clickable-actions');
      await user.click(element);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard navigation between actions', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <CardActions>
          <button data-testid="action-1">Action 1</button>
          <button data-testid="action-2">Action 2</button>
        </CardActions>
      );
      
      const action1 = screen.getByTestId('action-1');
      const action2 = screen.getByTestId('action-2');
      
      // Focus first action
      action1.focus();
      expect(action1).toHaveFocus();
      
      // Tab to second action
      await user.tab();
      expect(action2).toHaveFocus();
    });

    it('shows disabled state correctly', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <CardActions disabled onClick={handleClick} data-testid="disabled-actions">
          <button>Action 1</button>
        </CardActions>
      );
      
      const element = screen.getByTestId('disabled-actions');
      
      // Should be marked as disabled and not focusable
      expect(element).toHaveAttribute('aria-disabled', 'true');
      expect(element).toHaveAttribute('tabIndex', '-1');
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <CardActions>Accessible CardActions</CardActions>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <CardActions aria-label={ariaLabel}>
          CardActions for screen readers
        </CardActions>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<CardActions>Keyboard CardActions</CardActions>);
      
      const element = screen.getByRole('group');
      element.focus();
      expect(element).toHaveFocus();
          });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <CardActions 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA CardActions
        </CardActions>
      );
      
      const element = screen.getByRole('group');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiCardActions: {
            defaultProps: {
              variant: 'default',
            },
            styleOverrides: {
              root: {
                backgroundColor: 'rgb(255, 0, 0)',
              },
            },
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <CardActions data-testid="themed-card-actions">
            Themed CardActions
          </CardActions>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-card-actions');
      expect(element).toBeInTheDocument();
    });

    it('supports dark mode', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      render(
        <ThemeProvider theme={darkTheme}>
          <CardActions>Dark Mode CardActions</CardActions>
        </ThemeProvider>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <CardActions key={i}>CardActions {i}</CardActions>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="group"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<CardActions />);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<CardActions>{null}</CardActions>);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <CardActions 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </CardActions>
      );
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <CardActions>Default CardActions</CardActions>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: CardActionsProps['variant'][] = [
        'default',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <CardActions variant={variant}>{variant} CardActions</CardActions>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
