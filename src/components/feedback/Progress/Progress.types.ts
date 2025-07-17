import type { CircularProgressProps as MuiCircularProgressProps } from '@mui/material/CircularProgress';
import type { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress';
import type { ReactNode } from 'react';

export type ProgressVariant = 'determinate' | 'indeterminate' | 'buffer' | 'query';

export type ProgressSize = 'small' | 'medium' | 'large';

export type ProgressColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export type ProgressShape = 'linear' | 'circular';

export interface BaseProgressProps {
  variant?: ProgressVariant,
  
  value?: number,
  
  valueBuffer?: number,
  
  color?: ProgressColor,
  
  size?: ProgressSize,
  
  thickness?: number,
  
  label?: ReactNode,
  
  showValue?: boolean,
  
  valueFormat?: (value: number) => string,
  
  animated?: boolean,
  
  animationDuration?: number,
  
  striped?: boolean,
  
  stripedAnimated?: boolean,
  
  bgcolor?: string,
  
  progressColor?: string,
  
  className?: string,
  
  sx?: object,
  
  'aria-label'?: string,
  
  'aria-describedby'?: string,
  
  'aria-valuetext'?: string,
}

export interface LinearProgressProps extends Omit<MuiLinearProgressProps, 'variant' | 'value' | 'valueBuffer' | 'color' | 'sx'>, BaseProgressProps {
  fullWidth?: boolean,
  
  height?: number | string,
  
  rounded?: boolean,
  
  borderRadius?: number | string,
  
  elevated?: boolean,
  
  elevation?: number,
}

export interface CircularProgressProps extends Omit<MuiCircularProgressProps, 'variant' | 'value' | 'color' | 'size' | 'sx'>, BaseProgressProps {
  customSize?: number,
  
  showTrack?: boolean,
  
  trackColor?: string,
  
  rounded?: boolean,
  
  strokeWidth?: number,
  
  centered?: boolean,
}

export interface ProgressStyleProps {
  variant: ProgressVariant,
  color: ProgressColor,
  size: ProgressSize,
  thickness?: number,
  animated: boolean,
  animationDuration: number,
  striped: boolean,
  stripedAnimated: boolean,
  bgcolor?: string,
  progressColor?: string,
}

export interface ProgressSizeConfig {
  height: number,
  thickness: number,
  fontSize: string,
  circularSize: number,
}

export interface ProgressConfiguration {
  defaultAnimationDuration: number,
  
  updateInterval: number,
  
  performanceThreshold: number,
}