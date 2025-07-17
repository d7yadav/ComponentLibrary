import { 
  Language as LanguageIcon,
  Star as StarIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Select } from './Select';
import { SELECT_VARIANTS, SELECT_SIZES, SELECT_COLORS, SELECT_MODES } from './Select.constants';
import type { SelectOption, SelectOptionGroup } from './Select.types';

/**
 * 🎯 Select Component Stories
 * 
 * Comprehensive Storybook stories showcasing all Select variants,
 * states, and interactive features with accessibility testing.
 */

// Sample data
const countries: SelectOption[] = [
  { value: 'us', label: 'United States', icon: <LanguageIcon /> },
  { value: 'uk', label: 'United Kingdom', icon: <LanguageIcon /> },
  { value: 'ca', label: 'Canada', icon: <LanguageIcon /> },
  { value: 'de', label: 'Germany', icon: <LanguageIcon /> },
  { value: 'fr', label: 'France', icon: <LanguageIcon /> },
  { value: 'jp', label: 'Japan', icon: <LanguageIcon /> },
  { value: 'au', label: 'Australia', icon: <LanguageIcon /> },
  { value: 'br', label: 'Brazil', icon: <LanguageIcon /> }
];

const skills: SelectOption[] = [
  { value: 'react', label: 'React', description: 'JavaScript library for building user interfaces' },
  { value: 'typescript', label: 'TypeScript', description: 'Typed superset of JavaScript' },
  { value: 'nodejs', label: 'Node.js', description: 'JavaScript runtime environment' },
  { value: 'python', label: 'Python', description: 'High-level programming language' },
  { value: 'java', label: 'Java', description: 'Object-oriented programming language' },
  { value: 'sql', label: 'SQL', description: 'Structured Query Language for databases' },
  { value: 'aws', label: 'AWS', description: 'Amazon Web Services cloud platform' },
  { value: 'docker', label: 'Docker', description: 'Containerization platform' }
];

const priorities: SelectOption[] = [
  { value: 'low', label: 'Low Priority', icon: <span style={{ color: '#green' }}>🟢</span> },
  { value: 'medium', label: 'Medium Priority', icon: <span style={{ color: '#orange' }}>🟡</span> },
  { value: 'high', label: 'High Priority', icon: <span style={{ color: '#red' }}>🔴</span> },
  { value: 'urgent', label: 'Urgent', icon: <span style={{ color: '#red' }}>🚨</span> }
];

const groupedOptions: SelectOptionGroup[] = [
  {
    label: 'Work',
    options: [
      { value: 'work-email', label: 'Work Email', icon: <WorkIcon /> },
      { value: 'work-phone', label: 'Work Phone', icon: <WorkIcon /> }
    ]
  },
  {
    label: 'Education',
    options: [
      { value: 'school-email', label: 'School Email', icon: <SchoolIcon /> },
      { value: 'student-id', label: 'Student ID', icon: <SchoolIcon /> }
    ]
  },
  {
    label: 'Personal',
    options: [
      { value: 'personal-email', label: 'Personal Email', icon: <HomeIcon /> },
      { value: 'personal-phone', label: 'Personal Phone', icon: <HomeIcon /> }
    ]
  }
];

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile select dropdown component with advanced features and accessibility support.

## Features
- 3 variants: filled, outlined, standard
- 3 sizes: small, medium, large
- 8 colors: primary, secondary, tertiary, quaternary, success, warning, error, info
- Single and multiple selection modes
- Search/filter functionality
- Loading states and async data support
- Validation with error/success/warning states
- Icon support and grouped options
- Full accessibility support (WCAG 2.1 AA)
- Advanced animations and interactions
- Theme-aware styling with CSS variables

