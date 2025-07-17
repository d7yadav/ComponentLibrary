import { FormControlLabelProps } from '@mui/material/FormControlLabel';
import type { RadioProps as MuiRadioProps } from '@mui/material/Radio';
import type { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup';
import type { ReactNode } from 'react';

export type RadioSize = 'small' | 'medium' | 'large';

export type RadioColor = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';

export type RadioVariant = 'standard' | 'outlined' | 'filled';

export type ValidationState = 'none' | 'success' | 'warning' | 'error';

export interface RadioProps extends Omit<MuiRadioProps, 'size' | 'color'> {
  size?: RadioSize;
  
  color?: RadioColor;
  
  variant?: RadioVariant;
  
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
}

export interface RadioGroupProps extends Omit<MuiRadioGroupProps, 'onChange'> {
  value?: string;
  
  onChange?: (value: string) => void;
  
  name?: string;
  
  options: RadioOption[];
  
  direction?: 'row' | 'column';
  
  disabled?: boolean;
  
  required?: boolean;
  
  error?: boolean;
  
  helperText?: ReactNode;
  
  errorText?: ReactNode;
  
  size?: RadioSize;
  
  color?: RadioColor;
  
  variant?: RadioVariant;
  
  label?: ReactNode;
  
  validationState?: ValidationState;
  
  'data-testid'?: string;
}

export interface RadioOption {
  value: string;
  
  label: ReactNode;
  
  disabled?: boolean;
  
  helperText?: ReactNode;
  
  checkedIcon?: ReactNode;
  
  icon?: ReactNode;
  
  description?: string;
  
  radioProps?: Partial<RadioProps>;
}