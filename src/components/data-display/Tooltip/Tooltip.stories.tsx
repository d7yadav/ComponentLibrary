/**
 * @fileoverview Tooltip component Storybook stories
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import {
  Info,
  Help,
  Settings,
  Delete,
  Add,
  Favorite,
  Star,
  Person,
  Warning,
  CheckCircle,
  Error,
} from '@mui/icons-material';
import { 
  Button,
  IconButton,
  Avatar,
  Chip,
  Box,
  Typography,
  Fab,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Tooltip, RichTooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Enhanced Tooltip component for displaying help text and additional information:

- **Multiple triggers** - Hover, focus, click, or manual control
- **Rich content** - Support for complex layouts with actions
- **Smart positioning** - 12 placement options with collision detection
- **Accessibility** - WCAG 2.1 AA compliant with proper ARIA attributes
- **Variants** - Standard, light, dark, and rich tooltip styles
- **Interactive mode** - Tooltips that can contain clickable content

## Features

- ✅ **Multiple Triggers** - Hover, focus, click, touch, or manual
- ✅ **Rich Content** - Complex layouts with titles, content, and actions
- ✅ **Smart Positioning** - Automatic placement adjustment to stay in viewport
- ✅ **Accessibility** - Full keyboard navigation and screen reader support
- ✅ **Customizable Timing** - Control enter/leave delays for optimal UX
- ✅ **Follow Cursor** - Tooltip can follow mouse movement
        `,
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'bottom-end', 'bottom-start', 'bottom',
        'left-end', 'left-start', 'left',
        'right-end', 'right-start', 'right',
        'top-end', 'top-start', 'top'
      ],
      description: 'Tooltip placement relative to the trigger element',
    },
    variant: {
      control: 'select',
      options: ['standard', 'light', 'dark', 'rich'],
      description: 'Visual variant of the tooltip',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'focus', 'click', 'manual'],
      description: 'Event that triggers the tooltip',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show an arrow pointing to the trigger',
    },
    enterDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay in milliseconds before showing tooltip',
    },
    leaveDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay in milliseconds before hiding tooltip',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// Basic tooltip
export const Default: Story = {
  args: {
    title: 'This is a tooltip',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="contained">Hover me</Button>
    </Tooltip>
  ),
};

// Different placements
export const Placements: Story = {
  render: () => (
    <Box sx={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 2,
      width: 400,
      margin: '100px auto',
      textAlign: 'center'
    }}>
      {/* Top row */}
      <Tooltip title="top-start" placement="top-start">
        <Button size="small">TS</Button>
      </Tooltip>
      <Tooltip title="top" placement="top">
        <Button size="small">T</Button>
      </Tooltip>
      <Tooltip title="top-end" placement="top-end">
        <Button size="small">TE</Button>
      </Tooltip>
      
      {/* Middle row */}
      <Tooltip title="left-start" placement="left-start">
        <Button size="small">LS</Button>
      </Tooltip>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Trigger
        </Typography>
      </Box>
      <Tooltip title="right-start" placement="right-start">
        <Button size="small">RS</Button>
      </Tooltip>
      
      <Tooltip title="left" placement="left">
        <Button size="small">L</Button>
      </Tooltip>
      <div />
      <Tooltip title="right" placement="right">
        <Button size="small">R</Button>
      </Tooltip>
      
      <Tooltip title="left-end" placement="left-end">
        <Button size="small">LE</Button>
      </Tooltip>
      <div />
      <Tooltip title="right-end" placement="right-end">
        <Button size="small">RE</Button>
      </Tooltip>
      
      {/* Bottom row */}
      <Tooltip title="bottom-start" placement="bottom-start">
        <Button size="small">BS</Button>
      </Tooltip>
      <Tooltip title="bottom" placement="bottom">
        <Button size="small">B</Button>
      </Tooltip>
      <Tooltip title="bottom-end" placement="bottom-end">
        <Button size="small">BE</Button>
      </Tooltip>
    </Box>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Tooltip title="Standard tooltip" variant="standard">
        <Button variant="outlined">Standard</Button>
      </Tooltip>
      
      <Tooltip title="Light tooltip" variant="light">
        <Button variant="outlined">Light</Button>
      </Tooltip>
      
      <Tooltip title="Dark tooltip" variant="dark">
        <Button variant="outlined">Dark</Button>
      </Tooltip>
      
      <Tooltip 
        title={
          <RichTooltip
            title="Rich Tooltip"
            content="This is a rich tooltip with enhanced styling and layout options."
          />
        }
        variant="rich"
      >
        <Button variant="outlined">Rich</Button>
      </Tooltip>
    </Box>
  ),
};

// With arrows
export const WithArrows: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
      <Tooltip title="Tooltip with arrow" arrow placement="top">
        <Button variant="contained">Top Arrow</Button>
      </Tooltip>
      
      <Tooltip title="Tooltip with arrow" arrow placement="bottom">
        <Button variant="contained">Bottom Arrow</Button>
      </Tooltip>
      
      <Tooltip title="Tooltip with arrow" arrow placement="left">
        <Button variant="contained">Left Arrow</Button>
      </Tooltip>
      
      <Tooltip title="Tooltip with arrow" arrow placement="right">
        <Button variant="contained">Right Arrow</Button>
      </Tooltip>
    </Box>
  ),
};

