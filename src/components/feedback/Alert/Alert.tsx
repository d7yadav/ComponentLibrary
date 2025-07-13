import { forwardRef, useState, useEffect, memo } from 'react';
import { IconButton } from '@mui/material';
import { 
  CheckCircle, 
  Warning, 
  Info, 
  Error as ErrorIcon,
  Close 
} from '@mui/icons-material';
import { AlertProps } from './Alert.types';
import { 
  StyledAlert, 
  AlertTitle, 
  AlertContent, 
  AlertActions 
} from './Alert.styles';
import {
  DEFAULT_ALERT_PROPS,
  ACCESSIBILITY_CONSTANTS,
  ALERT_COLORS,
} from './Alert.constants';
import { Button } from '../../core/Button';

/**
 * Enhanced Alert component with multiple severity levels and variants
 * 
 * Features:
 * - 4 severity levels: error, warning, info, success
 * - 3 variants: filled, outlined, standard
 * - Multiple sizes: small, medium, large
 * - Auto-hide functionality with customizable duration
 * - Custom actions and close button support
 * - Animation options for enhanced UX
 * - Accessibility compliance (WCAG 2.1 AA)
 * - TypeScript support with strict typing
 * - Dark theme support via enhanced theme system
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>((
  {
    children,
    severity = DEFAULT_ALERT_PROPS.severity,
    variant = DEFAULT_ALERT_PROPS.variant,
    size = DEFAULT_ALERT_PROPS.size,
    title,
    closable = DEFAULT_ALERT_PROPS.closable,
    onClose,
    icon,
    showIcon = DEFAULT_ALERT_PROPS.showIcon,
    actions,
    fullWidth = DEFAULT_ALERT_PROPS.fullWidth,
    elevated = DEFAULT_ALERT_PROPS.elevated,
    elevation = DEFAULT_ALERT_PROPS.elevation,
    rounded = DEFAULT_ALERT_PROPS.rounded,
    borderRadius,
    centered = DEFAULT_ALERT_PROPS.centered,
    bgcolor,
    color,
    autoHide = DEFAULT_ALERT_PROPS.autoHide,
    autoHideDuration = DEFAULT_ALERT_PROPS.autoHideDuration,
    animated = DEFAULT_ALERT_PROPS.animated,
    animationDuration = DEFAULT_ALERT_PROPS.animationDuration,
    className,
    sx,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    role,
    ...other
  },
  ref
) => {
  const [visible, setVisible] = useState(true);

  // Auto-hide functionality
  useEffect(() => {
    if (autoHide && autoHideDuration > 0 && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDuration, visible, onClose]);

  // Handle close
  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  // Get default icon based on severity
  const getDefaultIcon = () => {
    const iconProps = { fontSize: 'inherit' as const };
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
        return <Info {...iconProps} />;
    }
  };

  // Build close action
  const closeAction = closable ? (
    <IconButton
      size="small"
      onClick={handleClose}
      aria-label={ACCESSIBILITY_CONSTANTS.closeLabel}
      sx={{ 
        color: 'inherit',
        padding: 0.5,
        marginLeft: 1,
      }}
    >
      <Close fontSize="small" />
    </IconButton>
  ) : undefined;

  // Build action buttons
  const actionButtons = actions?.length ? (
    <AlertActions>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'text'}
          color={action.color || 'inherit'}
          size="small"
          onClick={action.onClick}
          aria-label={`${ACCESSIBILITY_CONSTANTS.actionLabel}: ${action.label}`}
        >
          {action.label}
        </Button>
      ))}
    </AlertActions>
  ) : null;

  // Accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    role: role || (severity === 'error' ? ACCESSIBILITY_CONSTANTS.alertRole : ACCESSIBILITY_CONSTANTS.statusRole),
    'aria-live': severity === 'error' ? ACCESSIBILITY_CONSTANTS.liveRegionAssertive : ACCESSIBILITY_CONSTANTS.liveRegionPolite,
  };

  if (!visible) {
    return null;
  }

  return (
    <StyledAlert data-testid="alert"
      ref={ref}
      severity={severity}
      variant={variant}
      icon={showIcon ? (icon || getDefaultIcon()) : false}
      action={closeAction}
      className={className}
      sx={sx}
      // Custom props for styled component
      customSize={size}
      customFullWidth={fullWidth}
      customElevated={elevated}
      customElevation={elevation}
      customRounded={rounded}
      customBorderRadius={borderRadius}
      customCentered={centered}
      customBgcolor={bgcolor}
      customColor={color}
      customAnimated={animated}
      customAnimationDuration={animationDuration}
      {...accessibilityProps}
      {...other}
    >
      <div className="alert-message">
        {title && (
          <AlertTitle customSize={size} className="alert-title">
            {title}
          </AlertTitle>
        )}
        <AlertContent className="alert-content">
          {children}
        </AlertContent>
        {actionButtons}
      </div>
    </StyledAlert>
  );
});

Alert.displayName = 'Alert';