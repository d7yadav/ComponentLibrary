import {
  Download
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, {  useState  } from 'react';

import { Button } from '@/components/core/Button';
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

import { Snackbar } from './Snackbar';
import {
  SNACKBAR_AUTO_HIDE_DURATIONS,
  SNACKBAR_POSITIONS,
  SNACKBAR_SEVERITIES,
  SNACKBAR_TRANSITIONS,
  SNACKBAR_VARIANTS
} from './Snackbar.constants';

/**
 * The Snackbar component provides brief messages about app processes at the bottom or top of the screen.
 * 
 * ## Features
 * - 4 severity levels: error, warning, info, success
 * - 3 variants: filled, outlined, standard
 * - Multiple positioning options with anchor origins
 * - Auto-hide functionality with customizable duration
 * - Custom actions and close button support
 * - Multiple transition animations
 * - WCAG 2.1 AA accessibility compliance
 * - Dark theme support via enhanced theme system
 */
const meta: Meta<typeof Snackbar> = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Enhanced Material-UI Snackbar component with comprehensive theming and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: Object.values(SNACKBAR_SEVERITIES),
      description: 'The severity level of the snackbar',
    },
    variant: {
      control: 'select',
      options: Object.values(SNACKBAR_VARIANTS),
      description: 'The variant of the snackbar',
    },
    anchorOrigin: {
      control: 'object',
      description: 'The position of the snackbar',
    },
    transition: {
      control: 'select',
      options: Object.values(SNACKBAR_TRANSITIONS),
      description: 'The transition animation to use',
    },
    autoHideDuration: {
      control: 'number',
      description: 'Auto hide duration in milliseconds',
    },
    open: {
      control: 'boolean',
      description: 'If true, the snackbar will be open',
    },
    closable: {
      control: 'boolean',
      description: 'If true, the snackbar will show a close button',
    },
    showIcon: {
      control: 'boolean',
      description: 'If true, shows severity icon',
    },
    elevated: {
      control: 'boolean',
      description: 'If true, the snackbar will be elevated with shadow',
    },
    rounded: {
      control: 'boolean',
      description: 'If true, the snackbar will be rounded',
    },
    onClose: { action: 'closed' },
  },
  args: {
    onClose: fn(),
    message: 'This is a snackbar message',
    open: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    severity: 'info',
    variant: 'standard',
    message: 'This is a default snackbar',
  },
};

// ===== SEVERITY STORIES =====
export const Success: Story = {
  args: {
    severity: 'success',
    message: 'Operation completed successfully!',
    variant: 'filled',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    message: 'Please review your changes.',
    variant: 'filled',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    message: 'An error occurred while processing your request.',
    variant: 'filled',
  },
};

export const Info: Story = {
  args: {
    severity: 'info',
    message: 'New features are now available.',
    variant: 'filled',
  },
};

// ===== VARIANT STORIES =====
export const Filled: Story = {
  args: {
    variant: 'filled',
    severity: 'success',
    message: 'Filled variant snackbar',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    severity: 'info',
    message: 'Outlined variant snackbar',
  },
};

export const Standard: Story = {
  args: {
    variant: 'standard',
    severity: 'warning',
    message: 'Standard variant snackbar',
  },
};

// ===== POSITION STORIES =====
export const TopLeft: Story = {
  args: {
    anchorOrigin: SNACKBAR_POSITIONS.topLeft,
    message: 'Top left position',
    severity: 'info',
  },
};

export const TopCenter: Story = {
  args: {
    anchorOrigin: SNACKBAR_POSITIONS.topCenter,
    message: 'Top center position',
    severity: 'success',
  },
};

export const TopRight: Story = {
  args: {
    anchorOrigin: SNACKBAR_POSITIONS.topRight,
    message: 'Top right position',
    severity: 'warning',
  },
};

export const BottomLeft: Story = {
  args: {
    anchorOrigin: SNACKBAR_POSITIONS.bottomLeft,
    message: 'Bottom left position',
    severity: 'error',
  },
};

export const BottomCenter: Story = {
  args: {
    anchorOrigin: SNACKBAR_POSITIONS.bottomCenter,
    message: 'Bottom center position',
    severity: 'info',
  },
};

export const BottomRight: Story = {
  args: {
    anchorOrigin: SNACKBAR_POSITIONS.bottomRight,
    message: 'Bottom right position',
    severity: 'success',
  },
};

