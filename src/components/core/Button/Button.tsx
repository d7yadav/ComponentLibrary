import React, { forwardRef, memo } from 'react';
import { CircularProgress } from '@mui/material';
import { ButtonProps } from './Button.types';
import { StyledButtonWithRipple, loadingSpinKeyframes } from './Button.styles';
import { 
  BUTTON_VARIANTS, 
  BUTTON_SIZES, 
  BUTTON_COLORS,
  ACCESSIBILITY_CONSTANTS 
} from './Button.constants';

/**
 * Enhanced Button component with 8 variants, loading states, and accessibility features
 * 
 * Features:
 * - 8 variants: primary, secondary, tertiary, quaternary, gradient, glass, outline, text
 * - Loading states with spinner
 * - Icon support (start/end)
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Dark theme support
 * - Animation effects
 * - Glass morphism and gradient variants
 */
const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = BUTTON_VARIANTS.primary,
  size = BUTTON_SIZES.medium,
  color = BUTTON_COLORS.primary,
  loading = false,
  loadingIcon,
  startIcon,
  endIcon,
  disabled = false,
  fullWidth = false,
  children,
  className,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  tabIndex,
  ...other
}, ref) => {
  // Determine if button should be disabled
  const isDisabled = disabled || loading;
  
  // Handle loading icon
  const getLoadingIcon = () => {
    if (loadingIcon) {
      return loadingIcon;
    }
    return (
      <CircularProgress data-testid="button"
        size={16}
        color="inherit"
        aria-label={ACCESSIBILITY_CONSTANTS.loadingAriaLabel}
      />
    );
  };
  
  // Handle click events
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
  
  // Determine icons to display
  const displayStartIcon = loading ? getLoadingIcon() : startIcon;
  const displayEndIcon = loading ? null : endIcon;
  
  // Accessibility props
  const accessibilityProps = {
    role: 'button',
    'aria-label': ariaLabel || (loading ? ACCESSIBILITY_CONSTANTS.loadingAriaLabel : undefined),
    'aria-describedby': ariaDescribedBy,
    'aria-disabled': isDisabled,
    'aria-busy': loading,
    ...(tabIndex !== undefined && { tabIndex: isDisabled ? -1 : tabIndex }),
  };

  return (
    <>
      <style>{loadingSpinKeyframes}</style>
      <StyledButtonWithRipple
        ref={ref}
        variant="text" // Use MUI variant, custom variant handled by styled component props
        size={size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium'}
        color={color === 'tertiary' || color === 'quaternary' ? 'primary' : color as any}
        // Custom props for styled component (these override the above)
        customVariant={variant}
        customSize={size}
        customColor={color}
        loading={loading}
        disabled={isDisabled}
        fullWidth={fullWidth}
        hasStartIcon={Boolean(displayStartIcon)}
        hasEndIcon={Boolean(displayEndIcon)}
{...(className && { className })}
        onClick={handleClick}
        type={type}
        startIcon={displayStartIcon}
        endIcon={displayEndIcon}
        {...accessibilityProps}
        {...other}
      >
        {children}
      </StyledButtonWithRipple>
    </>
  );
});

ButtonComponent.displayName = 'Button';

// Export memoized component for performance optimization
export const Button = memo(ButtonComponent);