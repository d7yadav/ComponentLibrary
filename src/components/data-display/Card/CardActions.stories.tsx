import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Button } from '@/components/core/Button';
import { IconButton } from '@/components/core/IconButton'; // Replaced MUI IconButton with internal wrapper as per migration guidelines
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

import { CardActions } from './CardActions';
import { Card, CardContent } from './index';


/**
 * CardActions provides a convenient way to group actions at the bottom of a Card.
 * It handles proper spacing, alignment, and responsive behavior for action elements.
 * 
 * ## Features
 * - Automatic spacing between action elements
 * - Right and left alignment options
 * - Responsive behavior on mobile devices
 * - Support for buttons, icon buttons, and custom elements
 * - Proper accessibility support
 * - Dark theme compatibility
 */
const meta: Meta<typeof CardActions> = {
  title: 'Data Display/Card/CardActions',
  component: CardActions,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card actions component for grouping action elements at the bottom of cards.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disableSpacing: {
      control: 'boolean',
      description: 'If true, the actions do not have additional margin',
    },
    children: {
      control: false,
      description: 'The action elements to display',
    },
  },
  decorators: [
    (Story) => (
      <Box maxWidth={400}>
        <Card>
          <CardContent>
            <h3>Sample Card</h3>
            <p>This card demonstrates the CardActions component with various action configurations.</p>
          </CardContent>
          <Story />
        </Card>
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    children: (
      <>
        <Button size="small">Learn More</Button>
        <Button size="small" variant="outline">Share</Button>
      </>
    ),
  
    onClick: fn(),
  },
};

// ===== VARIANT STORIES =====
export const ButtonVariants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Primary Actions</h4>
          <p>Card with primary action buttons.</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary">Accept</Button>
          <Button size="small" variant="secondary">Decline</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Text Actions</h4>
          <p>Card with text-style action buttons.</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="text">Read More</Button>
          <Button size="small" variant="text">Share</Button>
          <Button size="small" variant="text">Save</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Outline Actions</h4>
          <p>Card with outlined action buttons.</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outline">Edit</Button>
          <Button size="small" variant="outline">Delete</Button>
        </CardActions>
      </Card>
    </Stack>
  ),
};

export const IconActions: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Icon Buttons</h4>
          <p>Card with icon-only action buttons.</p>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites" onClick={fn()}>
            <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
          </IconButton>
          <IconButton aria-label="share" onClick={fn()}>
            <span> {/* TODO: Replace with Share icon wrapper */}</span>
          </IconButton>
          <IconButton aria-label="more actions" onClick={fn()}>
            <span> {/* TODO: Replace with MoreVert icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Mixed Actions</h4>
          <p>Card with both buttons and icon buttons.</p>
        </CardContent>
        <CardActions>
          <Button size="small">View Details</Button>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton aria-label="add to favorites" onClick={fn()}>
              <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
            </IconButton>
            <IconButton aria-label="share" onClick={fn()}>
              <span> {/* TODO: Replace with Share icon wrapper */}</span>
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Stack>
  ),
};

export const AlignmentOptions: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Left Aligned (Default)</h4>
          <p>Actions aligned to the left side.</p>
        </CardContent>
        <CardActions>
          <Button size="small">Action 1</Button>
          <Button size="small">Action 2</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Right Aligned</h4>
          <p>Actions aligned to the right side.</p>
        </CardContent>
        <CardActions align="right">
          <Button size="small">Cancel</Button>
          <Button size="small" variant="primary">Save</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Center Aligned</h4>
          <p>Actions centered in the card.</p>
        </CardContent>
        <CardActions align="center">
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Space Between</h4>
          <p>Actions with space between them.</p>
        </CardContent>
        <CardActions align="space-between">
          <Button size="small" variant="text">Skip</Button>
          <Button size="small" variant="primary">Continue</Button>
        </CardActions>
      </Card>
    </Stack>
  ),
};

