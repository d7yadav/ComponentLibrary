// 🚀 Form Wizard - Multi-Step Form Pattern with Expert Features
import { ArrowBack, ArrowForward, Check, Warning, Info } from '@mui/icons-material';
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
  IconButton,
  Chip,
} from '@mui/material';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import { SmartTextField } from '../components/fields/SmartTextField';
import { useAdvancedForm } from '../core/hooks/useAdvancedForm';
import { SmartFormProvider } from '../core/providers/FormProvider';
import type {
  WizardConfig,
  WizardStep,
  SmartFormConfig,
  FormTheme,
  FormFieldConfig,
} from '../types';
import { ValidationEngine } from '../validation/ValidationEngine';


// ===== FORM WIZARD COMPONENT =====

interface FormWizardProps {
  config: WizardConfig;
  formConfig: SmartFormConfig;
  theme?: FormTheme;
  onComplete?: (data: any) => void | Promise<void>;
  onStepChange?: (step: number) => void;
  onCancel?: () => void;
  className?: string;
}

export const FormWizard: React.FC<FormWizardProps> = ({
  config,
  formConfig,
  theme,
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
  const [validationEngine] = useState(() => new ValidationEngine());
  
  // ===== FORM SETUP =====
  
  const form = useAdvancedForm(formConfig);
  const formValues = form.watch();
  
  // ===== COMPUTED VALUES =====
  
  const currentStepConfig = useMemo(() => {
    return config.steps[currentStep];
  }, [config.steps, currentStep]);
  
  const visibleSteps = useMemo(() => {
    return config.steps.filter(step => {
      if (!step.condition) return true;
      return step.condition(formValues);
    });
  }, [config.steps, formValues]);
  
  const progress = useMemo(() => {
    const totalSteps = visibleSteps.length;
    const completedCount = completedSteps.size;
    return totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;
  }, [visibleSteps.length, completedSteps.size]);
  
  const canGoNext = useMemo(() => {
    const step = currentStepConfig;
    if (!step) return false;
    
    // Check if current step is valid
    const stepFields = step.fields;
    const hasErrors = stepFields.some(fieldName => {
      const fieldError = form.formState.errors[fieldName];
      return fieldError !== undefined;
    });
    
    return !hasErrors;
  }, [currentStepConfig, form.formState.errors]);
  
  const canGoBack = useMemo(() => {
    return currentStep > 0 && config.allowBackNavigation !== false;
  }, [currentStep, config.allowBackNavigation]);
  
  const isLastStep = useMemo(() => {
    return currentStep === visibleSteps.length - 1;
  }, [currentStep, visibleSteps.length]);
  
  // ===== STEP NAVIGATION =====
  
  const goToStep = useCallback(async (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= config.steps.length) return;
    
    const step = config.steps[stepIndex];
    
    // Check step condition
    if (step.condition && !step.condition(formValues)) {
      return;
    }
    
    // Call onExit for current step
    if (currentStepConfig?.onExit) {
      currentStepConfig.onExit(formValues);
    }
    
    // Update current step
    setCurrentStep(stepIndex);
    
    // Call onEnter for new step
    if (step.onEnter) {
      step.onEnter(formValues);
    }
    
    // Notify parent
    onStepChange?.(stepIndex);
    
    // Save progress if enabled
    if (config.persistProgress) {
      await form.save(`wizard-progress-${stepIndex}`);
    }
  }, [
    config.steps,
    config.persistProgress,
    currentStepConfig,
    formValues,
    form,
    onStepChange,
  ]);
  
  const goNext = useCallback(async () => {
    if (!canGoNext) return;
    
    // Validate current step
    const isValid = await validateCurrentStep();
    if (!isValid) return;
    
    // Mark current step as completed
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    
    // Clear any step errors
    setStepErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[currentStep];
      return newErrors;
    });
    
    // Go to next step
    await goToStep(currentStep + 1);
  }, [canGoNext, currentStep, goToStep]);
  
  const goBack = useCallback(async () => {
    if (!canGoBack) return;
    
    // Remove current step from completed if going back
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentStep);
      return newSet;
    });
    
    // Go to previous step
    await goToStep(currentStep - 1);
  }, [canGoBack, currentStep, goToStep]);
  
  const skipStep = useCallback(async () => {
    if (!currentStepConfig?.canSkip) return;
    
    // Mark step as skipped
    setSkippedSteps(prev => new Set([...prev, currentStep]));
    
    // Go to next step
    await goToStep(currentStep + 1);
  }, [currentStep, currentStepConfig, goToStep]);
  
  // ===== VALIDATION =====
  
  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    const step = currentStepConfig;
    if (!step) return true;
    
    try {
      // Validate step fields
      const stepFields = step.fields;
      const fieldValues = form.getValues();
      
      for (const fieldName of stepFields) {
        const fieldValue = fieldValues[fieldName];
        
        // Basic required validation
        if (!fieldValue || fieldValue === '') {
          form.setError(fieldName, {
            type: 'required',
            message: `${fieldName} is required`,
          });
          return false;
        }
      }
      
      // Custom step validation
      if (step.validation) {
        try {
          await step.validation.parseAsync(
            stepFields.reduce((acc, field) => {
              acc[field] = fieldValues[field];
              return acc;
            }, {} as any)
          );
        } catch (error) {
          setStepErrors(prev => ({
            ...prev,
            [currentStep]: 'Step validation failed',
          }));
          return false;
        }
      }
      
      return true;
    } catch (error) {
      setStepErrors(prev => ({
        ...prev,
        [currentStep]: 'Validation error occurred',
      }));
      return false;
    }
  }, [currentStepConfig, form, currentStep]);
  
  // ===== FORM COMPLETION =====
  
  const completeWizard = useCallback(async () => {
    setIsSubmitting(true);
    
    try {
      // Validate all steps
      for (let i = 0; i < config.steps.length; i++) {
        const step = config.steps[i];
        if (step.condition && !step.condition(formValues)) {
          continue; // Skip conditional steps that don't apply
        }
        
        if (skippedSteps.has(i) && !step.canSkip) {
          throw new Error(`Step ${i + 1} cannot be skipped`);
        }
      }
      
      // Get final form data
      const formData = form.getValues();
      
      // Call completion handlers
      if (config.onComplete) {
        await config.onComplete(formData);
      }
      
      if (onComplete) {
        await onComplete(formData);
      }
      
      // Clear progress if enabled
      if (config.persistProgress) {
        for (let i = 0; i < config.steps.length; i++) {
          await form.save(`wizard-progress-${i}`);
        }
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
  }, [
    config.steps,
    config.onComplete,
    config.persistProgress,
    formValues,
    skippedSteps,
    form,
    onComplete,
    currentStep,
  ]);
  
  // ===== FIELD RENDERING =====
  
  const renderField = useCallback((fieldName: string) => {
    // For now, render as text field. In a full implementation,
    // this would determine field type and render appropriate component
    return (
      <SmartTextField
        key={fieldName}
        name={fieldName}
        label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
        required
      />
    );
  }, []);
  
  // ===== STEP RENDERING =====
  
  const renderStepContent = useCallback((step: WizardStep) => {
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
          {step.fields.map(fieldName => renderField(fieldName))}
        </Box>
      </Box>
    );
  }, [currentStep, stepErrors, renderField]);
  
  // ===== EFFECTS =====
  
  useEffect(() => {
    // Load progress if enabled
    if (config.persistProgress) {
      form.load(`wizard-progress-${currentStep}`);
    }
  }, [config.persistProgress, currentStep, form]);
  
  // ===== RENDER COMPONENT =====
  
  return (
    <SmartFormProvider
      form={form}
      config={formConfig}
      theme={theme}
    >
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
                  StepIconComponent={({ completed, active, error }) => {
                    if (error) return <Warning color="error" />;
                    if (completed) return <Check color="success" />;
                    if (skippedSteps.has(index)) return <Info color="disabled" />;
                    return null;
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {step.title}
                    {completedSteps.has(index) && (
                      <Chip label="Completed" size="small" color="success" />
                    )}
                    {skippedSteps.has(index) && (
                      <Chip label="Skipped" size="small" color="default" />
                    )}
                  </Box>
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
    </SmartFormProvider>
  );
};

// ===== WIZARD UTILITIES =====

export const createWizardConfig = (
  steps: WizardStep[],
  options?: {
    allowBackNavigation?: boolean;
    persistProgress?: boolean;
    showProgress?: boolean;
    onStepChange?: (step: number) => void;
    onComplete?: (data: any) => void;
  }
): WizardConfig => {
  return {
    steps,
    allowBackNavigation: options?.allowBackNavigation ?? true,
    persistProgress: options?.persistProgress ?? true,
    showProgress: options?.showProgress ?? true,
    onStepChange: options?.onStepChange,
    onComplete: options?.onComplete,
  };
};

export const createWizardStep = (
  id: string,
  title: string,
  fields: string[],
  options?: {
    description?: string;
    validation?: any;
    canSkip?: boolean;
    condition?: (values: any) => boolean;
    onEnter?: (values: any) => void;
    onExit?: (values: any) => void;
  }
): WizardStep => {
  return {
    id,
    title,
    fields,
    description: options?.description,
    validation: options?.validation,
    canSkip: options?.canSkip ?? false,
    condition: options?.condition,
    onEnter: options?.onEnter,
    onExit: options?.onExit,
  };
};

// ===== EXAMPLE USAGE =====

export const createExampleWizard = (): WizardConfig => {
  const step1 = createWizardStep(
    'personal-info',
    'Personal Information',
    ['firstName', 'lastName', 'email'],
    {
      description: 'Please provide your basic information',
    }
  );
  
  const step2 = createWizardStep(
    'address',
    'Address Information',
    ['street', 'city', 'state', 'zipCode'],
    {
      description: 'Please provide your address details',
    }
  );
  
  const step3 = createWizardStep(
    'preferences',
    'Preferences',
    ['newsletter', 'notifications'],
    {
      description: 'Configure your preferences',
      canSkip: true,
    }
  );
  
  return createWizardConfig([step1, step2, step3], {
    allowBackNavigation: true,
    persistProgress: true,
    showProgress: true,
  });
};

// ===== EXPORTS =====

export default FormWizard;
export type { FormWizardProps, WizardConfig, WizardStep };