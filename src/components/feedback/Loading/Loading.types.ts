import { ReactNode } from 'react';

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
  /**
   * The type of loading spinner
   */
  type?: LoadingSpinnerType;
  
  /**
   * The size of the loading indicator
   */
  size?: LoadingSize;
  
  /**
   * The color of the loading indicator
   */
  color?: LoadingColor;
  
  /**
   * The variant of the loading component
   */
  variant?: LoadingVariant;
  
  /**
   * Custom size in pixels
   */
  customSize?: number;
  
  /**
   * If true, the loading indicator will be visible
   */
  loading?: boolean;
  
  /**
   * Message to display with the loading indicator
   */
  message?: ReactNode;
  
  /**
   * If true, shows a backdrop behind the loading indicator
   */
  backdrop?: boolean;
  
  /**
   * Backdrop opacity (0-1)
   */
  backdropOpacity?: number;
  
  /**
   * If true, clicking the backdrop will not close the loading
   */
  disableBackdropClick?: boolean;
  
  /**
   * Animation speed multiplier
   */
  speed?: number;
  
  /**
   * If true, the loading will be centered
   */
  centered?: boolean;
  
  /**
   * If true, the loading will take full width
   */
  fullWidth?: boolean;
  
  /**
   * If true, the loading will take full height
   */
  fullHeight?: boolean;
  
  /**
   * Minimum height for the loading area
   */
  minHeight?: number | string;
  
  /**
   * Custom color override
   */
  customColor?: string;
  
  /**
   * Children to render when not loading
   */
  children?: ReactNode;
  
  /**
   * Delay before showing the loading indicator (ms)
   */
  delay?: number;
  
  /**
   * Timeout for the loading indicator (ms)
   */
  timeout?: number;
  
  /**
   * Callback fired when timeout is reached
   */
  onTimeout?: () => void;
  
  /**
   * Z-index for overlay variants
   */
  zIndex?: number;
  
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
   * ARIA described by for accessibility
   */
  'aria-describedby'?: string;
  
  /**
   * Role for accessibility
   */
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
  /**
   * The variant of the skeleton
   */
  variant?: 'text' | 'rectangular' | 'circular';
  
  /**
   * The width of the skeleton
   */
  width?: number | string;
  
  /**
   * The height of the skeleton
   */
  height?: number | string;
  
  /**
   * If true, the skeleton will animate
   */
  animation?: boolean | 'pulse' | 'wave';
  
  /**
   * Number of skeleton lines for text variant
   */
  lines?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Custom styles
   */
  sx?: object;
}