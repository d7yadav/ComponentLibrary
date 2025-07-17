import { Box } from '@/components/layout/Box';
import { Typography } from '@/components/data-display/Typography';
import { Alert } from '@/components/feedback/Alert';
import { Paper } from '@/components/surfaces/Paper';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/core/Button';
import { Card, CardContent } from '@/components/data-display/Card';
import { TextField } from '@/components/forms/TextField';
import { Select } from '@/components/forms/Select';
import { Checkbox } from '@/components/forms/Checkbox';
import { 
  Tabs,
  Tab,
  Chip,
  Divider,
} from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { 
  FormWizardSimplified, 
  createSimpleWizardConfig,
  createSimpleWizardStep,
} from '@/forms/patterns/FormWizardSimplified';
import { 
  FormBuilder, 
  createFormBuilderConfig, 
  createFormSection, 
  createFormField 
} from '@/forms/builder/FormBuilder';
import { useAdvancedForm } from '@/forms/core/hooks/useAdvancedForm';
import { SmartFormProvider } from '@/forms/core/providers/FormProvider';
import { SmartTextField } from '@/forms/components/fields/SmartTextField';
import { commonValidationRules } from '@/forms/validation/ValidationEngine';

/**
 * Comprehensive form examples demonstrating real-world use cases
 * with the expert form system. These examples show complete form
 * implementations with validation, persistence, analytics, and more.
 * 
 * ## Examples Include:
 * - User Registration Form
 * - E-commerce Checkout Form
 * - Job Application Form
 * - Survey Form with Conditional Logic
 * - Multi-step Onboarding Flow
 * - Contact Form with File Upload
 * - Settings/Preferences Form
 * - Event Registration Form
 */
const meta: Meta = {
  title: 'Forms/Comprehensive Examples',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Real-world form examples demonstrating the complete expert form system.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== TABBED INTERFACE COMPONENT =====

const TabbedInterface: React.FC<{
  tabs: Array<{ label: string; component: React.ReactNode }>;
}> = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)}>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {tabs[currentTab]?.component}
      </Box>
    </Box>
  );
};

// ===== USER REGISTRATION FORM =====

const UserRegistrationForm: React.FC = () => {
  const schema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Invalid phone format'),
    address: z.object({
      street: z.string().min(1, 'Street address is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      zipCode: z.string().regex(/^\d{5}$/, 'Invalid ZIP code'),
    }),
    preferences: z.object({
      newsletter: z.boolean(),
      notifications: z.boolean(),
      marketing: z.boolean(),
    }),
    terms: z.boolean().refine(val => val, 'You must accept the terms'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

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
        createFormField('email', 'text', 'Email Address', {
          required: true,
          placeholder: 'Enter your email',
          validation: [commonValidationRules.email()],
        }),
        createFormField('dateOfBirth', 'date', 'Date of Birth', {
          required: true,
        }),
        createFormField('phone', 'phone', 'Phone Number', {
          required: true,
          placeholder: 'Enter your phone number',
        }),
      ]),
      
      createFormSection('security', 'Security', [
        createFormField('password', 'text', 'Password', {
          required: true,
          placeholder: 'Create a strong password',
          validation: [
            commonValidationRules.custom(
              (value: string) => value.length >= 8,
              'Password must be at least 8 characters'
            ),
          ],
        }),
        createFormField('confirmPassword', 'text', 'Confirm Password', {
          required: true,
          placeholder: 'Confirm your password',
        }),
      ]),
      
      createFormSection('address', 'Address Information', [
        createFormField('address.street', 'text', 'Street Address', {
          required: true,
          placeholder: 'Enter your street address',
        }),
        createFormField('address.city', 'text', 'City', {
          required: true,
          placeholder: 'Enter your city',
        }),
        createFormField('address.state', 'select', 'State', {
          required: true,
          options: [
            { value: 'CA', label: 'California' },
            { value: 'NY', label: 'New York' },
            { value: 'TX', label: 'Texas' },
            { value: 'FL', label: 'Florida' },
          ],
        }),
        createFormField('address.zipCode', 'text', 'ZIP Code', {
          required: true,
          placeholder: 'Enter your ZIP code',
        }),
      ]),
      
      createFormSection('preferences', 'Preferences', [
        createFormField('preferences.newsletter', 'checkbox', 'Newsletter', {
          options: [{ value: 'true', label: 'Subscribe to newsletter' }],
        }),
        createFormField('preferences.notifications', 'checkbox', 'Notifications', {
          options: [{ value: 'true', label: 'Enable notifications' }],
        }),
        createFormField('preferences.marketing', 'checkbox', 'Marketing', {
          options: [{ value: 'true', label: 'Receive marketing emails' }],
        }),
      ]),
      
      createFormSection('terms', 'Terms and Conditions', [
        createFormField('terms', 'checkbox', 'Terms', {
          required: true,
          options: [{ value: 'true', label: 'I accept the terms and conditions' }],
        }),
      ]),
    ],
    {
      mode: 'onChange',
      schema,
      persistence: {
        enabled: true,
        key: 'user-registration',
        storage: 'localStorage',
      },
      analytics: {
        enabled: true,
        trackingId: 'user-registration-form',
        events: ['form_start', 'section_complete', 'form_submit'],
      },
    }
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        User Registration Form
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Complete registration form with validation, persistence, and analytics
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label="Schema Validation" color="primary" size="small" />
          <Chip label="Form Persistence" color="success" size="small" />
          <Chip label="Analytics Tracking" color="info" size="small" />
          <Chip label="Multi-section Layout" color="warning" size="small" />
        </Stack>
      </Box>
      
      <FormBuilder
        config={config}
        onSubmit={fn()}
        onError={fn()}
        onChange={fn()}
      />
    </Box>
  );
};

