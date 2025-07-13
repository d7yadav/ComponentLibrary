import { AlertSeverity, AlertVariant, AlertSize } from './Alert.types';

/**
 * ALERT_SEVERITIES component
 * 
 * @returns JSX element
 */
export const ALERT_SEVERITIES: Record<AlertSeverity, AlertSeverity> = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
} as const;

/**
 * ALERT_VARIANTS component
 * 
 * @returns JSX element
 */
export const ALERT_VARIANTS: Record<AlertVariant, AlertVariant> = {
  filled: 'filled',
  outlined: 'outlined',
  standard: 'standard',
} as const;

/**
 * ALERT_SIZES component
 * 
 * @returns JSX element
 */
export const ALERT_SIZES: Record<AlertSize, AlertSize> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * ALERT_SIZE_CONFIGS component
 * 
 * @returns JSX element
 */
export const ALERT_SIZE_CONFIGS = {
  small: {
    padding: '6px 12px',
    fontSize: '0.75rem',
    iconSize: 16,
    minHeight: 36,
    titleFontSize: '0.875rem',
    borderRadius: 6,
  },
  medium: {
    padding: '8px 16px',
    fontSize: '0.875rem',
    iconSize: 20,
    minHeight: 48,
    titleFontSize: '1rem',
    borderRadius: 8,
  },
  large: {
    padding: '12px 20px',
    fontSize: '1rem',
    iconSize: 24,
    minHeight: 64,
    titleFontSize: '1.125rem',
    borderRadius: 12,
  },
} as const;

/**
 * ALERT_COLORS component
 * 
 * @returns JSX element
 */
export const ALERT_COLORS = {
  error: {
    main: '#d32f2f',
    light: '#ffebee',
    dark: '#c62828',
    contrast: '#ffffff',
    background: '#ffebee',
    border: '#e57373',
  },
  warning: {
    main: '#ed6c02',
    light: '#fff3e0',
    dark: '#e65100',
    contrast: '#ffffff',
    background: '#fff3e0',
    border: '#ffb74d',
  },
  info: {
    main: '#0288d1',
    light: '#e3f2fd',
    dark: '#01579b',
    contrast: '#ffffff',
    background: '#e3f2fd',
    border: '#64b5f6',
  },
  success: {
    main: '#2e7d32',
    light: '#e8f5e8',
    dark: '#1b5e20',
    contrast: '#ffffff',
    background: '#e8f5e8',
    border: '#81c784',
  },
} as const;

/**
 * ALERT_ANIMATIONS component
 * 
 * @returns JSX element
 */
export const ALERT_ANIMATIONS = {
  slideIn: 'slideIn',
  fadeIn: 'fadeIn',
  scaleIn: 'scaleIn',
  bounceIn: 'bounceIn',
} as const;

/**
 * ALERT_ANIMATION_DURATIONS component
 * 
 * @returns JSX element
 */
export const ALERT_ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

/**
 * ALERT_ANIMATION_EASINGS component
 * 
 * @returns JSX element
 */
export const ALERT_ANIMATION_EASINGS = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  spring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * ALERT_AUTO_HIDE_DURATIONS component
 * 
 * @returns JSX element
 */
export const ALERT_AUTO_HIDE_DURATIONS = {
  short: 3000,
  medium: 5000,
  long: 8000,
  persistent: 0, // Never auto-hide
} as const;

/**
 * ALERT_ELEVATION_VALUES component
 * 
 * @returns JSX element
 */
export const ALERT_ELEVATION_VALUES = {
  none: 0,
  subtle: 1,
  low: 2,
  medium: 4,
  high: 8,
  higher: 12,
  highest: 24,
} as const;

/**
 * ACCESSIBILITY_CONSTANTS component
 * 
 * @returns JSX element
 */
export const ACCESSIBILITY_CONSTANTS = {
  alertRole: 'alert',
  statusRole: 'status',
  alertDialogRole: 'alertdialog',
  regionRole: 'region',
  buttonRole: 'button',
  closeLabel: 'Close alert',
  actionLabel: 'Alert action',
  liveRegionPolite: 'polite',
  liveRegionAssertive: 'assertive',
} as const;

