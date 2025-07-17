import { styled } from '@mui/material/styles';
export const StyledRadioGroup: React.ComponentType<any> = styled('div')(({ theme }) => ({
  'display': 'flex',
  'flexDirection': 'column',
  gap: theme.spacing(1),
  'width': '100%',
  'position': 'relative',

  '&:hover': {
    'opacity': 0.8,
    'cursor': 'pointer',
  },

  '&:focus': {
    'outline': `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },

  '&:disabled': {
    'opacity': 0.5,
    'cursor': 'not-allowed',
    'pointerEvents': 'none',
  }
})); 