// ===== TRANSITION STORIES =====
export const SlideTransition: Story = {
  args: {
    transition: 'slide',
    message: 'Slide transition animation',
    severity: 'info',
  },
};

export const FadeTransition: Story = {
  args: {
    transition: 'fade',
    message: 'Fade transition animation',
    severity: 'success',
  },
};

export const GrowTransition: Story = {
  args: {
    transition: 'grow',
    message: 'Grow transition animation',
    severity: 'warning',
  },
};

export const CollapseTransition: Story = {
  args: {
    transition: 'collapse',
    message: 'Collapse transition animation',
    severity: 'error',
  },
};

// ===== BOOLEAN PROPS STORIES =====
export const BooleanProps: Story = {
  render: () => {
    const [openStates, setOpenStates] = useState({
      closable: true,
      showIcon: true,
      elevated: true,
      rounded: true,
    });

    const handleClose = (key: string) => {
      setOpenStates(prev => ({ ...prev, [key]: false }));
    };

    const handleOpen = (key: string) => {
      setOpenStates(prev => ({ ...prev, [key]: true }));
    };

    return (
      <Stack spacing={4}>
        <Typography variant="h6" gutterBottom>
          Boolean Properties Demonstration
        </Typography>
        
        {/* Closable Property */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            closable Property
          </Typography>
          <Typography variant="caption" color="text.secondary" gutterBottom display="block">
            Shows close button when true
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              size="small"
              onClick={() => handleOpen('closable')}
              disabled={openStates.closable}
            >
              Show closable: true
            </Button>
            <Snackbar
              open={openStates.closable}
              onClose={() => handleClose('closable')}
              message="Snackbar with close button"
              severity="info"
              closable={true}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              autoHideDuration={null}
            />
          </Stack>
        </Box>

        {/* ShowIcon Property */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            showIcon Property
          </Typography>
          <Typography variant="caption" color="text.secondary" gutterBottom display="block">
            Shows severity icon when true
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              size="small"
              onClick={() => handleOpen('showIcon')}
              disabled={openStates.showIcon}
            >
              Show showIcon: true
            </Button>
            <Snackbar
              open={openStates.showIcon}
              onClose={() => handleClose('showIcon')}
              message="Snackbar with icon"
              severity="success"
              showIcon={true}
              closable={true}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              autoHideDuration={null}
            />
          </Stack>
        </Box>

        {/* Elevated Property */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            elevated Property
          </Typography>
          <Typography variant="caption" color="text.secondary" gutterBottom display="block">
            Adds shadow elevation when true
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              size="small"
              onClick={() => handleOpen('elevated')}
              disabled={openStates.elevated}
            >
              Show elevated: true
            </Button>
            <Snackbar
              open={openStates.elevated}
              onClose={() => handleClose('elevated')}
              message="Elevated snackbar with shadow"
              severity="warning"
              elevated={true}
              elevation={8}
              closable={true}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              autoHideDuration={null}
            />
          </Stack>
        </Box>

        {/* Rounded Property */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            rounded Property
          </Typography>
          <Typography variant="caption" color="text.secondary" gutterBottom display="block">
            Applies rounded corners when true
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              size="small"
              onClick={() => handleOpen('rounded')}
              disabled={openStates.rounded}
            >
              Show rounded: true
            </Button>
            <Snackbar
              open={openStates.rounded}
              onClose={() => handleClose('rounded')}
              message="Rounded snackbar"
              severity="error"
              rounded={true}
              closable={true}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              autoHideDuration={null}
            />
          </Stack>
        </Box>
      </Stack>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Demonstrates all boolean properties of the Snackbar component with interactive examples.',
      },
    },
  },
};

// ===== ACTION STORIES =====
export const WithActions: Story = {
  args: {
    message: 'Item deleted',
    severity: 'info',
    actions: [
      {
        label: 'Undo',
        onClick: fn(),
        color: 'inherit',
      },
    ],
    closable: true,
    autoHideDuration: null,
  },
};

export const MultipleActions: Story = {
  args: {
    message: 'Connection failed',
    severity: 'error',
    actions: [
      {
        label: 'Retry',
        onClick: fn(),
        color: 'inherit',
      },
      {
        label: 'Settings',
        onClick: fn(),
        color: 'inherit',
      },
    ],
    closable: true,
    autoHideDuration: null,
  },
};

// ===== AUTO HIDE DURATION STORIES =====
export const ShortDuration: Story = {
  args: {
    message: 'Quick notification (3 seconds)',
    severity: 'info',
    autoHideDuration: SNACKBAR_AUTO_HIDE_DURATIONS.short,
  },
};

export const MediumDuration: Story = {
  args: {
    message: 'Standard notification (5 seconds)',
    severity: 'success',
    autoHideDuration: SNACKBAR_AUTO_HIDE_DURATIONS.medium,
  },
};

export const LongDuration: Story = {
  args: {
    message: 'Important notification (8 seconds)',
    severity: 'warning',
    autoHideDuration: SNACKBAR_AUTO_HIDE_DURATIONS.long,
  },
};

export const PersistentSnackbar: Story = {
  args: {
    message: 'This notification stays until manually closed',
    severity: 'error',
    autoHideDuration: SNACKBAR_AUTO_HIDE_DURATIONS.persistent,
    closable: true,
  },
};

// ===== CUSTOM ICON STORIES =====
export const CustomIcon: Story = {
  args: {
    message: 'Download completed',
    severity: 'success',
    icon: <Download />,
    showIcon: true,
  },
};

export const NoIcon: Story = {
  args: {
    message: 'Message without icon',
    severity: 'info',
    showIcon: false,
  },
};

// ===== TITLE STORIES =====
export const WithTitle: Story = {
  args: {
    title: 'Notification Title',
    message: 'This snackbar has both a title and message content.',
    severity: 'info',
    variant: 'filled',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Just a title',
    severity: 'success',
    variant: 'outlined',
  },
};

// ===== COMPREHENSIVE SHOWCASES =====
export const AllSeverities: Story = {
  render: () => {
    const [openStates, setOpenStates] = useState({
      success: false,
      warning: false,
      error: false,
      info: false,
    });

    const showSnackbar = (severity: keyof typeof openStates) => {
      setOpenStates(prev => ({ ...prev, [severity]: true }));
    };

    const hideSnackbar = (severity: keyof typeof openStates) => {
      setOpenStates(prev => ({ ...prev, [severity]: false }));
    };

    return (
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6" gutterBottom>
          All Severity Levels
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
          {Object.values(SNACKBAR_SEVERITIES).map((severity) => (
            <Button
              key={severity}
              variant="outlined"
              color={severity as any}
              onClick={() => showSnackbar(severity as keyof typeof openStates)}
              disabled={openStates[severity as keyof typeof openStates]}
            >
              Show {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </Button>
          ))}
        </Stack>
        
        {/* Render snackbars */}
        <Snackbar
          open={openStates.success}
          onClose={() => hideSnackbar('success')}
          message="Operation completed successfully!"
          severity="success"
          variant="filled"
          closable
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
        <Snackbar
          open={openStates.warning}
          onClose={() => hideSnackbar('warning')}
          message="Please review your changes"
          severity="warning"
          variant="filled"
          closable
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
        <Snackbar
          open={openStates.error}
          onClose={() => hideSnackbar('error')}
          message="An error occurred"
          severity="error"
          variant="filled"
          closable
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
        <Snackbar
          open={openStates.info}
          onClose={() => hideSnackbar('info')}
          message="New features available"
          severity="info"
          variant="filled"
          closable
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
      </Stack>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h6" gutterBottom>
        All Snackbar Variants
      </Typography>
      <Stack spacing={2} alignItems="center">
        {Object.values(SNACKBAR_VARIANTS).map((variant) => (
          <Snackbar
            key={variant}
            open={true}
            message={`${variant.charAt(0).toUpperCase() + variant.slice(1)} variant`}
            severity="info"
            variant={variant}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={null}
            sx={{ position: 'static', transform: 'none' }}
          />
        ))}
      </Stack>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllPositions: Story = {
  render: () => {
    const [selectedPosition, setSelectedPosition] = useState<keyof typeof SNACKBAR_POSITIONS>('bottomLeft');

    return (
      <Stack spacing={3} alignItems="center">
        <Typography variant="h6" gutterBottom>
          All Position Options
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} width="300px">
          {Object.entries(SNACKBAR_POSITIONS).map(([key, position]) => (
            <Button
              key={key}
              variant={selectedPosition === key ? 'primary' : 'outlined'}
              size="small"
              onClick={() => setSelectedPosition(key as keyof typeof SNACKBAR_POSITIONS)}
              sx={{ textTransform: 'none', fontSize: '0.75rem' }}
            >
              {key}
            </Button>
          ))}
        </Box>
        <Snackbar
          open={true}
          message={`Position: ${selectedPosition}`}
          severity="info"
          anchorOrigin={SNACKBAR_POSITIONS[selectedPosition]}
          autoHideDuration={null}
        />
      </Stack>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// ===== ACCESSIBILITY STORIES =====
export const AccessibilityDemo: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        Accessibility Features
      </Typography>
      <Stack spacing={2}>
        <Snackbar
          open={true}
          message="Error message with assertive aria-live"
          severity="error"
          aria-label="Critical error notification"
          role="alert"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={null}
          sx={{ position: 'static', transform: 'none' }}
        />
        <Snackbar
          open={true}
          message="Info message with polite aria-live"
          severity="info"
          aria-label="Information notification"
          aria-describedby="info-description"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={null}
          sx={{ position: 'static', transform: 'none' }}
        />
        <Snackbar
          open={true}
          message="Keyboard navigation support"
          severity="success"
          closable={true}
          actions={[
            {
              label: 'Action',
              onClick: fn(),
              color: 'inherit',
            },
          ]}
          aria-label="Success notification with actions"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={null}
          sx={{ position: 'static', transform: 'none' }}
        />
      </Stack>
      <Typography
        id="info-description"
        variant="caption"
        color="text.secondary"
      >
        Additional context for screen readers
      </Typography>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard', enabled: true },
          { id: 'aria-live-region', enabled: true },
        ],
      },
    },
  },
};

// ===== THEME STORIES =====
export const ThemeVariations: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Theme Variations
      </Typography>
      <Stack spacing={2}>
        <Typography variant="subtitle2">Light Theme Optimized</Typography>
        <Stack spacing={1}>
          <Snackbar
            open={true}
            message="Light theme success"
            severity="success"
            variant="filled"
            autoHideDuration={null}
            sx={{ position: 'static', transform: 'none' }}
          />
          <Snackbar
            open={true}
            message="Light theme outlined"
            severity="info"
            variant="outlined"
            autoHideDuration={null}
            sx={{ position: 'static', transform: 'none' }}
          />
        </Stack>
        
        <Typography variant="subtitle2">Dark Theme Optimized</Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.900', borderRadius: 1 }}>
          <Stack spacing={1}>
            <Snackbar
              open={true}
              message="Dark theme warning"
              severity="warning"
              variant="filled"
              autoHideDuration={null}
              sx={{ position: 'static', transform: 'none' }}
            />
            <Snackbar
              open={true}
              message="Dark theme standard"
              severity="error"
              variant="standard"
              autoHideDuration={null}
              sx={{ position: 'static', transform: 'none' }}
            />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
  },
};

// ===== INTERACTIVE STATES =====
export const InteractiveStates: Story = {
  render: () => {
    const [snackbars, setSnackbars] = useState<Array<{id: string, open: boolean}>>([]);

    const addSnackbar = (id: string) => {
      setSnackbars(prev => [...prev, { id, open: true }]);
      setTimeout(() => {
        setSnackbars(prev => prev.map(s => s.id === id ? { ...s, open: false } : s));
      }, 3000);
    };

    return (
      <Stack spacing={3}>
        <Typography variant="h6" gutterBottom>
          Interactive States
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button onClick={() => addSnackbar('success')}>
            Show Success
          </Button>
          <Button onClick={() => addSnackbar('warning')}>
            Show Warning
          </Button>
          <Button onClick={() => addSnackbar('error')}>
            Show Error
          </Button>
          <Button onClick={() => addSnackbar('info')}>
            Show Info
          </Button>
        </Stack>
        
        {snackbars.map((snackbar, index) => (
          <Snackbar
            key={snackbar.id}
            open={snackbar.open}
            message={`${snackbar.id.charAt(0).toUpperCase() + snackbar.id.slice(1)} notification`}
            severity={snackbar.id as any}
            anchorOrigin={{ 
              vertical: 'bottom', 
              horizontal: 'right' 
            }}
            sx={{ 
              bottom: `${16 + (index * 80)}px !important`,
            }}
          />
        ))}
      </Stack>
    );
  },
  parameters: {
    layout: 'padded',
  },
};