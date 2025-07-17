// 🚀 Conditional Fields - Dynamic Field Visibility Pattern
import React, { useState, useCallback } from 'react';
import { Box, Typography, FormControl, FormLabel } from '@mui/material';

interface ConditionalFieldsProps {
  fields: Array<{
    name: string;
    type: string;
    label: string;
    condition?: (values: any) => boolean;
    dependsOn?: string[];
  }>;
  onFieldChange?: (name: string, value: any) => void;
}

export const ConditionalFields: React.FC<ConditionalFieldsProps> = ({
  fields,
  onFieldChange,
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleFieldChange = useCallback((name: string, value: any) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    onFieldChange?.(name, value);
  }, [onFieldChange]);

  const shouldShowField = useCallback((field: any) => {
    if (!field.condition) return true;
    return field.condition(formValues);
  }, [formValues]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Conditional Fields
      </Typography>
      
      {fields.map((field) => (
        shouldShowField(field) && (
          <FormControl key={field.name} fullWidth sx={{ mb: 2 }}>
            <FormLabel>{field.label}</FormLabel>
            <input
              type={field.type}
              name={field.name}
              value={formValues[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '4px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </FormControl>
        )
      ))}
    </Box>
  );
};

export default ConditionalFields;