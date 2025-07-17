
import { Box, Tabs as MuiTabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme, StyledComponent } from '@mui/material/styles';
export const TabsContainer: StyledComponent<any, any, any> = styled(Box, {
  name: 'TabsContainer',
  shouldForwardProp: (prop) => prop !== 'orientation',
})<{ orientation?: 'horizontal' | 'vertical' }>(({ theme, orientation }) => ({
  'display': 'flex',
  'flexDirection': orientation === 'vertical' ? 'row' : 'column',
  'width': '100%',
  'minHeight': 0
}));

export const StyledTabs: StyledComponent<any, any, any> = styled(MuiTabs, {
  name: 'StyledTabs',
  shouldForwardProp: (prop) => !['variant'].includes(prop as string),
})(({ theme }) => ({
  '& .MuiTabs-indicator': {
    'transition': theme.transitions.create(['left', 'width', 'top', 'height'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    })
  },
  
  '& .MuiTab-root': {
    'minHeight': 48,
    'textTransform': 'none',
    'fontWeight': theme.typography.fontWeightMedium,
    'fontSize': theme.typography.pxToRem(14),
    'marginRight': theme.spacing(1),
    'color': theme.palette.text.secondary,
    
    '&:hover': {
      'color': theme.palette.primary.main,
      'opacity': 1
    },
    
    '&.Mui-selected': {
      'color': theme.palette.primary.main,
      'fontWeight': theme.typography.fontWeightSemiBold
    },
    
    '&.Mui-focusVisible': {
      'backgroundColor': theme.palette.action.focus,
      'outline': `2px solid ${theme.palette.primary.main}`,
      'outlineOffset': -2
    },
    
    '&.Mui-disabled': {
      'color': theme.palette.text.disabled
    }
  },
  
  '&.MuiTabs-scrollable': {
    '& .MuiTabs-scrollButtons': {
      'color': theme.palette.text.secondary,
      
      '&:hover': {
        'color': theme.palette.primary.main
      },
      
      '&.Mui-disabled': {
        'opacity': theme.palette.action.disabledOpacity
      }
    }
  },
  
  '&.MuiTabs-vertical': {
    'borderRight': `1px solid ${theme.palette.divider}`,
    'minWidth': 160,
    
    '& .MuiTab-root': {
      'marginRight': 0,
      'marginBottom': theme.spacing(0.5),
      'alignItems': 'flex-start',
      'textAlign': 'left',
      'minHeight': 40
    }
  }
}));

export const StyledTabPanel: StyledComponent<any, any, any> = styled(Box, {
  name: 'TabPanel',
  shouldForwardProp: (prop) => prop !== 'hidden',
})<{ hidden?: boolean; sx?: SxProps<Theme> }>(({ theme, hidden }) => ({
  'padding': theme.spacing(3),
  'flex': 1,
  'minHeight': 0,
  'overflow': 'auto',
  
  ...(hidden && {
    'display': 'none'
  }),
  
  '&:focus': {
    'outline': 'none'
  },
  
  '&:focus-visible': {
    'outline': `2px solid ${theme.palette.primary.main}`,
    'outlineOffset': 2
  }
}));

export const TabsLoadingOverlay: StyledComponent<any, any, any> = styled(Box)(({ theme }) => ({
  'position': 'absolute',
  'top': 0,
  'left': 0,
  'right': 0,
  'bottom': 0,
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'backgroundColor': theme.palette.background.paper,
  'opacity': 0.8,
  'zIndex': theme.zIndex.modal
}));