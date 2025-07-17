import { 
  Home,
  Work,
  School,
  LocationOn,
  Phone,
  Email,
  CreditCard,
  AccountBalance,
  Payment 
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Typography } from '@/components/data-display/Typography'; // Replaced MUI Typography with internal wrapper as per migration guidelines
import { Box } from '@/components/layout/Box'; // Replaced MUI Box with internal wrapper as per migration guidelines
import { Stack } from '@/components/layout/Stack'; // Replaced MUI Stack with internal wrapper as per migration guidelines

import { Radio, RadioGroup } from './Radio';
import { RADIO_SIZES, RADIO_COLORS, RADIO_VARIANTS } from './Radio.constants';

const meta: Meta<typeof Radio> = {
  title: 'Forms/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Enhanced Radio component with comprehensive theming, validation states, and accessibility features for single-choice selections.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(RADIO_SIZES),
      description: 'Size of the radio button',
    },
    color: {
      control: 'select',
      options: Object.values(RADIO_COLORS),
      description: 'Color scheme of the radio button',
    },
    variant: {
      control: 'select',
      options: Object.values(RADIO_VARIANTS),
      description: 'Visual variant of the radio button',
    },
    label: {
      control: 'text',
      description: 'Label text for the radio button',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the radio button',
    },
    error: {
      control: 'boolean',
      description: 'Whether the radio button is in error state',
    },
    errorText: {
      control: 'text',
      description: 'Error message to display',
    },
    validationState: {
      control: 'select',
      options: ['none', 'success', 'warning', 'error'],
      description: 'Validation state for styling',
    },
    required: {
      control: 'boolean',
      description: 'Whether the radio button is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Position of the label relative to the radio button',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked',
    },
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Radio Button Label',
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// Default story
/**
 * Default component
 * 
 * @returns JSX element
 */
export const Default: Story = {
  args: {
    label: 'Default Radio Button',
  },
};

// Size variants
/**
 * Sizes component
 * 
 * @returns JSX element
 */
export const Sizes: Story = {
  render: () => (
    <Stack data-testid="radio.stories" spacing={2}>
      <Typography variant="h6">Radio Button Sizes</Typography>
      <Stack data-testid="radio.stories" direction="row" spacing={3} alignItems="center">
        <Radio size="small" label="Small" value="small" onChange={fn()} />
        <Radio size="medium" label="Medium" value="medium" onChange={fn()} />
        <Radio size="large" label="Large" value="large" onChange={fn()} />
      </Stack>
    </Stack>
  ),
};

// Color variants
/**
 * Colors component
 * 
 * @returns JSX element
 */
export const Colors: Story = {
  render: () => (
    <Stack data-testid="radio.stories" spacing={2}>
      <Typography variant="h6">Radio Button Colors</Typography>
      <Stack data-testid="radio.stories" spacing={1}>
        {Object.values(RADIO_COLORS).map((color) => (
          <Radio
            key={color}
            color={color}
            label={`${color.charAt(0).toUpperCase() + color.slice(1)} Radio`}
            value={color}
            checked
            onChange={fn()}
          />
        ))}
      </Stack>
    </Stack>
  ),
};

// Variants
/**
 * Variants component
 * 
 * @returns JSX element
 */
