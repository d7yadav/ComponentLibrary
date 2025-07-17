// 🚀 Smart Autocomplete - Form-integrated Autocomplete Component
import React, { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

interface SmartAutocompleteProps {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  multiple?: boolean;
  freeSolo?: boolean;
  required?: boolean;
  validation?: Array<{
    rule: string;
    message?: string;
    params?: any;
  }>;
}

export const SmartAutocomplete: React.FC<SmartAutocompleteProps> = ({
  name,
  label,
  options,
  placeholder,
  multiple = false,
  freeSolo = false,
  required = false,
  validation = [],
}) => {
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

  const handleChange = useCallback((event: any, newValue: any) => {
    onChange(newValue);
  }, [onChange]);

  const handleBlur = useCallback(() => {
    onBlur();
  }, [onBlur]);

  return (
    <Autocomplete
      multiple={multiple}
      freeSolo={freeSolo}
      options={options}
      value={value || (multiple ? [] : null)}
      onChange={handleChange}
      onBlur={handleBlur}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        return option.label || option.value;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          ref={ref}
          label={label}
          placeholder={placeholder}
          error={invalid}
          helperText={error?.message?.toString()}
          required={required}
        />
      )}
    />
  );
};

// Helper function to generate validation rules
function generateValidationRules(validation: Array<{ rule: string; message?: string; params?: any }>) {
  const rules: Record<string, (value: any) => boolean | string> = {};
  
  validation.forEach((rule, index) => {
    const ruleKey = `rule_${index}`;
    
    rules[ruleKey] = (value: any) => {
      switch (rule.rule) {
        case 'required':
          return value ? true : (rule.message || 'This field is required');
        
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

export default SmartAutocomplete;