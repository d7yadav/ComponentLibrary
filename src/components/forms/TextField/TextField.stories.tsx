import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';
import { 
  TEXTFIELD_VARIANTS, 
  TEXTFIELD_SIZES, 
  TEXTFIELD_INPUT_TYPES,
  VALIDATION_STATES 
} from './TextField.constants';
import { 
  Search, 
  Email, 
  Phone, 
  Lock, 
  Person, 
  Visibility,
  VisibilityOff,
  Clear,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  CalendarToday
} from '@mui/icons-material';
import React, { useState } from 'react';

const meta: Meta<typeof TextField> = {
  title: 'Forms/TextField',
  component: TextField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# TextField Component

The TextField component is a comprehensive input field that provides various input types, validation states, and accessibility features.

## Features
- 3 variants: filled, outlined, standard
- Multiple input types with built-in validation
- Success, warning, error validation states  
- Character counting and length validation
- Loading states and icons
- Accessibility compliance (WCAG 2.1 AA)
- React Hook Form integration
- Debounced validation
- Multiline support with auto-resize

## Usage
Use TextField for collecting user input in forms. The component supports various input types and provides real-time validation feedback.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(TEXTFIELD_VARIANTS),
      description: 'Visual variant of the text field'
    },
    size: {
      control: 'select', 
      options: Object.values(TEXTFIELD_SIZES),
      description: 'Size of the text field'
    },
    type: {
      control: 'select',
      options: Object.values(TEXTFIELD_INPUT_TYPES),
      description: 'Input type for validation and behavior'
    },
    validationState: {
      control: 'select',
      options: Object.values(VALIDATION_STATES),
      description: 'Current validation state'
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading indicator'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input'
    },
    required: {
      control: 'boolean',
      description: 'Makes the field required'
    },
    multiline: {
      control: 'boolean',
      description: 'Converts to textarea'
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Shows character counter'
    }
  }
};

export default meta;
type Story = StoryObj<typeof TextField>;

// Basic Variants
/**
 * Default component
 * 
 * @returns JSX element
 */
export const Default: Story = {
  args: {
    label: 'Default TextField',
    placeholder: 'Enter text here...',
  }
};

/**
 * Filled component
 * 
 * @returns JSX element
 */
export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled TextField',
    placeholder: 'Enter text here...',
  }
};

/**
 * Outlined component
 * 
 * @returns JSX element
 */
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined TextField',
    placeholder: 'Enter text here...',
  }
};

/**
 * Standard component
 * 
 * @returns JSX element
 */
export const Standard: Story = {
  args: {
    variant: 'standard',
    label: 'Standard TextField',
    placeholder: 'Enter text here...',
  }
};

// Sizes
/**
 * SmallSize component
 * 
 * @returns JSX element
 */
export const SmallSize: Story = {
  args: {
    size: 'small',
    label: 'Small TextField',
    placeholder: 'Small input...',
  }
};

/**
 * MediumSize component
 * 
 * @returns JSX element
 */
export const MediumSize: Story = {
  args: {
    size: 'medium',
    label: 'Medium TextField',
    placeholder: 'Medium input...',
  }
};

// Input Types
/**
 * EmailType component
 * 
 * @returns JSX element
 */
export const EmailType: Story = {
  args: {
    type: 'email',
    label: 'Email Address',
    placeholder: 'user@example.com',
    startIcon: <Email />,
  }
};

/**
 * PasswordType component
 * 
 * @returns JSX element
 */
export const PasswordType: Story = {
  render: (args) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <TextField data-testid="textfield.stories"
        {...args}
        type={showPassword ? 'text' : 'password'}
        label="Password"
        placeholder="Enter password..."
        startIcon={<Lock />}
        endAction={
          showPassword ? (
            <VisibilityOff 
              onClick={() => setShowPassword(false)}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <Visibility 
              onClick={() => setShowPassword(true)}
              style={{ cursor: 'pointer' }}
            />
          )
        }
      />
    );
  }
};

/**
 * PhoneType component
 * 
 * @returns JSX element
 */
