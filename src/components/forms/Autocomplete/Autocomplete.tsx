/**
 * @fileoverview Autocomplete component implementation
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import { 
  ExpandMore, 
  Clear, 
  Check,
  Search 
} from '@mui/icons-material';
import { InputAdornment, ClickAwayListener, Popper } from '@mui/material';
import React, { 
  forwardRef, 
  useState, 
  useEffect, 
  useRef, 
  useCallback, 
  useMemo,
  memo 
} from 'react';

import { useDebounce } from '@/hooks/useDebounce';

import {
  AUTOCOMPLETE_VARIANTS,
  AUTOCOMPLETE_SIZES,
  SELECTION_MODES,
  FILTER_MODES,
  DEFAULT_AUTOCOMPLETE_PROPS,
  ACCESSIBILITY_CONSTANTS,
  DEFAULT_FILTER_OPTIONS,
} from './Autocomplete.constants';
import {
  AutocompleteContainer,
  StyledTextField,
  AutocompleteDropdown,
  AutocompleteOption,
  AutocompleteTag,
  TagsContainer,
  LoadingIndicator,
  ClearButton,
  ToggleButton,
  NoOptionsMessage,
  LoadingMessage,
  GroupHeader,
  OptionIcon,
  OptionDescription,
} from './Autocomplete.styles';
import type { 
  AutocompleteProps, 
  AutocompleteOption as OptionType,
  AutocompleteInputChangeReason,
  AutocompleteCloseReason
} from './Autocomplete.types';

/**
 * Enhanced Autocomplete component with comprehensive features
 * 
 * Features:
 * - Single and multiple selection modes
 * - Async data loading with debouncing
 * - Custom filtering and rendering
 * - Keyboard navigation
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Success/Error validation states
 * - Grouping and categorization
 * - Free solo input (custom values)
 */
