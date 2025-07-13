import { PaperProps as MuiPaperProps } from '@mui/material/Paper';
import { ReactNode } from 'react';

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
  /**
   * The variant of the paper
   */
  variant?: PaperVariant;
  
  /**
   * The elevation level of the paper (0-24)
   */
  elevation?: PaperElevation;
  
  /**
   * The corner radius style
   */
  corners?: PaperCorners;
  
  /**
   * The surface treatment
   */
  surface?: PaperSurface;
  
  /**
   * The size variant affecting padding and spacing
   */
  size?: PaperSize;
  
  /**
   * The gradient variant (only applies to gradient variant)
   */
  gradient?: PaperGradient;
  
  /**
   * If true, enables interactive hover effects
   */
  interactive?: boolean;
  
  /**
   * If true, enables glass morphism effect (glass variant)
   */
  glassMorphism?: boolean;
  
  /**
   * If true, enables responsive padding and sizing
   */
  responsive?: boolean;
  
  /**
   * If true, optimizes for print media
   */
  printFriendly?: boolean;
  
  /**
   * Custom hover elevation (only for interactive papers)
   */
  hoverElevation?: PaperElevation;
  
  /**
   * Custom pressed elevation (only for interactive papers)
   */
  pressedElevation?: PaperElevation;
  
  /**
   * Custom background color (overrides variant)
   */
  backgroundColor?: string;
  
  /**
   * Custom border color (for outlined variant)
   */
  borderColor?: string;
  
  /**
   * Custom border width (for outlined variant)
   */
  borderWidth?: string | number;
  
  /**
   * The content of the paper
   */
  children?: ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Custom styling object
   */
  sx?: any;
  
  /**
   * Custom padding override
   */
  padding?: string | number;
  
  /**
   * Custom margin override
   */
  margin?: string | number;
  
  /**
   * Animation duration for hover effects
   */
  animationDuration?: number;
  
  /**
   * Z-index override
   */
  zIndex?: number;
  
  /**
   * If true, enables smooth transitions
   */
  transitions?: boolean;
  
  /**
   * Content overflow handling
   */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  
  /**
   * Maximum width constraint
   */
  maxWidth?: string | number;
  
  /**
   * Maximum height constraint
   */
  maxHeight?: string | number;
  
  /**
   * Minimum width constraint
   */
  minWidth?: string | number;
  
  /**
   * Minimum height constraint
   */
  minHeight?: string | number;
  
  /**
   * Click handler for interactive papers
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /**
   * Mouse enter handler for interactive papers
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /**
   * Mouse leave handler for interactive papers
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /**
   * Focus handler for interactive papers
   */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  
  /**
   * Blur handler for interactive papers
   */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * ARIA described by for accessibility
   */
  'aria-describedby'?: string;
  
  /**
   * ARIA labelledby for accessibility
   */
  'aria-labelledby'?: string;
  
  /**
   * Role attribute for accessibility
   */
  role?: string;
  
  /**
   * Tabindex for focusable papers
   */
  tabIndex?: number;
  
  /**
   * ID attribute
   */
  id?: string;
  
  /**
   * Test ID for automated testing
   */
  'data-testid'?: string;
}

export interface PaperStyleProps {
  customVariant: PaperVariant;
  customElevation: PaperElevation;
  corners: PaperCorners;
  surface: PaperSurface;
  size: PaperSize;
  gradient: PaperGradient;
  interactive: boolean;
  glassMorphism: boolean;
  responsive: boolean;
  printFriendly: boolean;
  hoverElevation?: PaperElevation;
  pressedElevation?: PaperElevation;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string | number;
  padding?: string | number;
  margin?: string | number;
  animationDuration: number;
  transitions: boolean;
  overflow?: string;
  maxWidth?: string | number;
  maxHeight?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  zIndex?: number;
}

export interface PaperSizeConfig {
  padding: string;
  margin: string;
  borderRadius: string;
}

export interface PaperCornerConfig {
  borderRadius: string;
}

export interface PaperSurfaceConfig {
  boxShadow: string;
  background: string;
  borderStyle?: string;
}

export interface PaperGradientConfig {
  background: string;
  fallbackColor: string;
}

export interface ResponsivePaperConfig {
  xs?: Partial<PaperStyleProps>;
  sm?: Partial<PaperStyleProps>;
  md?: Partial<PaperStyleProps>;
  lg?: Partial<PaperStyleProps>;
  xl?: Partial<PaperStyleProps>;
}