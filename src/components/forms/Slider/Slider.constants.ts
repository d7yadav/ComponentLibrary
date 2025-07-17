
import type {
  SliderVariant,
  SliderSize,
  SliderOrientation,
  SliderColor,
  SliderTrack,
  SliderConstants
} from './Slider.types';

// Component variants
export const SLIDER_VARIANTS: Record<string, SliderVariant> = {
  continuous: 'continuous',
  discrete: 'discrete',
} as const;

// Component sizes
export const SLIDER_SIZES: Record<string, SliderSize> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

// Orientation options
export const SLIDER_ORIENTATIONS: Record<string, SliderOrientation> = {
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const;

// Color options
export const SLIDER_COLORS: Record<string, SliderColor> = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
} as const;

// Track options
export const SLIDER_TRACKS: Record<string, SliderTrack | false> = {
  normal: 'normal',
  inverted: 'inverted',
  false: false,
} as const;

// Default component props
export const DEFAULT_SLIDER_PROPS = {
  variant: SLIDER_VARIANTS.continuous,
  size: SLIDER_SIZES.medium,
  orientation: SLIDER_ORIENTATIONS.horizontal,
  color: SLIDER_COLORS.primary,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  readOnly: false,
  track: SLIDER_TRACKS.normal,
  marks: false,
  valueLabelDisplay: 'off',
} as const;

// Accessibility constants
export const ACCESSIBILITY_CONSTANTS = {
  ROLES: {
    SLIDER: 'slider',
    PRESENTATION: 'presentation',
  },
  ARIA_LABELS: {
    SLIDER: 'Slider',
    RANGE_SLIDER: 'Range slider',
    MINIMUM: 'Minimum',
    MAXIMUM: 'Maximum',
    VALUE: 'Value',
  },
  KEYBOARD_SHORTCUTS: {
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
    HOME: 'Home',
    END: 'End',
  },
} as const;

// Dimension constants
export const DIMENSION_CONSTANTS = {
  TRACK_HEIGHT: {
    small: 2,
    medium: 3,
    large: 4,
  },
  THUMB_SIZE: {
    small: 16,
    medium: 20,
    large: 24,
  },
  MARK_SIZE: {
    small: 1,
    medium: 2,
    large: 3,
  },
  VALUE_LABEL_HEIGHT: {
    small: 24,
    medium: 28,
    large: 32,
  },
  PADDING: {
    small: 8,
    medium: 12,
    large: 16,
  },
} as const;

// Step calculation constants
export const STEP_CONSTANTS = {
  LARGE_STEP_MULTIPLIER: 10,
  PRECISION_THRESHOLD: 0.000001,
  DEFAULT_PRECISION: 3,
} as const;

// Animation constants
export const ANIMATION_CONSTANTS = {
  DURATION: {
    THUMB_TRANSITION: 150,
    VALUE_LABEL_TRANSITION: 200,
    MARK_TRANSITION: 100,
  },
  EASING: {
    EASE_OUT: 'cubic-bezier(0.0, 0, 0.2, 1)',
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Utility functions
export const SLIDER_UTILS = {
  clamp: (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  },

  roundToStep: (value: number, step: number, min: number): number => {
    if (step === null || step <= 0) return value;
    
    const steppedValue = Math.round((value - min) / step) * step + min;
    
    // Handle floating point precision issues
    const precision = STEP_CONSTANTS.DEFAULT_PRECISION;
    return Math.round(steppedValue * Math.pow(10, precision)) / Math.pow(10, precision);
  },

  valueToPercent: (value: number, min: number, max: number): number => {
    return ((value - min) * 100) / (max - min);
  },

  percentToValue: (percent: number, min: number, max: number): number => {
    return (max - min) * percent / 100 + min;
  },

  findClosest: (values: number[], target: number): number => {
    return values.reduce((prev, curr) => 
      Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
    );
  },

  isEqual: (a: number, b: number): boolean => {
    return Math.abs(a - b) < STEP_CONSTANTS.PRECISION_THRESHOLD;
  },

  isValidValue: (value: number, min: number, max: number): boolean => {
    return !isNaN(value) && isFinite(value) && value >= min && value <= max;
  },

  getLargeStep: (step: number | null, min: number, max: number): number => {
    if (step === null) {
      return (max - min) / 10;
    }
    return step * STEP_CONSTANTS.LARGE_STEP_MULTIPLIER;
  },

  getNextValue: (
    currentValue: number, 
    direction: 'up' | 'down' | 'large-up' | 'large-down' | 'home' | 'end',
    step: number | null,
    min: number,
    max: number
  ): number => {
    switch (direction) {
      case 'up':
        return SLIDER_UTILS.roundToStep(
          SLIDER_UTILS.clamp(currentValue + (step || 1), min, max),
          step || 1,
          min
        );
      case 'down':
        return SLIDER_UTILS.roundToStep(
          SLIDER_UTILS.clamp(currentValue - (step || 1), min, max),
          step || 1,
          min
        );
      case 'large-up':
        return SLIDER_UTILS.roundToStep(
          SLIDER_UTILS.clamp(currentValue + SLIDER_UTILS.getLargeStep(step, min, max), min, max),
          step || 1,
          min
        );
      case 'large-down':
        return SLIDER_UTILS.roundToStep(
          SLIDER_UTILS.clamp(currentValue - SLIDER_UTILS.getLargeStep(step, min, max), min, max),
          step || 1,
          min
        );
      case 'home':
        return min;
      case 'end':
        return max;
      default:
        return currentValue;
    }
  },

  formatValues: (values: number | number[]): string => {
    if (Array.isArray(values)) {
      return values.map(v => v.toString()).join(', ');
    }
    return values.toString();
  },

  normalizeValue: (value: number | number[] | undefined, isRange: boolean): number | number[] => {
    if (value === undefined) {
      return isRange ? [0, 100] : 0;
    }
    
    if (isRange && !Array.isArray(value)) {
      return [value, value];
    }
    
    if (!isRange && Array.isArray(value)) {
      return value[0] || 0;
    }
    
    return value;
  },
} as const;

// Export all constants as a single object
export const SLIDER_CONSTANTS: SliderConstants = {
  VARIANTS: SLIDER_VARIANTS,
  SIZES: SLIDER_SIZES,
  ORIENTATIONS: SLIDER_ORIENTATIONS,
  COLORS: SLIDER_COLORS,
  TRACKS: SLIDER_TRACKS,
  DEFAULT_PROPS: DEFAULT_SLIDER_PROPS,
  ACCESSIBILITY: ACCESSIBILITY_CONSTANTS,
  DIMENSIONS: DIMENSION_CONSTANTS,
} as const;