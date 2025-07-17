/**
 * @fileoverview Badge component Storybook stories
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import {
  Notifications,
  Mail,
  ShoppingCart,
  Favorite,
  Star,
  Person,
} from '@mui/icons-material';
import { 
  IconButton, 
  Avatar, 
  Button,
  Box,
  Typography 
} from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Badge component for displaying notifications, counts, and status indicators.

## Features
- Multiple color variants (primary, secondary, error, success, warning, info)
- Dot and standard variants
- Customizable positioning
- Maximum count display
- Invisible state for conditional display
- Accessible with ARIA labels
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    variant: {
      control: 'select',
      options: ['standard', 'dot'],
    },
    max: {
      control: { type: 'number', min: 1, max: 999 },
    },
    showZero: {
      control: 'boolean',
    },
    invisible: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic usage
export const Default: Story = {
  args: {
    badgeContent: 4,
    color: 'primary',
  },
  render: (args) => (
    <Badge {...args}>
      <IconButton>
        <Notifications />
      </IconButton>
    </Badge>
  ),
};

// Different colors
export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      <Badge badgeContent={4} color="primary">
        <IconButton><Notifications /></IconButton>
      </Badge>
      <Badge badgeContent={4} color="secondary">
        <IconButton><Notifications /></IconButton>
      </Badge>
      <Badge badgeContent={4} color="error">
        <IconButton><Notifications /></IconButton>
      </Badge>
      <Badge badgeContent={4} color="warning">
        <IconButton><Notifications /></IconButton>
      </Badge>
      <Badge badgeContent={4} color="info">
        <IconButton><Notifications /></IconButton>
      </Badge>
      <Badge badgeContent={4} color="success">
        <IconButton><Notifications /></IconButton>
      </Badge>
    </Box>
  ),
};

// Dot variant
export const DotVariant: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <Badge variant="dot" color="error">
        <IconButton><Mail /></IconButton>
      </Badge>
      <Badge variant="dot" color="primary">
        <Avatar>U</Avatar>
      </Badge>
      <Badge variant="dot" color="success">
        <Typography>Online Status</Typography>
      </Badge>
    </Box>
  ),
};

// Maximum count
export const MaxCount: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Badge badgeContent={99} color="error">
        <IconButton><Notifications /></IconButton>
      </Badge>
      <Badge badgeContent={100} color="error">
        <IconButton><Notifications /></IconButton>
      </Badge>
      <Badge badgeContent={1000} max={999} color="error">
        <IconButton><Notifications /></IconButton>
      </Badge>
    </Box>
  ),
};

// Zero handling
export const ZeroHandling: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <div>
        <Typography variant="body2" sx={{ mb: 1 }}>Default (zero hidden)</Typography>
        <Badge badgeContent={0} color="primary">
          <IconButton><Mail /></IconButton>
        </Badge>
      </div>
      <div>
        <Typography variant="body2" sx={{ mb: 1 }}>Show zero</Typography>
        <Badge badgeContent={0} showZero color="primary">
          <IconButton><Mail /></IconButton>
        </Badge>
      </div>
    </Box>
  ),
};

// Invisible state
export const InvisibleState: Story = {
  render: () => {
    const [invisible, setInvisible] = React.useState(false);
    
    return (
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
        <Badge badgeContent={4} invisible={invisible} color="primary">
          <IconButton><Notifications /></IconButton>
        </Badge>
        <Button 
          variant="outlined" 
          onClick={() => setInvisible(!invisible)}
        >
          {invisible ? 'Show Badge' : 'Hide Badge'}
        </Button>
      </Box>
    );
  },
};

// Different anchor positions
export const AnchorPositions: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      <div>
        <Typography variant="body2" sx={{ mb: 1 }}>Top Right</Typography>
        <Badge 
          badgeContent={4} 
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          color="primary"
        >
          <Avatar>TR</Avatar>
        </Badge>
      </div>
      <div>
        <Typography variant="body2" sx={{ mb: 1 }}>Top Left</Typography>
        <Badge 
          badgeContent={4} 
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          color="secondary"
        >
          <Avatar>TL</Avatar>
        </Badge>
      </div>
      <div>
        <Typography variant="body2" sx={{ mb: 1 }}>Bottom Right</Typography>
        <Badge 
          badgeContent={4} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          color="error"
        >
          <Avatar>BR</Avatar>
        </Badge>
      </div>
      <div>
        <Typography variant="body2" sx={{ mb: 1 }}>Bottom Left</Typography>
        <Badge 
          badgeContent={4} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          color="success"
        >
          <Avatar>BL</Avatar>
        </Badge>
      </div>
    </Box>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
      {/* Notification icon */}
      <Badge badgeContent={17} color="error">
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
      </Badge>
      
      {/* Shopping cart */}
      <Badge badgeContent={3} color="primary">
        <IconButton color="inherit">
          <ShoppingCart />
        </IconButton>
      </Badge>
      
      {/* Favorite with dot */}
      <Badge variant="dot" color="error">
        <IconButton color="inherit">
          <Favorite />
        </IconButton>
      </Badge>
      
      {/* User avatar with status */}
      <Badge 
        variant="dot" 
        color="success"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar><Person /></Avatar>
      </Badge>
      
      {/* Star rating */}
      <Badge badgeContent="NEW" color="warning" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }}>
        <Button startIcon={<Star />} variant="outlined">
          Premium Feature
        </Button>
      </Badge>
    </Box>
  ),
};

// Custom badge content
export const CustomContent: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <Badge badgeContent="NEW" color="error">
        <Button variant="outlined">Product</Button>
      </Badge>
      
      <Badge badgeContent="!" color="warning">
        <IconButton><Notifications /></IconButton>
      </Badge>
      
      <Badge badgeContent="★" color="warning">
        <Button variant="contained">Premium</Button>
      </Badge>
      
      <Badge badgeContent="99+" color="error">
        <IconButton><Mail /></IconButton>
      </Badge>
    </Box>
  ),
};