import {
  Email,
  Phone,
  Lock,
  Person,
  Star,
  CheckCircle,
  Error as ErrorIcon,
  Warning,
  Info
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';

import { Button } from '@/components/core';
import { Typography } from '@/components/data-display';
import { Checkbox } from '@/components/forms/Checkbox';
import { FormControl } from '@/components/forms/FormControl';
import { FormLabel } from '@/components/forms/FormLabel';
import { RadioGroup } from '@/components/forms/RadioGroup';
import { Select } from '@/components/forms/Select';
import { TextField } from '@/components/forms/TextField';
import { Stack, Box } from '@/components/layout';


/**
 * 🎯 FormControl Component Stories
 * 
 * Comprehensive Storybook stories showcasing FormControl as the foundation
 * for form structure, accessibility, and validation state management.
 * 
 * @author dilip.yadav@shorelineiot.com
 */

const meta: Meta<typeof FormControl> = {
  title: 'Forms/FormControl',
  component: FormControl,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# FormControl Component

The FormControl component provides a flexible foundation for form field organization, 
state management, and accessibility compliance.

## Features
- Consistent form field structure and spacing
- Accessibility support with proper ARIA attributes
- Validation state management (error, warning, success)
- Label and helper text coordination
- Theme-aware styling with CSS variables
- Responsive design patterns
- Form group organization capabilities

## Usage
Use FormControl as a wrapper for form fields to ensure consistent styling, 
proper accessibility, and validation state handling.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: {
      control: 'boolean',
      description: 'Makes the form control take full width of container'
    },
    margin: {
      control: 'select',
      options: ['none', 'dense', 'normal'],
      description: 'Margin spacing around the form control'
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the form control'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the form control and all child elements'
    },
    error: {
      control: 'boolean',
      description: 'Shows error state styling'
    },
    focused: {
      control: 'boolean',
      description: 'Controls focus state'
    },
    required: {
      control: 'boolean',
      description: 'Indicates the form control is required'
    },
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
      description: 'Visual variant of the form control'
    }
  },
  args: {
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof FormControl>;

// Default Stories
/**
 * Default FormControl component demonstration
 * 
 * @returns JSX element
 */
export const Default: Story = {
  args: {},
  render: (args) => (
    <FormControl {...args}>
      <FormLabel>Default Label</FormLabel>
      <TextField
        placeholder="Enter value"
        helperText="This is a basic form control example"
      />
    </FormControl>
  ),
};

// Variants
/**
 * Standard variant FormControl
 * 
 * @returns JSX element
 */
export const StandardVariant: Story = {
  args: {
    variant: 'standard',
  },
  render: (args) => (
    <FormControl {...args}>
      <FormLabel>Standard Variant</FormLabel>
      <TextField
        variant="standard"
        placeholder="Standard form control"
        helperText="Standard variant with underline styling"
      />
    </FormControl>
  ),
};

/**
 * Outlined variant FormControl
 * 
 * @returns JSX element
 */
export const OutlinedVariant: Story = {
  args: {
    variant: 'outlined',
  },
  render: (args) => (
    <FormControl {...args}>
      <FormLabel>Outlined Variant</FormLabel>
      <TextField
        variant="outlined"
        placeholder="Outlined form control"
        helperText="Outlined variant with border styling"
      />
    </FormControl>
  ),
};

/**
 * Filled variant FormControl
 * 
 * @returns JSX element
 */
export const FilledVariant: Story = {
  args: {
    variant: 'filled',
  },
  render: (args) => (
    <FormControl {...args}>
      <FormLabel>Filled Variant</FormLabel>
      <TextField
        variant="filled"
        placeholder="Filled form control"
        helperText="Filled variant with background styling"
      />
    </FormControl>
  ),
};

// Sizes
/**
 * Small size FormControl
 * 
 * @returns JSX element
 */
export const SmallSize: Story = {
  args: {
    size: 'small',
  },
  render: (args) => (
    <FormControl {...args}>
      <FormLabel>Small Size</FormLabel>
      <TextField
        size="small"
        placeholder="Small form control"
        helperText="Compact size for dense layouts"
      />
    </FormControl>
  ),
};

/**
 * Medium size FormControl
 * 
 * @returns JSX element
 */
export const MediumSize: Story = {
  args: {
    size: 'medium',
  },
  render: (args) => (
    <FormControl {...args}>
      <FormLabel>Medium Size</FormLabel>
      <TextField
        size="medium"
        placeholder="Medium form control"
        helperText="Standard size for most use cases"
      />
    </FormControl>
  ),
};

// States
/**
 * Error state FormControl
 * 
 * @returns JSX element
 */
export const ErrorState: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <FormControl {...args}>
      <FormLabel>Error State</FormLabel>
      <TextField
        error
        value="invalid@email"
        helperText="Please enter a valid email address"
        startIcon={<ErrorIcon />}
      />
    </FormControl>
  ),
};

