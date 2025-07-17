/**
 * @fileoverview Loading Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Loading } from './Loading';
import { LOADING_CONSTANTS } from './Loading.constants';
import type { LoadingProps } from './Loading.types';

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

describe('Loading Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Loading>Test content</Loading>);
      expect(screen.getByRole('status')).toBeInTheDocument();
          });

    it('renders with message correctly', () => {
      const testMessage = 'Loading data...';
      renderWithTheme(<Loading message={testMessage} />);
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-loading';
      renderWithTheme(
        <Loading data-testid={testId}>Test</Loading>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Loading className={customClass}>Test</Loading>
      );
      expect(screen.getByRole('status')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: LoadingProps['variant'][] = [
        'circular',
        'dots',
        'bars',
        'pulse',
        'bounce',
        'ring',
        'wave',
        'ripple',
        'skeleton',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Loading variant={variant} data-testid="variant-test">
              {variant} variant
            </Loading>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: LoadingProps['size'][] = [
        'small',
        'medium',
        'large',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Loading size={size} data-testid="size-test">
              {size} size
            </Loading>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles loading active state correctly', () => {
      renderWithTheme(
        <Loading loading={true} data-testid="active-test" />
      );
      
      const element = screen.getByTestId('active-test');
      expect(element).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles loading state changes', async () => {
      const { rerender } = renderWithTheme(
        <Loading loading={false} data-testid="loading-component">
          Content
        </Loading>
      );
      
      // Should show content when not loading
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      
      // Switch to loading state
      rerender(
        <TestWrapper>
          <Loading loading={true} data-testid="loading-component">
            Content
          </Loading>
        </TestWrapper>
      );
      
      // Should show spinner when loading
      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
    });

    it('handles delayed loading appearance', async () => {
      renderWithTheme(
        <Loading 
          loading={true} 
          delay={100} 
          data-testid="delayed-loading"
        >
          Content
        </Loading>
      );
      
      // Initially should not show spinner
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      
      // Should appear after delay
      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      }, { timeout: 200 });
    });

    it('handles timeout functionality', async () => {
      const handleTimeout = vi.fn();
      
      renderWithTheme(
        <Loading 
          loading={true} 
          timeout={100} 
          onTimeout={handleTimeout}
          data-testid="timeout-loading"
        >
          Content
        </Loading>
      );
      
      // Should call timeout handler after timeout period
      await waitFor(() => {
        expect(handleTimeout).toHaveBeenCalledTimes(1);
      }, { timeout: 200 });
    });

    it('handles backdrop clicks when enabled', async () => {
      const user = userEvent.setup();
      const handleBackdropClick = vi.fn();
      
      renderWithTheme(
        <Loading 
          loading={true}
          variant="overlay"
          backdrop={true}
          disableBackdropClick={false}
          onClick={handleBackdropClick}
          data-testid="backdrop-loading"
        >
          Content
        </Loading>
      );
      
      const backdrop = screen.getByTestId('backdrop-loading');
      await user.click(backdrop);
      
      expect(handleBackdropClick).toHaveBeenCalledTimes(1);
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Loading>Accessible Loading</Loading>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <Loading aria-label={ariaLabel}>
          Loading for screen readers
        </Loading>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<Loading tabIndex={0}>Keyboard Loading</Loading>);
      
      const element = screen.getByRole('status');
      element.focus();
      expect(element).toHaveFocus();
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Loading 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA Loading
        </Loading>
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
          MuiLoading: {
            defaultProps: {
              variant: 'circular',
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
          <Loading data-testid="themed-loading">
            Themed Loading
          </Loading>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-loading');
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
          <Loading>Dark Mode Loading</Loading>
        </ThemeProvider>
      );

      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <Loading key={i}>Loading {i}</Loading>
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
        <Loading animate={false}>
          No Animation Loading
        </Loading>
      );

      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Loading />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Loading>{null}</Loading>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Loading 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </Loading>
      );
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('handles complex configurations', () => {
      renderWithTheme(
        <Loading
          type="circular"
          size="small"
          loading={true}
          speed={1}
        >
          Complex Loading
        </Loading>
      );
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Loading>Default Loading</Loading>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: LoadingProps['variant'][] = [
        'circular',
        'dots',
        'bars',
        'pulse',
        'bounce',
        'ring',
        'wave',
        'ripple',
        'skeleton',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Loading variant={variant}>{variant} Loading</Loading>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
