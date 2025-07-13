import { styled } from '@mui/material/styles';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { ButtonStyleProps } from './Button.types';
import {
  BUTTON_SIZE_CONFIGS,
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
  ACCESSIBILITY_CONSTANTS,
  GLASS_MORPHISM_CONFIG,
} from './Button.constants';

/**
 * StyledButton component
 * 
 * @returns JSX element
 */
export const StyledButton: React.ComponentType<MuiButtonProps & ButtonStyleProps> = styled(MuiButton)<ButtonStyleProps>(
  ({ theme, customVariant, customSize, customColor, loading, disabled, fullWidth, hasStartIcon, hasEndIcon }) => {
    const sizeConfig = BUTTON_SIZE_CONFIGS[customSize];
    const isGlass = customVariant === 'glass';
    const isGradient = customVariant === 'gradient';
    const isOutline = customVariant === 'outline';
    const isText = customVariant === 'text';

    // Base styles
    const baseStyles = {
      height: sizeConfig.height,
      padding: sizeConfig.padding,
      fontSize: sizeConfig.fontSize,
      fontWeight: 500,
      fontFamily: theme.typography.fontFamily,
      textTransform: 'none' as const,
      borderRadius: theme.shape.borderRadius,
      minWidth: fullWidth ? '100%' : 'auto',
      width: fullWidth ? '100%' : 'auto',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      transition: `all ${ANIMATION_DURATIONS.hover} ${ANIMATION_EASINGS.spring}`,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      
      // Focus styles for accessibility
      '&:focus-visible': {
        outline: `${ACCESSIBILITY_CONSTANTS.focusOutlineWidth}px solid ${theme.palette.primary.main}`,
        outlineOffset: ACCESSIBILITY_CONSTANTS.focusOutlineOffset,
      },
      
      // Icon spacing
      ...(hasStartIcon && {
        '& .MuiButton-startIcon': {
          marginRight: theme.spacing(1),
          marginLeft: 0,
        },
      }),
      ...(hasEndIcon && {
        '& .MuiButton-endIcon': {
          marginLeft: theme.spacing(1),
          marginRight: 0,
        },
      }),
      
      // Loading state
      ...(loading && {
        pointerEvents: 'none' as const,
        '& .MuiButton-startIcon, & .MuiButton-endIcon': {
          animation: `spin ${ANIMATION_DURATIONS.loading} linear infinite`,
        },
      }),
    };

    // Color-based styles
    const getColorStyles = () => {
      // Handle custom colors that don't exist in MUI palette
      const getColorPalette = () => {
        if (customColor === 'tertiary' || customColor === 'quaternary') {
          return theme.palette.primary; // Fallback to primary for custom colors
        }
        return (theme.palette as any)[customColor] || theme.palette.primary;
      };
      const colorPalette = getColorPalette();
      
      if (isText) {
        return {
          color: colorPalette.main,
          backgroundColor: 'transparent',
          border: 'none',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          '&:active': {
            backgroundColor: theme.palette.action.selected,
          },
        };
      }
      
      if (isOutline) {
        return {
          color: colorPalette.main,
          backgroundColor: 'transparent',
          border: `1px solid ${colorPalette.main}`,
          '&:hover': {
            backgroundColor: colorPalette.main,
            color: colorPalette.contrastText,
          },
          '&:active': {
            backgroundColor: colorPalette.dark,
          },
        };
      }
      
      if (isGlass) {
        return {
          color: colorPalette.main,
          backgroundColor: `rgba(${theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'}, ${GLASS_MORPHISM_CONFIG.backgroundOpacity})`,
          backdropFilter: GLASS_MORPHISM_CONFIG.backdropFilter,
          border: `1px solid rgba(${theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'}, ${GLASS_MORPHISM_CONFIG.borderOpacity})`,
          '&:hover': {
            backgroundColor: `rgba(${theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'}, ${GLASS_MORPHISM_CONFIG.backgroundOpacity * 1.5})`,
          },
          '@supports not (backdrop-filter: blur())': {
            backgroundColor: theme.palette.action.hover,
            border: `1px solid ${theme.palette.divider}`,
          },
        };
      }
      
      if (isGradient) {
        // Use enhanced theme gradients if available, fallback to basic gradient
        const enhancedTheme = theme as any;
        const gradients = theme.palette.mode === 'dark' 
          ? enhancedTheme.gradients?.dark 
          : enhancedTheme.gradients?.light;
        const gradient = gradients?.[customColor] || gradients?.primary || `linear-gradient(45deg, ${colorPalette.main}, ${colorPalette.dark})`;
        
        return {
          background: gradient,
          color: theme.palette.getContrastText(colorPalette.main),
          border: 'none',
          '&:hover': {
            filter: 'brightness(1.1)',
            transform: 'translateY(-1px)',
            boxShadow: theme.shadows[4],
          },
          '&:active': {
            transform: 'translateY(0px)',
            filter: 'brightness(0.95)',
          },
        };
      }
      
      // Solid variants (primary, secondary, tertiary, quaternary)
      return {
        color: colorPalette.contrastText,
        backgroundColor: colorPalette.main,
        border: 'none',
        '&:hover': {
          backgroundColor: colorPalette.dark,
          transform: 'translateY(-1px)',
          boxShadow: theme.shadows[2],
        },
        '&:active': {
          backgroundColor: colorPalette.dark,
          transform: 'translateY(0px)',
          boxShadow: theme.shadows[1],
        },
      };
    };

    return {
      ...baseStyles,
      ...getColorStyles(),
    };
  }
);

// Loading spinner animation
/**
 * loadingSpinKeyframes component
 * 
 * @returns JSX element
 */
export const loadingSpinKeyframes = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// Ripple effect for better interaction feedback
/**
 * StyledButtonWithRipple component
 * 
 * @returns JSX element
 */
export const StyledButtonWithRipple: React.ComponentType<MuiButtonProps & ButtonStyleProps> = styled(StyledButton)(() => ({
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.5)',
    transform: 'translate(-50%, -50%)',
    transition: `width ${ANIMATION_DURATIONS.ripple} ease, height ${ANIMATION_DURATIONS.ripple} ease`,
  },
  
  '&:active:before': {
    width: '300px',
    height: '300px',
  },
}));