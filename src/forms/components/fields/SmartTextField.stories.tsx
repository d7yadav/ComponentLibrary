import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert } from '@/components/feedback/Alert';
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Paper } from '@/components/surfaces/Paper';

import { useAdvancedForm } from '@/forms/core/hooks/useAdvancedForm';
import { SmartFormProvider } from '@/forms/core/providers/FormProvider';
import { commonValidationRules } from '@/forms/validation/ValidationEngine';

import { SmartTextField } from './SmartTextField';

/**
 * SmartTextField is an intelligent form field component that provides advanced features
 * including auto-suggestions, real-time validation, input formatting, and accessibility support.
 * 
 * ## Key Features
 * - Auto-suggestions (static and async)
 * - Real-time validation with debouncing
 * - Input/display formatters
 * - Character counting with limits
 * - Multiple validation rules
 * - Accessibility optimizations
 * - Performance optimizations
 */
const meta: Meta<typeof SmartTextField> = {
  title: 'Forms/SmartTextField',
  component: SmartTextField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Advanced TextField component with intelligent features for modern forms.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the field for form handling',
    },
    label: {
      control: 'text',
      description: 'The label text for the field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when field is empty',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    multiline: {
      control: 'boolean',
      description: 'Whether the field supports multiple lines',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character limit',
    },
    showCharCount: {
      control: 'boolean',
      description: 'Whether to show character count',
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds',
    },
    inputMode: {
      control: 'select',
      options: ['text', 'numeric', 'tel', 'search', 'email', 'url'],
      description: 'Input mode for mobile keyboards',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== WRAPPER COMPONENT =====

const FormWrapper: React.FC<{ children: React.ReactNode; onSubmit?: (data: any) => void }> = ({ 
  children, 
  onSubmit = fn() 
}) => {
  const form = useAdvancedForm({
    mode: 'onChange',
    performance: { debounceMs: 300 },
  });

  return (
    <SmartFormProvider 
      form={form} 
      config={{ mode: 'onChange' }}
      onSubmit={onSubmit}
    >
      <FormProvider {...form}>
        <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {children}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => form.reset()}>
                  Reset
                </button>
                <button type="submit">
                  Submit
                </button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </FormProvider>
    </SmartFormProvider>
  );
};

// ===== BASIC STORIES =====

export const Default: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="default"
        label="Default Text Field"
        placeholder="Enter some text..."
      />
    </FormWrapper>
  ),
};

export const Required: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="required"
        label="Required Field"
        placeholder="This field is required"
        required
      />
    </FormWrapper>
  ),
};

export const Multiline: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="multiline"
        label="Multiline Text"
        placeholder="Enter multiple lines of text..."
        multiline
        rows={4}
      />
    </FormWrapper>
  ),
};

export const WithCharacterLimit: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="charLimit"
        label="Character Limited"
        placeholder="Maximum 100 characters"
        maxLength={100}
        showCharCount
      />
    </FormWrapper>
  ),
};

// ===== VALIDATION STORIES =====

export const EmailValidation: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        required
        inputMode="email"
        validation={[
          commonValidationRules.required('Email is required'),
          commonValidationRules.email('Please enter a valid email'),
        ]}
      />
    </FormWrapper>
  ),
};

export const PhoneValidation: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="phone"
        label="Phone Number"
        placeholder="Enter your phone number"
        inputMode="tel"
        validation={[
          commonValidationRules.phone('Please enter a valid phone number'),
        ]}
      />
    </FormWrapper>
  ),
};

export const URLValidation: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="website"
        label="Website URL"
        placeholder="https://example.com"
        inputMode="url"
        validation={[
          commonValidationRules.url('Please enter a valid URL'),
        ]}
      />
    </FormWrapper>
  ),
};

export const AsyncValidation: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="username"
        label="Username"
        placeholder="Enter a unique username"
        required
        validation={[
          commonValidationRules.required('Username is required'),
          commonValidationRules.custom(
            async (value: string) => {
              // Simulate async validation
              await new Promise(resolve => setTimeout(resolve, 1000));
              return !['admin', 'root', 'test'].includes(value.toLowerCase());
            },
            'Username is not available',
            true // async
          ),
        ]}
        debounceMs={500}
      />
    </FormWrapper>
  ),
};

// ===== SUGGESTIONS STORIES =====

export const StaticSuggestions: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="country"
        label="Country"
        placeholder="Start typing a country name..."
        suggestions={[
          'United States',
          'United Kingdom',
          'Canada',
          'Australia',
          'Germany',
          'France',
          'Italy',
          'Spain',
          'Japan',
          'China',
          'India',
          'Brazil',
        ]}
      />
    </FormWrapper>
  ),
};

