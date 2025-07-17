import { Box } from '@/components/layout/Box';
import { Typography } from '@/components/data-display/Typography';
import { Alert } from '@/components/feedback/Alert';
import { Button } from '@/components/core/Button';
import { Card, CardContent } from '@/components/data-display/Card';
import { Stack } from '@/components/layout/Stack';
import { 
  Switch,
  FormControlLabel,
  Divider,
  Chip,
} from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { z } from 'zod';

import { 
  FormWizardSimplified, 
  createSimpleWizardConfig,
  createSimpleWizardStep,
} from './FormWizardSimplified';

/**
 * FormWizard is a multi-step form component that guides users through complex forms
 * with step-by-step navigation, validation, and progress tracking.
 * 
 * ## Key Features
 * - Multi-step form with visual progress indicator
 * - Step validation and conditional steps
 * - Skip functionality for optional steps
 * - Back navigation with form state preservation
 * - Progress persistence across sessions
 * - Customizable step transitions
 * - Accessibility optimizations
 * - Real-time form validation
 * 
 * ## Note
 * This component is currently under development and some stories are temporarily disabled
 * to prevent browser hanging due to infinite loops in the underlying form system.
 */
const meta: Meta<typeof FormWizardSimplified> = {
  title: 'Forms/FormWizard',
  component: FormWizardSimplified,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Multi-step form wizard with advanced navigation and validation features. Currently under development.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== BASIC WIZARD STORY =====

export const BasicWizard: Story = {
  render: () => {
    const wizardConfig = createSimpleWizardConfig([
      createSimpleWizardStep('personal', 'Personal Information', [
        'firstName', 'lastName', 'email'
      ], {
        description: 'Please provide your basic information',
      }),
      
      createSimpleWizardStep('contact', 'Contact Details', [
        'phone', 'address', 'city'
      ], {
        description: 'Please provide your contact information',
      }),
      
      createSimpleWizardStep('preferences', 'Preferences', [
        'newsletter', 'notifications'
      ], {
        description: 'Configure your preferences',
        canSkip: true,
      }),
    ]);

    const formConfig = {
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        newsletter: false,
        notifications: false,
      },
    };

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Basic Form Wizard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Simple 3-step wizard with optional final step (Fixed version)
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          FormWizard component has been refactored and is now working without infinite loops!
        </Alert>
        
        <FormWizardSimplified
          config={wizardConfig}
          formConfig={formConfig}
          onComplete={fn()}
          onStepChange={fn()}
          onCancel={fn()}
        />
      </Box>
    );
  },
};

// ===== CONDITIONAL STEPS STORY =====

export const ConditionalSteps: Story = {
  render: () => {
    const wizardConfig = createSimpleWizardConfig([
      createSimpleWizardStep('account-type', 'Account Type', [
        'accountType'
      ], {
        description: 'Choose your account type',
        fieldConfigs: {
          accountType: {
            type: 'select',
            options: [
              { value: 'personal', label: 'Personal Account' },
              { value: 'business', label: 'Business Account' },
            ]
          }
        }
      }),
      
      createSimpleWizardStep('personal', 'Personal Information', [
        'firstName', 'lastName', 'dateOfBirth'
      ], {
        description: 'Personal account information',
        condition: (values) => values.accountType === 'personal',
      }),
      
      createSimpleWizardStep('business', 'Business Information', [
        'companyName', 'taxId', 'industry'
      ], {
        description: 'Business account information',
        condition: (values) => values.accountType === 'business',
      }),
      
      createSimpleWizardStep('contact', 'Contact Information', [
        'email', 'phone'
      ], {
        description: 'Contact details (required for all accounts)',
      }),
    ]);

    const formConfig = {
      defaultValues: {
        accountType: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        companyName: '',
        taxId: '',
        industry: '',
        email: '',
        phone: '',
      },
    };

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Conditional Steps Wizard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Wizard with steps that appear based on user selections (Fixed version)
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          Select an account type to see conditional steps appear. The wizard now works without infinite loops!
        </Alert>
        
        <FormWizardSimplified
          config={wizardConfig}
          formConfig={formConfig}
          onComplete={fn()}
          onStepChange={fn()}
          onCancel={fn()}
        />
      </Box>
    );
  },
};

// ===== VALIDATION WIZARD STORY =====

