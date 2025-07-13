import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { ReactNode } from 'react';

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
  /**
   * The variant of the text field
   */
  variant?: TextFieldVariant;
  
  /**
   * The size of the text field
   */
  size?: TextFieldSize;
  
  /**
   * The input type
   */
  type?: TextFieldInputType;
  
  /**
   * The current value of the text field
   */
  value?: string | number;
  
  /**
   * The default value of the text field
   */
  defaultValue?: string | number;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * The label for the text field
   */
  label?: ReactNode;
  
  /**
   * Position of the label - 'inside' for floating label, 'above' for separate label
   * @default 'inside'
   */
  labelPosition?: 'inside' | 'above';
  
  /**
   * Helper text to display below the text field
   */
  helperText?: ReactNode;
  
  /**
   * Error text to display when validation fails
   */
  errorText?: ReactNode;
  
  /**
   * Success text to display when validation passes
   */
  successText?: ReactNode;
  
  /**
   * Warning text to display for warnings
   */
  warningText?: ReactNode;
  
  /**
   * Validation state of the text field
   */
  validationState?: ValidationState;
  
  /**
   * If true, the text field will be required
   */
  required?: boolean;
  
  /**
   * If true, the text field will be disabled
   */
  disabled?: boolean;
  
  /**
   * If true, the text field will be read-only
   */
  readOnly?: boolean;
  
  /**
   * If true, the text field will show loading state
   */
  loading?: boolean;
  
  /**
   * If true, the text field will take the full width
   */
  fullWidth?: boolean;
  
  /**
   * If true, the text field will be multiline (textarea)
   */
  multiline?: boolean;
  
  /**
   * Number of rows for multiline text field
   */
  rows?: number;
  
  /**
   * Maximum number of rows for multiline text field
   */
  maxRows?: number;
  
  /**
   * Minimum number of rows for multiline text field
   */
  minRows?: number;
  
  /**
   * Icon to display at the start of the text field
   */
  startIcon?: ReactNode;
  
  /**
   * Icon to display at the end of the text field
   */
  endIcon?: ReactNode;
  
  /**
   * Action button to display at the end (e.g., clear button)
   */
  endAction?: ReactNode;
  
  /**
   * Maximum length of the input
   */
  maxLength?: number;
  
  /**
   * Minimum length of the input
   */
  minLength?: number;
  
  /**
   * Pattern for input validation
   */
  pattern?: string;
  
  /**
   * Auto-complete attribute
   */
  autoComplete?: string;
  
  /**
   * Auto-focus the input on mount
   */
  autoFocus?: boolean;
  
  /**
   * Input mode for virtual keyboards
   */
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  
  /**
   * Character counter configuration
   */
  showCharacterCount?: boolean;
  
  /**
   * Custom validation function
   */
  validate?: (value: string) => string | null;
  
  /**
   * Debounce delay for validation in milliseconds
   */
  validationDebounce?: number;
  
  /**
   * Callback fired when the value changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  /**
   * Callback fired when the input loses focus
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  /**
   * Callback fired when the input gains focus
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  /**
   * Callback fired when a key is pressed
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  /**
   * Callback fired when a key is released
   */
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  /**
   * Callback fired when Enter key is pressed
   */
  onEnterPress?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  /**
   * Callback fired when Escape key is pressed
   */
  onEscapePress?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
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
  /**
   * Name attribute for form integration
   */
  name?: string;
  
  /**
   * Form ID for association
   */
  form?: string;
  
  /**
   * React Hook Form integration
   */
  register?: any;
  
  /**
   * Form control configuration
   */
  control?: any;
  
  /**
   * Validation rules for forms
   */
  rules?: object;
}