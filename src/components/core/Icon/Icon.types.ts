import type { SvgIconProps } from '@mui/material';
import type { ComponentType, ReactElement } from 'react';

export type IconSize = 'small' | 'medium' | 'large' | 'xl';

export type IconColor = 
  | 'inherit'
  | 'primary' 
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'disabled';

export type IconVariant = 'filled' | 'outlined' | 'rounded' | 'sharp' | 'twoTone';

export type IconLibrary = 'material' | 'custom';

export interface IconProps extends Omit<SvgIconProps, 'color' | 'fontSize'> {
  name?: string;
  
  component?: ComponentType<SvgIconProps>;
  
  variant?: IconVariant;
  
  size?: IconSize;
  
  color?: IconColor;
  
  library?: IconLibrary;
  
  animated?: boolean;
  
  animationDuration?: number;
  
  rotation?: number;
  
  flipX?: boolean;
  
  flipY?: boolean;
  
  loading?: boolean;
  
  loadingIcon?: ReactElement;
  
  'aria-label'?: string;
  
  'data-testid'?: string;
}

export interface IconRef {
  getElement: () => SVGSVGElement | null;
  
  focus: () => void;
  
  blur: () => void;
}

export interface IconSizeMap {
  small: number;
  medium: number;
  large: number;
  xl: number;
}

export interface IconState {
  isLoading: boolean;
  isAnimating: boolean;
}

export interface ExtendedIconState extends IconState {
  iconComponent: React.ComponentType<any> | null;
}