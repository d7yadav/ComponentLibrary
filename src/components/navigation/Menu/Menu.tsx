/**
 * @fileoverview Menu component implementation
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import { 
  ChevronRight,
  Check,
  RadioButtonUnchecked,
  RadioButtonChecked
} from '@mui/icons-material';
import { Popper, ClickAwayListener, Grow } from '@mui/material';
import React, { 
  forwardRef, 
  useState, 
  useRef, 
  useCallback, 
  useEffect,
  createContext,
  useContext,
  memo 
} from 'react';

import {
  MENU_VARIANTS,
  MENU_ITEM_VARIANTS,
  MENU_LIST_VARIANTS,
  MENU_ITEM_ROLES,
  DEFAULT_MENU_PROPS,
  DEFAULT_MENU_LIST_PROPS,
  DEFAULT_MENU_ITEM_PROPS,
  ACCESSIBILITY_CONSTANTS,
  MENU_UTILS,
} from './Menu.constants';
import {
  MenuPaper,
  MenuListContainer,
  MenuItemContainer,
  MenuItemIcon,
  MenuItemText,
  MenuItemContent,
  MenuDivider,
  MenuGroupHeader,
  MenuBackdrop,
  MenuPortal,
  SubmenuIndicator,
  MenuItemFocusRing,
} from './Menu.styles';
import type { 
  MenuProps,
  MenuListProps, 
  MenuItemProps,
  MenuCloseReason,
  MenuContextValue
} from './Menu.types';

// Menu context for sharing state between components
const MenuContext = createContext<MenuContextValue>({
  variant: MENU_VARIANTS.menu,
  dense: false,
  disableGutters: false,
});

/**
 * MenuItem component - Individual menu item
 */
export const MenuItem = memo(forwardRef<HTMLLIElement, MenuItemProps>(({
  variant = DEFAULT_MENU_ITEM_PROPS.variant,
  role = DEFAULT_MENU_ITEM_PROPS.role,
  disabled = DEFAULT_MENU_ITEM_PROPS.disabled,
  selected = DEFAULT_MENU_ITEM_PROPS.selected,
  divider = DEFAULT_MENU_ITEM_PROPS.divider,
  dense: denseProp,
  children,
  icon,
  endIcon,
  secondaryText,
  autoFocus = DEFAULT_MENU_ITEM_PROPS.autoFocus,
  disableGutters: disableGuttersProp,
  disableRipple = DEFAULT_MENU_ITEM_PROPS.disableRipple,
  onClick,
  onKeyDown,
  className,
  sx,
  component = 'li',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  'aria-checked': ariaChecked,
  'aria-selected': ariaSelected,
  ...rest
}, ref) => {
  const menuContext = useContext(MenuContext);
  const [focused, setFocused] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  
  // Use context values as defaults
  const dense = denseProp !== undefined ? denseProp : menuContext.dense;
  const disableGutters = disableGuttersProp !== undefined ? disableGuttersProp : menuContext.disableGutters;
  
  // Auto focus on mount if needed
  useEffect(() => {
    if (autoFocus && itemRef.current) {
      itemRef.current.focus();
    }
  }, [autoFocus]);
  
  // Handle click events
  const handleClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
    if (disabled) return;
    onClick?.(event);
  }, [disabled, onClick]);
  
  // Handle keyboard events
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLLIElement>) => {
    if (disabled) return;
    
    const { key } = event;
    
    // Handle Enter and Space as click
    if (key === ACCESSIBILITY_CONSTANTS.KEYBOARD_SHORTCUTS.ENTER || 
        key === ACCESSIBILITY_CONSTANTS.KEYBOARD_SHORTCUTS.SPACE) {
      event.preventDefault();
      handleClick(event as any);
    }
    
    onKeyDown?.(event);
  }, [disabled, handleClick, onKeyDown]);
  
  // Handle focus events
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);
  
  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);
  
  // Determine if item has icons or secondary text
  const hasIcon = !!icon;
  const hasEndIcon = !!endIcon || (role === 'menuitemcheckbox' || role === 'menuitemradio');
  const hasSecondaryText = !!secondaryText;
  
  // Render appropriate end icon based on role
  const renderEndIcon = () => {
    if (endIcon) return endIcon;
    
    if (role === 'menuitemcheckbox') {
      return selected ? <Check /> : null;
    }
    
    if (role === 'menuitemradio') {
      return selected ? <RadioButtonChecked /> : <RadioButtonUnchecked />;
    }
    
    return null;
  };
  
  return (
    <MenuItemContainer
      ref={(node) => {
        // Handle both forwarded ref and internal ref
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        (itemRef as any).current = node;
      }}
      component={component}
      variant={variant}
      disabled={disabled}
      selected={selected}
      divider={divider}
      dense={dense}
      disableGutters={disableGutters}
      hasIcon={hasIcon}
      hasEndIcon={hasEndIcon}
      hasSecondaryText={hasSecondaryText}
      role={role}
      tabIndex={disabled ? -1 : 0}
      className={className}
      sx={sx}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-checked={role === 'menuitemcheckbox' || role === 'menuitemradio' ? selected : ariaChecked}
      aria-selected={role === 'option' ? selected : ariaSelected}
      aria-disabled={disabled}
      {...rest}
    >
      <MenuItemFocusRing focused={focused} />
      
      {hasIcon && (
        <MenuItemIcon variant={variant} position="start">
          {icon}
        </MenuItemIcon>
      )}
      
      <MenuItemContent hasSecondaryText={hasSecondaryText}>
        <MenuItemText variant={variant} primary>
          {children}
        </MenuItemText>
        {hasSecondaryText && (
          <MenuItemText variant={variant} secondary>
            {secondaryText}
          </MenuItemText>
        )}
      </MenuItemContent>
      
      {hasEndIcon && (
        <MenuItemIcon variant={variant} position="end">
          {renderEndIcon()}
        </MenuItemIcon>
      )}
    </MenuItemContainer>
  );
}));

