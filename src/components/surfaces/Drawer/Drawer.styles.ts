import { Drawer as MuiDrawer, IconButton, Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import React from 'react';

import {
  DRAWER_SIZE_DIMENSIONS,
  MINI_DRAWER_DIMENSIONS,
  ANIMATION_DURATIONS,
  Z_INDEX_VALUES
} from './Drawer.constants';
import type { DrawerContentStyleProps } from './Drawer.types';
// Keyframes for animations
const slideInLeft = keyframes`
  from {
    transform: translateX(-100%),
  }
  to {
    transform: translateX(0),
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%),
  }
  to {
    transform: translateX(0),
  }
`;

const slideInTop = keyframes`
  from {
    transform: translateY(-100%),
  }
  to {
    transform: translateY(0),
  }
`;

const slideInBottom = keyframes`
  from {
    transform: translateY(100%),
  }
  to {
    transform: translateY(0),
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0,
  }
  to {
    opacity: 1,
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.8),
    opacity: 0,
  }
  to {
    transform: scale(1),
    opacity: 1,
  }
`;

// Helper functions
const getDrawerDimensions = (
  anchor: string,
  size: string,
  width?: string | number,
  height?: string | number,
  collapsed?: boolean,
  variant?: string
): { width?: string; height?: string } => {
  if (variant === 'mini' && collapsed) {
    return {
      'width': anchor === 'left' || anchor === 'right' ? MINI_DRAWER_DIMENSIONS.collapsed : '100%',
      'height': anchor === 'top' || anchor === 'bottom' ? MINI_DRAWER_DIMENSIONS.collapsed : '100%',
    };
  }

  if (width && (anchor === 'left' || anchor === 'right')) {
    return { 'width': typeof width === 'number' ? `${width}px` : width };
  }

  if (height && (anchor === 'top' || anchor === 'bottom')) {
    return { 'height': typeof height === 'number' ? `${height}px` : height };
  }

  const dimensions = DRAWER_SIZE_DIMENSIONS[size as keyof typeof DRAWER_SIZE_DIMENSIONS];
  return {
    'width': anchor === 'left' || anchor === 'right' ? dimensions[anchor] : '100%',
    'height': anchor === 'top' || anchor === 'bottom' ? dimensions[anchor] : '100%',
  };
};

const getAnimation = (anchor: string, animation: string, open: boolean): string => {
  if (animation === 'none') return 'none';

  if (!open) return 'none';

  // Modern spring-based easing
  const springEasing = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
  const softEasing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  switch (animation) {
    case 'fade':
      return `${fadeIn} 0.4s ${softEasing}`;
    case 'scale':
      return `${scaleIn} 0.4s ${springEasing}`;
    case 'slide':
    default:
      switch (anchor) {
        case 'left':
          return `${slideInLeft} 0.4s ${springEasing}`;
        case 'right':
          return `${slideInRight} 0.4s ${springEasing}`;
        case 'top':
          return `${slideInTop} 0.4s ${springEasing}`;
        case 'bottom':
          return `${slideInBottom} 0.4s ${springEasing}`;
        default:
          return `${slideInLeft} 0.4s ${springEasing}`;
      }
  }
};

const getElevation = (elevation: boolean, level: number): string => {
  if (!elevation) return 'none';

  // Modern layered shadow system
  const shadows = {
    1: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    2: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    4: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    8: '0 25px 50px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)',
    16: '0 35px 60px rgba(0, 0, 0, 0.2), 0 15px 25px rgba(0, 0, 0, 0.15)',
    24: '0 40px 80px rgba(0, 0, 0, 0.25), 0 20px 30px rgba(0, 0, 0, 0.2)',
  };

  // Find closest shadow level
  const shadowLevels = [1, 2, 4, 8, 16, 24];
  const closestLevel = shadowLevels.reduce((prev, curr) =>
    Math.abs(curr - level) < Math.abs(prev - level) ? curr : prev
  );

  return shadows[closestLevel as keyof typeof shadows] || shadows[4];
};

// Main drawer component
export const StyledDrawer: React.ComponentType<any> = styled(MuiDrawer, {
  shouldForwardProp: (prop) =>
    !['drawerVariant', 'drawerAnchor', 'drawerSize', 'drawerBehavior', 'drawerAnimation',
      'drawerOpen', 'drawerCollapsed', 'drawerBackdrop', 'drawerElevation', 'drawerElevationLevel',
      'drawerAnimationDuration', 'drawerWidth', 'drawerHeight', 'drawerMiniWidth', 'drawerResponsive',
      'drawerResponsiveBreakpoint'].includes(prop as string),
})<{
  drawerVariant: string,
  drawerAnchor: string,
  drawerSize: string,
  drawerBehavior: string,
  drawerAnimation: string,
  drawerOpen: boolean,
  drawerCollapsed: boolean,
  drawerBackdrop: boolean,
  drawerElevation: boolean,
  drawerElevationLevel: number,
  drawerAnimationDuration: number,
  drawerWidth?: string | number,
  drawerHeight?: string | number,
  drawerMiniWidth?: string | number,
  drawerResponsive: boolean,
  drawerResponsiveBreakpoint: string,
}>(({
  theme,
  drawerVariant,
  drawerAnchor,
  drawerSize,
  drawerAnimation,
  drawerOpen,
  drawerCollapsed,
  drawerElevation,
  drawerElevationLevel,
  drawerAnimationDuration,
  drawerWidth,
  drawerHeight,
  drawerResponsive,
  drawerResponsiveBreakpoint
}) => {
  const dimensions = getDrawerDimensions(
    drawerAnchor,
    drawerSize,
    drawerWidth,
    drawerHeight,
    drawerCollapsed,
    drawerVariant
  );

  return {
    'zIndex': Z_INDEX_VALUES.drawer,
    'flexShrink': 0,
    'whiteSpace': 'nowrap',

    // Responsive behavior
    ...(drawerResponsive && {
      [theme.breakpoints.down(drawerResponsiveBreakpoint as any)]: {
        '& .MuiDrawer-paper': {
          'width': '100%',
          'height': '100%',
        },
      },
    }),

    '& .MuiDrawer-paper': {
      'position': 'relative',
      'transition': theme.transitions.create(
        ['width', 'height', 'transform', 'box-shadow', 'background-color'], {
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        duration: drawerAnimationDuration || ANIMATION_DURATIONS.normal,
      }),
      'overflowX': 'hidden',
      'boxShadow': getElevation(drawerElevation, drawerElevationLevel),

      // Animation
      ...(drawerAnimation !== 'none' && {
        'animation': getAnimation(drawerAnchor, drawerAnimation, drawerOpen),
      }),

      // Dimensions
      ...dimensions,

      // Mini drawer specific styles
      ...(drawerVariant === 'mini' && {
        'width': drawerCollapsed ? MINI_DRAWER_DIMENSIONS.collapsed : MINI_DRAWER_DIMENSIONS.expanded,
        'transition': theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: drawerAnimationDuration || ANIMATION_DURATIONS.normal
        })
      }),

      // Modern glass morphism effect (both light and dark modes)
      'backdropFilter': 'blur(12px)',
      'backgroundColor': theme.palette.mode === 'dark'
        ? 'rgba(18, 18, 18, 0.85)'
        : 'rgba(255, 255, 255, 0.85)',
      'borderColor': theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.1)',

      // Modern border styling
      'borderWidth': '1px',
      'borderStyle': 'solid',

      // Subtle gradient overlay
      'background': theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.9) 0%, rgba(32, 32, 32, 0.8) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 250, 250, 0.8) 100%)',
    },

    // Modern backdrop with enhanced blur
    '& .MuiBackdrop-root': {
      'background': theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(18, 18, 18, 0.6) 100%)'
        : 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(64, 64, 64, 0.3) 100%)',
      'backdropFilter': 'blur(8px) saturate(180%)',
      'transition': theme.transitions.create(['opacity', 'backdrop-filter'], {
        duration: theme.transitions.duration.short
      })
    },
  };
});

