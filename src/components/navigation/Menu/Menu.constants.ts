
import type {
  MenuVariant,
  MenuItemVariant,
  MenuListVariant,
  MenuItemRole,
  MenuPlacement,
  MenuAnchorOrigin,
  MenuTransformOrigin,
  MenuConstants
} from './Menu.types';

// Menu variants
export const MENU_VARIANTS: Record<string, MenuVariant> = {
  menu: 'menu',
  selectedMenu: 'selectedMenu',
} as const;

// Menu item variants
export const MENU_ITEM_VARIANTS: Record<string, MenuItemVariant> = {
  standard: 'standard',
  dense: 'dense',
} as const;

// Menu list variants
export const MENU_LIST_VARIANTS: Record<string, MenuListVariant> = {
  menu: 'menu',
  selectedMenu: 'selectedMenu',
} as const;

// Menu item roles
export const MENU_ITEM_ROLES: Record<string, MenuItemRole> = {
  menuitem: 'menuitem',
  menuitemcheckbox: 'menuitemcheckbox',
  menuitemradio: 'menuitemradio',
  option: 'option',
} as const;

// Menu placements
export const MENU_PLACEMENTS: Record<string, MenuPlacement> = {
  'bottom-start': 'bottom-start',
  'bottom': 'bottom',
  'bottom-end': 'bottom-end',
  'top-start': 'top-start',
  'top': 'top',
  'top-end': 'top-end',
  'right-start': 'right-start',
  'right': 'right',
  'right-end': 'right-end',
  'left-start': 'left-start',
  'left': 'left',
  'left-end': 'left-end',
} as const;

// Default anchor origins
export const DEFAULT_ANCHOR_ORIGIN: MenuAnchorOrigin = {
  vertical: 'top',
  horizontal: 'left',
} as const;

// Default transform origins
export const DEFAULT_TRANSFORM_ORIGIN: MenuTransformOrigin = {
  vertical: 'top',
  horizontal: 'left',
} as const;

// Default component props
export const DEFAULT_MENU_PROPS = {
  variant: MENU_VARIANTS.menu,
  elevation: 8,
  autoFocus: true,
  disableAutoFocus: false,
  disableAutoFocusItem: false,
  disableEnforceFocus: false,
  disableEscapeKeyDown: false,
  disablePortal: false,
  disableRestoreFocus: false,
  disableScrollLock: false,
  keepMounted: false,
  marginThreshold: 16,
  anchorOrigin: DEFAULT_ANCHOR_ORIGIN,
  transformOrigin: DEFAULT_TRANSFORM_ORIGIN,
} as const;

export const DEFAULT_MENU_LIST_PROPS = {
  variant: MENU_LIST_VARIANTS.menu,
  autoFocus: false,
  autoFocusItem: false,
  disabledItemsFocusable: false,
  disableListWrap: false,
  dense: false,
  disablePadding: false,
} as const;

export const DEFAULT_MENU_ITEM_PROPS = {
  variant: MENU_ITEM_VARIANTS.standard,
  role: MENU_ITEM_ROLES.menuitem,
  disabled: false,
  selected: false,
  divider: false,
  dense: false,
  autoFocus: false,
  disableGutters: false,
  disableRipple: false,
} as const;

// Accessibility constants
export const ACCESSIBILITY_CONSTANTS = {
  ROLES: {
    MENU: 'menu',
    MENUBAR: 'menubar',
    MENUITEM: 'menuitem',
    MENUITEMCHECKBOX: 'menuitemcheckbox',
    MENUITEMRADIO: 'menuitemradio',
    OPTION: 'option',
    PRESENTATION: 'presentation',
    SEPARATOR: 'separator',
  },
  ARIA_LABELS: {
    MENU: 'Menu',
    SUBMENU: 'Submenu',
    CLOSE_MENU: 'Close menu',
    OPEN_SUBMENU: 'Open submenu',
  },
  KEYBOARD_SHORTCUTS: {
    ENTER: 'Enter',
    SPACE: 'Space',
    ESCAPE: 'Escape',
    TAB: 'Tab',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
  },
} as const;