export const PhoneType: Story = {
  args: {
    type: 'tel',
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    startIcon: <Phone />,
  }
};

/**
 * SearchType component
 * 
 * @returns JSX element
 */
export const SearchType: Story = {
  args: {
    type: 'search',
    label: 'Search',
    placeholder: 'Search for items...',
    startIcon: <Search />,
    endAction: <Clear style={{ cursor: 'pointer' }} />,
  }
};

/**
 * NumberType component
 * 
 * @returns JSX element
 */
export const NumberType: Story = {
  args: {
    type: 'number',
    label: 'Age',
    placeholder: '25',
  }
};

/**
 * DateType component
 * 
 * @returns JSX element
 */
export const DateType: Story = {
  args: {
    type: 'date',
    label: 'Date of Birth',
    startIcon: <CalendarToday />,
  }
};

/**
 * UrlType component
 * 
 * @returns JSX element
 */
export const UrlType: Story = {
  args: {
    type: 'url',
    label: 'Website URL',
    placeholder: 'https://example.com',
  }
};

// Validation States
/**
 * SuccessState component
 * 
 * @returns JSX element
 */
export const SuccessState: Story = {
  args: {
    validationState: 'success',
    label: 'Valid Email',
    value: 'user@example.com',
    successText: 'Email format is correct!',
    startIcon: <Email />,
  }
};

/**
 * WarningState component
 * 
 * @returns JSX element
 */
export const WarningState: Story = {
  args: {
    validationState: 'warning',
    label: 'Password',
    value: 'weak123',
    warningText: 'Password is weak. Consider adding special characters.',
    startIcon: <Lock />,
  }
};

/**
 * ErrorState component
 * 
 * @returns JSX element
 */
export const ErrorState: Story = {
  args: {
    validationState: 'error',
    label: 'Email Address',
    value: 'invalid-email',
    errorText: 'Please enter a valid email address',
    startIcon: <Email />,
  }
};

// Loading States
/**
 * LoadingState component
 * 
 * @returns JSX element
 */
export const LoadingState: Story = {
  args: {
    loading: true,
    label: 'Checking availability...',
    value: 'username123',
    helperText: 'Verifying if username is available',
  }
};

/**
 * LoadingWithValidation component
 * 
 * @returns JSX element
 */
export const LoadingWithValidation: Story = {
  args: {
    loading: true,
    validationState: 'success',
    label: 'Username',
    value: 'available_user',
    successText: 'Username is available!',
  }
};

// Form States
/**
 * RequiredField component
 * 
 * @returns JSX element
 */
export const RequiredField: Story = {
  args: {
    required: true,
    label: 'Full Name',
    placeholder: 'Enter your full name',
    helperText: 'This field is required',
    startIcon: <Person />,
  }
};

/**
 * DisabledField component
 * 
 * @returns JSX element
 */
export const DisabledField: Story = {
  args: {
    disabled: true,
    label: 'Account ID',
    value: 'ACC-123456',
    helperText: 'This field cannot be modified',
  }
};

/**
 * ReadOnlyField component
 * 
 * @returns JSX element
 */
export const ReadOnlyField: Story = {
  args: {
    readOnly: true,
    label: 'User ID',
    value: 'USR-789012',
    helperText: 'Read-only field',
  }
};

// Character Counting
/**
 * WithCharacterCount component
 * 
 * @returns JSX element
 */
export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    maxLength: 100,
    showCharacterCount: true,
    helperText: 'Share a brief description about yourself',
  }
};

/**
 * CharacterCountWarning component
 * 
 * @returns JSX element
 */
export const CharacterCountWarning: Story = {
  args: {
    label: 'Short Description',
    value: 'This is a long description that is approaching the maximum character limit for this field',
    maxLength: 100,
    showCharacterCount: true,
    helperText: 'Keep it concise',
  }
};

/**
 * CharacterCountError component
 * 
 * @returns JSX element
 */
