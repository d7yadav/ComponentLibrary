
import { TextField, Paper, Chip, CircularProgress, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import type { 
  AutocompleteStyleProps,
  AutocompleteInputStyleProps,
  AutocompleteListboxStyleProps,
  AutocompleteOptionStyleProps,
  AutocompleteTagStyleProps
} from './Autocomplete.types';
import { SIZE_CONSTANTS, SPACING_CONSTANTS, Z_INDEX_CONSTANTS } from './Autocomplete.constants';
// Main container
export const AutocompleteContainer = styled('div')<AutocompleteStyleProps>(({ 
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
export const StyledTextField = styled(TextField)<AutocompleteInputStyleProps>(({ 
  theme, 
  variant, 
  size, 
  error, 
  success,
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
}));

// Dropdown container
export const AutocompleteDropdown = styled(Paper)<AutocompleteListboxStyleProps>(({ 
  theme, 
  size,
  maxHeight = SIZE_CONSTANTS.DROPDOWN_MAX_HEIGHT 
}) => ({
  'position': 'absolute',
  'top': '100%',
  'left': 0,
  'right': 0,
  'zIndex': Z_INDEX_CONSTANTS.DROPDOWN,
  maxHeight,
  'overflow': 'auto',
  'marginTop': theme.spacing(0.5),
  'padding': SPACING_CONSTANTS.DROPDOWN_PADDING,
  'boxShadow': theme.shadows[8],
  'border': `1px solid ${alpha(theme.palette.divider, 0.12)}`,
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': theme.palette.background.paper,
  
  // Scrollbar styling
  '&::-webkit-scrollbar': {
    'width': 6,
  },
  '&::-webkit-scrollbar-track': {
    'backgroundColor': alpha(theme.palette.divider, 0.04),
  },
  '&::-webkit-scrollbar-thumb': {
    'backgroundColor': alpha(theme.palette.divider, 0.2),
    'borderRadius': 3,
    '&:hover': {
      'backgroundColor': alpha(theme.palette.divider, 0.3),
    },
  },
}));

// Option item
export const AutocompleteOption = styled('li')<AutocompleteOptionStyleProps>(({ 
  theme, 
  size, 
  selected, 
  disabled, 
  highlighted 
}) => ({
  'display': 'flex',
  'alignItems': 'center',
  gap: theme.spacing(1),
  'padding': `${SPACING_CONSTANTS.OPTION_PADDING_Y}px ${SPACING_CONSTANTS.OPTION_PADDING_X}px`,
  'minHeight': SIZE_CONSTANTS.OPTION_HEIGHT[size],
  'fontSize': size === 'small' ? '0.875rem' : size === 'large' ? '1.125rem' : '1rem',
  'cursor': disabled ? 'not-allowed' : 'pointer',
  'borderRadius': theme.shape.borderRadius,
  'transition': theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.short,
  }),
  
  // States
  'backgroundColor': selected 
    ? alpha(theme.palette.primary.main, 0.12)
    : highlighted 
      ? alpha(theme.palette.action.hover, 0.04)
      : 'transparent',
      
  'color': disabled 
    ? theme.palette.text.disabled
    : selected
      ? theme.palette.primary.main
      : theme.palette.text.primary,
      
  'opacity': disabled ? 0.5 : 1,
  
  // Hover effects
  '&:hover': {
    ...(disabled ? {} : {
      'backgroundColor': selected 
        ? alpha(theme.palette.primary.main, 0.16)
        : alpha(theme.palette.action.hover, 0.08),
    }),
  },
  
  // Focus effects
  '&:focus': {
    'outline': 'none',
    'backgroundColor': alpha(theme.palette.primary.main, 0.12),
  },
}));

// Tag/Chip component for multiple selection
export const AutocompleteTag = styled(Chip)<AutocompleteTagStyleProps>(({ 
  theme, 
  size, 
  disabled 
}) => ({
  'height': SIZE_CONSTANTS.TAG_HEIGHT[size],
  'fontSize': size === 'small' ? '0.75rem' : size === 'large' ? '0.875rem' : '0.8125rem',
  'margin': SPACING_CONSTANTS.TAG_SPACING / 2,
  'opacity': disabled ? 0.6 : 1,
  
  '& .MuiChip-deleteIcon': {
    'fontSize': size === 'small' ? '0.875rem' : size === 'large' ? '1.125rem' : '1rem',
    'marginRight': theme.spacing(0.5),
  },
}));

// Tags container for multiple selection
export const TagsContainer = styled('div')<{ size: 'small' | 'medium' | 'large' }>(({ theme, size }) => ({
  'display': 'flex',
  'flexWrap': 'wrap',
  gap: SPACING_CONSTANTS.TAG_SPACING,
  'padding': theme.spacing(0.5),
  'minHeight': SIZE_CONSTANTS.INPUT_HEIGHT[size] - 16,
  'alignItems': 'center',
}));

// Loading indicator
export const LoadingIndicator = styled(CircularProgress)(({ theme }) => ({
  'margin': theme.spacing(1),
}));

// Clear button
export const ClearButton = styled(IconButton)(({ theme }) => ({
  'padding': theme.spacing(0.5),
  'marginRight': theme.spacing(0.5),
  
  '&:hover': {
    'backgroundColor': alpha(theme.palette.action.hover, 0.08),
  },
}));

// Toggle button
export const ToggleButton = styled(IconButton)(({ theme }) => ({
  'padding': theme.spacing(0.5),
  'transition': theme.transitions.create('transform', {
    duration: theme.transitions.duration.short,
  }),
  
  '&.open': {
    'transform': 'rotate(180deg)',
  },
  
  '&:hover': {
    'backgroundColor': alpha(theme.palette.action.hover, 0.08),
  },
}));

// No options message
export const NoOptionsMessage = styled('div')(({ theme }) => ({
  'padding': theme.spacing(2),
  'textAlign': 'center',
  'color': theme.palette.text.secondary,
  'fontSize': '0.875rem',
}));

// Loading message
export const LoadingMessage = styled('div')(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  gap: theme.spacing(1),
  'padding': theme.spacing(2),
  'color': theme.palette.text.secondary,
  'fontSize': '0.875rem',
}));

// Group header
export const GroupHeader = styled('div')(({ theme }) => ({
  'padding': `${theme.spacing(1)} ${SPACING_CONSTANTS.OPTION_PADDING_X}px`,
  'fontSize': '0.75rem',
  'fontWeight': theme.typography.fontWeightMedium,
  'color': theme.palette.text.secondary,
  'textTransform': 'uppercase',
  'letterSpacing': '0.5px',
  'borderBottom': `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  'backgroundColor': alpha(theme.palette.background.default, 0.5),
  'position': 'sticky',
  'top': 0,
  'zIndex': 1,
}));

// Option icon
export const OptionIcon = styled('span')(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'marginRight': theme.spacing(1),
  'fontSize': '1rem',
  'color': theme.palette.text.secondary,
}));

// Option description
export const OptionDescription = styled('span')(({ theme }) => ({
  'fontSize': '0.75rem',
  'color': theme.palette.text.secondary,
  'marginLeft': 'auto',
}));