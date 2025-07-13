import { forwardRef, useState, useEffect, useCallback, memo } from 'react';
import { InputAdornment, CircularProgress } from '@mui/material';
import { 
  CheckCircle, 
  Warning, 
  Error as ErrorIcon, 
  Clear 
} from '@mui/icons-material';
import { TextFieldProps, ValidationResult } from './TextField.types';
import {
  StyledTextField,
  StyledHelperText,
  StyledLabel,
  CharacterCount,
  TextFieldContainer,
  LoadingContainer,
  ValidationIconContainer,
  RequiredIndicator,
  MultilineCharacterCount,
} from './TextField.styles';
import {
  TEXTFIELD_VARIANTS,
  TEXTFIELD_SIZES,
  VALIDATION_STATES,
  ACCESSIBILITY_CONSTANTS,
  INPUT_VALIDATION_PATTERNS,
  DEFAULT_VALIDATION_MESSAGES,
  CHARACTER_COUNT_CONFIGS,
  LOADING_INDICATOR_CONFIG,
} from './TextField.constants';

/**
 * Enhanced TextField component with comprehensive validation, accessibility, and form integration
 * 
 * Features:
 * - 3 variants: filled, outlined, standard
 * - Multiple input types with built-in validation
 * - Success, warning, error validation states
 * - Character counting and length validation
 * - Loading states and icons
 * - Accessibility compliance (WCAG 2.1 AA)
 * - React Hook Form integration
 * - Debounced validation
 * - Multiline support with auto-resize
 */
