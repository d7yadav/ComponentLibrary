// 🚀 Smart Select - Form-integrated Select Component
import React, { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Select } from '@/components/forms/Select/Select';
import type { SelectProps } from '@/components/forms/Select/Select.types';

interface SmartSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'name'> {
  name: string;
  validation?: Array<{
    rule: string;
    message?: string;
    params?: any;
  }>;
}

export const SmartSelect: React.FC<SmartSelectProps> = ({
  name,
  validation = [],
  options = [],
  ...props
}) => {
  const { control, formState: { errors } } = useFormContext();
  
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: {
      required: props.required ? `${props.label} is required` : false,
      validate: generateValidationRules(validation),
    },
  });

  const handleChange = useCallback((newValue: any) => {
    onChange(newValue);
  }, [onChange]);

  const handleBlur = useCallback(() => {
    onBlur();
  }, [onBlur]);

  return (
    <Select
      {...props}
      ref={ref}
      value={value || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      options={options}
      error={invalid}
      helperText={error?.message?.toString() || props.helperText}
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

export default SmartSelect;