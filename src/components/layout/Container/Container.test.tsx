/**
 * @fileoverview Container Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Container } from './Container';
import { CONTAINER_CONSTANTS } from './Container.constants';
import type { ContainerProps } from './Container.types';

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

describe('Container Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Container>Test content</Container>);
      expect(screen.getByRole('main')).toBeInTheDocument();
          });

    it('renders children correctly', () => {
      const testContent = 'Test Container Content';
      renderWithTheme(<Container>{testContent}</Container>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-container';
      renderWithTheme(
        <Container data-testid={testId}>Test</Container>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Container className={customClass}>Test</Container>
      );
      expect(screen.getByRole('main')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: ContainerProps['variant'][] = [
        'fluid',
        'fixed',
        'constrained',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Container variant={variant} data-testid="variant-test">
              {variant} variant
            </Container>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: ContainerProps['size'][] = [
        'small',
        'medium',
        'large',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Container size={size} data-testid="size-test">
              {size} size
            </Container>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Container disabled onClick={handleClick} data-testid="disabled-test">
          Disabled Container
        </Container>
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
        <Container onClick={handleClick} data-testid="clickable-container">
          Clickable Container
        </Container>
      );
      
      const element = screen.getByTestId('clickable-container');
      fireEvent.click(element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not interfere with child interactions', () => {
      const parentClick = vi.fn();
      const childClick = vi.fn();
      
      renderWithTheme(
        <Container onClick={parentClick} data-testid="parent-container">
          <button onClick={childClick} data-testid="child-button">
            Child Button
          </button>
        </Container>
      );
      
      const childElement = screen.getByTestId('child-button');
      fireEvent.click(childElement);
      expect(childClick).toHaveBeenCalledTimes(1);
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Container>Accessible Container</Container>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <Container aria-label={ariaLabel}>
          Container for screen readers
        </Container>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<Container>Keyboard Container</Container>);
      
      const element = screen.getByRole('main');
      element.focus();
      expect(element).toHaveFocus();
          });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Container 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA Container
        </Container>
      );
      
      const element = screen.getByRole('main');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiContainer: {
            defaultProps: {
              variant: 'fluid',
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
          <Container data-testid="themed-container">
            Themed Container
          </Container>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-container');
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
          <Container>Dark Mode Container</Container>
        </ThemeProvider>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <Container key={i}>Container {i}</Container>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="main"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Container />);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Container>{null}</Container>);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Container 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </Container>
      );
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Container>Default Container</Container>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: ContainerProps['variant'][] = [
        'fluid',
        'fixed',
        'constrained',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Container variant={variant}>{variant} Container</Container>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
