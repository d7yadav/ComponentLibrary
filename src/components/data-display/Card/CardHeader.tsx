import React, { forwardRef, memo } from 'react';

import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';

import type { CARD_SIZES } from './Card.constants';
import { StyledCardHeader } from './Card.styles';
import type { CardHeaderProps } from './Card.types';

/**
 * CardHeader component for displaying title, subtitle, avatar, and actions
 * 
 * Features:
 * - Title and subtitle support
 * - Avatar/icon display
 * - Action buttons (usually IconButton)
 * - Flexible typography customization
 * - Responsive sizing
 * - Interactive states (hover, focus, disabled)
 * - Full accessibility support
 * - Keyboard navigation
 */
export const CardHeader = memo(forwardRef<HTMLDivElement, CardHeaderProps & { size?: keyof typeof CARD_SIZES }>(({ 
  title,
  subtitle,
  avatar,
  action,
  className,
  titleTypographyProps = {},
  subtitleTypographyProps = {},
  size = 'comfortable',
  onClick,
  onKeyDown,
  disabled = false,
  tabIndex,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
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
  // Determine if the header should be interactive
  const isInteractive = Boolean(onClick);
  // Determine appropriate role and tabIndex
  const role = isInteractive ? 'button' : undefined;
  const computedTabIndex = disabled ? -1 : (tabIndex ?? (isInteractive ? 0 : undefined));
  // Generate appropriate aria-label if not provided
  const computedAriaLabel = ariaLabel || (
    typeof title === 'string' ? `Card header: ${title}` : 'Card header'
  );
  return (
    <StyledCardHeader 
      data-testid="cardheader"
      ref={ref}
      size={size}
      className={className}
      onClick={disabled ? undefined : onClick}
      onKeyDown={disabled ? undefined : handleKeyDown}
      role={role}
      tabIndex={computedTabIndex}
      aria-label={computedAriaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled}
      data-interactive={isInteractive}
      data-disabled={disabled}
      {...other}
    >
      {avatar && (
        <Box className="card-header-avatar">
          {avatar}
        </Box>
      )}
      <Box className="card-header-content">
        {title && (
          <Typography
            component="h3"
            className="card-header-title"
            {...titleTypographyProps}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            component="p"
            className="card-header-subtitle"
            {...subtitleTypographyProps}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && (
        <Box className="card-header-action">
          {action}
        </Box>
      )}
    </StyledCardHeader>
  );
}));

CardHeader.displayName = 'CardHeader';