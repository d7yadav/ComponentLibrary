import { styled, keyframes } from '@mui/material/styles';
import { Box, Backdrop } from '@mui/material';
import { 
  LOADING_SIZE_CONFIGS, 
  LOADING_ANIMATION_DURATIONS,
  LOADING_ANIMATION_EASINGS,
  LOADING_DOT_COUNTS,
  SKELETON_DEFAULTS 
} from './Loading.constants';

// Animation keyframes
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -6px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -3px, 0);
  }
  90% {
    transform: translate3d(0, -1px, 0);
  }
`;

const wave = keyframes`
  0%, 60%, 100% {
    transform: initial;
  }
  30% {
    transform: translateY(-8px);
  }
`;

const ripple = keyframes`
  0% {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

const bars = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
`;

const skeletonPulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const skeletonWave = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

// Main loading container
/**
 * LoadingContainer component
 * 
 * @returns JSX element
 */
export const LoadingContainer = styled(Box, {
  shouldForwardProp: (prop) => !['customVariant', 'customCentered', 'customFullWidth', 'customFullHeight', 'customMinHeight', 'customZIndex'].includes(prop as string),
})<any>((props: any) => {
  const { 
    customVariant = 'default',
    customCentered,
    customFullWidth,
    customFullHeight,
    customMinHeight,
    customZIndex
  } = props;
  
  return {
    // Base styling
    display: 'flex',
    alignItems: customCentered ? 'center' : 'flex-start',
    justifyContent: customCentered ? 'center' : 'flex-start',
    flexDirection: 'column',
    gap: 8,
    
    // Size constraints
    ...(customFullWidth && {
      width: '100%',
    }),
    
    ...(customFullHeight && {
      height: '100%',
    }),
    
    ...(customMinHeight && {
      minHeight: typeof customMinHeight === 'number' ? `${customMinHeight}px` : customMinHeight,
    }),
    
    // Variant-specific styling
    ...(customVariant === 'overlay' && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: customZIndex,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    
    ...(customVariant === 'inline' && {
      position: 'relative',
      display: 'inline-flex',
    }),
    
    ...(customVariant === 'button' && {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 'auto',
      minHeight: 'auto',
    }),
    
    ...(customVariant === 'page' && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: customZIndex,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    }),
  };
});

// Loading backdrop
/**
 * LoadingBackdrop component
 * 
 * @returns JSX element
 */
export const LoadingBackdrop = styled(Backdrop, {
  shouldForwardProp: (prop) => !['customOpacity', 'customZIndex'].includes(prop as string),
})<{ customOpacity?: number; customZIndex?: number }>((props: any) => {
  const { customOpacity = 0.5, customZIndex } = props;
  
  return {
    backgroundColor: `rgba(0, 0, 0, ${customOpacity})`,
    ...(customZIndex && {
      zIndex: customZIndex,
    }),
  };
});

// Spinner components
/**
 * CircularSpinner component
 * 
 * @returns JSX element
 */
export const CircularSpinner = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props: any) => {
  const { theme, customSize = 32, customColor, customSpeed = 1 } = props;
  
  return {
    width: customSize,
    height: customSize,
    border: `${Math.max(2, customSize / 16)}px solid`,
    borderColor: `${customColor || theme.palette.primary.main} transparent ${customColor || theme.palette.primary.main} transparent`,
    borderRadius: '50%',
    animation: `${spin} ${LOADING_ANIMATION_DURATIONS.circular / customSpeed}ms ${LOADING_ANIMATION_EASINGS.linear} infinite`,
  };
});

/**
 * DotsSpinner component
 * 
 * @returns JSX element
 */
export const DotsSpinner = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props: any) => {
  const { theme, customSize = 24, customColor, customSpeed = 1 } = props;
  const dotSize = customSize / 4;
  
  return {
    display: 'flex',
    alignItems: 'center',
    gap: dotSize / 2,
    
    '& .dot': {
      width: dotSize,
      height: dotSize,
      backgroundColor: customColor || theme.palette.primary.main,
      borderRadius: '50%',
      animation: `${bounce} ${LOADING_ANIMATION_DURATIONS.dots / customSpeed}ms ${LOADING_ANIMATION_EASINGS.bounce} infinite`,
      
      '&:nth-of-type(1)': {
        animationDelay: '0ms',
      },
      '&:nth-of-type(2)': {
        animationDelay: `${160 / customSpeed}ms`,
      },
      '&:nth-of-type(3)': {
        animationDelay: `${320 / customSpeed}ms`,
      },
    },
  };
});

/**
 * BarsSpinner component
 * 
 * @returns JSX element
 */
export const BarsSpinner = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props: any) => {
  const { theme, customSize = 32, customColor, customSpeed = 1 } = props;
  const barWidth = customSize / 6;
  
  return {
    display: 'flex',
    alignItems: 'center',
    gap: barWidth / 2,
    height: customSize,
    
    '& .bar': {
      width: barWidth,
      height: '100%',
      backgroundColor: customColor || theme.palette.primary.main,
      animation: `${bars} ${LOADING_ANIMATION_DURATIONS.bars / customSpeed}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
      transformOrigin: 'bottom',
      
      '&:nth-of-type(1)': {
        animationDelay: '0ms',
      },
      '&:nth-of-type(2)': {
        animationDelay: `${100 / customSpeed}ms`,
      },
      '&:nth-of-type(3)': {
        animationDelay: `${200 / customSpeed}ms`,
      },
      '&:nth-of-type(4)': {
        animationDelay: `${300 / customSpeed}ms`,
      },
    },
  };
});

