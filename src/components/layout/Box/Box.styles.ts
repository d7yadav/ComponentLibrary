import { Box as MuiBox } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import { BOX_BORDER_RADIUS, BOX_SHADOW_VALUES } from './Box.constants';
export const StyledBox: React.ComponentType<any> = styled(MuiBox, {
  shouldForwardProp: (prop) => !['customCentered', 'customRounded', 'customElevated', 'customFullWidth', 'customFullHeight', 'customClickable'].includes(prop as string),
})<any>((props: any) => {
  const { 
    theme, 
    customCentered,
    customRounded,
    customElevated,
    customFullWidth,
    customFullHeight,
    customClickable
  } = props;
  
  return {
    // Centered content
    ...(customCentered && {
      'display': 'flex',
      'alignItems': 'center',
      'justifyContent': 'center',
    }),
    
    // Border radius
    ...(customRounded && {
      'borderRadius': typeof customRounded === 'number' 
        ? customRounded 
        : BOX_BORDER_RADIUS.md,
    }),
    
    // Elevation (box shadow)
    ...(customElevated && {
      'boxShadow': typeof customElevated === 'number' 
        ? theme.shadows[Math.min(customElevated, 24)]
        : theme.shadows[BOX_SHADOW_VALUES.md],
    }),
    
    // Full width
    ...(customFullWidth && {
      'width': '100%',
    }),
    
    // Full height
    ...(customFullHeight && {
      'height': '100%',
    }),
    
    // Clickable styles
    ...(customClickable && {
      'cursor': 'pointer',
      'transition': theme.transitions.create(
        ['background-color', 'box-shadow', 'transform'],
        {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeInOut,
        }
      ),
      
      '&:hover': {
        'backgroundColor': theme.palette.action.hover,
        'transform': 'translateY(-1px)',
        'boxShadow': theme.shadows[4],
      },
      
      '&:active': {
        'transform': 'translateY(0)',
        'boxShadow': theme.shadows[2],
      },
      
      '&:focus-visible': {
        'outline': `2px solid ${theme.palette.primary.main}`,
        'outlineOffset': '2px',
      },
    }),
  };
});

// Specialized Box components for common patterns
export const FlexBox: React.ComponentType<any> = styled(StyledBox)<any>(() => ({
  'display': 'flex',
}));

export const FlexCenterBox: React.ComponentType<any> = styled(FlexBox)<any>(() => ({
  'alignItems': 'center',
  'justifyContent': 'center',
}));

export const FlexBetweenBox: React.ComponentType<any> = styled(FlexBox)<any>(() => ({
  'alignItems': 'center',
  'justifyContent': 'space-between',
}));

export const FlexColumnBox: React.ComponentType<any> = styled(FlexBox)<any>(() => ({
  'flexDirection': 'column',
}));

export const GridBox: React.ComponentType<any> = styled(StyledBox)<any>(() => ({
  'display': 'grid',
}));

export const GridCenterBox: React.ComponentType<any> = styled(GridBox)<any>(() => ({
  'placeItems': 'center',
}));

export const CardBox: React.ComponentType<any> = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    'padding': theme.spacing(3),
    'borderRadius': BOX_BORDER_RADIUS.md,
    'boxShadow': theme.shadows[2],
    'backgroundColor': theme.palette.background.paper,
    'border': `1px solid ${theme.palette.divider}`,
  };
});

export const HeroBox: React.ComponentType<any> = styled(FlexCenterBox)<any>((props: any) => {
  const { theme } = props;
  return {
    'minHeight': '50vh',
    'padding': theme.spacing(6),
    'textAlign': 'center',
    'flexDirection': 'column',
    
    [theme.breakpoints.down('md')]: {
      'minHeight': '40vh',
      'padding': theme.spacing(4),
    },
  };
});

export const SectionBox: React.ComponentType<any> = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    'paddingTop': theme.spacing(8),
    'paddingBottom': theme.spacing(8),
    'paddingLeft': theme.spacing(2),
    'paddingRight': theme.spacing(2),
    
    [theme.breakpoints.up('md')]: {
      'paddingTop': theme.spacing(12),
      'paddingBottom': theme.spacing(12),
      'paddingLeft': theme.spacing(4),
      'paddingRight': theme.spacing(4),
    },
  };
});

export const ContainerBox: React.ComponentType<any> = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    'maxWidth': theme.breakpoints.values.lg,
    'marginLeft': 'auto',
    'marginRight': 'auto',
    'paddingLeft': theme.spacing(2),
    'paddingRight': theme.spacing(2),
    
    [theme.breakpoints.up('sm')]: {
      'paddingLeft': theme.spacing(3),
      'paddingRight': theme.spacing(3),
    },
  };
});

export const SidebarBox: React.ComponentType<any> = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    'width': 250,
    'height': '100vh',
    'borderRight': `1px solid ${theme.palette.divider}`,
    'padding': theme.spacing(2),
    'backgroundColor': theme.palette.background.paper,
    'overflowY': 'auto',
    
    [theme.breakpoints.down('md')]: {
      'width': '100%',
      'height': 'auto',
      'borderRight': 'none',
      'borderBottom': `1px solid ${theme.palette.divider}`,
    },
  };
});

export const OverlayBox: React.ComponentType<any> = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
    'backgroundColor': 'rgba(0, 0, 0, 0.5)',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'zIndex': theme.zIndex.modal,
  };
});

export const AspectRatioBox: React.ComponentType<any> = styled(StyledBox, {
  shouldForwardProp: (prop) => !['aspectRatio'].includes(prop as string),
})<{ aspectRatio?: number }>((props: any) => {
  const { aspectRatio = 16 / 9 } = props;
  const paddingTop = `${(1 / aspectRatio) * 100}%`;
  
  return {
    'position': 'relative',
    'overflow': 'hidden',
    
    '&::before': {
      'content': '""',
      'display': 'block',
      'paddingTop': paddingTop,
    },
    
    '& > *': {
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'width': '100%',
      'height': '100%',
      'objectFit': 'cover',
    },
  };
});

export const StickyBox: React.ComponentType<any> = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    'position': 'sticky',
    'top': 0,
    'zIndex': theme.zIndex.appBar,
    'backgroundColor': theme.palette.background.paper,
    'borderBottom': `1px solid ${theme.palette.divider}`,
  };
});

export const ScrollableBox: React.ComponentType<any> = styled(StyledBox)<any>(() => ({
  'overflow': 'auto',
  
  // Custom scrollbar styling
  '&::-webkit-scrollbar': {
    'width': 8,
    'height': 8,
  },
  
  '&::-webkit-scrollbar-track': {
    'backgroundColor': 'transparent',
  },
  
  '&::-webkit-scrollbar-thumb': {
    'backgroundColor': 'rgba(0, 0, 0, 0.2)',
    'borderRadius': 4,
    
    '&:hover': {
      'backgroundColor': 'rgba(0, 0, 0, 0.3)',
    },
  },
}));

export const ClickableBox: React.ComponentType<any> = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    'cursor': 'pointer',
    'transition': theme.transitions.create(
      ['background-color', 'box-shadow', 'transform'],
      {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
      }
    ),
    
    '&:hover': {
      'backgroundColor': theme.palette.action.hover,
      'transform': 'translateY(-2px)',
      'boxShadow': theme.shadows[4],
    },
    
    '&:active': {
      'transform': 'translateY(0)',
      'boxShadow': theme.shadows[2],
    },
    
    '&:focus-visible': {
      'outline': `2px solid ${theme.palette.primary.main}`,
      'outlineOffset': '2px',
    },
  };
});