// ===== SPACING STORIES =====
export const SpacingVariants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Default Spacing</h4>
          <p>Card actions with default spacing.</p>
        </CardContent>
        <CardActions>
          <Button size="small">Action 1</Button>
          <Button size="small">Action 2</Button>
          <Button size="small">Action 3</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>No Spacing</h4>
          <p>Card actions without additional margin.</p>
        </CardContent>
        <CardActions disableSpacing>
          <Button size="small">Action 1</Button>
          <Button size="small">Action 2</Button>
          <Button size="small">Action 3</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Custom Spacing</h4>
          <p>Card actions with custom spacing.</p>
        </CardContent>
        <CardActions sx={{ gap: 2 }}>
          <Button size="small">Action 1</Button>
          <Button size="small">Action 2</Button>
          <Button size="small">Action 3</Button>
        </CardActions>
      </Card>
    </Stack>
  ),
};

// ===== INTERACTIVE STORIES =====
export const InteractiveActions: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Shopping Cart Item</h4>
          <p>Wireless Bluetooth Headphones - $99.99</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outline" onClick={fn()}>
            Remove
          </Button>
          <Button size="small" variant="text" onClick={fn()}>
            Save for Later
          </Button>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton aria-label="add to favorites" onClick={fn()}>
              <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
            </IconButton>
          </Box>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Social Media Post</h4>
          <p>Check out this amazing sunset photo from my vacation!</p>
        </CardContent>
        <CardActions>
          <IconButton aria-label="like post" onClick={fn()}>
            <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
          </IconButton>
          <IconButton aria-label="share post" onClick={fn()}>
            <span> {/* TODO: Replace with Share icon wrapper */}</span>
          </IconButton>
          <Button size="small" variant="text" onClick={fn()}>
            Comment
          </Button>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button size="small" variant="text" onClick={fn()}>
              Save
            </Button>
          </Box>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Article Preview</h4>
          <p>Understanding React Hooks: A comprehensive guide for developers...</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary" onClick={fn()}>
            Read Article
          </Button>
          <Button size="small" variant="text" onClick={fn()}>
            Bookmark
          </Button>
          <IconButton aria-label="share article" onClick={fn()}>
            <span> {/* TODO: Replace with Share icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
    </Stack>
  ),
};

// ===== RESPONSIVE STORIES =====
export const ResponsiveBehavior: Story = {
  render: (args) => (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Responsive Actions</h4>
          <p>Actions that adapt to different screen sizes. Resize the viewport to see the effect.</p>
        </CardContent>
        <CardActions 
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 0 },
            '& > *': {
              width: { xs: '100%', sm: 'auto' }
            }
          }}
        >
          <Button size="small" variant="primary">
            Primary Action
          </Button>
          <Button size="small" variant="outline">
            Secondary Action
          </Button>
          <Button size="small" variant="text">
            Tertiary Action
          </Button>
        </CardActions>
      </Card>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Actions stack vertically on mobile and display horizontally on larger screens.',
      },
    },
  },
};

// ===== ACCESSIBILITY STORIES =====
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Keyboard Navigation</h4>
          <p>All actions are keyboard accessible. Use Tab to navigate and Enter/Space to activate.</p>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            aria-label="Accept the terms and conditions"
            onClick={fn()}
          >
            Accept
          </Button>
          <Button 
            size="small" 
            variant="outline"
            aria-label="Decline the terms and conditions"
            onClick={fn()}
          >
            Decline
          </Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Screen Reader Support</h4>
          <p>Actions have proper ARIA labels and roles for screen readers.</p>
        </CardContent>
        <CardActions aria-label="Card actions">
          <IconButton 
            aria-label="Add to favorites" 
            onClick={fn()}
            sx={{
              '&:focus-visible': {
                outline: '2px solid #1976d2',
                outlineOffset: '2px'
              }
            }}
          >
            <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
          </IconButton>
          <IconButton 
            aria-label="Share this content" 
            onClick={fn()}
            sx={{
              '&:focus-visible': {
                outline: '2px solid #1976d2',
                outlineOffset: '2px'
              }
            }}
          >
            <span> {/* TODO: Replace with Share icon wrapper */}</span>
          </IconButton>
          <Button 
            size="small" 
            aria-describedby="action-help"
            onClick={fn()}
          >
            More Info
          </Button>
          <div id="action-help" className="sr-only">
            Click to learn more about this content
          </div>
        </CardActions>
      </Card>
    </Stack>
  ),
};

