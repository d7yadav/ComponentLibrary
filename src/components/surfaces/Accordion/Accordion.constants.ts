/**
 * Accordion component constants
 * Provides configuration values for variants, sizes, transitions, and accessibility
 */

export const ACCORDION_VARIANTS = {
  standard: 'standard',
  outlined: 'outlined',
  elevated: 'elevated',
  flat: 'flat',
  card: 'card',
} as const;

export const ACCORDION_SIZES = {
  compact: 'compact',
  comfortable: 'comfortable',
  spacious: 'spacious',
} as const;

export const ACCORDION_EXPAND_MODES = {
  single: 'single',
  multiple: 'multiple',
} as const;

export const ACCORDION_ICON_POSITIONS = {
  start: 'start',
  end: 'end',
  both: 'both',
  none: 'none',
} as const;

export const ACCORDION_TRANSITIONS = {
  smooth: 'smooth',
  fast: 'fast',
  slow: 'slow',
  none: 'none',
} as const;

export const ACCORDION_FOCUS_COLORS = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  fast: 150,
  smooth: 300,
  slow: 500,
  none: 0,
} as const;

// Size configurations
export const SIZE_CONFIGS = {
  compact: {
    summaryPadding: '12px 16px',
    detailsPadding: '8px 16px 16px',
    actionsPadding: '8px 16px 16px',
    iconSize: '20px',
    fontSize: '0.875rem',
    lineHeight: 1.43,
  },
  comfortable: {
    summaryPadding: '16px 20px',
    detailsPadding: '12px 20px 20px',
    actionsPadding: '12px 20px 20px',
    iconSize: '24px',
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  spacious: {
    summaryPadding: '20px 24px',
    detailsPadding: '16px 24px 24px',
    actionsPadding: '16px 24px 24px',
    iconSize: '28px',
    fontSize: '1.125rem',
    lineHeight: 1.56,
  },
} as const;

// Elevation values for elevated variant
export const ELEVATION_VALUES = {
  default: 2,
  hover: 4,
  expanded: 6,
  disabled: 0,
} as const;

// Border radius values
export const BORDER_RADIUS = {
  default: '8px',
  card: '12px',
  square: '0px',
} as const;

// Transition timing functions
export const TRANSITION_EASINGS = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  slow: 'cubic-bezier(0.23, 1, 0.320, 1)',
  none: 'linear',
} as const;

// Z-index values
export const Z_INDEX = {
  accordion: 1,
  expanded: 2,
  elevated: 3,
} as const;

// Accessibility constants
export const ACCESSIBILITY_CONSTANTS = {
  // ARIA roles
  accordionRole: 'region',
  buttonRole: 'button',
  
  // ARIA attributes
  ariaExpanded: 'aria-expanded',
  ariaControls: 'aria-controls',
  ariaLabelledBy: 'aria-labelledby',
  ariaDescribedBy: 'aria-describedby',
  
  // Default labels
  expandLabel: 'Expand section',
  collapseLabel: 'Collapse section',
  
  // Keyboard navigation
  keyboardKeys: {
    enter: 'Enter',
    space: ' ',
    arrowDown: 'ArrowDown',
    arrowUp: 'ArrowUp',
    home: 'Home',
    end: 'End',
  },
  
  // Focus management
  focusableElements: [
    'button',
    '[href]',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', '),
} as const;

// Default props
export const DEFAULT_PROPS = {
  variant: ACCORDION_VARIANTS.standard,
  size: ACCORDION_SIZES.comfortable,
  expandMode: ACCORDION_EXPAND_MODES.single,
  iconPosition: ACCORDION_ICON_POSITIONS.end,
  transition: ACCORDION_TRANSITIONS.smooth,
  expanded: false,
  disabled: false,
  disableGutters: false,
  showDivider: false,
  disableToggle: false,
  square: false,
  dense: false,
  focusColor: ACCORDION_FOCUS_COLORS.primary,
  elevation: ELEVATION_VALUES.default,
  animationDuration: ANIMATION_DURATIONS.smooth,
} as const;

// Test IDs
export const TEST_IDS = {
  accordion: 'accordion',
  summary: 'accordion-summary',
  details: 'accordion-details',
  actions: 'accordion-actions',
  expandIcon: 'accordion-expand-icon',
  startIcon: 'accordion-start-icon',
  endIcon: 'accordion-end-icon',
  subtitle: 'accordion-subtitle',
  divider: 'accordion-divider',
} as const;

// CSS custom properties
export const CSS_VARIABLES = {
  // Animation
  animationDuration: '--accordion-animation-duration',
  animationEasing: '--accordion-animation-easing',
  
  // Spacing
  summaryPadding: '--accordion-summary-padding',
  detailsPadding: '--accordion-details-padding',
  actionsPadding: '--accordion-actions-padding',
  
  // Typography
  fontSize: '--accordion-font-size',
  lineHeight: '--accordion-line-height',
  
  // Colors
  backgroundColor: '--accordion-background-color',
  borderColor: '--accordion-border-color',
  focusColor: '--accordion-focus-color',
  
  // Elevation
  elevation: '--accordion-elevation',
  
  // Border radius
  borderRadius: '--accordion-border-radius',
} as const;

// Performance optimization
export const PERFORMANCE_CONFIG = {
  // Debounce delay for resize events
  resizeDebounceDelay: 100,
  
  // Maximum simultaneous animations
  maxSimultaneousAnimations: 3,
  
  // Virtual scrolling threshold
  virtualScrollThreshold: 50,
  
  // Memory cleanup interval
  cleanupInterval: 30000, // 30 seconds
} as const;