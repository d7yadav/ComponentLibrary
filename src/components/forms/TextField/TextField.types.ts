import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import type { ReactNode } from 'react';

export type TextFieldVariant = 'filled' | 'outlined' | 'standard';

export type TextFieldSize = 'small' | 'medium';

export type TextFieldInputType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week';

export type ValidationState = 'none' | 'success' | 'warning' | 'error';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant' | 'size' | 'type' | 'onKeyDown' | 'onKeyUp'> {
  variant?: TextFieldVariant;
  
  size?: TextFieldSize;
  
  type?: TextFieldInputType;
  
  value?: string | number;
  
  defaultValue?: string | number;
  
  placeholder?: string;
  
  label?: ReactNode;
  
  labelPosition?: 'inside' | 'above';
  
  helperText?: ReactNode;
  
  errorText?: ReactNode;
  
  successText?: ReactNode;
  
  warningText?: ReactNode;
  
  validationState?: ValidationState;
  
  required?: boolean;
  
  disabled?: boolean;
  
  readOnly?: boolean;
  
  loading?: boolean;
  
  fullWidth?: boolean;
  
  multiline?: boolean;
  
  rows?: number;
  
  maxRows?: number;
  
  minRows?: number;
  
  startIcon?: ReactNode;
  
  endIcon?: ReactNode;
  
  endAction?: ReactNode;
  
  maxLength?: number;
  
  minLength?: number;
  
  pattern?: string;
  
  autoComplete?: string;
  
  autoFocus?: boolean;
  
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  
  showCharacterCount?: boolean;
  
  validate?: (value: string) => string | null;
  
  validationDebounce?: number;
  
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  onEnterPress?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  onEscapePress?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  className?: string;
  
  'aria-label'?: string;
  
  'aria-describedby'?: string;
  
  tabIndex?: number;
}

export interface TextFieldStyleProps {
  variant: TextFieldVariant;
  size: TextFieldSize;
  validationState: ValidationState;
  loading: boolean;
  disabled: boolean;
  readOnly: boolean;
  fullWidth: boolean;
  multiline: boolean;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
  hasEndAction: boolean;
  showCharacterCount: boolean;
  focused: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  state: ValidationState;
}

export interface FormIntegrationProps {
  name?: string;
  
  form?: string;
  
  register?: any;
  
  control?: any;
  
  rules?: object;
}