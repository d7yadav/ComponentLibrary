import { 
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
// Import wrapper components instead of direct MUI imports

import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';

import { Icon } from './Icon';
import { ICON_SIZES, ICON_COLORS, ICON_VARIANTS, COMMON_ICONS } from './Icon.constants';

/**
 * 🎯 Icon Component Stories
 * 
 * Comprehensive Storybook stories showcasing the Icon wrapper system
 * with Material-UI integration, dynamic imports, and theming.
 */

const meta: Meta<typeof Icon> = {
  title: 'Core/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive icon wrapper system that provides consistent theming and accessibility.

## Features
- Dynamic Material-UI icon imports by name
- 4 sizes: small (16px), medium (24px), large (32px), xl (48px)
- 10 colors: inherit, primary, secondary, tertiary, quaternary, success, warning, error, info, disabled
- 5 variants: filled, outlined, rounded, sharp, twoTone
- Transform support: rotation, flip horizontal/vertical
- Animation support with presets
- Loading states with custom spinners
- Accessibility compliant (WCAG 2.1 AA)
- Bundle size optimized with dynamic imports

## Usage
\`\`\`tsx
import { Icon } from '@/components/core';

// By name (dynamic import)
<Icon name="search" size="large" color="primary" />

// With custom component
<Icon component={SearchIcon} size="medium" />

// With transforms
<Icon name="star" rotation={45} flipX={true} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(COMMON_ICONS),
      description: 'Icon name from Material-UI icons library',
    },
    component: {
      control: false,
      description: 'Custom icon component (alternative to name)',
    },
    size: {
      control: 'select',
      options: ICON_SIZES,
      description: 'Icon size variant',
    },
    color: {
      control: 'select',
      options: ICON_COLORS,
      description: 'Icon color from theme palette',
    },
    variant: {
      control: 'select',
      options: ICON_VARIANTS,
      description: 'Icon variant style',
    },
    animated: {
      control: 'boolean',
      description: 'Enable icon animations',
    },
    animationDuration: {
      control: { type: 'range', min: 100, max: 2000, step: 100 },
      description: 'Animation duration in milliseconds',
    },
    rotation: {
      control: { type: 'range', min: 0, max: 360, step: 15 },
      description: 'Icon rotation in degrees',
    },
    flipX: {
      control: 'boolean',
      description: 'Flip icon horizontally',
    },
    flipY: {
      control: 'boolean',
      description: 'Flip icon vertically',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

/**
 * Default icon configuration
 */
export const Default: Story = {
  args: {
    name: 'search',
    size: 'medium',
    color: 'inherit',
  },
};

/**
 * Icon sizes showcase
 */
export const Sizes: Story = {
  render: () => (
    <Box display="flex" alignItems="center" gap={3}>
      {ICON_SIZES.map((size) => (
        <Box key={size} textAlign="center">
          <Icon name="star" size={size} color="primary" />
          <Typography variant="caption" display="block" mt={1}>
            {size}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
};

/**
 * Icon colors showcase
 */
export const Colors: Story = {
  render: () => (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {ICON_COLORS.map((color) => (
        <Box key={color} textAlign="center" minWidth={80}>
          <Icon name="favorite" size="large" color={color} />
          <Typography variant="caption" display="block" mt={1}>
            {color}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
};

/**
 * Common icons showcase - All available icon mappings
 */
export const CommonIcons: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h6">All Available Common Icons ({Object.keys(COMMON_ICONS).length} total)</Typography>
      <Typography variant="body2" color="text.secondary">
        Use these simple names with the Icon component for quick access to commonly used icons.
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))" gap={2}>
        {Object.entries(COMMON_ICONS).map(([key, iconName]) => (
          <Box 
            key={key} 
            textAlign="center" 
            p={2} 
            sx={{ 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              }
            }}
          >
            <Icon name={key} size="large" color="primary" />
            <Typography variant="caption" display="block" mt={1} fontWeight="medium">
              {key}
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary" fontSize="0.65rem">
              {iconName}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  ),
};

/**
 * Custom component usage
 */
export const WithCustomComponent: Story = {
  args: {
    component: SearchIcon,
    size: 'large',
    color: 'secondary',
  },
};

/**
 * Transform examples
 */
export const Transforms: Story = {
  render: () => (
    <Box display="flex" alignItems="center" gap={4}>
      <Box textAlign="center">
        <Icon name="settings" size="large" />
        <Typography variant="caption" display="block" mt={1}>
          Normal
        </Typography>
      </Box>
      <Box textAlign="center">
        <Icon name="settings" size="large" rotation={45} />
        <Typography variant="caption" display="block" mt={1}>
          Rotated 45°
        </Typography>
      </Box>
      <Box textAlign="center">
        <Icon name="settings" size="large" flipX />
        <Typography variant="caption" display="block" mt={1}>
          Flipped X
        </Typography>
      </Box>
      <Box textAlign="center">
        <Icon name="settings" size="large" flipY />
        <Typography variant="caption" display="block" mt={1}>
          Flipped Y
        </Typography>
      </Box>
      <Box textAlign="center">
        <Icon name="settings" size="large" rotation={90} flipX />
        <Typography variant="caption" display="block" mt={1}>
          Rotated + Flipped
        </Typography>
      </Box>
    </Box>
  ),
};

/**
 * Animation examples
 */
export const Animations: Story = {
  render: () => (
    <Box display="flex" alignItems="center" gap={4}>
      <Box textAlign="center">
        <Icon name="refresh" size="large" animated animationDuration={1000} />
        <Typography variant="caption" display="block" mt={1}>
          Spinning
        </Typography>
      </Box>
      <Box textAlign="center">
        <Icon name="star" size="large" animated color="warning" />
        <Typography variant="caption" display="block" mt={1}>
          Animated Star
        </Typography>
      </Box>
    </Box>
  ),
};

/**
 * Loading states
 */
export const LoadingStates: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    
    return (
      <Box display="flex" alignItems="center" gap={4}>
        <Box textAlign="center">
          <Icon name="download" size="large" loading={loading} />
          <Typography variant="caption" display="block" mt={1}>
            {loading ? 'Loading...' : 'Ready'}
          </Typography>
        </Box>
        <button onClick={() => setLoading(!loading)}>
          Toggle Loading
        </button>
      </Box>
    );
  },
};

/**
 * Interactive icon with handlers
 */
export const Interactive: Story = {
  args: {
    name: 'favorite',
    size: 'large',
    color: 'error',
    style: { cursor: 'pointer' },
    'aria-label': 'Toggle favorite',
  },
  render: (args) => {
    const [favorited, setFavorited] = useState(false);
    
    return (
      <Box textAlign="center">
        <Icon
          {...args}
          name={favorited ? 'favorite' : 'favorite'}
          color={favorited ? 'error' : 'inherit'}
          onClick={() => setFavorited(!favorited)}
          style={{
            cursor: 'pointer',
            transition: 'transform 0.2s',
            ':hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
        <Typography variant="caption" display="block" mt={1}>
          {favorited ? 'Favorited' : 'Click to favorite'}
        </Typography>
      </Box>
    );
  },
};

/**
 * Accessibility showcase
 */
export const Accessibility: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
      <Typography variant="h6">Accessibility Features</Typography>
      
      <Box display="flex" alignItems="center" gap={2}>
        <Icon name="info" color="info" aria-label="Information icon" />
        <Typography variant="body2">
          Icon with aria-label for screen readers
        </Typography>
      </Box>
      
      <Box display="flex" alignItems="center" gap={2}>
        <Icon name="warning" color="warning" />
        <Typography variant="body2">
          Decorative icon (aria-hidden=&quot;true&quot; by default when no aria-label)
        </Typography>
      </Box>
      
      <Box display="flex" alignItems="center" gap={2}>
        <Icon 
          name="check" 
          color="success" 
          aria-label="Task completed successfully"
        />
        <Typography variant="body2">
          Status icon with descriptive aria-label
        </Typography>
      </Box>
    </Box>
  ),
};

/**
 * Responsive behavior
 */
export const Responsive: Story = {
  render: () => (
    <Box>
      <Typography variant="h6" mb={2}>
        Responsive Icon Sizes
      </Typography>
      <Typography variant="body2" mb={3}>
        Large icons scale down on small screens to maintain usability.
      </Typography>
      <Box display="flex" alignItems="center" gap={3}>
        <Icon name="home" size="xl" color="primary" />
        <Icon name="settings" size="large" color="secondary" />
        <Icon name="search" size="medium" color="tertiary" />
        <Icon name="star" size="small" color="warning" />
      </Box>
    </Box>
  ),
};

/**
 * Theme integration
 */
export const ThemeIntegration: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h6">Theme Color Integration</Typography>
      
      <Box display="flex" gap={2} alignItems="center">
        <Icon name="home" color="primary" size="large" />
        <Typography>Primary color from theme</Typography>
      </Box>
      
      <Box display="flex" gap={2} alignItems="center">
        <Icon name="star" color="secondary" size="large" />
        <Typography>Secondary color from theme</Typography>
      </Box>
      
      <Box display="flex" gap={2} alignItems="center">
        <Icon name="check" color="success" size="large" />
        <Typography>Success color from theme</Typography>
      </Box>
      
      <Box display="flex" gap={2} alignItems="center">
        <Icon name="error" color="error" size="large" />
        <Typography>Error color from theme</Typography>
      </Box>
    </Box>
  ),
};

/**
 * Complete showcase of all Icon features
 */
export const CompleteShowcase: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4} maxWidth={800}>
      <Typography variant="h4">Icon Wrapper System - Complete Showcase</Typography>
      
      {/* Feature 1: Icon by Name */}
      <Box>
        <Typography variant="h6" gutterBottom>1. Dynamic Icon Loading by Name</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Icon name="search" size="medium" />
          <Icon name="home" size="medium" />
          <Icon name="star" size="medium" />
          <Icon name="settings" size="medium" />
          <Icon name="favorite" size="medium" />
        </Box>
      </Box>
      
      {/* Feature 2: All Sizes */}
      <Box>
        <Typography variant="h6" gutterBottom>2. Size Variants</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <Icon name="star" size="small" />
          <Icon name="star" size="medium" />
          <Icon name="star" size="large" />
          <Icon name="star" size="xl" />
        </Box>
      </Box>
      
      {/* Feature 3: All Colors */}
      <Box>
        <Typography variant="h6" gutterBottom>3. Color Variants</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Icon name="favorite" color="primary" />
          <Icon name="favorite" color="secondary" />
          <Icon name="favorite" color="tertiary" />
          <Icon name="favorite" color="quaternary" />
          <Icon name="favorite" color="success" />
          <Icon name="favorite" color="warning" />
          <Icon name="favorite" color="error" />
          <Icon name="favorite" color="info" />
          <Icon name="favorite" color="disabled" />
        </Box>
      </Box>
      
      {/* Feature 4: Transformations */}
      <Box>
        <Typography variant="h6" gutterBottom>4. Transformations</Typography>
        <Box display="flex" gap={3} alignItems="center">
          <Icon name="settings" size="large" />
          <Icon name="settings" size="large" rotation={45} />
          <Icon name="settings" size="large" rotation={90} />
          <Icon name="settings" size="large" flipX />
          <Icon name="settings" size="large" flipY />
          <Icon name="settings" size="large" rotation={45} flipX flipY />
        </Box>
      </Box>
      
      {/* Feature 5: Animations */}
      <Box>
        <Typography variant="h6" gutterBottom>5. Animations</Typography>
        <Box display="flex" gap={3}>
          <Icon name="refresh" size="large" animated animationDuration={1000} color="primary" />
          <Icon name="star" size="large" animated animationDuration={500} color="warning" />
          <Icon name="favorite" size="large" animated animationDuration={2000} color="error" />
        </Box>
      </Box>
      
      {/* Feature 6: Loading States */}
      <Box>
        <Typography variant="h6" gutterBottom>6. Loading States</Typography>
        <Box display="flex" gap={3}>
          <Icon name="download" size="medium" loading />
          <Icon name="upload" size="large" loading />
          <Icon name="save" size="xl" loading />
        </Box>
      </Box>
      
      {/* Feature 7: Custom Components */}
      <Box>
        <Typography variant="h6" gutterBottom>7. Custom Icon Components</Typography>
        <Box display="flex" gap={2}>
          <Icon component={SearchIcon} size="large" color="primary" />
          <Icon component={StarIcon} size="large" color="warning" />
          <Icon component={FavoriteIcon} size="large" color="error" />
        </Box>
      </Box>
      
      {/* Feature 8: Accessibility */}
      <Box>
        <Typography variant="h6" gutterBottom>8. Accessibility Features</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <Icon name="info" color="info" aria-label="Information" />
          <Typography variant="body2">With aria-label for screen readers</Typography>
        </Box>
      </Box>
      
      {/* Feature 9: Common Icon Mappings */}
      <Box>
        <Typography variant="h6" gutterBottom>9. Common Icon Mappings</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Use simple names that map to Material-UI icons
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))" gap={2}>
          {['add', 'delete', 'edit', 'save', 'cancel', 'check', 'close', 'search', 
            'filter', 'sort', 'refresh', 'download', 'upload', 'print', 'share',
            'home', 'back', 'forward', 'up', 'down'].map((iconName) => (
            <Box key={iconName} display="flex" flexDirection="column" alignItems="center" gap={1}>
              <Icon name={iconName} size="medium" color="primary" />
              <Typography variant="caption">{iconName}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  ),
};

/**
 * Icons organized by category
 */
export const IconsByCategory: Story = {
  render: () => {
    const iconCategories = {
      'Actions': ['add', 'delete', 'edit', 'save', 'cancel', 'check', 'close'],
      'Navigation': ['home', 'back', 'forward', 'up', 'down', 'left', 'right', 'menu', 'more', 'expand', 'collapse'],
      'Content': ['copy', 'paste', 'cut', 'undo', 'redo', 'bold', 'italic', 'underline'],
      'Media': ['play', 'pause', 'stop', 'skip-next', 'skip-previous', 'volume-up', 'volume-down', 'volume-off'],
      'Communication': ['mail', 'message', 'phone', 'call', 'video-call', 'chat', 'comment'],
      'File & Data': ['folder', 'file', 'image', 'document', 'attachment', 'cloud', 'cloud-upload', 'cloud-download'],
      'Common UI': ['search', 'filter', 'sort', 'refresh', 'download', 'upload', 'print', 'share'],
      'Status': ['info', 'warning', 'error', 'success', 'help', 'question', 'notification', 'star', 'favorite'],
      'User': ['account', 'person', 'group', 'settings', 'profile', 'login', 'logout'],
    };

    return (
      <Box display="flex" flexDirection="column" gap={4}>
        <Typography variant="h5">Icons by Category</Typography>
        
        {Object.entries(iconCategories).map(([category, icons]) => (
          <Box key={category}>
            <Typography variant="h6" gutterBottom color="primary">
              {category}
            </Typography>
            <Box 
              display="grid" 
              gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))" 
              gap={2}
              mb={3}
            >
              {icons.map((iconName) => (
                <Box 
                  key={iconName}
                  display="flex" 
                  flexDirection="column" 
                  alignItems="center" 
                  p={2}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      borderColor: 'primary.main',
                    }
                  }}
                >
                  <Icon name={iconName} size="medium" />
                  <Typography variant="caption" mt={1}>
                    {iconName}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    );
  },
};