## Usage
\`\`\`tsx
import { Select } from '@/components/forms';

<Select
  label="Country"
  options={countries}
  onChange={(value) => setSelectedCountry(value)}
/>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(SELECT_VARIANTS),
      description: 'Visual style variant'
    },
    size: {
      control: { type: 'select' },
      options: Object.keys(SELECT_SIZES),
      description: 'Select size'
    },
    color: {
      control: { type: 'select' },
      options: Object.keys(SELECT_COLORS),
      description: 'Color theme'
    },
    mode: {
      control: { type: 'select' },
      options: Object.keys(SELECT_MODES),
      description: 'Selection mode'
    },
    label: {
      control: { type: 'text' },
      description: 'Field label'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable select interactions'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state'
    },
    searchable: {
      control: { type: 'boolean' },
      description: 'Enable search functionality'
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Enable clear button'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required field'
    },
    onChange: {
      action: 'changed',
      description: 'Value change handler'
    },
    onSearchChange: {
      action: 'search-changed',
      description: 'Search change handler'
    }
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onSearchChange: fn(),
    onOpen: fn(),
    onClose: fn()
  }
};

export default meta;
type Story = StoryObj<typeof Select>;

// Default story
export const Default: Story = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country'
  }
};

// Variant stories
export const Variants: Story = {
  render: () => {
    const [filledValue, setFilledValue] = React.useState<string>('');
    const [outlinedValue, setOutlinedValue] = React.useState<string>('');
    const [standardValue, setStandardValue] = React.useState<string>('');
    
    return (
      <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '350px' }}>
        <div data-testid="select.stories">
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 500, color: 'var(--mui-palette-text-secondary)' }}>
            Filled Variant
          </h4>
          <Select
            label="Country"
            variant="filled"
            options={countries.slice(0, 4)}
            placeholder="Select a country"
            value={filledValue}
            onChange={(value) => setFilledValue(value as string)}
            fullWidth
            helperText="Filled style with grey background"
          />
        </div>
        
        <div data-testid="select.stories">
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 500, color: 'var(--mui-palette-text-secondary)' }}>
            Outlined Variant (Default)
          </h4>
          <Select
            label="Country"
            variant="outlined"
            options={countries.slice(0, 4)}
            placeholder="Select a country"
            value={outlinedValue}
            onChange={(value) => setOutlinedValue(value as string)}
            fullWidth
            helperText="Outlined style with border"
          />
        </div>
        
        <div data-testid="select.stories">
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 500, color: 'var(--mui-palette-text-secondary)' }}>
            Standard Variant
          </h4>
          <Select
            label="Country"
            variant="standard"
            options={countries.slice(0, 4)}
            placeholder="Select a country"
            value={standardValue}
            onChange={(value) => setStandardValue(value as string)}
            fullWidth
            helperText="Standard style with bottom border only"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All available Select variants: filled, outlined (default), and standard with proper theming and interactions.'
      }
    }
  }
};

// Size stories
export const Sizes: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Select
        label="Small"
        size="small"
        options={countries.slice(0, 4)}
        placeholder="Select a country"
      />
      <Select
        label="Medium"
        size="medium"
        options={countries.slice(0, 4)}
        placeholder="Select a country"
      />
      <Select
        label="Large"
        size="large"
        options={countries.slice(0, 4)}
        placeholder="Select a country"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available Select sizes: small, medium, and large.'
      }
    }
  }
};

// Color stories
export const Colors: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '600px' }}>
      <Select label="Primary" color="primary" options={countries.slice(0, 3)} />
      <Select label="Secondary" color="secondary" options={countries.slice(0, 3)} />
      <Select label="Tertiary" color="tertiary" options={countries.slice(0, 3)} />
      <Select label="Quaternary" color="quaternary" options={countries.slice(0, 3)} />
      <Select label="Success" color="success" options={countries.slice(0, 3)} />
      <Select label="Warning" color="warning" options={countries.slice(0, 3)} />
      <Select label="Error" color="error" options={countries.slice(0, 3)} />
      <Select label="Info" color="info" options={countries.slice(0, 3)} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available Select colors with theme integration.'
      }
    }
  }
};

// Selection modes
export const SelectionModes: Story = {
  render: () => {
    const [singleValue, setSingleValue] = React.useState<string>('');
    const [multipleValues, setMultipleValues] = React.useState<string[]>([]);
    
    return (
      <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
        <Select
          label="Single Selection"
          mode="single"
          options={skills.slice(0, 5)}
          value={singleValue}
          onChange={(value) => setSingleValue(value as string)}
          placeholder="Select one skill"
        />
        <Select
          label="Multiple Selection"
          mode="multiple"
          options={skills.slice(0, 5)}
          value={multipleValues}
          onChange={(value) => setMultipleValues(value as string[])}
          placeholder="Select multiple skills"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Single and multiple selection modes with state management.'
      }
    }
  }
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Select
        label="Priority Level"
        options={priorities}
        placeholder="Select priority"
      />
      <Select
        label="Country"
        options={countries.slice(0, 4)}
        placeholder="Select country"
        startIcon={<LanguageIcon />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select with option icons and start icons.'
      }
    }
  }
};

// Searchable
export const Searchable: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');
    
    return (
      <div data-testid="select.stories" style={{ width: '300px' }}>
        <Select
          label="Programming Skills"
          options={skills}
          searchable
          searchPlaceholder="Search skills..."
          placeholder="Select your skills"
          onSearchChange={setSearchValue}
          helperText={searchValue ? `Searching for: "${searchValue}"` : 'Start typing to search'}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Searchable select with real-time filtering.'
      }
    }
  }
};

// States
export const States: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '600px' }}>
      <Select
        label="Default"
        options={countries.slice(0, 4)}
        placeholder="Select a country"
      />
      <Select
        label="Disabled"
        options={countries.slice(0, 4)}
        placeholder="Select a country"
        disabled
      />
      <Select
        label="Loading"
        options={countries.slice(0, 4)}
        placeholder="Select a country"
        loading
      />
      <Select
        label="With Value"
        options={countries.slice(0, 4)}
        value="us"
        clearable
      />
      <Select
        label="Error State"
        options={countries.slice(0, 4)}
        placeholder="Select a country"
        error="This field is required"
        helperText="Please select a country"
      />
      <Select
        label="Success State"
        options={countries.slice(0, 4)}
        value="us"
        success="Valid selection"
        helperText="Country selected successfully"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different Select states including default, disabled, loading, error, and success.'
      }
    }
  }
};

// Validation
export const Validation: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    
    const handleChange = (newValue: any) => {
      setValue(newValue as string);
      if (!newValue) {
        setError('This field is required');
      } else if (newValue === 'jp') {
        setError('Japan is not available for this service');
      } else {
        setError('');
      }
    };
    
    return (
      <div data-testid="select.stories" style={{ width: '300px' }}>
        <Select
          label="Country"
          options={countries.slice(0, 6)}
          value={value}
          onChange={handleChange}
          required
          error={error}
          helperText={error || 'Select your country'}
          placeholder="Select a country"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with real-time validation and error handling.'
      }
    }
  }
};

// Grouped options
export const GroupedOptions: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ width: '300px' }}>
      <Select
        label="Contact Method"
        groups={groupedOptions}
        placeholder="Select contact method"
        helperText="Choose your preferred contact method"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select with grouped options for better organization.'
      }
    }
  }
};

// Advanced features
export const AdvancedFeatures: Story = {
  render: () => {
    const [selectedSkills, setSelectedSkills] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(false);
    
    const handleLoadMore = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    
    return (
      <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
        <Select
          label="Skills (Multiple + Search + Clear)"
          mode="multiple"
          options={skills}
          value={selectedSkills}
          onChange={(value) => setSelectedSkills(value as string[])}
          searchable
          clearable
          searchPlaceholder="Search skills..."
          placeholder="Select your skills"
          helperText={`${selectedSkills.length} skills selected`}
          fullWidth
        />
        
        <Select
          label="Load More Example"
          options={skills.slice(0, 4)}
          loading={loading}
          placeholder={loading ? "Loading more options..." : "Select skill"}
          helperText={
            <div data-testid="select.stories">
              Available skills limited. 
              <button 
                onClick={handleLoadMore} 
                style={{ 
                  marginLeft: 8, 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--mui-palette-primary-main)', 
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Load more
              </button>
            </div>
          }
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced Select features including multiple selection, search, clear, and loading states.'
      }
    }
  }
};

// Long list performance
export const LongList: Story = {
  render: () => {
    // Generate a large list of options
    const longOptions: SelectOption[] = Array.from({ length: 100 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
      description: `This is option number ${i + 1} in a long list`
    }));
    
    return (
      <div data-testid="select.stories" style={{ width: '300px' }}>
        <Select
          label="Large Dataset"
          options={longOptions}
          searchable
          searchPlaceholder="Search options..."
          placeholder="Select from 100 options"
          helperText="Demonstrating performance with large datasets"
          maxHeight={200}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select performance with large datasets and virtualization.'
      }
    }
  }
};

// Theme integration (REQUIRED)
export const Theme: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '600px' }}>
      {/* Light theme */}
      <div data-testid="select.stories" style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>Light Theme</h4>
        <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            label="Filled Light"
            variant="filled"
            options={countries.slice(0, 4)}
            size="medium"
            color="primary"
          />
          <Select
            label="Outlined Light"
            variant="outlined"
            options={skills.slice(0, 4)}
            size="medium"
            color="secondary"
          />
          <Select
            label="Standard Light"
            variant="standard"
            options={priorities}
            size="medium"
            color="success"
          />
        </div>
      </div>
      
      {/* Dark theme */}
      <div data-testid="select.stories" style={{ padding: '20px', backgroundColor: '#121212', borderRadius: '8px', border: '1px solid #333' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#fff' }}>Dark Theme</h4>
        <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            label="Filled Dark"
            variant="filled"
            options={countries.slice(0, 4)}
            size="medium"
            color="primary"
          />
          <Select
            label="Outlined Dark"
            variant="outlined"
            options={skills.slice(0, 4)}
            size="medium"
            color="secondary"
          />
          <Select
            label="Standard Dark"
            variant="standard"
            options={priorities}
            size="medium"
            color="success"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select component theme integration showing light and dark theme compatibility.'
      }
    }
  }
};

// Enhanced UX Patterns
export const EnhancedUX: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'grid', gap: '32px' }}>
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Improved Focus & Validation States</h4>
        <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <Select
            variant="outlined"
            label="Enhanced Focus"
            color="primary"
            options={countries.slice(0, 4)}
            helperText="Better focus ring visibility"
          />
          <Select
            variant="filled"
            label="Better Validation"
            color="error"
            options={countries.slice(0, 4)}
            error="Enhanced error styling"
          />
          <Select
            variant="standard"
            label="Clean Typography"
            color="success"
            options={countries.slice(0, 4)}
            success="Consistent font system"
          />
        </div>
      </div>
      
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Dark Mode Improvements</h4>
        <div data-testid="select.stories" style={{ 
          padding: '20px', 
          backgroundColor: '#121212', 
          borderRadius: '8px',
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '16px' 
        }}>
          <Select
            variant="outlined"
            label="Enhanced Dark Contrast"
            color="primary"
            options={skills.slice(0, 4)}
            value="react"
            helperText="Better dark theme colors"
          />
          <Select
            variant="filled"
            label="Improved Visibility"
            color="secondary"
            options={skills.slice(0, 4)}
            value="typescript"
            helperText="Enhanced readability"
          />
        </div>
      </div>
      
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>TextField-Consistent Patterns</h4>
        <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <Select
            variant="outlined"
            label="Consistent Sizing"
            size="medium"
            options={priorities}
            value="medium"
            helperText="Matches TextField dimensions"
          />
          <Select
            variant="outlined"
            label="Unified Animation"
            size="medium"
            options={priorities}
            value="high"
            helperText="Same transitions as TextField"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Enhanced UX patterns matching TextField component for consistency, including improved focus states, better dark mode support, and unified design language.'
      }
    }
  }
};

// Comprehensive States Coverage (REQUIRED)
export const AllStates: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', width: '900px' }}>
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Basic States</h4>
        <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            label="Default State"
            options={countries.slice(0, 4)}
            placeholder="Select a country"
            helperText="Normal state with all interactions"
          />
          <Select
            label="Focused State"
            options={countries.slice(0, 4)}
            placeholder="Click to focus"
            autoFocus
            helperText="Auto-focused for demonstration"
          />
          <Select
            label="With Value"
            options={countries.slice(0, 4)}
            value="us"
            helperText="Selected value state"
          />
        </div>
      </div>
      
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Interactive States</h4>
        <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            label="Disabled"
            options={countries.slice(0, 4)}
            disabled
            placeholder="Cannot interact"
            helperText="Disabled state prevents interaction"
          />
          <Select
            label="Read Only"
            options={countries.slice(0, 4)}
            readOnly
            value="uk"
            helperText="Read-only with value"
          />
          <Select
            label="Loading"
            options={countries.slice(0, 4)}
            loading
            placeholder="Loading options..."
            helperText="Loading state with spinner"
          />
        </div>
      </div>
      
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Validation States</h4>
        <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            label="Error State"
            options={countries.slice(0, 4)}
            error="This field is required"
            placeholder="Select a country"
            helperText="Error validation message"
          />
          <Select
            label="Warning State"
            options={countries.slice(0, 4)}
            warning="Consider updating selection"
            value="de"
            helperText="Warning validation message"
          />
          <Select
            label="Success State"
            options={countries.slice(0, 4)}
            success="Valid selection"
            value="ca"
            helperText="Success validation message"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive coverage of all Select component states including basic, interactive, and validation states.'
      }
    }
  }
};

// All Variants Coverage (REQUIRED)
export const AllVariants: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'grid', gap: '32px' }}>
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>All Variants</h4>
        <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <Select
            variant="filled"
            label="Filled Variant"
            options={skills.slice(0, 4)}
            value="react"
            helperText="Material-UI filled style"
          />
          <Select
            variant="outlined"
            label="Outlined Variant"
            options={skills.slice(0, 4)}
            value="typescript"
            helperText="Clean outlined border"
          />
          <Select
            variant="standard"
            label="Standard Variant"
            options={skills.slice(0, 4)}
            value="nodejs"
            helperText="Minimal underline style"
          />
        </div>
      </div>
      
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Variants with Icons</h4>
        <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <Select
            variant="filled"
            label="With Start Icon"
            options={countries.slice(0, 4)}
            value="us"
            startIcon={<WorkIcon />}
            helperText="Filled with start icon"
          />
          <Select
            variant="outlined"
            label="With Start Icon"
            options={countries.slice(0, 4)}
            value="uk"
            startIcon={<SchoolIcon />}
            helperText="Outlined with start icon"
          />
          <Select
            variant="standard"
            label="With Start Icon"
            options={countries.slice(0, 4)}
            value="ca"
            startIcon={<HomeIcon />}
            helperText="Standard with start icon"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All Select variants (filled, outlined, standard) with and without icons to show styling differences.'
      }
    }
  }
};

// All Sizes Coverage (REQUIRED)
export const AllSizes: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'grid', gap: '24px' }}>
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Size Variants</h4>
        <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'end' }}>
          <Select
            size="small"
            label="Small Size"
            options={priorities}
            value="low"
            helperText="Compact for dense layouts"
          />
          <Select
            size="medium"
            label="Medium Size"
            options={priorities}
            value="medium"
            helperText="Default comfortable size"
          />
          <Select
            size="large"
            label="Large Size"
            options={priorities}
            value="high"
            helperText="Spacious for emphasis"
          />
        </div>
      </div>
      
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Sizes with Different Variants</h4>
        <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <Select
            variant="filled"
            size="small"
            label="Small Filled"
            options={skills.slice(0, 3)}
            value="react"
            startIcon={<StarIcon />}
          />
          <Select
            variant="outlined"
            size="medium"
            label="Medium Outlined"
            options={skills.slice(0, 3)}
            value="typescript"
            startIcon={<StarIcon />}
          />
          <Select
            variant="standard"
            size="large"
            label="Large Standard"
            options={skills.slice(0, 3)}
            value="nodejs"
            startIcon={<StarIcon />}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All Select size variants (small, medium, large) across different component variants and configurations.'
      }
    }
  }
};

// Boolean props coverage (REQUIRED)
export const BooleanProps: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', width: '800px' }}>
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Boolean Properties</h4>
        <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            label="Disabled"
            options={countries.slice(0, 4)}
            disabled
            placeholder="Disabled select"
            helperText="disabled={true}"
          />
          <Select
            label="Loading"
            options={countries.slice(0, 4)}
            loading
            placeholder="Loading select"
            helperText="loading={true}"
          />
          <Select
            label="Required"
            options={countries.slice(0, 4)}
            required
            placeholder="Required field"
            helperText="required={true}"
          />
          <Select
            label="Read Only"
            options={countries.slice(0, 4)}
            readOnly
            value="us"
            helperText="readOnly={true}"
          />
        </div>
      </div>
      
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Feature Toggles</h4>
        <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select
            label="Full Width"
            options={skills.slice(0, 4)}
            fullWidth
            value="react"
            helperText="fullWidth={true}"
          />
          <Select
            label="Searchable"
            options={skills}
            searchable
            placeholder="Type to search..."
            helperText="searchable={true}"
          />
          <Select
            label="Clearable"
            options={countries.slice(0, 4)}
            clearable
            value="uk"
            helperText="clearable={true}"
          />
          <Select
            label="Auto Focus"
            options={priorities}
            autoFocus
            placeholder="Auto focused"
            helperText="autoFocus={true}"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Coverage of all boolean props and feature toggles available on the Select component.'
      }
    }
  }
};

// Complex Props Coverage (REQUIRED)
export const ComplexProps: Story = {
  render: () => {
    const [multiValue, setMultiValue] = React.useState<string[]>(['react', 'typescript']);
    const [singleValue, setSingleValue] = React.useState<string>('us');
    
    return (
      <div data-testid="select.stories" style={{ display: 'grid', gap: '32px' }}>
        <div data-testid="select.stories">
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Selection Modes</h4>
          <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <Select
              label="Single Selection"
              mode="single"
              options={countries.slice(0, 6)}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
              helperText="mode='single' (default)"
            />
            <Select
              label="Multiple Selection"
              mode="multiple"
              options={skills.slice(0, 6)}
              value={multiValue}
              onChange={(value) => setMultiValue(value as string[])}
              helperText="mode='multiple' with array values"
            />
          </div>
        </div>
        
        <div data-testid="select.stories">
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Advanced Features</h4>
          <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <Select
              label="Custom Validation"
              options={countries.slice(0, 4)}
              validate={(value) => {
                if (!value) return 'Country is required';
                if (value === 'jp') return 'Japan not available';
                return null;
              }}
              placeholder="Try selecting Japan"
              helperText="Custom validation function"
            />
            <Select
              label="Custom Icons & Actions"
              options={priorities}
              startIcon={<WorkIcon />}
              clearable
              dropdownIcon={<StarIcon />}
              placeholder="Custom UI elements"
              helperText="Custom icons and actions"
            />
          </div>
        </div>
        
        <div data-testid="select.stories">
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Dropdown Customization</h4>
          <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <Select
              label="Custom Max Height"
              options={Array.from({ length: 20 }, (_, i) => ({
                value: `item-${i}`,
                label: `Long Option ${i + 1}`
              }))}
              maxHeight={200}
              placeholder="Limited height dropdown"
              helperText="maxHeight={200} with scrolling"
            />
            <Select
              label="No Results Handling"
              options={[]}
              searchable
              noResultsText="No countries found"
              placeholder="Empty options array"
              helperText="Custom no results message"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced Select features including selection modes, validation, custom icons, and dropdown behavior customization.'
      }
    }
  }
};

// Accessibility Coverage (REQUIRED)
export const Accessibility: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '600px' }}>
      <Select
        label="Read Only"
        options={countries.slice(0, 4)}
        readOnly
        value="us"
        placeholder="Read only"
      />
      <Select
        label="Searchable"
        options={skills}
        searchable
        placeholder="Searchable select"
      />
      <Select
        label="Clearable"
        options={countries.slice(0, 4)}
        clearable
        value="us"
        placeholder="Clearable select"
      />
      <Select
        label="Full Width"
        options={countries.slice(0, 4)}
        fullWidth
        placeholder="Full width"
      />
      <Select
        label="Auto Focus"
        options={countries.slice(0, 4)}
        autoFocus
        placeholder="Auto focused"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Boolean props coverage showing all available boolean properties.'
      }
    }
  }
};

// Complex props coverage (REQUIRED)
export const ComplexPropsAdvanced: Story = {
  render: () => {
    const [complexValue, setComplexValue] = React.useState<string>('');
    
    const customFilterOption = (option: SelectOption, searchValue: string) => {
      const label = option.label?.toString().toLowerCase() || '';
      const description = option.description?.toString().toLowerCase() || '';
      const search = searchValue.toLowerCase();
      return label.includes(search) || description.includes(search);
    };
    
    const handleValidation = (value: any) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return 'This field is required';
      }
      if (value === 'invalid') {
        return 'This value is not allowed';
      }
      return null;
    };
    
    return (
      <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
        <Select
          label="Custom Filter Function"
          options={skills}
          searchable
          filterOption={customFilterOption}
          placeholder="Search in label and description"
          helperText="Custom search includes descriptions"
        />
        
        <Select
          label="Custom Validation"
          options={[
            { value: 'valid', label: 'Valid Option' },
            { value: 'invalid', label: 'Invalid Option' },
            { value: 'another', label: 'Another Option' }
          ]}
          value={complexValue}
          onChange={(value) => setComplexValue(value as string)}
          validate={handleValidation}
          placeholder="Try selecting 'Invalid Option'"
        />
        
        <Select
          label="Custom Icons & Width"
          options={priorities}
          dropdownWidth={350}
          maxHeight={200}
          startIcon={<StarIcon />}
          placeholder="Custom styling"
        />
        
        <Select
          label="Error/Success/Warning States"
          options={countries.slice(0, 4)}
          value="us"
          success="Great choice!"
          helperText="Success state example"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex props including custom functions, validation, and advanced styling options.'
      }
    }
  }
};

// Edge cases and error handling (REQUIRED)
export const EdgeCases: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '600px' }}>
      <Select
        label="Empty Options"
        options={[]}
        placeholder="No options available"
        helperText="Handles empty options gracefully"
      />
      <Select
        label="Single Option"
        options={[{ value: 'only', label: 'Only Option' }]}
        placeholder="Single option"
      />
      <Select
        label="Long Option Text"
        options={[
          { value: 'long', label: 'This is a very long option text that should be truncated properly to avoid layout issues' }
        ]}
        placeholder="Long text handling"
      />
      <Select
        label="Special Characters"
        options={[
          { value: 'special', label: 'Option with émojis 🚀 & spëcial chars' },
          { value: 'unicode', label: '中文选项 العربية опция' }
        ]}
        placeholder="Unicode support"
      />
      <Select
        label="No Results Found"
        options={skills}
        searchable
        placeholder="Search for 'xyz'"
        noResultsText="No skills found matching your search"
      />
      <Select
        label="Custom Placeholder"
        options={countries.slice(0, 4)}
        placeholder="Choose your destination..."
        helperText="Custom placeholder text"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases including empty options, long text, special characters, and error scenarios.'
      }
    }
  }
};

// Accessibility testing
export const AccessibilityFeatures: Story = {
  render: () => (
    <div data-testid="select.stories" style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 8px 0' }}>ARIA Labels & Screen Reader Support</h4>
        <Select
          label="Accessible Select"
          options={countries.slice(0, 4)}
          placeholder="Select a country"
          aria-label="Country selection dropdown"
          aria-describedby="country-helper"
          helperText="Use arrow keys to navigate, Enter to select"
          id="country-helper"
        />
      </div>
      
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 8px 0' }}>Keyboard Navigation</h4>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
          Tab to focus, Space/Enter to open, Arrow keys to navigate, Enter to select
        </p>
        <Select
          label="Keyboard Navigation"
          options={skills.slice(0, 5)}
          placeholder="Use keyboard to navigate"
          helperText="Fully keyboard accessible"
        />
      </div>
      
      <div data-testid="select.stories">
        <h4 style={{ margin: '0 0 8px 0' }}>Required Field Validation</h4>
        <Select
          label="Required Field"
          options={priorities}
          placeholder="This field is required"
          required
          error="This field is required"
          aria-required={true}
          aria-invalid={true}
        />
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