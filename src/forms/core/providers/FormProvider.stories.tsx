import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { Box } from '@/components/layout/Box';
import { Paper } from '@/components/surfaces/Paper';
import { Typography } from '@/components/data-display/Typography';
import { Stack } from '@/components/layout/Stack';
import { Alert } from '@/components/feedback/Alert';
import { Button } from '@/components/core/Button';
import { Card, CardContent } from '@/components/data-display/Card';
import { LinearProgress } from '@/components/feedback/Progress';
import { 
  Chip, 
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';

import { SmartTextField } from '@/forms/components/fields/SmartTextField';
import { useAdvancedForm } from '@/forms/core/hooks/useAdvancedForm';
import { commonValidationRules } from '@/forms/validation/ValidationEngine';

import { SmartFormProvider, useFormContext } from './FormProvider';

/**
 * SmartFormProvider is the enhanced context provider for the expert form system.
 * It provides advanced features like real-time collaboration, offline persistence,
 * analytics tracking, and performance optimization.
 * 
 * ## Key Features
 * - Enhanced form context with advanced capabilities
 * - Real-time collaboration support
 * - Offline persistence with sync queuing
 * - Performance metrics tracking
 * - Analytics integration
 * - Accessibility announcements
 * - Internationalization support
 * - Security features (sanitization, encryption)
 */
const meta: Meta<typeof SmartFormProvider> = {
  title: 'Forms/SmartFormProvider',
  component: SmartFormProvider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Enhanced form provider with advanced features for modern applications.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== FORM CONTEXT DISPLAY COMPONENT =====

const FormContextDisplay: React.FC = () => {
  const {
    form,
    metrics,
    isOnline,
    syncStatus,
    collaborators,
    saveForm,
    loadForm,
    clearForm,
    trackEvent,
    announceToScreenReader,
    t,
  } = useFormContext();

  const [autoSave, setAutoSave] = useState(false);

  React.useEffect(() => {
    if (autoSave) {
      const interval = setInterval(() => {
        saveForm();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoSave, saveForm]);

  const handleTrackEvent = () => {
    trackEvent('custom_event', {
      action: 'button_click',
      component: 'FormContextDisplay',
      timestamp: Date.now(),
    });
    announceToScreenReader('Custom event tracked successfully');
  };

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Form Metrics
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Render Count
              </Typography>
              <Typography variant="h4">{metrics.renderCount}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Field Updates
              </Typography>
              <Typography variant="h4">{metrics.fieldUpdates}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Validation Time
              </Typography>
              <Typography variant="h4">{metrics.validationTime}ms</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Last Update
              </Typography>
              <Typography variant="body2">
                {new Date(metrics.lastUpdate).toLocaleTimeString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Connection Status
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={isOnline ? 'Online' : 'Offline'}
              color={isOnline ? 'success' : 'error'}
            />
            <Chip
              label={syncStatus}
              color={
                syncStatus === 'syncing' ? 'warning' : 
                syncStatus === 'success' ? 'success' : 
                syncStatus === 'error' ? 'error' : 'default'
              }
            />
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Collaborators ({collaborators.length})
          </Typography>
          <Stack spacing={1}>
            {collaborators.map((collaborator) => (
              <Box key={collaborator.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  label={collaborator.name}
                  color={collaborator.status === 'active' ? 'success' : 'default'}
                  size="small"
                />
                <Typography variant="caption" color="text.secondary">
                  {collaborator.status}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Form Actions
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button onClick={() => saveForm()} variant="outlined" size="small">
              Save Form
            </Button>
            <Button onClick={() => loadForm()} variant="outlined" size="small">
              Load Form
            </Button>
            <Button onClick={() => clearForm()} variant="outlined" size="small" color="error">
              Clear Form
            </Button>
            <Button onClick={handleTrackEvent} variant="outlined" size="small">
              Track Event
            </Button>
          </Stack>
          
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                />
              }
              label="Auto-save every 5 seconds"
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

// ===== BASIC STORIES =====

export const BasicProvider: Story = {
  render: () => {
    const form = useAdvancedForm({
      mode: 'onChange',
      defaultValues: {
        name: '',
        email: '',
        message: '',
      },
    });

    return (
      <SmartFormProvider
        form={form}
        config={{
          mode: 'onChange',
          performance: { debounceMs: 300 },
        }}
        onSubmit={fn()}
      >
        <FormProvider {...form}>
          <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              Basic Form with Smart Provider
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <form onSubmit={form.handleSubmit(fn())}>
                  <Stack spacing={3}>
                    <SmartTextField
                      name="name"
                      label="Name"
                      placeholder="Enter your name"
                      required
                    />
                    
                    <SmartTextField
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                      required
                      validation={[commonValidationRules.email()]}
                    />
                    
                    <SmartTextField
                      name="message"
                      label="Message"
                      placeholder="Enter your message"
                      multiline
                      rows={4}
                      maxLength={500}
                      showCharCount
                    />
                    
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Stack>
                </form>
              </Box>
              
              <Box sx={{ width: 350 }}>
                <FormContextDisplay />
              </Box>
            </Box>
          </Paper>
        </FormProvider>
      </SmartFormProvider>
    );
  },
};

// ===== PERSISTENCE STORIES =====

export const WithPersistence: Story = {
  render: () => {
    const form = useAdvancedForm({
      mode: 'onChange',
      persistence: {
        enabled: true,
        key: 'storybook-form',
        storage: 'localStorage',
      },
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        preferences: '',
      },
    });

    return (
      <SmartFormProvider
        form={form}
        config={{
          mode: 'onChange',
          persistence: {
            enabled: true,
            key: 'storybook-form',
            storage: 'localStorage',
          },
          performance: { debounceMs: 300 },
        }}
        onSubmit={fn()}
      >
        <FormProvider {...form}>
          <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              Form with Persistence
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Form data is automatically saved to localStorage. Try refreshing the page!
            </Alert>
            
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <form onSubmit={form.handleSubmit(fn())}>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <SmartTextField
                        name="firstName"
                        label="First Name"
                        placeholder="Enter your first name"
                        required
                      />
                      <SmartTextField
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter your last name"
                        required
                      />
                    </Box>
                    
                    <SmartTextField
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                      required
                      validation={[commonValidationRules.email()]}
                    />
                    
                    <SmartTextField
                      name="preferences"
                      label="Preferences"
                      placeholder="Tell us your preferences..."
                      multiline
                      rows={4}
                    />
                    
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Stack>
                </form>
              </Box>
              
              <Box sx={{ width: 350 }}>
                <FormContextDisplay />
              </Box>
            </Box>
          </Paper>
        </FormProvider>
      </SmartFormProvider>
    );
  },
};

// ===== ANALYTICS STORIES =====

export const WithAnalytics: Story = {
  render: () => {
    const form = useAdvancedForm({
      mode: 'onChange',
      analytics: {
        enabled: true,
        trackingId: 'storybook-form-analytics',
        events: ['field_change', 'form_submit', 'validation_error'],
      },
      defaultValues: {
        productName: '',
        category: '',
        description: '',
        price: '',
      },
    });

    return (
      <SmartFormProvider
        form={form}
        config={{
          mode: 'onChange',
          analytics: {
            enabled: true,
            trackingId: 'storybook-form-analytics',
            events: ['field_change', 'form_submit', 'validation_error'],
          },
          performance: { debounceMs: 300 },
        }}
        onSubmit={fn()}
      >
        <FormProvider {...form}>
          <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              Form with Analytics
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Form interactions are being tracked. Check the console for analytics events!
            </Alert>
            
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <form onSubmit={form.handleSubmit(fn())}>
                  <Stack spacing={3}>
                    <SmartTextField
                      name="productName"
                      label="Product Name"
                      placeholder="Enter product name"
                      required
                    />
                    
                    <SmartTextField
                      name="category"
                      label="Category"
                      placeholder="Enter category"
                      suggestions={['Electronics', 'Clothing', 'Books', 'Home & Garden']}
                    />
                    
                    <SmartTextField
                      name="description"
                      label="Description"
                      placeholder="Describe your product..."
                      multiline
                      rows={4}
                      maxLength={1000}
                      showCharCount
                    />
                    
                    <SmartTextField
                      name="price"
                      label="Price"
                      placeholder="Enter price"
                      inputMode="numeric"
                      validation={[
                        commonValidationRules.custom(
                          (value: string) => !isNaN(parseFloat(value)) && parseFloat(value) > 0,
                          'Price must be a positive number'
                        ),
                      ]}
                    />
                    
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Stack>
                </form>
              </Box>
              
              <Box sx={{ width: 350 }}>
                <FormContextDisplay />
              </Box>
            </Box>
          </Paper>
        </FormProvider>
      </SmartFormProvider>
    );
  },
};

// ===== COLLABORATION STORIES =====

export const WithCollaboration: Story = {
  render: () => {
    const form = useAdvancedForm({
      mode: 'onChange',
      defaultValues: {
        title: '',
        content: '',
        tags: '',
        status: '',
      },
    });

    const [collaborationEnabled, setCollaborationEnabled] = useState(false);

    const handleStartCollaboration = () => {
      const { startCollaboration } = useFormContext();
      startCollaboration({
        enabled: true,
        websocketUrl: 'ws://localhost:8080',
        userId: 'user-123',
        roomId: 'storybook-room',
      });
      setCollaborationEnabled(true);
    };

    return (
      <SmartFormProvider
        form={form}
        config={{
          mode: 'onChange',
          performance: { debounceMs: 300 },
        }}
        onSubmit={fn()}
      >
        <FormProvider {...form}>
          <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              Form with Collaboration
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Collaboration features are simulated. In a real app, this would connect to a WebSocket server.
            </Alert>
            
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <form onSubmit={form.handleSubmit(fn())}>
                  <Stack spacing={3}>
                    <SmartTextField
                      name="title"
                      label="Document Title"
                      placeholder="Enter document title"
                      required
                    />
                    
                    <SmartTextField
                      name="content"
                      label="Content"
                      placeholder="Start writing your document..."
                      multiline
                      rows={6}
                    />
                    
                    <SmartTextField
                      name="tags"
                      label="Tags"
                      placeholder="Add tags (comma separated)"
                      suggestions={['urgent', 'draft', 'review', 'final']}
                    />
                    
                    <SmartTextField
                      name="status"
                      label="Status"
                      placeholder="Document status"
                      suggestions={['Draft', 'In Review', 'Approved', 'Published']}
                    />
                    
                    <Button type="submit" variant="contained">
                      Save Document
                    </Button>
                  </Stack>
                </form>
              </Box>
              
              <Box sx={{ width: 350 }}>
                <FormContextDisplay />
              </Box>
            </Box>
          </Paper>
        </FormProvider>
      </SmartFormProvider>
    );
  },
};

// ===== PERFORMANCE MONITORING STORIES =====

export const PerformanceMonitoring: Story = {
  render: () => {
    const form = useAdvancedForm({
      mode: 'onChange',
      performance: {
        debounceMs: 300,
        enabledWatching: true,
        optimizeRerenders: true,
      },
      defaultValues: {
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
      },
    });

    return (
      <SmartFormProvider
        form={form}
        config={{
          mode: 'onChange',
          performance: {
            debounceMs: 300,
            enabledWatching: true,
            optimizeRerenders: true,
          },
          analytics: {
            enabled: true,
            trackingId: 'performance-demo',
            events: ['field_change', 'render_metric', 'validation_time'],
          },
        }}
        onSubmit={fn()}
      >
        <FormProvider {...form}>
          <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              Performance Monitoring
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Watch the metrics update as you interact with the form. Performance optimizations are enabled.
            </Alert>
            
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <form onSubmit={form.handleSubmit(fn())}>
                  <Stack spacing={3}>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SmartTextField
                        key={num}
                        name={`field${num}`}
                        label={`Field ${num}`}
                        placeholder={`Enter data for field ${num}`}
                        validation={[
                          commonValidationRules.custom(
                            async (value: string) => {
                              // Simulate validation delay
                              await new Promise(resolve => setTimeout(resolve, 100));
                              return value.length > 0;
                            },
                            'Field cannot be empty',
                            true
                          ),
                        ]}
                        debounceMs={300}
                      />
                    ))}
                    
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Stack>
                </form>
              </Box>
              
              <Box sx={{ width: 350 }}>
                <FormContextDisplay />
              </Box>
            </Box>
          </Paper>
        </FormProvider>
      </SmartFormProvider>
    );
  },
};

// ===== THEME CUSTOMIZATION STORIES =====

export const CustomTheme: Story = {
  render: () => {
    const form = useAdvancedForm({
      mode: 'onChange',
      defaultValues: {
        username: '',
        bio: '',
        website: '',
      },
    });

    const customTheme = {
      name: 'custom-dark',
      colors: {
        primary: '#bb86fc',
        secondary: '#03dac6',
        error: '#cf6679',
        warning: '#ffb74d',
        info: '#81d4fa',
        success: '#a5d6a7',
        text: '#ffffff',
        background: '#121212',
        surface: '#1e1e1e',
      },
      typography: {
        fontFamily: '"Roboto Mono", monospace',
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

    return (
      <SmartFormProvider
        form={form}
        config={{
          mode: 'onChange',
          performance: { debounceMs: 300 },
        }}
        theme={customTheme}
        onSubmit={fn()}
      >
        <FormProvider {...form}>
          <Paper 
            sx={{ 
              p: 3, 
              maxWidth: 800, 
              mx: 'auto',
              backgroundColor: customTheme.colors.surface,
              color: customTheme.colors.text,
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: customTheme.colors.primary }}>
              Custom Theme Example
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              This form uses a custom dark theme with custom colors and typography.
            </Alert>
            
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <form onSubmit={form.handleSubmit(fn())}>
                  <Stack spacing={3}>
                    <SmartTextField
                      name="username"
                      label="Username"
                      placeholder="Enter your username"
                      required
                    />
                    
                    <SmartTextField
                      name="bio"
                      label="Bio"
                      placeholder="Tell us about yourself..."
                      multiline
                      rows={4}
                      maxLength={200}
                      showCharCount
                    />
                    
                    <SmartTextField
                      name="website"
                      label="Website"
                      placeholder="https://example.com"
                      validation={[commonValidationRules.url()]}
                    />
                    
                    <Button 
                      type="submit" 
                      variant="contained"
                      sx={{ 
                        backgroundColor: customTheme.colors.primary,
                        color: customTheme.colors.background,
                      }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </form>
              </Box>
              
              <Box sx={{ width: 350 }}>
                <FormContextDisplay />
              </Box>
            </Box>
          </Paper>
        </FormProvider>
      </SmartFormProvider>
    );
  },
};

// ===== COMPREHENSIVE EXAMPLE =====

export const ComprehensiveExample: Story = {
  render: () => {
    const schema = z.object({
      email: z.string().email('Invalid email format'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: z.string(),
      profile: z.object({
        firstName: z.string().min(2, 'First name must be at least 2 characters'),
        lastName: z.string().min(2, 'Last name must be at least 2 characters'),
        bio: z.string().max(500, 'Bio must be less than 500 characters'),
      }),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

    const form = useAdvancedForm({
      mode: 'onChange',
      schema,
      persistence: {
        enabled: true,
        key: 'comprehensive-form',
        storage: 'localStorage',
      },
      analytics: {
        enabled: true,
        trackingId: 'comprehensive-demo',
        events: ['field_change', 'form_submit', 'validation_error'],
      },
      performance: {
        debounceMs: 300,
        optimizeRerenders: true,
      },
      defaultValues: {
        email: '',
        password: '',
        confirmPassword: '',
        profile: {
          firstName: '',
          lastName: '',
          bio: '',
        },
      },
    });

    return (
      <SmartFormProvider
        form={form}
        config={{
          mode: 'onChange',
          schema,
          persistence: {
            enabled: true,
            key: 'comprehensive-form',
            storage: 'localStorage',
          },
          analytics: {
            enabled: true,
            trackingId: 'comprehensive-demo',
            events: ['field_change', 'form_submit', 'validation_error'],
          },
          performance: {
            debounceMs: 300,
            optimizeRerenders: true,
          },
        }}
        onSubmit={fn()}
      >
        <FormProvider {...form}>
          <Paper sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
              Comprehensive Form Example
            </Typography>
            
            <Typography variant="body1" color="text.secondary" gutterBottom>
              This example demonstrates all SmartFormProvider features:
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="Schema Validation" color="primary" />
                <Chip label="Persistence" color="success" />
                <Chip label="Analytics" color="info" />
                <Chip label="Performance" color="warning" />
                <Chip label="Context Features" color="secondary" />
              </Stack>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <form onSubmit={form.handleSubmit(fn())}>
                  <Stack spacing={3}>
                    <Typography variant="h6">Account Information</Typography>
                    
                    <SmartTextField
                      name="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      required
                      inputMode="email"
                    />
                    
                    <SmartTextField
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                    
                    <SmartTextField
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm your password"
                      required
                    />
                    
                    <Divider />
                    
                    <Typography variant="h6">Profile Information</Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <SmartTextField
                        name="profile.firstName"
                        label="First Name"
                        placeholder="Enter your first name"
                        required
                      />
                      <SmartTextField
                        name="profile.lastName"
                        label="Last Name"
                        placeholder="Enter your last name"
                        required
                      />
                    </Box>
                    
                    <SmartTextField
                      name="profile.bio"
                      label="Bio"
                      placeholder="Tell us about yourself..."
                      multiline
                      rows={4}
                      maxLength={500}
                      showCharCount
                    />
                    
                    <Button type="submit" variant="contained" size="large">
                      Create Account
                    </Button>
                  </Stack>
                </form>
              </Box>
              
              <Box sx={{ width: 350 }}>
                <FormContextDisplay />
              </Box>
            </Box>
          </Paper>
        </FormProvider>
      </SmartFormProvider>
    );
  },
};