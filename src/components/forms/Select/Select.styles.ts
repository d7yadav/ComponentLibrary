import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import { 
  SELECT_SIZES,
  SELECT_ANIMATIONS,
  SELECT_DROPDOWN
} from './Select.constants';
import type { 
  StyledSelectProps,
  StyledSelectInputProps,
  StyledSelectLabelProps,
  StyledSelectDropdownProps,
  StyledSelectDropdownIconProps,
  StyledSelectStartIconProps,
  StyledSelectSearchProps,
  StyledSelectHelperTextProps,
  StyledSelectLoadingSpinnerProps,
  StyledSelectOptionProps,
  SelectVariant,
  SelectSize,
  SelectColor
} from './Select.types';

// Helper function to get variant styles with enhanced theme support
const getVariantStyles = (
  variant: SelectVariant,
  color: SelectColor,
  disabled: boolean,
  error: boolean,
  focused: boolean,
  theme: any
) => {
  const colorValue = theme.palette[color]?.main || theme.palette.primary.main;
  const errorColor = theme.palette.error.main;
  const finalColor = error ? errorColor : colorValue;
  const isDark = theme.palette.mode === 'dark';

  if (disabled) {
    return {
      'backgroundColor': theme.palette.action.disabledBackground,
      'color': theme.palette.action.disabled,
      'borderColor': theme.palette.action.disabled,
      'cursor': 'not-allowed',
      'pointerEvents': 'none',
      'opacity': 0.6
    };
  }

  const baseStyles = {
    filled: {
      'backgroundColor': isDark ? theme.palette.background.paper : theme.palette.grey[50],
      'border': 'none',
      'borderBottom': `2px solid ${focused ? finalColor : (isDark ? theme.palette.grey[600] : theme.palette.grey[400])}`,
      'borderRadius': '4px 4px 0 0',
      'color': theme.palette.text.primary,
      'transition': theme.transitions.create(['background-color', 'border-color'], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut
      }),
      '&:hover': {
        'backgroundColor': isDark ? theme.palette.background.default : theme.palette.grey[100],
        'borderBottomColor': focused ? finalColor : (isDark ? theme.palette.grey[500] : theme.palette.grey[500])
      }
    },
    outlined: {
      'backgroundColor': isDark ? theme.palette.background.paper : theme.palette.background.default,
      'border': `1px solid ${focused ? finalColor : (isDark ? theme.palette.grey[700] : theme.palette.divider)}`,
      'borderRadius': '4px',
      'color': theme.palette.text.primary,
      'transition': theme.transitions.create(['border-color', 'background-color'], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut
      }),
      '&:hover': {
        'backgroundColor': isDark ? theme.palette.background.default : theme.palette.grey[50],
        'borderColor': focused ? finalColor : (isDark ? theme.palette.grey[500] : theme.palette.action.hover)
      }
    },
    standard: {
      'backgroundColor': 'transparent',
      'border': 'none',
      'borderBottom': `1px solid ${focused ? finalColor : (isDark ? theme.palette.grey[600] : theme.palette.divider)}`,
      'borderRadius': 0,
      'color': theme.palette.text.primary,
      'transition': theme.transitions.create(['border-color'], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut
      }),
      '&:hover': {
        'borderBottomColor': focused ? finalColor : (isDark ? theme.palette.grey[500] : theme.palette.text.primary)
      }
    }
  };

  return baseStyles[variant];
};

// Helper function to get size styles
const getSizeStyles = (size: SelectSize) => {
  const sizeConfig = SELECT_SIZES[size];
  
  return {
    'height': sizeConfig.height,
    'paddingLeft': sizeConfig.paddingX,
    'paddingRight': sizeConfig.paddingX,
    'fontSize': sizeConfig.fontSize,
    'borderRadius': sizeConfig.borderRadius,
    '& .select-icon': {
      'width': sizeConfig.iconSize,
      'height': sizeConfig.iconSize
    }
  };
};

