// TODO: Replace with internal icon wrappers when available
// import {
//   Home,
//   Settings,
//   Person,
//   Dashboard,
//   Analytics,
//   Notifications,
//   Help,
//   Logout,
//   Menu,
//   Close,
//   ChevronLeft,
//   Inbox,
//   Drafts,
//   Send,
//   ExpandLess,
//   ExpandMore,
//   StarBorder,
// } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// TODO: Migrate ListItemButton, ListItemIcon, ListItemText to internal wrappers when available
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';

import { Button } from '@/components/core/Button';
import { Chip } from '@/components/core/Chip'; // Replaced MUI Chip with internal wrapper
import { IconButton } from '@/components/core/IconButton'; // Replaced MUI IconButton with internal wrapper
import { Avatar } from '@/components/data-display/Avatar'; // Replaced MUI Avatar with internal wrapper
import { Divider } from '@/components/data-display/Divider'; // Replaced MUI Divider with internal wrapper
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { List } from '@/components/surfaces/List'; // Replaced MUI List with internal wrapper
import { ListItem } from '@/components/surfaces/ListItem'; // Replaced MUI ListItem with internal wrapper

// TODO: Create wrapper components for List, Avatar, Chip, IconButton, and Divider

import { Drawer } from './Drawer';
import { DRAWER_VARIANTS, DRAWER_ANCHORS, DRAWER_SIZES, DRAWER_BEHAVIORS, DRAWER_ANIMATIONS } from './Drawer.constants';

const meta: Meta<typeof Drawer> = {
  title: 'Surfaces/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Enhanced Drawer component with multiple variants, animations, and accessibility features. Supports temporary, persistent, permanent, and mini variants with comprehensive customization options.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(DRAWER_VARIANTS),
      description: 'The variant of the drawer',
    },
    anchor: {
      control: 'select',
      options: Object.values(DRAWER_ANCHORS),
      description: 'The anchor position of the drawer',
    },
    size: {
      control: 'select',
      options: Object.values(DRAWER_SIZES),
      description: 'The size of the drawer',
    },
    behavior: {
      control: 'select',
      options: Object.values(DRAWER_BEHAVIORS),
      description: 'The behavior of the drawer when opened',
    },
    animation: {
      control: 'select',
      options: Object.values(DRAWER_ANIMATIONS),
      description: 'The animation type for the drawer',
    },
    open: {
      control: 'boolean',
      description: 'If true, the drawer is open',
    },
    collapsed: {
      control: 'boolean',
      description: 'If true, the drawer is collapsed (for mini variant)',
    },
    backdrop: {
      control: 'boolean',
      description: 'If true, shows a backdrop behind the drawer',
    },
    swipeEnabled: {
      control: 'boolean',
      description: 'If true, enables swipe-to-open/close gestures on mobile',
    },
    elevation: {
      control: 'boolean',
      description: 'If true, the drawer will have a paper-like elevation',
    },
    elevationLevel: {
      control: 'range',
      min: 0,
      max: 24,
      step: 1,
      description: 'Elevation level (0-24)',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback fired when the drawer requests to be closed',
    },
    onCollapseChange: {
      action: 'onCollapseChange',
      description: 'Callback fired when the drawer collapse state changes',
    },
    onOpened: {
      action: 'onOpened',
      description: 'Callback fired when the drawer has opened',
    },
    onClosed: {
      action: 'onClosed',
      description: 'Callback fired when the drawer has closed',
    },
  },
  args: {
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Sample navigation items
const navigationItems = [
  { icon: <span>🏠</span>, text: 'Home', href: '/' },
  { icon: <span>📊</span>, text: 'Dashboard', href: '/dashboard' },
  { icon: <span>📈</span>, text: 'Analytics', href: '/analytics' },
  { icon: <span>👤</span>, text: 'Profile', href: '/profile' },
  { icon: <span>⚙️</span>, text: 'Settings', href: '/settings' },
  { icon: <span>🔔</span>, text: 'Notifications', href: '/notifications' },
  { icon: <span>❓</span>, text: 'Help', href: '/help' },
];

const mailItems = [
  { icon: <span>📥</span>, text: 'Inbox', count: 4 },
  { icon: <span>📤</span>, text: 'Sent' },
  { icon: <span>📋</span>, text: 'Drafts', count: 2 },
  { icon: <span>⭐</span>, text: 'Starred' },
];

// Interactive wrapper for controlled stories
const DrawerWrapper = ({ children, ...props }: any) => {
  const [open, setOpen] = useState(props.open || false);
  const [collapsed, setCollapsed] = useState(props.collapsed || false);
  const handleClick = (...args: any[]) => {
    props.onClick?.(...args);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose?.();
  };

  const handleCollapseChange = (newCollapsed: boolean) => {
    setCollapsed(newCollapsed);
    props.onCollapseChange?.(newCollapsed);
  };

  return (
    <Box data-testid="drawer.stories" sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <Button
        variant="contained"
        onClick={() => setOpen(!open)}
        sx={{ 
          position: 'fixed', 
          top: 16, 
          right: 16, // Move to right to avoid overlap
          zIndex: 2000,
          ...(open && props.anchor === 'right' && {
            right: props.size === 'compact' ? '260px' : 
                   props.size === 'wide' ? '340px' : '300px'
          }),
          ...(open && props.anchor === 'left' && {
            left: props.size === 'compact' ? '260px' : 
                  props.size === 'wide' ? '340px' : '300px'
          })
        }}
      >
        {open ? 'Close' : 'Open'} Drawer
      </Button>
      <Drawer
        {...props}
        open={open}
        collapsed={collapsed}
        onClose={handleClose}
        onCollapseChange={handleCollapseChange}
      >
        {children}
      </Drawer>
      <Box data-testid="drawer.stories"
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: props.variant === 'permanent' ? 
            (props.size === 'compact' ? '240px' : props.size === 'wide' ? '320px' : '280px') : 0,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Main Content Area
        </Typography>
        <Typography variant="body1">
          This is the main content area. The drawer behavior and styling can be tested here.
          Try opening/closing the drawer and testing different interactions.
        </Typography>
      </Box>
    </Box>
  );
};

// Basic drawer
/**
 * Default component
 * 
 * @returns JSX element
 */
export const Default: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Drawer Content
        </Typography>
        <Typography variant="body2">
          This is the default drawer with basic content.
        </Typography>
      </Box>
    </DrawerWrapper>
  ),
  args: {
    variant: 'temporary',
    anchor: 'left',
    size: 'standard',
    open: false,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  
    onClick: fn(),
  },
};

