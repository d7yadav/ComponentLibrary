import { forwardRef, Children, cloneElement, isValidElement, ReactNode, ReactElement, memo } from 'react';
import { StackProps } from './Stack.types';
import { StyledStack, StackDivider } from './Stack.styles';
import {
  DEFAULT_STACK_PROPS,
  ACCESSIBILITY_CONSTANTS,
} from './Stack.constants';

/**
 * Enhanced Stack component with flexible layout and spacing control
 * 
 * Features:
 * - Flexible direction control (row, column, reverse variants)
 * - Responsive spacing and direction support
 * - Built-in divider support between items
 * - Alignment and justification controls
 * - Size constraints (width, height, min/max)
 * - Styling options: background, padding, borders, elevation
 * - Equal distribution options (width/height)
 * - Accessibility compliance (WCAG 2.1 AA)
 * - TypeScript support with strict typing
 * - Dark theme support via enhanced theme system
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>((
  {
    children,
    direction = DEFAULT_STACK_PROPS.direction,
    spacing = DEFAULT_STACK_PROPS.spacing,
    justifyContent = DEFAULT_STACK_PROPS.justifyContent,
    alignItems = DEFAULT_STACK_PROPS.alignItems,
    flexWrap = DEFAULT_STACK_PROPS.flexWrap,
    divider,
    fullWidth = DEFAULT_STACK_PROPS.fullWidth,
    fullHeight = DEFAULT_STACK_PROPS.fullHeight,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    bgcolor,
    padding,
    margin,
    rounded = DEFAULT_STACK_PROPS.rounded,
    borderRadius,
    bordered = DEFAULT_STACK_PROPS.bordered,
    borderColor,
    borderWidth,
    elevation = DEFAULT_STACK_PROPS.elevation,
    stretch = DEFAULT_STACK_PROPS.stretch,
    centered = DEFAULT_STACK_PROPS.centered,
    equalWidth = DEFAULT_STACK_PROPS.equalWidth,
    equalHeight = DEFAULT_STACK_PROPS.equalHeight,
    gap,
    rowGap,
    columnGap,
    className,
    sx,
    'aria-label': ariaLabel,
    role,
    ...other
  },
  ref
) => {
  // Process children with dividers if provided
  const processedChildren = divider 
    ? Children.toArray(children).reduce((acc: ReactNode[], child, index) => {
        if (index > 0) {
          acc.push(
            <StackDivider
              key={`divider-${index}`}
              orientation={
                (typeof direction === 'string' ? direction : direction?.xs || 'column').includes('row') 
                  ? 'vertical' 
                  : 'horizontal'
              }
            />
          );
        }
        acc.push(child);
        return acc;
      }, [])
    : children;

  // Accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel || ACCESSIBILITY_CONSTANTS.defaultLabel,
    role: role || ACCESSIBILITY_CONSTANTS.groupRole,
  };

  return (
    <StyledStack data-testid="stack"
      ref={ref}
      direction={direction}
      spacing={spacing}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexWrap={flexWrap}
      className={className}
      sx={sx}
      // Custom props for styled component
      customFullWidth={fullWidth}
      customFullHeight={fullHeight}
      customMinHeight={minHeight}
      customMaxHeight={maxHeight}
      customMinWidth={minWidth}
      customMaxWidth={maxWidth}
      customBgcolor={bgcolor}
      customPadding={padding}
      customMargin={margin}
      customRounded={rounded}
      customBorderRadius={borderRadius}
      customBordered={bordered}
      customBorderColor={borderColor}
      customBorderWidth={borderWidth}
      customElevation={elevation}
      customStretch={stretch}
      customCentered={centered}
      customEqualWidth={equalWidth}
      customEqualHeight={equalHeight}
      customGap={gap}
      customRowGap={rowGap}
      customColumnGap={columnGap}
      {...accessibilityProps}
      {...other}
    >
      {processedChildren}
    </StyledStack>
  );
});

Stack.displayName = 'Stack';