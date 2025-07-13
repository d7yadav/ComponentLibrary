/**
 * @fileoverview Breadcrumbs Component Constants
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Constants for the Breadcrumbs component including default values,
 * configuration options, accessibility settings, and animation parameters.
 */

import type {
  BreadcrumbSeparator,
  BreadcrumbSize,
  BreadcrumbVariant,
  BreadcrumbsDefaultProps,
} from './Breadcrumbs.types';

/**
 * Default component configuration
 */
export const BREADCRUMBS_DEFAULTS: BreadcrumbsDefaultProps = {
  separator: 'slash',
  maxItems: 8,
  itemsAfterCollapse: 1,
  itemsBeforeCollapse: 1,
  size: 'medium',
  variant: 'standard',
  expandOnClick: true,
  disabled: false,
} as const;

/**
 * Available separator types
 */
export const BREADCRUMB_SEPARATORS: readonly BreadcrumbSeparator[] = [
  'slash',
  'chevron',
  'arrow',
  'dot',
  'custom',
] as const;

/**
 * Available sizes
 */
export const BREADCRUMB_SIZES: readonly BreadcrumbSize[] = [
  'small',
  'medium',
  'large',
] as const;

/**
 * Available variants
 */
export const BREADCRUMB_VARIANTS: readonly BreadcrumbVariant[] = [
  'standard',
  'text',
  'contained',
] as const;

/**
 * Separator configurations
 */
export const SEPARATOR_CONFIGS = {
  slash: {
    content: '/',
    ariaLabel: 'separator',
  },
  chevron: {
    content: '›',
    ariaLabel: 'chevron separator',
  },
  arrow: {
    content: '→',
    ariaLabel: 'arrow separator',
  },
  dot: {
    content: '•',
    ariaLabel: 'dot separator',
  },
  custom: {
    content: '',
    ariaLabel: 'custom separator',
  },
} as const;

/**
 * Size configurations
 */
export const SIZE_CONFIGS = {
  small: {
    fontSize: '0.75rem',
    padding: '4px 6px',
    iconSize: '14px',
    minHeight: '24px',
  },
  medium: {
    fontSize: '0.875rem',
    padding: '6px 8px',
    iconSize: '16px',
    minHeight: '32px',
  },
  large: {
    fontSize: '1rem',
    padding: '8px 12px',
    iconSize: '18px',
    minHeight: '40px',
  },
} as const;

/**
 * Accessibility constants
 */
export const BREADCRUMBS_ACCESSIBILITY = {
  /** Default aria-label for breadcrumbs container */
  defaultAriaLabel: 'Breadcrumb navigation',
  /** Role for breadcrumbs container */
  navigationRole: 'navigation',
  /** Role for breadcrumb list */
  listRole: 'list',
  /** Role for breadcrumb items */
  listItemRole: 'listitem',
  /** ARIA attribute for current page */
  ariaCurrent: 'page',
  /** ARIA attribute for expanded state */
  ariaExpanded: 'aria-expanded',
  /** ARIA attribute for describing separators */
  ariaHidden: 'aria-hidden',
  /** ARIA label for expand button */
  expandButtonLabel: 'Show more breadcrumbs',
  /** ARIA label for collapse indicator */
  collapseIndicatorLabel: 'More breadcrumbs available',
} as const;

/**
 * Animation constants
 */
export const BREADCRUMBS_ANIMATIONS = {
  /** Transition duration for expand/collapse */
  expandDuration: 300,
  /** Transition duration for hover effects */
  hoverDuration: 150,
  /** Transition easing function */
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Fade in animation duration */
  fadeInDuration: 200,
  /** Scale animation for active items */
  scaleActive: 1.05,
} as const;

/**
 * Style constants
 */
export const BREADCRUMBS_STYLES = {
  /** Maximum width before truncation */
  maxItemWidth: '200px',
  /** Spacing between items */
  itemSpacing: '8px',
  /** Border radius for contained variant */
  borderRadius: '4px',
  /** Hover opacity */
  hoverOpacity: 0.7,
  /** Disabled opacity */
  disabledOpacity: 0.5,
  /** Focus outline width */
  focusOutlineWidth: '2px',
  /** Collapse indicator width */
  collapseIndicatorWidth: '32px',
} as const;

/**
 * Keyboard navigation constants
 */
export const BREADCRUMBS_KEYBOARD = {
  /** Keys that trigger click */
  clickKeys: ['Enter', ' '],
  /** Keys for navigation */
  navigationKeys: ['ArrowLeft', 'ArrowRight', 'Home', 'End'],
  /** Key for expanding collapsed items */
  expandKey: 'Enter',
} as const;

/**
 * Error messages
 */
export const BREADCRUMBS_ERRORS = {
  invalidSeparator: 'Invalid separator type provided',
  invalidSize: 'Invalid size provided',
  invalidVariant: 'Invalid variant provided',
  emptyItems: 'Breadcrumbs items array cannot be empty',
  invalidMaxItems: 'maxItems must be greater than 0',
  invalidCollapseConfig: 'itemsBeforeCollapse + itemsAfterCollapse must be less than maxItems',
} as const;