import type { GridProps as MuiGridProps } from '@mui/material/Grid';
import type { ReactNode } from 'react';

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
  children?: ReactNode;
  
  container?: boolean;
  
  item?: boolean;
  
  xs?: GridSize;
  
  sm?: GridSize;
  
  md?: GridSize;
  
  lg?: GridSize;
  
  xl?: GridSize;
  
  spacing?: GridSpacing;
  
  rowSpacing?: GridSpacing;
  
  columnSpacing?: GridSpacing;
  
  direction?: GridDirection;
  
  wrap?: GridWrap;
  
  justifyContent?: GridJustify;
  
  alignItems?: GridAlign;
  
  alignContent?: GridAlign;
  
  minHeight?: number | string;
  
  bgcolor?: string;
  
  autoFit?: boolean;
  
  autoFill?: boolean;
  
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
  
  useCssGrid?: boolean;
  
  className?: string;
  
  sx?: object;
  
  'aria-label'?: string;
  
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