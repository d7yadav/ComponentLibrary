import { Chip as MuiChip } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { CSSObject } from '@mui/system';

import { 
  CHIP_SIZES,
  CHIP_SHAPES,
  CHIP_ANIMATIONS,
  CHIP_ELEVATIONS,
  CHIP_A11Y,
  CHIP_ICON_SPACING
} from './Chip.constants';
import type { 
  StyledChipProps,
  StyledChipLabelProps,
  StyledChipIconProps,
  StyledChipDeleteProps,
  ChipVariant,
  ChipSize,
  ChipColor,
  ChipShape
} from './Chip.types';


// Helper function to get variant styles
const getVariantStyles = (
  variant: ChipVariant,
  color: ChipColor,
  disabled: boolean,
  selected: boolean
): CSSObject => {
  const colorValue = color === 'default' ? 'var(--mui-palette-grey-600)' : `var(--mui-palette-${color}-main)`;
  const colorContrast = color === 'default' ? 'var(--mui-palette-grey-50)' : `var(--mui-palette-${color}-contrastText)`;
  const colorLight = color === 'default' ? 'var(--mui-palette-grey-300)' : `var(--mui-palette-${color}-light)`;
  const colorDark = color === 'default' ? 'var(--mui-palette-grey-800)' : `var(--mui-palette-${color}-dark)`;

  if (disabled) {
    return {
      'color': 'var(--mui-palette-action-disabled)',
      'backgroundColor': variant === 'filled' ? 'var(--mui-palette-action-disabledBackground)' : 'transparent',
      'borderColor': variant === 'outlined' ? 'var(--mui-palette-action-disabled)' : 'transparent',
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
        'transform': CHIP_ANIMATIONS.transform.hover
      },
      '&:active': {
        'transform': CHIP_ANIMATIONS.transform.press
      }
    },
    outlined: {
      'backgroundColor': selected ? `${colorValue}08` : 'transparent',
      'color': colorValue,
      'border': `1px solid ${colorValue}`,
      '&:hover': {
        'backgroundColor': `${colorValue}08`,
        'borderColor': colorDark,
        'transform': CHIP_ANIMATIONS.transform.hover
      },
      '&:active': {
        'transform': CHIP_ANIMATIONS.transform.press
      }
    },
    soft: {
      'backgroundColor': selected ? `${colorValue}20` : `${colorValue}12`,
      'color': colorValue,
      'border': 'none',
      '&:hover': {
        'backgroundColor': `${colorValue}16`,
        'transform': CHIP_ANIMATIONS.transform.hover
      },
      '&:active': {
        'transform': CHIP_ANIMATIONS.transform.press
      }
    },
    gradient: {
      'background': `linear-gradient(135deg, ${colorValue}, ${colorLight})`,
      'color': colorContrast,
      'border': 'none',
      '&:hover': {
        'background': `linear-gradient(135deg, ${colorDark}, ${colorValue})`,
        'transform': CHIP_ANIMATIONS.transform.hover
      },
      '&:active': {
        'transform': CHIP_ANIMATIONS.transform.press
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
        'transform': CHIP_ANIMATIONS.transform.hover
      },
      '&:active': {
        'transform': CHIP_ANIMATIONS.transform.press
      }
    }
  };

  return baseStyles[variant] || baseStyles.filled;
};

// Helper function to get size styles
const getSizeStyles = (size: ChipSize): CSSObject => {
  const sizeConfig = CHIP_SIZES[size];
  
  return {
    'height': sizeConfig.height,
    'paddingLeft': sizeConfig.paddingX,
    'paddingRight': sizeConfig.paddingX,
    'fontSize': sizeConfig.fontSize,
    'borderRadius': sizeConfig.borderRadius,
  };
};

// Helper function to get shape styles
const getShapeStyles = (shape: ChipShape): CSSObject => {
  return CHIP_SHAPES[shape];
};

