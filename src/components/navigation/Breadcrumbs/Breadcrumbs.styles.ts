
import { Box, Link, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { StyledComponent } from '@mui/material/styles';

import { SIZE_CONFIGS, BREADCRUMBS_ANIMATIONS, BREADCRUMBS_STYLES } from './Breadcrumbs.constants';
import type { BreadcrumbSize, BreadcrumbVariant } from './Breadcrumbs.types';
export const BreadcrumbsContainer: StyledComponent<any, any, any> = styled(Box, {
  name: 'BreadcrumbsContainer',
  shouldForwardProp: (prop) => !['size', 'variant'].includes(prop as string),
})<{ size?: BreadcrumbSize; variant?: BreadcrumbVariant }>(({ theme, size = 'medium', variant = 'standard' }) => ({
  'fontSize': SIZE_CONFIGS[size].fontSize,
  'minHeight': SIZE_CONFIGS[size].minHeight,
  
  // Variant-specific styles
  ...(variant === 'contained' && {
    'backgroundColor': theme.palette.background.paper,
    'borderRadius': BREADCRUMBS_STYLES.borderRadius,
    'padding': theme.spacing(1, 2),
    'border': `1px solid ${theme.palette.divider}`,
  }),
}));

export const BreadcrumbItem: StyledComponent<any, any, any> = styled(Box, {
  name: 'BreadcrumbItem',
  shouldForwardProp: (prop) => !['size', 'current', 'disabled'].includes(prop as string),
})<{ size?: BreadcrumbSize; current?: boolean; disabled?: boolean }>(({ theme, size = 'medium', current, disabled }) => ({
  'display': 'inline-flex',
  'alignItems': 'center',
  'maxWidth': BREADCRUMBS_STYLES.maxItemWidth,
  'flexShrink': 0,
  'lineHeight': 1,
  
  // Current page styling
  ...(current && {
    'color': theme.palette.text.primary,
    'fontWeight': theme.typography.fontWeightMedium,
    'pointerEvents': 'none',
  }),
  
  // Disabled styling
  ...(disabled && {
    'opacity': BREADCRUMBS_STYLES.disabledOpacity,
    'pointerEvents': 'none',
  }),
  
  // Size-specific styling
  'padding': SIZE_CONFIGS[size].padding,
  'fontSize': SIZE_CONFIGS[size].fontSize,
  'minHeight': SIZE_CONFIGS[size].minHeight,
}));

export const BreadcrumbLink: StyledComponent<any, any, any> = styled(Link, {
  name: 'BreadcrumbLink',
  shouldForwardProp: (prop) => !['size', 'variant'].includes(prop as string),
})<{ size?: BreadcrumbSize; variant?: BreadcrumbVariant }>(({ theme, size = 'medium', variant = 'standard' }) => ({
  'display': 'inline-flex',
  'alignItems': 'center',
  'color': theme.palette.text.secondary,
  'textDecoration': 'none',
  'borderRadius': theme.shape.borderRadius,
  'lineHeight': 1,
  'transition': theme.transitions.create(['color', 'background-color', 'transform'], {
    duration: BREADCRUMBS_ANIMATIONS.hoverDuration,
    easing: BREADCRUMBS_ANIMATIONS.easing,
  }),
  
  '&:hover': {
    'color': theme.palette.primary.main,
    'textDecoration': 'none',
    'backgroundColor': theme.palette.action.hover,
    'transform': `scale(${BREADCRUMBS_ANIMATIONS.scaleActive})`,
  },
  
  '&:focus': {
    'outline': `${BREADCRUMBS_STYLES.focusOutlineWidth} solid ${theme.palette.primary.main}`,
    'outlineOffset': 2,
  },
  
  // Variant-specific styles
  ...(variant === 'text' && {
    '&:hover': {
      'backgroundColor': 'transparent',
      'color': theme.palette.primary.main,
    },
  }),
  
  ...(variant === 'contained' && {
    'backgroundColor': theme.palette.action.selected,
    'padding': theme.spacing(0.5, 1),
    'borderRadius': BREADCRUMBS_STYLES.borderRadius,
    
    '&:hover': {
      'backgroundColor': theme.palette.primary.main,
      'color': theme.palette.primary.contrastText,
    },
  }),
  
  // Size-specific padding
  'padding': SIZE_CONFIGS[size].padding,
}));

export const BreadcrumbSeparator: StyledComponent<any, any, any> = styled(Typography, {
  name: 'BreadcrumbSeparator',
  shouldForwardProp: (prop) => !['size'].includes(prop as string),
})<{ size?: BreadcrumbSize }>(({ theme, size = 'medium' }) => ({
  'color': theme.palette.text.disabled,
  'margin': `0 ${BREADCRUMBS_STYLES.itemSpacing}`,
  'fontSize': SIZE_CONFIGS[size].fontSize,
  'userSelect': 'none',
  'display': 'inline-flex',
  'alignItems': 'center',
  'lineHeight': 1,
  'flexShrink': 0,
  
  // Subtle animation for separators
  'transition': theme.transitions.create('opacity', {
    duration: BREADCRUMBS_ANIMATIONS.fadeInDuration,
  }),
}));

export const CollapseIndicator: StyledComponent<any, any, any> = styled(Button, {
  name: 'CollapseIndicator',
  shouldForwardProp: (prop) => !['size'].includes(prop as string),
})<{ size?: BreadcrumbSize }>(({ theme, size = 'medium' }) => ({
  'minWidth': BREADCRUMBS_STYLES.collapseIndicatorWidth,
  'color': theme.palette.text.secondary,
  'fontSize': SIZE_CONFIGS[size].fontSize,
  'padding': SIZE_CONFIGS[size].padding,
  'borderRadius': '50%',
  'display': 'inline-flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'flexShrink': 0,
  'transition': theme.transitions.create(['background-color', 'transform'], {
    duration: BREADCRUMBS_ANIMATIONS.hoverDuration,
  }),
  
  '&:hover': {
    'backgroundColor': theme.palette.action.hover,
    'transform': 'scale(1.1)',
  },
  
  '&:focus': {
    'outline': `${BREADCRUMBS_STYLES.focusOutlineWidth} solid ${theme.palette.primary.main}`,
    'outlineOffset': 2,
  },
  
  // Icon styling
  '& .MuiSvgIcon-root': {
    'fontSize': SIZE_CONFIGS[size].iconSize,
  },
}));

export const BreadcrumbIcon: StyledComponent<any, any, any> = styled(Box, {
  name: 'BreadcrumbIcon',
  shouldForwardProp: (prop) => !['size'].includes(prop as string),
})<{ size?: BreadcrumbSize }>(({ theme, size = 'medium' }) => ({
  'display': 'inline-flex',
  'alignItems': 'center',
  'marginRight': theme.spacing(0.5),
  'lineHeight': 1,
  'flexShrink': 0,
  
  '& .MuiSvgIcon-root': {
    'fontSize': SIZE_CONFIGS[size].iconSize,
    'color': 'inherit',
  },
}));

export const BreadcrumbText: StyledComponent<any, any, any> = styled(Typography, {
  name: 'BreadcrumbText',
  shouldForwardProp: (prop) => !['size', 'truncate'].includes(prop as string),
})<{ size?: BreadcrumbSize; truncate?: boolean }>(({ theme, size = 'medium', truncate }) => ({
  'fontSize': SIZE_CONFIGS[size].fontSize,
  'lineHeight': 1,
  'display': 'inline-flex',
  'alignItems': 'center',
  
  // Text truncation when needed
  ...(truncate && {
    'overflow': 'hidden',
    'textOverflow': 'ellipsis',
    'whiteSpace': 'nowrap',
    'maxWidth': BREADCRUMBS_STYLES.maxItemWidth,
  }),
}));

export const ExpandedItemsContainer: StyledComponent<any, any, any> = styled(Box)(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'overflow': 'hidden',
  'transition': theme.transitions.create(['max-width', 'opacity'], {
    duration: BREADCRUMBS_ANIMATIONS.expandDuration,
    easing: BREADCRUMBS_ANIMATIONS.easing,
  }),
  
  '&.collapsed': {
    'maxWidth': 0,
    'opacity': 0,
  },
  
  '&.expanded': {
    'maxWidth': '1000px', // Large enough to accommodate content
    'opacity': 1,
  },
}));