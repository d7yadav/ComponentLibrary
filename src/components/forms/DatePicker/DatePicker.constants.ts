
import type {
  DatePickerVariant,
  DatePickerSize,
  DatePickerType,
  DateFormat,
  DateValidationState,
  DatePickerConstants
} from './DatePicker.types';

// Component variants
export const DATEPICKER_VARIANTS: Record<string, DatePickerVariant> = {
  outlined: 'outlined',
  filled: 'filled',
  standard: 'standard',
} as const;

// Component sizes
export const DATEPICKER_SIZES: Record<string, DatePickerSize> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

// Date picker types
export const DATEPICKER_TYPES: Record<string, DatePickerType> = {
  date: 'date',
  datetime: 'datetime-local',
  time: 'time',
  month: 'month',
  week: 'week',
} as const;

// Date formats
export const DATE_FORMATS: Record<string, DateFormat> = {
  ISO: 'ISO',
  US: 'US',
  EU: 'EU',
  CUSTOM: 'custom',
} as const;

// Validation states
export const VALIDATION_STATES: Record<string, DateValidationState> = {
  NONE: 'none',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

// Default component props
export const DEFAULT_DATEPICKER_PROPS = {
  variant: DATEPICKER_VARIANTS.outlined,
  size: DATEPICKER_SIZES.medium,
  type: DATEPICKER_TYPES.date,
  format: DATE_FORMATS.ISO,
  disabled: false,
  readOnly: false,
  required: false,
  clearable: true,
  fullWidth: false,
  showTodayButton: false,
  showClearButton: true,
  validateOnChange: false,
  validateOnBlur: true,
  locale: 'en-US',
} as const;

// Accessibility constants
export const ACCESSIBILITY_CONSTANTS = {
  ROLES: {
    TEXTBOX: 'textbox',
    BUTTON: 'button',
  },
  ARIA_LABELS: {
    DATE_PICKER: 'Date picker',
    CLEAR: 'Clear date',
    TODAY: 'Select today',
    CALENDAR: 'Open calendar',
  },
  KEYBOARD_SHORTCUTS: {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    TAB: 'Tab',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
  },
} as const;

// Date format patterns
export const DATE_FORMAT_PATTERNS = {
  ISO: 'YYYY-MM-DD',
  US: 'MM/DD/YYYY',
  EU: 'DD/MM/YYYY',
  ISO_DATETIME: 'YYYY-MM-DDTHH:mm',
  US_DATETIME: 'MM/DD/YYYY HH:mm',
  EU_DATETIME: 'DD/MM/YYYY HH:mm',
  TIME_12H: 'hh:mm A',
  TIME_24H: 'HH:mm',
  MONTH: 'YYYY-MM',
  WEEK: 'YYYY-[W]WW',
} as const;

// Native input format mapping
export const NATIVE_FORMAT_MAP = {
  [DATEPICKER_TYPES.date]: 'YYYY-MM-DD',
  [DATEPICKER_TYPES.datetime]: 'YYYY-MM-DDTHH:mm',
  [DATEPICKER_TYPES.time]: 'HH:mm',
  [DATEPICKER_TYPES.month]: 'YYYY-MM',
  [DATEPICKER_TYPES.week]: 'YYYY-[W]WW',
} as const;

// Validation messages
export const DEFAULT_VALIDATION_MESSAGES = {
  REQUIRED: 'Date is required',
  INVALID_DATE: 'Please enter a valid date',
  DATE_TOO_EARLY: 'Date is too early',
  DATE_TOO_LATE: 'Date is too late',
  DATE_OUT_OF_RANGE: 'Date is out of allowed range',
} as const;

// Size constants
export const SIZE_CONSTANTS = {
  INPUT_HEIGHT: {
    small: 32,
    medium: 40,
    large: 48,
  },
  ICON_SIZE: {
    small: 20,
    medium: 24,
    large: 28,
  },
  BUTTON_SIZE: {
    small: 24,
    medium: 28,
    large: 32,
  },
} as const;

// Spacing constants
export const SPACING_CONSTANTS = {
  INPUT_PADDING_X: 12,
  INPUT_PADDING_Y: 8,
  ICON_MARGIN: 8,
  BUTTON_MARGIN: 4,
} as const;

// Date utility functions
export const DATE_UTILS = {
  getToday: (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  },

  getNow: (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  },

  getCurrentTime: (): string => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  },

  formatDate: (date: Date | string, format: DateFormat = 'ISO', locale: string = 'en-US'): string => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';

    switch (format) {
      case 'US':
        return dateObj.toLocaleDateString('en-US');
      case 'EU':
        return dateObj.toLocaleDateString('en-GB');
      case 'ISO':
      default:
        return dateObj.toISOString().split('T')[0];
    }
  },

  parseDate: (dateString: string): Date | null => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  },

  isValidDate: (date: Date | string | null): boolean => {
    if (!date) return false;
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return !isNaN(dateObj.getTime());
  },

  compareDates: (date1: Date | string, date2: Date | string): number => {
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
    
    return d1.getTime() - d2.getTime();
  },

  isDateInRange: (date: Date | string, min?: Date | string, max?: Date | string): boolean => {
    if (!DATE_UTILS.isValidDate(date)) return false;
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (min && DATE_UTILS.compareDates(dateObj, min) < 0) return false;
    if (max && DATE_UTILS.compareDates(dateObj, max) > 0) return false;
    
    return true;
  },
} as const;

// Export all constants as a single object
export const DATEPICKER_CONSTANTS: DatePickerConstants = {
  VARIANTS: DATEPICKER_VARIANTS,
  SIZES: DATEPICKER_SIZES,
  TYPES: DATEPICKER_TYPES,
  FORMATS: DATE_FORMATS,
  VALIDATION_STATES: VALIDATION_STATES,
  DEFAULT_PROPS: DEFAULT_DATEPICKER_PROPS,
  ACCESSIBILITY: ACCESSIBILITY_CONSTANTS,
  DATE_FORMATS: DATE_FORMAT_PATTERNS,
  TIME_FORMATS: {
    '12H': DATE_FORMAT_PATTERNS.TIME_12H,
    '24H': DATE_FORMAT_PATTERNS.TIME_24H,
  },
} as const;