/**
 * Disabled state FormControl
 * 
 * @returns JSX element
 */
export const DisabledState: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <FormControl {...args}>
      <FormLabel>Disabled State</FormLabel>
      <TextField
        disabled
        value="Cannot be edited"
        helperText="This field is disabled"
      />
    </FormControl>
  ),
};

/**
 * Required state FormControl
 * 
 * @returns JSX element
 */
export const RequiredState: Story = {
  args: {
    required: true,
  },
  render: (args) => (
    <FormControl {...args}>
      <FormLabel>Required Field *</FormLabel>
      <TextField
        required
        placeholder="This field is required"
        helperText="Please provide a value"
      />
    </FormControl>
  ),
};

/**
 * Focused state FormControl
 * 
 * @returns JSX element
 */
export const FocusedState: Story = {
  args: {
    focused: true,
  },
  render: (args) => (
    <FormControl {...args}>
      <FormLabel>Focused State</FormLabel>
      <TextField
        focused
        value="Always focused"
        helperText="This field maintains focus state"
      />
    </FormControl>
  ),
};

// Layout Properties
/**
 * Full width FormControl
 * 
 * @returns JSX element
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => (
    <Box sx={{ width: '100%', border: '1px dashed #ccc', p: 2 }}>
      <FormControl {...args}>
        <FormLabel>Full Width Form Control</FormLabel>
        <TextField
          fullWidth
          placeholder="Takes full width of container"
          helperText="Full width form control example"
        />
      </FormControl>
    </Box>
  ),
};

/**
 * Margin spacing variations
 * 
 * @returns JSX element
 */
