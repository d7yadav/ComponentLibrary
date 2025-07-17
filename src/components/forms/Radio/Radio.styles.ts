import { 
  Radio as MuiRadio, 
  RadioGroup as MuiRadioGroup,
  FormControlLabel, 
  FormHelperText, 
  FormControl,
  FormLabel,
  CircularProgress,
  Typography 
} from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  RADIO_SIZE_CONFIGS,
  VALIDATION_STATE_COLORS,
  RADIO_ANIMATION_DURATIONS,
  RADIO_ANIMATION_EASINGS,
} from './Radio.constants';

export const StyledRadio = styled(MuiRadio, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'variant', 'validationState', 'loading'].includes(prop as string),
})<{
  customSize?: keyof typeof RADIO_SIZE_CONFIGS;
  customColor?: string;
  variant?: string;
  validationState?: keyof typeof VALIDATION_STATE_COLORS;
  loading?: boolean;
}>(({ theme, customSize = 'medium', customColor = 'primary', variant = 'standard', validationState = 'none', loading }) => {
  const sizeConfig = RADIO_SIZE_CONFIGS[customSize];
  const validationColors = VALIDATION_STATE_COLORS[validationState];
  
  return {
    'padding': sizeConfig.padding,
    
    '& .MuiSvgIcon-root': {
      'fontSize': sizeConfig.iconSize,
      'transition': `all ${RADIO_ANIMATION_DURATIONS.standard} ${RADIO_ANIMATION_EASINGS.easeInOut}`,
    },
    
    // Standard variant (default MUI styling)
    ...(variant === 'standard' && {
      'color': theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main,
      
      '&.Mui-checked': {
        'color': theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main,
      },
    }),
    
    // Outlined variant
    ...(variant === 'outlined' && {
      'border': `2px solid ${theme.palette.divider}`,
      'borderRadius': '50%',
      'backgroundColor': 'transparent',
      
      '&:hover': {
        'borderColor': theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main,
      },
      
      '&.Mui-checked': {
        'borderColor': theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main,
        'backgroundColor': `${theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main}20`,
      },
    }),
    
    // Filled variant
    ...(variant === 'filled' && {
      'backgroundColor': theme.palette.action.hover,
      'borderRadius': '50%',
      
      '&:hover': {
        'backgroundColor': theme.palette.action.selected,
      },
      
      '&.Mui-checked': {
        'backgroundColor': theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main,
        'color': theme.palette[customColor as keyof typeof theme.palette]?.contrastText || theme.palette.primary.contrastText,
      },
    }),
    
    // Validation states
    ...(validationState !== 'none' && {
      'color': theme.palette[validationColors.color.split('.')[0] as keyof typeof theme.palette]?.main || validationColors.color,
      
      '&.Mui-checked': {
        'color': theme.palette[validationColors.color.split('.')[0] as keyof typeof theme.palette]?.main || validationColors.color,
      },
    }),
    
    // Loading state
    ...(loading && {
      'opacity': 0.6,
      'pointerEvents': 'none',
    }),
    
    // Disabled state
    '&.Mui-disabled': {
      'opacity': 0.6,
      'pointerEvents': 'none',
    },
    
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
  customSize?: keyof typeof RADIO_SIZE_CONFIGS;
  validationState?: keyof typeof VALIDATION_STATE_COLORS;
  labelPlacement?: string;
}>(({ theme, customSize = 'medium', validationState = 'none', labelPlacement = 'end' }) => {
  const sizeConfig = RADIO_SIZE_CONFIGS[customSize];
  const validationColors = VALIDATION_STATE_COLORS[validationState];
  
  return {
    'margin': 0,
    'alignItems': 'flex-start',
    
    '& .MuiFormControlLabel-label': {
      'fontSize': sizeConfig.fontSize,
      'lineHeight': 1.5,
      'color': validationState !== 'none' ? validationColors.color : 'inherit',
      'marginLeft': labelPlacement === 'end' ? sizeConfig.labelGap : 0,
      'marginRight': labelPlacement === 'start' ? sizeConfig.labelGap : 0,
      'marginTop': labelPlacement === 'bottom' ? sizeConfig.labelGap : 0,
      'marginBottom': labelPlacement === 'top' ? sizeConfig.labelGap : 0,
    },
    
    '&.Mui-disabled .MuiFormControlLabel-label': {
      'color': theme.palette.text.disabled,
    },
    
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
  customSize?: keyof typeof RADIO_SIZE_CONFIGS;
  validationState?: keyof typeof VALIDATION_STATE_COLORS;
}>(({ theme, customSize = 'medium', validationState = 'none' }) => {
  const sizeConfig = RADIO_SIZE_CONFIGS[customSize];
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

export const StyledRadioGroup = styled(MuiRadioGroup, {
  shouldForwardProp: (prop) => !['spacing'].includes(prop as string),
})<{
  spacing?: number;
}>(({ theme, spacing = 1 }) => ({
  gap: theme.spacing(spacing),
  
  '& .MuiFormControlLabel-root': {
    'marginRight': 0,
    'marginBottom': theme.spacing(0.5),
  },
}));

export const RadioContainer = styled('div', {
  shouldForwardProp: (prop) => !['loading'].includes(prop as string),
})<{
  loading?: boolean;
}>(({ loading }) => ({
  'position': 'relative',
  'display': 'inline-flex',
  'alignItems': 'center',
  
  ...(loading && {
    '& .MuiRadio-root': {
      'visibility': 'hidden',
    },
  }),
}));

export const LoadingSpinner = styled(CircularProgress, {
  shouldForwardProp: (prop) => !['customSize'].includes(prop as string),
})<{
  customSize?: keyof typeof RADIO_SIZE_CONFIGS;
}>(({ customSize = 'medium' }) => {
  const sizeConfig = RADIO_SIZE_CONFIGS[customSize];
  const spinnerSize = parseInt(sizeConfig.iconSize) * 0.8;
  
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
  customSize?: keyof typeof RADIO_SIZE_CONFIGS;
}>(({ theme, required, customSize = 'medium' }) => {
  const sizeConfig = RADIO_SIZE_CONFIGS[customSize];
  
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