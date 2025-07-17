import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { ReactNode } from 'react';

export type CheckboxSize = 'small' | 'medium' | 'large';

export type CheckboxColor = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';

export type CheckboxVariant = 'standard' | 'outlined' | 'filled';

export type ValidationState = 'none' | 'success' | 'warning' | 'error';

export interface CheckboxProps extends Omit<MuiCheckboxProps, 'size' | 'color'> {
  size?: CheckboxSize;
  
  color?: CheckboxColor;
  
  variant?: CheckboxVariant;
  
  label?: ReactNode;
  
  helperText?: ReactNode;
  
  error?: boolean;
  
  errorText?: ReactNode;
  
  validationState?: ValidationState;
  
  required?: boolean;
  
  checkedIcon?: ReactNode;
  
  icon?: ReactNode;
  
  indeterminateIcon?: ReactNode;
  
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
  
  className?: string;
  
  'data-testid'?: string;
  
  loading?: boolean;
  
  description?: string;
}

export interface CheckboxGroupProps {
  value?: string[];
  
  onChange?: (value: string[]) => void;
  
  name?: string;
  
  options: CheckboxOption[];
  
  direction?: 'row' | 'column';
  
  disabled?: boolean;
  
  required?: boolean;
  
  error?: boolean;
  
  helperText?: ReactNode;
  
  size?: CheckboxSize;
  
  color?: CheckboxColor;
  
  variant?: CheckboxVariant;
  
  label?: ReactNode;
  
  'data-testid'?: string;
}

export interface CheckboxOption {
  value: string;
  
  label: ReactNode;
  
  disabled?: boolean;
  
  helperText?: ReactNode;
  
  checkedIcon?: ReactNode;
  
  icon?: ReactNode;
  
  description?: string;
}