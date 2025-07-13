import { styled, keyframes } from '@mui/material/styles';
import { Drawer as MuiDrawer, IconButton, Box } from '@mui/material';
import { DrawerStyleProps, DrawerContentStyleProps } from './Drawer.types';
import { 
  DRAWER_SIZE_DIMENSIONS, 
  MINI_DRAWER_DIMENSIONS, 
  ANIMATION_DURATIONS,
  Z_INDEX_VALUES,
  ELEVATION_LEVELS,
  RESPONSIVE_BREAKPOINTS
} from './Drawer.constants';

// Keyframes for animations
const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideInBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
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
      width: anchor === 'left' || anchor === 'right' ? MINI_DRAWER_DIMENSIONS.collapsed : '100%',
      height: anchor === 'top' || anchor === 'bottom' ? MINI_DRAWER_DIMENSIONS.collapsed : '100%',
    };
  }

  if (width && (anchor === 'left' || anchor === 'right')) {
    return { width: typeof width === 'number' ? `${width}px` : width };
  }
  
  if (height && (anchor === 'top' || anchor === 'bottom')) {
    return { height: typeof height === 'number' ? `${height}px` : height };
  }

  const dimensions = DRAWER_SIZE_DIMENSIONS[size as keyof typeof DRAWER_SIZE_DIMENSIONS];
  return {
    width: anchor === 'left' || anchor === 'right' ? dimensions[anchor] : '100%',
    height: anchor === 'top' || anchor === 'bottom' ? dimensions[anchor] : '100%',
  };
};

const getAnimation = (anchor: string, animation: string, open: boolean): string => {
  if (animation === 'none') return 'none';
  
  if (!open) return 'none';

  switch (animation) {
    case 'fade':
      return `${fadeIn} 0.3s ease-out`;
    case 'scale':
      return `${scaleIn} 0.3s ease-out`;
    case 'slide':
    default:
      switch (anchor) {
        case 'left':
          return `${slideInLeft} 0.3s ease-out`;
        case 'right':
          return `${slideInRight} 0.3s ease-out`;
        case 'top':
          return `${slideInTop} 0.3s ease-out`;
        case 'bottom':
          return `${slideInBottom} 0.3s ease-out`;
        default:
          return `${slideInLeft} 0.3s ease-out`;
      }
  }
};

const getElevation = (elevation: boolean, level: number): string => {
  if (!elevation) return 'none';
  
  const elevationMap = {
    0: 'none',
    2: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    4: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    8: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    16: '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
  };
  
  return elevationMap[level as keyof typeof elevationMap] || elevationMap[4];
};

// Main drawer component
/**
 * StyledDrawer component
 * 
 * @returns JSX element
 */
export const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => 
    !['drawerVariant', 'drawerAnchor', 'drawerSize', 'drawerBehavior', 'drawerAnimation', 
      'drawerOpen', 'drawerCollapsed', 'drawerBackdrop', 'drawerElevation', 'drawerElevationLevel',
      'drawerAnimationDuration', 'drawerWidth', 'drawerHeight', 'drawerMiniWidth', 'drawerResponsive',
      'drawerResponsiveBreakpoint'].includes(prop as string),
})<{
  drawerVariant: string;
  drawerAnchor: string;
  drawerSize: string;
  drawerBehavior: string;
  drawerAnimation: string;
  drawerOpen: boolean;
  drawerCollapsed: boolean;
  drawerBackdrop: boolean;
  drawerElevation: boolean;
  drawerElevationLevel: number;
  drawerAnimationDuration: number;
  drawerWidth?: string | number;
  drawerHeight?: string | number;
  drawerMiniWidth?: string | number;
  drawerResponsive: boolean;
  drawerResponsiveBreakpoint: string;
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
    zIndex: Z_INDEX_VALUES.drawer,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    
    // Responsive behavior
    ...(drawerResponsive && {
      [theme.breakpoints.down(drawerResponsiveBreakpoint as any)]: {
        '& .MuiDrawer-paper': {
          width: '100%',
          height: '100%',
        },
      },
    }),

    '& .MuiDrawer-paper': {
      position: 'relative',
      transition: theme.transitions.create(['width', 'height', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: drawerAnimationDuration || ANIMATION_DURATIONS.normal,
      }),
      overflowX: 'hidden',
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.divider,
      boxShadow: getElevation(drawerElevation, drawerElevationLevel),
      
      // Animation
      ...(drawerAnimation !== 'none' && {
        animation: getAnimation(drawerAnchor, drawerAnimation, drawerOpen),
      }),
      
      // Dimensions
      ...dimensions,
      
      // Mini drawer specific styles
      ...(drawerVariant === 'mini' && {
        width: drawerCollapsed ? MINI_DRAWER_DIMENSIONS.collapsed : MINI_DRAWER_DIMENSIONS.expanded,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: drawerAnimationDuration || ANIMATION_DURATIONS.normal,
        }),
      }),

      // Dark mode support
      ...(theme.palette.mode === 'dark' && {
        backgroundColor: theme.palette.grey[900],
        borderColor: theme.palette.grey[700],
      }),

      // Glass morphism effect
      ...(theme.palette.mode === 'dark' && {
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
      }),
    },

    // Backdrop customization
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
    },
  };
});

