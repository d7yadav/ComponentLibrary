import type { 
  PaperVariant, 
  PaperCorners, 
  PaperSurface, 
  PaperSize, 
  PaperGradient,
  PaperSizeConfig,
  PaperCornerConfig,
  PaperSurfaceConfig,
  PaperGradientConfig
} from './Paper.types';

export const PAPER_VARIANTS: Record<PaperVariant, PaperVariant> = {
  elevation: 'elevation',
  outlined: 'outlined',
  filled: 'filled',
  glass: 'glass',
  gradient: 'gradient',
} as const;

export const PAPER_CORNERS: Record<PaperCorners, PaperCorners> = {
  none: 'none',
  small: 'small',
  medium: 'medium',
  large: 'large',
  circular: 'circular',
} as const;

export const PAPER_SURFACES: Record<PaperSurface, PaperSurface> = {
  flat: 'flat',
  concave: 'concave',
  convex: 'convex',
} as const;

export const PAPER_SIZES: Record<PaperSize, PaperSize> = {
  compact: 'compact',
  comfortable: 'comfortable',
  spacious: 'spacious',
} as const;

export const PAPER_GRADIENTS: Record<PaperGradient, PaperGradient> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  quaternary: 'quaternary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
} as const;

export const PAPER_SIZE_CONFIGS: Record<PaperSize, PaperSizeConfig> = {
  compact: {
    padding: '8px',
    margin: '4px',
    borderRadius: '4px',
  },
  comfortable: {
    padding: '16px',
    margin: '8px',
    borderRadius: '8px',
  },
  spacious: {
    padding: '24px',
    margin: '12px',
    borderRadius: '12px',
  },
} as const;

export const PAPER_CORNER_CONFIGS: Record<PaperCorners, PaperCornerConfig> = {
  none: {
    borderRadius: '0px',
  },
  small: {
    borderRadius: '4px',
  },
  medium: {
    borderRadius: '8px',
  },
  large: {
    borderRadius: '16px',
  },
  circular: {
    borderRadius: '50%',
  },
} as const;

export const PAPER_SURFACE_CONFIGS: Record<PaperSurface, PaperSurfaceConfig> = {
  flat: {
    boxShadow: 'none',
    background: 'flat',
  },
  concave: {
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    background: 'concave',
    borderStyle: 'inset',
  },
  convex: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    background: 'convex',
    borderStyle: 'outset',
  },
} as const;

export const PAPER_GRADIENT_CONFIGS: Record<PaperGradient, PaperGradientConfig> = {
  primary: {
    background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%)',
    fallbackColor: 'var(--primary-50)',
  },
  secondary: {
    background: 'linear-gradient(135deg, var(--secondary-50) 0%, var(--secondary-100) 100%)',
    fallbackColor: 'var(--secondary-50)',
  },
  tertiary: {
    background: 'linear-gradient(135deg, var(--tertiary-50) 0%, var(--tertiary-100) 100%)',
    fallbackColor: 'var(--tertiary-50)',
  },
  quaternary: {
    background: 'linear-gradient(135deg, var(--quaternary-50) 0%, var(--quaternary-100) 100%)',
    fallbackColor: 'var(--quaternary-50)',
  },
  success: {
    background: 'linear-gradient(135deg, var(--success-50) 0%, var(--success-100) 100%)',
    fallbackColor: 'var(--success-50)',
  },
  warning: {
    background: 'linear-gradient(135deg, var(--warning-50) 0%, var(--warning-100) 100%)',
    fallbackColor: 'var(--warning-50)',
  },
  error: {
    background: 'linear-gradient(135deg, var(--error-50) 0%, var(--error-100) 100%)',
    fallbackColor: 'var(--error-50)',
  },
  info: {
    background: 'linear-gradient(135deg, var(--info-50) 0%, var(--info-100) 100%)',
    fallbackColor: 'var(--info-50)',
  },
} as const;

export const PAPER_GRADIENT_CONFIGS_DARK: Record<PaperGradient, PaperGradientConfig> = {
  primary: {
    background: 'linear-gradient(135deg, var(--primary-900) 0%, var(--primary-800) 100%)',
    fallbackColor: 'var(--primary-900)',
  },
  secondary: {
    background: 'linear-gradient(135deg, var(--secondary-900) 0%, var(--secondary-800) 100%)',
    fallbackColor: 'var(--secondary-900)',
  },
  tertiary: {
    background: 'linear-gradient(135deg, var(--tertiary-900) 0%, var(--tertiary-800) 100%)',
    fallbackColor: 'var(--tertiary-900)',
  },
  quaternary: {
    background: 'linear-gradient(135deg, var(--quaternary-900) 0%, var(--quaternary-800) 100%)',
    fallbackColor: 'var(--quaternary-900)',
  },
  success: {
    background: 'linear-gradient(135deg, var(--success-900) 0%, var(--success-800) 100%)',
    fallbackColor: 'var(--success-900)',
  },
  warning: {
    background: 'linear-gradient(135deg, var(--warning-900) 0%, var(--warning-800) 100%)',
    fallbackColor: 'var(--warning-900)',
  },
  error: {
    background: 'linear-gradient(135deg, var(--error-900) 0%, var(--error-800) 100%)',
    fallbackColor: 'var(--error-900)',
  },
  info: {
    background: 'linear-gradient(135deg, var(--info-900) 0%, var(--info-800) 100%)',
    fallbackColor: 'var(--info-900)',
  },
} as const;

