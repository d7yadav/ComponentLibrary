import { SvgIcon } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import type React from 'react';

import { ICON_SIZE_MAP } from './Icon.constants';
import type { IconSize, IconColor } from './Icon.types';
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -1px, 0);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-2px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(2px);
  }
`;

const flash = keyframes`
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0.3;
  }
`;

const getIconSize = (size: IconSize): number => ICON_SIZE_MAP[size];
const getIconColor = (color: IconColor): string => {
  const colorMap = {
    inherit: 'inherit',
    primary: 'var(--color-primary-main)',
    secondary: 'var(--color-secondary-main)',
    tertiary: 'var(--color-tertiary-main)',
    quaternary: 'var(--color-quaternary-main)',
    success: 'var(--color-success-main)',
    warning: 'var(--color-warning-main)',
    error: 'var(--color-error-main)',
    info: 'var(--color-info-main)',
    disabled: 'var(--color-text-disabled)',
  };
  
  return colorMap[color] || colorMap.inherit;
};

const getAnimation = (animated: boolean, animationType: string, duration: number): string => {
  if (!animated) return 'none';
  
  const animations = {
    spin: `${spin} ${duration}ms linear infinite`,
    pulse: `${pulse} ${duration}ms ease-in-out infinite`,
    bounce: `${bounce} ${duration}ms ease-in-out infinite`,
    shake: `${shake} ${duration}ms ease-in-out infinite`,
    flash: `${flash} ${duration}ms ease-in-out infinite`,
  };
  
  return animations[animationType as keyof typeof animations] || 'none';
};

interface StyledIconProps {
  $size: IconSize;
  $color: IconColor;
  $rotation: number;
  $flipX: boolean;
  $flipY: boolean;
  $animated: boolean;
  $animationType?: string;
  $animationDuration: number;
  $loading: boolean;
  children?: React.ReactNode;
}

export const StyledIcon: React.ComponentType<StyledIconProps> = styled(SvgIcon, {
  shouldForwardProp: (prop) => 
    !prop.toString().startsWith('$'),
})<StyledIconProps>(function styledIcon({ 
  theme, 
  $size, 
  $color, 
  $rotation, 
  $flipX, 
  $flipY, 
  $animated, 
  $animationType = 'spin',
  $animationDuration,
  $loading 
}): React.CSSProperties {
  const size = getIconSize($size);
  const color = getIconColor($color);
  
  // Build transform string
  const transforms = [];
  if ($rotation !== 0) transforms.push(`rotate(${$rotation}deg)`);
  if ($flipX) transforms.push('scaleX(-1)');
  if ($flipY) transforms.push('scaleY(-1)');
  const transform = transforms.length > 0 ? transforms.join(' ') : 'none';
  
  return {
    // Size
    'width': size,
    'height': size,
    'fontSize': size,
    
    // Color
    'color': color,
    
    // Transform
    'transform': transform,
    
    // Animation
    'animation': $animated ? getAnimation($animated, $animationType, $animationDuration) : 'none',
    
    // Loading state
    'opacity': $loading ? 0.6 : 1,
    
    // Transitions
    'transition': theme.transitions.create([
      'color',
      'opacity',
      'transform',
    ], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    
    // Accessibility
    // @ts-expect-error: CSS-in-JS pseudo selector
    '&:focus-visible': {
      'outline': `2px solid ${theme.palette.primary.main}`,
      'outlineOffset': 2,
      'borderRadius': theme.shape.borderRadius,
    },
    
    // Responsive behavior
    [theme.breakpoints.down('sm')]: {
      ...($size === 'xl' && {
        'width': Math.min(size, 32),
        'height': Math.min(size, 32),
        'fontSize': Math.min(size, 32),
      }),
    },
    
    // Print styles
    '@media print': {
      'animation': 'none !important',
      'color': 'black !important',
    },
    
    // High contrast mode support
    '@media (prefers-contrast: high)': {
      ...($color !== 'inherit' && {
        'color': 'currentColor',
      }),
    },
    
    // Reduced motion support
    '@media (prefers-reduced-motion: reduce)': {
      'animation': 'none !important',
      'transition': 'none !important',
    },
  };
});

export const LoadingSpinner: React.ComponentType<{ $size: IconSize; $color: IconColor }> = styled('div', {
  shouldForwardProp: (prop) => !prop.toString().startsWith('$'),
})<{ $size: IconSize; $color: IconColor }>(({ $size, $color }): React.CSSProperties => {
  const size = getIconSize($size);
  const color = getIconColor($color);
  
  return {
    'position': 'absolute',
    'top': '50%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)',
    'width': size * 0.8,
    'height': size * 0.8,
    'border': `2px solid transparent`,
    'borderTop': `2px solid ${color}`,
    'borderRadius': '50%',
    'animation': `${spin} 1s linear infinite`,
    
    // Ensure spinner is visible
    'zIndex': 1,
  };
});

export const IconContainer: React.ComponentType<{ $size: IconSize; $loading: boolean }> = styled('div', {
  shouldForwardProp: (prop) => !prop.toString().startsWith('$'),
})<{ $size: IconSize; $loading: boolean }>(({ $size, $loading }): React.CSSProperties => {
  const size = getIconSize($size);
  
  return {
    'position': 'relative',
    'display': 'inline-flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'width': size,
    'height': size,
    
    // Loading state
    // @ts-expect-error: CSS-in-JS child selector
    '& > svg': {
      'opacity': $loading ? 0.3 : 1,
      'transition': 'opacity 0.2s ease-in-out',
    },
    
    // Hover state
    '&:hover': {
      'opacity': 0.8,
      'cursor': 'pointer',
    },
  };
});