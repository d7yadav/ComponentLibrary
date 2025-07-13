import { forwardRef } from 'react';
import { CardActionsProps } from './Card.types';
import { StyledCardActions } from './Card.styles';
import { CARD_SIZES } from './Card.constants';

/**
 * CardActions component for displaying action buttons and controls
 * 
 * Features:
 * - Flexible action layout and alignment
 * - Responsive spacing based on card size
 * - Support for disabling spacing
 * - Proper button sizing and spacing
 */
export const CardActions = forwardRef<HTMLDivElement, CardActionsProps & { size?: keyof typeof CARD_SIZES }>(({
  children,
  disableSpacing = false,
  className,
  align = 'left',
  size = 'comfortable',
  ...other
}, ref) => {
  return (
    <StyledCardActions data-testid="cardactions"
      ref={ref}
      align={align}
      size={size}
      disableSpacing={disableSpacing}
      className={className}
      {...other}
    >
      {children}
    </StyledCardActions>
  );
});

CardActions.displayName = 'CardActions';