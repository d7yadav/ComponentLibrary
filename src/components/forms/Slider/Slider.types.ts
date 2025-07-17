import type { Theme } from '@mui/material/styles';
import type { ReactNode, HTMLAttributes } from 'react';

// Slider variants
export type SliderVariant = 'continuous' | 'discrete';

// Size options
export type SliderSize = 'small' | 'medium' | 'large';

// Orientation options
export type SliderOrientation = 'horizontal' | 'vertical';

// Color options
export type SliderColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

// Track options
export type SliderTrack = 'normal' | 'inverted' | false;

// Mark definition
export interface SliderMark {
  value: number;
  label?: ReactNode;
}

// Value label format function
export type SliderValueLabelFormat = (value: number, index?: number) => ReactNode;

// Main component props
export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  // Basic props
  variant?: SliderVariant;
  size?: SliderSize;
  orientation?: SliderOrientation;
  color?: SliderColor;
  
  // Value props
  value?: number | number[];
  defaultValue?: number | number[];
  
  // Range props
  min?: number;
  max?: number;
  step?: number | null;
  
  // Behavior props
  disabled?: boolean;
  readOnly?: boolean;
  
  // Display props
  track?: SliderTrack;
  marks?: boolean | SliderMark[];
  valueLabelDisplay?: 'auto' | 'on' | 'off';
  valueLabelFormat?: SliderValueLabelFormat;
  
  // Event handlers
  onChange?: (value: number | number[], activeThumb?: number) => void;
  onChangeCommitted?: (value: number | number[]) => void;
  
  // Advanced props
  getAriaLabel?: (index: number) => string;
  getAriaValueText?: (value: number, index: number) => string;
  scale?: (value: number) => number;
  
  // Styling props
  className?: string;
  sx?: any;
  
  // Accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  
  // Custom components
  components?: {
    Root?: React.ElementType;
    Track?: React.ElementType;
    Rail?: React.ElementType;
    Thumb?: React.ElementType;
    Mark?: React.ElementType;
    MarkLabel?: React.ElementType;
    ValueLabel?: React.ElementType;
  };
  
  componentsProps?: {
    root?: object;
    track?: object;
    rail?: object;
    thumb?: object;
    mark?: object;
    markLabel?: object;
    valueLabel?: object;
  };
}

// Styled component props
export interface SliderStyleProps {
  theme: Theme;
  variant: SliderVariant;
  size: SliderSize;
  orientation: SliderOrientation;
  color: SliderColor;
  disabled?: boolean;
  track: SliderTrack;
}

export interface SliderRailStyleProps extends SliderStyleProps {
  length?: number;
}

export interface SliderTrackStyleProps extends SliderStyleProps {
  length?: number;
  offset?: number;
}

export interface SliderThumbStyleProps extends SliderStyleProps {
  active?: boolean;
  focused?: boolean;
  dragging?: boolean;
}

export interface SliderMarkStyleProps {
  theme: Theme;
  size: SliderSize;
  orientation: SliderOrientation;
  color: SliderColor;
  active?: boolean;
  disabled?: boolean;
}

export interface SliderMarkLabelStyleProps extends SliderMarkStyleProps {
  position: number;
}

export interface SliderValueLabelStyleProps {
  theme: Theme;
  size: SliderSize;
  color: SliderColor;
  open?: boolean;
  disabled?: boolean;
}

// Internal state types
export interface SliderState {
  value: number | number[];
  dragging: boolean;
  focused: boolean;
  activeThumb: number;
  valueLabelOpen: boolean;
}

// Constants export type
export interface SliderConstants {
  VARIANTS: Record<string, SliderVariant>;
  SIZES: Record<string, SliderSize>;
  ORIENTATIONS: Record<string, SliderOrientation>;
  COLORS: Record<string, SliderColor>;
  TRACKS: Record<string, SliderTrack | false>;
  DEFAULT_PROPS: Partial<SliderProps>;
  ACCESSIBILITY: {
    ROLES: Record<string, string>;
    ARIA_LABELS: Record<string, string>;
    KEYBOARD_SHORTCUTS: Record<string, string>;
  };
  DIMENSIONS: {
    TRACK_HEIGHT: Record<SliderSize, number>;
    THUMB_SIZE: Record<SliderSize, number>;
    MARK_SIZE: Record<SliderSize, number>;
  };
}