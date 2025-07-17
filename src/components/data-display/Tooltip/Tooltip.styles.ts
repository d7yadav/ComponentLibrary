
import { styled, alpha } from '@mui/material/styles';

import { DIMENSION_CONSTANTS, Z_INDEX_CONSTANTS, TOOLTIP_UTILS } from './Tooltip.constants';
import type {
  TooltipStyleProps,
  TooltipArrowStyleProps,
  TooltipContentStyleProps
} from './Tooltip.types';
// Main tooltip container
export const TooltipContainer = styled('div')<TooltipStyleProps>(({ 
  theme, 
  placement, 
  variant, 
  hasArrow,
  interactive 
}) => {
  const variantStyles = TOOLTIP_UTILS.getVariantStyles(variant, theme);
  const transformOrigin = TOOLTIP_UTILS.getTransformOrigin(placement);
  
  return {
    'position': 'relative',
    'zIndex': Z_INDEX_CONSTANTS.TOOLTIP,
    'maxWidth': variant === 'rich' ? 'none' : DIMENSION_CONSTANTS.MAX_WIDTH,
    'padding': variant === 'rich' 
      ? `${DIMENSION_CONSTANTS.PADDING.RICH_VERTICAL}px ${DIMENSION_CONSTANTS.PADDING.RICH_HORIZONTAL}px`
      : `${DIMENSION_CONSTANTS.PADDING.VERTICAL}px ${DIMENSION_CONSTANTS.PADDING.HORIZONTAL}px`,
    'borderRadius': variant === 'rich' 
      ? DIMENSION_CONSTANTS.RICH_BORDER_RADIUS 
      : DIMENSION_CONSTANTS.BORDER_RADIUS,
    'fontSize': '0.875rem',
    'lineHeight': 1.4,
    'fontFamily': theme.typography.fontFamily,
    'fontWeight': theme.typography.fontWeightRegular,
    'wordWrap': 'break-word',
    'transformOrigin': transformOrigin,
    
    // Apply variant styles
    ...variantStyles,
    
    // Interactive styles
    ...(interactive && {
      'cursor': 'auto',
      'userSelect': 'text',
      'pointerEvents': 'auto',
    }),
    
    // Animation
    'transition': theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    
    // Focus management for interactive tooltips
    '&:focus': {
      'outline': `2px solid ${theme.palette.primary.main}`,
      'outlineOffset': 2,
    },
  };
});

// Tooltip arrow
export const TooltipArrow = styled('div')<TooltipArrowStyleProps>(({ 
  theme, 
  placement, 
  variant 
}) => {
  const arrowStyles = TOOLTIP_UTILS.getArrowStyles(placement, theme);
  const variantColor = (TOOLTIP_UTILS.getVariantStyles(variant, theme) as any).backgroundColor;
  
  return {
    ...arrowStyles,
    // Override border colors based on variant
    ...(placement === 'top' && {
      'borderTopColor': variantColor,
    }),
    ...(placement === 'bottom' && {
      'borderBottomColor': variantColor,
    }),
    ...(placement === 'left' && {
      'borderLeftColor': variantColor,
    }),
    ...(placement === 'right' && {
      'borderRightColor': variantColor,
    }),
  };
});

// Rich tooltip content wrapper
export const RichTooltipContent = styled('div')<TooltipContentStyleProps>(({ 
  theme, 
  variant, 
  maxWidth 
}) => ({
  'display': 'flex',
  'flexDirection': 'column',
  'gap': theme.spacing(1),
  'maxWidth': maxWidth || DIMENSION_CONSTANTS.MAX_WIDTH,
  
  // Rich tooltip specific styles
  ...(variant === 'rich' && {
    'gap': theme.spacing(1.5),
  }),
}));

// Rich tooltip header
export const RichTooltipHeader = styled('div')(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'gap': theme.spacing(1),
  'marginBottom': theme.spacing(0.5),
}));

// Rich tooltip title
export const RichTooltipTitle = styled('div')(({ theme }) => ({
  'fontSize': '1rem',
  'fontWeight': theme.typography.fontWeightMedium,
  'lineHeight': 1.2,
  'color': theme.palette.text.primary,
}));

// Rich tooltip body
export const RichTooltipBody = styled('div')(({ theme }) => ({
  'fontSize': '0.875rem',
  'lineHeight': 1.4,
  'color': theme.palette.text.secondary,
}));

// Rich tooltip actions
export const RichTooltipActions = styled('div')(({ theme }) => ({
  'display': 'flex',
  'justifyContent': 'flex-end',
  'gap': theme.spacing(1),
  'marginTop': theme.spacing(0.5),
  
  '& > *': {
    'minWidth': 'auto',
  },
}));

// Rich tooltip avatar container
export const RichTooltipAvatar = styled('div')(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'marginRight': theme.spacing(1),
}));

// Tooltip trigger wrapper (for accessibility)
export const TooltipTrigger = styled('div')({
  'display': 'inline-flex',
  'alignItems': 'center',
  
  // Ensure trigger is focusable when needed
  '&[tabindex]': {
    'outline': 'none',
    
    '&:focus-visible': {
      'outline': '2px solid currentColor',
      'outlineOffset': 2,
    },
  },
});

// Portal container for tooltip
export const TooltipPortal = styled('div')({
  'position': 'absolute',
  'top': 0,
  'left': 0,
  'pointerEvents': 'none',
  'zIndex': Z_INDEX_CONSTANTS.TOOLTIP,
});

// Backdrop for click-away detection (interactive tooltips)
export const TooltipBackdrop = styled('div')({
  'position': 'fixed',
  'top': 0,
  'left': 0,
  'right': 0,
  'bottom': 0,
  'zIndex': Z_INDEX_CONSTANTS.TOOLTIP - 1,
  'backgroundColor': 'transparent',
  'pointerEvents': 'auto',
});

// Tooltip content for screen readers
export const TooltipScreenReaderContent = styled('span')({
  'position': 'absolute',
  'width': 1,
  'height': 1,
  'padding': 0,
  'margin': -1,
  'overflow': 'hidden',
  'clip': 'rect(0, 0, 0, 0)',
  'whiteSpace': 'nowrap',
  'border': 0,
});