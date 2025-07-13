import { forwardRef, ComponentType, memo } from 'react';
import { IconButton, Slide, Fade, Grow, Collapse } from '@mui/material';
import { 
  CheckCircle, 
  Warning, 
  Info, 
  Error as ErrorIcon,
  Close 
} from '@mui/icons-material';
import { SnackbarProps } from './Snackbar.types';
import { 
  StyledSnackbar, 
  StyledSnackbarContent, 
  SnackbarMessage,
  SnackbarContentWrapper,
  SnackbarTitle,
  SnackbarActions
} from './Snackbar.styles';
import {
  DEFAULT_SNACKBAR_PROPS,
  ACCESSIBILITY_CONSTANTS,
} from './Snackbar.constants';
import { Button } from '../../core/Button';

/**
 * Enhanced Snackbar component with positioning and auto-hide functionality
 * 
 * Features:
 * - 4 severity levels: error, warning, info, success
 * - 3 variants: filled, outlined, standard
 * - Multiple positioning options with anchor origins
 * - Auto-hide functionality with customizable duration
 * - Custom actions and close button support
 * - Multiple transition animations
 * - Accessibility compliance (WCAG 2.1 AA)
 * - TypeScript support with strict typing
 * - Dark theme support via enhanced theme system
 */
export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>((
  {
    message,
    severity,
    variant = DEFAULT_SNACKBAR_PROPS.variant,
    title,
    anchorOrigin = DEFAULT_SNACKBAR_PROPS.anchorOrigin,
    open,
    onClose,
    autoHideDuration = DEFAULT_SNACKBAR_PROPS.autoHideDuration,
    actions,
    closable = DEFAULT_SNACKBAR_PROPS.closable,
    icon,
    showIcon = DEFAULT_SNACKBAR_PROPS.showIcon,
    transition = DEFAULT_SNACKBAR_PROPS.transition,
    transitionDuration = DEFAULT_SNACKBAR_PROPS.transitionDuration,
    elevated = DEFAULT_SNACKBAR_PROPS.elevated,
    elevation = DEFAULT_SNACKBAR_PROPS.elevation,
    rounded = DEFAULT_SNACKBAR_PROPS.rounded,
    borderRadius,
    bgcolor,
    color,
    maxWidth = DEFAULT_SNACKBAR_PROPS.maxWidth,
    clickAwayClose = DEFAULT_SNACKBAR_PROPS.clickAwayClose,
    escapeKeyClose = DEFAULT_SNACKBAR_PROPS.escapeKeyClose,
    zIndex = DEFAULT_SNACKBAR_PROPS.zIndex,
    className,
    sx,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    role,
    ...other
  },
  ref
) => {
  // Handle close events
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    // Prevent closing on clickaway if disabled
    if (!clickAwayClose && reason === 'clickaway') {
      return;
    }
    
    // Prevent closing on escape if disabled
    if (!escapeKeyClose && reason === 'escapeKeyDown') {
      return;
    }
    
    onClose?.(event, reason);
  };

  // Get default icon based on severity
  const getDefaultIcon = () => {
    if (!severity) return null;
    
    const iconProps = { className: 'snackbar-icon' };
    switch (severity) {
      case 'error':
        return <ErrorIcon {...iconProps} />;
      case 'warning':
        return <Warning {...iconProps} />;
      case 'info':
        return <Info {...iconProps} />;
      case 'success':
        return <CheckCircle {...iconProps} />;
      default:
        return null;
    }
  };

  // Get transition component
  const getTransitionComponent = (): ComponentType<any> => {
    const transitionProps = {
      timeout: transitionDuration,
      direction: anchorOrigin.horizontal === 'right' ? 'left' : 'right',
    };
    
    switch (transition) {
      case 'slide':
        return (props) => <Slide {...transitionProps} {...props} />;
      case 'fade':
        return (props) => <Fade timeout={transitionDuration} {...props} />;
      case 'grow':
        return (props) => <Grow timeout={transitionDuration} {...props} />;
      case 'collapse':
        return (props) => <Collapse timeout={transitionDuration} {...props} />;
      default:
        return (props) => <Slide {...transitionProps} {...props} />;
    }
  };

  // Build actions
  const buildActions = () => {
    const actionItems = [];
    
    // Add custom actions
    if (actions?.length) {
      actions.forEach((action, index) => (
        actionItems.push(
          <Button
            key={`action-${index}`}
            variant="text"
            color={action.color || 'inherit'}
            size="small"
            onClick={action.onClick}
            aria-label={`${ACCESSIBILITY_CONSTANTS.actionLabel}: ${action.label}`}
          >
            {action.label}
          </Button>
        )
      ));
    }
    
    // Add close button
    if (closable) {
      actionItems.push(
        <IconButton
          key="close"
          size="small"
          onClick={() => handleClose(undefined, 'closeButton')}
          aria-label={ACCESSIBILITY_CONSTANTS.closeLabel}
          sx={{ color: 'inherit' }}
        >
          <Close fontSize="small" />
        </IconButton>
      );
    }
    
    return actionItems.length > 0 ? (
      <SnackbarActions>
        {actionItems}
      </SnackbarActions>
    ) : undefined;
  };

  // Build message content
  const buildMessageContent = () => {
    const iconElement = showIcon ? (icon || getDefaultIcon()) : null;
    
    return (
      <SnackbarMessage data-testid="snackbar">
        {iconElement}
        <SnackbarContentWrapper className="snackbar-content">
          {title && (
            <SnackbarTitle className="snackbar-title">
              {title}
            </SnackbarTitle>
          )}
          <div className="snackbar-message">
            {message}
          </div>
        </SnackbarContentWrapper>
      </SnackbarMessage>
    );
  };

  // Accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    role: role || (severity === 'error' ? ACCESSIBILITY_CONSTANTS.alertRole : ACCESSIBILITY_CONSTANTS.statusRole),
    'aria-live': severity === 'error' ? ACCESSIBILITY_CONSTANTS.liveRegionAssertive : ACCESSIBILITY_CONSTANTS.liveRegionPolite,
  };

  return (
    <StyledSnackbar
      ref={ref}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      TransitionComponent={getTransitionComponent()}
      className={className}
      sx={sx}
      customZIndex={zIndex}
      {...other}
    >
      <StyledSnackbarContent
        message={buildMessageContent()}
        action={buildActions()}
        customSeverity={severity}
        customVariant={variant}
        customElevated={elevated}
        customElevation={elevation}
        customRounded={rounded}
        customBorderRadius={borderRadius}
        customBgcolor={bgcolor}
        customColor={color}
        customMaxWidth={maxWidth}
        {...accessibilityProps}
      />
    </StyledSnackbar>
  );
});

Snackbar.displayName = 'Snackbar';