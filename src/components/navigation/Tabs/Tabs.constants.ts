/**
 * @fileoverview Tabs Component Constants
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Constants and configuration values for the Tabs component including
 * default values, styling constants, and accessibility settings.
 */

import type { 
  TabsDefaultProps,
  TabsOrientation,
  TabsVariant,
  TabsIndicatorColor,
  TabsScrollButtons 
} from './Tabs.types';

/**
 * Component default props
 */
export const TABS_DEFAULTS: TabsDefaultProps = {
  orientation: 'horizontal',
  variant: 'standard',
  indicatorColor: 'primary',
  textColor: 'primary',
  centered: false,
  scrollButtons: 'auto',
  allowScrollButtonsMobile: false,
  showPanels: true,
  disabled: false,
  loading: false,
};

/**
 * Available orientation options
 */
export const TABS_ORIENTATIONS: readonly TabsOrientation[] = [
  'horizontal',
  'vertical',
] as const;

/**
 * Available variant options
 */
export const TABS_VARIANTS: readonly TabsVariant[] = [
  'standard',
  'scrollable',
  'fullWidth',
] as const;

/**
 * Available indicator color options
 */
export const TABS_INDICATOR_COLORS: readonly TabsIndicatorColor[] = [
  'primary',
  'secondary',
] as const;

/**
 * Available scroll button options
 */
export const TABS_SCROLL_BUTTONS: readonly TabsScrollButtons[] = [
  'auto',
  'desktop',
  'on',
  'off',
] as const;

/**
 * Accessibility constants
 */
export const TABS_ACCESSIBILITY = {
  /** Default aria-label for tabs container */
  defaultAriaLabel: 'Tabs navigation',
  /** Role for tab elements */
  tabRole: 'tab',
  /** Role for tablist container */
  tablistRole: 'tablist',
  /** Role for tabpanel content */
  tabpanelRole: 'tabpanel',
  /** ARIA attribute for selected tabs */
  ariaSelected: 'aria-selected',
  /** ARIA attribute for tab controls */
  ariaControls: 'aria-controls',
  /** ARIA attribute for panel labelling */
  ariaLabelledBy: 'aria-labelledby',
  /** ARIA attribute for disabled tabs */
  ariaDisabled: 'aria-disabled',
} as const;

/**
 * Animation and timing constants
 */
export const TABS_ANIMATIONS = {
  /** Tab transition duration (ms) */
  transitionDuration: 300,
  /** Indicator animation duration (ms) */
  indicatorDuration: 250,
  /** Panel fade duration (ms) */
  panelFadeDuration: 200,
  /** Scroll animation duration (ms) */
  scrollDuration: 300,
  /** Loading animation duration (ms) */
  loadingDuration: 1000,
} as const;

/**
 * Styling constants
 */
export const TABS_STYLES = {
  /** Default tab height */
  tabHeight: 48,
  /** Compact tab height */
  compactTabHeight: 40,
  /** Tab minimum width */
  tabMinWidth: 90,
  /** Tab maximum width */
  tabMaxWidth: 360,
  /** Indicator thickness */
  indicatorThickness: 2,
  /** Tab padding horizontal */
  tabPaddingX: 16,
  /** Tab padding vertical */
  tabPaddingY: 12,
  /** Icon spacing */
  iconSpacing: 8,
  /** Panel padding */
  panelPadding: 24,
} as const;

/**
 * Keyboard navigation constants
 */
export const TABS_KEYBOARD = {
  /** Arrow keys for navigation */
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  /** Home/End keys */
  home: 'Home',
  end: 'End',
  /** Space and Enter for activation */
  space: ' ',
  enter: 'Enter',
  /** Tab key for focus management */
  tab: 'Tab',
} as const;

/**
 * Breakpoint constants for responsive behavior
 */
export const TABS_BREAKPOINTS = {
  /** Mobile breakpoint */
  mobile: 600,
  /** Tablet breakpoint */
  tablet: 960,
  /** Desktop breakpoint */
  desktop: 1280,
} as const;

/**
 * Z-index constants for layering
 */
export const TABS_Z_INDEX = {
  /** Tab indicator layer */
  indicator: 1,
  /** Tab content layer */
  tab: 2,
  /** Loading overlay */
  loading: 1000,
} as const;

/**
 * Data attribute constants for testing and selection
 */
export const TABS_DATA_ATTRIBUTES = {
  /** Tab element identifier */
  tab: 'data-tab',
  /** Tab panel identifier */
  panel: 'data-tabpanel',
  /** Active tab indicator */
  active: 'data-active',
  /** Disabled tab indicator */
  disabled: 'data-disabled',
  /** Loading state indicator */
  loading: 'data-loading',
} as const;

/**
 * Error messages for development
 */
export const TABS_ERRORS = {
  /** Empty tabs array */
  emptyTabs: 'Tabs component requires at least one tab',
  /** Invalid tab value */
  invalidValue: 'Tab value must match one of the provided tab values',
  /** Missing required props */
  missingProps: 'Tabs component requires tabs prop',
  /** Invalid orientation */
  invalidOrientation: 'Invalid orientation value',
  /** Invalid variant */
  invalidVariant: 'Invalid variant value',
} as const;