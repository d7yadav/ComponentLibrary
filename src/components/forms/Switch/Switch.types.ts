import { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import type { ReactNode } from 'react';

export type SwitchSize = 'small' | 'medium' | 'large';

export type SwitchColor = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';

export type SwitchVariant = 'standard' | 'outlined' | 'filled';

export type ValidationState = 'none' | 'success' | 'warning' | 'error';

export interface SwitchProps extends Omit<MuiSwitchProps, 'size' | 'color'> {
  size?: SwitchSize;
  
  color?: SwitchColor;
  
  variant?: SwitchVariant;
  
  label?: ReactNode;
  
  helperText?: ReactNode;
  
  error?: boolean;
  
  errorText?: ReactNode;
  
  validationState?: ValidationState;
  
  required?: boolean;
  
  checkedIcon?: ReactNode;
  
  icon?: ReactNode;
  
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
  
  className?: string;
  
  'data-testid'?: string;
  
  loading?: boolean;
  
  description?: string;
  
  onText?: string;
  
  offText?: string;
  
  showText?: boolean;
  
  thumbComponent?: ReactNode;
  
  trackComponent?: ReactNode;
}

export interface SwitchGroupProps {
  switches: SwitchGroupItem[];
  
  direction?: 'row' | 'column';
  
  disabled?: boolean;
  
  required?: boolean;
  
  error?: boolean;
  
  helperText?: ReactNode;
  
  errorText?: ReactNode;
  
  size?: SwitchSize;
  
  color?: SwitchColor;
  
  variant?: SwitchVariant;
  
  label?: ReactNode;
  
  validationState?: ValidationState;
  
  'data-testid'?: string;
  
  onChange?: (switchId: string, checked: boolean) => void;
}

export interface SwitchGroupItem {
  id: string;
  
  label: ReactNode;
  
  checked?: boolean;
  
  disabled?: boolean;
  
  helperText?: ReactNode;
  
  checkedIcon?: ReactNode;
  
  icon?: ReactNode;
  
  description?: string;
  
  onText?: string;
  
  offText?: string;
  
  switchProps?: Partial<SwitchProps>;
}