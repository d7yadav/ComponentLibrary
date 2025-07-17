
import type { IconButtonVariant, IconButtonSize, IconButtonColor, IconButtonShape } from './IconButton.types';

// Variant definitions
export const ICON_BUTTON_VARIANTS: Record<IconButtonVariant, string> = {
  filled: 'filled',
  outlined: 'outlined', 
  text: 'text',
  gradient: 'gradient',
  glass: 'glass'
} as const;

// Size definitions with pixel values
export const ICON_BUTTON_SIZES: Record<IconButtonSize, { 
  size: number; 
  iconSize: number; 
  padding: number;
  fontSize: string;
}> = {
  small: {
    size: 32,
    iconSize: 16,
    padding: 8,
    fontSize: '0.875rem'
  },
  medium: {
    size: 40,
    iconSize: 20,
    padding: 10,
    fontSize: '1rem'
  },
  large: {
    size: 48,
    iconSize: 24,
    padding: 12,
    fontSize: '1.125rem'
  },
  xl: {
    size: 56,
    iconSize: 28,
    padding: 14,
    fontSize: '1.25rem'
  }
} as const;

// Color definitions
export const ICON_BUTTON_COLORS: Record<IconButtonColor, string> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  quaternary: 'quaternary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  inherit: 'inherit'
} as const;

// Shape definitions
export const ICON_BUTTON_SHAPES: Record<IconButtonShape, { borderRadius: string }> = {
  circular: { borderRadius: '50%' },
  rounded: { borderRadius: '12px' },
  square: { borderRadius: '4px' }
} as const;

// Animation constants
export const ICON_BUTTON_ANIMATIONS = {
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
  
  // Transform values
  transform: {
    hover: 'scale(1.05)',
    press: 'scale(0.95)',
    focus: 'scale(1.02)'
  },
  
  // Ripple animation
  ripple: {
    duration: 600,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
} as const;

// Elevation shadows
export const ICON_BUTTON_ELEVATIONS = {
  none: 'none',
  small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  medium: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  large: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  hover: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'
} as const;

// Accessibility constants
export const ICON_BUTTON_A11Y = {
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
    loading: 'Loading...',
    disabled: 'Button is disabled',
    selected: 'Selected',
    unselected: 'Not selected'
  }
} as const;

// Theme-specific color mappings
export const ICON_BUTTON_THEME_COLORS = {
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
    text: {
      background: 'transparent',
      color: 'var(--mui-palette-primary-main)',
      hover: 'var(--mui-palette-primary-main)',
      hoverBackground: 'var(--mui-palette-primary-main)',
      hoverOpacity: '0.04'
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
    text: {
      background: 'transparent',
      color: 'var(--mui-palette-primary-light)',
      hover: 'var(--mui-palette-primary-light)',
      hoverBackground: 'var(--mui-palette-primary-light)',
      hoverOpacity: '0.08'
    }
  }
} as const;

// Loading spinner configuration
export const ICON_BUTTON_LOADING = {
  spinnerSizes: {
    small: 14,
    medium: 18,
    large: 22,
    xl: 26
  },
  
  spinnerAnimation: {
    duration: '1s',
    easing: 'linear',
    iteration: 'infinite'
  }
} as const;

// Default props
export const ICON_BUTTON_DEFAULTS = {
  variant: 'text' as IconButtonVariant,
  size: 'medium' as IconButtonSize,
  color: 'primary' as IconButtonColor,
  shape: 'circular' as IconButtonShape,
  disabled: false,
  selected: false,
  loading: false,
  elevation: false,
  disableRipple: false,
  enableHover: true,
  enablePress: true,
  enableFocus: true,
  duration: ICON_BUTTON_ANIMATIONS.duration.normal
} as const;