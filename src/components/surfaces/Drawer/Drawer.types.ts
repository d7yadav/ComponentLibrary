import { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import { ReactNode } from 'react';

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
  /**
   * The variant of the drawer
   */
  variant?: DrawerVariant;
  
  /**
   * The anchor position of the drawer
   */
  anchor?: DrawerAnchor;
  
  /**
   * The size of the drawer
   */
  size?: DrawerSize;
  
  /**
   * The behavior of the drawer when opened
   */
  behavior?: DrawerBehavior;
  
  /**
   * The animation type for the drawer
   */
  animation?: DrawerAnimation;
  
  /**
   * If true, the drawer is open
   */
  open: boolean;
  
  /**
   * Callback fired when the drawer requests to be closed
   */
  onClose?: (event: {}, reason?: 'backdropClick' | 'escapeKeyDown' | 'swipeToClose') => void;
  
  /**
   * If true, clicking the backdrop will close the drawer
   */
  closeOnBackdropClick?: boolean;
  
  /**
   * If true, pressing escape will close the drawer
   */
  closeOnEscape?: boolean;
  
  /**
   * If true, enables swipe-to-open/close gestures on mobile
   */
  swipeEnabled?: boolean;
  
  /**
   * The width of the drawer in pixels or percentage (for left/right anchors)
   */
  width?: string | number;
  
  /**
   * The height of the drawer in pixels or percentage (for top/bottom anchors)
   */
  height?: string | number;
  
  /**
   * Minimum width for collapsed mini drawer
   */
  miniWidth?: string | number;
  
  /**
   * If true, the drawer is collapsed (for mini variant)
   */
  collapsed?: boolean;
  
  /**
   * Callback fired when mini drawer collapse state changes
   */
  onCollapseChange?: (collapsed: boolean) => void;
  
  /**
   * If true, shows a backdrop behind the drawer
   */
  backdrop?: boolean;
  
  /**
   * Custom z-index for the drawer
   */
  zIndex?: number;
  
  /**
   * The content of the drawer
   */
  children: ReactNode;
  
  /**
   * Header content of the drawer
   */
  header?: ReactNode;
  
  /**
   * Footer content of the drawer
   */
  footer?: ReactNode;
  
  /**
   * Navigation content for the drawer
   */
  navigation?: ReactNode;
  
  /**
   * If true, will show a toggle button for mini drawer
   */
  showToggleButton?: boolean;
  
  /**
   * Custom toggle button content
   */
  toggleButtonContent?: ReactNode;
  
  /**
   * Additional CSS classes for the drawer container
   */
  className?: string;
  
  /**
   * Additional CSS classes for the drawer content
   */
  contentClassName?: string;
  
  /**
   * Custom styles for the drawer container
   */
  style?: React.CSSProperties;
  
  /**
   * Custom styles for the drawer content
   */
  contentStyle?: React.CSSProperties;
  
  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;
  
  /**
   * If true, the drawer will have a paper-like elevation
   */
  elevation?: boolean;
  
  /**
   * Elevation level (0-24)
   */
  elevationLevel?: number;
  
  /**
   * If true, the drawer header will be fixed during scroll
   */
  fixedHeader?: boolean;
  
  /**
   * If true, the drawer footer will be fixed during scroll
   */
  fixedFooter?: boolean;
  
  /**
   * If true, the drawer will not auto-focus the first element
   */
  disableAutoFocus?: boolean;
  
  /**
   * If true, the drawer will not restore focus when closed
   */
  disableRestoreFocus?: boolean;
  
  /**
   * If true, the drawer will not enforce focus trap
   */
  disableEnforceFocus?: boolean;
  
  /**
   * If true, the drawer will not be scrollable
   */
  disableScrolling?: boolean;
  
  /**
   * Callback fired when the drawer has opened
   */
  onOpened?: () => void;
  
  /**
   * Callback fired when the drawer has closed
   */
  onClosed?: () => void;
  
  /**
   * Callback fired when swipe gesture is detected
   */
  onSwipe?: (direction: 'open' | 'close') => void;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * ARIA labelledby for accessibility
   */
  'aria-labelledby'?: string;
  
  /**
   * ARIA describedby for accessibility
   */
  'aria-describedby'?: string;
  
  /**
   * If true, enables responsive behavior on mobile
   */
  responsive?: boolean;
  
  /**
   * Breakpoint for responsive behavior
   */
  responsiveBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Variant to use on mobile when responsive is true
   */
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