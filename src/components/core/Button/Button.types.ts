import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { ReactNode } from 'react';

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
  /**
   * The variant of the button
   */
  variant?: ButtonVariant;
  
  /**
   * The size of the button
   */
  size?: ButtonSize;
  
  /**
   * The color theme of the button
   */
  color?: ButtonColor;
  
  /**
   * Icon to display before the button text
   */
  startIcon?: ReactNode;
  
  /**
   * Icon to display after the button text
   */
  endIcon?: ReactNode;
  
  /**
   * If true, the button will show a loading state
   */
  loading?: boolean;
  
  /**
   * Custom loading icon to display when loading is true
   */
  loadingIcon?: ReactNode;
  
  /**
   * If true, the button will take the full width of its container
   */
  fullWidth?: boolean;
  
  /**
   * If true, the button will be disabled
   */
  disabled?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * The content of the button
   */
  children?: ReactNode;
  
  /**
   * Callback fired when the button is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * The type of button
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * ARIA described by for accessibility
   */
  'aria-describedby'?: string;
  
  /**
   * Tab index for keyboard navigation
   */
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