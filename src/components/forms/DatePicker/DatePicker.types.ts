
import type { Theme } from '@mui/material/styles';
import type { ReactNode, HTMLAttributes, ChangeEvent, FocusEvent } from 'react';

// Date picker variants
export type DatePickerVariant = 'outlined' | 'filled' | 'standard';

// Size options
export type DatePickerSize = 'small' | 'medium' | 'large';

// Date picker types
export type DatePickerType = 'date' | 'datetime-local' | 'time' | 'month' | 'week';

// Format options
export type DateFormat = 'ISO' | 'US' | 'EU' | 'custom';

// Validation states
export type DateValidationState = 'none' | 'success' | 'warning' | 'error';

// Main component props
export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  // Basic props
  variant?: DatePickerVariant;
  size?: DatePickerSize;
  type?: DatePickerType;
  
  // Value props
  value?: string | Date | null;
  defaultValue?: string | Date | null;
  
  // Behavior props
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  clearable?: boolean;
  
  // Display props
  label?: string;
  placeholder?: string;
  helperText?: string;
  
  // Validation props
  error?: boolean;
  errorText?: string;
  success?: boolean;
  successText?: string;
  warning?: boolean;
  warningText?: string;
  
  // Date constraints
  min?: string | Date;
  max?: string | Date;
  step?: number | string;
  
  // Format props
  format?: DateFormat;
  customFormat?: string;
  locale?: string;
  
  // Event handlers
  onChange?: (value: string | Date | null, formattedValue?: string) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  
  // Styling props
  fullWidth?: boolean;
  className?: string;
  sx?: any;
  
  // Advanced props
  renderInput?: (params: DatePickerRenderInputParams) => ReactNode;
  icon?: ReactNode;
  showTodayButton?: boolean;
  showClearButton?: boolean;
  
  // Accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  
  // Validation
  validate?: (value: string | Date | null) => string | null;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

// Render input parameters
export interface DatePickerRenderInputParams {
  disabled?: boolean;
  fullWidth?: boolean;
  size?: DatePickerSize;
  variant?: DatePickerVariant;
  InputLabelProps?: object;
  InputProps?: {
    ref?: any;
    className?: string;
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };
  inputProps?: {
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
  };
}

// Date utilities
export interface DateUtils {
  formatDate: (date: Date | string, format: DateFormat, customFormat?: string, locale?: string) => string;
  parseDate: (dateString: string, format: DateFormat, customFormat?: string, locale?: string) => Date | null;
  isValidDate: (date: Date | string | null) => boolean;
  getToday: () => string;
  getTodayFormatted: (format: DateFormat, customFormat?: string, locale?: string) => string;
  compareDates: (date1: Date | string, date2: Date | string) => number;
  isDateInRange: (date: Date | string, min?: Date | string, max?: Date | string) => boolean;
}

// Styled component props
export interface DatePickerStyleProps {
  theme?: Theme;
  variant: DatePickerVariant;
  size: DatePickerSize;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  warning?: boolean;
  fullWidth?: boolean;
  focused?: boolean;
}

export interface DatePickerInputStyleProps extends DatePickerStyleProps {
  hasStartAdornment?: boolean;
  hasEndAdornment?: boolean;
}

export interface DatePickerIconStyleProps {
  theme?: Theme;
  size: DatePickerSize;
  disabled?: boolean;
  clickable?: boolean;
}

export interface DatePickerButtonStyleProps {
  theme?: Theme;
  size: DatePickerSize;
  variant?: 'today' | 'clear';
  disabled?: boolean;
}

// Constants export type
export interface DatePickerConstants {
  VARIANTS: Record<string, DatePickerVariant>;
  SIZES: Record<string, DatePickerSize>;
  TYPES: Record<string, DatePickerType>;
  FORMATS: Record<string, DateFormat>;
  VALIDATION_STATES: Record<string, DateValidationState>;
  DEFAULT_PROPS: Partial<DatePickerProps>;
  ACCESSIBILITY: {
    ROLES: Record<string, string>;
    ARIA_LABELS: Record<string, string>;
    KEYBOARD_SHORTCUTS: Record<string, string>;
  };
  DATE_FORMATS: {
    ISO: string;
    US: string;
    EU: string;
  };
  TIME_FORMATS: {
    '12H': string;
    '24H': string;
  };
}