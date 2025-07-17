import React, { forwardRef, memo } from 'react';

import { DEFAULT_PROPS } from './Divider.constants';
import { StyledDivider, StyledDividerText } from './Divider.styles';
import type { DividerProps } from './Divider.types';

/**
 * Divider component creates a visual separator between content.
 * Supports horizontal and vertical orientations with various styling options.
 *
 * @author dilip.yadav@shorelineiot.com
 * @param props - Divider props
 * @returns Divider component
 */
export const Divider = memo(forwardRef<HTMLDivElement, DividerProps>(({ 
  orientation = DEFAULT_PROPS.orientation,
  variant = DEFAULT_PROPS.variant,
  children,
  textAlign = DEFAULT_PROPS.textAlign,
  flexItem = DEFAULT_PROPS.flexItem,
  absolute = DEFAULT_PROPS.absolute,
  className,
  style,
  ...rest
}, ref) => {
  const hasChildren = Boolean(children);

  return (
    <StyledDivider
      ref={ref}
      orientation={orientation}
      variant={variant}
      textAlign={textAlign}
      flexItem={flexItem}
      absolute={absolute}
      className={className}
      style={style}
      data-testid="divider-root"
      role="separator"
      aria-orientation={orientation}
      {...rest}
    >
      {hasChildren && (
        <StyledDividerText data-testid="divider-text">
          {children}
        </StyledDividerText>
      )}
    </StyledDivider>
  );
}));

Divider.displayName = 'Divider';