import React, { forwardRef, memo } from 'react';
import { TypographyProps } from './Typography.types';
import { 
  StyledTypography, 
  InteractiveTypography, 
  GradientTypography, 
  AccessibleTypography 
} from './Typography.styles';
import { 
  TYPOGRAPHY_VARIANTS,
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_ALIGNMENTS,
  TYPOGRAPHY_TRANSFORMS,
  TYPOGRAPHY_WEIGHTS,
  TYPOGRAPHY_DISPLAYS,
  TYPOGRAPHY_VARIANT_MAPPINGS,
  DEFAULT_PROPS,
  ACCESSIBILITY_CONSTANTS,
  FONT_FEATURE_SETTINGS
} from './Typography.constants';

/**
 * Enhanced Typography component with comprehensive variant support and accessibility features
 * 
 * Features:
 * - 13 typography variants (h1-h6, body1-2, button, caption, overline, subtitle1-2)
 * - Multiple color variants with theme integration
 * - Text alignment and transformation options
 * - Responsive typography scaling
 * - Multi-line truncation support
 * - Interactive states for clickable text
 * - Gradient text support
 * - Enhanced accessibility compliance (WCAG 2.1 AA)
 * - Font feature settings for advanced typography
 * - Theme integration with CSS variables
 */
const TypographyComponent = forwardRef<HTMLElement, TypographyProps>(({
  variant = DEFAULT_PROPS.variant,
  color = DEFAULT_PROPS.color,
  align = DEFAULT_PROPS.align,
  textTransform = DEFAULT_PROPS.textTransform,
  fontWeight = DEFAULT_PROPS.fontWeight,
  display = DEFAULT_PROPS.display,
  component,
  noWrap = DEFAULT_PROPS.noWrap,
  paragraph = DEFAULT_PROPS.paragraph,
  gutterBottom = DEFAULT_PROPS.gutterBottom,
  maxLines,
  responsive = DEFAULT_PROPS.responsive,
  fontSize,
  lineHeight,
  letterSpacing,
  children,
  className,
  sx,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-level': ariaLevel,
  role,
  id,
  title,
  ...other
}, ref) => {
  // Determine the HTML element to render
  const elementComponent = component || TYPOGRAPHY_VARIANT_MAPPINGS[variant] || 'p';
  
  // Enhanced accessibility props
  const getAccessibilityProps = () => {
    const isHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant);
    const props: Record<string, any> = {};
    
    // ARIA label
    if (ariaLabel) {
      props['aria-label'] = ariaLabel;
    }
    
    // ARIA described by
    if (ariaDescribedBy) {
      props['aria-describedby'] = ariaDescribedBy;
    }
    
    // ARIA level for headings
    if (isHeading && ariaLevel) {
      props['aria-level'] = ariaLevel;
    }
    
    // Role
    if (role) {
      props.role = role;
    }
    
    // Enhanced screen reader support
    if (maxLines && maxLines > 1) {
      props['aria-label'] = props['aria-label'] || `Text content, may be truncated to ${maxLines} lines`;
    }
    
    return props;
  };
  
  // Style props for the styled component
  const styleProps = {
    customVariant: variant,
    customColor: color,
    customAlign: align,
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
    letterSpacing,
  };
  
  // Enhanced sx prop with font features and accessibility
  const enhancedSx = {
    // Advanced font features for better typography
    fontFeatureSettings: FONT_FEATURE_SETTINGS.readability,
    
    // Ensure proper contrast in high contrast mode
    '@media (prefers-contrast: high)': {
      fontWeight: fontWeight === 'light' ? 'regular' : fontWeight,
    },
    
    // Respect user's motion preferences
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
    
    // Custom sx overrides
    ...sx,
  };
  
  // Base component props
  const baseProps = {
    ref,
    component: elementComponent,
    variant: variant as any, // MUI typing compatibility
    className,
    sx: enhancedSx,
    id,
    title,
    ...getAccessibilityProps(),
    ...styleProps,
    ...other,
  };
  
  // Determine which styled component to use based on enhanced features
  const shouldUseGradient = sx?.background && (sx.background.includes('gradient') || sx.background.includes('linear-gradient'));
  const shouldUseInteractive = Boolean(other.onClick || role === 'button' || role === 'link');
  const shouldUseAccessible = color.includes('text.') || variant.startsWith('h') || maxLines;
  
  // Render appropriate styled component variant
  if (shouldUseGradient) {
    return (
      <GradientTypography data-testid="typography"
        {...baseProps}
        gradient={sx?.background as string}
      >
        {children}
      </GradientTypography>
    );
  }
  
  if (shouldUseInteractive) {
    return (
      <InteractiveTypography
        {...baseProps}
        interactive={true}
      >
        {children}
      </InteractiveTypography>
    );
  }
  
  if (shouldUseAccessible) {
    return (
      <AccessibleTypography {...baseProps}>
        {children}
      </AccessibleTypography>
    );
  }
  
  // Default styled typography
  return (
    <StyledTypography {...baseProps}>
      {children}
    </StyledTypography>
  );
});

TypographyComponent.displayName = 'Typography';

// Export memoized component for performance optimization
export const Typography = memo(TypographyComponent);

// Export additional utility components for specific use cases
export const HeadingTypography = memo(forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography
    {...props}
    ref={ref}
    variant={props.variant || 'h2'}
    component={props.component || 'h2'}
    gutterBottom={props.gutterBottom ?? true}
    fontWeight={props.fontWeight || 'medium'}
  />
)));

HeadingTypography.displayName = 'HeadingTypography';

export const BodyTypography = memo(forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography
    {...props}
    ref={ref}
    variant={props.variant || 'body1'}
    component={props.component || 'p'}
    paragraph={props.paragraph ?? true}
  />
)));

BodyTypography.displayName = 'BodyTypography';

export const CaptionTypography = memo(forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography
    {...props}
    ref={ref}
    variant="caption"
    color={props.color || 'text.secondary'}
    component={props.component || 'span'}
  />
)));

CaptionTypography.displayName = 'CaptionTypography';

export const LabelTypography = memo(forwardRef<HTMLElement, TypographyProps>((props, ref) => (
  <Typography
    {...props}
    ref={ref}
    variant="button"
    component={props.component || 'label'}
    fontWeight={props.fontWeight || 'medium'}
  />
)));

LabelTypography.displayName = 'LabelTypography';