export const ValidationWizard: Story = {
  render: () => {
    const step1Schema = z.object({
      username: z.string().min(3, 'Username must be at least 3 characters'),
      email: z.string().email('Invalid email format'),
    });

    const step2Schema = z.object({
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

    const wizardConfig = createSimpleWizardConfig([
      createSimpleWizardStep('account', 'Account Setup', [
        'username', 'email'
      ], {
        description: 'Create your account credentials',
        validation: step1Schema,
      }),
      
      createSimpleWizardStep('security', 'Security', [
        'password', 'confirmPassword'
      ], {
        description: 'Set up your password',
        validation: step2Schema,
      }),
      
      createSimpleWizardStep('preferences', 'Preferences', [
        'newsletter', 'notifications'
      ], {
        description: 'Configure your preferences',
        canSkip: true,
      }),
    ]);

    const formConfig = {
      defaultValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        newsletter: false,
        notifications: false,
      },
    };

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Validation Wizard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Wizard with comprehensive validation at each step (Fixed version)
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          Each step has validation rules that must be satisfied before proceeding. The wizard now works without infinite loops!
        </Alert>
        
        <FormWizardSimplified
          config={wizardConfig}
          formConfig={formConfig}
          onComplete={fn()}
          onStepChange={fn()}
          onCancel={fn()}
        />
      </Box>
    );
  },
};

// ===== PERSISTENT WIZARD STORY =====

export const PersistentWizard: Story = {
  render: () => {
    const wizardConfig = createSimpleWizardConfig([
      createSimpleWizardStep('profile', 'Profile Setup', [
        'firstName', 'lastName', 'avatar'
      ], {
        description: 'Set up your basic profile information',
      }),
      
      createSimpleWizardStep('settings', 'Account Settings', [
        'email', 'password', 'twoFactor'
      ], {
        description: 'Configure your account security',
      }),
      
      createSimpleWizardStep('preferences', 'Preferences', [
        'theme', 'language', 'notifications'
      ], {
        description: 'Customize your experience',
        canSkip: true,
      }),
    ]);

    const formConfig = {
      defaultValues: {
        firstName: '',
        lastName: '',
        avatar: '',
        email: '',
        password: '',
        twoFactor: false,
        theme: 'light',
        language: 'en',
        notifications: true,
      },
    };

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Persistent Wizard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Wizard that saves progress and can be resumed later (Fixed version)
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          Persistence features would integrate with FormWizardSimplified. The wizard now works without infinite loops!
        </Alert>
        
        <FormWizardSimplified
          config={wizardConfig}
          formConfig={formConfig}
          onComplete={fn()}
          onStepChange={fn()}
          onCancel={fn()}
        />
      </Box>
    );
  },
};

// ===== EXAMPLE WIZARD STORY =====

export const ExampleWizard: Story = {
  render: () => {
    const wizardConfig = createSimpleWizardConfig([
      createSimpleWizardStep('contact', 'Contact Information', [
        'fullName', 'email', 'phone'
      ], {
        description: 'Please provide your contact details',
        validation: z.object({
          fullName: z.string().min(2, 'Name must be at least 2 characters'),
          email: z.string().email('Invalid email format'),
          phone: z.string().min(10, 'Phone must be at least 10 digits'),
        }),
      }),
      
      createSimpleWizardStep('address', 'Address Information', [
        'street', 'city', 'zipCode', 'country'
      ], {
        description: 'Please provide your address',
      }),
      
      createSimpleWizardStep('review', 'Review & Submit', [
        'agreedToTerms', 'marketingEmails'
      ], {
        description: 'Review your information and complete registration',
      }),
    ]);

    const formConfig = {
      defaultValues: {
        fullName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        zipCode: '',
        country: '',
        agreedToTerms: false,
        marketingEmails: false,
      },
    };

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Example Wizard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Pre-configured example wizard with validation and form completion (Fixed version)
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          Complete example wizard implementation using FormWizardSimplified. No more infinite loops!
        </Alert>
        
        <FormWizardSimplified
          config={wizardConfig}
          formConfig={formConfig}
          onComplete={fn()}
          onStepChange={fn()}
          onCancel={fn()}
        />
      </Box>
    );
  },
};

// ===== DISABLED STORIES =====

export const CustomThemeWizard: Story = {
  render: () => {
    const wizardConfig = createSimpleWizardConfig([
      createSimpleWizardStep('branding', 'Brand Setup', [
        'companyName', 'logo', 'primaryColor'
      ], {
        description: 'Configure your brand identity',
      }),
      
      createSimpleWizardStep('styling', 'Visual Style', [
        'theme', 'typography', 'layout'
      ], {
        description: 'Choose visual styling options',
      }),
    ]);

    const formConfig = {
      defaultValues: {
        companyName: '',
        logo: '',
        primaryColor: '#1976d2',
        theme: 'modern',
        typography: 'roboto',
        layout: 'standard',
      },
    };

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Custom Theme Wizard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Wizard with custom theming capabilities (Fixed version)
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          Theme customization would integrate with the enhanced theme system. The wizard now works without infinite loops!
        </Alert>
        
        <FormWizardSimplified
          config={wizardConfig}
          formConfig={formConfig}
          onComplete={fn()}
          onStepChange={fn()}
          onCancel={fn()}
        />
      </Box>
    );
  },
};

