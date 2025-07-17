import type { ButtonHTMLAttributes, ReactNode } from 'react';


// Base variant types
export type IconButtonVariant = 
  | 'filled' 
  | 'outlined' 
  | 'text' 
  | 'gradient' 
  | 'glass';

// Size variants
export type IconButtonSize = 'small' | 'medium' | 'large' | 'xl';

// Color variants from enhanced theme
export type IconButtonColor = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'quaternary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'inherit';

// Shape variants
export type IconButtonShape = 'circular' | 'rounded' | 'square';
// Loading state configuration
export interface IconButtonLoadingConfig {
  /** Show loading state */
  loading?: boolean;
  /** Custom loading icon */
  loadingIcon?: ReactNode;
  /** Loading text for accessibility */
  loadingText?: string;
}

// Animation configuration
export interface IconButtonAnimationConfig {
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
export interface IconButtonAccessibilityConfig {
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** ARIA pressed state for toggle buttons */
  'aria-pressed'?: boolean;
  /** Role override */
  role?: string;
}

export interface IconButtonProps extends 
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'size'>,
  IconButtonLoadingConfig,
  IconButtonAnimationConfig,
  IconButtonAccessibilityConfig {
  
  // Core props
  /** Button variant style */
  variant?: IconButtonVariant;
  
  /** Button size */
  size?: IconButtonSize;
  
  /** Button color theme */
  color?: IconButtonColor;
  
  /** Button shape */
  shape?: IconButtonShape;
  
  /** Icon to display */
  children: ReactNode;
  
  // State props
  /** Disabled state */
  disabled?: boolean;
  
  /** Selected/active state for toggle buttons */
  selected?: boolean;
  
  // Interaction props
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Mouse enter handler */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Mouse leave handler */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Focus handler */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  
  // Advanced styling
  /** Custom class name */
  className?: string;
  
  /** Custom inline styles */
  style?: React.CSSProperties;
  
  /** Enable elevation/shadow effects */
  elevation?: boolean;
  
  /** Custom tooltip text */
  tooltip?: string;
  
  /** Enable ripple effect */
  disableRipple?: boolean;
  
  /** Custom test ID for testing */
  'data-testid'?: string;
}

export interface StyledIconButtonProps {
  $variant: IconButtonVariant;
  $size: IconButtonSize;
  $color: IconButtonColor;
  $shape: IconButtonShape;
  $disabled: boolean;
  $selected: boolean;
  $loading: boolean;
  $elevation: boolean;
  $disableRipple: boolean;
}

export interface IconButtonState {
  /** Current hover state */
  isHovered: boolean;
  
  /** Current focus state */
  isFocused: boolean;
  
  /** Current press state */
  isPressed: boolean;
  
  /** Current loading state */
  isLoading: boolean;
}

export interface IconButtonRef {
  /** Focus the button */
  focus: () => void;
  
  /** Blur the button */
  blur: () => void;
  
  /** Click the button programmatically */
  click: () => void;
  
  /** Get button element */
  getElement: () => HTMLButtonElement | null;
}