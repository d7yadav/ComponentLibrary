import React, { forwardRef, memo } from 'react';

import { 
  CARD_VARIANTS, 
  CARD_ELEVATIONS, 
  CARD_SIZES, 
  CARD_ORIENTATIONS,
  ACCESSIBILITY_CONSTANTS 
} from './Card.constants';
import { StyledCard } from './Card.styles';
import type { CardProps } from './Card.types';

/**
 * Enhanced Card component with multiple variants and accessibility features
 * 
 * Features:
 * - 6 variants: elevated, outlined, filled, glass, gradient, interactive
 * - Multiple elevation levels (0-24)
 * - Size variants: compact, comfortable, spacious
 * - Orientation: vertical, horizontal
 * - Interactive states with hover effects
 * - Glass morphism and gradient variants
 * - WCAG 2.1 AA accessibility compliance
 * - Dark theme support
 */
export const Card = memo(forwardRef<HTMLDivElement, CardProps>((props, ref): React.ReactElement => {
  const {
    variant = CARD_VARIANTS.elevated,
    elevation = CARD_ELEVATIONS[1],
    size = CARD_SIZES.comfortable,
    orientation = CARD_ORIENTATIONS.vertical,
    interactive = false,
    disabled = false,
    selected = false,
    onClick,
    header,
    media,
    children,
    actions,
    className,
    'aria-label': ariaLabel,
    role,
    tabIndex,
    ...other
  } = props;
  
  // Determine if card should be interactive
  const isInteractive = variant === 'interactive' || interactive || Boolean(onClick);
  
  // Handle click events
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
  
  // Accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-disabled': disabled,
    role: role || (isInteractive ? ACCESSIBILITY_CONSTANTS.interactiveRole : ACCESSIBILITY_CONSTANTS.cardRole),
    ...(tabIndex !== undefined && { tabIndex: disabled ? -1 : tabIndex }),
    ...(isInteractive && !disabled && { tabIndex: tabIndex ?? 0 }),
  };

  return (
    <StyledCard
      data-testid="card"
      ref={ref}
      // MUI props (variant/elevation) are set to defaults, custom props control appearance
      variant="elevation"
      elevation={0}
      // Custom props for styled component
      customVariant={variant}
      customElevation={elevation}
      customSize={size}
      customOrientation={orientation}
      interactive={isInteractive}
      disabled={disabled}
      selected={selected}
      {...(className && { className })}
      onClick={isInteractive ? handleClick : undefined}
      {...accessibilityProps}
      {...other}
    >
      {/* Render header, media, children, and actions in order */}
      {header}
      {media}
      {children}
      {actions}
    </StyledCard>
  );
}));

Card.displayName = 'Card';