export const Autocomplete = memo(forwardRef<HTMLDivElement, AutocompleteProps>(({
  // Basic props
  variant = DEFAULT_AUTOCOMPLETE_PROPS.variant,
  size = DEFAULT_AUTOCOMPLETE_PROPS.size,
  selectionMode = DEFAULT_AUTOCOMPLETE_PROPS.selectionMode,
  
  // Data props
  options = [],
  value: controlledValue,
  defaultValue,
  inputValue: controlledInputValue,
  defaultInputValue = '',
  
  // Behavior props
  disabled = DEFAULT_AUTOCOMPLETE_PROPS.disabled,
  readOnly = DEFAULT_AUTOCOMPLETE_PROPS.readOnly,
  required = DEFAULT_AUTOCOMPLETE_PROPS.required,
  clearable = DEFAULT_AUTOCOMPLETE_PROPS.clearable,
  freeSolo = DEFAULT_AUTOCOMPLETE_PROPS.freeSolo,
  multiple,
  
  // Display props
  label,
  placeholder,
  helperText,
  error = false,
  errorText,
  success = false,
  successText,
  loading = DEFAULT_AUTOCOMPLETE_PROPS.loading,
  
  // Dropdown props
  open: controlledOpen,
  disableCloseOnSelect = DEFAULT_AUTOCOMPLETE_PROPS.disableCloseOnSelect,
  limitTags = DEFAULT_AUTOCOMPLETE_PROPS.limitTags,
  getOptionLabel,
  getOptionDisabled,
  isOptionEqualToValue,
  
  // Filtering props
  filterMode = DEFAULT_AUTOCOMPLETE_PROPS.filterMode,
  filterOptions,
  noOptionsText = DEFAULT_AUTOCOMPLETE_PROPS.noOptionsText,
  loadingText = DEFAULT_AUTOCOMPLETE_PROPS.loadingText,
  
  // Event handlers
  onChange,
  onInputChange,
  onOpen,
  onClose,
  onFocus,
  onBlur,
  onKeyDown,
  
  // Async loading
  onLoadOptions,
  loadingState = 'idle',
  minSearchLength = DEFAULT_AUTOCOMPLETE_PROPS.minSearchLength,
  debounceMs = DEFAULT_AUTOCOMPLETE_PROPS.debounceMs,
  
  // Styling props
  fullWidth = DEFAULT_AUTOCOMPLETE_PROPS.fullWidth,
  className,
  sx,
  
  // Advanced props
  renderOption,
  renderInput,
  renderTags,
  groupBy,
  
  // Accessibility
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  
  ...rest
}, ref) => {
  // Determine if multiple selection is enabled
  const isMultiple = multiple || selectionMode === SELECTION_MODES.multiple;
  
  // Internal state
  const [internalValue, setInternalValue] = useState(() => {
    if (controlledValue !== undefined) return controlledValue;
    if (defaultValue !== undefined) return defaultValue;
    return isMultiple ? [] : null;
  });
  
  const [internalInputValue, setInternalInputValue] = useState(
    controlledInputValue !== undefined ? controlledInputValue : defaultInputValue
  );
  
  const [internalOpen, setInternalOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [asyncOptions, setAsyncOptions] = useState<OptionType[]>([]);
  const [isLoadingAsync, setIsLoadingAsync] = useState(false);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  
  // Computed values
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const currentInputValue = controlledInputValue !== undefined ? controlledInputValue : internalInputValue;
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  // Debounced input value for async loading
  const debouncedInputValue = useDebounce(currentInputValue, debounceMs);
  
  // Helper functions
  const getLabel = useCallback((option: OptionType) => {
    if (getOptionLabel) return getOptionLabel(option);
    return option.label || String(option.value);
  }, [getOptionLabel]);
  
  const isOptionDisabled = useCallback((option: OptionType) => {
    if (getOptionDisabled) return getOptionDisabled(option);
    return option.disabled || false;
  }, [getOptionDisabled]);
  
  const isOptionSelected = useCallback((option: OptionType) => {
    if (!currentValue) return false;
    
    if (isMultiple && Array.isArray(currentValue)) {
      return currentValue.some(val => {
        if (isOptionEqualToValue) return isOptionEqualToValue(option, val);
        return option.id === val.id;
      });
    }
    
    if (!isMultiple && !Array.isArray(currentValue)) {
      if (isOptionEqualToValue) return isOptionEqualToValue(option, currentValue);
      return option.id === currentValue.id;
    }
    
    return false;
  }, [currentValue, isMultiple, isOptionEqualToValue]);
  
  // Filter options based on input value
  const filteredOptions = useMemo(() => {
    const baseOptions = onLoadOptions ? asyncOptions : options;
    
    if (!currentInputValue.trim()) return baseOptions;
    if (currentInputValue.length < minSearchLength) return [];
    
    if (filterOptions) {
      return filterOptions(baseOptions, currentInputValue);
    }
    
    return DEFAULT_FILTER_OPTIONS(baseOptions, currentInputValue, filterMode);
  }, [options, asyncOptions, currentInputValue, minSearchLength, filterOptions, filterMode, onLoadOptions]);
  
  // Group options if groupBy is provided
  const groupedOptions = useMemo(() => {
    if (!groupBy) return [{ group: null, options: filteredOptions }];
    
    const groups = new Map<string, OptionType[]>();
    
    filteredOptions.forEach(option => {
      const group = groupBy(option);
      if (!groups.has(group)) {
        groups.set(group, []);
      }
      groups.get(group)!.push(option);
    });
    
    return Array.from(groups.entries()).map(([group, options]) => ({
      group,
      options,
    }));
  }, [filteredOptions, groupBy]);
  
  // Async options loading
  useEffect(() => {
    if (!onLoadOptions || debouncedInputValue.length < minSearchLength) {
      setAsyncOptions([]);
      return;
    }
    
    setIsLoadingAsync(true);
    
    onLoadOptions(debouncedInputValue)
      .then(newOptions => {
        setAsyncOptions(newOptions);
      })
      .catch(error => {
        console.error('Error loading autocomplete options:', error);
        setAsyncOptions([]);
      })
      .finally(() => {
        setIsLoadingAsync(false);
      });
  }, [debouncedInputValue, minSearchLength, onLoadOptions]);
  
  // Handle value changes
  const handleValueChange = useCallback((newValue: OptionType | OptionType[] | null) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
  }, [controlledValue, onChange]);
  
  // Handle input value changes
  const handleInputValueChange = useCallback((newInputValue: string, reason: AutocompleteInputChangeReason) => {
    if (controlledInputValue === undefined) {
      setInternalInputValue(newInputValue);
    }
    
    onInputChange?.(newInputValue, reason);
  }, [controlledInputValue, onInputChange]);
  
  // Handle opening dropdown
  const handleOpen = useCallback(() => {
    if (disabled || readOnly) return;
    
    if (controlledOpen === undefined) {
      setInternalOpen(true);
    }
    
    onOpen?.();
  }, [disabled, readOnly, controlledOpen, onOpen]);
  
  // Handle closing dropdown
  const handleClose = useCallback((reason: AutocompleteCloseReason) => {
    if (controlledOpen === undefined) {
      setInternalOpen(false);
    }
    
    setHighlightedIndex(-1);
    onClose?.(reason);
  }, [controlledOpen, onClose]);
  
  // Handle option selection
  const handleOptionSelect = useCallback((option: OptionType) => {
    if (isOptionDisabled(option)) return;
    
    let newValue: OptionType | OptionType[] | null;
    
    if (isMultiple && Array.isArray(currentValue)) {
      const isSelected = isOptionSelected(option);
      if (isSelected) {
        newValue = currentValue.filter(val => {
          if (isOptionEqualToValue) return !isOptionEqualToValue(option, val);
          return option.id !== val.id;
        });
      } else {
        newValue = [...currentValue, option];
      }
    } else {
      newValue = option;
      handleInputValueChange(getLabel(option), 'select-option');
    }
    
    handleValueChange(newValue);
    
    if (!disableCloseOnSelect && !isMultiple) {
      handleClose('select-option');
    }
  }, [
    isOptionDisabled, 
    isMultiple, 
    currentValue, 
    isOptionSelected, 
    isOptionEqualToValue,
    handleValueChange,
    disableCloseOnSelect,
    handleClose,
    getLabel,
    handleInputValueChange
  ]);
  
  // Handle clear action
  const handleClear = useCallback(() => {
    const newValue = isMultiple ? [] : null;
    handleValueChange(newValue);
    handleInputValueChange('', 'clear');
    inputRef.current?.focus();
  }, [isMultiple, handleValueChange, handleInputValueChange]);
  
  // Handle tag removal (multiple mode)
  const handleTagRemove = useCallback((optionToRemove: OptionType) => {
    if (!isMultiple || !Array.isArray(currentValue)) return;
    
    const newValue = currentValue.filter(val => {
      if (isOptionEqualToValue) return !isOptionEqualToValue(optionToRemove, val);
      return optionToRemove.id !== val.id;
    });
    
    handleValueChange(newValue);
  }, [isMultiple, currentValue, isOptionEqualToValue, handleValueChange]);
  
  // Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    
    onKeyDown?.(event);
    
    if (key === ACCESSIBILITY_CONSTANTS.KEYBOARD_SHORTCUTS.ARROW_DOWN) {
      event.preventDefault();
      if (!isOpen) {
        handleOpen();
      } else {
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
      }
    } else if (key === ACCESSIBILITY_CONSTANTS.KEYBOARD_SHORTCUTS.ARROW_UP) {
      event.preventDefault();
      if (isOpen) {
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
      }
    } else if (key === ACCESSIBILITY_CONSTANTS.KEYBOARD_SHORTCUTS.ENTER) {
      event.preventDefault();
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        handleOptionSelect(filteredOptions[highlightedIndex]);
      }
    } else if (key === ACCESSIBILITY_CONSTANTS.KEYBOARD_SHORTCUTS.ESCAPE) {
      event.preventDefault();
      if (isOpen) {
        handleClose('escape');
      }
    }
  }, [
    onKeyDown, 
    isOpen, 
    handleOpen, 
    filteredOptions, 
    highlightedIndex, 
    handleOptionSelect, 
    handleClose
  ]);
  
  // Render input field
  const renderInputField = useCallback(() => {
    if (renderInput) {
      return renderInput({
        disabled,
        fullWidth,
        size,
        variant,
        InputLabelProps: {},
        InputProps: {
          ref: anchorRef,
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {isLoadingAsync && <LoadingIndicator size={16} />}
              {clearable && currentValue && !disabled && !readOnly && (
                <ClearButton
                  size="small"
                  onClick={handleClear}
                  aria-label={ACCESSIBILITY_CONSTANTS.ARIA_LABELS.CLEAR}
                >
                  <Clear fontSize="small" />
                </ClearButton>
              )}
              <ToggleButton
                size="small"
                onClick={() => isOpen ? handleClose('toggleInput') : handleOpen()}
                className={isOpen ? 'open' : ''}
                aria-label={ACCESSIBILITY_CONSTANTS.ARIA_LABELS.TOGGLE}
              >
                <ExpandMore fontSize="small" />
              </ToggleButton>
            </InputAdornment>
          ),
        },
        inputProps: {
          ref: inputRef,
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy,
          'aria-describedby': ariaDescribedBy,
        },
      });
    }
    
    return (
      <StyledTextField
        ref={anchorRef}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        error={error}
        success={success}
        label={label}
        placeholder={placeholder}
        helperText={error ? errorText : success ? successText : helperText}
        value={currentInputValue}
        onChange={(e) => handleInputValueChange(e.target.value, 'input')}
        onFocus={(e) => {
          handleOpen();
          onFocus?.(e);
        }}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        required={required}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {isLoadingAsync && <LoadingIndicator size={16} />}
              {clearable && currentValue && !disabled && !readOnly && (
                <ClearButton
                  size="small"
                  onClick={handleClear}
                  aria-label={ACCESSIBILITY_CONSTANTS.ARIA_LABELS.CLEAR}
                >
                  <Clear fontSize="small" />
                </ClearButton>
              )}
              <ToggleButton
                size="small"
                onClick={() => isOpen ? handleClose('toggleInput') : handleOpen()}
                className={isOpen ? 'open' : ''}
                aria-label={ACCESSIBILITY_CONSTANTS.ARIA_LABELS.TOGGLE}
              >
                <ExpandMore fontSize="small" />
              </ToggleButton>
            </InputAdornment>
          ),
          readOnly,
        }}
        inputProps={{
          'aria-expanded': isOpen,
          'aria-haspopup': 'listbox',
          'aria-autocomplete': 'list',
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy,
          'aria-describedby': ariaDescribedBy,
          role: ACCESSIBILITY_CONSTANTS.ROLES.COMBOBOX,
        }}
      />
    );
  }, [
    renderInput,
    variant,
    size,
    fullWidth,
    disabled,
    error,
    success,
    label,
    placeholder,
    helperText,
    errorText,
    successText,
    currentInputValue,
    handleInputValueChange,
    handleOpen,
    onFocus,
    onBlur,
    handleKeyDown,
    required,
    isLoadingAsync,
    clearable,
    currentValue,
    readOnly,
    handleClear,
    isOpen,
    handleClose,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
  ]);
  
  // Render tags for multiple selection
  const renderSelectedTags = useCallback(() => {
    if (!isMultiple || !Array.isArray(currentValue) || currentValue.length === 0) {
      return null;
    }
    
    if (renderTags) {
      return renderTags(currentValue, (index) => ({
        key: index,
        'data-tag-index': index,
        onDelete: () => handleTagRemove(currentValue[index]),
      }));
    }
    
    const tagsToShow = limitTags > 0 ? currentValue.slice(0, limitTags) : currentValue;
    const remainingCount = limitTags > 0 ? currentValue.length - limitTags : 0;
    
    return (
      <TagsContainer size={size}>
        {tagsToShow.map((option, index) => (
          <AutocompleteTag
            key={option.id}
            size={size}
            disabled={disabled}
            label={getLabel(option)}
            onDelete={() => handleTagRemove(option)}
            deleteIcon={<Clear />}
          />
        ))}
        {remainingCount > 0 && (
          <AutocompleteTag
            size={size}
            disabled={disabled}
            label={`+${remainingCount} more`}
            variant="outlined"
          />
        )}
      </TagsContainer>
    );
  }, [
    isMultiple,
    currentValue,
    renderTags,
    limitTags,
    size,
    disabled,
    getLabel,
    handleTagRemove,
  ]);
  
  // Render dropdown options
  const renderDropdownContent = useCallback(() => {
    if (isLoadingAsync) {
      return (
        <LoadingMessage>
          <LoadingIndicator size={16} />
          {loadingText}
        </LoadingMessage>
      );
    }
    
    if (filteredOptions.length === 0) {
      return <NoOptionsMessage>{noOptionsText}</NoOptionsMessage>;
    }
    
    let optionIndex = 0;
    
    return (
      <ul
        ref={listboxRef}
        role={ACCESSIBILITY_CONSTANTS.ROLES.LISTBOX}
        aria-multiselectable={isMultiple}
      >
        {groupedOptions.map(({ group, options: groupOptions }) => (
          <React.Fragment key={group || 'no-group'}>
            {group && <GroupHeader>{group}</GroupHeader>}
            {groupOptions.map((option) => {
              const currentIndex = optionIndex++;
              const isSelected = isOptionSelected(option);
              const isDisabled = isOptionDisabled(option);
              const isHighlighted = currentIndex === highlightedIndex;
              
              if (renderOption) {
                return renderOption(
                  {
                    key: option.id,
                    role: ACCESSIBILITY_CONSTANTS.ROLES.OPTION,
                    'aria-selected': isSelected,
                    'aria-disabled': isDisabled,
                    onClick: () => handleOptionSelect(option),
                  },
                  option
                );
              }
              
              return (
                <AutocompleteOption
                  key={option.id}
                  size={size}
                  selected={isSelected}
                  disabled={isDisabled}
                  highlighted={isHighlighted}
                  role={ACCESSIBILITY_CONSTANTS.ROLES.OPTION}
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.icon && <OptionIcon>{option.icon}</OptionIcon>}
                  <span>{getLabel(option)}</span>
                  {option.description && (
                    <OptionDescription>{option.description}</OptionDescription>
                  )}
                  {isSelected && <Check fontSize="small" />}
                </AutocompleteOption>
              );
            })}
          </React.Fragment>
        ))}
      </ul>
    );
  }, [
    isLoadingAsync,
    loadingText,
    filteredOptions,
    noOptionsText,
    isMultiple,
    groupedOptions,
    highlightedIndex,
    renderOption,
    isOptionSelected,
    isOptionDisabled,
    handleOptionSelect,
    size,
    getLabel,
  ]);
  
  return (
    <ClickAwayListener onClickAway={() => handleClose('blur')}>
      <AutocompleteContainer
        ref={ref}
        className={className}
        sx={sx}
        variant={variant}
        size={size}
        disabled={disabled}
        error={error}
        success={success}
        fullWidth={fullWidth}
        open={isOpen}
        {...rest}
      >
        {renderInputField()}
        {renderSelectedTags()}
        
        <Popper
          open={isOpen}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          style={{ width: anchorRef.current?.clientWidth, zIndex: 1300 }}
        >
          <AutocompleteDropdown size={size}>
            {renderDropdownContent()}
          </AutocompleteDropdown>
        </Popper>
      </AutocompleteContainer>
    </ClickAwayListener>
  );
}));

Autocomplete.displayName = 'Autocomplete';