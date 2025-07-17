// 🚀 Smart Date Picker - Form-integrated Date Picker Component
import React, { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface SmartDatePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: Array<{
    rule: string;
    message?: string;
    params?: any;
  }>;
}

export const SmartDatePicker: React.FC<SmartDatePickerProps> = ({
  name,
  label,
  placeholder,
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

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [onChange]);

  const handleBlur = useCallback(() => {
    onBlur();
  }, [onBlur]);

  return (
    <TextField
      ref={ref}
      type="date"
      label={label}
      placeholder={placeholder}
      value={value || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      error={invalid}
      helperText={error?.message?.toString()}
      required={required}
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
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

export default SmartDatePicker;