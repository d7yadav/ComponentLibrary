import { ProgressVariant, ProgressSize, ProgressColor, ProgressShape } from './Progress.types';

/**
 * PROGRESS_VARIANTS component
 * 
 * @returns JSX element
 */
export const PROGRESS_VARIANTS: Record<ProgressVariant, ProgressVariant> = {
  determinate: 'determinate',
  indeterminate: 'indeterminate',
  buffer: 'buffer',
  query: 'query',
} as const;

/**
 * PROGRESS_SIZES component
 * 
 * @returns JSX element
 */
export const PROGRESS_SIZES: Record<ProgressSize, ProgressSize> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * PROGRESS_COLORS component
 * 
 * @returns JSX element
 */
export const PROGRESS_COLORS: Record<ProgressColor, ProgressColor> = {
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
} as const;

/**
 * PROGRESS_SHAPES component
 * 
 * @returns JSX element
 */
export const PROGRESS_SHAPES: Record<ProgressShape, ProgressShape> = {
  linear: 'linear',
  circular: 'circular',
} as const;

/**
 * PROGRESS_SIZE_CONFIGS component
 * 
 * @returns JSX element
 */
export const PROGRESS_SIZE_CONFIGS = {
  small: {
    height: 4,
    thickness: 2,
    fontSize: '0.75rem',
    circularSize: 24,
    strokeWidth: 2,
    borderRadius: 2,
  },
  medium: {
    height: 6,
    thickness: 3,
    fontSize: '0.875rem',
    circularSize: 40,
    strokeWidth: 3,
    borderRadius: 3,
  },
  large: {
    height: 8,
    thickness: 4,
    fontSize: '1rem',
    circularSize: 56,
    strokeWidth: 4,
    borderRadius: 4,
  },
} as const;

/**
 * PROGRESS_ANIMATION_DURATIONS component
 * 
 * @returns JSX element
 */
export const PROGRESS_ANIMATION_DURATIONS = {
  fast: 200,
  normal: 500,
  slow: 1000,
  smooth: 300,
} as const;

/**
 * PROGRESS_ANIMATION_EASINGS component
 * 
 * @returns JSX element
 */
