import { Box } from '@/components/layout/Box';
import { Paper } from '@/components/surfaces/Paper';
import { Typography } from '@/components/data-display/Typography';
import { Stack } from '@/components/layout/Stack';
import { Alert } from '@/components/feedback/Alert';
import { Button } from '@/components/core/Button';
import { Card, CardContent } from '@/components/data-display/Card';
import { 
  Chip,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { z } from 'zod';

import { commonValidationRules } from '@/forms/validation/ValidationEngine';

import { 
  FormBuilder, 
  createFormBuilderConfig,
  createFormSection,
  createFormField,
  createExampleForm,
} from './FormBuilder';

/**
 * FormBuilder is a dynamic form generation component that creates forms from configuration.
 * It supports sections, conditional fields, validation, and advanced form patterns.
 * 
 * ## Key Features
 * - Dynamic form generation from configuration
 * - Section-based form structure with accordion UI
 * - Conditional field visibility
 * - Plugin system for extensibility
 * - Multi-field type support
 * - Real-time validation
 * - Form state persistence
 * - Performance optimization
 */
const meta: Meta<typeof FormBuilder> = {
  title: 'Forms/FormBuilder',
  component: FormBuilder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Dynamic form builder that generates forms from configuration with advanced features.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC STORIES =====

export const BasicForm: Story = {
  render: () => {
    const config = createFormBuilderConfig(
      [
        createFormSection('contact', 'Contact Information', [
          createFormField('name', 'text', 'Full Name', {
            required: true,
            placeholder: 'Enter your full name',
          }),
          createFormField('email', 'text', 'Email Address', {
            required: true,
            placeholder: 'Enter your email',
            validation: [commonValidationRules.email()],
          }),
          createFormField('phone', 'phone', 'Phone Number', {
            placeholder: 'Enter your phone number',
            validation: [commonValidationRules.phone()],
          }),
        ]),
      ],
      {
        mode: 'onChange',
        performance: { debounceMs: 300 },
      }
    );

    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Basic Form Builder
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Simple form generated from configuration
        </Typography>
        
        <FormBuilder
          config={config}
          onSubmit={fn()}
          onError={fn()}
          onChange={fn()}
        />
      </Box>
    );
  },
};

// ===== MULTI-SECTION STORIES =====

export const MultiSectionForm: Story = {
  render: () => {
    const config = createFormBuilderConfig(
      [
        createFormSection('personal', 'Personal Information', [
          createFormField('firstName', 'text', 'First Name', {
            required: true,
            placeholder: 'Enter your first name',
          }),
          createFormField('lastName', 'text', 'Last Name', {
            required: true,
            placeholder: 'Enter your last name',
          }),
          createFormField('dateOfBirth', 'date', 'Date of Birth', {
            required: true,
          }),
        ]),
        
        createFormSection('contact', 'Contact Information', [
          createFormField('email', 'text', 'Email Address', {
            required: true,
            placeholder: 'Enter your email',
            validation: [commonValidationRules.email()],
          }),
          createFormField('phone', 'phone', 'Phone Number', {
            placeholder: 'Enter your phone number',
            validation: [commonValidationRules.phone()],
          }),
        ]),
        
        createFormSection('address', 'Address Information', [
          createFormField('street', 'text', 'Street Address', {
            required: true,
            placeholder: 'Enter your street address',
          }),
          createFormField('city', 'text', 'City', {
            required: true,
            placeholder: 'Enter your city',
          }),
          createFormField('state', 'select', 'State', {
            required: true,
            options: [
              { value: 'CA', label: 'California' },
              { value: 'NY', label: 'New York' },
              { value: 'TX', label: 'Texas' },
              { value: 'FL', label: 'Florida' },
            ],
          }),
          createFormField('zipCode', 'text', 'ZIP Code', {
            required: true,
            placeholder: 'Enter your ZIP code',
          }),
        ]),
      ],
      {
        mode: 'onChange',
        performance: { debounceMs: 300 },
        persistence: {
          enabled: true,
          key: 'multi-section-form',
          storage: 'localStorage',
        },
      }
    );

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Multi-Section Form
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Form with multiple sections organized in accordion layout
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          Form progress is automatically saved to localStorage
        </Alert>
        
        <FormBuilder
          config={config}
          onSubmit={fn()}
          onError={fn()}
          onChange={fn()}
        />
      </Box>
    );
  },
};

