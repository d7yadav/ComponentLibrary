import type { SnackbarProps as MuiSnackbarProps } from '@mui/material/Snackbar';
import type { ReactNode } from 'react';

export type SnackbarOrigin = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

export type SnackbarSeverity = 'error' | 'warning' | 'info' | 'success';

export type SnackbarVariant = 'filled' | 'outlined' | 'standard';

export type SnackbarTransition = 'slide' | 'fade' | 'grow' | 'collapse';

export interface SnackbarAction {
  label: string,
  onClick: () => void,
  color?: 'inherit' | 'primary' | 'secondary',
}

export interface SnackbarProps extends Omit<MuiSnackbarProps, 'anchorOrigin' | 'action'> {
  message?: ReactNode,
  
  severity?: SnackbarSeverity,
  
  variant?: SnackbarVariant,
  
  title?: string,
  
  anchorOrigin?: SnackbarOrigin,
  
  open: boolean,
  
  onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void,
  
  autoHideDuration?: number | null,
  
  actions?: SnackbarAction[],
  
  closable?: boolean,
  
  icon?: ReactNode,
  
  showIcon?: boolean,
  
  transition?: SnackbarTransition,
  
  transitionDuration?: number,
  
  elevated?: boolean,
  
  elevation?: number,
  
  rounded?: boolean,
  
  borderRadius?: number | string,
  
  bgcolor?: string,
  
  color?: string,
  
  maxWidth?: number | string,
  
  clickAwayClose?: boolean,
  
  escapeKeyClose?: boolean,
  
  zIndex?: number,
  
  className?: string,
  
  sx?: object,
  
  'aria-label'?: string,
  
  'aria-describedby'?: string,
  
  role?: string,
}

export interface SnackbarStyleProps {
  severity?: SnackbarSeverity,
  variant: SnackbarVariant,
  elevated: boolean,
  elevation: number,
  rounded: boolean,
  borderRadius?: number | string,
  bgcolor?: string,
  color?: string,
  maxWidth?: number | string,
}

export interface SnackbarManager {
  show: (props: Omit<SnackbarProps, 'open'>) => string,
  
  hide: (id: string) => void,
  
  hideAll: () => void,
  
  success: (message: ReactNode, options?: Partial<SnackbarProps>) => string,
  
  error: (message: ReactNode, options?: Partial<SnackbarProps>) => string,
  
  warning: (message: ReactNode, options?: Partial<SnackbarProps>) => string,
  
  info: (message: ReactNode, options?: Partial<SnackbarProps>) => string,
}

export interface SnackbarQueue {
  id: string,
  props: SnackbarProps,
  timestamp: number,
}

export interface SnackbarConfiguration {
  maxSnackbars: number,
  
  defaultAutoHideDuration: number,
  
  defaultAnchorOrigin: SnackbarOrigin,
  
  defaultTransition: SnackbarTransition,
  
  stackSpacing: number,
}