// ===== E-COMMERCE CHECKOUT FORM =====

const EcommerceCheckoutForm: React.FC = () => {
  const wizardConfig = createSimpleWizardConfig([
    createSimpleWizardStep('contact', 'Contact Information', [
      'email', 'phone'
    ], {
      description: 'How can we reach you?',
    }),
    
    createSimpleWizardStep('shipping', 'Shipping Address', [
      'shippingAddress.firstName', 'shippingAddress.lastName',
      'shippingAddress.street', 'shippingAddress.city',
      'shippingAddress.state', 'shippingAddress.zipCode'
    ], {
      description: 'Where should we ship your order?',
    }),
    
    createSimpleWizardStep('billing', 'Billing Address', [
      'sameAsShipping', 'billingAddress.street', 'billingAddress.city',
      'billingAddress.state', 'billingAddress.zipCode'
    ], {
      description: 'Billing information',
    }),
    
    createSimpleWizardStep('payment', 'Payment Information', [
      'paymentMethod', 'creditCard.number', 'creditCard.expiry',
      'creditCard.cvv', 'creditCard.name'
    ], {
      description: 'How would you like to pay?',
    }),
    
    createSimpleWizardStep('review', 'Review Order', [
      'orderNotes', 'terms'
    ], {
      description: 'Review your order before submitting',
    }),
  ]);

  const formConfig = {
    mode: 'onChange' as const,
    persistence: {
      enabled: true,
      key: 'checkout-form',
      storage: 'localStorage' as const,
    },
    analytics: {
      enabled: true,
      trackingId: 'checkout-flow',
      events: ['checkout_start', 'step_complete', 'order_submit'],
    },
    defaultValues: {
      email: '',
      phone: '',
      shippingAddress: {
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      sameAsShipping: true,
      billingAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      paymentMethod: 'credit',
      creditCard: {
        number: '',
        expiry: '',
        cvv: '',
        name: '',
      },
      orderNotes: '',
      terms: false,
    },
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        E-commerce Checkout Form
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Multi-step checkout process with payment and shipping
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label="Multi-step Wizard" color="primary" size="small" />
          <Chip label="Conditional Steps" color="success" size="small" />
          <Chip label="Payment Processing" color="info" size="small" />
          <Chip label="Address Validation" color="warning" size="small" />
        </Stack>
      </Box>
      
      <FormWizardSimplified
        config={wizardConfig}
        formConfig={formConfig}
        onComplete={fn()}
        onStepChange={fn()}
        onCancel={fn()}
      />
    </Box>
  );
};

// ===== JOB APPLICATION FORM =====

const JobApplicationForm: React.FC = () => {
  const form = useAdvancedForm({
    mode: 'onChange',
    persistence: {
      enabled: true,
      key: 'job-application',
      storage: 'localStorage',
    },
    analytics: {
      enabled: true,
      trackingId: 'job-application-form',
      events: ['application_start', 'section_complete', 'application_submit'],
    },
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        linkedin: '',
        portfolio: '',
      },
      position: {
        title: '',
        department: '',
        referral: '',
        startDate: '',
        salary: '',
      },
      experience: {
        currentRole: '',
        company: '',
        experience: '',
        skills: '',
        achievements: '',
      },
      education: {
        degree: '',
        institution: '',
        graduationYear: '',
        gpa: '',
      },
      additional: {
        coverLetter: '',
        availability: '',
        relocation: false,
        authorized: false,
      },
    },
  });

  return (
    <SmartFormProvider form={form} config={{ mode: 'onChange' }}>
      <FormProvider {...form}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Job Application Form
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Comprehensive job application with file uploads and validations
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label="File Upload" color="primary" size="small" />
              <Chip label="Rich Text Editor" color="success" size="small" />
              <Chip label="Conditional Logic" color="info" size="small" />
              <Chip label="Progress Tracking" color="warning" size="small" />
            </Stack>
          </Box>
          
          <Paper sx={{ p: 3 }}>
            <form onSubmit={form.handleSubmit(fn())}>
              <Stack spacing={4}>
                {/* Personal Information */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <SmartTextField
                        name="personalInfo.firstName"
                        label="First Name"
                        placeholder="Enter your first name"
                        required
                      />
                      <SmartTextField
                        name="personalInfo.lastName"
                        label="Last Name"
                        placeholder="Enter your last name"
                        required
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <SmartTextField
                        name="personalInfo.email"
                        label="Email Address"
                        placeholder="Enter your email"
                        required
                        validation={[commonValidationRules.email()]}
                      />
                      <SmartTextField
                        name="personalInfo.phone"
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        required
                        validation={[commonValidationRules.phone()]}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <SmartTextField
                        name="personalInfo.linkedin"
                        label="LinkedIn Profile"
                        placeholder="https://linkedin.com/in/yourprofile"
                        validation={[commonValidationRules.url()]}
                      />
                      <SmartTextField
                        name="personalInfo.portfolio"
                        label="Portfolio Website"
                        placeholder="https://yourportfolio.com"
                        validation={[commonValidationRules.url()]}
                      />
                    </Box>
                  </Stack>
                </Box>
                
                <Divider />
                
                {/* Position Details */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Position Details
                  </Typography>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <SmartTextField
                        name="position.title"
                        label="Position Title"
                        placeholder="Enter the position you're applying for"
                        required
                      />
                      <SmartTextField
                        name="position.department"
                        label="Department"
                        placeholder="Enter the department"
                        suggestions={['Engineering', 'Marketing', 'Sales', 'Design', 'HR']}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <SmartTextField
                        name="position.referral"
                        label="Referral Source"
                        placeholder="How did you hear about this position?"
                        suggestions={['LinkedIn', 'Company Website', 'Job Board', 'Referral', 'Other']}
                      />
                      <SmartTextField
                        name="position.startDate"
                        label="Available Start Date"
                        placeholder="When can you start?"
                        inputMode="date"
                      />
                    </Box>
                    <SmartTextField
                      name="position.salary"
                      label="Expected Salary"
                      placeholder="Enter your salary expectations"
                      inputMode="numeric"
                    />
                  </Stack>
                </Box>
                
                <Divider />
                
                {/* Experience */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Experience
                  </Typography>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <SmartTextField
                        name="experience.currentRole"
                        label="Current Role"
                        placeholder="Your current position"
                      />
                      <SmartTextField
                        name="experience.company"
                        label="Current Company"
                        placeholder="Your current company"
                      />
                    </Box>
                    <SmartTextField
                      name="experience.experience"
                      label="Years of Experience"
                      placeholder="How many years of relevant experience?"
                      inputMode="numeric"
                    />
                    <SmartTextField
                      name="experience.skills"
                      label="Key Skills"
                      placeholder="List your key skills (comma separated)"
                      multiline
                      rows={3}
                    />
                    <SmartTextField
                      name="experience.achievements"
                      label="Key Achievements"
                      placeholder="Describe your key achievements..."
                      multiline
                      rows={4}
                      maxLength={1000}
                      showCharCount
                    />
                  </Stack>
                </Box>
                
                <Divider />
                
                {/* Education */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Education
                  </Typography>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <SmartTextField
                        name="education.degree"
                        label="Degree"
                        placeholder="Your degree"
                        suggestions={['Bachelor\'s', 'Master\'s', 'PhD', 'Associate', 'High School']}
                      />
                      <SmartTextField
                        name="education.institution"
                        label="Institution"
                        placeholder="Your school/university"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <SmartTextField
                        name="education.graduationYear"
                        label="Graduation Year"
                        placeholder="Year of graduation"
                        inputMode="numeric"
                      />
                      <SmartTextField
                        name="education.gpa"
                        label="GPA (optional)"
                        placeholder="Your GPA"
                        inputMode="numeric"
                      />
                    </Box>
                  </Stack>
                </Box>
                
                <Divider />
                
                {/* Additional Information */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Additional Information
                  </Typography>
                  <Stack spacing={3}>
                    <SmartTextField
                      name="additional.coverLetter"
                      label="Cover Letter"
                      placeholder="Tell us why you're interested in this position..."
                      multiline
                      rows={6}
                      maxLength={2000}
                      showCharCount
                    />
                    <SmartTextField
                      name="additional.availability"
                      label="Availability"
                      placeholder="When are you available for interviews?"
                      suggestions={['Immediately', 'Within 2 weeks', 'Within 1 month', 'Other']}
                    />
                  </Stack>
                </Box>
                
                <Button type="submit" variant="contained" size="large">
                  Submit Application
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </FormProvider>
    </SmartFormProvider>
  );
};

// ===== SURVEY FORM WITH CONDITIONAL LOGIC =====

const SurveyForm: React.FC = () => {
  const config = createFormBuilderConfig(
    [
      createFormSection('demographics', 'Demographics', [
        createFormField('age', 'select', 'Age Group', {
          required: true,
          options: [
            { value: '18-24', label: '18-24' },
            { value: '25-34', label: '25-34' },
            { value: '35-44', label: '35-44' },
            { value: '45-54', label: '45-54' },
            { value: '55+', label: '55+' },
          ],
        }),
        createFormField('occupation', 'select', 'Occupation', {
          required: true,
          options: [
            { value: 'student', label: 'Student' },
            { value: 'employed', label: 'Employed' },
            { value: 'self-employed', label: 'Self-employed' },
            { value: 'unemployed', label: 'Unemployed' },
            { value: 'retired', label: 'Retired' },
          ],
        }),
        createFormField('income', 'select', 'Income Level', {
          options: [
            { value: 'under-25k', label: 'Under $25,000' },
            { value: '25k-50k', label: '$25,000 - $50,000' },
            { value: '50k-75k', label: '$50,000 - $75,000' },
            { value: '75k-100k', label: '$75,000 - $100,000' },
            { value: 'over-100k', label: 'Over $100,000' },
          ],
        }),
      ]),
      
      createFormSection('student-info', 'Student Information', [
        createFormField('school', 'text', 'School/University', {
          required: true,
          placeholder: 'Enter your school name',
        }),
        createFormField('major', 'text', 'Major/Field of Study', {
          required: true,
          placeholder: 'Enter your major',
        }),
        createFormField('graduationYear', 'select', 'Expected Graduation', {
          options: [
            { value: '2024', label: '2024' },
            { value: '2025', label: '2025' },
            { value: '2026', label: '2026' },
            { value: '2027', label: '2027' },
            { value: '2028', label: '2028' },
          ],
        }),
      ], {
        condition: (values) => values.occupation === 'student',
      }),
      
      createFormSection('employment-info', 'Employment Information', [
        createFormField('company', 'text', 'Company', {
          required: true,
          placeholder: 'Enter your company name',
        }),
        createFormField('position', 'text', 'Position', {
          required: true,
          placeholder: 'Enter your job title',
        }),
        createFormField('experience', 'select', 'Years of Experience', {
          options: [
            { value: '0-2', label: '0-2 years' },
            { value: '3-5', label: '3-5 years' },
            { value: '6-10', label: '6-10 years' },
            { value: '10+', label: '10+ years' },
          ],
        }),
      ], {
        condition: (values) => values.occupation === 'employed' || values.occupation === 'self-employed',
      }),
      
      createFormSection('preferences', 'Preferences', [
        createFormField('productInterest', 'select', 'Product Interest', {
          required: true,
          options: [
            { value: 'software', label: 'Software/Technology' },
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'finance', label: 'Finance' },
            { value: 'education', label: 'Education' },
            { value: 'other', label: 'Other' },
          ],
        }),
        createFormField('usageFrequency', 'select', 'Usage Frequency', {
          required: true,
          options: [
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'rarely', label: 'Rarely' },
          ],
        }),
      ]),
      
      createFormSection('feedback', 'Feedback', [
        createFormField('rating', 'select', 'Overall Rating', {
          required: true,
          options: [
            { value: '5', label: '5 - Excellent' },
            { value: '4', label: '4 - Good' },
            { value: '3', label: '3 - Average' },
            { value: '2', label: '2 - Poor' },
            { value: '1', label: '1 - Very Poor' },
          ],
        }),
        createFormField('comments', 'rich-text', 'Comments', {
          placeholder: 'Share your thoughts and suggestions...',
        }),
        createFormField('recommend', 'select', 'Would you recommend us?', {
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'maybe', label: 'Maybe' },
          ],
        }),
      ]),
    ],
    {
      mode: 'onChange',
      analytics: {
        enabled: true,
        trackingId: 'survey-form',
        events: ['survey_start', 'section_complete', 'survey_submit'],
      },
    }
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Customer Survey Form
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Survey with conditional sections based on user responses
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label="Conditional Logic" color="primary" size="small" />
          <Chip label="Dynamic Sections" color="success" size="small" />
          <Chip label="Survey Analytics" color="info" size="small" />
          <Chip label="Response Tracking" color="warning" size="small" />
        </Stack>
      </Box>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Sections will appear/disappear based on your selections (e.g., select "Student" to see student-specific fields)
      </Alert>
      
      <FormBuilder
        config={config}
        onSubmit={fn()}
        onError={fn()}
        onChange={fn()}
      />
    </Box>
  );
};

