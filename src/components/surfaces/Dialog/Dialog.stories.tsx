import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { 
  TextField, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Checkbox,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
} from '@mui/material';
import { 
  Delete, 
  Save, 
  Warning, 
  Info, 
  CheckCircle, 
  Error as ErrorIcon,
  Settings,
  Download,
  Upload,
  Share,
  Star,
} from '@mui/icons-material';
import { Dialog, createDialogActions } from './Dialog';
import { 
  DIALOG_VARIANTS, 
  DIALOG_TYPES, 
  DIALOG_SIZES,
  DIALOG_ACTION_TYPES,
} from './Dialog.constants';

const meta: Meta<typeof Dialog> = {
  title: 'Surfaces/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Enhanced Dialog component built on top of Modal with pre-configured layouts and actions.

## Features
- **6 variants**: confirmation, alert, form, custom, fullscreen, simple
- **5 types**: info, success, warning, error, question (with icons)
- **5 sizes**: small, medium, large, fullscreen, auto
- **Pre-configured actions**: Primary, secondary, cancel, destructive buttons
- **Accessibility**: WCAG 2.1 AA compliant with focus management
- **Responsive**: Mobile-optimized layouts
- **Loading states**: Built-in loading overlays and button states
- **Scrollable content**: Support for long content with proper scrolling
- **Draggable**: Optional draggable title bar functionality

## Usage
Built on top of the Modal component for consistency, providing pre-configured layouts and common dialog patterns.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(DIALOG_VARIANTS),
      description: 'The variant of the dialog',
    },
    type: {
      control: 'select',
      options: Object.values(DIALOG_TYPES),
      description: 'The type of dialog (affects icon and colors)',
    },
    size: {
      control: 'select',
      options: Object.values(DIALOG_SIZES),
      description: 'The size of the dialog',
    },
    title: {
      control: 'text',
      description: 'The title of the dialog',
    },
    subtitle: {
      control: 'text',
      description: 'The subtitle or description text',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the type icon',
    },
    scrollable: {
      control: 'boolean',
      description: 'Whether the content should be scrollable',
    },
    draggable: {
      control: 'boolean',
      description: 'Whether the dialog should be draggable',
    },
    dividers: {
      control: 'boolean',
      description: 'Whether to show dividers after title',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether clicking backdrop closes dialog',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing escape closes dialog',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Helper component for interactive stories
const DialogTemplate = ({ 
  children, 
  buttonText = 'Open Dialog',
  ...args 
}: any) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        style={{
          padding: '12px 24px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {buttonText}
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        {...args}
      >
        {children}
      </Dialog>
    </>
  );
};

// Basic Stories
/**
 * Default component
 * 
 * @returns JSX element
 */
export const Default: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" {...args}>
      <Typography>
        This is a default dialog with simple content. It demonstrates the basic functionality
        and appearance of the dialog component.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Default Dialog',
    subtitle: 'This is a subtitle',
    type: 'info',
    variant: 'simple',
    size: 'medium',
    actions: createDialogActions.okCancel(
      action('OK clicked'),
      action('Cancel clicked')
    ),
  },
};

/**
 * WithoutActions component
 * 
 * @returns JSX element
 */
export const WithoutActions: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" {...args}>
      <Typography>
        This dialog has no action buttons. Users can only close it using the close button
        or by pressing escape.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Information Dialog',
    type: 'info',
    variant: 'simple',
    content: 'This is a dialog without actions.',
  },
};

// Variant Stories
/**
 * ConfirmationDialog component
 * 
 * @returns JSX element
 */
export const ConfirmationDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Delete Item" {...args}>
      <Typography>
        Are you sure you want to delete this item? This action cannot be undone.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Confirm Deletion',
    type: 'warning',
    variant: 'confirmation',
    size: 'small',
    actions: createDialogActions.deleteCancel(
      action('Delete confirmed'),
      action('Delete cancelled')
    ),
  },
};

/**
 * AlertDialog component
 * 
 * @returns JSX element
 */
export const AlertDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Show Alert" {...args}>
      <Typography>
        Your session has expired. Please log in again to continue.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Session Expired',
    type: 'error',
    variant: 'alert',
    size: 'small',
    actions: [
      {
        label: 'OK',
        type: 'primary',
        onClick: action('OK clicked'),
        autoFocus: true,
      },
    ],
  },
};

/**
 * FormDialog component
 * 
 * @returns JSX element
 */
