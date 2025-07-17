
import type {
  AppBarPosition,
  AppBarColor,
  ToolbarVariant,
  AppBarConstants
} from './AppBar.types';

// AppBar positions
export const APPBAR_POSITIONS: Record<string, AppBarPosition> = {
  fixed: 'fixed',
  absolute: 'absolute',
  sticky: 'sticky',
  static: 'static',
  relative: 'relative',
} as const;

// AppBar colors
export const APPBAR_COLORS: Record<string, AppBarColor> = {
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
  inherit: 'inherit',
  transparent: 'transparent',
} as const;

// Toolbar variants
export const TOOLBAR_VARIANTS: Record<string, ToolbarVariant> = {
  regular: 'regular',
  dense: 'dense',
} as const;

// Default component props
export const DEFAULT_APPBAR_PROPS = {
  position: APPBAR_POSITIONS.static,
  color: APPBAR_COLORS.primary,
  elevation: 4,
  square: false,
  enableColorOnDark: false,
} as const;

export const DEFAULT_TOOLBAR_PROPS = {
  variant: TOOLBAR_VARIANTS.regular,
  disableGutters: false,
} as const;

// Dimension constants
export const DIMENSION_CONSTANTS = {
  HEIGHT: {
    regular: 64,
    dense: 48,
  },
  PADDING: {
    HORIZONTAL: 24,
    HORIZONTAL_MOBILE: 16,
    DENSE_HORIZONTAL: 16,
    DENSE_HORIZONTAL_MOBILE: 12,
  },
  BREAKPOINTS: {
    MOBILE: 600,
    TABLET: 960,
    DESKTOP: 1280,
  },
} as const;

// Z-index constants
export const Z_INDEX_CONSTANTS = {
  APPBAR: 1100,
  DRAWER: 1200,
  MODAL: 1300,
  SNACKBAR: 1400,
  TOOLTIP: 1500,
} as const;

// AppBar utilities
export const APPBAR_UTILS = {
  getAppBarHeight: (
    variant: ToolbarVariant,
    isMobile: boolean = false
  ): number => {
    const baseHeight = DIMENSION_CONSTANTS.HEIGHT[variant];
    
    // Mobile adjustments
    if (isMobile && variant === 'regular') {
      return 56; // Standard mobile AppBar height
    }
    
    return baseHeight;
  },

  getToolbarPadding: (
    variant: ToolbarVariant,
    isMobile: boolean = false,
    disableGutters: boolean = false
  ): { left: number; right: number } => {
    if (disableGutters) {
      return { left: 0, right: 0 };
    }
    
    if (variant === 'dense') {
      return {
        left: isMobile ? DIMENSION_CONSTANTS.PADDING.DENSE_HORIZONTAL_MOBILE : DIMENSION_CONSTANTS.PADDING.DENSE_HORIZONTAL,
        right: isMobile ? DIMENSION_CONSTANTS.PADDING.DENSE_HORIZONTAL_MOBILE : DIMENSION_CONSTANTS.PADDING.DENSE_HORIZONTAL,
      };
    }
    
    return {
      left: isMobile ? DIMENSION_CONSTANTS.PADDING.HORIZONTAL_MOBILE : DIMENSION_CONSTANTS.PADDING.HORIZONTAL,
      right: isMobile ? DIMENSION_CONSTANTS.PADDING.HORIZONTAL_MOBILE : DIMENSION_CONSTANTS.PADDING.HORIZONTAL,
    };
  },

  getAppBarColor: (
    theme: any,
    color: AppBarColor,
    enableColorOnDark: boolean = false
  ): { backgroundColor: string; color: string } => {
    switch (color) {
      case 'primary':
        return {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        };
      
      case 'secondary':
        return {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        };
      
      case 'inherit':
        return {
          backgroundColor: 'inherit',
          color: 'inherit',
        };
      
      case 'transparent':
        return {
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
        };
      
      case 'default':
      default:
        return {
          backgroundColor: theme.palette.mode === 'light' 
            ? theme.palette.grey[100] 
            : (enableColorOnDark ? theme.palette.grey[900] : theme.palette.background.paper),
          color: theme.palette.text.primary,
        };
    }
  },

  shouldHaveElevation: (position: AppBarPosition, elevation: number): boolean => {
    // Transparent AppBars typically don't have elevation
    if (elevation === 0) return false;
    
    // Static and relative AppBars might not need elevation
    if (position === 'static' || position === 'relative') {
      return elevation > 0;
    }
    
    // Fixed, absolute, and sticky AppBars typically have elevation
    return true;
  },

  getResponsiveStyles: (isMobile: boolean, isTablet: boolean) => {
    return {
      isMobile,
      isTablet,
      isDesktop: !isMobile && !isTablet,
      toolbarMinHeight: isMobile ? 56 : 64,
      horizontalPadding: isMobile ? 16 : 24,
    };
  },

  calculateContentSpacing: (
    hasLeading: boolean,
    hasActions: boolean,
    variant: ToolbarVariant
  ): { leadingSpace: number; trailingSpace: number } => {
    const iconButtonSize = variant === 'dense' ? 40 : 48;
    const spacing = variant === 'dense' ? 8 : 12;
    
    return {
      leadingSpace: hasLeading ? iconButtonSize + spacing : 0,
      trailingSpace: hasActions ? iconButtonSize + spacing : 0,
    };
  },

  generateLayoutClasses: (
    position: AppBarPosition,
    color: AppBarColor,
    elevation: number
  ): string[] => {
    const classes = ['MuiAppBar-root'];
    
    classes.push(`MuiAppBar-position${position.charAt(0).toUpperCase() + position.slice(1)}`);
    classes.push(`MuiAppBar-color${color.charAt(0).toUpperCase() + color.slice(1)}`);
    
    if (elevation > 0) {
      classes.push('MuiAppBar-elevated');
    }
    
    return classes;
  },
} as const;

// Common AppBar patterns
export const APPBAR_PATTERNS = {
  STANDARD: {
    hasMenu: true,
    hasTitle: true,
    hasActions: true,
    hasSecondary: false,
  },

  SIMPLE: {
    hasMenu: false,
    hasTitle: true,
    hasActions: true,
    hasSecondary: false,
  },

  MINIMAL: {
    hasMenu: false,
    hasTitle: true,
    hasActions: false,
    hasSecondary: false,
  },

  WITH_TABS: {
    hasMenu: true,
    hasTitle: true,
    hasActions: true,
    hasSecondary: true,
  },

  LANDING: {
    hasMenu: false,
    hasTitle: true,
    hasActions: true,
    hasSecondary: false,
    transparent: true,
  },
} as const;

// Export all constants as a single object
export const APPBAR_CONSTANTS: AppBarConstants = {
  POSITIONS: APPBAR_POSITIONS,
  COLORS: APPBAR_COLORS,
  TOOLBAR_VARIANTS: TOOLBAR_VARIANTS,
  DEFAULT_PROPS: {
    APPBAR: DEFAULT_APPBAR_PROPS,
    TOOLBAR: DEFAULT_TOOLBAR_PROPS,
  },
  DIMENSIONS: DIMENSION_CONSTANTS,
  Z_INDEX: Z_INDEX_CONSTANTS,
} as const;