import type { ButtonVariant, ButtonSize, ButtonColor } from './Button.types';

export const BUTTON_VARIANTS: Record<ButtonVariant, ButtonVariant> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  quaternary: 'quaternary',
  gradient: 'gradient',
  glass: 'glass',
  outline: 'outline',
  text: 'text',
} as const;

export const BUTTON_SIZES: Record<ButtonSize, ButtonSize> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export const BUTTON_COLORS: Record<ButtonColor, ButtonColor> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  quaternary: 'quaternary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
} as const;

export const BUTTON_SIZE_CONFIGS = {
  small: {
    height: 32,
    padding: '6px 12px',
    fontSize: '0.875rem',
    iconSize: 16,
  },
  medium: {
    height: 40,
    padding: '8px 16px',
    fontSize: '1rem',
    iconSize: 20,
  },
  large: {
    height: 48,
    padding: '12px 24px',
    fontSize: '1.125rem',
    iconSize: 24,
  },
} as const;

export const ANIMATION_DURATIONS = {
  hover: '0.2s',
  press: '0.1s',
  loading: '1.5s',
  ripple: '0.6s',
} as const;

export const ANIMATION_EASINGS = {
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const;

export const ACCESSIBILITY_CONSTANTS = {
  minTouchTarget: 44, // Minimum touch target size in pixels
  focusOutlineWidth: 2,
  focusOutlineOffset: 2,
  loadingAriaLabel: 'Loading',
  disabledAriaLabel: 'Button is disabled',
} as const;

export const GLASS_MORPHISM_CONFIG = {
  backdropFilter: 'blur(10px)',
  backdropFilterFallback: 'blur(8px)',
  borderOpacity: 0.2,
  backgroundOpacity: 0.1,
} as const;