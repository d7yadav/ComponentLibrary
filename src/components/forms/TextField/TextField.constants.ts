import type { TextFieldVariant, TextFieldSize, TextFieldInputType, ValidationState } from './TextField.types';

export const TEXTFIELD_VARIANTS: Record<TextFieldVariant, TextFieldVariant> = {
  filled: 'filled',
  outlined: 'outlined',
  standard: 'standard',
} as const;

export const TEXTFIELD_SIZES: Record<TextFieldSize, TextFieldSize> = {
  small: 'small',
  medium: 'medium',
} as const;

export const TEXTFIELD_INPUT_TYPES: Record<string, TextFieldInputType> = {
  text: 'text',
  email: 'email',
  password: 'password',
  number: 'number',
  tel: 'tel',
  url: 'url',
  search: 'search',
  date: 'date',
  time: 'time',
  'datetime-local': 'datetime-local',
  month: 'month',
  week: 'week',
} as const;

export const VALIDATION_STATES: Record<ValidationState, ValidationState> = {
  none: 'none',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

export const TEXTFIELD_SIZE_CONFIGS = {
  small: {
    height: 40,
    padding: '8px 12px',
    fontSize: '0.875rem',
    iconSize: 16,
    borderRadius: 8,
    labelPadding: '20px',
    labelTopSmall: '6px',
  },
  medium: {
    height: 48,
    padding: '12px 16px',
    fontSize: '1rem',
    iconSize: 20,
    borderRadius: 12,
    labelPadding: '25px',
    labelTopSmall: '8px',
  },
} as const;

export const VALIDATION_STATE_COLORS = {
  none: {
    border: 'divider',
    focus: 'primary.main',
    helperText: 'text.secondary',
  },
  success: {
    border: 'success.main',
    focus: 'success.main',
    helperText: 'success.main',
  },
  warning: {
    border: 'warning.main',
    focus: 'warning.main',
    helperText: 'warning.main',
  },
  error: {
    border: 'error.main',
    focus: 'error.main',
    helperText: 'error.main',
  },
} as const;

export const TEXTFIELD_ANIMATION_DURATIONS = {
  focus: '0.2s',
  blur: '0.2s',
  validation: '0.3s',
  loading: '1.5s',
} as const;

export const TEXTFIELD_ANIMATION_EASINGS = {
  spring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const ACCESSIBILITY_CONSTANTS = {
  minTouchTarget: 44, // Minimum touch target size in pixels
  focusOutlineWidth: 2,
  focusOutlineOffset: 2,
  requiredIndicator: '*',
  loadingAriaLabel: 'Loading',
  validationDebounceDefault: 300, // milliseconds
} as const;

export const INPUT_VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  tel: /^[\+]?[1-9][\d]{0,15}$/,
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
} as const;

export const CHARACTER_COUNT_CONFIGS = {
  position: 'bottom-right' as const,
  warningThreshold: 0.8, // Show warning when 80% of maxLength is reached
  errorThreshold: 1.0, // Show error when maxLength is exceeded
} as const;

export const LOADING_INDICATOR_CONFIG = {
  size: 16,
  position: 'end' as const,
  color: 'inherit' as const,
} as const;

export const DEFAULT_VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  url: 'Please enter a valid URL',
  tel: 'Please enter a valid phone number',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  pattern: 'Please enter a valid value',
  number: 'Please enter a valid number',
  date: 'Please enter a valid date',
  time: 'Please enter a valid time',
} as const;

export const MULTILINE_CONFIGS = {
  defaultRows: 3,
  minRows: 1,
  maxRows: 10,
  autoResize: true,
} as const;

export const FORM_INTEGRATION_CONFIGS = {
  submitOnEnter: false,
  clearOnEscape: false,
  validateOnChange: true,
  validateOnBlur: true,
  validateOnSubmit: true,
} as const;