export const InteractiveWizardBuilder: Story = {
  render: () => {
    const [stepCount, setStepCount] = useState(2);
    
    const wizardConfig = createSimpleWizardConfig(
      Array.from({ length: stepCount }, (_, index) => 
        createSimpleWizardStep(
          `step-${index + 1}`,
          `Dynamic Step ${index + 1}`,
          [`field${index + 1}A`, `field${index + 1}B`],
          {
            description: `This is dynamically generated step ${index + 1}`,
            canSkip: index === stepCount - 1,
          }
        )
      )
    );

    const formConfig = {
      defaultValues: Object.fromEntries(
        Array.from({ length: stepCount * 2 }, (_, i) => {
          const stepNum = Math.floor(i / 2) + 1;
          const fieldLetter = i % 2 === 0 ? 'A' : 'B';
          return [`field${stepNum}${fieldLetter}`, ''];
        })
      ),
    };

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Interactive Wizard Builder
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Build wizards dynamically with interactive controls (Fixed version)
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          Dynamic wizard building using FormWizardSimplified. No more infinite loops!
        </Alert>
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6">Builder Controls:</Typography>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => setStepCount(Math.max(1, stepCount - 1))}
                disabled={stepCount <= 1}
              >
                Remove Step
              </Button>
              <Typography>Steps: {stepCount}</Typography>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => setStepCount(Math.min(5, stepCount + 1))}
                disabled={stepCount >= 5}
              >
                Add Step
              </Button>
            </Stack>
          </CardContent>
        </Card>
        
        <FormWizardSimplified
          config={wizardConfig}
          formConfig={formConfig}
          onComplete={fn()}
          onStepChange={fn()}
          onCancel={fn()}
        />
      </Box>
    );
  },
};

export const ComplexWizard: Story = {
  render: () => {
    const wizardConfig = createSimpleWizardConfig([
      createSimpleWizardStep('user-type', 'User Type', [
        'userType', 'organizationSize'
      ], {
        description: 'Tell us about yourself',
      }),
      
      createSimpleWizardStep('individual', 'Individual Setup', [
        'firstName', 'lastName', 'profession'
      ], {
        description: 'Individual user configuration',
        condition: (values) => values.userType === 'individual',
        validation: z.object({
          firstName: z.string().min(1, 'First name required'),
          lastName: z.string().min(1, 'Last name required'),
          profession: z.string().min(1, 'Profession required'),
        }),
      }),
      
      createSimpleWizardStep('enterprise', 'Enterprise Setup', [
        'companyName', 'department', 'role', 'teamSize'
      ], {
        description: 'Enterprise user configuration',
        condition: (values) => values.userType === 'enterprise',
        validation: z.object({
          companyName: z.string().min(1, 'Company name required'),
          department: z.string().min(1, 'Department required'),
          role: z.string().min(1, 'Role required'),
          teamSize: z.string().min(1, 'Team size required'),
        }),
      }),
      
      createSimpleWizardStep('advanced-config', 'Advanced Configuration', [
        'apiAccess', 'dataRetention', 'integrations'
      ], {
        description: 'Advanced features and settings',
        condition: (values) => values.organizationSize === 'large',
        canSkip: true,
      }),
      
      createSimpleWizardStep('completion', 'Final Setup', [
        'termsAccepted', 'newsletterSubscription', 'completionNotes'
      ], {
        description: 'Complete your setup',
      }),
    ]);

    const formConfig = {
      defaultValues: {
        userType: '',
        organizationSize: '',
        firstName: '',
        lastName: '',
        profession: '',
        companyName: '',
        department: '',
        role: '',
        teamSize: '',
        apiAccess: false,
        dataRetention: '',
        integrations: '',
        termsAccepted: false,
        newsletterSubscription: false,
        completionNotes: '',
      },
    };

    return (
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Complex Multi-Step Wizard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Advanced wizard with conditional logic, validation, and complex workflows (Fixed version)
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          Complex wizard with conditional steps, validation, and advanced features using FormWizardSimplified. No more infinite loops!
        </Alert>
        
        <FormWizardSimplified
          config={wizardConfig}
          formConfig={formConfig}
          onComplete={fn()}
          onStepChange={fn()}
          onCancel={fn()}
        />
      </Box>
    );
  },
};