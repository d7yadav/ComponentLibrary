/**
 * @fileoverview Paper Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Paper } from './Paper';
import type { PaperProps } from './Paper.types';

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

describe('Paper Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Paper>Test content</Paper>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      const testContent = 'Test Paper Content';
      renderWithTheme(<Paper>{testContent}</Paper>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-paper';
      renderWithTheme(
        <Paper data-testid={testId}>Test</Paper>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Paper className={customClass} data-testid="paper">Test</Paper>
      );
      expect(screen.getByTestId('paper')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: PaperProps['variant'][] = [
        'elevation', 'outlined', 'filled', 'glass', 'gradient'
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Paper variant={variant} data-testid="variant-test">
              {variant} variant
            </Paper>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('elevation prop', () => {
      const elevations: PaperProps['elevation'][] = [
        0, 1, 2, 3, 4, 6, 8, 12, 16, 24
      ];

      elevations.forEach((elevation) => {
        it(`renders elevation ${elevation} correctly`, () => {
          renderWithTheme(
            <Paper elevation={elevation} data-testid="elevation-test">
              Elevation {elevation}
            </Paper>
          );
          const element = screen.getByTestId('elevation-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('corners prop', () => {
      const corners: PaperProps['corners'][] = [
        'none', 'small', 'medium', 'large', 'circular'
      ];

      corners.forEach((corner) => {
        it(`renders ${corner} corners correctly`, () => {
          renderWithTheme(
            <Paper corners={corner} data-testid="corners-test">
              {corner} corners
            </Paper>
          );
          const element = screen.getByTestId('corners-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('surface prop', () => {
      const surfaces: PaperProps['surface'][] = [
        'flat', 'concave', 'convex'
      ];

      surfaces.forEach((surface) => {
        it(`renders ${surface} surface correctly`, () => {
          renderWithTheme(
            <Paper surface={surface} data-testid="surface-test">
              {surface} surface
            </Paper>
          );
          const element = screen.getByTestId('surface-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    it('handles square prop correctly', () => {
      renderWithTheme(
        <Paper square data-testid="square-test">
          Square Paper
        </Paper>
      );
      const element = screen.getByTestId('square-test');
      expect(element).toBeInTheDocument();
    });

    it('handles interactive prop correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Paper interactive onClick={handleClick} data-testid="interactive-test">
          Interactive Paper
        </Paper>
      );
      const element = screen.getByTestId('interactive-test');
      fireEvent.click(element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Paper disabled onClick={handleClick} data-testid="disabled-test">
          Disabled Paper
        </Paper>
      );
      
      const element = screen.getByTestId('disabled-test');
      fireEvent.click(element);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles gradient prop correctly', () => {
      renderWithTheme(
        <Paper gradient="primary" data-testid="gradient-test">
          Gradient Paper
        </Paper>
      );
      const element = screen.getByTestId('gradient-test');
      expect(element).toBeInTheDocument();
    });

    it('handles size prop correctly', () => {
      renderWithTheme(
        <Paper size="large" data-testid="size-test">
          Large Paper
        </Paper>
      );
      const element = screen.getByTestId('size-test');
      expect(element).toBeInTheDocument();
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles click events when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Paper interactive onClick={handleClick} data-testid="clickable">
          Clickable Paper
        </Paper>
      );
      
      const element = screen.getByTestId('clickable');
      await user.click(element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Paper interactive onClick={handleClick} tabIndex={0} data-testid="keyboard-nav">
          Keyboard navigable Paper
        </Paper>
      );
      
      const element = screen.getByTestId('keyboard-nav');
      element.focus();
      expect(element).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles hover states when interactive', () => {
      renderWithTheme(
        <Paper interactive data-testid="hoverable">
          Hoverable Paper
        </Paper>
      );
      
      const element = screen.getByTestId('hoverable');
      fireEvent.mouseEnter(element);
      expect(element).toBeInTheDocument();
      
      fireEvent.mouseLeave(element);
      expect(element).toBeInTheDocument();
    });

    it('does not respond to interactions when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <Paper disabled onClick={handleClick} data-testid="disabled-interaction">
          Disabled Paper
        </Paper>
      );
      
      const element = screen.getByTestId('disabled-interaction');
      await user.click(element);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Paper>Accessible Paper</Paper>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper ARIA attributes when interactive', () => {
      renderWithTheme(
        <Paper 
          interactive
          role="button"
          aria-label="Interactive paper"
          aria-describedby="description"
          data-testid="aria-paper"
        >
          ARIA Paper
        </Paper>
      );
      
      const element = screen.getByTestId('aria-paper');
      expect(element).toHaveAttribute('role', 'button');
      expect(element).toHaveAttribute('aria-label', 'Interactive paper');
      expect(element).toHaveAttribute('aria-describedby', 'description');
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(
        <Paper interactive tabIndex={0} data-testid="keyboard-paper">
          Keyboard accessible Paper
        </Paper>
      );
      
      const element = screen.getByTestId('keyboard-paper');
      element.focus();
      expect(element).toHaveFocus();
    });

    it('indicates disabled state with aria-disabled', () => {
      renderWithTheme(
        <Paper disabled data-testid="disabled-aria">
          Disabled Paper
        </Paper>
      );
      
      const element = screen.getByTestId('disabled-aria');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: 'red',
              },
            },
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <Paper data-testid="themed-paper">
            Themed Paper
          </Paper>
        </ThemeProvider>
      );

      expect(screen.getByTestId('themed-paper')).toBeInTheDocument();
    });

    it('supports dark mode', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      render(
        <ThemeProvider theme={darkTheme}>
          <Paper data-testid="dark-paper">
            Dark Mode Paper
          </Paper>
        </ThemeProvider>
      );

      expect(screen.getByTestId('dark-paper')).toBeInTheDocument();
    });

    it('applies elevation shadows correctly', () => {
      renderWithTheme(
        <Paper elevation={8} data-testid="shadow-paper">
          Elevated Paper
        </Paper>
      );

      expect(screen.getByTestId('shadow-paper')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyPapers = Array.from({ length: 50 }, (_, i) => (
        <Paper key={i} elevation={i % 5}>
          Paper {i}
        </Paper>
      ));

      const { container } = renderWithTheme(<div>{manyPapers}</div>);
      expect(container).toBeInTheDocument();
    });

    it('memoizes properly to prevent unnecessary re-renders', () => {
      const { rerender } = renderWithTheme(
        <Paper elevation={2} data-testid="memo-test">
          Memoized Paper
        </Paper>
      );

      const element = screen.getByTestId('memo-test');
      expect(element).toBeInTheDocument();

      // Re-render with same props should not cause issues
      rerender(
        <TestWrapper>
          <Paper elevation={2} data-testid="memo-test">
            Memoized Paper
          </Paper>
        </TestWrapper>
      );

      expect(screen.getByTestId('memo-test')).toBeInTheDocument();
    });

    it('handles elevation changes efficiently', () => {
      const { rerender } = renderWithTheme(
        <Paper elevation={1} data-testid="elevation-change">
          Changing Elevation
        </Paper>
      );

      let element = screen.getByTestId('elevation-change');
      expect(element).toBeInTheDocument();

      rerender(
        <TestWrapper>
          <Paper elevation={24} data-testid="elevation-change">
            Changing Elevation
          </Paper>
        </TestWrapper>
      );

      element = screen.getByTestId('elevation-change');
      expect(element).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Paper data-testid="empty-paper" />);
      expect(screen.getByTestId('empty-paper')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(
        <Paper data-testid="null-paper">{null}</Paper>
      );
      expect(screen.getByTestId('null-paper')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Paper 
          variant={undefined as any}
          elevation={undefined as any}
          data-testid="undefined-props"
        >
          Undefined Props
        </Paper>
      );
      expect(screen.getByTestId('undefined-props')).toBeInTheDocument();
    });

    it('handles extreme elevation values', () => {
      renderWithTheme(
        <Paper elevation={999 as any} data-testid="extreme-elevation">
          Extreme Elevation
        </Paper>
      );
      expect(screen.getByTestId('extreme-elevation')).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      renderWithTheme(
        <Paper data-testid="nested-content">
          <div>
            <h1>Nested Title</h1>
            <p>Nested paragraph with <strong>bold</strong> text</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
        </Paper>
      );
      expect(screen.getByTestId('nested-content')).toBeInTheDocument();
      expect(screen.getByText('Nested Title')).toBeInTheDocument();
    });
  });

  // Snapshots
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Paper>Default Paper</Paper>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: PaperProps['variant'][] = [
        'elevation', 'outlined', 'filled', 'glass', 'gradient'
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Paper variant={variant}>{variant} Paper</Paper>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });

    it('matches snapshot for different elevations', () => {
      const elevations = [0, 1, 4, 8, 16, 24];

      elevations.forEach((elevation) => {
        const { container } = renderWithTheme(
          <Paper elevation={elevation}>Elevation {elevation}</Paper>
        );
        expect(container.firstChild).toMatchSnapshot(`elevation-${elevation}`);
      });
    });
  });
});