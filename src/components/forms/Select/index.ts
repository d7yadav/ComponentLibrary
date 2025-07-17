
// Main component
export { Select } from './Select';

// Type definitions
export type {
  SelectProps,
  SelectRef,
  SelectState,
  SelectVariant,
  SelectSize,
  SelectColor,
  SelectMode,
  SelectValue,
  SelectOption,
  SelectOptionGroup,
  SelectValidationConfig,
  SelectLoadingConfig,
  SelectSearchConfig,
  SelectAnimationConfig,
  SelectAccessibilityConfig,
  StyledSelectProps,
  StyledSelectInputProps,
  StyledSelectDropdownProps,
  StyledSelectOptionProps
} from './Select.types';

// Constants
export {
  SELECT_VARIANTS,
  SELECT_SIZES,
  SELECT_COLORS,
  SELECT_MODES,
  SELECT_ANIMATIONS,
  SELECT_DROPDOWN,
  SELECT_A11Y,
  SELECT_VALIDATION,
  SELECT_SEARCH,
  SELECT_LOADING,
  SELECT_MULTISELECT,
  SELECT_THEME_COLORS,
  SELECT_DEFAULTS
} from './Select.constants';

// Styled components
export {
  StyledSelectContainer,
  StyledSelectInput,
  StyledSelectLabel,
  StyledSelectDropdownIcon,
  StyledSelectStartIcon,
  StyledSelectDropdown,
  StyledSelectOption,
  StyledSelectSearch,
  StyledSelectHelperText,
  StyledSelectLoadingSpinner
} from './Select.styles';