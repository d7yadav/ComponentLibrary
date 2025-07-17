import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Radio, RadioGroup } from './Radio';
import { TEST_IDS } from './Radio.constants';

expect.extend(toHaveNoViolations);

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Radio', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<Radio />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('renders with label', () => {
      renderWithTheme(<Radio label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('renders without label', () => {
      renderWithTheme(<Radio data-testid="radio-only" />);
      expect(screen.getByTestId('radio-only')).toBeInTheDocument();
      expect(screen.queryByText(/label/i)).not.toBeInTheDocument();
    });

    it('renders with helper text', () => {
      renderWithTheme(
        <Radio label="Test" helperText="Helper text" />
      );
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      renderWithTheme(
        <Radio label="Test" error errorText="Error message" />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('renders required indicator', () => {
      renderWithTheme(<Radio label="Required Field" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('applies size prop correctly', () => {
      renderWithTheme(<Radio size="small" data-testid="small-radio" />);
      const radio = screen.getByTestId('small-radio');
      expect(radio).toBeInTheDocument();
    });

    it('applies color prop correctly', () => {
      renderWithTheme(<Radio color="success" data-testid="success-radio" />);
      const radio = screen.getByTestId('success-radio');
      expect(radio).toBeInTheDocument();
    });

    it('applies variant prop correctly', () => {
      renderWithTheme(<Radio variant="outlined" data-testid="outlined-radio" />);
      const radio = screen.getByTestId('outlined-radio');
      expect(radio).toBeInTheDocument();
    });

    it('handles checked state', () => {
      renderWithTheme(<Radio checked />);
      const radio = screen.getByRole('radio');
      expect(radio.checked).toBe(true);
    });

    it('handles disabled state', () => {
      renderWithTheme(<Radio disabled />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
    });

    it('handles loading state', () => {
      renderWithTheme(<Radio loading />);
      expect(screen.getByTestId(TEST_IDS.loadingSpinner)).toBeInTheDocument();
      expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('handles value prop', () => {
      renderWithTheme(<Radio value="test-value" />);
      const radio = screen.getByRole('radio');
      expect(radio.value).toBe('test-value');
    });
  });

  describe('Interactions', () => {
    it('calls onChange when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(<Radio onChange={handleChange} />);
      
      const radio = screen.getByRole('radio');
      await user.click(radio);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('calls onChange when label is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(<Radio label="Click me" onChange={handleChange} />);
      
      const label = screen.getByText('Click me');
      await user.click(label);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard interactions', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(<Radio onChange={handleChange} />);
      
      const radio = screen.getByRole('radio');
      radio.focus();
      await user.keyboard(' ');
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(<Radio disabled onChange={handleChange} />);
      
      const radio = screen.getByRole('radio');
      await user.click(radio);
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when loading', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(<Radio loading onChange={handleChange} />);
      
      const radio = screen.getByRole('radio');
      await user.click(radio);
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Validation States', () => {
    it('applies error validation state', () => {
      renderWithTheme(
        <Radio validationState="error" helperText="Error state" />
      );
      expect(screen.getByText('Error state')).toBeInTheDocument();
    });

    it('applies success validation state', () => {
      renderWithTheme(
        <Radio validationState="success" helperText="Success state" />
      );
      expect(screen.getByText('Success state')).toBeInTheDocument();
    });

    it('applies warning validation state', () => {
      renderWithTheme(
        <Radio validationState="warning" helperText="Warning state" />
      );
      expect(screen.getByText('Warning state')).toBeInTheDocument();
    });

    it('prioritizes error prop over validationState', () => {
      renderWithTheme(
        <Radio 
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
      renderWithTheme(<Radio label="End Label" labelPlacement="end" />);
      expect(screen.getByText('End Label')).toBeInTheDocument();
    });

    it('renders with start label placement', () => {
      renderWithTheme(<Radio label="Start Label" labelPlacement="start" />);
      expect(screen.getByText('Start Label')).toBeInTheDocument();
    });

    it('renders with top label placement', () => {
      renderWithTheme(<Radio label="Top Label" labelPlacement="top" />);
      expect(screen.getByText('Top Label')).toBeInTheDocument();
    });

    it('renders with bottom label placement', () => {
      renderWithTheme(<Radio label="Bottom Label" labelPlacement="bottom" />);
      expect(screen.getByText('Bottom Label')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderWithTheme(
        <Radio 
          label="Accessible Radio" 
          required 
          helperText="Helper text"
        />
      );
      
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-required', 'true');
      expect(radio).toHaveAttribute('aria-describedby');
    });

    it('has proper ARIA attributes for error state', () => {
      renderWithTheme(
        <Radio error errorText="Error message" />
      );
      
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-invalid', 'true');
    });

    it('should not have accessibility violations', async () => {
      const { container } = renderWithTheme(
        <Radio 
          label="Accessible Radio" 
          helperText="Helper text"
          required
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations in error state', async () => {
      const { container } = renderWithTheme(
        <Radio 
          label="Error Radio" 
          error
          errorText="Error message"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('RadioGroup', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<RadioGroup options={defaultOptions} />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('renders all options', () => {
      renderWithTheme(<RadioGroup options={defaultOptions} />);
      
      defaultOptions.forEach(option => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    it('renders with group label', () => {
      renderWithTheme(
        <RadioGroup label="Group Label" options={defaultOptions} />
      );
      expect(screen.getByText('Group Label')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      renderWithTheme(
        <RadioGroup 
          options={defaultOptions} 
          helperText="Group helper text" 
        />
      );
      expect(screen.getByText('Group helper text')).toBeInTheDocument();
    });

    it('renders required indicator for group label', () => {
      renderWithTheme(
        <RadioGroup 
          label="Required Group" 
          options={defaultOptions} 
          required 
        />
      );
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('applies direction prop correctly for row layout', () => {
      renderWithTheme(
        <RadioGroup 
          options={defaultOptions} 
          direction="row" 
          data-testid="row-group"
        />
      );
      expect(screen.getByTestId('row-group')).toBeInTheDocument();
    });

    it('handles value prop correctly', () => {
      renderWithTheme(
        <RadioGroup 
          options={defaultOptions} 
          value="option2" 
        />
      );
      
      const radios = screen.getAllByRole('radio');
      expect(radios[0].checked).toBe(false); // option1
      expect(radios[1].checked).toBe(true);  // option2
      expect(radios[2].checked).toBe(false); // option3
    });

    it('handles disabled state for entire group', () => {
      renderWithTheme(
        <RadioGroup options={defaultOptions} disabled />
      );
      
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toBeDisabled();
      });
    });

    it('handles disabled state for individual options', () => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
        { value: 'option3', label: 'Option 3' },
      ];
      
      renderWithTheme(<RadioGroup options={optionsWithDisabled} />);
      
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).not.toBeDisabled();
      expect(radios[1]).toBeDisabled();
      expect(radios[2]).not.toBeDisabled();
    });

    it('handles name prop correctly', () => {
      renderWithTheme(
        <RadioGroup options={defaultOptions} name="test-group" />
      );
      
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio.name).toBe('test-group');
      });
    });
  });

  describe('Interactions', () => {
    it('calls onChange when option is selected', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(
        <RadioGroup 
          options={defaultOptions} 
          onChange={handleChange} 
        />
      );
      
      const firstRadio = screen.getByLabelText('Option 1');
      await user.click(firstRadio);
      
      expect(handleChange).toHaveBeenCalledWith('option1');
    });

    it('allows only one selection at a time', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(
        <RadioGroup 
          options={defaultOptions} 
          onChange={handleChange} 
        />
      );
      
      const firstRadio = screen.getByLabelText('Option 1');
      const secondRadio = screen.getByLabelText('Option 2');
      
      await user.click(firstRadio);
      await user.click(secondRadio);
      
      expect(handleChange).toHaveBeenCalledWith('option1');
      expect(handleChange).toHaveBeenCalledWith('option2');
      expect(handleChange).toHaveBeenCalledTimes(2);
    });

    it('handles keyboard navigation between options', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(<RadioGroup options={defaultOptions} />);
      
      const firstRadio = screen.getByLabelText('Option 1');
      
      firstRadio.focus();
      await user.keyboard('{ArrowDown}');
      
      const secondRadio = screen.getByLabelText('Option 2');
      expect(secondRadio).toHaveFocus();
    });
  });

  describe('Validation States', () => {
    it('applies error validation state to group', () => {
      renderWithTheme(
        <RadioGroup 
          options={defaultOptions} 
          error 
          errorText="Error message" 
        />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('applies success validation state to group', () => {
      renderWithTheme(
        <RadioGroup 
          options={defaultOptions} 
          validationState="success" 
          helperText="Success message" 
        />
      );
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });

    it('prioritizes error over validation state', () => {
      renderWithTheme(
        <RadioGroup 
          options={defaultOptions} 
          validationState="success" 
          error 
          errorText="Error message"
        />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes for group', () => {
      renderWithTheme(
        <RadioGroup 
          label="Accessible Group" 
          options={defaultOptions} 
          required 
        />
      );
      
      const group = screen.getByRole('radiogroup');
      expect(group).toHaveAttribute('aria-required', 'true');
      expect(group).toHaveAttribute('aria-invalid', 'false');
    });

    it('has proper ARIA attributes for error state', () => {
      renderWithTheme(
        <RadioGroup 
          options={defaultOptions} 
          error 
          helperText="Error message" 
        />
      );
      
      const group = screen.getByRole('radiogroup');
      expect(group).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates helper text with group', () => {
      renderWithTheme(
        <RadioGroup 
          options={defaultOptions} 
          helperText="Helper text" 
        />
      );
      
      const group = screen.getByRole('radiogroup');
      const helperText = screen.getByText('Helper text');
      
      expect(group).toHaveAttribute('aria-describedby');
      expect(helperText).toBeInTheDocument();
    });

    it('should not have accessibility violations', async () => {
      const { container } = renderWithTheme(
        <RadioGroup 
          label="Accessible Group"
          options={defaultOptions}
          helperText="Helper text"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations with error state', async () => {
      const { container } = renderWithTheme(
        <RadioGroup 
          label="Error Group"
          options={defaultOptions}
          error
          errorText="Error message"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      renderWithTheme(<RadioGroup options={[]} />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
      expect(screen.queryByRole('radio')).not.toBeInTheDocument();
    });

    it('handles undefined value prop', () => {
      renderWithTheme(<RadioGroup options={defaultOptions} value={undefined} />);
      
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio.checked).toBe(false);
      });
    });

    it('handles onChange without callback', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(<RadioGroup options={defaultOptions} />);
      
      const firstRadio = screen.getByLabelText('Option 1');
      
      // Should not throw error
      await expect(user.click(firstRadio)).resolves.not.toThrow();
    });

    it('handles options with custom radioProps', () => {
      const optionsWithProps = [
        { 
          value: 'option1', 
          label: 'Option 1',
          radioProps: { 'data-testid': 'custom-radio' }
        },
      ];
      
      renderWithTheme(<RadioGroup options={optionsWithProps} />);
      
      expect(screen.getByTestId('custom-radio')).toBeInTheDocument();
    });
  });
});