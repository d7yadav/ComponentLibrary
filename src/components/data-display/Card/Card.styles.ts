import { styled } from '@mui/material/styles';
import { Card as MuiCard } from '@mui/material';
import {
  CARD_SIZE_CONFIGS,
  CARD_ELEVATION_SHADOWS,
  CARD_INTERACTION_STATES,
  GLASS_MORPHISM_CARD_CONFIG,
  CARD_ANIMATION_DURATIONS,
  CARD_ANIMATION_EASINGS,
  ACCESSIBILITY_CONSTANTS,
} from './Card.constants';

/**
 * StyledCard component
 * 
 * @returns JSX element
 */
export const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => !['customVariant', 'customElevation', 'customSize', 'customOrientation', 'interactive', 'disabled', 'selected', 'hasHeader', 'hasMedia', 'hasActions'].includes(prop as string),
})<any>(({ theme, customVariant, customElevation, customSize, customOrientation, interactive, disabled, selected }: any) => {
    const sizeConfig = CARD_SIZE_CONFIGS[customSize as keyof typeof CARD_SIZE_CONFIGS];
    const isGlass = customVariant === 'glass';
    const isGradient = customVariant === 'gradient';
    const isOutlined = customVariant === 'outlined';
    const isFilled = customVariant === 'filled';
    const isInteractive = customVariant === 'interactive' || interactive;

    // Base styles
    const baseStyles = {
      borderRadius: sizeConfig.borderRadius,
      padding: 0, // Padding handled by child components
      position: 'relative' as const,
      overflow: 'hidden' as const,
      transition: `all ${CARD_ANIMATION_DURATIONS.hover} ${CARD_ANIMATION_EASINGS.spring}`,
      cursor: isInteractive && !disabled ? 'pointer' : 'default',
      opacity: disabled ? 0.6 : 1,
      
      // Orientation styles
      display: 'flex',
      flexDirection: customOrientation === 'horizontal' ? 'row' as const : 'column' as const,
      
      // Focus styles for accessibility
      '&:focus-visible': {
        outline: `${ACCESSIBILITY_CONSTANTS.focusOutlineWidth}px solid ${theme.palette.primary.main}`,
        outlineOffset: ACCESSIBILITY_CONSTANTS.focusOutlineOffset,
      },
      
      // Selection state
      ...(selected && {
        border: `2px solid ${theme.palette.primary.main}`,
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.primary.main}04)`,
          pointerEvents: 'none',
        },
      }),
    };

    // Variant-based styles
    const getVariantStyles = () => {
      if (isGlass) {
        return {
          backgroundColor: `rgba(${theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'}, ${GLASS_MORPHISM_CARD_CONFIG.backgroundOpacity})`,
          backdropFilter: GLASS_MORPHISM_CARD_CONFIG.backdropFilter,
          border: `1px solid rgba(${theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'}, ${GLASS_MORPHISM_CARD_CONFIG.borderOpacity})`,
          boxShadow: CARD_ELEVATION_SHADOWS[customElevation as keyof typeof CARD_ELEVATION_SHADOWS],
          
          '@supports not (backdrop-filter: blur())': {
            backgroundColor: theme.palette.background.paper,
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
        const gradient = gradients?.primary || `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`;
        
        return {
          background: gradient,
          color: theme.palette.primary.contrastText,
          border: 'none',
          boxShadow: CARD_ELEVATION_SHADOWS[customElevation as keyof typeof CARD_ELEVATION_SHADOWS],
        };
      }
      
      if (isOutlined) {
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        };
      }
      
      if (isFilled) {
        return {
          backgroundColor: theme.palette.action.hover,
          border: 'none',
          boxShadow: 'none',
        };
      }
      
      // Default elevated variant
      return {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: CARD_ELEVATION_SHADOWS[customElevation as keyof typeof CARD_ELEVATION_SHADOWS],
      };
    };

    // Interactive styles
    const getInteractiveStyles = () => {
      if (!isInteractive || disabled) return {};
      
      return {
        '&:hover': {
          transform: `scale(${CARD_INTERACTION_STATES.hover.scaleTransform})`,
          boxShadow: customElevation + CARD_INTERACTION_STATES.hover.elevationIncrease <= 24 
            ? CARD_ELEVATION_SHADOWS[(customElevation + CARD_INTERACTION_STATES.hover.elevationIncrease) as keyof typeof CARD_ELEVATION_SHADOWS]
            : CARD_ELEVATION_SHADOWS[24],
          transition: CARD_INTERACTION_STATES.hover.transition,
        },
        
        '&:active': {
          transform: `scale(${CARD_INTERACTION_STATES.active.scaleTransform})`,
          transition: CARD_INTERACTION_STATES.active.transition,
        },
      };
    };

    return {
      ...baseStyles,
      ...getVariantStyles(),
      ...getInteractiveStyles(),
    };
  }
);

// CardHeader styled component
/**
 * StyledCardHeader component
 * 
 * @returns JSX element
 */
export const StyledCardHeader = styled('div')<any>(
  ({ theme, size }: any) => {
    const sizeConfig = CARD_SIZE_CONFIGS[size as keyof typeof CARD_SIZE_CONFIGS];
    
    return {
      padding: sizeConfig.headerPadding,
      display: 'flex',
      alignItems: 'flex-start',
      gap: theme.spacing(2),
      
      '& .card-header-avatar': {
        flexShrink: 0,
      },
      
      '& .card-header-content': {
        flex: 1,
        minWidth: 0, // Allows text truncation
      },
      
      '& .card-header-action': {
        flexShrink: 0,
        marginTop: -theme.spacing(1),
        marginRight: -theme.spacing(1),
      },
      
      '& .card-header-title': {
        margin: 0,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
        lineHeight: theme.typography.h6.lineHeight,
        color: theme.palette.text.primary,
      },
      
      '& .card-header-subtitle': {
        margin: `${theme.spacing(0.5)} 0 0`,
        fontSize: theme.typography.body2.fontSize,
        color: theme.palette.text.secondary,
        lineHeight: theme.typography.body2.lineHeight,
      },
    };
  }
);

// CardContent styled component
/**
 * StyledCardContent component
 * 
 * @returns JSX element
 */
export const StyledCardContent = styled('div')<any>(
  ({ size }: any) => {
    const sizeConfig = CARD_SIZE_CONFIGS[size as keyof typeof CARD_SIZE_CONFIGS];
    
    return {
      padding: sizeConfig.contentPadding,
      flex: 1,
      
      '&:last-child': {
        paddingBottom: sizeConfig.padding,
      },
    };
  }
);

// CardMedia styled component
/**
 * StyledCardMedia component
 * 
 * @returns JSX element
 */
export const StyledCardMedia = styled('div')<any>(
  ({ theme, height = 200, objectFit = 'cover' }: any) => ({
    position: 'relative' as const,
    overflow: 'hidden' as const,
    height: typeof height === 'number' ? `${height}px` : height,
    
    '& img, & video': {
      width: '100%',
      height: '100%',
      objectFit: objectFit,
      display: 'block',
    },
    
    '& .card-media-loading': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: theme.palette.text.secondary,
    },
  })
);

// CardActions styled component
/**
 * StyledCardActions component
 * 
 * @returns JSX element
 */
export const StyledCardActions = styled('div')<any>(
  ({ theme, align = 'left', size, disableSpacing = false }: any) => {
    const sizeConfig = CARD_SIZE_CONFIGS[size as keyof typeof CARD_SIZE_CONFIGS];
    
    const getJustifyContent = () => {
      switch (align) {
        case 'center': return 'center';
        case 'right': return 'flex-end';
        case 'space-between': return 'space-between';
        default: return 'flex-start';
      }
    };
    
    return {
      padding: disableSpacing ? 0 : sizeConfig.actionsPadding,
      display: 'flex',
      alignItems: 'center',
      justifyContent: getJustifyContent(),
      gap: disableSpacing ? 0 : theme.spacing(1),
      
      '& .MuiButton-root': {
        minWidth: 'auto',
      },
    };
  }
);