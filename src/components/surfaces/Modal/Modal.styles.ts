import { styled, keyframes } from '@mui/material/styles';
import { Modal as MuiModal, Box, Paper, IconButton } from '@mui/material';
import { ModalStyleProps, ModalContentStyleProps, ModalVariant, ModalPosition, ModalSize, ModalAnimation } from './Modal.types';
import { 
  MODAL_SIZE_CONFIGS, 
  ANIMATION_DURATIONS, 
  ANIMATION_EASINGS, 
  BACKDROP_CONFIGS,
  Z_INDEX_LEVELS,
  POSITION_CONFIGS,
  DRAWER_CONFIGS,
  MOBILE_BREAKPOINT,
} from './Modal.constants';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideInFromTop = keyframes`
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translate(-100%, -50%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translate(0%, -50%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const zoomIn = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

const drawerSlideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Helper function to get animation based on type and position
const getAnimation = (animation: string, position: string, isOpen: boolean) => {
  if (!isOpen) return 'none';
  
  switch (animation) {
    case 'fade':
      return `${fadeIn} ${ANIMATION_DURATIONS.normal}ms ${ANIMATION_EASINGS.easeInOut}`;
    case 'slide':
      if (position === 'top') return `${slideInFromTop} ${ANIMATION_DURATIONS.normal}ms ${ANIMATION_EASINGS.easeOut}`;
      if (position === 'bottom') return `${slideInFromBottom} ${ANIMATION_DURATIONS.normal}ms ${ANIMATION_EASINGS.easeOut}`;
      if (position === 'left') return `${slideInFromLeft} ${ANIMATION_DURATIONS.normal}ms ${ANIMATION_EASINGS.easeOut}`;
      if (position === 'right') return `${slideInFromRight} ${ANIMATION_DURATIONS.normal}ms ${ANIMATION_EASINGS.easeOut}`;
      return `${slideInFromTop} ${ANIMATION_DURATIONS.normal}ms ${ANIMATION_EASINGS.easeOut}`;
    case 'zoom':
      return `${zoomIn} ${ANIMATION_DURATIONS.normal}ms ${ANIMATION_EASINGS.spring}`;
    case 'scale':
      return `${scaleIn} ${ANIMATION_DURATIONS.normal}ms ${ANIMATION_EASINGS.bounce}`;
    case 'drawer':
      return `${drawerSlideIn} ${ANIMATION_DURATIONS.drawer}ms ${ANIMATION_EASINGS.easeOut}`;
    default:
      return 'none';
  }
};

// Helper function to get position styles
const getPositionStyles = (position: string, customPosition?: any) => {
  if (position === 'custom' && customPosition) {
    return customPosition;
  }
  return POSITION_CONFIGS[position as keyof typeof POSITION_CONFIGS] || POSITION_CONFIGS.center;
};

// Helper function to get z-index
const getZIndex = (variant: string) => {
  switch (variant) {
    case 'fullscreen':
      return Z_INDEX_LEVELS.fullscreen;
    case 'drawer':
      return Z_INDEX_LEVELS.drawer;
    case 'popover':
      return Z_INDEX_LEVELS.popover;
    default:
      return Z_INDEX_LEVELS.modal;
  }
};

/**
 * Styled Modal container component
 */
export const StyledModal = styled(MuiModal, {
  shouldForwardProp: (prop) => 
    !['variant', 'backdrop', 'animationDuration'].includes(prop as string),
})<{
  variant: string;
  backdrop: string;
  animationDuration: number;
}>(({ theme, variant, backdrop, animationDuration }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: getZIndex(variant),

  // Backdrop styles
  '& .MuiModal-backdrop': {
    ...BACKDROP_CONFIGS[backdrop as keyof typeof BACKDROP_CONFIGS],
    transition: `all ${animationDuration}ms ${ANIMATION_EASINGS.easeInOut}`,
  },

  // Focus management
  '&:focus': {
    outline: 'none',
  },
}));

/**
 * Styled Modal content container
 */
export const StyledModalContainer = styled(Box, {
  shouldForwardProp: (prop) => 
    !['modalVariant', 'modalPosition', 'modalSize', 'modalAnimation', 'isOpen', 'mobileFullscreen', 'customPosition', 'modalMaxWidth', 'modalMaxHeight', 'animationDuration'].includes(prop as string),
})<{
  modalVariant: ModalVariant;
  modalPosition: ModalPosition;
  modalSize: ModalSize;
  modalAnimation: ModalAnimation;
  isOpen: boolean;
  mobileFullscreen: boolean;
  customPosition?: any;
  modalMaxWidth?: string | number;
  modalMaxHeight?: string | number;
  animationDuration: number;
}>(({ 
  theme, 
  modalVariant, 
  modalPosition, 
  modalSize, 
  modalAnimation, 
  isOpen, 
  mobileFullscreen, 
  customPosition,
  modalMaxWidth,
  modalMaxHeight,
  animationDuration,
}) => {
  const sizeConfig = MODAL_SIZE_CONFIGS[modalSize as keyof typeof MODAL_SIZE_CONFIGS];
  const positionStyles = getPositionStyles(modalPosition, customPosition);
  
  return {
    position: 'absolute',
    outline: 'none',
    animation: getAnimation(modalAnimation, modalPosition, isOpen),
    maxWidth: modalMaxWidth || sizeConfig.maxWidth,
    maxHeight: modalMaxHeight || sizeConfig.minHeight,
    width: modalVariant === 'fullscreen' || modalSize === 'fullscreen' ? '100vw' : 'auto',
    height: modalVariant === 'fullscreen' || modalSize === 'fullscreen' ? '100vh' : 'auto',
    
    // Position styles
    ...positionStyles,
    
    // Drawer-specific styles
    ...(modalVariant === 'drawer' && {
      position: 'fixed',
      ...DRAWER_CONFIGS[modalPosition as keyof typeof DRAWER_CONFIGS],
      transform: isOpen 
        ? DRAWER_CONFIGS[modalPosition as keyof typeof DRAWER_CONFIGS]?.transformOpen || 'none'
        : DRAWER_CONFIGS[modalPosition as keyof typeof DRAWER_CONFIGS]?.transform || 'none',
      transition: `transform ${animationDuration}ms ${ANIMATION_EASINGS.easeOut}`,
    }),
    
    // Mobile responsiveness
    [theme.breakpoints.down('md')]: {
      ...(mobileFullscreen && {
        width: '100vw !important',
        height: '100vh !important',
        maxWidth: '100vw !important',
        maxHeight: '100vh !important',
        top: '0 !important',
        left: '0 !important',
        right: '0 !important',
        bottom: '0 !important',
        transform: 'none !important',
        borderRadius: '0 !important',
      }),
    },
    
    // Focus styles
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },
  };
});

/**
 * Styled Modal content paper
 */
export const StyledModalContent = styled(Paper, {
  shouldForwardProp: (prop) => 
    !['modalVariant', 'modalSize', 'customElevation', 'hasHeader', 'hasFooter', 'mobileFullscreen'].includes(prop as string),
})<{
  modalVariant: ModalVariant;
  modalSize: ModalSize;
  customElevation?: boolean;
  hasHeader: boolean;
  hasFooter: boolean;
  mobileFullscreen: boolean;
}>(({ 
  theme, 
  modalVariant, 
  modalSize, 
  customElevation, 
  hasHeader, 
  hasFooter, 
  mobileFullscreen 
}) => {
  const sizeConfig = MODAL_SIZE_CONFIGS[modalSize as keyof typeof MODAL_SIZE_CONFIGS];
  
  return {
    position: 'relative',
    width: '100%',
    height: modalVariant === 'fullscreen' || modalSize === 'fullscreen' ? '100%' : 'auto',
    minHeight: modalVariant === 'fullscreen' || modalSize === 'fullscreen' ? '100vh' : sizeConfig.minHeight,
    padding: modalVariant === 'fullscreen' || modalSize === 'fullscreen' ? 0 : sizeConfig.padding,
    borderRadius: modalVariant === 'fullscreen' || modalSize === 'fullscreen' ? 0 : ((theme.shape?.borderRadius as number) || 4) * 2,
    backgroundColor: theme.palette.background.paper,
    boxShadow: customElevation ? theme.shadows[8] : 'none',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    
    // Glass morphism for glass variant
    ...(modalVariant === 'centered' && {
      backdropFilter: 'blur(20px)',
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(18, 18, 18, 0.9)' 
        : 'rgba(255, 255, 255, 0.9)',
      border: `1px solid ${theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.1)'}`,
    }),
    
    // Drawer styles
    ...(modalVariant === 'drawer' && {
      borderRadius: 0,
      height: '100%',
    }),
    
    // Popover styles
    ...(modalVariant === 'popover' && {
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
      minHeight: 'auto',
    }),
    
    // Mobile responsiveness
    [theme.breakpoints.down('md')]: {
      ...(mobileFullscreen && {
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        borderRadius: 0,
        padding: modalSize === 'fullscreen' ? 0 : theme.spacing(2),
      }),
    },
  };
});

/**
 * Styled Modal header
 */
export const StyledModalHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: '64px',
  
  '& .modal-title': {
    margin: 0,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    color: theme.palette.text.primary,
    flex: 1,
  },
}));

/**
 * Styled Modal body
 */
export const StyledModalBody = styled(Box, {
  shouldForwardProp: (prop) => !['hasHeader', 'hasFooter'].includes(prop as string),
})<{ hasHeader: boolean; hasFooter: boolean }>(({ theme, hasHeader, hasFooter }) => ({
  flex: 1,
  padding: theme.spacing(3),
  overflow: 'auto',
  
  // Adjust padding if no header/footer
  ...(!hasHeader && {
    paddingTop: theme.spacing(4),
  }),
  ...(!hasFooter && {
    paddingBottom: theme.spacing(4),
  }),
}));

/**
 * Styled Modal footer
 */
export const StyledModalFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  minHeight: '64px',
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.02)' 
    : 'rgba(0, 0, 0, 0.02)',
}));

/**
 * Styled close button
 */
export const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
  },
  
  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

/**
 * Loading spinner keyframes for consistency
 */
export const loadingSpinKeyframes = `
  @keyframes modal-loading-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;