export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(({
  variant = TEXTFIELD_VARIANTS.outlined,
  size = TEXTFIELD_SIZES.medium,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  label,
  labelPosition = 'inside',
  helperText,
  errorText,
  successText,
  warningText,
  validationState = VALIDATION_STATES.none,
  required = false,
  disabled = false,
  readOnly = false,
  loading = false,
  fullWidth = false,
  multiline = false,
  rows,
  maxRows,
  minRows,
  startIcon,
  endIcon,
  endAction,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  autoFocus = false,
  inputMode,
  showCharacterCount = false,
  validate,
  validationDebounce = ACCESSIBILITY_CONSTANTS.validationDebounceDefault,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  onEnterPress,
  onEscapePress,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  tabIndex,
  ...other
}, ref) => {
  const [internalValue, setInternalValue] = useState(value || defaultValue || '');
  const [focused, setFocused] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    state: validationState,
  });
  
  // Update internal value when prop value changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);
  
  // Validation function
  const validateValue = useCallback((val: string): ValidationResult => {
    // Custom validation takes precedence
    if (validate) {
      const customResult = validate(val);
      if (customResult) {
        return {
          isValid: false,
          message: customResult,
          state: 'error',
        };
      }
    }
    
    // Required validation
    if (required && !val.trim()) {
      return {
        isValid: false,
        message: DEFAULT_VALIDATION_MESSAGES.required,
        state: 'error',
      };
    }
    
    // Length validation
    if (minLength && val.length < minLength) {
      return {
        isValid: false,
        message: DEFAULT_VALIDATION_MESSAGES.minLength(minLength),
        state: 'error',
      };
    }
    
    if (maxLength && val.length > maxLength) {
      return {
        isValid: false,
        message: DEFAULT_VALIDATION_MESSAGES.maxLength(maxLength),
        state: 'error',
      };
    }
    
    // Type-specific validation
    if (val && type === 'email' && !INPUT_VALIDATION_PATTERNS.email.test(val)) {
      return {
        isValid: false,
        message: DEFAULT_VALIDATION_MESSAGES.email,
        state: 'error',
      };
    }
    
    if (val && type === 'url' && !INPUT_VALIDATION_PATTERNS.url.test(val)) {
      return {
        isValid: false,
        message: DEFAULT_VALIDATION_MESSAGES.url,
        state: 'error',
      };
    }
    
    if (val && type === 'tel' && !INPUT_VALIDATION_PATTERNS.tel.test(val)) {
      return {
        isValid: false,
        message: DEFAULT_VALIDATION_MESSAGES.tel,
        state: 'error',
      };
    }
    
    // Pattern validation
    if (val && pattern && !new RegExp(pattern).test(val)) {
      return {
        isValid: false,
        message: DEFAULT_VALIDATION_MESSAGES.pattern,
        state: 'error',
      };
    }
    
    return {
      isValid: true,
      state: 'success',
    };
  }, [validate, required, minLength, maxLength, type, pattern]);
  
  // Debounced validation
  useEffect(() => {
    if (!internalValue && !required) return;
    
    const timer = setTimeout(() => {
      const result = validateValue(String(internalValue));
      setValidationResult(result);
    }, validationDebounce);
    
    return () => clearTimeout(timer);
  }, [internalValue, validateValue, validationDebounce, required]);
  
  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    onChange?.(event);
  };
  
  // Handle focus
  const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(true);
    onFocus?.(event);
  };
  
  // Handle blur
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(false);
    onBlur?.(event);
  };
  
  // Handle key events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && onEnterPress) {
      onEnterPress(event);
    }
    if (event.key === 'Escape' && onEscapePress) {
      onEscapePress(event);
    }
    onKeyDown?.(event);
  };
  
  // Handle clear action
  const handleClear = () => {
    setInternalValue('');
    if (onChange) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };
  
  // Determine current validation state
  const currentValidationState = validationState !== 'none' ? validationState : validationResult.state;
  
  // Determine helper text to display
  const getHelperText = () => {
    if (errorText && currentValidationState === 'error') return errorText;
    if (warningText && currentValidationState === 'warning') return warningText;
    if (successText && currentValidationState === 'success') return successText;
    if (validationResult.message && currentValidationState === 'error') return validationResult.message;
    return helperText;
  };
  
  // Determine validation icon
  const getValidationIcon = () => {
    switch (currentValidationState) {
      case 'success':
        return <CheckCircle className="validation-icon" />;
      case 'warning':
        return <Warning className="validation-icon" />;
      case 'error':
        return <ErrorIcon className="validation-icon" />;
      default:
        return null;
    }
  };
  
  // Character count logic
  const characterCount = String(internalValue).length;
  const isCharacterWarning = maxLength ? characterCount >= maxLength * CHARACTER_COUNT_CONFIGS.warningThreshold : false;
  const isCharacterError = maxLength ? characterCount > maxLength : false;
  
  // Build start adornment
  const startAdornment = (startIcon || loading) ? (
    <InputAdornment position="start">
      {loading ? (
        <LoadingContainer position="start">
          <CircularProgress
            size={LOADING_INDICATOR_CONFIG.size}
            color={LOADING_INDICATOR_CONFIG.color}
            className="loading-spinner"
          />
        </LoadingContainer>
      ) : startIcon}
    </InputAdornment>
  ) : undefined;
  
  // Build end adornment
  const endAdornment = (endIcon || endAction || currentValidationState !== 'none' || (value && !disabled && !readOnly)) ? (
    <InputAdornment position="end">
      {endAction && !loading && endAction}
      {!endAction && endIcon && !loading && endIcon}
      {!endAction && !endIcon && currentValidationState !== 'none' && (
        <ValidationIconContainer validationState={currentValidationState}>
          {getValidationIcon()}
        </ValidationIconContainer>
      )}
      {!endAction && !endIcon && currentValidationState === 'none' && value && !disabled && !readOnly && (
        <Clear 
          onClick={handleClear}
          style={{ cursor: 'pointer', fontSize: '1rem' }}
          aria-label="Clear input"
        />
      )}
    </InputAdornment>
  ) : undefined;
  
  // Accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': currentValidationState === 'error',
    'aria-required': required,
    ...(tabIndex !== undefined && { tabIndex }),
  };
  
  // Render character count
  const renderCharacterCount = () => {
    if (!showCharacterCount || !maxLength) return null;
    
    const CharacterCountComponent = multiline ? MultilineCharacterCount : CharacterCount;
    
    return (
      <CharacterCountComponent 
        component="div"
        variant="caption"
        data-testid="textfield-character-count"
        isWarning={isCharacterWarning}
        isError={isCharacterError}
      >
        {characterCount}/{maxLength}
      </CharacterCountComponent>
    );
  };
  
  const displayHelperText = getHelperText();
  
  return (
    <TextFieldContainer fullWidth={fullWidth} className={className}>
      {labelPosition === 'above' && label && (
        <StyledLabel
          component="label"
          variant="body2"
          validationState={currentValidationState}
        >
          {label}
          {required && (
            <RequiredIndicator className="required-indicator" aria-hidden="true">
              {ACCESSIBILITY_CONSTANTS.requiredIndicator}
            </RequiredIndicator>
          )}
        </StyledLabel>
      )}
      <StyledTextField
        ref={ref}
        variant={variant}
        size={size}
        type={type}
        value={internalValue}
        placeholder={placeholder}
        label={
          labelPosition === 'inside' ? (
            label && required ? (
              <>
                {label}
                <RequiredIndicator aria-hidden="true">
                  {ACCESSIBILITY_CONSTANTS.requiredIndicator}
                </RequiredIndicator>
              </>
            ) : label
          ) : undefined
        }
        disabled={disabled}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        maxRows={maxRows}
        minRows={minRows}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        inputMode={inputMode}
        InputProps={{
          startAdornment,
          endAdornment,
          readOnly,
          ...accessibilityProps,
        }}
        // Custom props for styled component
        customVariant={variant}
        customSize={size}
        validationState={currentValidationState}
        loading={loading}
        readOnly={readOnly}
        hasStartIcon={Boolean(startIcon)}
        hasEndIcon={Boolean(endIcon)}
        hasEndAction={Boolean(endAction)}
        showCharacterCount={showCharacterCount}
        focused={focused}
        labelPosition={labelPosition}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={onKeyUp}
        {...other}
      />
      
      {displayHelperText && (
        <StyledHelperText
          component="div"
          variant="caption"
          validationState={currentValidationState}
          className={currentValidationState !== 'none' ? 'with-icon' : ''}
        >
          {displayHelperText}
        </StyledHelperText>
      )}
      
      {renderCharacterCount()}
    </TextFieldContainer>
  );
});

TextField.displayName = 'TextField';