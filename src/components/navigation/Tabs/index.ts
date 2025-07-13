/**
 * @fileoverview Tabs Component Barrel Export
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Centralized exports for the Tabs component module, providing clean
 * import paths and consistent API surface for external consumers.
 */

// Main component exports
export { Tabs, TabPanel } from './Tabs';

// Type exports for TypeScript consumers
export type {
  TabsProps,
  TabPanelProps,
  TabData,
  TabsOrientation,
  TabsVariant,
  TabsIndicatorColor,
  TabsScrollButtons,
  TabChangeHandler,
} from './Tabs.types';

// Constant exports for configuration
export {
  TABS_DEFAULTS,
  TABS_ORIENTATIONS,
  TABS_VARIANTS,
  TABS_INDICATOR_COLORS,
  TABS_SCROLL_BUTTONS,
  TABS_ACCESSIBILITY,
  TABS_ANIMATIONS,
  TABS_STYLES,
  TABS_KEYBOARD,
} from './Tabs.constants';