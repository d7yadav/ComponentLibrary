import React, { forwardRef, memo } from 'react';

import type { CARD_SIZES } from './Card.constants';
import { StyledCardContent } from './Card.styles';
import type { CardContentProps } from './Card.types';

/**
 * CardContent component for displaying the main content of a card
 * 
 * Features:
 * - Responsive padding based on card size
 * - Flexible content layout
 * - Proper spacing with other card elements
 * - Semantic HTML structure
 * - Enhanced accessibility support
 * - Interactive states support
 * - Keyboard navigation
 * - Performance optimized with React.memo
 */
export const CardContent = memo(forwardRef<HTMLDivElement, CardContentProps & { size?: keyof typeof CARD_SIZES }>(({
  children,
  className,
  size = 'comfortable',
  onClick,
  onKeyDown,
  disabled = false,
  tabIndex,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role = 'region',
  ...other
}, ref) => {
  
  // Handle keyboard interactions
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as any);
    }
    onKeyDown?.(event);
  };
  
  // Determine if the content should be interactive
  const isInteractive = Boolean(onClick);
  
  // Determine appropriate tabIndex
  const computedTabIndex = disabled ? -1 : (tabIndex ?? (isInteractive ? 0 : undefined));
  
  // Generate appropriate aria-label if not provided
  const computedAriaLabel = ariaLabel || (
    isInteractive ? 'Card content - clickable' : 'Card content'
  );
  
  return (
    <StyledCardContent 
      data-testid="cardcontent"
      ref={ref}
      role={role}
      size={size}
      className={className}
      onClick={disabled ? undefined : onClick}
      onKeyDown={disabled ? undefined : handleKeyDown}
      tabIndex={computedTabIndex}
      aria-label={computedAriaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled}
      data-interactive={isInteractive}
      data-disabled={disabled}
      {...other}
    >
      {children}
    </StyledCardContent>
  );
}));

CardContent.displayName = 'CardContent';