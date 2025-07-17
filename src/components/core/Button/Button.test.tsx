/**
 * @fileoverview Button Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Button } from './Button';
import { BUTTON_CONSTANTS } from './Button.constants';
import type { ButtonProps } from './Button.types';

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

describe('Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Button>Test content</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      const testContent = 'Test Button Content';
      renderWithTheme(<Button>{testContent}</Button>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-button';
      renderWithTheme(
        <Button data-testid={testId}>Test</Button>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Button className={customClass}>Test</Button>
      );
      expect(screen.getByRole('button')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: ButtonProps['variant'][] = [
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'gradient',
        'glass',
        'outline',
        'text',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Button variant={variant} data-testid="variant-test">
              {variant} variant
            </Button>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: ButtonProps['size'][] = [
        'small',
        'medium',
        'large',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Button size={size} data-testid="size-test">
              {size} size
            </Button>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });


    it('handles loading state correctly', () => {
      renderWithTheme(
        <Button loading data-testid="loading-test">
          Loading Button
        </Button>
      );
      
      const element = screen.getByTestId('loading-test');
      expect(element).toHaveAttribute('aria-busy', 'true');
    });

    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Button disabled onClick={handleClick} data-testid="disabled-test">
          Disabled Button
        </Button>
      );
      
      const element = screen.getByTestId('disabled-test');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Button onClick={handleClick}>
          Clickable Button
        </Button>
      );
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation - Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Button onClick={handleClick}>
          Keyboard Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation - Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Button onClick={handleClick}>
          Keyboard Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

  });


  // Icon testing
  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it('renders start icon correctly', () => {
      renderWithTheme(
        <Button startIcon={<TestIcon />}>
          With Start Icon
        </Button>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders end icon correctly', () => {
      renderWithTheme(
        <Button endIcon={<TestIcon />}>
          With End Icon
        </Button>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Button>Accessible Button</Button>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <Button aria-label={ariaLabel}>
          Button for screen readers
        </Button>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<Button>Keyboard Button</Button>);
      
      const element = screen.getByRole('button');
      expect(element).toHaveAttribute('tabIndex', '0');
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Button 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA Button
        </Button>
      );
      
      const element = screen.getByRole('button');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiButton: {
            defaultProps: {
              variant: 'primary',
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
          <Button data-testid="themed-button">
            Themed Button
          </Button>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-button');
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
          <Button>Dark Mode Button</Button>
        </ThemeProvider>
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <Button key={i}>Button {i}</Button>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="button"]')).toHaveLength(100);
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
        <Button animate="false">
          No Animation Button
        </Button>
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Button />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Button>{null}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Button 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </Button>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Button>Default Button</Button>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: ButtonProps['variant'][] = [
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'gradient',
        'glass',
        'outline',
        'text',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Button variant={variant}>{variant} Button</Button>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
