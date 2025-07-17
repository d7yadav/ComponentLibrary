
import type { SelectVariant, SelectSize, SelectColor, SelectMode } from './Select.types';

// Variant definitions
export const SELECT_VARIANTS: Record<SelectVariant, string> = {
  filled: 'filled',
  outlined: 'outlined',
  standard: 'standard'
} as const;

// Size definitions with pixel values - matching TextField patterns
export const SELECT_SIZES: Record<SelectSize, { 
  height: number,
  fontSize: string,
  paddingX: number,
  paddingY: number,
  iconSize: number,
  borderRadius: number,
  padding: string,
}> = {
  small: {
    height: 32,
    fontSize: '0.8125rem',
    paddingX: 12,
    paddingY: 6,
    iconSize: 18,
    borderRadius: 4,
    padding: '6px 12px'
  },
  medium: {
    height: 40,
    fontSize: '0.875rem',
    paddingX: 14,
    paddingY: 8,
    iconSize: 20,
    borderRadius: 4,
    padding: '8px 14px'
  },
  large: {
    height: 48,
    fontSize: '1rem',
    paddingX: 16,
    paddingY: 12,
    iconSize: 24,
    borderRadius: 4,
    padding: '12px 16px'
  }
} as const;

// Color definitions
export const SELECT_COLORS: Record<SelectColor, string> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  quaternary: 'quaternary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info'
} as const;

// Selection mode definitions
export const SELECT_MODES: Record<SelectMode, string> = {
  single: 'single',
  multiple: 'multiple'
} as const;

// Animation constants
export const SELECT_ANIMATIONS = {
  // Duration values in milliseconds
  duration: {
    fast: 150,
    normal: 200,
    slow: 300
  },
  
  // Easing functions
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
  },
  
  // Dropdown animations
  dropdown: {
    enter: {
      opacity: 1,
      transform: 'scaleY(1)',
      transformOrigin: 'top'
    },
    exit: {
      opacity: 0,
      transform: 'scaleY(0.8)',
      transformOrigin: 'top'
    }
  },
  
  // Option hover effects
  option: {
    hover: 'translateX(4px)',
    selected: 'scale(1.02)'
  }
} as const;

// Dropdown positioning and sizing
export const SELECT_DROPDOWN = {
  // Default dimensions
  maxHeight: 300,
  minWidth: 120,
  defaultWidth: 'auto',
  
  // Positioning offsets
  offset: {
    top: 4,
    bottom: 4
  },
  
  // Z-index values
  zIndex: {
    dropdown: 1300,
    backdrop: 1299
  },
  
  // Virtualization settings
  virtualization: {
    threshold: 50, // Enable virtualization when > 50 options
    itemHeight: 36,
    overscan: 5
  }
} as const;

// Accessibility constants
export const SELECT_A11Y = {
  // Default ARIA attributes
  defaultRole: 'combobox',
  listboxRole: 'listbox',
  optionRole: 'option',
  
  // Keyboard navigation
  keys: {
    open: ['Enter', ' ', 'ArrowDown', 'ArrowUp'],
    close: ['Escape', 'Tab'],
    navigate: ['ArrowDown', 'ArrowUp', 'Home', 'End'],
    select: ['Enter', ' '],
    clear: ['Delete', 'Backspace']
  },
  
  // Screen reader labels
  defaultLabels: {
    loading: 'Loading options...',
    noResults: 'No options found',
    placeholder: 'Select an option',
    multipleSelected: '{count} options selected',
    clearValue: 'Clear selected value',
    openDropdown: 'Open dropdown',
    closeDropdown: 'Close dropdown',
    createOption: 'Create option: {value}'
  },
  
  // Focus management
  focus: {
    // Focus ring styles
    ring: {
      width: 2,
      offset: 2,
      style: 'solid'
    },
    
    // Auto-focus behavior
    autoFocus: {
      firstOption: true,
      selectedOption: true
    }
  }
} as const;

// Validation constants
export const SELECT_VALIDATION = {
  // Error states
  states: {
    required: 'This field is required',
    invalid: 'Please select a valid option',
    custom: 'Validation failed'
  },
  
  // Success/warning states
  success: {
    color: 'var(--mui-palette-success-main)',
    icon: '✓'
  },
  
  warning: {
    color: 'var(--mui-palette-warning-main)',
    icon: '⚠'
  },
  
  error: {
    color: 'var(--mui-palette-error-main)',
    icon: '✕'
  }
} as const;

