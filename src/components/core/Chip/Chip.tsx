import { Close as CloseIcon } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React, { forwardRef, useCallback, useState, useImperativeHandle, useRef, memo } from 'react';
import type { SyntheticEvent } from 'react';

import { CHIP_DEFAULTS, CHIP_A11Y } from './Chip.constants';
import { 
  StyledChip, 
  StyledChipLabel,
  StyledChipIcon,
  StyledChipAvatar,
  StyledChipDelete,
  LoadingSpinner,
  BadgeContainer
} from './Chip.styles';
import type { 
  ChipProps, 
  ChipRef, 
  ChipState 
} from './Chip.types';

/**
 * 🎯 Chip Component
 * 
 * A comprehensive chip component with advanced theming, animations,
 * accessibility features, and interactive capabilities.
 * 
 * Features:
 * - 5 variants: filled, outlined, soft, gradient, glass
 * - 3 sizes: small, medium, large
 * - 9 colors: primary, secondary, tertiary, quaternary, success, warning, error, info, default
 * - 3 shapes: rounded, square, circular
 * - Clickable and deletable functionality
 * - Avatar and icon support
 * - Loading states with spinners
 * - Badge/notification support
 * - Accessibility compliant (WCAG 2.1 AA)
 * - Theme-aware styling with CSS variables
 * - Advanced animations and interactions
 * - TypeScript strict mode compatible
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Chip label="Basic Chip" />
 * 
 * // Advanced usage
 * <Chip
 *   label="Advanced Chip"
 *   variant="filled"
 *   size="medium"
 *   color="primary"
 *   shape="rounded"
 *   clickable
 *   deletable
 *   avatar={<Avatar>U</Avatar>}
 *   badge={5}
 *   tooltip="Click to select"
 *   onDelete={handleDelete}
 *   onClick={handleClick}
 * />
 * ```
 */