export const StyledSelectContainer: React.ComponentType<any> = styled('div', {
  shouldForwardProp: (prop) => 
    !['$variant', '$size', '$color', '$disabled', '$error', '$focused', '$fullWidth', '$hasStartIcon', '$loading'].includes(prop as string)
})<StyledSelectProps>(({
  theme,
  $variant,
  $size,
  $color,
  $disabled,
  $error,
  $focused,
  $fullWidth,
  $hasStartIcon,
  $loading
}) => ({
  // Base styles
  'position': 'relative',
  'display': 'inline-flex',
  'alignItems': 'center',
  'fontFamily': theme.typography.fontFamily,
  'fontWeight': theme.typography.fontWeightRegular,
  'lineHeight': 1.4375,
  'letterSpacing': '0.00938em',
  'textAlign': 'left',
  verticalAlign: 'top',
  'cursor': $disabled ? 'not-allowed' : 'pointer',
  'transition': theme.transitions.create(
    ['background-color', 'border-color', 'box-shadow'],
    {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut
    }
  ),
  
  // Width handling
  'width': $fullWidth ? '100%' : 'auto',
  'minWidth': $fullWidth ? '100%' : SELECT_DROPDOWN.minWidth,
  
  // Size styles
  ...getSizeStyles($size),
  
  // Variant styles
  ...getVariantStyles($variant, $color, $disabled, $error, $focused, theme),
  
  // Start icon spacing
  ...($hasStartIcon && {
    'paddingLeft': SELECT_SIZES[$size].paddingX + SELECT_SIZES[$size].iconSize + 8
  }),
  
  // Loading state
  ...($loading && {
    'pointerEvents': 'none',
    'opacity': 0.7
  }),
  
  // Focus styles - matching TextField patterns
  '&:focus-within': {
    'outline': 'none',
    // Focus ring is handled by individual variant styles
  },
  
  // Focus ring for accessibility
  '&:focus': {
    'outline': `2px solid ${$error ? theme.palette.error.main : theme.palette[$color]?.main || theme.palette.primary.main}`,
    outlineOffset: '2px'
  }
}));

// 🎯 Select Input Display - Styled input display area with proper text handling
export const StyledSelectInput: React.ComponentType<any> = styled(Typography, {
  shouldForwardProp: (prop) => !['$variant', '$size', '$hasValue', '$hasStartIcon'].includes(prop as string)
})<StyledSelectInputProps>(({ theme, $variant, $size, $hasValue, $hasStartIcon }) => {
  const sizeConfig = SELECT_SIZES[$size];
  
  return {
    'flex': 1,
    'minWidth': 0,
    'height': '100%',
    'display': 'flex',
    'alignItems': 'center',
    'padding': `${theme.spacing(0.5)} 0`,
    'fontSize': sizeConfig.fontSize,
    'color': $hasValue ? theme.palette.text.primary : theme.palette.text.secondary,
    'overflow': 'hidden',
    'textOverflow': 'ellipsis',
    'whiteSpace': 'nowrap',
    'userSelect': 'none',
    'fontFamily': theme.typography.fontFamily,
    'fontWeight': $hasValue ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    'lineHeight': 1.5,
    
    // Icon spacing with proper alignment
    ...($hasStartIcon && {
      'paddingLeft': theme.spacing(0.5)
    })
  };
});

export const StyledSelectLabel: React.ComponentType<any> = styled(Typography, {
  shouldForwardProp: (prop) => 
    !['$variant', '$size', '$color', '$focused', '$hasValue', '$error', '$disabled'].includes(prop as string)
})<StyledSelectLabelProps>(({ theme, $variant, $size, $color, $focused, $hasValue, $error, $disabled }) => {
  const sizeConfig = SELECT_SIZES[$size];
  const isFloating = $focused || $hasValue;
  const colorValue = $error 
    ? theme.palette.error.main 
    : theme.palette[$color]?.main || theme.palette.primary.main;
  
  // Size-specific positioning similar to TextField
  const getSizeBasedTransform = () => {
    if ($variant === 'outlined') {
      if (isFloating) {
        return $size === 'small' 
          ? 'translate(14px, -9px) scale(0.75)'
          : 'translate(14px, -9px) scale(0.75)';
      } else {
        return $size === 'small'
          ? 'translate(14px, 12px) scale(1)'
          : 'translate(14px, 16px) scale(1)';
      }
    } else if ($variant === 'filled') {
      if (isFloating) {
        return $size === 'small'
          ? 'translate(14px, 10px) scale(0.75)'
          : 'translate(14px, 10px) scale(0.75)';
      } else {
        return $size === 'small'
          ? 'translate(14px, 20px) scale(1)'
          : 'translate(14px, 25px) scale(1)';
      }
    } else {
      // Standard variant
      if (isFloating) {
        return 'translate(0px, -1.5px) scale(0.75)';
      } else {
        return $size === 'small'
          ? 'translate(0px, 12px) scale(1)'
          : 'translate(0px, 16px) scale(1)';
      }
    }
  };
  
  return {
    'position': 'absolute',
    'left': 0,
    'top': 0,
    'transform': getSizeBasedTransform(),
    'transformOrigin': 'top left',
    'transition': theme.transitions.create(['transform', 'color'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeOut
    }),
    'fontSize': sizeConfig.fontSize,
    'fontFamily': theme.typography.fontFamily,
    'fontWeight': theme.typography.fontWeightMedium,
    'color': $disabled 
      ? theme.palette.action.disabled 
      : $focused 
        ? colorValue 
        : theme.palette.text.secondary,
    'pointerEvents': 'none',
    'zIndex': 1,
    'maxWidth': '80%',
    'overflow': 'hidden',
    'textOverflow': 'ellipsis',
    'whiteSpace': 'nowrap',
    
    // Outlined variant specific styles with proper background
    ...($variant === 'outlined' && {
      'backgroundColor': theme.palette.background.paper,
      'padding': `0 ${theme.spacing(0.5)}`,
      'marginLeft': theme.spacing(-0.5)
    })
  };
});

