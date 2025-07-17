import { Close } from '@mui/icons-material';
import { CircularProgress, Typography } from '@mui/material';
import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { isValidElement } from 'react';

import { Box } from '@/components/layout/Box';
import { Modal } from '@/components/surfaces/Modal';
import type { ModalVariant, ModalSize } from '@/components/surfaces/Modal';

import {
  DIALOG_TYPE_ICONS,
  DIALOG_DEFAULTS,
  DIALOG_ACCESSIBILITY_CONSTANTS,
  DIALOG_PRESET_ACTIONS,
} from './Dialog.constants';
import {
  StyledDialogContainer,
  StyledDialogHeader,
  StyledDialogTitle,
  StyledDialogSubtitle,
  StyledDialogIcon,
  StyledDialogContent,
  StyledDialogFooter,
  StyledDialogAction,
  StyledDialogLoadingOverlay,
  StyledDialogCloseButton,
  loadingSpinKeyframes,
} from './Dialog.styles';
import type { DialogProps, DialogAction } from './Dialog.types';

/**
 * Enhanced Dialog component built on top of Modal with pre-configured layouts and actions
 * 
 * Features:
 * - 6 variants: confirmation, alert, form, custom, fullscreen, simple
 * - 5 types: info, success, warning, error, question (with icons)
 * - 5 sizes: small, medium, large, fullscreen, auto
 * - Pre-configured action buttons with different types
 * - Scrollable content support
 * - Draggable title bar (optional)
 * - Loading states and overlays
 * - Mobile-responsive with adaptive layouts
 * - Comprehensive accessibility (WCAG 2.1 AA)
 * - Built on Modal component for consistency
 */
