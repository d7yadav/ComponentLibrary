// TODO: Replace MUI icons with internal icon wrappers when available
import {
  ArrowForward,
  Delete,
  Description,
  Edit,
  Folder,
  MoreVert,
  Notifications,
  Person,
  Settings
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Avatar } from '@/components/data-display/Avatar';
import { Typography } from '@/components/data-display/Typography';
import { IconButton } from '@/components/core/IconButton';
import { Checkbox } from '@/components/forms/Checkbox';
import { Switch } from '@/components/forms/Switch';
import { Stack } from '@/components/layout/Stack';

import { ListItem } from './ListItem';

/**
 * Storybook stories for the ListItem component.
 * Demonstrates usage for individual list items with consistent styling and accessibility.
 * @author dilip.yadav@shorelineiot.com
 */
const meta: Meta<typeof ListItem> = {
  title: 'Surfaces/ListItem',
  component: ListItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ListItem component represents a single item in a list. Supports various configurations including icons, text, actions, and interactive states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    button: {
      control: 'boolean',
      description: 'If true, the list item will be a button (using ButtonBase).'
    },
    selected: {
      control: 'boolean',
      description: 'If true, the list item will be selected.'
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the list item will be disabled.'
    },
    dense: {
      control: 'boolean',
      description: 'If true, compact vertical padding designed for keyboard and mouse input is used.'
    },
    disableGutters: {
      control: 'boolean',
      description: 'If true, the left and right padding is removed.'
    },
    divider: {
      control: 'boolean',
      description: 'If true, a 1px light border is added to the bottom of the list item.'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ListItem>;

/**
 * Default ListItem - Basic usage
 */
export const Default: Story = {
  render: (args) => (
    <ListItem {...args}>
      <div style={{ padding: '8px 0' }}>Basic List Item</div>
    </ListItem>
  ),
};

/**
 * ListItem Variants - Different styles
 */
export const Variants: Story = {
  render: () => (
    <Stack spacing={2}>
      <div>
        <Typography variant="h6" gutterBottom>Basic</Typography>
        <ListItem>
          <div style={{ padding: '8px 0' }}>Basic List Item</div>
        </ListItem>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>Button</Typography>
        <ListItem button>
          <div style={{ padding: '8px 0' }}>Clickable List Item</div>
        </ListItem>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>With Divider</Typography>
        <ListItem divider>
          <div style={{ padding: '8px 0' }}>List Item with Divider</div>
        </ListItem>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>Dense</Typography>
        <ListItem dense>
          <div style={{ padding: '4px 0' }}>Dense List Item</div>
        </ListItem>
      </div>
    </Stack>
  ),
};

/**
 * ListItem Sizes - Different densities
 */
export const Sizes: Story = {
  render: () => (
    <Stack spacing={2}>
      <div>
        <Typography variant="h6" gutterBottom>Regular</Typography>
        <ListItem>
          <div style={{ padding: '12px 0', display: 'flex', alignItems: 'center' }}>
            <Person style={{ marginRight: 16 }} />
            <div>
              <div>John Doe</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Software Engineer</div>
            </div>
          </div>
        </ListItem>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>Dense</Typography>
        <ListItem dense>
          <div style={{ padding: '6px 0', display: 'flex', alignItems: 'center' }}>
            <Person style={{ marginRight: 16 }} />
            <div>
              <div>John Doe</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Software Engineer</div>
            </div>
          </div>
        </ListItem>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>No Gutters</Typography>
        <ListItem disableGutters>
          <div style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
            <Person style={{ marginRight: 16 }} />
            <div>John Doe - No Gutters</div>
          </div>
        </ListItem>
      </div>
    </Stack>
  ),
};

/**
 * ListItem States - Different interactive states
 */
export const States: Story = {
  render: () => (
    <Stack spacing={2}>
      <div>
        <Typography variant="h6" gutterBottom>Basic States</Typography>
        <Stack spacing={1}>
          <ListItem>
            <div style={{ padding: '8px 0' }}>Normal State</div>
          </ListItem>
          <ListItem selected>
            <div style={{ padding: '8px 0' }}>Selected State</div>
          </ListItem>
          <ListItem disabled>
            <div style={{ padding: '8px 0' }}>Disabled State</div>
          </ListItem>
        </Stack>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>Interactive States</Typography>
        <Stack spacing={1}>
          <ListItem button>
            <div style={{ padding: '8px 0' }}>Clickable Item</div>
          </ListItem>
          <ListItem button selected>
            <div style={{ padding: '8px 0' }}>Selected Clickable Item</div>
          </ListItem>
          <ListItem button disabled>
            <div style={{ padding: '8px 0' }}>Disabled Clickable Item</div>
          </ListItem>
        </Stack>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>With Actions</Typography>
        <Stack spacing={1}>
          <ListItem>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Folder style={{ marginRight: 16 }} />
                <div>Documents</div>
              </div>
              <IconButton size="small" aria-label="More options">
                <MoreVert />
              </IconButton>
            </div>
          </ListItem>
          <ListItem>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Description style={{ marginRight: 16 }} />
                <div>Report.pdf</div>
              </div>
              <div>
                <IconButton size="small" aria-label="Edit item">
                  <Edit />
                </IconButton>
                <IconButton size="small" aria-label="Delete item">
                  <Delete />
                </IconButton>
              </div>
            </div>
          </ListItem>
        </Stack>
      </div>
    </Stack>
  ),
};

/**
 * ListItem Theme - Light and dark theme compatibility
 */
export const Theme: Story = {
  render: () => (
    <Stack spacing={2}>
      <div>
        <Typography variant="h6" gutterBottom>Contact Items</Typography>
        <Stack spacing={1}>
          <ListItem>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '8px 0' }}>
              <Avatar style={{ marginRight: 16 }}>
                <Person />
              </Avatar>
              <div style={{ flex: 1 }}>
                <div>John Doe</div>
                <div style={{ fontSize: '14px', color: '#666' }}>john.doe@example.com</div>
              </div>
              <Switch />
            </div>
          </ListItem>
          <ListItem>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '8px 0' }}>
              <Avatar style={{ marginRight: 16 }}>
                <Person />
              </Avatar>
              <div style={{ flex: 1 }}>
                <div>Jane Smith</div>
                <div style={{ fontSize: '14px', color: '#666' }}>jane.smith@example.com</div>
              </div>
              <Checkbox />
            </div>
          </ListItem>
        </Stack>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>Navigation Items</Typography>
        <Stack spacing={1}>
          <ListItem button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Settings style={{ marginRight: 16 }} />
                <div>Settings</div>
              </div>
              <ArrowForward />
            </div>
          </ListItem>
          <ListItem button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Notifications style={{ marginRight: 16 }} />
                <div>Notifications</div>
              </div>
              <ArrowForward />
            </div>
          </ListItem>
        </Stack>
      </div>
    </Stack>
  ),
};

