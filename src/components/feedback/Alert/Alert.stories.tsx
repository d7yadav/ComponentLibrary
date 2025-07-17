import { CheckCircle, Warning, Error, Info, Settings } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, {  useState  } from 'react';

import { Button } from '@/components/core/Button';
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

import { Alert } from './Alert';

/**
 * Alert provides contextual feedback messages for user actions with multiple severity levels.
 * It supports various styling options, actions, and auto-hide functionality.
 * 
 * ## Features
 * - Multiple severity levels (success, info, warning, error)
 * - Three visual variants (standard, outlined, filled)
 * - Custom actions and close functionality
 * - Auto-hide with configurable duration
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Animation support
 * - Dark theme compatibility
 */
const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Alert component for displaying contextual feedback messages with various severity levels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: 'The severity level of the alert',
    },
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
      description: 'The visual variant of the alert',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the alert',
    },
    title: {
      control: 'text',
      description: 'Optional title for the alert',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the alert can be closed',
    },
    elevated: {
      control: 'boolean',
      description: 'Whether the alert has elevation shadow',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the alert has rounded corners',
    },
    autoHide: {
      control: 'boolean',
      description: 'Whether the alert auto-hides after a duration',
    },
    autoHideDuration: {
      control: 'number',
      description: 'Duration in milliseconds before auto-hide',
    },
    animated: {
      control: 'boolean',
      description: 'Whether the alert has enter/exit animations',
    },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    severity: 'info',
    children: 'This is an informational alert message.',
  
    onClick: fn(),
    onClose: fn(),
  },
};

// ===== SEVERITY LEVELS =====
export const SeverityLevels: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={2}>
      <Alert severity="success" title="Success">
        Your changes have been saved successfully!
      </Alert>
      
      <Alert severity="info" title="Information">
        Here's some helpful information for you to review.
      </Alert>
      
      <Alert severity="warning" title="Warning">
        Please review the following before proceeding.
      </Alert>
      
      <Alert severity="error" title="Error">
        There was an error processing your request.
      </Alert>
    </Stack>
  ),
};

// ===== VISUAL VARIANTS =====
export const VisualVariants: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>Standard Variant</Typography>
        <Stack data-testid="alert.stories" spacing={2}>
          <Alert severity="success" variant="standard">Success message with standard styling</Alert>
          <Alert severity="info" variant="standard">Info message with standard styling</Alert>
          <Alert severity="warning" variant="standard">Warning message with standard styling</Alert>
          <Alert severity="error" variant="standard">Error message with standard styling</Alert>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Outlined Variant</Typography>
        <Stack data-testid="alert.stories" spacing={2}>
          <Alert severity="success" variant="outlined">Success message with outlined styling</Alert>
          <Alert severity="info" variant="outlined">Info message with outlined styling</Alert>
          <Alert severity="warning" variant="outlined">Warning message with outlined styling</Alert>
          <Alert severity="error" variant="outlined">Error message with outlined styling</Alert>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Filled Variant</Typography>
        <Stack data-testid="alert.stories" spacing={2}>
          <Alert severity="success" variant="filled">Success message with filled styling</Alert>
          <Alert severity="info" variant="filled">Info message with filled styling</Alert>
          <Alert severity="warning" variant="filled">Warning message with filled styling</Alert>
          <Alert severity="error" variant="filled">Error message with filled styling</Alert>
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== SIZE VARIANTS =====
export const SizeVariants: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={2}>
      <Alert severity="info" size="small" title="Small Alert">
        This is a small alert suitable for compact layouts
      </Alert>
      
      <Alert severity="warning" size="medium" title="Medium Alert">
        This is a medium alert with comfortable spacing and readability
      </Alert>
      
      <Alert severity="success" size="large" title="Large Alert">
        This is a large alert that draws attention and provides ample space for content
      </Alert>
    </Stack>
  ),
};

