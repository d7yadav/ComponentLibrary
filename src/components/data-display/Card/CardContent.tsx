import { forwardRef } from 'react';
import { CardContentProps } from './Card.types';
import { StyledCardContent } from './Card.styles';
import { CARD_SIZES } from './Card.constants';

/**
 * CardContent component for displaying the main content of a card
 * 
 * Features:
 * - Responsive padding based on card size
 * - Flexible content layout
 * - Proper spacing with other card elements
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps & { size?: keyof typeof CARD_SIZES }>(({
  children,
  className,
  size = 'comfortable',
  ...other
}, ref) => {
  return (
    <StyledCardContent data-testid="cardcontent"
      ref={ref}
      size={size}
      className={className}
      {...other}
    >
      {children}
    </StyledCardContent>
  );
});

CardContent.displayName = 'CardContent';