// Drawer content container
/**
 * StyledDrawerContent component
 * 
 * @returns JSX element
 */
export const StyledDrawerContent = styled(Box, {
  shouldForwardProp: (prop) => 
    !['variant', 'anchor', 'size', 'collapsed', 'hasHeader', 'hasFooter',
      'fixedHeader', 'fixedFooter', 'disableScrolling'].includes(prop as string),
})<DrawerContentStyleProps>(({ 
  theme, 
  variant, 
  anchor, 
  hasHeader, 
  hasFooter, 
  fixedHeader, 
  fixedFooter,
  disableScrolling 
}) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  position: 'relative',
  overflow: disableScrolling ? 'hidden' : 'auto',
  
  // Scrollbar styling
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  
  // Fixed header/footer layout
  ...(fixedHeader && hasHeader && {
    paddingTop: '64px', // Space for fixed header
  }),
  ...(fixedFooter && hasFooter && {
    paddingBottom: '64px', // Space for fixed footer
  }),
}));

// Drawer header
/**
 * StyledDrawerHeader component
 * 
 * @returns JSX element
 */
export const StyledDrawerHeader = styled(Box, {
  shouldForwardProp: (prop) => !['fixed', 'collapsed'].includes(prop as string),
})<{ fixed: boolean; collapsed: boolean }>(({ theme, fixed, collapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  minHeight: '64px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  
  ...(fixed && {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    boxShadow: theme.shadows[1],
  }),
  
  ...(collapsed && {
    justifyContent: 'center',
    padding: theme.spacing(1),
    
    '& .drawer-header-text': {
      display: 'none',
    },
    '& .drawer-header-icon': {
      display: 'block',
    },
  }),
  
  '& .drawer-header-text': {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  
  '& .drawer-header-icon': {
    display: collapsed ? 'block' : 'none',
    color: theme.palette.text.primary,
  },
}));

// Drawer navigation
/**
 * StyledDrawerNavigation component
 * 
 * @returns JSX element
 */
export const StyledDrawerNavigation = styled(Box, {
  shouldForwardProp: (prop) => !['collapsed'].includes(prop as string),
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: theme.spacing(1, 0),
  
  '& .MuiList-root': {
    padding: 0,
  },
  
  '& .MuiListItem-root': {
    paddingLeft: collapsed ? theme.spacing(1) : theme.spacing(2),
    paddingRight: collapsed ? theme.spacing(1) : theme.spacing(2),
    margin: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'padding'], {
      duration: theme.transitions.duration.short,
    }),
    
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
      
      '& .MuiListItemIcon-root': {
        color: 'inherit',
      },
    },
  },
  
  '& .MuiListItemIcon-root': {
    minWidth: collapsed ? 'auto' : '40px',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  },
  
  '& .MuiListItemText-root': {
    opacity: collapsed ? 0 : 1,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short,
    }),
    
    ...(collapsed && {
      display: 'none',
    }),
  },
  
  // Nested list items
  '& .MuiList-root .MuiList-root': {
    '& .MuiListItem-root': {
      paddingLeft: collapsed ? theme.spacing(1) : theme.spacing(4),
    },
  },
}));

