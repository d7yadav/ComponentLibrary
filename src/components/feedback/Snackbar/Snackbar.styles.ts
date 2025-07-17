import { Snackbar as MuiSnackbar, SnackbarContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import {
  SNACKBAR_COLORS,
  SNACKBAR_ELEVATION_VALUES
} from './Snackbar.constants';
export const StyledSnackbar: React.ComponentType<any> = styled(MuiSnackbar, {
  shouldForwardProp: (prop) => !['customZIndex'].includes(prop as string),
})<{ customZIndex?: number }>((props: any) => {
  const { customZIndex } = props;
  return {
    ...(customZIndex && {
      'zIndex': customZIndex,
    }),
  };
});

export const StyledSnackbarContent: React.ComponentType<any> = styled(SnackbarContent, {
  shouldForwardProp: (prop) => !['customSeverity', 'customVariant', 'customElevated', 'customElevation', 'customRounded', 'customBorderRadius', 'customBgcolor', 'customColor', 'customMaxWidth'].includes(prop as string),
})<any>((props: any) => {
  const {
    theme,
    customSeverity,
    customVariant = 'standard',
    customElevated,
    customElevation,
    customRounded,
    customBorderRadius,
    customBgcolor,
    customColor,
    customMaxWidth
  } = props;

  const colorConfig = customSeverity ? SNACKBAR_COLORS[customSeverity as keyof typeof SNACKBAR_COLORS] : null;

  return {
    // Base styling
    'padding': theme.spacing(1.5, 2),
    'minWidth': 300,
    'maxWidth': customMaxWidth || 400,
    'fontSize': '0.875rem',
    'lineHeight': 1.5,

    // Elevation
    ...(customElevation && {
      'boxShadow': theme.shadows[customElevation || SNACKBAR_ELEVATION_VALUES.medium],
    }),

    // Border radius
    ...(customRounded && {
      'borderRadius': customBorderRadius
        ? (typeof customBorderRadius === 'number' ? customBorderRadius : customBorderRadius)
        : theme.spacing(1),
    }),

    // Custom background color
    ...(customBgcolor && {
      'backgroundColor': customBgcolor.includes('.')
        ? theme.palette[customBgcolor.split('.')[0] as keyof typeof theme.palette]?.main || customBgcolor
        : customBgcolor,
    }),

    // Custom text color
    ...(customColor && {
      'color': customColor.includes('.')
        ? theme.palette[customColor.split('.')[0] as keyof typeof theme.palette]?.main || customColor
        : customColor,
    }),

    // Severity-based styling
    // Variant-specific styles
    ...(customVariant === 'filled' && customSeverity && {
      'backgroundColor': colorConfig.main,
      'color': colorConfig.contrast,
    }),

    ...(customVariant === 'outlined' && customSeverity && {
      'backgroundColor': theme.palette.background.paper,
      'color': colorConfig.main,
      'border': `1px solid ${colorConfig.border}`,
    }),

    ...(customVariant === 'standard' && customSeverity && {
      'backgroundColor': colorConfig.background,
      'color': colorConfig.dark,
    }),

    // Message styling
    '& .MuiSnackbarContent-message': {
      'padding': 0,
      'fontSize': 'inherit',
      'lineHeight': 'inherit',
      'display': 'flex',
      'alignItems': 'flex-start',
      gap: theme.spacing(1),

      // Icon styling
      '& .snackbar-icon': {
        'fontSize': 20,
        'marginTop': theme.spacing(0.125), // Slight alignment adjustment
        'flexShrink': 0,
      },

      // Content wrapper
      '& .snackbar-content': {
        'flex': 1,

        '& .snackbar-title': {
          'fontWeight': theme.typography.fontWeightMedium,
          'marginBottom': theme.spacing(0.5),
          'fontSize': '0.9375rem',
          'lineHeight': 1.3,
        },

        '& .snackbar-message': {
          'fontSize': 'inherit',
          'lineHeight': 'inherit',
        },
      },
    },

    // Action styling
    '& .MuiSnackbarContent-action': {
      'padding': 0,
      'marginLeft': theme.spacing(2),
      'marginRight': 0,

      '& .MuiButton-root': {
        'minWidth': 'auto',
        'padding': theme.spacing(0.5, 1),
        'fontSize': '0.75rem',
        'color': 'inherit',

        '&:hover': {
          'backgroundColor': theme.palette.action.hover,
        },
      },

      '& .MuiIconButton-root': {
        'padding': theme.spacing(0.5),
        'color': 'inherit',

        '&:hover': {
          'backgroundColor': theme.palette.action.hover,
        },
      },
    },

    // Responsive design
    [theme.breakpoints.down('sm')]: {
      'minWidth': 280,
      'maxWidth': '90vw',
      'margin': theme.spacing(0, 1),

      '& .MuiSnackbarContent-message': {
        '& .snackbar-title': {
          'fontSize': '0.875rem',
        },
      },
    },
  };
});

// Snackbar message wrapper
export const SnackbarMessage: React.ComponentType<any> = styled('div')<any>((props: any) => {
  const { theme } = props;
  return {
    'display': 'flex',
    'alignItems': 'flex-start',
    gap: theme.spacing(1),
    'width': '100%',
  };
});

// Snackbar content wrapper
export const SnackbarContentWrapper: React.ComponentType<any> = styled('div')(() => ({
  'flex': 1,
  'minWidth': 0, // Allow text to wrap
}));

// Snackbar title
export const SnackbarTitle: React.ComponentType<any> = styled('div')<any>((props: any) => {
  const { theme } = props;
  return {
    'fontWeight': theme.typography.fontWeightMedium,
    'marginBottom': theme.spacing(0.5),
    'fontSize': '0.9375rem',
    'lineHeight': 1.3,
    'color': 'inherit',
  };
});

// Snackbar actions container
export const SnackbarActions: React.ComponentType<any> = styled('div')<any>((props: any) => {
  const { theme } = props;
  return {
    'display': 'flex',
    'alignItems': 'center',
    gap: theme.spacing(1),
    'marginLeft': theme.spacing(2),
    'flexShrink': 0,

    '& .MuiButton-root': {
      'minWidth': 'auto',
      'padding': theme.spacing(0.5, 1),
      'fontSize': '0.75rem',
      'textTransform': 'uppercase',
      'fontWeight': theme.typography.fontWeightMedium,
    },
  };
});

// Specialized snackbar variants
export const SuccessSnackbar: React.ComponentType<any> = styled(StyledSnackbarContent)<any>((props: any) => {
  const { theme } = props;
  const colorConfig = SNACKBAR_COLORS.success;

  return {
    'backgroundColor': colorConfig.main,
    'color': colorConfig.contrast,

    '& .MuiSnackbarContent-action': {
      '& .MuiButton-root': {
        'color': colorConfig.contrast,

        '&:hover': {
          'backgroundColor': theme.palette.action.hover,
        },
      },
    },
  };
});

export const ErrorSnackbar: React.ComponentType<any> = styled(StyledSnackbarContent)<any>((props: any) => {
  const { theme } = props;
  const colorConfig = SNACKBAR_COLORS.error;

  return {
    'backgroundColor': colorConfig.main,
    'color': colorConfig.contrast,

    '& .MuiSnackbarContent-action': {
      '& .MuiButton-root': {
        'color': colorConfig.contrast,

        '&:hover': {
          'backgroundColor': theme.palette.action.hover,
        },
      },
    },
  };
});

export const WarningSnackbar: React.ComponentType<any> = styled(StyledSnackbarContent)<any>((props: any) => {
  const { theme } = props;
  const colorConfig = SNACKBAR_COLORS.warning;

  return {
    'backgroundColor': colorConfig.main,
    'color': colorConfig.contrast,

    '& .MuiSnackbarContent-action': {
      '& .MuiButton-root': {
        'color': colorConfig.contrast,

        '&:hover': {
          'backgroundColor': theme.palette.action.hover,
        },
      },
    },
  };
});

export const InfoSnackbar: React.ComponentType<any> = styled(StyledSnackbarContent)<any>((props: any) => {
  const { theme } = props;
  const colorConfig = SNACKBAR_COLORS.info;

  return {
    'backgroundColor': colorConfig.main,
    'color': colorConfig.contrast,

    '& .MuiSnackbarContent-action': {
      '& .MuiButton-root': {
        'color': colorConfig.contrast,

        '&:hover': {
          'backgroundColor': theme.palette.action.hover,
        },
      },
    },
  };
});

// Toast-style snackbar
export const ToastSnackbar: React.ComponentType<any> = styled(StyledSnackbarContent)<any>((props: any) => {
  const { theme } = props;
  return {
    'borderRadius': theme.spacing(2),
    'boxShadow': theme.shadows[12],
    backdropFilter: 'blur(10px)',
    'backgroundColor': theme.palette.background.paper,
    'opacity': 0.95,
    'color': theme.palette.common.white,

    [theme.breakpoints.down('sm')]: {
      'borderRadius': theme.spacing(1),
    },
  };
});

// Compact snackbar for minimal space
export const CompactSnackbar: React.ComponentType<any> = styled(StyledSnackbarContent)<any>((props: any) => {
  const { theme } = props;
  return {
    'minWidth': 200,
    'padding': theme.spacing(1, 1.5),
    'fontSize': '0.8125rem',

    '& .MuiSnackbarContent-message': {
      '& .snackbar-icon': {
        'fontSize': 18,
      },

      '& .snackbar-title': {
        'fontSize': '0.8125rem',
        'marginBottom': theme.spacing(0.25),
      },
    },

    '& .MuiSnackbarContent-action': {
      'marginLeft': theme.spacing(1),

      '& .MuiButton-root': {
        'padding': theme.spacing(0.25, 0.75),
        'fontSize': '0.6875rem',
      },
    },
  };
});

// Full-width banner snackbar
export const BannerSnackbar: React.ComponentType<any> = styled(StyledSnackbarContent)<any>((props: any) => {
  const { theme } = props;
  return {
    'width': '100%',
    'maxWidth': 'none',
    'borderRadius': 0,

    [theme.breakpoints.up('sm')]: {
      'borderRadius': theme.spacing(0, 0, 1, 1),
    },
  };
});