// Different triggers
export const Triggers: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Tooltip title="Appears on hover" trigger="hover">
        <Button variant="outlined">Hover</Button>
      </Tooltip>
      
      <Tooltip title="Appears on focus" trigger="focus">
        <Button variant="outlined">Focus</Button>
      </Tooltip>
      
      <Tooltip title="Appears on click" trigger="click">
        <Button variant="outlined">Click</Button>
      </Tooltip>
      
      <Tooltip title="Multiple triggers" trigger={['hover', 'focus']}>
        <Button variant="outlined">Hover + Focus</Button>
      </Tooltip>
    </Box>
  ),
};

// Rich tooltips
export const RichTooltips: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Tooltip
        title={
          <RichTooltip
            title="User Profile"
            avatar={<Avatar sx={{ width: 32, height: 32 }}><Person /></Avatar>}
            content="John Doe is a software engineer with 5 years of experience in React development."
            actions={
              <>
                <Button size="small">View Profile</Button>
                <Button size="small" variant="contained">Message</Button>
              </>
            }
          />
        }
        variant="rich"
        placement="bottom"
      >
        <Avatar><Person /></Avatar>
      </Tooltip>
      
      <Tooltip
        title={
          <RichTooltip
            title="Pro Feature"
            content="This feature is available in the Pro plan. Upgrade to unlock advanced analytics and reporting."
            actions={
              <>
                <Button size="small">Learn More</Button>
                <Button size="small" variant="contained" color="primary">
                  Upgrade
                </Button>
              </>
            }
          />
        }
        variant="rich"
        placement="top"
      >
        <Chip 
          label="Analytics" 
          icon={<Star />} 
          variant="outlined" 
          color="primary"
        />
      </Tooltip>
    </Box>
  ),
};

// Interactive tooltip
export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    
    return (
      <Tooltip
        title={
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Interactive Tooltip
            </Typography>
            <Typography variant="body2" gutterBottom>
              Count: {count}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Button 
                size="small" 
                variant="outlined"
                onClick={() => setCount(c => c - 1)}
              >
                -
              </Button>
              <Button 
                size="small" 
                variant="contained"
                onClick={() => setCount(c => c + 1)}
              >
                +
              </Button>
            </Box>
          </Box>
        }
        variant="light"
        trigger="click"
        disableInteractive={false}
      >
        <Button variant="contained">
          Interactive Tooltip
        </Button>
      </Tooltip>
    );
  },
};

// Custom delays
export const CustomDelays: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Tooltip title="No delay" enterDelay={0} leaveDelay={0}>
        <Button variant="outlined">No Delay</Button>
      </Tooltip>
      
      <Tooltip title="Slow enter" enterDelay={1000}>
        <Button variant="outlined">Slow Enter</Button>
      </Tooltip>
      
      <Tooltip title="Slow leave" leaveDelay={1000}>
        <Button variant="outlined">Slow Leave</Button>
      </Tooltip>
      
      <Tooltip title="Both slow" enterDelay={500} leaveDelay={500}>
        <Button variant="outlined">Both Slow</Button>
      </Tooltip>
    </Box>
  ),
};

// Follow cursor
export const FollowCursor: Story = {
  render: () => (
    <Box sx={{ p: 4, border: '2px dashed #ccc', borderRadius: 2, textAlign: 'center' }}>
      <Tooltip title="This tooltip follows your cursor!" followCursor>
        <Box sx={{ 
          display: 'inline-block',
          p: 2,
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 1,
          cursor: 'crosshair'
        }}>
          Move your mouse around this area
        </Box>
      </Tooltip>
    </Box>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Help icons */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography>Form Field</Typography>
        <Tooltip title="This field is required for account verification">
          <IconButton size="small">
            <Help fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Status indicators */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography>System Status:</Typography>
        <Tooltip title="All systems operational" variant="light" arrow>
          <CheckCircle color="success" />
        </Tooltip>
        <Tooltip title="Minor issues detected" variant="light" arrow>
          <Warning color="warning" />
        </Tooltip>
        <Tooltip title="System down for maintenance" variant="light" arrow>
          <Error color="error" />
        </Tooltip>
      </Box>
      
      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Add new item">
          <Fab size="small" color="primary">
            <Add />
          </Fab>
        </Tooltip>
        
        <Tooltip title="Mark as favorite">
          <IconButton>
            <Favorite />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Delete item (this action cannot be undone)" placement="top">
          <IconButton color="error">
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Form elements */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300 }}>
        <Tooltip title="Enter your full name as it appears on your ID">
          <TextField
            label="Full Name"
            variant="outlined"
            size="small"
          />
        </Tooltip>
        
        <Tooltip title="Enable to receive email notifications about your account">
          <FormControlLabel
            control={<Switch />}
            label="Email Notifications"
          />
        </Tooltip>
      </Box>
    </Box>
  ),
};

// Controlled tooltip
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Tooltip
          title="This tooltip is controlled programmatically"
          open={open}
          trigger="manual"
        >
          <Button variant="contained">
            Controlled Tooltip Target
          </Button>
        </Tooltip>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            onClick={() => setOpen(true)}
            disabled={open}
          >
            Show
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => setOpen(false)}
            disabled={!open}
          >
            Hide
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => setOpen(!open)}
          >
            Toggle
          </Button>
        </Box>
      </Box>
    );
  },
};