// ===== WITH ACTIONS =====
export const WithActions: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={2}>
      <Alert 
        severity="warning" 
        title="Unsaved Changes"
        actions={[
          { label: 'Save', onClick: fn() },
          { label: 'Discard', onClick: fn() }
        ]}
      >
        You have unsaved changes. Would you like to save before leaving?
      </Alert>
      
      <Alert 
        severity="error" 
        title="Connection Failed"
        actions={[
          { label: 'Retry', onClick: fn() },
          { label: 'Settings', onClick: fn() }
        ]}
        closable
      >
        Unable to connect to the server. Please check your connection.
      </Alert>
      
      <Alert 
        severity="success" 
        title="Upload Complete"
        actions={[
          { label: 'View File', onClick: fn() },
          { label: 'Share', onClick: fn() },
          { label: 'Download', onClick: fn() }
        ]}
      >
        Your file has been uploaded successfully.
      </Alert>
      
      <Alert 
        severity="info" 
        title="New Features Available"
        actions={[
          { label: 'Learn More', onClick: fn() },
          { label: 'Tour', onClick: fn() }
        ]}
        closable
      >
        We've added new features to improve your experience.
      </Alert>
    </Stack>
  ),
};

// ===== CLOSABLE ALERTS =====
export const ClosableAlerts: Story = {
  render: (args) => {
    const [alerts, setAlerts] = useState({
      alert1: true,
      alert2: true,
      alert3: true,
      alert4: true,
    });

    const handleClose = (alertId: keyof typeof alerts) => {
      setAlerts(prev => ({ ...prev, [alertId]: false }));
    };

    const resetAlerts = () => {
      setAlerts({
        alert1: true,
        alert2: true,
        alert3: true,
        alert4: true,
      });
    };

    return (
      <Stack data-testid="alert.stories" spacing={2}>
        <Button onClick={resetAlerts} variant="outlined" size="small">
          Reset All Alerts
        </Button>
        
        {alerts.alert1 && (
          <Alert 
            severity="success" 
            closable
            onClose={() => handleClose('alert1')}
          >
            This alert can be manually closed by clicking the X button.
          </Alert>
        )}
        
        {alerts.alert2 && (
          <Alert 
            severity="info" 
            title="Dismissible Info"
            closable
            onClose={() => handleClose('alert2')}
          >
            Click the close button to dismiss this informational alert.
          </Alert>
        )}
        
        {alerts.alert3 && (
          <Alert 
            severity="warning" 
            variant="outlined"
            closable
            onClose={() => handleClose('alert3')}
            actions={[
              { label: 'Action', onClick: fn() }
            ]}
          >
            This alert has both actions and a close button.
          </Alert>
        )}
        
        {alerts.alert4 && (
          <Alert 
            severity="error" 
            variant="filled"
            title="Critical Error"
            closable
            onClose={() => handleClose('alert4')}
          >
            This is a critical error that can be dismissed after reading.
          </Alert>
        )}
      </Stack>
    );
  },
};

// ===== AUTO-HIDE ALERTS =====
export const AutoHideAlerts: Story = {
  render: (args) => {
    const [showAlert, setShowAlert] = useState(false);
    const [showPersistent, setShowPersistent] = useState(false);

    const triggerAlert = () => {
      setShowAlert(true);
    };

    const triggerPersistent = () => {
      setShowPersistent(true);
    };

    return (
      <Stack data-testid="alert.stories" spacing={2}>
        <Box>
          <Button onClick={triggerAlert} variant="contained" sx={{ mr: 2 }}>
            Show Auto-Hide Alert (3s)
          </Button>
          <Button onClick={triggerPersistent} variant="outlined">
            Show Persistent Alert (10s)
          </Button>
        </Box>
        
        {showAlert && (
          <Alert 
            severity="success" 
            title="Success!"
            autoHide
            autoHideDuration={3000}
            onClose={() => setShowAlert(false)}
            animated
          >
            This alert will automatically disappear in 3 seconds.
          </Alert>
        )}
        
        {showPersistent && (
          <Alert 
            severity="info" 
            title="Persistent Alert"
            autoHide
            autoHideDuration={10000}
            onClose={() => setShowPersistent(false)}
            closable
            animated
          >
            This alert will auto-hide in 10 seconds, but you can close it manually.
          </Alert>
        )}
      </Stack>
    );
  },
};

