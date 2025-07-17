import type { RadioSize, RadioColor, RadioVariant, ValidationState } from './Radio.types';

export const RADIO_SIZES: Record<string, RadioSize> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export const RADIO_COLORS: Record<string, RadioColor> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
} as const;

export const RADIO_VARIANTS: Record<string, RadioVariant> = {
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

export const RADIO_SIZE_CONFIGS = {
  small: {
    fontSize: '1rem',
    iconSize: '18px',
    padding: '6px',
    labelGap: '6px',
    helperTextSize: '0.75rem',
  },
  medium: {
    fontSize: '1rem',
    iconSize: '24px',
    padding: '9px',
    labelGap: '8px',
    helperTextSize: '0.75rem',
  },
  large: {
    fontSize: '1.125rem',
    iconSize: '28px',
    padding: '12px',
    labelGap: '10px',
    helperTextSize: '0.875rem',
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

export const RADIO_ANIMATION_DURATIONS = {
  short: '150ms',
  standard: '200ms',
  long: '300ms',
} as const;

export const RADIO_ANIMATION_EASINGS = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

export const ACCESSIBILITY_CONSTANTS = {
  ariaDescribedBy: 'radio-helper-text',
  ariaInvalid: 'true',
  role: 'radio',
  tabIndex: 0,
} as const;

export const DEFAULT_PROPS = {
  size: RADIO_SIZES.medium,
  color: RADIO_COLORS.primary,
  variant: RADIO_VARIANTS.standard,
  validationState: VALIDATION_STATES.none,
  labelPlacement: 'end',
  disabled: false,
  required: false,
  loading: false,
  direction: 'column',
} as const;

export const TEST_IDS = {
  radio: 'radio',
  label: 'radio-label',
  helperText: 'radio-helper-text',
  errorText: 'radio-error-text',
  group: 'radio-group',
  groupLabel: 'radio-group-label',
  loadingSpinner: 'radio-loading-spinner',
} as const;