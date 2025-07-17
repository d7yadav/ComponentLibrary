import { 
  Favorite, 
  FavoriteBorder, 
  Star, 
  StarBorder,
  Home,
  Work,
  School,
  CheckCircle,
  Error as ErrorIcon,
  Warning,
  Info,
  Settings,
  Notifications,
  Security,
  Person,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';

import { Button } from '@/components/core';
import { Typography } from '@/components/data-display/Typography'; // Replaced MUI Typography with internal wrapper as per migration guidelines
import { FormControl } from '@/components/forms/FormControl';
import { FormLabel } from '@/components/forms/FormLabel';
import { Box } from '@/components/layout/Box'; // Replaced MUI Box with internal wrapper as per migration guidelines
import { Stack } from '@/components/layout/Stack'; // Replaced MUI Stack with internal wrapper as per migration guidelines

import { Checkbox, CheckboxGroup } from './Checkbox';
import { CHECKBOX_SIZES, CHECKBOX_COLORS, CHECKBOX_VARIANTS } from './Checkbox.constants';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Checkbox Component

A comprehensive checkbox component with extensive customization options, validation states, and accessibility features.

## Features
- Multiple sizes: small, medium, large
- Multiple colors: primary, secondary, tertiary, quaternary, success, warning, error, info
- Multiple variants: default, outlined, contained
- Validation states: success, warning, error with custom messages
- Label positioning: start, end, top, bottom
- Indeterminate state support
- Custom icons and loading states
- Group functionality with CheckboxGroup
- Full accessibility compliance (WCAG 2.1 AA)
- Theme integration with CSS variables
- Animation and interaction states

## Usage
Use Checkbox for binary choices, multi-select options, and form validation scenarios.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(CHECKBOX_SIZES),
      description: 'Size of the checkbox',
    },
    color: {
      control: 'select',
      options: Object.values(CHECKBOX_COLORS),
      description: 'Color scheme of the checkbox',
    },
    variant: {
      control: 'select',
      options: Object.values(CHECKBOX_VARIANTS),
      description: 'Visual variant of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the checkbox',
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox is in error state',
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
      description: 'Whether the checkbox is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Position of the label relative to the checkbox',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    onChange: { action: 'onChange' },
    onFocus: { action: 'onFocus' },
    onBlur: { action: 'onBlur' },
  },
  args: {
    label: 'Checkbox Label',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default Stories
/**
 * Default Checkbox component demonstration
 * 
 * @returns JSX element
 */
export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  },
};

/**
 * Checked state demonstration
 * 
 * @returns JSX element
 */
export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  },
};

/**
 * Indeterminate state demonstration
 * 
 * @returns JSX element
 */
export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate Checkbox',
    indeterminate: true,
  },
};

// Variants
/**
 * All checkbox variants demonstration
 * 
 * @returns JSX element
 */
