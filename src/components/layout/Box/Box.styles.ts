import { styled } from '@mui/material/styles';
import { Box as MuiBox } from '@mui/material';
import { BOX_BORDER_RADIUS, BOX_SHADOW_VALUES } from './Box.constants';

/**
 * StyledBox component
 * 
 * @returns JSX element
 */
export const StyledBox = styled(MuiBox, {
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    
    // Border radius
    ...(customRounded && {
      borderRadius: typeof customRounded === 'number' 
        ? customRounded 
        : BOX_BORDER_RADIUS.md,
    }),
    
    // Elevation (box shadow)
    ...(customElevated && {
      boxShadow: typeof customElevated === 'number' 
        ? theme.shadows[Math.min(customElevated, 24)]
        : theme.shadows[BOX_SHADOW_VALUES.md],
    }),
    
    // Full width
    ...(customFullWidth && {
      width: '100%',
    }),
    
    // Full height
    ...(customFullHeight && {
      height: '100%',
    }),
    
    // Clickable styles
    ...(customClickable && {
      cursor: 'pointer',
      transition: theme.transitions.create(
        ['background-color', 'box-shadow', 'transform'],
        {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeInOut,
        }
      ),
      
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'translateY(-1px)',
        boxShadow: theme.shadows[4],
      },
      
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: theme.shadows[2],
      },
      
      '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '2px',
      },
    }),
  };
});

// Specialized Box components for common patterns
/**
 * FlexBox component
 * 
 * @returns JSX element
 */
export const FlexBox = styled(StyledBox)<any>(() => ({
  display: 'flex',
}));

/**
 * FlexCenterBox component
 * 
 * @returns JSX element
 */
export const FlexCenterBox = styled(FlexBox)<any>(() => ({
  alignItems: 'center',
  justifyContent: 'center',
}));

/**
 * FlexBetweenBox component
 * 
 * @returns JSX element
 */
export const FlexBetweenBox = styled(FlexBox)<any>(() => ({
  alignItems: 'center',
  justifyContent: 'space-between',
}));

/**
 * FlexColumnBox component
 * 
 * @returns JSX element
 */
export const FlexColumnBox = styled(FlexBox)<any>(() => ({
  flexDirection: 'column',
}));

/**
 * GridBox component
 * 
 * @returns JSX element
 */
export const GridBox = styled(StyledBox)<any>(() => ({
  display: 'grid',
}));

/**
 * GridCenterBox component
 * 
 * @returns JSX element
 */
export const GridCenterBox = styled(GridBox)<any>(() => ({
  placeItems: 'center',
}));

/**
 * CardBox component
 * 
 * @returns JSX element
 */
export const CardBox = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    padding: theme.spacing(3),
    borderRadius: BOX_BORDER_RADIUS.md,
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
  };
});

/**
 * HeroBox component
 * 
 * @returns JSX element
 */
export const HeroBox = styled(FlexCenterBox)<any>((props: any) => {
  const { theme } = props;
  return {
    minHeight: '50vh',
    padding: theme.spacing(6),
    textAlign: 'center',
    flexDirection: 'column',
    
    [theme.breakpoints.down('md')]: {
      minHeight: '40vh',
      padding: theme.spacing(4),
    },
  };
});

/**
 * SectionBox component
 * 
 * @returns JSX element
 */
export const SectionBox = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(12),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  };
});

/**
 * ContainerBox component
 * 
 * @returns JSX element
 */
export const ContainerBox = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    maxWidth: theme.breakpoints.values.lg,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  };
});

/**
 * SidebarBox component
 * 
 * @returns JSX element
 */
export const SidebarBox = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    width: 250,
    height: '100vh',
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    overflowY: 'auto',
    
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 'auto',
      borderRight: 'none',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  };
});

/**
 * OverlayBox component
 * 
 * @returns JSX element
 */
export const OverlayBox = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.modal,
  };
});

/**
 * AspectRatioBox component
 * 
 * @returns JSX element
 */
export const AspectRatioBox = styled(StyledBox, {
  shouldForwardProp: (prop) => !['aspectRatio'].includes(prop as string),
})<{ aspectRatio?: number }>((props: any) => {
  const { aspectRatio = 16 / 9 } = props;
  const paddingTop = `${(1 / aspectRatio) * 100}%`;
  
  return {
    position: 'relative',
    overflow: 'hidden',
    
    '&::before': {
      content: '""',
      display: 'block',
      paddingTop,
    },
    
    '& > *': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  };
});

/**
 * StickyBox component
 * 
 * @returns JSX element
 */
export const StickyBox = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  };
});

/**
 * ScrollableBox component
 * 
 * @returns JSX element
 */
export const ScrollableBox = styled(StyledBox)<any>(() => ({
  overflow: 'auto',
  
  // Custom scrollbar styling
  '&::-webkit-scrollbar': {
    width: 8,
    height: 8,
  },
  
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
}));

/**
 * ClickableBox component
 * 
 * @returns JSX element
 */
export const ClickableBox = styled(StyledBox)<any>((props: any) => {
  const { theme } = props;
  return {
    cursor: 'pointer',
    transition: theme.transitions.create(
      ['background-color', 'box-shadow', 'transform'],
      {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
      }
    ),
    
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[4],
    },
    
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: theme.shadows[2],
    },
    
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },
  };
});