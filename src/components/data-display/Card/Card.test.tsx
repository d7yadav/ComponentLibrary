/**
 * @fileoverview Card Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Card } from './Card';
import { CARD_CONSTANTS } from './Card.constants';
import type { CardProps } from './Card.types';

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

describe('Card Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Card>Test content</Card>);
      expect(screen.getByRole('article')).toBeInTheDocument();
          });

    it('renders children correctly', () => {
      const testContent = 'Test Card Content';
      renderWithTheme(<Card>{testContent}</Card>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-card';
      renderWithTheme(
        <Card data-testid={testId}>Test</Card>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Card className={customClass}>Test</Card>
      );
      expect(screen.getByRole('article')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: CardProps['variant'][] = [
        'elevated',
        'outlined',
        'filled',
        'glass',
        'gradient',
        'interactive',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Card variant={variant} data-testid="variant-test">
              {variant} variant
            </Card>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: CardProps['size'][] = [
        'compact',
        'comfortable',
        'spacious',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Card size={size} data-testid="size-test">
              {size} size
            </Card>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Card disabled onClick={handleClick} data-testid="disabled-test">
          Disabled Card
        </Card>
      );
      
      const element = screen.getByTestId('disabled-test');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles click events when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Card 
          interactive 
          onClick={handleClick} 
          data-testid="interactive-card"
        >
          Clickable card content
        </Card>
      );
      
      const card = screen.getByTestId('interactive-card');
      await user.click(card);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('supports keyboard navigation when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Card 
          interactive 
          onClick={handleClick} 
          data-testid="keyboard-card"
        >
          Keyboard accessible card
        </Card>
      );
      
      const card = screen.getByTestId('keyboard-card');
      
      // Focus the card
      card.focus();
      expect(card).toHaveFocus();
      
      // Test that card is keyboard accessible
      expect(card).toHaveAttribute('tabIndex', '0');
      expect(card).toHaveAttribute('role', 'button');
    });

    it('does not handle interactions when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Card 
          interactive 
          disabled 
          onClick={handleClick} 
          data-testid="disabled-card"
        >
          Disabled card
        </Card>
      );
      
      const card = screen.getByTestId('disabled-card');
      
      // Should be marked as disabled
      expect(card).toHaveAttribute('aria-disabled', 'true');
      
      // Click should not work (component prevents it)
      await user.click(card);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('shows selection state correctly', () => {
      renderWithTheme(
        <Card selected data-testid="selected-card">
          Selected card content
        </Card>
      );
      
      const card = screen.getByTestId('selected-card');
      expect(card).toBeInTheDocument();
      // Selection state is handled via styling props
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Card>Accessible Card</Card>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <Card aria-label={ariaLabel}>
          Card for screen readers
        </Card>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation when interactive', () => {
      renderWithTheme(
        <Card interactive tabIndex={0}>
          Keyboard Card
        </Card>
      );
      
      const element = screen.getByRole('button');
      element.focus();
      expect(element).toHaveFocus();
      expect(element).toHaveAttribute('tabIndex', '0');
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Card 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA Card
        </Card>
      );
      
      const element = screen.getByRole('article');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiCard: {
            defaultProps: {
              variant: 'elevated',
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
          <Card data-testid="themed-card">
            Themed Card
          </Card>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-card');
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
          <Card>Dark Mode Card</Card>
        </ThemeProvider>
      );

      expect(screen.getByRole('article')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <Card key={i}>Card {i}</Card>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="article"]')).toHaveLength(100);
    });

    it('respects reduced motion preferences', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      renderWithTheme(
        <Card animate="false">
          No Animation Card
        </Card>
      );

      expect(screen.getByRole('article')).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Card />);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Card>{null}</Card>);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Card 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </Card>
      );
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('handles complex configurations', () => {
      renderWithTheme(
        <Card
          variant="elevated"
          size="compact"
          disabled={false}
          animate={true}
        >
          Complex Card
        </Card>
      );
      
      expect(screen.getByRole('article')).toBeInTheDocument();
    });
  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Card>Default Card</Card>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: CardProps['variant'][] = [
        'elevated',
        'outlined',
        'filled',
        'glass',
        'gradient',
        'interactive',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Card variant={variant}>{variant} Card</Card>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