export const ELEVATION_SHADOWS = {
  0: 'none',
  1: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  2: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  3: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
  4: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  5: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
  6: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  7: '0px 4px 5px -2px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12)',
  8: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
  9: '0px 5px 6px -3px rgba(0,0,0,0.2), 0px 9px 12px 1px rgba(0,0,0,0.14), 0px 3px 16px 2px rgba(0,0,0,0.12)',
  10: '0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
  11: '0px 6px 7px -4px rgba(0,0,0,0.2), 0px 11px 15px 1px rgba(0,0,0,0.14), 0px 4px 20px 3px rgba(0,0,0,0.12)',
  12: '0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)',
  13: '0px 7px 8px -4px rgba(0,0,0,0.2), 0px 13px 19px 2px rgba(0,0,0,0.14), 0px 5px 24px 4px rgba(0,0,0,0.12)',
  14: '0px 7px 9px -4px rgba(0,0,0,0.2), 0px 14px 21px 2px rgba(0,0,0,0.14), 0px 5px 26px 4px rgba(0,0,0,0.12)',
  15: '0px 8px 9px -5px rgba(0,0,0,0.2), 0px 15px 22px 2px rgba(0,0,0,0.14), 0px 6px 28px 5px rgba(0,0,0,0.12)',
  16: '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
  17: '0px 8px 11px -5px rgba(0,0,0,0.2), 0px 17px 26px 2px rgba(0,0,0,0.14), 0px 6px 32px 5px rgba(0,0,0,0.12)',
  18: '0px 9px 11px -5px rgba(0,0,0,0.2), 0px 18px 28px 2px rgba(0,0,0,0.14), 0px 7px 34px 6px rgba(0,0,0,0.12)',
  19: '0px 9px 12px -6px rgba(0,0,0,0.2), 0px 19px 29px 2px rgba(0,0,0,0.14), 0px 7px 36px 6px rgba(0,0,0,0.12)',
  20: '0px 10px 13px -6px rgba(0,0,0,0.2), 0px 20px 31px 3px rgba(0,0,0,0.14), 0px 8px 38px 7px rgba(0,0,0,0.12)',
  21: '0px 10px 13px -6px rgba(0,0,0,0.2), 0px 21px 33px 3px rgba(0,0,0,0.14), 0px 8px 40px 7px rgba(0,0,0,0.12)',
  22: '0px 10px 14px -6px rgba(0,0,0,0.2), 0px 22px 35px 3px rgba(0,0,0,0.14), 0px 8px 42px 7px rgba(0,0,0,0.12)',
  23: '0px 11px 14px -7px rgba(0,0,0,0.2), 0px 23px 36px 3px rgba(0,0,0,0.14), 0px 9px 44px 8px rgba(0,0,0,0.12)',
  24: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const ANIMATION_EASINGS = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

export const GLASS_MORPHISM_CONFIG = {
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
} as const;

export const GLASS_MORPHISM_CONFIG_DARK = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
} as const;

export const PRINT_STYLES = {
  backgroundColor: 'white !important',
  color: 'black !important',
  boxShadow: 'none !important',
  border: '1px solid #ccc !important',
  backgroundImage: 'none !important',
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  xs: '(max-width: 599px)',
  sm: '(min-width: 600px) and (max-width: 959px)',
  md: '(min-width: 960px) and (max-width: 1279px)',
  lg: '(min-width: 1280px) and (max-width: 1919px)',
  xl: '(min-width: 1920px)',
} as const;

export const ACCESSIBILITY_CONSTANTS = {
  interactiveRole: 'button',
  cardRole: 'region',
  articleRole: 'article',
  sectionRole: 'section',
  minClickTarget: '44px',
  focusOutlineColor: 'var(--primary-500)',
  focusOutlineWidth: '2px',
  focusOutlineStyle: 'solid',
  focusOutlineOffset: '2px',
} as const;

export const Z_INDEX_LEVELS = {
  base: 0,
  elevated: 1,
  overlay: 10,
  modal: 100,
  tooltip: 1000,
} as const;