import { 
  Info, 
  CheckCircle, 
  Warning, 
  Error as ErrorIcon, 
  Help,
  Close,
  Check,
  Delete,
  Save
} from '@mui/icons-material';

import type { DialogVariant, DialogType, DialogSize, DialogActionType, DialogPresetActions } from './Dialog.types';

// Dialog Variants
export const DIALOG_VARIANTS: Record<string, DialogVariant> = {
  confirmation: 'confirmation',
  alert: 'alert',
  form: 'form',
  custom: 'custom',
  fullscreen: 'fullscreen',
  simple: 'simple',
} as const;

// Dialog Types  
export const DIALOG_TYPES: Record<string, DialogType> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  question: 'question',
} as const;

// Dialog Sizes
export const DIALOG_SIZES: Record<string, DialogSize> = {
  small: 'small',
  medium: 'medium', 
  large: 'large',
  fullscreen: 'fullscreen',
  auto: 'auto',
} as const;

// Action Types
export const DIALOG_ACTION_TYPES: Record<string, DialogActionType> = {
  primary: 'primary',
  secondary: 'secondary',
  cancel: 'cancel',
  destructive: 'destructive',
} as const;

// Dialog Size Mappings
export const DIALOG_SIZE_MAPPINGS = {
  small: {
    maxWidth: '400px',
    minWidth: '320px',
  },
  medium: {
    maxWidth: '600px',
    minWidth: '400px',
  },
  large: {
    maxWidth: '900px',
    minWidth: '600px',
  },
  fullscreen: {
    maxWidth: '100vw',
    minWidth: '100vw',
  },
  auto: {
    maxWidth: 'fit-content',
    minWidth: 'auto',
  },
} as const;

// Type Icons
export const DIALOG_TYPE_ICONS = {
  info: Info,
  success: CheckCircle,
  warning: Warning,
  error: ErrorIcon,
  question: Help,
} as const;

// Type Colors
export const DIALOG_TYPE_COLORS = {
  info: 'info',
  success: 'success', 
  warning: 'warning',
  error: 'error',
  question: 'primary',
} as const;

// Animation Durations
export const DIALOG_ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 400,
} as const;

// Z-Index Values
export const DIALOG_Z_INDEX = {
  base: 1300,
  overlay: 1301,
  modal: 1302,
} as const;

// Accessibility Constants
export const DIALOG_ACCESSIBILITY_CONSTANTS = {
  dialogRole: 'dialog',
  alertDialogRole: 'alertdialog',
  titleId: 'dialog-title',
  descriptionId: 'dialog-description',
  closeButtonAriaLabel: 'Close dialog',
  draggableAriaLabel: 'Drag to move dialog',
  focusableSelector: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
} as const;

// Preset Actions
export const DIALOG_PRESET_ACTIONS: DialogPresetActions = {
  ok: {
    label: 'OK',
    type: 'primary',
    onClick: () => {},
    'data-testid': 'dialog-ok-button',
  },
  cancel: {
    label: 'Cancel',
    type: 'cancel',
    onClick: () => {},
    'data-testid': 'dialog-cancel-button',
  },
  yes: {
    label: 'Yes',
    type: 'primary',
    onClick: () => {},
    'data-testid': 'dialog-yes-button',
  },
  no: {
    label: 'No',
    type: 'cancel',
    onClick: () => {},
    'data-testid': 'dialog-no-button',
  },
  save: {
    label: 'Save',
    type: 'primary',
    onClick: () => {},
    'data-testid': 'dialog-save-button',
  },
  delete: {
    label: 'Delete',
    type: 'destructive',
    onClick: () => {},
    'data-testid': 'dialog-delete-button',
  },
  confirm: {
    label: 'Confirm',
    type: 'primary',
    onClick: () => {},
    'data-testid': 'dialog-confirm-button',
  },
  close: {
    label: 'Close',
    type: 'secondary',
    onClick: () => {},
    'data-testid': 'dialog-close-button',
  },
} as const;

// Default Values
export const DIALOG_DEFAULTS = {
  variant: DIALOG_VARIANTS.simple,
  type: DIALOG_TYPES.info,
  size: DIALOG_SIZES.medium,
  showIcon: true,
  scrollable: false,
  draggable: false,
  dividers: false,
  elevation: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  animationDuration: DIALOG_ANIMATION_DURATIONS.normal,
} as const;

// Validation Constants
export const DIALOG_VALIDATION = {
  maxTitleLength: 120,
  maxSubtitleLength: 200,
  maxActionsCount: 5,
  minWidth: 280,
  maxWidth: 1200,
} as const;

// CSS Class Names
export const DIALOG_CLASS_NAMES = {
  root: 'dialog-root',
  container: 'dialog-container',
  content: 'dialog-content',
  header: 'dialog-header',
  title: 'dialog-title',
  subtitle: 'dialog-subtitle',
  icon: 'dialog-icon',
  body: 'dialog-body',
  footer: 'dialog-footer',
  actions: 'dialog-actions',
  action: 'dialog-action',
  divider: 'dialog-divider',
  draggable: 'dialog-draggable',
  scrollable: 'dialog-scrollable',
  loading: 'dialog-loading',
} as const;

// Breakpoints for responsive behavior
export const DIALOG_BREAKPOINTS = {
  mobile: 'max-width: 600px',
  tablet: 'max-width: 960px',
  desktop: 'min-width: 961px',
} as const;