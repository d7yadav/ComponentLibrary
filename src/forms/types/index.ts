// 🎯 Expert Form System - Core Types
import type { ReactNode } from 'react';
import type { UseFormReturn, FieldValues, Path} from 'react-hook-form';
import { PathValue } from 'react-hook-form';
import type { z, ZodSchema } from 'zod';

// ===== CORE TYPES =====

export interface SmartFormConfig<T extends FieldValues = FieldValues> {
  schema?: ZodSchema<T>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit';
  reValidateMode?: 'onChange' | 'onBlur';
  defaultValues?: T;
  dependencies?: FieldDependency<T>[];
  conditionalValidation?: ConditionalRule<T>[];
  performance?: {
    debounceMs?: number;
    enabledWatching?: boolean;
    optimizeRerenders?: boolean;
  };
  persistence?: {
    enabled?: boolean;
    key?: string;
    storage?: 'localStorage' | 'sessionStorage' | 'indexedDB';
  };
  analytics?: {
    enabled?: boolean;
    trackingId?: string;
    events?: string[];
  };
  i18n?: {
    locale?: string;
    messages?: Record<string, string>;
  };
}

// ===== FIELD DEPENDENCY TYPES =====

export interface FieldDependency<T extends FieldValues = FieldValues> {
  field: Path<T>;
  dependsOn: Path<T> | Path<T>[];
  condition: (value: any, formValues: T) => boolean;
  action: 'show' | 'hide' | 'enable' | 'disable' | 'setValue' | 'clearValue';
  actionValue?: any;
}

export interface ConditionalRule<T extends FieldValues = FieldValues> {
  field: Path<T>;
  condition: (value: any, formValues: T) => boolean;
  validation: ZodSchema | ValidationRule[];
  message?: string;
}

export interface ValidationRule {
  rule: 'required' | 'email' | 'phone' | 'url' | 'custom';
  message?: string;
  params?: any;
  async?: boolean;
}

// ===== DEEP PATH TYPES =====

export type DeepFormPath<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends Array<infer U>
        ? K extends string
          ? `${K}.${number}` | `${K}.${number}.${DeepFormPath<U>}`
          : never
        : T[K] extends object
        ? K extends string
          ? K | `${K}.${DeepFormPath<T[K]>}`
          : never
        : K
    }[keyof T]
  : never;

export type DeepPathValue<T, P extends string> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends `${number}`
      ? T[Key] extends Array<infer U>
        ? U
        : never
      : Rest extends `${number}.${infer Nested}`
      ? T[Key] extends Array<infer U>
        ? DeepPathValue<U, Nested>
        : never
      : T[Key] extends object
      ? DeepPathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

// ===== FORM FIELD TYPES =====

export interface FormFieldConfig {
  name: string;
  type: 'text' | 'select' | 'checkbox' | 'radio' | 'date' | 'file' | 'autocomplete' | 'rich-text' | 'phone' | 'address' | 'signature';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule[];
  dependencies?: FieldDependency[];
  props?: Record<string, any>;
  formatter?: {
    display?: (value: any) => string;
    parse?: (value: string) => any;
  };
  suggestions?: string[] | ((value: string) => Promise<string[]>);
  options?: SelectOption[] | ((parentValue: any) => Promise<SelectOption[]>);
  condition?: (formValues: any) => boolean;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
  icon?: ReactNode;
  description?: string;
}

// ===== FORM SECTION TYPES =====

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormFieldConfig[];
  condition?: (values: any) => boolean;
  order?: number;
}

export interface FormBranch {
  id: string;
  condition: (formData: any) => boolean;
  fields: FormFieldConfig[];
  subBranches?: FormBranch[];
}

// ===== WIZARD TYPES =====

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  fields: string[];
  validation?: ZodSchema;
  canSkip?: boolean;
  condition?: (values: any) => boolean;
  onEnter?: (values: any) => void;
  onExit?: (values: any) => void;
}

