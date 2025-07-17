
import type { Theme } from '@mui/material/styles';
import type { ReactNode, HTMLAttributes } from 'react';

// AppBar positions
export type AppBarPosition = 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';

// AppBar colors
export type AppBarColor = 'default' | 'primary' | 'secondary' | 'inherit' | 'transparent';

// Toolbar variants
export type ToolbarVariant = 'regular' | 'dense';

// AppBar elevation states
export type AppBarElevation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

// Main AppBar props
export interface AppBarProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  // Basic props
  position?: AppBarPosition;
  color?: AppBarColor;
  
  // Layout props
  elevation?: AppBarElevation;
  square?: boolean;
  
  // Behavior props
  enableColorOnDark?: boolean;
  
  // Content props
  children?: ReactNode;
  
  // Styling props
  className?: string;
  sx?: unknown; // was any, now unknown for type safety
  
  // Component customization
  component?: React.ElementType;
  
  // Advanced props
  classes?: {
    root?: string;
    positionFixed?: string;
    positionAbsolute?: string;
    positionSticky?: string;
    positionStatic?: string;
    positionRelative?: string;
    colorDefault?: string;
    colorPrimary?: string;
    colorSecondary?: string;
    colorInherit?: string;
    colorTransparent?: string;
  };
}

// Toolbar props
export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  // Basic props
  variant?: ToolbarVariant;
  
  // Layout props
  disableGutters?: boolean;
  
  // Content props
  children?: ReactNode;
  
  // Styling props
  className?: string;
  sx?: unknown; // was any, now unknown for type safety
  
  // Component customization
  component?: React.ElementType;
  
  // Advanced props
  classes?: {
    root?: string;
    gutters?: string;
    regular?: string;
    dense?: string;
  };
}

// Styled component props
export interface AppBarStyleProps {
  theme: Theme;
  position: AppBarPosition;
  color: AppBarColor;
  elevation: AppBarElevation;
  square?: boolean;
  enableColorOnDark?: boolean;
}

export interface ToolbarStyleProps {
  theme: Theme;
  variant: ToolbarVariant;
  disableGutters?: boolean;
}

// AppBar content layout helpers
export interface AppBarContentProps {
  children?: ReactNode;
  className?: string;
}

export interface AppBarTitleProps {
  children?: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
  component?: React.ElementType;
  noWrap?: boolean;
  className?: string;
  sx?: unknown; // was any, now unknown for type safety
}

export interface AppBarActionProps {
  children?: ReactNode;
  edge?: 'start' | 'end' | false;
  className?: string;
}

// Layout types for common AppBar patterns
export interface AppBarLayout {
  leading?: ReactNode; // Usually menu button or logo
  title?: ReactNode; // App title or page title
  actions?: ReactNode; // Action buttons, user menu, etc.
  secondary?: ReactNode; // Secondary toolbar content (tabs, etc.)
}

// Constants export type
export interface AppBarConstants {
  POSITIONS: Record<string, AppBarPosition>;
  COLORS: Record<string, AppBarColor>;
  TOOLBAR_VARIANTS: Record<string, ToolbarVariant>;
  DEFAULT_PROPS: {
    APPBAR: Partial<AppBarProps>;
    TOOLBAR: Partial<ToolbarProps>;
  };
  DIMENSIONS: {
    HEIGHT: Record<ToolbarVariant, number>;
    PADDING: Record<string, number>;
    BREAKPOINTS: Record<string, number>;
  };
  Z_INDEX: {
    APPBAR: number;
    DRAWER: number;
    MODAL: number;
  };
}