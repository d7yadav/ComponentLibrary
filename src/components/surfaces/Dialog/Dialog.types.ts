import { ReactNode } from 'react';
import { ModalProps } from '../Modal';

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
  /**
   * The label text for the action button
   */
  label: string;
  
  /**
   * The type of action (affects styling)
   */
  type?: DialogActionType;
  
  /**
   * Click handler for the action
   */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  
  /**
   * If true, the action is disabled
   */
  disabled?: boolean;
  
  /**
   * If true, the action shows a loading state
   */
  loading?: boolean;
  
  /**
   * If true, the action will auto-focus when dialog opens
   */
  autoFocus?: boolean;
  
  /**
   * Icon to display in the action button
   */
  icon?: ReactNode;
  
  /**
   * Additional CSS classes for the action button
   */
  className?: string;
  
  /**
   * Test ID for the action button
   */
  'data-testid'?: string;
}

export interface DialogProps extends Omit<ModalProps, 'children' | 'header' | 'footer' | 'size' | 'variant' | 'content'> {
  /**
   * The variant of the dialog
   */
  variant?: DialogVariant;
  
  /**
   * The type of dialog (affects icon and colors)
   */
  type?: DialogType;
  
  /**
   * The size of the dialog
   */
  size?: DialogSize;
  
  /**
   * The title of the dialog
   */
  title?: string;
  
  /**
   * The subtitle or description text
   */
  subtitle?: string;
  
  /**
   * The main content of the dialog
   */
  content?: ReactNode;
  
  /**
   * The children content (alternative to content prop)
   */
  children?: ReactNode;
  
  /**
   * Array of actions to display in the dialog footer
   */
  actions?: DialogAction[];
  
  /**
   * If true, shows an icon based on the dialog type
   */
  showIcon?: boolean;
  
  /**
   * Custom icon to display (overrides type-based icon)
   */
  icon?: ReactNode;
  
  /**
   * If true, the dialog content will be scrollable
   */
  scrollable?: boolean;
  
  /**
   * If true, the dialog title bar will be draggable
   */
  draggable?: boolean;
  
  /**
   * If true, the dialog will have a divider after the title
   */
  dividers?: boolean;
  
  /**
   * Maximum height for the dialog content
   */
  maxContentHeight?: string | number;
  
  /**
   * Minimum width for the dialog
   */
  minWidth?: string | number;
  
  /**
   * Custom header content (overrides title and icon)
   */
  customHeader?: ReactNode;
  
  /**
   * Custom footer content (overrides actions)
   */
  customFooter?: ReactNode;
  
  /**
   * If true, displays a loading state in the dialog
   */
  loading?: boolean;
  
  /**
   * Loading message to display
   */
  loadingMessage?: string;
  
  /**
   * If true, the dialog will be rendered with paper elevation
   */
  elevation?: boolean;
  
  /**
   * Custom CSS classes for the dialog content
   */
  contentClassName?: string;
  
  /**
   * Custom CSS classes for the dialog header
   */
  headerClassName?: string;
  
  /**
   * Custom CSS classes for the dialog body
   */
  bodyClassName?: string;
  
  /**
   * Custom CSS classes for the dialog footer
   */
  footerClassName?: string;
  
  /**
   * Callback fired when an action is clicked
   */
  onAction?: (actionLabel: string, actionType?: DialogActionType) => void;
  
  /**
   * Callback fired when the dialog is confirmed (for confirmation dialogs)
   */
  onConfirm?: () => void | Promise<void>;
  
  /**
   * Callback fired when the dialog is cancelled
   */
  onCancel?: () => void;
  
  /**
   * Additional props to pass to action buttons
   */
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