export const Variants: Story = {
  render: () => (
    <Stack data-testid="radio.stories" spacing={3}>
      <Typography variant="h6">Radio Button Variants</Typography>
      {Object.values(RADIO_VARIANTS).map((variant) => (
        <Box key={variant}>
          <Typography variant="subtitle2" sx={{ mb: 1, textTransform: 'capitalize' }}>
            {variant} Variant
          </Typography>
          <Stack data-testid="radio.stories" direction="row" spacing={2}>
            <Radio variant={variant} label="Unchecked" value="unchecked" onChange={fn()} />
            <Radio variant={variant} label="Checked" value="checked" checked onChange={fn()} />
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
};

// States
/**
 * States component
 * 
 * @returns JSX element
 */
export const States: Story = {
  render: () => (
    <Stack data-testid="radio.stories" spacing={3}>
      <Typography variant="h6">Radio Button States</Typography>
      
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Basic States</Typography>
        <Stack data-testid="radio.stories" spacing={1}>
          <Radio label="Default" value="default" onChange={fn()} />
          <Radio label="Checked" value="checked" checked onChange={fn()} />
          <Radio label="Disabled" value="disabled" disabled onChange={fn()} />
          <Radio label="Disabled Checked" value="disabled-checked" disabled checked onChange={fn()} />
          <Radio label="Loading" value="loading" loading onChange={fn()} />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Validation States</Typography>
        <Stack data-testid="radio.stories" spacing={1}>
          <Radio label="Success" validationState="success" value="success" checked onChange={fn()} />
          <Radio label="Warning" validationState="warning" value="warning" checked onChange={fn()} />
          <Radio label="Error" validationState="error" value="error" checked onChange={fn()} />
        </Stack>
      </Box>
    </Stack>
  ),
};

// Label positioning
/**
 * LabelPositioning component
 * 
 * @returns JSX element
 */
export const LabelPositioning: Story = {
  render: () => (
    <Stack data-testid="radio.stories" spacing={3}>
      <Typography variant="h6">Label Positioning</Typography>
      <Stack data-testid="radio.stories" direction="row" spacing={4} alignItems="flex-start">
        <Radio label="End (Default)" labelPlacement="end" value="end" checked onChange={fn()} />
        <Radio label="Start" labelPlacement="start" value="start" checked onChange={fn()} />
        <Radio label="Top" labelPlacement="top" value="top" checked onChange={fn()} />
        <Radio label="Bottom" labelPlacement="bottom" value="bottom" checked onChange={fn()} />
      </Stack>
    </Stack>
  ),
};

// With helper text and validation
/**
 * WithHelperText component
 * 
 * @returns JSX element
 */
export const WithHelperText: Story = {
  render: () => (
    <Stack data-testid="radio.stories" spacing={3}>
      <Typography variant="h6">Helper Text and Validation</Typography>
      <Stack data-testid="radio.stories" spacing={2}>
        <Radio 
          label="Terms and Conditions"
          helperText="Please read and accept our terms"
          required
          value="terms"
          onChange={fn()}
        />
        <Radio 
          label="Newsletter Subscription"
          helperText="Receive weekly updates"
          validationState="success"
          value="newsletter"
          checked
          onChange={fn()}
        />
        <Radio 
          label="Required Selection"
          error
          errorText="This selection is required"
          required
          value="required"
          onChange={fn()}
        />
      </Stack>
    </Stack>
  ),
};

// RadioGroup - Basic usage
/**
 * BasicGroup component
 * 
 * @returns JSX element
 */
export const BasicGroup: Story = {
  render: () => {
    const options = [
      { value: 'small', label: 'Small (S)' },
      { value: 'medium', label: 'Medium (M)' },
      { value: 'large', label: 'Large (L)' },
      { value: 'xlarge', label: 'Extra Large (XL)' },
    ];
    
    return (
      <Stack data-testid="radio.stories" spacing={3}>
        <Typography variant="h6">Radio Group - Single Selection</Typography>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Size Selection</Typography>
          <RadioGroup
            label="Choose Size"
            options={options}
            helperText="Select one size option"
            onChange={fn()}
          />
        </Box>
      </Stack>
    );
  },
};

// RadioGroup - Advanced layouts
/**
 * GroupLayouts component
 * 
 * @returns JSX element
 */
export const GroupLayouts: Story = {
  render: () => {
    const paymentOptions = [
      { value: 'card', label: 'Credit Card', icon: <CreditCard /> },
      { value: 'bank', label: 'Bank Transfer', icon: <AccountBalance /> },
      { value: 'paypal', label: 'PayPal', icon: <Payment /> },
    ];
    
    const contactOptions = [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
      { value: 'sms', label: 'SMS' },
    ];
    
    return (
      <Stack data-testid="radio.stories" spacing={4}>
        <Typography variant="h6">Radio Group Layouts</Typography>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Column Layout (Default)</Typography>
          <RadioGroup
            label="Payment Method"
            options={paymentOptions}
            helperText="Choose your preferred payment method"
            onChange={fn()}
          />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Row Layout</Typography>
          <RadioGroup
            label="Contact Preference"
            options={contactOptions}
            direction="row"
            helperText="How would you like to be contacted?"
            onChange={fn()}
          />
        </Box>
      </Stack>
    );
  },
};

// RadioGroup - With validation
/**
 * GroupValidation component
 * 
 * @returns JSX element
 */
export const GroupValidation: Story = {
  render: () => {
    const priorityOptions = [
      { value: 'low', label: 'Low Priority', helperText: 'Can wait a few days' },
      { value: 'medium', label: 'Medium Priority', helperText: 'Should be done this week' },
      { value: 'high', label: 'High Priority', helperText: 'Needs immediate attention' },
      { value: 'urgent', label: 'Urgent', helperText: 'Critical - requires same day action' },
    ];
    
    return (
      <Stack data-testid="radio.stories" spacing={4}>
        <Typography variant="h6">Radio Group Validation</Typography>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Required Selection</Typography>
          <RadioGroup
            label="Task Priority"
            options={priorityOptions}
            required
            helperText="Please select a priority level"
            onChange={fn()}
          />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Error State</Typography>
          <RadioGroup
            label="Delivery Option"
            options={[
              { value: 'standard', label: 'Standard (5-7 days)' },
              { value: 'express', label: 'Express (2-3 days)' },
              { value: 'overnight', label: 'Overnight' },
            ]}
            error
            errorText="Please select a delivery option to continue"
            required
            onChange={fn()}
          />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Success State</Typography>
          <RadioGroup
            label="Subscription Plan"
            options={[
              { value: 'basic', label: 'Basic ($9/month)' },
              { value: 'pro', label: 'Pro ($19/month)' },
              { value: 'enterprise', label: 'Enterprise ($49/month)' },
            ]}
            value="pro"
            validationState="success"
            helperText="Great choice! This plan includes all the features you need."
            onChange={fn()}
          />
        </Box>
      </Stack>
    );
  },
};

// Custom icons and variants
/**
 * CustomStyling component
 * 
 * @returns JSX element
 */
export const CustomStyling: Story = {
  render: () => {
    const addressOptions = [
      { 
        value: 'home', 
        label: 'Home Address',
        helperText: '123 Main St, City, State',
        checkedIcon: <Home color="primary" />,
      },
      { 
        value: 'work', 
        label: 'Work Address',
        helperText: '456 Business Ave, City, State',
        checkedIcon: <Work color="secondary" />,
      },
      { 
        value: 'other', 
        label: 'Other Address',
        helperText: 'Specify custom address',
        checkedIcon: <LocationOn color="info" />,
      },
    ];
    
    return (
      <Stack data-testid="radio.stories" spacing={4}>
        <Typography variant="h6">Custom Styling</Typography>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Different Variants</Typography>
          <Stack data-testid="radio.stories" spacing={3}>
            <RadioGroup
              label="Standard Variant"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
              ]}
              variant="standard"
              direction="row"
            />
            
            <RadioGroup
              label="Outlined Variant"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
              ]}
              variant="outlined"
              direction="row"
            />
            
            <RadioGroup
              label="Filled Variant"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
              ]}
              variant="filled"
              direction="row"
            />
          </Stack>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Custom Icons</Typography>
          <RadioGroup
            label="Delivery Address"
            options={addressOptions}
            helperText="Select where you'd like your order delivered"
            onChange={fn()}
          />
        </Box>
      </Stack>
    );
  },
};

