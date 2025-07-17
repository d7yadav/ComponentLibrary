
import React from 'react';

import type {
  TooltipPlacement,
  TooltipVariant,
  TooltipTrigger,
  TooltipConstants
} from './Tooltip.types';

// Tooltip placements
export const TOOLTIP_PLACEMENTS: Record<string, TooltipPlacement> = {
  'bottom-end': 'bottom-end',
  'bottom-start': 'bottom-start',
  'bottom': 'bottom',
  'left-end': 'left-end',
  'left-start': 'left-start',
  'left': 'left',
  'right-end': 'right-end',
  'right-start': 'right-start',
  'right': 'right',
  'top-end': 'top-end',
  'top-start': 'top-start',
  'top': 'top',
} as const;

// Tooltip variants
export const TOOLTIP_VARIANTS: Record<string, TooltipVariant> = {
  standard: 'standard',
  rich: 'rich',
  light: 'light',
  dark: 'dark',
} as const;

// Tooltip triggers
export const TOOLTIP_TRIGGERS: Record<string, TooltipTrigger> = {
  hover: 'hover',
  focus: 'focus',
  click: 'click',
  manual: 'manual',
} as const;

// Default component props
export const DEFAULT_TOOLTIP_PROPS = {
  placement: TOOLTIP_PLACEMENTS.bottom,
  variant: TOOLTIP_VARIANTS.standard,
  trigger: [TOOLTIP_TRIGGERS.hover, TOOLTIP_TRIGGERS.focus] as TooltipTrigger[],
  arrow: false,
  disableHoverListener: false,
  disableFocusListener: false,
  disableTouchListener: false,
  disableInteractive: false,
  followCursor: false,
  describeChild: false,
  disablePortal: false,
  enterDelay: 100,
  leaveDelay: 0,
  enterNextDelay: 0,
  enterTouchDelay: 700,
  leaveTouchDelay: 1500,
} as const;

// Timing constants
export const TIMING_CONSTANTS = {
  ENTER_DELAY: 100,
  LEAVE_DELAY: 0,
  ENTER_NEXT_DELAY: 0,
  ENTER_TOUCH_DELAY: 700,
  LEAVE_TOUCH_DELAY: 1500,
} as const;

// Dimension constants
export const DIMENSION_CONSTANTS = {
  MAX_WIDTH: 300,
  ARROW_SIZE: 8,
  PADDING: {
    HORIZONTAL: 8,
    VERTICAL: 4,
    RICH_HORIZONTAL: 16,
    RICH_VERTICAL: 12,
  },
  BORDER_RADIUS: 4,
  RICH_BORDER_RADIUS: 8,
} as const;

// Z-index constants
export const Z_INDEX_CONSTANTS = {
  TOOLTIP: 1500,
} as const;

// Accessibility constants
export const ACCESSIBILITY_CONSTANTS = {
  ROLES: {
    TOOLTIP: 'tooltip',
    BUTTON: 'button',
  },
  ARIA_LABELS: {
    TOOLTIP: 'Tooltip',
    CLOSE: 'Close tooltip',
  },
} as const;

