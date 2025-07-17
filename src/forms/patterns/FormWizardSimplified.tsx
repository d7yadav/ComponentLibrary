// 🚀 Simplified Form Wizard - Fixed infinite loop issues
import { ArrowBack, ArrowForward, Check, Warning } from '@mui/icons-material';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  LinearProgress,
  Alert,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import React, { useState, useCallback, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, type ZodSchema } from 'zod';

// ===== SIMPLIFIED TYPES =====

interface FieldConfig {
  type?: 'text' | 'select' | 'textarea';
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  rows?: number;
}

interface SimpleWizardStep {
  id: string;
  title: string;
  fields: string[];
  description?: string;
  validation?: ZodSchema;
  canSkip?: boolean;
  condition?: (values: any) => boolean;
  fieldConfigs?: Record<string, FieldConfig>;
}

interface SimpleWizardConfig {
  steps: SimpleWizardStep[];
  allowBackNavigation?: boolean;
  showProgress?: boolean;
}

interface SimpleFormConfig {
  defaultValues?: Record<string, any>;
  schema?: ZodSchema;
}

interface FormWizardSimplifiedProps {
  config: SimpleWizardConfig;
  formConfig?: SimpleFormConfig;
  onComplete?: (data: any) => void | Promise<void>;
  onStepChange?: (step: number) => void;
  onCancel?: () => void;
  className?: string;
}

// ===== SIMPLIFIED FORM WIZARD COMPONENT =====

