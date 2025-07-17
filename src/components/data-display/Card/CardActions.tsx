import React, { forwardRef, memo } from 'react';

import { CARD_SIZES } from './Card.constants';
import { StyledCardActions } from './Card.styles';
import type { CardActionsProps } from './Card.types';

/**
 * CardActions component for displaying action buttons and controls
 * 
 * Features:
 * - Flexible action layout and alignment
 * - Responsive spacing based on card size
 * - Support for disabling spacing
 * - Proper button sizing and spacing
 */
export const CardActions = memo(forwardRef<HTMLDivElement, CardActionsProps>(({
  children,
  disableSpacing = false,
  className,
  align = 'left',
  size = 'comfortable',
  disabled = false,
  ...other
}, ref) => {
  return (
    <StyledCardActions data-testid="cardactions"
      ref={ref}
      // Only pass supported props to StyledCardActions
      align={align}
      size={size}
      disableSpacing={disableSpacing}
      className={className}
      aria-disabled={disabled}
      // Remove unsupported props like role and tabIndex
      {...other}
    >
      {children}
    </StyledCardActions>
  );
}));

CardActions.displayName = 'CardActions';