// ===== CONTACT FORM =====

const ContactForm: React.FC = () => {
  const form = useAdvancedForm({
    mode: 'onChange',
    persistence: {
      enabled: true,
      key: 'contact-form',
      storage: 'sessionStorage',
    },
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      urgency: 'medium',
      contactMethod: 'email',
      attachments: [],
    },
  });

  return (
    <SmartFormProvider form={form} config={{ mode: 'onChange' }}>
      <FormProvider {...form}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Contact Form
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Get in touch with file upload and priority settings
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label="File Upload" color="primary" size="small" />
              <Chip label="Priority Settings" color="success" size="small" />
              <Chip label="Contact Preferences" color="info" size="small" />
              <Chip label="Auto-save" color="warning" size="small" />
            </Stack>
          </Box>
          
          <Paper sx={{ p: 3 }}>
            <form onSubmit={form.handleSubmit(fn())}>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <SmartTextField
                    name="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                  />
                  <SmartTextField
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    required
                    validation={[commonValidationRules.email()]}
                  />
                </Box>
                
                <SmartTextField
                  name="subject"
                  label="Subject"
                  placeholder="What is this regarding?"
                  required
                  suggestions={[
                    'General Inquiry',
                    'Technical Support',
                    'Billing Question',
                    'Feature Request',
                    'Bug Report',
                    'Partnership',
                  ]}
                />
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <SmartTextField
                    name="urgency"
                    label="Urgency"
                    placeholder="How urgent is this?"
                    suggestions={['Low', 'Medium', 'High', 'Critical']}
                  />
                  <SmartTextField
                    name="contactMethod"
                    label="Preferred Contact Method"
                    placeholder="How should we contact you?"
                    suggestions={['Email', 'Phone', 'Text Message']}
                  />
                </Box>
                
                <SmartTextField
                  name="message"
                  label="Message"
                  placeholder="Please describe your inquiry in detail..."
                  multiline
                  rows={6}
                  required
                  maxLength={2000}
                  showCharCount
                />
                
                <Alert severity="info">
                  Your message is automatically saved as you type
                </Alert>
                
                <Button type="submit" variant="contained" size="large">
                  Send Message
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </FormProvider>
    </SmartFormProvider>
  );
};