// Animation constants
export const ANIMATION_CONSTANTS = {
  DURATION: {
    ENTER: 225,
    EXIT: 195,
    COMPLEX: 375,
  },
  EASING: {
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_OUT: 'cubic-bezier(0.0, 0, 0.2, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    SHARP: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
} as const;

// Dimension constants
export const DIMENSION_CONSTANTS = {
  ITEM_HEIGHT: {
    standard: 48,
    dense: 36,
  },
  PADDING: {
    HORIZONTAL: 16,
    VERTICAL: 8,
    ICON: 16,
    DENSE_HORIZONTAL: 12,
    DENSE_VERTICAL: 4,
  },
  ICON_SIZE: 24,
  DIVIDER_HEIGHT: 1,
  MIN_WIDTH: 112,
  MAX_WIDTH: 280,
  MAX_HEIGHT: 'calc(100vh - 96px)',
} as const;

// Z-index constants
export const Z_INDEX_CONSTANTS = {
  MENU: 1300,
  BACKDROP: 1200,
} as const;

// Menu utilities
export const MENU_UTILS = {
  getPlacementFromOrigins: (
    anchorOrigin: MenuAnchorOrigin,
    transformOrigin: MenuTransformOrigin
  ): MenuPlacement => {
    const { vertical: anchorVertical, horizontal: anchorHorizontal } = anchorOrigin;
    const { vertical: transformVertical, horizontal: transformHorizontal } = transformOrigin;
    
    // Determine vertical placement
    let verticalPlacement: 'top' | 'bottom' | '' = '';
    if (anchorVertical === 'bottom' && transformVertical === 'top') {
      verticalPlacement = 'bottom';
    } else if (anchorVertical === 'top' && transformVertical === 'bottom') {
      verticalPlacement = 'top';
    }
    
    // Determine horizontal placement
    let horizontalPlacement: 'start' | 'end' | '' = '';
    if (anchorHorizontal === 'left' && transformHorizontal === 'left') {
      horizontalPlacement = 'start';
    } else if (anchorHorizontal === 'right' && transformHorizontal === 'right') {
      horizontalPlacement = 'end';
    }
    
    // Combine placements
    if (verticalPlacement && horizontalPlacement) {
      return `${verticalPlacement}-${horizontalPlacement}` as MenuPlacement;
    } else if (verticalPlacement) {
      return verticalPlacement as MenuPlacement;
    } else {
      return 'bottom-start'; // Default fallback
    }
  },

  getOriginsFromPlacement: (placement: MenuPlacement): {
    anchorOrigin: MenuAnchorOrigin,
    transformOrigin: MenuTransformOrigin,
  } => {
    const placements: Record<MenuPlacement, {
      anchorOrigin: MenuAnchorOrigin,
      transformOrigin: MenuTransformOrigin,
    }> = {
      'bottom-start': {
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      },
      'bottom': {
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' },
      },
      'bottom-end': {
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        transformOrigin: { vertical: 'top', horizontal: 'right' },
      },
      'top-start': {
        anchorOrigin: { vertical: 'top', horizontal: 'left' },
        transformOrigin: { vertical: 'bottom', horizontal: 'left' },
      },
      'top': {
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        transformOrigin: { vertical: 'bottom', horizontal: 'center' },
      },
      'top-end': {
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        transformOrigin: { vertical: 'bottom', horizontal: 'right' },
      },
      'right-start': {
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      },
      'right': {
        anchorOrigin: { vertical: 'center', horizontal: 'right' },
        transformOrigin: { vertical: 'center', horizontal: 'left' },
      },
      'right-end': {
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
        transformOrigin: { vertical: 'bottom', horizontal: 'left' },
      },
      'left-start': {
        anchorOrigin: { vertical: 'top', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'right' },
      },
      'left': {
        anchorOrigin: { vertical: 'center', horizontal: 'left' },
        transformOrigin: { vertical: 'center', horizontal: 'right' },
      },
      'left-end': {
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'bottom', horizontal: 'right' },
      },
    };
    
    return placements[placement] || placements['bottom-start'];
  },

  calculateMenuDimensions: (
    itemCount: number,
    variant: MenuItemVariant,
    hasDividers: boolean = false
  ): { width: number; height: number } => {
    const itemHeight = DIMENSION_CONSTANTS.ITEM_HEIGHT[variant];
    const dividerHeight = hasDividers ? DIMENSION_CONSTANTS.DIVIDER_HEIGHT : 0;
    const padding = DIMENSION_CONSTANTS.PADDING.VERTICAL * 2;
    
    return {
      width: DIMENSION_CONSTANTS.MIN_WIDTH,
      height: (itemHeight * itemCount) + dividerHeight + padding,
    };
  },

  isItemFocusable: (disabled: boolean, disabledItemsFocusable: boolean): boolean => {
    return !disabled || disabledItemsFocusable;
  },

  getNextFocusableIndex: (
    currentIndex: number,
    direction: 'next' | 'previous' | 'first' | 'last',
    items: Array<{ disabled?: boolean }>,
    disabledItemsFocusable: boolean,
    disableListWrap: boolean
  ): number => {
    const itemCount = items.length;
    
    if (itemCount === 0) return -1;
    
    const isItemFocusable = (index: number) => 
      MENU_UTILS.isItemFocusable(items[index]?.disabled || false, disabledItemsFocusable);
    
    switch (direction) {
      case 'first':
        for (let i = 0; i < itemCount; i++) {
          if (isItemFocusable(i)) return i;
        }
        break;
        
      case 'last':
        for (let i = itemCount - 1; i >= 0; i--) {
          if (isItemFocusable(i)) return i;
        }
        break;
        
      case 'next':
        for (let i = currentIndex + 1; i < itemCount; i++) {
          if (isItemFocusable(i)) return i;
        }
        if (!disableListWrap) {
          for (let i = 0; i <= currentIndex; i++) {
            if (isItemFocusable(i)) return i;
          }
        }
        break;
        
      case 'previous':
        for (let i = currentIndex - 1; i >= 0; i--) {
          if (isItemFocusable(i)) return i;
        }
        if (!disableListWrap) {
          for (let i = itemCount - 1; i >= currentIndex; i--) {
            if (isItemFocusable(i)) return i;
          }
        }
        break;
    }
    
    return currentIndex;
  },
} as const;

// Export all constants as a single object
export const MENU_CONSTANTS: MenuConstants = {
  VARIANTS: MENU_VARIANTS,
  ITEM_VARIANTS: MENU_ITEM_VARIANTS,
  LIST_VARIANTS: MENU_LIST_VARIANTS,
  ITEM_ROLES: MENU_ITEM_ROLES,
  PLACEMENTS: MENU_PLACEMENTS,
  DEFAULT_PROPS: {
    MENU: DEFAULT_MENU_PROPS,
    MENU_LIST: DEFAULT_MENU_LIST_PROPS,
    MENU_ITEM: DEFAULT_MENU_ITEM_PROPS,
  },
  ACCESSIBILITY: ACCESSIBILITY_CONSTANTS,
  ANIMATION: ANIMATION_CONSTANTS,
  DIMENSIONS: DIMENSION_CONSTANTS,
} as const;