export const MarginVariations: Story = {
  render: (args) => (
    <Stack spacing={2}>
      <Typography variant="h6">Margin Variations</Typography>
      
      <Box sx={{ border: '1px dashed #ccc', p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>None Margin</Typography>
        <FormControl margin="none">
          <FormLabel>No Margin</FormLabel>
          <TextField placeholder="No margin spacing" />
        </FormControl>
      </Box>
      
      <Box sx={{ border: '1px dashed #ccc', p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Dense Margin</Typography>
        <FormControl margin="dense">
          <FormLabel>Dense Margin</FormLabel>
          <TextField placeholder="Dense margin spacing" />
        </FormControl>
      </Box>
      
      <Box sx={{ border: '1px dashed #ccc', p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Normal Margin</Typography>
        <FormControl margin="normal">
          <FormLabel>Normal Margin</FormLabel>
          <TextField placeholder="Normal margin spacing" />
        </FormControl>
      </Box>
    </Stack>
  ),
};

// Complex Form Examples
/**
 * Login form using FormControl
 * 
 * @returns JSX element
 */
export const LoginForm: Story = {
  render: (args) => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      rememberMe: false
    });
    
    const [errors, setErrors] = useState({
      email: '',
      password: ''
    });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Validation logic here
      const newErrors = { email: '', password: '' };
      
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
      
      setErrors(newErrors);
    };
    
    return (
      <form data-testid="formcontrol.stories" onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <Stack spacing={3}>
          <Typography variant="h5" gutterBottom>
            Login Form
          </Typography>
          
          <FormControl fullWidth error={!!errors.email}>
            <FormLabel>Email Address</FormLabel>
            <TextField
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="user@example.com"
              error={!!errors.email}
              helperText={errors.email || 'Enter your email address'}
              startIcon={<Email />}
              required
            />
          </FormControl>
          
          <FormControl fullWidth error={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <TextField
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter your password"
              error={!!errors.password}
              helperText={errors.password || 'Enter your password'}
              startIcon={<Lock />}
              required
            />
          </FormControl>
          
          <FormControl>
            <Checkbox
              checked={formData.rememberMe}
              onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
              label="Remember me"
            />
          </FormControl>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="large"
          >
            Sign In
          </Button>
        </Stack>
      </form>
    );
  },
};

/**
 * Registration form with validation
 * 
 * @returns JSX element
 */
export const RegistrationForm: Story = {
  render: (args) => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      interests: [],
      newsletter: false
    });
    
    const countries = [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'de', label: 'Germany' }
    ];
    
    const interestOptions = [
      { value: 'technology', label: 'Technology' },
      { value: 'design', label: 'Design' },
      { value: 'business', label: 'Business' },
      { value: 'marketing', label: 'Marketing' }
    ];
    
    return (
      <form data-testid="formcontrol.stories" style={{ maxWidth: '600px' }}>
        <Stack spacing={3}>
          <Typography variant="h5" gutterBottom>
            Registration Form
          </Typography>
          
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <FormLabel>First Name</FormLabel>
              <TextField
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="John"
                startIcon={<Person />}
                required
              />
            </FormControl>
            
            <FormControl fullWidth>
              <FormLabel>Last Name</FormLabel>
              <TextField
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Doe"
                startIcon={<Person />}
                required
              />
            </FormControl>
          </Stack>
          
          <FormControl fullWidth>
            <FormLabel>Email Address</FormLabel>
            <TextField
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john.doe@example.com"
              startIcon={<Email />}
              required
            />
          </FormControl>
          
          <FormControl fullWidth>
            <FormLabel>Phone Number</FormLabel>
            <TextField
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (555) 123-4567"
              startIcon={<Phone />}
              helperText="Optional - for account recovery"
            />
          </FormControl>
          
          <FormControl fullWidth>
            <FormLabel>Country</FormLabel>
            <Select
              value={formData.country}
              onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              options={countries}
              placeholder="Select your country"
              required
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>Areas of Interest</FormLabel>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              {interestOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  checked={formData.interests.includes(option.value)}
                  onChange={(e) => {
                    const newInterests = e.target.checked
                      ? [...formData.interests, option.value]
                      : formData.interests.filter(i => i !== option.value);
                    setFormData(prev => ({ ...prev, interests: newInterests }));
                  }}
                  label={option.label}
                />
              ))}
            </Stack>
          </FormControl>
          
          <FormControl>
            <Checkbox
              checked={formData.newsletter}
              onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
              label="Subscribe to newsletter"
            />
          </FormControl>
          
          <Stack direction="row" spacing={2}>
            <Button variant="secondary" fullWidth>
              Cancel
            </Button>
            <Button variant="primary" fullWidth>
              Create Account
            </Button>
          </Stack>
        </Stack>
      </form>
    );
  },
};

/**
 * Form with validation states
 * 
 * @returns JSX element
 */
