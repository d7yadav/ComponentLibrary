/**
 * Drawer component constants and configuration
 */

// Drawer variants
export const DRAWER_VARIANTS = {
  temporary: 'temporary',
  persistent: 'persistent', 
  permanent: 'permanent',
  mini: 'mini',
} as const;

// Drawer anchor positions
export const DRAWER_ANCHORS = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
} as const;

// Drawer sizes with corresponding dimensions
export const DRAWER_SIZES = {
  compact: 'compact',
  standard: 'standard',
  wide: 'wide',
  auto: 'auto',
} as const;

// Drawer size dimensions
export const DRAWER_SIZE_DIMENSIONS = {
  compact: {
    left: '240px',
    right: '240px',
    top: '200px',
    bottom: '200px',
  },
  standard: {
    left: '280px',
    right: '280px',
    top: '250px',
    bottom: '250px',
  },
  wide: {
    left: '320px',
    right: '320px',
    top: '300px',
    bottom: '300px',
  },
  auto: {
    left: 'fit-content',
    right: 'fit-content',
    top: 'fit-content',
    bottom: 'fit-content',
  },
} as const;

// Mini drawer dimensions
export const MINI_DRAWER_DIMENSIONS = {
  collapsed: '64px',
  expanded: '280px',
} as const;

// Drawer behaviors
export const DRAWER_BEHAVIORS = {
  overlay: 'overlay',
  push: 'push',
  squeeze: 'squeeze',
} as const;

// Drawer animations
export const DRAWER_ANIMATIONS = {
  slide: 'slide',
  fade: 'fade',
  scale: 'scale',
  none: 'none',
} as const;

// Animation durations in milliseconds
export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 400,
} as const;

// Z-index values
export const Z_INDEX_VALUES = {
  backdrop: 1200,
  drawer: 1300,
  miniToggle: 1350,
} as const;

// Elevation levels
export const ELEVATION_LEVELS = {
  none: 0,
  low: 2,
  medium: 4,
  high: 8,
  highest: 16,
} as const;

// Breakpoints for responsive behavior
export const RESPONSIVE_BREAKPOINTS = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
} as const;

// Swipe gesture configuration
export const SWIPE_CONFIG = {
  threshold: 50, // Minimum distance for swipe detection
  velocity: 0.3, // Minimum velocity for swipe
  timeout: 300,  // Maximum time for swipe gesture
  edgeThreshold: 20, // Edge detection threshold for swipe-to-open
} as const;

// Touch positions for swipe detection
export const TOUCH_POSITIONS = {
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  deltaX: 0,
  deltaY: 0,
  startTime: 0,
} as const;

// Accessibility constants
export const ACCESSIBILITY_CONSTANTS = {
  drawerRole: 'dialog',
  drawerAriaLabel: 'Drawer navigation',
  toggleButtonAriaLabel: 'Toggle drawer',
  closeButtonAriaLabel: 'Close drawer',
  navigationRole: 'navigation',
  listRole: 'list',
  listItemRole: 'listitem',
  buttonRole: 'button',
  linkRole: 'link',
  
  // Focus selectors
  focusableSelector: [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input[type="text"]:not([disabled])',
    'input[type="radio"]:not([disabled])',
    'input[type="checkbox"]:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(','),
  
  // Keyboard navigation
  keys: {
    enter: 'Enter',
    space: ' ',
    escape: 'Escape',
    tab: 'Tab',
    arrowUp: 'ArrowUp',
    arrowDown: 'ArrowDown',
    arrowLeft: 'ArrowLeft',
    arrowRight: 'ArrowRight',
    home: 'Home',
    end: 'End',
  },
} as const;

// Content sections
export const CONTENT_SECTIONS = {
  header: 'header',
  navigation: 'navigation',
  body: 'body',
  footer: 'footer',
} as const;

// CSS custom properties for theming
export const CSS_VARIABLES = {
  drawerWidth: '--drawer-width',
  drawerHeight: '--drawer-height',
  drawerMiniWidth: '--drawer-mini-width',
  drawerZIndex: '--drawer-z-index',
  drawerTransition: '--drawer-transition',
  drawerShadow: '--drawer-shadow',
  drawerBackgroundColor: '--drawer-background-color',
  drawerBorderColor: '--drawer-border-color',
} as const;

// Default props
export const DEFAULT_PROPS = {
  variant: DRAWER_VARIANTS.temporary,
  anchor: DRAWER_ANCHORS.left,
  size: DRAWER_SIZES.standard,
  behavior: DRAWER_BEHAVIORS.overlay,
  animation: DRAWER_ANIMATIONS.slide,
  animationDuration: ANIMATION_DURATIONS.normal,
  elevation: true,
  elevationLevel: ELEVATION_LEVELS.medium,
  backdrop: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  swipeEnabled: true,
  collapsed: false,
  showToggleButton: true,
  fixedHeader: false,
  fixedFooter: false,
  disableAutoFocus: false,
  disableRestoreFocus: false,
  disableEnforceFocus: false,
  disableScrolling: false,
  responsive: false,
  responsiveBreakpoint: 'md',
  mobileVariant: DRAWER_VARIANTS.temporary,
} as const;

// Performance optimization
export const PERFORMANCE_CONFIG = {
  debounceDelay: 16, // ~60fps
  throttleDelay: 100,
  resizeDebounceDelay: 250,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  invalidVariant: 'Invalid drawer variant provided',
  invalidAnchor: 'Invalid drawer anchor provided',
  invalidSize: 'Invalid drawer size provided',
  invalidBehavior: 'Invalid drawer behavior provided',
  invalidAnimation: 'Invalid drawer animation provided',
  missingChildren: 'Drawer component requires children',
  invalidDimensions: 'Invalid width or height dimensions provided',
} as const;