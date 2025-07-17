import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Checkbox, CheckboxGroup } from './Checkbox';
import { TEST_IDS } from './Checkbox.constants';

expect.extend(toHaveNoViolations);

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      renderWithTheme(<Checkbox label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders without label', () => {
      renderWithTheme(<Checkbox data-testid="checkbox-only" />);
      expect(screen.getByTestId('checkbox-only')).toBeInTheDocument();
      expect(screen.queryByText(/label/i)).not.toBeInTheDocument();
    });

    it('renders with helper text', () => {
      renderWithTheme(
        <Checkbox label="Test" helperText="Helper text" />
      );
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      renderWithTheme(
        <Checkbox label="Test" error errorText="Error message" />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('renders required indicator', () => {
      renderWithTheme(<Checkbox label="Required Field" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('applies size prop correctly', () => {
      renderWithTheme(<Checkbox size="small" data-testid="small-checkbox" />);
      const checkbox = screen.getByTestId('small-checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('applies color prop correctly', () => {
      renderWithTheme(<Checkbox color="success" data-testid="success-checkbox" />);
      const checkbox = screen.getByTestId('success-checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('applies variant prop correctly', () => {
      renderWithTheme(<Checkbox variant="outlined" data-testid="outlined-checkbox" />);
      const checkbox = screen.getByTestId('outlined-checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('handles checked state', () => {
      renderWithTheme(<Checkbox checked />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.checked).toBe(true);
    });

    it('handles indeterminate state', () => {
      renderWithTheme(<Checkbox indeterminate />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.indeterminate).toBe(true);
    });

    it('handles disabled state', () => {
      renderWithTheme(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('handles loading state', () => {
      renderWithTheme(<Checkbox loading />);
      expect(screen.getByTestId(TEST_IDS.loadingSpinner)).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(<Checkbox onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('calls onChange when label is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(<Checkbox label="Click me" onChange={handleChange} />);
      
      const label = screen.getByText('Click me');
      await user.click(label);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard interactions', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(<Checkbox onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' ');
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(<Checkbox disabled onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when loading', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(<Checkbox loading onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Validation States', () => {
    it('applies error validation state', () => {
      renderWithTheme(
        <Checkbox validationState="error" helperText="Error state" />
      );
      expect(screen.getByText('Error state')).toBeInTheDocument();
    });

    it('applies success validation state', () => {
      renderWithTheme(
        <Checkbox validationState="success" helperText="Success state" />
      );
      expect(screen.getByText('Success state')).toBeInTheDocument();
    });

    it('applies warning validation state', () => {
      renderWithTheme(
        <Checkbox validationState="warning" helperText="Warning state" />
      );
      expect(screen.getByText('Warning state')).toBeInTheDocument();
    });

    it('prioritizes error prop over validationState', () => {
      renderWithTheme(
        <Checkbox 
          validationState="success" 
          error 
          errorText="Error message"
        />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('Label Placement', () => {
    it('renders with end label placement (default)', () => {
      renderWithTheme(<Checkbox label="End Label" labelPlacement="end" />);
      expect(screen.getByText('End Label')).toBeInTheDocument();
    });

    it('renders with start label placement', () => {
      renderWithTheme(<Checkbox label="Start Label" labelPlacement="start" />);
      expect(screen.getByText('Start Label')).toBeInTheDocument();
    });

    it('renders with top label placement', () => {
      renderWithTheme(<Checkbox label="Top Label" labelPlacement="top" />);
      expect(screen.getByText('Top Label')).toBeInTheDocument();
    });

    it('renders with bottom label placement', () => {
      renderWithTheme(<Checkbox label="Bottom Label" labelPlacement="bottom" />);
      expect(screen.getByText('Bottom Label')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderWithTheme(
        <Checkbox 
          label="Accessible Checkbox" 
          required 
          helperText="Helper text"
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-required', 'true');
      expect(checkbox).toHaveAttribute('aria-describedby');
    });

    it('has proper ARIA attributes for error state', () => {
      renderWithTheme(
        <Checkbox error errorText="Error message" />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });

    it('should not have accessibility violations', async () => {
      const { container } = renderWithTheme(
        <Checkbox 
          label="Accessible Checkbox" 
          helperText="Helper text"
          required
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations in error state', async () => {
      const { container } = renderWithTheme(
        <Checkbox 
          label="Error Checkbox" 
          error
          errorText="Error message"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('CheckboxGroup', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<CheckboxGroup options={defaultOptions} />);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('renders all options', () => {
      renderWithTheme(<CheckboxGroup options={defaultOptions} />);
      
      defaultOptions.forEach(option => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    it('renders with group label', () => {
      renderWithTheme(
        <CheckboxGroup label="Group Label" options={defaultOptions} />
      );
      expect(screen.getByText('Group Label')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      renderWithTheme(
        <CheckboxGroup 
          options={defaultOptions} 
          helperText="Group helper text" 
        />
      );
      expect(screen.getByText('Group helper text')).toBeInTheDocument();
    });

    it('renders required indicator for group label', () => {
      renderWithTheme(
        <CheckboxGroup 
          label="Required Group" 
          options={defaultOptions} 
          required 
        />
      );
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('applies direction prop correctly', () => {
      renderWithTheme(
        <CheckboxGroup 
          options={defaultOptions} 
          direction="row" 
          data-testid="row-group"
        />
      );
      expect(screen.getByTestId('row-group')).toBeInTheDocument();
    });

    it('handles value prop correctly', () => {
      renderWithTheme(
        <CheckboxGroup 
          options={defaultOptions} 
          value={['option1', 'option3']} 
        />
      );
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0].checked).toBe(true);  // option1
      expect(checkboxes[1].checked).toBe(false); // option2
      expect(checkboxes[2].checked).toBe(true);  // option3
    });

    it('handles disabled state for entire group', () => {
      renderWithTheme(
        <CheckboxGroup options={defaultOptions} disabled />
      );
      
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => {
        expect(checkbox).toBeDisabled();
      });
    });

    it('handles disabled state for individual options', () => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
        { value: 'option3', label: 'Option 3' },
      ];
      
      renderWithTheme(<CheckboxGroup options={optionsWithDisabled} />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0]).not.toBeDisabled();
      expect(checkboxes[1]).toBeDisabled();
      expect(checkboxes[2]).not.toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when option is selected', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(
        <CheckboxGroup 
          options={defaultOptions} 
          onChange={handleChange} 
        />
      );
      
      const firstCheckbox = screen.getByLabelText('Option 1');
      await user.click(firstCheckbox);
      
      expect(handleChange).toHaveBeenCalledWith(['option1']);
    });

    it('calls onChange when option is deselected', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(
        <CheckboxGroup 
          options={defaultOptions} 
          value={['option1']} 
          onChange={handleChange} 
        />
      );
      
      const firstCheckbox = screen.getByLabelText('Option 1');
      await user.click(firstCheckbox);
      
      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it('handles multiple selections', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(
        <CheckboxGroup 
          options={defaultOptions} 
          onChange={handleChange} 
        />
      );
      
      const firstCheckbox = screen.getByLabelText('Option 1');
      const thirdCheckbox = screen.getByLabelText('Option 3');
      
      await user.click(firstCheckbox);
      await user.click(thirdCheckbox);
      
      expect(handleChange).toHaveBeenCalledWith(['option1']);
      expect(handleChange).toHaveBeenCalledWith(['option1', 'option3']);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes for group', () => {
      renderWithTheme(
        <CheckboxGroup 
          label="Accessible Group" 
          options={defaultOptions} 
          required 
        />
      );
      
      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('aria-required', 'true');
      expect(group).toHaveAttribute('aria-invalid', 'false');
    });

    it('has proper ARIA attributes for error state', () => {
      renderWithTheme(
        <CheckboxGroup 
          options={defaultOptions} 
          error 
          helperText="Error message" 
        />
      );
      
      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('aria-invalid', 'true');
    });

    it('should not have accessibility violations', async () => {
      const { container } = renderWithTheme(
        <CheckboxGroup 
          label="Accessible Group"
          options={defaultOptions}
          helperText="Helper text"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      renderWithTheme(<CheckboxGroup options={[]} />);
      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });

    it('handles undefined value prop', () => {
      renderWithTheme(<CheckboxGroup options={defaultOptions} value={undefined} />);
      
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => {
        expect(checkbox.checked).toBe(false);
      });
    });

    it('handles onChange without callback', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(<CheckboxGroup options={defaultOptions} />);
      
      const firstCheckbox = screen.getByLabelText('Option 1');
      
      // Should not throw error
      await expect(user.click(firstCheckbox)).resolves.not.toThrow();
    });
  });
});