MenuItem.displayName = 'MenuItem';

/**
 * MenuList component - Container for menu items
 */
export const MenuList = memo(forwardRef<HTMLUListElement, MenuListProps>(({
  variant = DEFAULT_MENU_LIST_PROPS.variant,
  children,
  autoFocus = DEFAULT_MENU_LIST_PROPS.autoFocus,
  autoFocusItem = DEFAULT_MENU_LIST_PROPS.autoFocusItem,
  disabledItemsFocusable = DEFAULT_MENU_LIST_PROPS.disabledItemsFocusable,
  disableListWrap = DEFAULT_MENU_LIST_PROPS.disableListWrap,
  dense = DEFAULT_MENU_LIST_PROPS.dense,
  disablePadding = DEFAULT_MENU_LIST_PROPS.disablePadding,
  className,
  sx,
  component = 'ul',
  onKeyDown,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  role = ACCESSIBILITY_CONSTANTS.ROLES.MENU,
  ...rest
}, ref) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  // Get all menu items
  const getMenuItems = useCallback(() => {
    if (!listRef.current) return [];
    return Array.from(listRef.current.querySelectorAll('[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"]'));
  }, []);
  
  // Focus management
  const focusItem = useCallback((index: number) => {
    const items = getMenuItems();
    if (items[index]) {
      (items[index] as HTMLElement).focus();
      setFocusedIndex(index);
    }
  }, [getMenuItems]);
  
  // Auto focus on mount
  useEffect(() => {
    if (autoFocus && listRef.current) {
      listRef.current.focus();
    }
    
    if (autoFocusItem) {
      const items = getMenuItems();
      const firstFocusableIndex = items.findIndex(item => 
        MENU_UTILS.isItemFocusable(
          (item as HTMLElement).getAttribute('aria-disabled') === 'true',
          disabledItemsFocusable
        )
      );
      
      if (firstFocusableIndex >= 0) {
        focusItem(firstFocusableIndex);
      }
    }
  }, [autoFocus, autoFocusItem, disabledItemsFocusable, focusItem, getMenuItems]);
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLUListElement>) => {
    const { key } = event;
    const items = getMenuItems();
    
    // Get item states
    const itemStates = items.map(item => ({
      disabled: (item as HTMLElement).getAttribute('aria-disabled') === 'true',
    }));
    
    let newIndex = focusedIndex;
    
    switch (key) {
      case ACCESSIBILITY_CONSTANTS.KEYBOARD_SHORTCUTS.ARROW_DOWN:
        event.preventDefault();
        newIndex = MENU_UTILS.getNextFocusableIndex(
          focusedIndex,
          'next',
          itemStates,
          disabledItemsFocusable,
          disableListWrap
        );
        break;
        
      case ACCESSIBILITY_CONSTANTS.KEYBOARD_SHORTCUTS.ARROW_UP:
        event.preventDefault();
        newIndex = MENU_UTILS.getNextFocusableIndex(
          focusedIndex,
          'previous',
          itemStates,
          disabledItemsFocusable,
          disableListWrap
        );
        break;
        
      case ACCESSIBILITY_CONSTANTS.KEYBOARD_SHORTCUTS.HOME:
        event.preventDefault();
        newIndex = MENU_UTILS.getNextFocusableIndex(
          -1,
          'first',
          itemStates,
          disabledItemsFocusable,
          disableListWrap
        );
        break;
        
      case ACCESSIBILITY_CONSTANTS.KEYBOARD_SHORTCUTS.END:
        event.preventDefault();
        newIndex = MENU_UTILS.getNextFocusableIndex(
          items.length,
          'last',
          itemStates,
          disabledItemsFocusable,
          disableListWrap
        );
        break;
    }
    
    if (newIndex !== focusedIndex && newIndex >= 0) {
      focusItem(newIndex);
    }
    
    onKeyDown?.(event);
  }, [
    getMenuItems,
    focusedIndex,
    disabledItemsFocusable,
    disableListWrap,
    focusItem,
    onKeyDown,
  ]);
  
  // Context value for child components
  const contextValue: MenuContextValue = {
    variant,
    dense,
    disableGutters: false, // MenuList doesn't control gutters directly
  };
  
  return (
    <MenuContext.Provider value={contextValue}>
      <MenuListContainer
        ref={(node) => {
          // Handle both forwarded ref and internal ref
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          (listRef as any).current = node;
        }}
        component={component}
        variant={variant}
        dense={dense}
        disablePadding={disablePadding}
        className={className}
        sx={sx}
        role={role}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...rest}
      >
        {children}
      </MenuListContainer>
    </MenuContext.Provider>
  );
}));