/**
 * ALERT_POSITIONS component
 * 
 * @returns JSX element
 */
export const ALERT_POSITIONS = {
  top: 'top',
  bottom: 'bottom',
  'top-left': 'top-left',
  'top-right': 'top-right',
  'bottom-left': 'bottom-left',
  'bottom-right': 'bottom-right',
} as const;

/**
 * ALERT_ICON_MAPPINGS component
 * 
 * @returns JSX element
 */
export const ALERT_ICON_MAPPINGS = {
  error: 'ErrorIcon',
  warning: 'WarningIcon',
  info: 'InfoIcon',
  success: 'CheckCircleIcon',
} as const;

/**
 * ALERT_MESSAGE_TEMPLATES component
 * 
 * @returns JSX element
 */
export const ALERT_MESSAGE_TEMPLATES = {
  error: {
    generic: 'An error occurred. Please try again.',
    validation: 'Please check your input and try again.',
    network: 'Network error. Please check your connection.',
    permission: 'You do not have permission to perform this action.',
    notFound: 'The requested resource was not found.',
  },
  warning: {
    generic: 'Please review the following warning.',
    unsaved: 'You have unsaved changes that may be lost.',
    deprecated: 'This feature is deprecated and will be removed.',
    quota: 'You are approaching your usage limit.',
    browser: 'Your browser may not support all features.',
  },
  info: {
    generic: 'Here is some helpful information.',
    loading: 'Loading data, please wait...',
    updated: 'Information has been updated.',
    tip: 'Pro tip: Use keyboard shortcuts for faster navigation.',
    maintenance: 'Scheduled maintenance will occur this weekend.',
  },
  success: {
    generic: 'Operation completed successfully.',
    saved: 'Your changes have been saved.',
    created: 'Item created successfully.',
    updated: 'Item updated successfully.',
    deleted: 'Item deleted successfully.',
  },
} as const;

/**
 * ALERT_PATTERNS component
 * 
 * @returns JSX element
 */
export const ALERT_PATTERNS = {
  // Common alert patterns
  form: {
    validation: {
      severity: ALERT_SEVERITIES.error,
      variant: ALERT_VARIANTS.outlined,
      closable: true,
      showIcon: true,
    },
    success: {
      severity: ALERT_SEVERITIES.success,
      variant: ALERT_VARIANTS.filled,
      autoHide: true,
      autoHideDuration: ALERT_AUTO_HIDE_DURATIONS.medium,
    },
  },
  
  page: {
    error: {
      severity: ALERT_SEVERITIES.error,
      variant: ALERT_VARIANTS.standard,
      closable: true,
      elevated: true,
      fullWidth: true,
    },
    info: {
      severity: ALERT_SEVERITIES.info,
      variant: ALERT_VARIANTS.outlined,
      closable: true,
      rounded: true,
    },
  },
  
  notification: {
    success: {
      severity: ALERT_SEVERITIES.success,
      variant: ALERT_VARIANTS.filled,
      autoHide: true,
      animated: true,
      elevated: true,
    },
    warning: {
      severity: ALERT_SEVERITIES.warning,
      variant: ALERT_VARIANTS.standard,
      closable: true,
      showIcon: true,
    },
  },
} as const;

/**
 * DEFAULT_ALERT_PROPS component
 * 
 * @returns JSX element
 */
export const DEFAULT_ALERT_PROPS = {
  severity: ALERT_SEVERITIES.info,
  variant: ALERT_VARIANTS.standard,
  size: ALERT_SIZES.medium,
  closable: false,
  showIcon: true,
  fullWidth: false,
  elevated: false,
  elevation: ALERT_ELEVATION_VALUES.none,
  rounded: false,
  centered: false,
  autoHide: false,
  autoHideDuration: ALERT_AUTO_HIDE_DURATIONS.medium,
  animated: false,
  animationDuration: ALERT_ANIMATION_DURATIONS.normal,
} as const;