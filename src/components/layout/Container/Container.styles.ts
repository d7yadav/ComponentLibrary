import { Container as MuiContainer } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import {
  CONTAINER_MAX_WIDTH_VALUES,
  CONTAINER_GUTTERS,
  CONTAINER_BORDER_RADIUS,
  CONTAINER_ELEVATION_CONFIGS,
} from './Container.constants';
export const StyledContainer: React.ComponentType<any> = styled(MuiContainer, {
  shouldForwardProp: (prop) => !['customVariant', 'customMaxWidth', 'centered', 'bordered', 'rounded', 'customElevation', 'customBgcolor', 'customPadding', 'customMargin', 'customMinHeight', 'customMaxHeight'].includes(prop as string),
})<any>((props: any) => {
  const { 
    theme, 
    customVariant, 
    customMaxWidth, 
    centered, 
    bordered, 
    rounded, 
    customElevation, 
    customBgcolor,
    customPadding,
    customMargin,
    customMinHeight,
    customMaxHeight
  } = props;
  
  return {
    // Base container styles
    'width': '100%',
    'marginLeft': centered ? 'auto' : 0,
    'marginRight': centered ? 'auto' : 0,
    'display': 'block',
    'boxSizing': 'border-box',
    
    // Custom margin
    ...(customMargin && {
      'margin': typeof customMargin === 'number' ? theme.spacing(customMargin) : customMargin,
    }),
    
    // Custom padding
    ...(customPadding && {
      'padding': typeof customPadding === 'number' ? theme.spacing(customPadding) : customPadding,
    }),
    
    // Height constraints
    ...(customMinHeight && {
      'minHeight': typeof customMinHeight === 'number' ? `${customMinHeight}px` : customMinHeight,
    }),
    
    ...(customMaxHeight && {
      'maxHeight': typeof customMaxHeight === 'number' ? `${customMaxHeight}px` : customMaxHeight,
    }),
    
    // Background color
    ...(customBgcolor && {
      'backgroundColor': customBgcolor.includes('.') 
        ? theme.palette[customBgcolor.split('.')[0] as keyof typeof theme.palette]?.main || customBgcolor
        : customBgcolor,
    }),
    
    // Border
    ...(bordered && {
      'border': `1px solid ${theme.palette.divider}`,
    }),
    
    // Border radius
    ...(rounded && {
      'borderRadius': CONTAINER_BORDER_RADIUS.medium,
    }),
    
    // Elevation
    ...(customElevation && {
      'boxShadow': theme.shadows[Math.min(customElevation, 24)],
    }),
    
    // Variant-specific styles
    ...(customVariant === 'fluid' && {
      'maxWidth': 'none !important',
      [theme.breakpoints.up('xs')]: {
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.xs / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.xs / 8),
      },
      [theme.breakpoints.up('sm')]: {
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.sm / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.sm / 8),
      },
    }),
    
    ...(customMaxWidth && {
      [theme.breakpoints.up('xs')]: {
        'maxWidth': customMaxWidth === 'xs' ? CONTAINER_MAX_WIDTH_VALUES.xs : '100%',
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.xs / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.xs / 8),
      },
      [theme.breakpoints.up('sm')]: {
        'maxWidth': customMaxWidth === 'sm' || customMaxWidth === 'xs' ? CONTAINER_MAX_WIDTH_VALUES.sm : '100%',
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.sm / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.sm / 8),
      },
      [theme.breakpoints.up('md')]: {
        'maxWidth': ['md', 'sm', 'xs'].includes(customMaxWidth) ? CONTAINER_MAX_WIDTH_VALUES.md : '100%',
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.md / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.md / 8),
      },
      [theme.breakpoints.up('lg')]: {
        'maxWidth': ['lg', 'md', 'sm', 'xs'].includes(customMaxWidth) ? CONTAINER_MAX_WIDTH_VALUES.lg : '100%',
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.lg / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.lg / 8),
      },
      [theme.breakpoints.up('xl')]: {
        'maxWidth': customMaxWidth === 'xl' ? CONTAINER_MAX_WIDTH_VALUES.xl : 
                 ['lg', 'md', 'sm', 'xs'].includes(customMaxWidth) ? CONTAINER_MAX_WIDTH_VALUES[customMaxWidth] : '100%',
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.xl / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.xl / 8),
      },
    }),
    
    ...(customVariant === 'constrained' && {
      [theme.breakpoints.up('xs')]: {
        'maxWidth': CONTAINER_MAX_WIDTH_VALUES.xs,
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.xs / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.xs / 8),
      },
      [theme.breakpoints.up('sm')]: {
        'maxWidth': CONTAINER_MAX_WIDTH_VALUES.sm,
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.sm / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.sm / 8),
      },
      [theme.breakpoints.up('md')]: {
        'maxWidth': CONTAINER_MAX_WIDTH_VALUES.md,
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.md / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.md / 8),
      },
      [theme.breakpoints.up('lg')]: {
        'maxWidth': CONTAINER_MAX_WIDTH_VALUES.md, // Stay at md width
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.lg / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.lg / 8),
      },
      [theme.breakpoints.up('xl')]: {
        'maxWidth': CONTAINER_MAX_WIDTH_VALUES.md, // Stay at md width
        'paddingLeft': theme.spacing(CONTAINER_GUTTERS.xl / 8),
        'paddingRight': theme.spacing(CONTAINER_GUTTERS.xl / 8),
      },
    }),
  };
});

// Utility styled components for common container patterns
export const FluidContainer: React.ComponentType<any> = styled(StyledContainer)<any>(() => ({
  'maxWidth': 'none !important',
  'width': '100%',
}));

export const CenteredContainer: React.ComponentType<any> = styled(StyledContainer)<any>(() => ({
  'marginLeft': 'auto',
  'marginRight': 'auto',
}));

export const SectionContainer: React.ComponentType<any> = styled(StyledContainer, {
  shouldForwardProp: (prop) => !['spacing'].includes(prop as string),
})<{ spacing?: number }>((props: any) => {
  const { theme, spacing = 4 } = props;
  return {
    'paddingTop': theme.spacing(spacing),
    'paddingBottom': theme.spacing(spacing),
  };
});

export const HeroContainer: React.ComponentType<any> = styled(StyledContainer)<any>((props: any) => {
  const { theme } = props;
  return {
    'minHeight': '50vh',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'textAlign': 'center',
    'paddingTop': theme.spacing(8),
    'paddingBottom': theme.spacing(8),
  };
});

export const ContentContainer: React.ComponentType<any> = styled(StyledContainer)<any>((props: any) => {
  const { theme } = props;
  return {
    'paddingTop': theme.spacing(3),
    'paddingBottom': theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      'paddingTop': theme.spacing(6),
      'paddingBottom': theme.spacing(6),
    },
  };
});