export const Variants: Story = {
  render: () => (
    <Stack data-testid="checkbox.stories" spacing={4}>
      <Typography variant="h6">Checkbox Variants</Typography>
      
      {Object.values(CHECKBOX_VARIANTS).map((variant) => (
        <Stack data-testid="checkbox.stories" key={variant} spacing={2}>
          <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
            {variant} Variant
          </Typography>
          <Stack data-testid="checkbox.stories" direction="row" spacing={3} alignItems="center">
            <Checkbox
              variant={variant}
              label={`${variant} Unchecked`}
              onChange={fn()}
            />
            <Checkbox
              variant={variant}
              label={`${variant} Checked`}
              checked
              onChange={fn()}
            />
            <Checkbox
              variant={variant}
              label={`${variant} Indeterminate`}
              indeterminate
              onChange={fn()}
            />
            <Checkbox
              variant={variant}
              label={`${variant} Disabled`}
              disabled
              onChange={fn()}
            />
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
};

// Size variants
/**
 * All checkbox sizes demonstration
 * 
 * @returns JSX element
 */
export const Sizes: Story = {
  render: () => (
    <Stack data-testid="checkbox.stories" spacing={4}>
      <Typography variant="h6">Checkbox Sizes</Typography>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Size Comparison
        </Typography>
        <Stack data-testid="checkbox.stories" direction="row" spacing={3} alignItems="center">
          <Checkbox size="small" label="Small" onChange={fn()} />
          <Checkbox size="medium" label="Medium" onChange={fn()} />
          <Checkbox size="large" label="Large" onChange={fn()} />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Sizes with Different States
        </Typography>
        <Stack data-testid="checkbox.stories" direction="row" spacing={3} alignItems="center">
          <Checkbox size="small" label="Small Checked" checked onChange={fn()} />
          <Checkbox size="medium" label="Medium Indeterminate" indeterminate onChange={fn()} />
          <Checkbox size="large" label="Large Disabled" disabled onChange={fn()} />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Sizes with Icons
        </Typography>
        <Stack data-testid="checkbox.stories" direction="row" spacing={3} alignItems="center">
          <Checkbox 
            size="small" 
            label="Small with Icon" 
            icon={<StarBorder />}
            checkedIcon={<Star />}
            onChange={fn()} 
          />
          <Checkbox 
            size="medium" 
            label="Medium with Icon" 
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={fn()} 
          />
          <Checkbox 
            size="large" 
            label="Large with Icon" 
            icon={<StarBorder />}
            checkedIcon={<Star />}
            onChange={fn()} 
          />
        </Stack>
      </Stack>
    </Stack>
  ),
};

// Color variants
/**
 * All checkbox colors demonstration
 * 
 * @returns JSX element
 */
export const Colors: Story = {
  render: () => (
    <Stack data-testid="checkbox.stories" spacing={4}>
      <Typography variant="h6">Checkbox Colors</Typography>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          All Colors (Checked State)
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          {Object.values(CHECKBOX_COLORS).map((color) => (
            <Checkbox
              key={color}
              color={color}
              label={`${color.charAt(0).toUpperCase() + color.slice(1)} Checkbox`}
              checked
              onChange={fn()}
            />
          ))}
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Colors with Different States
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox color="primary" label="Primary - Unchecked" onChange={fn()} />
          <Checkbox color="secondary" label="Secondary - Checked" checked onChange={fn()} />
          <Checkbox color="success" label="Success - Indeterminate" indeterminate onChange={fn()} />
          <Checkbox color="warning" label="Warning - Disabled" disabled onChange={fn()} />
          <Checkbox color="error" label="Error - Disabled Checked" disabled checked onChange={fn()} />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Colors in Dark Theme Context
        </Typography>
        <Box sx={{ 
          p: 2, 
          backgroundColor: '#121212', 
          borderRadius: 1,
          '& .MuiCheckbox-root': {
            color: 'white'
          }
        }}>
          <Stack data-testid="checkbox.stories" spacing={1}>
            <Checkbox color="primary" label="Primary in Dark" checked onChange={fn()} />
            <Checkbox color="success" label="Success in Dark" checked onChange={fn()} />
            <Checkbox color="error" label="Error in Dark" checked onChange={fn()} />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  ),
};

// States
/**
 * All checkbox states demonstration
 * 
 * @returns JSX element
 */
export const States: Story = {
  render: () => (
    <Stack data-testid="checkbox.stories" spacing={4}>
      <Typography variant="h6">Checkbox States</Typography>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Basic States
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox label="Default State" onChange={fn()} />
          <Checkbox label="Checked State" checked onChange={fn()} />
          <Checkbox label="Indeterminate State" indeterminate onChange={fn()} />
          <Checkbox label="Disabled State" disabled onChange={fn()} />
          <Checkbox label="Disabled Checked" disabled checked onChange={fn()} />
          <Checkbox label="Loading State" loading onChange={fn()} />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Validation States
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="Success State" 
            validationState="success" 
            helperText="Great choice!"
            checked
            onChange={fn()} 
          />
          <Checkbox 
            label="Warning State" 
            validationState="warning" 
            helperText="Consider this option carefully"
            onChange={fn()} 
          />
          <Checkbox 
            label="Error State" 
            validationState="error" 
            errorText="This option is required"
            onChange={fn()} 
          />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Required States
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="Required Field" 
            required
            helperText="This field is mandatory"
            onChange={fn()} 
          />
          <Checkbox 
            label="Required with Error" 
            required
            error
            errorText="Please check this required field"
            onChange={fn()} 
          />
        </Stack>
      </Stack>
    </Stack>
  ),
};

// Label Positioning
/**
 * Label positioning demonstration
 * 
 * @returns JSX element
 */
export const LabelPositioning: Story = {
  render: () => (
    <Stack data-testid="checkbox.stories" spacing={4}>
      <Typography variant="h6">Label Positioning</Typography>
      
      <Stack data-testid="checkbox.stories" spacing={3}>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Typography variant="subtitle2" gutterBottom>
            Label at End (Default)
          </Typography>
          <Checkbox 
            label="Label at end of checkbox" 
            labelPlacement="end"
            onChange={fn()} 
          />
        </Stack>
        
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Typography variant="subtitle2" gutterBottom>
            Label at Start
          </Typography>
          <Checkbox 
            label="Label at start of checkbox" 
            labelPlacement="start"
            onChange={fn()} 
          />
        </Stack>
        
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Typography variant="subtitle2" gutterBottom>
            Label at Top
          </Typography>
          <Checkbox 
            label="Label at top of checkbox" 
            labelPlacement="top"
            onChange={fn()} 
          />
        </Stack>
        
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Typography variant="subtitle2" gutterBottom>
            Label at Bottom
          </Typography>
          <Checkbox 
            label="Label at bottom of checkbox" 
            labelPlacement="bottom"
            onChange={fn()} 
          />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Label Positioning with Helper Text
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="End with helper text" 
            labelPlacement="end"
            helperText="This is helper text for end placement"
            onChange={fn()} 
          />
          <Checkbox 
            label="Start with helper text" 
            labelPlacement="start"
            helperText="This is helper text for start placement"
            onChange={fn()} 
          />
        </Stack>
      </Stack>
    </Stack>
  ),
};

// Custom Icons
/**
 * Custom icons demonstration
 * 
 * @returns JSX element
 */
export const CustomIcons: Story = {
  render: () => (
    <Stack data-testid="checkbox.stories" spacing={4}>
      <Typography variant="h6">Custom Icons</Typography>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Heart Icons
        </Typography>
        <Stack data-testid="checkbox.stories" direction="row" spacing={3} alignItems="center">
          <Checkbox 
            label="Favorite" 
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            color="error"
            onChange={fn()} 
          />
          <Checkbox 
            label="Favorite Checked" 
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            color="error"
            checked
            onChange={fn()} 
          />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Star Icons
        </Typography>
        <Stack data-testid="checkbox.stories" direction="row" spacing={3} alignItems="center">
          <Checkbox 
            label="Rating" 
            icon={<StarBorder />}
            checkedIcon={<Star />}
            color="warning"
            onChange={fn()} 
          />
          <Checkbox 
            label="Rating Checked" 
            icon={<StarBorder />}
            checkedIcon={<Star />}
            color="warning"
            checked
            onChange={fn()} 
          />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Category Icons
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="Home" 
            icon={<Home />}
            checkedIcon={<Home />}
            color="primary"
            onChange={fn()} 
          />
          <Checkbox 
            label="Work" 
            icon={<Work />}
            checkedIcon={<Work />}
            color="secondary"
            onChange={fn()} 
          />
          <Checkbox 
            label="School" 
            icon={<School />}
            checkedIcon={<School />}
            color="success"
            onChange={fn()} 
          />
        </Stack>
      </Stack>
    </Stack>
  ),
};

// Checkbox Groups
/**
 * Checkbox groups demonstration
 * 
 * @returns JSX element
 */
export const CheckboxGroups: Story = {
  render: () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>(['react', 'typescript']);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['work']);
    
    const skills = [
      { value: 'react', label: 'React' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'nodejs', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' }
    ];
    
    const categories = [
      { value: 'home', label: 'Home', icon: <Home /> },
      { value: 'work', label: 'Work', icon: <Work /> },
      { value: 'school', label: 'School', icon: <School /> }
    ];
    
    return (
      <Stack data-testid="checkbox.stories" spacing={4}>
        <Typography variant="h6">Checkbox Groups</Typography>
        
        <Stack data-testid="checkbox.stories" spacing={2}>
          <Typography variant="subtitle2" gutterBottom>
            Skills Selection
          </Typography>
          <CheckboxGroup
            label="Select your skills"
            value={selectedSkills}
            onChange={setSelectedSkills}
            options={skills}
            helperText={`${selectedSkills.length} skills selected`}
          />
        </Stack>
        
        <Stack data-testid="checkbox.stories" spacing={2}>
          <Typography variant="subtitle2" gutterBottom>
            Categories with Icons
          </Typography>
          <CheckboxGroup
            label="Select categories"
            value={selectedCategories}
            onChange={setSelectedCategories}
            options={categories}
            helperText={`${selectedCategories.length} categories selected`}
          />
        </Stack>
        
        <Stack data-testid="checkbox.stories" spacing={2}>
          <Typography variant="subtitle2" gutterBottom>
            Validation Example
          </Typography>
          <CheckboxGroup
            label="Required selections"
            value={selectedSkills}
            onChange={setSelectedSkills}
            options={skills.slice(0, 3)}
            required
            error={selectedSkills.length === 0}
            errorText="Please select at least one skill"
          />
        </Stack>
      </Stack>
    );
  },
};

// Form Integration
/**
 * Form integration demonstration
 * 
 * @returns JSX element
 */
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      termsAccepted: false,
      newsletter: false,
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      preferences: ['privacy', 'performance']
    });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
    };
    
    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <Stack data-testid="checkbox.stories" spacing={4}>
          <Typography variant="h6">Account Setup Form</Typography>
          
          <FormControl required error={!formData.termsAccepted}>
            <Checkbox 
              label="I accept the Terms of Service and Privacy Policy"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
              required
              errorText={!formData.termsAccepted ? 'You must accept the terms to continue' : ''}
            />
          </FormControl>
          
          <FormControl>
            <Checkbox 
              label="Subscribe to our newsletter for updates"
              checked={formData.newsletter}
              onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
              helperText="We'll send you product updates and tips"
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Notification Preferences</FormLabel>
            <Stack data-testid="checkbox.stories" spacing={1} sx={{ mt: 1 }}>
              <Checkbox 
                label="Email notifications"
                checked={formData.notifications.email}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, email: e.target.checked }
                }))}
                icon={<Email />}
                checkedIcon={<Email />}
              />
              <Checkbox 
                label="SMS notifications"
                checked={formData.notifications.sms}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, sms: e.target.checked }
                }))}
                icon={<Phone />}
                checkedIcon={<Phone />}
              />
              <Checkbox 
                label="Push notifications"
                checked={formData.notifications.push}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, push: e.target.checked }
                }))}
                icon={<Notifications />}
                checkedIcon={<Notifications />}
              />
            </Stack>
          </FormControl>
          
          <Button 
            type="submit" 
            variant="primary" 
            disabled={!formData.termsAccepted}
            fullWidth
          >
            Create Account
          </Button>
        </Stack>
      </form>
    );
  },
};