export const Chip = memo(forwardRef<ChipRef, ChipProps>(({
  // Core props
  variant = CHIP_DEFAULTS.variant,
  size = CHIP_DEFAULTS.size,
  color = CHIP_DEFAULTS.color,
  shape = CHIP_DEFAULTS.shape,
  label,
  
  // State props
  disabled = CHIP_DEFAULTS.disabled,
  selected = CHIP_DEFAULTS.selected,
  
  // Click props
  clickable = CHIP_DEFAULTS.clickable,
  onClick,
  href,
  target,
  rel,
  
  // Delete props
  deletable = CHIP_DEFAULTS.deletable,
  onDelete,
  deleteIcon,
  deleteTooltip = CHIP_A11Y.defaultLabels.delete,
  
  // Icon props
  avatar,
  icon,
  iconPosition = CHIP_DEFAULTS.iconPosition,
  
  // Animation props
  enableHover = CHIP_DEFAULTS.enableHover,
  enablePress = CHIP_DEFAULTS.enablePress,
  enableFocus = CHIP_DEFAULTS.enableFocus,
  duration = CHIP_DEFAULTS.duration,
  
  // Styling props
  className,
  style,
  elevation = CHIP_DEFAULTS.elevation,
  tooltip,
  
  // Advanced features
  badge,
  badgeColor = color,
  loading = CHIP_DEFAULTS.loading,
  loadingIcon,
  
  // Accessibility props
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  role,
  tabIndex,
  'data-testid': testId,
  
  ...rest
}, ref) => {
  // Internal state
  const [state, setState] = useState<ChipState>({
    isHovered: false,
    isFocused: false,
    isPressed: false,
    isLoading: loading,
    isMounted: true
  });
  
  const chipRef = useRef<HTMLDivElement>(null);
  
  // Update loading state when prop changes
  React.useEffect(() => {
    setState(prev => ({ ...prev, isLoading: loading }));
  }, [loading]);
  
  // Expose ref methods
  useImperativeHandle(ref, () => ({
    focus: () => chipRef.current?.focus(),
    blur: () => chipRef.current?.blur(),
    click: () => chipRef.current?.click(),
    getElement: () => chipRef.current,
    delete: () => handleDelete(new Event('delete') as any)
  }), []);
  
  // Event handlers
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || loading || !clickable) return;
    onClick?.(event);
  }, [disabled, loading, clickable, onClick]);
  
  const handleDelete = useCallback((event: SyntheticEvent) => {
    if (disabled || loading) return;
    event.stopPropagation();
    onDelete?.(event);
  }, [disabled, loading, onDelete]);
  
  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!enableHover || disabled) return;
    setState(prev => ({ ...prev, isHovered: true }));
  }, [enableHover, disabled]);
  
  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!enableHover) return;
    setState(prev => ({ ...prev, isHovered: false, isPressed: false }));
  }, [enableHover]);
  
  const handleMouseDown = useCallback(() => {
    if (!enablePress || disabled) return;
    setState(prev => ({ ...prev, isPressed: true }));
  }, [enablePress, disabled]);
  
  const handleMouseUp = useCallback(() => {
    if (!enablePress) return;
    setState(prev => ({ ...prev, isPressed: false }));
  }, [enablePress]);
  
  const handleFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!enableFocus) return;
    setState(prev => ({ ...prev, isFocused: true }));
  }, [enableFocus]);
  
  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    setState(prev => ({ ...prev, isFocused: false, isPressed: false }));
  }, []);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle delete key
    if (deletable && CHIP_A11Y.keys.delete.includes(event.key)) {
      event.preventDefault();
      handleDelete(event as any);
      return;
    }
    
    // Handle activation keys
    if (clickable && CHIP_A11Y.keys.activate.includes(event.key)) {
      event.preventDefault();
      handleClick(event as any);
      return;
    }
  }, [deletable, clickable, handleDelete, handleClick]);
  
  // Compute effective disabled state
  const isDisabled = disabled || loading;
  
  // Determine if chip is interactive
  const isClickable = clickable && !isDisabled;
  const isDeletable = deletable && !isDisabled;
  
  // Build accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel || (loading ? CHIP_A11Y.defaultLabels.loading : undefined),
    'aria-describedby': ariaDescribedby,
    'aria-disabled': isDisabled,
    'aria-pressed': selected,
    role: role || (isClickable ? 'button' : undefined),
    tabIndex: tabIndex ?? (isClickable || isDeletable ? 0 : undefined)
  };
  
  // Extract inline style objects
  const customStyle = React.useMemo(() => ({
    ...style,
    ...(duration !== CHIP_DEFAULTS.duration && {
      transitionDuration: `${duration}ms`
    })
  }), [style, duration]);
  
  // Render avatar or icon
  const renderStartContent = () => {
    if (loading && loadingIcon) {
      return loadingIcon;
    }
    
    if (loading) {
      return <LoadingSpinner $size={size} $color={color} />;
    }
    
    if (avatar) {
      return (
        <StyledChipAvatar $size={size}>
          {avatar}
        </StyledChipAvatar>
      );
    }
    
    if (icon && iconPosition === 'start') {
      return (
        <StyledChipIcon $size={size} $position="start" $color={color}>
          {icon}
        </StyledChipIcon>
      );
    }
    
    return null;
  };
  
  // Render end icon
  const renderEndContent = () => {
    if (icon && iconPosition === 'end') {
      return (
        <StyledChipIcon $size={size} $position="end" $color={color}>
          {icon}
        </StyledChipIcon>
      );
    }
    
    return null;
  };
  
  // Render delete button
  const renderDeleteButton = () => {
    if (!isDeletable) return null;
    
    const deleteButton = (
      <StyledChipDelete
        $size={size}
        $color={color}
        $disabled={isDisabled}
        onClick={handleDelete}
        aria-label={deleteTooltip}
      >
        {deleteIcon || <CloseIcon />}
      </StyledChipDelete>
    );
    
    if (deleteTooltip) {
      return (
        <Tooltip title={deleteTooltip} arrow>
          {deleteButton}
        </Tooltip>
      );
    }
    
    return deleteButton;
  };
  
  // Render badge
  const renderBadge = () => {
    if (!badge) return null;
    
    const badgeContent = typeof badge === 'number' && badge > 99 ? '99+' : badge;
    
    return (
      <BadgeContainer $size={size} $color={badgeColor}>
        {badgeContent}
      </BadgeContainer>
    );
  };
  
  // Create the chip element
  const chipElement = (
    <StyledChip
      ref={chipRef}
      className={className}
      style={customStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-testid={testId}
      $variant={variant}
      $size={size}
      $color={color}
      $shape={shape}
      $disabled={isDisabled}
      $selected={selected}
      $clickable={isClickable}
      $deletable={isDeletable}
      $elevation={elevation}
      $loading={loading}
      {...accessibilityProps}
      {...rest}
      // Override MUI's label prop to use our custom label
      label={undefined}
    >
      {renderStartContent()}
      
      <StyledChipLabel
        $size={size}
        $hasIcon={!!icon}
        $hasAvatar={!!avatar}
        $deletable={isDeletable}
      >
        {label}
      </StyledChipLabel>
      
      {renderEndContent()}
      {renderDeleteButton()}
      {renderBadge()}
    </StyledChip>
  );
  
  // Wrap with tooltip if provided
  if (tooltip && !loading) {
    return (
      <Tooltip title={tooltip} arrow>
        {chipElement}
      </Tooltip>
    );
  }
  
  return chipElement;
}));

// Display name for debugging
Chip.displayName = 'Chip';

export { Chip as default };