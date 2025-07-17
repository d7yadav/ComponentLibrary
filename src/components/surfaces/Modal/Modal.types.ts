import type { ModalProps as MuiModalProps } from '@mui/material/Modal';
import type { ReactNode } from 'react';

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
  variant?: ModalVariant,
  
  position?: ModalPosition,
  
  backdrop?: ModalBackdrop,
  
  animation?: ModalAnimation,
  
  size?: ModalSize,
  
  open: boolean,
  
  onClose?: (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void,
  
  closeOnBackdropClick?: boolean,
  
  closeOnEscape?: boolean,
  
  disableScrollLock?: boolean,
  
  mobileFullscreen?: boolean,
  
  zIndex?: number,
  
  title?: string,
  
  description?: string,
  
  children: ReactNode,
  
  header?: ReactNode,
  
  footer?: ReactNode,
  
  showCloseButton?: boolean,
  
  closeButtonContent?: ReactNode,
  
  className?: string,
  
  contentClassName?: string,
  
  style?: React.CSSProperties,
  
  contentStyle?: React.CSSProperties,
  
  customPosition?: {
    top?: string | number,
    left?: string | number,
    right?: string | number,
    bottom?: string | number,
  },
  
  animationDuration?: number,
  
  elevation?: boolean,
  
  maxWidth?: string | number,
  
  maxHeight?: string | number,
  
  disableAutoFocus?: boolean,
  
  disableRestoreFocus?: boolean,
  
  disableEnforceFocus?: boolean,
  
  onEntered?: () => void,
  
  onExited?: () => void,
  
  'aria-label'?: string,
  
  'aria-labelledby'?: string,
  
  'aria-describedby'?: string,
}

export interface ModalStyleProps {
  variant: ModalVariant,
  position: ModalPosition,
  backdrop: ModalBackdrop,
  animation: ModalAnimation,
  size: ModalSize,
  open: boolean,
  mobileFullscreen: boolean,
  elevation: boolean,
  animationDuration: number,
  customPosition?: ModalProps['customPosition'],
  maxWidth?: string | number,
  maxHeight?: string | number,
}

export interface ModalContentStyleProps {
  variant: ModalVariant,
  size: ModalSize,
  hasHeader: boolean,
  hasFooter: boolean,
  mobileFullscreen: boolean,
}