import type { ReactNode } from 'react';

import type { ModalProps } from '@/components/surfaces/Modal';

export type DialogVariant = 
  | 'confirmation'
  | 'alert'
  | 'form'
  | 'custom'
  | 'fullscreen'
  | 'simple';

export type DialogType = 
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'question';

export type DialogSize = 
  | 'small'
  | 'medium'
  | 'large'
  | 'fullscreen'
  | 'auto';

export type DialogActionType = 
  | 'primary'
  | 'secondary'
  | 'cancel'
  | 'destructive';

export interface DialogAction {
  label: string;
  
  type?: DialogActionType;
  
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  
  disabled?: boolean;
  
  loading?: boolean;
  
  autoFocus?: boolean;
  
  icon?: ReactNode;
  
  className?: string;
  
  'data-testid'?: string;
}

export interface DialogProps extends Omit<ModalProps, 'children' | 'header' | 'footer' | 'size' | 'variant' | 'content'> {
  variant?: DialogVariant;
  
  type?: DialogType;
  
  size?: DialogSize;
  
  title?: string;
  
  subtitle?: string;
  
  content?: ReactNode;
  
  children?: ReactNode;
  
  actions?: DialogAction[];
  
  showIcon?: boolean;
  
  icon?: ReactNode;
  
  scrollable?: boolean;
  
  draggable?: boolean;
  
  dividers?: boolean;
  
  maxContentHeight?: string | number;
  
  minWidth?: string | number;
  
  customHeader?: ReactNode;
  
  customFooter?: ReactNode;
  
  loading?: boolean;
  
  loadingMessage?: string;
  
  elevation?: boolean;
  
  contentClassName?: string;
  
  headerClassName?: string;
  
  bodyClassName?: string;
  
  footerClassName?: string;
  
  onAction?: (actionLabel: string, actionType?: DialogActionType) => void;
  
  onConfirm?: () => void | Promise<void>;
  
  onCancel?: () => void;
  
  actionButtonProps?: Record<string, any>;
}

export interface DialogStyleProps {
  variant: DialogVariant;
  type: DialogType;
  size: DialogSize;
  scrollable: boolean;
  draggable: boolean;
  dividers: boolean;
  showIcon: boolean;
  loading: boolean;
  elevation: boolean;
  maxContentHeight?: string | number;
  minWidth?: string | number;
  children?: ReactNode;
}

export interface DialogActionStyleProps {
  actionType: DialogActionType;
  disabled: boolean;
  loading: boolean;
}

export interface DialogContentStyleProps {
  variant: DialogVariant;
  size: DialogSize;
  scrollable: boolean;
  hasIcon: boolean;
  hasActions: boolean;
  maxContentHeight?: string | number;
  children?: ReactNode;
}

export interface DialogHeaderStyleProps {
  variant: DialogVariant;
  type: DialogType;
  draggable: boolean;
  dividers: boolean;
  hasIcon: boolean;
  children?: ReactNode;
}

export interface DialogPresetActions {
  ok: DialogAction;
  cancel: DialogAction;
  yes: DialogAction;
  no: DialogAction;
  save: DialogAction;
  delete: DialogAction;
  confirm: DialogAction;
  close: DialogAction;
}