// ===== STYLING OPTIONS =====
export const StylingOptions: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={2}>
      <Alert severity="info" elevated>
        Alert with elevation shadow for enhanced visual hierarchy
      </Alert>
      
      <Alert severity="warning" rounded>
        Alert with rounded corners for a softer appearance
      </Alert>
      
      <Alert severity="success" elevated rounded size="large" title="Premium Style">
        Alert combining elevation, rounded corners, and large size
      </Alert>
      
      <Alert 
        severity="error" 
        variant="outlined"
        elevated
        rounded
        title="Custom Styled Alert"
        closable
        actions={[
          { label: 'Fix Now', onClick: fn() }
        ]}
      >
        Alert showcasing multiple styling options working together
      </Alert>
    </Stack>
  ),
};

// ===== CUSTOM ICONS =====
export const CustomIcons: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={2}>
      <Alert 
        severity="success" 
        icon={<CheckCircle />}
        title="Custom Success Icon"
      >
        Alert using a custom success icon instead of the default
      </Alert>
      
      <Alert 
        severity="warning" 
        icon={<Warning />}
        title="Custom Warning Icon"
      >
        Alert with a custom warning icon for better context
      </Alert>
      
      <Alert 
        severity="error" 
        icon={<Error />}
        title="Custom Error Icon"
      >
        Alert featuring a custom error icon for clear communication
      </Alert>
      
      <Alert 
        severity="info" 
        icon={<Settings />}
        title="Settings Required"
      >
        Alert using a non-standard icon to convey specific meaning
      </Alert>
      
      <Alert 
        severity="info" 
        icon={false}
        title="No Icon Alert"
      >
        Alert without any icon for minimal, text-focused design
      </Alert>
    </Stack>
  ),
};

// ===== CONTENT VARIATIONS =====
export const ContentVariations: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={2}>
      <Alert severity="info">
        Simple alert with just text content and no title
      </Alert>
      
      <Alert severity="warning" title="Title Only">
      </Alert>
      
      <Alert severity="success" title="Rich Content Alert">
        <Typography variant="body2" paragraph>
          This alert contains rich content including multiple paragraphs, 
          <strong> bold text</strong>, and <em>emphasized text</em>.
        </Typography>
        <Typography variant="body2">
          You can include any React components within alert content.
        </Typography>
      </Alert>
      
      <Alert severity="error" title="List Content">
        <Typography variant="body2" gutterBottom>
          The following errors were found:
        </Typography>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>Password must be at least 8 characters</li>
          <li>Email format is invalid</li>
          <li>Username is already taken</li>
        </ul>
      </Alert>
      
      <Alert severity="info" title="Long Content Alert">
        <Typography variant="body2">
          This is an example of an alert with longer content to demonstrate 
          how the component handles text wrapping and maintains proper spacing. 
          The alert should maintain good readability even with extended content 
          that spans multiple lines and provides detailed information to the user 
          about the current situation or required actions.
        </Typography>
      </Alert>
    </Stack>
  ),
};

// ===== ACCESSIBILITY FEATURES =====
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={2}>
      <Alert 
        severity="success" 
        title="Screen Reader Friendly"
        role="alert"
        aria-label="Success notification"
      >
        This alert includes proper ARIA attributes for screen reader support.
      </Alert>
      
      <Alert 
        severity="warning" 
        title="Keyboard Navigation"
        closable
        onClose={fn()}
        actions={[
          { label: 'Accept', onClick: fn() },
          { label: 'Decline', onClick: fn() }
        ]}
      >
        Use Tab to navigate between actions and Escape to close (when closable).
      </Alert>
      
      <Alert 
        severity="info" 
        title="High Contrast Support"
        variant="outlined"
      >
        Alert variants maintain accessibility in high contrast mode.
      </Alert>
      
      <Alert 
        severity="error" 
        title="Focus Management"
        autoFocus
        closable
        onClose={fn()}
      >
        This alert receives focus when displayed for immediate attention.
      </Alert>
    </Stack>
  ),
};

