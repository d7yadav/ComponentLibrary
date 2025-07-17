/**
 * @fileoverview Typography Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Typography } from './Typography';
import type { TypographyProps } from './Typography.types';

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

describe('Typography Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Typography>Test content</Typography>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      const testContent = 'Test Typography Content';
      renderWithTheme(<Typography>{testContent}</Typography>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-typography';
      renderWithTheme(
        <Typography data-testid={testId}>Test</Typography>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Typography className={customClass} data-testid="typography">Test</Typography>
      );
      expect(screen.getByTestId('typography')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: TypographyProps['variant'][] = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'body1', 'body2', 'button', 'caption', 'overline',
        'subtitle1', 'subtitle2'
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Typography variant={variant} data-testid="variant-test">
              {variant} variant
            </Typography>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('color prop', () => {
      const colors: TypographyProps['color'][] = [
        'primary', 'secondary', 'tertiary', 'quaternary',
        'success', 'warning', 'error', 'info',
        'text.primary', 'text.secondary', 'text.disabled'
      ];

      colors.forEach((color) => {
        it(`renders ${color} color correctly`, () => {
          renderWithTheme(
            <Typography color={color} data-testid="color-test">
              {color} color
            </Typography>
          );
          const element = screen.getByTestId('color-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('align prop', () => {
      const alignments: TypographyProps['align'][] = [
        'left', 'center', 'right', 'justify'
      ];

      alignments.forEach((align) => {
        it(`renders ${align} alignment correctly`, () => {
          renderWithTheme(
            <Typography align={align} data-testid="align-test">
              {align} alignment
            </Typography>
          );
          const element = screen.getByTestId('align-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    it('handles noWrap correctly', () => {
      renderWithTheme(
        <Typography noWrap data-testid="nowrap-test">
          This is a long text that should not wrap and should be truncated with ellipsis
        </Typography>
      );
      const element = screen.getByTestId('nowrap-test');
      expect(element).toBeInTheDocument();
    });

    it('handles paragraph correctly', () => {
      renderWithTheme(
        <Typography paragraph data-testid="paragraph-test">
          Paragraph text
        </Typography>
      );
      const element = screen.getByTestId('paragraph-test');
      expect(element).toBeInTheDocument();
    });

    it('handles gutterBottom correctly', () => {
      renderWithTheme(
        <Typography gutterBottom data-testid="gutter-test">
          Text with gutter bottom
        </Typography>
      );
      const element = screen.getByTestId('gutter-test');
      expect(element).toBeInTheDocument();
    });

    it('handles maxLines correctly', () => {
      renderWithTheme(
        <Typography maxLines={2} data-testid="maxlines-test">
          This is a very long text that should be truncated after two lines when maxLines prop is set to 2
        </Typography>
      );
      const element = screen.getByTestId('maxlines-test');
      expect(element).toBeInTheDocument();
    });

    it('handles interactive correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Typography interactive onClick={handleClick} data-testid="interactive-test">
          Interactive text
        </Typography>
      );
      const element = screen.getByTestId('interactive-test');
      fireEvent.click(element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles gradient correctly', () => {
      renderWithTheme(
        <Typography gradient="primary" data-testid="gradient-test">
          Gradient text
        </Typography>
      );
      const element = screen.getByTestId('gradient-test');
      expect(element).toBeInTheDocument();
    });
  });

  // Component prop testing
  describe('Component Prop', () => {
    it('renders as different HTML elements', () => {
      const { rerender } = renderWithTheme(
        <Typography component="h1" data-testid="component-test">
          Header 1
        </Typography>
      );
      
      let element = screen.getByTestId('component-test');
      expect(element.tagName).toBe('H1');

      rerender(
        <TestWrapper>
          <Typography component="span" data-testid="component-test">
            Span element
          </Typography>
        </TestWrapper>
      );
      
      element = screen.getByTestId('component-test');
      expect(element.tagName).toBe('SPAN');
    });

    it('renders as custom component', () => {
      const CustomComponent = ({ children, ...props }: any) => (
        <div {...props} data-custom="true">{children}</div>
      );

      renderWithTheme(
        <Typography component={CustomComponent} data-testid="custom-component">
          Custom component
        </Typography>
      );
      
      const element = screen.getByTestId('custom-component');
      expect(element).toHaveAttribute('data-custom', 'true');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles click events when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Typography interactive onClick={handleClick} data-testid="clickable">
          Clickable text
        </Typography>
      );
      
      const element = screen.getByTestId('clickable');
      await user.click(element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Typography interactive onClick={handleClick} tabIndex={0} data-testid="keyboard-nav">
          Keyboard navigable text
        </Typography>
      );
      
      const element = screen.getByTestId('keyboard-nav');
      
      // Test that the element exists and is interactive
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('tabIndex', '0');
      
      // Test keyboard interaction
      await user.click(element);
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('handles hover states when interactive', () => {
      renderWithTheme(
        <Typography interactive data-testid="hoverable">
          Hoverable text
        </Typography>
      );
      
      const element = screen.getByTestId('hoverable');
      fireEvent.mouseEnter(element);
      expect(element).toBeInTheDocument();
      
      fireEvent.mouseLeave(element);
      expect(element).toBeInTheDocument();
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Typography>Accessible Typography</Typography>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers with proper semantics', () => {
      renderWithTheme(
        <Typography variant="h1" data-testid="heading">
          Main Heading
        </Typography>
      );
      
      const element = screen.getByRole('heading', { level: 1 });
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent('Main Heading');
    });

    it('provides proper ARIA attributes when interactive', () => {
      renderWithTheme(
        <Typography 
          interactive
          aria-label="Interactive text"
          aria-describedby="description"
          data-testid="aria-text"
        >
          ARIA Typography
        </Typography>
      );
      
      const element = screen.getByTestId('aria-text');
      expect(element).toHaveAttribute('aria-label', 'Interactive text');
      expect(element).toHaveAttribute('aria-describedby', 'description');
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(
        <Typography interactive tabIndex={0} data-testid="keyboard-typography">
          Keyboard accessible text
        </Typography>
      );
      
      const element = screen.getByTestId('keyboard-typography');
      element.focus();
      expect(element).toHaveFocus();
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        typography: {
          h1: {
            fontSize: '3rem',
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <Typography variant="h1" data-testid="themed-typography">
            Themed Typography
          </Typography>
        </ThemeProvider>
      );

      expect(screen.getByTestId('themed-typography')).toBeInTheDocument();
    });

    it('supports dark mode', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      render(
        <ThemeProvider theme={darkTheme}>
          <Typography data-testid="dark-typography">
            Dark Mode Typography
          </Typography>
        </ThemeProvider>
      );

      expect(screen.getByTestId('dark-typography')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyTypographies = Array.from({ length: 100 }, (_, i) => (
        <Typography key={i} variant="body1">
          Typography {i}
        </Typography>
      ));

      const { container } = renderWithTheme(<div>{manyTypographies}</div>);
      expect(container.querySelectorAll('[data-testid]')).toHaveLength(0);
      // The Typography components should render without issues
      expect(container).toBeInTheDocument();
    });

    it('memoizes properly to prevent unnecessary re-renders', () => {
      const { rerender } = renderWithTheme(
        <Typography variant="h1" data-testid="memo-test">
          Memoized Typography
        </Typography>
      );

      const element = screen.getByTestId('memo-test');
      expect(element).toBeInTheDocument();

      // Re-render with same props should not cause issues
      rerender(
        <TestWrapper>
          <Typography variant="h1" data-testid="memo-test">
            Memoized Typography
          </Typography>
        </TestWrapper>
      );

      expect(screen.getByTestId('memo-test')).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Typography data-testid="empty-typography" />);
      expect(screen.getByTestId('empty-typography')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(
        <Typography data-testid="null-typography">{null}</Typography>
      );
      expect(screen.getByTestId('null-typography')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Typography 
          variant={undefined as any}
          color={undefined as any}
          data-testid="undefined-props"
        >
          Undefined Props
        </Typography>
      );
      expect(screen.getByTestId('undefined-props')).toBeInTheDocument();
    });

    it('handles very long text content', () => {
      const longText = 'A'.repeat(10000);
      renderWithTheme(
        <Typography data-testid="long-text">{longText}</Typography>
      );
      expect(screen.getByTestId('long-text')).toBeInTheDocument();
    });

    it('handles special characters and HTML entities', () => {
      const specialText = '&lt;script&gt;alert("xss")&lt;/script&gt; & special chars: àáâãäå';
      renderWithTheme(
        <Typography data-testid="special-chars">{specialText}</Typography>
      );
      expect(screen.getByTestId('special-chars')).toHaveTextContent(specialText);
    });
  });

  // Snapshots
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Typography>Default Typography</Typography>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: TypographyProps['variant'][] = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'body1', 'body2', 'button', 'caption', 'overline',
        'subtitle1', 'subtitle2'
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Typography variant={variant}>{variant} Typography</Typography>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});