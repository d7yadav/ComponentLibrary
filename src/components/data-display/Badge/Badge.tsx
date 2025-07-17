/**
 * @fileoverview Badge component implementation
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import { forwardRef, memo, useCallback } from 'react';

import { BADGE_DEFAULT_PROPS } from './Badge.constants';
import { StyledBadge } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

/**
 * Badge component for notifications and status indicators
 * 
 * Features:
 * - Multiple color variants with proper contrast
 * - Configurable sizes (small, medium, large)
 * - Interactive states with click handling
 * - Full keyboard navigation support
 * - Enhanced accessibility with ARIA attributes
 * - Smooth animations and transitions
 * - Theme-based styling with design tokens
 * - Performance optimized with React.memo
 * - Responsive touch targets
 */
export const Badge = memo(forwardRef<HTMLSpanElement, BadgeProps>(({
  children,
  badgeContent,
  color = BADGE_DEFAULT_PROPS.color,
  variant = BADGE_DEFAULT_PROPS.variant,
  size = BADGE_DEFAULT_PROPS.size,
  anchorOrigin = BADGE_DEFAULT_PROPS.anchorOrigin,
  overlap = BADGE_DEFAULT_PROPS.overlap,
  invisible = BADGE_DEFAULT_PROPS.invisible,
  showZero = BADGE_DEFAULT_PROPS.showZero,
  max = BADGE_DEFAULT_PROPS.max,
  interactive = false,
  disabled = false,
  className,
  component,
  onClick,
  onKeyDown,
  onFocus,
  onBlur,
  tabIndex,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role,
  'data-testid': dataTestId = 'badge',
  ...rest
}, ref) => {
  
  // Handle keyboard interactions for interactive badges
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (interactive && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as any);
    }
    onKeyDown?.(event);
  }, [interactive, onClick, onKeyDown]);
  
  // Determine appropriate ARIA attributes
  const getAriaProps = () => {
    const isInteractive = interactive && !disabled;
    
    return {
      role: role || (isInteractive ? 'button' : undefined),
      tabIndex: disabled ? -1 : (tabIndex ?? (isInteractive ? 0 : undefined)),
      'aria-label': ariaLabel || (
        typeof badgeContent === 'string' || typeof badgeContent === 'number'
          ? `Badge with ${badgeContent} notifications`
          : 'Badge'
      ),
      'aria-describedby': ariaDescribedBy,
      'aria-disabled': disabled,
      'aria-hidden': invisible,
    };
  };
  
  // Generate appropriate event handlers
  const getEventHandlers = () => {
    if (disabled) {
      return {};
    }
    
    return {
      onClick: interactive ? onClick : undefined,
      onKeyDown: interactive ? handleKeyDown : undefined,
      onFocus: interactive ? onFocus : undefined,
      onBlur: interactive ? onBlur : undefined,
    };
  };
  
  return (
    <StyledBadge
      ref={ref}
      data-testid={dataTestId}
      badgeContent={badgeContent}
      color={color}
      variant={variant}
      customSize={size}
      anchorOrigin={anchorOrigin}
      overlap={overlap}
      invisible={invisible}
      showZero={showZero}
      max={max}
      interactive={interactive}
      disabled={disabled}
      className={className}
      component={component}
      {...getAriaProps()}
      {...getEventHandlers()}
      {...rest}
    >
      {children}
    </StyledBadge>
  );
}));

Badge.displayName = 'Badge';