// Form integration example
/**
 * FormIntegration component
 * 
 * @returns JSX element
 */
export const FormIntegration: Story = {
  render: () => (
    <Stack data-testid="radio.stories" spacing={3}>
      <Typography variant="h6">Form Integration Example</Typography>
      <Box component="form" sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 1 }}>
        <Stack data-testid="radio.stories" spacing={3}>
          <RadioGroup
            label="Account Type"
            options={[
              { value: 'personal', label: 'Personal Account', helperText: 'For individual use' },
              { value: 'business', label: 'Business Account', helperText: 'For organizations and companies' },
              { value: 'nonprofit', label: 'Non-Profit Account', helperText: 'For registered non-profit organizations' },
            ]}
            required
            helperText="Select the type of account you want to create"
            onChange={fn()}
          />
          
          <RadioGroup
            label="Billing Frequency"
            options={[
              { value: 'monthly', label: 'Monthly ($10/month)' },
              { value: 'yearly', label: 'Yearly ($100/year)', helperText: 'Save $20 with annual billing' },
            ]}
            direction="row"
            helperText="Choose how often you'd like to be billed"
            onChange={fn()}
          />
          
          <RadioGroup
            label="Communication Preferences"
            options={[
              { value: 'email', label: 'Email Only' },
              { value: 'sms', label: 'SMS Only' },
              { value: 'both', label: 'Email and SMS' },
              { value: 'none', label: 'No Communications' },
            ]}
            direction="row"
            helperText="How would you like to receive updates?"
            onChange={fn()}
          />
        </Stack>
      </Box>
    </Stack>
  ),
};

