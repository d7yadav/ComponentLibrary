import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import { Box, Typography, BoxProps, TypographyProps, Divider } from '@mui/material';
import { Button } from '../../core/Button';
import { 
  DialogStyleProps, 
  DialogActionStyleProps, 
  DialogContentStyleProps,
  DialogHeaderStyleProps 
} from './Dialog.types';
import { 
  DIALOG_SIZE_MAPPINGS, 
  DIALOG_TYPE_COLORS, 
  DIALOG_BREAKPOINTS,
  DIALOG_CLASS_NAMES 
} from './Dialog.constants';

// Keyframes for animations
/**
 * dialogShakeKeyframes component
 * 
 * @returns JSX element
 */
export const dialogShakeKeyframes = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
`;

/**
 * dialogPulseKeyframes component
 * 
 * @returns JSX element
 */
export const dialogPulseKeyframes = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

/**
 * dialogBounceKeyframes component
 * 
 * @returns JSX element
 */
export const dialogBounceKeyframes = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
  40%, 43% { transform: translate3d(0, -8px, 0); }
  70% { transform: translate3d(0, -4px, 0); }
  90% { transform: translate3d(0, -2px, 0); }
`;

// Main Dialog Container
/**
 * StyledDialogContainer component
 * 
 * @returns JSX element
 */
export const StyledDialogContainer: React.ComponentType<any> = styled(Box)<DialogStyleProps & BoxProps>(({ 
  theme, 
  variant, 
  type, 
  size, 
  scrollable, 
  draggable, 
  dividers, 
  showIcon, 
  loading, 
  elevation,
  maxContentHeight,
  minWidth 
}) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  minWidth: minWidth || DIALOG_SIZE_MAPPINGS[size]?.minWidth || 'auto',
  maxWidth: DIALOG_SIZE_MAPPINGS[size]?.maxWidth || '600px',
  maxHeight: maxContentHeight ? `calc(100vh - 64px)` : '90vh',
  width: size === 'fullscreen' ? '100vw' : 'auto',
  height: size === 'fullscreen' ? '100vh' : 'auto',
  margin: size === 'fullscreen' ? 0 : theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  outline: 'none',
  overflow: 'hidden',
  
  // Elevation
  ...(elevation && {
    boxShadow: variant === 'fullscreen' 
      ? 'none' 
      : theme.shadows[8],
  }),
  
  // Dark theme adjustments
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.grey[900],
    borderColor: theme.palette.divider,
  }),
  
  // Variant-specific styles
  ...(variant === 'alert' && {
    minWidth: '320px',
    maxWidth: '500px',
  }),
  
  ...(variant === 'confirmation' && {
    minWidth: '400px',
    maxWidth: '600px',
  }),
  
  ...(variant === 'form' && {
    minWidth: '500px',
    maxWidth: '800px',
  }),
  
  ...(variant === 'fullscreen' && {
    borderRadius: 0,
    margin: 0,
    width: '100vw',
    height: '100vh',
    maxWidth: 'none',
    maxHeight: 'none',
  }),
  
  // Type-specific colors
  ...(type && {
    borderTop: `4px solid ${(theme.palette as any)[DIALOG_TYPE_COLORS[type]]?.main || theme.palette.primary.main}`,
  }),
  
  // Loading state
  ...(loading && {
    pointerEvents: 'none',
    opacity: 0.7,
  }),
  
  // Draggable cursor
  ...(draggable && {
    '& .dialog-header': {
      cursor: 'move',
      userSelect: 'none',
    },
  }),
  
  // Responsive behavior
  [`@media (${DIALOG_BREAKPOINTS.mobile})`]: {
    margin: theme.spacing(1),
    minWidth: '280px',
    maxWidth: 'calc(100vw - 16px)',
    
    ...(variant !== 'fullscreen' && size !== 'small' && {
      width: 'calc(100vw - 16px)',
    }),
  },
  
  // Animation states
  '&.dialog-enter': {
    animation: `${dialogBounceKeyframes} 0.6s ease-out`,
  },
  
  '&.dialog-shake': {
    animation: `${dialogShakeKeyframes} 0.5s ease-in-out`,
  },
  
  className: DIALOG_CLASS_NAMES.container,
}));

// Dialog Header
/**
 * StyledDialogHeader component
 * 
 * @returns JSX element
 */
export const StyledDialogHeader: React.ComponentType<any> = styled(Box)<DialogHeaderStyleProps & BoxProps>(({ 
  theme, 
  variant, 
  type, 
  draggable, 
  dividers, 
  hasIcon 
}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  minHeight: '64px',
  position: 'relative',
  
  // Dividers
  ...(dividers && {
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
  
  // Draggable styles
  ...(draggable && {
    cursor: 'move',
    userSelect: 'none',
    
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    
    '&:active': {
      backgroundColor: theme.palette.action.selected,
    },
  }),
  
  // Icon spacing
  ...(hasIcon && {
    paddingLeft: theme.spacing(2),
  }),
  
  // Type-specific background (subtle)
  ...(type && variant === 'alert' && {
    backgroundColor: `${(theme.palette as any)[DIALOG_TYPE_COLORS[type]]?.main || theme.palette.primary.main}08`,
  }),
  
  className: DIALOG_CLASS_NAMES.header,
}));

// Dialog Title
/**
 * StyledDialogTitle component
 * 
 * @returns JSX element
 */
export const StyledDialogTitle: React.ComponentType<any> = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.h6.fontSize,
  lineHeight: theme.typography.h6.lineHeight,
  color: theme.palette.text.primary,
  margin: 0,
  flex: 1,
  
  className: DIALOG_CLASS_NAMES.title,
}));

