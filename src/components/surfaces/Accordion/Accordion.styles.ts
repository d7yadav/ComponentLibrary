import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  AccordionActions as MuiAccordionActions,
  Divider,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import React from 'react';

import { 
  SIZE_CONFIGS,
  ELEVATION_VALUES,
  BORDER_RADIUS,
  TRANSITION_EASINGS,
  Z_INDEX,
} from './Accordion.constants';
import type { 
  AccordionStyleProps,
  AccordionSummaryStyleProps,
  AccordionDetailsStyleProps,
  AccordionActionsStyleProps,
} from './Accordion.types';
// Keyframes for animations
export const expandAnimation = keyframes`
  from {
    opacity: 0,
    transform: translateY(-8px) scale(0.98),
  }
  to {
    opacity: 1,
    transform: translateY(0) scale(1),
  }
`;

export const collapseAnimation = keyframes`
  from {
    opacity: 1,
    transform: translateY(0) scale(1),
  }
  to {
    opacity: 0,
    transform: translateY(-8px) scale(0.98),
  }
`;

export const iconRotateAnimation = keyframes`
  from {
    transform: rotate(0deg),
  }
  to {
    transform: rotate(180deg),
  }
`;

export const pulseAnimation = keyframes`
  0% {
    transform: scale(1),
  }
  50% {
    transform: scale(1.05),
  }
  100% {
    transform: scale(1),
  }
`;

// Loading keyframes for potential future use
export const loadingSpinKeyframes = `
  @keyframes accordion-loading-spin {
    from {
      transform: rotate(0deg),
    }
    to {
      transform: rotate(360deg),
    }
  }
`;

// Main Accordion component
export const StyledAccordion = styled(MuiAccordion, {
  shouldForwardProp: (prop) => 
    !['variant', 'size', 'transition', 'animationDuration', 'square'].includes(prop as string),
})<AccordionStyleProps>((props) => {
  const { 
    theme, 
    variant, 
    size, 
    transition, 
    animationDuration, 
    elevation: customElevation,
    square,
    expanded,
    disabled 
  } = props;
  const sizeConfig = SIZE_CONFIGS[size];
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Base styles
  const baseStyles = {
    'borderRadius': square ? BORDER_RADIUS.square : 
                 variant === 'card' ? BORDER_RADIUS.card : BORDER_RADIUS.default,
    'overflow': 'hidden',
    'position': 'relative' as const,
    'zIndex': expanded ? Z_INDEX.expanded : Z_INDEX.accordion,
    'transition': `all ${animationDuration}ms ${TRANSITION_EASINGS[transition]}`,
    
    // Accessibility
    '&:focus-within': {
      'zIndex': Z_INDEX.elevated,
    },
    
    // Disabled state
    ...(disabled && {
      'opacity': 0.6,
      'pointerEvents': 'none',
    }),
  };
  
  // Variant-specific styles
  const variantStyles = {
    standard: {
      'backgroundColor': theme.palette.background.paper,
      'border': 'none',
      'boxShadow': 'none',
      
      '&:before': {
        'display': 'none',
      },
      
      '&:not(:last-child)': {
        'borderBottom': `1px solid ${theme.palette.divider}`,
      },
    },
    
    outlined: {
      'backgroundColor': theme.palette.background.paper,
      'border': `1px solid ${theme.palette.divider}`,
      'boxShadow': 'none',
      
      '&:before': {
        'display': 'none',
      },
      
      '&:hover:not(.Mui-disabled)': {
        'borderColor': theme.palette.primary.main,
      },
      
      '&.Mui-expanded': {
        'borderColor': theme.palette.primary.main,
        'boxShadow': `0 0 0 2px ${theme.palette.primary.main}20`,
      },
    },
    
    elevated: {
      'backgroundColor': theme.palette.background.paper,
      'border': 'none',
      'boxShadow': theme.shadows[customElevation || ELEVATION_VALUES.default],
      
      '&:before': {
        'display': 'none',
      },
      
      '&:hover:not(.Mui-disabled)': {
        'boxShadow': theme.shadows[ELEVATION_VALUES.hover],
        'transform': 'translateY(-1px)',
      },
      
      '&.Mui-expanded': {
        'boxShadow': theme.shadows[ELEVATION_VALUES.expanded],
        'transform': 'translateY(-2px)',
      },
    },
    
    flat: {
      'backgroundColor': isDarkMode ? theme.palette.grey[900] : theme.palette.grey[50],
      'border': 'none',
      'boxShadow': 'none',
      
      '&:before': {
        'display': 'none',
      },
      
      '&:hover:not(.Mui-disabled)': {
        'backgroundColor': isDarkMode ? theme.palette.grey[800] : theme.palette.grey[100],
      },
      
      '&.Mui-expanded': {
        'backgroundColor': isDarkMode ? theme.palette.grey[800] : theme.palette.grey[100],
      },
    },
    
    card: {
      'backgroundColor': theme.palette.background.paper,
      'border': `1px solid ${theme.palette.divider}`,
      'boxShadow': theme.shadows[2],
      'margin': '8px 0',
      
      '&:before': {
        'display': 'none',
      },
      
      '&:hover:not(.Mui-disabled)': {
        'boxShadow': theme.shadows[4],
        'transform': 'translateY(-1px)',
      },
      
      '&.Mui-expanded': {
        'boxShadow': theme.shadows[6],
        'transform': 'translateY(-2px)',
        'margin': '12px 0',
      },
      
      '&:first-of-type': {
        'marginTop': 0,
      },
      
      '&:last-of-type': {
        'marginBottom': 0,
      },
    },
  };
  
  return {
    ...baseStyles,
    ...variantStyles[variant],
  };
});

