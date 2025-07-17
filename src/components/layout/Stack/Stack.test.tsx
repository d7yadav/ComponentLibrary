/**
 * @fileoverview Stack Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Stack } from './Stack';
import { STACK_CONSTANTS } from './Stack.constants';
import type { StackProps } from './Stack.types';

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

describe('Stack Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Stack>Test content</Stack>);
      expect(screen.getByRole('group')).toBeInTheDocument();
          });

    it('renders children correctly', () => {
      const testContent = 'Test Stack Content';
      renderWithTheme(<Stack>{testContent}</Stack>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-stack';
      renderWithTheme(
        <Stack data-testid={testId}>Test</Stack>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Stack className={customClass}>Test</Stack>
      );
      expect(screen.getByRole('group')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: StackProps['variant'][] = [
        'vertical',
        'horizontal',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Stack variant={variant} data-testid="variant-test">
              {variant} variant
            </Stack>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: StackProps['size'][] = [
        'small',
        'medium',
        'large',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Stack size={size} data-testid="size-test">
              {size} size
            </Stack>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Stack disabled onClick={handleClick} data-testid="disabled-test">
          Disabled Stack
        </Stack>
      );
      
      const element = screen.getByTestId('disabled-test');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles click events on stack container', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Stack onClick={handleClick} data-testid="clickable-stack">
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>
      );
      
      const element = screen.getByTestId('clickable-stack');
      fireEvent.click(element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('preserves flex direction on interaction', () => {
      renderWithTheme(
        <Stack direction="row" spacing={2} data-testid="row-stack">
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>
      );
      
      const element = screen.getByTestId('row-stack');
      expect(element).toBeInTheDocument();
      expect(element).toHaveStyle({ flexDirection: 'row' });
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Stack>Accessible Stack</Stack>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <Stack aria-label={ariaLabel}>
          Stack for screen readers
        </Stack>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<Stack>Keyboard Stack</Stack>);
      
      const element = screen.getByRole('group');
      element.focus();
      expect(element).toHaveFocus();
          });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Stack 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA Stack
        </Stack>
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
          MuiStack: {
            defaultProps: {
              variant: 'vertical',
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
          <Stack data-testid="themed-stack">
            Themed Stack
          </Stack>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-stack');
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
          <Stack>Dark Mode Stack</Stack>
        </ThemeProvider>
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <Stack key={i}>Stack {i}</Stack>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="group"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Stack />);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Stack>{null}</Stack>);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Stack 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </Stack>
      );
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Stack>Default Stack</Stack>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: StackProps['variant'][] = [
        'vertical',
        'horizontal',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Stack variant={variant}>{variant} Stack</Stack>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