MenuList.displayName = 'MenuList';

/**
 * Menu component - Main menu container with popover functionality
 */
export const Menu = memo(forwardRef<HTMLDivElement, MenuProps>(({
  variant = DEFAULT_MENU_PROPS.variant,
  open,
  anchorEl,
  anchorOrigin = DEFAULT_MENU_PROPS.anchorOrigin,
  transformOrigin = DEFAULT_MENU_PROPS.transformOrigin,
  placement,
  children,
  autoFocus = DEFAULT_MENU_PROPS.autoFocus,
  disableAutoFocus = DEFAULT_MENU_PROPS.disableAutoFocus,
  disableAutoFocusItem = DEFAULT_MENU_PROPS.disableAutoFocusItem,
  disableEnforceFocus = DEFAULT_MENU_PROPS.disableEnforceFocus,
  disableEscapeKeyDown = DEFAULT_MENU_PROPS.disableEscapeKeyDown,
  disablePortal = DEFAULT_MENU_PROPS.disablePortal,
  disableRestoreFocus = DEFAULT_MENU_PROPS.disableRestoreFocus,
  disableScrollLock = DEFAULT_MENU_PROPS.disableScrollLock,
  keepMounted = DEFAULT_MENU_PROPS.keepMounted,
  onClose,
  onContextMenu,
  elevation = DEFAULT_MENU_PROPS.elevation,
  marginThreshold = DEFAULT_MENU_PROPS.marginThreshold,
  className,
  sx,
  components,
  componentsProps,
  container,
  PopoverClasses,
  TransitionComponent = Grow,
  transitionDuration = 'auto',
  TransitionProps,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  role = ACCESSIBILITY_CONSTANTS.ROLES.MENU,
  ...rest
}, ref) => {
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Calculate final anchor and transform origins
  const finalOrigins = placement 
    ? MENU_UTILS.getOriginsFromPlacement(placement)
    : { anchorOrigin, transformOrigin };
  
  // Handle close events
  const handleClose = useCallback((event: Event | React.MouseEvent | React.KeyboardEvent, reason: MenuCloseReason) => {
    onClose?.(event, reason);
  }, [onClose]);
  
  // Handle backdrop click
  const handleBackdropClick = useCallback((event: Event) => {
    handleClose(event, 'backdropClick');
  }, [handleClose]);
  
  // Handle escape key
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!disableEscapeKeyDown && event.key === ACCESSIBILITY_CONSTANTS.KEYBOARD_SHORTCUTS.ESCAPE) {
      event.preventDefault();
      handleClose(event, 'escapeKeyDown');
    }
  }, [disableEscapeKeyDown, handleClose]);
  
  // Wrap children in MenuList if not already wrapped
  const menuContent = React.Children.count(children) === 1 && 
    React.isValidElement(children) && 
    children.type === MenuList
    ? children
    : <MenuList autoFocus={!disableAutoFocus} autoFocusItem={!disableAutoFocusItem}>
        {children}
      </MenuList>;
  
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement || 'bottom-start'}
      disablePortal={disablePortal}
      container={container}
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, marginThreshold / 2],
          },
        },
      ]}
    >
      <ClickAwayListener onClickAway={handleBackdropClick}>
        <TransitionComponent
          in={open}
          timeout={transitionDuration}
          {...TransitionProps}
        >
          <MenuPaper
            ref={(node) => {
              // Handle both forwarded ref and internal ref
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              (menuRef as any).current = node;
            }}
            variant={variant}
            elevation={elevation}
            open={open}
            className={className}
            sx={sx}
            role={role}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            onContextMenu={onContextMenu}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            {...rest}
          >
            {menuContent}
          </MenuPaper>
        </TransitionComponent>
      </ClickAwayListener>
    </Popper>
  );
}));

Menu.displayName = 'Menu';

// Export divider and group header as utility components
export const MenuDividerComponent = memo(() => <MenuDivider />);
MenuDividerComponent.displayName = 'MenuDivider';

export const MenuGroupHeaderComponent = memo(({ children }: { children: React.ReactNode }) => (
  <MenuGroupHeader>{children}</MenuGroupHeader>
));
MenuGroupHeaderComponent.displayName = 'MenuGroupHeader';