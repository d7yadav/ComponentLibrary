/**
 * @fileoverview Autocomplete component Storybook stories
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import { Search, Person, LocationOn, Star } from '@mui/icons-material';
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Autocomplete } from './Autocomplete';
import type { AutocompleteOption } from './Autocomplete.types';

// Create a spy function that returns a Promise
const asyncSpy = async () => [];

// Sample data
const countries: AutocompleteOption[] = [
  { id: 1, label: 'United States', value: 'US', category: 'North America' },
  { id: 2, label: 'Canada', value: 'CA', category: 'North America' },
  { id: 3, label: 'United Kingdom', value: 'GB', category: 'Europe' },
  { id: 4, label: 'France', value: 'FR', category: 'Europe' },
  { id: 5, label: 'Germany', value: 'DE', category: 'Europe' },
  { id: 6, label: 'Japan', value: 'JP', category: 'Asia' },
  { id: 7, label: 'Australia', value: 'AU', category: 'Oceania' },
  { id: 8, label: 'Brazil', value: 'BR', category: 'South America' },
];

const users: AutocompleteOption[] = [
  { id: 1, label: 'John Doe', value: 'john', description: 'Software Engineer', icon: <Person /> },
  { id: 2, label: 'Jane Smith', value: 'jane', description: 'Product Manager', icon: <Person /> },
  { id: 3, label: 'Bob Johnson', value: 'bob', description: 'Designer', icon: <Person /> },
  { id: 4, label: 'Alice Brown', value: 'alice', description: 'Data Scientist', icon: <Person /> },
];

const cities: AutocompleteOption[] = [
  { id: 1, label: 'New York', value: 'ny', icon: <LocationOn /> },
  { id: 2, label: 'London', value: 'london', icon: <LocationOn /> },
  { id: 3, label: 'Tokyo', value: 'tokyo', icon: <LocationOn /> },
  { id: 4, label: 'Paris', value: 'paris', icon: <LocationOn /> },
  { id: 5, label: 'Sydney', value: 'sydney', icon: <LocationOn /> },
];

const meta: Meta<typeof Autocomplete> = {
  title: 'Forms/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Enhanced Autocomplete component with comprehensive features:

- **Single and multiple selection** - Choose one or many options
- **Async data loading** - Load options dynamically with debouncing
- **Custom filtering** - Multiple filter modes and custom filter functions
- **Keyboard navigation** - Full keyboard accessibility
- **Grouping support** - Organize options into categories
- **Free solo input** - Allow custom values not in the options list
- **Validation states** - Success/error states with custom messages

## Features

- ✅ **Accessibility** - WCAG 2.1 AA compliant with full keyboard navigation
- ✅ **Theming** - Seamless integration with MUI theme system
- ✅ **Performance** - Optimized rendering with debounced async loading
- ✅ **Customization** - Extensive render prop support for custom UI
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
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether to allow single or multiple selection',
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
    loading: {
      control: 'boolean',
      description: 'If true, displays loading indicator',
    },
    clearable: {
      control: 'boolean',
      description: 'If true, shows clear button when value is selected',
    },
    freeSolo: {
      control: 'boolean',
      description: 'If true, allows custom values not in options',
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the input will take up the full width of its container',
    },
    onChange: { action: 'changed' },
    onInputChange: { action: 'input-changed' },
    onOpen: { action: 'opened' },
    onClose: { action: 'closed' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// Basic autocomplete
export const Default: Story = {
  args: {
    label: 'Select Country',
    placeholder: 'Search countries...',
    options: countries,
    onChange: fn(),
    onInputChange: fn(),
    onLoadOptions: asyncSpy,
  },
};

// Multiple selection
export const MultipleSelection: Story = {
  args: {
    label: 'Select Countries',
    placeholder: 'Search and select multiple countries...',
    options: countries,
    selectionMode: 'multiple',
    limitTags: 2,
    onChange: fn(),
    onInputChange: fn(),
    onLoadOptions: asyncSpy,
  },
};

// With icons and descriptions
export const WithIconsAndDescriptions: Story = {
  args: {
    label: 'Select User',
    placeholder: 'Search users...',
    options: users,
    onChange: fn(),
    onInputChange: fn(),
    onLoadOptions: asyncSpy,
  },
};

// Grouped options
export const GroupedOptions: Story = {
  args: {
    label: 'Select Country',
    placeholder: 'Search countries...',
    options: countries,
    groupBy: (option) => option.category || 'Other',
    onChange: fn(),
    onInputChange: fn(),
    onLoadOptions: asyncSpy,
  },
};

// Free solo mode
export const FreeSolo: Story = {
  args: {
    label: 'Enter or Select City',
    placeholder: 'Type any city name...',
    options: cities,
    freeSolo: true,
    onChange: fn(),
    onInputChange: fn(),
    onLoadOptions: asyncSpy,
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Autocomplete
        size="small"
        label="Small Size"
        placeholder="Small autocomplete..."
        options={countries.slice(0, 5)}
        onChange={fn()}
        onLoadOptions={asyncSpy}
      />
      <Autocomplete
        size="medium"
        label="Medium Size"
        placeholder="Medium autocomplete..."
        options={countries.slice(0, 5)}
        onChange={fn()}
        onLoadOptions={asyncSpy}
      />
      <Autocomplete
        size="large"
        label="Large Size"
        placeholder="Large autocomplete..."
        options={countries.slice(0, 5)}
        onChange={fn()}
        onLoadOptions={asyncSpy}
      />
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Autocomplete
        variant="outlined"
        label="Outlined Variant"
        placeholder="Outlined style..."
        options={countries.slice(0, 5)}
        onChange={fn()}
        onLoadOptions={asyncSpy}
      />
      <Autocomplete
        variant="filled"
        label="Filled Variant"
        placeholder="Filled style..."
        options={countries.slice(0, 5)}
        onChange={fn()}
        onLoadOptions={asyncSpy}
      />
      <Autocomplete
        variant="standard"
        label="Standard Variant"
        placeholder="Standard style..."
        options={countries.slice(0, 5)}
        onChange={fn()}
        onLoadOptions={asyncSpy}
      />
    </div>
  ),
};

// Validation states
export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Autocomplete
        label="Success State"
        placeholder="Valid selection..."
        options={countries.slice(0, 5)}
        success
        successText="Great choice!"
        value={countries[0]}
        onChange={fn()}
        onLoadOptions={asyncSpy}
      />
      <Autocomplete
        label="Error State"
        placeholder="Invalid selection..."
        options={countries.slice(0, 5)}
        error
        errorText="Please select a valid country"
        onChange={fn()}
        onLoadOptions={asyncSpy}
      />
      <Autocomplete
        label="Loading State"
        placeholder="Loading options..."
        options={countries.slice(0, 5)}
        loading
        onChange={fn()}
        onLoadOptions={asyncSpy}
      />
    </div>
  ),
};

// Controlled component
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<AutocompleteOption | null>(null);
    const [inputValue, setInputValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Autocomplete
          label="Controlled Autocomplete"
          placeholder="Search countries..."
          options={countries}
          value={value}
          inputValue={inputValue}
          onChange={(newValue) => setValue(newValue as AutocompleteOption | null)}
          onInputChange={(newInputValue) => setInputValue(newInputValue)}
          onLoadOptions={asyncSpy}
        />
        <div>
          <strong>Selected Value:</strong> {value ? value.label : 'None'}
        </div>
        <div>
          <strong>Input Value:</strong> {inputValue || 'Empty'}
        </div>
      </div>
    );
  },
};

// Async loading simulation
export const AsyncLoading: Story = {
  render: () => {
    const [options, setOptions] = useState<AutocompleteOption[]>([]);
    const [loading, setLoading] = useState(false);

    const handleLoadOptions = async (inputValue: string): Promise<AutocompleteOption[]> => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const filteredCountries = countries.filter(country =>
        country.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      
      setLoading(false);
      setOptions(filteredCountries);
      return filteredCountries;
    };

    return (
      <Autocomplete
        label="Async Autocomplete"
        placeholder="Type to search countries..."
        options={options}
        loading={loading}
        minSearchLength={2}
        debounceMs={500}
        onLoadOptions={handleLoadOptions}
        onChange={fn()}
        helperText="Type at least 2 characters to search"
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled Autocomplete',
    placeholder: 'Cannot interact...',
    options: countries,
    disabled: true,
    value: countries[0],
    onChange: fn(),
    onLoadOptions: asyncSpy,
  },
};

// Custom render functions
export const CustomRendering: Story = {
  args: {
    label: 'Custom Rendered Options',
    placeholder: 'Search with custom rendering...',
    options: users,
    renderOption: (props, option) => (
      <li {...props} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8 }}>
        {option.icon}
        <div>
          <div style={{ fontWeight: 'bold' }}>{option.label}</div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>{option.description}</div>
        </div>
        <Star style={{ marginLeft: 'auto', color: '#ffd700' }} />
      </li>
    ),
    onChange: fn(),
    onLoadOptions: asyncSpy,
  },
};