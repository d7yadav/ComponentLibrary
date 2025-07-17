
import type { ChipVariant, ChipSize, ChipColor, ChipShape } from './Chip.types';

// Variant definitions
export const CHIP_VARIANTS: Record<ChipVariant, string> = {
  filled: 'filled',
  outlined: 'outlined',
  soft: 'soft',
  gradient: 'gradient',
  glass: 'glass'
} as const;

// Size definitions with pixel values
export const CHIP_SIZES: Record<ChipSize, { 
  height: number;
  paddingX: number;
  fontSize: string;
  iconSize: number;
  avatarSize: number;
  deleteIconSize: number;
  borderRadius: number;
}> = {
  small: {
    height: 24,
    paddingX: 8,
    fontSize: '0.8125rem',
    iconSize: 16,
    avatarSize: 18,
    deleteIconSize: 14,
    borderRadius: 12
  },
  medium: {
    height: 32,
    paddingX: 12,
    fontSize: '0.875rem',
    iconSize: 20,
    avatarSize: 24,
    deleteIconSize: 18,
    borderRadius: 16
  },
  large: {
    height: 40,
    paddingX: 16,
    fontSize: '1rem',
    iconSize: 24,
    avatarSize: 32,
    deleteIconSize: 22,
    borderRadius: 20
  }
} as const;

// Color definitions
export const CHIP_COLORS: Record<ChipColor, string> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  quaternary: 'quaternary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  default: 'default'
} as const;

// Shape definitions
export const CHIP_SHAPES: Record<ChipShape, { borderRadius: string }> = {
  rounded: { borderRadius: 'var(--chip-border-radius)' },
  square: { borderRadius: '4px' },
  circular: { borderRadius: '50%' }
} as const;

// Animation constants
export const CHIP_ANIMATIONS = {
  // Duration values in milliseconds
  duration: {
    fast: 150,
    normal: 200,
    slow: 300,
    delete: 250
  },
  
  // Easing functions
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
  },
  
  // Transform values
  transform: {
    hover: 'scale(1.02)',
    press: 'scale(0.98)',
    focus: 'scale(1.01)',
    delete: 'scale(0.8)'
  },
  
  // Delete animation
  delete: {
    duration: 250,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'scale(0) translateX(-100%)',
    opacity: 0
  }
} as const;

// Elevation shadows
export const CHIP_ELEVATIONS = {
  none: 'none',
  small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  medium: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  hover: '0 6px 12px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.12)'
} as const;

// Accessibility constants
export const CHIP_A11Y = {
  // Default ARIA attributes
  defaultRole: 'button',
  
  // Minimum touch target size (WCAG 2.1 AA)
  minTouchTarget: 44,
  
  // Focus indicators
  focusRing: {
    width: 2,
    offset: 2,
    style: 'solid'
  },
  
  // Screen reader labels
  defaultLabels: {
    delete: 'Delete',
    selected: 'Selected',
    unselected: 'Not selected',
    loading: 'Loading...',
    disabled: 'Disabled'
  },
  
  // Keyboard navigation
  keys: {
    delete: ['Delete', 'Backspace'],
    activate: ['Enter', ' '],
    escape: ['Escape']
  }
} as const;

// Theme-specific color mappings
export const CHIP_THEME_COLORS = {
  light: {
    filled: {
      background: 'var(--mui-palette-primary-main)',
      color: 'var(--mui-palette-primary-contrastText)',
      hover: 'var(--mui-palette-primary-dark)',
      disabled: 'var(--mui-palette-action-disabled)'
    },
    outlined: {
      background: 'transparent',
      color: 'var(--mui-palette-primary-main)',
      border: 'var(--mui-palette-primary-main)',
      hover: 'var(--mui-palette-primary-main)',
      hoverBackground: 'var(--mui-palette-primary-main)',
      hoverOpacity: '0.04'
    },
    soft: {
      background: 'var(--mui-palette-primary-main)',
      backgroundOpacity: '0.12',
      color: 'var(--mui-palette-primary-main)',
      hover: 'var(--mui-palette-primary-main)',
      hoverOpacity: '0.16'
    }
  },
  dark: {
    filled: {
      background: 'var(--mui-palette-primary-light)',
      color: 'var(--mui-palette-primary-contrastText)',
      hover: 'var(--mui-palette-primary-main)',
      disabled: 'var(--mui-palette-action-disabled)'
    },
    outlined: {
      background: 'transparent',
      color: 'var(--mui-palette-primary-light)',
      border: 'var(--mui-palette-primary-light)',
      hover: 'var(--mui-palette-primary-light)',
      hoverBackground: 'var(--mui-palette-primary-light)',
      hoverOpacity: '0.08'
    },
    soft: {
      background: 'var(--mui-palette-primary-light)',
      backgroundOpacity: '0.16',
      color: 'var(--mui-palette-primary-light)',
      hover: 'var(--mui-palette-primary-light)',
      hoverOpacity: '0.20'
    }
  }
} as const;

// Badge configuration
export const CHIP_BADGE = {
  sizes: {
    small: {
      size: 16,
      fontSize: '0.625rem',
      offset: -6
    },
    medium: {
      size: 18,
      fontSize: '0.75rem',
      offset: -8
    },
    large: {
      size: 20,
      fontSize: '0.8125rem',
      offset: -10
    }
  },
  
  maxCount: 99,
  overflowText: '99+'
} as const;

// Loading spinner configuration
export const CHIP_LOADING = {
  spinnerSizes: {
    small: 12,
    medium: 16,
    large: 20
  },
  
  spinnerAnimation: {
    duration: '1s',
    easing: 'linear',
    iteration: 'infinite'
  }
} as const;

// Icon spacing and positioning
export const CHIP_ICON_SPACING = {
  small: {
    start: 4,
    end: 4,
    delete: 4
  },
  medium: {
    start: 6,
    end: 6,
    delete: 6
  },
  large: {
    start: 8,
    end: 8,
    delete: 8
  }
} as const;

// Default props
export const CHIP_DEFAULTS = {
  variant: 'filled' as ChipVariant,
  size: 'medium' as ChipSize,
  color: 'default' as ChipColor,
  shape: 'rounded' as ChipShape,
  disabled: false,
  selected: false,
  clickable: false,
  deletable: false,
  elevation: false,
  loading: false,
  enableHover: true,
  enablePress: true,
  enableFocus: true,
  duration: CHIP_ANIMATIONS.duration.normal,
  iconPosition: 'start' as const
} as const;