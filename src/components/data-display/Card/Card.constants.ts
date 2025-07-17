import type { CardVariant, CardElevation, CardSize, CardOrientation } from './Card.types';

export const CARD_VARIANTS: Record<CardVariant, CardVariant> = {
  elevated: 'elevated',
  outlined: 'outlined',
  filled: 'filled',
  glass: 'glass',
  gradient: 'gradient',
  interactive: 'interactive',
} as const;

export const CARD_ELEVATIONS: Record<CardElevation, CardElevation> = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  6: 6,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
} as const;

export const CARD_SIZES: Record<CardSize, CardSize> = {
  compact: 'compact',
  comfortable: 'comfortable',
  spacious: 'spacious',
} as const;

export const CARD_ORIENTATIONS: Record<CardOrientation, CardOrientation> = {
  vertical: 'vertical',
  horizontal: 'horizontal',
} as const;

export const CARD_SIZE_CONFIGS = {
  compact: {
    padding: '12px',
    headerPadding: '12px 12px 8px',
    contentPadding: '8px 12px',
    actionsPadding: '8px 12px 12px',
    borderRadius: 8,
    gap: 8,
  },
  comfortable: {
    padding: '16px',
    headerPadding: '16px 16px 12px',
    contentPadding: '12px 16px',
    actionsPadding: '12px 16px 16px',
    borderRadius: 12,
    gap: 12,
  },
  spacious: {
    padding: '24px',
    headerPadding: '24px 24px 16px',
    contentPadding: '16px 24px',
    actionsPadding: '16px 24px 24px',
    borderRadius: 16,
    gap: 16,
  },
} as const;

export const CARD_ELEVATION_SHADOWS = {
  0: 'none',
  1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  2: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  3: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  4: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
  6: '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',
  8: '0 25px 50px rgba(0, 0, 0, 0.25)',
  12: '0 35px 70px rgba(0, 0, 0, 0.25)',
  16: '0 45px 90px rgba(0, 0, 0, 0.25)',
  24: '0 60px 120px rgba(0, 0, 0, 0.30)',
} as const;

export const CARD_INTERACTION_STATES = {
  hover: {
    elevationIncrease: 2,
    scaleTransform: 1.02,
    transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  active: {
    scaleTransform: 0.98,
    transition: 'all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  focus: {
    outlineWidth: 2,
    outlineOffset: 2,
  },
} as const;

export const CARD_MEDIA_DEFAULTS = {
  height: 200,
  objectFit: 'cover' as const,
  loading: 'lazy' as const,
  borderRadius: {
    top: true,
    bottom: false,
  },
} as const;

export const GLASS_MORPHISM_CARD_CONFIG = {
  backdropFilter: 'blur(12px)',
  backdropFilterFallback: 'blur(8px)',
  borderOpacity: 0.15,
  backgroundOpacity: 0.08,
  saturate: 1.8,
} as const;

export const ACCESSIBILITY_CONSTANTS = {
  minTouchTarget: 44, // Minimum touch target size in pixels
  focusOutlineWidth: 2,
  focusOutlineOffset: 2,
  interactiveRole: 'button',
  cardRole: 'article',
} as const;

export const CARD_ANIMATION_DURATIONS = {
  hover: '0.2s',
  press: '0.1s',
  focus: '0.15s',
  loading: '1.5s',
} as const;

export const CARD_ANIMATION_EASINGS = {
  spring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;