// ===== INTERACTIVE EXAMPLES =====
export const InteractiveExamples: Story = {
  render: (args) => {
    const [notifications, setNotifications] = useState<Array<{
      id: number;
      severity: 'success' | 'info' | 'warning' | 'error';
      title: string;
      message: string;
    }>>([]);

    const addNotification = (severity: 'success' | 'info' | 'warning' | 'error') => {
      const messages = {
        success: { title: 'Success!', message: 'Operation completed successfully.' },
        info: { title: 'Information', message: 'Here is some useful information.' },
        warning: { title: 'Warning', message: 'Please review this important notice.' },
        error: { title: 'Error', message: 'Something went wrong. Please try again.' },
      };

      const newNotification = {
        id: Date.now(),
        severity,
        ...messages[severity],
      };

      setNotifications(prev => [...prev, newNotification]);
    };

    const removeNotification = (id: number) => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    return (
      <Stack data-testid="alert.stories" spacing={2}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Interactive Alert System
          </Typography>
          <Stack data-testid="alert.stories" direction="row" spacing={1} sx={{ mb: 2 }}>
            <Button size="small" onClick={() => addNotification('success')}>
              Add Success
            </Button>
            <Button size="small" onClick={() => addNotification('info')}>
              Add Info
            </Button>
            <Button size="small" onClick={() => addNotification('warning')}>
              Add Warning
            </Button>
            <Button size="small" onClick={() => addNotification('error')}>
              Add Error
            </Button>
          </Stack>
        </Box>
        
        <Stack data-testid="alert.stories" spacing={1}>
          {notifications.map((notification) => (
            <Alert
              key={notification.id}
              severity={notification.severity}
              title={notification.title}
              closable
              animated
              onClose={() => removeNotification(notification.id)}
              autoHide
              autoHideDuration={5000}
            >
              {notification.message}
            </Alert>
          ))}
          
          {notifications.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
              Click the buttons above to add interactive alerts
            </Typography>
          )}
        </Stack>
      </Stack>
    );
  },
};

// ===== THEME INTEGRATION =====
export const ThemeIntegration: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>Light Theme</Typography>
        <Stack data-testid="alert.stories" spacing={2}>
          <Alert severity="success" variant="standard">Light theme standard alert</Alert>
          <Alert severity="info" variant="outlined">Light theme outlined alert</Alert>
          <Alert severity="warning" variant="filled">Light theme filled alert</Alert>
        </Stack>
      </Box>
      
      <Box sx={{ p: 3, bgcolor: 'grey.900', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
          Dark Theme Simulation
        </Typography>
        <Stack data-testid="alert.stories" spacing={2}>
          <Alert severity="success" variant="standard">Dark theme standard alert</Alert>
          <Alert severity="info" variant="outlined">Dark theme outlined alert</Alert>
          <Alert severity="warning" variant="filled">Dark theme filled alert</Alert>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#121212' },
      ],
    },
  },
};

// ===== MISSING MANDATORY CATEGORIES =====