// Boolean Properties
/**
 * Boolean properties demonstration
 * 
 * @returns JSX element
 */
export const BooleanProperties: Story = {
  render: () => (
    <Stack data-testid="checkbox.stories" spacing={4}>
      <Typography variant="h6">Boolean Properties</Typography>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Core Boolean Props
        </Typography>
        <Stack data-testid="checkbox.stories" direction="row" spacing={3} flexWrap="wrap">
          <Checkbox label="checked=false" checked={false} onChange={fn()} />
          <Checkbox label="checked=true" checked={true} onChange={fn()} />
          <Checkbox label="indeterminate=true" indeterminate={true} onChange={fn()} />
          <Checkbox label="disabled=true" disabled={true} onChange={fn()} />
          <Checkbox label="required=true" required={true} onChange={fn()} />
          <Checkbox label="loading=true" loading={true} onChange={fn()} />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Validation Boolean Props
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="error=true" 
            error={true}
            errorText="This is an error message"
            onChange={fn()} 
          />
          <Checkbox 
            label="error=false" 
            error={false}
            onChange={fn()} 
          />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Combined Boolean Props
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="required + error" 
            required
            error
            errorText="Required field not checked"
            onChange={fn()} 
          />
          <Checkbox 
            label="checked + disabled" 
            checked
            disabled
            onChange={fn()} 
          />
          <Checkbox 
            label="indeterminate + disabled" 
            indeterminate
            disabled
            onChange={fn()} 
          />
        </Stack>
      </Stack>
    </Stack>
  ),
};