export const StyledSelectDropdownIcon: React.ComponentType<any> = styled('div', {
  shouldForwardProp: (prop) => !['$size', '$isOpen', '$disabled'].includes(prop as string)
})<StyledSelectDropdownIconProps>(({ theme, $size, $isOpen, $disabled }) => {
  const sizeConfig = SELECT_SIZES[$size];
  
  return {
    'position': 'absolute',
    'right': sizeConfig.paddingX,
    'top': '50%',
    'transform': `translateY(-50%) ${$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}`,
    'transition': theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut
    }),
    'width': sizeConfig.iconSize,
    'height': sizeConfig.iconSize,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'color': $disabled ? theme.palette.action.disabled : theme.palette.text.secondary,
    'pointerEvents': 'none',
    
    '& svg': {
      'width': '100%',
      'height': '100%'
    }
  };
});

export const StyledSelectStartIcon: React.ComponentType<any> = styled('div', {
  shouldForwardProp: (prop) => !['$size'].includes(prop as string)
})<StyledSelectStartIconProps>(({ theme, $size }) => {
  const sizeConfig = SELECT_SIZES[$size];
  
  return {
    'position': 'absolute',
    'left': theme.spacing(1.5),
    'top': '50%',
    'transform': 'translateY(-50%)',
    'width': sizeConfig.iconSize,
    'height': sizeConfig.iconSize,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'color': theme.palette.text.secondary,
    'pointerEvents': 'none',
    
    '& svg': {
      'width': '100%',
      'height': '100%',
      'fontSize': theme.spacing(3)
    }
  };
});

export const StyledSelectDropdown: React.ComponentType<any> = styled('div', {
  shouldForwardProp: (prop) => !['$maxHeight', '$width', '$enableAnimations'].includes(prop as string)
})<StyledSelectDropdownProps>(({ theme, $maxHeight, $width, $enableAnimations }) => ({
  'position': 'absolute',
  'top': '100%',
  'left': 0,
  'right': 0,
  'zIndex': SELECT_DROPDOWN.zIndex.dropdown,
  'width': $width || '100%',
  'maxHeight': $maxHeight,
  'overflow': 'auto',
  'backgroundColor': theme.palette.background.paper,
  'border': `1px solid ${theme.palette.divider}`,
  'borderRadius': theme.shape.borderRadius,
  'boxShadow': theme.palette.mode === 'dark' 
    ? '0px 8px 32px rgba(0, 0, 0, 0.4), 0px 4px 16px rgba(0, 0, 0, 0.3)'
    : theme.shadows[8],
  'backdropFilter': theme.palette.mode === 'dark' ? 'blur(20px)' : 'none',
  // Enhanced dark mode support
  ...(theme.palette.mode === 'dark' && {
    'backgroundColor': 'rgba(18, 18, 18, 0.95)',
    'borderColor': theme.palette.grey[700]
  }),
  '&::-webkit-scrollbar': {
    'width': '8px'
  },
  '&::-webkit-scrollbar-track': {
    'backgroundColor': 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    'backgroundColor': theme.palette.action.hover,
    'borderRadius': '4px'
  },
  
  // Animation styles
  ...($enableAnimations && {
    'transformOrigin': 'top',
    'transition': theme.transitions.create(['opacity', 'transform'], {
      duration: SELECT_ANIMATIONS.duration.normal,
      easing: SELECT_ANIMATIONS.easing.easeOut
    }),
    
    '&[data-enter]': SELECT_ANIMATIONS.dropdown.enter,
    '&[data-exit]': SELECT_ANIMATIONS.dropdown.exit
  })
}));

