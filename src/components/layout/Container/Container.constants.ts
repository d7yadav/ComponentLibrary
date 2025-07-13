import { ContainerMaxWidth, ContainerVariant } from './Container.types';

/**
 * CONTAINER_VARIANTS component
 * 
 * @returns JSX element
 */
export const CONTAINER_VARIANTS: Record<ContainerVariant, ContainerVariant> = {
  fluid: 'fluid',
  fixed: 'fixed',
  constrained: 'constrained',
} as const;

/**
 * CONTAINER_MAX_WIDTHS component
 * 
 * @returns JSX element
 */
export const CONTAINER_MAX_WIDTHS: Record<string, ContainerMaxWidth> = {
  xs: 'xs',
  sm: 'sm', 
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  false: false,
} as const;

/**
 * CONTAINER_BREAKPOINTS component
 * 
 * @returns JSX element
 */
export const CONTAINER_BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

/**
 * CONTAINER_MAX_WIDTH_VALUES component
 * 
 * @returns JSX element
 */
export const CONTAINER_MAX_WIDTH_VALUES = {
  xs: 444,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

/**
 * CONTAINER_GUTTERS component
 * 
 * @returns JSX element
 */
export const CONTAINER_GUTTERS = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 32,
  xl: 32,
} as const;

/**
 * CONTAINER_PADDING_CONFIGS component
 * 
 * @returns JSX element
 */
export const CONTAINER_PADDING_CONFIGS = {
  none: 0,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

/**
 * CONTAINER_MARGIN_CONFIGS component
 * 
 * @returns JSX element
 */
export const CONTAINER_MARGIN_CONFIGS = {
  none: 0,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
  auto: 'auto',
} as const;

/**
 * CONTAINER_ELEVATION_CONFIGS component
 * 
 * @returns JSX element
 */
export const CONTAINER_ELEVATION_CONFIGS = {
  none: 0,
  subtle: 1,
  low: 2,
  medium: 4,
  high: 8,
  higher: 12,
  highest: 24,
} as const;

/**
 * CONTAINER_BORDER_RADIUS component
 * 
 * @returns JSX element
 */
export const CONTAINER_BORDER_RADIUS = {
  none: 0,
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
} as const;

/**
 * ACCESSIBILITY_CONSTANTS component
 * 
 * @returns JSX element
 */
export const ACCESSIBILITY_CONSTANTS = {
  defaultRole: 'main',
  sectionRole: 'section',
  regionRole: 'region',
  containerLabel: 'Content container',
} as const;

/**
 * CONTAINER_VARIANT_CONFIGS component
 * 
 * @returns JSX element
 */
export const CONTAINER_VARIANT_CONFIGS = {
  fluid: {
    maxWidth: false,
    padding: CONTAINER_GUTTERS,
    centered: false,
    description: 'Full width container with gutters',
  },
  fixed: {
    maxWidth: 'lg' as ContainerMaxWidth,
    padding: CONTAINER_GUTTERS,
    centered: true,
    description: 'Fixed width container centered on page',
  },
  constrained: {
    maxWidth: 'md' as ContainerMaxWidth,
    padding: CONTAINER_GUTTERS,
    centered: true,
    description: 'Constrained width container for optimal reading',
  },
} as const;

/**
 * RESPONSIVE_BEHAVIOR component
 * 
 * @returns JSX element
 */
export const RESPONSIVE_BEHAVIOR = {
  fluid: {
    xs: '100%',
    sm: '100%', 
    md: '100%',
    lg: '100%',
    xl: '100%',
  },
  fixed: {
    xs: '100%',
    sm: `${CONTAINER_MAX_WIDTH_VALUES.sm}px`,
    md: `${CONTAINER_MAX_WIDTH_VALUES.md}px`,
    lg: `${CONTAINER_MAX_WIDTH_VALUES.lg}px`,
    xl: `${CONTAINER_MAX_WIDTH_VALUES.xl}px`,
  },
  constrained: {
    xs: '100%',
    sm: `${CONTAINER_MAX_WIDTH_VALUES.sm}px`,
    md: `${CONTAINER_MAX_WIDTH_VALUES.md}px`,
    lg: `${CONTAINER_MAX_WIDTH_VALUES.md}px`,
    xl: `${CONTAINER_MAX_WIDTH_VALUES.md}px`,
  },
} as const;

/**
 * DEFAULT_CONTAINER_PROPS component
 * 
 * @returns JSX element
 */
export const DEFAULT_CONTAINER_PROPS = {
  variant: CONTAINER_VARIANTS.fixed,
  maxWidth: CONTAINER_MAX_WIDTHS.lg,
  centered: true,
  disableGutters: false,
  fluid: false,
  bordered: false,
  rounded: false,
  elevation: CONTAINER_ELEVATION_CONFIGS.none,
} as const;