// Accessibility
/**
 * Accessibility demonstration
 * 
 * @returns JSX element
 */
export const Accessibility: Story = {
  render: () => (
    <Stack data-testid="checkbox.stories" spacing={4}>
      <Typography variant="h6">Accessibility Features</Typography>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          ARIA Attributes
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="Accessible checkbox with aria-label"
            aria-label="Custom accessibility label"
            aria-describedby="checkbox-description"
            onChange={fn()} 
          />
          <Typography id="checkbox-description" variant="caption" color="text.secondary">
            This checkbox has custom ARIA attributes for screen readers
          </Typography>
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Keyboard Navigation
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="Focus with Tab key"
            helperText="Use Tab to focus, Space to toggle"
            onChange={fn()} 
          />
          <Checkbox 
            label="Second checkbox"
            helperText="Continue tabbing to reach this checkbox"
            onChange={fn()} 
          />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Screen Reader Support
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="Required field"
            required
            helperText="Screen readers will announce this as required"
            onChange={fn()} 
          />
          <Checkbox 
            label="Error state"
            error
            errorText="Screen readers will announce this error"
            onChange={fn()} 
          />
          <Checkbox 
            label="Disabled checkbox"
            disabled
            helperText="Screen readers will announce this as disabled"
            onChange={fn()} 
          />
        </Stack>
      </Stack>
    </Stack>
  ),
};

