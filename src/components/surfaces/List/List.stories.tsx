import { Person, Email, Phone, Settings, Notifications } from '@mui/icons-material';
import { Stack, Typography, Avatar, ListItemText, Divider, Chip } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { List } from './List';

/**
 * Storybook stories for the List component.
 * Demonstrates usage for grouping list items with consistent spacing and accessibility.
 * @author dilip.yadav@shorelineiot.com
 */
const meta: Meta<typeof List> = {
  title: 'Surfaces/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'List component provides a flexible container for displaying a series of items. Supports various layouts, densities, and accessibility features.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    dense: {
      control: 'boolean',
      description: 'If true, compact vertical padding designed for keyboard and mouse input is used.'
    },
    disablePadding: {
      control: 'boolean',
      description: 'If true, vertical padding is removed from the list.'
    },
    subheader: {
      control: 'text',
      description: 'The content of the subheader, normally a ListSubheader.'
    }
  }
};

export default meta;
type Story = StoryObj<typeof List>;

/**
 * Default List - Basic usage
 */
export const Default: Story = {
  render: (args) => (
    <List {...args}>
      <li>
        <div style={{ padding: '8px 16px' }}>Inbox</div>
      </li>
      <li>
        <div style={{ padding: '8px 16px' }}>Drafts</div>
      </li>
      <li>
        <div style={{ padding: '8px 16px' }}>Sent Mail</div>
      </li>
      <li>
        <div style={{ padding: '8px 16px' }}>Spam</div>
      </li>
    </List>
  ),
};

/**
 * List Variants - Different list styles
 */
export const Variants: Story = {
  render: () => (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6" gutterBottom>Basic List</Typography>
        <List>
          <li style={{ padding: '8px 16px' }}>Item 1</li>
          <li style={{ padding: '8px 16px' }}>Item 2</li>
          <li style={{ padding: '8px 16px' }}>Item 3</li>
        </List>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>Dense List</Typography>
        <List dense>
          <li style={{ padding: '4px 16px' }}>Dense Item 1</li>
          <li style={{ padding: '4px 16px' }}>Dense Item 2</li>
          <li style={{ padding: '4px 16px' }}>Dense Item 3</li>
        </List>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>No Padding List</Typography>
        <List disablePadding>
          <li style={{ padding: '8px 0' }}>No Padding Item 1</li>
          <li style={{ padding: '8px 0' }}>No Padding Item 2</li>
          <li style={{ padding: '8px 0' }}>No Padding Item 3</li>
        </List>
      </div>
    </Stack>
  ),
};

/**
 * List Sizes - Different densities
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      <div>
        <Typography variant="h6" gutterBottom>Regular</Typography>
        <List>
          <li style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
            <Person style={{ marginRight: 16 }} />
            <div>
              <div>John Doe</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Software Engineer</div>
            </div>
          </li>
          <li style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
            <Email style={{ marginRight: 16 }} />
            <div>
              <div>jane.smith@example.com</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Designer</div>
            </div>
          </li>
        </List>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>Dense</Typography>
        <List dense>
          <li style={{ padding: '6px 16px', display: 'flex', alignItems: 'center' }}>
            <Person style={{ marginRight: 16 }} />
            <div>
              <div>John Doe</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Software Engineer</div>
            </div>
          </li>
          <li style={{ padding: '6px 16px', display: 'flex', alignItems: 'center' }}>
            <Email style={{ marginRight: 16 }} />
            <div>
              <div>jane.smith@example.com</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Designer</div>
            </div>
          </li>
        </List>
      </div>
    </Stack>
  ),
};

/**
 * List States - Different interactive states
 */
export const States: Story = {
  render: () => (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6" gutterBottom>Basic Items</Typography>
        <List>
          <li style={{ padding: '8px 16px' }}>Normal Item</li>
          <li style={{ padding: '8px 16px' }}>Another Item</li>
        </List>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>Interactive Items</Typography>
        <List>
          <li style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={() => alert('Clicked!')}>
            Clickable Item
          </li>
          <li style={{ padding: '8px 16px', cursor: 'pointer' }} onClick={() => alert('Clicked!')}>
            Another Clickable Item
          </li>
        </List>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>With Dividers</Typography>
        <List>
          <li style={{ padding: '8px 16px' }}>Item 1</li>
          <Divider />
          <li style={{ padding: '8px 16px' }}>Item 2</li>
          <Divider />
          <li style={{ padding: '8px 16px' }}>Item 3</li>
        </List>
      </div>
    </Stack>
  ),
};

/**
 * List Theme - Light and dark theme compatibility
 */
export const Theme: Story = {
  render: () => (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6" gutterBottom>Contact List</Typography>
        <List>
          <li style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ marginRight: 16 }}>
              <Person />
            </Avatar>
            <div style={{ flex: 1 }}>
              <div>John Doe</div>
              <div style={{ fontSize: '14px', color: '#666' }}>john.doe@example.com</div>
            </div>
            <Chip label="Online" color="success" size="small" />
          </li>
          <li style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ marginRight: 16 }}>
              <Person />
            </Avatar>
            <div style={{ flex: 1 }}>
              <div>Jane Smith</div>
              <div style={{ fontSize: '14px', color: '#666' }}>jane.smith@example.com</div>
            </div>
            <Chip label="Away" color="warning" size="small" />
          </li>
          <li style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ marginRight: 16 }}>
              <Person />
            </Avatar>
            <div style={{ flex: 1 }}>
              <div>Bob Johnson</div>
              <div style={{ fontSize: '14px', color: '#666' }}>bob.johnson@example.com</div>
            </div>
            <Chip label="Offline" color="default" size="small" />
          </li>
        </List>
      </div>
    </Stack>
  ),
};

/**
 * List Accessibility - Screen reader and keyboard navigation
 */
export const Accessibility: Story = {
  render: () => (
    <div>
      <Typography variant="h6" gutterBottom>Accessible Navigation List</Typography>
      <List role="navigation" aria-label="Main navigation">
        <li 
          role="menuitem" 
          style={{ padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && alert('Settings')}
        >
          <Settings style={{ marginRight: 16 }} />
          Settings
        </li>
        <li 
          role="menuitem" 
          style={{ padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && alert('Notifications')}
        >
          <Notifications style={{ marginRight: 16 }} />
          Notifications
        </li>
        <li 
          role="menuitem" 
          style={{ padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && alert('Profile')}
        >
          <Person style={{ marginRight: 16 }} />
          Profile
        </li>
      </List>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lists support proper ARIA attributes for screen readers and keyboard navigation.'
      }
    }
  }
};