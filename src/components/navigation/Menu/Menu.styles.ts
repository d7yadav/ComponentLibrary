
import { Paper, List } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import { DIMENSION_CONSTANTS, ANIMATION_CONSTANTS, Z_INDEX_CONSTANTS } from './Menu.constants';
import type {
  MenuStyleProps,
  MenuListStyleProps,
  MenuItemStyleProps,
  MenuItemIconStyleProps,
  MenuItemTextStyleProps
} from './Menu.types';

// Main menu container (Paper-based)
export const MenuPaper = styled(Paper)<MenuStyleProps>(({ 
  theme, 
  variant, 
  elevation, 
  open 
}) => ({
  // Base styles
  'minWidth': DIMENSION_CONSTANTS.MIN_WIDTH,
  'maxWidth': DIMENSION_CONSTANTS.MAX_WIDTH,
  'maxHeight': DIMENSION_CONSTANTS.MAX_HEIGHT,
  'overflow': 'auto',
  'outline': 'none',
  
  // Elevation and shadows
  'elevation': elevation,
  
  // Variant-specific styles
  ...(variant === 'selectedMenu' && {
    '& .MuiMenuItem-root.Mui-selected': {
      'backgroundColor': alpha(theme.palette.primary.main, 0.12),
    },
  }),
  
  // Animation styles
  'transition': theme.transitions.create(['opacity', 'transform'], {
    duration: open 
      ? ANIMATION_CONSTANTS.DURATION.ENTER 
      : ANIMATION_CONSTANTS.DURATION.EXIT,
    easing: open 
      ? ANIMATION_CONSTANTS.EASING.EASE_OUT 
      : ANIMATION_CONSTANTS.EASING.EASE_IN,
  }),
  
  // Transform origin for smooth animations
  'transformOrigin': 'top left',
  
  // Initial hidden state
  ...(!open && {
    'opacity': 0,
    'transform': 'scale(0.9)',
  }),
  
  // Scrollbar styling
  '&::-webkit-scrollbar': {
    'width': 6,
  },
  '&::-webkit-scrollbar-track': {
    'backgroundColor': alpha(theme.palette.divider, 0.04),
  },
  '&::-webkit-scrollbar-thumb': {
    'backgroundColor': alpha(theme.palette.divider, 0.2),
    'borderRadius': 3,
    '&:hover': {
      'backgroundColor': alpha(theme.palette.divider, 0.3),
    },
  },
}));

// Menu list container
export const MenuListContainer = styled(List)<MenuListStyleProps>(({ 
  theme, 
  variant, 
  dense, 
  disablePadding 
}) => ({
  // Remove default list styles
  'listStyle': 'none',
  'margin': 0,
  'padding': disablePadding ? 0 : `${DIMENSION_CONSTANTS.PADDING.VERTICAL}px 0`,
  'position': 'relative',
  'outline': 'none',
  
  // Dense variant
  ...(dense && {
      'padding': disablePadding ? 0 : `${DIMENSION_CONSTANTS.PADDING.DENSE_VERTICAL}px 0`,
  }),
  
  // Focus management
  '&:focus': {
    'outline': 'none',
  },
}));

// Menu item
export const MenuItemContainer = styled('li')<MenuItemStyleProps>(({ 
  theme, 
  variant, 
  disabled, 
  selected, 
  divider, 
  dense, 
  disableGutters,
  hasIcon,
  hasEndIcon,
  hasSecondaryText
}) => {
  const height = dense ? DIMENSION_CONSTANTS.ITEM_HEIGHT.dense : DIMENSION_CONSTANTS.ITEM_HEIGHT.standard;
  const horizontalPadding = dense 
    ? DIMENSION_CONSTANTS.PADDING.DENSE_HORIZONTAL 
    : DIMENSION_CONSTANTS.PADDING.HORIZONTAL;
  
  return {
    // Layout
    'display': 'flex',
    'alignItems': 'center',
    'minHeight': height,
    'padding': disableGutters 
      ? 0 
      : `0 ${horizontalPadding}px`,
    'paddingLeft': !disableGutters && hasIcon 
      ? horizontalPadding + DIMENSION_CONSTANTS.ICON_SIZE + DIMENSION_CONSTANTS.PADDING.ICON
      : !disableGutters ? horizontalPadding : 0,
    'paddingRight': !disableGutters && hasEndIcon 
      ? horizontalPadding + DIMENSION_CONSTANTS.ICON_SIZE + DIMENSION_CONSTANTS.PADDING.ICON
      : !disableGutters ? horizontalPadding : 0,
    
    // Typography
    'fontSize': '1rem',
    'fontFamily': theme.typography.fontFamily,
    'fontWeight': theme.typography.fontWeightRegular,
    'lineHeight': 1.5,
    'letterSpacing': theme.typography.body1.letterSpacing,
    
    // Colors and states
    'color': disabled 
      ? theme.palette.text.disabled 
      : theme.palette.text.primary,
    'backgroundColor': 'transparent',
    'cursor': disabled ? 'default' : 'pointer',
    'userSelect': 'none',
    'WebkitTapHighlightColor': 'transparent',
    
    // Transitions
    'transition': theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    
    // Selected state
    ...(selected && {
      'backgroundColor': alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      'color': theme.palette.primary.main,
    }),
    
    // Hover state
    ...(!disabled && {
      '&:hover': {
        'backgroundColor': selected
          ? alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity)
          : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      },
    }),
    
    // Focus state
    '&:focus': {
      'outline': 'none',
      'backgroundColor': selected
        ? alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
        : alpha(theme.palette.text.primary, theme.palette.action.focusOpacity),
    },
    
    // Active state
    ...(!disabled && {
      '&:active': {
        'backgroundColor': selected
          ? alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.activatedOpacity)
          : alpha(theme.palette.text.primary, theme.palette.action.activatedOpacity),
      },
    }),
    
    // Disabled state
    ...(disabled && {
      'pointerEvents': 'none',
      'opacity': theme.palette.action.disabledOpacity,
    }),
    
    // Divider
    ...(divider && {
      'borderBottom': `1px solid ${theme.palette.divider}`,
    }),
    
    // Secondary text layout
    ...(hasSecondaryText && {
      'alignItems': 'flex-start',
      'paddingTop': theme.spacing(1),
      'paddingBottom': theme.spacing(1),
    }),
  };
});

