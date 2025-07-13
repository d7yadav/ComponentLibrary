import { ReactNode } from 'react';
import { SnackbarProps as MuiSnackbarProps } from '@mui/material/Snackbar';

export type SnackbarOrigin = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

export type SnackbarSeverity = 'error' | 'warning' | 'info' | 'success';

export type SnackbarVariant = 'filled' | 'outlined' | 'standard';

export type SnackbarTransition = 'slide' | 'fade' | 'grow' | 'collapse';

export interface SnackbarAction {
  label: string;
  onClick: () => void;
  color?: 'inherit' | 'primary' | 'secondary';
}

export interface SnackbarProps extends Omit<MuiSnackbarProps, 'anchorOrigin' | 'action'> {
  /**
   * The message to display
   */
  message?: ReactNode;
  
  /**
   * The severity of the snackbar
   */
  severity?: SnackbarSeverity;
  
  /**
   * The variant of the snackbar
   */
  variant?: SnackbarVariant;
  
  /**
   * The title of the snackbar
   */
  title?: string;
  
  /**
   * The position of the snackbar
   */
  anchorOrigin?: SnackbarOrigin;
  
  /**
   * If true, the snackbar will be open
   */
  open: boolean;
  
  /**
   * Callback fired when the snackbar requests to be closed
   */
  onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  
  /**
   * Auto hide duration in milliseconds
   */
  autoHideDuration?: number | null;
  
  /**
   * Custom action buttons
   */
  actions?: SnackbarAction[];
  
  /**
   * If true, the snackbar will show a close button
   */
  closable?: boolean;
  
  /**
   * Custom icon to display
   */
  icon?: ReactNode;
  
  /**
   * If false, the severity icon will not be displayed
   */
  showIcon?: boolean;
  
  /**
   * The transition animation to use
   */
  transition?: SnackbarTransition;
  
  /**
   * Transition duration in milliseconds
   */
  transitionDuration?: number;
  
  /**
   * If true, the snackbar will be elevated with shadow
   */
  elevated?: boolean;
  
  /**
   * Elevation level (0-24)
   */
  elevation?: number;
  
  /**
   * If true, the snackbar will be rounded
   */
  rounded?: boolean;
  
  /**
   * Border radius value
   */
  borderRadius?: number | string;
  
  /**
   * Custom background color
   */
  bgcolor?: string;
  
  /**
   * Custom text color
   */
  color?: string;
  
  /**
   * Maximum width of the snackbar
   */
  maxWidth?: number | string;
  
  /**
   * If true, clicking outside will close the snackbar
   */
  clickAwayClose?: boolean;
  
  /**
   * If true, pressing escape will close the snackbar
   */
  escapeKeyClose?: boolean;
  
  /**
   * Z-index value for the snackbar
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

export interface SnackbarStyleProps {
  severity?: SnackbarSeverity;
  variant: SnackbarVariant;
  elevated: boolean;
  elevation: number;
  rounded: boolean;
  borderRadius?: number | string;
  bgcolor?: string;
  color?: string;
  maxWidth?: number | string;
}

export interface SnackbarManager {
  /**
   * Show a snackbar
   */
  show: (props: Omit<SnackbarProps, 'open'>) => string;
  
  /**
   * Hide a specific snackbar
   */
  hide: (id: string) => void;
  
  /**
   * Hide all snackbars
   */
  hideAll: () => void;
  
  /**
   * Show a success snackbar
   */
  success: (message: ReactNode, options?: Partial<SnackbarProps>) => string;
  
  /**
   * Show an error snackbar
   */
  error: (message: ReactNode, options?: Partial<SnackbarProps>) => string;
  
  /**
   * Show a warning snackbar
   */
  warning: (message: ReactNode, options?: Partial<SnackbarProps>) => string;
  
  /**
   * Show an info snackbar
   */
  info: (message: ReactNode, options?: Partial<SnackbarProps>) => string;
}

export interface SnackbarQueue {
  id: string;
  props: SnackbarProps;
  timestamp: number;
}

export interface SnackbarConfiguration {
  /**
   * Maximum number of snackbars to show at once
   */
  maxSnackbars: number;
  
  /**
   * Default auto hide duration
   */
  defaultAutoHideDuration: number;
  
  /**
   * Default position
   */
  defaultAnchorOrigin: SnackbarOrigin;
  
  /**
   * Default transition
   */
  defaultTransition: SnackbarTransition;
  
  /**
   * Spacing between stacked snackbars
   */
  stackSpacing: number;
}