// Helper function to get elevation styles
const getElevationStyles = (elevation: boolean, variant: ChipVariant): CSSObject => {
  if (!elevation || variant === 'outlined') {
    return { 'boxShadow': 'none' };
  }

  return {
    'boxShadow': CHIP_ELEVATIONS.small,
    '&:hover': {
      'boxShadow': CHIP_ELEVATIONS.hover
    }
  };
};

export const StyledChip: React.ComponentType<StyledChipProps> = styled(MuiChip, {
  shouldForwardProp: (prop) => 
    !['$variant', '$size', '$color', '$shape', '$disabled', '$selected', '$clickable', '$deletable', '$elevation', '$loading'].includes(prop as string)
})<StyledChipProps>(({
  theme,
  $variant,
  $size,
  $color,
  $shape,
  $disabled,
  $selected,
  $clickable,
  $elevation,
  $loading
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
  'whiteSpace': 'nowrap',
  'overflow': 'hidden',
  'maxWidth': '100%',
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
  ...getVariantStyles($variant, $color, $disabled, $selected),
  
  // Elevation styles
  ...getElevationStyles($elevation, $variant),
  
  // Clickable styles
  ...($clickable && {
    'cursor': 'pointer',
    '&:hover': {
      'transform': CHIP_ANIMATIONS.transform.hover
    },
    '&:active': {
      'transform': CHIP_ANIMATIONS.transform.press
    }
  }),
  
  // Loading state
  ...($loading && {
    'pointerEvents': 'none' as const,
    'opacity': 0.7
  }),
  
  // Focus styles
  '&:focus-visible': {
    'outline': `${CHIP_A11Y.focusRing.width}px ${CHIP_A11Y.focusRing.style} var(--mui-palette-primary-main)`,
    'outlineOffset': CHIP_A11Y.focusRing.offset,
    'transform': CHIP_ANIMATIONS.transform.focus
  },
  
  // Ensure minimum touch target on mobile
  [theme.breakpoints.down('sm')]: {
    'minHeight': CHIP_A11Y.minTouchTarget
  },
  
  // Custom properties for dynamic values
  '& .MuiChip-label': {
    'paddingLeft': 0,
    'paddingRight': 0
  },
  
  '& .MuiChip-avatar': {
    'marginLeft': 0,
    'marginRight': 0
  },
  
  '& .MuiChip-icon': {
    'marginLeft': 0,
    'marginRight': 0
  },
  
  '& .MuiChip-deleteIcon': {
    'marginLeft': 0,
    'marginRight': 0
  }
}));

export const StyledChipLabel: React.ComponentType<Omit<StyledChipLabelProps, '$deletable'>> = styled('span', {
  shouldForwardProp: (prop) => !['$size', '$hasIcon', '$hasAvatar'].includes(prop as string)
})<Omit<StyledChipLabelProps, '$deletable'>>(({ $size, $hasIcon, $hasAvatar }) => {
  const spacing = CHIP_ICON_SPACING[$size];
  return {
    'overflow': 'hidden',
    'textOverflow': 'ellipsis',
    'whiteSpace': 'nowrap',
    'paddingLeft': $hasIcon || $hasAvatar ? spacing.start : 0,
    'paddingRight': 0
  };
});

export const StyledChipIcon: React.ComponentType<StyledChipIconProps> = styled('span', {
  shouldForwardProp: (prop) => !['$size', '$position', '$color'].includes(prop as string)
})<StyledChipIconProps>(({ $size, $position, $color }) => {
  const sizeConfig = CHIP_SIZES[$size];
  const spacing = CHIP_ICON_SPACING[$size];
  const colorValue = $color === 'default' ? 'currentColor' : `var(--mui-palette-${$color}-main)`;
  return {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'width': sizeConfig.iconSize,
    'height': sizeConfig.iconSize,
    'color': colorValue,
    'marginLeft': $position === 'start' ? 0 : spacing.end,
    'marginRight': $position === 'start' ? spacing.start : 0,
    '& svg': {
      'width': '100%',
      'height': '100%',
      'display': 'block'
    }
  };
});

