import { Box, Backdrop, type BackdropProps } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import React from 'react';

import {
  LOADING_SIZE_CONFIGS,
  LOADING_ANIMATION_DURATIONS,
  LOADING_ANIMATION_EASINGS,
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

/**
 * Custom props for LoadingContainer, extending Box props.
 */
export interface LoadingContainerProps {
  customVariant?: string;
  customCentered?: boolean;
  customFullWidth?: boolean;
  customFullHeight?: boolean;
  customMinHeight?: number | string;
  customZIndex?: number;
}

/**
 * Main loading container styled component.
 * Applies layout and variant-specific styles for loading overlays, inline spinners, etc.
 * @author dilip.yadav@shorelineiot.com
 */
export const LoadingContainer: React.ComponentType<LoadingContainerProps> = styled(Box, {
  shouldForwardProp: (prop) => !['customVariant', 'customCentered', 'customFullWidth', 'customFullHeight', 'customMinHeight', 'customZIndex'].includes(prop as string),
})<LoadingContainerProps>((props) => {
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
    'display': 'flex',
    'alignItems': customCentered ? 'center' : 'flex-start',
    'justifyContent': customCentered ? 'center' : 'flex-start',
    'flexDirection': 'column',
    gap: 8,
    
    // Size constraints
    ...(customFullWidth && {
      'width': '100%',
    }),
    
    ...(customFullHeight && {
      'height': '100%',
    }),
    
    ...(customMinHeight && {
      'minHeight': typeof customMinHeight === 'number' ? `${customMinHeight}px` : customMinHeight,
    }),
    
    // Variant-specific styling
    ...(customVariant === 'overlay' && {
      'position': 'fixed',
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'zIndex': customZIndex,
      'alignItems': 'center',
      'justifyContent': 'center',
    }),
    
    ...(customVariant === 'inline' && {
      'position': 'relative',
      'display': 'inline-flex',
    }),
    
    ...(customVariant === 'button' && {
      'display': 'inline-flex',
      'alignItems': 'center',
      'justifyContent': 'center',
      'minWidth': 'auto',
      'minHeight': 'auto',
    }),
    
    ...(customVariant === 'page' && {
      'position': 'fixed',
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'zIndex': customZIndex,
      'alignItems': 'center',
      'justifyContent': 'center',
      'backgroundColor': 'rgba(255, 255, 255, 0.8)',
    }),
  };
});

/**
 * Loading backdrop styled component.
 * Used for overlay loading states with custom opacity and z-index.
 * @author dilip.yadav@shorelineiot.com
 */
export const LoadingBackdrop: React.ComponentType<BackdropProps & { customOpacity?: number; customZIndex?: number }> = styled(Backdrop, {
  shouldForwardProp: (prop) => !['customOpacity', 'customZIndex'].includes(prop as string),
})<{ customOpacity?: number; customZIndex?: number }>((props) => {
  const { customOpacity = 0.5, customZIndex } = props;
  
  return {
    'backgroundColor': `rgba(0, 0, 0, ${customOpacity})`,
    ...(customZIndex && {
      'zIndex': customZIndex,
    }),
  };
});

/**
 * Circular spinner styled component for loading indication.
 * Accepts custom size, color, and speed.
 * @author dilip.yadav@shorelineiot.com
 */
export const CircularSpinner: React.ComponentType<{ customSize?: number; customColor?: string; customSpeed?: number }> = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props) => {
  const { theme, customSize = 32, customColor, customSpeed = 1 } = props;
  
  return {
    'width': customSize,
    'height': customSize,
    'border': `${Math.max(2, customSize / 16)}px solid`,
    'borderColor': `${customColor || theme.palette.primary.main} transparent ${customColor || theme.palette.primary.main} transparent`,
    'borderRadius': '50%',
    'animation': `${spin} ${LOADING_ANIMATION_DURATIONS.circular / customSpeed}ms ${LOADING_ANIMATION_EASINGS.linear} infinite`,
  };
});

/**
 * Dots spinner styled component for loading indication.
 * Accepts custom size, color, and speed.
 * @author dilip.yadav@shorelineiot.com
 */
export const DotsSpinner: React.ComponentType<{ customSize?: number; customColor?: string; customSpeed?: number }> = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props) => {
  const { theme, customSize = 24, customColor, customSpeed = 1 } = props;
  const dotSize = customSize / 4;
  
  return {
    'display': 'flex',
    'alignItems': 'center',
    gap: dotSize / 2,
    
    '& .dot': {
      'width': dotSize,
      'height': dotSize,
      'backgroundColor': customColor || theme.palette.primary.main,
      'borderRadius': '50%',
      'animation': `${bounce} ${LOADING_ANIMATION_DURATIONS.dots / customSpeed}ms ${LOADING_ANIMATION_EASINGS.bounce} infinite`,
      
      '&:nth-of-type(1)': {
        'animationDelay': '0ms',
      },
      '&:nth-of-type(2)': {
        'animationDelay': `${160 / customSpeed}ms`,
      },
      '&:nth-of-type(3)': {
        'animationDelay': `${320 / customSpeed}ms`,
      },
    },
  };
});