// ===== THEMES =====
export const Themes: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={3}>
      <Typography variant="h6" gutterBottom>Alerts in Different Themes</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Light Theme Alerts</Typography>
        <Stack data-testid="alert.stories" spacing={2}>
          <Alert 
            severity="success" 
            variant="standard"
            title="Light Theme Success"
          >
            Success alert optimized for light backgrounds with proper contrast and visibility.
          </Alert>
          <Alert 
            severity="info" 
            variant="outlined"
            title="Light Theme Information"
          >
            Information alert with outlined styling that works well against light backgrounds.
          </Alert>
          <Alert 
            severity="warning" 
            variant="filled"
            title="Light Theme Warning"
          >
            Warning alert with filled styling that maintains readability in light theme.
          </Alert>
          <Alert 
            severity="error" 
            variant="standard"
            title="Light Theme Error"
            closable
            onClose={fn()}
          >
            Error alert with close functionality styled for light theme environments.
          </Alert>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Dark Theme Alerts</Typography>
        <Stack data-testid="alert.stories" spacing={2}>
          <Alert 
            severity="success" 
            variant="standard"
            title="Dark Theme Success"
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              border: '1px solid',
              borderColor: 'divider',
              '& .MuiAlert-icon': {
                color: 'success.main',
              }
            }}
          >
            Success alert adapted for dark backgrounds with enhanced contrast and visibility.
          </Alert>
          <Alert 
            severity="info" 
            variant="outlined"
            title="Dark Theme Information"
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderColor: 'info.main',
              '& .MuiAlert-icon': {
                color: 'info.main',
              }
            }}
          >
            Information alert with dark-theme optimized borders and icon colors.
          </Alert>
          <Alert 
            severity="warning" 
            variant="filled"
            title="Dark Theme Warning"
            sx={{
              bgcolor: 'warning.dark',
              color: 'warning.contrastText',
              '& .MuiAlert-icon': {
                color: 'warning.contrastText',
              }
            }}
          >
            Warning alert using dark variant colors for optimal dark theme visibility.
          </Alert>
          <Alert 
            severity="error" 
            variant="standard"
            title="Dark Theme Error"
            closable
            onClose={fn()}
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              border: '1px solid',
              borderColor: 'error.main',
              '& .MuiAlert-icon': {
                color: 'error.main',
              },
              '& .MuiAlert-action': {
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }
            }}
          >
            Error alert with theme-aware close button and enhanced dark theme styling.
          </Alert>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Theme-Aware Interactive Alerts</Typography>
        <Stack data-testid="alert.stories" spacing={2}>
          <Alert 
            severity="info"
            variant="outlined"
            title="Theme-Responsive Alert"
            action={
              <Button 
                size="small" 
                variant="text"
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
                onClick={fn()}
              >
                Action
              </Button>
            }
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderColor: 'primary.main',
              '& .MuiAlert-icon': {
                color: 'primary.main',
              }
            }}
          >
            Alert with theme-aware action buttons that adapt to both light and dark themes.
          </Alert>
          
          <Alert 
            severity="warning"
            variant="standard"
            title="Auto-Hide Theme Alert"
            autoHide
            autoHideDuration={5000}
            animated
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              border: '1px solid',
              borderColor: 'warning.main',
              '& .MuiAlert-icon': {
                color: 'warning.main',
              }
            }}
          >
            Auto-hiding alert with smooth animations that work across theme variations.
          </Alert>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates Alert components in both light and dark themes with proper contrast, theme-aware styling, and accessibility.',
      },
    },
  },
};

// ===== VARIANTS =====
export const Variants: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={3}>
      <Typography variant="h6" gutterBottom>Alert Variants</Typography>
      
      <Alert severity="success" variant="standard">
        <strong>Standard variant</strong> - Default alert appearance with subtle background
      </Alert>
      
      <Alert severity="info" variant="outlined">
        <strong>Outlined variant</strong> - Alert with border and transparent background
      </Alert>
      
      <Alert severity="warning" variant="filled">
        <strong>Filled variant</strong> - Alert with solid background and high contrast
      </Alert>
      
      <Alert severity="error" variant="standard" title="Error Title">
        <strong>With Title</strong> - Alert can include an optional title for better organization
      </Alert>
    </Stack>
  ),
};

