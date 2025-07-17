import { FormControl, Box } from '@mui/material';
import { forwardRef, memo, useId } from 'react';

import {
  DEFAULT_PROPS,
  TEST_IDS,
  ACCESSIBILITY_CONSTANTS,
} from './Checkbox.constants';
import {
  StyledCheckbox,
  StyledFormControlLabel,
  StyledFormHelperText,
  StyledFormGroup,
  CheckboxContainer,
  LoadingSpinner,
  GroupLabel,
  RequiredIndicator,
} from './Checkbox.styles';
import type { CheckboxProps, CheckboxGroupProps } from './Checkbox.types';

/**
 * Enhanced Checkbox component with comprehensive theming and accessibility
 * 
 * Features:
 * - 3 variants: standard, outlined, filled
 * - 3 sizes: small, medium, large
 * - 6 color schemes: primary, secondary, success, warning, error, info
 * - Validation states with visual feedback
 * - Loading states
 * - Custom icons support
 * - Flexible label positioning
 * - Full accessibility compliance (WCAG 2.1 AA)
 * - React Hook Form integration ready
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(({
  size = DEFAULT_PROPS.size,
  color = DEFAULT_PROPS.color,
  variant = DEFAULT_PROPS.variant,
  label,
  helperText,
  error = false,
  errorText,
  validationState = DEFAULT_PROPS.validationState,
  required = DEFAULT_PROPS.required,
  labelPlacement = DEFAULT_PROPS.labelPlacement,
  loading = DEFAULT_PROPS.loading,
  description,
  className,
  'data-testid': dataTestId = TEST_IDS.checkbox,
  disabled = DEFAULT_PROPS.disabled,
  ...props
}, ref) => {
  const helperTextId = useId();
  const descriptionId = useId();
  
  // Determine final validation state
  const finalValidationState = error ? 'error' : validationState;
  const finalHelperText = error && errorText ? errorText : helperText;
  
  // Build accessibility props
  const accessibilityProps = {
    'aria-describedby': finalHelperText ? helperTextId : undefined,
    'aria-invalid': error || finalValidationState === 'error',
    'aria-required': required,
    'data-testid': dataTestId,
  };
  
  const checkboxElement = (
    <CheckboxContainer loading={loading}>
      <StyledCheckbox
        ref={ref}
        customSize={size}
        customColor={color}
        variant={variant}
        validationState={finalValidationState}
        loading={loading}
        disabled={disabled || loading}
        {...accessibilityProps}
        {...props}
      />
      {loading && (
        <LoadingSpinner
          customSize={size}
          size="small"
          data-testid={TEST_IDS.loadingSpinner}
        />
      )}
    </CheckboxContainer>
  );
  
  // If no label, return just the checkbox
  if (!label) {
    return (
      <Box className={className}>
        {checkboxElement}
        {finalHelperText && (
          <StyledFormHelperText
            id={helperTextId}
            customSize={size}
            validationState={finalValidationState}
            error={error}
            data-testid={TEST_IDS.helperText}
          >
            {finalHelperText}
          </StyledFormHelperText>
        )}
      </Box>
    );
  }
  
  return (
    <FormControl className={className} error={error}>
      <StyledFormControlLabel
        control={checkboxElement}
        label={
          <Box component="span" data-testid={TEST_IDS.label}>
            {label}
            {required && <RequiredIndicator>*</RequiredIndicator>}
          </Box>
        }
        customSize={size}
        validationState={finalValidationState}
        labelPlacement={labelPlacement}
        disabled={disabled || loading}
      />
      
      {description && (
        <StyledFormHelperText
          id={descriptionId}
          customSize={size}
          validationState="none"
        >
          {description}
        </StyledFormHelperText>
      )}
      
      {finalHelperText && (
        <StyledFormHelperText
          id={helperTextId}
          customSize={size}
          validationState={finalValidationState}
          error={error}
          data-testid={finalHelperText === errorText ? TEST_IDS.errorText : TEST_IDS.helperText}
        >
          {finalHelperText}
        </StyledFormHelperText>
      )}
    </FormControl>
  );
});

Checkbox.displayName = 'Checkbox';

/**
 * CheckboxGroup component for managing multiple related checkboxes
 * 
 * Features:
 * - Multiple selection management
 * - Consistent styling across all checkboxes
 * - Group-level validation and error handling
 * - Flexible layout (row/column)
 * - Accessibility compliance with proper labeling
 */
export const CheckboxGroup = memo<CheckboxGroupProps>(({
  value = [],
  onChange,
  name,
  options,
  direction = 'column',
  disabled = false,
  required = false,
  error = false,
  helperText,
  size = DEFAULT_PROPS.size,
  color = DEFAULT_PROPS.color,
  variant = DEFAULT_PROPS.variant,
  label,
  'data-testid': dataTestId = TEST_IDS.group,
}) => {
  const groupId = useId();
  const helperTextId = useId();
  
  const handleChange = (optionValue: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    
    if (event.target.checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter(v => v !== optionValue));
    }
  };
  
  return (
    <FormControl error={error} data-testid={dataTestId}>
      {label && (
        <GroupLabel
          component="legend"
          required={required}
          data-testid={TEST_IDS.groupLabel}
        >
          {label}
        </GroupLabel>
      )}
      
      <StyledFormGroup
        direction={direction}
        spacing={1}
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={helperText ? helperTextId : undefined}
        aria-required={required}
        aria-invalid={error}
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            name={name}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={handleChange(option.value)}
            label={option.label}
            helperText={option.helperText}
            disabled={disabled || option.disabled}
            size={size}
            color={color}
            variant={variant}
            icon={option.icon}
            checkedIcon={option.checkedIcon}
            description={option.description}
            data-testid={`${dataTestId}-option-${option.value}`}
          />
        ))}
      </StyledFormGroup>
      
      {helperText && (
        <StyledFormHelperText
          id={helperTextId}
          customSize={size}
          validationState={error ? 'error' : 'none'}
          error={error}
          data-testid={TEST_IDS.helperText}
        >
          {helperText}
        </StyledFormHelperText>
      )}
    </FormControl>
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';