export const AsyncSuggestions: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="city"
        label="City"
        placeholder="Start typing a city name..."
        suggestions={async (inputValue: string) => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const cities = [
            'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
            'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
            'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
            'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington',
          ];
          
          return cities.filter(city => 
            city.toLowerCase().includes(inputValue.toLowerCase())
          );
        }}
        debounceMs={300}
      />
    </FormWrapper>
  ),
};

// ===== FORMATTING STORIES =====

export const CurrencyFormat: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="amount"
        label="Amount"
        placeholder="Enter amount"
        inputMode="numeric"
        formatters={{
          onInput: (value: string) => {
            // Remove non-numeric characters except decimal point
            const numericValue = value.replace(/[^0-9.]/g, '');
            return numericValue;
          },
          onDisplay: (value: string) => {
            // Format as currency for display
            const number = parseFloat(value);
            return isNaN(number) ? value : `$${number.toFixed(2)}`;
          },
        }}
      />
    </FormWrapper>
  ),
};

export const PhoneFormat: Story = {
  render: () => (
    <FormWrapper>
      <SmartTextField
        name="formattedPhone"
        label="Phone Number"
        placeholder="Enter phone number"
        inputMode="tel"
        formatters={{
          onInput: (value: string) => {
            // Remove non-numeric characters
            const numbers = value.replace(/\D/g, '');
            
            // Format as (XXX) XXX-XXXX
            if (numbers.length >= 6) {
              return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
            } else if (numbers.length >= 3) {
              return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
            }
            return numbers;
          },
        }}
        maxLength={14}
      />
    </FormWrapper>
  ),
};

// ===== COMPLEX EXAMPLES =====

export const ComprehensiveExample: Story = {
  render: () => {
    const schema = z.object({
      firstName: z.string().min(2, 'First name must be at least 2 characters'),
      lastName: z.string().min(2, 'Last name must be at least 2 characters'),
      email: z.string().email('Invalid email format'),
      phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Invalid phone format'),
      bio: z.string().max(500, 'Bio must be less than 500 characters'),
    });

    const form = useAdvancedForm({
      mode: 'onChange',
      schema,
      performance: { debounceMs: 300 },
      persistence: { enabled: true, key: 'user-profile' },
    });

    return (
      <SmartFormProvider form={form} config={{ mode: 'onChange' }}>
        <FormProvider {...form}>
          <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              User Profile Form
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Complete form with validation, formatting, and suggestions
            </Typography>
            
            <Box component="form" onSubmit={form.handleSubmit(fn())}>
              <Stack spacing={3} sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <SmartTextField
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    required
                    suggestions={['John', 'Jane', 'Michael', 'Sarah', 'David']}
                  />
                  <SmartTextField
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    required
                    suggestions={['Smith', 'Johnson', 'Williams', 'Brown', 'Jones']}
                  />
                </Box>

                <SmartTextField
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  required
                  inputMode="email"
                  validation={[
                    commonValidationRules.required('Email is required'),
                    commonValidationRules.email('Please enter a valid email'),
                  ]}
                />

                <SmartTextField
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  inputMode="tel"
                  formatters={{
                    onInput: (value: string) => {
                      const numbers = value.replace(/\D/g, '');
                      if (numbers.length >= 6) {
                        return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
                      } else if (numbers.length >= 3) {
                        return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
                      }
                      return numbers;
                    },
                  }}
                  maxLength={14}
                />

                <SmartTextField
                  name="bio"
                  label="Bio"
                  placeholder="Tell us about yourself..."
                  multiline
                  rows={4}
                  maxLength={500}
                  showCharCount
                />

                <Alert severity="info">
                  Form data is automatically saved to localStorage as you type.
                </Alert>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => form.reset()}>
                    Reset
                  </button>
                  <button type="submit">
                    Submit
                  </button>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </FormProvider>
      </SmartFormProvider>
    );
  },
};

// ===== ACCESSIBILITY STORIES =====

