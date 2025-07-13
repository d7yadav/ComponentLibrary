import { ReactNode } from 'react';
import { AlertProps as MuiAlertProps } from '@mui/material/Alert';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

export type AlertVariant = 'filled' | 'outlined' | 'standard';

export type AlertSize = 'small' | 'medium' | 'large';

export interface AlertAction {
  label: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary';
}

export interface AlertProps extends Omit<MuiAlertProps, 'severity' | 'variant' | 'action'> {
  /**
   * The content of the alert
   */
  children?: ReactNode;
  
  /**
   * The severity of the alert
   */
  severity?: AlertSeverity;
  
  /**
   * The variant of the alert
   */
  variant?: AlertVariant;
  
  /**
   * The size of the alert
   */
  size?: AlertSize;
  
  /**
   * The title of the alert
   */
  title?: string;
  
  /**
   * If true, the alert will show a close button
   */
  closable?: boolean;
  
  /**
   * Callback fired when the close button is clicked
   */
  onClose?: () => void;
  
  /**
   * Custom icon to display instead of the default severity icon
   */
  icon?: ReactNode;
  
  /**
   * If false, the severity icon will not be displayed
   */
  showIcon?: boolean;
  
  /**
   * Custom action buttons to display
   */
  actions?: AlertAction[];
  
  /**
   * If true, the alert will take the full width
   */
  fullWidth?: boolean;
  
  /**
   * If true, the alert will be elevated with shadow
   */
  elevated?: boolean;
  
  /**
   * Elevation level (0-24)
   */
  elevation?: number;
  
  /**
   * If true, the alert will be rounded
   */
  rounded?: boolean;
  
  /**
   * Border radius value
   */
  borderRadius?: number | string;
  
  /**
   * If true, the alert will be centered
   */
  centered?: boolean;
  
  /**
   * Custom background color
   */
  bgcolor?: string;
  
  /**
   * Custom text color
   */
  color?: string;
  
  /**
   * If true, the alert will be dismissible after a timeout
   */
  autoHide?: boolean;
  
  /**
   * Auto hide duration in milliseconds
   */
  autoHideDuration?: number;
  
  /**
   * If true, the alert will animate in
   */
  animated?: boolean;
  
  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;
  
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
  /**
   * Default auto hide duration
   */
  defaultAutoHideDuration: number;
  
  /**
   * Default animation duration
   */
  defaultAnimationDuration: number;
  
  /**
   * Maximum number of alerts to show
   */
  maxAlerts: number;
  
  /**
   * Default position for alerts
   */
  defaultPosition: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}