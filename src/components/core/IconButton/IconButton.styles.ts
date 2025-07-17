import { IconButton as MuiIconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type React from 'react';

import { 
  ICON_BUTTON_SIZES,
  ICON_BUTTON_SHAPES,
  ICON_BUTTON_ANIMATIONS,
  ICON_BUTTON_ELEVATIONS,
  ICON_BUTTON_A11Y
} from './IconButton.constants';
import type { 
  StyledIconButtonProps,
  IconButtonVariant,
  IconButtonSize,
  IconButtonColor,
  IconButtonShape
} from './IconButton.types';

// Keyframes for loading spinner
const iconButtonSpin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

// Helper function to get variant styles
const getVariantStyles = (
  variant: IconButtonVariant,
  color: IconButtonColor,
  disabled: boolean,
  selected: boolean,
  theme: Theme
) => {
  const getThemeColor = (colorName: IconButtonColor, shade: 'main' | 'contrastText' | 'light' | 'dark' = 'main') => {
    if (colorName === 'inherit') return 'inherit';
    const colorMap = {
      primary: theme.palette.primary,
      secondary: theme.palette.secondary,
      tertiary: theme.palette.tertiary || theme.palette.primary,
      quaternary: theme.palette.quaternary || theme.palette.secondary,
      success: theme.palette.success,
      warning: theme.palette.warning,
      error: theme.palette.error,
      info: theme.palette.info,
    };
    return colorMap[colorName]?.[shade] || theme.palette.primary[shade];
  };
  
  const colorValue = getThemeColor(color, 'main');
  const colorContrast = getThemeColor(color, 'contrastText');
  const colorLight = getThemeColor(color, 'light');
  const colorDark = getThemeColor(color, 'dark');

  if (disabled) {
    return {
      'color': theme.palette.action.disabled,
      'backgroundColor': variant === 'filled' ? theme.palette.action.disabledBackground : 'transparent',
      'borderColor': variant === 'outlined' ? theme.palette.action.disabled : 'transparent',
      'cursor': 'not-allowed',
      'pointerEvents': 'none'
    };
  }

  const baseStyles = {
    filled: {
      'backgroundColor': selected ? colorDark : colorValue,
      'color': colorContrast,
      'border': 'none',
      '&:hover': {
        'backgroundColor': colorDark,
        'transform': ICON_BUTTON_ANIMATIONS.transform.hover
      },
      '&:active': {
        'transform': ICON_BUTTON_ANIMATIONS.transform.press
      }
    },
    outlined: {
      'backgroundColor': selected ? `${colorValue}08` : 'transparent',
      'color': colorValue,
      'border': `1px solid ${colorValue}`,
      '&:hover': {
        'backgroundColor': `${colorValue}08`,
        'borderColor': colorDark,
        'transform': ICON_BUTTON_ANIMATIONS.transform.hover
      },
      '&:active': {
        'transform': ICON_BUTTON_ANIMATIONS.transform.press
      }
    },
    text: {
      'backgroundColor': selected ? `${colorValue}08` : 'transparent',
      'color': colorValue,
      'border': 'none',
      '&:hover': {
        'backgroundColor': `${colorValue}08`,
        'transform': ICON_BUTTON_ANIMATIONS.transform.hover
      },
      '&:active': {
        'transform': ICON_BUTTON_ANIMATIONS.transform.press
      }
    },
    gradient: {
      'background': `linear-gradient(135deg, ${colorValue}, ${colorLight})`,
      'color': colorContrast,
      'border': 'none',
      '&:hover': {
        'background': `linear-gradient(135deg, ${colorDark}, ${colorValue})`,
        'transform': ICON_BUTTON_ANIMATIONS.transform.hover
      },
      '&:active': {
        'transform': ICON_BUTTON_ANIMATIONS.transform.press
      }
    },
    glass: {
      'backgroundColor': `${colorValue}20`,
      'color': colorValue,
      'border': `1px solid ${colorValue}30`,
      'backdropFilter': 'blur(10px)',
      '&:hover': {
        'backgroundColor': `${colorValue}30`,
        'borderColor': `${colorValue}50`,
        'transform': ICON_BUTTON_ANIMATIONS.transform.hover
      },
      '&:active': {
        'transform': ICON_BUTTON_ANIMATIONS.transform.press
      }
    }
  };

  return baseStyles[variant] || baseStyles.text;
};

// Helper function to get size styles
const getSizeStyles = (size: IconButtonSize) => {
  const sizeConfig = ICON_BUTTON_SIZES[size];
  
  return {
    'width': sizeConfig.size,
    'height': sizeConfig.size,
    'padding': sizeConfig.padding,
    'fontSize': sizeConfig.fontSize,
    '& svg': {
      'width': sizeConfig.iconSize,
      'height': sizeConfig.iconSize
    }
  };
};

// Helper function to get shape styles
const getShapeStyles = (shape: IconButtonShape) => {
  return ICON_BUTTON_SHAPES[shape];
};

// Helper function to get elevation styles
const getElevationStyles = (elevation: boolean, variant: IconButtonVariant) => {
  if (!elevation || variant === 'text' || variant === 'outlined') {
    return { 'boxShadow': 'none' };
  }

  return {
    'boxShadow': ICON_BUTTON_ELEVATIONS.small,
    '&:hover': {
      'boxShadow': ICON_BUTTON_ELEVATIONS.hover
    }
  };
};

export const StyledIconButton: React.ComponentType<StyledIconButtonProps> = styled(MuiIconButton, {
  shouldForwardProp: (prop) => 
    !['$variant', '$size', '$color', '$shape', '$disabled', '$selected', '$loading', '$elevation', '$disableRipple'].includes(prop as string)
})<StyledIconButtonProps>(({
  theme,
  $variant,
  $size,
  $color,
  $shape,
  $disabled,
  $selected,
  $loading,
  $elevation,
  $disableRipple
}) => ({
  // Base styles
  'position': 'relative', 
  'display': 'inline-flex',
  'alignItems': 'center',
  'justifyContent': 'center', 
  'outline': 0,
  'userSelect': 'none',
  'verticalAlign': 'middle',
  'textDecoration': 'none',
  'fontFamily': theme.typography.fontFamily,
  'fontWeight': theme.typography.fontWeightMedium,
  'lineHeight': 1,
  'letterSpacing': '0.02857em',
  'textTransform': 'none',
  'minWidth': 'auto',
  'transition': theme.transitions.create(
    ['background-color', 'box-shadow', 'border-color', 'color', 'transform'],
    {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut
    }
  ),
  
  // Size styles
  ...getSizeStyles($size),
  
  // Shape styles  
  ...getShapeStyles($shape),
  
  // Variant styles
  ...getVariantStyles($variant, $color, $disabled, $selected, theme),
  
  // Elevation styles
  ...getElevationStyles($elevation, $variant),
  
  // Loading state
  ...$loading && {
    'pointerEvents': 'none',
    '& > *': {
      'opacity': 0
    }
  },
  
  // Focus styles
  '&:focus-visible': {
    'outline': `${ICON_BUTTON_A11Y.focusRing.width}px ${ICON_BUTTON_A11Y.focusRing.style} ${theme.palette.primary.main}`,
    'outlineOffset': ICON_BUTTON_A11Y.focusRing.offset,
    'transform': ICON_BUTTON_ANIMATIONS.transform.focus
  },
  
  // Ripple effect
  ...(!$disableRipple && {
    '& .MuiTouchRipple-root': {
      'display': 'none'
    }
  }),
  
  // Dark theme adjustments
  [theme.breakpoints.up('sm')]: {
    // Ensure minimum touch target on mobile
    'minWidth': ICON_BUTTON_A11Y.minTouchTarget,
    'minHeight': ICON_BUTTON_A11Y.minTouchTarget
  }
}));

// 🔄 Loading Spinner Component - Animated loading spinner with size and color matching
export const LoadingSpinner: React.ComponentType<{ $size: IconButtonSize; $color: IconButtonColor }> = styled('div', {
  shouldForwardProp: (prop) => !['$size', '$color'].includes(prop as string)
})<{ $size: IconButtonSize; $color: IconButtonColor }>(({ theme, $size, $color }) => {
  const sizeConfig = ICON_BUTTON_SIZES[$size];
  
  const getSpinnerColor = (colorName: IconButtonColor) => {
    if (colorName === 'inherit') return 'currentColor';
    const colorMap = {
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      tertiary: theme.palette.tertiary?.main || theme.palette.primary.main,
      quaternary: theme.palette.quaternary?.main || theme.palette.secondary.main,
      success: theme.palette.success.main,
      warning: theme.palette.warning.main,
      error: theme.palette.error.main,
      info: theme.palette.info.main,
    };
    return colorMap[colorName] || theme.palette.primary.main;
  };
  
  const colorValue = getSpinnerColor($color);
  
  return {
    'position': 'absolute',
    'top': '50%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)',
    'width': sizeConfig.iconSize,
    'height': sizeConfig.iconSize,
    'border': `2px solid ${theme.palette.action.disabled}`,
    'borderTop': `2px solid ${colorValue}`,
    'borderRadius': '50%',
    'animation': `${iconButtonSpin} ${ICON_BUTTON_ANIMATIONS.ripple.duration}ms linear infinite`,
  };
});

export const IconContainer: React.ComponentType<{ $size: IconButtonSize; $loading: boolean; children?: React.ReactNode }> = styled('span', {
  shouldForwardProp: (prop) => !['$size', '$loading'].includes(prop as string)
})<{ $size: IconButtonSize; $loading: boolean }>(({ $size, $loading }) => {
  const sizeConfig = ICON_BUTTON_SIZES[$size];
  
  return {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'width': sizeConfig.iconSize,
    'height': sizeConfig.iconSize,
    'transition': `opacity ${ICON_BUTTON_ANIMATIONS.duration.normal}ms ${ICON_BUTTON_ANIMATIONS.easing.easeInOut}`,
    'opacity': $loading ? 0 : 1,
    
    '& svg': {
      'width': '100%',
      'height': '100%',
      'display': 'block'
    }
  };
});

/**
 * Props for BadgeContainer
 */
export interface BadgeContainerProps {
  /**
   * Badge content (number, icon, etc.)
   */
  children?: React.ReactNode;
  /**
   * Optional class name for custom styling
   */
  className?: string;
  /**
   * Optional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * @author dilip.yadav@shorelineiot.com
 * @description
 * BadgeContainer is a styled span used to position a badge (e.g., notification dot or count)
 * on the IconButton. It is absolutely positioned to the top-right corner of the button,
 * ensuring accessibility and visual clarity. This container is intended to wrap badge content
 * such as numbers or icons, and can be customized as needed.
 *
 * Usage:
 * <StyledIconButton>
 *   <IconContainer>...</IconContainer>
 *   <BadgeContainer>1</BadgeContainer>
 * </StyledIconButton>
 */
export const BadgeContainer = styled('span')<BadgeContainerProps>(({ theme }: { theme: Theme }) => ({
  position: 'absolute',
  top: 2,
  right: 2,
  minWidth: 16,
  height: 16,
  padding: '0 4px',
  borderRadius: 8,
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 10,
  fontWeight: 700,
  zIndex: 1,
  boxShadow: theme.shadows[1],
  pointerEvents: 'none', // Badge should not block button interaction
  // Responsive adjustments for larger buttons
  [theme.breakpoints.up('sm')]: {
    minWidth: 18,
    height: 18,
    fontSize: 11,
    borderRadius: 9,
  },
}));