export const StyledChipAvatar: React.ComponentType<{ $size: ChipSize }> = styled('span', {
  shouldForwardProp: (prop) => !['$size'].includes(prop as string)
})<{ $size: ChipSize }>(({ $size }) => {
  const sizeConfig = CHIP_SIZES[$size];
  const spacing = CHIP_ICON_SPACING[$size];
  return {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'width': sizeConfig.avatarSize,
    'height': sizeConfig.avatarSize,
    'borderRadius': '50%',
    'marginRight': spacing.start,
    'overflow': 'hidden',
    '& img': {
      'width': '100%',
      'height': '100%',
      'objectFit': 'cover'
    }
  };
});

export const StyledChipDelete: React.ComponentType<StyledChipDeleteProps> = styled('button', {
  shouldForwardProp: (prop) => !['$size', '$color', '$disabled'].includes(prop as string)
})<StyledChipDeleteProps>(({ theme, $size, $color, $disabled }) => {
  const sizeConfig = CHIP_SIZES[$size];
  const spacing = CHIP_ICON_SPACING[$size];
  const colorValue = $color === 'default' ? 'currentColor' : `var(--mui-palette-${$color}-main)`;
  return {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'width': sizeConfig.deleteIconSize,
    'height': sizeConfig.deleteIconSize,
    'padding': 0,
    'margin': 0,
    'marginLeft': spacing.delete,
    'border': 'none',
    'borderRadius': '50%',
    'backgroundColor': 'transparent',
    'color': colorValue,
    'cursor': $disabled ? 'not-allowed' : 'pointer',
    'opacity': $disabled ? 0.5 : 0.7,
    'transition': theme.transitions.create(['opacity', 'transform', 'background-color'], {
      duration: theme.transitions.duration.shortest
    }),
    '&:hover': {
      'opacity': $disabled ? 0.5 : 1,
      'backgroundColor': $disabled ? 'transparent' : `${colorValue}15`,
      'transform': $disabled ? 'none' : 'scale(1.1)'
    },
    '&:active': {
      'transform': $disabled ? 'none' : 'scale(0.9)'
    },
    '& svg': {
      'width': '100%',
      'height': '100%',
      'display': 'block'
    }
  };
});

export const LoadingSpinner: React.ComponentType<{ $color: ChipColor }> = styled('div', {
  shouldForwardProp: (prop) => !['$color'].includes(prop as string)
})<{ $color: ChipColor }>(({ $color }) => {
  const colorValue = $color === 'default' ? 'currentColor' : `var(--mui-palette-${$color}-main)`;
  return {
    'border': `2px solid ${colorValue}30`,
    'borderTop': `2px solid ${colorValue}`,
    'borderRadius': '50%',
    'animation': `${CHIP_ANIMATIONS.duration.normal * 5}ms linear infinite chipSpin`,
    '@keyframes chipSpin': {
      '0%': {
        'transform': 'rotate(0deg)'
      },
      '100%': {
        'transform': 'rotate(360deg)'
      }
    }
  };
});

export const BadgeContainer: React.ComponentType<{ $size: ChipSize; $color: ChipColor }> = styled('span', {
  shouldForwardProp: (prop) => !['$size', '$color'].includes(prop as string)
})<{ $size: ChipSize; $color: ChipColor }>(({ theme, $color }) => {
  const colorValue = $color === 'default' ? theme.palette.error.main : `var(--mui-palette-${$color}-main)`;
  const colorContrast = $color === 'default' ? theme.palette.error.contrastText : `var(--mui-palette-${$color}-contrastText)`;
  return {
    'position': 'absolute',
    'top': -6,
    'right': -6,
    'minWidth': 16,
    'height': 16,
    'padding': '0 4px',
    'backgroundColor': colorValue,
    'color': colorContrast,
    'borderRadius': '50%',
    'fontSize': '0.75rem',
    'fontWeight': theme.typography.fontWeightMedium,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'border': `2px solid ${theme.palette.background.paper}`,
    'zIndex': 1
  };
});