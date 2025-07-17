import { Divider as MuiDivider } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { DividerProps } from './Divider.types';
export const StyledDivider = styled(MuiDivider)<DividerProps>(({ theme, orientation, variant, textAlign }) => ({
  // Base styles
  'margin': 0,
  
  // Orientation-specific styles
  ...(orientation === 'horizontal' && {
    'borderBottom': `1px solid ${theme.palette.divider}`,
    'borderLeft': 'none',
    'borderRight': 'none',
    'borderTop': 'none',
    'height': 0,
    'width': '100%',
  }),
  
  ...(orientation === 'vertical' && {
    'borderLeft': `1px solid ${theme.palette.divider}`,
    'borderBottom': 'none',
    'borderRight': 'none',
    'borderTop': 'none',
    'height': '100%',
    'width': 0,
  }),
  
  // Variant-specific styles
  ...(variant === 'inset' && {
    ...(orientation === 'horizontal' ? {
      'marginLeft': theme.spacing(2),
    } : {
      'marginTop': theme.spacing(1),
    }),
  }),
  
  ...(variant === 'middle' && {
    ...(orientation === 'horizontal' ? {
      'marginLeft': theme.spacing(2),
      'marginRight': theme.spacing(2),
    } : {
      'marginTop': theme.spacing(2),
      'marginBottom': theme.spacing(2),
    }),
  }),
  
  // Text alignment for dividers with content
  '& .MuiDivider-wrapper': {
    'textAlign': textAlign || 'center',
  },
  
  // Theme-based color transitions
  'transition': theme.transitions.create(['border-color'], {
    duration: theme.transitions.duration.short,
  }),
}));

export const StyledDividerText = styled('span')(({ theme }) => ({
  'padding': theme.spacing(0, 2),
  'color': theme.palette.text.secondary,
  'fontSize': theme.typography.body2.fontSize,
  'fontWeight': theme.typography.fontWeightMedium,
  'backgroundColor': theme.palette.background.paper,
  'whiteSpace': 'nowrap',

  '&:hover': {
    'opacity': 0.8,
    'cursor': 'pointer',
  },

  '&:focus': {
    'outline': `2px solid ${theme.palette.primary.main}`,
    'outlineOffset': '2px',
  },

  '&:disabled': {
    'opacity': 0.5,
    'cursor': 'not-allowed',
    'pointerEvents': 'none',
  },
})); 