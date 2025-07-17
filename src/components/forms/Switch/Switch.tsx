import { Box } from '@mui/material';
import { forwardRef, memo, useId } from 'react';

import {
  DEFAULT_PROPS,
  TEST_IDS,
  ACCESSIBILITY_CONSTANTS,
} from './Switch.constants';
import {
  StyledSwitch,
  StyledFormControlLabel,
  StyledFormHelperText,
  StyledFormGroup,
  StyledFormControl,
  StyledFormLabel,
  SwitchContainer,
  LoadingSpinner,
  RequiredIndicator,
  TextContainer,
} from './Switch.styles';
import type { SwitchProps, SwitchGroupProps } from './Switch.types';

/**
 * Enhanced Switch component with comprehensive theming and accessibility
 * 
 * Features:
 * - 3 variants: standard, outlined, filled
 * - 3 sizes: small, medium, large
 * - 6 color schemes: primary, secondary, success, warning, error, info
 * - Validation states with visual feedback
 * - Loading states
 * - Custom icons support
 * - On/off text display
 * - Flexible label positioning
 * - Full accessibility compliance (WCAG 2.1 AA)
 * - React Hook Form integration ready
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(({
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
  showText = DEFAULT_PROPS.showText,
  onText = 'ON',
  offText = 'OFF',
  description,
  className,
  'data-testid': dataTestId = TEST_IDS.switch,
  disabled = DEFAULT_PROPS.disabled,
  checked,
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
    role: 'switch',
    'aria-checked': checked,
  };
  
  const switchElement = (
    <SwitchContainer loading={loading}>
      <StyledSwitch
        ref={ref}
        customSize={size}
        customColor={color}
        variant={variant}
        validationState={finalValidationState}
        loading={loading}
        showText={showText}
        onText={onText}
        offText={offText}
        disabled={disabled || loading}
        checked={checked}
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
    </SwitchContainer>
  );
  
  // External text display (when not showing text inside switch)
  const externalTextElement = showText && !loading ? (
    <TextContainer
      customSize={size}
      position={labelPlacement === 'start' ? 'end' : 'start'}
      data-testid={checked ? TEST_IDS.onText : TEST_IDS.offText}
    >
      {checked ? onText : offText}
    </TextContainer>
  ) : null;
  
  // If no label, return just the switch with optional text
  if (!label) {
    return (
      <Box className={className} display="flex" alignItems="center">
        {labelPlacement === 'start' && externalTextElement}
        {switchElement}
        {labelPlacement === 'end' && externalTextElement}
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
      <Box display="flex" alignItems="center">
        {labelPlacement === 'start' && externalTextElement}
        <StyledFormControlLabel
          control={switchElement}
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
        {labelPlacement === 'end' && externalTextElement}
      </Box>
      
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

Switch.displayName = 'Switch';

/**
 * SwitchGroup component for managing multiple related switches
 * 
 * Features:
 * - Multiple switch management
 * - Consistent styling across all switches
 * - Group-level validation and error handling
 * - Flexible layout (row/column)
 * - Individual switch configuration
 * - Accessibility compliance with proper labeling
 */
export const SwitchGroup = memo<SwitchGroupProps>(({
  switches,
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
  onChange,
}) => {
  const groupId = useId();
  const helperTextId = useId();
  
  // Determine final validation state and helper text
  const finalValidationState = error ? 'error' : validationState;
  const finalHelperText = error && errorText ? errorText : helperText;
  
  const handleSwitchChange = (switchId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(switchId, event.target.checked);
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
      
      <StyledFormGroup
        direction={direction}
        spacing={1}
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={finalHelperText ? helperTextId : undefined}
        aria-required={required}
        aria-invalid={error}
      >
        {switches.map((switchItem) => (
          <Switch
            key={switchItem.id}
            label={switchItem.label}
            checked={switchItem.checked}
            helperText={switchItem.helperText}
            disabled={disabled || switchItem.disabled}
            size={size}
            color={color}
            variant={variant}
            validationState={finalValidationState}
            icon={switchItem.icon}
            checkedIcon={switchItem.checkedIcon}
            description={switchItem.description}
            onText={switchItem.onText}
            offText={switchItem.offText}
            onChange={handleSwitchChange(switchItem.id)}
            data-testid={`${dataTestId}-switch-${switchItem.id}`}
            {...switchItem.switchProps}
          />
        ))}
      </StyledFormGroup>
      
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

SwitchGroup.displayName = 'SwitchGroup';