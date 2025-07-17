/**
 * @fileoverview Breadcrumbs Component Stories
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Storybook stories for the Breadcrumbs component showcasing all variants,
 * states, and interactive behaviors with comprehensive examples.
 */

// TODO: Replace with internal icon wrappers when available
// import { 
//   Home, 
//   Category, 
//   ShoppingCart, 
//   Person, 
//   Settings,
//   Folder,
//   Description,
//   Dashboard,
//   BusinessCenter,
//   School,
// } from '@mui/icons-material';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Breadcrumbs } from './Breadcrumbs';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A breadcrumbs component that provides navigation hierarchy with collapse functionality.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items to display'
    },
    separator: {
      control: { type: 'select' },
      options: ['slash', 'chevron', 'arrow', 'dot', 'custom'],
      description: 'Separator style between breadcrumbs'
    },
    maxItems: {
      control: { type: 'number', min: 2, max: 20 },
      description: 'Maximum number of items before collapsing'
    },
    itemsAfterCollapse: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of items to show after collapse'
    },
    itemsBeforeCollapse: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of items to show before collapse'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the breadcrumbs'
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'text', 'contained'],
      description: 'Visual variant of the breadcrumbs'
    },
    expandOnClick: {
      control: 'boolean',
      description: 'Whether to expand collapsed items on click'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the breadcrumbs are disabled'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// Sample breadcrumb data
const basicItems = [
  { id: '1', label: 'Home', href: '/', icon: <span>🏠</span> },
  { id: '2', label: 'Category', href: '/category', icon: <span>📂</span> },
  { id: '3', label: 'Product', current: true }
];

const longItems = [
  { id: '1', label: 'Home', href: '/', icon: <span>🏠</span> },
  { id: '2', label: 'Dashboard', href: '/dashboard', icon: <span>📊</span> },
  { id: '3', label: 'Projects', href: '/projects', icon: <span>💼</span> },
  { id: '4', label: 'Web Application', href: '/projects/web-app' },
  { id: '5', label: 'Components', href: '/projects/web-app/components' },
  { id: '6', label: 'Navigation', href: '/projects/web-app/components/navigation' },
  { id: '7', label: 'Breadcrumbs', current: true }
];

// Basic Stories
export const Default: Story = {
  args: {
    items: basicItems,
  }
};

export const WithChevronSeparator: Story = {
  args: {
    items: basicItems,
    separator: 'chevron',
  }
};

export const WithArrowSeparator: Story = {
  args: {
    items: basicItems,
    separator: 'arrow',
  }
};

export const WithDotSeparator: Story = {
  args: {
    items: basicItems,
    separator: 'dot',
  }
};

// Size Variations
export const SmallSize: Story = {
  args: {
    items: basicItems,
    size: 'small',
  }
};

export const MediumSize: Story = {
  args: {
    items: basicItems,
    size: 'medium',
  }
};

export const LargeSize: Story = {
  args: {
    items: basicItems,
    size: 'large',
  }
};

// Variant Styles
export const StandardVariant: Story = {
  args: {
    items: basicItems,
    variant: 'standard',
  }
};

export const TextVariant: Story = {
  args: {
    items: basicItems,
    variant: 'text',
  }
};

export const ContainedVariant: Story = {
  args: {
    items: basicItems,
    variant: 'contained',
  }
};

// Collapse Functionality
export const CollapsedBreadcrumbs: Story = {
  args: {
    items: longItems,
    maxItems: 4,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
    expandOnClick: true,
  }
};

export const AlwaysExpanded: Story = {
  args: {
    items: longItems,
    expandOnClick: false,
  }
};

export const CustomCollapseConfig: Story = {
  args: {
    items: longItems,
    maxItems: 5,
    itemsBeforeCollapse: 2,
    itemsAfterCollapse: 2,
    expandOnClick: true,
  }
};

// Interactive Examples
export const WithClickHandlers: Story = {
  args: {
    items: [
      { 
        id: '1', 
        label: 'Home', 
        onClick: action('Navigate to Home'),
        icon: <span>🏠</span> 
      },
      { 
        id: '2', 
        label: 'Products', 
        onClick: action('Navigate to Products'),
        icon: <span>🛒</span> 
      },
      { 
        id: '3', 
        label: 'Electronics', 
        onClick: action('Navigate to Electronics') 
      },
      { 
        id: '4', 
        label: 'Smartphones', 
        current: true 
      }
    ],
  }
};

export const MixedLinksAndButtons: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', href: '/', icon: <span>🏠</span> },
      { id: '2', label: 'Profile', onClick: action('Open Profile'), icon: <span>👤</span> },
      { id: '3', label: 'Settings', href: '/settings', icon: <span>⚙️</span> },
      { id: '4', label: 'Privacy', current: true }
    ],
  }
};

