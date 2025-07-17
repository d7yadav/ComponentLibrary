import { Box } from '@mui/material';
import { forwardRef, memo, useId } from 'react';

import {
  DEFAULT_PROPS,
  TEST_IDS,
  ACCESSIBILITY_CONSTANTS,
} from './Radio.constants';
import {
  StyledRadio,
  StyledFormControlLabel,
  StyledFormHelperText,
  StyledRadioGroup,
  StyledFormControl,
  StyledFormLabel,
  RadioContainer,
  LoadingSpinner,
  RequiredIndicator,
} from './Radio.styles';
import type { RadioProps, RadioGroupProps } from './Radio.types';

/**
 * Enhanced Radio component with comprehensive theming and accessibility
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
export const Radio = forwardRef<HTMLButtonElement, RadioProps>(({
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
  'data-testid': dataTestId = TEST_IDS.radio,
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
  
  const radioElement = (
    <RadioContainer loading={loading}>
      <StyledRadio
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
    </RadioContainer>
  );
  
  // If no label, return just the radio button
  if (!label) {
    return (
      <Box className={className}>
        {radioElement}
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
    <StyledFormControl className={className} error={error}>
      <StyledFormControlLabel
        control={radioElement}
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
    </StyledFormControl>
  );
});

Radio.displayName = 'Radio';

/**
 * RadioGroup component for managing mutually exclusive radio button selections
 * 
 * Features:
 * - Single selection management (mutually exclusive)
 * - Consistent styling across all radio buttons
 * - Group-level validation and error handling
 * - Flexible layout (row/column)
 * - Accessibility compliance with proper labeling and keyboard navigation
 * - Integration with HTML form standards
 */
export const RadioGroup = memo<RadioGroupProps>(({
  value,
  onChange,
  name,
  options,
  direction = DEFAULT_PROPS.direction,
  disabled = false,
  required = false,
  error = false,
  helperText,
  errorText,
  size = DEFAULT_PROPS.size,
  color = DEFAULT_PROPS.color,
  variant = DEFAULT_PROPS.variant,
  label,
  validationState = DEFAULT_PROPS.validationState,
  'data-testid': dataTestId = TEST_IDS.group,
  ...props
}) => {
  const groupId = useId();
  const helperTextId = useId();
  
  // Determine final validation state and helper text
  const finalValidationState = error ? 'error' : validationState;
  const finalHelperText = error && errorText ? errorText : helperText;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  
  return (
    <StyledFormControl 
      error={error} 
      data-testid={dataTestId}
      fullWidth
    >
      {label && (
        <StyledFormLabel
          id={`${groupId}-label`}
          required={required}
          customSize={size}
          data-testid={TEST_IDS.groupLabel}
        >
          {label}
        </StyledFormLabel>
      )}
      
      <StyledRadioGroup
        value={value}
        onChange={handleChange}
        name={name}
        row={direction === 'row'}
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={finalHelperText ? helperTextId : undefined}
        aria-required={required}
        aria-invalid={error}
        spacing={1}
        {...props}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            helperText={option.helperText}
            disabled={disabled || option.disabled}
            size={size}
            color={color}
            variant={variant}
            validationState={finalValidationState}
            icon={option.icon}
            checkedIcon={option.checkedIcon}
            description={option.description}
            data-testid={`${dataTestId}-option-${option.value}`}
            {...option.radioProps}
          />
        ))}
      </StyledRadioGroup>
      
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
    </StyledFormControl>
  );
});

RadioGroup.displayName = 'RadioGroup';