const DialogComponent = forwardRef<HTMLDivElement, DialogProps>(({
  variant = DIALOG_DEFAULTS.variant,
  type = DIALOG_DEFAULTS.type,
  size = DIALOG_DEFAULTS.size,
  title,
  subtitle,
  content,
  children,
  actions = [],
  showIcon = DIALOG_DEFAULTS.showIcon,
  icon,
  scrollable = DIALOG_DEFAULTS.scrollable,
  draggable = DIALOG_DEFAULTS.draggable,
  dividers = DIALOG_DEFAULTS.dividers,
  maxContentHeight,
  minWidth,
  customHeader,
  customFooter,
  loading = false,
  loadingMessage = 'Loading...',
  elevation = DIALOG_DEFAULTS.elevation,
  // contentClassName, // Not used
  headerClassName,
  bodyClassName,
  footerClassName,
  onAction,
  onConfirm,
  onCancel,
  actionButtonProps = {},
  open,
  onClose,
  closeOnBackdropClick = DIALOG_DEFAULTS.closeOnBackdropClick,
  closeOnEscape = DIALOG_DEFAULTS.closeOnEscape,
  animationDuration = DIALOG_DEFAULTS.animationDuration,
  showCloseButton = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...other
}, ref) => {
  const [isActionLoading, setIsActionLoading] = useState<Record<string, boolean>>({});

  // Generate unique IDs for accessibility
  const titleId = useMemo(() => ariaLabelledBy || `${DIALOG_ACCESSIBILITY_CONSTANTS.titleId}-${Math.random().toString(36).substr(2, 9)}`, [ariaLabelledBy]);
  const descriptionId = useMemo(() => ariaDescribedBy || `${DIALOG_ACCESSIBILITY_CONSTANTS.descriptionId}-${Math.random().toString(36).substr(2, 9)}`, [ariaDescribedBy]);

  // Handle action click with loading state
  const handleActionClick = useCallback(async (action: DialogAction): Promise<void> => {
    if (action.disabled || isActionLoading[action.label]) return;

    try {
      setIsActionLoading(prev => ({ ...prev, [action.label]: true }));
      
      // Call the action handler
      const result = action.onClick({} as React.MouseEvent<HTMLButtonElement>);
      // Handle async actions
      if (result instanceof Promise) {
        void await result;
      } else {
        void result;
      }
      
      // Call global action handler
      onAction?.(action.label, action.type);
      
      // Handle special action types
      if (action.type === 'cancel') {
        onCancel?.();
      } else if (action.label.toLowerCase().includes('confirm') || action.label.toLowerCase().includes('ok')) {
        onConfirm?.();
      }
      
    } catch (error) {
      console.error('Dialog action error:', error);
    } finally {
      setIsActionLoading(prev => ({ ...prev, [action.label]: false }));
    }
  }, [isActionLoading, onAction, onConfirm, onCancel]);

  // Handle dialog close
  const handleClose = useCallback((event?: object, reason?: 'backdropClick' | 'escapeKeyDown'): void => {
    if (loading) return; // Prevent closing during loading
    onClose?.(event, reason);
  }, [onClose, loading]);

  // Get icon component
  const IconComponent = useMemo<React.ReactNode>(() => {
    if (icon) return icon;
    if (!showIcon || !type) return null;
    
    const IconType = DIALOG_TYPE_ICONS[type];
    return IconType ? <IconType /> : null;
  }, [icon, showIcon, type]);

  // Map dialog size to modal size
  const modalSize: ModalSize = useMemo<ModalSize>(() => {
    switch (size) {
      case 'small': return 'sm';
      case 'medium': return 'md';
      case 'large': return 'lg';
      case 'fullscreen': return 'fullscreen';
      case 'auto': return 'md';
      default: return 'md';
    }
  }, [size]);

  // Map dialog variant to modal variant
  const modalVariant: ModalVariant = useMemo<ModalVariant>(() => {
    switch (variant) {
      case 'fullscreen': return 'fullscreen';
      case 'simple':
      case 'alert':
      case 'confirmation':
      case 'form':
      case 'custom':
      default:
        return 'centered';
    }
  }, [variant]);

  // Determine if we should show footer
  const hasActions = actions.length > 0 || customFooter;
  const hasHeader = customHeader || title || IconComponent || showCloseButton;

  // Render actions
  const renderActions = useCallback((): React.ReactNode => {
    if (customFooter) return customFooter;
    if (!actions.length) return null;

    return actions.map((action, index) => {
      const isLoading = action.loading || isActionLoading[action.label];
      
      // Map action type to button variant
      const getButtonVariant = (actionType?: string) => {
        switch (actionType) {
          case 'primary': return 'primary';
          case 'secondary': return 'secondary';
          case 'cancel': return 'outline';
          case 'destructive': return 'primary'; // Will be styled red via StyledDialogAction
          default: return 'secondary';
        }
      };

      // Ensure icon is always a valid React element
      const safeIcon = isValidElement(action.icon)
        ? action.icon
        : typeof action.icon === 'function'
          ? React.createElement(action.icon)
          : undefined;

      return (
        <StyledDialogAction
          key={`${action.label}-${index}`}
          variant={getButtonVariant(action.type)}
          destructive={action.type === 'destructive'}
          disabled={action.disabled || loading}
          loading={isLoading}
          onClick={() => handleActionClick(action)}
          startIcon={safeIcon}
          autoFocus={action.autoFocus} // Intentional: Dialog action buttons may use autoFocus for accessibility
          className={action.className}
          data-testid={action['data-testid']}
          {...actionButtonProps}
        >
          {action.label}
        </StyledDialogAction>
      );
    });
  }, [actions, customFooter, isActionLoading, loading, handleActionClick, actionButtonProps]);

  // Render header content
  const renderHeader = useCallback((): React.ReactNode => {
    if (customHeader) return customHeader;
    if (!hasHeader) return null;

    return (
      <StyledDialogHeader
        variant={variant!}
        type={type!}
        draggable={draggable}
        dividers={dividers}
        hasIcon={Boolean(IconComponent)}
        className={headerClassName}
      >
        {IconComponent && (
          <StyledDialogIcon dialogType={type!}>
            {IconComponent}
          </StyledDialogIcon>
        )}
        
        <Box sx={{ flex: 1 }}>
          {title && (
            <StyledDialogTitle id={titleId} variant="h6">
              {title}
            </StyledDialogTitle>
          )}
          {subtitle && (
            <StyledDialogSubtitle variant="body2">
              {subtitle}
            </StyledDialogSubtitle>
          )}
        </Box>
        
        {showCloseButton && (
          <StyledDialogCloseButton
            variant="text"
            onClick={() => handleClose({}, 'backdropClick')}
            aria-label={DIALOG_ACCESSIBILITY_CONSTANTS.closeButtonAriaLabel}
            data-testid="dialog-close-button"
          >
            <Close />
          </StyledDialogCloseButton>
        )}
      </StyledDialogHeader>
    );
  }, [
    customHeader, 
    hasHeader, 
    variant, 
    type, 
    draggable, 
    dividers, 
    IconComponent, 
    headerClassName,
    title, 
    titleId, 
    subtitle, 
    showCloseButton, 
    handleClose
  ]);

  // Main dialog content
  const dialogContent: React.ReactNode = (
    <StyledDialogContainer
      variant={variant!}
      type={type!}
      size={size!}
      scrollable={scrollable}
      draggable={draggable}
      dividers={dividers}
      showIcon={Boolean(IconComponent)}
      loading={loading}
      elevation={elevation}
      maxContentHeight={maxContentHeight}
      minWidth={minWidth}
    >
      {/* Loading overlay */}
      {loading && (
        <StyledDialogLoadingOverlay>
          <CircularProgress size={40} />
          {loadingMessage && (
            <Typography variant="body2" color="text.secondary">
              {loadingMessage}
            </Typography>
          )}
        </StyledDialogLoadingOverlay>
      )}

      {/* Header */}
      {renderHeader()}

      {/* Content/Body */}
      <StyledDialogContent
        variant={variant!}
        size={size!}
        scrollable={scrollable}
        hasIcon={Boolean(IconComponent)}
        hasActions={hasActions}
        maxContentHeight={maxContentHeight}
        className={bodyClassName}
        id={descriptionId}
      >
        {content || children}
      </StyledDialogContent>

      {/* Footer/Actions */}
      {hasActions && (
        <StyledDialogFooter className={footerClassName}>
          {renderActions()}
        </StyledDialogFooter>
      )}
    </StyledDialogContainer>
  );

  return (
    <>
      <style>{loadingSpinKeyframes}</style>
      <Modal
        ref={ref}
        open={open}
        onClose={handleClose}
        variant={modalVariant}
        size={modalSize}
        closeOnBackdropClick={closeOnBackdropClick}
        closeOnEscape={closeOnEscape && !loading}
        animationDuration={animationDuration}
        showCloseButton={false} // We handle close button in dialog header
        {...(ariaLabel || title ? { 'aria-label': ariaLabel || title } : {})}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        {...other}
      >
        {dialogContent}
      </Modal>
    </>
  );
});

