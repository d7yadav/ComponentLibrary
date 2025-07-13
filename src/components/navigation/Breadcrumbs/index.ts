/**
 * @fileoverview Breadcrumbs Component Barrel Export
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Centralized exports for the Breadcrumbs component module, providing clean
 * import paths and consistent API surface for external consumers.
 */

// Main component exports
export { Breadcrumbs } from './Breadcrumbs';

// Type exports for TypeScript consumers
export type {
  BreadcrumbsProps,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbSize,
  BreadcrumbVariant,
  BreadcrumbClickHandler,
} from './Breadcrumbs.types';

// Constant exports for configuration
export {
  BREADCRUMBS_DEFAULTS,
  BREADCRUMB_SEPARATORS,
  BREADCRUMB_SIZES,
  BREADCRUMB_VARIANTS,
  SEPARATOR_CONFIGS,
  SIZE_CONFIGS,
  BREADCRUMBS_ACCESSIBILITY,
  BREADCRUMBS_ANIMATIONS,
  BREADCRUMBS_STYLES,
  BREADCRUMBS_KEYBOARD,
  BREADCRUMBS_ERRORS,
} from './Breadcrumbs.constants';