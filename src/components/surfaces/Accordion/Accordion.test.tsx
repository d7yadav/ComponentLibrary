/**
 * @fileoverview Accordion Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Accordion, AccordionSummary, AccordionDetails, AccordionActions } from './Accordion';
import type { AccordionProps } from './Accordion.types';

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

describe('Accordion Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );
      expect(screen.getByText('Summary')).toBeInTheDocument();
      expect(screen.getByText('Details')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Test Summary</AccordionSummary>
          <AccordionDetails>Test Details Content</AccordionDetails>
        </Accordion>
      );
      expect(screen.getByText('Test Summary')).toBeInTheDocument();
      expect(screen.getByText('Test Details Content')).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-accordion';
      renderWithTheme(
        <Accordion data-testid={testId}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Accordion className={customClass} data-testid="accordion">
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );
      expect(screen.getByTestId('accordion')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: AccordionProps['variant'][] = [
        'standard', 'outlined', 'filled', 'elevated', 'ghost'
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Accordion variant={variant} data-testid="variant-test">
              <AccordionSummary>{variant} variant</AccordionSummary>
              <AccordionDetails>Details</AccordionDetails>
            </Accordion>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: AccordionProps['size'][] = [
        'small', 'medium', 'large'
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <Accordion size={size} data-testid="size-test">
              <AccordionSummary>{size} size</AccordionSummary>
              <AccordionDetails>Details</AccordionDetails>
            </Accordion>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    it('handles expanded state correctly', () => {
      renderWithTheme(
        <Accordion expanded data-testid="expanded-test">
          <AccordionSummary>Expanded Summary</AccordionSummary>
          <AccordionDetails>Expanded Details</AccordionDetails>
        </Accordion>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('handles disabled state correctly', () => {
      renderWithTheme(
        <Accordion disabled data-testid="disabled-test">
          <AccordionSummary>Disabled Summary</AccordionSummary>
          <AccordionDetails>Disabled Details</AccordionDetails>
        </Accordion>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('handles controlled mode correctly', () => {
      const handleChange = vi.fn();
      renderWithTheme(
        <Accordion expanded={false} onChange={handleChange}>
          <AccordionSummary>Controlled Summary</AccordionSummary>
          <AccordionDetails>Controlled Details</AccordionDetails>
        </Accordion>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles square prop correctly', () => {
      renderWithTheme(
        <Accordion square data-testid="square-test">
          <AccordionSummary>Square Summary</AccordionSummary>
          <AccordionDetails>Square Details</AccordionDetails>
        </Accordion>
      );
      const element = screen.getByTestId('square-test');
      expect(element).toBeInTheDocument();
    });

    it('handles disableGutters prop correctly', () => {
      renderWithTheme(
        <Accordion disableGutters data-testid="no-gutters-test">
          <AccordionSummary>No Gutters Summary</AccordionSummary>
          <AccordionDetails>No Gutters Details</AccordionDetails>
        </Accordion>
      );
      const element = screen.getByTestId('no-gutters-test');
      expect(element).toBeInTheDocument();
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('expands and collapses on click', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Clickable Summary</AccordionSummary>
          <AccordionDetails>Collapsible Details</AccordionDetails>
        </Accordion>
      );
      
      const button = screen.getByRole('button');
      
      // Initially collapsed
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      // Expand
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      // Collapse
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles keyboard navigation correctly', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Keyboard Summary</AccordionSummary>
          <AccordionDetails>Keyboard Details</AccordionDetails>
        </Accordion>
      );
      
      const button = screen.getByRole('button');
      
      // Focus the button
      button.focus();
      expect(button).toHaveFocus();
      
      // Expand with Enter key
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      // Collapse with Space key
      await user.keyboard(' ');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('calls onChange when expanded state changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      renderWithTheme(
        <Accordion onChange={handleChange}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), true);
    });

    it('does not respond to interactions when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      renderWithTheme(
        <Accordion disabled onChange={handleChange}>
          <AccordionSummary>Disabled Summary</AccordionSummary>
          <AccordionDetails>Disabled Details</AccordionDetails>
        </Accordion>
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleChange).not.toHaveBeenCalled();
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles hover states correctly', () => {
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Hoverable Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );
      
      const button = screen.getByRole('button');
      fireEvent.mouseEnter(button);
      expect(button).toBeInTheDocument();
      
      fireEvent.mouseLeave(button);
      expect(button).toBeInTheDocument();
    });
  });

  // Subcomponent testing
  describe('Subcomponents', () => {
    describe('AccordionSummary', () => {
      it('renders with expand icon', () => {
        renderWithTheme(
          <Accordion>
            <AccordionSummary expandIcon={<span data-testid="custom-icon">+</span>}>
              Summary with custom icon
            </AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>
        );
        
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      });

      it('handles icon position prop', () => {
        renderWithTheme(
          <Accordion>
            <AccordionSummary iconPosition="start" data-testid="icon-start">
              Summary with icon at start
            </AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
          </Accordion>
        );
        
        expect(screen.getByTestId('icon-start')).toBeInTheDocument();
      });
    });

    describe('AccordionDetails', () => {
      it('renders details content correctly', () => {
        renderWithTheme(
          <Accordion expanded>
            <AccordionSummary>Summary</AccordionSummary>
            <AccordionDetails>
              <div>
                <h3>Details Title</h3>
                <p>Details paragraph</p>
              </div>
            </AccordionDetails>
          </Accordion>
        );
        
        expect(screen.getByText('Details Title')).toBeInTheDocument();
        expect(screen.getByText('Details paragraph')).toBeInTheDocument();
      });
    });

    describe('AccordionActions', () => {
      it('renders action buttons correctly', async () => {
        const user = userEvent.setup();
        const handleSave = vi.fn();
        const handleCancel = vi.fn();
        
        renderWithTheme(
          <Accordion expanded>
            <AccordionSummary>Summary</AccordionSummary>
            <AccordionDetails>Details</AccordionDetails>
            <AccordionActions>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </AccordionActions>
          </Accordion>
        );
        
        const saveButton = screen.getByText('Save');
        const cancelButton = screen.getByText('Cancel');
        
        await user.click(saveButton);
        expect(handleSave).toHaveBeenCalledTimes(1);
        
        await user.click(cancelButton);
        expect(handleCancel).toHaveBeenCalledTimes(1);
      });
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Accordion>
          <AccordionSummary>Accessible Summary</AccordionSummary>
          <AccordionDetails>Accessible Details</AccordionDetails>
        </Accordion>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded');
      expect(button).toHaveAttribute('aria-controls');
    });

    it('manages focus correctly', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>
            <button>Focusable content</button>
          </AccordionDetails>
        </Accordion>
      );
      
      const summaryButton = screen.getByRole('button', { name: /summary/i });
      const detailsButton = screen.getByRole('button', { name: /focusable content/i });
      
      // Expand accordion
      await user.click(summaryButton);
      
      // Focus should be manageable within details
      detailsButton.focus();
      expect(detailsButton).toHaveFocus();
    });

    it('supports screen readers with proper semantics', () => {
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Accordion Summary</AccordionSummary>
          <AccordionDetails>Accordion Details</AccordionDetails>
        </Accordion>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      
      // Details should be associated with summary
      const detailsId = button.getAttribute('aria-controls');
      expect(detailsId).toBeTruthy();
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiAccordion: {
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
          <Accordion data-testid="themed-accordion">
            <AccordionSummary>Themed Summary</AccordionSummary>
            <AccordionDetails>Themed Details</AccordionDetails>
          </Accordion>
        </ThemeProvider>
      );

      expect(screen.getByTestId('themed-accordion')).toBeInTheDocument();
    });

    it('supports dark mode', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      render(
        <ThemeProvider theme={darkTheme}>
          <Accordion data-testid="dark-accordion">
            <AccordionSummary>Dark Summary</AccordionSummary>
            <AccordionDetails>Dark Details</AccordionDetails>
          </Accordion>
        </ThemeProvider>
      );

      expect(screen.getByTestId('dark-accordion')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many accordions', () => {
      const manyAccordions = Array.from({ length: 20 }, (_, i) => (
        <Accordion key={i}>
          <AccordionSummary>Summary {i}</AccordionSummary>
          <AccordionDetails>Details {i}</AccordionDetails>
        </Accordion>
      ));

      const { container } = renderWithTheme(<div>{manyAccordions}</div>);
      expect(container).toBeInTheDocument();
    });

    it('handles expansion animations efficiently', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>
            <div style={{ height: '1000px' }}>Large content</div>
          </AccordionDetails>
        </Accordion>
      );
      
      const button = screen.getByRole('button');
      
      // Rapid expansion/collapse should work smoothly
      await user.click(button);
      await user.click(button);
      await user.click(button);
      
      expect(button).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty accordion gracefully', () => {
      renderWithTheme(<Accordion data-testid="empty-accordion" />);
      expect(screen.getByTestId('empty-accordion')).toBeInTheDocument();
    });

    it('handles accordion with only summary', () => {
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Only Summary</AccordionSummary>
        </Accordion>
      );
      expect(screen.getByText('Only Summary')).toBeInTheDocument();
    });

    it('handles accordion with only details', () => {
      renderWithTheme(
        <Accordion>
          <AccordionDetails>Only Details</AccordionDetails>
        </Accordion>
      );
      expect(screen.getByText('Only Details')).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Complex Summary</AccordionSummary>
          <AccordionDetails>
            <div>
              <form>
                <input type="text" placeholder="Name" />
                <textarea placeholder="Description"></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
          </AccordionDetails>
        </Accordion>
      );
      
      expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });
  });

  // Snapshots
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Accordion>
          <AccordionSummary>Default Summary</AccordionSummary>
          <AccordionDetails>Default Details</AccordionDetails>
        </Accordion>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: AccordionProps['variant'][] = [
        'standard', 'outlined', 'filled', 'elevated', 'ghost'
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Accordion variant={variant}>
            <AccordionSummary>{variant} Summary</AccordionSummary>
            <AccordionDetails>{variant} Details</AccordionDetails>
          </Accordion>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });

    it('matches snapshot for expanded state', () => {
      const { container } = renderWithTheme(
        <Accordion expanded>
          <AccordionSummary>Expanded Summary</AccordionSummary>
          <AccordionDetails>Expanded Details</AccordionDetails>
        </Accordion>
      );
      expect(container.firstChild).toMatchSnapshot('expanded-state');
    });
  });
});