import { ReactNode } from 'react';
import { StackProps as MuiStackProps } from '@mui/material/Stack';

export type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type StackSpacing = number | string;

export type StackJustify = 
  | 'flex-start' 
  | 'center' 
  | 'flex-end' 
  | 'space-between' 
  | 'space-around' 
  | 'space-evenly';

export type StackAlign = 
  | 'flex-start' 
  | 'center' 
  | 'flex-end' 
  | 'stretch' 
  | 'baseline';

export type StackWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface ResponsiveStackDirection {
  xs?: StackDirection;
  sm?: StackDirection;
  md?: StackDirection;
  lg?: StackDirection;
  xl?: StackDirection;
}

export interface ResponsiveStackSpacing {
  xs?: StackSpacing;
  sm?: StackSpacing;
  md?: StackSpacing;
  lg?: StackSpacing;
  xl?: StackSpacing;
}

export interface StackProps extends Omit<MuiStackProps, 'direction' | 'spacing' | 'justifyContent' | 'alignItems'> {
  /**
   * The content of the stack
   */
  children: ReactNode;
  
  /**
   * Direction of the stack layout
   */
  direction?: StackDirection | ResponsiveStackDirection;
  
  /**
   * Spacing between stack items
   */
  spacing?: StackSpacing | ResponsiveStackSpacing;
  
  /**
   * Horizontal alignment of stack items
   */
  justifyContent?: StackJustify;
  
  /**
   * Vertical alignment of stack items
   */
  alignItems?: StackAlign;
  
  /**
   * Wrap behavior of stack items
   */
  flexWrap?: StackWrap;
  
  /**
   * If true, items will be divided by dividers
   */
  divider?: ReactNode;
  
  /**
   * If true, the stack will take the full width
   */
  fullWidth?: boolean;
  
  /**
   * If true, the stack will take the full height
   */
  fullHeight?: boolean;
  
  /**
   * Minimum height of the stack
   */
  minHeight?: number | string;
  
  /**
   * Maximum height of the stack
   */
  maxHeight?: number | string;
  
  /**
   * Minimum width of the stack
   */
  minWidth?: number | string;
  
  /**
   * Maximum width of the stack
   */
  maxWidth?: number | string;
  
  /**
   * Background color of the stack
   */
  bgcolor?: string;
  
  /**
   * Padding for the stack container
   */
  padding?: number | string;
  
  /**
   * Margin for the stack container
   */
  margin?: number | string;
  
  /**
   * If true, the stack will have rounded corners
   */
  rounded?: boolean;
  
  /**
   * Border radius value
   */
  borderRadius?: number | string;
  
  /**
   * If true, the stack will have a border
   */
  bordered?: boolean;
  
  /**
   * Border color
   */
  borderColor?: string;
  
  /**
   * Border width
   */
  borderWidth?: number | string;
  
  /**
   * Shadow level (0-24)
   */
  elevation?: number;
  
  /**
   * If true, items will grow to fill available space
   */
  stretch?: boolean;
  
  /**
   * If true, items will be centered in their cross axis
   */
  centered?: boolean;
  
  /**
   * If true, the stack will use flex-grow for equal distribution
   */
  equalWidth?: boolean;
  
  /**
   * If true, the stack will use flex-grow for equal distribution in height
   */
  equalHeight?: boolean;
  
  /**
   * Gap between items (alternative to spacing)
   */
  gap?: number | string;
  
  /**
   * Row gap between items
   */
  rowGap?: number | string;
  
  /**
   * Column gap between items
   */
  columnGap?: number | string;
  
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

export interface StackStyleProps {
  direction: StackDirection | ResponsiveStackDirection;
  spacing: StackSpacing | ResponsiveStackSpacing;
  justifyContent: StackJustify;
  alignItems: StackAlign;
  flexWrap: StackWrap;
  fullWidth: boolean;
  fullHeight: boolean;
  minHeight?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  bgcolor?: string;
  padding?: number | string;
  margin?: number | string;
  rounded: boolean;
  borderRadius?: number | string;
  bordered: boolean;
  borderColor?: string;
  borderWidth?: number | string;
  elevation: number;
  stretch: boolean;
  centered: boolean;
  equalWidth: boolean;
  equalHeight: boolean;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
}

export interface StackDividerProps {
  /**
   * Orientation of the divider
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Color of the divider
   */
  color?: string;
  
  /**
   * Thickness of the divider
   */
  thickness?: number | string;
  
  /**
   * Length of the divider
   */
  length?: number | string;
  
  /**
   * Style of the divider
   */
  variant?: 'solid' | 'dashed' | 'dotted';
}