// Drawer content container
export const StyledDrawerContent: React.ComponentType<any> = styled(Box, {
  shouldForwardProp: (prop) =>
    !['variant', 'anchor', 'size', 'collapsed', 'hasHeader', 'hasFooter',
      'fixedHeader', 'fixedFooter', 'disableScrolling', 'hideScrollbar', 'disableScroll'].includes(prop as string),
})<DrawerContentStyleProps & { hideScrollbar?: boolean; disableScroll?: boolean }>(({
  theme,
  hasHeader,
  hasFooter,
  fixedHeader,
  fixedFooter,
  disableScrolling,
  hideScrollbar,
  disableScroll
}) => ({
  'display': 'flex',
  'flexDirection': 'column',
  'height': '100%',
  'width': '100%',
  'position': 'relative',
  'overflow': disableScrolling || disableScroll ? 'hidden' : 'auto',

  // Scrollbar styling
  ...(!hideScrollbar && {
    '&::-webkit-scrollbar': {
      'width': '6px',
    },
    '&::-webkit-scrollbar-track': {
      'backgroundColor': 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      'backgroundColor': theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.2)',
      'borderRadius': '3px',
      '&:hover': {
        'backgroundColor': theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.3)'
          : 'rgba(0, 0, 0, 0.3)',
      },
    },
  }),

  // Hide scrollbar completely when hideScrollbar is true
  ...(hideScrollbar && {
    '&::-webkit-scrollbar': {
      'display': 'none',
    },
    'scrollbarWidth': 'none', // Firefox
    'msOverflowStyle': 'none', // IE/Edge
  }),

  // Fixed header/footer layout
  ...(fixedHeader && {
    'paddingTop': '64px', // Space for fixed header
  }),
  ...(fixedFooter && {
    'paddingBottom': '64px', // Space for fixed footer
  }),
}));