// Theme Integration
/**
 * Theme integration demonstration
 * 
 * @returns JSX element
 */
export const ThemeIntegration: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <Stack data-testid="checkbox.stories" spacing={4}>
      <Typography variant="h6" color="white">
        Dark Theme Integration
      </Typography>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" color="white" gutterBottom>
          Colors in Dark Theme
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox color="primary" label="Primary color" checked onChange={fn()} />
          <Checkbox color="secondary" label="Secondary color" checked onChange={fn()} />
          <Checkbox color="success" label="Success color" checked onChange={fn()} />
          <Checkbox color="warning" label="Warning color" checked onChange={fn()} />
          <Checkbox color="error" label="Error color" checked onChange={fn()} />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" color="white" gutterBottom>
          States in Dark Theme
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox label="Default state" onChange={fn()} />
          <Checkbox label="Checked state" checked onChange={fn()} />
          <Checkbox label="Indeterminate state" indeterminate onChange={fn()} />
          <Checkbox label="Disabled state" disabled onChange={fn()} />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" color="white" gutterBottom>
          Validation in Dark Theme
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="Success validation" 
            validationState="success"
            helperText="Validation colors work in dark theme"
            checked
            onChange={fn()} 
          />
          <Checkbox 
            label="Error validation" 
            validationState="error"
            errorText="Error colors work in dark theme"
            onChange={fn()} 
          />
        </Stack>
      </Stack>
    </Stack>
  ),
};

// Complex Props Coverage
/**
 * Complex props demonstration
 * 
 * @returns JSX element
 */
