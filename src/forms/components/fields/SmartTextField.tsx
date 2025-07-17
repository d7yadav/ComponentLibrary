// 🚀 Smart TextField - Intelligent Form Field with Advanced Features
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps, Autocomplete, Chip, Box, Typography } from '@mui/material';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import type { SmartTextFieldProps, ValidationRule } from '../../types';

// ===== SMART TEXT FIELD COMPONENT =====

export const SmartTextField: React.FC<SmartTextFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  validation = [],
  dependencies = [],
  formatters,
  suggestions,
  debounceMs = 300,
  multiline = false,
  rows = 4,
  maxLength,
  showCharCount = false,
  autoComplete,
  inputMode = 'text',
  ...props
}) => {
  
  // ===== STATE MANAGEMENT =====
  
  const [localValue, setLocalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestionOptions, setSuggestionOptions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [validationState, setValidationState] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [asyncValidationMessage, setAsyncValidationMessage] = useState<string>('');
  
  // ===== REFS =====
  
  const inputRef = useRef<HTMLInputElement>(null);
  const validationTimeoutRef = useRef<NodeJS.Timeout>();
  
  // ===== FORM CONTEXT =====
  
  const { control, formState: { errors } } = useFormContext();
  
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? `${label} is required` : false,
      validate: generateValidationRules(validation),
    },
  });
  
  // ===== FORMATTING =====
  
  const formatDisplayValue = useCallback((inputValue: string) => {
    if (formatters?.onDisplay) {
      return formatters.onDisplay(inputValue);
    }
    return inputValue;
  }, [formatters]);
  
  const formatInputValue = useCallback((inputValue: string) => {
    if (formatters?.onInput) {
      return formatters.onInput(inputValue);
    }
    return inputValue;
  }, [formatters]);
  
  // ===== SUGGESTIONS =====
  
  const loadSuggestions = useCallback(async (inputValue: string) => {
    if (!suggestions) return;
    
    setIsLoadingSuggestions(true);
    
    try {
      if (Array.isArray(suggestions)) {
        const filtered = suggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestionOptions(filtered);
      } else {
        const fetchedSuggestions = await suggestions(inputValue);
        setSuggestionOptions(fetchedSuggestions);
      }
    } catch (error) {
      console.error('Failed to load suggestions:', error);
      setSuggestionOptions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, [suggestions]);
  
  const debouncedLoadSuggestions = useMemo(
    () => debounce(loadSuggestions, debounceMs),
    [loadSuggestions, debounceMs]
  );
  
  // ===== VALIDATION =====
  
  const performAsyncValidation = useCallback(async (inputValue: string) => {
    const asyncRules = validation.filter(rule => rule.async);
    if (asyncRules.length === 0) return;
    
    setValidationState('validating');
    setAsyncValidationMessage('');
    
    try {
      for (const rule of asyncRules) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async validation
        
        if (rule.rule === 'custom' && rule.params) {
          const result = await rule.params(inputValue);
          if (!result) {
            setValidationState('invalid');
            setAsyncValidationMessage(rule.message || 'Validation failed');
            return;
          }
        }
      }
      
      setValidationState('valid');
    } catch (error) {
      setValidationState('invalid');
      setAsyncValidationMessage('Validation error occurred');
    }
  }, [validation]);
  
  const debouncedValidation = useMemo(
    () => debounce(performAsyncValidation, debounceMs),
    [performAsyncValidation, debounceMs]
  );
  
  // ===== EVENT HANDLERS =====
  
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    
    // Apply input formatting
    const formattedValue = formatInputValue(inputValue);
    
    // Update local state
    setLocalValue(formattedValue);
    
    // Update form state
    onChange(formattedValue);
    
    // Trigger suggestions
    if (suggestions && formattedValue.length > 0) {
      debouncedLoadSuggestions(formattedValue);
    }
    
    // Trigger async validation
    if (validation.some(rule => rule.async)) {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
      
      validationTimeoutRef.current = setTimeout(() => {
        debouncedValidation(formattedValue);
      }, debounceMs);
    }
  }, [onChange, formatInputValue, suggestions, debouncedLoadSuggestions, validation, debouncedValidation, debounceMs]);
  
  const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    
    if (suggestions && !suggestionOptions.length) {
      loadSuggestions(event.target.value);
    }
  }, [suggestions, suggestionOptions.length, loadSuggestions]);
  
  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur();
  }, [onBlur]);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (maxLength && event.currentTarget.value.length >= maxLength) {
      // Allow backspace, delete, and navigation keys
      if (![8, 9, 46, 37, 38, 39, 40].includes(event.keyCode)) {
        event.preventDefault();
      }
    }
  }, [maxLength]);
  
  // ===== EFFECTS =====
  
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);
  
  useEffect(() => {
    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, []);
  
  // ===== COMPUTED VALUES =====
  
  const displayValue = useMemo(() => formatDisplayValue(localValue), [localValue, formatDisplayValue]);
  const charactersRemaining = maxLength ? maxLength - localValue.length : null;
  const isError = invalid || validationState === 'invalid';
  const helperText = error?.message || asyncValidationMessage || props.helperText;
  
  // ===== RENDER HELPERS =====
  
  const renderCharacterCount = () => {
    if (!showCharCount || !maxLength) return null;
    
    return (
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography
          variant="caption"
          color={charactersRemaining! < 20 ? 'error' : 'text.secondary'}
        >
          {localValue.length} / {maxLength}
        </Typography>
      </Box>
    );
  };
  
  const renderValidationIndicator = () => {
    if (validationState === 'idle') return null;
    
    const getColor = () => {
      switch (validationState) {
        case 'validating': return 'info';
        case 'valid': return 'success';
        case 'invalid': return 'error';
        default: return 'text.secondary';
      }
    };
    
    const getIcon = () => {
      switch (validationState) {
        case 'validating': return '⏳';
        case 'valid': return '✅';
        case 'invalid': return '❌';
        default: return '';
      }
    };
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
        <Typography variant="caption" color={getColor()}>
          {getIcon()} {validationState === 'validating' ? 'Validating...' : ''}
        </Typography>
      </Box>
    );
  };
  
  // ===== RENDER COMPONENT =====
  
  if (suggestions && suggestions.length > 0) {
    return (
      <Box>
        <Autocomplete
          freeSolo
          options={suggestionOptions}
          value={displayValue}
          onInputChange={(event, newValue) => {
            if (event && event.type === 'change') {
              handleInputChange(event as React.ChangeEvent<HTMLInputElement>);
            }
          }}
          loading={isLoadingSuggestions}
          renderInput={(params) => (
            <MuiTextField
              {...params}
              {...props}
              label={label}
              placeholder={placeholder}
              required={required}
              error={isError}
              helperText={helperText}
              multiline={multiline}
              rows={multiline ? rows : undefined}
              inputMode={inputMode}
              autoComplete={autoComplete}
              inputRef={ref}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              inputProps={{
                ...params.inputProps,
                maxLength,
              }}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
        />
        {renderCharacterCount()}
        {renderValidationIndicator()}
      </Box>
    );
  }
  
  return (
    <Box>
      <MuiTextField
        {...props}
        name={name}
        label={label}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        required={required}
        error={isError}
        helperText={helperText}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        inputMode={inputMode}
        autoComplete={autoComplete}
        inputRef={ref}
        inputProps={{
          maxLength,
        }}
        fullWidth
      />
      {renderCharacterCount()}
      {renderValidationIndicator()}
    </Box>
  );
};

// ===== VALIDATION RULES GENERATOR =====

function generateValidationRules(validation: ValidationRule[]) {
  const rules: Record<string, (value: any) => boolean | string> = {};
  
  validation.forEach((rule, index) => {
    const ruleKey = `rule_${index}`;
    
    rules[ruleKey] = (value: any) => {
      switch (rule.rule) {
        case 'required':
          return value ? true : (rule.message || 'This field is required');
        
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value) ? true : (rule.message || 'Invalid email format');
        
        case 'phone':
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          return phoneRegex.test(value) ? true : (rule.message || 'Invalid phone number');
        
        case 'url':
          try {
            new URL(value);
            return true;
          } catch {
            return rule.message || 'Invalid URL format';
          }
        
        case 'custom':
          if (rule.params && typeof rule.params === 'function') {
            try {
              const result = rule.params(value);
              return result === true ? true : (rule.message || 'Validation failed');
            } catch {
              return rule.message || 'Validation error';
            }
          }
          return true;
        
        default:
          return true;
      }
    };
  });
  
  return rules;
}

// ===== EXPORTS =====

export default SmartTextField;
export type { SmartTextFieldProps };