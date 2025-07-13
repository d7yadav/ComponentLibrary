import { ModalProps as MuiModalProps } from '@mui/material/Modal';
import { ReactNode } from 'react';

export type ModalVariant = 
  | 'basic'
  | 'centered'
  | 'fullscreen'
  | 'drawer'
  | 'popover';

export type ModalPosition = 
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'custom';

export type ModalBackdrop = 
  | 'blur'
  | 'solid'
  | 'transparent'
  | 'none';

export type ModalAnimation = 
  | 'fade'
  | 'slide'
  | 'zoom'
  | 'scale'
  | 'drawer'
  | 'none';

export type ModalSize = 
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'fullscreen';

export interface ModalProps extends Omit<MuiModalProps, 'open' | 'onClose' | 'children'> {
  /**
   * The variant of the modal
   */
  variant?: ModalVariant;
  
  /**
   * The position of the modal
   */
  position?: ModalPosition;
  
  /**
   * The backdrop style of the modal
   */
  backdrop?: ModalBackdrop;
  
  /**
   * The animation type for the modal
   */
  animation?: ModalAnimation;
  
  /**
   * The size of the modal
   */
  size?: ModalSize;
  
  /**
   * If true, the modal is open
   */
  open: boolean;
  
  /**
   * Callback fired when the modal requests to be closed
   */
  onClose?: (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void;
  
  /**
   * If true, clicking the backdrop will close the modal
   */
  closeOnBackdropClick?: boolean;
  
  /**
   * If true, pressing escape will close the modal
   */
  closeOnEscape?: boolean;
  
  /**
   * If true, the modal will disable scroll lock
   */
  disableScrollLock?: boolean;
  
  /**
   * If true, the modal will be rendered as fullscreen on mobile
   */
  mobileFullscreen?: boolean;
  
  /**
   * Custom z-index for the modal
   */
  zIndex?: number;
  
  /**
   * The title of the modal (for accessibility)
   */
  title?: string;
  
  /**
   * The description of the modal (for accessibility)
   */
  description?: string;
  
  /**
   * The content of the modal
   */
  children: ReactNode;
  
  /**
   * Header content of the modal
   */
  header?: ReactNode;
  
  /**
   * Footer content of the modal
   */
  footer?: ReactNode;
  
  /**
   * If true, will show a close button in the header
   */
  showCloseButton?: boolean;
  
  /**
   * Custom close button content
   */
  closeButtonContent?: ReactNode;
  
  /**
   * Additional CSS classes for the modal container
   */
  className?: string;
  
  /**
   * Additional CSS classes for the modal content
   */
  contentClassName?: string;
  
  /**
   * Custom styles for the modal container
   */
  style?: React.CSSProperties;
  
  /**
   * Custom styles for the modal content
   */
  contentStyle?: React.CSSProperties;
  
  /**
   * Custom position coordinates for 'custom' position
   */
  customPosition?: {
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
  };
  
  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;
  
  /**
   * If true, the modal will have a paper-like elevation
   */
  elevation?: boolean;
  
  /**
   * Maximum width of the modal content
   */
  maxWidth?: string | number;
  
  /**
   * Maximum height of the modal content
   */
  maxHeight?: string | number;
  
  /**
   * If true, the modal will not auto-focus the first element
   */
  disableAutoFocus?: boolean;
  
  /**
   * If true, the modal will not restore focus when closed
   */
  disableRestoreFocus?: boolean;
  
  /**
   * If true, the modal will not enforce focus trap
   */
  disableEnforceFocus?: boolean;
  
  /**
   * Callback fired when the modal has entered
   */
  onEntered?: () => void;
  
  /**
   * Callback fired when the modal has exited
   */
  onExited?: () => void;
  
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
}

export interface ModalStyleProps {
  variant: ModalVariant;
  position: ModalPosition;
  backdrop: ModalBackdrop;
  animation: ModalAnimation;
  size: ModalSize;
  open: boolean;
  mobileFullscreen: boolean;
  elevation: boolean;
  animationDuration: number;
  customPosition?: ModalProps['customPosition'];
  maxWidth?: string | number;
  maxHeight?: string | number;
}

export interface ModalContentStyleProps {
  variant: ModalVariant;
  size: ModalSize;
  hasHeader: boolean;
  hasFooter: boolean;
  mobileFullscreen: boolean;
}