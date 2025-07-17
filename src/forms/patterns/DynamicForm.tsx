// 🚀 Dynamic Form - Runtime Form Generation Pattern
import React, { useState, useCallback } from 'react';
import { FormProvider } from 'react-hook-form';
import { Box, Typography, Button } from '@mui/material';

interface DynamicFormProps {
  fields: Array<{
    name: string;
    type: string;
    label: string;
    options?: any;
  }>;
  onSubmit?: (data: any) => void;
  onFieldChange?: (name: string, value: any) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  onFieldChange,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleFieldChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    onFieldChange?.(name, value);
  }, [onFieldChange]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  }, [formData, onSubmit]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Dynamic Form
      </Typography>
      
      {fields.map((field) => (
        <Box key={field.name} sx={{ mb: 2 }}>
          <Typography variant="body1">{field.label}</Typography>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '4px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </Box>
      ))}
      
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default DynamicForm;