import type { SnackbarSeverity, SnackbarVariant, SnackbarTransition} from './Snackbar.types';
import { SnackbarOrigin } from './Snackbar.types';

export const SNACKBAR_SEVERITIES: Record<SnackbarSeverity, SnackbarSeverity> = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
} as const;

export const SNACKBAR_VARIANTS: Record<SnackbarVariant, SnackbarVariant> = {
  filled: 'filled',
  outlined: 'outlined',
  standard: 'standard',
} as const;

export const SNACKBAR_TRANSITIONS: Record<SnackbarTransition, SnackbarTransition> = {
  slide: 'slide',
  fade: 'fade',
  grow: 'grow',
  collapse: 'collapse',
} as const;

export const SNACKBAR_POSITIONS = {
  topLeft: { vertical: 'top' as const, horizontal: 'left' as const },
  topCenter: { vertical: 'top' as const, horizontal: 'center' as const },
  topRight: { vertical: 'top' as const, horizontal: 'right' as const },
  bottomLeft: { vertical: 'bottom' as const, horizontal: 'left' as const },
  bottomCenter: { vertical: 'bottom' as const, horizontal: 'center' as const },
  bottomRight: { vertical: 'bottom' as const, horizontal: 'right' as const },
} as const;

export const SNACKBAR_COLORS = {
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

export const SNACKBAR_AUTO_HIDE_DURATIONS = {
  short: 3000,
  medium: 5000,
  long: 8000,
  persistent: null, // Never auto-hide
} as const;

export const SNACKBAR_TRANSITION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

export const SNACKBAR_Z_INDEX = {
  snackbar: 1400,
  tooltip: 1500,
  modal: 1300,
  drawer: 1200,
} as const;

export const SNACKBAR_ELEVATION_VALUES = {
  none: 0,
  subtle: 2,
  low: 4,
  medium: 6,
  high: 8,
  higher: 12,
  highest: 24,
} as const;

export const SNACKBAR_MAX_WIDTH = {
  small: 300,
  medium: 400,
  large: 500,
  xlarge: 600,
} as const;

export const ACCESSIBILITY_CONSTANTS = {
  alertRole: 'alert',
  statusRole: 'status',
  regionRole: 'region',
  buttonRole: 'button',
  closeLabel: 'Close notification',
  actionLabel: 'Notification action',
  liveRegionPolite: 'polite',
  liveRegionAssertive: 'assertive',
} as const;

export const SNACKBAR_SPACING = {
  stack: 8, // Spacing between stacked snackbars
  margin: 16, // Margin from screen edges
  padding: 16, // Internal padding
} as const;

export const SNACKBAR_ICON_MAPPINGS = {
  error: 'ErrorIcon',
  warning: 'WarningIcon',
  info: 'InfoIcon',
  success: 'CheckCircleIcon',
} as const;

export const SNACKBAR_MESSAGE_TEMPLATES = {
  error: {
    generic: 'An error occurred',
    network: 'Network connection failed',
    validation: 'Please check your input',
    permission: 'Access denied',
    timeout: 'Request timed out',
  },
  warning: {
    generic: 'Warning: Please review',
    unsaved: 'You have unsaved changes',
    quota: 'Approaching usage limit',
    deprecated: 'Feature will be removed',
    browser: 'Browser compatibility issue',
  },
  info: {
    generic: 'Information',
    loading: 'Loading...',
    updated: 'Content updated',
    tip: 'Pro tip',
    maintenance: 'Maintenance scheduled',
  },
  success: {
    generic: 'Success!',
    saved: 'Changes saved',
    created: 'Item created',
    updated: 'Item updated',
    deleted: 'Item deleted',
  },
} as const;

export const SNACKBAR_PATTERNS = {
  // Form feedback
  form: {
    success: {
      severity: SNACKBAR_SEVERITIES.success,
      variant: SNACKBAR_VARIANTS.filled,
      autoHideDuration: SNACKBAR_AUTO_HIDE_DURATIONS.medium,
      anchorOrigin: SNACKBAR_POSITIONS.bottomCenter,
    },
    error: {
      severity: SNACKBAR_SEVERITIES.error,
      variant: SNACKBAR_VARIANTS.filled,
      autoHideDuration: SNACKBAR_AUTO_HIDE_DURATIONS.long,
      anchorOrigin: SNACKBAR_POSITIONS.bottomCenter,
      closable: true,
    },
  },
  
  // System notifications
  system: {
    info: {
      severity: SNACKBAR_SEVERITIES.info,
      variant: SNACKBAR_VARIANTS.standard,
      autoHideDuration: SNACKBAR_AUTO_HIDE_DURATIONS.medium,
      anchorOrigin: SNACKBAR_POSITIONS.topRight,
    },
    warning: {
      severity: SNACKBAR_SEVERITIES.warning,
      variant: SNACKBAR_VARIANTS.outlined,
      autoHideDuration: SNACKBAR_AUTO_HIDE_DURATIONS.long,
      anchorOrigin: SNACKBAR_POSITIONS.topRight,
      closable: true,
    },
  },
  
  // User actions
  action: {
    undo: {
      severity: SNACKBAR_SEVERITIES.info,
      variant: SNACKBAR_VARIANTS.standard,
      autoHideDuration: SNACKBAR_AUTO_HIDE_DURATIONS.medium,
      anchorOrigin: SNACKBAR_POSITIONS.bottomLeft,
      actions: [{ label: 'Undo', onClick: () => {} }],
    },
    retry: {
      severity: SNACKBAR_SEVERITIES.error,
      variant: SNACKBAR_VARIANTS.outlined,
      autoHideDuration: SNACKBAR_AUTO_HIDE_DURATIONS.persistent,
      anchorOrigin: SNACKBAR_POSITIONS.bottomCenter,
      actions: [{ label: 'Retry', onClick: () => {} }],
      closable: true,
    },
  },
} as const;

export const SNACKBAR_QUEUE_CONFIG = {
  maxSnackbars: 3,
  stackDirection: 'up', // New snackbars appear above existing ones
  removeOldest: true, // Remove oldest when max is reached
} as const;

export const DEFAULT_SNACKBAR_PROPS = {
  variant: SNACKBAR_VARIANTS.standard,
  anchorOrigin: SNACKBAR_POSITIONS.bottomLeft,
  autoHideDuration: SNACKBAR_AUTO_HIDE_DURATIONS.medium,
  transition: SNACKBAR_TRANSITIONS.slide,
  transitionDuration: SNACKBAR_TRANSITION_DURATIONS.normal,
  closable: false,
  showIcon: true,
  elevated: true,
  elevation: SNACKBAR_ELEVATION_VALUES.medium,
  rounded: true,
  maxWidth: SNACKBAR_MAX_WIDTH.medium,
  clickAwayClose: false,
  escapeKeyClose: true,
  zIndex: SNACKBAR_Z_INDEX.snackbar,
} as const;