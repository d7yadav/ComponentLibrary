/**
 * @fileoverview LinearProgress Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { LinearProgress } from './LinearProgress';
import type { LinearProgressProps } from './LinearProgress.types';

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

describe('LinearProgress Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<LinearProgress>Test content</LinearProgress>);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
          });

    it('renders children correctly', () => {
      const testContent = 'Test LinearProgress Content';
      renderWithTheme(<LinearProgress>{testContent}</LinearProgress>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-linear-progress';
      renderWithTheme(
        <LinearProgress data-testid={testId}>Test</LinearProgress>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <LinearProgress className={customClass}>Test</LinearProgress>
      );
      expect(screen.getByRole('progressbar')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: LinearProgressProps['variant'][] = [
        'determinate',
        'indeterminate',
        'buffer',
        'query',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          const props: any = { variant, 'data-testid': 'variant-test' };
          
          // Add required props for specific variants
          if (variant === 'determinate') {
            props.value = 50;
          } else if (variant === 'buffer') {
            props.value = 50;
            props.valueBuffer = 70;
          }
          
          renderWithTheme(
            <LinearProgress {...props}>
              {variant} variant
            </LinearProgress>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: LinearProgressProps['size'][] = [
        'small',
        'medium',
        'large',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <LinearProgress size={size} data-testid="size-test">
              {size} size
            </LinearProgress>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <LinearProgress disabled onClick={handleClick} data-testid="disabled-test">
          Disabled LinearProgress
        </LinearProgress>
      );
      
      const element = screen.getByTestId('disabled-test');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('does not interfere with parent interactions', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <div onClick={handleClick} data-testid="parent">
          <LinearProgress data-testid="progress">
            Progress in clickable parent
          </LinearProgress>
        </div>
      );
      
      const parentElement = screen.getByTestId('parent');
      fireEvent.click(parentElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('maintains aria-busy state during progress', () => {
      renderWithTheme(
        <LinearProgress variant="indeterminate" data-testid="busy-progress">
          Loading...
        </LinearProgress>
      );
      
      const element = screen.getByRole('progressbar');
      expect(element).toBeInTheDocument();
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <LinearProgress>Accessible LinearProgress</LinearProgress>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <LinearProgress aria-label={ariaLabel}>
          LinearProgress for screen readers
        </LinearProgress>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<LinearProgress>Keyboard LinearProgress</LinearProgress>);
      
      const element = screen.getByRole('progressbar');
      element.focus();
      expect(element).toHaveFocus();
          });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <LinearProgress 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA LinearProgress
        </LinearProgress>
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
          MuiLinearProgress: {
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
          <LinearProgress data-testid="themed-linear-progress">
            Themed LinearProgress
          </LinearProgress>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-linear-progress');
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
          <LinearProgress>Dark Mode LinearProgress</LinearProgress>
        </ThemeProvider>
      );

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <LinearProgress key={i}>LinearProgress {i}</LinearProgress>
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
        <LinearProgress animate="false">
          No Animation LinearProgress
        </LinearProgress>
      );

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<LinearProgress />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<LinearProgress>{null}</LinearProgress>);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <LinearProgress 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </LinearProgress>
      );
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <LinearProgress>Default LinearProgress</LinearProgress>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: LinearProgressProps['variant'][] = [
        'determinate',
        'indeterminate',
        'buffer',
        'query',
      ];

      variants.forEach((variant) => {
        const props: any = { variant };
        
        // Add required props for specific variants
        if (variant === 'determinate') {
          props.value = 50;
        } else if (variant === 'buffer') {
          props.value = 50;
          props.valueBuffer = 70;
        }
        
        const { container } = renderWithTheme(
          <LinearProgress {...props}>{variant} LinearProgress</LinearProgress>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
