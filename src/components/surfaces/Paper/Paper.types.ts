import type { PaperProps as MuiPaperProps } from '@mui/material/Paper';
import type { ReactNode } from 'react';

export type PaperVariant = 
  | 'elevation'
  | 'outlined'
  | 'filled'
  | 'glass'
  | 'gradient';

export type PaperElevation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

export type PaperCorners = 
  | 'none'
  | 'small'
  | 'medium'
  | 'large'
  | 'circular';

export type PaperSurface = 
  | 'flat'
  | 'concave'
  | 'convex';

export type PaperSize = 
  | 'compact'
  | 'comfortable'
  | 'spacious';

export type PaperGradient = 
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface PaperProps extends Omit<MuiPaperProps, 'variant' | 'elevation'> {
  variant?: PaperVariant,
  
  elevation?: PaperElevation,
  
  corners?: PaperCorners,
  
  surface?: PaperSurface,
  
  size?: PaperSize,
  
  gradient?: PaperGradient,
  
  interactive?: boolean,
  
  glassMorphism?: boolean,
  
  responsive?: boolean,
  
  printFriendly?: boolean,
  
  hoverElevation?: PaperElevation,
  
  pressedElevation?: PaperElevation,
  
  backgroundColor?: string,
  
  borderColor?: string,
  
  borderWidth?: string | number,
  
  children?: ReactNode,
  
  className?: string,
  
  sx?: any,
  
  padding?: string | number,
  
  margin?: string | number,
  
  animationDuration?: number,
  
  zIndex?: number,
  
  transitions?: boolean,
  
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto',
  
  maxWidth?: string | number,
  
  maxHeight?: string | number,
  
  minWidth?: string | number,
  
  minHeight?: string | number,
  
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void,
  
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void,
  
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void,
  
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void,
  
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void,
  
  'aria-label'?: string,
  
  'aria-describedby'?: string,
  
  'aria-labelledby'?: string,
  
  role?: string,
  
  tabIndex?: number,
  
  id?: string,
  
  'data-testid'?: string,
}

export interface PaperStyleProps {
  customVariant: PaperVariant,
  customElevation: PaperElevation,
  corners: PaperCorners,
  surface: PaperSurface,
  size: PaperSize,
  gradient: PaperGradient,
  interactive: boolean,
  glassMorphism: boolean,
  responsive: boolean,
  printFriendly: boolean,
  hoverElevation?: PaperElevation,
  pressedElevation?: PaperElevation,
  backgroundColor?: string,
  borderColor?: string,
  borderWidth?: string | number,
  padding?: string | number,
  margin?: string | number,
  animationDuration: number,
  transitions: boolean,
  overflow?: string,
  maxWidth?: string | number,
  maxHeight?: string | number,
  minWidth?: string | number,
  minHeight?: string | number,
  zIndex?: number,
}

export interface PaperSizeConfig {
  padding: string,
  margin: string,
  borderRadius: string,
}

export interface PaperCornerConfig {
  borderRadius: string,
}

export interface PaperSurfaceConfig {
  boxShadow: string,
  background: string,
  borderStyle?: string,
}

export interface PaperGradientConfig {
  background: string,
  fallbackColor: string,
}

export interface ResponsivePaperConfig {
  xs?: Partial<PaperStyleProps>,
  sm?: Partial<PaperStyleProps>,
  md?: Partial<PaperStyleProps>,
  lg?: Partial<PaperStyleProps>,
  xl?: Partial<PaperStyleProps>,
}