// ===== CONDITIONAL FIELDS STORIES =====

export const ConditionalFieldsForm: Story = {
  render: () => {
    const config = createFormBuilderConfig(
      [
        createFormSection('account', 'Account Type', [
          createFormField('accountType', 'select', 'Account Type', {
            required: true,
            options: [
              { value: 'personal', label: 'Personal' },
              { value: 'business', label: 'Business' },
            ],
          }),
        ]),
        
        createFormSection('personal', 'Personal Details', [
          createFormField('firstName', 'text', 'First Name', {
            required: true,
            placeholder: 'Enter your first name',
          }),
          createFormField('lastName', 'text', 'Last Name', {
            required: true,
            placeholder: 'Enter your last name',
          }),
        ], {
          condition: (values) => values.accountType === 'personal',
        }),
        
        createFormSection('business', 'Business Details', [
          createFormField('companyName', 'text', 'Company Name', {
            required: true,
            placeholder: 'Enter your company name',
          }),
          createFormField('taxId', 'text', 'Tax ID', {
            required: true,
            placeholder: 'Enter your tax ID',
          }),
          createFormField('industry', 'select', 'Industry', {
            required: true,
            options: [
              { value: 'tech', label: 'Technology' },
              { value: 'finance', label: 'Finance' },
              { value: 'healthcare', label: 'Healthcare' },
              { value: 'retail', label: 'Retail' },
              { value: 'other', label: 'Other' },
            ],
          }),
        ], {
          condition: (values) => values.accountType === 'business',
        }),
        
        createFormSection('contact', 'Contact Information', [
          createFormField('email', 'text', 'Email Address', {
            required: true,
            placeholder: 'Enter your email',
            validation: [commonValidationRules.email()],
          }),
          createFormField('phone', 'phone', 'Phone Number', {
            placeholder: 'Enter your phone number',
            validation: [commonValidationRules.phone()],
          }),
        ]),
      ],
      {
        mode: 'onChange',
        performance: { debounceMs: 300 },
      }
    );

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Conditional Fields Form
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Form sections that show/hide based on user selections
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          Select an account type to see conditional sections appear
        </Alert>
        
        <FormBuilder
          config={config}
          onSubmit={fn()}
          onError={fn()}
          onChange={fn()}
        />
      </Box>
    );
  },
};

// ===== FIELD TYPES SHOWCASE =====

export const FieldTypesShowcase: Story = {
  render: () => {
    const config = createFormBuilderConfig(
      [
        createFormSection('text-fields', 'Text Fields', [
          createFormField('singleLine', 'text', 'Single Line Text', {
            placeholder: 'Enter single line text',
          }),
          createFormField('multiLine', 'rich-text', 'Multi Line Text', {
            placeholder: 'Enter multi line text',
          }),
          createFormField('email', 'text', 'Email Field', {
            placeholder: 'Enter email address',
            validation: [commonValidationRules.email()],
          }),
          createFormField('phone', 'phone', 'Phone Field', {
            placeholder: 'Enter phone number',
            validation: [commonValidationRules.phone()],
          }),
          createFormField('url', 'text', 'URL Field', {
            placeholder: 'Enter URL',
            validation: [commonValidationRules.url()],
          }),
        ]),
        
        createFormSection('selection-fields', 'Selection Fields', [
          createFormField('dropdown', 'select', 'Dropdown Select', {
            options: [
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ],
          }),
          createFormField('autocomplete', 'autocomplete', 'Autocomplete', {
            options: [
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'orange', label: 'Orange' },
              { value: 'grape', label: 'Grape' },
            ],
          }),
          createFormField('radio', 'radio', 'Radio Group', {
            options: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'maybe', label: 'Maybe' },
            ],
          }),
          createFormField('checkbox', 'checkbox', 'Checkbox', {
            options: [
              { value: 'newsletter', label: 'Subscribe to newsletter' },
              { value: 'terms', label: 'Accept terms and conditions' },
            ],
          }),
        ]),
        
        createFormSection('special-fields', 'Special Fields', [
          createFormField('date', 'date', 'Date Picker', {
            placeholder: 'Select a date',
          }),
          createFormField('file', 'file', 'File Upload', {
            placeholder: 'Upload a file',
          }),
          createFormField('signature', 'signature', 'Digital Signature', {
            placeholder: 'Draw your signature',
          }),
          createFormField('address', 'address', 'Address Field', {
            placeholder: 'Enter complete address',
          }),
        ]),
      ],
      {
        mode: 'onChange',
        performance: { debounceMs: 300 },
      }
    );

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Field Types Showcase
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Demonstration of all available field types
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          Some field types are placeholders and will render as text fields in this demo
        </Alert>
        
        <FormBuilder
          config={config}
          onSubmit={fn()}
          onError={fn()}
          onChange={fn()}
        />
      </Box>
    );
  },
};

