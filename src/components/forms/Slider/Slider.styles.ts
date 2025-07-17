import { styled, alpha } from '@mui/material/styles';

import { DIMENSION_CONSTANTS, ANIMATION_CONSTANTS } from './Slider.constants';
import type {
  SliderStyleProps,
  SliderRailStyleProps,
  SliderTrackStyleProps,
  SliderThumbStyleProps,
  SliderMarkStyleProps,
  SliderMarkLabelStyleProps,
  SliderValueLabelStyleProps
} from './Slider.types';

// Main slider container
export const SliderRoot = styled('div')<SliderStyleProps>(({ 
  theme, 
  orientation, 
  size, 
  disabled 
}) => ({
  'position': 'relative',
  'cursor': disabled ? 'default' : 'pointer',
  WebkitTapHighlightColor: 'transparent',
  'color': disabled ? theme.palette.text.disabled : theme.palette.primary.main,
  'height': orientation === 'horizontal' ? DIMENSION_CONSTANTS.PADDING[size] * 2 : 300,
  'width': orientation === 'vertical' ? DIMENSION_CONSTANTS.PADDING[size] * 2 : '100%',
  'padding': orientation === 'horizontal' 
    ? `${DIMENSION_CONSTANTS.PADDING[size]}px 0`
    : `0 ${DIMENSION_CONSTANTS.PADDING[size]}px`,
  'display': 'inline-block',
  
  // Focus styles
  '&:focus-within': {
    'outline': 'none',
  },
  
  // Disabled styles
  ...(disabled && {
      'pointerEvents': 'none',
  }),
  
  // Touch device optimization
  '@media (pointer: coarse)': {
    'padding': orientation === 'horizontal' 
      ? `${DIMENSION_CONSTANTS.PADDING[size] + 4}px 0`
      : `0 ${DIMENSION_CONSTANTS.PADDING[size] + 4}px`,
  },
}));

// Slider rail (background track)
export const SliderRail = styled('div')<SliderRailStyleProps>(({ 
  theme, 
  orientation, 
  size, 
  disabled 
}) => ({
  'position': 'absolute',
  'width': orientation === 'horizontal' ? '100%' : DIMENSION_CONSTANTS.TRACK_HEIGHT[size],
  'height': orientation === 'vertical' ? '100%' : DIMENSION_CONSTANTS.TRACK_HEIGHT[size],
  'borderRadius': DIMENSION_CONSTANTS.TRACK_HEIGHT[size] / 2,
  'backgroundColor': disabled 
    ? theme.palette.action.disabled 
    : alpha(theme.palette.text.primary, 0.26),
  
  // Positioning
  ...(orientation === 'horizontal' 
    ? {
        'top': '50%',
        'left': 0,
        'transform': 'translateY(-50%)',
      }
    : {
        'left': '50%',
        'top': 0,
        'transform': 'translateX(-50%)',
      }
  ),
}));

// Slider track (active portion)
export const SliderTrack = styled('div')<SliderTrackStyleProps>(({ 
  theme, 
  orientation, 
  size, 
  color, 
  disabled,
  track,
  length = 0,
  offset = 0
}) => {
  const colorValue = disabled 
    ? theme.palette.action.disabled 
    : theme.palette[color]?.main || theme.palette.primary.main;
    
  return {
    'position': 'absolute',
    'borderRadius': DIMENSION_CONSTANTS.TRACK_HEIGHT[size] / 2,
    'backgroundColor': colorValue,
    'transition': theme.transitions.create(['width', 'height', 'left', 'top'], {
      duration: ANIMATION_CONSTANTS.DURATION.THUMB_TRANSITION,
      easing: ANIMATION_CONSTANTS.EASING.EASE_OUT,
    }),
    
    // Dimensions and positioning based on orientation
    ...(orientation === 'horizontal' 
      ? {
          'height': DIMENSION_CONSTANTS.TRACK_HEIGHT[size],
          'top': '50%',
          'transform': 'translateY(-50%)',
          'left': track === 'inverted' ? `${length}%` : `${offset}%`,
          'width': track === 'inverted' ? `${100 - length}%` : `${length - offset}%`,
        }
      : {
          'width': DIMENSION_CONSTANTS.TRACK_HEIGHT[size],
          'left': '50%',
          'transform': 'translateX(-50%)',
          'top': track === 'inverted' ? 0 : `${100 - length}%`,
          'height': track === 'inverted' ? `${100 - length}%` : `${length - offset}%`,
        }
    ),
    
    // Hide track if track={false}
    ...(track === false && {
      'display': 'none',
    }),
  };
});

