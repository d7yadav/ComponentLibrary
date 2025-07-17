
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode, MouseEvent } from 'react';

export type BreadcrumbSeparator = 'slash' | 'chevron' | 'arrow' | 'dot' | 'custom';

export type BreadcrumbSize = 'small' | 'medium' | 'large';

export type BreadcrumbVariant = 'standard' | 'text' | 'contained';

export type BreadcrumbClickHandler = (event: MouseEvent<HTMLElement>, id: string) => void;

export interface BreadcrumbItem {
  /** Unique identifier for the breadcrumb */
  id: string;
  /** Display label for the breadcrumb */
  label: ReactNode;
  /** Optional href for link breadcrumbs */
  href?: string;
  /** Whether the breadcrumb is disabled */
  disabled?: boolean;
  /** Icon to display before the label */
  icon?: ReactNode;
  /** Click handler for the breadcrumb */
  onClick?: BreadcrumbClickHandler;
  /** Accessibility label */
  'aria-label'?: string;
  /** Whether this is the current page */
  current?: boolean;
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator between breadcrumbs */
  separator?: BreadcrumbSeparator | ReactNode;
  /** Maximum number of breadcrumbs to show */
  maxItems?: number;
  /** Number of items to show after collapse */
  itemsAfterCollapse?: number;
  /** Number of items to show before collapse */
  itemsBeforeCollapse?: number;
  /** Size of the breadcrumbs */
  size?: BreadcrumbSize;
  /** Variant of the breadcrumbs */
  variant?: BreadcrumbVariant;
  /** Whether to expand all items on click */
  expandOnClick?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styling */
  sx?: SxProps<Theme>;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Accessibility label for the breadcrumbs container */
  'aria-label'?: string;
  /** ID for the breadcrumbs container */
  id?: string;
  /** Test ID for automated testing */
  'data-testid'?: string;
}

export interface BreadcrumbsTheme {
  breadcrumbs: {
    root: object;
    separator: object;
    item: object;
    link: object;
    current: object;
    collapsed: object;
  };
}

export interface BreadcrumbsDefaultProps {
  separator: BreadcrumbSeparator;
  maxItems: number;
  itemsAfterCollapse: number;
  itemsBeforeCollapse: number;
  size: BreadcrumbSize;
  variant: BreadcrumbVariant;
  expandOnClick: boolean;
  disabled: false;
}

// Note: Types are exported inline above