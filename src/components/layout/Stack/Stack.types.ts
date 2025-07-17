import type { StackProps as MuiStackProps } from '@mui/material/Stack';
import type { ReactNode } from 'react';

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
  xs?: StackDirection,
  sm?: StackDirection,
  md?: StackDirection,
  lg?: StackDirection,
  xl?: StackDirection,
}

export interface ResponsiveStackSpacing {
  xs?: StackSpacing,
  sm?: StackSpacing,
  md?: StackSpacing,
  lg?: StackSpacing,
  xl?: StackSpacing,
}

export interface StackProps extends Omit<MuiStackProps, 'direction' | 'spacing' | 'justifyContent' | 'alignItems'> {
  children: ReactNode,
  
  direction?: StackDirection | ResponsiveStackDirection,
  
  spacing?: StackSpacing | ResponsiveStackSpacing,
  
  justifyContent?: StackJustify,
  
  alignItems?: StackAlign,
  
  flexWrap?: StackWrap,
  
  divider?: ReactNode,
  
  fullWidth?: boolean,
  
  fullHeight?: boolean,
  
  minHeight?: number | string,
  
  maxHeight?: number | string,
  
  minWidth?: number | string,
  
  maxWidth?: number | string,
  
  bgcolor?: string,
  
  padding?: number | string,
  
  margin?: number | string,
  
  rounded?: boolean,
  
  borderRadius?: number | string,
  
  bordered?: boolean,
  
  borderColor?: string,
  
  borderWidth?: number | string,
  
  elevation?: number,
  
  stretch?: boolean,
  
  centered?: boolean,
  
  equalWidth?: boolean,
  
  equalHeight?: boolean,
  
  gap?: number | string,
  
  rowGap?: number | string,
  
  columnGap?: number | string,
  
  className?: string,
  
  sx?: object,
  
  'aria-label'?: string,
  
  role?: string,
}

export interface StackStyleProps {
  direction: StackDirection | ResponsiveStackDirection,
  spacing: StackSpacing | ResponsiveStackSpacing,
  justifyContent: StackJustify,
  alignItems: StackAlign,
  flexWrap: StackWrap,
  fullWidth: boolean,
  fullHeight: boolean,
  minHeight?: number | string,
  maxHeight?: number | string,
  minWidth?: number | string,
  maxWidth?: number | string,
  bgcolor?: string,
  padding?: number | string,
  margin?: number | string,
  rounded: boolean,
  borderRadius?: number | string,
  bordered: boolean,
  borderColor?: string,
  borderWidth?: number | string,
  elevation: number,
  stretch: boolean,
  centered: boolean,
  equalWidth: boolean,
  equalHeight: boolean,
  gap?: number | string,
  rowGap?: number | string,
  columnGap?: number | string,
}

export interface StackDividerProps {
  orientation?: 'horizontal' | 'vertical',
  
  color?: string,
  
  thickness?: number | string,
  
  length?: number | string,
  
  variant?: 'solid' | 'dashed' | 'dotted',
}