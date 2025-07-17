import { 
  Checkbox as MuiCheckbox, 
  FormControlLabel, 
  FormHelperText, 
  FormGroup,
  CircularProgress,
  Typography 
} from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  CHECKBOX_SIZE_CONFIGS,
  VALIDATION_STATE_COLORS,
  CHECKBOX_ANIMATION_DURATIONS,
  CHECKBOX_ANIMATION_EASINGS,
} from './Checkbox.constants';
export const StyledCheckbox = styled(MuiCheckbox, {
  shouldForwardProp: (prop) => !['customSize', 'customColor', 'variant', 'validationState', 'loading'].includes(prop as string),
})<{
  customSize?: keyof typeof CHECKBOX_SIZE_CONFIGS,
  customColor?: string,
  variant?: string,
  validationState?: keyof typeof VALIDATION_STATE_COLORS,
  loading?: boolean,
}>(({ theme, customSize = 'medium', customColor = 'primary', variant = 'standard', validationState = 'none', loading }) => {
  const sizeConfig = CHECKBOX_SIZE_CONFIGS[customSize];
  const validationColors = VALIDATION_STATE_COLORS[validationState];
  
  return {
    'padding': sizeConfig.padding,
    
    '& .MuiSvgIcon-root': {
      'fontSize': sizeConfig.iconSize,
      'transition': `all ${CHECKBOX_ANIMATION_DURATIONS.standard} ${CHECKBOX_ANIMATION_EASINGS.easeInOut}`,
    },
    
    // Standard variant (default MUI styling)
    '&:hover': {
      'backgroundColor': theme.palette.action.hover,
    },
    
    // Outlined variant
    ...(variant === 'outlined' && {
      'border': `2px solid ${theme.palette.divider}`,
      'borderRadius': theme.shape.borderRadius,
      'backgroundColor': 'transparent',
      
      '&:hover': {
        'backgroundColor': theme.palette.action.hover,
        'borderColor': theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main,
      },
      
      '&.Mui-checked': {
        'borderColor': theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main,
        'backgroundColor': `${theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main}08`,
      },
    }),
    
    // Filled variant
    ...(variant === 'filled' && {
      'backgroundColor': theme.palette.action.selected,
      'borderRadius': theme.shape.borderRadius,
      
      '&:hover': {
        'backgroundColor': theme.palette.action.hover,
      },
      
      '&.Mui-checked': {
        'backgroundColor': `${theme.palette[customColor as keyof typeof theme.palette]?.main || theme.palette.primary.main}12`,
      },
    }),
    
    // Validation state styling
    ...(validationState !== 'none' && {
      'color': validationColors.color,
      
      '&.Mui-checked': {
        'color': validationColors.color,
      },
    }),
    
    // Loading state
    ...(loading && {
      'pointerEvents': 'none',
      'opacity': 0.7,
    }),
    
    // Disabled state enhancements
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
  customSize?: keyof typeof CHECKBOX_SIZE_CONFIGS,
  validationState?: keyof typeof VALIDATION_STATE_COLORS,
  labelPlacement?: string,
}>(({ theme, customSize = 'medium', validationState = 'none', labelPlacement = 'end' }) => {
  const sizeConfig = CHECKBOX_SIZE_CONFIGS[customSize];
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
  customSize?: keyof typeof CHECKBOX_SIZE_CONFIGS,
  validationState?: keyof typeof VALIDATION_STATE_COLORS,
}>(({ theme, customSize = 'medium', validationState = 'none' }) => {
  const sizeConfig = CHECKBOX_SIZE_CONFIGS[customSize];
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
  direction?: 'row' | 'column',
  spacing?: number,
}>(({ theme, direction = 'column', spacing = 1 }) => ({
  'flexDirection': direction,
  gap: theme.spacing(spacing),
  
  '& .MuiFormControlLabel-root': {
    'marginRight': direction === 'row' ? theme.spacing(2) : 0,
    'marginBottom': direction === 'column' ? theme.spacing(0.5) : 0,
  },
}));

export const CheckboxContainer = styled('div', {
  shouldForwardProp: (prop) => !['loading'].includes(prop as string),
})<{
  loading?: boolean,
}>(({ loading }) => ({
  'position': 'relative',
  'display': 'inline-flex',
  'alignItems': 'center',
  
  ...(loading && {
    '& .MuiCheckbox-root': {
      'visibility': 'hidden',
    },
  }),
}));

export const LoadingSpinner = styled(CircularProgress, {
  shouldForwardProp: (prop) => !['customSize'].includes(prop as string),
})<{
  customSize?: keyof typeof CHECKBOX_SIZE_CONFIGS,
}>(({ customSize = 'medium' }) => {
  const sizeConfig = CHECKBOX_SIZE_CONFIGS[customSize];
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

export const GroupLabel = styled(Typography, {
  shouldForwardProp: (prop) => !['required'].includes(prop as string),
})<{
  required?: boolean,
}>(({ theme, required }) => ({
  'fontWeight': theme.typography.fontWeightMedium,
  'marginBottom': theme.spacing(1),
  'color': theme.palette.text.primary,
  
  ...(required && {
    '&::after': {
      'content': '" *"',
      'color': theme.palette.error.main,
    },
  }),
}));

export const RequiredIndicator = styled('span')(({ theme }) => ({
  'color': theme.palette.error.main,
  'marginLeft': theme.spacing(0.25),
  'fontSize': '1.2em',
  'lineHeight': 1,
  'verticalAlign': 'top',
}));