export const FormDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Edit Profile" {...args}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Full Name"
          defaultValue="John Doe"
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Email"
          defaultValue="john.doe@example.com"
          type="email"
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Bio"
          multiline
          rows={3}
          placeholder="Tell us about yourself..."
          fullWidth
          variant="outlined"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Notification Preferences</FormLabel>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Email notifications"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="SMS notifications"
          />
        </FormControl>
      </Box>
    </DialogTemplate>
  ),
  args: {
    title: 'Edit Profile',
    subtitle: 'Update your profile information',
    type: 'info',
    variant: 'form',
    size: 'medium',
    actions: createDialogActions.saveCancel(
      action('Profile saved'),
      action('Changes cancelled')
    ),
  },
};

/**
 * FullscreenDialog component
 * 
 * @returns JSX element
 */
export const FullscreenDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Open Fullscreen" {...args}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
        <Typography paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
          in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        <Typography paragraph>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </Typography>
        <Typography paragraph>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </Typography>
      </Box>
    </DialogTemplate>
  ),
  args: {
    title: 'Terms and Conditions',
    subtitle: 'Please review our terms and conditions',
    variant: 'fullscreen',
    type: 'info',
    scrollable: true,
    actions: [
      {
        label: 'Decline',
        type: 'cancel',
        onClick: action('Terms declined'),
      },
      {
        label: 'Accept',
        type: 'primary',
        onClick: action('Terms accepted'),
      },
    ],
  },
};

// Type Stories
/**
 * InfoDialog component
 * 
 * @returns JSX element
 */
export const InfoDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Show Info" {...args}>
      <Typography>
        Your data has been successfully backed up to the cloud. The backup includes
        all your files, settings, and preferences.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Backup Complete',
    type: 'info',
    variant: 'alert',
    actions: [{ label: 'OK', type: 'primary', onClick: action('OK clicked') }],
  },
};

/**
 * SuccessDialog component
 * 
 * @returns JSX element
 */
export const SuccessDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Show Success" {...args}>
      <Typography>
        Your account has been successfully created! Welcome to our platform.
        You can now start using all the features.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Account Created',
    type: 'success',
    variant: 'alert',
    actions: [{ label: 'Get Started', type: 'primary', onClick: action('Get started') }],
  },
};

/**
 * WarningDialog component
 * 
 * @returns JSX element
 */
export const WarningDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Show Warning" {...args}>
      <Typography>
        You have unsaved changes. If you leave this page now, your changes will be lost.
        Are you sure you want to continue?
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Unsaved Changes',
    type: 'warning',
    variant: 'confirmation',
    actions: createDialogActions.yesNo(
      action('Leave page'),
      action('Stay on page')
    ),
  },
};

/**
 * ErrorDialog component
 * 
 * @returns JSX element
 */
export const ErrorDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Show Error" {...args}>
      <Typography>
        Failed to save your changes due to a network error. Please check your 
        internet connection and try again.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Save Failed',
    type: 'error',
    variant: 'alert',
    actions: [
      {
        label: 'Retry',
        type: 'primary',
        onClick: action('Retry clicked'),
      },
      {
        label: 'Cancel',
        type: 'secondary',
        onClick: action('Cancel clicked'),
      },
    ],
  },
};

/**
 * QuestionDialog component
 * 
 * @returns JSX element
 */
export const QuestionDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Ask Question" {...args}>
      <Typography>
        Would you like to enable automatic updates? This will keep your application
        up to date with the latest features and security fixes.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Enable Auto-Updates?',
    type: 'question',
    variant: 'confirmation',
    actions: createDialogActions.yesNo(
      action('Enable auto-updates'),
      action('Keep manual updates')
    ),
  },
};

// Size Stories
/**
 * SmallDialog component
 * 
 * @returns JSX element
 */
export const SmallDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Small Dialog" {...args}>
      <Typography>
        This is a small dialog for quick confirmations.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Quick Confirm',
    type: 'question',
    size: 'small',
    actions: createDialogActions.okCancel(
      action('Confirmed'),
      action('Cancelled')
    ),
  },
};

/**
 * LargeDialog component
 * 
 * @returns JSX element
 */