export const CharacterCountError: Story = {
  args: {
    label: 'Tweet',
    value: 'This is a very long tweet that exceeds the maximum character limit and should show an error state when the user types too much text',
    maxLength: 120,
    showCharacterCount: true,
    errorText: 'Tweet is too long',
  }
};

// Multiline
/**
 * MultilineBasic component
 * 
 * @returns JSX element
 */
export const MultilineBasic: Story = {
  args: {
    multiline: true,
    label: 'Comments',
    placeholder: 'Enter your comments here...',
    rows: 4,
    helperText: 'Please provide detailed feedback',
  }
};

/**
 * MultilineWithCharacterCount component
 * 
 * @returns JSX element
 */
export const MultilineWithCharacterCount: Story = {
  args: {
    multiline: true,
    label: 'Product Review',
    placeholder: 'Write your review...',
    rows: 5,
    maxLength: 500,
    showCharacterCount: true,
    helperText: 'Share your experience with this product',
  }
};

/**
 * MultilineAutoResize component
 * 
 * @returns JSX element
 */
export const MultilineAutoResize: Story = {
  args: {
    multiline: true,
    label: 'Notes',
    placeholder: 'Start typing...',
    minRows: 2,
    maxRows: 8,
    helperText: 'Field will auto-resize as you type',
  }
};

// Icons and Actions
/**
 * WithStartIcon component
 * 
 * @returns JSX element
 */
export const WithStartIcon: Story = {
  args: {
    label: 'Search Products',
    placeholder: 'Search for products...',
    startIcon: <Search />,
  }
};

/**
 * WithEndIcon component
 * 
 * @returns JSX element
 */
export const WithEndIcon: Story = {
  args: {
    label: 'Valid Email',
    value: 'user@example.com',
    validationState: 'success',
    endIcon: <CheckCircle />,
  }
};

/**
 * WithEndAction component
 * 
 * @returns JSX element
 */
export const WithEndAction: Story = {
  render: (args) => {
    const [value, setValue] = useState('Clearable text');
    return (
      <TextField data-testid="textfield.stories"
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Clearable Field"
        endAction={
          <Clear 
            onClick={() => setValue('')}
            style={{ cursor: 'pointer' }}
            aria-label="Clear field"
          />
        }
      />
    );
  }
};

/**
 * WithBothIcons component
 * 
 * @returns JSX element
 */
export const WithBothIcons: Story = {
  args: {
    label: 'Secure Search',
    placeholder: 'Search securely...',
    startIcon: <Search />,
    endIcon: <Lock />,
  }
};

// Validation Examples
/**
 * EmailValidation component
 * 
 * @returns JSX element
 */
export const EmailValidation: Story = {
  render: (args) => {
    const [email, setEmail] = useState('');
    const [validationState, setValidationState] = useState<'none' | 'success' | 'error'>('none');
    const [errorText, setErrorText] = useState('');

    const validateEmail = (value: string) => {
      if (!value) {
        setValidationState('none');
        setErrorText('');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        setValidationState('success');
        setErrorText('');
      } else {
        setValidationState('error');
        setErrorText('Please enter a valid email address');
      }
    };

    return (
      <TextField data-testid="textfield.stories"
        {...args}
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        label="Email Address"
        placeholder="user@example.com"
        validationState={validationState}
        errorText={errorText}
        successText="Valid email address!"
        startIcon={<Email />}
      />
    );
  }
};

/**
 * PasswordStrengthValidation component
 * 
 * @returns JSX element
 */
export const PasswordStrengthValidation: Story = {
  render: (args) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validationState, setValidationState] = useState<'none' | 'error' | 'warning' | 'success'>('none');
    const [helperText, setHelperText] = useState('');

    const validatePassword = (value: string) => {
      if (!value) {
        setValidationState('none');
        setHelperText('');
        return;
      }

      const hasLower = /[a-z]/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isLongEnough = value.length >= 8;

      const strength = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;

      if (strength < 3) {
        setValidationState('error');
        setHelperText('Password is too weak');
      } else if (strength < 4) {
        setValidationState('warning');
        setHelperText('Password strength: Medium');
      } else {
        setValidationState('success');
        setHelperText('Password strength: Strong');
      }
    };

    return (
      <TextField data-testid="textfield.stories"
        {...args}
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePassword(e.target.value);
        }}
        label="Password"
        placeholder="Enter a strong password"
        validationState={validationState}
        helperText={helperText}
        startIcon={<Lock />}
        endAction={
          showPassword ? (
            <VisibilityOff 
              onClick={() => setShowPassword(false)}
              style={{ cursor: 'pointer' }}
              aria-label="Hide password"
            />
          ) : (
            <Visibility 
              onClick={() => setShowPassword(true)}
              style={{ cursor: 'pointer' }}
              aria-label="Show password"
            />
          )
        }
      />
    );
  }
};

