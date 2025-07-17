
import type { 
  AutocompleteVariant,
  AutocompleteSize,
  AutocompleteSelectionMode,
  AutocompleteFilterMode,
  AutocompleteConstants
} from './Autocomplete.types';

// Component variants
export const AUTOCOMPLETE_VARIANTS: Record<string, AutocompleteVariant> = {
  outlined: 'outlined',
  filled: 'filled',
  standard: 'standard',
} as const;

// Component sizes
export const AUTOCOMPLETE_SIZES: Record<string, AutocompleteSize> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

// Selection modes
export const SELECTION_MODES: Record<string, AutocompleteSelectionMode> = {
  single: 'single',
  multiple: 'multiple',
} as const;

// Filter modes
export const FILTER_MODES: Record<string, AutocompleteFilterMode> = {
  startsWith: 'startsWith',
  contains: 'contains',
  custom: 'custom',
} as const;

// Default component props
export const DEFAULT_AUTOCOMPLETE_PROPS = {
  variant: AUTOCOMPLETE_VARIANTS.outlined,
  size: AUTOCOMPLETE_SIZES.medium,
  selectionMode: SELECTION_MODES.single,
  filterMode: FILTER_MODES.contains,
  clearable: true,
  freeSolo: false,
  multiple: false,
  disabled: false,
  readOnly: false,
  required: false,
  loading: false,
  disableCloseOnSelect: false,
  limitTags: -1,
  minSearchLength: 0,
  debounceMs: 300,
  fullWidth: false,
  noOptionsText: 'No options',
  loadingText: 'Loading...',
} as const;

// Accessibility constants
export const ACCESSIBILITY_CONSTANTS = {
  ROLES: {
    COMBOBOX: 'combobox',
    LISTBOX: 'listbox',
    OPTION: 'option',
    BUTTON: 'button',
  },
  ARIA_LABELS: {
    AUTOCOMPLETE: 'Autocomplete',
    CLEAR: 'Clear value',
    TOGGLE: 'Toggle dropdown',
    REMOVE_TAG: 'Remove',
    LOADING: 'Loading options',
    NO_OPTIONS: 'No options available',
  },
  KEYBOARD_SHORTCUTS: {
    ARROW_DOWN: 'ArrowDown',
    ARROW_UP: 'ArrowUp',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    TAB: 'Tab',
    BACKSPACE: 'Backspace',
    DELETE: 'Delete',
  },
  ARIA_EXPANDED: {
    TRUE: 'true',
    FALSE: 'false',
  },
} as const;

// Animation constants
export const ANIMATION_CONSTANTS = {
  DURATION: {
    DROPDOWN_ENTER: 150,
    DROPDOWN_EXIT: 100,
    TAG_ENTER: 200,
    TAG_EXIT: 150,
  },
  EASING: {
    EASE_OUT: 'cubic-bezier(0.0, 0, 0.2, 1)',
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Z-index constants
export const Z_INDEX_CONSTANTS = {
  DROPDOWN: 1300,
  BACKDROP: 1200,
} as const;

// Sizing constants
export const SIZE_CONSTANTS = {
  INPUT_HEIGHT: {
    small: 32,
    medium: 40,
    large: 48,
  },
  TAG_HEIGHT: {
    small: 20,
    medium: 24,
    large: 28,
  },
  DROPDOWN_MAX_HEIGHT: 300,
  OPTION_HEIGHT: {
    small: 32,
    medium: 40,
    large: 48,
  },
} as const;

// Spacing constants
export const SPACING_CONSTANTS = {
  TAG_SPACING: 4,
  OPTION_PADDING_X: 12,
  OPTION_PADDING_Y: 8,
  DROPDOWN_PADDING: 8,
  INPUT_PADDING_X: 12,
  INPUT_PADDING_Y: 8,
} as const;

// Default filter function
export const DEFAULT_FILTER_OPTIONS = (options: any[], inputValue: string, filterMode: AutocompleteFilterMode) => {
  if (!inputValue.trim()) return options;
  
  const searchValue = inputValue.toLowerCase().trim();
  
  return options.filter(option => {
    const label = (option.label || '').toLowerCase();
    
    switch (filterMode) {
      case FILTER_MODES.startsWith:
        return label.startsWith(searchValue);
      case FILTER_MODES.contains:
        return label.includes(searchValue);
      default:
        return true;
    }
  });
};

// Export all constants as a single object
export const AUTOCOMPLETE_CONSTANTS: AutocompleteConstants = {
  VARIANTS: AUTOCOMPLETE_VARIANTS,
  SIZES: AUTOCOMPLETE_SIZES,
  SELECTION_MODES: SELECTION_MODES,
  FILTER_MODES: FILTER_MODES,
  DEFAULT_PROPS: DEFAULT_AUTOCOMPLETE_PROPS,
  ACCESSIBILITY: ACCESSIBILITY_CONSTANTS,
  ANIMATION: ANIMATION_CONSTANTS,
} as const;