// Slider thumb
export const SliderThumb = styled('div')<SliderThumbStyleProps>(({ 
  theme, 
  size, 
  color, 
  disabled, 
  active, 
  focused, 
  dragging 
}) => {
  const thumbSize = DIMENSION_CONSTANTS.THUMB_SIZE[size];
  const colorValue = disabled 
    ? theme.palette.action.disabled 
    : theme.palette[color]?.main || theme.palette.primary.main;
    
  return {
    'position': 'absolute',
    'width': thumbSize,
    'height': thumbSize,
    'marginLeft': -thumbSize / 2,
    'marginTop': -thumbSize / 2,
    'borderRadius': '50%',
    'backgroundColor': colorValue,
    'border': `2px solid ${theme.palette.background.paper}`,
    'boxShadow': theme.shadows[2],
    'cursor': disabled ? 'default' : 'grab',
    'outline': 'none',
    
    // Transitions
    'transition': theme.transitions.create(['box-shadow', 'transform'], {
      duration: ANIMATION_CONSTANTS.DURATION.THUMB_TRANSITION,
      easing: ANIMATION_CONSTANTS.EASING.EASE_OUT,
    }),
    
    // Hover state
    '&:hover': {
      ...(disabled ? {} : {
        'boxShadow': `${theme.shadows[4]}, 0 0 0 8px ${alpha(colorValue, 0.16)}`,
      }),
    },
    
    // Focus state
    ...(focused && {
      'boxShadow': `${theme.shadows[6]}, 0 0 0 12px ${alpha(colorValue, 0.16)}`,
    }),
    
    // Active/dragging state
    ...((active || dragging) && {
      'boxShadow': `${theme.shadows[8]}, 0 0 0 16px ${alpha(colorValue, 0.16)}`,
      'transform': 'scale(1.1)',
      'cursor': 'grabbing',
    }),
    
    // Disabled state
    ...(disabled && {
      'boxShadow': theme.shadows[1],
    }),
    
    // Reduce motion for accessibility
    '@media (prefers-reduced-motion: reduce)': {
      'transition': 'none',
    },
  };
});

// Mark indicator
export const SliderMark = styled('div')<SliderMarkStyleProps>(({ 
  theme, 
  size, 
  orientation, 
  color, 
  active, 
  disabled 
}) => {
  const markSize = DIMENSION_CONSTANTS.MARK_SIZE[size];
  const colorValue = active 
    ? (disabled 
        ? theme.palette.action.disabled 
        : theme.palette[color]?.main || theme.palette.primary.main)
    : (disabled 
        ? theme.palette.action.disabled 
        : alpha(theme.palette.text.primary, 0.54));
        
  return {
    'position': 'absolute',
    'width': orientation === 'horizontal' ? markSize : markSize * 2,
    'height': orientation === 'vertical' ? markSize : markSize * 2,
    'borderRadius': '50%',
    'backgroundColor': colorValue,
    
    // Positioning
    ...(orientation === 'horizontal' 
      ? {
          'top': '50%',
          'transform': 'translate(-50%, -50%)',
        }
      : {
          'left': '50%',
          'transform': 'translate(-50%, -50%)',
        }
    ),
    
    // Transition
    'transition': theme.transitions.create(['background-color'], {
      duration: ANIMATION_CONSTANTS.DURATION.MARK_TRANSITION,
      easing: ANIMATION_CONSTANTS.EASING.EASE_OUT,
    }),
  };
});

