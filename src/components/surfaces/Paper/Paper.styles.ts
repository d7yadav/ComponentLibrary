import { Paper as MuiPaper } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ComponentType } from 'react';

import {
  PAPER_SIZE_CONFIGS,
  PAPER_CORNER_CONFIGS,
  PAPER_SURFACE_CONFIGS,
  PAPER_GRADIENT_CONFIGS,
  PAPER_GRADIENT_CONFIGS_DARK,
  ELEVATION_SHADOWS,
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
  GLASS_MORPHISM_CONFIG,
  GLASS_MORPHISM_CONFIG_DARK,
  PRINT_STYLES,
  ACCESSIBILITY_CONSTANTS,
} from './Paper.constants';
import type { PaperStyleProps } from './Paper.types';
export const StyledPaper: ComponentType<any> = styled(MuiPaper, {
  shouldForwardProp: (prop) => !([
    'customVariant',
    'customElevation',
    'corners',
    'surface',
    'size',
    'gradient',
    'interactive',
    'glassMorphism',
    'responsive',
    'printFriendly',
    'hoverElevation',
    'pressedElevation',
    'backgroundColor',
    'borderColor',
    'borderWidth',
    'padding',
    'margin',
    'animationDuration',
    'transitions',
    'overflow',
    'maxWidth',
    'maxHeight',
    'minWidth',
    'minHeight',
    'zIndex',
  ] as (keyof PaperStyleProps)[]).includes(prop as keyof PaperStyleProps),
})<PaperStyleProps>(({ 
  theme, 
  customVariant,
  customElevation,
  corners,
  surface,
  size,
  gradient,
  interactive,
  glassMorphism,
  responsive,
  printFriendly,
  hoverElevation,
  pressedElevation,
  backgroundColor,
  borderColor,
  borderWidth,
  padding,
  margin,
  animationDuration,
  transitions,
  overflow,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  zIndex,
}) => {
  const isDark = theme.palette.mode === 'dark';
  const sizeConfig = PAPER_SIZE_CONFIGS[size];
  const cornerConfig = PAPER_CORNER_CONFIGS[corners];
  const surfaceConfig = PAPER_SURFACE_CONFIGS[surface];
  const gradientConfigs = isDark ? PAPER_GRADIENT_CONFIGS_DARK : PAPER_GRADIENT_CONFIGS;
  const gradientConfig = gradientConfigs[gradient];
  const glassConfig = isDark ? GLASS_MORPHISM_CONFIG_DARK : GLASS_MORPHISM_CONFIG;

  // Base styles
  const baseStyles = {
    'position': 'relative' as const,
    'padding': padding || sizeConfig.padding,
    'margin': margin || sizeConfig.margin,
    'borderRadius': cornerConfig.borderRadius,
    boxSizing: 'border-box' as const,
    ...(transitions && {
      'transition': `all ${animationDuration}ms ${ANIMATION_EASINGS.easeInOut}`,
    }),
    ...(overflow && { overflow }),
    ...(maxWidth && { maxWidth }),
    ...(maxHeight && { maxHeight }),
    ...(minWidth && { minWidth }),
    ...(minHeight && { minHeight }),
    ...(zIndex && { zIndex }),
  };

  // Variant-specific styles function
  const getVariantStyles = () => {
    switch (customVariant) {
      case 'elevation':
        return {
          'backgroundColor': backgroundColor || theme.palette.background.paper,
          'boxShadow': ELEVATION_SHADOWS[customElevation],
          'border': 'none',
        };

      case 'outlined':
        return {
          'backgroundColor': backgroundColor || theme.palette.background.paper,
          'boxShadow': 'none',
          'border': `${borderWidth || '1px'} solid ${borderColor || theme.palette.divider}`,
        };

      case 'filled':
        return {
          'backgroundColor': backgroundColor || (isDark ? theme.palette.grey[900] : theme.palette.grey[50]),
          'boxShadow': 'none',
          'border': 'none',
        };

      case 'glass':
        return {
          'backgroundColor': backgroundColor || glassConfig.background,
          backdropFilter: glassMorphism ? glassConfig.backdropFilter : 'none',
          'border': glassMorphism ? glassConfig.border : 'none',
          'boxShadow': glassMorphism ? glassConfig.boxShadow : ELEVATION_SHADOWS[customElevation],
        };

      case 'gradient':
        return {
          'background': backgroundColor || gradientConfig.background,
          'backgroundColor': gradientConfig.fallbackColor, // Fallback for older browsers
          'boxShadow': ELEVATION_SHADOWS[customElevation],
          'border': 'none',
          'color': isDark ? theme.palette.common.white : theme.palette.common.black,
        };

      default:
        return {
          'backgroundColor': backgroundColor || theme.palette.background.paper,
          'boxShadow': ELEVATION_SHADOWS[customElevation],
        };
    }
  };

  const variantStyles = getVariantStyles();

  // Surface treatment styles
  const getSurfaceStyles = () => {
    if (surface === 'flat') return {};
    
    return {
      'boxShadow': surfaceConfig.boxShadow,
      ...(surface === 'concave' && {
        'background': `linear-gradient(145deg, ${isDark ? '#1a1a1a' : '#f0f0f0'}, ${isDark ? '#2a2a2a' : '#ffffff'})`,
      }),
      ...(surface === 'convex' && {
        'background': `linear-gradient(145deg, ${isDark ? '#2a2a2a' : '#ffffff'}, ${isDark ? '#1a1a1a' : '#f0f0f0'})`,
      }),
    };
  };

  const surfaceStyles = getSurfaceStyles();

  // Interactive styles
  const getInteractiveStyles = () => {
    if (!interactive) return {};

    return {
      'cursor': 'pointer',
      'userSelect': 'none' as const,
      WebkitTapHighlightColor: 'transparent',
      
      '&:hover': {
        ...(customVariant === 'elevation' && {
          'boxShadow': ELEVATION_SHADOWS[hoverElevation],
        }),
        ...(customVariant === 'outlined' && {
          'borderColor': theme.palette.primary.main,
        }),
        ...(customVariant === 'filled' && {
          'backgroundColor': isDark ? theme.palette.grey[800] : theme.palette.grey[100],
        }),
        'transform': 'translateY(-1px)',
      },

      '&:active': {
        ...(customVariant === 'elevation' && {
          'boxShadow': ELEVATION_SHADOWS[pressedElevation],
        }),
        'transform': 'translateY(0px)',
      },

      '&:focus-visible': {
        'outline': `${ACCESSIBILITY_CONSTANTS.focusOutlineWidth} ${ACCESSIBILITY_CONSTANTS.focusOutlineStyle} ${ACCESSIBILITY_CONSTANTS.focusOutlineColor}`,
        outlineOffset: ACCESSIBILITY_CONSTANTS.focusOutlineOffset,
      },

      '&:focus:not(:focus-visible)': {
        'outline': 'none',
      },
    };
  };

  // Responsive styles
  const getResponsiveStyles = () => {
    if (!responsive) return {};

    return {
      [theme.breakpoints.down('sm')]: {
        'padding': PAPER_SIZE_CONFIGS.compact.padding,
        'margin': PAPER_SIZE_CONFIGS.compact.margin,
        'borderRadius': PAPER_SIZE_CONFIGS.compact.borderRadius,
      },
      [theme.breakpoints.up('lg')]: {
        'padding': PAPER_SIZE_CONFIGS.spacious.padding,
        'margin': PAPER_SIZE_CONFIGS.spacious.margin,
        'borderRadius': PAPER_SIZE_CONFIGS.spacious.borderRadius,
      },
    };
  };

  // Print styles
  const getPrintStyles = () => {
    if (!printFriendly) return {};

    return {
      '@media print': PRINT_STYLES,
    };
  };

  // Dark mode optimizations
  const getDarkModeStyles = () => {
    if (!isDark) return {};

    return {
      // OLED optimizations for dark theme
      ...(customElevation === 0 && {
        'backgroundColor': '#000000', // True black for OLED
      }),
      
      // Enhanced contrast for better readability
      ...(customVariant === 'outlined' && {
        'borderColor': theme.palette.grey[700],
      }),
    };
  };

  return {
    ...baseStyles,
    ...variantStyles,
    ...surfaceStyles,
    ...getInteractiveStyles(),
    ...getResponsiveStyles(),
    ...getPrintStyles(),
    ...getDarkModeStyles(),
  };
});