// Drawer body
/**
 * StyledDrawerBody component
 * 
 * @returns JSX element
 */
export const StyledDrawerBody = styled(Box, {
  shouldForwardProp: (prop) => !['hasHeader', 'hasFooter', 'scrollable'].includes(prop as string),
})<{ hasHeader: boolean; hasFooter: boolean; scrollable: boolean }>(({ theme, scrollable }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflow: scrollable ? 'auto' : 'visible',
  
  ...(scrollable && {
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.action.disabled,
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
}));

// Drawer footer
/**
 * StyledDrawerFooter component
 * 
 * @returns JSX element
 */
export const StyledDrawerFooter = styled(Box, {
  shouldForwardProp: (prop) => !['fixed', 'collapsed'].includes(prop as string),
})<{ fixed: boolean; collapsed: boolean }>(({ theme, fixed, collapsed }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  
  ...(fixed && {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    boxShadow: theme.shadows[1],
  }),
  
  ...(collapsed && {
    padding: theme.spacing(1),
    textAlign: 'center',
    
    '& .drawer-footer-text': {
      display: 'none',
    },
  }),
}));

// Mini drawer toggle button
/**
 * StyledToggleButton component
 * 
 * @returns JSX element
 */
export const StyledToggleButton = styled(IconButton, {
  shouldForwardProp: (prop) => !['anchor', 'collapsed'].includes(prop as string),
})<{ anchor: string; collapsed: boolean }>(({ theme, anchor, collapsed }) => ({
  position: 'absolute',
  zIndex: Z_INDEX_VALUES.miniToggle,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  width: '32px',
  height: '32px',
  boxShadow: theme.shadows[2],
  
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  
  // Position based on anchor
  ...(anchor === 'left' && {
    right: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
  }),
  ...(anchor === 'right' && {
    left: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
  }),
  ...(anchor === 'top' && {
    bottom: '-16px',
    left: '50%',
    transform: 'translateX(-50%)',
  }),
  ...(anchor === 'bottom' && {
    top: '-16px',
    left: '50%',
    transform: 'translateX(-50%)',
  }),
  
  // Icon rotation for collapsed state
  '& .MuiSvgIcon-root': {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
    }),
    ...(collapsed && anchor === 'left' && { transform: 'rotate(180deg)' }),
    ...(collapsed && anchor === 'right' && { transform: 'rotate(0deg)' }),
    ...(collapsed && anchor === 'top' && { transform: 'rotate(90deg)' }),
    ...(collapsed && anchor === 'bottom' && { transform: 'rotate(-90deg)' }),
  },
}));

// Swipe area for gesture detection
/**
 * StyledSwipeArea component
 * 
 * @returns JSX element
 */
export const StyledSwipeArea = styled(Box, {
  shouldForwardProp: (prop) => !['anchor', 'show'].includes(prop as string),
})<{ anchor: string; show: boolean }>(({ anchor, show }) => ({
  position: 'fixed',
  zIndex: Z_INDEX_VALUES.drawer - 1,
  display: show ? 'block' : 'none',
  
  ...(anchor === 'left' && {
    left: 0,
    top: 0,
    width: '20px',
    height: '100%',
  }),
  ...(anchor === 'right' && {
    right: 0,
    top: 0,
    width: '20px',
    height: '100%',
  }),
  ...(anchor === 'top' && {
    top: 0,
    left: 0,
    width: '100%',
    height: '20px',
  }),
  ...(anchor === 'bottom' && {
    bottom: 0,
    left: 0,
    width: '100%',
    height: '20px',
  }),
}));

// Animation keyframes for export
/**
 * drawerAnimationKeyframes component
 * 
 * @returns JSX element
 */
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