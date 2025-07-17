import type { SwitchSize, SwitchColor, SwitchVariant, ValidationState } from './Switch.types';

export const SWITCH_SIZES: Record<string, SwitchSize> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export const SWITCH_COLORS: Record<string, SwitchColor> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
} as const;

export const SWITCH_VARIANTS: Record<string, SwitchVariant> = {
  standard: 'standard',
  outlined: 'outlined',
  filled: 'filled',
} as const;

export const VALIDATION_STATES: Record<string, ValidationState> = {
  none: 'none',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

export const SWITCH_SIZE_CONFIGS = {
  small: {
    width: '32px',
    height: '20px',
    thumbSize: '16px',
    thumbOffset: '2px',
    fontSize: '0.875rem',
    labelGap: '6px',
    helperTextSize: '0.75rem',
    textSize: '0.625rem',
  },
  medium: {
    width: '44px',
    height: '24px',
    thumbSize: '20px',
    thumbOffset: '2px',
    fontSize: '1rem',
    labelGap: '8px',
    helperTextSize: '0.75rem',
    textSize: '0.75rem',
  },
  large: {
    width: '56px',
    height: '32px',
    thumbSize: '28px',
    thumbOffset: '2px',
    fontSize: '1.125rem',
    labelGap: '10px',
    helperTextSize: '0.875rem',
    textSize: '0.875rem',
  },
} as const;

export const VALIDATION_STATE_COLORS = {
  none: {
    color: 'inherit',
    helperTextColor: 'text.secondary',
  },
  success: {
    color: 'success.main',
    helperTextColor: 'success.main',
  },
  warning: {
    color: 'warning.main',
    helperTextColor: 'warning.main',
  },
  error: {
    color: 'error.main',
    helperTextColor: 'error.main',
  },
} as const;

export const SWITCH_ANIMATION_DURATIONS = {
  short: '150ms',
  standard: '200ms',
  long: '300ms',
} as const;

export const SWITCH_ANIMATION_EASINGS = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

export const ACCESSIBILITY_CONSTANTS = {
  ariaDescribedBy: 'switch-helper-text',
  ariaInvalid: 'true',
  role: 'switch',
  tabIndex: 0,
} as const;

export const DEFAULT_PROPS = {
  size: SWITCH_SIZES.medium,
  color: SWITCH_COLORS.primary,
  variant: SWITCH_VARIANTS.standard,
  validationState: VALIDATION_STATES.none,
  labelPlacement: 'end',
  disabled: false,
  required: false,
  loading: false,
  showText: false,
  direction: 'column',
} as const;

export const TEST_IDS = {
  switch: 'switch',
  label: 'switch-label',
  helperText: 'switch-helper-text',
  errorText: 'switch-error-text',
  group: 'switch-group',
  groupLabel: 'switch-group-label',
  loadingSpinner: 'switch-loading-spinner',
  onText: 'switch-on-text',
  offText: 'switch-off-text',
  thumb: 'switch-thumb',
  track: 'switch-track',
} as const;