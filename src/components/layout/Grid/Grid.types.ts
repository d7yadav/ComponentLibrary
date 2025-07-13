import { ReactNode } from 'react';
import { GridProps as MuiGridProps } from '@mui/material/Grid';

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | true;

export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type GridJustify = 
  | 'flex-start' 
  | 'center' 
  | 'flex-end' 
  | 'space-between' 
  | 'space-around' 
  | 'space-evenly';

export type GridAlign = 
  | 'flex-start' 
  | 'center' 
  | 'flex-end' 
  | 'stretch' 
  | 'baseline';

export type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ResponsiveGridSize {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
}

export interface GridProps extends Omit<MuiGridProps, 'container' | 'item' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'spacing' | 'direction' | 'wrap' | 'justifyContent' | 'alignItems'> {
  /**
   * The content of the grid
   */
  children?: ReactNode;
  
  /**
   * If true, the component will have the container behavior
   */
  container?: boolean;
  
  /**
   * If true, the component will have the item behavior
   */
  item?: boolean;
  
  /**
   * Grid size for xs breakpoint and up
   */
  xs?: GridSize;
  
  /**
   * Grid size for sm breakpoint and up
   */
  sm?: GridSize;
  
  /**
   * Grid size for md breakpoint and up
   */
  md?: GridSize;
  
  /**
   * Grid size for lg breakpoint and up
   */
  lg?: GridSize;
  
  /**
   * Grid size for xl breakpoint and up
   */
  xl?: GridSize;
  
  /**
   * Spacing between grid items
   */
  spacing?: GridSpacing;
  
  /**
   * Row spacing between grid items
   */
  rowSpacing?: GridSpacing;
  
  /**
   * Column spacing between grid items
   */
  columnSpacing?: GridSpacing;
  
  /**
   * Direction of the grid layout
   */
  direction?: GridDirection;
  
  /**
   * Wrap behavior of grid items
   */
  wrap?: GridWrap;
  
  /**
   * Horizontal alignment of grid items
   */
  justifyContent?: GridJustify;
  
  /**
   * Vertical alignment of grid items
   */
  alignItems?: GridAlign;
  
  /**
   * Vertical alignment of content when container has extra height
   */
  alignContent?: GridAlign;
  
  /**
   * Minimum height of the grid container
   */
  minHeight?: number | string;
  
  /**
   * Background color of the grid
   */
  bgcolor?: string;
  
  /**
   * If true, grid will have auto-fit columns
   */
  autoFit?: boolean;
  
  /**
   * If true, grid will have auto-fill columns
   */
  autoFill?: boolean;
  
  /**
   * Minimum column width for auto layouts
   */
  minColumnWidth?: number | string;
  
  /**
   * Maximum column width for auto layouts
   */
  maxColumnWidth?: number | string;
  
  /**
   * Number of columns for CSS Grid layout
   */
  columns?: number | string;
  
  /**
   * Number of rows for CSS Grid layout
   */
  rows?: number | string;
  
  /**
   * Gap between grid items (CSS Grid)
   */
  gap?: number | string;
  
  /**
   * Row gap between grid items (CSS Grid)
   */
  rowGap?: number | string;
  
  /**
   * Column gap between grid items (CSS Grid)
   */
  columnGap?: number | string;
  
  /**
   * CSS Grid template areas
   */
  templateAreas?: string;
  
  /**
   * CSS Grid template columns
   */
  templateColumns?: string;
  
  /**
   * CSS Grid template rows
   */
  templateRows?: string;
  
  /**
   * If true, uses CSS Grid instead of Flexbox
   */
  useCssGrid?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Custom styles
   */
  sx?: object;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Role for accessibility
   */
  role?: string;
}

export interface GridStyleProps {
  container: boolean;
  item: boolean;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  spacing: GridSpacing;
  rowSpacing?: GridSpacing;
  columnSpacing?: GridSpacing;
  direction: GridDirection;
  wrap: GridWrap;
  justifyContent: GridJustify;
  alignItems: GridAlign;
  alignContent?: GridAlign;
  bgcolor?: string;
  minHeight?: number | string;
  autoFit: boolean;
  autoFill: boolean;
  minColumnWidth?: number | string;
  maxColumnWidth?: number | string;
  columns?: number | string;
  rows?: number | string;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  templateAreas?: string;
  templateColumns?: string;
  templateRows?: string;
  useCssGrid: boolean;
}

export interface GridBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface AutoLayoutConfig {
  minWidth: number | string;
  maxWidth: number | string;
  fit: boolean;
  fill: boolean;
}