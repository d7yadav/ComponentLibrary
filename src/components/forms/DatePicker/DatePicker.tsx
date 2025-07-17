/**
 * @fileoverview DatePicker component implementation
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import { 
  CalendarToday, 
  Clear, 
  Today,
  AccessTime,
  Event
} from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import React, { 
  forwardRef, 
  useState, 
  useCallback, 
  useMemo,
  memo 
} from 'react';

import {
  DATEPICKER_VARIANTS,
  DATEPICKER_SIZES,
  DATEPICKER_TYPES,
  DATE_FORMATS,
  DEFAULT_DATEPICKER_PROPS,
  ACCESSIBILITY_CONSTANTS,
  DATE_UTILS,
  DEFAULT_VALIDATION_MESSAGES,
  NATIVE_FORMAT_MAP,
} from './DatePicker.constants';
import {
  DatePickerContainer,
  StyledTextField,
  DatePickerIcon,
  DatePickerButton,
  TodayButton,
  ButtonsContainer,
  InputWrapper,
  HelperTextStyled,
  LabelWithRequired,
} from './DatePicker.styles';
import type { 
  DatePickerProps,
  DatePickerType
} from './DatePicker.types';

/**
 * Enhanced DatePicker component with comprehensive features
 * 
 * Features:
 * - Multiple date/time input types (date, datetime, time, month, week)
 * - Validation states (success, warning, error)
 * - Min/max date constraints
 * - Multiple date formats
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Today button and clear functionality
 * - Custom validation support
 */
