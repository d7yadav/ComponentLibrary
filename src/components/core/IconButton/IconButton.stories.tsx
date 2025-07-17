import { 
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Home as HomeIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';

import { IconButton } from './IconButton';
import { ICON_BUTTON_VARIANTS, ICON_BUTTON_SIZES, ICON_BUTTON_COLORS, ICON_BUTTON_SHAPES } from './IconButton.constants';

/**
 * 🎯 IconButton Component Stories
 * 
 * Comprehensive Storybook stories showcasing all IconButton variants,
 * states, and interactive features with accessibility testing.
 */

const meta: Meta<typeof IconButton> = {
  title: 'Core/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile icon button component with advanced theming and accessibility features.

## Features
- 5 variants: filled, outlined, text, gradient, glass
- 4 sizes: small, medium, large, xl
- 9 colors: primary, secondary, tertiary, quaternary, success, warning, error, info, inherit
- 3 shapes: circular, rounded, square
- Loading states with customizable spinners
- Full accessibility support (WCAG 2.1 AA)
- Advanced animations and interactions
- Theme-aware styling with CSS variables

## Usage
\`\`\`tsx
import { IconButton } from '@/components/core';
import { Search } from '@mui/icons-material';

<IconButton variant="filled" color="primary">
  <Search />
</IconButton>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(ICON_BUTTON_VARIANTS),
      description: 'Visual style variant'
    },
    size: {
      control: { type: 'select' },
      options: Object.keys(ICON_BUTTON_SIZES),
      description: 'Button size'
    },
    color: {
      control: { type: 'select' },
      options: Object.keys(ICON_BUTTON_COLORS),
      description: 'Color theme'
    },
    shape: {
      control: { type: 'select' },
      options: Object.keys(ICON_BUTTON_SHAPES),
      description: 'Button shape'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable button interactions'
    },
    selected: {
      control: { type: 'boolean' },
      description: 'Selected state for toggle buttons'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state'
    },
    elevation: {
      control: { type: 'boolean' },
      description: 'Enable elevation/shadow effects'
    },
    tooltip: {
      control: { type: 'text' },
      description: 'Tooltip text'
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler'
    }
  },
  args: {
    onClick: fn(),
    onMouseEnter: fn(),
    onMouseLeave: fn(),
    onFocus: fn(),
    onBlur: fn()
  }
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Default story
export const Default: Story = {
  args: {
    children: <SearchIcon />
  }
};

// Variant stories
export const Variants: Story = {
  render: () => (
    <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton variant="filled" color="primary">
        <SearchIcon />
      </IconButton>
      <IconButton variant="outlined" color="primary">
        <SearchIcon />
      </IconButton>
      <IconButton variant="text" color="primary">
        <SearchIcon />
      </IconButton>
      <IconButton variant="gradient" color="primary">
        <SearchIcon />
      </IconButton>
      <IconButton variant="glass" color="primary">
        <SearchIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available IconButton variants: filled, outlined, text, gradient, and glass.'
      }
    }
  }
};

// Size stories
export const Sizes: Story = {
  render: () => (
    <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton size="small" variant="filled" color="primary">
        <SearchIcon />
      </IconButton>
      <IconButton size="medium" variant="filled" color="primary">
        <SearchIcon />
      </IconButton>
      <IconButton size="large" variant="filled" color="primary">
        <SearchIcon />
      </IconButton>
      <IconButton size="xl" variant="filled" color="primary">
        <SearchIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available IconButton sizes: small (32px), medium (40px), large (48px), and xl (56px).'
      }
    }
  }
};

// Color stories
export const Colors: Story = {
  render: () => (
    <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <IconButton variant="filled" color="primary">
        <FavoriteIcon />
      </IconButton>
      <IconButton variant="filled" color="secondary">
        <FavoriteIcon />
      </IconButton>
      <IconButton variant="filled" color="tertiary">
        <FavoriteIcon />
      </IconButton>
      <IconButton variant="filled" color="quaternary">
        <FavoriteIcon />
      </IconButton>
      <IconButton variant="filled" color="success">
        <FavoriteIcon />
      </IconButton>
      <IconButton variant="filled" color="warning">
        <FavoriteIcon />
      </IconButton>
      <IconButton variant="filled" color="error">
        <FavoriteIcon />
      </IconButton>
      <IconButton variant="filled" color="info">
        <FavoriteIcon />
      </IconButton>
      <IconButton variant="filled" color="inherit">
        <FavoriteIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available IconButton colors including primary, secondary, tertiary, quaternary, and semantic colors.'
      }
    }
  }
};

// Shape stories
export const Shapes: Story = {
  render: () => (
    <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton shape="circular" variant="filled" color="primary">
        <SettingsIcon />
      </IconButton>
      <IconButton shape="rounded" variant="filled" color="primary">
        <SettingsIcon />
      </IconButton>
      <IconButton shape="square" variant="filled" color="primary">
        <SettingsIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available IconButton shapes: circular, rounded, and square.'
      }
    }
  }
};

// State stories
export const States: Story = {
  render: () => (
    <div data-testid="iconbutton.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'center' }}>
      <div data-testid="iconbutton.stories" style={{ textAlign: 'center' }}>
        <IconButton variant="filled" color="primary">
          <HomeIcon />
        </IconButton>
        <div data-testid="iconbutton.stories" style={{ fontSize: '12px', marginTop: '8px' }}>Default</div>
      </div>
      <div data-testid="iconbutton.stories" style={{ textAlign: 'center' }}>
        <IconButton variant="filled" color="primary" disabled>
          <HomeIcon />
        </IconButton>
        <div data-testid="iconbutton.stories" style={{ fontSize: '12px', marginTop: '8px' }}>Disabled</div>
      </div>
      <div data-testid="iconbutton.stories" style={{ textAlign: 'center' }}>
        <IconButton variant="filled" color="primary" selected>
          <StarIcon />
        </IconButton>
        <div data-testid="iconbutton.stories" style={{ fontSize: '12px', marginTop: '8px' }}>Selected</div>
      </div>
      <div data-testid="iconbutton.stories" style={{ textAlign: 'center' }}>
        <IconButton variant="filled" color="primary" loading>
          <HomeIcon />
        </IconButton>
        <div data-testid="iconbutton.stories" style={{ fontSize: '12px', marginTop: '8px' }}>Loading</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different IconButton states including default, disabled, selected, and loading.'
      }
    }
  }
};

// Interactive features
export const Interactive: Story = {
  render: () => (
    <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton 
        variant="filled" 
        color="primary" 
        tooltip="Search for items"
        onClick={() => alert('Search clicked!')}
      >
        <SearchIcon />
      </IconButton>
      <IconButton 
        variant="outlined" 
        color="error" 
        tooltip="Delete item"
        onClick={() => alert('Delete clicked!')}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton 
        variant="text" 
        color="info" 
        tooltip="Edit content"
        onClick={() => alert('Edit clicked!')}
      >
        <EditIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive IconButtons with tooltips and click handlers.'
      }
    }
  }
};

// Elevation examples
export const Elevation: Story = {
  render: () => (
    <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton variant="filled" color="primary">
        <ThumbUpIcon />
      </IconButton>
      <IconButton variant="filled" color="primary" elevation>
        <ThumbUpIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'IconButtons with and without elevation effects.'
      }
    }
  }
};

// Loading states
export const Loading: Story = {
  render: () => (
    <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton variant="filled" color="primary" loading>
        <NotificationsIcon />
      </IconButton>
      <IconButton variant="outlined" color="secondary" loading>
        <NotificationsIcon />
      </IconButton>
      <IconButton variant="text" color="success" loading>
        <NotificationsIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'IconButtons in loading state with default spinners.'
      }
    }
  }
};

// Complex interactions
export const ComplexExample: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleToggle = () => {
      setLoading(true);
      setTimeout(() => {
        setSelected(!selected);
        setLoading(false);
      }, 1000);
    };
    
    return (
      <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <IconButton
          variant="filled"
          color={selected ? "error" : "primary"}
          selected={selected}
          loading={loading}
          tooltip={selected ? "Remove from favorites" : "Add to favorites"}
          onClick={handleToggle}
          aria-label={selected ? "Remove from favorites" : "Add to favorites"}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          variant="outlined"
          color="primary"
          tooltip="More options"
          aria-label="More options"
        >
          <MoreVertIcon />
        </IconButton>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex IconButton interactions with state management and dynamic styling.'
      }
    }
  }
};

// Theme integration
export const Theme: Story = {
  render: () => (
    <div data-testid="iconbutton.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {/* Light theme examples */}
      <div data-testid="iconbutton.stories" style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Light Theme</h4>
        <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '8px' }}>
          <IconButton variant="filled" color="primary" size="small">
            <SearchIcon />
          </IconButton>
          <IconButton variant="outlined" color="primary" size="small">
            <SearchIcon />
          </IconButton>
          <IconButton variant="text" color="primary" size="small">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      
      {/* Dark theme examples */}
      <div data-testid="iconbutton.stories" style={{ padding: '16px', backgroundColor: '#121212', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: 'white' }}>Dark Theme</h4>
        <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '8px' }}>
          <IconButton variant="filled" color="primary" size="small">
            <SearchIcon />
          </IconButton>
          <IconButton variant="outlined" color="primary" size="small">
            <SearchIcon />
          </IconButton>
          <IconButton variant="text" color="primary" size="small">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      
      {/* Glass morphism examples */}
      <div data-testid="iconbutton.stories" style={{ 
        padding: '16px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        borderRadius: '8px' 
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: 'white' }}>Glass Morphism</h4>
        <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '8px' }}>
          <IconButton variant="glass" color="primary" size="small">
            <SearchIcon />
          </IconButton>
          <IconButton variant="glass" color="secondary" size="small">
            <SearchIcon />
          </IconButton>
          <IconButton variant="glass" color="success" size="small">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'IconButton integration with different theme contexts and backgrounds.'
      }
    }
  }
};

// Accessibility testing
export const Accessibility: Story = {
  render: () => (
    <div data-testid="iconbutton.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div data-testid="iconbutton.stories">
        <h4 style={{ margin: '0 0 8px 0' }}>ARIA Labels & Screen Reader Support</h4>
        <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '8px' }}>
          <IconButton 
            variant="filled" 
            color="primary"
            aria-label="Search for products"
            tooltip="Search"
          >
            <SearchIcon />
          </IconButton>
          <IconButton 
            variant="outlined" 
            color="error"
            aria-label="Delete selected item"
            tooltip="Delete"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton 
            variant="text" 
            color="info"
            aria-label="Edit current document"
            tooltip="Edit"
          >
            <EditIcon />
          </IconButton>
        </div>
      </div>
      
      <div data-testid="iconbutton.stories">
        <h4 style={{ margin: '0 0 8px 0' }}>Keyboard Navigation</h4>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
          Use Tab to navigate, Enter/Space to activate
        </p>
        <div data-testid="iconbutton.stories" style={{ display: 'flex', gap: '8px' }}>
          <IconButton variant="filled" color="primary" tabIndex={0}>
            <HomeIcon />
          </IconButton>
          <IconButton variant="outlined" color="primary" tabIndex={0}>
            <SettingsIcon />
          </IconButton>
          <IconButton variant="text" color="primary" tabIndex={0}>
            <StarIcon />
          </IconButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including ARIA labels, keyboard navigation, and screen reader support.'
      }
    }
  }
};