// Mark label
export const SliderMarkLabel = styled('div')<SliderMarkLabelStyleProps>(({ 
  theme, 
  size, 
  orientation, 
  disabled,
  position
}) => ({
  'position': 'absolute',
  'fontSize': size === 'small' ? '0.75rem' : size === 'large' ? '0.875rem' : '0.8125rem',
  'fontFamily': theme.typography.fontFamily,
  'color': disabled ? theme.palette.text.disabled : theme.palette.text.secondary,
  'whiteSpace': 'nowrap',
  
  // Positioning based on orientation
  ...(orientation === 'horizontal' 
    ? {
        'top': '100%',
        'left': `${position}%`,
        'transform': 'translateX(-50%)',
        'marginTop': theme.spacing(0.5),
      }
    : {
        'left': '100%',
        'top': `${100 - position}%`,
        'transform': 'translateY(50%)',
        'marginLeft': theme.spacing(0.5),
      }
  ),
}));

// Value label
export const SliderValueLabel = styled('div')<SliderValueLabelStyleProps>(({ 
  theme, 
  size, 
  color, 
  open, 
  disabled 
}) => {
  const colorValue = disabled 
    ? theme.palette.action.disabled 
    : theme.palette[color]?.main || theme.palette.primary.main;
    
  return {
    'position': 'absolute',
    'top': -DIMENSION_CONSTANTS.VALUE_LABEL_HEIGHT[size] - 8,
    'left': '50%',
    'transform': 'translateX(-50%)',
    'fontSize': size === 'small' ? '0.75rem' : '0.875rem',
    'fontFamily': theme.typography.fontFamily,
    'fontWeight': theme.typography.fontWeightMedium,
    'color': theme.palette.primary.contrastText,
    'backgroundColor': colorValue,
    'padding': `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    'borderRadius': theme.shape.borderRadius,
    'minWidth': 32,
    'textAlign': 'center',
    
    // Arrow pointer
    '&::after': {
      'content': '""',
      'position': 'absolute',
      'top': '100%',
      'left': '50%',
      'transform': 'translateX(-50%)',
      'width': 0,
      'height': 0,
      'borderLeft': '4px solid transparent',
      'borderRight': '4px solid transparent',
      'borderTop': `4px solid ${colorValue}`,
    },
    
    // Visibility and transitions
    'opacity': open ? 1 : 0,
    'visibility': open ? 'visible' : 'hidden',
    'transition': theme.transitions.create(['opacity', 'visibility'], {
      duration: ANIMATION_CONSTANTS.DURATION.VALUE_LABEL_TRANSITION,
      easing: ANIMATION_CONSTANTS.EASING.EASE_IN_OUT,
    }),
    
    // Prevent pointer events
    'pointerEvents': 'none',
  };
});

// Container for marks
export const SliderMarksContainer = styled('div')<{ orientation: 'horizontal' | 'vertical' }>(({ 
  orientation 
}) => ({
  'position': 'absolute',
  'width': orientation === 'horizontal' ? '100%' : 'auto',
  'height': orientation === 'vertical' ? '100%' : 'auto',
  'top': 0,
  'left': 0,
}));

// Input element (hidden but accessible)
export const SliderInput = styled('input')({
  'position': 'absolute',
  'opacity': 0,
  'width': '100%',
  'height': '100%',
  'margin': 0,
  'padding': 0,
  'cursor': 'inherit',
  'border': 'none',
  'outline': 'none',
  
  // Remove default slider styling
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  
  '&::-webkit-slider-thumb': {
    WebkitAppearance: 'none',
    appearance: 'none',
  },
  
  '&::-moz-range-thumb': {
    'border': 'none',
    'background': 'transparent',
  },
});