// Temporary drawer variants
/**
 * TemporaryLeft component
 * 
 * @returns JSX element
 */
export const TemporaryLeft: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <List>
        {navigationItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerWrapper>
  ),
  args: {
    variant: 'temporary',
    anchor: 'left',
    size: 'standard',
    open: false,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

/**
 * TemporaryRight component
 * 
 * @returns JSX element
 */
export const TemporaryRight: Story = {
  ...TemporaryLeft,
  args: {
    ...TemporaryLeft.args,
    anchor: 'right',
  },
};

/**
 * TemporaryTop component
 * 
 * @returns JSX element
 */
export const TemporaryTop: Story = {
  ...TemporaryLeft,
  args: {
    ...TemporaryLeft.args,
    anchor: 'top',
    size: 'compact',
  },
};

/**
 * TemporaryBottom component
 * 
 * @returns JSX element
 */
export const TemporaryBottom: Story = {
  ...TemporaryLeft,
  args: {
    ...TemporaryLeft.args,
    anchor: 'bottom',
    size: 'compact',
  },
};

// Persistent drawer
/**
 * Persistent component
 * 
 * @returns JSX element
 */
export const Persistent: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Persistent Drawer
        </Typography>
        <List>
          {navigationItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </DrawerWrapper>
  ),
  args: {
    variant: 'persistent',
    anchor: 'left',
    size: 'standard',
    open: false,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

// Permanent drawer
/**
 * Permanent component
 * 
 * @returns JSX element
 */
export const Permanent: Story = {
  render: (args) => (
    <Box data-testid="drawer.stories" sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer {...args}>
        <Box data-testid="drawer.stories" sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Permanent Drawer
          </Typography>
          <List>
            {navigationItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box data-testid="drawer.stories" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Main Content
        </Typography>
        <Typography variant="body1">
          Permanent drawer is always visible and doesn't overlay the content.
        </Typography>
      </Box>
    </Box>
  ),
  args: {
    variant: 'permanent',
    anchor: 'left',
    size: 'standard',
    open: false,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

// Mini drawer
/**
 * Mini component
 * 
 * @returns JSX element
 */
export const Mini: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    
    const handleCollapseChange = (newCollapsed: boolean) => {
      setCollapsed(newCollapsed);
      args.onCollapseChange?.(newCollapsed);
    };
    
    return (
      <Box data-testid="drawer.stories" sx={{ display: 'flex', minHeight: '100vh' }}>
        <Drawer
          {...args}
          collapsed={collapsed}
          onCollapseChange={handleCollapseChange}
          header={
            <Box data-testid="drawer.stories" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
              {!collapsed && <Typography variant="h6">App Name</Typography>}
            </Box>
          }
        >
          <List>
            {navigationItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box data-testid="drawer.stories" component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Mini Drawer Example
          </Typography>
          <Typography variant="body1">
            Click the toggle button to collapse/expand the mini drawer.
            The drawer maintains its functionality while saving space.
          </Typography>
        </Box>
      </Box>
    );
  },
  args: {
    variant: 'mini',
    anchor: 'left',
    size: 'standard',
    open: false,
    showToggleButton: true,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

// Size variations
/**
 * SizeCompact component
 * 
 * @returns JSX element
 */
export const SizeCompact: Story = {
  ...Default,
  args: {
    ...Default.args,
    size: 'compact',
    open: false,
  },
};

/**
 * SizeStandard component
 * 
 * @returns JSX element
 */
export const SizeStandard: Story = {
  ...Default,
  args: {
    ...Default.args,
    size: 'standard',
    open: false,
  },
};

/**
 * SizeWide component
 * 
 * @returns JSX element
 */
export const SizeWide: Story = {
  ...Default,
  args: {
    ...Default.args,
    size: 'wide',
    open: false,
  },
};

/**
 * SizeAuto component
 * 
 * @returns JSX element
 */
export const SizeAuto: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ p: 2, minWidth: '200px' }}>
        <Typography variant="h6">Auto Size</Typography>
        <Typography variant="body2">
          This drawer automatically sizes to fit its content.
        </Typography>
      </Box>
    </DrawerWrapper>
  ),
  args: {
    ...Default.args,
    size: 'auto',
    open: false,
  },
};

// Animation variations
/**
 * AnimationSlide component
 * 
 * @returns JSX element
 */
export const AnimationSlide: Story = {
  ...Default,
  args: {
    ...Default.args,
    animation: 'slide',
    open: false,
  },
};

/**
 * AnimationFade component
 * 
 * @returns JSX element
 */
export const AnimationFade: Story = {
  ...Default,
  args: {
    ...Default.args,
    animation: 'fade',
    open: false,
  },
};

/**
 * AnimationScale component
 * 
 * @returns JSX element
 */
export const AnimationScale: Story = {
  ...Default,
  args: {
    ...Default.args,
    animation: 'scale',
    open: false,
  },
};

/**
 * AnimationNone component
 * 
 * @returns JSX element
 */
export const AnimationNone: Story = {
  ...Default,
  args: {
    ...Default.args,
    animation: 'none',
    open: false,
  },
};

// Complex drawer with header, navigation, and footer
/**
 * ComplexDrawer component
 * 
 * @returns JSX element
 */
export const ComplexDrawer: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Custom header */}
        <Box data-testid="drawer.stories" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box data-testid="drawer.stories" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
            <Box data-testid="drawer.stories">
              <Typography variant="subtitle2">John Doe</Typography>
              <Typography variant="caption" color="text.secondary">
                john.doe@example.com
              </Typography>
            </Box>
          </Box>
          <Chip label="Pro User" size="small" color="primary" />
        </Box>

        {/* Navigation */}
        <Box data-testid="drawer.stories" sx={{ flex: 1, overflow: 'auto' }}>
          <List>
            {navigationItems.slice(0, 3).map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton selected={index === 0}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          <Divider sx={{ my: 1 }} />
          
          <List>
            {navigationItems.slice(3).map((item, index) => (
              <ListItem key={index + 3} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {index === 2 && <Chip label="3" size="small" color="error" />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Footer */}
        <Box data-testid="drawer.stories" sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><span>💪</span></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    </DrawerWrapper>
  ),
  args: {
    variant: 'temporary',
    anchor: 'left',
    size: 'standard',
    open: false,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

// Mail drawer example
/**
 * MailDrawer component
 * 
 * @returns JSX element
 */
export const MailDrawer: Story = {
  render: (args) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
      main: true,
      labels: false,
    });

    const handleToggleSection = (section: string) => {
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section],
      }));
    };

    return (
      <DrawerWrapper {...args}>
        <List>
          {/* Main mail items */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggleSection('main')}>
              <ListItemIcon>
                {expandedSections.main ? <span>🔼</span> : <span>🔽</span>}
              </ListItemIcon>
              <ListItemText primary="Mail" />
            </ListItemButton>
          </ListItem>
          
          {expandedSections.main && (
            <List component="div" disablePadding>
              {mailItems.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={selectedIndex === index}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    {item.count && (
                      <Chip label={item.count} size="small" color="primary" />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}

          <Divider sx={{ my: 1 }} />

          {/* Labels section */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggleSection('labels')}>
              <ListItemIcon>
                {expandedSections.labels ? <span>🔼</span> : <span>🔽</span>}
              </ListItemIcon>
              <ListItemText primary="Labels" />
            </ListItemButton>
          </ListItem>
          
          {expandedSections.labels && (
            <List component="div" disablePadding>
              {['Important', 'Work', 'Personal', 'Travel'].map((label, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Box data-testid="drawer.stories"
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: ['error.main', 'warning.main', 'info.main', 'success.main'][index],
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </List>
      </DrawerWrapper>
    );
  },
  args: {
    variant: 'persistent',
    anchor: 'left',
    size: 'standard',
    open: false,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

// Mobile responsive drawer
/**
 * ResponsiveDrawer component
 * 
 * @returns JSX element
 */
export const ResponsiveDrawer: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Responsive Drawer
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This drawer adapts to different screen sizes. On mobile, it becomes a temporary drawer.
        </Typography>
        <List>
          {navigationItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </DrawerWrapper>
  ),
  args: {
    variant: 'persistent',
    anchor: 'left',
    size: 'standard',
    open: false,
    responsive: true,
    responsiveBreakpoint: 'md',
    mobileVariant: 'temporary',
    onClose: fn(),
    onCollapseChange: fn(),
  },
};

// Swipe gestures (mobile)
/**
 * SwipeGestures component
 * 
 * @returns JSX element
 */
export const SwipeGestures: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Swipe Gestures
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          On touch devices, you can swipe from the edge to open the drawer,
          and swipe the drawer to close it.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Try swiping from the left edge of the screen to open this drawer,
          or swipe the drawer to the left to close it.
        </Typography>
        <List sx={{ mt: 2 }}>
          {navigationItems.slice(0, 4).map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </DrawerWrapper>
  ),
  args: {
    variant: 'temporary',
    anchor: 'left',
    size: 'standard',
    open: false,
    swipeEnabled: true,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

// Fixed header and footer
/**
 * FixedHeaderFooter component
 * 
 * @returns JSX element
 */
export const FixedHeaderFooter: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Scrollable content */}
        <Box data-testid="drawer.stories" sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Scrollable Content
          </Typography>
          {Array.from({ length: 20 }, (_, index) => (
            <Typography key={index} variant="body2" sx={{ mb: 2 }}>
              This is item {index + 1}. The header and footer remain fixed while this content scrolls.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          ))}
        </Box>
      </Box>
    </DrawerWrapper>
  ),
  args: {
    variant: 'persistent',
    anchor: 'left',
    size: 'standard',
    open: false,
    fixedHeader: true,
    fixedFooter: true,
    header: (
      <Box data-testid="drawer.stories" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar>A</Avatar>
        <Typography variant="h6">Fixed Header</Typography>
      </Box>
    ),
    footer: (
      <Box data-testid="drawer.stories" sx={{ textAlign: 'center' }}>
        <Typography variant="caption">Fixed Footer</Typography>
      </Box>
    ),
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

// Accessibility features
/**
 * AccessibilityFeatures component
 * 
 * @returns JSX element
 */
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Accessibility Features
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This drawer includes comprehensive accessibility features:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary="Keyboard Navigation"
              secondary="Use Tab/Shift+Tab to navigate, Enter/Space to activate"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Focus Management"
              secondary="Automatic focus management when opening/closing"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Screen Reader Support"
              secondary="ARIA labels and roles for screen reader compatibility"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="High Contrast"
              secondary="Works with high contrast and dark mode themes"
            />
          </ListItem>
        </List>
      </Box>
    </DrawerWrapper>
  ),
  args: {
    variant: 'temporary',
    anchor: 'left',
    size: 'standard',
    open: false,
    'aria-label': 'Main navigation drawer',
    onClose: fn(),
    onCollapseChange: fn(),
  },
};

// Clean scrollbar-free drawer
/**
 * CleanNoScrollbar component
 * 
 * @returns JSX element
 */
export const CleanNoScrollbar: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Clean Drawer (No Scrollbar)
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This drawer hides scrollbars for a cleaner appearance while maintaining scrolling functionality.
        </Typography>
        <List>
          {navigationItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* Add extra content to test scrolling */}
        {Array.from({ length: 10 }, (_, i) => (
          <Typography key={i} variant="body2" sx={{ mb: 1 }}>
            Additional content item {i + 1} to test scrolling behavior.
          </Typography>
        ))}
      </Box>
    </DrawerWrapper>
  ),
  args: {
    variant: 'persistent',
    anchor: 'left',
    size: 'standard',
    open: false,
    hideScrollbar: true,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

// Primary header variant
/**
 * PrimaryHeader component
 * 
 * @returns JSX element
 */
export const PrimaryHeader: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Typography variant="h6" sx={{ color: 'inherit' }}>
        Dashboard
      </Typography>
      <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.8 }}>
        Welcome back, John!
      </Typography>
      <List sx={{ mt: 2 }}>
        {navigationItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerWrapper>
  ),
  args: {
    variant: 'persistent',
    anchor: 'left',
    size: 'standard',
    open: false,
    headerVariant: 'primary',
    header: true,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

// Gradient header variant
/**
 * GradientHeader component
 * 
 * @returns JSX element
 */
export const GradientHeader: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>A</Avatar>
        <Box data-testid="drawer.stories">
          <Typography variant="h6" sx={{ color: 'inherit', fontWeight: 600 }}>
            Modern App
          </Typography>
          <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.9 }}>
            Premium Experience
          </Typography>
        </Box>
      </Box>
      <List sx={{ mt: 2 }}>
        {navigationItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DrawerWrapper>
  ),
  args: {
    variant: 'persistent',
    anchor: 'left',
    size: 'standard',
    open: false,
    headerVariant: 'gradient',
    header: true,
    hideScrollbar: true,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

// No scroll variant
/**
 * NoScroll component
 * 
 * @returns JSX element
 */
export const NoScroll: Story = {
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Fixed Height Drawer
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This drawer has no scrolling - content is fixed within the available space.
        </Typography>
        <Box data-testid="drawer.stories" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <List>
            {navigationItems.slice(0, 4).map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box data-testid="drawer.stories" sx={{ mt: 'auto', p: 1, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Fixed layout content
            </Typography>
          </Box>
        </Box>
      </Box>
    </DrawerWrapper>
  ),
  args: {
    variant: 'persistent',
    anchor: 'left',
    size: 'standard',
    open: false,
    disableScroll: true,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};

// Dark mode
/**
 * DarkMode component
 * 
 * @returns JSX element
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => (
    <DrawerWrapper {...args}>
      <Box data-testid="drawer.stories" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Dark Mode Drawer
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          The drawer automatically adapts to dark mode with appropriate colors and contrast.
        </Typography>
        <List>
          {navigationItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton selected={index === 0}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </DrawerWrapper>
  ),
  args: {
    variant: 'persistent',
    anchor: 'left',
    size: 'standard',
    open: false,
    hideScrollbar: true,
    onClose: fn(),
    onCollapseChange: fn(),
    onOpened: fn(),
    onClosed: fn(),
  },
};