export const LargeDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Large Dialog" {...args}>
      <Box>
        <Typography paragraph>
          This is a large dialog that can accommodate more content. It's useful for 
          detailed forms, extensive information, or complex user interfaces.
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          Large dialogs provide more space for complex content while maintaining good UX.
        </Alert>
        <List>
          <ListItem>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Advanced Settings" secondary="Configure detailed options" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Download /></ListItemIcon>
            <ListItemText primary="Download Options" secondary="Choose what to download" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Share /></ListItemIcon>
            <ListItemText primary="Sharing Preferences" secondary="Set sharing permissions" />
          </ListItem>
        </List>
      </Box>
    </DialogTemplate>
  ),
  args: {
    title: 'Advanced Configuration',
    subtitle: 'Configure advanced settings and preferences',
    type: 'info',
    size: 'large',
    dividers: true,
    actions: createDialogActions.saveCancel(
      action('Settings saved'),
      action('Changes cancelled')
    ),
  },
};

// Feature Stories
/**
 * ScrollableDialog component
 * 
 * @returns JSX element
 */
export const ScrollableDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Scrollable Content" {...args}>
      <Box>
        {Array.from({ length: 20 }, (_, i) => (
          <Typography key={i} paragraph>
            This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </Typography>
        ))}
      </Box>
    </DialogTemplate>
  ),
  args: {
    title: 'Long Content',
    subtitle: 'This dialog demonstrates scrollable content',
    type: 'info',
    scrollable: true,
    maxContentHeight: '400px',
    actions: [{ label: 'Close', type: 'primary', onClick: action('Closed') }],
  },
};

/**
 * LoadingDialog component
 * 
 * @returns JSX element
 */
export const LoadingDialog: Story = {
  render: (args) => {
    const [loading, setLoading] = useState(false);
    
    return (
      <DialogTemplate data-testid="dialog.stories" 
        buttonText="Show Loading" 
        {...args}
        loading={loading}
        actions={[
          {
            label: 'Start Process',
            type: 'primary',
            onClick: () => {
              setLoading(true);
              setTimeout(() => setLoading(false), 3000);
              action('Process started')();
            },
          },
          {
            label: 'Cancel',
            type: 'cancel',
            onClick: action('Cancelled'),
          },
        ]}
      >
        <Typography>
          Click "Start Process" to see the loading state. The dialog will show a loading
          overlay while the process is running.
        </Typography>
      </DialogTemplate>
    );
  },
  args: {
    title: 'Process Data',
    subtitle: 'This will take a few moments',
    type: 'info',
    loadingMessage: 'Processing your data...',
  },
};

/**
 * DraggableDialog component
 * 
 * @returns JSX element
 */
export const DraggableDialog: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Draggable Dialog" {...args}>
      <Typography>
        This dialog can be dragged around by clicking and dragging the title bar.
        Try moving it to different positions on the screen.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Draggable Dialog',
    subtitle: 'Click and drag the title bar to move',
    type: 'info',
    draggable: true,
    dividers: true,
    actions: [{ label: 'Close', type: 'primary', onClick: action('Closed') }],
  },
};

// Action Stories
/**
 * CustomActions component
 * 
 * @returns JSX element
 */
export const CustomActions: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Custom Actions" {...args}>
      <Typography>
        This dialog demonstrates custom action buttons with different types,
        icons, and behaviors. Each button has its own styling and purpose.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Custom Actions',
    type: 'info',
    actions: [
      {
        label: 'Download',
        type: 'secondary',
        icon: <Download />,
        onClick: action('Download clicked'),
      },
      {
        label: 'Share',
        type: 'secondary',
        icon: <Share />,
        onClick: action('Share clicked'),
      },
      {
        label: 'Save',
        type: 'primary',
        icon: <Save />,
        onClick: action('Save clicked'),
        autoFocus: true,
      },
    ],
  },
};

/**
 * DestructiveAction component
 * 
 * @returns JSX element
 */
export const DestructiveAction: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Delete Account" {...args}>
      <Typography>
        This action will permanently delete your account and all associated data.
        This cannot be undone. Are you sure you want to continue?
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Delete Account',
    subtitle: 'This action cannot be undone',
    type: 'error',
    variant: 'confirmation',
    actions: [
      {
        label: 'Cancel',
        type: 'cancel',
        onClick: action('Cancelled'),
      },
      {
        label: 'Delete Account',
        type: 'destructive',
        icon: <Delete />,
        onClick: action('Account deleted'),
      },
    ],
  },
};

// Mobile Stories
/**
 * MobileResponsive component
 * 
 * @returns JSX element
 */