export interface WizardConfig {
  steps: WizardStep[];
  allowBackNavigation?: boolean;
  persistProgress?: boolean;
  showProgress?: boolean;
  onStepChange?: (step: number) => void;
  onComplete?: (data: any) => void;
}

// ===== PERFORMANCE TYPES =====

export interface FormMetrics {
  renderCount: number;
  fieldUpdates: number;
  validationTime: number;
  lastUpdate: number;
  memoryUsage?: number;
}

export interface PerformanceOptions {
  debounceMs?: number;
  enabledWatching?: boolean;
  optimizeRerenders?: boolean;
  virtualScrolling?: boolean;
  lazyLoading?: boolean;
}

// ===== PERSISTENCE TYPES =====

export interface PersistenceConfig {
  enabled: boolean;
  key: string;
  storage: 'localStorage' | 'sessionStorage' | 'indexedDB';
  compress?: boolean;
  encrypt?: boolean;
  ttl?: number;
}

export interface FormVersion {
  id: string;
  formId: string;
  version: number;
  data: any;
  timestamp: Date;
  userId: string;
  changeDescription: string;
}

// ===== COLLABORATION TYPES =====

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'idle' | 'offline';
  lastSeen: Date;
}

export interface CollaborationConfig {
  enabled: boolean;
  websocketUrl: string;
  userId: string;
  roomId: string;
  permissions?: CollaborationPermissions;
}

export interface CollaborationPermissions {
  canEdit: boolean;
  canComment: boolean;
  canShare: boolean;
  fieldRestrictions?: Record<string, boolean>;
}

// ===== ANALYTICS TYPES =====

export interface AnalyticsConfig {
  enabled: boolean;
  trackingId: string;
  events: AnalyticsEvent[];
  customDimensions?: Record<string, any>;
}

export interface AnalyticsEvent {
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  customData?: Record<string, any>;
}

export interface FormInsights {
  completionRate: number;
  averageTime: number;
  dropoffPoints: string[];
  errorFields: string[];
  popularFields: string[];
}

// ===== ACCESSIBILITY TYPES =====

export interface AccessibilityConfig {
  enabled: boolean;
  announceChanges: boolean;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReaderOptimized: boolean;
}

export interface AccessibilityState {
  announcements: string[];
  focusHistory: string[];
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

// ===== INTERNATIONALIZATION TYPES =====

export interface I18nConfig {
  locale: string;
  fallbackLocale?: string;
  messages: Record<string, string>;
  dateFormat?: string;
  numberFormat?: string;
  rtl?: boolean;
}

export interface LocaleData {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
  dateFormat: string;
  numberFormat: string;
  currency: string;
}

// ===== SECURITY TYPES =====

export interface SecurityConfig {
  sanitizeInput: boolean;
  encryptSensitiveFields: boolean;
  auditLog: boolean;
  csrfProtection: boolean;
  xssProtection: boolean;
}

export interface EncryptionConfig {
  algorithm: 'AES-GCM' | 'AES-CBC';
  keyLength: 128 | 192 | 256;
  iv?: Uint8Array;
}

// ===== THEME TYPES =====

export interface FormTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    error: string;
    warning: string;
    info: string;
    success: string;
    text: string;
    background: string;
    surface: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

// ===== ADVANCED FIELD TYPES =====

export interface SmartTextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule[];
  dependencies?: FieldDependency[];
  formatters?: {
    onInput?: (value: string) => string;
    onDisplay?: (value: string) => string;
  };
  suggestions?: string[] | ((value: string) => Promise<string[]>);
  debounceMs?: number;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
}

export interface SmartSelectProps {
  name: string;
  label: string;
  options: SelectOption[] | ((parentValue: any) => Promise<SelectOption[]>);
  dependsOn?: string;
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  grouped?: boolean;
  virtualized?: boolean;
  loading?: boolean;
  clearable?: boolean;
  creatable?: boolean;
  onCreateOption?: (inputValue: string) => SelectOption;
}

