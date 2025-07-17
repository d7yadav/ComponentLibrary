/**
 * @fileoverview AppBar component implementation
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import React, { forwardRef, memo } from 'react';

import {
  DEFAULT_APPBAR_PROPS,
  DEFAULT_TOOLBAR_PROPS,
} from './AppBar.constants';
import {
  StyledAppBar,
  StyledToolbar,
  AppBarTitle,
  AppBarSection,
} from './AppBar.styles';
import type { 
  AppBarProps,
  ToolbarProps,
  AppBarTitleProps,
  AppBarActionProps,
} from './AppBar.types';

/**
 * AppBar component - Application header bar
 */
export const AppBar = memo(forwardRef<HTMLElement, AppBarProps>(({
  position = DEFAULT_APPBAR_PROPS.position,
  color = DEFAULT_APPBAR_PROPS.color,
  elevation = DEFAULT_APPBAR_PROPS.elevation,
  square = DEFAULT_APPBAR_PROPS.square,
  enableColorOnDark = DEFAULT_APPBAR_PROPS.enableColorOnDark,
  children,
  className,
  sx,
  component = 'header',
  classes,
  ...rest
}, ref) => {
  return (
    <StyledAppBar
      ref={ref}
      component={component}
      position={position}
      color={color}
      elevation={elevation}
      square={square}
      enableColorOnDark={enableColorOnDark}
      className={className}
      sx={sx}
      classes={classes}
      {...rest}
    >
      {children}
    </StyledAppBar>
  );
}));

AppBar.displayName = 'AppBar';

/**
 * Toolbar component - Container for AppBar content
 */
export const Toolbar = memo(forwardRef<HTMLDivElement, ToolbarProps>(({
  variant = DEFAULT_TOOLBAR_PROPS.variant,
  disableGutters = DEFAULT_TOOLBAR_PROPS.disableGutters,
  children,
  className,
  sx,
  component = 'div',
  classes,
  ...rest
}, ref) => {
  return (
    <StyledToolbar
      ref={ref}
      component={component}
      variant={variant}
      disableGutters={disableGutters}
      className={className}
      sx={sx}
      classes={classes}
      {...rest}
    >
      {children}
    </StyledToolbar>
  );
}));

Toolbar.displayName = 'Toolbar';

/**
 * AppBarTitle component - Title text in AppBar
 */
export const Title = memo(forwardRef<HTMLDivElement, AppBarTitleProps>(({
  children,
  variant = 'h6',
  component = 'h1',
  noWrap = false,
  className,
  sx,
  ...rest
}, ref) => {
  return (
    <AppBarTitle
      ref={ref}
      variant={variant}
      component={component}
      noWrap={noWrap}
      className={className}
      sx={sx}
      {...rest}
    >
      {children}
    </AppBarTitle>
  );
}));

Title.displayName = 'AppBarTitle';

/**
 * AppBarActions component - Action buttons section
 */
export const Actions = memo(forwardRef<HTMLDivElement, AppBarActionProps>(({
  children,
  edge = false,
  className,
  ...rest
}, ref) => {
  return (
    <AppBarSection
      ref={ref}
      position="end"
      className={className}
      {...rest}
    >
      {children}
    </AppBarSection>
  );
}));

Actions.displayName = 'AppBarActions';