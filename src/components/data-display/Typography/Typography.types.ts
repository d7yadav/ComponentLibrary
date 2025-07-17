import type { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import type { ReactNode } from 'react';

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
  variant?: TypographyVariant;
  
  color?: TypographyColor;
  
  align?: TypographyAlign;
  
  textTransform?: TypographyTransform;
  
  fontWeight?: TypographyWeight;
  
  display?: TypographyDisplay;
  
  component?: TypographyComponent;
  
  noWrap?: boolean;
  
  paragraph?: boolean;
  
  gutterBottom?: boolean;
  
  children?: ReactNode;
  
  className?: string;
  
  sx?: Record<string, any>;
  
  maxLines?: number;
  
  responsive?: boolean;
  
  fontSize?: string | number;
  
  lineHeight?: string | number;
  
  letterSpacing?: string | number;
  
  'aria-label'?: string;
  
  'aria-describedby'?: string;
  
  'aria-level'?: number;
  
  role?: string;
  
  id?: string;
  
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