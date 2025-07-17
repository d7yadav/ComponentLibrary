// 🚀 Expert React Form System - Main Export
export * from './core';
export * from './components';
export * from './patterns';
export * from './validation';
export * from './state';
export * from './i18n';
export * from './themes';
export * from './analytics';
export * from './utils';

// Main form system exports
export { SmartFormProvider } from './core/providers/FormProvider';
export { useAdvancedForm } from './core/hooks/useAdvancedForm';
export { FormBuilder } from './builder/FormBuilder';

// Common components
export { SmartTextField } from './components/fields/SmartTextField';
export { SmartSelect } from './components/fields/SmartSelect';
export { SmartAutocomplete } from './components/fields/SmartAutocomplete';
export { SmartDatePicker } from './components/fields/SmartDatePicker';

// Advanced patterns
export { FormWizard } from './patterns/FormWizard';
export { DynamicForm } from './patterns/DynamicForm';
export { ConditionalFields } from './patterns/ConditionalFields';
export { FormArrays } from './patterns/FormArrays';

// Types
export type * from './types';