// ===== THEMES =====
export const Themes: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Light Theme Actions</h4>
          <p>Actions optimized for light theme with proper contrast and visibility.</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary">Primary Action</Button>
          <Button size="small" variant="secondary">Secondary</Button>
          <Button size="small" variant="outline">Outline</Button>
          <IconButton color="primary" aria-label="favorite">
            <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
          </IconButton>
          <IconButton aria-label="share">
            <span> {/* TODO: Replace with Share icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
      
      <Card 
        sx={{ 
          maxWidth: 400,
          bgcolor: 'background.paper',
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <CardContent>
          <h4>Dark Theme Actions</h4>
          <p style={{ color: 'inherit' }}>
            Actions optimized for dark theme with enhanced visibility and proper contrast ratios.
          </p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary">Primary Action</Button>
          <Button size="small" variant="secondary">Secondary</Button>
          <Button size="small" variant="outline">Outline</Button>
          <IconButton color="primary" aria-label="favorite">
            <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
          </IconButton>
          <IconButton aria-label="share" sx={{ color: 'text.secondary' }}>
            <span> {/* TODO: Replace with Share icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Theme-Aware Interactions</h4>
          <p>Actions that adapt their hover and focus states based on the current theme.</p>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            variant="primary"
            sx={{
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-1px)',
              }
            }}
          >
            Hover Effect
          </Button>
          <Button 
            size="small" 
            variant="text"
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              }
            }}
          >
            Focus State
          </Button>
          <IconButton 
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'primary.main',
              }
            }}
            aria-label="theme-aware action"
          >
            <span> {/* TODO: Replace with MoreVert icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates CardActions in both light and dark themes with proper contrast and theme-aware styling.',
      },
    },
  },
};

// ===== THEME INTEGRATION (LEGACY) =====
export const ThemeIntegration: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Light Theme Actions</h4>
          <p>Actions that work well in light theme mode.</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary">Primary</Button>
          <Button size="small" variant="secondary">Secondary</Button>
          <IconButton color="primary">
            <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345, bgcolor: 'grey.900', color: 'white' }}>
        <CardContent>
          <h4 style={{ color: 'white' }}>Dark Theme Actions</h4>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Actions that work well in dark theme mode.
          </p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary">Primary</Button>
          <Button size="small" variant="outline" sx={{ color: 'white', borderColor: 'white' }}>
            Secondary
          </Button>
          <IconButton sx={{ color: 'white' }}>
            <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
    </Stack>
  ),
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#121212' },
      ],
    },
  },
};

// ===== REAL-WORLD EXAMPLES =====
export const RealWorldExamples: Story = {
  render: (args) => (
    <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} flexWrap="wrap">
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Product Card</h4>
          <p>iPhone 15 Pro - $999</p>
          <p style={{ fontSize: '0.875rem', color: 'text.secondary' }}>
            128GB, Space Black
          </p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary" onClick={fn()}>
            Add to Cart
          </Button>
          <Button size="small" variant="outline" onClick={fn()}>
            Compare
          </Button>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton aria-label="add to wishlist" onClick={fn()}>
              <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
            </IconButton>
            <IconButton aria-label="share product" onClick={fn()}>
              <span> {/* TODO: Replace with Share icon wrapper */}</span>
            </IconButton>
          </Box>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>Event Card</h4>
          <p>React Conference 2024</p>
          <p style={{ fontSize: '0.875rem', color: 'text.secondary' }}>
            March 15-17, San Francisco
          </p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary" onClick={fn()}>
            Register
          </Button>
          <Button size="small" variant="text" onClick={fn()}>
            Learn More
          </Button>
          <IconButton aria-label="share event" onClick={fn()}>
            <span> {/* TODO: Replace with Share icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <h4>User Profile</h4>
          <p>John Doe</p>
          <p style={{ fontSize: '0.875rem', color: 'text.secondary' }}>
            Software Engineer at TechCorp
          </p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary" onClick={fn()}>
            Connect
          </Button>
          <Button size="small" variant="outline" onClick={fn()}>
            Message
          </Button>
          <IconButton aria-label="more options" onClick={fn()}>
            <span> {/* TODO: Replace with MoreVert icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
    </Stack>
  ),
};

// ===== MISSING MANDATORY CATEGORIES =====

// ===== VARIANTS =====
export const Variants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Left Aligned Actions (Default)</h4>
          <p>Actions aligned to the left side of the card.</p>
        </CardContent>
        <CardActions align="left">
          <Button size="small" variant="primary">Accept</Button>
          <Button size="small" variant="secondary">Cancel</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Right Aligned Actions</h4>
          <p>Actions aligned to the right side of the card.</p>
        </CardContent>
        <CardActions align="right">
          <Button size="small" variant="primary">Save</Button>
          <Button size="small" variant="outline">Cancel</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Center Aligned Actions</h4>
          <p>Actions centered within the card.</p>
        </CardContent>
        <CardActions align="center">
          <Button size="small" variant="primary">Continue</Button>
        </CardActions>
      </Card>
    </Stack>
  ),
};

// ===== STATES =====
export const States: Story = {
  render: (args) => (
    <Stack spacing={3}>
      {/* Normal State */}
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Normal State</h4>
          <p>Actions in their normal, interactive state with full functionality.</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary" onClick={fn()}>Primary Action</Button>
          <Button size="small" variant="secondary" onClick={fn()}>Secondary</Button>
          <IconButton aria-label="favorite" onClick={fn()}>
            <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
          </IconButton>
          <IconButton aria-label="share" onClick={fn()}>
            <span> {/* TODO: Replace with Share icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
      
      {/* Hover State */}
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Hover State</h4>
          <p>Hover over actions to see subtle elevation and color changes.</p>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            variant="primary"
            onClick={fn()}
            sx={{
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: (theme) => theme.shadows[4],
                backgroundColor: 'primary.dark',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Hover Effect
          </Button>
          <Button 
            size="small" 
            variant="outline"
            onClick={fn()}
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
                borderColor: 'primary.main',
                color: 'primary.main',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Hover Outline
          </Button>
          <IconButton 
            aria-label="hover favorite"
            onClick={fn()}
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'primary.main',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
      
      {/* Focus State */}
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Focus State</h4>
          <p>Tab through actions to see keyboard focus outlines for accessibility.</p>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            variant="primary"
            onClick={fn()}
            sx={{
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
                backgroundColor: 'primary.dark',
              }
            }}
          >
            Focus Primary
          </Button>
          <Button 
            size="small" 
            variant="text"
            onClick={fn()}
            sx={{
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
                backgroundColor: 'action.hover',
              }
            }}
          >
            Focus Text
          </Button>
          <IconButton 
            aria-label="focus share"
            onClick={fn()}
            sx={{
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
                backgroundColor: 'action.hover',
              }
            }}
          >
            <span> {/* TODO: Replace with Share icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
      
      {/* Active State */}
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Active State</h4>
          <p>Actions when being pressed or clicked show active styling.</p>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            variant="primary"
            onClick={fn()}
            sx={{
              '&:active': {
                transform: 'translateY(1px)',
                boxShadow: (theme) => theme.shadows[1],
                backgroundColor: 'primary.dark',
              },
              transition: 'all 0.1s ease-in-out',
            }}
          >
            Press Me
          </Button>
          <Button 
            size="small" 
            variant="outline"
            onClick={fn()}
            sx={{
              '&:active': {
                backgroundColor: 'action.selected',
                borderColor: 'primary.dark',
                transform: 'scale(0.98)',
              },
              transition: 'all 0.1s ease-in-out',
            }}
          >
            Press Outline
          </Button>
          <IconButton 
            aria-label="press favorite"
            onClick={fn()}
            sx={{
              '&:active': {
                backgroundColor: 'action.selected',
                transform: 'scale(0.9)',
              },
              transition: 'all 0.1s ease-in-out',
            }}
          >
            <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
      
      {/* Disabled State */}
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Disabled State</h4>
          <p>Actions disabled to prevent interaction with reduced opacity.</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary" disabled>Disabled Primary</Button>
          <Button size="small" variant="secondary" disabled>Disabled Secondary</Button>
          <IconButton disabled aria-label="disabled favorite">
            <span> {/* TODO: Replace with Favorite icon wrapper */}</span>
          </IconButton>
          <IconButton disabled aria-label="disabled share">
            <span> {/* TODO: Replace with Share icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
      
      {/* Loading State */}
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Loading State</h4>
          <p>Actions with loading indicators for async operations.</p>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            variant="primary"
            loading={true}
            onClick={fn()}
          >
            Loading...
          </Button>
          <Button 
            size="small" 
            variant="outline"
            disabled
            startIcon={
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  border: '2px solid',
                  borderColor: 'action.disabled',
                  borderTopColor: 'primary.main',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
            }
          >
            Processing
          </Button>
          <IconButton disabled aria-label="loading action">
            <Box
              sx={{
                width: 20,
                height: 20,
                border: '2px solid',
                borderColor: 'action.disabled',
                borderTopColor: 'primary.main',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
          </IconButton>
        </CardActions>
      </Card>
      
      {/* Error State */}
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Error State</h4>
          <p>Actions showing error states with appropriate error styling.</p>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            variant="primary"
            onClick={fn()}
            sx={{
              backgroundColor: 'error.main',
              color: 'error.contrastText',
              '&:hover': {
                backgroundColor: 'error.dark',
              },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'error.main',
                outlineOffset: '2px',
              }
            }}
          >
            Error Action
          </Button>
          <Button 
            size="small" 
            variant="outline"
            onClick={fn()}
            sx={{
              borderColor: 'error.main',
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'error.main',
                color: 'error.contrastText',
              }
            }}
          >
            Retry
          </Button>
          <IconButton 
            aria-label="error state"
            onClick={fn()}
            sx={{
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'error.main',
                color: 'error.contrastText',
              }
            }}
          >
            <span> {/* TODO: Replace with MoreVert icon wrapper */}</span>
          </IconButton>
        </CardActions>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all interaction states for CardActions including normal, hover, focus, active, disabled, loading, and error states. Each state provides appropriate visual feedback and maintains accessibility standards.',
      },
    },
  },
};