/**
 * PulseSpinner component
 * 
 * @returns JSX element
 */
export const PulseSpinner = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props: any) => {
  const { theme, customSize = 40, customColor, customSpeed = 1 } = props;
  
  return {
    width: customSize,
    height: customSize,
    backgroundColor: customColor || theme.palette.primary.main,
    borderRadius: '50%',
    animation: `${pulse} ${LOADING_ANIMATION_DURATIONS.pulse / customSpeed}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
  };
});

/**
 * RingSpinner component
 * 
 * @returns JSX element
 */
export const RingSpinner = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props: any) => {
  const { theme, customSize = 40, customColor, customSpeed = 1 } = props;
  
  return {
    width: customSize,
    height: customSize,
    border: `${Math.max(2, customSize / 20)}px solid ${theme.palette.action.disabled}`,
    borderTop: `${Math.max(2, customSize / 20)}px solid ${customColor || theme.palette.primary.main}`,
    borderRadius: '50%',
    animation: `${spin} ${LOADING_ANIMATION_DURATIONS.ring / customSpeed}ms ${LOADING_ANIMATION_EASINGS.linear} infinite`,
  };
});

/**
 * WaveSpinner component
 * 
 * @returns JSX element
 */
export const WaveSpinner = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props: any) => {
  const { theme, customSize = 32, customColor, customSpeed = 1 } = props;
  const barWidth = customSize / 8;
  
  return {
    display: 'flex',
    alignItems: 'center',
    gap: barWidth / 2,
    height: customSize,
    
    '& .wave-bar': {
      width: barWidth,
      height: customSize / 2,
      backgroundColor: customColor || theme.palette.primary.main,
      animation: `${wave} ${LOADING_ANIMATION_DURATIONS.wave / customSpeed}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
      
      '&:nth-of-type(1)': {
        animationDelay: '0ms',
      },
      '&:nth-of-type(2)': {
        animationDelay: `${100 / customSpeed}ms`,
      },
      '&:nth-of-type(3)': {
        animationDelay: `${200 / customSpeed}ms`,
      },
      '&:nth-of-type(4)': {
        animationDelay: `${300 / customSpeed}ms`,
      },
      '&:nth-of-type(5)': {
        animationDelay: `${400 / customSpeed}ms`,
      },
    },
  };
});

