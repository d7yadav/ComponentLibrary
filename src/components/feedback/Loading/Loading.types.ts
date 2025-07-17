import type { ReactNode } from 'react';

export type LoadingSpinnerType = 
  | 'circular' 
  | 'dots' 
  | 'bars' 
  | 'pulse' 
  | 'bounce' 
  | 'ring' 
  | 'wave' 
  | 'ripple'
  | 'skeleton';

export type LoadingSize = 'small' | 'medium' | 'large';

export type LoadingColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';

export type LoadingVariant = 'default' | 'overlay' | 'inline' | 'button' | 'page';

export interface LoadingProps {
  type?: LoadingSpinnerType;
  size?: LoadingSize;
  color?: LoadingColor;
  variant?: LoadingVariant;
  customSize?: number;
  loading?: boolean;
  message?: ReactNode;
  backdrop?: boolean;
  backdropOpacity?: number;
  disableBackdropClick?: boolean;
  speed?: number;
  centered?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  minHeight?: number | string;
  customColor?: string;
  children?: ReactNode;
  delay?: number;
  timeout?: number;
  onTimeout?: () => void;
  zIndex?: number;
  className?: string;
  sx?: object;
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
}

export interface LoadingStyleProps {
  type: LoadingSpinnerType;
  size: LoadingSize;
  color: LoadingColor;
  variant: LoadingVariant;
  customSize?: number;
  speed: number;
  centered: boolean;
  fullWidth: boolean;
  fullHeight: boolean;
  minHeight?: number | string;
  customColor?: string;
  backdropOpacity: number;
}

export interface LoadingSizeConfig {
  small: number;
  medium: number;
  large: number;
}

export interface LoadingAnimation {
  duration: number;
  easing: string;
  iterations: number | 'infinite';
}

export interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  animation?: boolean | 'pulse' | 'wave';
  lines?: number;
  className?: string;
  sx?: object;
}