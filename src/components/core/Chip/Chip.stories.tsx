import {
  Done as DoneIcon,
  Face as FaceIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React , { useState } from 'react';

import { Chip } from './Chip';
import { CHIP_COLORS, CHIP_SHAPES, CHIP_SIZES, CHIP_VARIANTS } from './Chip.constants';

/**
 * 🎯 Chip Component Stories
 * 
 * Comprehensive Storybook stories showcasing all Chip variants,
 * states, and interactive features with accessibility testing.
 */

const meta: Meta<typeof Chip> = {
  title: 'Core/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile chip component for displaying compact information with interactive capabilities.

## Features
- 5 variants: filled, outlined, soft, gradient, glass
- 3 sizes: small, medium, large
- 9 colors: primary, secondary, tertiary, quaternary, success, warning, error, info, default
- 3 shapes: rounded, square, circular
- Clickable and deletable functionality
- Avatar and icon support
- Loading states and badge notifications
- Full accessibility support (WCAG 2.1 AA)
- Advanced animations and interactions
- Theme-aware styling with CSS variables

## Usage
\`\`\`tsx
import { Chip } from '@/components/core';
import { Avatar } from '@mui/material';

<Chip 
  label="Basic Chip" 
  variant="filled" 
  color="primary"
  clickable
  deletable
/>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(CHIP_VARIANTS),
      description: 'Visual style variant'
    },
    size: {
      control: { type: 'select' },
      options: Object.keys(CHIP_SIZES),
      description: 'Chip size'
    },
    color: {
      control: { type: 'select' },
      options: Object.keys(CHIP_COLORS),
      description: 'Color theme'
    },
    shape: {
      control: { type: 'select' },
      options: Object.keys(CHIP_SHAPES),
      description: 'Chip shape'
    },
    label: {
      control: { type: 'text' },
      description: 'Chip label text'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable chip interactions'
    },
    selected: {
      control: { type: 'boolean' },
      description: 'Selected state for filter chips'
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Enable clickable behavior'
    },
    deletable: {
      control: { type: 'boolean' },
      description: 'Enable delete functionality'
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
    },
    onDelete: {
      action: 'deleted',
      description: 'Delete handler'
    }
  },
  args: {
    onClick: fn(),
    onDelete: fn()
  }
};

export default meta;
type Story = StoryObj<typeof Chip>;

// Default story
export const Default: Story = {
  args: {
    label: 'Default Chip'
  }
};

// Variant stories
export const Variants: Story = {
  render: () => (
    <div data-testid="chip.stories" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip label="Filled" variant="filled" color="primary" />
      <Chip label="Outlined" variant="outlined" color="primary" />
      <Chip label="Soft" variant="soft" color="primary" />
      <Chip label="Gradient" variant="gradient" color="primary" />
      <Chip label="Glass" variant="glass" color="primary" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available Chip variants: filled, outlined, soft, gradient, and glass.'
      }
    }
  }
};

// Size stories
export const Sizes: Story = {
  render: () => (
    <div data-testid="chip.stories" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Chip label="Small" size="small" variant="filled" color="primary" />
      <Chip label="Medium" size="medium" variant="filled" color="primary" />
      <Chip label="Large" size="large" variant="filled" color="primary" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available Chip sizes: small (24px), medium (32px), and large (40px).'
      }
    }
  }
};

// Color stories
export const Colors: Story = {
  render: () => (
    <div data-testid="chip.stories" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip label="Primary" variant="filled" color="primary" />
      <Chip label="Secondary" variant="filled" color="secondary" />
      <Chip label="Tertiary" variant="filled" color="tertiary" />
      <Chip label="Quaternary" variant="filled" color="quaternary" />
      <Chip label="Success" variant="filled" color="success" />
      <Chip label="Warning" variant="filled" color="warning" />
      <Chip label="Error" variant="filled" color="error" />
      <Chip label="Info" variant="filled" color="info" />
      <Chip label="Default" variant="filled" color="default" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available Chip colors including primary, secondary, tertiary, quaternary, and semantic colors.'
      }
    }
  }
};

// Shape stories
export const Shapes: Story = {
  render: () => (
    <div data-testid="chip.stories" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Chip label="Rounded" shape="rounded" variant="filled" color="primary" />
      <Chip label="Square" shape="square" variant="filled" color="primary" />
      <Chip label="Circular" shape="circular" variant="filled" color="primary" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available Chip shapes: rounded, square, and circular.'
      }
    }
  }
};

// State stories
export const States: Story = {
  render: () => (
    <div data-testid="chip.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <div data-testid="chip.stories" style={{ textAlign: 'center' }}>
        <Chip label="Default" variant="filled" color="primary" />
        <div data-testid="chip.stories" style={{ fontSize: '12px', marginTop: '8px' }}>Default</div>
      </div>
      <div data-testid="chip.stories" style={{ textAlign: 'center' }}>
        <Chip label="Disabled" variant="filled" color="primary" disabled />
        <div data-testid="chip.stories" style={{ fontSize: '12px', marginTop: '8px' }}>Disabled</div>
      </div>
      <div data-testid="chip.stories" style={{ textAlign: 'center' }}>
        <Chip label="Selected" variant="filled" color="primary" selected />
        <div data-testid="chip.stories" style={{ fontSize: '12px', marginTop: '8px' }}>Selected</div>
      </div>
      <div data-testid="chip.stories" style={{ textAlign: 'center' }}>
        <Chip label="Clickable" variant="filled" color="primary" clickable />
        <div data-testid="chip.stories" style={{ fontSize: '12px', marginTop: '8px' }}>Clickable</div>
      </div>
      <div data-testid="chip.stories" style={{ textAlign: 'center' }}>
        <Chip label="Deletable" variant="filled" color="primary" deletable />
        <div data-testid="chip.stories" style={{ fontSize: '12px', marginTop: '8px' }}>Deletable</div>
      </div>
      <div data-testid="chip.stories" style={{ textAlign: 'center' }}>
        <Chip label="Loading" variant="filled" color="primary" loading />
        <div data-testid="chip.stories" style={{ fontSize: '12px', marginTop: '8px' }}>Loading</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different Chip states including default, disabled, selected, clickable, deletable, and loading.'
      }
    }
  }
};

// Interactive features
export const Interactive: Story = {
  render: () => (
    <div data-testid="chip.stories" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip 
        label="Click me" 
        variant="filled" 
        color="primary" 
        clickable
        tooltip="Click to select"
        onClick={() => alert('Chip clicked!')}
      />
      <Chip 
        label="Delete me" 
        variant="outlined" 
        color="error" 
        deletable
        tooltip="Click X to delete"
        onDelete={() => alert('Chip deleted!')}
      />
      <Chip 
        label="Both actions" 
        variant="soft" 
        color="info" 
        clickable
        deletable
        tooltip="Click or delete"
        onClick={() => alert('Chip clicked!')}
        onDelete={() => alert('Chip deleted!')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive Chips with click and delete functionality.'
      }
    }
  }
};

// Icon and Avatar examples
export const WithIcons: Story = {
  render: () => (
    <div data-testid="chip.stories" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip 
        label="With Icon" 
        variant="filled" 
        color="primary" 
        icon={<HomeIcon />}
      />
      <Chip 
        label="With Avatar" 
        variant="outlined" 
        color="secondary" 
        avatar={<Avatar sx={{ width: 24, height: 24 }}>A</Avatar>}
      />
      <Chip 
        label="End Icon" 
        variant="soft" 
        color="success" 
        icon={<StarIcon />}
        iconPosition="end"
      />
      <Chip 
        label="With Face" 
        variant="filled" 
        color="info" 
        avatar={<FaceIcon />}
        deletable
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chips with icons and avatars in different positions.'
      }
    }
  }
};

// Badge examples
export const WithBadges: Story = {
  render: () => (
    <div data-testid="chip.stories" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip 
        label="Notifications" 
        variant="filled" 
        color="primary" 
        badge={5}
      />
      <Chip 
        label="Messages" 
        variant="outlined" 
        color="secondary" 
        badge={99}
      />
      <Chip 
        label="Alerts" 
        variant="soft" 
        color="error" 
        badge="!"
        badgeColor="warning"
      />
      <Chip 
        label="Updates" 
        variant="filled" 
        color="info" 
        badge={150}
        deletable
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chips with badge notifications showing counts and custom content.'
      }
    }
  }
};

// Filter chips example
export const FilterChips: Story = {
  render: () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(['react']);
    
    const filters = [
      { id: 'react', label: 'React', color: 'primary' as const },
      { id: 'typescript', label: 'TypeScript', color: 'secondary' as const },
      { id: 'javascript', label: 'JavaScript', color: 'warning' as const },
      { id: 'css', label: 'CSS', color: 'info' as const },
      { id: 'html', label: 'HTML', color: 'success' as const }
    ];
    
    const handleFilterToggle = (filterId: string): void => {
      setSelectedFilters(prev => 
        prev.includes(filterId) 
          ? prev.filter(id => id !== filterId)
          : [...prev, filterId]
      );
    };
    
    return (
      <div data-testid="chip.stories" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        {filters.map(filter => (
          <Chip
            key={filter.id}
            label={filter.label}
            variant="outlined"
            color={filter.color}
            selected={selectedFilters.includes(filter.id)}
            clickable
            onClick={() => handleFilterToggle(filter.id)}
            icon={selectedFilters.includes(filter.id) ? <DoneIcon /> : undefined}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter chips with selection state management and visual feedback.'
      }
    }
  }
};

// Tag chips example
export const TagChips: Story = {
  render: () => {
    const [tags, setTags] = useState([
      'React',
      'TypeScript', 
      'Material-UI',
      'Storybook',
      'Testing'
    ]);
    
    const handleDeleteTag = (tagToDelete: string): void => {
      setTags(tags.filter(tag => tag !== tagToDelete));
    };
    
    return (
      <div data-testid="chip.stories" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        {tags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            variant="soft"
            color="primary"
            deletable
            onDelete={() => handleDeleteTag(tag)}
            size="small"
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag chips with delete functionality for dynamic content management.'
      }
    }
  }
};

// Complex example with all features
export const ComplexExample: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(false);
    
    const handleClick = (): void => {
      setLoading(true);
      setTimeout(() => {
        setSelected(!selected);
        setLoading(false);
      }, 1000);
    };
    
    return (
      <div data-testid="chip.stories" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Chip
          label="Advanced Chip"
          variant="gradient"
          color={selected ? "success" : "primary"}
          size="large"
          shape="rounded"
          clickable
          deletable
          selected={selected}
          loading={loading}
          elevation
          avatar={<Avatar sx={{ width: 32, height: 32 }}>AC</Avatar>}
          badge={selected ? "✓" : "?"}
          badgeColor={selected ? "success" : "warning"}
          tooltip={selected ? "Click to deselect" : "Click to select"}
          onClick={handleClick}
          onDelete={() => alert('Advanced chip deleted!')}
          aria-label={`Advanced chip - ${selected ? 'selected' : 'not selected'}`}
        />
        
        <Chip
          label="Settings"
          variant="glass"
          color="secondary"
          size="medium"
          clickable
          icon={<SettingsIcon />}
          tooltip="Open settings"
          onClick={() => alert('Settings opened!')}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex Chip example with state management, dynamic styling, and multiple features.'
      }
    }
  }
};

// Elevation examples
export const Elevation: Story = {
  render: () => (
    <div data-testid="chip.stories" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Chip label="No Elevation" variant="filled" color="primary" />
      <Chip label="With Elevation" variant="filled" color="primary" elevation />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chips with and without elevation effects.'
      }
    }
  }
};

// Theme integration
export const Theme: Story = {
  render: () => (
    <div data-testid="chip.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {/* Light theme examples */}
      <div data-testid="chip.stories" style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Light Theme</h4>
        <div data-testid="chip.stories" style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          <Chip label="Filled" variant="filled" color="primary" size="small" />
          <Chip label="Outlined" variant="outlined" color="primary" size="small" />
          <Chip label="Soft" variant="soft" color="primary" size="small" />
        </div>
      </div>
      
      {/* Dark theme examples */}
      <div data-testid="chip.stories" style={{ padding: '16px', backgroundColor: '#121212', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: 'white' }}>Dark Theme</h4>
        <div data-testid="chip.stories" style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          <Chip label="Filled" variant="filled" color="primary" size="small" />
          <Chip label="Outlined" variant="outlined" color="primary" size="small" />
          <Chip label="Soft" variant="soft" color="primary" size="small" />
        </div>
      </div>
      
      {/* Glass morphism examples */}
      <div data-testid="chip.stories" style={{ 
        padding: '16px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        borderRadius: '8px' 
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: 'white' }}>Glass Morphism</h4>
        <div data-testid="chip.stories" style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          <Chip label="Glass" variant="glass" color="primary" size="small" />
          <Chip label="Glass" variant="glass" color="secondary" size="small" />
          <Chip label="Glass" variant="glass" color="success" size="small" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chip integration with different theme contexts and backgrounds.'
      }
    }
  }
};

// Accessibility testing
export const Accessibility: Story = {
  render: () => (
    <div data-testid="chip.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div data-testid="chip.stories">
        <h4 style={{ margin: '0 0 8px 0' }}>ARIA Labels & Screen Reader Support</h4>
        <div data-testid="chip.stories" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip 
            label="Accessible Chip" 
            variant="filled" 
            color="primary"
            clickable
            aria-label="Select accessible chip for filtering"
            tooltip="Click to filter"
          />
          <Chip 
            label="Delete Chip" 
            variant="outlined" 
            color="error"
            deletable
            aria-label="Remove delete chip from selection"
            deleteTooltip="Remove chip"
          />
        </div>
      </div>
      
      <div data-testid="chip.stories">
        <h4 style={{ margin: '0 0 8px 0' }}>Keyboard Navigation</h4>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
          Use Tab to navigate, Enter/Space to activate, Delete/Backspace to remove
        </p>
        <div data-testid="chip.stories" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip 
            label="Keyboard 1" 
            variant="filled" 
            color="primary" 
            clickable
            tabIndex={0}
          />
          <Chip 
            label="Keyboard 2" 
            variant="outlined" 
            color="secondary" 
            deletable
            tabIndex={0}
          />
          <Chip 
            label="Keyboard 3" 
            variant="soft" 
            color="success" 
            clickable
            deletable
            tabIndex={0}
          />
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