// ===== BOOLEAN PROPS =====
export const BooleanProps: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Default Spacing</h4>
          <p>Normal spacing between action elements.</p>
        </CardContent>
        <CardActions disableSpacing={false}>
          <Button size="small">Action 1</Button>
          <Button size="small">Action 2</Button>
          <Button size="small">Action 3</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Disabled Spacing</h4>
          <p>Compact layout with spacing disabled.</p>
        </CardContent>
        <CardActions disableSpacing={true}>
          <Button size="small">Action 1</Button>
          <Button size="small">Action 2</Button>
          <Button size="small">Action 3</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Disabled Actions</h4>
          <p>All actions disabled via the disabled prop.</p>
        </CardContent>
        <CardActions disabled={true}>
          <Button size="small">Disabled 1</Button>
          <Button size="small">Disabled 2</Button>
          <IconButton><span> {/* TODO: Replace with MoreVert icon wrapper */}</span></IconButton>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Enabled Actions</h4>
          <p>All actions enabled (default behavior).</p>
        </CardContent>
        <CardActions disabled={false}>
          <Button size="small" variant="primary">Enabled 1</Button>
          <Button size="small" variant="secondary">Enabled 2</Button>
          <IconButton><span> {/* TODO: Replace with Share icon wrapper */}</span></IconButton>
        </CardActions>
      </Card>
    </Stack>
  ),
};

// ===== SIZES =====
export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Compact Size</h4>
          <p>Compact spacing for dense layouts.</p>
        </CardContent>
        <CardActions size="compact">
          <Button size="small" variant="primary">Compact</Button>
          <Button size="small" variant="secondary">Actions</Button>
          <IconButton><span> {/* TODO: Replace with Favorite icon wrapper */}</span></IconButton>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Comfortable Size (Default)</h4>
          <p>Standard spacing for most use cases.</p>
        </CardContent>
        <CardActions size="comfortable">
          <Button size="small" variant="primary">Comfortable</Button>
          <Button size="small" variant="secondary">Actions</Button>
          <IconButton><span> {/* TODO: Replace with Share icon wrapper */}</span></IconButton>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <h4>Spacious Size</h4>
          <p>Generous spacing for prominent actions.</p>
        </CardContent>
        <CardActions size="spacious">
          <Button size="medium" variant="primary">Spacious</Button>
          <Button size="medium" variant="secondary">Actions</Button>
          <IconButton><span> {/* TODO: Replace with MoreVert icon wrapper */}</span></IconButton>
        </CardActions>
      </Card>
    </Stack>
  ),
};