// Drawer header
export const StyledDrawerHeader: React.ComponentType<any> = styled(Box, {
  shouldForwardProp: (prop) => !['fixed', 'collapsed', 'variant'].includes(prop as string),
})<{ fixed: boolean; collapsed: boolean; variant?: 'default' | 'primary' | 'gradient' }>(({ theme, fixed, collapsed, variant = 'default' }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  'padding': theme.spacing(2),
  'minHeight': '64px',
  'borderBottom': `1px solid ${theme.palette.divider}`,

  // Background based on variant
  ...(variant === 'default' && {
    'backgroundColor': theme.palette.background.paper,
  }),
  ...(variant === 'primary' && {
    'backgroundColor': theme.palette.primary.main,
    'color': theme.palette.primary.contrastText,
    'borderBottom': `1px solid ${theme.palette.primary.dark}`,
  }),
  ...(variant === 'gradient' && {
    'background': theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(144, 202, 249, 0.8) 0%, rgba(33, 150, 243, 0.6) 100%)'
      : 'linear-gradient(135deg, rgba(25, 118, 210, 0.9) 0%, rgba(21, 101, 192, 0.7) 100%)',
    'color': '#ffffff',
    'borderBottom': 'none',
    'boxShadow': '0 2px 8px rgba(0, 0, 0, 0.15)',
  }),

  ...(fixed && {
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'right': 0,
    'zIndex': 1,
    'boxShadow': theme.shadows[1],
  }),

  ...(collapsed && {
    'justifyContent': 'center',
    'padding': theme.spacing(1),

    '& .drawer-header-text': {
      'display': 'none',
    },
    '& .drawer-header-icon': {
      'display': 'block',
    },
  }),

  '& .drawer-header-text': {
    'fontSize': '1.25rem',
    'fontWeight': 600,
    'color': theme.palette.text.primary,
  },

  '& .drawer-header-icon': {
    'display': collapsed ? 'block' : 'none',
    'color': theme.palette.text.primary,
  },
}));

// Drawer navigation
export const StyledDrawerNavigation: React.ComponentType<any> = styled(Box, {
  shouldForwardProp: (prop) => !['collapsed'].includes(prop as string),
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  'flex': 1,
  'overflowY': 'auto',
  'overflowX': 'hidden',
  'padding': theme.spacing(1, 0),

  '& .MuiList-root': {
    'padding': 0,
  },

  '& .MuiListItem-root': {
    'paddingLeft': collapsed ? theme.spacing(1) : theme.spacing(2),
    'paddingRight': collapsed ? theme.spacing(1) : theme.spacing(2),
    'margin': theme.spacing(0.5, 1),
    'borderRadius': '12px',
    'transition': theme.transitions.create(
      ['background-color', 'padding', 'transform', 'box-shadow'], {
      duration: theme.transitions.duration.short,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }),

    '&:hover': {
      'backgroundColor': theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.04)',
      'transform': 'translateY(-1px)',
      'boxShadow': '0 4px 8px rgba(0, 0, 0, 0.1)',
    },

    '&.Mui-selected': {
      'background': theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(144, 202, 249, 0.2) 0%, rgba(33, 150, 243, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(25, 118, 210, 0.12) 0%, rgba(21, 101, 192, 0.08) 100%)',
      'color': theme.palette.primary.main,
      'fontWeight': 600,
      'boxShadow': '0 2px 8px rgba(25, 118, 210, 0.15)',

      '&:hover': {
        'background': theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(144, 202, 249, 0.25) 0%, rgba(33, 150, 243, 0.15) 100%)'
          : 'linear-gradient(135deg, rgba(25, 118, 210, 0.16) 0%, rgba(21, 101, 192, 0.12) 100%)',
        'transform': 'translateY(-1px)',
        'boxShadow': '0 4px 12px rgba(25, 118, 210, 0.2)',
      },

      '& .MuiListItemIcon-root': {
        'color': theme.palette.primary.main,
      },
    },
  },

  '& .MuiListItemIcon-root': {
    'minWidth': collapsed ? 'auto' : '40px',
    'justifyContent': 'center',
    'color': theme.palette.text.secondary,
  },

  '& .MuiListItemText-root': {
    'opacity': collapsed ? 0 : 1,
    'transition': theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short,
    }),

    ...(collapsed && {
      'display': 'none',
    }),
  },

  // Nested list items
  '& .MuiList-root .MuiList-root': {
    '& .MuiListItem-root': {
      'paddingLeft': collapsed ? theme.spacing(1) : theme.spacing(4),
    },
  },
}));

