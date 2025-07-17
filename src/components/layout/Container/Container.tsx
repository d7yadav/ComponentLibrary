import { forwardRef, memo } from 'react';

import {
  CONTAINER_VARIANTS,
  CONTAINER_MAX_WIDTHS,
  DEFAULT_CONTAINER_PROPS,
  ACCESSIBILITY_CONSTANTS,
} from './Container.constants';
import { StyledContainer } from './Container.styles';
import type { ContainerProps } from './Container.types';

/**
 * Enhanced Container component with responsive breakpoint support and flexible styling
 * 
 * Features:
 * - 3 variants: fluid, fixed, constrained
 * - Responsive breakpoint support (xs, sm, md, lg, xl)
 * - Flexible styling options: padding, margin, background, borders
 * - Elevation support with Material-UI shadows
 * - Accessibility compliance (WCAG 2.1 AA)
 * - TypeScript support with strict typing
 * - Dark theme support via enhanced theme system
 */
export const Container = memo(forwardRef<HTMLDivElement, ContainerProps>((
  {
    children,
    variant = DEFAULT_CONTAINER_PROPS.variant,
    maxWidth = DEFAULT_CONTAINER_PROPS.maxWidth,
    centered = DEFAULT_CONTAINER_PROPS.centered,
    disableGutters = DEFAULT_CONTAINER_PROPS.disableGutters,
    fluid = DEFAULT_CONTAINER_PROPS.fluid,
    padding,
    margin,
    bgcolor,
    minHeight,
    maxHeight,
    bordered = DEFAULT_CONTAINER_PROPS.bordered,
    rounded = DEFAULT_CONTAINER_PROPS.rounded,
    elevation = DEFAULT_CONTAINER_PROPS.elevation,
    className,
    sx,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    role = ACCESSIBILITY_CONSTANTS.defaultRole,
    ...other
  },
  ref
) => {
  // Override maxWidth if fluid is true
  const effectiveMaxWidth = fluid ? false : maxWidth;
  
  // Override variant if fluid is true
  const effectiveVariant = fluid ? CONTAINER_VARIANTS.fluid : variant;
  
  // Accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel || ACCESSIBILITY_CONSTANTS.containerLabel,
    'aria-describedby': ariaDescribedBy,
    role,
  };

  return (
    <StyledContainer data-testid="container"
      ref={ref}
      maxWidth={effectiveMaxWidth}
      disableGutters={disableGutters}
      className={className}
      sx={sx}
      // Custom props for styled component
      customVariant={effectiveVariant}
      customMaxWidth={effectiveMaxWidth}
      centered={centered}
      bordered={bordered}
      rounded={rounded}
      customElevation={elevation}
      customBgcolor={bgcolor}
      customPadding={padding}
      customMargin={margin}
      customMinHeight={minHeight}
      customMaxHeight={maxHeight}
      {...accessibilityProps}
      {...other}
    >
      {children}
    </StyledContainer>
  );
}));

Container.displayName = 'Container';