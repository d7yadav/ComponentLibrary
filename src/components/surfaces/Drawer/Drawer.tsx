import { ChevronLeft, ChevronRight, KeyboardArrowUp, KeyboardArrowDown, Menu } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';

import {
  ACCESSIBILITY_CONSTANTS,
  SWIPE_CONFIG,
  DEFAULT_PROPS,
} from './Drawer.constants';
import {
  StyledDrawer,
  StyledDrawerContent,
  StyledDrawerHeader,
  StyledDrawerNavigation,
  StyledDrawerBody,
  StyledDrawerFooter,
  StyledToggleButton,
  StyledSwipeArea,
  drawerAnimationKeyframes,
} from './Drawer.styles';
import type { DrawerProps } from './Drawer.types';

/**
 * Enhanced Drawer component with multiple variants, animations, and accessibility features
 * 
 * Features:
 * - 4 variants: temporary, persistent, permanent, mini
 * - 4 anchor positions: left, right, top, bottom
 * - 4 sizes: compact, standard, wide, auto
 * - Swipe gesture support on mobile
 * - Mini drawer with collapse/expand functionality
 * - Header/footer sections with fixed positioning options
 * - Comprehensive accessibility (WCAG 2.1 AA)
 * - Responsive behavior with mobile variants
 * - Focus management and keyboard navigation
 */