export const PROGRESS_ANIMATION_EASINGS = {
  linear: 'linear',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  spring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * PROGRESS_TRACK_COLORS component
 * 
 * @returns JSX element
 */
export const PROGRESS_TRACK_COLORS = {
  light: 'rgba(0, 0, 0, 0.1)',
  medium: 'rgba(0, 0, 0, 0.2)',
  dark: 'rgba(0, 0, 0, 0.3)',
  primary: 'rgba(25, 118, 210, 0.1)',
  secondary: 'rgba(156, 39, 176, 0.1)',
  error: 'rgba(211, 47, 47, 0.1)',
  warning: 'rgba(237, 108, 2, 0.1)',
  info: 'rgba(2, 136, 209, 0.1)',
  success: 'rgba(46, 125, 50, 0.1)',
} as const;

/**
 * PROGRESS_STRIPE_PATTERNS component
 * 
 * @returns JSX element
 */
export const PROGRESS_STRIPE_PATTERNS = {
  angle: 45, // Stripe angle in degrees
  width: 8, // Stripe width in pixels
  spacing: 8, // Spacing between stripes
} as const;

/**
 * ACCESSIBILITY_CONSTANTS component
 * 
 * @returns JSX element
 */
export const ACCESSIBILITY_CONSTANTS = {
  progressRole: 'progressbar',
  statusRole: 'status',
  alertRole: 'alert',
  regionRole: 'region',
  loadingLabel: 'Loading',
  progressLabel: 'Progress',
  completedLabel: 'Completed',
  liveRegionPolite: 'polite',
  liveRegionAssertive: 'assertive',
  minValue: 0,
  maxValue: 100,
} as const;

/**
 * PROGRESS_VALUE_FORMATTERS component
 * 
 * @returns JSX element
 */
export const PROGRESS_VALUE_FORMATTERS = {
  percentage: (value: number) => `${Math.round(value)}%`,
  fraction: (value: number, total = 100) => `${Math.round(value)}/${total}`,
  decimal: (value: number) => (value / 100).toFixed(2),
  time: (value: number, totalTime: number) => {
    const remaining = totalTime * (100 - value) / 100;
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')} remaining`;
  },
  bytes: (value: number, totalBytes: number) => {
    const completed = totalBytes * value / 100;
    const formatBytes = (bytes: number) => {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    };
    return `${formatBytes(completed)} / ${formatBytes(totalBytes)}`;
  },
} as const;

/**
 * PROGRESS_PATTERNS component
 * 
 * @returns JSX element
 */
export const PROGRESS_PATTERNS = {
  // File upload progress
  upload: {
    variant: PROGRESS_VARIANTS.determinate,
    color: PROGRESS_COLORS.primary,
    size: PROGRESS_SIZES.medium,
    showValue: true,
    animated: true,
    striped: true,
    valueFormat: PROGRESS_VALUE_FORMATTERS.percentage,
  },
  
  // Download progress
  download: {
    variant: PROGRESS_VARIANTS.determinate,
    color: PROGRESS_COLORS.info,
    size: PROGRESS_SIZES.medium,
    showValue: true,
    animated: true,
    valueFormat: PROGRESS_VALUE_FORMATTERS.bytes,
  },
  
  // Loading indicator
  loading: {
    variant: PROGRESS_VARIANTS.indeterminate,
    color: PROGRESS_COLORS.primary,
    size: PROGRESS_SIZES.small,
    animated: true,
  },
  
  // Form submission
  form: {
    variant: PROGRESS_VARIANTS.indeterminate,
    color: PROGRESS_COLORS.secondary,
    size: PROGRESS_SIZES.medium,
    animated: true,
    label: 'Submitting...',
  },
  
  // Data processing
  processing: {
    variant: PROGRESS_VARIANTS.determinate,
    color: PROGRESS_COLORS.warning,
    size: PROGRESS_SIZES.large,
    showValue: true,
    animated: true,
    striped: true,
    stripedAnimated: true,
  },
  
  // Success completion
  success: {
    variant: PROGRESS_VARIANTS.determinate,
    color: PROGRESS_COLORS.success,
    size: PROGRESS_SIZES.medium,
    value: 100,
    showValue: true,
    animated: true,
  },
  
  // Error state
  error: {
    variant: PROGRESS_VARIANTS.determinate,
    color: PROGRESS_COLORS.error,
    size: PROGRESS_SIZES.medium,
    animated: false,
    showValue: true,
  },
} as const;

/**
 * PROGRESS_THRESHOLDS component
 * 
 * @returns JSX element
 */
export const PROGRESS_THRESHOLDS = {
  // Progress value thresholds for different states
  warning: 75, // Show warning when progress exceeds this
  success: 100, // Show success when progress reaches this
  error: -1, // Show error when progress is negative or invalid
} as const;

/**
 * PROGRESS_PERFORMANCE component
 * 
 * @returns JSX element
 */
export const PROGRESS_PERFORMANCE = {
  // Performance optimization constants
  updateThrottle: 16, // Throttle updates to 60fps (16ms)
  batchSize: 10, // Number of progress bars to update in a batch
  animationThreshold: 5, // Minimum change to trigger animation
} as const;

/**
 * CIRCULAR_PROGRESS_CONSTANTS component
 * 
 * @returns JSX element
 */
export const CIRCULAR_PROGRESS_CONSTANTS = {
  // SVG constants for circular progress
  strokeDasharray: 100, // Total circumference for calculations
  strokeLinecap: 'round' as const,
  viewBox: '0 0 42 42',
  center: 21,
  radius: 20,
} as const;

/**
 * DEFAULT_PROGRESS_PROPS component
 * 
 * @returns JSX element
 */
export const DEFAULT_PROGRESS_PROPS = {
  variant: PROGRESS_VARIANTS.indeterminate,
  color: PROGRESS_COLORS.primary,
  size: PROGRESS_SIZES.medium,
  showValue: false,
  animated: true,
  animationDuration: PROGRESS_ANIMATION_DURATIONS.normal,
  striped: false,
  stripedAnimated: false,
  fullWidth: false,
  rounded: false,
  elevated: false,
  elevation: 0,
  showTrack: true,
  centered: false,
} as const;