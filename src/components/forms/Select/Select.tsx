import { KeyboardArrowDown as ArrowDownIcon, Clear as ClearIcon } from '@mui/icons-material';
import React, { forwardRef, useCallback, useState, useImperativeHandle, useRef, useEffect, memo } from 'react';

import { SELECT_DEFAULTS, SELECT_A11Y, SELECT_VALIDATION, SELECT_SIZES } from './Select.constants';
import { 
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
import type { 
  SelectProps, 
  SelectRef, 
  SelectState,
  SelectOption,
  SelectValue
} from './Select.types';

// Extracted style objects to prevent re-renders
const selectContainerStyle = {
  position: 'relative' as const,
  width: '100%' as const,
};

const selectContainerAutoStyle = {
  position: 'relative' as const,
  width: 'auto' as const,
};

const optionIconStyle = {
  marginRight: 8,
  display: 'flex' as const,
  alignItems: 'center' as const,
};

const optionContentStyle = {
  flex: 1,
};

const optionDescriptionStyle = {
  fontSize: '0.75em',
  opacity: 0.7,
  marginTop: 2,
};

const selectedIndicatorStyle = {
  marginLeft: 8,
  color: 'var(--mui-palette-primary-main)',
};

/**
 * 🎯 Select Component
 * 
 * A comprehensive select dropdown component with advanced theming, animations,
 * search functionality, and accessibility features.
 * 
 * Features:
 * - 3 variants: filled, outlined, standard
 * - 3 sizes: small, medium, large
 * - 8 colors: primary, secondary, tertiary, quaternary, success, warning, error, info
 * - Single and multiple selection modes
 * - Search/filter functionality
 * - Loading states and async data
 * - Validation with error/success/warning states
 * - Accessibility compliant (WCAG 2.1 AA)
 * - Theme-aware styling with CSS variables
 * - Advanced animations and interactions
 * - TypeScript strict mode compatible
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Select
 *   label="Country"
 *   options={countries}
 *   onChange={(value) => setSelectedCountry(value)}
 * />
 * 
 * // Advanced usage
 * <Select
 *   label="Skills"
 *   variant="outlined"
 *   size="medium"
 *   color="primary"
 *   mode="multiple"
 *   searchable
 *   clearable
 *   loading={isLoading}
 *   options={skills}
 *   value={selectedSkills}
 *   onChange={handleSkillsChange}
 *   onSearchChange={handleSearch}
 *   helperText="Select your programming skills"
 *   fullWidth
 * />
 * ```
 */
export const Select = memo(forwardRef<SelectRef, SelectProps>(({
  // Core props
  variant = SELECT_DEFAULTS.variant,
  size = SELECT_DEFAULTS.size,
  color = SELECT_DEFAULTS.color,
  mode = SELECT_DEFAULTS.mode,
  label,
  helperText,
  placeholder = SELECT_A11Y.defaultLabels.placeholder,
  
  // Value and options
  value,
  defaultValue,
  options = [],
  groups = [],
  
  // State props
  disabled = SELECT_DEFAULTS.disabled,
  readOnly = SELECT_DEFAULTS.readOnly,
  autoFocus = SELECT_DEFAULTS.autoFocus,
  
  // Validation props
  required = SELECT_DEFAULTS.required,
  validate,
  error,
  success,
  warning,
  
  // Loading props
  loading = SELECT_DEFAULTS.loading,
  loadingText = SELECT_A11Y.defaultLabels.loading,
  loadingComponent,
  
  // Search props
  searchable = SELECT_DEFAULTS.searchable,
  searchPlaceholder = 'Search options...',
  filterOption,
  noResultsText = SELECT_A11Y.defaultLabels.noResults,
  
  // Animation props
  enableAnimations = SELECT_DEFAULTS.enableAnimations,
  duration = SELECT_DEFAULTS.duration,
  
  // Interaction props
  onChange,
  onFocus,
  onBlur,
  onSearchChange,
  onOpen,
  onClose,
  
  // Styling props
  className,
  style,
  fullWidth = SELECT_DEFAULTS.fullWidth,
  dropdownWidth,
  maxHeight = SELECT_DEFAULTS.maxHeight,
  
  // Icon props
  startIcon,
  clearable = SELECT_DEFAULTS.clearable,
  clearIcon,
  dropdownIcon,
  
  // Advanced features
  creatable = SELECT_DEFAULTS.creatable,
  createText = SELECT_A11Y.defaultLabels.createOption,
  onCreate,
  
  // Accessibility props
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-labelledby': ariaLabelledby,
  'data-testid': testId,
  
  ...rest
}, ref) => {
  // Internal state
  const [state, setState] = useState<SelectState>({
    isOpen: false,
    isFocused: false,
    searchValue: '',
    focusedOptionIndex: -1,
    isLoading: loading,
    filteredOptions: options,
    validationError: undefined
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  
  // Process all options (flat list from options and groups)
  const allOptions = React.useMemo(() => {
    let flatOptions: SelectOption[] = [...options];
    
    groups.forEach(group => {
      flatOptions = [...flatOptions, ...group.options];
    });
    
    return flatOptions;
  }, [options, groups]);
  
  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!searchable || !state.searchValue) {
      return allOptions;
    }
    
    return allOptions.filter(option => {
      if (filterOption) {
        return filterOption(option, state.searchValue);
      }
      
      // Default filter behavior
      const searchLower = state.searchValue.toLowerCase();
      const label = option.label?.toString().toLowerCase() || '';
      const value = option.value?.toString().toLowerCase() || '';
      const description = option.description?.toString().toLowerCase() || '';
      
      return label.includes(searchLower) || 
             value.includes(searchLower) || 
             description.includes(searchLower);
    });
  }, [allOptions, state.searchValue, searchable, filterOption]);
  
  // Filtered options are computed via useMemo above and used directly
  
  // Current value handling
  const currentValue = value ?? defaultValue;
  const hasValue = mode === 'multiple' 
    ? Array.isArray(currentValue) && currentValue.length > 0
    : currentValue != null && currentValue !== '';
  
  // Selected option(s)
  const selectedOptions = React.useMemo(() => {
    if (mode === 'multiple') {
      const values = Array.isArray(currentValue) ? currentValue : [];
      return allOptions.filter(option => values.includes(option.value));
    } else {
      return allOptions.find(option => option.value === currentValue);
    }
  }, [currentValue, allOptions, mode]);
  
  // Display value
  const displayValue = React.useMemo(() => {
    if (!hasValue) return placeholder;
    
    if (mode === 'multiple') {
      const options = selectedOptions as SelectOption[];
      if (options.length === 0) return placeholder;
      if (options.length === 1) return options[0].label;
      return `${options.length} options selected`;
    } else {
      const option = selectedOptions as SelectOption;
      return option?.label || placeholder;
    }
  }, [hasValue, selectedOptions, mode, placeholder]);
  
  // Validation
  const validationState = React.useMemo(() => {
    if (error) return { error: true, message: error };
    if (success) return { success: true, message: success };
    if (warning) return { warning: true, message: warning };
    if (state.validationError) return { error: true, message: state.validationError };
    return {};
  }, [error, success, warning, state.validationError]);
  
  // Expose ref methods
  useImperativeHandle(ref, () => ({
    focus: () => containerRef.current?.focus(),
    blur: () => containerRef.current?.blur(),
    open: () => handleOpen(),
    close: () => handleClose(),
    clear: () => handleClear(),
    getElement: () => containerRef.current,
    getValue: () => currentValue
  }), [currentValue]);
  
  // Event handlers
  const handleOpen = useCallback(() => {
    if (disabled || readOnly) return;
    setState(prev => ({ ...prev, isOpen: true }));
    onOpen?.();
  }, [disabled, readOnly, onOpen]);
  
  const handleClose = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isOpen: false, 
      searchValue: '', 
      focusedOptionIndex: -1 
    }));
    onClose?.();
  }, [onClose]);
  
  const handleToggle = useCallback(() => {
    if (state.isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [state.isOpen, handleOpen, handleClose]);
  
  const handleOptionSelect = useCallback((option: SelectOption) => {
    if (option.disabled) return;
    
    let newValue: SelectValue | SelectValue[];
    let newSelectedOptions: SelectOption | SelectOption[];
    
    if (mode === 'multiple') {
      const currentValues = Array.isArray(currentValue) ? currentValue : [];
      const isSelected = currentValues.includes(option.value);
      
      if (isSelected) {
        newValue = currentValues.filter(v => v !== option.value);
        newSelectedOptions = (selectedOptions as SelectOption[]).filter(o => o.value !== option.value);
      } else {
        newValue = [...currentValues, option.value];
        newSelectedOptions = [...(selectedOptions as SelectOption[]), option];
      }
    } else {
      newValue = option.value;
      newSelectedOptions = option;
      handleClose();
    }
    
    onChange?.(newValue, newSelectedOptions);
    
    // Validation
    if (validate) {
      const validationError = validate(newValue);
      setState(prev => ({ ...prev, validationError }));
    }
  }, [mode, currentValue, selectedOptions, onChange, validate, handleClose]);
  
  const handleClear = useCallback(() => {
    const newValue = mode === 'multiple' ? [] : null;
    onChange?.(newValue, mode === 'multiple' ? [] : undefined);
    setState(prev => ({ ...prev, validationError: undefined }));
  }, [mode, onChange]);
  
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setState(prev => ({ ...prev, searchValue, focusedOptionIndex: -1 }));
    onSearchChange?.(searchValue);
  }, [onSearchChange]);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const { key } = event;
    
    // Handle open/close
    if (SELECT_A11Y.keys.open.includes(key) && !state.isOpen) {
      event.preventDefault();
      handleOpen();
      return;
    }
    
    if (SELECT_A11Y.keys.close.includes(key) && state.isOpen) {
      event.preventDefault();
      handleClose();
      return;
    }
    
    // Handle navigation when open
    if (state.isOpen && SELECT_A11Y.keys.navigate.includes(key)) {
      event.preventDefault();
      
      let newIndex = state.focusedOptionIndex;
      
      if (key === 'ArrowDown') {
        newIndex = Math.min(filteredOptions.length - 1, newIndex + 1);
      } else if (key === 'ArrowUp') {
        newIndex = Math.max(0, newIndex - 1);
      } else if (key === 'Home') {
        newIndex = 0;
      } else if (key === 'End') {
        newIndex = filteredOptions.length - 1;
      }
      
      setState(prev => ({ ...prev, focusedOptionIndex: newIndex }));
      return;
    }
    
    // Handle selection
    if (state.isOpen && SELECT_A11Y.keys.select.includes(key)) {
      event.preventDefault();
      const focusedOption = filteredOptions[state.focusedOptionIndex];
      if (focusedOption) {
        handleOptionSelect(focusedOption);
      }
      return;
    }
    
    // Handle clear
    if (clearable && SELECT_A11Y.keys.clear.includes(key) && hasValue) {
      event.preventDefault();
      handleClear();
      return;
    }
  }, [state.isOpen, state.focusedOptionIndex, filteredOptions, handleOpen, handleClose, handleOptionSelect, clearable, hasValue, handleClear]);
  
  const handleFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    setState(prev => ({ ...prev, isFocused: true }));
    onFocus?.(event as any);
  }, [onFocus]);
  
  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    // Don't blur if clicking on dropdown
    if (dropdownRef.current?.contains(event.relatedTarget as Node)) {
      return;
    }
    
    setState(prev => ({ 
      ...prev, 
      isFocused: false, 
      isOpen: false, 
      searchValue: '', 
      focusedOptionIndex: -1 
    }));
    onBlur?.(event as any);
  }, [onBlur]);
  
  // Auto-focus
  useEffect(() => {
    if (autoFocus && containerRef.current) {
      containerRef.current.focus();
    }
  }, [autoFocus]);
  
  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    
    if (state.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [state.isOpen, handleClose]);
  
  // Build accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledby,
    'aria-expanded': state.isOpen,
    'aria-haspopup': 'listbox' as const,
    'aria-disabled': disabled,
    'aria-readonly': readOnly,
    'aria-required': required,
    'aria-invalid': !!validationState.error,
    role: 'combobox'
  };
  
  return (
    <div style={fullWidth ? selectContainerStyle : selectContainerAutoStyle}>
      {/* Main select container */}
      <StyledSelectContainer
        ref={containerRef}
        className={className}
        style={style}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={disabled ? -1 : 0}
        data-testid={testId}
        $variant={variant}
        $size={size}
        $color={color}
        $disabled={disabled}
        $error={!!validationState.error}
        $focused={state.isFocused}
        $fullWidth={fullWidth}
        $hasStartIcon={!!startIcon}
        $loading={loading}
        {...accessibilityProps}
        {...rest}
      >
        {/* Start icon */}
        {startIcon && (
          <StyledSelectStartIcon $size={size}>
            {startIcon}
          </StyledSelectStartIcon>
        )}
        
        {/* Label */}
        {label && (
          <StyledSelectLabel
            component="label"
            $variant={variant}
            $size={size}
            $color={color}
            $focused={state.isFocused || state.isOpen}
            $hasValue={hasValue}
            $error={!!validationState.error}
            $disabled={disabled}
          >
            {label}
            {required && ' *'}
          </StyledSelectLabel>
        )}
        
        {/* Input display */}
        <StyledSelectInput
          component="div"
          $variant={variant}
          $size={size}
          $hasValue={hasValue}
          $hasStartIcon={!!startIcon}
        >
          {displayValue}
        </StyledSelectInput>
        
        {/* Loading spinner */}
        {loading && <StyledSelectLoadingSpinner $size={size} />}
        
        {/* Clear button */}
        {clearable && hasValue && !loading && !disabled && (
          <StyledSelectStartIcon 
            $size={size}
            style={{ right: SELECT_SIZES[size].paddingX + SELECT_SIZES[size].iconSize + 8 }}
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            aria-label="Clear selection"
            role="button"
          >
            {clearIcon || <ClearIcon />}
          </StyledSelectStartIcon>
        )}
        
        {/* Dropdown icon */}
        <StyledSelectDropdownIcon
          $size={size}
          $isOpen={state.isOpen}
          $disabled={disabled}
        >
          {dropdownIcon || <ArrowDownIcon />}
        </StyledSelectDropdownIcon>
      </StyledSelectContainer>
      
      {/* Dropdown menu */}
      {state.isOpen && (
        <StyledSelectDropdown
          ref={dropdownRef}
          $maxHeight={maxHeight}
          $width={dropdownWidth}
          $enableAnimations={enableAnimations}
          data-enter={enableAnimations}
        >
          {/* Search input */}
          {searchable && (
            <StyledSelectSearch
              ref={searchRef}
              $size={size}
              type="text"
              placeholder={searchPlaceholder}
              value={state.searchValue}
              onChange={handleSearchChange}
              autoFocus
            />
          )}
          
          {/* Options */}
          {filteredOptions.length === 0 ? (
            <StyledSelectOption
              $selected={false}
              $disabled={true}
              $focused={false}
              $size={size}
            >
              {noResultsText}
            </StyledSelectOption>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = mode === 'multiple'
                ? Array.isArray(currentValue) && currentValue.includes(option.value)
                : currentValue === option.value;
              
              return (
                <StyledSelectOption
                  key={`${option.value}-${index}`}
                  $selected={isSelected}
                  $disabled={!!option.disabled}
                  $focused={index === state.focusedOptionIndex}
                  $size={size}
                  onClick={() => handleOptionSelect(option)}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                >
                  {option.icon && (
                    <span style={optionIconStyle}>
                      {option.icon}
                    </span>
                  )}
                  <span style={optionContentStyle}>
                    {option.label}
                    {option.description && (
                      <div style={optionDescriptionStyle}>
                        {option.description}
                      </div>
                    )}
                  </span>
                  {isSelected && mode === 'single' && (
                    <span style={selectedIndicatorStyle}>
                      ✓
                    </span>
                  )}
                </StyledSelectOption>
              );
            })
          )}
        </StyledSelectDropdown>
      )}
      
      {/* Helper text */}
      {(helperText || validationState.message) && (
        <StyledSelectHelperText
          component="div"
          variant="caption"
          $error={!!validationState.error}
          $success={!!validationState.success}
          $warning={!!validationState.warning}
        >
          {validationState.message || helperText}
        </StyledSelectHelperText>
      )}
    </div>
  );
}));

// Display name for debugging
Select.displayName = 'Select';