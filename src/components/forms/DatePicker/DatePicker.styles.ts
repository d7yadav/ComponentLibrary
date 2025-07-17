
import { TextField, IconButton, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import type {
  DatePickerStyleProps,
  DatePickerInputStyleProps,
  DatePickerIconStyleProps,
  DatePickerButtonStyleProps
} from './DatePicker.types';
import { SIZE_CONSTANTS, SPACING_CONSTANTS } from './DatePicker.constants';
// Main container
export const DatePickerContainer = styled('div')<DatePickerStyleProps>(({ 
  theme, 
  fullWidth, 
  disabled 
}) => ({
  'position': 'relative',
  'display': 'inline-flex',
  'flexDirection': 'column',
  'width': fullWidth ? '100%' : 'auto',
  'minWidth': fullWidth ? 'auto' : 200,
  'opacity': disabled ? 0.6 : 1,
  'pointerEvents': disabled ? 'none' : 'auto',
}));

// Input field wrapper
export const StyledTextField = styled(TextField)<DatePickerInputStyleProps>(({ 
  theme, 
  variant, 
  size, 
  error, 
  success,
  warning,
  hasStartAdornment,
  hasEndAdornment 
}) => ({
  '& .MuiInputBase-root': {
    'paddingLeft': hasStartAdornment ? theme.spacing(1) : undefined,
    'paddingRight': hasEndAdornment ? theme.spacing(1) : undefined,
    'minHeight': SIZE_CONSTANTS.INPUT_HEIGHT[size],
  },
  
  '& .MuiInputBase-input': {
    'padding': `${SPACING_CONSTANTS.INPUT_PADDING_Y}px ${SPACING_CONSTANTS.INPUT_PADDING_X}px`,
    'fontSize': size === 'small' ? '0.875rem' : size === 'large' ? '1.125rem' : '1rem',
    
    // Hide native date picker icons in WebKit browsers
    '&::-webkit-calendar-picker-indicator': {
      'display': 'none',
      '-webkit-appearance': 'none',
    },
    
    // Hide native date picker icons in Firefox
    '&::-moz-calendar-picker-indicator': {
      'display': 'none',
    },
    
    // Custom date input styling
    '&[type="date"], &[type="datetime-local"], &[type="time"], &[type="month"], &[type="week"]': {
      'position': 'relative',
      
      // Ensure consistent text color
      'color': theme.palette.text.primary,
      
      // Handle placeholder-like behavior
      '&:invalid': {
        'color': theme.palette.text.disabled,
      },
    },
  },
  
  // Success state styling
  ...(success && {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        'borderColor': theme.palette.success.main,
      },
      '&:hover fieldset': {
        'borderColor': theme.palette.success.dark,
      },
      '&.Mui-focused fieldset': {
        'borderColor': theme.palette.success.main,
        'borderWidth': 2,
      },
    },
    '& .MuiFilledInput-root': {
      'backgroundColor': alpha(theme.palette.success.main, 0.04),
      '&:hover': {
        'backgroundColor': alpha(theme.palette.success.main, 0.08),
      },
      '&.Mui-focused': {
        'backgroundColor': alpha(theme.palette.success.main, 0.04),
      },
    },
    '& .MuiInput-root': {
      '&:after': {
        'borderBottomColor': theme.palette.success.main,
      },
    },
  }),
  
  // Warning state styling
  ...(warning && {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        'borderColor': theme.palette.warning.main,
      },
      '&:hover fieldset': {
        'borderColor': theme.palette.warning.dark,
      },
      '&.Mui-focused fieldset': {
        'borderColor': theme.palette.warning.main,
        'borderWidth': 2,
      },
    },
    '& .MuiFilledInput-root': {
      'backgroundColor': alpha(theme.palette.warning.main, 0.04),
      '&:hover': {
        'backgroundColor': alpha(theme.palette.warning.main, 0.08),
      },
      '&.Mui-focused': {
        'backgroundColor': alpha(theme.palette.warning.main, 0.04),
      },
    },
    '& .MuiInput-root': {
      '&:after': {
        'borderBottomColor': theme.palette.warning.main,
      },
    },
  }),
}));

// Date picker icon
export const DatePickerIcon = styled('div')<DatePickerIconStyleProps>(({ 
  theme, 
  size, 
  disabled,
  clickable
}) => ({
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'width': SIZE_CONSTANTS.ICON_SIZE[size],
  'height': SIZE_CONSTANTS.ICON_SIZE[size],
  'color': disabled 
    ? theme.palette.text.disabled 
    : theme.palette.text.secondary,
  'cursor': clickable && !disabled ? 'pointer' : 'default',
  
  '& .MuiSvgIcon-root': {
    'fontSize': SIZE_CONSTANTS.ICON_SIZE[size],
  },
  
  ...(clickable && {
    'borderRadius': theme.shape.borderRadius,
    'transition': theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
    
    '&:hover': {
      'backgroundColor': alpha(theme.palette.action.hover, 0.08),
      'color': theme.palette.text.primary,
    },
  }),
}));

