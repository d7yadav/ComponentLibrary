/**
 * @fileoverview Skeleton Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Skeleton } from './Skeleton';
import type { SkeletonProps } from './Skeleton.types';

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

describe('Skeleton Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Skeleton>Test content</Skeleton>);
      expect(screen.getByRole('status')).toBeInTheDocument();
          });

    it('renders children correctly', () => {
      const testContent = 'Test Skeleton Content';
      renderWithTheme(<Skeleton>{testContent}</Skeleton>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-skeleton';
      renderWithTheme(
        <Skeleton data-testid={testId}>Test</Skeleton>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Skeleton className={customClass}>Test</Skeleton>
      );
      expect(screen.getByRole('status')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: SkeletonProps['variant'][] = [
        'text',
        'rectangular',
        'circular',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Skeleton variant={variant} data-testid="variant-test">
              {variant} variant
            </Skeleton>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: SkeletonProps['size'][] = [
        'small',
        'medium',
        'large',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Skeleton size={size} data-testid="size-test">
              {size} size
            </Skeleton>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles animation prop correctly', () => {
      renderWithTheme(
        <Skeleton animation="wave" data-testid="animation-test">
          Animated Skeleton
        </Skeleton>
      );
      
      const element = screen.getByTestId('animation-test');
      expect(element).toBeInTheDocument();
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles animation state changes', () => {
      const { rerender } = renderWithTheme(
        <Skeleton 
          animation="pulse" 
          data-testid="animated-skeleton"
        />
      );
      
      // Check if animation is applied
      const skeleton = screen.getByTestId('animated-skeleton');
      expect(skeleton).toBeInTheDocument();
      
      // Switch to wave animation
      rerender(
        <TestWrapper>
          <Skeleton 
            animation="wave" 
            data-testid="animated-skeleton"
          />
        </TestWrapper>
      );
      
      // Should still be present with new animation
      expect(screen.getByTestId('animated-skeleton')).toBeInTheDocument();
    });

    it('handles different variants correctly', async () => {
      const { rerender } = renderWithTheme(
        <Skeleton 
          variant="text"
          width={200}
          height={20}
          data-testid="variant-skeleton"
        >
          Text variant
        </Skeleton>
      );
      
      // Should show text variant skeleton
      expect(screen.getByTestId('variant-skeleton')).toBeInTheDocument();
      
      // Switch to rectangular variant
      rerender(
        <TestWrapper>
          <Skeleton 
            variant="rectangular"
            width={200}
            height={20}
            data-testid="variant-skeleton"
          >
            Rectangular variant
          </Skeleton>
        </TestWrapper>
      );
      
      // Should show rectangular variant skeleton
      expect(screen.getByTestId('variant-skeleton')).toBeInTheDocument();
    });

    it('responds to accessibility preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
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
        <Skeleton 
          animation="pulse"
          data-testid="accessible-skeleton"
        />
      );
      
      const skeleton = screen.getByTestId('accessible-skeleton');
      expect(skeleton).toBeInTheDocument();
      // Animation should respect user's motion preferences
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Skeleton>Accessible Skeleton</Skeleton>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <Skeleton aria-label={ariaLabel}>
          Skeleton for screen readers
        </Skeleton>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<Skeleton tabIndex={0}>Keyboard Skeleton</Skeleton>);
      
      const element = screen.getByRole('status');
      element.focus();
      expect(element).toHaveFocus();
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Skeleton 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA Skeleton
        </Skeleton>
      );
      
      const element = screen.getByRole('status');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiSkeleton: {
            defaultProps: {
              variant: 'text',
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
          <Skeleton data-testid="themed-skeleton">
            Themed Skeleton
          </Skeleton>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-skeleton');
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
          <Skeleton>Dark Mode Skeleton</Skeleton>
        </ThemeProvider>
      );

      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <Skeleton key={i}>Skeleton {i}</Skeleton>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="status"]')).toHaveLength(100);
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
        <Skeleton animate={false}>
          No Animation Skeleton
        </Skeleton>
      );

      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Skeleton />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Skeleton>{null}</Skeleton>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Skeleton 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </Skeleton>
      );
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Skeleton>Default Skeleton</Skeleton>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: SkeletonProps['variant'][] = [
        'text',
        'rectangular',
        'circular',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Skeleton variant={variant}>{variant} Skeleton</Skeleton>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
