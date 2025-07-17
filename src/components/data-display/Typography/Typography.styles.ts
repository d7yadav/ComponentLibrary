import type { TypographyProps as MuiTypographyProps } from '@mui/material';
import { Typography as MuiTypography } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { TypographyStyleProps } from './Typography.types';

export const StyledTypography: React.ComponentType<MuiTypographyProps & TypographyStyleProps> = styled(MuiTypography)<TypographyStyleProps>(
  ({ 
    theme, 
    customVariant, 
    customColor, 
    customAlign, 
    textTransform, 
    fontWeight, 
    display, 
    noWrap, 
    paragraph, 
    gutterBottom, 
    maxLines,
    responsive,
    fontSize,
    lineHeight,
    letterSpacing
  }) => {
    // Get typography variant styles from theme
    const variantStyles = theme.typography[customVariant] || theme.typography.body1;
    // Color resolution with support for custom color tokens
    const getTextColor = () => {
      if (customColor === 'inherit') return 'inherit';
      // Handle text.* color variants
      if (customColor.startsWith('text.')) {
        const textVariant = customColor.split('.')[1] as 'primary' | 'secondary' | 'disabled';
        return theme.palette.text[textVariant];
      }
      // Handle palette colors
      if (customColor === 'tertiary' || customColor === 'quaternary') {
        // Use primary as fallback for custom colors
        return theme.palette.primary.main;
      }
      // Standard palette colors
      const paletteColor = theme.palette[customColor as keyof typeof theme.palette];
      if (paletteColor && typeof paletteColor === 'object' && 'main' in paletteColor) {
        return (paletteColor as { main: string }).main;
      }
      return customColor;
    };
    // Font weight resolution
    const getFontWeight = () => {
      if (typeof fontWeight === 'number') return fontWeight;
      switch (fontWeight) {
        case 'light': return theme.typography.fontWeightLight;
        case 'regular': return theme.typography.fontWeightRegular;
        case 'medium': return theme.typography.fontWeightMedium;
        case 'bold': return theme.typography.fontWeightBold;
        default: return Number(variantStyles.fontWeight) || theme.typography.fontWeightRegular || 400;
      }
    };
    // Responsive typography scaling
    const getResponsiveStyles = () => {
      if (!responsive) return {};
      return {
        [theme.breakpoints.down('sm')]: {
          'fontSize': `calc(${variantStyles.fontSize} * 0.9)`,
        },
        [theme.breakpoints.up('lg')]: {
          'fontSize': `calc(${variantStyles.fontSize} * 1.1)`,
        },
      };
    };
    // Multi-line truncation styles
    const getMultiLineStyles = () => {
      if (!maxLines || maxLines <= 1) return {};
      return {
        'display': '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical' as const,
        'overflow': 'hidden',
        'textOverflow': 'ellipsis',
      };
    };
    // Base styles
    const baseStyles = {
      // Typography variant styles
      'fontSize': fontSize || variantStyles.fontSize,
      'fontWeight': getFontWeight(),
      'lineHeight': lineHeight || variantStyles.lineHeight,
      'letterSpacing': letterSpacing || variantStyles.letterSpacing || 'normal',
      'fontFamily': theme.typography.fontFamily,
      // Color
      'color': getTextColor(),
      // Alignment
      'textAlign': customAlign,
      // Text transformation
      'textTransform': textTransform,
      // Display
      'display': display,
      // Text wrapping
      ...(noWrap && {
        'overflow': 'hidden',
        'textOverflow': 'ellipsis',
        'whiteSpace': 'nowrap',
      }),
      // Paragraph spacing
      ...(paragraph && {
        'marginBottom': theme.spacing(2),
      }),
      // Gutter bottom
      ...(gutterBottom && {
        'marginBottom': theme.spacing(1),
      }),
      // Multi-line truncation
      ...getMultiLineStyles(),
      // Responsive scaling
      ...getResponsiveStyles(),
      // Smooth transitions for hover effects
      'transition': theme.transitions.create(['color', 'transform'], {
        duration: theme.transitions.duration.shorter,
      }),
      // Enhanced accessibility
      '&:focus-visible': {
        'outline': `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '2px',
        'borderRadius': theme.shape.borderRadius,
      },
    };
    return baseStyles;
  }
);

export const InteractiveTypography: React.ComponentType<MuiTypographyProps & TypographyStyleProps & { interactive?: boolean }> = styled(StyledTypography)<{ interactive?: boolean }>(
  ({ theme, interactive }) => ({
    ...(interactive && {
      'cursor': 'pointer',
      'userSelect': 'none',
      
      '&:hover': {
        'color': theme.palette.primary.main,
        'transform': 'translateY(-1px)',
      },
      
      '&:active': {
        'transform': 'translateY(0)',
      },
      
      // Keyboard navigation
      '&:focus': {
        'color': theme.palette.primary.main,
      },
    }),
  })
);

export const GradientTypography: React.ComponentType<MuiTypographyProps & TypographyStyleProps & { gradient?: string }> = styled(StyledTypography)<{ gradient?: string }>(
  ({ theme, gradient }) => ({
    ...(gradient && {
      'background': gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      'backgroundClip': 'text',
      
      // Fallback for browsers that don't support background-clip: text
      '@supports not (-webkit-background-clip: text)': {
        'color': theme.palette.primary.main,
      },
    }),
  })
);

export const AccessibleTypography: React.ComponentType<MuiTypographyProps & TypographyStyleProps> = styled(StyledTypography)(
  ({ theme, customVariant }) => {
    // Enhanced contrast for better accessibility
    const isHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(customVariant);
    
    return {
      // Enhanced contrast ratios
      ...(theme.palette.mode === 'dark' && {
        'color': theme.palette.common.white,
      }),
      
      // Screen reader optimizations
      ...(isHeading && {
        // Ensure headings are properly structured for screen readers
        '&:focus': {
          'outline': `3px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      }),
      
      // Print styles
      '@media print': {
        'color': `${theme.palette.common.black} !important`,
        'textShadow': 'none !important',
        'background': 'transparent !important',
      },
    };
  }
);

export const typographyUtilities = {
  // Truncation helpers
  truncate: {
    'overflow': 'hidden',
    'textOverflow': 'ellipsis',
    'whiteSpace': 'nowrap' as const,
  },
  
  // Multi-line truncation (requires line count)
  truncateLines: (lines: number) => ({
    'display': '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical' as const,
    'overflow': 'hidden',
    'textOverflow': 'ellipsis',
  }),
  
  // Responsive text scaling
  responsiveScale: (baseSize: string, scaleDown = 0.9, scaleUp = 1.1) => (theme: any) => ({
    'fontSize': baseSize,
    [theme.breakpoints.down('sm')]: {
      'fontSize': `calc(${baseSize} * ${scaleDown})`,
    },
    [theme.breakpoints.up('lg')]: {
      'fontSize': `calc(${baseSize} * ${scaleUp})`,
    },
  }),
  
  // High contrast mode support
  highContrast: (theme: any) => ({
    '@media (prefers-contrast: high)': {
      'color': theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
      'textShadow': 'none',
    },
  }),
};