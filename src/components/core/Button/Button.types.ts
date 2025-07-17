import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type { ReactNode } from 'react';

export type ButtonVariant = 
  | 'primary'
  | 'secondary' 
  | 'tertiary'
  | 'quaternary'
  | 'gradient'
  | 'glass'
  | 'outline'
  | 'text';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonColor = 
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  loadingIcon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-describedby'?: string;
  tabIndex?: number;
}

export interface ButtonStyleProps {
  customVariant: ButtonVariant;
  customSize: ButtonSize;
  customColor: ButtonColor;
  loading: boolean;
  disabled: boolean;
  fullWidth: boolean;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
}