// States
export const DisabledBreadcrumbs: Story = {
  args: {
    items: basicItems,
    disabled: true,
  }
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: '1', label: 'Home', href: '/', icon: <span>🏠</span> },
      { id: '2', label: 'Restricted Area', disabled: true, icon: <span>⚙️</span> },
      { id: '3', label: 'Current Page', current: true }
    ],
  }
};

// Complex Examples
export const FileSystemNavigation: Story = {
  args: {
    items: [
      { id: '1', label: 'Root', href: '/', icon: <span>📁</span> },
      { id: '2', label: 'Documents', href: '/documents', icon: <span>📁</span> },
      { id: '3', label: 'Projects', href: '/documents/projects', icon: <span>📁</span> },
      { id: '4', label: 'Website', href: '/documents/projects/website', icon: <span>📁</span> },
      { id: '5', label: 'index.html', current: true, icon: <span>📄</span> }
    ],
    separator: 'slash',
  }
};

export const EcommerceCatalog: Story = {
  args: {
    items: [
      { id: '1', label: 'Store', href: '/', icon: <span>🏠</span> },
      { id: '2', label: 'Electronics', href: '/electronics', icon: <span>📂</span> },
      { id: '3', label: 'Computers', href: '/electronics/computers' },
      { id: '4', label: 'Laptops', href: '/electronics/computers/laptops' },
      { id: '5', label: 'Gaming Laptops', href: '/electronics/computers/laptops/gaming' },
      { id: '6', label: 'High Performance Gaming Laptop Model XYZ-2024', current: true }
    ],
    maxItems: 4,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 2,
    separator: 'chevron',
    variant: 'contained',
  }
};

export const EducationalPlatform: Story = {
  args: {
    items: [
      { id: '1', label: 'Learning Platform', href: '/', icon: <span>🏫</span> },
      { id: '2', label: 'Computer Science', href: '/courses/computer-science' },
      { id: '3', label: 'Web Development', href: '/courses/computer-science/web-dev' },
      { id: '4', label: 'React Course', href: '/courses/computer-science/web-dev/react' },
      { id: '5', label: 'Components', href: '/courses/computer-science/web-dev/react/components' },
      { id: '6', label: 'Advanced Patterns', current: true }
    ],
    size: 'large',
    variant: 'text',
    separator: 'arrow',
  }
};

// Responsive Example
export const ResponsiveBreadcrumbs: Story = {
  args: {
    items: longItems,
    maxItems: 3,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Accessibility Example
export const AccessibilityExample: Story = {
  args: {
    items: [
      { 
        id: '1', 
        label: 'Home', 
        href: '/', 
        'aria-label': 'Navigate to homepage',
        icon: <span>🏠</span> 
      },
      { 
        id: '2', 
        label: 'Products', 
        href: '/products',
        'aria-label': 'Browse product catalog'
      },
      { 
        id: '3', 
        label: 'Current Product', 
        current: true,
        'aria-label': 'Currently viewing product details'
      }
    ],
    'aria-label': 'Product navigation breadcrumbs',
  }
};

// Custom Separator Example
export const CustomSeparator: Story = {
  args: {
    items: basicItems,
    separator: <span style={{ margin: '0 8px', color: '#666' }}>|</span>,
  }
};