/**
 * Bars spinner styled component for loading indication.
 * Accepts custom size, color, and speed.
 * @author dilip.yadav@shorelineiot.com
 */
export const BarsSpinner: React.ComponentType<{ customSize?: number; customColor?: string; customSpeed?: number }> = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props) => {
  const { theme, customSize = 32, customColor, customSpeed = 1 } = props;
  const barWidth = customSize / 6;
  
  return {
    'display': 'flex',
    'alignItems': 'center',
    gap: barWidth / 2,
    'height': customSize,
    
    '& .bar': {
      'width': barWidth,
      'height': '100%',
      'backgroundColor': customColor || theme.palette.primary.main,
      'animation': `${bars} ${LOADING_ANIMATION_DURATIONS.bars / customSpeed}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
      'transformOrigin': 'bottom',
      
      '&:nth-of-type(1)': {
        'animationDelay': '0ms',
      },
      '&:nth-of-type(2)': {
        'animationDelay': `${100 / customSpeed}ms`,
      },
      '&:nth-of-type(3)': {
        'animationDelay': `${200 / customSpeed}ms`,
      },
      '&:nth-of-type(4)': {
        'animationDelay': `${300 / customSpeed}ms`,
      },
    },
  };
});

/**
 * Pulse spinner styled component for loading indication.
 * Accepts custom size, color, and speed.
 * @author dilip.yadav@shorelineiot.com
 */
export const PulseSpinner: React.ComponentType<{ customSize?: number; customColor?: string; customSpeed?: number }> = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props) => {
  const { theme, customSize = 40, customColor, customSpeed = 1 } = props;
  
  return {
    'width': customSize,
    'height': customSize,
    'backgroundColor': customColor || theme.palette.primary.main,
    'borderRadius': '50%',
    'animation': `${pulse} ${LOADING_ANIMATION_DURATIONS.pulse / customSpeed}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
  };
});

/**
 * Ring spinner styled component for loading indication.
 * Accepts custom size, color, and speed.
 * @author dilip.yadav@shorelineiot.com
 */
export const RingSpinner: React.ComponentType<{ customSize?: number; customColor?: string; customSpeed?: number }> = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props) => {
  const { theme, customSize = 40, customColor, customSpeed = 1 } = props;
  
  return {
    'width': customSize,
    'height': customSize,
    'border': `${Math.max(2, customSize / 20)}px solid ${theme.palette.action.disabled}`,
    'borderTop': `${Math.max(2, customSize / 20)}px solid ${customColor || theme.palette.primary.main}`,
    'borderRadius': '50%',
    'animation': `${spin} ${LOADING_ANIMATION_DURATIONS.ring / customSpeed}ms ${LOADING_ANIMATION_EASINGS.linear} infinite`,
  };
});

/**
 * Wave spinner styled component for loading indication.
 * Accepts custom size, color, and speed.
 * @author dilip.yadav@shorelineiot.com
 */
export const WaveSpinner: React.ComponentType<{ customSize?: number; customColor?: string; customSpeed?: number }> = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props) => {
  const { theme, customSize = 32, customColor, customSpeed = 1 } = props;
  const barWidth = customSize / 8;
  
  return {
    'display': 'flex',
    'alignItems': 'center',
    gap: barWidth / 2,
    'height': customSize,
    
    '& .wave-bar': {
      'width': barWidth,
      'height': customSize / 2,
      'backgroundColor': customColor || theme.palette.primary.main,
      'animation': `${wave} ${LOADING_ANIMATION_DURATIONS.wave / customSpeed}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
      
      '&:nth-of-type(1)': {
        'animationDelay': '0ms',
      },
      '&:nth-of-type(2)': {
        'animationDelay': `${100 / customSpeed}ms`,
      },
      '&:nth-of-type(3)': {
        'animationDelay': `${200 / customSpeed}ms`,
      },
      '&:nth-of-type(4)': {
        'animationDelay': `${300 / customSpeed}ms`,
      },
      '&:nth-of-type(5)': {
        'animationDelay': `${400 / customSpeed}ms`,
      },
    },
  };
});

/**
 * Ripple spinner styled component for loading indication.
 * Accepts custom size, color, and speed.
 * @author dilip.yadav@shorelineiot.com
 */
export const RippleSpinner: React.ComponentType<{ customSize?: number; customColor?: string; customSpeed?: number }> = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'customSpeed'].includes(prop as string),
})<{ customSize?: number; customColor?: string; customSpeed?: number }>((props) => {
  const { theme, customSize = 48, customColor, customSpeed = 1 } = props;
  
  return {
    'position': 'relative',
    'width': customSize,
    'height': customSize,
    
    '& .ripple': {
      'position': 'absolute',
      'border': `2px solid ${customColor || theme.palette.primary.main}`,
      'borderRadius': '50%',
      'animation': `${ripple} ${LOADING_ANIMATION_DURATIONS.ripple / customSpeed}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
      
      '&:nth-of-type(1)': {
        'animationDelay': '0ms',
      },
      '&:nth-of-type(2)': {
        'animationDelay': `${600 / customSpeed}ms`,
      },
    },
  };
});

