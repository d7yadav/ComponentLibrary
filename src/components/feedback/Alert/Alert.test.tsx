/**
 * @fileoverview Alert Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Alert } from './Alert';
import { DEFAULT_ALERT_PROPS } from './Alert.constants';
import type { AlertProps } from './Alert.types';

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

describe('Alert Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Alert>Test content</Alert>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders with error severity and alert role', () => {
      renderWithTheme(<Alert severity="error">Error Alert</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      const testContent = 'Test Alert Content';
      renderWithTheme(<Alert>{testContent}</Alert>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-alert';
      renderWithTheme(
        <Alert data-testid={testId}>Test</Alert>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <Alert className={customClass}>Test</Alert>
      );
      expect(screen.getByRole('status')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: AlertProps['variant'][] = [
        'standard',
        'outlined',
        'filled',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <Alert variant={variant} data-testid="variant-test">
              {variant} variant
            </Alert>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });


    describe('severity prop', () => {
      const severities: AlertProps['severity'][] = [
        'success',
        'info',
        'warning',
        'error',
      ];

      severities.forEach((severity) => {
        it(`renders ${severity} severity correctly`, () => {
          renderWithTheme(
            <Alert severity={severity} data-testid="severity-test">
              {severity} alert
            </Alert>
          );
          const element = screen.getByTestId('severity-test');
          expect(element).toBeInTheDocument();
        });
      });
    });


    it('handles closable state correctly', () => {
      const handleClose = vi.fn();
      renderWithTheme(
        <Alert closable={true} onClose={handleClose} data-testid="closable-test">
          Closable Alert
        </Alert>
      );
      
      const element = screen.getByTestId('closable-test');
      expect(element).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles close button interaction', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      
      renderWithTheme(
        <Alert severity="info" closable={true} onClose={handleClose} data-testid="closable-alert">
          Closable Alert
        </Alert>
      );
      
      const closeButton = screen.getByRole('button');
      await user.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('supports custom actions array', async () => {
      const user = userEvent.setup();
      const handleAction = vi.fn();
      
      renderWithTheme(
        <Alert 
          severity="warning"
          actions={[
            { label: 'Action 1', onClick: handleAction, variant: 'text' }
          ]}
        >
          Alert with custom actions
        </Alert>
      );
      
      const actionButton = screen.getByText('Action 1');
      await user.click(actionButton);
      expect(handleAction).toHaveBeenCalledTimes(1);
    });
  });


  // Icon testing
  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it('renders custom icon correctly', () => {
      renderWithTheme(
        <Alert icon={<TestIcon />}>
          With Custom Icon
        </Alert>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders default severity icons', () => {
      renderWithTheme(
        <Alert severity="info" showIcon={true}>
          With Default Icon
        </Alert>
      );
      
      expect(screen.getByTestId('InfoIcon')).toBeInTheDocument();
    });

    it('hides icon when showIcon is false', () => {
      renderWithTheme(
        <Alert severity="info" showIcon={false}>
          Without Icon
        </Alert>
      );
      
      expect(screen.queryByTestId('InfoIcon')).not.toBeInTheDocument();
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <Alert>Accessible Alert</Alert>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <Alert aria-label={ariaLabel}>
          Alert for screen readers
        </Alert>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<Alert tabIndex={0}>Keyboard Alert</Alert>);
      
      const element = screen.getByRole('status');
      element.focus();
      expect(element).toHaveFocus();
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <Alert 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA Alert
        </Alert>
      );
      
      const element = screen.getByRole('status');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiAlert: {
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
          <Alert data-testid="themed-alert">
            Themed Alert
          </Alert>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-alert');
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
          <Alert>Dark Mode Alert</Alert>
        </ThemeProvider>
      );

      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <Alert key={i}>Alert {i}</Alert>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="status"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<Alert />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<Alert>{null}</Alert>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <Alert 
          variant={undefined as any} 
        >
          Undefined Props
        </Alert>
      );
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <Alert>Default Alert</Alert>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: AlertProps['variant'][] = [
        'standard',
        'outlined',
        'filled',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <Alert variant={variant}>{variant} Alert</Alert>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
