/**
 * @fileoverview AppBar component Storybook stories
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import {
  Menu as MenuIcon,
  Search,
  AccountCircle,
  MoreVert,
  Notifications,
  ArrowBack,
  Share,
  Star,
  Home,
  Settings,
} from '@mui/icons-material';
import { 
  IconButton,
  Button,
  Avatar,
  Chip,
  Box,
} from '@mui/material';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { AppBar, Toolbar, Title, Actions } from './AppBar';

const meta: Meta<typeof AppBar> = {
  title: 'Navigation/AppBar',
  component: AppBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Enhanced AppBar component for application headers:

- **Multiple positions** - Fixed, sticky, static, absolute, relative
- **Color variants** - Primary, secondary, default, inherit, transparent
- **Responsive design** - Adapts to different screen sizes
- **Flexible layout** - Support for title, actions, and complex layouts
- **Accessibility** - WCAG 2.1 AA compliant with proper landmarks

## Sub-components

- **AppBar** - Main container with elevation and positioning
- **Toolbar** - Content container with proper spacing
- **Title** - Typography component for app/page titles
- **Actions** - Container for action buttons and menus

## Features

- ✅ **Responsive** - Mobile-friendly with adaptive heights and spacing
- ✅ **Themeable** - Integrates seamlessly with MUI theme system
- ✅ **Flexible** - Supports complex layouts and custom content
- ✅ **Accessible** - Proper heading structure and landmark roles
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['fixed', 'absolute', 'sticky', 'static', 'relative'],
      description: 'The positioning of the AppBar',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'inherit', 'transparent'],
      description: 'The color variant of the AppBar',
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'The elevation (shadow) of the AppBar',
    },
    square: {
      control: 'boolean',
      description: 'If true, rounded corners are disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppBar>;

// Basic AppBar
export const Default: Story = {
  args: {
    position: 'static',
    color: 'primary',
  },
  render: (args) => (
    <AppBar {...args}>
      <Toolbar>
        <Title>My Application</Title>
      </Toolbar>
    </AppBar>
  ),
};

// AppBar with menu and actions
export const WithMenuAndActions: Story = {
  render: () => (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={action('menu-clicked')}
        >
          <MenuIcon />
        </IconButton>
        <Title>Dashboard</Title>
        <Actions>
          <IconButton color="inherit" onClick={action('search-clicked')}>
            <Search />
          </IconButton>
          <IconButton color="inherit" onClick={action('notifications-clicked')}>
            <Notifications />
          </IconButton>
          <IconButton color="inherit" onClick={action('profile-clicked')}>
            <AccountCircle />
          </IconButton>
        </Actions>
      </Toolbar>
    </AppBar>
  ),
};

// Different positions
export const Positions: Story = {
  render: () => (
    <div style={{ height: '400px', position: 'relative', overflow: 'auto' }}>
      <AppBar position="static" color="primary" style={{ marginBottom: 8 }}>
        <Toolbar>
          <Title>Static Position</Title>
        </Toolbar>
      </AppBar>
      
      <AppBar position="fixed" color="secondary" style={{ top: 72 }}>
        <Toolbar>
          <Title>Fixed Position</Title>
        </Toolbar>
      </AppBar>
      
      <div style={{ height: 200, marginTop: 120 }}>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <Title>Sticky Position</Title>
          </Toolbar>
        </AppBar>
      </div>
      
      <div style={{ height: 100, backgroundColor: '#f5f5f5', padding: 16 }}>
        Content below sticky AppBar
      </div>
    </div>
  ),
};

// Different colors
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Title>Primary Color</Title>
        </Toolbar>
      </AppBar>
      
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Title>Secondary Color</Title>
        </Toolbar>
      </AppBar>
      
      <AppBar position="static" color="default">
        <Toolbar>
          <Title>Default Color</Title>
        </Toolbar>
      </AppBar>
      
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Title>Transparent Color</Title>
        </Toolbar>
      </AppBar>
    </div>
  ),
};

// Dense toolbar
export const Dense: Story = {
  render: () => (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" size="small">
          <MenuIcon />
        </IconButton>
        <Title variant="subtitle1">Dense Toolbar</Title>
        <Actions>
          <IconButton color="inherit" size="small">
            <MoreVert />
          </IconButton>
        </Actions>
      </Toolbar>
    </AppBar>
  ),
};

// Mobile app pattern
export const MobileApp: Story = {
  render: () => (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <ArrowBack />
        </IconButton>
        <Title>Page Title</Title>
        <Actions>
          <IconButton color="inherit">
            <Share />
          </IconButton>
          <IconButton color="inherit">
            <Star />
          </IconButton>
          <IconButton color="inherit">
            <MoreVert />
          </IconButton>
        </Actions>
      </Toolbar>
    </AppBar>
  ),
};

// Complex layout with user info
export const ComplexLayout: Story = {
  render: () => (
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton edge="start">
          <Home />
        </IconButton>
        <Title>Enterprise Dashboard</Title>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label="Production" 
            color="success" 
            size="small" 
            variant="outlined"
          />
          <Button color="inherit" startIcon={<Settings />}>
            Settings
          </Button>
          <Avatar sx={{ width: 32, height: 32 }}>
            JD
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  ),
};

// Landing page style
export const LandingPage: Story = {
  render: () => (
    <div 
      style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '300px',
        color: 'white'
      }}
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Title variant="h6" component="div">
            Brand
          </Title>
          <Actions>
            <Button color="inherit">Features</Button>
            <Button color="inherit">Pricing</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit" variant="outlined">
              Sign In
            </Button>
          </Actions>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <h1>Welcome to Our Platform</h1>
        <p>Build amazing applications with our tools</p>
      </Box>
    </div>
  ),
};

// Different elevations
export const Elevations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {([0, 1, 4, 8, 16, 24] as const).map(elevation => (
        <AppBar key={elevation} position="static" elevation={elevation}>
          <Toolbar>
            <Title>Elevation {elevation}</Title>
          </Toolbar>
        </AppBar>
      ))}
    </div>
  ),
};

// With custom content
export const CustomContent: Story = {
  render: () => (
    <AppBar position="static">
      <Toolbar>
        <Title>Analytics</Title>
        <Actions>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip 
              label="Live" 
              color="success" 
              size="small"
              sx={{ 
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                color: '#4caf50',
                fontWeight: 'bold'
              }}
            />
            <Button 
              variant="outlined" 
              size="small"
              sx={{ 
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Export
            </Button>
          </Box>
        </Actions>
      </Toolbar>
    </AppBar>
  ),
};