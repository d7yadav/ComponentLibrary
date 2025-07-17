import { styled } from '@mui/material/styles';

export const StyledList: React.ComponentType<any> = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',

  '&:hover': {
    opacity: 0.8,
    cursor: 'pointer',
  },

  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
})); 