export const FormWizardSimplified: React.FC<FormWizardSimplifiedProps> = ({
  config,
  formConfig = {},
  onComplete,
  onStepChange,
  onCancel,
  className,
}) => {
  
  // ===== STATE MANAGEMENT =====
  
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [skippedSteps, setSkippedSteps] = useState<Set<number>>(new Set());
  const [stepErrors, setStepErrors] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ===== FORM SETUP (SIMPLIFIED) =====
  
  const form = useForm({
    mode: 'onChange',
    defaultValues: formConfig.defaultValues || {},
    resolver: formConfig.schema ? zodResolver(formConfig.schema) : undefined,
  });
  
  // ===== COMPUTED VALUES (OPTIMIZED) =====
  
  const currentStepConfig = useMemo(() => {
    return config.steps[currentStep];
  }, [config.steps, currentStep]);
  
  const visibleSteps = useMemo(() => {
    const allValues = form.getValues();
    return config.steps.filter(step => {
      if (!step.condition) return true;
      return step.condition(allValues);
    });
  }, [config.steps, form.getValues]);
  
  const progress = useMemo(() => {
    const totalSteps = visibleSteps.length;
    const completedCount = completedSteps.size;
    return totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;
  }, [visibleSteps.length, completedSteps.size]);
  
  // Watch current step fields for changes
  const watchedFields = form.watch();
  
  const canGoNext = useMemo(() => {
    const step = currentStepConfig;
    if (!step) return false;
    
    // Check if current step fields have values (simple validation)
    const stepFields = step.fields;
    const hasAllRequiredValues = stepFields.every(fieldName => {
      const value = watchedFields[fieldName];
      // Handle different data types properly
      if (typeof value === 'boolean') return true; // Boolean values are always valid
      if (typeof value === 'number') return !isNaN(value); // Numbers must be valid
      if (typeof value === 'string') return value.trim() !== ''; // Strings must not be empty
      return value !== undefined && value !== null; // Other types must exist
    });
    
    // Check for any validation errors in current step fields
    const hasErrors = stepFields.some(fieldName => 
      form.formState.errors[fieldName]
    );
    
    return hasAllRequiredValues && !hasErrors;
  }, [currentStepConfig, watchedFields, form.formState.errors]);
  
  const canGoBack = useMemo(() => {
    return currentStep > 0 && config.allowBackNavigation !== false;
  }, [currentStep, config.allowBackNavigation]);
  
  const isLastStep = useMemo(() => {
    return currentStep === visibleSteps.length - 1;
  }, [currentStep, visibleSteps.length]);
  
  // ===== STEP NAVIGATION (SIMPLIFIED) =====
  
  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= config.steps.length) return;
    
    const step = config.steps[stepIndex];
    
    // Check step condition
    if (step.condition && !step.condition(form.getValues())) {
      return;
    }
    
    // Update current step
    setCurrentStep(stepIndex);
    
    // Notify parent
    onStepChange?.(stepIndex);
  }, [config.steps, form, onStepChange]);
  
  const goNext = useCallback(async () => {
    if (!canGoNext) return;
    
    // Simple validation for current step
    const step = currentStepConfig;
    if (step?.validation) {
      try {
        const stepFields = step.fields;
        const fieldValues = form.getValues();
        const stepData = stepFields.reduce((acc, field) => {
          acc[field] = fieldValues[field];
          return acc;
        }, {} as any);
        
        await step.validation.parseAsync(stepData);
      } catch (error) {
        setStepErrors(prev => ({
          ...prev,
          [currentStep]: 'Step validation failed',
        }));
        return;
      }
    }
    
    // Mark current step as completed
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    
    // Clear any step errors
    setStepErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[currentStep];
      return newErrors;
    });
    
    // Go to next step
    goToStep(currentStep + 1);
  }, [canGoNext, currentStep, currentStepConfig, form, goToStep]);
  
  const goBack = useCallback(() => {
    if (!canGoBack) return;
    
    // Remove current step from completed if going back
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentStep);
      return newSet;
    });
    
    // Go to previous step
    goToStep(currentStep - 1);
  }, [canGoBack, currentStep, goToStep]);
  
  const skipStep = useCallback(() => {
    if (!currentStepConfig?.canSkip) return;
    
    // Mark step as skipped
    setSkippedSteps(prev => new Set([...prev, currentStep]));
    
    // Go to next step
    goToStep(currentStep + 1);
  }, [currentStep, currentStepConfig, goToStep]);
  
  // ===== FORM COMPLETION =====
  
  const completeWizard = useCallback(async () => {
    setIsSubmitting(true);
    
    try {
      // Get final form data
      const formData = form.getValues();
      
      // Call completion handler
      if (onComplete) {
        await onComplete(formData);
      }
      
    } catch (error) {
      console.error('Wizard completion failed:', error);
      setStepErrors(prev => ({
        ...prev,
        [currentStep]: error instanceof Error ? error.message : 'Completion failed',
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [form, onComplete, currentStep]);
  
  // ===== FIELD RENDERING =====
  
  const renderField = useCallback((fieldName: string, step: SimpleWizardStep) => {
    const fieldConfig = step.fieldConfigs?.[fieldName] || {};
    const fieldType = fieldConfig.type || 'text';
    const label = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    
    if (fieldType === 'select' && fieldConfig.options) {
      return (
        <FormControl key={fieldName} fullWidth margin="normal" error={!!form.formState.errors[fieldName]}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...form.register(fieldName)}
            value={form.watch(fieldName) || ''}
            label={label}
            onChange={(e) => form.setValue(fieldName, e.target.value)}
          >
            <MenuItem value="">
              <em>Select {label}</em>
            </MenuItem>
            {fieldConfig.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {form.formState.errors[fieldName] && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
              {form.formState.errors[fieldName]?.message?.toString()}
            </Typography>
          )}
        </FormControl>
      );
    }
    
    return (
      <TextField
        key={fieldName}
        {...form.register(fieldName)}
        label={label}
        fullWidth
        margin="normal"
        multiline={fieldType === 'textarea'}
        rows={fieldConfig.rows || 4}
        placeholder={fieldConfig.placeholder}
        error={!!form.formState.errors[fieldName]}
        helperText={form.formState.errors[fieldName]?.message?.toString()}
      />
    );
  }, [form]);
  
  // ===== STEP RENDERING =====
  
  const renderStepContent = useCallback((step: SimpleWizardStep) => {
    return (
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {step.title}
        </Typography>
        
        {step.description && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {step.description}
          </Typography>
        )}
        
        {stepErrors[currentStep] && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {stepErrors[currentStep]}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {step.fields.map(fieldName => renderField(fieldName, step))}
        </Box>
      </Box>
    );
  }, [currentStep, stepErrors, renderField]);
  
  // ===== RENDER COMPONENT =====
  
  return (
    <FormProvider {...form}>
      <Paper className={className} sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Form Wizard
          </Typography>
          
          {config.showProgress && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                  Step {currentStep + 1} of {visibleSteps.length}
                </Typography>
                <Typography variant="body2">
                  {Math.round(progress)}% Complete
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          )}
        </Box>
        
        {/* Stepper */}
        <Stepper activeStep={currentStep} orientation="vertical">
          {visibleSteps.map((step, index) => (
            <Step key={step.id}>
              <StepLabel
                optional={
                  step.canSkip && (
                    <Typography variant="caption">Optional</Typography>
                  )
                }
                error={stepErrors[index] !== undefined}
                StepIconComponent={({ completed, error }) => {
                  if (error) return <Warning color="error" />;
                  if (completed) return <Check color="success" />;
                  return null;
                }}
              >
                {step.title}
              </StepLabel>
              
              <StepContent>
                {renderStepContent(step)}
                
                {/* Step Navigation */}
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  {canGoBack && (
                    <Button
                      onClick={goBack}
                      startIcon={<ArrowBack />}
                      variant="outlined"
                    >
                      Back
                    </Button>
                  )}
                  
                  {step.canSkip && (
                    <Button
                      onClick={skipStep}
                      color="secondary"
                      variant="text"
                    >
                      Skip
                    </Button>
                  )}
                  
                  {isLastStep ? (
                    <Button
                      onClick={completeWizard}
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                    >
                      {isSubmitting ? 'Completing...' : 'Complete'}
                    </Button>
                  ) : (
                    <Button
                      onClick={goNext}
                      disabled={!canGoNext}
                      endIcon={<ArrowForward />}
                      variant="contained"
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        
        {/* Footer */}
        <Divider sx={{ mt: 3, mb: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {onCancel && (
              <Button onClick={onCancel} color="secondary">
                Cancel
              </Button>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {completedSteps.size} completed • {skippedSteps.size} skipped
            </Typography>
          </Box>
        </Box>
      </Paper>
    </FormProvider>
  );
};

// ===== SIMPLIFIED UTILITIES =====

export const createSimpleWizardConfig = (
  steps: SimpleWizardStep[],
  options?: {
    allowBackNavigation?: boolean;
    showProgress?: boolean;
  }
): SimpleWizardConfig => {
  return {
    steps,
    allowBackNavigation: options?.allowBackNavigation ?? true,
    showProgress: options?.showProgress ?? true,
  };
};

export const createSimpleWizardStep = (
  id: string,
  title: string,
  fields: string[],
  options?: {
    description?: string;
    validation?: ZodSchema;
    canSkip?: boolean;
    condition?: (values: any) => boolean;
  }
): SimpleWizardStep => {
  return {
    id,
    title,
    fields,
    description: options?.description,
    validation: options?.validation,
    canSkip: options?.canSkip ?? false,
    condition: options?.condition,
  };
};

// ===== EXPORTS =====

export default FormWizardSimplified;
export type { FormWizardSimplifiedProps, SimpleWizardConfig, SimpleWizardStep };