export const paperHoverKeyframes = `
  @keyframes paper-hover-elevation {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-1px);
    }
  }

  @keyframes paper-press-elevation {
    0% {
      transform: translateY(-1px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes paper-glass-shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .paper-glass-shimmer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: paper-glass-shimmer 2s infinite;
    border-radius: inherit;
    pointer-events: none;
  }
`;

export const paperCssVars = {
  '--paper-elevation-0': ELEVATION_SHADOWS[0],
  '--paper-elevation-1': ELEVATION_SHADOWS[1],
  '--paper-elevation-2': ELEVATION_SHADOWS[2],
  '--paper-elevation-3': ELEVATION_SHADOWS[3],
  '--paper-elevation-4': ELEVATION_SHADOWS[4],
  '--paper-elevation-5': ELEVATION_SHADOWS[5],
  '--paper-elevation-6': ELEVATION_SHADOWS[6],
  '--paper-elevation-8': ELEVATION_SHADOWS[8],
  '--paper-elevation-12': ELEVATION_SHADOWS[12],
  '--paper-elevation-16': ELEVATION_SHADOWS[16],
  '--paper-elevation-24': ELEVATION_SHADOWS[24],
  '--paper-animation-duration': `${ANIMATION_DURATIONS.normal}ms`,
  '--paper-animation-easing': ANIMATION_EASINGS.easeInOut,
  '--paper-border-radius-small': PAPER_CORNER_CONFIGS.small.borderRadius,
  '--paper-border-radius-medium': PAPER_CORNER_CONFIGS.medium.borderRadius,
  '--paper-border-radius-large': PAPER_CORNER_CONFIGS.large.borderRadius,
  '--paper-glass-background': GLASS_MORPHISM_CONFIG.background,
  '--paper-glass-backdrop-filter': GLASS_MORPHISM_CONFIG.backdropFilter,
  '--paper-glass-border': GLASS_MORPHISM_CONFIG.border,
  '--paper-glass-shadow': GLASS_MORPHISM_CONFIG.boxShadow,
};

export const getElevationShadow = (level: number): string => {
  const clampedLevel = Math.max(0, Math.min(24, level)) as keyof typeof ELEVATION_SHADOWS;
  return ELEVATION_SHADOWS[clampedLevel];
};

export const getCornerRadius = (cornerSize: keyof typeof PAPER_CORNER_CONFIGS): string => {
  return PAPER_CORNER_CONFIGS[cornerSize].borderRadius;
};

export const shouldReduceMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};