/**
 * RippleSpinner component
 * 
 * @returns JSX element
 */
export const RippleSpinner = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props: any) => {
  const { theme, customSize = 48, customColor, customSpeed = 1 } = props;
  
  return {
    position: 'relative',
    width: customSize,
    height: customSize,
    
    '& .ripple': {
      position: 'absolute',
      border: `2px solid ${customColor || theme.palette.primary.main}`,
      borderRadius: '50%',
      animation: `${ripple} ${LOADING_ANIMATION_DURATIONS.ripple / customSpeed}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
      
      '&:nth-of-type(1)': {
        animationDelay: '0ms',
      },
      '&:nth-of-type(2)': {
        animationDelay: `${600 / customSpeed}ms`,
      },
    },
  };
});

// Loading message
/**
 * LoadingMessage component
 * 
 * @returns JSX element
 */
export const LoadingMessage = styled(Box)<any>((props: any) => {
  const { theme, customSize = 'medium' } = props;
  const sizeConfig = LOADING_SIZE_CONFIGS[customSize as keyof typeof LOADING_SIZE_CONFIGS];
  
  return {
    fontSize: sizeConfig.fontSize,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
  };
});

// Skeleton components
/**
 * SkeletonBase component
 * 
 * @returns JSX element
 */
export const SkeletonBase = styled(Box, {
  shouldForwardProp: (prop) => !['customAnimation'].includes(prop as string),
})<{ customAnimation?: boolean | 'pulse' | 'wave' }>((props: any) => {
  const { theme, customAnimation = 'pulse' } = props;
  
  return {
    backgroundColor: theme.palette.action.hover,
    
    // Animation
    ...(customAnimation === 'pulse' && {
      animation: `${skeletonPulse} ${LOADING_ANIMATION_DURATIONS.skeleton}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
    }),
    
    ...(customAnimation === 'wave' && {
      position: 'relative',
      overflow: 'hidden',
      
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transform: 'translateX(-100%)',
        background: `linear-gradient(90deg, transparent, ${theme.palette.action.selected}, transparent)`,
        animation: `${skeletonWave} ${LOADING_ANIMATION_DURATIONS.skeleton}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
      },
    }),
  };
});

/**
 * SkeletonText component
 * 
 * @returns JSX element
 */
export const SkeletonText = styled(SkeletonBase)<{ lines?: number }>((props: any) => {
  const { theme, lines = 1 } = props;
  
  if (lines === 1) {
    return {
      height: SKELETON_DEFAULTS.textHeight,
      borderRadius: theme.spacing(0.5),
    };
  }
  
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: SKELETON_DEFAULTS.lineSpacing,
    
    '&::before': {
      content: '""',
      display: 'block',
      height: SKELETON_DEFAULTS.textHeight,
      borderRadius: theme.spacing(0.5),
      backgroundColor: 'inherit',
    },
    
    // Generate additional lines
    ...Array.from({ length: lines - 1 }, (_, i) => ({
      [`&::after${i > 0 ? `, &::before:nth-child(${i + 2})` : ''}`]: {
        content: '""',
        display: 'block',
        height: SKELETON_DEFAULTS.textHeight,
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'inherit',
        width: i === lines - 2 ? '60%' : '100%', // Last line is shorter
      },
    })),
  };
});

/**
 * SkeletonRectangular component
 * 
 * @returns JSX element
 */
export const SkeletonRectangular = styled(SkeletonBase)((props: any) => {
  const { theme } = props;
  return {
    height: SKELETON_DEFAULTS.rectangularHeight,
    borderRadius: theme.spacing(1),
  };
});

/**
 * SkeletonCircular component
 * 
 * @returns JSX element
 */
export const SkeletonCircular = styled(SkeletonBase)(() => ({
  width: SKELETON_DEFAULTS.circularSize,
  height: SKELETON_DEFAULTS.circularSize,
  borderRadius: '50%',
}));