import { ModalVariant, ModalPosition, ModalBackdrop, ModalAnimation, ModalSize } from './Modal.types';

/**
 * MODAL_VARIANTS constants
 */
export const MODAL_VARIANTS: Record<ModalVariant, ModalVariant> = {
  basic: 'basic',
  centered: 'centered',
  fullscreen: 'fullscreen',
  drawer: 'drawer',
  popover: 'popover',
} as const;

/**
 * MODAL_POSITIONS constants
 */
export const MODAL_POSITIONS: Record<ModalPosition, ModalPosition> = {
  center: 'center',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  'top-left': 'top-left',
  'top-right': 'top-right',
  'bottom-left': 'bottom-left',
  'bottom-right': 'bottom-right',
  custom: 'custom',
} as const;

/**
 * MODAL_BACKDROPS constants
 */
export const MODAL_BACKDROPS: Record<ModalBackdrop, ModalBackdrop> = {
  blur: 'blur',
  solid: 'solid',
  transparent: 'transparent',
  none: 'none',
} as const;

/**
 * MODAL_ANIMATIONS constants
 */
export const MODAL_ANIMATIONS: Record<ModalAnimation, ModalAnimation> = {
  fade: 'fade',
  slide: 'slide',
  zoom: 'zoom',
  scale: 'scale',
  drawer: 'drawer',
  none: 'none',
} as const;

/**
 * MODAL_SIZES constants
 */
export const MODAL_SIZES: Record<ModalSize, ModalSize> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  fullscreen: 'fullscreen',
} as const;

/**
 * MODAL_SIZE_CONFIGS constants
 */
export const MODAL_SIZE_CONFIGS = {
  xs: {
    maxWidth: '320px',
    minHeight: '200px',
    padding: '16px',
  },
  sm: {
    maxWidth: '480px',
    minHeight: '240px',
    padding: '20px',
  },
  md: {
    maxWidth: '640px',
    minHeight: '300px',
    padding: '24px',
  },
  lg: {
    maxWidth: '960px',
    minHeight: '400px',
    padding: '32px',
  },
  xl: {
    maxWidth: '1280px',
    minHeight: '500px',
    padding: '40px',
  },
  fullscreen: {
    maxWidth: '100vw',
    minHeight: '100vh',
    padding: '0px',
  },
} as const;

/**
 * ANIMATION_DURATIONS constants
 */
export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  drawer: 400,
} as const;

/**
 * ANIMATION_EASINGS constants
 */
export const ANIMATION_EASINGS = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * BACKDROP_CONFIGS constants
 */
export const BACKDROP_CONFIGS = {
  blur: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
  },
  solid: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'none',
  },
  transparent: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'none',
  },
  none: {
    backgroundColor: 'transparent',
    backdropFilter: 'none',
  },
} as const;

/**
 * Z_INDEX_LEVELS constants
 */
export const Z_INDEX_LEVELS = {
  modal: 1300,
  drawer: 1200,
  popover: 1400,
  fullscreen: 1500,
} as const;

/**
 * ACCESSIBILITY_CONSTANTS constants
 */
export const ACCESSIBILITY_CONSTANTS = {
  closeButtonAriaLabel: 'Close modal',
  modalRole: 'dialog',
  alertDialogRole: 'alertdialog',
  focusTrapSelector: '[data-focus-trap]',
  autoFocusSelector: '[data-autofocus]',
  firstFocusableSelector: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
} as const;

/**
 * MOBILE_BREAKPOINT constants
 */
export const MOBILE_BREAKPOINT = '(max-width: 767px)' as const;

/**
 * POSITION_CONFIGS constants
 */
export const POSITION_CONFIGS = {
  center: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  top: {
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  bottom: {
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  left: {
    top: '50%',
    left: '10%',
    transform: 'translateY(-50%)',
  },
  right: {
    top: '50%',
    right: '10%',
    transform: 'translateY(-50%)',
  },
  'top-left': {
    top: '10%',
    left: '10%',
    transform: 'none',
  },
  'top-right': {
    top: '10%',
    right: '10%',
    transform: 'none',
  },
  'bottom-left': {
    bottom: '10%',
    left: '10%',
    transform: 'none',
  },
  'bottom-right': {
    bottom: '10%',
    right: '10%',
    transform: 'none',
  },
  custom: {
    // Will be overridden by customPosition prop
  },
} as const;

/**
 * DRAWER_CONFIGS constants
 */
export const DRAWER_CONFIGS = {
  left: {
    width: '400px',
    height: '100vh',
    top: 0,
    left: 0,
    transform: 'translateX(-100%)',
    transformOpen: 'translateX(0)',
  },
  right: {
    width: '400px',
    height: '100vh',
    top: 0,
    right: 0,
    transform: 'translateX(100%)',
    transformOpen: 'translateX(0)',
  },
  top: {
    width: '100vw',
    height: '300px',
    top: 0,
    left: 0,
    transform: 'translateY(-100%)',
    transformOpen: 'translateY(0)',
  },
  bottom: {
    width: '100vw',
    height: '300px',
    bottom: 0,
    left: 0,
    transform: 'translateY(100%)',
    transformOpen: 'translateY(0)',
  },
} as const;