// 🎯 Select Option - Individual option styling with hover and selection states
export const StyledSelectOption: React.ComponentType<any> = styled('div', {
  shouldForwardProp: (prop) => !['$selected', '$disabled', '$focused', '$size'].includes(prop as string)
})<StyledSelectOptionProps>(({ theme, $selected, $disabled, $focused, $size }) => {
  const sizeConfig = SELECT_SIZES[$size];
  
  return {
    'display': 'flex',
    'alignItems': 'center',
    gap: theme.spacing(1.5),
    'padding': theme.spacing(1.5, 2),
    'minHeight': theme.spacing(6),
    'fontSize': sizeConfig.fontSize,
    'cursor': $disabled ? 'not-allowed' : 'pointer',
    'userSelect': 'none',
    'transition': theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut
    }),
    
    // Base colors with better contrast
    'color': $disabled 
      ? theme.palette.action.disabled 
      : $selected
        ? theme.palette.primary.main
        : theme.palette.text.primary,
    
    'backgroundColor': $selected 
      ? theme.palette.primary.main + '10' 
      : 'transparent',
    
    // Border for selected items with theme spacing
    'borderLeft': $selected 
      ? `${theme.spacing(0.5)} solid ${theme.palette.primary.main}` 
      : `${theme.spacing(0.5)} solid transparent`,
    
    // Enhanced hover state
    '&:hover': {
      'backgroundColor': $disabled 
        ? 'transparent' 
        : $selected 
          ? theme.palette.primary.main + '20' 
          : theme.palette.action.hover,
      'transform': $disabled ? 'none' : 'translateX(2px)',
      'borderLeftColor': $disabled ? 'transparent' : theme.palette.primary.main
    },
    
    // Improved focus state
    ...($focused && {
      'backgroundColor': theme.palette.primary.main + '15',
      'outline': `2px solid ${theme.palette.primary.main}`,
      outlineOffset: -2,
      'fontWeight': theme.typography.fontWeightMedium
    }),
    
    // Selected state with better visual hierarchy
    ...($selected && {
      'fontWeight': theme.typography.fontWeightBold,
      'transform': 'translateX(4px)',
    }),
    
    // Disabled state
    ...($disabled && {
      'opacity': 0.5,
      'pointerEvents': 'none',
    }),
    
    // Icon styling within options
    '& .MuiSvgIcon-root': {
      'fontSize': theme.spacing(2.5),
      'color': $selected ? theme.palette.primary.main : theme.palette.text.secondary
    }
  };
});

export const StyledSelectSearch: React.ComponentType<any> = styled('input', {
  shouldForwardProp: (prop) => !['$size'].includes(prop as string)
})<StyledSelectSearchProps>(({ theme, $size }) => {
  const sizeConfig = SELECT_SIZES[$size];
  
  return {
    'width': '100%',
    'padding': `${sizeConfig.paddingY}px ${sizeConfig.paddingX}px`,
    'border': 'none',
    'borderBottom': `1px solid ${theme.palette.divider}`,
    'backgroundColor': theme.palette.background.paper,
    'fontSize': sizeConfig.fontSize,
    'color': theme.palette.text.primary,
    'outline': 'none',
    'transition': theme.transitions.create(['border-color'], {
      duration: theme.transitions.duration.short
    }),
    
    '&::placeholder': {
      'color': theme.palette.text.secondary,
      'opacity': 1,
      'fontStyle': 'italic'
    },
    
    '&:focus': {
      'borderBottomColor': theme.palette.primary.main,
      'borderBottomWidth': '2px'
    }
  };
});

export const StyledSelectHelperText: React.ComponentType<any> = styled(Typography, {
  shouldForwardProp: (prop) => !['$error', '$success', '$warning'].includes(prop as string)
})<StyledSelectHelperTextProps>(({ theme, $error, $success, $warning }) => ({
  'marginTop': theme.spacing(0.75),
  'fontSize': '0.75rem',
  'fontFamily': theme.typography.fontFamily,
  'lineHeight': 1.66,
  'color': $error 
    ? theme.palette.error.main 
    : $success 
      ? theme.palette.success.main 
      : $warning 
        ? theme.palette.warning.main 
        : theme.palette.text.secondary
}));

export const StyledSelectLoadingSpinner: React.ComponentType<any> = styled('div', {
  shouldForwardProp: (prop) => !['$size'].includes(prop as string)
})<StyledSelectLoadingSpinnerProps>(({ theme, $size }) => {
  const sizeConfig = SELECT_SIZES[$size];
  
  return {
    'position': 'absolute',
    'right': sizeConfig.paddingX + sizeConfig.iconSize + 8,
    'top': '50%',
    'transform': 'translateY(-50%)',
    'width': 16,
    'height': 16,
    'border': `2px solid ${theme.palette.primary.main}`,
    'borderTopColor': 'transparent',
    'borderRadius': '50%',
    'animation': `selectSpinner ${SELECT_ANIMATIONS.duration.normal * 5}ms linear infinite`,
    
    '@keyframes selectSpinner': {
      '0%': {
        'transform': 'translateY(-50%) rotate(0deg)'
      },
      '100%': {
        'transform': 'translateY(-50%) rotate(360deg)'
      }
    }
  };
});