import type { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import type { ReactNode } from 'react';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

export type AlertVariant = 'filled' | 'outlined' | 'standard';

export type AlertSize = 'small' | 'medium' | 'large';

export interface AlertAction {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary';
}

export interface AlertProps extends Omit<MuiAlertProps, 'severity' | 'variant' | 'action' | 'color'> {
  children?: ReactNode;
  
  severity?: AlertSeverity;
  
  variant?: AlertVariant;
  
  size?: AlertSize;
  
  title?: string;
  
  closable?: boolean;
  
  onClose?: () => void;
  
  icon?: ReactNode;
  
  showIcon?: boolean;
  
  actions?: AlertAction[];
  
  fullWidth?: boolean;
  
  elevated?: boolean;
  
  elevation?: number;
  
  rounded?: boolean;
  
  borderRadius?: number | string;
  
  centered?: boolean;
  
  bgcolor?: string;
  
  color?: string;
  
  autoHide?: boolean;
  
  autoHideDuration?: number;
  
  animated?: boolean;
  
  animationDuration?: number;
  
  className?: string;
  
  sx?: object;
  
  'aria-label'?: string;
  
  'aria-describedby'?: string;
  
  role?: string;
}

export interface AlertStyleProps {
  severity: AlertSeverity;
  variant: AlertVariant;
  size: AlertSize;
  fullWidth: boolean;
  elevated: boolean;
  elevation: number;
  rounded: boolean;
  borderRadius?: number | string;
  centered: boolean;
  bgcolor?: string;
  color?: string;
  animated: boolean;
  animationDuration: number;
}

export interface AlertIconMapping {
  error: ReactNode;
  warning: ReactNode;
  info: ReactNode;
  success: ReactNode;
}

export interface AlertColorMapping {
  error: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  warning: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  info: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
}

export interface AlertConfiguration {
  defaultAutoHideDuration: number;
  
  defaultAnimationDuration: number;
  
  maxAlerts: number;
  
  defaultPosition: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}