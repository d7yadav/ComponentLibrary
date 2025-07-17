/**
 * @fileoverview DatePicker component Storybook stories
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React, {  useState  } from 'react';

import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Enhanced DatePicker component with comprehensive features:

- **Multiple input types** - Date, datetime, time, month, week
- **Validation states** - Success, warning, error states with custom messages
- **Date constraints** - Min/max date validation
- **Format support** - Multiple date formats and locales
- **Accessibility** - WCAG 2.1 AA compliant with full keyboard navigation
- **Today button** - Quick selection of current date/time

## Features

- ✅ **Native HTML5 inputs** - Leverages browser's built-in date pickers
- ✅ **Validation** - Built-in and custom validation support
- ✅ **Theming** - Seamless integration with MUI theme system
- ✅ **Accessibility** - Full keyboard navigation and screen reader support
- ✅ **Customization** - Extensive styling and behavior customization
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'The visual style variant of the input field',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the component',
    },
    type: {
      control: 'select',
      options: ['date', 'datetime-local', 'time', 'month', 'week'],
      description: 'The type of date/time input',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled',
    },
    error: {
      control: 'boolean',
      description: 'If true, displays error state styling',
    },
    success: {
      control: 'boolean',
      description: 'If true, displays success state styling',
    },
    warning: {
      control: 'boolean',
      description: 'If true, displays warning state styling',
    },
    required: {
      control: 'boolean',
      description: 'If true, the input is required',
    },
    clearable: {
      control: 'boolean',
      description: 'If true, shows clear button when value is selected',
    },
    showTodayButton: {
      control: 'boolean',
      description: 'If true, shows today/now button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the input will take up the full width of its container',
    },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
    onClear: { action: 'cleared' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Basic date picker
export const Default: Story = {
  args: {
    label: 'Select Date',
    placeholder: 'Choose a date...',
    onChange: action('date-changed'),
  },
};

// Different input types
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DatePicker
        type="date"
        label="Date"
        placeholder="Select date..."
        onChange={action('date-changed')}
      />
      <DatePicker
        type="datetime-local"
        label="Date & Time"
        placeholder="Select date and time..."
        onChange={action('datetime-changed')}
      />
      <DatePicker
        type="time"
        label="Time"
        placeholder="Select time..."
        onChange={action('time-changed')}
      />
      <DatePicker
        type="month"
        label="Month"
        placeholder="Select month..."
        onChange={action('month-changed')}
      />
      <DatePicker
        type="week"
        label="Week"
        placeholder="Select week..."
        onChange={action('week-changed')}
      />
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DatePicker
        size="small"
        label="Small Size"
        placeholder="Small date picker..."
        onChange={action('small-changed')}
      />
      <DatePicker
        size="medium"
        label="Medium Size"
        placeholder="Medium date picker..."
        onChange={action('medium-changed')}
      />
      <DatePicker
        size="large"
        label="Large Size"
        placeholder="Large date picker..."
        onChange={action('large-changed')}
      />
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DatePicker
        variant="outlined"
        label="Outlined Variant"
        placeholder="Outlined style..."
        onChange={action('outlined-changed')}
      />
      <DatePicker
        variant="filled"
        label="Filled Variant"
        placeholder="Filled style..."
        onChange={action('filled-changed')}
      />
      <DatePicker
        variant="standard"
        label="Standard Variant"
        placeholder="Standard style..."
        onChange={action('standard-changed')}
      />
    </div>
  ),
};

// Validation states
export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DatePicker
        label="Success State"
        placeholder="Valid date selection..."
        success
        successText="Great! Valid date selected."
        value="2024-12-25"
        onChange={action('success-changed')}
      />
      <DatePicker
        label="Warning State"
        placeholder="Warning date selection..."
        warning
        warningText="This date might be outside business hours."
        value="2024-12-31"
        onChange={action('warning-changed')}
      />
      <DatePicker
        label="Error State"
        placeholder="Invalid date selection..."
        error
        errorText="Please select a valid date."
        onChange={action('error-changed')}
      />
    </div>
  ),
};

// With constraints
export const WithConstraints: Story = {
  render: () => {
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <DatePicker
          label="Date Range (Next 7 Days)"
          placeholder="Select within range..."
          min={today}
          max={nextWeek}
          helperText={`Select between ${today} and ${nextWeek}`}
          onChange={action('constrained-changed')}
        />
        <DatePicker
          label="Future Dates Only"
          placeholder="Future dates only..."
          min={today}
          helperText="Only future dates are allowed"
          onChange={action('future-changed')}
        />
        <DatePicker
          type="time"
          label="Business Hours (9 AM - 5 PM)"
          placeholder="Select business hours..."
          min="09:00"
          max="17:00"
          step="900" // 15 minute intervals
          helperText="Business hours: 9:00 AM - 5:00 PM"
          onChange={action('business-hours-changed')}
        />
      </div>
    );
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Birth Date',
    placeholder: 'Required field...',
    required: true,
    helperText: 'This field is required',
    onChange: action('required-changed'),
  },
};

// With today button
export const WithTodayButton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DatePicker
        type="date"
        label="Date with Today Button"
        placeholder="Select date or click Today..."
        showTodayButton
        onChange={action('date-with-today-changed')}
      />
      <DatePicker
        type="datetime-local"
        label="DateTime with Now Button"
        placeholder="Select datetime or click Today..."
        showTodayButton
        onChange={action('datetime-with-now-changed')}
      />
      <DatePicker
        type="time"
        label="Time with Now Button"
        placeholder="Select time or click Now..."
        showTodayButton
        onChange={action('time-with-now-changed')}
      />
    </div>
  ),
};

// Controlled component
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('2024-07-15');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <DatePicker
          label="Controlled DatePicker"
          placeholder="Controlled value..."
          value={value}
          onChange={(newValue) => setValue(newValue as string)}
          showTodayButton
          clearable
        />
        <div>
          <strong>Current Value:</strong> {value || 'None'}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setValue('2024-12-25')}>
            Set Christmas
          </button>
          <button onClick={() => setValue('2024-01-01')}>
            Set New Year
          </button>
          <button onClick={() => setValue(null)}>
            Clear
          </button>
        </div>
      </div>
    );
  },
};

// Custom validation
export const CustomValidation: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    
    const validateWeekend = (date: string | Date | null): string | null => {
      if (!date) return null;
      
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      const dayOfWeek = dateObj.getDay();
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return 'Weekend dates are not allowed';
      }
      
      return null;
    };

    return (
      <DatePicker
        label="Weekdays Only"
        placeholder="Select a weekday..."
        value={value}
        onChange={(newValue) => setValue(newValue as string)}
        validate={validateWeekend}
        validateOnChange
        helperText="Only weekdays (Monday-Friday) are allowed"
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled DatePicker',
    placeholder: 'Cannot interact...',
    disabled: true,
    value: '2024-07-15',
    onChange: action('disabled-changed'),
  },
};

// Read-only state
export const ReadOnly: Story = {
  args: {
    label: 'Read-Only DatePicker',
    placeholder: 'Read-only value...',
    readOnly: true,
    value: '2024-07-15',
    helperText: 'This field is read-only',
    onChange: action('readonly-changed'),
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    label: 'Full Width DatePicker',
    placeholder: 'Takes full width...',
    fullWidth: true,
    showTodayButton: true,
    onChange: action('fullwidth-changed'),
  },
};

// Without clear button
export const WithoutClearButton: Story = {
  args: {
    label: 'No Clear Button',
    placeholder: 'Cannot clear...',
    clearable: false,
    value: '2024-07-15',
    onChange: action('no-clear-changed'),
  },
};