// ===== STATES =====
export const States: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={3}>
      {/* Normal State */}
      <Box>
        <Typography variant="h6" gutterBottom>Normal State</Typography>
        <Alert severity="info">
          <strong>Information Alert</strong> - Alert in normal state with full functionality, proper contrast, and accessibility support.
        </Alert>
      </Box>
      
      {/* Hover State */}
      <Box>
        <Typography variant="h6" gutterBottom>Hover State</Typography>
        <Alert 
          severity="success"
          sx={{
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: (theme) => theme.shadows[6],
              '& .MuiAlert-icon': {
                transform: 'scale(1.1)',
              }
            }
          }}
          onClick={fn()}
        >
          <strong>Interactive Success Alert</strong> - Hover over this alert to see elevation and icon scaling effects with smooth transitions.
        </Alert>
      </Box>
      
      {/* Focus State */}
      <Box>
        <Typography variant="h6" gutterBottom>Focus State</Typography>
        <Alert 
          severity="warning"
          tabIndex={0}
          sx={{
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '2px',
              boxShadow: (theme) => theme.shadows[4],
            }
          }}
          onClick={fn()}
        >
          <strong>Focusable Warning Alert</strong> - Tab to this alert to see keyboard focus outline for accessibility navigation.
        </Alert>
      </Box>
      
      {/* Active State */}
      <Box>
        <Typography variant="h6" gutterBottom>Active State</Typography>
        <Alert 
          severity="error"
          sx={{
            cursor: 'pointer',
            transition: 'all 0.1s ease-in-out',
            '&:active': {
              transform: 'scale(0.98)',
              boxShadow: (theme) => theme.shadows[2],
              '& .MuiAlert-icon': {
                transform: 'scale(0.9)',
              }
            }
          }}
          onClick={fn()}
        >
          <strong>Clickable Error Alert</strong> - Click and hold this alert to see active press state with scale feedback.
        </Alert>
      </Box>
      
      {/* Disabled State */}
      <Box>
        <Typography variant="h6" gutterBottom>Disabled State</Typography>
        <Alert 
          severity="info" 
          sx={{ 
            opacity: 0.6, 
            pointerEvents: 'none',
            filter: 'grayscale(0.3)',
            cursor: 'not-allowed',
          }}
        >
          <strong>Disabled Alert</strong> - Alert with disabled styling including reduced opacity, grayscale filter, and no user interactions.
        </Alert>
      </Box>
      
      {/* Loading State */}
      <Box>
        <Typography variant="h6" gutterBottom>Loading State</Typography>
        <Alert 
          severity="info"
          icon={
            <Box
              sx={{
                width: 20,
                height: 20,
                border: '2px solid',
                borderColor: 'info.light',
                borderTopColor: 'info.main',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
          }
        >
          <strong>Loading Alert</strong> - Alert displaying loading state with spinner icon and pending operation indication.
        </Alert>
      </Box>
      
      {/* Dismissible States */}
      <Box>
        <Typography variant="h6" gutterBottom>Dismissible States</Typography>
        <Stack data-testid="alert.stories" spacing={2}>
          <Alert 
            severity="success" 
            closable 
            onClose={fn()}
          >
            <strong>Closable Success Alert</strong> - Alert with close functionality for user dismissal.
          </Alert>
          
          <Alert 
            severity="warning" 
            closable 
            onClose={fn()}
            sx={{
              '& .MuiAlert-action': {
                '& .MuiIconButton-root': {
                  '&:hover': {
                    backgroundColor: 'warning.light',
                    color: 'warning.contrastText',
                  }
                }
              }
            }}
          >
            <strong>Enhanced Closable Alert</strong> - Alert with enhanced close button hover effects.
          </Alert>
        </Stack>
      </Box>
      
      {/* Auto-Hide State */}
      <Box>
        <Typography variant="h6" gutterBottom>Auto-Hide State</Typography>
        <Alert 
          severity="info" 
          autoHideDuration={5000}
          onClose={fn()}
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '3px',
              backgroundColor: 'info.main',
              animation: 'countdown 5s linear',
              '@keyframes countdown': {
                '0%': { width: '100%' },
                '100%': { width: '0%' },
              },
            }
          }}
        >
          <strong>Auto-Hide Alert</strong> - Alert that automatically dismisses after 5 seconds with progress indicator.
        </Alert>
      </Box>
      
      {/* Interactive Alert with Actions */}
      <Box>
        <Typography variant="h6" gutterBottom>Interactive Actions State</Typography>
        <Alert 
          severity="warning"
          action={
            <Stack data-testid="alert.stories" direction="row" spacing={1}>
              <Button 
                size="small" 
                variant="outlined"
                sx={{ 
                  borderColor: 'warning.main',
                  color: 'warning.main',
                  '&:hover': {
                    backgroundColor: 'warning.main',
                    color: 'warning.contrastText',
                  }
                }}
                onClick={fn()}
              >
                Retry
              </Button>
              <Button 
                size="small" 
                variant="text"
                sx={{ 
                  color: 'warning.main',
                  '&:hover': {
                    backgroundColor: 'warning.light',
                  }
                }}
                onClick={fn()}
              >
                Dismiss
              </Button>
            </Stack>
          }
        >
          <strong>Interactive Warning Alert</strong> - Alert with multiple action buttons providing user interaction options.
        </Alert>
      </Box>
      
      {/* Progress Alert State */}
      <Box>
        <Typography variant="h6" gutterBottom>Progress State</Typography>
        <Alert 
          severity="info"
          sx={{
            '& .MuiAlert-message': {
              width: '100%',
            }
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2"><strong>Upload Progress</strong></Typography>
              <Typography variant="body2">75%</Typography>
            </Box>
            <Box 
              sx={{ 
                width: '100%', 
                height: 8, 
                backgroundColor: 'info.light',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Box 
                sx={{ 
                  width: '75%', 
                  height: '100%', 
                  backgroundColor: 'info.main',
                  transition: 'width 0.3s ease-in-out',
                }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Uploading files... 3 of 4 completed
            </Typography>
          </Box>
        </Alert>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all interaction and status states for Alert including normal, hover, focus, active, disabled, loading, dismissible, auto-hide, interactive actions, and progress states. Each state provides appropriate visual feedback and maintains accessibility standards.',
      },
    },
  },
};

// ===== BOOLEAN PROPS =====
export const BooleanProps: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={3}>
      <Typography variant="h6" gutterBottom>Boolean Properties</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>showIcon Property</Typography>
        <Alert severity="success" showIcon={true} sx={{ mb: 1 }}>
          showIcon: true - Icon displayed alongside the message
        </Alert>
        <Alert severity="success" showIcon={false}>
          showIcon: false - No icon displayed
        </Alert>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>closable Property</Typography>
        <Alert severity="info" closable={true} onClose={() => {}} sx={{ mb: 1 }}>
          closable: true - Close button available for dismissing alert
        </Alert>
        <Alert severity="info" closable={false}>
          closable: false - No close button available
        </Alert>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>fullWidth Property</Typography>
        <Alert severity="warning" fullWidth={true} sx={{ mb: 1 }}>
          fullWidth: true - Alert stretches to full container width
        </Alert>
        <Alert severity="warning" fullWidth={false}>
          fullWidth: false - Alert uses content-based width
        </Alert>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>elevated Property</Typography>
        <Alert severity="error" elevated={true} sx={{ mb: 1 }}>
          elevated: true - Alert has shadow elevation effect
        </Alert>
        <Alert severity="error" elevated={false}>
          elevated: false - Alert has flat appearance without shadow
        </Alert>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>rounded Property</Typography>
        <Alert severity="success" rounded={true} sx={{ mb: 1 }}>
          rounded: true - Alert has rounded corners for softer appearance
        </Alert>
        <Alert severity="success" rounded={false}>
          rounded: false - Alert has sharp corners for more structured look
        </Alert>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>centered Property</Typography>
        <Alert severity="info" centered={true} sx={{ mb: 1 }}>
          centered: true - Alert content is center-aligned
        </Alert>
        <Alert severity="info" centered={false}>
          centered: false - Alert content uses left alignment
        </Alert>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>animated Property</Typography>
        <Alert severity="warning" animated={true} sx={{ mb: 1 }}>
          animated: true - Alert entrance/exit animations enabled
        </Alert>
        <Alert severity="warning" animated={false}>
          animated: false - Alert appears/disappears without animation
        </Alert>
      </Box>
    </Stack>
  ),
};

// ===== SIZES =====
export const Sizes: Story = {
  render: (args) => (
    <Stack data-testid="alert.stories" spacing={3}>
      <Typography variant="h6" gutterBottom>Alert Sizes</Typography>
      
      <Alert severity="info" size="small">
        <strong>Small Size</strong> - Compact alert for dense layouts and subtle notifications
      </Alert>
      
      <Alert severity="warning" size="medium" title="Medium Alert">
        <strong>Medium Size (Default)</strong> - Standard alert size for most use cases with balanced spacing
      </Alert>
      
      <Alert severity="success" size="large" title="Large Alert" showIcon>
        <strong>Large Size</strong> - Prominent alert for important messages that need to capture user attention with generous spacing and enhanced visibility
      </Alert>
    </Stack>
  ),
};