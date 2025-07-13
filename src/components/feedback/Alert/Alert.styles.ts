import { styled, keyframes } from '@mui/material/styles';
import { Alert as MuiAlert } from '@mui/material';
import { 
  ALERT_SIZE_CONFIGS, 
  ALERT_COLORS, 
  ALERT_ANIMATION_DURATIONS,
  ALERT_ANIMATION_EASINGS 
} from './Alert.constants';

// Animation keyframes
const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const bounceIn = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  70% {
    transform: scale(0.9);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

/**
 * StyledAlert component
 * 
 * @returns JSX element
 */
export const StyledAlert = styled(MuiAlert, {
  shouldForwardProp: (prop) => !['customSize', 'customFullWidth', 'customElevated', 'customElevation', 'customRounded', 'customBorderRadius', 'customCentered', 'customBgcolor', 'customColor', 'customAnimated', 'customAnimationDuration'].includes(prop as string),
})<any>((props: any) => {
  const { 
    theme, 
    severity = 'info',
    variant = 'standard',
    customSize = 'medium',
    customFullWidth,
    customElevated,
    customElevation,
    customRounded,
    customBorderRadius,
    customCentered,
    customBgcolor,
    customColor,
    customAnimated,
    customAnimationDuration
  } = props;
  
  const sizeConfig = ALERT_SIZE_CONFIGS[customSize as keyof typeof ALERT_SIZE_CONFIGS];
  const colorConfig = ALERT_COLORS[severity as keyof typeof ALERT_COLORS];
  
  return {
    // Size configuration
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    minHeight: sizeConfig.minHeight,
    
    // Full width
    ...(customFullWidth && {
      width: '100%',
    }),
    
    // Elevation
    ...(customElevated && {
      boxShadow: theme.shadows[customElevation || 2],
    }),
    
    // Border radius
    ...(customRounded && {
      borderRadius: customBorderRadius 
        ? (typeof customBorderRadius === 'number' ? customBorderRadius : customBorderRadius)
        : sizeConfig.borderRadius,
    }),
    
    // Centered alignment
    ...(customCentered && {
      margin: '0 auto',
      textAlign: 'center',
    }),
    
    // Custom background color
    ...(customBgcolor && {
      backgroundColor: customBgcolor.includes('.') 
        ? theme.palette[customBgcolor.split('.')[0] as keyof typeof theme.palette]?.main || customBgcolor
        : customBgcolor,
    }),
    
    // Custom text color
    ...(customColor && {
      color: customColor.includes('.') 
        ? theme.palette[customColor.split('.')[0] as keyof typeof theme.palette]?.main || customColor
        : customColor,
    }),
    
    // Animation
    ...(customAnimated && {
      animation: `${fadeIn} ${customAnimationDuration || ALERT_ANIMATION_DURATIONS.normal}ms ${ALERT_ANIMATION_EASINGS.easeInOut}`,
    }),
    
    // Icon styling
    '& .MuiAlert-icon': {
      fontSize: sizeConfig.iconSize,
      alignItems: 'center',
      padding: 0,
      marginRight: theme.spacing(1),
    },
    
    // Action styling
    '& .MuiAlert-action': {
      alignItems: 'flex-start',
      paddingTop: 0,
      marginRight: 0,
      marginLeft: theme.spacing(1),
    },
    
    // Message styling
    '& .MuiAlert-message': {
      padding: 0,
      fontSize: 'inherit',
      lineHeight: 1.5,
      alignItems: 'center',
      
      // Title styling when present
      '& .alert-title': {
        fontSize: sizeConfig.titleFontSize,
        fontWeight: theme.typography.fontWeightMedium,
        marginBottom: theme.spacing(0.5),
        lineHeight: 1.2,
      },
      
      // Content styling
      '& .alert-content': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
      },
    },
    
    // Variant-specific styles
    ...(variant === 'filled' && {
      backgroundColor: colorConfig.main,
      color: colorConfig.contrast,
      
      '& .MuiAlert-icon': {
        color: colorConfig.contrast,
      },
    }),
    
    ...(variant === 'outlined' && {
      backgroundColor: 'transparent',
      color: colorConfig.main,
      border: `1px solid ${colorConfig.border}`,
      
      '& .MuiAlert-icon': {
        color: colorConfig.main,
      },
    }),
    
    ...(variant === 'standard' && {
      backgroundColor: colorConfig.background,
      color: colorConfig.dark,
      
      '& .MuiAlert-icon': {
        color: colorConfig.main,
      },
    }),
    
    // Enhanced hover effects for interactive alerts
    '&.interactive': {
      cursor: 'pointer',
      transition: theme.transitions.create(
        ['background-color', 'box-shadow', 'transform'],
        {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeInOut,
        }
      ),
      
      '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: theme.shadows[4],
      },
    },
    
    // Responsive design
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 2),
      fontSize: '0.875rem',
      
      '& .MuiAlert-icon': {
        fontSize: 18,
      },
      
      '& .alert-title': {
        fontSize: '1rem',
      },
    },
  };
});