export const AccessibilityDemo: Story = {
  render: () => (
    <FormWrapper>
      <Stack spacing={3}>
        <Typography variant="h6">Accessibility Features</Typography>
        
        <SmartTextField
          name="accessibleField"
          label="Accessible Field"
          placeholder="This field has full accessibility support"
          required
          aria-label="Accessible text field with screen reader support"
          aria-describedby="field-description"
        />
        
        <Typography id="field-description" variant="caption" color="text.secondary">
          This field demonstrates accessibility features including proper ARIA labels,
          keyboard navigation, and screen reader announcements.
        </Typography>
        
        <SmartTextField
          name="errorField"
          label="Field with Error"
          placeholder="Try entering invalid data"
          required
          validation={[
            commonValidationRules.custom(
              (value: string) => value.length >= 5,
              'Must be at least 5 characters'
            ),
          ]}
        />
      </Stack>
    </FormWrapper>
  ),
};

// ===== PERFORMANCE STORIES =====

export const PerformanceDemo: Story = {
  render: () => (
    <FormWrapper>
      <Stack spacing={3}>
        <Typography variant="h6">Performance Optimizations</Typography>
        
        <SmartTextField
          name="debounced"
          label="Debounced Validation"
          placeholder="Validation is debounced (500ms)"
          debounceMs={500}
          validation={[
            commonValidationRules.custom(
              async (value: string) => {
                await new Promise(resolve => setTimeout(resolve, 200));
                return value.length > 0;
              },
              'Field cannot be empty',
              true
            ),
          ]}
        />
        
        <SmartTextField
          name="optimized"
          label="Optimized Suggestions"
          placeholder="Suggestions are cached and optimized"
          suggestions={async (inputValue: string) => {
            // Simulate expensive operation
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const suggestions = Array.from({ length: 100 }, (_, i) => 
              `${inputValue} suggestion ${i + 1}`
            );
            
            return suggestions.slice(0, 10);
          }}
          debounceMs={300}
        />
        
        <Alert severity="info">
          This demo shows debounced validation and optimized async suggestions
          to improve performance with frequent updates.
        </Alert>
      </Stack>
    </FormWrapper>
  ),
};

// ===== INTERACTIVE PLAYGROUND =====

export const InteractivePlayground: Story = {
  render: () => {
    const [config, setConfig] = React.useState({
      required: true,
      multiline: false,
      showCharCount: false,
      maxLength: 0,
      debounceMs: 300,
      inputMode: 'text' as const,
    });

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          SmartTextField Playground
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* Controls */}
          <Paper sx={{ p: 2, minWidth: 250 }}>
            <Typography variant="h6" gutterBottom>
              Configuration
            </Typography>
            <Stack spacing={2}>
              <label>
                <input
                  type="checkbox"
                  checked={config.required}
                  onChange={(e) => setConfig(prev => ({ ...prev, required: e.target.checked }))}
                />
                Required
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={config.multiline}
                  onChange={(e) => setConfig(prev => ({ ...prev, multiline: e.target.checked }))}
                />
                Multiline
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={config.showCharCount}
                  onChange={(e) => setConfig(prev => ({ ...prev, showCharCount: e.target.checked }))}
                />
                Show Character Count
              </label>
              
              <label>
                Max Length:
                <input
                  type="number"
                  value={config.maxLength}
                  onChange={(e) => setConfig(prev => ({ ...prev, maxLength: parseInt(e.target.value) || 0 }))}
                  min="0"
                  max="1000"
                />
              </label>
              
              <label>
                Debounce (ms):
                <input
                  type="number"
                  value={config.debounceMs}
                  onChange={(e) => setConfig(prev => ({ ...prev, debounceMs: parseInt(e.target.value) || 300 }))}
                  min="0"
                  max="2000"
                />
              </label>
              
              <label>
                Input Mode:
                <select
                  value={config.inputMode}
                  onChange={(e) => setConfig(prev => ({ ...prev, inputMode: e.target.value as any }))}
                >
                  <option value="text">Text</option>
                  <option value="numeric">Numeric</option>
                  <option value="tel">Tel</option>
                  <option value="email">Email</option>
                  <option value="url">URL</option>
                </select>
              </label>
            </Stack>
          </Paper>
          
          {/* Preview */}
          <Box sx={{ flex: 1 }}>
            <FormWrapper>
              <SmartTextField
                name="playground"
                label="Playground Field"
                placeholder="Test the configuration..."
                required={config.required}
                multiline={config.multiline}
                showCharCount={config.showCharCount}
                maxLength={config.maxLength || undefined}
                debounceMs={config.debounceMs}
                inputMode={config.inputMode}
                rows={config.multiline ? 4 : undefined}
                suggestions={['Option 1', 'Option 2', 'Option 3']}
                validation={config.required ? [commonValidationRules.required('This field is required')] : []}
              />
            </FormWrapper>
          </Box>
        </Box>
      </Box>
    );
  },
};