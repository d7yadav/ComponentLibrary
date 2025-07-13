import { ReactNode } from 'react';
import { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress';
import { CircularProgressProps as MuiCircularProgressProps } from '@mui/material/CircularProgress';

export type ProgressVariant = 'determinate' | 'indeterminate' | 'buffer' | 'query';

export type ProgressSize = 'small' | 'medium' | 'large';

export type ProgressColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export type ProgressShape = 'linear' | 'circular';

export interface BaseProgressProps {
  /**
   * The variant of the progress indicator
   */
  variant?: ProgressVariant;
  
  /**
   * The value of the progress indicator (0-100)
   */
  value?: number;
  
  /**
   * The value for the buffer variant (0-100)
   */
  valueBuffer?: number;
  
  /**
   * The color of the progress indicator
   */
  color?: ProgressColor;
  
  /**
   * The size of the progress indicator
   */
  size?: ProgressSize;
  
  /**
   * Custom thickness for the progress bar
   */
  thickness?: number;
  
  /**
   * Label to display with the progress
   */
  label?: ReactNode;
  
  /**
   * If true, shows the percentage value
   */
  showValue?: boolean;
  
  /**
   * Custom value formatter function
   */
  valueFormat?: (value: number) => string;
  
  /**
   * If true, the progress will be animated
   */
  animated?: boolean;
  
  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;
  
  /**
   * If true, the progress will show stripes
   */
  striped?: boolean;
  
  /**
   * If true, the stripes will be animated
   */
  stripedAnimated?: boolean;
  
  /**
   * Custom background color
   */
  bgcolor?: string;
  
  /**
   * Custom progress color
   */
  progressColor?: string;
  
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
   * ARIA value text for accessibility
   */
  'aria-valuetext'?: string;
}

export interface LinearProgressProps extends Omit<MuiLinearProgressProps, 'variant' | 'value' | 'valueBuffer' | 'color'>, BaseProgressProps {
  /**
   * If true, the progress will take full width
   */
  fullWidth?: boolean;
  
  /**
   * Custom height for the progress bar
   */
  height?: number | string;
  
  /**
   * If true, the progress bar will be rounded
   */
  rounded?: boolean;
  
  /**
   * Border radius value
   */
  borderRadius?: number | string;
  
  /**
   * If true, the progress bar will be elevated
   */
  elevated?: boolean;
  
  /**
   * Elevation level (0-24)
   */
  elevation?: number;
}

export interface CircularProgressProps extends Omit<MuiCircularProgressProps, 'variant' | 'value' | 'color' | 'size'>, BaseProgressProps {
  /**
   * The size of the circular progress in pixels
   */
  customSize?: number;
  
  /**
   * If true, shows a track behind the progress
   */
  showTrack?: boolean;
  
  /**
   * Color of the track
   */
  trackColor?: string;
  
  /**
   * If true, the progress will have rounded line caps
   */
  rounded?: boolean;
  
  /**
   * Custom stroke width
   */
  strokeWidth?: number;
  
  /**
   * If true, the progress will be centered with label
   */
  centered?: boolean;
}

export interface ProgressStyleProps {
  variant: ProgressVariant;
  color: ProgressColor;
  size: ProgressSize;
  thickness?: number;
  animated: boolean;
  animationDuration: number;
  striped: boolean;
  stripedAnimated: boolean;
  bgcolor?: string;
  progressColor?: string;
}

export interface ProgressSizeConfig {
  height: number;
  thickness: number;
  fontSize: string;
  circularSize: number;
}

export interface ProgressConfiguration {
  /**
   * Default animation duration
   */
  defaultAnimationDuration: number;
  
  /**
   * Default update interval for smooth animations
   */
  updateInterval: number;
  
  /**
   * Performance threshold for animation optimization
   */
  performanceThreshold: number;
}