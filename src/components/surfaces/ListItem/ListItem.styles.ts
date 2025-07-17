import { styled } from '@mui/material/styles';
export const StyledListItem: React.ComponentType<any> = styled('li')(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'padding': theme.spacing(1, 2),
  'borderRadius': theme.shape.borderRadius,
  'transition': 'background 0.2s',
  'cursor': 'pointer',
  '&:hover': {
    'background': theme.palette.action.hover,
  },
  // Selected state
  '&.ListItem--selected': {
    'background': theme.palette.action.selected,
    'color': theme.palette.primary.main,
    'fontWeight': 600,
  },
  // Disabled state
  '&.ListItem--disabled': {
    'background': theme.palette.action.disabledBackground,
    'color': theme.palette.action.disabled,
    'cursor': 'not-allowed',
    'pointerEvents': 'none',
    'opacity': 0.7,
  },

  '&:focus': {
    'outline': `2px solid ${theme.palette.primary.main}`,
    'outlineOffset': 2,
  },
})); 