export const DatePicker = memo(forwardRef<HTMLDivElement, DatePickerProps>(({
  // Basic props
  variant = DEFAULT_DATEPICKER_PROPS.variant,
  size = DEFAULT_DATEPICKER_PROPS.size,
  type = DEFAULT_DATEPICKER_PROPS.type,
  
  // Value props
  value: controlledValue,
  defaultValue,
  
  // Behavior props
  disabled = DEFAULT_DATEPICKER_PROPS.disabled,
  readOnly = DEFAULT_DATEPICKER_PROPS.readOnly,
  required = DEFAULT_DATEPICKER_PROPS.required,
  clearable = DEFAULT_DATEPICKER_PROPS.clearable,
  
  // Display props
  label,
  placeholder,
  helperText,
  
  // Validation props
  error = false,
  errorText,
  success = false,
  successText,
  warning = false,
  warningText,
  
  // Date constraints
  min,
  max,
  step,
  
  // Format props
  format = DEFAULT_DATEPICKER_PROPS.format,
  customFormat,
  locale = DEFAULT_DATEPICKER_PROPS.locale,
  
  // Event handlers
  onChange,
  onFocus,
  onBlur,
  onClear,
  
  // Styling props
  fullWidth = DEFAULT_DATEPICKER_PROPS.fullWidth,
  className,
  sx,
  
  // Advanced props
  renderInput,
  icon,
  showTodayButton = DEFAULT_DATEPICKER_PROPS.showTodayButton,
  showClearButton = DEFAULT_DATEPICKER_PROPS.showClearButton,
  
  // Accessibility
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  
  // Validation
  validate,
  validateOnChange = DEFAULT_DATEPICKER_PROPS.validateOnChange,
  validateOnBlur = DEFAULT_DATEPICKER_PROPS.validateOnBlur,
  
  ...rest
}, ref) => {
  // Internal state
  const [internalValue, setInternalValue] = useState(() => {
    if (controlledValue !== undefined) return controlledValue;
    if (defaultValue !== undefined) return defaultValue;
    return null;
  });
  
  const [focused, setFocused] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Computed values
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const hasValue = currentValue !== null && currentValue !== undefined && currentValue !== '';
  
  // Convert value to native input format
  const nativeValue = useMemo(() => {
    if (!hasValue) return '';
    
    if (typeof currentValue === 'string') {
      return currentValue;
    }
    
    if (currentValue instanceof Date) {
      switch (type) {
        case 'date':
          return currentValue.toISOString().split('T')[0];
        case 'datetime-local':
          const isoString = currentValue.toISOString();
          return isoString.slice(0, 16); // Remove seconds and timezone
        case 'time':
          return currentValue.toTimeString().slice(0, 5);
        case 'month':
          return `${currentValue.getFullYear()}-${String(currentValue.getMonth() + 1).padStart(2, '0')}`;
        case 'week':
          // Calculate ISO week
          const date = new Date(currentValue);
          const yearStart = new Date(date.getFullYear(), 0, 1);
          const weekNumber = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
          return `${date.getFullYear()}-W${String(weekNumber).padStart(2, '0')}`;
        default:
          return currentValue.toISOString().split('T')[0];
      }
    }
    
    return String(currentValue);
  }, [currentValue, hasValue, type]);
  
  // Get appropriate icon for the date type
  const getTypeIcon = useCallback(() => {
    if (icon) return icon;
    
    switch (type) {
      case 'time':
        return <AccessTime />;
      case 'month':
      case 'week':
        return <Event />;
      case 'datetime-local':
        return <CalendarToday />;
      case 'date':
      default:
        return <CalendarToday />;
    }
  }, [icon, type]);
  
  // Format min/max values for native input
  const formatConstraintValue = useCallback((constraintValue: string | Date | undefined) => {
    if (!constraintValue) return undefined;
    
    if (typeof constraintValue === 'string') {
      return constraintValue;
    }
    
    if (constraintValue instanceof Date) {
      switch (type) {
        case 'date':
          return constraintValue.toISOString().split('T')[0];
        case 'datetime-local':
          return constraintValue.toISOString().slice(0, 16);
        case 'time':
          return constraintValue.toTimeString().slice(0, 5);
        case 'month':
          return `${constraintValue.getFullYear()}-${String(constraintValue.getMonth() + 1).padStart(2, '0')}`;
        default:
          return constraintValue.toISOString().split('T')[0];
      }
    }
    
    return String(constraintValue);
  }, [type]);
  
  // Validation
  const validateValue = useCallback((value: string | Date | null) => {
    if (validate) {
      return validate(value);
    }
    
    if (required && (!value || value === '')) {
      return DEFAULT_VALIDATION_MESSAGES.REQUIRED;
    }
    
    if (value && !DATE_UTILS.isValidDate(value)) {
      return DEFAULT_VALIDATION_MESSAGES.INVALID_DATE;
    }
    
    if (value && min && DATE_UTILS.compareDates(value, min) < 0) {
      return DEFAULT_VALIDATION_MESSAGES.DATE_TOO_EARLY;
    }
    
    if (value && max && DATE_UTILS.compareDates(value, max) > 0) {
      return DEFAULT_VALIDATION_MESSAGES.DATE_TOO_LATE;
    }
    
    return null;
  }, [validate, required, min, max]);
  
  // Handle value changes
  const handleValueChange = useCallback((newValue: string | Date | null, shouldValidate: boolean = false) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    if (shouldValidate && (validateOnChange || validateOnBlur)) {
      const error = validateValue(newValue);
      setValidationError(error);
    }
    
    onChange?.(newValue, newValue ? DATE_UTILS.formatDate(newValue, format, locale) : '');
  }, [controlledValue, validateOnChange, validateOnBlur, validateValue, onChange, format, locale]);
  
  // Handle input changes
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const parsedValue = newValue ? DATE_UTILS.parseDate(newValue) : null;
    
    handleValueChange(newValue || null, validateOnChange);
  }, [handleValueChange, validateOnChange]);
  
  // Handle focus
  const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(event);
  }, [onFocus]);
  
  // Handle blur
  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    
    if (validateOnBlur) {
      const error = validateValue(currentValue);
      setValidationError(error);
    }
    
    onBlur?.(event);
  }, [validateOnBlur, validateValue, currentValue, onBlur]);
  
  // Handle clear
  const handleClear = useCallback(() => {
    handleValueChange(null, validateOnChange);
    setValidationError(null);
    onClear?.();
  }, [handleValueChange, validateOnChange, onClear]);
  
  // Handle today button
  const handleToday = useCallback(() => {
    let todayValue: string;
    
    switch (type) {
      case 'datetime-local':
        todayValue = DATE_UTILS.getNow();
        break;
      case 'time':
        todayValue = DATE_UTILS.getCurrentTime();
        break;
      case 'month':
        const now = new Date();
        todayValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        break;
      case 'week':
        const today = new Date();
        const yearStart = new Date(today.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(((today.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
        todayValue = `${today.getFullYear()}-W${String(weekNumber).padStart(2, '0')}`;
        break;
      case 'date':
      default:
        todayValue = DATE_UTILS.getToday();
        break;
    }
    
    handleValueChange(todayValue, validateOnChange);
  }, [type, handleValueChange, validateOnChange]);
  
  // Determine current validation state
  const currentError = error || !!validationError;
  const currentErrorText = errorText || validationError;
  const currentHelperText = currentError 
    ? currentErrorText 
    : success 
      ? successText 
      : warning 
        ? warningText 
        : helperText;
  
  // Render input field
  const renderInputField = useCallback(() => {
    if (renderInput) {
      return renderInput({
        disabled,
        fullWidth,
        size,
        variant,
        InputLabelProps: {},
        InputProps: {
          startAdornment: (
            <InputAdornment position="start">
              <DatePickerIcon size={size} disabled={disabled}>
                {getTypeIcon()}
              </DatePickerIcon>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {showClearButton && hasValue && clearable && !disabled && !readOnly && (
                <DatePickerButton
                  size={size}
                  variant="clear"
                  disabled={disabled}
                  onClick={handleClear}
                  aria-label={ACCESSIBILITY_CONSTANTS.ARIA_LABELS.CLEAR}
                >
                  <Clear />
                </DatePickerButton>
              )}
            </InputAdornment>
          ),
        },
        inputProps: {
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy,
          'aria-describedby': ariaDescribedBy,
        },
      });
    }
    
    return (
      <StyledTextField
        variant={variant}
        size={size === 'large' ? 'medium' : size}
        fullWidth={fullWidth}
        disabled={disabled}
        error={currentError}
        success={success}
        warning={warning}
        type={type}
        value={nativeValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        inputProps={{
          min: formatConstraintValue(min),
          max: formatConstraintValue(max),
          step,
          readOnly,
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy,
          'aria-describedby': ariaDescribedBy,
          role: ACCESSIBILITY_CONSTANTS.ROLES.TEXTBOX,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DatePickerIcon size={size} disabled={disabled}>
                {getTypeIcon()}
              </DatePickerIcon>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {showClearButton && hasValue && clearable && !disabled && !readOnly && (
                <DatePickerButton
                  size={size}
                  variant="clear"
                  disabled={disabled}
                  onClick={handleClear}
                  aria-label={ACCESSIBILITY_CONSTANTS.ARIA_LABELS.CLEAR}
                >
                  <Clear />
                </DatePickerButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    );
  }, [
    renderInput,
    variant,
    size,
    fullWidth,
    disabled,
    currentError,
    success,
    warning,
    type,
    nativeValue,
    placeholder,
    handleInputChange,
    handleFocus,
    handleBlur,
    required,
    formatConstraintValue,
    min,
    max,
    step,
    readOnly,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    getTypeIcon,
    showClearButton,
    hasValue,
    clearable,
    handleClear,
  ]);
  
  return (
    <DatePickerContainer
      ref={ref}
      className={className}
      sx={sx}
      variant={variant}
      size={size}
      disabled={disabled}
      error={currentError}
      success={success}
      warning={warning}
      fullWidth={fullWidth}
      {...rest}
    >
      {label && (
        <LabelWithRequired
          size={size}
          required={required}
          disabled={disabled}
          error={currentError}
          success={success}
          warning={warning}
        >
          {label}
        </LabelWithRequired>
      )}
      
      <InputWrapper
        variant={variant}
        size={size}
        focused={focused}
        error={currentError}
        success={success}
        warning={warning}
        disabled={disabled}
      >
        {renderInputField()}
      </InputWrapper>
      
      {showTodayButton && (
        <ButtonsContainer size={size}>
          <TodayButton
            size={size}
            disabled={disabled}
            onClick={handleToday}
            aria-label={ACCESSIBILITY_CONSTANTS.ARIA_LABELS.TODAY}
            startIcon={<Today />}
          >
            {type === 'time' ? 'Now' : 'Today'}
          </TodayButton>
        </ButtonsContainer>
      )}
      
      {currentHelperText && (
        <HelperTextStyled
          size={size}
          error={currentError}
          success={success}
          warning={warning}
        >
          {currentHelperText}
        </HelperTextStyled>
      )}
    </DatePickerContainer>
  );
}));

DatePicker.displayName = 'DatePicker';