// Accordion Summary component
export const StyledAccordionSummary = styled(MuiAccordionSummary, {
  shouldForwardProp: (prop) => 
    !['variant', 'size', 'iconPosition', 'dense', 'focusColor', 'showDivider'].includes(prop as string),
})<AccordionSummaryStyleProps>((props) => {
  const { 
    theme, 
    variant, 
    size, 
    iconPosition, 
    dense, 
    focusColor, 
    showDivider,
    expanded,
    disabled 
  } = props;
  const sizeConfig = SIZE_CONFIGS[size];
  const isDarkMode = theme.palette.mode === 'dark';
  
  return {
    'padding': dense ? 
      `${parseInt(sizeConfig.summaryPadding.split(' ')[0]) * 0.75}px ${sizeConfig.summaryPadding.split(' ')[1]}` :
      sizeConfig.summaryPadding,
    'fontSize': sizeConfig.fontSize,
    'lineHeight': sizeConfig.lineHeight,
    'minHeight': dense ? '48px' : '56px',
    'transition': `all 200ms ${TRANSITION_EASINGS.smooth}`,
    'position': 'relative' as const,
    
    // Content layout
    '& .MuiAccordionSummary-content': {
      'margin': '0',
      'display': 'flex',
      'alignItems': 'center',
      'gap': theme.spacing(1),
      'flexGrow': 1,
      
      // Handle icon positioning
      ...(iconPosition === 'start' && {
        'flexDirection': 'row',
      }),
      
      ...(iconPosition === 'end' && {
        'flexDirection': 'row',
      }),
      
      ...(iconPosition === 'both' && {
        'justifyContent': 'space-between',
      }),
      
      '&.Mui-expanded': {
        'margin': '0',
      },
    },
    
    // Expand icon
    '& .MuiAccordionSummary-expandIconWrapper': {
      'color': disabled ? theme.palette.action.disabled : theme.palette.action.active,
      'transition': `transform 200ms ${TRANSITION_EASINGS.smooth}`,
      
      '&.Mui-expanded': {
        'transform': 'rotate(180deg)',
      },
      
      // Position based on iconPosition
      ...(iconPosition === 'start' && {
        'order': -1,
        'marginRight': theme.spacing(1),
        'marginLeft': 0,
      }),
      
      ...(iconPosition === 'end' && {
        'order': 1,
        'marginLeft': theme.spacing(1),
        'marginRight': 0,
      }),
      
      ...(iconPosition === 'none' && {
        'display': 'none',
      }),
    },
    
    // Focus styles
    '&:focus-visible': {
      'outline': `2px solid ${theme.palette[focusColor].main}`,
      'outlineOffset': '-2px',
    },
    
    // Hover styles
    '&:hover:not(.Mui-disabled)': {
      'backgroundColor': theme.palette.action.hover,
    },
    
    // Active styles
    '&:active:not(.Mui-disabled)': {
      'backgroundColor': theme.palette.action.selected,
    },
    
    // Expanded styles
    '&.Mui-expanded': {
      'backgroundColor': theme.palette.action.hover,
      
      ...(showDivider && {
        'borderBottom': `1px solid ${theme.palette.divider}`,
      }),
    },
    
    // Disabled styles
    '&.Mui-disabled': {
      'opacity': 0.6,
      'cursor': 'not-allowed',
    },
  };
});