// Accessibility showcase
/**
 * Accessibility component
 * 
 * @returns JSX element
 */
export const Accessibility: Story = {
  render: () => (
    <Stack data-testid="radio.stories" spacing={3}>
      <Typography variant="h6">Accessibility Features</Typography>
      <Stack data-testid="radio.stories" spacing={3}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Screen Reader Support</Typography>
          <RadioGroup
            label="Accessibility Options"
            options={[
              { 
                value: 'high-contrast', 
                label: 'High Contrast Mode',
                description: 'Increases contrast for better visibility',
                helperText: 'Recommended for users with visual impairments'
              },
              { 
                value: 'large-text', 
                label: 'Large Text Mode',
                description: 'Increases font sizes throughout the application',
                helperText: 'Makes text easier to read'
              },
              { 
                value: 'screen-reader', 
                label: 'Enhanced Screen Reader Support',
                description: 'Optimizes interface for screen reader users',
                helperText: 'Provides additional context and navigation aids'
              },
            ]}
            helperText="Use Tab/Shift+Tab to navigate, Space to select"
            onChange={fn()}
          />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Keyboard Navigation</Typography>
          <RadioGroup
            label="Navigation Method"
            options={[
              { value: 'mouse', label: 'Mouse and Keyboard' },
              { value: 'keyboard', label: 'Keyboard Only' },
              { value: 'voice', label: 'Voice Commands' },
            ]}
            direction="row"
            helperText="Use arrow keys to navigate between options, Space to select"
            onChange={fn()}
          />
        </Box>
      </Stack>
    </Stack>
  ),
};

// Theme integration
/**
 * ThemeIntegration component
 * 
 * @returns JSX element
 */
export const ThemeIntegration: Story = {
  render: () => (
    <Stack data-testid="radio.stories" spacing={3}>
      <Typography variant="h6">Theme Integration</Typography>
      <Stack data-testid="radio.stories" spacing={3}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Light Theme</Typography>
          <RadioGroup
            label="Color Preferences"
            options={[
              { value: 'primary', label: 'Primary Color' },
              { value: 'secondary', label: 'Secondary Color' },
              { value: 'success', label: 'Success Color' },
            ]}
            direction="row"
            value="primary"
            onChange={fn()}
          />
        </Box>
        
        <Box sx={{ p: 2, bgcolor: 'grey.900', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'white' }}>Dark Theme Preview</Typography>
          <RadioGroup
            label="Theme Colors"
            options={[
              { value: 'primary', label: 'Primary' },
              { value: 'secondary', label: 'Secondary' },
              { value: 'error', label: 'Error' },
            ]}
            direction="row"
            value="secondary"
            onChange={fn()}
          />
        </Box>
      </Stack>
    </Stack>
  ),
};