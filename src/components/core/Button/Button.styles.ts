import type { ButtonProps as MuiButtonProps, PaletteColor } from '@mui/material';
import { Button as MuiButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

import {
  BUTTON_SIZE_CONFIGS,
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
  ACCESSIBILITY_CONSTANTS,
  GLASS_MORPHISM_CONFIG,
} from './Button.constants';
import type { ButtonStyleProps } from './Button.types';
export const StyledButton: React.ComponentType<MuiButtonProps & ButtonStyleProps> = styled(MuiButton, {
  shouldForwardProp: (prop) => !['customVariant', 'customSize', 'customColor', 'loading', 'hasStartIcon', 'hasEndIcon', 'animate'].includes(prop as string),
})<ButtonStyleProps>(
  ({ theme, customVariant, customSize, customColor, loading, disabled, fullWidth, hasStartIcon, hasEndIcon }) => {
    /**
     * Get the size configuration for the current button size
     * @type {typeof BUTTON_SIZE_CONFIGS[typeof customSize]}
     */
    const sizeConfig = BUTTON_SIZE_CONFIGS[customSize];
    /**
     * Determine if the button uses the 'glass' variant
     * @type {boolean}
     */
    const isGlass = customVariant === 'glass';
    /**
     * Determine if the button uses the 'gradient' variant
     * @type {boolean}
     */
    const isGradient = customVariant === 'gradient';
    /**
     * Determine if the button uses the 'outline' variant
     * @type {boolean}
     */
    const isOutline = customVariant === 'outline';
    /**
     * Determine if the button uses the 'text' variant
     * @type {boolean}
     */
    const isText = customVariant === 'text';

    // Base styles
    const baseStyles = {
      'height': sizeConfig.height,
      'padding': sizeConfig.padding,
      'fontSize': sizeConfig.fontSize,
      'fontWeight': 500,
      'fontFamily': theme.typography.fontFamily,
      'textTransform': 'none' as const,
      'borderRadius': theme.shape.borderRadius,
      'minWidth': fullWidth ? '100%' : 'auto',
      'width': fullWidth ? '100%' : 'auto',
      'position': 'relative' as const,
      'overflow': 'hidden' as const,
      'transition': `all ${ANIMATION_DURATIONS.hover} ${ANIMATION_EASINGS.spring}`,
      'cursor': disabled || loading ? 'not-allowed' : 'pointer',
      'opacity': disabled ? 0.6 : 1,
      // Focus styles for accessibility
      '&:focus-visible': {
        'outline': `${ACCESSIBILITY_CONSTANTS.focusOutlineWidth}px solid ${theme.palette.primary.main}`,
        'outlineOffset': ACCESSIBILITY_CONSTANTS.focusOutlineOffset,
      },
      // Icon spacing
      ...(hasStartIcon && {
        '& .MuiButton-startIcon': {
          'marginRight': theme.spacing(1),
          'marginLeft': 0,
        },
      }),
      ...(hasEndIcon && {
        '& .MuiButton-endIcon': {
          'marginLeft': theme.spacing(1),
          'marginRight': 0,
        },
      }),
      // Loading state
      ...(loading && {
        'pointerEvents': 'none' as const,
        '& .MuiButton-startIcon, & .MuiButton-endIcon': {
          'animation': `${loadingSpinKeyframes} ${ANIMATION_DURATIONS.loading} linear infinite`,
        },
      }),
    };

    // Color-based styles
    /**
     * Returns the color-based style object for the button based on its variant and color
     * @returns {React.CSSProperties | Record<string, unknown>} Style object for the button
     */
    const getColorStyles = (): React.CSSProperties | Record<string, unknown> => {
      // Handle custom colors that don't exist in MUI palette
      const getColorPalette = (): PaletteColor => {
        if (customColor === 'tertiary' || customColor === 'quaternary') {
          return theme.palette.primary; // Fallback to primary for custom colors
        }
        return theme.palette[customColor] || theme.palette.primary;
      };
      const colorPalette = getColorPalette();

      if (isText) {
        return {
          'color': colorPalette.main,
          'backgroundColor': 'transparent',
          'border': 'none',
          '&:hover': {
            'backgroundColor': theme.palette.action.hover,
          },
          '&:active': {
            'backgroundColor': theme.palette.action.selected,
          },
        };
      }

      if (isOutline) {
        return {
          'color': colorPalette.main,
          'backgroundColor': 'transparent',
          'border': `1px solid ${colorPalette.main}`,
          '&:hover': {
            'backgroundColor': colorPalette.main,
            'color': colorPalette.contrastText,
          },
          '&:active': {
            'backgroundColor': colorPalette.dark,
          },
        };
      }

      if (isGlass) {
        return {
          'color': colorPalette.main,
          'backgroundColor': `rgba(${theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'}, ${GLASS_MORPHISM_CONFIG.backgroundOpacity})`,
          'backdropFilter': GLASS_MORPHISM_CONFIG.backdropFilter,
          'border': `1px solid rgba(${theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'}, ${GLASS_MORPHISM_CONFIG.borderOpacity})`,
          '&:hover': {
            'backgroundColor': `rgba(${theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'}, ${GLASS_MORPHISM_CONFIG.backgroundOpacity * 1.5})`,
          },
          '@supports not (backdrop-filter: blur())': {
            'backgroundColor': theme.palette.action.hover,
            'border': `1px solid ${theme.palette.divider}`,
          },
        };
      }

      if (isGradient) {
        // Use enhanced theme gradients if available, fallback to basic gradient
        const enhancedTheme: unknown = theme;
        let gradients: Record<string, string> | undefined;
        if (
          typeof enhancedTheme === 'object' &&
          enhancedTheme !== null &&
          'gradients' in enhancedTheme &&
          typeof (enhancedTheme as { gradients?: unknown }).gradients === 'object' &&
          (enhancedTheme as { gradients?: unknown }).gradients !== null
        ) {
          const themeGradients = (enhancedTheme as { gradients?: { dark?: Record<string, string>; light?: Record<string, string> } }).gradients;
          gradients = theme.palette.mode === 'dark' ? themeGradients?.dark : themeGradients?.light;
        }
        const gradient = gradients?.[customColor] || gradients?.['primary'] || `linear-gradient(45deg, ${colorPalette.main}, ${colorPalette.dark})`;
        return {
          'background': gradient,
          'color': theme.palette.getContrastText(colorPalette.main),
          'border': 'none',
          '&:hover': {
            'filter': 'brightness(1.1)',
            'transform': 'translateY(-1px)',
            'boxShadow': theme.shadows[4],
          },
          '&:active': {
            'transform': 'translateY(0px)',
            'filter': 'brightness(0.95)',
          },
        };
      }

      // Solid variants (primary, secondary, tertiary, quaternary)
      return {
        'color': colorPalette.contrastText,
        'backgroundColor': colorPalette.main,
        'border': 'none',
        '&:hover': {
          'backgroundColor': colorPalette.dark,
          'transform': 'translateY(-1px)',
          'boxShadow': theme.shadows[2],
        },
        '&:active': {
          'backgroundColor': colorPalette.dark,
          'transform': 'translateY(0px)',
          'boxShadow': theme.shadows[1],
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
 * Keyframes for loading spinner animation
 * @author dilip.yadav@shorelineiot.com
 */
export const loadingSpinKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

/**
 * StyledButtonWithRipple adds a ripple effect for better interaction feedback
 * Filters out all custom props so only valid props are forwarded to the DOM/MUI Button
 * @author dilip.yadav@shorelineiot.com
 */
export const StyledButtonWithRipple: React.ComponentType<MuiButtonProps & ButtonStyleProps> = styled(StyledButton, {
  shouldForwardProp: (prop) => ![
    'customVariant',
    'customSize',
    'customColor',
    'loading',
    'hasStartIcon',
    'hasEndIcon',
    'animate',
    // Do NOT filter out 'startIcon' and 'endIcon' so they reach the underlying MUI Button
    // Add any other custom props here
  ].includes(prop as string),
})(() => ({
  '&:before': {
    'content': '""',
    'position': 'absolute',
    'top': '50%',
    'left': '50%',
    'width': 0,
    'height': 0,
    'borderRadius': '50%',
    'background': 'rgba(255, 255, 255, 0.5)',
    'transform': 'translate(-50%, -50%)',
    'transition': `width ${ANIMATION_DURATIONS.ripple} ease, height ${ANIMATION_DURATIONS.ripple} ease`,
  },
  '&:active:before': {
    'width': '300px',
    'height': '300px',
  },
}));