// Search functionality
export const SELECT_SEARCH = {
  // Debounce settings
  debounce: {
    delay: 300,
    maxWait: 1000
  },
  
  // Search behavior
  behavior: {
    caseSensitive: false,
    searchFields: ['label', 'value', 'description'],
    highlightMatches: true,
    minSearchLength: 1
  },
  
  // No results configuration
  noResults: {
    showMessage: true,
    allowCreate: false,
    defaultMessage: 'No options found'
  }
} as const;

// Loading states
export const SELECT_LOADING = {
  // Spinner configuration
  spinner: {
    size: 16,
    color: 'var(--mui-palette-primary-main)',
    duration: '1s'
  },
  
  // Loading text
  text: {
    loading: 'Loading...',
    loadingOptions: 'Loading options...',
    noOptions: 'No options available'
  },
  
  // Skeleton placeholder
  skeleton: {
    rows: 3,
    height: 36,
    animation: 'pulse'
  }
} as const;

// Multi-select configuration
export const SELECT_MULTISELECT = {
  // Chip display
  chips: {
    maxVisible: 3,
    showCount: true,
    size: 'small' as const,
    variant: 'filled' as const
  },
  
  // Selection behavior
  behavior: {
    closeOnSelect: false,
    selectAll: true,
    deselectAll: true,
    clearAll: true
  },
  
  // Labels
  labels: {
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    clearAll: 'Clear All',
    moreSelected: '+{count} more'
  }
} as const;

// Theme integration with enhanced contrast
export const SELECT_THEME_COLORS = {
  light: {
    filled: {
      background: 'var(--mui-palette-grey-100)',
      backgroundHover: 'var(--mui-palette-grey-200)',
      backgroundFocused: 'var(--mui-palette-grey-50)',
      border: 'transparent',
      borderFocused: 'var(--mui-palette-primary-main)',
      color: 'var(--mui-palette-text-primary)'
    },
    outlined: {
      background: 'transparent',
      backgroundHover: 'rgba(0, 0, 0, 0.04)',
      backgroundFocused: 'transparent',
      border: 'var(--mui-palette-grey-400)',
      borderHover: 'var(--mui-palette-text-primary)',
      borderFocused: 'var(--mui-palette-primary-main)',
      color: 'var(--mui-palette-text-primary)'
    },
    standard: {
      background: 'transparent',
      backgroundHover: 'rgba(0, 0, 0, 0.04)',
      backgroundFocused: 'transparent',
      border: 'transparent',
      borderBottom: 'var(--mui-palette-grey-400)',
      borderBottomHover: 'var(--mui-palette-text-primary)',
      borderBottomFocused: 'var(--mui-palette-primary-main)',
      color: 'var(--mui-palette-text-primary)'
    }
  },
  dark: {
    filled: {
      background: 'var(--mui-palette-grey-800)',
      backgroundHover: 'var(--mui-palette-grey-700)',
      backgroundFocused: 'var(--mui-palette-grey-900)',
      border: 'transparent',
      borderFocused: 'var(--mui-palette-primary-light)',
      color: 'var(--mui-palette-text-primary)'
    },
    outlined: {
      background: 'transparent',
      backgroundHover: 'rgba(255, 255, 255, 0.08)',
      backgroundFocused: 'transparent',
      border: 'var(--mui-palette-grey-600)',
      borderHover: 'var(--mui-palette-grey-400)',
      borderFocused: 'var(--mui-palette-primary-light)',
      color: 'var(--mui-palette-text-primary)'
    },
    standard: {
      background: 'transparent',
      backgroundHover: 'rgba(255, 255, 255, 0.08)',
      backgroundFocused: 'transparent',
      border: 'transparent',
      borderBottom: 'var(--mui-palette-grey-600)',
      borderBottomHover: 'var(--mui-palette-grey-400)',
      borderBottomFocused: 'var(--mui-palette-primary-light)',
      color: 'var(--mui-palette-text-primary)'
    }
  }
} as const;

// Default props
export const SELECT_DEFAULTS = {
  variant: 'outlined' as SelectVariant,
  size: 'medium' as SelectSize,
  color: 'primary' as SelectColor,
  mode: 'single' as SelectMode,
  disabled: false,
  readOnly: false,
  loading: false,
  searchable: false,
  clearable: false,
  creatable: false,
  fullWidth: false,
  autoFocus: false,
  enableAnimations: true,
  duration: SELECT_ANIMATIONS.duration.normal,
  maxHeight: SELECT_DROPDOWN.maxHeight,
  virtualized: false,
  required: false
} as const;