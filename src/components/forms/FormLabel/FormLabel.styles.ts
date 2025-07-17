import { styled } from '@mui/material/styles';
export const StyledFormLabel: React.ComponentType<any> = styled('label')(({ theme }) => ({
  'fontFamily': theme.typography.fontFamily,
  'fontWeight': 500,
  'fontSize': theme.typography.body1.fontSize,
  'color': theme.palette.text.primary,
  'marginBottom': theme.spacing(0.5),
  'display': 'inline-block',

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