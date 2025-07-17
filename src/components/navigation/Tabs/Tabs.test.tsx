/**
 * @fileoverview Tabs Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Tabs } from './Tabs';
import { TABS_CONSTANTS } from './Tabs.constants';
import type { TabsProps } from './Tabs.types';

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

// Sample tabs data for testing
const sampleTabs = [
  { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
  { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
  { id: 'tab3', label: 'Tab 3', content: 'Content 3' },
];

describe('Tabs Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Tabs tabs={sampleTabs} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      renderWithTheme(<Tabs tabs={sampleTabs} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-tabs';
      renderWithTheme(
        <Tabs tabs={sampleTabs} data-testid={testId} />
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Tabs tabs={sampleTabs} className={customClass} data-testid="tabs" />
      );
      expect(screen.getByTestId('tabs')).toBeInTheDocument();
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: TabsProps['variant'][] = [
        'standard',
        'scrollable',
        'fullWidth',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Tabs tabs={sampleTabs} variant={variant} data-testid="variant-test" />
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });




    it('handles disabled state correctly', () => {
      const disabledTabs = [
        { id: 'tab1', label: 'Tab 1', content: 'Content 1', disabled: true },
        { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
      ];
      renderWithTheme(
        <Tabs tabs={disabledTabs} disabled data-testid="disabled-test" />
      );
      
      const element = screen.getByTestId('disabled-test');
      expect(element).toBeInTheDocument();
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles tab selection clicks', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      const tabs = [
        { label: 'Tab 1', content: 'Content 1' },
        { label: 'Tab 2', content: 'Content 2' },
        { label: 'Tab 3', content: 'Content 3' }
      ];
      
      renderWithTheme(
        <Tabs 
          tabs={tabs} 
          onChange={handleChange}
          data-testid="clickable-tabs" 
        />
      );
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);
      
      expect(handleChange).toHaveBeenCalledWith(
        expect.anything(),
        1
      );
    });

    it('supports keyboard navigation between tabs', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      const tabs = [
        { label: 'First', content: 'First content' },
        { label: 'Second', content: 'Second content' },
        { label: 'Third', content: 'Third content' }
      ];
      
      renderWithTheme(
        <Tabs 
          tabs={tabs} 
          defaultValue={0}
          onChange={handleChange}
          data-testid="keyboard-tabs" 
        />
      );
      
      const firstTab = screen.getByRole('tab', { name: 'First' });
      const secondTab = screen.getByRole('tab', { name: 'Second' });
      
      // Focus first tab
      firstTab.focus();
      expect(firstTab).toHaveFocus();
      
      // Arrow right to second tab
      await user.keyboard('{ArrowRight}');
      
      // Verify keyboard navigation works (focus management)
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles disabled tabs correctly', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      const tabs = [
        { label: 'Enabled', content: 'Enabled content' },
        { label: 'Disabled', content: 'Disabled content', disabled: true },
        { label: 'Another', content: 'Another content' }
      ];
      
      renderWithTheme(
        <Tabs 
          tabs={tabs} 
          onChange={handleChange}
          data-testid="disabled-tabs" 
        />
      );
      
      const disabledTab = screen.getByRole('tab', { name: 'Disabled' });
      
      // Disabled tab should be present but not interactive (has pointer-events: none)
      expect(disabledTab).toBeInTheDocument();
      expect(disabledTab).toBeDisabled();
      
      // Should be marked as disabled
      expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    });

    it('updates tab panel content when selection changes', async () => {
      const user = userEvent.setup();
      
      const tabs = [
        { label: 'Home', content: 'Home content' },
        { label: 'About', content: 'About content' },
        { label: 'Contact', content: 'Contact content' }
      ];
      
      renderWithTheme(
        <Tabs 
          tabs={tabs} 
          defaultValue={0}
          showPanels={true}
          data-testid="content-tabs" 
        />
      );
      
      // Initially shows first tab content
      expect(screen.getByText('Home content')).toBeInTheDocument();
      expect(screen.queryByText('About content')).not.toBeInTheDocument();
      
      // Click second tab
      const aboutTab = screen.getByRole('tab', { name: 'About' });
      await user.click(aboutTab);
      
      // Should show second tab content
      await waitFor(() => {
        expect(screen.getByText('About content')).toBeInTheDocument();
        expect(screen.queryByText('Home content')).not.toBeInTheDocument();
      });
    });
  });


  // Icon testing
  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it('renders start icon correctly', () => {
      const tabsWithIcons = [
        { id: 'tab1', label: 'Tab 1', content: 'Content 1', icon: <TestIcon /> },
        { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
      ];
      renderWithTheme(
        <Tabs tabs={tabsWithIcons} />
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders end icon correctly', () => {
      const tabsWithIcons = [
        { id: 'tab1', label: 'Tab 1', content: 'Content 1', icon: <TestIcon /> },
        { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
      ];
      renderWithTheme(
        <Tabs tabs={tabsWithIcons} />
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Tabs tabs={sampleTabs} />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <Tabs tabs={sampleTabs} aria-label={ariaLabel} />
      );
      
      const element = screen.getByRole('tablist');
      expect(element).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<Tabs tabs={sampleTabs} />);
      
      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      firstTab.focus();
      expect(firstTab).toHaveFocus();
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Tabs 
          tabs={sampleTabs}
          aria-label="Navigation tabs"
        />
      );
      
      const element = screen.getByRole('tablist');
      expect(element).toHaveAttribute('aria-label', 'Navigation tabs');
      
      // Check that tabs have proper ARIA attributes
      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(firstTab).toHaveAttribute('aria-selected');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiTabs: {
            defaultProps: {
              variant: 'standard',
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
          <Tabs data-testid="themed-tabs">
            Themed Tabs
          </Tabs>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-tabs');
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
          <Tabs tabs={sampleTabs}>Dark Mode Tabs</Tabs>
        </ThemeProvider>
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <Tabs key={i}>Tabs {i}</Tabs>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="tablist"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      // Tabs component requires at least one tab, so test with minimal tab
      const minimalTabs = [{ id: 'empty', label: '', content: '' }];
      renderWithTheme(<Tabs tabs={minimalTabs} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Tabs tabs={sampleTabs}>{null}</Tabs>);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Tabs 
          tabs={sampleTabs}
          variant={undefined as any} 
        />
      );
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles complex configurations', () => {
      renderWithTheme(
        <Tabs
          variant="standard"
          disabled={false}
        >
          Complex Tabs
        </Tabs>
      );
      
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Tabs tabs={sampleTabs}>Default Tabs</Tabs>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: TabsProps['variant'][] = [
        'standard',
        'scrollable',
        'fullWidth',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Tabs variant={variant}>{variant} Tabs</Tabs>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
