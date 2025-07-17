import React, { forwardRef, memo } from 'react';

import {
  DEFAULT_GRID_PROPS,
  ACCESSIBILITY_CONSTANTS,
} from './Grid.constants';
import { StyledGrid } from './Grid.styles';
import type { GridProps } from './Grid.types';

/**
 * Enhanced Grid component with advanced grid system and auto-layout support
 * 
 * Features:
 * - Flexbox grid system (MUI Grid) and CSS Grid support
 * - Responsive breakpoint support (xs, sm, md, lg, xl)
 * - Auto-fit and auto-fill column layouts
 * - CSS Grid template areas and custom layouts
 * - Flexible spacing options (gap, rowGap, columnGap)
 * - Direction and alignment controls
 * - Accessibility compliance (WCAG 2.1 AA)
 * - TypeScript support with strict typing
 * - Dark theme support via enhanced theme system
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>((
  {
    children,
    container = DEFAULT_GRID_PROPS.container,
    item = DEFAULT_GRID_PROPS.item,
    xs,
    sm,
    md,
    lg,
    xl,
    spacing = DEFAULT_GRID_PROPS.spacing,
    rowSpacing,
    columnSpacing,
    direction = DEFAULT_GRID_PROPS.direction,
    wrap = DEFAULT_GRID_PROPS.wrap,
    justifyContent = DEFAULT_GRID_PROPS.justifyContent,
    alignItems = DEFAULT_GRID_PROPS.alignItems,
    alignContent,
    minHeight,
    bgcolor,
    autoFit = DEFAULT_GRID_PROPS.autoFit,
    autoFill = DEFAULT_GRID_PROPS.autoFill,
    minColumnWidth,
    maxColumnWidth,
    columns,
    rows,
    gap,
    rowGap,
    columnGap,
    templateAreas,
    templateColumns,
    templateRows,
    useCssGrid = DEFAULT_GRID_PROPS.useCssGrid,
    className,
    sx,
    'aria-label': ariaLabel,
    role,
    ...other
  },
  ref
) => {
  // Determine appropriate role based on usage
  const effectiveRole = role || (container ? ACCESSIBILITY_CONSTANTS.containerRole : ACCESSIBILITY_CONSTANTS.itemRole);
  
  // Accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel || (container ? ACCESSIBILITY_CONSTANTS.defaultLabel : undefined),
    role: effectiveRole,
  };

  return (
    <StyledGrid data-testid="grid"
      ref={ref}
      container={container}
      item={item}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      spacing={spacing}
      rowSpacing={rowSpacing}
      columnSpacing={columnSpacing}
      direction={direction}
      wrap={wrap}
      justifyContent={justifyContent}
      alignItems={alignItems}
      alignContent={alignContent}
      className={className}
      sx={sx}
      // Custom props for styled component
      customBgcolor={bgcolor}
      customMinHeight={minHeight}
      customAutoFit={autoFit}
      customAutoFill={autoFill}
      customMinColumnWidth={minColumnWidth}
      customMaxColumnWidth={maxColumnWidth}
      customColumns={columns}
      customRows={rows}
      customGap={gap}
      customRowGap={rowGap}
      customColumnGap={columnGap}
      customTemplateAreas={templateAreas}
      customTemplateColumns={templateColumns}
      customTemplateRows={templateRows}
      customUseCssGrid={useCssGrid}
      {...accessibilityProps}
      {...other}
    >
      {children}
    </StyledGrid>
  );
});

Grid.displayName = 'Grid';

export default memo(Grid);