// Accordion Details component
export const StyledAccordionDetails = styled(MuiAccordionDetails, {
  shouldForwardProp: (prop) => !['variant', 'size'].includes(prop as string),
})<AccordionDetailsStyleProps>((props) => {
  const { theme, variant, size } = props;
  const sizeConfig = SIZE_CONFIGS[size];
  
  return {
    'padding': sizeConfig.detailsPadding,
    'fontSize': sizeConfig.fontSize,
    'lineHeight': sizeConfig.lineHeight,
    
    // Animation
    'animation': `${expandAnimation} 300ms ${TRANSITION_EASINGS.smooth}`,
    
    // Content styling
    '& > *:first-of-type': {
      'marginTop': 0,
    },
    
    '& > *:last-child': {
      'marginBottom': 0,
    },
    
    // Typography spacing
    '& p': {
      'marginBottom': theme.spacing(1),
      
      '&:last-child': {
        'marginBottom': 0,
      },
    },
    
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      'marginTop': theme.spacing(2),
      'marginBottom': theme.spacing(1),
      
      '&:first-child': {
        'marginTop': 0,
      },
    },
    
    // List styling
    '& ul, & ol': {
      'paddingLeft': theme.spacing(3),
      'marginBottom': theme.spacing(1),
      
      '&:last-child': {
        'marginBottom': 0,
      },
    },
    
    '& li': {
      'marginBottom': theme.spacing(0.5),
    },
  };
});

// Accordion Actions component
export const StyledAccordionActions = styled(MuiAccordionActions, {
  shouldForwardProp: (prop) => !['variant', 'size', 'alignLeft'].includes(prop as string),
})<AccordionActionsStyleProps>((props) => {
  const { theme, variant, size, alignLeft } = props;
  const sizeConfig = SIZE_CONFIGS[size];
  
  return {
    'padding': sizeConfig.actionsPadding,
    'justifyContent': alignLeft ? 'flex-start' : 'flex-end',
    'gap': theme.spacing(1),
    'borderTop': `1px solid ${theme.palette.divider}`,
    
    // Button styling
    '& .MuiButton-root': {
      'minWidth': 'auto',
      'padding': theme.spacing(0.75, 2),
    },
    
    // Animation
    'animation': `${expandAnimation} 300ms ${TRANSITION_EASINGS.smooth}`,
  };
});

// Summary content wrapper
export const SummaryContent = styled('div')<{ 
  hasSubtitle?: boolean, 
  iconPosition?: string,
}>(({ theme, hasSubtitle, iconPosition }) => ({
  'display': 'flex',
  'flexDirection': 'column',
  'flexGrow': 1,
  'minWidth': 0, // Allow text overflow
  
  ...(iconPosition === 'both' && {
    'textAlign': 'center',
  }),
}));

// Summary title
export const SummaryTitle = styled('div')(({ theme }) => ({
  'fontSize': 'inherit',
  'fontWeight': theme.typography.fontWeightMedium,
  'lineHeight': 'inherit',
  'color': theme.palette.text.primary,
  'overflow': 'hidden',
  'textOverflow': 'ellipsis',
  'whiteSpace': 'nowrap',
}));

// Summary subtitle
export const SummarySubtitle = styled('div')(({ theme }) => ({
  'fontSize': '0.875rem',
  'fontWeight': theme.typography.fontWeightRegular,
  'lineHeight': 1.43,
  'color': theme.palette.text.secondary,
  'marginTop': theme.spacing(0.25),
  'overflow': 'hidden',
  'textOverflow': 'ellipsis',
  'whiteSpace': 'nowrap',
}));

// Icon wrapper for start/end icons
export const IconWrapper = styled('div')<{ 
  'position': 'start' | 'end',
  size: string,
}>(({ theme, position, size }) => {
  const sizeConfig = SIZE_CONFIGS[size as keyof typeof SIZE_CONFIGS];
  
  return {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'width': sizeConfig.iconSize,
    'height': sizeConfig.iconSize,
    'color': theme.palette.text.secondary,
    
    '& .MuiSvgIcon-root': {
      'width': sizeConfig.iconSize,
      'height': sizeConfig.iconSize,
    },
    
    ...(position === 'start' && {
      'marginRight': theme.spacing(1),
    }),
    
    ...(position === 'end' && {
      'marginLeft': theme.spacing(1),
    }),
  };
});

// Divider component
export const StyledDivider = styled(Divider)(({ theme }) => ({
  'margin': 0,
  'borderColor': theme.palette.divider,
}));

// Accordion Group wrapper
export const AccordionGroup = styled('div')<{ 
  variant?: string, 
}>(({ theme, variant }) => ({
  'width': '100%',
  
  // Card variant spacing
  ...(variant === 'card' && {
    '& > *': {
      'marginBottom': theme.spacing(1),
      
      '&:last-child': {
        'marginBottom': 0,
      },
    },
  }),
  
  // Standard variant - remove borders between items
  ...(variant === 'standard' && {
    '& .MuiAccordion-root': {
      '&:not(:last-child)': {
        'borderBottom': 'none',
      },
      
      '&:not(:first-of-type)': {
        'borderTop': `1px solid ${theme.palette.divider}`,
      },
    },
  }),
}));