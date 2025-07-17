import type { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';


// Base variant types
export type ChipVariant = 
  | 'filled' 
  | 'outlined' 
  | 'soft' 
  | 'gradient' 
  | 'glass';

// Size variants
export type ChipSize = 'small' | 'medium' | 'large';

// Color variants from enhanced theme
export type ChipColor = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'quaternary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'default';

// Shape variants
export type ChipShape = 'rounded' | 'square' | 'circular';

// Avatar/icon position
export type ChipIconPosition = 'start' | 'end';

// Chip click behavior
export interface ChipClickConfig {
  /** Enable clickable behavior */
  clickable?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Custom href for link behavior */
  href?: string;
  /** Link target */
  target?: string;
  /** Link rel attribute */
  rel?: string;
}

// Chip delete behavior
export interface ChipDeleteConfig {
  /** Enable delete functionality */
  deletable?: boolean;
  /** Delete handler */
  onDelete?: (event: SyntheticEvent) => void;
  /** Custom delete icon */
  deleteIcon?: ReactNode;
  /** Delete tooltip text */
  deleteTooltip?: string;
}

// Avatar/icon configuration
export interface ChipIconConfig {
  /** Avatar or icon element */
  avatar?: ReactNode;
  /** Icon element */
  icon?: ReactNode;
  /** Icon position */
  iconPosition?: ChipIconPosition;
}

// Animation configuration
export interface ChipAnimationConfig {
  /** Enable hover animations */
  enableHover?: boolean;
  /** Enable press animations */
  enablePress?: boolean;
  /** Enable focus animations */
  enableFocus?: boolean;
  /** Animation duration in ms */
  duration?: number;
}

// Accessibility configuration
export interface ChipAccessibilityConfig {
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** Role override */
  role?: string;
  /** Tab index */
  tabIndex?: number;
}

export interface ChipProps extends 
  Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'onClick'>,
  ChipClickConfig,
  ChipDeleteConfig,
  ChipIconConfig,
  ChipAnimationConfig,
  ChipAccessibilityConfig {
  
  // Core props
  /** Chip variant style */
  variant?: ChipVariant;
  
  /** Chip size */
  size?: ChipSize;
  
  /** Chip color theme */
  color?: ChipColor;
  
  /** Chip shape */
  shape?: ChipShape;
  
  /** Chip label text */
  label: ReactNode;
  
  // State props
  /** Disabled state */
  disabled?: boolean;
  
  /** Selected state for filter chips */
  selected?: boolean;
  
  // Styling props
  /** Custom class name */
  className?: string;
  
  /** Custom inline styles */
  style?: React.CSSProperties;
  
  /** Enable elevation/shadow effects */
  elevation?: boolean;
  
  /** Custom tooltip text */
  tooltip?: string;
  
  /** Custom test ID for testing */
  'data-testid'?: string;
  
  // Advanced features
  /** Badge/notification count */
  badge?: number | string;
  
  /** Badge color */
  badgeColor?: ChipColor;
  
  /** Loading state */
  loading?: boolean;
  
  /** Custom loading icon */
  loadingIcon?: ReactNode;
}

export interface StyledChipProps {
  $variant: ChipVariant;
  $size: ChipSize;
  $color: ChipColor;
  $shape: ChipShape;
  $disabled: boolean;
  $selected: boolean;
  $clickable: boolean;
  $deletable: boolean;
  $elevation: boolean;
  $loading: boolean;
}

export interface StyledChipLabelProps {
  $size: ChipSize;
  $hasIcon: boolean;
  $hasAvatar: boolean;
  $deletable: boolean;
}

export interface StyledChipIconProps {
  $size: ChipSize;
  $position: ChipIconPosition;
  $color: ChipColor;
}

export interface StyledChipDeleteProps {
  $size: ChipSize;
  $color: ChipColor;
  $disabled: boolean;
}

export interface ChipState {
  /** Current hover state */
  isHovered: boolean;
  
  /** Current focus state */
  isFocused: boolean;
  
  /** Current press state */
  isPressed: boolean;
  
  /** Current loading state */
  isLoading: boolean;
  
  /** Current mounted state */
  isMounted: boolean;
}

export interface ChipRef {
  /** Focus the chip */
  focus: () => void;
  
  /** Blur the chip */
  blur: () => void;
  
  /** Click the chip programmatically */
  click: () => void;
  
  /** Get chip element */
  getElement: () => HTMLDivElement | null;
  
  /** Trigger delete action */
  delete: () => void;
}