// Alert title component
/**
 * AlertTitle component
 * 
 * @returns JSX element
 */
export const AlertTitle = styled('div')<any>((props: any) => {
  const { theme, customSize = 'medium' } = props;
  const sizeConfig = ALERT_SIZE_CONFIGS[customSize as keyof typeof ALERT_SIZE_CONFIGS];
  
  return {
    fontSize: sizeConfig.titleFontSize,
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(0.5),
    lineHeight: 1.2,
    color: 'inherit',
  };
});

// Alert content wrapper
/**
 * AlertContent component
 * 
 * @returns JSX element
 */
export const AlertContent = styled('div')(() => ({
  fontSize: 'inherit',
  lineHeight: 1.5,
  color: 'inherit',
}));

// Alert actions container
/**
 * AlertActions component
 * 
 * @returns JSX element
 */
export const AlertActions = styled('div')<any>((props: any) => {
  const { theme } = props;
  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
    
    '& .MuiButton-root': {
      minHeight: 'auto',
      padding: theme.spacing(0.5, 1),
      fontSize: '0.75rem',
    },
  };
});

// Animated alert variants
/**
 * SlideInAlert component
 * 
 * @returns JSX element
 */
export const SlideInAlert = styled(StyledAlert)<any>((props: any) => {
  const { customAnimationDuration = ALERT_ANIMATION_DURATIONS.normal } = props;
  return {
    animation: `${slideIn} ${customAnimationDuration}ms ${ALERT_ANIMATION_EASINGS.spring}`,
  };
});

/**
 * ScaleInAlert component
 * 
 * @returns JSX element
 */
export const ScaleInAlert = styled(StyledAlert)<any>((props: any) => {
  const { customAnimationDuration = ALERT_ANIMATION_DURATIONS.normal } = props;
  return {
    animation: `${scaleIn} ${customAnimationDuration}ms ${ALERT_ANIMATION_EASINGS.easeOut}`,
  };
});

/**
 * BounceInAlert component
 * 
 * @returns JSX element
 */
export const BounceInAlert = styled(StyledAlert)<any>((props: any) => {
  const { customAnimationDuration = ALERT_ANIMATION_DURATIONS.slow } = props;
  return {
    animation: `${bounceIn} ${customAnimationDuration}ms ${ALERT_ANIMATION_EASINGS.bounce}`,
  };
});

// Specialized alert components
/**
 * SuccessAlert component
 * 
 * @returns JSX element
 */
export const SuccessAlert = styled(StyledAlert)<any>(() => ({
  // Success-specific styling can be added here
}));

/**
 * ErrorAlert component
 * 
 * @returns JSX element
 */
export const ErrorAlert = styled(StyledAlert)<any>(() => ({
  // Error-specific styling can be added here
}));

/**
 * WarningAlert component
 * 
 * @returns JSX element
 */
export const WarningAlert = styled(StyledAlert)<any>(() => ({
  // Warning-specific styling can be added here
}));

/**
 * InfoAlert component
 * 
 * @returns JSX element
 */
export const InfoAlert = styled(StyledAlert)<any>(() => ({
  // Info-specific styling can be added here
}));

// Compact alert for dense layouts
/**
 * CompactAlert component
 * 
 * @returns JSX element
 */
export const CompactAlert = styled(StyledAlert)<any>((props: any) => {
  const { theme } = props;
  return {
    padding: theme.spacing(0.5, 1),
    minHeight: 32,
    fontSize: '0.75rem',
    
    '& .MuiAlert-icon': {
      fontSize: 16,
      marginRight: theme.spacing(0.5),
    },
    
    '& .alert-title': {
      fontSize: '0.8125rem',
      marginBottom: theme.spacing(0.25),
    },
  };
});

// Banner alert for full-width notifications
/**
 * BannerAlert component
 * 
 * @returns JSX element
 */
export const BannerAlert = styled(StyledAlert)<any>((props: any) => {
  const { theme } = props;
  return {
    borderRadius: 0,
    width: '100%',
    padding: theme.spacing(1.5, 3),
    
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 2),
    },
  };
});

// Toast-style alert
/**
 * ToastAlert component
 * 
 * @returns JSX element
 */
export const ToastAlert = styled(StyledAlert)<any>((props: any) => {
  const { theme } = props;
  return {
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[8],
    maxWidth: 400,
    margin: theme.spacing(1),
    
    '& .MuiAlert-action': {
      paddingTop: theme.spacing(0.25),
    },
  };
});