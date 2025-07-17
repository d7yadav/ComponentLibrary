
import { AppBar as MuiAppBar, Toolbar as MuiToolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DIMENSION_CONSTANTS, Z_INDEX_CONSTANTS, APPBAR_UTILS } from './AppBar.constants';
import type { AppBarStyleProps, ToolbarStyleProps } from './AppBar.types';

// Main AppBar container
export const StyledAppBar = styled(MuiAppBar)<AppBarStyleProps>(({ 
  theme, 
  position, 
  color, 
  elevation, 
  square,
  enableColorOnDark 
}) => {
  // Get color styles from utility
  const colorStyles = APPBAR_UTILS.getAppBarColor(theme, color, enableColorOnDark);

  return {
    position,
    zIndex: Z_INDEX_CONSTANTS.APPBAR,
    backgroundColor: colorStyles.backgroundColor,
    color: colorStyles.color,
    // Elevation handling
    boxShadow: elevation ? theme.shadows[elevation] : undefined,
    // Square corners
    borderRadius: square ? 0 : undefined,
    // Position-specific styles
    top: position === 'fixed' || position === 'sticky' ? 0 : undefined,
    left: position === 'fixed' || position === 'sticky' ? 0 : undefined,
    right: position === 'fixed' || position === 'sticky' ? 0 : undefined,
    // Responsive adjustments
    [theme.breakpoints.down('sm')]: {
      minHeight: DIMENSION_CONSTANTS.HEIGHT.regular - 8,
    },
  };
});

// Toolbar container
export const StyledToolbar = styled(MuiToolbar)<ToolbarStyleProps>(({ 
  theme, 
  variant, 
  disableGutters 
}) => {
  /**
   * Get the toolbar padding based on variant and gutter settings
   * @type {{ left: number; right: number }}
   */
  const padding = APPBAR_UTILS.getToolbarPadding(variant, false, disableGutters);

  return {
    minHeight: DIMENSION_CONSTANTS.HEIGHT[variant],
    paddingLeft: padding.left,
    paddingRight: padding.right,
    // Dense variant
    ...(variant === 'dense' && {
      minHeight: DIMENSION_CONSTANTS.HEIGHT.dense,
    }),
    // Mobile responsive
    [theme.breakpoints.down('sm')]: {
      minHeight: variant === 'dense' ? 48 : 56,
      paddingLeft: disableGutters ? 0 : DIMENSION_CONSTANTS.PADDING.HORIZONTAL_MOBILE,
      paddingRight: disableGutters ? 0 : DIMENSION_CONSTANTS.PADDING.HORIZONTAL_MOBILE,
    },
  };
});

// AppBar title
export const AppBarTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: theme.typography.fontWeightMedium,
  // Responsive font sizes
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
  },
}));

// AppBar section containers
export const AppBarSection = styled('div')<{ position?: 'start' | 'center' | 'end' }>(({ 
  theme, 
  position = 'center' 
}) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  // Section-specific alignment
  ...(position === 'start' && {
    marginRight: theme.spacing(2),
  }),
  ...(position === 'end' && {
    marginLeft: theme.spacing(2),
  }),
  ...(position === 'center' && {
    flex: 1,
    justifyContent: 'center',
  }),
  // Interactive states
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