// Loading message
export const LoadingMessage: React.ComponentType<{ customSize?: string }> = styled(Box)<{ customSize?: string }>((props) => {
  const { theme, customSize = 'medium' } = props;
  const sizeConfig = LOADING_SIZE_CONFIGS[customSize as keyof typeof LOADING_SIZE_CONFIGS];
  
  return {
    'fontSize': sizeConfig.fontSize,
    'color': theme.palette.text.secondary,
    'textAlign': 'center',
    'marginTop': theme.spacing(1),
    'fontWeight': theme.typography.fontWeightMedium,
  };
});

/**
 * Props for SkeletonBase, extending BoxProps and adding customAnimation.
 */
export interface SkeletonBaseProps {
  customAnimation?: boolean | 'pulse' | 'wave',
}

/**
 * Base skeleton styled component for loading placeholders.
 * Accepts customAnimation prop for animation type.
 */
export const SkeletonBase: React.ComponentType<SkeletonBaseProps> = styled(Box, {
  shouldForwardProp: (prop) => !['customAnimation'].includes(prop as string),
})<SkeletonBaseProps>((props) => {
  const { theme, customAnimation = 'pulse' } = props;
  
  return {
    'backgroundColor': theme.palette.action.hover,
    
    // Animation
    ...(customAnimation === 'pulse' && {
      'animation': `${skeletonPulse} ${LOADING_ANIMATION_DURATIONS.skeleton}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
    }),
    
    ...(customAnimation === 'wave' && {
      'position': 'relative',
      'overflow': 'hidden',
      
      '&::after': {
        'content': '""',
        'position': 'absolute',
        'top': 0,
        'right': 0,
        'bottom': 0,
        'left': 0,
        'transform': 'translateX(-100%)',
        'background': `linear-gradient(90deg, transparent, ${theme.palette.action.selected}, transparent)`,
        'animation': `${skeletonWave} ${LOADING_ANIMATION_DURATIONS.skeleton}ms ${LOADING_ANIMATION_EASINGS.easeInOut} infinite`,
      },
    }),
  };
});

/**
 * Props for SkeletonText, extending SkeletonBaseProps and adding lines.
 */
export interface SkeletonTextProps extends SkeletonBaseProps {
  lines?: number,
}

/**
 * Skeleton text styled component for text loading placeholders.
 * Accepts lines prop for number of lines.
 */
export const SkeletonText: React.ComponentType<SkeletonTextProps> = styled(SkeletonBase, {
  shouldForwardProp: (prop) => !['lines'].includes(prop as string),
})<SkeletonTextProps>((props) => {
  const { theme, lines = 1 } = props;
  
  if (lines === 1) {
    return {
      'height': SKELETON_DEFAULTS.textHeight,
      'borderRadius': theme.spacing(0.5),
    };
  }
  
  return {
    'display': 'flex',
    'flexDirection': 'column',
    gap: SKELETON_DEFAULTS.lineSpacing,
    
    '&::before': {
      'content': '""',
      'display': 'block',
      'height': SKELETON_DEFAULTS.textHeight,
      'borderRadius': theme.spacing(0.5),
      'backgroundColor': 'inherit',
    },
    
    // Generate additional lines - simplified for CSS-in-JS compatibility
    ...(lines > 1 && {
      '&::after': {
        'content': '""',
        'display': 'block',
        'height': SKELETON_DEFAULTS.textHeight,
        'borderRadius': theme.spacing(0.5),
        'backgroundColor': 'inherit',
        'width': '60%', // Last line is shorter
      },
    }),
  };
});

/**
 * Skeleton rectangular styled component for rectangular loading placeholders.
 */
export const SkeletonRectangular: React.ComponentType<SkeletonBaseProps> = styled(SkeletonBase)((props) => {
  const { theme } = props;
  return {
    'height': SKELETON_DEFAULTS.rectangularHeight,
    'borderRadius': theme.spacing(1),
  };
});

/**
 * Skeleton circular styled component for circular loading placeholders.
 */
export const SkeletonCircular: React.ComponentType<SkeletonBaseProps> = styled(SkeletonBase)(({ theme }) => ({
  'width': SKELETON_DEFAULTS.circularSize,
  'height': SKELETON_DEFAULTS.circularSize,
  'borderRadius': '50%',
  'backgroundColor': theme.palette.action.hover,
  'outline': `2px solid ${theme.palette.action.disabled}`,
  outlineOffset: '2px',
}));