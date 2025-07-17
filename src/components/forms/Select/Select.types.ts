import type { ReactNode} from 'react';


// Base variant types
export type SelectVariant = 
  | 'filled' 
  | 'outlined' 
  | 'standard';

// Size variants
export type SelectSize = 'small' | 'medium' | 'large';

// Color variants from enhanced theme
export type SelectColor = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'quaternary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';

// Selection mode
export type SelectMode = 'single' | 'multiple';

// Option value type
export type SelectValue = string | number | boolean | null;

// Option item interface
export interface SelectOption {
  /** Option value */
  value: SelectValue;
  /** Option display label */
  label: ReactNode;
  /** Option disabled state */
  disabled?: boolean;
  /** Option group */
  group?: string;
  /** Option icon */
  icon?: ReactNode;
  /** Option description */
  description?: string;
  /** Custom data attributes */
  data?: Record<string, unknown>;
}

// Option group interface
export interface SelectOptionGroup {
  /** Group label */
  label: string;
  /** Group options */
  options: SelectOption[];
  /** Group disabled state */
  disabled?: boolean;
}

// Validation configuration
export interface SelectValidationConfig {
  /** Required field validation */
  required?: boolean;
  /** Custom validation function */
  validate?: (value: SelectValue | SelectValue[]) => string | null;
  /** Validation error message */
  error?: string;
  /** Validation success message */
  success?: string;
  /** Validation warning message */
  warning?: string;
}

// Loading state configuration
export interface SelectLoadingConfig {
  /** Show loading state */
  loading?: boolean;
  /** Loading text */
  loadingText?: string;
  /** Custom loading component */
  loadingComponent?: ReactNode;
}

// Search/filter configuration
export interface SelectSearchConfig {
  /** Enable search functionality */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Custom search filter function */
  filterOption?: (option: SelectOption, searchValue: string) => boolean;
  /** No results message */
  noResultsText?: string;
}

// Animation configuration
export interface SelectAnimationConfig {
  /** Enable dropdown animations */
  enableAnimations?: boolean;
  /** Animation duration in ms */
  duration?: number;
  /** Animation easing */
  easing?: string;
}

// Accessibility configuration
export interface SelectAccessibilityConfig {
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** ARIA labelled by */
  'aria-labelledby'?: string;
  /** Custom aria attributes */
  'aria-expanded'?: boolean;
  /** Role override */
  role?: string;
}

export interface SelectProps extends 
  Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'onChange' | 'size' | 'defaultValue'>,
  SelectValidationConfig,
  SelectLoadingConfig,
  SelectSearchConfig,
  SelectAnimationConfig {
  
  // Core props
  /** Select variant style */
  variant?: SelectVariant;
  
  /** Select size */
  size?: SelectSize;
  
  /** Select color theme */
  color?: SelectColor;
  
  /** Selection mode */
  mode?: SelectMode;
  
  /** Field label */
  label?: ReactNode;
  
  /** Helper text */
  helperText?: ReactNode;
  
  /** Placeholder text */
  placeholder?: string;
  
  // Value and options
  /** Current value(s) */
  value?: SelectValue | SelectValue[];
  
  /** Default value(s) */
  defaultValue?: SelectValue | SelectValue[];
  
  /** Available options */
  options?: SelectOption[];
  
  /** Grouped options */
  groups?: SelectOptionGroup[];
  
  // State props
  /** Disabled state */
  disabled?: boolean;
  
  /** Read-only state */
  readOnly?: boolean;
  
  /** Auto-focus on mount */
  autoFocus?: boolean;
  
  // Interaction props
  /** Value change handler */
  onChange?: (value: SelectValue | SelectValue[], option?: SelectOption | SelectOption[]) => void;
  
  /** Focus handler */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  
  /** Blur handler */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  
  /** Search change handler */
  onSearchChange?: (searchValue: string) => void;
  
  /** Dropdown open handler */
  onOpen?: () => void;
  
  /** Dropdown close handler */
  onClose?: () => void;
  
  // Styling props
  /** Custom class name */
  className?: string;
  
  /** Custom inline styles */
  style?: React.CSSProperties;
  
  /** Full width */
  fullWidth?: boolean;
  
  /** Custom dropdown width */
  dropdownWidth?: number | string;
  
  /** Custom dropdown max height */
  maxHeight?: number;
  
  /** Enable virtualization for large lists */
  virtualized?: boolean;
  
  // Icon props
  /** Start icon */
  startIcon?: ReactNode;
  
  /** Clear button */
  clearable?: boolean;
  
  /** Custom clear icon */
  clearIcon?: ReactNode;
  
  /** Custom dropdown icon */
  dropdownIcon?: ReactNode;
  
  // Advanced features
  /** Allow creation of new options */
  creatable?: boolean;
  
  /** Create option text */
  createText?: string;
  
  /** Create option handler */
  onCreate?: (value: string) => SelectOption | Promise<SelectOption>;
  
  /** Custom test ID for testing */
  'data-testid'?: string;
  
  /** Aria label */
  'aria-label'?: string;
  
  /** Aria described by */
  'aria-describedby'?: string;
  
  /** Aria labelled by */
  'aria-labelledby'?: string;
}

export interface StyledSelectProps {
  $variant: SelectVariant;
  $size: SelectSize;
  $color: SelectColor;
  $disabled: boolean;
  $error: boolean;
  $focused: boolean;
  $fullWidth: boolean;
  $hasStartIcon: boolean;
  $loading: boolean;
}

export interface StyledSelectInputProps {
  $variant: SelectVariant;
  $size: SelectSize;
  $hasValue: boolean;
  $hasStartIcon: boolean;
}

export interface StyledSelectLabelProps {
  $variant: SelectVariant;
  $size: SelectSize;
  $color: SelectColor;
  $focused: boolean;
  $hasValue: boolean;
  $error: boolean;
  $disabled: boolean;
}

export interface StyledSelectDropdownProps {
  $maxHeight: number;
  $width?: number | string;
  $enableAnimations: boolean;
}

export interface StyledSelectOptionProps {
  $selected: boolean;
  $disabled: boolean;
  $focused: boolean;
  $size: SelectSize;
}

export interface StyledSelectDropdownIconProps {
  $size: SelectSize;
  $isOpen: boolean;
  $disabled: boolean;
}

export interface StyledSelectStartIconProps {
  $size: SelectSize;
}

export interface StyledSelectSearchProps {
  $size: SelectSize;
}

export interface StyledSelectHelperTextProps {
  $error: boolean;
  $size: SelectSize;
  $success: boolean;
  $warning: boolean;
}

export interface StyledSelectLoadingSpinnerProps {
  $size: SelectSize;
}

export interface SelectState {
  /** Current open state */
  isOpen: boolean;
  
  /** Current focus state */
  isFocused: boolean;
  
  /** Current search value */
  searchValue: string;
  
  /** Current focused option index */
  focusedOptionIndex: number;
  
  /** Current loading state */
  isLoading: boolean;
  
  /** Filtered options */
  filteredOptions: SelectOption[];
  
  /** Validation error */
  validationError?: string;
}

export interface SelectRef {
  /** Focus the select */
  focus: () => void;
  
  /** Blur the select */
  blur: () => void;
  
  /** Open the dropdown */
  open: () => void;
  
  /** Close the dropdown */
  close: () => void;
  
  /** Clear the selection */
  clear: () => void;
  
  /** Get select element */
  getElement: () => HTMLDivElement | null;
  
  /** Get current value */
  getValue: () => SelectValue | SelectValue[];
}