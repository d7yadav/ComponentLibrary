
import type { Theme } from '@mui/material/styles';
import type { ReactNode, HTMLAttributes, ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

// Base option type for autocomplete
export interface AutocompleteOption {
  id: string | number;
  label: string;
  value: any;
  disabled?: boolean;
  category?: string;
  description?: string;
  icon?: ReactNode;
}

// Autocomplete variants
export type AutocompleteVariant = 'outlined' | 'filled' | 'standard';

// Size options
export type AutocompleteSize = 'small' | 'medium' | 'large';

// Selection modes
export type AutocompleteSelectionMode = 'single' | 'multiple';

// Filter modes for option matching
export type AutocompleteFilterMode = 'startsWith' | 'contains' | 'custom';

// Loading states
export type AutocompleteLoadingState = 'idle' | 'loading' | 'error';

// Main component props
export interface AutocompleteProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> {
  // Basic props
  variant?: AutocompleteVariant;
  size?: AutocompleteSize;
  selectionMode?: AutocompleteSelectionMode;
  
  // Data props
  options: AutocompleteOption[];
  value?: AutocompleteOption | AutocompleteOption[] | null;
  defaultValue?: AutocompleteOption | AutocompleteOption[] | null;
  inputValue?: string;
  defaultInputValue?: string;
  
  // Behavior props
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  clearable?: boolean;
  freeSolo?: boolean; // Allow custom values not in options
  multiple?: boolean; // Alias for selectionMode='multiple'
  
  // Display props
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  success?: boolean;
  successText?: string;
  loading?: boolean;
  
  // Dropdown props
  open?: boolean;
  disableCloseOnSelect?: boolean;
  limitTags?: number;
  getOptionLabel?: (option: AutocompleteOption) => string;
  getOptionDisabled?: (option: AutocompleteOption) => boolean;
  isOptionEqualToValue?: (option: AutocompleteOption, value: AutocompleteOption) => boolean;
  
  // Filtering props
  filterMode?: AutocompleteFilterMode;
  filterOptions?: (options: AutocompleteOption[], inputValue: string) => AutocompleteOption[];
  noOptionsText?: string;
  loadingText?: string;
  
  // Event handlers
  onChange?: (value: AutocompleteOption | AutocompleteOption[] | null) => void;
  onInputChange?: (value: string, reason: AutocompleteInputChangeReason) => void;
  onOpen?: () => void;
  onClose?: (reason: AutocompleteCloseReason) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  
  // Async data loading
  onLoadOptions?: (inputValue: string) => Promise<AutocompleteOption[]>;
  loadingState?: AutocompleteLoadingState;
  minSearchLength?: number;
  debounceMs?: number;
  
  // Styling props
  fullWidth?: boolean;
  className?: string;
  sx?: any;
  
  // Advanced props
  renderOption?: (props: HTMLAttributes<HTMLLIElement>, option: AutocompleteOption) => ReactNode;
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
  renderTags?: (value: AutocompleteOption[], getTagProps: AutocompleteGetTagProps) => ReactNode;
  groupBy?: (option: AutocompleteOption) => string;
  
  // Accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

// Input change reasons
export type AutocompleteInputChangeReason = 'input' | 'reset' | 'clear';

// Close reasons
export type AutocompleteCloseReason = 'toggleInput' | 'escape' | 'select-option' | 'remove-option' | 'blur';

// Render input parameters
export interface AutocompleteRenderInputParams {
  disabled?: boolean;
  fullWidth?: boolean;
  size?: AutocompleteSize;
  variant?: AutocompleteVariant;
  InputLabelProps?: object;
  InputProps?: {
    ref?: any;
    className?: string;
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };
  inputProps?: {
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
  };
}

// Tag props function type
export type AutocompleteGetTagProps = (index: number) => {
  key: number;
  className?: string;
  disabled?: boolean;
  'data-tag-index': number;
  onDelete?: () => void;
};

// Styled component props
export interface AutocompleteStyleProps {
  theme: Theme;
  variant: AutocompleteVariant;
  size: AutocompleteSize;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  fullWidth?: boolean;
  open?: boolean;
}

export interface AutocompleteInputStyleProps extends AutocompleteStyleProps {
  hasStartAdornment?: boolean;
  hasEndAdornment?: boolean;
}

export interface AutocompleteListboxStyleProps {
  theme: Theme;
  size: AutocompleteSize;
  maxHeight?: number;
}

export interface AutocompleteOptionStyleProps {
  theme: Theme;
  size: AutocompleteSize;
  selected?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
}

export interface AutocompleteTagStyleProps {
  theme: Theme;
  size: AutocompleteSize;
  disabled?: boolean;
}

// Constants export type
export interface AutocompleteConstants {
  VARIANTS: Record<string, AutocompleteVariant>;
  SIZES: Record<string, AutocompleteSize>;
  SELECTION_MODES: Record<string, AutocompleteSelectionMode>;
  FILTER_MODES: Record<string, AutocompleteFilterMode>;
  DEFAULT_PROPS: Partial<AutocompleteProps>;
  ACCESSIBILITY: {
    ROLES: Record<string, string>;
    ARIA_LABELS: Record<string, string>;
    KEYBOARD_SHORTCUTS: Record<string, string>;
  };
  ANIMATION: {
    DURATION: Record<string, number>;
    EASING: Record<string, string>;
  };
}