const DrawerComponent = forwardRef<HTMLDivElement, DrawerProps>(({
  variant = DEFAULT_PROPS.variant,
  anchor = DEFAULT_PROPS.anchor,
  size = DEFAULT_PROPS.size,
  behavior = DEFAULT_PROPS.behavior,
  animation = DEFAULT_PROPS.animation,
  open,
  onClose,
  closeOnBackdropClick = DEFAULT_PROPS.closeOnBackdropClick,
  closeOnEscape = DEFAULT_PROPS.closeOnEscape,
  swipeEnabled = DEFAULT_PROPS.swipeEnabled,
  width,
  height,
  miniWidth,
  collapsed = DEFAULT_PROPS.collapsed,
  onCollapseChange,
  backdrop = DEFAULT_PROPS.backdrop,
  zIndex,
  children,
  header,
  footer,
  navigation,
  showToggleButton = DEFAULT_PROPS.showToggleButton,
  toggleButtonContent,
  className,
  contentClassName,
  style,
  contentStyle,
  animationDuration = DEFAULT_PROPS.animationDuration,
  elevation = DEFAULT_PROPS.elevation,
  elevationLevel = DEFAULT_PROPS.elevationLevel,
  fixedHeader = DEFAULT_PROPS.fixedHeader,
  fixedFooter = DEFAULT_PROPS.fixedFooter,
  disableAutoFocus = DEFAULT_PROPS.disableAutoFocus,
  disableRestoreFocus = DEFAULT_PROPS.disableRestoreFocus,
  disableEnforceFocus = DEFAULT_PROPS.disableEnforceFocus,
  disableScrolling = DEFAULT_PROPS.disableScrolling,
  onOpened,
  onClosed,
  onSwipe,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  responsive = DEFAULT_PROPS.responsive,
  responsiveBreakpoint = DEFAULT_PROPS.responsiveBreakpoint,
  mobileVariant = DEFAULT_PROPS.mobileVariant,
  hideScrollbar = DEFAULT_PROPS.hideScrollbar,
  disableScroll = DEFAULT_PROPS.disableScroll,
  headerVariant = DEFAULT_PROPS.headerVariant,
  ...other
}, ref) => {
  const theme = useTheme();
  const drawerRef = useRef<HTMLDivElement>(null);
  const swipeAreaRef = useRef<HTMLDivElement>(null);
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed);
  const [swipeState, setSwipeState] = useState({ startX: 0, startY: 0, startTime: 0 });
  
  // Responsive behavior
  const isMobile = useMediaQuery(theme.breakpoints.down(responsiveBreakpoint as any));
  const effectiveVariant = responsive && isMobile ? mobileVariant : variant;
  const effectiveCollapsed = variant === 'mini' ? internalCollapsed : false;

  // Handle close with reason
  const handleClose = useCallback((event?: {}, reason?: 'backdropClick' | 'escapeKeyDown' | 'swipeToClose') => {
    if (reason === 'backdropClick' && !closeOnBackdropClick) return;
    if (reason === 'escapeKeyDown' && !closeOnEscape) return;
    onClose?.(event || {}, reason);
  }, [onClose, closeOnBackdropClick, closeOnEscape]);

  // Handle mini drawer toggle
  const handleToggleCollapse = useCallback(() => {
    const newCollapsed = !internalCollapsed;
    setInternalCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  }, [internalCollapsed, onCollapseChange]);

  // Handle escape key
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === ACCESSIBILITY_CONSTANTS.keys.escape && closeOnEscape && open) {
      event.preventDefault();
      handleClose({}, 'escapeKeyDown');
    }
    
    // Focus trap for drawer
    if (event.key === ACCESSIBILITY_CONSTANTS.keys.tab && open) {
      const focusableElements = drawerRef.current?.querySelectorAll(
        ACCESSIBILITY_CONSTANTS.focusableSelector
      );
      
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    }
  }, [open, closeOnEscape, handleClose]);

  // Swipe gesture handlers
  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (!swipeEnabled) return;
    
    const touch = event.touches[0];
    if (!touch) return;
    
    setSwipeState({
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    });
  }, [swipeEnabled]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!swipeEnabled || !open) return;
    
    // Prevent default to avoid page scrolling during swipe
    event.preventDefault();
  }, [swipeEnabled, open]);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (!swipeEnabled) return;
    
    const touch = event.changedTouches[0];
    if (!touch) return;
    
    const deltaX = touch.clientX - swipeState.startX;
    const deltaY = touch.clientY - swipeState.startY;
    const deltaTime = Date.now() - swipeState.startTime;
    
    // Calculate swipe direction and distance
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const isVerticalSwipe = Math.abs(deltaY) > Math.abs(deltaX);
    const distance = isHorizontalSwipe ? Math.abs(deltaX) : Math.abs(deltaY);
    const velocity = distance / deltaTime;
    
    // Check if swipe meets threshold requirements
    if (distance > SWIPE_CONFIG.threshold && velocity > SWIPE_CONFIG.velocity) {
      let shouldClose = false;
      
      // Determine if swipe should close drawer based on anchor and direction
      if (anchor === 'left' && isHorizontalSwipe && deltaX < 0) shouldClose = true;
      if (anchor === 'right' && isHorizontalSwipe && deltaX > 0) shouldClose = true;
      if (anchor === 'top' && isVerticalSwipe && deltaY < 0) shouldClose = true;
      if (anchor === 'bottom' && isVerticalSwipe && deltaY > 0) shouldClose = true;
      
      if (shouldClose) {
        onSwipe?.('close');
        handleClose({}, 'swipeToClose');
      }
    }
  }, [swipeEnabled, swipeState, anchor, onSwipe, handleClose]);

  // Edge swipe to open (for closed drawers)
  const handleEdgeSwipe = useCallback((event: TouchEvent) => {
    if (!swipeEnabled || open || effectiveVariant !== 'temporary') return;
    
    const touch = event.touches[0];
    if (!touch) return;
    
    const edgeThreshold = SWIPE_CONFIG.edgeThreshold;
    let isEdgeSwipe = false;
    
    // Check if touch started from edge
    if (anchor === 'left' && touch.clientX <= edgeThreshold) isEdgeSwipe = true;
    if (anchor === 'right' && touch.clientX >= window.innerWidth - edgeThreshold) isEdgeSwipe = true;
    if (anchor === 'top' && touch.clientY <= edgeThreshold) isEdgeSwipe = true;
    if (anchor === 'bottom' && touch.clientY >= window.innerHeight - edgeThreshold) isEdgeSwipe = true;
    
    if (isEdgeSwipe) {
      onSwipe?.('open');
      // Note: Opening should be handled by parent component
    }
  }, [swipeEnabled, open, effectiveVariant, anchor, onSwipe]);

  // Auto-focus management
  useEffect(() => {
    if (open && !disableAutoFocus) {
      const timer = setTimeout(() => {
        const autoFocusElement = drawerRef.current?.querySelector('[data-autofocus]') as HTMLElement;
        const firstFocusable = drawerRef.current?.querySelector(
          ACCESSIBILITY_CONSTANTS.focusableSelector
        ) as HTMLElement;
        
        if (autoFocusElement) {
          autoFocusElement.focus();
        } else if (firstFocusable) {
          firstFocusable.focus();
        } else {
          drawerRef.current?.focus();
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open, disableAutoFocus]);

  // Keyboard event listeners
  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
    return undefined;
  }, [open, handleKeyDown]);

  // Touch event listeners for swipe gestures
  useEffect(() => {
    if (swipeEnabled) {
      const drawerElement = drawerRef.current;
      const swipeAreaElement = swipeAreaRef.current;
      
      if (drawerElement && open) {
        drawerElement.addEventListener('touchstart', handleTouchStart, { passive: false });
        drawerElement.addEventListener('touchmove', handleTouchMove, { passive: false });
        drawerElement.addEventListener('touchend', handleTouchEnd, { passive: false });
      }
      
      if (swipeAreaElement && !open) {
        swipeAreaElement.addEventListener('touchstart', handleEdgeSwipe, { passive: false });
      }
      
      return () => {
        if (drawerElement) {
          drawerElement.removeEventListener('touchstart', handleTouchStart);
          drawerElement.removeEventListener('touchmove', handleTouchMove);
          drawerElement.removeEventListener('touchend', handleTouchEnd);
        }
        if (swipeAreaElement) {
          swipeAreaElement.removeEventListener('touchstart', handleEdgeSwipe);
        }
      };
    }
    return undefined;
  }, [swipeEnabled, open, handleTouchStart, handleTouchMove, handleTouchEnd, handleEdgeSwipe]);

  // Handle animation callbacks
  useEffect(() => {
    if (open) {
      onOpened?.();
    } else {
      onClosed?.();
    }
    return undefined;
  }, [open, onOpened, onClosed]);

  // Update internal collapsed state when prop changes
  useEffect(() => {
    setInternalCollapsed(collapsed);
  }, [collapsed]);

  // Determine if we have header/footer
  const hasHeader = Boolean(header || (variant === 'mini' && showToggleButton));
  const hasFooter = Boolean(footer);

  // Get appropriate toggle icon based on anchor and collapsed state
  const getToggleIcon = () => {
    if (toggleButtonContent) return toggleButtonContent;
    
    if (anchor === 'left') {
      return effectiveCollapsed ? <ChevronRight /> : <ChevronLeft />;
    }
    if (anchor === 'right') {
      return effectiveCollapsed ? <ChevronLeft /> : <ChevronRight />;
    }
    if (anchor === 'top') {
      return effectiveCollapsed ? <KeyboardArrowDown /> : <KeyboardArrowUp />;
    }
    if (anchor === 'bottom') {
      return effectiveCollapsed ? <KeyboardArrowUp /> : <KeyboardArrowDown />;
    }
    return <Menu />;
  };

  // Accessibility props
  const accessibilityProps = {
    role: ACCESSIBILITY_CONSTANTS.drawerRole,
    'aria-label': ariaLabel || ACCESSIBILITY_CONSTANTS.drawerAriaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'aria-modal': effectiveVariant === 'temporary',
    'data-focus-trap': true,
  };

  // Drawer props
  const drawerProps = {
    drawerVariant: effectiveVariant,
    drawerAnchor: anchor,
    drawerSize: size,
    drawerBehavior: behavior,
    drawerAnimation: animation,
    drawerOpen: open,
    drawerCollapsed: effectiveCollapsed,
    drawerBackdrop: backdrop,
    drawerElevation: elevation,
    drawerElevationLevel: elevationLevel,
    drawerAnimationDuration: animationDuration,
    drawerWidth: width || undefined,
    drawerHeight: height || undefined,
    drawerMiniWidth: miniWidth || undefined,
    drawerResponsive: responsive,
    drawerResponsiveBreakpoint: responsiveBreakpoint,
  };

  // Content props
  const contentProps = {
    variant: effectiveVariant,
    anchor: anchor,
    size: size,
    collapsed: effectiveCollapsed,
    hasHeader,
    hasFooter,
    fixedHeader,
    fixedFooter,
    disableScrolling,
    hideScrollbar,
    disableScroll,
  };

  return (
    <>
      <style>{drawerAnimationKeyframes}</style>
      
      {/* Swipe area for edge detection when drawer is closed */}
      {swipeEnabled && !open && effectiveVariant === 'temporary' && (
        <StyledSwipeArea
          ref={swipeAreaRef}
          anchor={anchor}
          show={true}
          data-testid="drawer-swipe-area"
        />
      )}
      
      <StyledDrawer
        ref={ref}
        variant={effectiveVariant === 'mini' ? 'permanent' : effectiveVariant}
        anchor={anchor}
        open={open}
        onClose={handleClose}
        hideBackdrop={!backdrop || effectiveVariant === 'permanent' || effectiveVariant === 'persistent'}
        disableScrollLock={effectiveVariant === 'permanent' || effectiveVariant === 'persistent'}
        disableAutoFocus={disableAutoFocus}
        disableRestoreFocus={disableRestoreFocus}
        disableEnforceFocus={disableEnforceFocus}
        {...drawerProps}
        {...(zIndex && { style: { zIndex, ...style } })}
        {...(className && { className })}
        {...other}
      >
        <StyledDrawerContent
          ref={drawerRef}
          {...accessibilityProps}
          {...contentProps}
          {...(contentClassName && { className: contentClassName })}
          {...(contentStyle && { style: contentStyle })}
        >
          {hasHeader && (
            <StyledDrawerHeader
              fixed={fixedHeader}
              collapsed={effectiveCollapsed}
              variant={headerVariant}
              data-testid="drawer-header"
            >
              {header}
              {variant === 'mini' && showToggleButton && (
                <StyledToggleButton
                  onClick={handleToggleCollapse}
                  anchor={anchor}
                  collapsed={effectiveCollapsed}
                  aria-label={ACCESSIBILITY_CONSTANTS.toggleButtonAriaLabel}
                  data-testid="drawer-toggle-button"
                >
                  {getToggleIcon()}
                </StyledToggleButton>
              )}
            </StyledDrawerHeader>
          )}
          
          {navigation && (
            <StyledDrawerNavigation
              collapsed={effectiveCollapsed}
              role={ACCESSIBILITY_CONSTANTS.navigationRole}
              data-testid="drawer-navigation"
            >
              {navigation}
            </StyledDrawerNavigation>
          )}
          
          <StyledDrawerBody
            hasHeader={hasHeader}
            hasFooter={hasFooter}
            scrollable={!disableScrolling}
            data-testid="drawer-body"
          >
            {children}
          </StyledDrawerBody>
          
          {hasFooter && (
            <StyledDrawerFooter
              fixed={fixedFooter}
              collapsed={effectiveCollapsed}
              data-testid="drawer-footer"
            >
              {footer}
            </StyledDrawerFooter>
          )}
        </StyledDrawerContent>
      </StyledDrawer>
    </>
  );
});

DrawerComponent.displayName = 'Drawer';

// Export memoized component for performance optimization
export const Drawer = memo(DrawerComponent);