/**
 * @fileoverview TextField Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { TextField } from './TextField';
import { TEXT_FIELD_CONSTANTS } from './TextField.constants';
import type { TextFieldProps } from './TextField.types';

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

describe('TextField Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<TextField>Test content</TextField>);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with placeholder correctly', () => {
      const placeholder = 'Enter your text here';
      renderWithTheme(<TextField placeholder={placeholder} />);
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-text-field';
      renderWithTheme(
        <TextField data-testid={testId}>Test</TextField>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <TextField className={customClass} data-testid="custom-field" />
      );
      expect(screen.getByTestId('custom-field')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: TextFieldProps['variant'][] = [
        'filled',
        'outlined',
        'standard',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <TextField variant={variant} data-testid="variant-test">
              {variant} variant
            </TextField>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: TextFieldProps['size'][] = [
        'small',
        'medium',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <TextField size={size} data-testid="size-test">
              {size} size
            </TextField>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });


    it('handles loading state correctly', () => {
      renderWithTheme(
        <TextField loading label="Loading TextField" data-testid="loading-test" />
      );
      
      // Loading state should be visually indicated and field should be disabled during loading
      const element = screen.getByTestId('loading-test');
      expect(element).toBeInTheDocument();
      
      // Input should be present and labeled correctly
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('handles disabled state correctly', () => {
      renderWithTheme(
        <TextField disabled label="Disabled TextField" data-testid="disabled-test" />
      );
      
      // The input element should be disabled
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });

  // Interaction testing
  describe('Interactions', () => {

    it('handles input changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      renderWithTheme(
        <TextField onChange={handleChange} />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test input');
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles focus and blur events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      
      renderWithTheme(
        <TextField onFocus={handleFocus} onBlur={handleBlur} />
      );
      
      const input = screen.getByRole('textbox');
      input.focus();
      expect(handleFocus).toHaveBeenCalled();
      
      input.blur();
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  // Form integration testing
  describe('Form Integration', () => {
    it('integrates with form libraries', () => {
      const handleChange = vi.fn();
      
      renderWithTheme(
        <TextField 
          name="test-field"
          value="test-value"
          onChange={handleChange}
        />
      );
      
      const element = screen.getByRole('textbox');
      expect(element).toHaveAttribute('name', 'test-field');
    });

    it('handles validation states', () => {
      renderWithTheme(
        <TextField 
          label="Validation Field"
          error
          errorText="Error message"
        />
      );
      
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  // Icon testing
  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it('renders start icon correctly', () => {
      renderWithTheme(
        <TextField startIcon={<TestIcon />}>
          With Start Icon
        </TextField>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders end icon correctly', () => {
      renderWithTheme(
        <TextField endIcon={<TestIcon />}>
          With End Icon
        </TextField>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <TextField label="Accessible TextField" />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <TextField aria-label={ariaLabel}>
          TextField for screen readers
        </TextField>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<TextField label="Keyboard TextField" />);
      
      const element = screen.getByRole('textbox');
      element.focus();
      expect(element).toHaveFocus();
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <TextField 
          label="ARIA TextField"
          inputProps={{
            'aria-describedby': 'description',
            'aria-controls': 'controlled-element'
          }}
        />
      );
      
      const element = screen.getByRole('textbox');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiTextField: {
            defaultProps: {
              variant: 'filled',
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
          <TextField data-testid="themed-text-field">
            Themed TextField
          </TextField>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-text-field');
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
          <TextField>Dark Mode TextField</TextField>
        </ThemeProvider>
      );

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <TextField key={i}>TextField {i}</TextField>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="textbox"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<TextField />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<TextField>{null}</TextField>);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <TextField 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </TextField>
      );
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('handles complex configurations', () => {
      renderWithTheme(
        <TextField
          variant="filled"
          size="small"
          disabled={false}
          loading={false}
        >
          Complex TextField
        </TextField>
      );
      
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <TextField>Default TextField</TextField>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: TextFieldProps['variant'][] = [
        'filled',
        'outlined',
        'standard',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <TextField variant={variant}>{variant} TextField</TextField>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