// Menu item icon
export const MenuItemIcon = styled('span')<MenuItemIconStyleProps>(({ 
  theme, 
  variant, 
  position 
}) => ({
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'minWidth': DIMENSION_CONSTANTS.ICON_SIZE,
  'marginRight': position === 'start' ? DIMENSION_CONSTANTS.PADDING.ICON : 0,
  'marginLeft': position === 'end' ? DIMENSION_CONSTANTS.PADDING.ICON : 0,
  'color': 'inherit',
  
  '& .MuiSvgIcon-root': {
    'fontSize': DIMENSION_CONSTANTS.ICON_SIZE,
    'color': 'inherit',
  },
}));

// Menu item text content
export const MenuItemText = styled('span')<MenuItemTextStyleProps>(({ 
  theme, 
  variant, 
  primary, 
  secondary 
}) => ({
  'flex': 1,
  'minWidth': 0, // Allow text to shrink
  
  // Primary text
  ...(primary && {
    'fontSize': '1rem',
    'fontWeight': theme.typography.fontWeightRegular,
    'lineHeight': 1.5,
    'color': 'inherit',
  }),
  
  // Secondary text
  ...(secondary && {
    'fontSize': '0.875rem',
    'fontWeight': theme.typography.fontWeightRegular,
    'lineHeight': 1.43,
    'color': theme.palette.text.secondary,
    'marginTop': theme.spacing(0.25),
  }),
}));

// Menu item content wrapper
export const MenuItemContent = styled('div')<{ hasSecondaryText?: boolean }>(({ 
  theme, 
  hasSecondaryText 
}) => ({
  'display': 'flex',
  'flexDirection': hasSecondaryText ? 'column' : 'row',
  'alignItems': hasSecondaryText ? 'flex-start' : 'center',
  'flex': 1,
  'minWidth': 0,
  'gap': hasSecondaryText ? 0 : theme.spacing(1),
}));

// Menu divider
export const MenuDivider = styled('hr')(({ theme }) => ({
  'height': DIMENSION_CONSTANTS.DIVIDER_HEIGHT,
  'margin': `${theme.spacing(0.5)} 0`,
  'border': 'none',
  'backgroundColor': theme.palette.divider,
  'flexShrink': 0,
}));

// Menu group header
export const MenuGroupHeader = styled('div')(({ theme }) => ({
  'padding': `${theme.spacing(1)} ${DIMENSION_CONSTANTS.PADDING.HORIZONTAL}px`,
  'fontSize': '0.75rem',
  'fontWeight': theme.typography.fontWeightMedium,
  'color': theme.palette.text.secondary,
  'textTransform': 'uppercase',
  'letterSpacing': '0.5px',
  'lineHeight': 1.5,
  'pointerEvents': 'none',
  'userSelect': 'none',
}));

// Menu backdrop
export const MenuBackdrop = styled('div')(({ theme }) => ({
  'position': 'fixed',
  'top': 0,
  'left': 0,
  'right': 0,
  'bottom': 0,
  'backgroundColor': 'transparent',
  'zIndex': Z_INDEX_CONSTANTS.BACKDROP,
  'WebkitTapHighlightColor': 'transparent',
}));

// Menu portal container
export const MenuPortal = styled('div')({
  'position': 'relative',
  'zIndex': Z_INDEX_CONSTANTS.MENU,
});

// Submenu indicator
export const SubmenuIndicator = styled('span')(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'marginLeft': 'auto',
  'color': theme.palette.text.secondary,
  
  '& .MuiSvgIcon-root': {
    'fontSize': '1rem',
  },
}));

// Menu item keyboard focus ring
export const MenuItemFocusRing = styled('div')<{ focused?: boolean }>(({ 
  theme, 
  focused 
}) => ({
  'position': 'absolute',
  'top': 2,
  'left': 2,
  'right': 2,
  'bottom': 2,
  'borderRadius': theme.shape.borderRadius,
  'border': `2px solid ${theme.palette.primary.main}`,
  'opacity': focused ? 1 : 0,
  'pointerEvents': 'none',
  'transition': theme.transitions.create('opacity', {
    duration: theme.transitions.duration.short,
  }),
}));