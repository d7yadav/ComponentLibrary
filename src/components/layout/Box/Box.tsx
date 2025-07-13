import { forwardRef, memo } from 'react';
import { BoxProps } from './Box.types';
import { StyledBox } from './Box.styles';
import {
  DEFAULT_BOX_PROPS,
} from './Box.constants';

/**
 * Enhanced Box component with general-purpose styling props and responsive support
 * 
 * Features:
 * - Comprehensive styling system with spacing, sizing, positioning
 * - Responsive prop support for all style properties
 * - Flexbox and CSS Grid utilities built-in
 * - Color and typography prop shortcuts
 * - Border and shadow utility props
 * - Custom styling shortcuts (centered, rounded, elevated, etc.)
 * - Accessibility support with proper ARIA attributes
 * - TypeScript support with strict typing
 * - Dark theme support via enhanced theme system
 * - Performance optimized with shouldForwardProp
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>((
  {
    children,
    component = DEFAULT_BOX_PROPS.component,
    // Custom shortcuts
    centered = DEFAULT_BOX_PROPS.centered,
    rounded = DEFAULT_BOX_PROPS.rounded,
    elevated = DEFAULT_BOX_PROPS.elevated,
    fullWidth = DEFAULT_BOX_PROPS.fullWidth,
    fullHeight = DEFAULT_BOX_PROPS.fullHeight,
    clickable = DEFAULT_BOX_PROPS.clickable,
    // Standard props
    className,
    sx,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    role,
    tabIndex,
    ...other
  },
  ref
) => {
  // Accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    role,
    ...(tabIndex !== undefined && { tabIndex }),
    // Add keyboard support for clickable boxes
    ...(clickable && {
      tabIndex: tabIndex !== undefined ? tabIndex : 0,
      role: role || 'button',
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          (event.target as HTMLElement).click();
        }
      },
    }),
  };

  return (
    <StyledBox data-testid="box"
      ref={ref}
      component={component}
      className={className}
      sx={sx}
      // Custom props for styled component
      customCentered={centered}
      customRounded={rounded}
      customElevated={elevated}
      customFullWidth={fullWidth}
      customFullHeight={fullHeight}
      customClickable={clickable}
      {...accessibilityProps}
      {...other}
    >
      {children}
    </StyledBox>
  );
});

Box.displayName = 'Box';