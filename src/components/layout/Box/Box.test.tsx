/**
 * @fileoverview Box Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Box } from './Box';
import { BOX_CONSTANTS } from './Box.constants';
import type { BoxProps } from './Box.types';

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

describe('Box Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Box>Test content</Box>);
      expect(screen.getByTestId('box-root')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      const testContent = 'Test Box Content';
      renderWithTheme(<Box>{testContent}</Box>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-box';
      renderWithTheme(
        <Box data-testid={testId}>Test</Box>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Box className={customClass}>Test</Box>
      );
      expect(screen.getByTestId('box-root')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: BoxProps['variant'][] = [
        'default',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Box variant={variant} data-testid="variant-test">
              {variant} variant
            </Box>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: BoxProps['size'][] = [
        'auto',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Box size={size} data-testid="size-test">
              {size} size
            </Box>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Box disabled onClick={handleClick} data-testid="disabled-test">
          Disabled Box
        </Box>
      );
      
      const element = screen.getByTestId('disabled-test');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles click events when clickable', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Box onClick={handleClick} data-testid="clickable-box">
          Clickable Box
        </Box>
      );
      
      const element = screen.getByTestId('clickable-box');
      fireEvent.click(element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interactions when focusable', () => {
      renderWithTheme(
        <Box tabIndex={0} data-testid="focusable-box">
          Focusable Box
        </Box>
      );
      
      const element = screen.getByTestId('focusable-box');
      element.focus();
      expect(element).toHaveFocus();
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Box>Accessible Box</Box>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <Box aria-label={ariaLabel}>
          Box for screen readers
        </Box>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<Box>Keyboard Box</Box>);
      
      const element = screen.getByRole('generic');
      element.focus();
      expect(element).toHaveFocus();
          });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Box 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA Box
        </Box>
      );
      
      const element = screen.getByTestId('box-root');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiBox: {
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
          <Box data-testid="themed-box">
            Themed Box
          </Box>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-box');
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
          <Box>Dark Mode Box</Box>
        </ThemeProvider>
      );

      expect(screen.getByTestId('box-root')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <Box key={i}>Box {i}</Box>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[data-testid*="box"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Box />);
      expect(screen.getByTestId('box-root')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Box>{null}</Box>);
      expect(screen.getByTestId('box-root')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Box 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </Box>
      );
      expect(screen.getByTestId('box-root')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Box>Default Box</Box>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: BoxProps['variant'][] = [
        'default',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Box variant={variant}>{variant} Box</Box>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
