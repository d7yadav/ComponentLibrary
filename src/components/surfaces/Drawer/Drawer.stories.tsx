import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Box,
  Button,
  Divider,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Home,
  Settings,
  Person,
  Dashboard,
  Analytics,
  Notifications,
  Help,
  Logout,
  Menu,
  Close,
  ChevronLeft,
  Inbox,
  Drafts,
  Send,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from '@mui/icons-material';
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
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Sample navigation items
const navigationItems = [
  { icon: <Home />, text: 'Home', href: '/' },
  { icon: <Dashboard />, text: 'Dashboard', href: '/dashboard' },
  { icon: <Analytics />, text: 'Analytics', href: '/analytics' },
  { icon: <Person />, text: 'Profile', href: '/profile' },
  { icon: <Settings />, text: 'Settings', href: '/settings' },
  { icon: <Notifications />, text: 'Notifications', href: '/notifications' },
  { icon: <Help />, text: 'Help', href: '/help' },
];

const mailItems = [
  { icon: <Inbox />, text: 'Inbox', count: 4 },
  { icon: <Send />, text: 'Sent' },
  { icon: <Drafts />, text: 'Drafts', count: 2 },
  { icon: <StarBorder />, text: 'Starred' },
];

// Interactive wrapper for controlled stories
const DrawerWrapper = ({ children, ...props }: any) => {
  const [open, setOpen] = useState(props.open || false);
  const [collapsed, setCollapsed] = useState(props.collapsed || false);

  return (
    <Box data-testid="drawer.stories" sx={{ display: 'flex', minHeight: '100vh' }}>
      <Button
        variant="contained"
        onClick={() => setOpen(!open)}
        sx={{ position: 'fixed', top: 16, left: 16, zIndex: 2000 }}
      >
        {open ? 'Close' : 'Open'} Drawer
      </Button>
      <Drawer
        {...props}
        open={open}
        collapsed={collapsed}
        onClose={() => setOpen(false)}
        onCollapseChange={setCollapsed}
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
    open: true,
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
    open: true,
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
    
    return (
      <Box data-testid="drawer.stories" sx={{ display: 'flex', minHeight: '100vh' }}>
        <Drawer
          {...args}
          collapsed={collapsed}
          onCollapseChange={setCollapsed}
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
    open: true,
    showToggleButton: true,
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
    open: true,
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
    open: true,
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
    open: true,
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
    open: true,
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
    open: true,
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
    open: true,
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
    open: true,
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
    open: true,
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
              <ListItemIcon><Logout /></ListItemIcon>
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
                {expandedSections.main ? <ExpandLess /> : <ExpandMore />}
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
                {expandedSections.labels ? <ExpandLess /> : <ExpandMore />}
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
    open: true,
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
    open: true,
    responsive: true,
    responsiveBreakpoint: 'md',
    mobileVariant: 'temporary',
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
    open: true,
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
    open: true,
  },
};