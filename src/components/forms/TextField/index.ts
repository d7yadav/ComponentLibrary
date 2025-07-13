/**
 * @fileoverview TextField component barrel export
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

export { TextField } from './TextField';
export type { 
  TextFieldProps, 
  TextFieldVariant, 
  TextFieldSize, 
  TextFieldInputType,
  ValidationState,
  TextFieldStyleProps,
  ValidationResult,
  FormIntegrationProps
} from './TextField.types';
export {
  TEXTFIELD_VARIANTS,
  TEXTFIELD_SIZES,
  TEXTFIELD_INPUT_TYPES,
  VALIDATION_STATES,
  TEXTFIELD_SIZE_CONFIGS,
  VALIDATION_STATE_COLORS,
  TEXTFIELD_ANIMATION_DURATIONS,
  TEXTFIELD_ANIMATION_EASINGS,
  ACCESSIBILITY_CONSTANTS,
  INPUT_VALIDATION_PATTERNS,
  CHARACTER_COUNT_CONFIGS,
  DEFAULT_VALIDATION_MESSAGES,
  MULTILINE_CONFIGS,
  FORM_INTEGRATION_CONFIGS,
} from './TextField.constants';