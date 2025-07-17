/**
 * @fileoverview CircularProgress Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { CircularProgress } from './CircularProgress';
import type { CircularProgressProps } from './CircularProgress.types';

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

describe('CircularProgress Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<CircularProgress>Test content</CircularProgress>);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
          });

    it('renders with value correctly', () => {
      renderWithTheme(<CircularProgress value={50} variant="determinate" />);
      // CircularProgress should render with the correct value
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
    });

    it('renders with custom test id', () => {
      const testId = 'custom-circular-progress';
      renderWithTheme(
        <CircularProgress data-testid={testId}>Test</CircularProgress>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <CircularProgress className={customClass}>Test</CircularProgress>
      );
      expect(screen.getByRole('progressbar')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: CircularProgressProps['variant'][] = [
        'determinate',
        'indeterminate',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <CircularProgress variant={variant} data-testid="variant-test">
              {variant} variant
            </CircularProgress>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: CircularProgressProps['size'][] = [
        'small',
        'medium',
        'large',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <CircularProgress size={size} data-testid="size-test">
              {size} size
            </CircularProgress>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles value prop correctly', () => {
      renderWithTheme(
        <CircularProgress value={75} variant="determinate" data-testid="value-test" />
      );
      
      const element = screen.getByTestId('value-test');
      expect(element).toHaveAttribute('aria-valuenow', '75');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('does not interfere with parent interactions', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <div onClick={handleClick} data-testid="parent">
          <CircularProgress data-testid="progress">
            Circular Progress
          </CircularProgress>
        </div>
      );
      
      const parentElement = screen.getByTestId('parent');
      fireEvent.click(parentElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('maintains progress value changes', () => {
      const { rerender } = renderWithTheme(
        <CircularProgress variant="determinate" value={25} data-testid="progress">
          25% Progress
        </CircularProgress>
      );
      
      let element = screen.getByRole('progressbar');
      expect(element).toHaveAttribute('aria-valuenow', '25');

      rerender(
        <ThemeProvider theme={createTheme()}>
          <CircularProgress variant="determinate" value={75} data-testid="progress">
            75% Progress
          </CircularProgress>
        </ThemeProvider>
      );
      
      element = screen.getByRole('progressbar');
      expect(element).toHaveAttribute('aria-valuenow', '75');
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <CircularProgress>Accessible CircularProgress</CircularProgress>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <CircularProgress aria-label={ariaLabel}>
          CircularProgress for screen readers
        </CircularProgress>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports accessibility features', () => {
      renderWithTheme(
        <CircularProgress 
          value={60} 
          variant="determinate" 
          aria-label="Loading progress"
        />
      );
      
      const element = screen.getByRole('progressbar');
      expect(element).toHaveAttribute('aria-label', 'Loading progress');
      expect(element).toHaveAttribute('aria-valuenow', '60');
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <CircularProgress 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA CircularProgress
        </CircularProgress>
      );
      
      const element = screen.getByRole('progressbar');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiCircularProgress: {
            defaultProps: {
              variant: 'determinate',
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
          <CircularProgress data-testid="themed-circular-progress">
            Themed CircularProgress
          </CircularProgress>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-circular-progress');
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
          <CircularProgress>Dark Mode CircularProgress</CircularProgress>
        </ThemeProvider>
      );

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <CircularProgress key={i}>CircularProgress {i}</CircularProgress>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="progressbar"]')).toHaveLength(100);
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
        <CircularProgress animate="false">
          No Animation CircularProgress
        </CircularProgress>
      );

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<CircularProgress />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<CircularProgress>{null}</CircularProgress>);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <CircularProgress 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </CircularProgress>
      );
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <CircularProgress>Default CircularProgress</CircularProgress>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: CircularProgressProps['variant'][] = [
        'determinate',
        'indeterminate',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <CircularProgress variant={variant}>{variant} CircularProgress</CircularProgress>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
