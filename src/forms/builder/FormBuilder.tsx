// 🚀 Form Builder - Dynamic Form Generation with Expert Features
import { ExpandMore } from '@mui/icons-material';
import { Box, Paper, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import { SmartTextField } from '../components/fields/SmartTextField';
import { SmartSelect } from '../components/fields/SmartSelect';
import { useAdvancedForm } from '../core/hooks/useAdvancedForm';
import { SmartFormProvider, useFormContext } from '../core/providers/FormProvider';
import type {
  FormBuilderConfig,
  FormSection,
  FormFieldConfig,
  SmartFormConfig,
  FormTheme,
  FormPlugin,
} from '../types';
import { ValidationEngine } from '../validation/ValidationEngine';


// ===== FORM BUILDER COMPONENT =====

interface FormBuilderProps {
  config: FormBuilderConfig;
  onSubmit?: (data: any) => void | Promise<void>;
  onError?: (errors: any) => void;
  onChange?: (data: any) => void;
  className?: string;
  theme?: FormTheme;
  plugins?: FormPlugin[];
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  config,
  onSubmit,
  onError,
  onChange,
  className,
  theme,
  plugins = [],
}) => {
  
  // ===== STATE MANAGEMENT =====
  
  const [validationEngine] = useState(() => new ValidationEngine());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({});
  
  // ===== FORM SETUP =====
  
  const form = useAdvancedForm(config.config);
  
  // ===== SECTION VISIBILITY =====
  
  const updateSectionVisibility = useCallback((formValues: any) => {
    const newVisibility: Record<string, boolean> = {};
    
    config.sections.forEach(section => {
      if (section.condition) {
        newVisibility[section.id] = section.condition(formValues);
      } else {
        newVisibility[section.id] = true;
      }
    });
    
    setSectionVisibility(newVisibility);
  }, [config.sections]);
  
  // ===== WATCH FORM CHANGES =====
  
  useEffect(() => {
    const subscription = form.watch((values) => {
      updateSectionVisibility(values);
      onChange?.(values);
    });
    
    return () => subscription.unsubscribe();
  }, [form, updateSectionVisibility]); // Removed onChange from deps to prevent infinite loop
  
  // ===== PLUGIN SYSTEM =====
  
  useEffect(() => {
    plugins.forEach(plugin => {
      try {
        plugin.install(form);
      } catch (error) {
        console.error(`Failed to install plugin ${plugin.name}:`, error);
      }
    });
    
    return () => {
      plugins.forEach(plugin => {
        if (plugin.uninstall) {
          try {
            plugin.uninstall(form);
          } catch (error) {
            console.error(`Failed to uninstall plugin ${plugin.name}:`, error);
          }
        }
      });
    };
  }, [plugins]); // Removed form from deps to prevent infinite loop
  
  // ===== SECTION EXPANSION =====
  
  const handleSectionExpansion = useCallback((sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);
  
  // ===== FORM SUBMISSION =====
  
  const handleSubmit = useCallback(async (data: any) => {
    try {
      await onSubmit?.(data);
    } catch (error) {
      onError?.(error);
    }
  }, [onSubmit, onError]);
  
  // ===== SORTED SECTIONS =====
  
  const sortedSections = useMemo(() => {
    return [...config.sections].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [config.sections]);
  
  // ===== VISIBLE SECTIONS =====
  
  const visibleSections = useMemo(() => {
    return sortedSections.filter(section => sectionVisibility[section.id] !== false);
  }, [sortedSections, sectionVisibility]);
  
  // ===== RENDER METHODS =====
  
  const renderField = useCallback((fieldConfig: FormFieldConfig) => {
    const { name, type, label, ...fieldProps } = fieldConfig;
    
    // Check field visibility (using form.getValues() instead of watching)
    if (fieldConfig.condition && !fieldConfig.condition(form.getValues())) {
      return null;
    }
    
    switch (type) {
      case 'text':
        return (
          <SmartTextField
            key={name}
            name={name}
            label={label}
            {...fieldProps}
          />
        );
      
      case 'select':
        return (
          <SmartSelect
            key={name}
            name={name}
            label={label}
            {...fieldProps}
          />
        );
      
      case 'checkbox':
        // TODO: Implement SmartCheckbox component
        return (
          <SmartTextField
            key={name}
            name={name}
            label={label}
            {...fieldProps}
          />
        );
      
      case 'radio':
        // TODO: Implement SmartRadio component
        return (
          <SmartTextField
            key={name}
            name={name}
            label={label}
            {...fieldProps}
          />
        );
      
      case 'date':
        // TODO: Implement SmartDatePicker component
        return (
          <SmartTextField
            key={name}
            name={name}
            label={label}
            {...fieldProps}
          />
        );
      
      case 'file':
        // TODO: Implement SmartFileUpload component
        return (
          <SmartTextField
            key={name}
            name={name}
            label={label}
            {...fieldProps}
          />
        );
      
      case 'autocomplete':
        // TODO: Implement SmartAutocomplete component
        return (
          <SmartTextField
            key={name}
            name={name}
            label={label}
            {...fieldProps}
          />
        );
      
      case 'rich-text':
        // TODO: Implement SmartRichTextEditor component
        return (
          <SmartTextField
            key={name}
            name={name}
            label={label}
            multiline
            rows={4}
            {...fieldProps}
          />
        );
      
      case 'phone':
        return (
          <SmartTextField
            key={name}
            name={name}
            label={label}
            inputMode="tel"
            {...fieldProps}
          />
        );
      
      case 'address':
        // TODO: Implement SmartAddressField component
        return (
          <SmartTextField
            key={name}
            name={name}
            label={label}
            {...fieldProps}
          />
        );
      
      case 'signature':
        // TODO: Implement SmartSignatureField component
        return (
          <SmartTextField
            key={name}
            name={name}
            label={label}
            {...fieldProps}
          />
        );
      
      default:
        return (
          <SmartTextField
            key={name}
            name={name}
            label={label}
            {...fieldProps}
          />
        );
    }
  }, [form]); // Fixed dependency to prevent recreation on every value change
  
  const renderSection = useCallback((section: FormSection) => {
    const isExpanded = expandedSections.has(section.id);
    
    return (
      <Accordion
        key={section.id}
        expanded={isExpanded}
        onChange={() => handleSectionExpansion(section.id)}
        sx={{
          mb: 2,
          '&:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls={`${section.id}-content`}
          id={`${section.id}-header`}
        >
          <Box>
            <Typography variant="h6" component="h3">
              {section.title}
            </Typography>
            {section.description && (
              <Typography variant="body2" color="text.secondary">
                {section.description}
              </Typography>
            )}
          </Box>
        </AccordionSummary>
        
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {section.fields.map(fieldConfig => renderField(fieldConfig))}
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  }, [expandedSections, handleSectionExpansion, renderField]);
  
  // ===== RENDER COMPONENT =====
  
  return (
    <SmartFormProvider
      form={form}
      config={config.config}
      theme={theme}
      onSubmit={handleSubmit}
      onError={onError}
    >
      <FormProvider {...form}>
        <Paper
          className={className}
          sx={{
            p: 3,
            backgroundColor: theme?.colors?.surface || 'background.paper',
          }}
        >
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Dynamic Form
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Generated from configuration with {config.sections.length} sections
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {visibleSections.map(section => renderSection(section))}
            </Box>
            
            <Divider sx={{ mt: 3, mb: 3 }} />
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => form.reset()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: theme?.colors?.secondary || '#dc004e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  backgroundColor: theme?.colors?.primary || '#1976d2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
            </Box>
          </form>
        </Paper>
      </FormProvider>
    </SmartFormProvider>
  );
};

// ===== FORM BUILDER UTILITIES =====

export const createFormBuilderConfig = (
  sections: FormSection[],
  config: SmartFormConfig,
  theme?: FormTheme
): FormBuilderConfig => {
  return {
    sections,
    config,
    theme,
    plugins: [],
  };
};

export const createFormSection = (
  id: string,
  title: string,
  fields: FormFieldConfig[],
  options?: {
    description?: string;
    condition?: (values: any) => boolean;
    order?: number;
  }
): FormSection => {
  return {
    id,
    title,
    fields,
    description: options?.description,
    condition: options?.condition,
    order: options?.order,
  };
};

export const createFormField = (
  name: string,
  type: FormFieldConfig['type'],
  label: string,
  options?: Partial<FormFieldConfig>
): FormFieldConfig => {
  return {
    name,
    type,
    label,
    ...options,
  };
};

// ===== PLUGIN SYSTEM =====

export const createPlugin = (
  name: string,
  version: string,
  install: (form: any) => void,
  uninstall?: (form: any) => void
): FormPlugin => {
  return {
    name,
    version,
    install,
    uninstall,
  };
};

// ===== EXAMPLE USAGE =====

export const createExampleForm = (): FormBuilderConfig => {
  const personalInfoSection = createFormSection(
    'personal-info',
    'Personal Information',
    [
      createFormField('firstName', 'text', 'First Name', {
        required: true,
        placeholder: 'Enter your first name',
      }),
      createFormField('lastName', 'text', 'Last Name', {
        required: true,
        placeholder: 'Enter your last name',
      }),
      createFormField('email', 'text', 'Email Address', {
        required: true,
        placeholder: 'Enter your email',
        validation: [
          { rule: 'email', message: 'Please enter a valid email' },
        ],
      }),
      createFormField('phone', 'phone', 'Phone Number', {
        placeholder: 'Enter your phone number',
        validation: [
          { rule: 'phone', message: 'Please enter a valid phone number' },
        ],
      }),
    ]
  );
  
  const addressSection = createFormSection(
    'address',
    'Address Information',
    [
      createFormField('street', 'text', 'Street Address', {
        required: true,
        placeholder: 'Enter your street address',
      }),
      createFormField('city', 'text', 'City', {
        required: true,
        placeholder: 'Enter your city',
      }),
      createFormField('state', 'select', 'State', {
        required: true,
        options: [
          { value: 'CA', label: 'California' },
          { value: 'NY', label: 'New York' },
          { value: 'TX', label: 'Texas' },
        ],
      }),
      createFormField('zipCode', 'text', 'ZIP Code', {
        required: true,
        placeholder: 'Enter your ZIP code',
      }),
    ]
  );
  
  return createFormBuilderConfig(
    [personalInfoSection, addressSection],
    {
      mode: 'onChange',
      performance: {
        debounceMs: 300,
        optimizeRerenders: true,
      },
      persistence: {
        enabled: true,
        key: 'example-form',
        storage: 'localStorage',
      },
    }
  );
};

// ===== EXPORTS =====

export default FormBuilder;
export type { FormBuilderProps, FormBuilderConfig };