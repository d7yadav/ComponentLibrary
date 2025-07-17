/**
 * @fileoverview Tooltip component implementation
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import { ClickAwayListener, Fade, Popper, Portal } from '@mui/material';
import React, {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

import {
  ACCESSIBILITY_CONSTANTS,
  DEFAULT_TOOLTIP_PROPS,
  TOOLTIP_UTILS
} from './Tooltip.constants';
import {
  RichTooltipActions,
  RichTooltipAvatar,
  RichTooltipBody,
  RichTooltipContent,
  RichTooltipHeader,
  RichTooltipTitle,
  TooltipArrow,
  TooltipContainer
} from './Tooltip.styles';
import type {
  RichTooltipProps,
  TooltipContextValue,
  TooltipProps
} from './Tooltip.types';

// Tooltip context for rich tooltips
const TooltipContext = createContext<TooltipContextValue | null>(null);

/**
 * RichTooltip component - Enhanced tooltip with rich content
 */
export const RichTooltip = memo(({
  title,
  content,
  actions,
  avatar,
  maxWidth,
  className,
}: RichTooltipProps) => {
  const context = useContext(TooltipContext);
  
  return (
    <RichTooltipContent 
      variant={context?.variant || 'rich'} 
      maxWidth={maxWidth}
      className={className}
    >
      {(title || avatar) && (
        <RichTooltipHeader>
          {avatar && (
            <RichTooltipAvatar>
              {avatar}
            </RichTooltipAvatar>
          )}
          {title && (
            <RichTooltipTitle>
              {title}
            </RichTooltipTitle>
          )}
        </RichTooltipHeader>
      )}
      
      {content && (
        <RichTooltipBody>
          {content}
        </RichTooltipBody>
      )}
      
      {actions && (
        <RichTooltipActions>
          {actions}
        </RichTooltipActions>
      )}
    </RichTooltipContent>
  );
});

RichTooltip.displayName = 'RichTooltip';

/**
 * Tooltip component - Main tooltip implementation
 */