export const ComplexProps: Story = {
  render: () => {
    const [multipleValues, setMultipleValues] = useState<string[]>(['option1', 'option3']);
    const [singleValue, setSingleValue] = useState<boolean>(false);
    
    const handleCustomValidation = (checked: boolean) => {
      if (!checked) {
        return 'This checkbox must be checked';
      }
      return null;
    };
    
    return (
      <Stack data-testid="checkbox.stories" spacing={4}>
        <Typography variant="h6">Complex Props</Typography>
        
        <Stack data-testid="checkbox.stories" spacing={2}>
          <Typography variant="subtitle2" gutterBottom>
            Custom Validation Function
          </Typography>
          <Checkbox 
            label="Custom validation checkbox"
            checked={singleValue}
            onChange={(e) => setSingleValue(e.target.checked)}
            validate={handleCustomValidation}
            helperText="This field has custom validation logic"
          />
        </Stack>
        
        <Stack data-testid="checkbox.stories" spacing={2}>
          <Typography variant="subtitle2" gutterBottom>
            Advanced Icon Configuration
          </Typography>
          <Stack data-testid="checkbox.stories" spacing={1}>
            <Checkbox 
              label="Security settings"
              icon={<Security />}
              checkedIcon={<Security />}
              indeterminateIcon={<Warning />}
              color="warning"
              indeterminate
              onChange={fn()}
            />
            <Checkbox 
              label="Location services"
              icon={<LocationOn />}
              checkedIcon={<LocationOn />}
              color="info"
              checked
              onChange={fn()}
            />
          </Stack>
        </Stack>
        
        <Stack data-testid="checkbox.stories" spacing={2}>
          <Typography variant="subtitle2" gutterBottom>
            Complex State Management
          </Typography>
          <CheckboxGroup
            label="Multiple selections with state"
            value={multipleValues}
            onChange={setMultipleValues}
            options={[
              { value: 'option1', label: 'Option 1', description: 'First option with description' },
              { value: 'option2', label: 'Option 2', description: 'Second option with description' },
              { value: 'option3', label: 'Option 3', description: 'Third option with description' },
              { value: 'option4', label: 'Option 4', description: 'Fourth option with description' }
            ]}
            helperText={`${multipleValues.length} out of 4 options selected`}
            validate={(values) => {
              if (values.length === 0) return 'Please select at least one option';
              if (values.length > 3) return 'Please select no more than 3 options';
              return null;
            }}
          />
        </Stack>
      </Stack>
    );
  },
};

// Edge Cases
/**
 * Edge cases demonstration
 * 
 * @returns JSX element
 */
export const EdgeCases: Story = {
  render: () => (
    <Stack data-testid="checkbox.stories" spacing={4}>
      <Typography variant="h6">Edge Cases</Typography>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Long Labels and Text
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="This is a very long label that should wrap properly and maintain good readability even when it spans multiple lines"
            helperText="This is also a very long helper text that provides additional context and should wrap properly without breaking the layout"
            onChange={fn()}
          />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Special Characters and Unicode
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="Émojis & Special Characters 🚀 ✨ 🎉"
            helperText="Supports émojis and special characters"
            onChange={fn()}
          />
          <Checkbox 
            label="Unicode: 中文 العربية Русский"
            helperText="International character support"
            onChange={fn()}
          />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Rapid State Changes
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label="Rapid toggle test"
            helperText="Try clicking rapidly to test state management"
            onChange={fn()}
          />
        </Stack>
      </Stack>
      
      <Stack data-testid="checkbox.stories" spacing={2}>
        <Typography variant="subtitle2" gutterBottom>
          Empty and Null Values
        </Typography>
        <Stack data-testid="checkbox.stories" spacing={1}>
          <Checkbox 
            label=""
            helperText="Checkbox with empty label"
            onChange={fn()}
          />
          <Checkbox 
            label="No helper text"
            onChange={fn()}
          />
        </Stack>
      </Stack>
    </Stack>
  ),
};