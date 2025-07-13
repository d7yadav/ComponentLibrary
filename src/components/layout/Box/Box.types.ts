import { ReactNode, ElementType } from 'react';
import { BoxProps as MuiBoxProps } from '@mui/material/Box';

export type BoxDisplay = 
  | 'block' 
  | 'inline' 
  | 'inline-block' 
  | 'flex' 
  | 'inline-flex' 
  | 'grid' 
  | 'inline-grid' 
  | 'none'
  | 'contents';

export type BoxPosition = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export type BoxOverflow = 'visible' | 'hidden' | 'scroll' | 'auto';

export type BoxTextAlign = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';

export type BoxVerticalAlign = 'baseline' | 'top' | 'middle' | 'bottom' | 'text-top' | 'text-bottom';

export type BoxFlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type BoxFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type BoxJustifyContent = 
  | 'flex-start' 
  | 'flex-end' 
  | 'center' 
  | 'space-between' 
  | 'space-around' 
  | 'space-evenly';

export type BoxAlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

export type BoxAlignContent = 
  | 'flex-start' 
  | 'flex-end' 
  | 'center' 
  | 'space-between' 
  | 'space-around' 
  | 'stretch';

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export interface BoxProps extends Omit<MuiBoxProps, 'component'> {
  /**
   * The content of the box
   */
  children?: ReactNode;
  
  /**
   * The component used for the root node
   */
  component?: ElementType;
  
  // Display properties
  display?: BoxDisplay | ResponsiveValue<BoxDisplay>;
  position?: BoxPosition | ResponsiveValue<BoxPosition>;
  overflow?: BoxOverflow | ResponsiveValue<BoxOverflow>;
  textAlign?: BoxTextAlign | ResponsiveValue<BoxTextAlign>;
  verticalAlign?: BoxVerticalAlign | ResponsiveValue<BoxVerticalAlign>;
  
  // Size properties
  width?: number | string | ResponsiveValue<number | string>;
  height?: number | string | ResponsiveValue<number | string>;
  minWidth?: number | string | ResponsiveValue<number | string>;
  minHeight?: number | string | ResponsiveValue<number | string>;
  maxWidth?: number | string | ResponsiveValue<number | string>;
  maxHeight?: number | string | ResponsiveValue<number | string>;
  
  // Spacing properties
  m?: number | string | ResponsiveValue<number | string>; // margin
  mt?: number | string | ResponsiveValue<number | string>; // margin-top
  mr?: number | string | ResponsiveValue<number | string>; // margin-right
  mb?: number | string | ResponsiveValue<number | string>; // margin-bottom
  ml?: number | string | ResponsiveValue<number | string>; // margin-left
  mx?: number | string | ResponsiveValue<number | string>; // margin-left & margin-right
  my?: number | string | ResponsiveValue<number | string>; // margin-top & margin-bottom
  
  p?: number | string | ResponsiveValue<number | string>; // padding
  pt?: number | string | ResponsiveValue<number | string>; // padding-top
  pr?: number | string | ResponsiveValue<number | string>; // padding-right
  pb?: number | string | ResponsiveValue<number | string>; // padding-bottom
  pl?: number | string | ResponsiveValue<number | string>; // padding-left
  px?: number | string | ResponsiveValue<number | string>; // padding-left & padding-right
  py?: number | string | ResponsiveValue<number | string>; // padding-top & padding-bottom
  
  // Position properties
  top?: number | string | ResponsiveValue<number | string>;
  right?: number | string | ResponsiveValue<number | string>;
  bottom?: number | string | ResponsiveValue<number | string>;
  left?: number | string | ResponsiveValue<number | string>;
  zIndex?: number | ResponsiveValue<number>;
  
  // Flexbox properties
  flexDirection?: BoxFlexDirection | ResponsiveValue<BoxFlexDirection>;
  flexWrap?: BoxFlexWrap | ResponsiveValue<BoxFlexWrap>;
  justifyContent?: BoxJustifyContent | ResponsiveValue<BoxJustifyContent>;
  alignItems?: BoxAlignItems | ResponsiveValue<BoxAlignItems>;
  alignContent?: BoxAlignContent | ResponsiveValue<BoxAlignContent>;
  alignSelf?: BoxAlignItems | ResponsiveValue<BoxAlignItems>;
  flex?: number | string | ResponsiveValue<number | string>;
  flexGrow?: number | ResponsiveValue<number>;
  flexShrink?: number | ResponsiveValue<number>;
  flexBasis?: number | string | ResponsiveValue<number | string>;
  gap?: number | string | ResponsiveValue<number | string>;
  rowGap?: number | string | ResponsiveValue<number | string>;
  columnGap?: number | string | ResponsiveValue<number | string>;
  
  // Grid properties
  gridTemplateColumns?: string | ResponsiveValue<string>;
  gridTemplateRows?: string | ResponsiveValue<string>;
  gridTemplateAreas?: string | ResponsiveValue<string>;
  gridColumn?: string | ResponsiveValue<string>;
  gridRow?: string | ResponsiveValue<string>;
  gridArea?: string | ResponsiveValue<string>;
  gridAutoColumns?: string | ResponsiveValue<string>;
  gridAutoRows?: string | ResponsiveValue<string>;
  gridAutoFlow?: string | ResponsiveValue<string>;
  
  // Color properties
  color?: string | ResponsiveValue<string>;
  bgcolor?: string | ResponsiveValue<string>;
  
  // Border properties
  border?: string | number | ResponsiveValue<string | number>;
  borderTop?: string | number | ResponsiveValue<string | number>;
  borderRight?: string | number | ResponsiveValue<string | number>;
  borderBottom?: string | number | ResponsiveValue<string | number>;
  borderLeft?: string | number | ResponsiveValue<string | number>;
  borderColor?: string | ResponsiveValue<string>;
  borderRadius?: number | string | ResponsiveValue<number | string>;
  
  // Shadow properties
  boxShadow?: string | number | ResponsiveValue<string | number>;
  
  // Typography properties
  fontSize?: number | string | ResponsiveValue<number | string>;
  fontWeight?: number | string | ResponsiveValue<number | string>;
  lineHeight?: number | string | ResponsiveValue<number | string>;
  letterSpacing?: number | string | ResponsiveValue<number | string>;
  
  // Custom styling shortcuts
  centered?: boolean; // Centers content using flexbox
  rounded?: boolean | number; // Applies border radius
  elevated?: boolean | number; // Applies box shadow
  fullWidth?: boolean; // Sets width to 100%
  fullHeight?: boolean; // Sets height to 100%
  clickable?: boolean; // Adds hover effects
  
  // Additional CSS classes
  className?: string;
  
  // Custom styles (sx prop)
  sx?: object;
  
  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
}

export interface BoxStyleProps {
  display?: BoxDisplay | ResponsiveValue<BoxDisplay>;
  position?: BoxPosition | ResponsiveValue<BoxPosition>;
  overflow?: BoxOverflow | ResponsiveValue<BoxOverflow>;
  textAlign?: BoxTextAlign | ResponsiveValue<BoxTextAlign>;
  verticalAlign?: BoxVerticalAlign | ResponsiveValue<BoxVerticalAlign>;
  width?: number | string | ResponsiveValue<number | string>;
  height?: number | string | ResponsiveValue<number | string>;
  minWidth?: number | string | ResponsiveValue<number | string>;
  minHeight?: number | string | ResponsiveValue<number | string>;
  maxWidth?: number | string | ResponsiveValue<number | string>;
  maxHeight?: number | string | ResponsiveValue<number | string>;
  centered: boolean;
  rounded: boolean | number;
  elevated: boolean | number;
  fullWidth: boolean;
  fullHeight: boolean;
  clickable: boolean;
}

export interface BoxBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}