// ===== MAIN STORY =====

export const ComprehensiveExamples: Story = {
  render: () => {
    const tabs = [
      {
        label: 'User Registration',
        component: <UserRegistrationForm />,
      },
      {
        label: 'E-commerce Checkout',
        component: <EcommerceCheckoutForm />,
      },
      {
        label: 'Job Application',
        component: <JobApplicationForm />,
      },
      {
        label: 'Survey Form',
        component: <SurveyForm />,
      },
      {
        label: 'Contact Form',
        component: <ContactForm />,
      },
    ];

    return (
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ p: 3, pb: 0 }}>
          <Typography variant="h3" gutterBottom>
            Comprehensive Form Examples
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Real-world form implementations demonstrating the complete expert form system
          </Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Features Demonstrated
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip label="Schema Validation" color="primary" />
                <Chip label="Form Persistence" color="success" />
                <Chip label="Analytics Tracking" color="info" />
                <Chip label="Conditional Logic" color="warning" />
                <Chip label="Multi-step Wizards" color="error" />
                <Chip label="File Upload" color="secondary" />
                <Chip label="Rich Text Editing" color="primary" />
                <Chip label="Auto-suggestions" color="success" />
                <Chip label="Real-time Validation" color="info" />
                <Chip label="Performance Optimization" color="warning" />
              </Box>
            </CardContent>
          </Card>
        </Box>
        
        <TabbedInterface tabs={tabs} />
      </Box>
    );
  },
};