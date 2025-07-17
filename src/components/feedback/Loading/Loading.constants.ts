import type { LoadingSpinnerType, LoadingSize, LoadingColor, LoadingVariant } from './Loading.types';

export const LOADING_SPINNER_TYPES: Record<LoadingSpinnerType, LoadingSpinnerType> = {
  circular: 'circular',
  dots: 'dots',
  bars: 'bars',
  pulse: 'pulse',
  bounce: 'bounce',
  ring: 'ring',
  wave: 'wave',
  ripple: 'ripple',
  skeleton: 'skeleton',
} as const;

export const LOADING_SIZES: Record<LoadingSize, LoadingSize> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export const LOADING_COLORS: Record<LoadingColor, LoadingColor> = {
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
  inherit: 'inherit',
} as const;

export const LOADING_VARIANTS: Record<LoadingVariant, LoadingVariant> = {
  default: 'default',
  overlay: 'overlay',
  inline: 'inline',
  button: 'button',
  page: 'page',
} as const;

export const LOADING_SIZE_CONFIGS = {
  small: {
    circular: 20,
    dots: 16,
    bars: 20,
    pulse: 24,
    bounce: 16,
    ring: 24,
    wave: 20,
    ripple: 32,
    fontSize: '0.75rem',
  },
  medium: {
    circular: 32,
    dots: 24,
    bars: 32,
    pulse: 40,
    bounce: 24,
    ring: 40,
    wave: 32,
    ripple: 48,
    fontSize: '0.875rem',
  },
  large: {
    circular: 48,
    dots: 36,
    bars: 48,
    pulse: 60,
    bounce: 36,
    ring: 60,
    wave: 48,
    ripple: 72,
    fontSize: '1rem',
  },
} as const;

export const LOADING_ANIMATION_DURATIONS = {
  circular: 1400,
  dots: 1200,
  bars: 1000,
  pulse: 1500,
  bounce: 600,
  ring: 1200,
  wave: 1600,
  ripple: 1200,
  skeleton: 2000,
} as const;

export const LOADING_ANIMATION_EASINGS = {
  linear: 'linear',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

export const LOADING_Z_INDEX = {
  overlay: 1300,
  backdrop: 1200,
  inline: 1,
} as const;

export const LOADING_BACKDROP_OPACITY = {
  light: 0.3,
  medium: 0.5,
  dark: 0.7,
  opaque: 1,
} as const;

export const LOADING_DELAYS = {
  instant: 0,
  short: 200,
  medium: 500,
  long: 1000,
} as const;

export const LOADING_TIMEOUTS = {
  short: 5000,
  medium: 10000,
  long: 30000,
  none: 0,
} as const;

export const ACCESSIBILITY_CONSTANTS = {
  statusRole: 'status',
  progressRole: 'progressbar',
  alertRole: 'alert',
  regionRole: 'region',
  loadingLabel: 'Loading',
  loadingDescription: 'Content is loading, please wait',
  skeletonLabel: 'Loading placeholder',
  liveRegionPolite: 'polite',
  liveRegionAssertive: 'assertive',
} as const;

export const LOADING_DOT_COUNTS = {
  dots: 3,
  bars: 4,
  wave: 5,
  bounce: 3,
} as const;

export const LOADING_MESSAGES = {
  default: 'Loading...',
  data: 'Loading data...',
  page: 'Loading page...',
  content: 'Loading content...',
  image: 'Loading image...',
  video: 'Loading video...',
  form: 'Submitting...',
  save: 'Saving...',
  upload: 'Uploading...',
  download: 'Downloading...',
  processing: 'Processing...',
  validating: 'Validating...',
  authenticating: 'Authenticating...',
} as const;

export const LOADING_PATTERNS = {
  // Page loading
  page: {
    type: LOADING_SPINNER_TYPES.circular,
    variant: LOADING_VARIANTS.overlay,
    size: LOADING_SIZES.large,
    backdrop: true,
    centered: true,
    message: LOADING_MESSAGES.page,
  },
  
  // Content loading
  content: {
    type: LOADING_SPINNER_TYPES.skeleton,
    variant: LOADING_VARIANTS.inline,
    size: LOADING_SIZES.medium,
    fullWidth: true,
  },
  
  // Button loading
  button: {
    type: LOADING_SPINNER_TYPES.circular,
    variant: LOADING_VARIANTS.button,
    size: LOADING_SIZES.small,
    color: LOADING_COLORS.inherit,
  },
  
  // Form submission
  form: {
    type: LOADING_SPINNER_TYPES.dots,
    variant: LOADING_VARIANTS.inline,
    size: LOADING_SIZES.medium,
    message: LOADING_MESSAGES.form,
  },
  
  // Data fetching
  data: {
    type: LOADING_SPINNER_TYPES.pulse,
    variant: LOADING_VARIANTS.default,
    size: LOADING_SIZES.medium,
    centered: true,
    message: LOADING_MESSAGES.data,
  },
  
  // File upload
  upload: {
    type: LOADING_SPINNER_TYPES.bars,
    variant: LOADING_VARIANTS.inline,
    size: LOADING_SIZES.medium,
    message: LOADING_MESSAGES.upload,
  },
  
  // Image loading
  image: {
    type: LOADING_SPINNER_TYPES.ripple,
    variant: LOADING_VARIANTS.overlay,
    size: LOADING_SIZES.medium,
    backdrop: false,
    centered: true,
  },
  
  // Minimal loading
  minimal: {
    type: LOADING_SPINNER_TYPES.dots,
    variant: LOADING_VARIANTS.inline,
    size: LOADING_SIZES.small,
    color: LOADING_COLORS.inherit,
  },
} as const;

export const SKELETON_VARIANTS = {
  text: 'text',
  rectangular: 'rectangular',
  circular: 'circular',
} as const;

export const SKELETON_ANIMATIONS = {
  pulse: 'pulse',
  wave: 'wave',
  none: false,
} as const;

export const SKELETON_DEFAULTS = {
  textHeight: '1.2em',
  textWidth: '100%',
  rectangularHeight: 140,
  rectangularWidth: '100%',
  circularSize: 40,
  lines: 3,
  lineSpacing: 8,
} as const;

export const DEFAULT_LOADING_PROPS = {
  type: LOADING_SPINNER_TYPES.circular,
  size: LOADING_SIZES.medium,
  color: LOADING_COLORS.primary,
  variant: LOADING_VARIANTS.default,
  loading: true,
  backdrop: false,
  backdropOpacity: LOADING_BACKDROP_OPACITY.medium,
  disableBackdropClick: false,
  speed: 1,
  centered: false,
  fullWidth: false,
  fullHeight: false,
  delay: LOADING_DELAYS.instant,
  timeout: LOADING_TIMEOUTS.none,
  zIndex: LOADING_Z_INDEX.overlay,
} as const;