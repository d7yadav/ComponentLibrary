import { LinearProgress as MuiLinearProgress, CircularProgress as MuiCircularProgress, Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import React from 'react';

import { 
  PROGRESS_SIZE_CONFIGS, 
  PROGRESS_ANIMATION_DURATIONS,
  PROGRESS_ANIMATION_EASINGS,
  PROGRESS_STRIPE_PATTERNS,
  PROGRESS_TRACK_COLORS 
} from './Progress.constants';
// Animation keyframes
const stripeAnimation = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 0;
  }
`;

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

// Linear Progress Styles
export const StyledLinearProgress: React.ComponentType<any> = styled(MuiLinearProgress, {
  shouldForwardProp: (prop) => !['customSize', 'customHeight', 'customFullWidth', 'customRounded', 'customBorderRadius', 'customElevated', 'customElevation', 'customAnimated', 'customAnimationDuration', 'customStriped', 'customStripedAnimated', 'customBgcolor', 'customProgressColor'].includes(prop as string),
})<any>((props: any) => {
  const { 
    theme, 
    customSize = 'medium',
    customHeight,
    customFullWidth,
    customRounded,
    customBorderRadius,
    customElevated,
    customElevation,
    customAnimated,
    customAnimationDuration,
    customStriped,
    customStripedAnimated,
    customBgcolor,
    customProgressColor
  } = props;
  
  const sizeConfig = PROGRESS_SIZE_CONFIGS[customSize as keyof typeof PROGRESS_SIZE_CONFIGS];
  
  return {
    // Size configuration
    'height': customHeight || sizeConfig.height,
    
    // Full width
    ...(customFullWidth && {
      'width': '100%',
    }),
    
    // Border radius
    ...(customRounded && {
      'borderRadius': customBorderRadius 
        ? (typeof customBorderRadius === 'number' ? customBorderRadius : customBorderRadius)
        : sizeConfig.borderRadius,
      
      '& .MuiLinearProgress-bar': {
        'borderRadius': 'inherit',
      },
    }),
    
    // Elevation
    ...(customElevated && {
      'boxShadow': theme.shadows[customElevation || 2],
    }),
    
    // Custom background color
    ...(customBgcolor && {
      'backgroundColor': customBgcolor.includes('.') 
        ? theme.palette[customBgcolor.split('.')[0] as keyof typeof theme.palette]?.main || customBgcolor
        : customBgcolor,
    }),
    
    // Progress bar styling
    '& .MuiLinearProgress-bar': {
      // Custom progress color
      ...(customProgressColor && {
        'backgroundColor': customProgressColor.includes('.') 
          ? theme.palette[customProgressColor.split('.')[0] as keyof typeof theme.palette]?.main || customProgressColor
          : customProgressColor,
      }),
      
      // Animation
      ...(customAnimated && {
        'transition': `transform ${customAnimationDuration || PROGRESS_ANIMATION_DURATIONS.normal}ms ${PROGRESS_ANIMATION_EASINGS.easeInOut}`,
      }),
      
      // Striped pattern
      ...(customStriped && {
        'backgroundImage': `linear-gradient(
          ${PROGRESS_STRIPE_PATTERNS.angle}deg,
          rgba(255, 255, 255, 0.15) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.15) 50%,
          rgba(255, 255, 255, 0.15) 75%,
          transparent 75%,
          transparent
        )`,
        'backgroundSize': `${PROGRESS_STRIPE_PATTERNS.width * 2}px ${PROGRESS_STRIPE_PATTERNS.width}px`,
        
        // Animated stripes
        ...(customStripedAnimated && {
          'animation': `${stripeAnimation} 1s linear infinite`,
        }),
      }),
    },
    
    // Buffer bar styling for buffer variant
    '& .MuiLinearProgress-bar2Buffer': {
      'backgroundColor': 'rgba(255, 255, 255, 0.3)',
    },
    
    // Dash bar for buffer variant
    '& .MuiLinearProgress-dashed': {
      'animation': 'none', // Override default animation if needed
      
      '&::before': {
        'content': '""',
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'bottom': 0,
        'right': 0,
        'backgroundImage': 'radial-gradient(rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 16%, transparent 42%)',
        'backgroundSize': '10px 10px',
        'backgroundPosition': '0 -23px',
      },
    },
  };
});

// Circular Progress Styles
export const StyledCircularProgress: React.ComponentType<any> = styled(MuiCircularProgress, {
  shouldForwardProp: (prop) => !['customSize', 'customShowTrack', 'customTrackColor', 'customRounded', 'customStrokeWidth', 'customAnimated', 'customAnimationDuration', 'customProgressColor'].includes(prop as string),
})<any>((props: any) => {
  const { 
    theme, 
    customSize = 'medium',
    customShowTrack,
    customTrackColor,
    customRounded,
    customStrokeWidth,
    customAnimated,
    customAnimationDuration,
    customProgressColor
  } = props;
  
  const sizeConfig = PROGRESS_SIZE_CONFIGS[customSize as keyof typeof PROGRESS_SIZE_CONFIGS];
  
  return {
    // Size
    'width': sizeConfig.circularSize,
    'height': sizeConfig.circularSize,
    
    // Custom progress color
    ...(customProgressColor && {
      'color': customProgressColor.includes('.') 
        ? theme.palette[customProgressColor.split('.')[0] as keyof typeof theme.palette]?.main || customProgressColor
        : customProgressColor,
    }),
    
    // Animation
    ...(customAnimated && {
      'transition': `transform ${customAnimationDuration || PROGRESS_ANIMATION_DURATIONS.normal}ms ${PROGRESS_ANIMATION_EASINGS.easeInOut}`,
    }),
    
    // Track styling
    ...(customShowTrack && {
      'position': 'relative',
      
      '&::before': {
        'content': '""',
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'width': '100%',
        'height': '100%',
        'borderRadius': '50%',
        'border': `${customStrokeWidth || sizeConfig.strokeWidth}px solid ${customTrackColor || PROGRESS_TRACK_COLORS.light}`,
        'zIndex': -1,
      },
    }),
    
    // SVG styling
    '& .MuiCircularProgress-svg': {
      'display': 'block',
      
      // Rounded line caps
      ...(customRounded && {
        '& .MuiCircularProgress-circle': {
          'strokeLinecap': 'round',
        },
      }),
    },
    
    // Circle styling
    '& .MuiCircularProgress-circle': {
      'strokeWidth': customStrokeWidth || sizeConfig.strokeWidth,
      
      // Animation for determinate variant
      '&.MuiCircularProgress-circleDeterminate': {
        'transition': `stroke-dashoffset ${customAnimationDuration || PROGRESS_ANIMATION_DURATIONS.normal}ms ${PROGRESS_ANIMATION_EASINGS.easeInOut}`,
      },
    },
  };
});

// Progress container with label
export const ProgressContainer: React.ComponentType<any> = styled(Box)<any>((props: any) => {
  const { theme, customCentered } = props;
  return {
    'position': 'relative',
    'display': customCentered ? 'flex' : 'block',
    'alignItems': customCentered ? 'center' : 'flex-start',
    'justifyContent': customCentered ? 'center' : 'flex-start',
    'flexDirection': customCentered ? 'column' : 'row',
    gap: theme.spacing(1),
  };
});

// Progress label
export const ProgressLabel: React.ComponentType<any> = styled(Box)<any>((props: any) => {
  const { theme, customSize = 'medium' } = props;
  const sizeConfig = PROGRESS_SIZE_CONFIGS[customSize as keyof typeof PROGRESS_SIZE_CONFIGS];
  
  return {
    'fontSize': sizeConfig.fontSize,
    'fontWeight': theme.typography.fontWeightMedium,
    'color': theme.palette.text.primary,
    'minWidth': 0, // Allow text to wrap
    
    '&.progress-label-top': {
      'marginBottom': theme.spacing(1),
    },
    
    '&.progress-label-bottom': {
      'marginTop': theme.spacing(1),
    },
    
    '&.progress-label-center': {
      'position': 'absolute',
      'top': '50%',
      'left': '50%',
      'transform': 'translate(-50%, -50%)',
      'textAlign': 'center',
      'zIndex': 1,
    },
  };
});

// Progress value display
export const ProgressValue: React.ComponentType<any> = styled(Box)<any>((props: any) => {
  const { theme, customSize = 'medium' } = props;
  const sizeConfig = PROGRESS_SIZE_CONFIGS[customSize as keyof typeof PROGRESS_SIZE_CONFIGS];
  
  return {
    'fontSize': sizeConfig.fontSize,
    'fontWeight': theme.typography.fontWeightMedium,
    'color': theme.palette.text.secondary,
    'minWidth': '3ch', // Reserve space for percentage
    'textAlign': 'right',
    
    '&.progress-value-center': {
      'position': 'absolute',
      'top': '50%',
      'left': '50%',
      'transform': 'translate(-50%, -50%)',
      'textAlign': 'center',
      'zIndex': 1,
      'color': theme.palette.text.primary,
    },
  };
});

// Specialized progress components
export const LoadingProgress: React.ComponentType<any> = styled(StyledLinearProgress)<any>(() => ({
  '& .MuiLinearProgress-bar': {
    'animation': `${shimmer} 2s ease-in-out infinite`,
  },
}));

export const PulsingProgress: React.ComponentType<any> = styled(StyledCircularProgress)<any>(() => ({
  'animation': `${pulse} 2s ease-in-out infinite`,
}));

export const StripedProgress: React.ComponentType<any> = styled(StyledLinearProgress)<any>(() => ({
  '& .MuiLinearProgress-bar': {
    'backgroundImage': `linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    )`,
    'backgroundSize': '16px 16px',
    'animation': `${stripeAnimation} 1s linear infinite`,
  },
}));

// Thin progress bar for minimal UI
export const ThinProgress: React.ComponentType<any> = styled(StyledLinearProgress)<any>(() => ({
  'height': 2,
  
  '& .MuiLinearProgress-bar': {
    'borderRadius': 1,
  },
}));

// Thick progress bar for emphasis
export const ThickProgress: React.ComponentType<any> = styled(StyledLinearProgress)<any>((props: any) => {
  const { theme } = props;
  return {
    'height': 12,
    'borderRadius': 6,
    
    '& .MuiLinearProgress-bar': {
      'borderRadius': 6,
    },
  };
});

// Gradient progress bar
export const GradientProgress: React.ComponentType<any> = styled(StyledLinearProgress)<any>((props: any) => {
  const { theme } = props;
  return {
    '& .MuiLinearProgress-bar': {
      'background': `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
  };
});

// Mini circular progress for inline use
export const MiniCircularProgress: React.ComponentType<any> = styled(StyledCircularProgress)<any>(() => ({
  'width': 16,
  'height': 16,
  
  '& .MuiCircularProgress-circle': {
    strokeWidth: 3,
  },
}));

// Large circular progress for prominent display
export const LargeCircularProgress: React.ComponentType<any> = styled(StyledCircularProgress)<any>(() => ({
  'width': 80,
  'height': 80,
  
  '& .MuiCircularProgress-circle': {
    strokeWidth: 2,
  },
}));