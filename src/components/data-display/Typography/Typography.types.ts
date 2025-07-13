import { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import { ReactNode } from 'react';

export type TypographyVariant = 
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2';

export type TypographyColor = 
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'text.primary'
  | 'text.secondary'
  | 'text.disabled'
  | 'inherit';

export type TypographyAlign = 
  | 'inherit'
  | 'left'
  | 'center'
  | 'right'
  | 'justify';

export type TypographyTransform = 
  | 'none'
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
  | 'initial'
  | 'inherit';

export type TypographyWeight = 
  | 'light'
  | 'regular'
  | 'medium'
  | 'bold'
  | 300
  | 400
  | 500
  | 700;

export type TypographyDisplay = 
  | 'initial'
  | 'block'
  | 'inline'
  | 'inline-block'
  | 'none';

export type TypographyComponent = 
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'caption'
  | 'figcaption'
  | 'strong'
  | 'em'
  | 'small'
  | 'mark'
  | 'del'
  | 'ins'
  | 'sub'
  | 'sup';

export interface TypographyProps extends Omit<MuiTypographyProps, 'variant' | 'color' | 'align'> {
  /**
   * The typography variant to use
   */
  variant?: TypographyVariant;
  
  /**
   * The color of the text
   */
  color?: TypographyColor;
  
  /**
   * The alignment of the text
   */
  align?: TypographyAlign;
  
  /**
   * The text transformation to apply
   */
  textTransform?: TypographyTransform;
  
  /**
   * The font weight to apply
   */
  fontWeight?: TypographyWeight;
  
  /**
   * The display CSS property
   */
  display?: TypographyDisplay;
  
  /**
   * The HTML element to render
   */
  component?: TypographyComponent;
  
  /**
   * If true, the text will not wrap but instead will truncate with a text overflow ellipsis
   */
  noWrap?: boolean;
  
  /**
   * If true, the text will have a paragraph margin bottom
   */
  paragraph?: boolean;
  
  /**
   * If true, the text will have gutters (margin bottom)
   */
  gutterBottom?: boolean;
  
  /**
   * The content of the typography element
   */
  children?: ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Custom styling object
   */
  sx?: Record<string, any>;
  
  /**
   * Maximum number of lines to display before truncating
   */
  maxLines?: number;
  
  /**
   * If true, enables responsive typography scaling
   */
  responsive?: boolean;
  
  /**
   * Custom font size (overrides variant sizing)
   */
  fontSize?: string | number;
  
  /**
   * Custom line height
   */
  lineHeight?: string | number;
  
  /**
   * Custom letter spacing
   */
  letterSpacing?: string | number;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * ARIA described by for accessibility
   */
  'aria-describedby'?: string;
  
  /**
   * ARIA level for heading elements
   */
  'aria-level'?: number;
  
  /**
   * Role attribute for accessibility
   */
  role?: string;
  
  /**
   * ID attribute
   */
  id?: string;
  
  /**
   * Title attribute
   */
  title?: string;
}

export interface TypographyStyleProps {
  customVariant: TypographyVariant;
  customColor: TypographyColor;
  customAlign: TypographyAlign;
  textTransform: TypographyTransform;
  fontWeight: TypographyWeight;
  display: TypographyDisplay;
  noWrap: boolean;
  paragraph: boolean;
  gutterBottom: boolean;
  maxLines?: number;
  responsive: boolean;
  fontSize?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
}

export interface ResponsiveTypographyConfig {
  xs?: Partial<TypographyStyleProps>;
  sm?: Partial<TypographyStyleProps>;
  md?: Partial<TypographyStyleProps>;
  lg?: Partial<TypographyStyleProps>;
  xl?: Partial<TypographyStyleProps>;
}