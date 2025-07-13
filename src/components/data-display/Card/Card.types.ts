import { CardProps as MuiCardProps } from '@mui/material/Card';
import { ReactNode, MouseEvent } from 'react';

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
  /**
   * The variant of the card
   */
  variant?: CardVariant;
  
  /**
   * The elevation level of the card (shadow depth)
   */
  elevation?: CardElevation;
  
  /**
   * The size/spacing variant of the card
   */
  size?: CardSize;
  
  /**
   * The orientation of the card layout
   */
  orientation?: CardOrientation;
  
  /**
   * If true, the card will be interactive (hover effects, clickable)
   */
  interactive?: boolean;
  
  /**
   * If true, the card will be disabled
   */
  disabled?: boolean;
  
  /**
   * If true, the card will be selected
   */
  selected?: boolean;
  
  /**
   * Callback fired when the card is clicked (only if interactive=true)
   */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  
  /**
   * Custom header content
   */
  header?: ReactNode;
  
  /**
   * Custom media content (images, videos)
   */
  media?: ReactNode;
  
  /**
   * Main card content
   */
  children?: ReactNode;
  
  /**
   * Action buttons or controls
   */
  actions?: ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * ARIA role for accessibility
   */
  role?: string;
  
  /**
   * Tab index for keyboard navigation
   */
  tabIndex?: number;
}

export interface CardHeaderProps {
  /**
   * The main title content
   */
  title?: ReactNode;
  
  /**
   * The subtitle content
   */
  subtitle?: ReactNode;
  
  /**
   * Avatar or icon content
   */
  avatar?: ReactNode;
  
  /**
   * Action content (usually IconButton)
   */
  action?: ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Custom component to render title
   */
  titleTypographyProps?: object;
  
  /**
   * Custom component to render subtitle
   */
  subheaderTypographyProps?: object;
}

export interface CardContentProps {
  /**
   * The content of the card body
   */
  children?: ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * The size/spacing variant
   */
  size?: CardSize;
}

export interface CardMediaProps {
  /**
   * The media source (image URL, video URL, etc.)
   */
  src?: string;
  
  /**
   * Alternative text for images
   */
  alt?: string;
  
  /**
   * The type of media
   */
  component?: 'img' | 'video' | 'div';
  
  /**
   * Custom height for the media
   */
  height?: number | string;
  
  /**
   * Custom width for the media
   */
  width?: number | string;
  
  /**
   * Object fit for images/videos
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  
  /**
   * Loading strategy for images
   */
  loading?: 'lazy' | 'eager';
  
  /**
   * If true, shows loading placeholder
   */
  showLoading?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children content for custom media
   */
  children?: ReactNode;
}

export interface CardActionsProps {
  /**
   * The action content (buttons, links, etc.)
   */
  children?: ReactNode;
  
  /**
   * If true, actions will not have padding
   */
  disableSpacing?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Alignment of actions
   */
  align?: 'left' | 'center' | 'right' | 'space-between';
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