import type { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import type { ReactNode } from 'react';

export type DrawerVariant = 
  | 'temporary'
  | 'persistent'
  | 'permanent'
  | 'mini';

export type DrawerAnchor = 
  | 'left'
  | 'right'
  | 'top'
  | 'bottom';

export type DrawerSize = 
  | 'compact'
  | 'standard'
  | 'wide'
  | 'auto';

export type DrawerBehavior = 
  | 'overlay'
  | 'push'
  | 'squeeze';

export type DrawerAnimation = 
  | 'slide'
  | 'fade'
  | 'scale'
  | 'none';

export interface DrawerProps extends Omit<MuiDrawerProps, 'variant' | 'anchor' | 'open' | 'onClose' | 'elevation'> {
  variant?: DrawerVariant;
  
  anchor?: DrawerAnchor;
  
  size?: DrawerSize;
  
  behavior?: DrawerBehavior;
  
  animation?: DrawerAnimation;
  
  open: boolean;
  
  onClose?: (event: {}, reason?: 'backdropClick' | 'escapeKeyDown' | 'swipeToClose') => void;
  
  closeOnBackdropClick?: boolean;
  
  closeOnEscape?: boolean;
  
  swipeEnabled?: boolean;
  
  width?: string | number;
  
  height?: string | number;
  
  miniWidth?: string | number;
  
  collapsed?: boolean;
  
  onCollapseChange?: (collapsed: boolean) => void;
  
  backdrop?: boolean;
  
  zIndex?: number;
  
  children: ReactNode;
  
  header?: ReactNode;
  
  footer?: ReactNode;
  
  navigation?: ReactNode;
  
  showToggleButton?: boolean;
  
  toggleButtonContent?: ReactNode;
  
  className?: string;
  
  contentClassName?: string;
  
  style?: React.CSSProperties;
  
  contentStyle?: React.CSSProperties;
  
  animationDuration?: number;
  
  elevation?: boolean;

  hideScrollbar?: boolean;

  disableScroll?: boolean;

  headerVariant?: 'default' | 'primary' | 'gradient';
  
  elevationLevel?: number;
  
  fixedHeader?: boolean;
  
  fixedFooter?: boolean;
  
  disableAutoFocus?: boolean;
  
  disableRestoreFocus?: boolean;
  
  disableEnforceFocus?: boolean;
  
  disableScrolling?: boolean;
  
  onOpened?: () => void;
  
  onClosed?: () => void;
  
  onSwipe?: (direction: 'open' | 'close') => void;
  
  'aria-label'?: string;
  
  'aria-labelledby'?: string;
  
  'aria-describedby'?: string;
  
  responsive?: boolean;
  
  responsiveBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  mobileVariant?: DrawerVariant;
}

export interface DrawerStyleProps {
  variant: DrawerVariant;
  anchor: DrawerAnchor;
  size: DrawerSize;
  behavior: DrawerBehavior;
  animation: DrawerAnimation;
  open: boolean;
  collapsed: boolean;
  backdrop: boolean;
  elevation: boolean;
  elevationLevel: number;
  animationDuration: number;
  width?: string | number;
  height?: string | number;
  miniWidth?: string | number;
  responsive: boolean;
  responsiveBreakpoint: string;
}

export interface DrawerContentStyleProps {
  variant: DrawerVariant;
  anchor: DrawerAnchor;
  size: DrawerSize;
  collapsed: boolean;
  hasHeader: boolean;
  hasFooter: boolean;
  fixedHeader: boolean;
  fixedFooter: boolean;
  disableScrolling: boolean;
}

export interface SwipeHandlers {
  onTouchStart: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
}