
// Badge colors mapping to theme palette
export const BADGE_COLORS = {
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning',
} as const;

// Badge variants
export const BADGE_VARIANTS = {
  standard: 'standard',
  dot: 'dot',
} as const;

// Badge overlap modes
export const BADGE_OVERLAP = {
  rectangular: 'rectangular',
  circular: 'circular',
} as const;

// Badge anchor origins
export const BADGE_ANCHOR_ORIGINS = {
  topLeft: { vertical: 'top', horizontal: 'left' },
  topRight: { vertical: 'top', horizontal: 'right' },
  bottomLeft: { vertical: 'bottom', horizontal: 'left' },
  bottomRight: { vertical: 'bottom', horizontal: 'right' },
} as const;

// Badge size configurations using theme tokens
export const BADGE_SIZE_CONFIGS = {
  small: {
    height: 16,
    minWidth: 16,
    fontSize: '0.625rem', // 10px
    borderRadius: 8,
    padding: '0 4px',
    dotSize: 6,
  },
  medium: {
    height: 20,
    minWidth: 20,
    fontSize: '0.75rem', // 12px
    borderRadius: 10,
    padding: '0 6px',
    dotSize: 8,
  },
  large: {
    height: 24,
    minWidth: 24,
    fontSize: '0.875rem', // 14px
    borderRadius: 12,
    padding: '0 8px',
    dotSize: 10,
  },
} as const;

// Animation configurations
export const BADGE_ANIMATION_DURATIONS = {
  enter: '150ms',
  exit: '150ms',
  hover: '200ms',
} as const;

export const BADGE_ANIMATION_EASINGS = {
  enter: 'cubic-bezier(0.4, 0, 0.2, 1)',
  exit: 'cubic-bezier(0.4, 0, 0.2, 1)',
  hover: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Accessibility constants
export const BADGE_ACCESSIBILITY_CONSTANTS = {
  focusOutlineWidth: 2,
  focusOutlineOffset: 2,
  minTouchTarget: 44, // Minimum touch target size in pixels
} as const;

// Default props
export const BADGE_DEFAULT_PROPS = {
  color: 'default' as keyof typeof BADGE_COLORS,
  variant: 'standard' as keyof typeof BADGE_VARIANTS,
  size: 'medium' as keyof typeof BADGE_SIZE_CONFIGS,
  overlap: 'rectangular' as keyof typeof BADGE_OVERLAP,
  anchorOrigin: BADGE_ANCHOR_ORIGINS.topRight,
  showZero: false,
  max: 99,
  invisible: false,
} as const;