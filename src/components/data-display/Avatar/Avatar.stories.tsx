import { Person, AccountCircle } from '@mui/icons-material';
import { Stack } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Avatar component displays a user image, initials, or fallback icon. Supports multiple variants (circular, rounded, square) and sizes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
      description: 'Avatar shape variant'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Avatar size'
    },
    src: {
      control: 'text',
      description: 'Image source URL'
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility'
    },
    children: {
      control: 'text',
      description: 'Children content (initials, icon, etc.)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Default Avatar with image
 */
export const Default: Story = {
  args: {
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    alt: 'John Doe',
    variant: 'circular',
    size: 'medium',
  },
};

/**
 * Avatar Variants - Different shapes
 */
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Circular"
        variant="circular"
        size="medium"
      />
      <Avatar
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Rounded"
        variant="rounded"
        size="medium"
      />
      <Avatar
        src="https://randomuser.me/api/portraits/men/65.jpg"
        alt="Square"
        variant="square"
        size="medium"
      />
    </Stack>
  ),
};

/**
 * Avatar Sizes - Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Small"
        size="small"
      />
      <Avatar
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Medium"
        size="medium"
      />
      <Avatar
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Large"
        size="large"
      />
    </Stack>
  ),
};

/**
 * Avatar States - With initials, icons, and fallbacks
 */
export const States: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar alt="John Doe" size="medium">
        JD
      </Avatar>
      <Avatar alt="Jane Smith" size="medium">
        <Person />
      </Avatar>
      <Avatar alt="Error Image" src="invalid-url" size="medium" />
      <Avatar alt="Account" size="medium">
        <AccountCircle />
      </Avatar>
    </Stack>
  ),
};

/**
 * Avatar Theme - Light and dark theme compatibility
 */
export const Theme: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Image Avatar"
        size="medium"
      />
      <Avatar alt="John Doe" size="medium">
        JD
      </Avatar>
      <Avatar alt="Icon Avatar" size="medium">
        <Person />
      </Avatar>
    </Stack>
  ),
};

/**
 * Avatar Accessibility - Focus and keyboard navigation
 */
export const Accessibility: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Focusable avatar with image"
        size="medium"
        tabIndex={0}
      />
      <Avatar alt="Focusable avatar with initials" size="medium" tabIndex={0}>
        AB
      </Avatar>
      <Avatar alt="Focusable avatar with icon" size="medium" tabIndex={0}>
        <Person />
      </Avatar>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars are focusable and include proper ARIA labels for screen readers.'
      }
    }
  }
}; 