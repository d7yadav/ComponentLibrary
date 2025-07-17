import React from 'react';
import { 
  Notifications,
  NotificationsOff,
  Brightness7,
  Brightness4,
  Wifi,
  WifiOff,
  Bluetooth,
  BluetoothDisabled,
  LocationOn,
  LocationOff 
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Typography } from '@/components/data-display/Typography'; // Replaced MUI Typography with internal wrapper as per migration guidelines
import { Box } from '@/components/layout/Box'; // Replaced MUI Box with internal wrapper as per migration guidelines
import { Stack } from '@/components/layout/Stack'; // Replaced MUI Stack with internal wrapper as per migration guidelines

import { Switch, SwitchGroup } from './Switch';
import { SWITCH_SIZES, SWITCH_COLORS, SWITCH_VARIANTS } from './Switch.constants';

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Enhanced Switch component with comprehensive theming, validation states, and accessibility features for toggle controls.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(SWITCH_SIZES),
      description: 'Size of the switch',
    },
    color: {
      control: 'select',
      options: Object.values(SWITCH_COLORS),
      description: 'Color scheme of the switch',
    },
    variant: {
      control: 'select',
      options: Object.values(SWITCH_VARIANTS),
      description: 'Visual variant of the switch',
    },
    label: {
      control: 'text',
      description: 'Label text for the switch',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the switch',
    },
    error: {
      control: 'boolean',
      description: 'Whether the switch is in error state',
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
      description: 'Whether the switch is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Position of the label relative to the switch',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
    showText: {
      control: 'boolean',
      description: 'Whether to show on/off text',
    },
    onText: {
      control: 'text',
      description: 'Text to display when switch is on',
    },
    offText: {
      control: 'text',
      description: 'Text to display when switch is off',
    },
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Switch Label',
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Default story
/**
 * Default component
 * 
 * @returns JSX element
 */
export const Default: Story = {
  args: {
    label: 'Default Switch',
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
    <Stack data-testid="switch.stories" spacing={2}>
      <Typography variant="h6">Switch Sizes</Typography>
      <Stack data-testid="switch.stories" direction="row" spacing={3} alignItems="center">
        <Switch size="small" label="Small" onChange={fn()} />
        <Switch size="medium" label="Medium" onChange={fn()} />
        <Switch size="large" label="Large" onChange={fn()} />
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
    <Stack data-testid="switch.stories" spacing={2}>
      <Typography variant="h6">Switch Colors</Typography>
      <Stack data-testid="switch.stories" spacing={1}>
        {Object.values(SWITCH_COLORS).map((color) => (
          <Switch
            key={color}
            color={color}
            label={`${color.charAt(0).toUpperCase() + color.slice(1)} Switch`}
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
    <Stack data-testid="switch.stories" spacing={3}>
      <Typography variant="h6">Switch Variants</Typography>
      {Object.values(SWITCH_VARIANTS).map((variant) => (
        <Box key={variant}>
          <Typography variant="subtitle2" sx={{ mb: 1, textTransform: 'capitalize' }}>
            {variant} Variant
          </Typography>
          <Stack data-testid="switch.stories" direction="row" spacing={2}>
            <Switch variant={variant} label="Unchecked" onChange={fn()} />
            <Switch variant={variant} label="Checked" checked onChange={fn()} />
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
    <Stack data-testid="switch.stories" spacing={3}>
      <Typography variant="h6">Switch States</Typography>
      
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Basic States</Typography>
        <Stack data-testid="switch.stories" spacing={1}>
          <Switch label="Default" onChange={fn()} />
          <Switch label="Checked" checked onChange={fn()} />
          <Switch label="Disabled" disabled onChange={fn()} />
          <Switch label="Disabled Checked" disabled checked onChange={fn()} />
          <Switch label="Loading" loading onChange={fn()} />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Validation States</Typography>
        <Stack data-testid="switch.stories" spacing={1}>
          <Switch label="Success" validationState="success" checked onChange={fn()} />
          <Switch label="Warning" validationState="warning" checked onChange={fn()} />
          <Switch label="Error" validationState="error" checked onChange={fn()} />
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
    <Stack data-testid="switch.stories" spacing={3}>
      <Typography variant="h6">Label Positioning</Typography>
      <Stack data-testid="switch.stories" direction="row" spacing={4} alignItems="flex-start">
        <Switch label="End (Default)" labelPlacement="end" checked onChange={fn()} />
        <Switch label="Start" labelPlacement="start" checked onChange={fn()} />
        <Switch label="Top" labelPlacement="top" checked onChange={fn()} />
        <Switch label="Bottom" labelPlacement="bottom" checked onChange={fn()} />
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
    <Stack data-testid="switch.stories" spacing={3}>
      <Typography variant="h6">Helper Text and Validation</Typography>
      <Stack data-testid="switch.stories" spacing={2}>
        <Switch 
          label="Email Notifications"
          helperText="Receive email updates about your account"
          required
          onChange={fn()}
        />
        <Switch 
          label="Push Notifications"
          helperText="Get instant notifications on your device"
          validationState="success"
          checked
          onChange={fn()}
        />
        <Switch 
          label="Marketing Emails"
          error
          errorText="This setting is required for account verification"
          required
          onChange={fn()}
        />
      </Stack>
    </Stack>
  ),
};

// With on/off text
/**
 * WithText component
 * 
 * @returns JSX element
 */
export const WithText: Story = {
  render: () => (
    <Stack data-testid="switch.stories" spacing={3}>
      <Typography variant="h6">Switch with On/Off Text</Typography>
      <Stack data-testid="switch.stories" spacing={2}>
        <Switch 
          label="Dark Mode"
          showText
          onText="ON"
          offText="OFF"
          checked
          onChange={fn()}
        />
        <Switch 
          label="Airplane Mode"
          showText
          onText="✈️"
          offText="📶"
          size="large"
          onChange={fn()}
        />
        <Switch 
          label="Wi-Fi"
          showText
          onText="WIFI"
          offText="OFF"
          color="success"
          checked
          onChange={fn()}
        />
      </Stack>
    </Stack>
  ),
};

// Custom icons
/**
 * CustomIcons component
 * 
 * @returns JSX element
 */
export const CustomIcons: Story = {
  render: () => (
    <Stack data-testid="switch.stories" spacing={3}>
      <Typography variant="h6">Custom Icons</Typography>
      <Stack data-testid="switch.stories" spacing={2}>
        <Switch 
          label="Notifications"
          icon={<NotificationsOff />}
          checkedIcon={<Notifications />}
          color="primary"
          checked
          onChange={fn()}
        />
        <Switch 
          label="Theme"
          icon={<Brightness4 />}
          checkedIcon={<Brightness7 />}
          color="warning"
          onChange={fn()}
        />
        <Switch 
          label="Location Services"
          icon={<LocationOff />}
          checkedIcon={<LocationOn />}
          color="error"
          checked
          onChange={fn()}
        />
      </Stack>
    </Stack>
  ),
};

// Switch Group
/**
 * BasicGroup component
 * 
 * @returns JSX element
 */
export const BasicGroup: Story = {
  render: () => {
    const switches = [
      { id: 'wifi', label: 'Wi-Fi', checked: true },
      { id: 'bluetooth', label: 'Bluetooth', checked: false },
      { id: 'location', label: 'Location Services', checked: true },
      { id: 'notifications', label: 'Push Notifications', checked: false },
    ];
    
    return (
      <Stack data-testid="switch.stories" spacing={3}>
        <Typography variant="h6">Switch Group</Typography>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Column Layout (Default)</Typography>
          <SwitchGroup
            label="Device Settings"
            switches={switches}
            helperText="Configure your device preferences"
            onChange={fn()}
          />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Row Layout</Typography>
          <SwitchGroup
            label="Quick Settings"
            switches={[
              { id: 'wifi', label: 'Wi-Fi', checked: true },
              { id: 'bluetooth', label: 'Bluetooth', checked: false },
              { id: 'airplane', label: 'Airplane', checked: false },
            ]}
            direction="row"
            onChange={fn()}
          />
        </Box>
      </Stack>
    );
  },
};

// Advanced switch group
/**
 * AdvancedGroup component
 * 
 * @returns JSX element
 */
export const AdvancedGroup: Story = {
  render: () => {
    const privacySettings = [
      { 
        id: 'analytics', 
        label: 'Analytics', 
        checked: false,
        helperText: 'Help improve our service by sharing usage data',
        onText: 'SHARE',
        offText: 'PRIVATE'
      },
      { 
        id: 'marketing', 
        label: 'Marketing Communications', 
        checked: true,
        helperText: 'Receive promotional emails and offers',
        onText: 'YES',
        offText: 'NO'
      },
      { 
        id: 'cookies', 
        label: 'Third-party Cookies', 
        checked: false,
        disabled: true,
        helperText: 'Allow third-party cookies for enhanced functionality',
        onText: 'ALLOW',
        offText: 'BLOCK'
      },
    ];
    
    return (
      <Stack data-testid="switch.stories" spacing={4}>
        <Typography variant="h6">Advanced Switch Group</Typography>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Privacy Settings</Typography>
          <SwitchGroup
            label="Privacy Preferences"
            switches={privacySettings}
            helperText="Manage how your data is used"
            size="medium"
            onChange={fn()}
          />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>With Validation</Typography>
          <SwitchGroup
            label="Required Settings"
            switches={[
              { id: 'terms', label: 'Accept Terms of Service', checked: false },
              { id: 'privacy', label: 'Accept Privacy Policy', checked: false },
            ]}
            required
            error
            errorText="You must accept both policies to continue"
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
    <Stack data-testid="switch.stories" spacing={3}>
      <Typography variant="h6">Form Integration Example</Typography>
      <Box component="form" sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 1 }}>
        <Stack data-testid="switch.stories" spacing={3}>
          <SwitchGroup
            label="Account Preferences"
            switches={[
              { 
                id: 'profile-public', 
                label: 'Public Profile', 
                checked: true,
                helperText: 'Make your profile visible to other users'
              },
              { 
                id: 'search-indexing', 
                label: 'Search Engine Indexing', 
                checked: false,
                helperText: 'Allow search engines to index your profile'
              },
              { 
                id: 'activity-feed', 
                label: 'Activity Feed', 
                checked: true,
                helperText: 'Show your activity to connected users'
              },
            ]}
            helperText="These settings affect how others can find and interact with you"
            onChange={fn()}
          />
          
          <SwitchGroup
            label="Notification Preferences"
            switches={[
              { id: 'email-digest', label: 'Daily Email Digest', checked: true },
              { id: 'browser-notifications', label: 'Browser Notifications', checked: false },
              { id: 'mobile-push', label: 'Mobile Push Notifications', checked: true },
            ]}
            direction="row"
            helperText="Choose how you want to receive updates"
            onChange={fn()}
          />
          
          <Switch
            label="I agree to receive marketing communications"
            required
            helperText="Required for account creation"
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
    <Stack data-testid="switch.stories" spacing={3}>
      <Typography variant="h6">Accessibility Features</Typography>
      <Stack data-testid="switch.stories" spacing={3}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Screen Reader Support</Typography>
          <SwitchGroup
            label="Accessibility Options"
            switches={[
              { 
                id: 'screen-reader', 
                label: 'Enhanced Screen Reader Support',
                description: 'Optimize interface for screen reader users',
                helperText: 'Provides additional context and navigation aids',
                checked: false
              },
              { 
                id: 'high-contrast', 
                label: 'High Contrast Mode',
                description: 'Increase contrast for better visibility',
                helperText: 'Recommended for users with visual impairments',
                checked: true
              },
              { 
                id: 'reduced-motion', 
                label: 'Reduced Motion',
                description: 'Minimize animations and transitions',
                helperText: 'Reduces motion for users with vestibular disorders',
                checked: false
              },
            ]}
            helperText="Use Tab to navigate, Space to toggle switches"
            onChange={fn()}
          />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Keyboard Navigation</Typography>
          <Switch
            label="Keyboard-only Navigation Mode"
            description="Optimizes interface for keyboard-only users"
            helperText="Use Tab to focus, Space to toggle, Arrow keys for groups"
            showText
            onText="ACTIVE"
            offText="OFF"
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
    <Stack data-testid="switch.stories" spacing={3}>
      <Typography variant="h6">Theme Integration</Typography>
      <Stack data-testid="switch.stories" spacing={3}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Light Theme</Typography>
          <Stack data-testid="switch.stories" direction="row" spacing={2}>
            <Switch label="Primary" color="primary" checked onChange={fn()} />
            <Switch label="Secondary" color="secondary" checked onChange={fn()} />
            <Switch label="Success" color="success" checked onChange={fn()} />
          </Stack>
        </Box>
        
        <Box sx={{ p: 2, bgcolor: 'grey.900', borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'white' }}>Dark Theme Preview</Typography>
          <Stack data-testid="switch.stories" direction="row" spacing={2}>
            <Switch label="Primary" color="primary" checked onChange={fn()} />
            <Switch label="Warning" color="warning" checked onChange={fn()} />
            <Switch label="Error" color="error" checked onChange={fn()} />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  ),
};