// Action buttons (Today, Clear)
export const DatePickerButton = styled(IconButton)<DatePickerButtonStyleProps>(({ 
  theme, 
  size, 
  variant = 'clear',
  disabled 
}) => ({
  'width': SIZE_CONSTANTS.BUTTON_SIZE[size],
  'height': SIZE_CONSTANTS.BUTTON_SIZE[size],
  'padding': theme.spacing(0.5),
  'margin': `0 ${SPACING_CONSTANTS.BUTTON_MARGIN}px`,
  
  'color': disabled 
    ? theme.palette.text.disabled 
    : variant === 'today'
      ? theme.palette.primary.main
      : theme.palette.text.secondary,
      
  '&:hover': {
    ...(disabled ? {} : {
      'backgroundColor': alpha(
        variant === 'today' 
          ? theme.palette.primary.main 
          : theme.palette.action.hover, 
        0.08
      ),
      'color': variant === 'today' 
        ? theme.palette.primary.dark 
        : theme.palette.text.primary,
    }),
  },
  
  '&:disabled': {
    'color': theme.palette.text.disabled,
  },
  
  '& .MuiSvgIcon-root': {
    'fontSize': size === 'small' ? '1rem' : size === 'large' ? '1.25rem' : '1.125rem',
  }
}));

// Today button (text button variant)
export const TodayButton = styled(Button)<DatePickerButtonStyleProps>(({ 
  theme, 
  size, 
  disabled 
}) => ({
  'minWidth': 'auto',
  'padding': `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  'fontSize': size === 'small' ? '0.75rem' : size === 'large' ? '0.875rem' : '0.8125rem',
  'fontWeight': theme.typography.fontWeightMedium,
  'textTransform': 'none',
  
  'color': disabled 
    ? theme.palette.text.disabled 
    : theme.palette.primary.main,
    
  '&:hover': {
    ...(disabled ? {} : {
      'backgroundColor': alpha(theme.palette.primary.main, 0.08),
    }),
  },
  
  '&:disabled': {
    'color': theme.palette.text.disabled,
  }
}));

// Buttons container
export const ButtonsContainer = styled('div')<{ size: 'small' | 'medium' | 'large' }>(({ theme, size }) => ({
  'display': 'flex',
  'alignItems': 'center',
  gap: theme.spacing(0.5),
  'padding': theme.spacing(0.5),
  'borderTop': `1px solid ${alpha(theme.palette.divider, 0.12)}`,
  'backgroundColor': alpha(theme.palette.background.default, 0.5),
  
  ...(size === 'small' && {
    'padding': theme.spacing(0.25),
  }),
  
  ...(size === 'large' && {
    'padding': theme.spacing(0.75),
  })
}));

// Input wrapper for custom styling
export const InputWrapper = styled('div')<DatePickerStyleProps>(({ 
  theme, 
  variant,
  size,
  focused,
  error,
  success,
  warning,
  disabled
}) => ({
  'position': 'relative',
  
  // Custom focus ring for better accessibility
  ...(focused && {
    '&::after': {
      'content': '""',
      'position': 'absolute',
      'top': -2,
      'left': -2,
      'right': -2,
      'bottom': -2,
      'borderRadius': variant === 'outlined' ? `${theme.shape.borderRadius}px` : 0,
      'border': `2px solid ${
        error 
          ? theme.palette.error.main
          : success
            ? theme.palette.success.main
            : warning
              ? theme.palette.warning.main
              : theme.palette.primary.main
      }`,
      'opacity': 0.2,
      'pointerEvents': 'none',
    },
  })
}));

// Helper text styling
export const HelperTextStyled = styled('div')<{
  theme?: any,
  error?: boolean,
  success?: boolean,
  warning?: boolean,
  size: 'small' | 'medium' | 'large',
}>(({ theme, error, success, warning, size }) => ({
  'fontSize': size === 'small' ? '0.75rem' : '0.875rem',
  'lineHeight': 1.4,
  'margin': `${theme.spacing(0.5)} ${theme.spacing(1.5)} 0`,
  
  'color': error 
    ? theme.palette.error.main
    : success
      ? theme.palette.success.main
      : warning
        ? theme.palette.warning.main
        : theme.palette.text.secondary,
        
  'transition': theme.transitions.create('color', {
    duration: theme.transitions.duration.short,
  })
}));

// Label with required indicator
export const LabelWithRequired = styled('label')<{
  theme?: any,
  required?: boolean,
  disabled?: boolean,
  error?: boolean,
  success?: boolean,
  warning?: boolean,
  size: 'small' | 'medium' | 'large',
}>(({ theme, required, disabled, error, success, warning, size }) => ({
  'display': 'block',
  'fontSize': size === 'small' ? '0.875rem' : size === 'large' ? '1rem' : '0.9375rem',
  'fontWeight': theme.typography.fontWeightMedium,
  'marginBottom': theme.spacing(0.5),
  
  'color': disabled
    ? theme.palette.text.disabled
    : error
      ? theme.palette.error.main
      : success
        ? theme.palette.success.main
        : warning
          ? theme.palette.warning.main
          : theme.palette.text.primary,
          
  'transition': theme.transitions.create('color', {
    duration: theme.transitions.duration.short,
  }),
  
  // Required indicator
  ...(required && {
    '&::after': {
      'content': '" *"',
      'color': theme.palette.error.main,
    },
  })
}));