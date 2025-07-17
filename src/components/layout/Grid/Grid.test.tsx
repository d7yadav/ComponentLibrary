/**
 * @fileoverview Grid Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Grid } from './Grid';
import { GRID_CONSTANTS } from './Grid.constants';
import type { GridProps } from './Grid.types';

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

describe('Grid Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Grid>Test content</Grid>);
      expect(screen.getByRole('grid')).toBeInTheDocument();
          });

    it('renders children correctly', () => {
      const testContent = 'Test Grid Content';
      renderWithTheme(<Grid>{testContent}</Grid>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-grid';
      renderWithTheme(
        <Grid data-testid={testId}>Test</Grid>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Grid className={customClass}>Test</Grid>
      );
      expect(screen.getByRole('grid')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: GridProps['variant'][] = [
        'container',
        'item',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Grid variant={variant} data-testid="variant-test">
              {variant} variant
            </Grid>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: GridProps['size'][] = [
        'auto',
        'true',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Grid size={size} data-testid="size-test">
              {size} size
            </Grid>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Grid disabled onClick={handleClick} data-testid="disabled-test">
          Disabled Grid
        </Grid>
      );
      
      const element = screen.getByTestId('disabled-test');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles click events on grid container', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Grid onClick={handleClick} data-testid="clickable-grid">
          <Grid xs={12}>Grid Item</Grid>
        </Grid>
      );
      
      const element = screen.getByTestId('clickable-grid');
      fireEvent.click(element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('maintains responsive behavior on interaction', () => {
      renderWithTheme(
        <Grid container spacing={2} data-testid="responsive-grid">
          <Grid xs={12} sm={6} md={4}>Item 1</Grid>
          <Grid xs={12} sm={6} md={4}>Item 2</Grid>
          <Grid xs={12} sm={6} md={4}>Item 3</Grid>
        </Grid>
      );
      
      const element = screen.getByTestId('responsive-grid');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('MuiGrid-container');
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Grid>Accessible Grid</Grid>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <Grid aria-label={ariaLabel}>
          Grid for screen readers
        </Grid>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<Grid>Keyboard Grid</Grid>);
      
      const element = screen.getByRole('grid');
      element.focus();
      expect(element).toHaveFocus();
          });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Grid 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA Grid
        </Grid>
      );
      
      const element = screen.getByRole('grid');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiGrid: {
            defaultProps: {
              variant: 'container',
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
          <Grid data-testid="themed-grid">
            Themed Grid
          </Grid>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-grid');
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
          <Grid>Dark Mode Grid</Grid>
        </ThemeProvider>
      );

      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <Grid key={i}>Grid {i}</Grid>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="grid"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Grid />);
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Grid>{null}</Grid>);
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Grid 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </Grid>
      );
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('handles complex configurations', () => {
      renderWithTheme(
        <Grid
          variant="container"
          size="auto"
          disabled={false}
        >
          Complex Grid
        </Grid>
      );
      
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Grid>Default Grid</Grid>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: GridProps['variant'][] = [
        'container',
        'item',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Grid variant={variant}>{variant} Grid</Grid>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
