
import type { Theme } from '@mui/material/styles';
import type { ReactNode, HTMLAttributes, MouseEvent, KeyboardEvent } from 'react';

// Menu variants
export type MenuVariant = 'menu' | 'selectedMenu';

// Menu placement options
export type MenuPlacement = 
  | 'bottom-start' | 'bottom' | 'bottom-end'
  | 'top-start' | 'top' | 'top-end'
  | 'right-start' | 'right' | 'right-end'
  | 'left-start' | 'left' | 'left-end';

// Menu item roles
export type MenuItemRole = 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option';

// Menu item variants
export type MenuItemVariant = 'standard' | 'dense';

// Menu list variants
export type MenuListVariant = 'menu' | 'selectedMenu';

// Menu anchor origin
export interface MenuAnchorOrigin {
  vertical: 'top' | 'center' | 'bottom' | number;
  horizontal: 'left' | 'center' | 'right' | number;
}

// Menu transform origin
export interface MenuTransformOrigin {
  vertical: 'top' | 'center' | 'bottom' | number;
  horizontal: 'left' | 'center' | 'right' | number;
}

// Menu item props
export interface MenuItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'role'> {
  // Basic props
  variant?: MenuItemVariant;
  role?: MenuItemRole;
  
  // State props
  disabled?: boolean;
  selected?: boolean;
  divider?: boolean;
  dense?: boolean;
  
  // Content props
  children?: ReactNode;
  icon?: ReactNode;
  endIcon?: ReactNode;
  secondaryText?: ReactNode;
  
  // Behavior props
  autoFocus?: boolean;
  disableGutters?: boolean;
  disableRipple?: boolean;
  
  // Event handlers
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLLIElement>) => void;
  
  // Styling props
  className?: string;
  sx?: any;
  
  // Component customization
  component?: React.ElementType;
  
  // Accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-checked'?: boolean;
  'aria-selected'?: boolean;
}

// Menu list props
export interface MenuListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'role'> {
  // Basic props
  variant?: MenuListVariant;
  
  // Content props
  children?: ReactNode;
  
  // Behavior props
  autoFocus?: boolean;
  autoFocusItem?: boolean;
  disabledItemsFocusable?: boolean;
  disableListWrap?: boolean;
  
  // Styling props
  dense?: boolean;
  disablePadding?: boolean;
  className?: string;
  sx?: any;
  
  // Component customization
  component?: React.ElementType;
  
  // Event handlers
  onKeyDown?: (event: KeyboardEvent<HTMLUListElement>) => void;
  
  // Accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  role?: string;
}

// Main Menu props
export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClose'> {
  // Basic props
  variant?: MenuVariant;
  
  // Visibility props
  open: boolean;
  anchorEl?: Element | null | ((element: Element) => Element);
  
  // Positioning props
  anchorOrigin?: MenuAnchorOrigin;
  transformOrigin?: MenuTransformOrigin;
  placement?: MenuPlacement;
  
  // Content props
  children?: ReactNode;
  
  // Behavior props
  autoFocus?: boolean;
  disableAutoFocus?: boolean;
  disableAutoFocusItem?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disablePortal?: boolean;
  disableRestoreFocus?: boolean;
  disableScrollLock?: boolean;
  keepMounted?: boolean;
  
  // Event handlers
  onClose?: (event: Event | MouseEvent | KeyboardEvent, reason: MenuCloseReason) => void;
  onContextMenu?: (event: MouseEvent<HTMLDivElement>) => void;
  
  // Styling props
  elevation?: number;
  marginThreshold?: number;
  className?: string;
  sx?: any;
  
  // Component customization
  components?: {
    Root?: React.ElementType;
    Paper?: React.ElementType;
  };
  
  componentsProps?: {
    root?: object;
    paper?: object;
  };
  
  // Advanced props
  container?: Element | (() => Element) | null;
  PopoverClasses?: object;
  TransitionComponent?: React.ComponentType<any>;
  transitionDuration?: number | { appear?: number; enter?: number; exit?: number } | 'auto';
  TransitionProps?: object;
  
  // Accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  role?: string;
}

// Menu close reasons
export type MenuCloseReason = 'escapeKeyDown' | 'backdropClick' | 'tabKeyDown';

// Styled component props
export interface MenuStyleProps {
  theme: Theme;
  variant: MenuVariant;
  elevation: number;
  open: boolean;
}

export interface MenuListStyleProps {
  theme: Theme;
  variant: MenuListVariant;
  dense?: boolean;
  disablePadding?: boolean;
}

export interface MenuItemStyleProps {
  theme: Theme;
  variant: MenuItemVariant;
  disabled?: boolean;
  selected?: boolean;
  divider?: boolean;
  dense?: boolean;
  disableGutters?: boolean;
  hasIcon?: boolean;
  hasEndIcon?: boolean;
  hasSecondaryText?: boolean;
}

export interface MenuItemIconStyleProps {
  theme: Theme;
  variant: MenuItemVariant;
  position: 'start' | 'end';
}

export interface MenuItemTextStyleProps {
  theme: Theme;
  variant: MenuItemVariant;
  primary?: boolean;
  secondary?: boolean;
}

// Context types
export interface MenuContextValue {
  variant: MenuVariant;
  dense: boolean;
  disableGutters: boolean;
}

// Constants export type
export interface MenuConstants {
  VARIANTS: Record<string, MenuVariant>;
  ITEM_VARIANTS: Record<string, MenuItemVariant>;
  LIST_VARIANTS: Record<string, MenuListVariant>;
  ITEM_ROLES: Record<string, MenuItemRole>;
  PLACEMENTS: Record<string, MenuPlacement>;
  DEFAULT_PROPS: {
    MENU: Partial<MenuProps>;
    MENU_LIST: Partial<MenuListProps>;
    MENU_ITEM: Partial<MenuItemProps>;
  };
  ACCESSIBILITY: {
    ROLES: Record<string, string>;
    ARIA_LABELS: Record<string, string>;
    KEYBOARD_SHORTCUTS: Record<string, string>;
  };
  ANIMATION: {
    DURATION: Record<string, number>;
    EASING: Record<string, string>;
  };
  DIMENSIONS: {
    ITEM_HEIGHT: Record<MenuItemVariant, number>;
    PADDING: Record<string, number>;
    ICON_SIZE: number;
  };
}