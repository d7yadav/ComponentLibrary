import { StackDirection, StackJustify, StackAlign, StackWrap } from './Stack.types';

/**
 * STACK_DIRECTIONS component
 * 
 * @returns JSX element
 */
export const STACK_DIRECTIONS: Record<StackDirection, StackDirection> = {
  row: 'row',
  'row-reverse': 'row-reverse',
  column: 'column',
  'column-reverse': 'column-reverse',
} as const;

/**
 * STACK_JUSTIFY_CONTENT component
 * 
 * @returns JSX element
 */
export const STACK_JUSTIFY_CONTENT: Record<StackJustify, StackJustify> = {
  'flex-start': 'flex-start',
  center: 'center',
  'flex-end': 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
} as const;

/**
 * STACK_ALIGN_ITEMS component
 * 
 * @returns JSX element
 */
export const STACK_ALIGN_ITEMS: Record<StackAlign, StackAlign> = {
  'flex-start': 'flex-start',
  center: 'center',
  'flex-end': 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
} as const;

/**
 * STACK_FLEX_WRAP component
 * 
 * @returns JSX element
 */
export const STACK_FLEX_WRAP: Record<StackWrap, StackWrap> = {
  nowrap: 'nowrap',
  wrap: 'wrap',
  'wrap-reverse': 'wrap-reverse',
} as const;

/**
 * STACK_SPACING_VALUES component
 * 
 * @returns JSX element
 */
export const STACK_SPACING_VALUES = {
  none: 0,
  xs: 0.5,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  '2xl': 6,
  '3xl': 8,
} as const;

/**
 * STACK_BORDER_RADIUS component
 * 
 * @returns JSX element
 */
export const STACK_BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: '50%',
} as const;

/**
 * STACK_ELEVATION_VALUES component
 * 
 * @returns JSX element
 */
export const STACK_ELEVATION_VALUES = {
  none: 0,
  sm: 1,
  md: 3,
  lg: 6,
  xl: 12,
  '2xl': 24,
} as const;

/**
 * STACK_BREAKPOINTS component
 * 
 * @returns JSX element
 */
export const STACK_BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

/**
 * ACCESSIBILITY_CONSTANTS component
 * 
 * @returns JSX element
 */
export const ACCESSIBILITY_CONSTANTS = {
  listRole: 'list',
  listItemRole: 'listitem',
  groupRole: 'group',
  regionRole: 'region',
  navigationRole: 'navigation',
  toolbarRole: 'toolbar',
  menubarRole: 'menubar',
  tablistRole: 'tablist',
  defaultLabel: 'Stack layout',
} as const;

/**
 * DIVIDER_CONFIGS component
 * 
 * @returns JSX element
 */
export const DIVIDER_CONFIGS = {
  thickness: {
    thin: 1,
    medium: 2,
    thick: 4,
  },
  variants: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  },
  colors: {
    divider: 'divider',
    primary: 'primary.main',
    secondary: 'secondary.main',
    error: 'error.main',
    warning: 'warning.main',
    info: 'info.main',
    success: 'success.main',
  },
} as const;

/**
 * COMMON_STACK_PATTERNS component
 * 
 * @returns JSX element
 */
export const COMMON_STACK_PATTERNS = {
  // Navigation patterns
  navbar: {
    direction: STACK_DIRECTIONS.row,
    justifyContent: STACK_JUSTIFY_CONTENT['space-between'],
    alignItems: STACK_ALIGN_ITEMS.center,
    padding: 2,
    fullWidth: true,
  },
  
  sidebar: {
    direction: STACK_DIRECTIONS.column,
    spacing: 1,
    padding: 2,
    fullHeight: true,
  },
  
  // Content patterns
  hero: {
    direction: STACK_DIRECTIONS.column,
    justifyContent: STACK_JUSTIFY_CONTENT.center,
    alignItems: STACK_ALIGN_ITEMS.center,
    spacing: 3,
    minHeight: '50vh',
    centered: true,
  },
  
  card: {
    direction: STACK_DIRECTIONS.column,
    spacing: 2,
    padding: 3,
    rounded: true,
    elevation: 2,
  },
  
  // Form patterns
  form: {
    direction: STACK_DIRECTIONS.column,
    spacing: 2,
    fullWidth: true,
  },
  
  formActions: {
    direction: STACK_DIRECTIONS.row,
    justifyContent: STACK_JUSTIFY_CONTENT['flex-end'],
    spacing: 2,
  },
  
  // Button groups
  buttonGroup: {
    direction: STACK_DIRECTIONS.row,
    spacing: 1,
  },
  
  // Lists
  list: {
    direction: STACK_DIRECTIONS.column,
    spacing: 0,
    divider: true,
  },
  
  // Media
  mediaStack: {
    direction: STACK_DIRECTIONS.column,
    spacing: 2,
    alignItems: STACK_ALIGN_ITEMS.center,
  },
} as const;

/**
 * RESPONSIVE_PATTERNS component
 * 
 * @returns JSX element
 */
export const RESPONSIVE_PATTERNS = {
  // Mobile-first responsive direction
  mobileColumn: {
    xs: STACK_DIRECTIONS.column,
    sm: STACK_DIRECTIONS.column,
    md: STACK_DIRECTIONS.row,
    lg: STACK_DIRECTIONS.row,
    xl: STACK_DIRECTIONS.row,
  },
  
  // Desktop-first responsive direction
  desktopRow: {
    xs: STACK_DIRECTIONS.column,
    sm: STACK_DIRECTIONS.row,
    md: STACK_DIRECTIONS.row,
    lg: STACK_DIRECTIONS.row,
    xl: STACK_DIRECTIONS.row,
  },
  
  // Responsive spacing
  responsiveSpacing: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  
  // Responsive padding
  responsivePadding: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
  },
} as const;

/**
 * DEFAULT_STACK_PROPS component
 * 
 * @returns JSX element
 */
export const DEFAULT_STACK_PROPS = {
  direction: STACK_DIRECTIONS.column,
  spacing: STACK_SPACING_VALUES.md,
  justifyContent: STACK_JUSTIFY_CONTENT['flex-start'],
  alignItems: STACK_ALIGN_ITEMS.stretch,
  flexWrap: STACK_FLEX_WRAP.nowrap,
  fullWidth: false,
  fullHeight: false,
  rounded: false,
  bordered: false,
  elevation: STACK_ELEVATION_VALUES.none,
  stretch: false,
  centered: false,
  equalWidth: false,
  equalHeight: false,
} as const;