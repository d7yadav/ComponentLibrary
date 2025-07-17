import React, { forwardRef, memo, useCallback, useState } from 'react';

import {
  PAPER_VARIANTS,
  PAPER_CORNERS,
  PAPER_SURFACES,
  PAPER_SIZES,
  PAPER_GRADIENTS,
  ANIMATION_DURATIONS,
  ACCESSIBILITY_CONSTANTS,
} from './Paper.constants';
import { StyledPaper, paperHoverKeyframes } from './Paper.styles';
import type { PaperProps } from './Paper.types';

/**
 * Enhanced Paper component with multiple variants, surfaces, and accessibility features
 * 
 * Features:
 * - 5 variants: elevation, outlined, filled, glass, gradient
 * - 24 elevation levels (0-24) with proper shadows
 * - 5 corner styles: none, small, medium, large, circular
 * - 3 surface treatments: flat, concave, convex
 * - Glass morphism effects with backdrop blur
 * - Gradient overlays with theme integration
 * - Interactive hover states with elevation changes
 * - Responsive padding and sizing
 * - Print-friendly styling
 * - WCAG 2.1 AA accessibility compliance
 * - Dark theme optimizations with OLED support
 */
const PaperComponent = forwardRef<HTMLDivElement, PaperProps>(({
  variant = PAPER_VARIANTS.elevation,
  elevation = 1,
  corners = PAPER_CORNERS.medium,
  surface = PAPER_SURFACES.flat,
  size = PAPER_SIZES.comfortable,
  gradient = PAPER_GRADIENTS.primary,
  interactive = false,
  glassMorphism = false,
  responsive = false,
  printFriendly = false,
  hoverElevation,
  pressedElevation,
  backgroundColor,
  borderColor,
  borderWidth,
  padding,
  margin,
  animationDuration = ANIMATION_DURATIONS.normal,
  transitions = true,
  overflow,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  zIndex,
  children,
  className,
  sx,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-labelledby': ariaLabelledBy,
  role,
  tabIndex,
  id,
  'data-testid': dataTestId = 'paper',
  ...other
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [, setIsFocused] = useState(false);

  // Handle mouse enter
  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (interactive) {
      setIsHovered(true);
    }
    onMouseEnter?.(event);
  }, [interactive, onMouseEnter]);

  // Handle mouse leave
  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (interactive) {
      setIsHovered(false);
    }
    onMouseLeave?.(event);
  }, [interactive, onMouseLeave]);

  // Handle focus
  const handleFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (interactive) {
      setIsFocused(true);
    }
    onFocus?.(event);
  }, [interactive, onFocus]);

  // Handle blur
  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (interactive) {
      setIsFocused(false);
    }
    onBlur?.(event);
  }, [interactive, onBlur]);

  // Handle click
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && onClick) {
      onClick(event);
    }
  }, [interactive, onClick]);

  // Handle keyboard events for interactive papers
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick(event as any);
    }
  }, [interactive, handleClick]);

  // Determine accessibility props
  const getAccessibilityProps = () => {
    const baseProps = {
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,
      role: role || (interactive ? ACCESSIBILITY_CONSTANTS.interactiveRole : undefined),
      ...(id && { id }),
      'data-testid': dataTestId,
    };

    if (interactive) {
      return {
        ...baseProps,
        tabIndex: tabIndex !== undefined ? tabIndex : 0,
        onKeyDown: handleKeyDown,
        'aria-pressed': onClick ? false : undefined,
      };
    }

    return {
      ...baseProps,
      ...(tabIndex !== undefined && { tabIndex }),
    };
  };

  // Determine hover and pressed elevations
  const getHoverElevation = () => {
    if (hoverElevation !== undefined) return hoverElevation;
    if (!interactive) return elevation;
    return Math.min(elevation + 2, 24) as typeof elevation;
  };

  const getPressedElevation = () => {
    if (pressedElevation !== undefined) return pressedElevation;
    if (!interactive) return elevation;
    return Math.max(elevation - 1, 0) as typeof elevation;
  };

  // Component props for styled component
  const styledProps = {
    customVariant: variant,
    customElevation: elevation,
    corners,
    surface,
    size,
    gradient,
    interactive,
    glassMorphism: variant === 'glass' ? glassMorphism : false,
    responsive,
    printFriendly,
    hoverElevation: getHoverElevation(),
    pressedElevation: getPressedElevation(),
    backgroundColor,
    borderColor,
    borderWidth,
    padding,
    margin,
    animationDuration,
    transitions,
    overflow,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    zIndex,
  };

  // Additional classes for special effects
  const getAdditionalClasses = () => {
    const classes = [];
    
    if (variant === 'glass' && glassMorphism && isHovered) {
      classes.push('paper-glass-shimmer');
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ') || undefined;
  };

  return (
    <>
      <style>{paperHoverKeyframes}</style>
      <StyledPaper
        ref={ref}
        className={getAdditionalClasses()}
        sx={sx}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...getAccessibilityProps()}
        {...styledProps}
        {...other}
      >
        {children}
      </StyledPaper>
    </>
  );
});

PaperComponent.displayName = 'Paper';

// Export memoized component for performance optimization
export const Paper = memo(PaperComponent);