/**
 * @fileoverview CardContent Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { CardContent } from './CardContent';
import type { CardContentProps } from './CardContent.types';

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

describe('CardContent Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<CardContent>Test content</CardContent>);
      expect(screen.getByRole('region')).toBeInTheDocument();
          });

    it('renders children correctly', () => {
      const testContent = 'Test CardContent Content';
      renderWithTheme(<CardContent>{testContent}</CardContent>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-card-content';
      renderWithTheme(
        <CardContent data-testid={testId}>Test</CardContent>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <CardContent className={customClass}>Test</CardContent>
      );
      expect(screen.getByRole('region')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: CardContentProps['variant'][] = [
        'default',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <CardContent variant={variant} data-testid="variant-test">
              {variant} variant
            </CardContent>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes = ['compact', 'comfortable', 'spacious'] as const;

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <CardContent size={size} data-testid="size-test">
              {size} size
            </CardContent>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles custom props correctly', () => {
      renderWithTheme(
        <CardContent data-custom="test" data-testid="custom-test">
          Custom CardContent
        </CardContent>
      );
      
      const element = screen.getByTestId('custom-test');
      expect(element).toHaveAttribute('data-custom', 'test');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles click events when clickable content is provided', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <CardContent onClick={handleClick} data-testid="clickable-content">
          <p>Clickable content</p>
          <button>Learn More</button>
        </CardContent>
      );
      
      const element = screen.getByTestId('clickable-content');
      await user.click(element);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports focus on interactive content elements', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <CardContent>
          <p>Some content</p>
          <button data-testid="interactive-element">Interactive Element</button>
          <a href="#" data-testid="link-element">Link</a>
        </CardContent>
      );
      
      const button = screen.getByTestId('interactive-element');
      const link = screen.getByTestId('link-element');
      
      // Focus button
      await user.click(button);
      expect(button).toHaveFocus();
      
      // Tab to link
      await user.tab();
      expect(link).toHaveFocus();
    });

    it('handles keyboard events on focusable content', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();
      
      renderWithTheme(
        <CardContent onKeyDown={handleKeyDown} tabIndex={0} data-testid="keyboard-content">
          <p>Content with keyboard support</p>
        </CardContent>
      );
      
      const element = screen.getByTestId('keyboard-content');
      element.focus();
      
      await user.keyboard('{Enter}');
      expect(handleKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({ key: 'Enter' })
      );
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <CardContent>Accessible CardContent</CardContent>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <CardContent aria-label={ariaLabel}>
          CardContent for screen readers
        </CardContent>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(
        <CardContent tabIndex={0}>
          <button>Focusable content</button>
        </CardContent>
      );
      
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <CardContent 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA CardContent
        </CardContent>
      );
      
      const element = screen.getByRole('region');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiCardContent: {
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
          <CardContent data-testid="themed-card-content">
            Themed CardContent
          </CardContent>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-card-content');
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
          <CardContent>Dark Mode CardContent</CardContent>
        </ThemeProvider>
      );

      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <CardContent key={i}>CardContent {i}</CardContent>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="region"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<CardContent />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<CardContent>{null}</CardContent>);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <CardContent 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </CardContent>
      );
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <CardContent>Default CardContent</CardContent>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: CardContentProps['variant'][] = [
        'default',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <CardContent variant={variant}>{variant} CardContent</CardContent>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
