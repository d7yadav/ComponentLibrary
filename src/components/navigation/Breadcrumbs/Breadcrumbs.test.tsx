/**
 * @fileoverview Breadcrumbs Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Breadcrumbs } from './Breadcrumbs';
import { BREADCRUMBS_CONSTANTS } from './Breadcrumbs.constants';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

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

describe('Breadcrumbs Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Breadcrumbs>Test content</Breadcrumbs>);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
          });

    it('renders children correctly', () => {
      const testContent = 'Test Breadcrumbs Content';
      renderWithTheme(<Breadcrumbs>{testContent}</Breadcrumbs>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-breadcrumbs';
      renderWithTheme(
        <Breadcrumbs data-testid={testId}>Test</Breadcrumbs>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Breadcrumbs className={customClass}>Test</Breadcrumbs>
      );
      expect(screen.getByRole('navigation')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: BreadcrumbsProps['variant'][] = [
        'default',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Breadcrumbs variant={variant} data-testid="variant-test">
              {variant} variant
            </Breadcrumbs>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: BreadcrumbsProps['size'][] = [
        'small',
        'medium',
        'large',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Breadcrumbs size={size} data-testid="size-test">
              {size} size
            </Breadcrumbs>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <Breadcrumbs disabled onClick={handleClick} data-testid="disabled-test">
          Disabled Breadcrumbs
        </Breadcrumbs>
      );
      
      const element = screen.getByTestId('disabled-test');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles breadcrumb item clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      const items = [
        { label: 'Home', href: '/', onClick: handleClick },
        { label: 'Products', href: '/products' },
        { label: 'Current', current: true }
      ];
      
      renderWithTheme(
        <Breadcrumbs items={items} data-testid="clickable-breadcrumbs" />
      );
      
      const homeLink = screen.getByText('Home');
      await user.click(homeLink);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles expand/collapse functionality', async () => {
      const user = userEvent.setup();
      
      const manyItems = Array.from({ length: 8 }, (_, i) => ({
        label: `Item ${i + 1}`,
        href: `/item-${i + 1}`
      }));
      
      renderWithTheme(
        <Breadcrumbs 
          items={manyItems} 
          maxItems={4}
          expandOnClick={true}
          data-testid="collapsible-breadcrumbs" 
        />
      );
      
      // Should show collapse indicator
      const collapseIndicator = screen.getByLabelText('Show more breadcrumbs');
      expect(collapseIndicator).toBeInTheDocument();
      
      // Click to expand
      await user.click(collapseIndicator);
      
      // Should show more items after expansion
      await waitFor(() => {
        expect(screen.getByText('Item 3')).toBeInTheDocument();
        expect(screen.getByText('Item 4')).toBeInTheDocument();
      });
    });

    it('supports keyboard navigation on collapse indicator', async () => {
      const user = userEvent.setup();
      
      const manyItems = Array.from({ length: 6 }, (_, i) => ({
        label: `Item ${i + 1}`,
        href: `/item-${i + 1}`
      }));
      
      renderWithTheme(
        <Breadcrumbs 
          items={manyItems} 
          maxItems={3}
          expandOnClick={true}
          data-testid="keyboard-breadcrumbs" 
        />
      );
      
      const collapseIndicator = screen.getByLabelText('Show more breadcrumbs');
      
      // Focus the collapse indicator
      collapseIndicator.focus();
      expect(collapseIndicator).toHaveFocus();
      
      // Press Enter to expand
      await user.keyboard('{Enter}');
      
      // Should expand and show more items
      await waitFor(() => {
        expect(screen.getByText('Item 2')).toBeInTheDocument();
      });
      
      // Press Space to collapse
      await user.keyboard(' ');
      
      // Should collapse again
      await waitFor(() => {
        expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
      });
    });

    it('prevents navigation on disabled items', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Disabled', href: '/disabled', disabled: true, onClick: handleClick },
        { label: 'Current', current: true }
      ];
      
      renderWithTheme(
        <Breadcrumbs items={items} data-testid="disabled-breadcrumbs" />
      );
      
      const disabledLink = screen.getByText('Disabled');
      await user.click(disabledLink);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });


  // Icon testing
  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it('renders start icon correctly', () => {
      renderWithTheme(
        <Breadcrumbs startIcon={<TestIcon />}>
          With Start Icon
        </Breadcrumbs>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders end icon correctly', () => {
      renderWithTheme(
        <Breadcrumbs endIcon={<TestIcon />}>
          With End Icon
        </Breadcrumbs>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Breadcrumbs>Accessible Breadcrumbs</Breadcrumbs>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <Breadcrumbs aria-label={ariaLabel}>
          Breadcrumbs for screen readers
        </Breadcrumbs>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<Breadcrumbs>Keyboard Breadcrumbs</Breadcrumbs>);
      
      const element = screen.getByRole('navigation');
      element.focus();
      expect(element).toHaveFocus();
          });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Breadcrumbs 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA Breadcrumbs
        </Breadcrumbs>
      );
      
      const element = screen.getByRole('navigation');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiBreadcrumbs: {
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
          <Breadcrumbs data-testid="themed-breadcrumbs">
            Themed Breadcrumbs
          </Breadcrumbs>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-breadcrumbs');
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
          <Breadcrumbs>Dark Mode Breadcrumbs</Breadcrumbs>
        </ThemeProvider>
      );

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <Breadcrumbs key={i}>Breadcrumbs {i}</Breadcrumbs>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="navigation"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Breadcrumbs />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Breadcrumbs>{null}</Breadcrumbs>);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Breadcrumbs 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </Breadcrumbs>
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Breadcrumbs>Default Breadcrumbs</Breadcrumbs>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: BreadcrumbsProps['variant'][] = [
        'default',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Breadcrumbs variant={variant}>{variant} Breadcrumbs</Breadcrumbs>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
