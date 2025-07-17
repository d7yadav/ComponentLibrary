
import type { Theme } from '@mui/material/styles';
import type { ReactNode, HTMLAttributes } from 'react';

// Tooltip placement options
export type TooltipPlacement = 
  | 'bottom-end' | 'bottom-start' | 'bottom'
  | 'left-end' | 'left-start' | 'left'
  | 'right-end' | 'right-start' | 'right'
  | 'top-end' | 'top-start' | 'top';

// Tooltip arrow placement
export type TooltipArrowPlacement = 'center' | 'start' | 'end';

// Tooltip variants
export type TooltipVariant = 'standard' | 'rich' | 'light' | 'dark';

// Tooltip trigger types
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

// Main Tooltip props
export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  // Content props
  children: React.ReactElement;
  title: ReactNode;
  
  // Behavior props
  open?: boolean;
  defaultOpen?: boolean;
  
  // Appearance props
  placement?: TooltipPlacement;
  variant?: TooltipVariant;
  arrow?: boolean;
  
  // Trigger props
  trigger?: TooltipTrigger | TooltipTrigger[];
  disableHoverListener?: boolean;
  disableFocusListener?: boolean;
  disableTouchListener?: boolean;
  disableInteractive?: boolean;
  
  // Timing props
  enterDelay?: number;
  leaveDelay?: number;
  enterNextDelay?: number;
  enterTouchDelay?: number;
  leaveTouchDelay?: number;
  
  // Event handlers
  onOpen?: () => void;
  onClose?: () => void;
  
  // Advanced props
  followCursor?: boolean;
  PopperComponent?: React.ComponentType<any>;
  PopperProps?: object;
  TransitionComponent?: React.ComponentType<any>;
  TransitionProps?: object;
  
  // Styling props
  className?: string;
  sx?: any;
  
  // Components customization
  components?: {
    Tooltip?: React.ElementType;
    Popper?: React.ElementType;
    Transition?: React.ElementType;
    Arrow?: React.ElementType;
  },
  
  componentsProps?: {
    tooltip?: object;
    popper?: object;
    transition?: object;
    arrow?: object;
  },
  
  // Accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  describeChild?: boolean;
  
  // Portal props
  disablePortal?: boolean;
  container?: Element | (() => Element) | null;
}

// Styled component props
export interface TooltipStyleProps {
  theme: Theme;
  placement: TooltipPlacement;
  variant: TooltipVariant;
  hasArrow?: boolean;
  interactive?: boolean;
}

export interface TooltipArrowStyleProps {
  theme: Theme;
  placement: TooltipPlacement;
  variant: TooltipVariant;
}

export interface TooltipContentStyleProps {
  theme: Theme;
  variant: TooltipVariant;
  maxWidth?: number | string;
}

// Tooltip context for rich tooltips
export interface TooltipContextValue {
  placement: TooltipPlacement;
  variant: TooltipVariant;
  isOpen: boolean;
  close: () => void;
}

// Rich tooltip content props
export interface RichTooltipProps {
  title?: ReactNode;
  content?: ReactNode;
  actions?: ReactNode;
  avatar?: ReactNode;
  maxWidth?: number | string;
  className?: string;
}

// Constants export type
export interface TooltipConstants {
  PLACEMENTS: Record<string, TooltipPlacement>;
  VARIANTS: Record<string, TooltipVariant>;
  TRIGGERS: Record<string, TooltipTrigger>;
  DEFAULT_PROPS: Partial<TooltipProps>;
  TIMING: {
    ENTER_DELAY: number;
    LEAVE_DELAY: number;
    ENTER_NEXT_DELAY: number;
    ENTER_TOUCH_DELAY: number;
    LEAVE_TOUCH_DELAY: number;
  };
  DIMENSIONS: {
    MAX_WIDTH: number;
    ARROW_SIZE: number;
    PADDING: Record<string, number>;
    BORDER_RADIUS: number;
  };
  Z_INDEX: {
    TOOLTIP: number;
  };
  ACCESSIBILITY: {
    ROLES: Record<string, string>;
    ARIA_LABELS: Record<string, string>;
  };
}