// Tooltip utilities
export const TOOLTIP_UTILS = {
  getArrowPosition: (placement: TooltipPlacement): {
    position: 'top' | 'bottom' | 'left' | 'right',
    alignment: 'start' | 'center' | 'end',
  } => {
    const [position, alignment = 'center'] = placement.split('-') as [string, string?];
    return {
      position: position as 'top' | 'bottom' | 'left' | 'right',
      alignment: alignment as 'start' | 'center' | 'end',
    };
  },

  getTransformOrigin: (placement: TooltipPlacement): string => {
    const { position, alignment } = TOOLTIP_UTILS.getArrowPosition(placement);
    const horizontalMap = {
      start: 'left',
      center: 'center',
      end: 'right',
    };
    const verticalMap = {
      start: 'top',
      center: 'center',
      end: 'bottom',
    };
    switch (position) {
      case 'top':
        return `${horizontalMap[alignment]} bottom`;
      case 'bottom':
        return `${horizontalMap[alignment]} top`;
      case 'left':
        return `right ${verticalMap[alignment]}`;
      case 'right':
        return `left ${verticalMap[alignment]}`;
      default:
        return 'center bottom';
    }
  },

  getArrowStyles: (placement: TooltipPlacement, theme: any): object => {
    const { position, alignment } = TOOLTIP_UTILS.getArrowPosition(placement);
    const arrowSize = DIMENSION_CONSTANTS.ARROW_SIZE;
    const baseStyles = {
      position: 'absolute' as const,
      width: 0,
      height: 0,
    };
    const alignmentStyles = {
      start: { left: 12 },
      center: { left: '50%', transform: 'translateX(-50%)' },
      end: { right: 12 },
    };
    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          bottom: -arrowSize,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderTop: `${arrowSize}px solid ${theme.palette.grey[700]}`,
          ...alignmentStyles[alignment],
        };
      case 'bottom':
        return {
          ...baseStyles,
          top: -arrowSize,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid ${theme.palette.grey[700]}`,
          ...alignmentStyles[alignment],
        };
      case 'left':
        return {
          ...baseStyles,
          right: -arrowSize,
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderLeft: `${arrowSize}px solid ${theme.palette.grey[700]}`,
          top: alignment === 'start' ? 12 : alignment === 'end' ? 'auto' : '50%',
          bottom: alignment === 'end' ? 12 : 'auto',
          transform: alignment === 'center' ? 'translateY(-50%)' : undefined,
        };
      case 'right':
        return {
          ...baseStyles,
          left: -arrowSize,
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid ${theme.palette.grey[700]}`,
          top: alignment === 'start' ? 12 : alignment === 'end' ? 'auto' : '50%',
          bottom: alignment === 'end' ? 12 : 'auto',
          transform: alignment === 'center' ? 'translateY(-50%)' : undefined,
        };
      default:
        return baseStyles;
    }
  },

  isTriggerActive: (
    triggers: TooltipTrigger | TooltipTrigger[],
    triggerType: TooltipTrigger
  ): boolean => {
    const triggerArray = Array.isArray(triggers) ? triggers : [triggers];
    return triggerArray.includes(triggerType);
  },

  getPlacementOffset: (placement: TooltipPlacement): [number, number] => {
    const { position } = TOOLTIP_UTILS.getArrowPosition(placement);
    const offset = 8; // Distance from target element
    switch (position) {
      case 'top':
        return [0, -offset];
      case 'bottom':
        return [0, offset];
      case 'left':
        return [-offset, 0];
      case 'right':
        return [offset, 0];
      default:
        return [0, offset];
    }
  },

  generateTooltipId: (prefix: string = 'tooltip'): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  hasInteractiveContent: (content: React.ReactNode): boolean => {
    if (!content) return false;
    // Check if content contains interactive elements
    const interactiveElements = ['button', 'a', 'input', 'select', 'textarea'];
    if (React.isValidElement(content)) {
      const elementType = typeof content.type === 'string' ? content.type : null;
      return elementType ? interactiveElements.includes(elementType) : false;
    }
    return false;
  },

  getVariantStyles: (variant: TooltipVariant, theme: any): object => {
    switch (variant) {
      case 'light':
        return {
          backgroundColor: theme.palette.common.white,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[4],
        };
      case 'dark':
        return {
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.common.white,
        };
      case 'rich':
        return {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[8],
          padding: `${DIMENSION_CONSTANTS.PADDING.RICH_VERTICAL}px ${DIMENSION_CONSTANTS.PADDING.RICH_HORIZONTAL}px`,
          borderRadius: DIMENSION_CONSTANTS.RICH_BORDER_RADIUS,
          maxWidth: DIMENSION_CONSTANTS.MAX_WIDTH,
        };
      case 'standard':
      default:
        return {
          backgroundColor: theme.palette.grey[700],
          color: theme.palette.common.white,
        };
    }
  },
} as const;

// Export all constants as a single object
export const TOOLTIP_CONSTANTS: TooltipConstants = {
  PLACEMENTS: TOOLTIP_PLACEMENTS,
  VARIANTS: TOOLTIP_VARIANTS,
  TRIGGERS: TOOLTIP_TRIGGERS,
  DEFAULT_PROPS: DEFAULT_TOOLTIP_PROPS,
  TIMING: TIMING_CONSTANTS,
  DIMENSIONS: DIMENSION_CONSTANTS,
  Z_INDEX: Z_INDEX_CONSTANTS,
  ACCESSIBILITY: ACCESSIBILITY_CONSTANTS,
} as const;