import type { CardProps as MuiCardProps } from '@mui/material/Card';
import type { ReactNode, MouseEvent } from 'react';

export type CardVariant = 
  | 'elevated'
  | 'outlined'
  | 'filled'
  | 'glass'
  | 'gradient'
  | 'interactive';

export type CardElevation = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;

export type CardSize = 'compact' | 'comfortable' | 'spacious';

export type CardOrientation = 'vertical' | 'horizontal';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  variant?: CardVariant;
  
  elevation?: CardElevation;
  
  size?: CardSize;
  
  orientation?: CardOrientation;
  
  interactive?: boolean;
  
  disabled?: boolean;
  
  selected?: boolean;
  
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  
  header?: ReactNode;
  
  media?: ReactNode;
  
  children?: ReactNode;
  
  actions?: ReactNode;
  
  className?: string;
  
  'aria-label'?: string;
  
  role?: string;
  
  tabIndex?: number;
}

export interface CardHeaderProps {
  title?: ReactNode;
  
  subtitle?: ReactNode;
  
  avatar?: ReactNode;
  
  action?: ReactNode;
  
  className?: string;
  
  titleTypographyProps?: object;
  
  subtitleTypographyProps?: object;
  
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  'aria-label'?: string;
  
  'aria-describedby'?: string;
  
  disabled?: boolean;
  
  tabIndex?: number;
  
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface CardContentProps {
  children?: ReactNode;
  
  className?: string;
  
  size?: CardSize;
  
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  disabled?: boolean;
  
  tabIndex?: number;
  
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  
  'aria-label'?: string;
  
  'aria-describedby'?: string;
  
  role?: string;
}

export interface CardMediaProps {
  src?: string;
  
  alt?: string;
  
  component?: 'img' | 'video' | 'div';
  
  height?: number | string;
  
  width?: number | string;
  
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  
  loading?: 'lazy' | 'eager';
  
  showLoading?: boolean;
  
  className?: string;
  
  children?: ReactNode;
}

export interface CardActionsProps {
  children?: ReactNode;
  
  disableSpacing?: boolean;
  
  className?: string;
  
  align?: 'left' | 'center' | 'right' | 'space-between';
  
  size?: CardSize;
  
  disabled?: boolean;
}

export interface CardStyleProps {
  variant: CardVariant;
  elevation: CardElevation;
  size: CardSize;
  orientation: CardOrientation;
  interactive: boolean;
  disabled: boolean;
  selected: boolean;
  hasHeader: boolean;
  hasMedia: boolean;
  hasActions: boolean;
}