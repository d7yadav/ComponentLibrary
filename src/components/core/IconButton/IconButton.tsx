import { Tooltip } from '@mui/material';
import React, { forwardRef, useCallback, useState, useImperativeHandle, useRef, memo } from 'react';

import { ICON_BUTTON_DEFAULTS } from './IconButton.constants';
import { 
  StyledIconButton, 
  LoadingSpinner, 
  IconContainer 
} from './IconButton.styles';
import type { 
  IconButtonProps, 
  IconButtonRef, 
  IconButtonState 
} from './IconButton.types';

/**
 * 🎯 IconButton Component
 * 
 * A comprehensive icon button component with advanced theming, animations,
 * accessibility features, and loading states.
 * 
 * Features:
 * - 5 variants: filled, outlined, text, gradient, glass
 * - 4 sizes: small, medium, large, xl
 * - 9 colors: primary, secondary, tertiary, quaternary, success, warning, error, info, inherit
 * - 3 shapes: circular, rounded, square
 * - Loading states with custom spinners
 * - Accessibility compliant (WCAG 2.1 AA)
 * - Theme-aware styling with CSS variables
 * - Advanced animations and interactions
 * - TypeScript strict mode compatible
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <IconButton>
 *   <SearchIcon />
 * </IconButton>
 * 
 * // Advanced usage
 * <IconButton
 *   variant="filled"
 *   size="large"
 *   color="primary"
 *   shape="rounded"
 *   loading={isLoading}
 *   tooltip="Search"
 *   onClick={handleSearch}
 *   aria-label="Search for items"
 * >
 *   <SearchIcon />
 * </IconButton>
 * ```
 */
export const IconButton = memo(forwardRef<IconButtonRef, IconButtonProps>(({
  // Core props
  variant = ICON_BUTTON_DEFAULTS.variant,
  size = ICON_BUTTON_DEFAULTS.size,
  color = ICON_BUTTON_DEFAULTS.color,
  shape = ICON_BUTTON_DEFAULTS.shape,
  children,
  
  // State props
  disabled = ICON_BUTTON_DEFAULTS.disabled,
  selected = ICON_BUTTON_DEFAULTS.selected,
  
  // Loading props
  loading = ICON_BUTTON_DEFAULTS.loading,
  loadingIcon,
  loadingText = 'Loading...',
  
  // Animation props
  enableHover = ICON_BUTTON_DEFAULTS.enableHover,
  enablePress = ICON_BUTTON_DEFAULTS.enablePress,
  enableFocus = ICON_BUTTON_DEFAULTS.enableFocus,
  duration = ICON_BUTTON_DEFAULTS.duration,
  
  // Interaction props
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  
  // Styling props
  className,
  style,
  elevation = ICON_BUTTON_DEFAULTS.elevation,
  tooltip,
  disableRipple = ICON_BUTTON_DEFAULTS.disableRipple,
  
  // Accessibility props
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-pressed': ariaPressed,
  role,
  'data-testid': testId,
  
  ...rest
}, ref) => {
  // Internal state
  const [state, setState] = useState<IconButtonState>({
    isHovered: false,
    isFocused: false,
    isPressed: false,
    isLoading: loading
  });
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Update loading state when prop changes
  React.useEffect(() => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, [loading]);
  
  // Expose ref methods
  useImperativeHandle(ref, () => ({
    focus: () => buttonRef.current?.focus(),
    blur: () => buttonRef.current?.blur(),
    click: () => buttonRef.current?.click(),
    getElement: () => buttonRef.current
  }), []);
  
  // Event handlers
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(event);
  }, [disabled, loading, onClick]);
  
  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!enableHover || disabled) return;
    setState(prev => ({ ...prev, isHovered: true }));
    onMouseEnter?.(event);
  }, [enableHover, disabled, onMouseEnter]);
  
  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!enableHover) return;
    setState(prev => ({ ...prev, isHovered: false, isPressed: false }));
    onMouseLeave?.(event);
  }, [enableHover, onMouseLeave]);
  
  const handleMouseDown = useCallback(() => {
    if (!enablePress || disabled) return;
    setState(prev => ({ ...prev, isPressed: true }));
  }, [enablePress, disabled]);
  
  const handleMouseUp = useCallback(() => {
    if (!enablePress) return;
    setState(prev => ({ ...prev, isPressed: false }));
  }, [enablePress]);
  
  const handleFocus = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
    if (!enableFocus) return;
    setState(prev => ({ ...prev, isFocused: true }));
    onFocus?.(event);
  }, [enableFocus, onFocus]);
  
  const handleBlur = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
    setState(prev => ({ ...prev, isFocused: false, isPressed: false }));
    onBlur?.(event);
  }, [onBlur]);
  
  // Compute effective disabled state
  const isDisabled = disabled || loading;
  
  // Build accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel || (loading ? loadingText : 'Icon button'),
    'aria-describedby': ariaDescribedby,
    'aria-pressed': ariaPressed,
    'aria-disabled': isDisabled,
    role: role || 'button'
  };
  
  // Extract inline style objects
  const customStyle = React.useMemo(() => ({
    ...style,
    ...(duration !== ICON_BUTTON_DEFAULTS.duration && {
      transitionDuration: `${duration}ms`
    })
  }), [style, duration]);
  
  // Create the button element
  const buttonElement = (
    <StyledIconButton
      ref={buttonRef}
      className={className}
      style={customStyle}
      disabled={isDisabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      data-testid={testId}
      $variant={variant}
      $size={size}
      $color={color}
      $shape={shape}
      $disabled={isDisabled}
      $selected={selected}
      $loading={loading}
      $elevation={elevation}
      $disableRipple={disableRipple}
      {...accessibilityProps}
      {...rest}
    >
      {/* Icon content */}
      <IconContainer $size={size} $loading={loading}>
        {children}
      </IconContainer>
      
      {/* Loading spinner */}
      {loading && (
        loadingIcon || <LoadingSpinner $size={size} $color={color} />
      )}
    </StyledIconButton>
  );
  
  // Wrap with tooltip if provided
  if (tooltip && !loading) {
    return (
      <Tooltip title={tooltip} arrow>
        {buttonElement}
      </Tooltip>
    );
  }
  
  return buttonElement;
}));

// Display name for debugging
IconButton.displayName = 'IconButton';

export { IconButton as default };