// Dialog Subtitle
/**
 * StyledDialogSubtitle component
 * 
 * @returns JSX element
 */
export const StyledDialogSubtitle: React.ComponentType<any> = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.body2.fontSize,
  lineHeight: theme.typography.body2.lineHeight,
  color: theme.palette.text.secondary,
  margin: `${theme.spacing(0.5)} 0 0 0`,
  
  className: DIALOG_CLASS_NAMES.subtitle,
}));

// Dialog Icon
/**
 * StyledDialogIcon component
 * 
 * @returns JSX element
 */
export const StyledDialogIcon: React.ComponentType<any> = styled(Box)<{ dialogType: string } & BoxProps>(({ theme, dialogType }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  minWidth: '40px',
  height: '40px',
  borderRadius: theme.shape.borderRadius,
  
  '& .MuiSvgIcon-root': {
    fontSize: '28px',
    color: (theme.palette as any)[DIALOG_TYPE_COLORS[dialogType]]?.main || theme.palette.primary.main,
  },
  
  // Type-specific background
  backgroundColor: `${(theme.palette as any)[DIALOG_TYPE_COLORS[dialogType]]?.main || theme.palette.primary.main}12`,
  
  className: DIALOG_CLASS_NAMES.icon,
}));

// Dialog Content/Body
/**
 * StyledDialogContent component
 * 
 * @returns JSX element
 */
export const StyledDialogContent: React.ComponentType<any> = styled(Box)<DialogContentStyleProps & BoxProps>(({ 
  theme, 
  variant, 
  scrollable, 
  maxContentHeight 
}) => ({
  flex: 1,
  padding: theme.spacing(2, 3),
  overflow: scrollable ? 'auto' : 'visible',
  maxHeight: maxContentHeight || (scrollable ? '400px' : 'none'),
  
  // Content spacing
  '& > *:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
  
  // Typography improvements
  '& .MuiTypography-root': {
    lineHeight: 1.6,
  },
  
  // Form styling for form variant
  ...(variant === 'form' && {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    },
    
    '& .MuiFormControl-root': {
      marginBottom: theme.spacing(2),
    },
  }),
  
  // Fullscreen adjustments
  ...(variant === 'fullscreen' && {
    padding: theme.spacing(3),
    maxHeight: 'none',
    overflow: 'auto',
  }),
  
  // Mobile adjustments
  [`@media (${DIALOG_BREAKPOINTS.mobile})`]: {
    padding: theme.spacing(1.5, 2),
  },
  
  className: DIALOG_CLASS_NAMES.body,
}));

// Dialog Footer/Actions
/**
 * StyledDialogFooter component
 * 
 * @returns JSX element
 */
export const StyledDialogFooter: React.ComponentType<any> = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  minHeight: '64px',
  
  // Mobile stacking
  [`@media (${DIALOG_BREAKPOINTS.mobile})`]: {
    flexDirection: 'column-reverse',
    gap: theme.spacing(1),
    
    '& > *': {
      width: '100%',
    },
  },
  
  className: DIALOG_CLASS_NAMES.footer,
}));

// Dialog Action Button (extends Button component)
/**
 * StyledDialogAction component
 * 
 * @returns JSX element
 */
export const StyledDialogAction: React.ComponentType<any> = styled(Button)<{ destructive?: boolean }>(({ 
  theme,
  destructive
}) => ({
  minWidth: '80px',
  
  // Destructive action styles
  ...(destructive && {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
    
    '&:focus': {
      backgroundColor: theme.palette.error.dark,
    },
  }),
  
  className: DIALOG_CLASS_NAMES.action,
}));

// Loading Overlay
/**
 * StyledDialogLoadingOverlay component
 * 
 * @returns JSX element
 */
export const StyledDialogLoadingOverlay: React.ComponentType<any> = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `${theme.palette.background.paper}CC`,
  backdropFilter: 'blur(2px)',
  zIndex: 1,
  
  '& .MuiCircularProgress-root': {
    marginBottom: theme.spacing(2),
  },
  
  className: DIALOG_CLASS_NAMES.loading,
}));

// Dialog Divider
/**
 * StyledDialogDivider component
 * 
 * @returns JSX element
 */
export const StyledDialogDivider: React.ComponentType<any> = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  
  className: DIALOG_CLASS_NAMES.divider,
}));

// Close Button (inherits from Modal)
/**
 * StyledDialogCloseButton component
 * 
 * @returns JSX element
 */
export const StyledDialogCloseButton: React.ComponentType<any> = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  minWidth: '40px',
  width: '40px',
  height: '40px',
  padding: 0,
  borderRadius: '50%',
  
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
  },
}));

// Animation keyframes for loading
/**
 * loadingSpinKeyframes component
 * 
 * @returns JSX element
 */
export const loadingSpinKeyframes = `
  @keyframes dialogLoadingSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes dialogPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;