export interface SmartAutocompleteProps {
  name: string;
  label: string;
  options: SelectOption[] | ((inputValue: string) => Promise<SelectOption[]>);
  placeholder?: string;
  multiple?: boolean;
  freeSolo?: boolean;
  clearable?: boolean;
  loading?: boolean;
  debounceMs?: number;
  minInputLength?: number;
  maxResults?: number;
  filterOptions?: (options: SelectOption[], inputValue: string) => SelectOption[];
  renderOption?: (option: SelectOption) => ReactNode;
  renderInput?: (params: any) => ReactNode;
}

// ===== EXPORT ADVANCED FORM HOOK =====

export interface AdvancedFormReturn<T extends FieldValues = FieldValues> extends UseFormReturn<T> {
  // Enhanced watch with optimizations
  watchOptimized: (names?: string | string[]) => any;
  
  // Dependency management
  manageDependencies: (changedField: string, value: any) => void;
  
  // Conditional validation
  validateConditionally: (fieldName: string, value: any) => Promise<void>;
  
  // Performance metrics
  metrics: FormMetrics;
  
  // Persistence
  save: (key?: string) => Promise<void>;
  load: (key?: string) => Promise<void>;
  
  // Collaboration
  collaborate: (config: CollaborationConfig) => void;
  
  // Analytics
  track: (event: AnalyticsEvent) => void;
  
  // Accessibility
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  
  // Internationalization
  t: (key: string, params?: Record<string, any>) => string;
  
  // Security
  sanitize: (value: any) => any;
  encrypt: (value: string) => Promise<string>;
  decrypt: (value: string) => Promise<string>;
}

// ===== FORM BUILDER TYPES =====

export interface FormBuilderConfig {
  sections: FormSection[];
  config: SmartFormConfig;
  theme?: FormTheme;
  plugins?: FormPlugin[];
}

export interface FormPlugin {
  name: string;
  version: string;
  install: (builder: any) => void;
  uninstall?: (builder: any) => void;
}

// ===== TESTING TYPES =====

export interface FormTestUtils {
  renderForm: (config: SmartFormConfig) => any;
  fillField: (name: string, value: any) => void;
  submitForm: () => Promise<void>;
  expectValidation: (field: string, error: string) => void;
  expectFieldValue: (field: string, value: any) => void;
  simulateUserAction: (action: string, target: string) => void;
}

export interface MockFormData {
  valid: Record<string, any>;
  invalid: Record<string, any>;
  edge: Record<string, any>;
}

// ===== SYNC TYPES =====

export interface SyncOperation {
  id: string;
  type: 'save' | 'update' | 'delete';
  formId: string;
  data: any;
  timestamp: number;
  userId?: string;
  retryCount?: number;
}

export interface SyncConfig {
  enabled: boolean;
  endpoint: string;
  retryAttempts: number;
  retryDelay: number;
  conflictResolution: 'client' | 'server' | 'manual';
}

// ===== VALIDATION CACHE TYPES =====

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  code?: string;
  details?: any;
}

export interface ValidationCache {
  get: (key: string) => Promise<ValidationResult | null>;
  set: (key: string, result: ValidationResult, ttl?: number) => Promise<void>;
  invalidate: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}

// ===== TENANT TYPES =====

export interface TenantFormConfig {
  tenantId: string;
  formSchema: ZodSchema;
  validationRules: ValidationRule[];
  uiConfig: UIConfiguration;
  permissions: FormPermissions;
  theme?: FormTheme;
  features?: string[];
}

export interface UIConfiguration {
  layout: 'vertical' | 'horizontal' | 'grid';
  density: 'compact' | 'comfortable' | 'spacious';
  fields: Record<string, FormFieldConfig>;
  sections: FormSection[];
  customComponents?: Record<string, any>;
}

export interface FormPermissions {
  read: boolean;
  write: boolean;
  delete: boolean;
  share: boolean;
  fields: Record<string, {
    read: boolean;
    write: boolean;
    required?: boolean;
  }>;
}