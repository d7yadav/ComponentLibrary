
import type { ReactNode, MouseEvent, KeyboardEvent } from 'react';

import type { BADGE_COLORS, BADGE_VARIANTS, BADGE_OVERLAP, BADGE_SIZE_CONFIGS } from './Badge.constants';

export type BadgeColor = keyof typeof BADGE_COLORS;
export type BadgeVariant = keyof typeof BADGE_VARIANTS;
export type BadgeOverlap = keyof typeof BADGE_OVERLAP;
export type BadgeSize = keyof typeof BADGE_SIZE_CONFIGS;

export type BadgeAnchorOrigin = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
};

export interface BadgeProps {
  children?: ReactNode;
  
  badgeContent?: ReactNode;
  
  color?: BadgeColor;
  
  variant?: BadgeVariant;
  
  size?: BadgeSize;
  
  anchorOrigin?: BadgeAnchorOrigin;
  
  overlap?: BadgeOverlap;
  
  invisible?: boolean;
  
  showZero?: boolean;
  
  max?: number;
  
  interactive?: boolean;
  
  disabled?: boolean;
  
  className?: string;
  
  component?: React.ElementType;
  
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
  
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  
  tabIndex?: number;
  
  'aria-label'?: string;
  
  'aria-describedby'?: string;
  
  role?: string;
  
  'data-testid'?: string;
}

export interface BadgeStyleProps {
  color: BadgeColor;
  variant: BadgeVariant;
  size: BadgeSize;
  overlap: BadgeOverlap;
  anchorOrigin: BadgeAnchorOrigin;
  interactive: boolean;
  disabled: boolean;
  invisible: boolean;
}