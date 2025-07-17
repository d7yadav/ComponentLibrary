
import { Badge as MuiBadge } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import {
  BADGE_SIZE_CONFIGS,
  BADGE_ANIMATION_DURATIONS,
  BADGE_ANIMATION_EASINGS,
  BADGE_ACCESSIBILITY_CONSTANTS,
} from './Badge.constants';
import type { BadgeStyleProps } from './Badge.types';

/**
 * StyledBadge - Main badge container with enhanced styles and accessibility
 */
// Extend the prop type to include customSize, interactive, and disabled
interface StyledBadgeExtraProps {
  customSize?: keyof typeof BADGE_SIZE_CONFIGS;
  interactive?: boolean;
  disabled?: boolean;
}
export const StyledBadge: React.ComponentType<Partial<BadgeStyleProps> & StyledBadgeExtraProps & { children?: React.ReactNode }> = styled(MuiBadge, {
  shouldForwardProp: (prop) => !['customSize', 'interactive', 'disabled'].includes(prop as string),
})<Partial<BadgeStyleProps> & StyledBadgeExtraProps>(({ theme, customSize = 'medium', interactive = false, disabled = false }) => {
  // Ensure customSize is a valid key for BADGE_SIZE_CONFIGS
  const sizeConfig = BADGE_SIZE_CONFIGS[customSize];

  return {
    // Badge wrapper styles
    position: 'relative',
    display: 'inline-flex',

    // Enhanced badge styles
    '& .MuiBadge-badge': {
      height: sizeConfig.height,
      minWidth: sizeConfig.minWidth,
      fontSize: sizeConfig.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      borderRadius: sizeConfig.borderRadius,
      padding: sizeConfig.padding,
      lineHeight: 1,
      letterSpacing: '0.02em',
      fontFamily: theme.typography.fontFamily,
      border: `1px solid ${theme.palette.background.paper}`,
      boxShadow: theme.shadows[1],
      transition: `all ${BADGE_ANIMATION_DURATIONS.hover} ${BADGE_ANIMATION_EASINGS.hover}`,

      // Positioning adjustments using theme spacing
      '&.MuiBadge-anchorOriginTopRight': {
        top: theme.spacing(-0.5),
        right: theme.spacing(-0.5),
      },
      '&.MuiBadge-anchorOriginTopLeft': {
        top: theme.spacing(-0.5),
        left: theme.spacing(-0.5),
      },
      '&.MuiBadge-anchorOriginBottomRight': {
        bottom: theme.spacing(-0.5),
        right: theme.spacing(-0.5),
      },
      '&.MuiBadge-anchorOriginBottomLeft': {
        bottom: theme.spacing(-0.5),
        left: theme.spacing(-0.5),
      },

      // Dot variant styles
      '&.MuiBadge-dot': {
        width: sizeConfig.dotSize,
        height: sizeConfig.dotSize,
        borderRadius: '50%',
        minWidth: sizeConfig.dotSize,
        padding: 0,
      },

      // Interactive states for clickable badges
      ...(interactive && {
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: theme.shadows[2],
          zIndex: theme.zIndex.tooltip + 1,
        },
        '&:focus-visible': {
          outline: `${BADGE_ACCESSIBILITY_CONSTANTS.focusOutlineWidth}px solid ${theme.palette.primary.main}`,
          outlineOffset: BADGE_ACCESSIBILITY_CONSTANTS.focusOutlineOffset,
          zIndex: theme.zIndex.tooltip + 1,
        },
        '&:active': {
          transform: 'scale(1.05)',
          transition: `transform ${BADGE_ANIMATION_DURATIONS.enter} ${BADGE_ANIMATION_EASINGS.enter}`,
        },
      }),

      // Disabled state
      ...(disabled && {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      }),

      // Color variants with proper contrast
      '&.MuiBadge-colorPrimary': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
      '&.MuiBadge-colorSecondary': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
      },
      '&.MuiBadge-colorError': {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
      },
      '&.MuiBadge-colorInfo': {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.info.contrastText,
      },
      '&.MuiBadge-colorSuccess': {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
      },
      '&.MuiBadge-colorWarning': {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
      },
    },

    // Animation for badge appearance/disappearance
    '& .MuiBadge-badge.MuiBadge-invisible': {
      transition: `all ${BADGE_ANIMATION_DURATIONS.exit} ${BADGE_ANIMATION_EASINGS.exit}`,
      transform: 'scale(0)',
      opacity: 0,
    },

    // Ensure minimum touch target for interactive badges
    ...(interactive && {
      '& .MuiBadge-badge': {
        minWidth: Math.max(sizeConfig.minWidth, BADGE_ACCESSIBILITY_CONSTANTS.minTouchTarget / 2),
        minHeight: Math.max(sizeConfig.height, BADGE_ACCESSIBILITY_CONSTANTS.minTouchTarget / 2),
      },
    }),
  };
});