// ===== EXAMPLE FORM STORY =====

export const ExampleForm: Story = {
  render: () => {
    const config = createExampleForm();

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Example Form
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Pre-configured example form from createExampleForm() utility
        </Typography>
        
        <FormBuilder
          config={config}
          onSubmit={fn()}
          onError={fn()}
          onChange={fn()}
        />
      </Box>
    );
  },
};

// ===== CUSTOM THEME STORY =====

export const CustomThemeForm: Story = {
  render: () => {
    const customTheme = {
      name: 'custom-theme',
      colors: {
        primary: '#6366f1',
        secondary: '#ec4899',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#06b6d4',
        success: '#10b981',
        text: '#1f2937',
        background: '#ffffff',
        surface: '#f9fafb',
      },
      typography: {
        fontFamily: '"Inter", sans-serif',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '1.5',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      breakpoints: {
        mobile: '768px',
        tablet: '1024px',
        desktop: '1200px',
      },
    };

    const config = createFormBuilderConfig(
      [
        createFormSection('profile', 'Profile Information', [
          createFormField('name', 'text', 'Full Name', {
            required: true,
            placeholder: 'Enter your full name',
          }),
          createFormField('email', 'text', 'Email Address', {
            required: true,
            placeholder: 'Enter your email',
            validation: [commonValidationRules.email()],
          }),
          createFormField('bio', 'rich-text', 'Bio', {
            placeholder: 'Tell us about yourself...',
          }),
        ]),
        
        createFormSection('preferences', 'Preferences', [
          createFormField('theme', 'select', 'Theme Preference', {
            options: [
              { value: 'light', label: 'Light Theme' },
              { value: 'dark', label: 'Dark Theme' },
              { value: 'auto', label: 'Auto (System)' },
            ],
          }),
          createFormField('notifications', 'checkbox', 'Notifications', {
            options: [
              { value: 'email', label: 'Email notifications' },
              { value: 'push', label: 'Push notifications' },
              { value: 'sms', label: 'SMS notifications' },
            ],
          }),
        ]),
      ],
      {
        mode: 'onChange',
        performance: { debounceMs: 300 },
      },
      customTheme
    );

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Custom Theme Form
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Form with custom theme configuration
        </Typography>
        
        <FormBuilder
          config={config}
          theme={customTheme}
          onSubmit={fn()}
          onError={fn()}
          onChange={fn()}
        />
      </Box>
    );
  },
};

// ===== INTERACTIVE BUILDER =====

