import { Card as MuiCard } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import React from 'react';

import {
  CARD_SIZE_CONFIGS,
  CARD_ELEVATION_SHADOWS,
  CARD_INTERACTION_STATES,
  GLASS_MORPHISM_CARD_CONFIG,
  CARD_ANIMATION_DURATIONS,
  CARD_ANIMATION_EASINGS,
  ACCESSIBILITY_CONSTANTS,
} from './Card.constants';

// Explicit prop type for styled card
interface StyledCardProps {
  customVariant?: string;
  customElevation?: number;
  customSize?: keyof typeof CARD_SIZE_CONFIGS;
  customOrientation?: 'horizontal' | 'vertical';
  interactive?: boolean;
  disabled?: boolean;
  selected?: boolean;
  hasHeader?: boolean;
  hasMedia?: boolean;
  hasActions?: boolean;
  // Allow onClick for interactive cards
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// Type assertion for elevation shadows
const CARD_ELEVATION_SHADOWS_TYPED: Record<number, string> = CARD_ELEVATION_SHADOWS as Record<number, string>;

export const StyledCard: React.ComponentType<StyledCardProps & { children?: React.ReactNode }> = styled(MuiCard, {
  shouldForwardProp: (prop) => !['customVariant', 'customElevation', 'customSize', 'customOrientation', 'interactive', 'disabled', 'selected', 'hasHeader', 'hasMedia', 'hasActions'].includes(prop as string),
})<StyledCardProps>(({ theme, customVariant, customElevation = 1, customSize = 'comfortable', customOrientation = 'vertical', interactive = false, disabled = false, selected = false }) => {
  const sizeConfig = CARD_SIZE_CONFIGS[customSize];
  const isGlass = customVariant === 'glass';
  const isGradient = customVariant === 'gradient';
  const isOutlined = customVariant === 'outlined';
  const isFilled = customVariant === 'filled';
  const isInteractive = customVariant === 'interactive' || interactive;

  // Selection state styles
  const selectedStyles = selected
    ? {
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
      }
    : {};

  // Variant-based styles
  const getVariantStyles = (): Record<string, unknown> => {
    if (isGlass) {
      return {
        backgroundColor: `rgba(${theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'}, ${GLASS_MORPHISM_CARD_CONFIG.backgroundOpacity})`,
        backdropFilter: GLASS_MORPHISM_CARD_CONFIG.backdropFilter,
        border: `1px solid rgba(${theme.palette.mode === 'dark' ? '255, 255, 255' : '0, 0, 0'}, ${GLASS_MORPHISM_CARD_CONFIG.borderOpacity})`,
        boxShadow: CARD_ELEVATION_SHADOWS_TYPED[customElevation],
        '@supports not (backdrop-filter: blur())': {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        },
      };
    }
    if (isGradient) {
      // Use enhanced theme gradients if available, fallback to basic gradient
      const enhancedTheme = theme as Theme & { gradients?: { dark?: { primary?: string }, light?: { primary?: string } } };
      const gradients = theme.palette.mode === 'dark'
        ? enhancedTheme.gradients?.dark
        : enhancedTheme.gradients?.light;
      const gradient = gradients?.primary || `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`;
      return {
        background: gradient,
        color: theme.palette.primary.contrastText,
        border: 'none',
        boxShadow: CARD_ELEVATION_SHADOWS_TYPED[customElevation],
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
      boxShadow: CARD_ELEVATION_SHADOWS_TYPED[customElevation],
    };
  };

  // Interactive styles
  const getInteractiveStyles = (): Record<string, unknown> => {
    if (!isInteractive || disabled) return {};
    return {
      '&:hover': {
        transform: `scale(${CARD_INTERACTION_STATES.hover.scaleTransform})`,
        boxShadow:
          customElevation + CARD_INTERACTION_STATES.hover.elevationIncrease <= 24
            ? CARD_ELEVATION_SHADOWS_TYPED[customElevation + CARD_INTERACTION_STATES.hover.elevationIncrease]
            : CARD_ELEVATION_SHADOWS_TYPED[24],
        transition: CARD_INTERACTION_STATES.hover.transition,
      },
      '&:active': {
        transform: `scale(${CARD_INTERACTION_STATES.active.scaleTransform})`,
        transition: CARD_INTERACTION_STATES.active.transition,
      },
    };
  };

  return {
    borderRadius: sizeConfig.borderRadius,
    padding: 0, // Padding handled by child components
    position: 'relative' as const,
    overflow: 'hidden' as const,
    transition: `all ${CARD_ANIMATION_DURATIONS.hover} ${CARD_ANIMATION_EASINGS.spring}`,
    cursor: isInteractive && !disabled ? 'pointer' : 'default',
    opacity: disabled ? 0.6 : 1,
    display: 'flex',
    flexDirection: customOrientation === 'horizontal' ? 'row' : 'column',
    // Focus styles for accessibility
    '&:focus-visible': {
      outline: `${ACCESSIBILITY_CONSTANTS.focusOutlineWidth}px solid ${theme.palette.primary.main}`,
      outlineOffset: ACCESSIBILITY_CONSTANTS.focusOutlineOffset,
    },
    ...selectedStyles,
    ...getVariantStyles(),
    ...getInteractiveStyles(),
  };
});

// CardHeader styled component
interface StyledCardHeaderProps {
  theme: Theme;
  size?: keyof typeof CARD_SIZE_CONFIGS;
}
export const StyledCardHeader: React.ComponentType<StyledCardHeaderProps & { children?: React.ReactNode }> = styled('div')<StyledCardHeaderProps>(
  ({ theme, size = 'comfortable' }) => {
    const sizeConfig = CARD_SIZE_CONFIGS[size];
    return {
      padding: sizeConfig.headerPadding,
      display: 'flex',
      alignItems: 'flex-start',
      gap: theme.spacing(2),
      position: 'relative' as const,
      borderRadius: `${sizeConfig.borderRadius}px ${sizeConfig.borderRadius}px 0 0`,
      transition: `all ${CARD_ANIMATION_DURATIONS.hover} ${CARD_ANIMATION_EASINGS.spring}`,
      // Interactive states
      '&[data-interactive="true"]': {
        cursor: 'pointer',
        '&:hover:not([data-disabled="true"])': {
          backgroundColor: theme.palette.action.hover,
          transform: 'translateY(-1px)',
          '& .card-header-title': {
            color: theme.palette.primary.main,
          },
        },
        '&:focus-visible': {
          outline: `${ACCESSIBILITY_CONSTANTS.focusOutlineWidth}px solid ${theme.palette.primary.main}`,
          outlineOffset: ACCESSIBILITY_CONSTANTS.focusOutlineOffset,
          backgroundColor: theme.palette.action.focus,
        },
        '&:active:not([data-disabled="true"])': {
          backgroundColor: theme.palette.action.selected,
          transform: 'translateY(0px)',
        },
      },
      // Disabled state
      '&[data-disabled="true"]': {
        opacity: 0.6,
        cursor: 'not-allowed',
        '& .card-header-title, & .card-header-subtitle': {
          color: theme.palette.text.disabled,
        },
      },
      '& .card-header-avatar': {
        flexShrink: 0,
      },
      '& .card-header-content': {
        flex: 1,
        minWidth: 0, // Allows text truncation
      },
      '& .card-header-action': {
        flexShrink: 0,
        // Use string concatenation for negative spacing
        marginTop: '-' + theme.spacing(1),
        marginRight: '-' + theme.spacing(1),
      },
      '& .card-header-title': {
        margin: 0,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
        lineHeight: theme.typography.h6.lineHeight,
        color: theme.palette.text.primary,
        transition: `color ${CARD_ANIMATION_DURATIONS.hover} ${CARD_ANIMATION_EASINGS.spring}`,
      },
      '& .card-header-subtitle': {
        margin: `${theme.spacing(0.5)} 0 0`,
        fontSize: theme.typography.body2.fontSize,
        color: theme.palette.text.secondary,
        lineHeight: theme.typography.body2.lineHeight,
        transition: `color ${CARD_ANIMATION_DURATIONS.hover} ${CARD_ANIMATION_EASINGS.spring}`,
      },
    };
  }
);

// CardContent styled component
interface StyledCardContentProps {
  theme: Theme;
  size?: keyof typeof CARD_SIZE_CONFIGS;
}
export const StyledCardContent: React.ComponentType<StyledCardContentProps & { children?: React.ReactNode }> = styled('div')<StyledCardContentProps>(
  ({ theme, size = 'comfortable' }) => {
    const sizeConfig = CARD_SIZE_CONFIGS[size];
    return {
      padding: sizeConfig.contentPadding,
      flex: 1,
      position: 'relative' as const,
      transition: `all ${CARD_ANIMATION_DURATIONS.hover} ${CARD_ANIMATION_EASINGS.spring}`,
      '&:last-child': {
        paddingBottom: sizeConfig.padding,
      },
      // Interactive states
      '&[data-interactive="true"]': {
        cursor: 'pointer',
        borderRadius: theme.spacing(0.5),
        '&:hover:not([data-disabled="true"])': {
          backgroundColor: theme.palette.action.hover,
          transform: 'translateY(-2px)',
          boxShadow: `0 2px 8px ${theme.palette.action.hover}`,
        },
        '&:focus-visible': {
          outline: `${ACCESSIBILITY_CONSTANTS.focusOutlineWidth}px solid ${theme.palette.primary.main}`,
          outlineOffset: ACCESSIBILITY_CONSTANTS.focusOutlineOffset,
          backgroundColor: theme.palette.action.focus,
        },
        '&:active:not([data-disabled="true"])': {
          backgroundColor: theme.palette.action.selected,
          transform: 'translateY(0px)',
        },
      },
      // Disabled state
      '&[data-disabled="true"]': {
        opacity: 0.6,
        cursor: 'not-allowed',
        color: theme.palette.text.disabled,
      },
      // Enhanced typography hierarchy
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        margin: `0 0 ${theme.spacing(1)} 0`,
        '&:last-child': {
          marginBottom: 0,
        },
      },
      '& p': {
        margin: `0 0 ${theme.spacing(1)} 0`,
        '&:last-child': {
          marginBottom: 0,
        },
      },
      '& ul, & ol': {
        margin: `0 0 ${theme.spacing(1)} 0`,
        paddingLeft: theme.spacing(2),
        '&:last-child': {
          marginBottom: 0,
        },
      },
    };
  }
);

// CardMedia styled component
interface StyledCardMediaProps {
  theme: Theme;
  height?: number | string;
  objectFit?: string;
}
export const StyledCardMedia: React.ComponentType<StyledCardMediaProps & { children?: React.ReactNode }> = styled('div')<StyledCardMediaProps>(
  ({ theme, height = 200, objectFit = 'cover' }) => ({
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
interface StyledCardActionsProps {
  theme: Theme;
  align?: 'left' | 'center' | 'right' | 'space-between';
  size?: keyof typeof CARD_SIZE_CONFIGS;
  disableSpacing?: boolean;
  // Add ref support for forwardRef
  ref?: React.Ref<HTMLDivElement>;
}

// Use styled component for StyledCardActions
export const StyledCardActions = styled('div')<StyledCardActionsProps>(
  ({ theme, align = 'left', size = 'comfortable', disableSpacing = false }) => {
    const sizeConfig = CARD_SIZE_CONFIGS[size];
    const getJustifyContent = (): string => {
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
    };
  }
);