import { forwardRef } from 'react';
import { Typography } from '@mui/material';
import { CardHeaderProps } from './Card.types';
import { StyledCardHeader } from './Card.styles';
import { CARD_SIZES } from './Card.constants';

/**
 * CardHeader component for displaying title, subtitle, avatar, and actions
 * 
 * Features:
 * - Title and subtitle support
 * - Avatar/icon display
 * - Action buttons (usually IconButton)
 * - Flexible typography customization
 * - Responsive sizing
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps & { size?: keyof typeof CARD_SIZES }>(({
  title,
  subtitle,
  avatar,
  action,
  className,
  titleTypographyProps = {},
  subheaderTypographyProps = {},
  size = 'comfortable',
  ...other
}, ref) => {
  return (
    <StyledCardHeader data-testid="cardheader"
      ref={ref}
      size={size}
      className={className}
      {...other}
    >
      {avatar && (
        <div className="card-header-avatar">
          {avatar}
        </div>
      )}
      
      <div className="card-header-content">
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
            {...subheaderTypographyProps}
          >
            {subtitle}
          </Typography>
        )}
      </div>
      
      {action && (
        <div className="card-header-action">
          {action}
        </div>
      )}
    </StyledCardHeader>
  );
});

CardHeader.displayName = 'CardHeader';