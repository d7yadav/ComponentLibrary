import type { 
  TypographyVariant, 
  TypographyColor, 
  TypographyAlign, 
  TypographyTransform, 
  TypographyWeight, 
  TypographyDisplay,
  TypographyComponent 
} from './Typography.types';

export const TYPOGRAPHY_VARIANTS: Record<TypographyVariant, TypographyVariant> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'body1',
  body2: 'body2',
  button: 'button',
  caption: 'caption',
  overline: 'overline',
  subtitle1: 'subtitle1',
  subtitle2: 'subtitle2',
} as const;

export const TYPOGRAPHY_COLORS: Record<TypographyColor, TypographyColor> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  quaternary: 'quaternary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  'text.primary': 'text.primary',
  'text.secondary': 'text.secondary',
  'text.disabled': 'text.disabled',
  inherit: 'inherit',
} as const;

export const TYPOGRAPHY_ALIGNMENTS: Record<TypographyAlign, TypographyAlign> = {
  inherit: 'inherit',
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
} as const;

export const TYPOGRAPHY_TRANSFORMS: Record<TypographyTransform, TypographyTransform> = {
  none: 'none',
  capitalize: 'capitalize',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  initial: 'initial',
  inherit: 'inherit',
} as const;

export const TYPOGRAPHY_WEIGHTS: Record<string, TypographyWeight> = {
  light: 'light',
  regular: 'regular',
  medium: 'medium',
  bold: 'bold',
  300: 300,
  400: 400,
  500: 500,
  700: 700,
} as const;

export const TYPOGRAPHY_DISPLAYS: Record<TypographyDisplay, TypographyDisplay> = {
  initial: 'initial',
  block: 'block',
  inline: 'inline',
  'inline-block': 'inline-block',
  none: 'none',
} as const;

export const TYPOGRAPHY_COMPONENTS: Record<TypographyComponent, TypographyComponent> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  div: 'div',
  label: 'label',
  caption: 'caption',
  figcaption: 'figcaption',
  strong: 'strong',
  em: 'em',
  small: 'small',
  mark: 'mark',
  del: 'del',
  ins: 'ins',
  sub: 'sub',
  sup: 'sup',
} as const;

export const TYPOGRAPHY_VARIANT_MAPPINGS: Record<TypographyVariant, TypographyComponent> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  button: 'span',
  caption: 'span',
  overline: 'span',
  subtitle1: 'h6',
  subtitle2: 'h6',
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  xs: '(max-width: 599px)',
  sm: '(min-width: 600px) and (max-width: 959px)',
  md: '(min-width: 960px) and (max-width: 1279px)',
  lg: '(min-width: 1280px) and (max-width: 1919px)',
  xl: '(min-width: 1920px)',
} as const;

export const TYPOGRAPHY_SCALE_FACTORS = {
  xs: 0.85,  // Mobile - smaller text
  sm: 0.9,   // Tablet - slightly smaller
  md: 1.0,   // Desktop - base size
  lg: 1.05,  // Large desktop - slightly larger
  xl: 1.1,   // Extra large - larger text
} as const;

export const ACCESSIBILITY_CONSTANTS = {
  minContrastRatio: 4.5,           // WCAG AA standard
  minContrastRatioLarge: 3.0,      // WCAG AA for large text (18pt+)
  minTouchTarget: 44,              // Minimum touch target size
  maxLineLength: 80,               // Maximum characters per line for readability
  optimalLineLength: 65,           // Optimal characters per line
  lineHeightMin: 1.2,              // Minimum line height
  lineHeightOptimal: 1.5,          // Optimal line height
  focusOutlineWidth: 2,            // Focus outline width
  focusOutlineOffset: 2,           // Focus outline offset
  readingSpeedWpm: 200,            // Average reading speed (words per minute)
} as const;

export const TRUNCATION_DEFAULTS = {
  maxLinesDefault: 3,              // Default max lines for truncation
  ellipsis: '...',                 // Ellipsis character
  fadeOutHeight: '1.2em',          // Height of fade out effect
} as const;

export const FONT_FEATURE_SETTINGS = {
  ligatures: '"liga" 1, "clig" 1',                    // Common ligatures
  numbers: '"lnum" 1, "tnum" 1',                      // Lining, tabular numbers
  kerning: '"kern" 1',                                // Kerning
  opentype: '"liga" 1, "kern" 1, "clig" 1',         // Combined OpenType features
  readability: '"liga" 1, "kern" 1, "clig" 1, "calt" 1', // Optimized for readability
} as const;

export const ANIMATION_CONSTANTS = {
  duration: {
    fast: '0.15s',
    normal: '0.25s',
    slow: '0.4s',
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerated: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerated: 'cubic-bezier(0.4, 0.0, 1, 1)',
  },
  properties: ['color', 'transform', 'opacity', 'filter'],
} as const;

export const GRADIENT_PRESETS = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  warning: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  error: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  info: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  subtle: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
} as const;

export const TYPOGRAPHY_SEMANTIC_ROLES = {
  heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  body: ['body1', 'body2'],
  labels: ['button', 'caption', 'overline'],
  subtitles: ['subtitle1', 'subtitle2'],
} as const;

export const DEFAULT_PROPS = {
  variant: 'body1' as TypographyVariant,
  color: 'text.primary' as TypographyColor,
  align: 'inherit' as TypographyAlign,
  textTransform: 'none' as TypographyTransform,
  fontWeight: 'regular' as TypographyWeight,
  display: 'initial' as TypographyDisplay,
  noWrap: false,
  paragraph: false,
  gutterBottom: false,
  responsive: false,
} as const;