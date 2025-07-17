import { 
  Switch as MuiSwitch, 
  FormControlLabel, 
  FormHelperText, 
  FormGroup,
  FormControl,
  FormLabel,
  CircularProgress,
  Typography,
  Box 
} from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  SWITCH_SIZE_CONFIGS,
  VALIDATION_STATE_COLORS,
  SWITCH_ANIMATION_DURATIONS,
  SWITCH_ANIMATION_EASINGS,
} from './Switch.constants';

export const StyledSwitch = styled(MuiSwitch, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'variant', 'validationState', 'loading', 'showText', 'onText', 'offText'].includes(prop as string),
})<{
  customSize?: keyof typeof SWITCH_SIZE_CONFIGS;
  customColor?: string;
  variant?: string;
  validationState?: keyof typeof VALIDATION_STATE_COLORS;
  loading?: boolean;
  showText?: boolean;
  onText?: string;
  offText?: string;
}>(({ theme, customSize = 'medium', customColor = 'primary', variant = 'standard', validationState = 'none', loading, showText, onText, offText }) => {
  const sizeConfig = SWITCH_SIZE_CONFIGS[customSize];
  const validationColors = VALIDATION_STATE_COLORS[validationState];
  
  return {
    'width': sizeConfig.width,
    'height': sizeConfig.height,
    'padding': 0,
    'display': 'flex',
    
    '& .MuiSwitch-switchBase': {
      'padding': sizeConfig.thumbOffset,
      'transform': `translateX(${sizeConfig.thumbOffset})`,
      'transition': `transform ${SWITCH_ANIMATION_DURATIONS.standard} ${SWITCH_ANIMATION_EASINGS.easeInOut}`,
      
      '&.Mui-checked': {
        'transform': `translateX(calc(${sizeConfig.width} - ${sizeConfig.thumbSize} - ${sizeConfig.thumbOffset}))`,
        'color': theme.palette.common.white,
        
        '& + .MuiSwitch-track': {
          'backgroundColor': validationState !== 'none' 
            ? validationColors.color 
            : theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main,
          'opacity': 1,
          'border': 0,
        },
        
        '&.Mui-disabled + .MuiSwitch-track': {
          'opacity': 0.5,
        },
      },
      
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        'color': theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main,
        'border': `6px solid ${theme.palette.common.white}`,
      },
      
      '&.Mui-disabled .MuiSwitch-thumb': {
        'color': theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
      },
      
      '&.Mui-disabled + .MuiSwitch-track': {
        'opacity': theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    
    '& .MuiSwitch-thumb': {
      'width': sizeConfig.thumbSize,
      'height': sizeConfig.thumbSize,
      'transition': `all ${SWITCH_ANIMATION_DURATIONS.standard} ${SWITCH_ANIMATION_EASINGS.easeInOut}`,
      
      // Standard variant (default MUI styling)
      ...(variant === 'standard' && {
        'boxShadow': theme.shadows[1],
      }),
      
      // Outlined variant
      ...(variant === 'outlined' && {
        'border': `2px solid ${theme.palette.divider}`,
        'boxShadow': 'none',
        'backgroundColor': theme.palette.background.paper,
      }),
      
      // Filled variant
      ...(variant === 'filled' && {
        'backgroundColor': theme.palette.action.selected,
        'boxShadow': 'inset 0 1px 3px rgba(0,0,0,0.2)',
      }),
    },
    
    '& .MuiSwitch-track': {
      'borderRadius': parseInt(sizeConfig.height) / 2,
      'border': `1px solid ${theme.palette.grey[400]}`,
      'backgroundColor': theme.palette.mode === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[800],
      'opacity': 1,
      'transition': `all ${SWITCH_ANIMATION_DURATIONS.standard} ${SWITCH_ANIMATION_EASINGS.easeInOut}`,
      'position': 'relative',
      
      // Variant-specific track styling
      ...(variant === 'outlined' && {
        'border': `2px solid ${theme.palette.divider}`,
        'backgroundColor': 'transparent',
      }),
      
      ...(variant === 'filled' && {
        'backgroundColor': theme.palette.action.selected,
        'border': 'none',
      }),
      
      // Text inside track
      ...(showText && {
        '&::before': {
          'content': onText ? `"${onText}"` : '""',
          'position': 'absolute',
          'left': '6px',
          'top': '50%',
          'transform': 'translateY(-50%)',
          'fontSize': sizeConfig.textSize,
          'fontWeight': theme.typography.fontWeightMedium,
          'color': theme.palette.text.secondary,
          'opacity': 0,
          'transition': `opacity ${SWITCH_ANIMATION_DURATIONS.short} ${SWITCH_ANIMATION_EASINGS.easeInOut}`,
        },
        
        '&::after': {
          'content': offText ? `"${offText}"` : '""',
          'position': 'absolute',
          'right': '6px',
          'top': '50%',
          'transform': 'translateY(-50%)',
          'fontSize': sizeConfig.textSize,
          'fontWeight': theme.typography.fontWeightMedium,
          'color': theme.palette.text.secondary,
          'opacity': 1,
          'transition': `opacity ${SWITCH_ANIMATION_DURATIONS.short} ${SWITCH_ANIMATION_EASINGS.easeInOut}`,
        },
      }),
    },
    
    // Show "on" text when checked
    ...(showText && {
      '&.Mui-checked .MuiSwitch-track': {
        '&::before': {
          'opacity': 1,
        },
        '&::after': {
          'opacity': 0,
        },
      },
    }),
    
    // Loading state
    ...(loading && {
      'pointerEvents': 'none',
      'opacity': 0.7,
    }),
    
    // Focus state
    '&.Mui-focusVisible': {
      'outline': `2px solid ${theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main}`,
      'outlineOffset': '2px',
    },
  };
});

export const StyledFormControlLabel = styled(FormControlLabel, {
  shouldForwardProp: (prop) => !['customSize', 'validationState', 'labelPlacement'].includes(prop as string),
})<{
  customSize?: keyof typeof SWITCH_SIZE_CONFIGS;
  validationState?: keyof typeof VALIDATION_STATE_COLORS;
  labelPlacement?: string;
}>(({ theme, customSize = 'medium', validationState = 'none', labelPlacement = 'end' }) => {
  const sizeConfig = SWITCH_SIZE_CONFIGS[customSize];
  const validationColors = VALIDATION_STATE_COLORS[validationState];
  
  return {
    'margin': 0,
    'alignItems': 'center',
    
    '& .MuiFormControlLabel-label': {
      'fontSize': sizeConfig.fontSize,
      'lineHeight': 1.5,
      'color': validationState !== 'none' ? validationColors.color : 'inherit',
      'marginLeft': labelPlacement === 'end' ? sizeConfig.labelGap : 0,
      'marginRight': labelPlacement === 'start' ? sizeConfig.labelGap : 0,
      'marginTop': labelPlacement === 'bottom' ? sizeConfig.labelGap : 0,
      'marginBottom': labelPlacement === 'top' ? sizeConfig.labelGap : 0,
      
      '&.Mui-disabled': {
        'color': theme.palette.text.disabled,
      },
    },
    
    // Flex direction based on label placement
    ...(labelPlacement === 'top' && {
      'flexDirection': 'column',
      'alignItems': 'center',
    }),
    
    ...(labelPlacement === 'bottom' && {
      'flexDirection': 'column-reverse',
      'alignItems': 'center',
    }),
    
    ...(labelPlacement === 'start' && {
      'flexDirection': 'row-reverse',
    }),
  };
});

export const StyledFormHelperText = styled(FormHelperText, {
  shouldForwardProp: (prop) => !['customSize', 'validationState'].includes(prop as string),
})<{
  customSize?: keyof typeof SWITCH_SIZE_CONFIGS;
  validationState?: keyof typeof VALIDATION_STATE_COLORS;
}>(({ theme, customSize = 'medium', validationState = 'none' }) => {
  const sizeConfig = SWITCH_SIZE_CONFIGS[customSize];
  const validationColors = VALIDATION_STATE_COLORS[validationState];
  
  return {
    'fontSize': sizeConfig.helperTextSize,
    'marginTop': theme.spacing(0.5),
    'marginLeft': 0,
    'color': validationState !== 'none' ? validationColors.helperTextColor : theme.palette.text.secondary,
    
    '&.Mui-error': {
      'color': theme.palette.error.main,
    },
  };
});

export const StyledFormGroup = styled(FormGroup, {
  shouldForwardProp: (prop) => !['direction', 'spacing'].includes(prop as string),
})<{
  direction?: 'row' | 'column';
  spacing?: number;
}>(({ theme, direction = 'column', spacing = 1 }) => ({
  'flexDirection': direction,
  gap: theme.spacing(spacing),
  
  '& .MuiFormControlLabel-root': {
    'marginRight': direction === 'row' ? theme.spacing(2) : 0,
    'marginBottom': direction === 'column' ? theme.spacing(0.5) : 0,
  },
}));

export const SwitchContainer = styled('div', {
  shouldForwardProp: (prop) => !['loading'].includes(prop as string),
})<{
  loading?: boolean;
}>(({ loading }) => ({
  'position': 'relative',
  'display': 'inline-flex',
  'alignItems': 'center',
  
  ...(loading && {
    '& .MuiSwitch-root': {
      'visibility': 'hidden',
    },
  }),
}));

export const LoadingSpinner = styled(CircularProgress, {
  shouldForwardProp: (prop) => !['customSize'].includes(prop as string),
})<{
  customSize?: keyof typeof SWITCH_SIZE_CONFIGS;
}>(({ customSize = 'medium' }) => {
  const sizeConfig = SWITCH_SIZE_CONFIGS[customSize];
  const spinnerSize = parseInt(sizeConfig.height) * 0.8;
  
  return {
    'position': 'absolute',
    'left': '50%',
    'top': '50%',
    'transform': 'translate(-50%, -50%)',
    'width': `${spinnerSize}px !important`,
    'height': `${spinnerSize}px !important`,
  };
});

export const StyledFormControl = styled(FormControl, {
  shouldForwardProp: (prop) => !['fullWidth'].includes(prop as string),
})<{
  fullWidth?: boolean;
}>(({ fullWidth }) => ({
  ...(fullWidth && {
    'width': '100%',
  }),
}));

export const StyledFormLabel = styled(FormLabel, {
  shouldForwardProp: (prop) => !['required', 'customSize'].includes(prop as string),
})<{
  required?: boolean;
  customSize?: keyof typeof SWITCH_SIZE_CONFIGS;
}>(({ theme, required, customSize = 'medium' }) => {
  const sizeConfig = SWITCH_SIZE_CONFIGS[customSize];
  
  return {
    'fontWeight': theme.typography.fontWeightMedium,
    'marginBottom': theme.spacing(1),
    'color': theme.palette.text.primary,
    'fontSize': sizeConfig.fontSize,
    
    '&.Mui-focused': {
      'color': theme.palette.primary.main,
    },
    
    '&.Mui-error': {
      'color': theme.palette.error.main,
    },
    
    ...(required && {
      '&::after': {
        'content': '" *"',
        'color': theme.palette.error.main,
      },
    }),
  };
});

export const RequiredIndicator = styled('span')(({ theme }) => ({
  'color': theme.palette.error.main,
  'marginLeft': theme.spacing(0.25),
  'fontSize': '1.2em',
  'lineHeight': 1,
  'verticalAlign': 'top',
}));

export const TextContainer = styled(Box, {
  shouldForwardProp: (prop) => !['customSize', 'position'].includes(prop as string),
})<{
  customSize?: keyof typeof SWITCH_SIZE_CONFIGS;
  position?: 'start' | 'end';
}>(({ theme, customSize = 'medium', position = 'end' }) => {
  const sizeConfig = SWITCH_SIZE_CONFIGS[customSize];
  
  return {
    'fontSize': sizeConfig.textSize,
    'fontWeight': theme.typography.fontWeightMedium,
    'color': theme.palette.text.secondary,
    'marginLeft': position === 'end' ? theme.spacing(1) : 0,
    'marginRight': position === 'start' ? theme.spacing(1) : 0,
    'minWidth': '30px',
    'textAlign': 'center',
    'transition': `color ${SWITCH_ANIMATION_DURATIONS.short} ${SWITCH_ANIMATION_EASINGS.easeInOut}`,
  };
});