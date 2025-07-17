/**
 * @fileoverview Tabs Component Stories
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Comprehensive Storybook stories showcasing all Tabs component variants,
 * states, and interactive behaviors for design system documentation.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Paper } from '@/components/surfaces/Paper';

import { Tabs } from './Tabs';

/**
 * Storybook meta configuration
 */
const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs', // Moved Tabs to the Navigation section to match Breadcrumbs
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Tabs Component

A comprehensive tabs component with full accessibility support, keyboard navigation, 
and responsive behavior. Built on Material-UI with enhanced features for enterprise applications.

## Features

- 🎯 **Accessibility First**: Full WCAG 2.1 AA compliance with keyboard navigation
- 📱 **Responsive Design**: Adaptive behavior across all screen sizes  
- ⚡ **Performance Optimized**: Memoized renders and efficient updates
- 🎨 **Flexible Styling**: Support for themes, variants, and custom styling
- 🔧 **Developer Friendly**: TypeScript support with comprehensive type definitions
- 🧪 **Test Ready**: Built-in test IDs and testing utilities

## Usage

\`\`\`tsx
import { Tabs } from '@dilip-design/mui-components';

const tabs = [
  { id: 'tab1', label: 'Home', content: <div>Home content</div> },
  { id: 'tab2', label: 'Search', content: <div>Search content</div> },
  { id: 'tab3', label: 'Settings', content: <div>Settings content</div> },
];

<Tabs tabs={tabs} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    tabs: {
      description: 'Array of tab data objects',
      control: { type: 'object' },
    },
    value: {
      description: 'Currently active tab value (controlled)',
      control: { type: 'text' },
    },
    defaultValue: {
      description: 'Default active tab value (uncontrolled)',
      control: { type: 'text' },
    },
    onChange: {
      description: 'Tab change event handler',
      action: 'changed',
    },
    orientation: {
      description: 'Tab orientation',
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      description: 'Tab variant behavior',
      control: { type: 'select' },
      options: ['standard', 'scrollable', 'fullWidth'],
    },
    indicatorColor: {
      description: 'Indicator color',
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    textColor: {
      description: 'Text color',
      control: { type: 'select' },
      options: ['inherit', 'primary', 'secondary'],
    },
    centered: {
      description: 'Whether tabs are centered',
      control: { type: 'boolean' },
    },
    scrollButtons: {
      description: 'Scroll button visibility',
      control: { type: 'select' },
      options: ['auto', 'desktop', 'on', 'off'],
    },
    showPanels: {
      description: 'Whether to show content panels',
      control: { type: 'boolean' },
    },
    disabled: {
      description: 'Whether component is disabled',
      control: { type: 'boolean' },
    },
    loading: {
      description: 'Loading state',
      control: { type: 'boolean' },
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content components
const SampleContent = ({ title, description }: { title: string; description: string }): JSX.Element => (
  <Box p={3}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {description}
    </Typography>
  </Box>
);

// Basic tab data
const basicTabs = [
  {
    id: 'home',
    label: 'Home',
    content: <SampleContent title="Home" description="Welcome to the home page with all your essential information." />,
  },
  {
    id: 'search',
    label: 'Search',
    content: <SampleContent title="Search" description="Find anything you need with our powerful search functionality." />,
  },
  {
    id: 'settings',
    label: 'Settings',
    content: <SampleContent title="Settings" description="Customize your experience with various configuration options." />,
  },
];

// Tabs with icons
const iconTabs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <span>📊</span>,
    content: <SampleContent title="Dashboard" description="Overview of your key metrics and activities." />,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <span>👤</span>,
    content: <SampleContent title="Profile" description="Manage your personal information and preferences." />,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <span>🔔</span>,
    content: <SampleContent title="Notifications" description="Stay updated with important alerts and messages." />,
  },
  {
    id: 'settings-icon',
    label: 'Settings',
    icon: <span>⚙️</span>,
    content: <SampleContent title="Settings" description="Configure application settings and preferences." />,
  },
];

// Many tabs for scrollable demo
const manyTabs = Array.from({ length: 12 }, (_, index) => ({
  id: `tab-${index + 1}`,
  label: `Tab ${index + 1}`,
  content: <SampleContent title={`Tab ${index + 1}`} description={`This is the content for tab number ${index + 1}.`} />,
}));

// Stories

/**
 * Default tabs with basic configuration
 */
export const Default: Story = {
  args: {
    tabs: basicTabs,
    'data-testid': 'default-tabs',
  },
};

/**
 * Tabs with icons for enhanced visual appeal
 */
export const WithIcons: Story = {
  args: {
    tabs: iconTabs,
    'data-testid': 'icon-tabs',
  },
};

/**
 * Vertical orientation for sidebar-style navigation
 */
export const Vertical: Story = {
  args: {
    tabs: iconTabs,
    orientation: 'vertical',
    'data-testid': 'vertical-tabs',
  },
  decorators: [
    (Story): JSX.Element => (
      <Box sx={{ display: 'flex', width: 600, height: 400 }}>
        <Story />
      </Box>
    ),
  ],
};

/**
 * Scrollable tabs for handling many tab items
 */
export const Scrollable: Story = {
  args: {
    tabs: manyTabs,
    variant: 'scrollable',
    scrollButtons: 'auto',
    'data-testid': 'scrollable-tabs',
  },
};

/**
 * Full width tabs that expand to fill container
 */
export const FullWidth: Story = {
  args: {
    tabs: basicTabs,
    variant: 'fullWidth',
    'data-testid': 'fullwidth-tabs',
  },
};

/**
 * Centered tabs for symmetric layouts
 */
export const Centered: Story = {
  args: {
    tabs: basicTabs,
    centered: true,
    'data-testid': 'centered-tabs',
  },
};

/**
 * Secondary color indicator
 */
export const SecondaryColor: Story = {
  args: {
    tabs: iconTabs,
    indicatorColor: 'secondary',
    textColor: 'secondary',
    'data-testid': 'secondary-tabs',
  },
};

/**
 * Tabs with some disabled options
 */
export const WithDisabled: Story = {
  args: {
    tabs: [
      ...basicTabs.slice(0, 1),
      {
        id: 'disabled',
        label: 'Disabled',
        disabled: true,
        content: <SampleContent title="Disabled" description="This tab is disabled and cannot be selected." />,
      },
      ...basicTabs.slice(1),
    ],
    'data-testid': 'disabled-tabs',
  },
};

/**
 * Loading state demonstration
 */
export const Loading: Story = {
  args: {
    tabs: basicTabs,
    loading: true,
    'data-testid': 'loading-tabs',
  },
};

/**
 * Tabs without content panels (navigation only)
 */
export const NavigationOnly: Story = {
  args: {
    tabs: basicTabs,
    showPanels: false,
    'data-testid': 'navigation-tabs',
  },
};

/**
 * Controlled tabs with external state
 */
export const Controlled: Story = {
  args: {
    tabs: basicTabs,
    value: 'search',
    'data-testid': 'controlled-tabs',
  },
};

/**
 * Complex content panels with rich media
 */
export const ComplexContent: Story = {
  args: {
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <Paper elevation={1} sx={{ p: 3, m: 2 }}>
            <Typography variant="h5" gutterBottom>
              Project Overview
            </Typography>
            <Typography variant="body1" paragraph>
              This comprehensive dashboard provides insights into your project&apos;s progress,
              team performance, and key metrics that matter most to your success.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Paper elevation={2} sx={{ p: 2, flex: 1 }}>
                <Typography variant="h6" color="primary">
                  Active Tasks
                </Typography>
                <Typography variant="h4">24</Typography>
              </Paper>
              <Paper elevation={2} sx={{ p: 2, flex: 1 }}>
                <Typography variant="h6" color="secondary">
                  Completed
                </Typography>
                <Typography variant="h4">156</Typography>
              </Paper>
            </Box>
          </Paper>
        ),
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: <span>🔍</span>,
        content: (
          <Paper elevation={1} sx={{ p: 3, m: 2 }}>
            <Typography variant="h5" gutterBottom>
              Analytics Dashboard
            </Typography>
            <Typography variant="body1">
              Detailed analytics and reporting features would be displayed here,
              including charts, graphs, and performance metrics.
            </Typography>
          </Paper>
        ),
      },
      {
        id: 'team',
        label: 'Team',
        icon: <span>👤</span>,
        content: (
          <Paper elevation={1} sx={{ p: 3, m: 2 }}>
            <Typography variant="h5" gutterBottom>
              Team Management
            </Typography>
            <Typography variant="body1">
              Manage your team members, roles, permissions, and collaboration settings
              from this centralized location.
            </Typography>
          </Paper>
        ),
      },
    ],
    'data-testid': 'complex-tabs',
  },
};

/**
 * Responsive tabs demonstration
 */
export const Responsive: Story = {
  args: {
    tabs: manyTabs.slice(0, 6),
    variant: 'scrollable',
    allowScrollButtonsMobile: true,
    'data-testid': 'responsive-tabs',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Accessibility demonstration
 */
export const Accessibility: Story = {
  args: {
    tabs: iconTabs.map(tab => ({
      ...tab,
      'aria-label': `Navigate to ${tab.label} section`,
    })),
    'aria-label': 'Main navigation tabs',
    'data-testid': 'accessible-tabs',
  },
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates accessibility features:
- Proper ARIA labels and roles
- Keyboard navigation support (Arrow keys, Home, End)
- Screen reader compatible
- Focus management
        `,
      },
    },
  },
};