export const ValidationStates: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h6" gutterBottom>
        Form Validation States
      </Typography>
      
      <Stack spacing={3}>
        <FormControl error>
          <FormLabel>Error State</FormLabel>
          <TextField
            error
            value="invalid@email"
            helperText="Please enter a valid email address"
            startIcon={<ErrorIcon />}
          />
        </FormControl>
        
        <FormControl>
          <FormLabel>Warning State</FormLabel>
          <TextField
            validationState="warning"
            value="weak123"
            warningText="Password is weak - consider adding special characters"
            startIcon={<Warning />}
          />
        </FormControl>
        
        <FormControl>
          <FormLabel>Success State</FormLabel>
          <TextField
            validationState="success"
            value="user@example.com"
            successText="Email format is valid!"
            startIcon={<CheckCircle />}
          />
        </FormControl>
        
        <FormControl>
          <FormLabel>Info State</FormLabel>
          <TextField
            validationState="info"
            value="username123"
            helperText="Username is available"
            startIcon={<Info />}
          />
        </FormControl>
      </Stack>
    </Stack>
  ),
};

/**
 * Accessibility demonstration
 * 
 * @returns JSX element
 */
export const AccessibilityDemo: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h6" gutterBottom>
        Accessibility Features
      </Typography>
      
      <FormControl required>
        <FormLabel>Accessible Form Control</FormLabel>
        <TextField
          placeholder="This field has proper ARIA attributes"
          helperText="Screen readers will announce this as required"
          aria-label="Accessible text input field"
          aria-describedby="accessible-helper-text"
          required
        />
      </FormControl>
      
      <FormControl disabled>
        <FormLabel>Disabled with Accessibility</FormLabel>
        <TextField
          disabled
          value="Cannot be edited"
          helperText="Screen readers will announce this as disabled"
          aria-label="Disabled text input field"
        />
      </FormControl>
      
      <FormControl error>
        <FormLabel>Error with Accessibility</FormLabel>
        <TextField
          error
          value="invalid input"
          helperText="Screen readers will announce this error"
          aria-label="Text input with error"
          aria-invalid="true"
        />
      </FormControl>
    </Stack>
  ),
};

/**
 * Theme integration demonstration
 * 
 * @returns JSX element
 */
export const ThemeIntegration: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h6" gutterBottom>
        Dark Theme Integration
      </Typography>
      
      <FormControl>
        <FormLabel>Dark Theme Field</FormLabel>
        <TextField
          placeholder="Optimized for dark themes"
          helperText="All colors adapt to theme"
          startIcon={<Star />}
        />
      </FormControl>
      
      <FormControl error>
        <FormLabel>Error in Dark Theme</FormLabel>
        <TextField
          error
          value="error state"
          helperText="Error colors work in dark theme"
          startIcon={<ErrorIcon />}
        />
      </FormControl>
      
      <FormControl>
        <FormLabel>Success in Dark Theme</FormLabel>
        <TextField
          validationState="success"
          value="success state"
          successText="Success colors work in dark theme"
          startIcon={<CheckCircle />}
        />
      </FormControl>
    </Stack>
  ),
};

/**
 * Boolean properties demonstration
 * 
 * @returns JSX element
 */
export const BooleanProperties: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h6" gutterBottom>
        Boolean Properties
      </Typography>
      
      <Stack direction="row" spacing={3}>
        <FormControl>
          <FormLabel>Default</FormLabel>
          <TextField placeholder="Default state" />
        </FormControl>
        
        <FormControl fullWidth>
          <FormLabel>Full Width</FormLabel>
          <TextField placeholder="Full width" />
        </FormControl>
      </Stack>
      
      <Stack direction="row" spacing={3}>
        <FormControl disabled>
          <FormLabel>Disabled</FormLabel>
          <TextField disabled value="Disabled" />
        </FormControl>
        
        <FormControl error>
          <FormLabel>Error</FormLabel>
          <TextField error value="Error state" />
        </FormControl>
      </Stack>
      
      <Stack direction="row" spacing={3}>
        <FormControl required>
          <FormLabel>Required *</FormLabel>
          <TextField required placeholder="Required field" />
        </FormControl>
        
        <FormControl focused>
          <FormLabel>Focused</FormLabel>
          <TextField focused value="Always focused" />
        </FormControl>
      </Stack>
    </Stack>
  ),
}; 