export const Tooltip = memo(forwardRef<HTMLDivElement, TooltipProps>(({
  children,
  title,
  open: controlledOpen,
  defaultOpen = false,
  placement = DEFAULT_TOOLTIP_PROPS.placement,
  variant = DEFAULT_TOOLTIP_PROPS.variant,
  arrow = DEFAULT_TOOLTIP_PROPS.arrow,
  trigger = DEFAULT_TOOLTIP_PROPS.trigger,
  disableHoverListener = DEFAULT_TOOLTIP_PROPS.disableHoverListener,
  disableFocusListener = DEFAULT_TOOLTIP_PROPS.disableFocusListener,
  disableTouchListener = DEFAULT_TOOLTIP_PROPS.disableTouchListener,
  disableInteractive = DEFAULT_TOOLTIP_PROPS.disableInteractive,
  enterDelay = DEFAULT_TOOLTIP_PROPS.enterDelay,
  leaveDelay = DEFAULT_TOOLTIP_PROPS.leaveDelay,
  enterNextDelay = DEFAULT_TOOLTIP_PROPS.enterNextDelay,
  enterTouchDelay = DEFAULT_TOOLTIP_PROPS.enterTouchDelay,
  leaveTouchDelay = DEFAULT_TOOLTIP_PROPS.leaveTouchDelay,
  onOpen,
  onClose,
  followCursor = DEFAULT_TOOLTIP_PROPS.followCursor,
  PopperComponent = Popper,
  PopperProps,
  TransitionComponent = Fade,
  TransitionProps,
  className,
  sx,
  components,
  componentsProps,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  describeChild = DEFAULT_TOOLTIP_PROPS.describeChild,
  disablePortal = DEFAULT_TOOLTIP_PROPS.disablePortal,
  container,
  ...rest
}, ref) => {
  // Internal state
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Refs
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLElement>(null);
  const enterTimerRef = useRef<NodeJS.Timeout>();
  const leaveTimerRef = useRef<NodeJS.Timeout>();
  const touchTimerRef = useRef<NodeJS.Timeout>();
  
  // Computed values
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const isControlled = controlledOpen !== undefined;
  const triggerArray = Array.isArray(trigger) ? trigger : [trigger];
  const isInteractive = !disableInteractive && TOOLTIP_UTILS.hasInteractiveContent(title);
  const tooltipId = TOOLTIP_UTILS.generateTooltipId();
  
  // Check if specific triggers are active
  const isHoverTrigger = !disableHoverListener && TOOLTIP_UTILS.isTriggerActive(triggerArray, 'hover');
  const isFocusTrigger = !disableFocusListener && TOOLTIP_UTILS.isTriggerActive(triggerArray, 'focus');
  const isClickTrigger = TOOLTIP_UTILS.isTriggerActive(triggerArray, 'click');
  const isTouchTrigger = !disableTouchListener && TOOLTIP_UTILS.isTriggerActive(triggerArray, 'hover');
  
  // Timer management
  const clearTimers = useCallback(() => {
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = undefined;
    }
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = undefined;
    }
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = undefined;
    }
  }, []);
  
  // Open tooltip
  const handleOpen = useCallback(() => {
    clearTimers();
    
    if (!isControlled) {
      setInternalOpen(true);
    }
    
    onOpen?.();
  }, [clearTimers, isControlled, onOpen]);
  
  // Close tooltip
  const handleClose = useCallback(() => {
    clearTimers();
    
    if (!isControlled) {
      setInternalOpen(false);
    }
    
    onClose?.();
  }, [clearTimers, isControlled, onClose]);
  
  // Delayed open
  const handleDelayedOpen = useCallback((delay: number = enterDelay) => {
    clearTimers();
    
    if (delay > 0) {
      enterTimerRef.current = setTimeout(handleOpen, delay);
    } else {
      handleOpen();
    }
  }, [clearTimers, enterDelay, handleOpen]);
  
  // Delayed close
  const handleDelayedClose = useCallback((delay: number = leaveDelay) => {
    clearTimers();
    
    if (delay > 0) {
      leaveTimerRef.current = setTimeout(handleClose, delay);
    } else {
      handleClose();
    }
  }, [clearTimers, leaveDelay, handleClose]);
  
  // Mouse event handlers
  const handleMouseEnter = useCallback((event: React.MouseEvent) => {
    if (isHoverTrigger) {
      handleDelayedOpen();
    }
    
    if (followCursor) {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    }
  }, [isHoverTrigger, handleDelayedOpen, followCursor]);
  
  const handleMouseLeave = useCallback(() => {
    if (isHoverTrigger) {
      handleDelayedClose();
    }
  }, [isHoverTrigger, handleDelayedClose]);
  
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (followCursor && isOpen) {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    }
  }, [followCursor, isOpen]);
  
  // Focus event handlers
  const handleFocus = useCallback(() => {
    if (isFocusTrigger) {
      handleDelayedOpen();
    }
  }, [isFocusTrigger, handleDelayedOpen]);
  
  const handleBlur = useCallback(() => {
    if (isFocusTrigger) {
      handleDelayedClose();
    }
  }, [isFocusTrigger, handleDelayedClose]);
  
  // Click event handlers
  const handleClick = useCallback(() => {
    if (isClickTrigger) {
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }
  }, [isClickTrigger, isOpen, handleClose, handleOpen]);
  
  // Touch event handlers
  const handleTouchStart = useCallback(() => {
    if (isTouchTrigger) {
      touchTimerRef.current = setTimeout(() => {
        handleDelayedOpen(enterTouchDelay);
      }, 0);
    }
  }, [isTouchTrigger, handleDelayedOpen, enterTouchDelay]);
  
  const handleTouchEnd = useCallback(() => {
    if (isTouchTrigger) {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
        touchTimerRef.current = undefined;
      }
      handleDelayedClose(leaveTouchDelay);
    }
  }, [isTouchTrigger, handleDelayedClose, leaveTouchDelay]);
  
  // Click away handler for interactive tooltips
  const handleClickAway = useCallback(() => {
    if (isInteractive && isOpen) {
      handleClose();
    }
  }, [isInteractive, isOpen, handleClose]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);
  
  // Don't render if no title
  if (!title) {
    return children;
  }
  
  // Clone child element with event handlers
  const childElement = isValidElement(children) 
    ? cloneElement(children, {
        ref: (node: HTMLElement) => {
          // Handle both forwarded ref and internal ref
          if (children.ref) {
            if (typeof children.ref === 'function') {
              children.ref(node);
            } else {
              (children.ref as any).current = node;
            }
          }
          childRef.current = node;
        },
        onMouseEnter: (event: React.MouseEvent) => {
          handleMouseEnter(event);
          children.props.onMouseEnter?.(event);
        },
        onMouseLeave: (event: React.MouseEvent) => {
          handleMouseLeave();
          children.props.onMouseLeave?.(event);
        },
        onMouseMove: (event: React.MouseEvent) => {
          handleMouseMove(event);
          children.props.onMouseMove?.(event);
        },
        onFocus: (event: React.FocusEvent) => {
          handleFocus();
          children.props.onFocus?.(event);
        },
        onBlur: (event: React.FocusEvent) => {
          handleBlur();
          children.props.onBlur?.(event);
        },
        onClick: (event: React.MouseEvent) => {
          handleClick();
          children.props.onClick?.(event);
        },
        onTouchStart: (event: React.TouchEvent) => {
          handleTouchStart();
          children.props.onTouchStart?.(event);
        },
        onTouchEnd: (event: React.TouchEvent) => {
          handleTouchEnd();
          children.props.onTouchEnd?.(event);
        },
        'aria-describedby': describeChild ? tooltipId : ariaDescribedBy,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
      })
    : children;
  
  // Context value for rich tooltips
  const contextValue: TooltipContextValue = {
    placement,
    variant,
    isOpen,
    close: handleClose,
  };
  
  // Tooltip content
  const tooltipContent = (
    <TooltipContext.Provider value={contextValue}>
      <TooltipContainer
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          (tooltipRef as any).current = node;
        }}
        placement={placement}
        variant={variant}
        hasArrow={arrow}
        interactive={isInteractive}
        className={className}
        sx={sx}
        role={ACCESSIBILITY_CONSTANTS.ROLES.TOOLTIP}
        id={tooltipId}
        {...rest}
      >
        {title}
        {arrow && (
          <TooltipArrow 
            placement={placement} 
            variant={variant}
          />
        )}
      </TooltipContainer>
    </TooltipContext.Provider>
  );
  
  // Render tooltip with Popper
  const tooltipElement = (
    <PopperComponent
      open={isOpen}
      anchorEl={followCursor 
        ? {
            getBoundingClientRect: () => ({
              top: cursorPosition.y,
              left: cursorPosition.x,
              right: cursorPosition.x,
              bottom: cursorPosition.y,
              width: 0,
              height: 0,
            }),
          } as any
        : childRef.current
      }
      placement={placement}
      disablePortal={disablePortal}
      container={container}
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: TOOLTIP_UTILS.getPlacementOffset(placement),
          },
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 8,
          },
        },
      ]}
      {...PopperProps}
    >
      <TransitionComponent
        in={isOpen}
        timeout={200}
        {...TransitionProps}
      >
        <div>
          {isInteractive ? (
            <ClickAwayListener onClickAway={handleClickAway}>
              <div>
                {tooltipContent}
              </div>
            </ClickAwayListener>
          ) : (
            tooltipContent
          )}
        </div>
      </TransitionComponent>
    </PopperComponent>
  );
  
  return (
    <>
      {childElement}
      {disablePortal ? tooltipElement : (
        <Portal container={container}>
          {tooltipElement}
        </Portal>
      )}
    </>
  );
}));

Tooltip.displayName = 'Tooltip';