/**
 * ListItem Accessibility - Screen reader and keyboard navigation
 */
export const Accessibility: Story = {
  render: () => (
    <Stack spacing={2}>
      <div>
        <Typography variant="h6" gutterBottom>Accessible Menu Items</Typography>
        <Stack spacing={1}>
          <ListItem 
            button 
            role="menuitem" 
            aria-label="Settings menu item"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && alert('Settings selected')}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
              <Settings style={{ marginRight: 16 }} />
              <div>Settings</div>
            </div>
          </ListItem>
          <ListItem 
            button 
            role="menuitem" 
            aria-label="Notifications menu item"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && alert('Notifications selected')}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
              <Notifications style={{ marginRight: 16 }} />
              <div>Notifications</div>
            </div>
          </ListItem>
        </Stack>
      </div>
      
      <div>
        <Typography variant="h6" gutterBottom>Selectable Items</Typography>
        <Stack spacing={1}>
          <ListItem 
            button 
            role="option" 
            aria-selected={false}
            aria-label="Option 1"
            tabIndex={0}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
              <Checkbox />
              <div style={{ marginLeft: 8 }}>Option 1</div>
            </div>
          </ListItem>
          <ListItem 
            button 
            role="option" 
            aria-selected={true}
            aria-label="Option 2 (selected)"
            tabIndex={0}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
              <Checkbox checked />
              <div style={{ marginLeft: 8 }}>Option 2</div>
            </div>
          </ListItem>
        </Stack>
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ListItems support proper ARIA attributes for screen readers and keyboard navigation. Use appropriate roles and labels for different use cases.'
      }
    }
  }
};