export const InteractiveBuilder: Story = {
  render: () => {
    const [sections, setSections] = useState([
      createFormSection('section1', 'Section 1', [
        createFormField('field1', 'text', 'Field 1', {
          required: true,
          placeholder: 'Enter field 1',
        }),
      ]),
    ]);

    const [formConfig, setFormConfig] = useState({
      mode: 'onChange' as const,
      performance: { debounceMs: 300 },
      persistence: { enabled: false, key: 'interactive-form', storage: 'localStorage' as const },
    });

    const addSection = () => {
      const newSection = createFormSection(
        `section${sections.length + 1}`,
        `Section ${sections.length + 1}`,
        [
          createFormField(
            `field${sections.length + 1}`,
            'text',
            `Field ${sections.length + 1}`,
            {
              placeholder: `Enter field ${sections.length + 1}`,
            }
          ),
        ]
      );
      setSections([...sections, newSection]);
    };

    const removeSection = () => {
      if (sections.length > 1) {
        setSections(sections.slice(0, -1));
      }
    };

    const config = createFormBuilderConfig(sections, formConfig);

    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Interactive Form Builder
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Build forms dynamically by adding/removing sections
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* Controls */}
          <Card sx={{ minWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Builder Controls
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Sections ({sections.length})
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Button onClick={addSection} variant="outlined" size="small">
                      Add Section
                    </Button>
                    <Button 
                      onClick={removeSection} 
                      variant="outlined" 
                      size="small"
                      disabled={sections.length <= 1}
                    >
                      Remove Section
                    </Button>
                  </Stack>
                </Box>
                
                <Divider />
                
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Form Configuration
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formConfig.persistence.enabled}
                        onChange={(e) => setFormConfig(prev => ({
                          ...prev,
                          persistence: { ...prev.persistence, enabled: e.target.checked },
                        }))}
                      />
                    }
                    label="Enable Persistence"
                  />
                </Box>
                
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Debounce: {formConfig.performance.debounceMs}ms
                  </Typography>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="100"
                    value={formConfig.performance.debounceMs}
                    onChange={(e) => setFormConfig(prev => ({
                      ...prev,
                      performance: { ...prev.performance, debounceMs: parseInt(e.target.value) },
                    }))}
                    style={{ width: '100%' }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
          
          {/* Form Preview */}
          <Box sx={{ flex: 1 }}>
            <FormBuilder
              config={config}
              onSubmit={fn()}
              onError={fn()}
              onChange={fn()}
            />
          </Box>
        </Box>
      </Box>
    );
  },
};

// ===== COMPLEX VALIDATION STORY =====

export const ComplexValidationForm: Story = {
  render: () => {
    const config = createFormBuilderConfig(
      [
        createFormSection('account', 'Account Setup', [
          createFormField('username', 'text', 'Username', {
            required: true,
            placeholder: 'Enter username',
            validation: [
              commonValidationRules.required('Username is required'),
              commonValidationRules.custom(
                (value: string) => value.length >= 3,
                'Username must be at least 3 characters'
              ),
              commonValidationRules.custom(
                (value: string) => /^[a-zA-Z0-9_]+$/.test(value),
                'Username can only contain letters, numbers, and underscores'
              ),
            ],
          }),
          createFormField('email', 'text', 'Email Address', {
            required: true,
            placeholder: 'Enter email address',
            validation: [
              commonValidationRules.required('Email is required'),
              commonValidationRules.email('Please enter a valid email'),
            ],
          }),
          createFormField('password', 'text', 'Password', {
            required: true,
            placeholder: 'Enter password',
            validation: [
              commonValidationRules.required('Password is required'),
              commonValidationRules.custom(
                (value: string) => value.length >= 8,
                'Password must be at least 8 characters'
              ),
              commonValidationRules.custom(
                (value: string) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value),
                'Password must contain lowercase, uppercase, and number'
              ),
            ],
          }),
          createFormField('confirmPassword', 'text', 'Confirm Password', {
            required: true,
            placeholder: 'Confirm password',
            validation: [
              commonValidationRules.required('Password confirmation is required'),
            ],
          }),
        ]),
        
        createFormSection('profile', 'Profile Information', [
          createFormField('age', 'text', 'Age', {
            required: true,
            placeholder: 'Enter your age',
            validation: [
              commonValidationRules.custom(
                (value: string) => {
                  const age = parseInt(value);
                  return !isNaN(age) && age >= 18 && age <= 100;
                },
                'Age must be between 18 and 100'
              ),
            ],
          }),
          createFormField('website', 'text', 'Website', {
            placeholder: 'Enter your website URL',
            validation: [commonValidationRules.url()],
          }),
          createFormField('bio', 'rich-text', 'Bio', {
            placeholder: 'Tell us about yourself...',
            validation: [
              commonValidationRules.custom(
                (value: string) => value.length <= 500,
                'Bio must be less than 500 characters'
              ),
            ],
          }),
        ]),
      ],
      {
        mode: 'onChange',
        performance: { debounceMs: 300 },
      }
    );

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Complex Validation Form
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Form with comprehensive validation rules and requirements
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          This form demonstrates complex validation including regex patterns, 
          custom rules, and cross-field validation
        </Alert>
        
        <FormBuilder
          config={config}
          onSubmit={fn()}
          onError={fn()}
          onChange={fn()}
        />
      </Box>
    );
  },
};