// Full Width
/**
 * FullWidth component
 * 
 * @returns JSX element
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Full Width Field',
    placeholder: 'This field takes the full width of its container',
  }
};

// Custom Validation
/**
 * CustomValidation component
 * 
 * @returns JSX element
 */
export const CustomValidation: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username (min 3 chars)',
    validate: (value: string) => {
      if (value.length < 3) return 'Username must be at least 3 characters';
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
      return null;
    },
    helperText: 'Letters, numbers, and underscores only',
  }
};

// Complex Form Example
/**
 * ComplexForm component
 * 
 * @returns JSX element
 */
export const ComplexForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <TextField data-testid="textfield.stories"
        required
        label="First Name"
        placeholder="John"
        startIcon={<Person />}
      />
      <TextField data-testid="textfield.stories"
        required
        label="Last Name"
        placeholder="Doe"
        startIcon={<Person />}
      />
      <TextField data-testid="textfield.stories"
        required
        type="email"
        label="Email Address"
        placeholder="john.doe@example.com"
        startIcon={<Email />}
      />
      <TextField data-testid="textfield.stories"
        required
        type="tel"
        label="Phone Number"
        placeholder="+1 (555) 123-4567"
        startIcon={<Phone />}
      />
      <TextField data-testid="textfield.stories"
        multiline
        rows={4}
        label="Additional Comments"
        placeholder="Any additional information..."
        maxLength={500}
        showCharacterCount
      />
    </div>
  )
};

// Accessibility Example
/**
 * AccessibilityExample component
 * 
 * @returns JSX element
 */
export const AccessibilityExample: Story = {
  args: {
    label: 'Accessible Field',
    placeholder: 'This field has proper ARIA attributes',
    helperText: 'This field demonstrates accessibility features',
    'aria-label': 'Accessible text input field',
    'aria-describedby': 'accessible-helper-text',
    required: true,
  }
};

// Dark Theme Compatible
/**
 * DarkThemeCompatible component
 * 
 * @returns JSX element
 */
export const DarkThemeCompatible: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    label: 'Dark Theme Field',
    placeholder: 'Works well in dark theme',
    helperText: 'This component is optimized for dark themes',
    startIcon: <Search />,
  }
};

/**
 * LabelPositioning component
 * 
 * @returns JSX element
 */
export const LabelPositioning: Story = {
  render: () => {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    
    return (
      <Stack spacing={4}>
        <Typography variant="h6">Label Inside (Default)</Typography>
        <Stack spacing={2}>
          <TextField
            variant="outlined"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startIcon={<Email />}
            fullWidth
          />
          <TextField
            variant="filled"
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            startIcon={<Phone />}
            fullWidth
          />
        </Stack>
        
        <Typography variant="h6">Label Above</Typography>
        <Stack spacing={2}>
          <TextField
            variant="outlined"
            label="Email Address"
            labelPosition="above"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            startIcon={<Email />}
            fullWidth
          />
          <TextField
            variant="filled"
            label="Phone Number"
            labelPosition="above"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1 (555) 123-4567"
            startIcon={<Phone />}
            required
            fullWidth
          />
          <TextField
            variant="standard"
            label="Website URL"
            labelPosition="above"
            type="url"
            placeholder="https://example.com"
            helperText="Enter your website URL"
            fullWidth
          />
        </Stack>
      </Stack>
    );
  },
};