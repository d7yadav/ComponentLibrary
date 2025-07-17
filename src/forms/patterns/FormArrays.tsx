// 🚀 Form Arrays - Dynamic Form Array Pattern
import React, { useState, useCallback } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

interface FormArraysProps {
  name: string;
  label: string;
  fields: Array<{
    name: string;
    type: string;
    label: string;
  }>;
  onArrayChange?: (name: string, items: any[]) => void;
}

export const FormArrays: React.FC<FormArraysProps> = ({
  name,
  label,
  fields,
  onArrayChange,
}) => {
  const [items, setItems] = useState<any[]>([{}]);

  const addItem = useCallback(() => {
    const newItems = [...items, {}];
    setItems(newItems);
    onArrayChange?.(name, newItems);
  }, [items, name, onArrayChange]);

  const removeItem = useCallback((index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onArrayChange?.(name, newItems);
  }, [items, name, onArrayChange]);

  const updateItem = useCallback((index: number, fieldName: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [fieldName]: value };
    setItems(newItems);
    onArrayChange?.(name, newItems);
  }, [items, name, onArrayChange]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      
      {items.map((item, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1">Item {index + 1}</Typography>
            <IconButton onClick={() => removeItem(index)} disabled={items.length === 1}>
              <Remove />
            </IconButton>
          </Box>
          
          {fields.map((field) => (
            <Box key={field.name} sx={{ mb: 1 }}>
              <Typography variant="body2">{field.label}</Typography>
              <input
                type={field.type}
                name={field.name}
                value={item[field.name] || ''}
                onChange={(e) => updateItem(index, field.name, e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px',
                  marginTop: '2px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </Box>
          ))}
        </Box>
      ))}
      
      <Button onClick={addItem} startIcon={<Add />} variant="outlined">
        Add {label}
      </Button>
    </Box>
  );
};

export default FormArrays;