DialogComponent.displayName = 'Dialog';

// Export memoized component for performance optimization
export const Dialog = memo(DialogComponent);

// Export preset action creators for convenience
export const createDialogActions = {
  /**
   * Create OK/Cancel actions for confirmation dialogs
   */
  okCancel: (
    onOk: () => void | Promise<void>,
    onCancel?: () => void
  ): DialogAction[] => [
    { ...DIALOG_PRESET_ACTIONS.cancel, onClick: onCancel || (() => {}) },
    { ...DIALOG_PRESET_ACTIONS.ok, onClick: onOk },
  ],

  /**
   * Create Yes/No actions for confirmation dialogs
   */
  yesNo: (
    onYes: () => void | Promise<void>,
    onNo?: () => void
  ): DialogAction[] => [
    { ...DIALOG_PRESET_ACTIONS.no, onClick: onNo || (() => {}) },
    { ...DIALOG_PRESET_ACTIONS.yes, onClick: onYes },
  ],

  /**
   * Create Save/Cancel actions for form dialogs
   */
  saveCancel: (
    onSave: () => void | Promise<void>,
    onCancel?: () => void
  ): DialogAction[] => [
    { ...DIALOG_PRESET_ACTIONS.cancel, onClick: onCancel || (() => {}) },
    { ...DIALOG_PRESET_ACTIONS.save, onClick: onSave },
  ],

  /**
   * Create Delete/Cancel actions for destructive operations
   */
  deleteCancel: (
    onDelete: () => void | Promise<void>,
    onCancel?: () => void
  ): DialogAction[] => [
    { ...DIALOG_PRESET_ACTIONS.cancel, onClick: onCancel || (() => {}) },
    { ...DIALOG_PRESET_ACTIONS.delete, onClick: onDelete },
  ],

  /**
   * Create custom actions with common patterns
   */
  custom: (actions: Partial<DialogAction>[]): DialogAction[] => 
    actions.map(action => ({
      label: action.label || 'Action',
      type: action.type || 'secondary',
      onClick: action.onClick || (() => {}),
      ...action,
    })),
};