// Drawer body
export const StyledDrawerBody: React.ComponentType<any> = styled(Box, {
  shouldForwardProp: (prop) => !['hasHeader', 'hasFooter', 'scrollable'].includes(prop as string),
})<{ hasHeader: boolean; hasFooter: boolean; scrollable: boolean }>(({ theme, scrollable }) => ({
  'flex': 1,
  'padding': theme.spacing(2),
  'overflow': scrollable ? 'auto' : 'visible',

  ...(scrollable && {
    '&::-webkit-scrollbar': {
      'width': '8px',
    },
    '&::-webkit-scrollbar-track': {
      'backgroundColor': 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      'backgroundColor': theme.palette.action.disabled,
      'borderRadius': '4px',
      '&:hover': {
        'backgroundColor': theme.palette.action.hover,
      },
    },
  }),
}));

// Drawer footer
export const StyledDrawerFooter: React.ComponentType<any> = styled(Box, {
  shouldForwardProp: (prop) => !['fixed', 'collapsed'].includes(prop as string),
})<{ fixed: boolean; collapsed: boolean }>(({ theme, fixed, collapsed }) => ({
  'padding': theme.spacing(2),
  'borderTop': `1px solid ${theme.palette.divider}`,
  'backgroundColor': theme.palette.background.paper,

  ...(fixed && {
    'position': 'absolute',
    'bottom': 0,
    'left': 0,
    'right': 0,
    'zIndex': 1,
    'boxShadow': theme.shadows[1],
  }),

  ...(collapsed && {
    'padding': theme.spacing(1),
    'textAlign': 'center',
    '& .drawer-footer-text': {
      'display': 'none',
    },
  }),
}));

// Mini drawer toggle button
export const StyledToggleButton: React.ComponentType<any> = styled(IconButton, {
  shouldForwardProp: (prop) => !['anchor', 'collapsed'].includes(prop as string),
})<{ anchor: string; collapsed: boolean }>(({ theme, anchor, collapsed }) => ({
  'position': 'absolute',
  'zIndex': Z_INDEX_VALUES.miniToggle,
  'backgroundColor': theme.palette.background.paper,
  'border': `1px solid ${theme.palette.divider}`,
  'width': '32px',
  'height': '32px',
  'boxShadow': theme.shadows[2],

  '&:hover': {
    'backgroundColor': theme.palette.action.hover,
  },

  // Position based on anchor
  ...(anchor === 'left' && {
    'right': '-16px',
    'top': '50%',
    'transform': 'translateY(-50%)',
  }),
  ...(anchor === 'right' && {
    'left': '-16px',
    'top': '50%',
    'transform': 'translateY(-50%)',
  }),
  ...(anchor === 'top' && {
    'bottom': '-16px',
    'left': '50%',
    'transform': 'translateX(-50%)',
  }),
  ...(anchor === 'bottom' && {
    'top': '-16px',
    'left': '50%',
    'transform': 'translateX(-50%)',
  }),

  // Icon rotation for collapsed state
  '& .MuiSvgIcon-root': {
    'transition': theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
    }),
    ...(collapsed && anchor === 'left' && { 'transform': 'rotate(180deg)' }),
    ...(collapsed && anchor === 'right' && { 'transform': 'rotate(0deg)' }),
    ...(collapsed && anchor === 'top' && { 'transform': 'rotate(90deg)' }),
    ...(collapsed && anchor === 'bottom' && { 'transform': 'rotate(-90deg)' }),
  },
}));

// Swipe area for gesture detection
export const StyledSwipeArea: React.ComponentType<any> = styled(Box, {
  shouldForwardProp: (prop) => !['anchor', 'show'].includes(prop as string),
})<{ anchor: string; show: boolean }>(({ anchor, show }) => ({
  'position': 'fixed',
  'zIndex': Z_INDEX_VALUES.drawer - 1,
  'display': show ? 'block' : 'none',

  ...(anchor === 'left' && {
    'left': 0,
    'top': 0,
    'width': '20px',
    'height': '100%',
  }),
  ...(anchor === 'right' && {
    'right': 0,
    'top': 0,
    'width': '20px',
    'height': '100%',
  }),
  ...(anchor === 'top' && {
    'top': 0,
    'left': 0,
    'width': '100%',
    'height': '20px',
  }),
  ...(anchor === 'bottom' && {
    'bottom': 0,
    'left': 0,
    'width': '100%',
    'height': '20px',
  }),
}));

// Animation keyframes for export
export const drawerAnimationKeyframes = `
  @keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  @keyframes slideInTop {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }

  @keyframes slideInBottom {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;