export const MobileResponsive: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Mobile Dialog" {...args}>
      <Typography>
        This dialog adapts to mobile screens by stacking action buttons vertically
        and adjusting spacing for better touch interaction.
      </Typography>
    </DialogTemplate>
  ),
  args: {
    title: 'Mobile Optimized',
    subtitle: 'Responsive design for all screen sizes',
    type: 'info',
    actions: createDialogActions.custom([
      { label: 'Option 1', type: 'secondary', onClick: action('Option 1') },
      { label: 'Option 2', type: 'secondary', onClick: action('Option 2') },
      { label: 'Confirm', type: 'primary', onClick: action('Confirmed') },
    ]),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Accessibility Stories
/**
 * AccessibilityFocused component
 * 
 * @returns JSX element
 */
export const AccessibilityFocused: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Accessibility Demo" {...args}>
      <Box>
        <Typography paragraph>
          This dialog demonstrates accessibility features:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="• Focus management and keyboard navigation" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• ARIA labels and descriptions" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• Screen reader compatibility" />
          </ListItem>
          <ListItem>
            <ListItemText primary="• High contrast support" />
          </ListItem>
        </List>
        <Typography variant="body2" color="text.secondary">
          Try navigating with Tab, Enter, and Escape keys.
        </Typography>
      </Box>
    </DialogTemplate>
  ),
  args: {
    title: 'Accessibility Features',
    subtitle: 'WCAG 2.1 AA compliant dialog',
    type: 'info',
    dividers: true,
    actions: [
      {
        label: 'Learn More',
        type: 'secondary',
        onClick: action('Learn more'),
      },
      {
        label: 'Got It',
        type: 'primary',
        onClick: action('Understood'),
        autoFocus: true,
      },
    ],
  },
};

// Complex Use Case Stories
/**
 * NestedContent component
 * 
 * @returns JSX element
 */
export const NestedContent: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="Complex Content" {...args}>
      <Box>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Please review all settings before proceeding.
        </Alert>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Notification Settings
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup defaultValue="all">
              <FormControlLabel value="all" control={<Radio />} label="All notifications" />
              <FormControlLabel value="important" control={<Radio />} label="Important only" />
              <FormControlLabel value="none" control={<Radio />} label="No notifications" />
            </RadioGroup>
          </FormControl>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>
            Privacy Options
          </Typography>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Allow data collection for analytics"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Share usage data with partners"
          />
        </Box>
      </Box>
    </DialogTemplate>
  ),
  args: {
    title: 'Application Settings',
    subtitle: 'Configure your application preferences',
    type: 'info',
    variant: 'form',
    size: 'medium',
    dividers: true,
    scrollable: true,
    actions: createDialogActions.saveCancel(
      action('Settings saved'),
      action('Changes cancelled')
    ),
  },
};

/**
 * AllFeatures component
 * 
 * @returns JSX element
 */
export const AllFeatures: Story = {
  render: (args) => (
    <DialogTemplate data-testid="dialog.stories" buttonText="All Features Demo" {...args}>
      <Box>
        <Typography paragraph>
          This dialog showcases multiple features working together:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon><Star /></ListItemIcon>
            <ListItemText primary="Type icon and colors" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Star /></ListItemIcon>
            <ListItemText primary="Draggable title bar" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Star /></ListItemIcon>
            <ListItemText primary="Dividers for visual separation" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Star /></ListItemIcon>
            <ListItemText primary="Scrollable content area" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Star /></ListItemIcon>
            <ListItemText primary="Multiple action types" />
          </ListItem>
        </List>
        
        {Array.from({ length: 5 }, (_, i) => (
          <Typography key={i} paragraph>
            Additional content paragraph {i + 1} to demonstrate scrolling behavior
            when content exceeds the maximum height.
          </Typography>
        ))}
      </Box>
    </DialogTemplate>
  ),
  args: {
    title: 'Feature Showcase',
    subtitle: 'Demonstrating all dialog capabilities',
    type: 'success',
    variant: 'custom',
    size: 'large',
    draggable: true,
    dividers: true,
    scrollable: true,
    maxContentHeight: '300px',
    actions: [
      {
        label: 'Download',
        type: 'secondary',
        icon: <Download />,
        onClick: action('Download'),
      },
      {
        label: 'Share',
        type: 'secondary',
        icon: <Share />,
        onClick: action('Share'),
      },
      {
        label: 'Save',
        type: 'primary',
        icon: <Save />,
        onClick: action('Save'),
      },
    ],
  },
};