// 🚀 Advanced Validation Engine - Caching, Async Support, and Performance Optimization
import { debounce } from 'lodash';
import { z, type ZodError, type ZodSchema } from 'zod';

import type {
  ValidationResult,
  ValidationRule,
  ValidationCache,
  ConditionalRule,
  FieldDependency,
} from '../types';

// ===== VALIDATION ENGINE CLASS =====

export class ValidationEngine {
  private cache: ValidationCache;
  private pendingValidations: Map<string, Promise<ValidationResult>>;
  private debouncedValidations: Map<string, ReturnType<typeof debounce>>;
  
  constructor() {
    this.cache = new InMemoryValidationCache();
    this.pendingValidations = new Map();
    this.debouncedValidations = new Map();
  }
  
  // ===== SYNC VALIDATION =====
  
  async validateSync(
    value: any,
    rules: ValidationRule[],
    fieldName: string
  ): Promise<ValidationResult> {
    const cacheKey = this.generateCacheKey(fieldName, value, rules);
    
    // Check cache first
    const cachedResult = await this.cache.get(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }
    
    const result = await this.performValidation(value, rules, fieldName);
    
    // Cache the result
    await this.cache.set(cacheKey, result);
    
    return result;
  }
  
  // ===== ASYNC VALIDATION =====
  
  async validateAsync(
    value: any,
    rules: ValidationRule[],
    fieldName: string,
    debounceMs = 300
  ): Promise<ValidationResult> {
    const cacheKey = this.generateCacheKey(fieldName, value, rules);
    
    // Check if validation is already pending
    if (this.pendingValidations.has(cacheKey)) {
      return this.pendingValidations.get(cacheKey)!;
    }
    
    // Create debounced validation if not exists
    if (!this.debouncedValidations.has(fieldName)) {
      this.debouncedValidations.set(
        fieldName,
        debounce(this.performAsyncValidation.bind(this), debounceMs)
      );
    }
    
    const debouncedValidation = this.debouncedValidations.get(fieldName)!;
    
    // Create validation promise
    const validationPromise = new Promise<ValidationResult>((resolve, reject) => {
      debouncedValidation(value, rules, fieldName, resolve, reject);
    });
    
    // Store pending validation
    this.pendingValidations.set(cacheKey, validationPromise);
    
    try {
      const result = await validationPromise;
      
      // Cache the result
      await this.cache.set(cacheKey, result);
      
      return result;
    } finally {
      // Remove from pending
      this.pendingValidations.delete(cacheKey);
    }
  }
  
  // ===== SCHEMA VALIDATION =====
  
  async validateSchema(
    value: any,
    schema: ZodSchema,
    fieldName: string
  ): Promise<ValidationResult> {
    const cacheKey = this.generateCacheKey(fieldName, value, [{ rule: 'schema', params: schema }]);
    
    // Check cache first
    const cachedResult = await this.cache.get(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }
    
    try {
      await schema.parseAsync(value);
      const result: ValidationResult = {
        isValid: true,
      };
      
      // Cache the result
      await this.cache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      const zodError = error as ZodError;
      const result: ValidationResult = {
        isValid: false,
        message: zodError.errors[0]?.message || 'Validation failed',
        code: zodError.errors[0]?.code,
        details: zodError.errors,
      };
      
      // Cache the result
      await this.cache.set(cacheKey, result);
      
      return result;
    }
  }
  
  // ===== CONDITIONAL VALIDATION =====
  
  async validateConditional(
    value: any,
    formValues: any,
    rules: ConditionalRule[],
    fieldName: string
  ): Promise<ValidationResult> {
    const applicableRules = rules.filter(rule => 
      rule.field === fieldName && rule.condition(value, formValues)
    );
    
    if (applicableRules.length === 0) {
      return { isValid: true };
    }
    
    // Process each applicable rule
    for (const rule of applicableRules) {
      if (rule.validation instanceof ZodSchema) {
        const result = await this.validateSchema(value, rule.validation, fieldName);
        if (!result.isValid) {
          return {
            ...result,
            message: rule.message || result.message,
          };
        }
      } else {
        const result = await this.validateSync(value, rule.validation, fieldName);
        if (!result.isValid) {
          return {
            ...result,
            message: rule.message || result.message,
          };
        }
      }
    }
    
    return { isValid: true };
  }
  
  // ===== DEPENDENCY VALIDATION =====
  
  async validateDependencies(
    changedField: string,
    changedValue: any,
    formValues: any,
    dependencies: FieldDependency[]
  ): Promise<Record<string, ValidationResult>> {
    const results: Record<string, ValidationResult> = {};
    
    const affectedDependencies = dependencies.filter(dep => {
      const dependsOnFields = Array.isArray(dep.dependsOn) ? dep.dependsOn : [dep.dependsOn];
      return dependsOnFields.includes(changedField);
    });
    
    for (const dependency of affectedDependencies) {
      const shouldTrigger = dependency.condition(changedValue, formValues);
      
      if (shouldTrigger) {
        const fieldValue = formValues[dependency.field];
        
        // For now, we'll just mark as valid. In a real implementation,
        // this would trigger validation of the dependent field
        results[dependency.field] = {
          isValid: true,
          message: `Dependent field ${dependency.field} updated`,
        };
      }
    }
    
    return results;
  }
  
  // ===== BATCH VALIDATION =====
  
  async validateBatch(
    values: Record<string, any>,
    validationRules: Record<string, ValidationRule[]>
  ): Promise<Record<string, ValidationResult>> {
    const results: Record<string, ValidationResult> = {};
    
    // Validate all fields in parallel
    const validationPromises = Object.entries(validationRules).map(
      async ([fieldName, rules]) => {
        const value = values[fieldName];
        const result = await this.validateSync(value, rules, fieldName);
        return [fieldName, result] as const;
      }
    );
    
    const validationResults = await Promise.all(validationPromises);
    
    validationResults.forEach(([fieldName, result]) => {
      results[fieldName] = result;
    });
    
    return results;
  }
  
  // ===== PERFORMANCE METHODS =====
  
  async warmCache(
    values: Record<string, any>,
    validationRules: Record<string, ValidationRule[]>
  ): Promise<void> {
    // Pre-populate cache with common validation results
    const warmupPromises = Object.entries(validationRules).map(
      async ([fieldName, rules]) => {
        const value = values[fieldName];
        if (value !== undefined && value !== null) {
          await this.validateSync(value, rules, fieldName);
        }
      }
    );
    
    await Promise.all(warmupPromises);
  }
  
  clearCache(): void {
    this.cache.clear();
    this.pendingValidations.clear();
    this.debouncedValidations.clear();
  }
  
  getCacheStats(): { size: number; hitRate: number } {
    if (this.cache instanceof InMemoryValidationCache) {
      return this.cache.getStats();
    }
    return { size: 0, hitRate: 0 };
  }
  
  // ===== PRIVATE METHODS =====
  
  private async performValidation(
    value: any,
    rules: ValidationRule[],
    fieldName: string
  ): Promise<ValidationResult> {
    for (const rule of rules) {
      const result = await this.validateRule(value, rule, fieldName);
      if (!result.isValid) {
        return result;
      }
    }
    
    return { isValid: true };
  }
  
  private async performAsyncValidation(
    value: any,
    rules: ValidationRule[],
    fieldName: string,
    resolve: (result: ValidationResult) => void,
    reject: (error: any) => void
  ): Promise<void> {
    try {
      const result = await this.performValidation(value, rules, fieldName);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  }
  
  private async validateRule(
    value: any,
    rule: ValidationRule,
    fieldName: string
  ): Promise<ValidationResult> {
    try {
      switch (rule.rule) {
        case 'required':
          return {
            isValid: value !== null && value !== undefined && value !== '',
            message: rule.message || `${fieldName} is required`,
          };
        
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return {
            isValid: !value || emailRegex.test(value),
            message: rule.message || 'Invalid email format',
          };
        
        case 'phone':
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          return {
            isValid: !value || phoneRegex.test(value),
            message: rule.message || 'Invalid phone number',
          };
        
        case 'url':
          try {
            if (!value) return { isValid: true };
            new URL(value);
            return { isValid: true };
          } catch {
            return {
              isValid: false,
              message: rule.message || 'Invalid URL format',
            };
          }
        
        case 'custom':
          if (rule.params && typeof rule.params === 'function') {
            if (rule.async) {
              const result = await rule.params(value);
              return {
                isValid: result === true,
                message: rule.message || 'Validation failed',
              };
            } else {
              const result = rule.params(value);
              return {
                isValid: result === true,
                message: rule.message || 'Validation failed',
              };
            }
          }
          return { isValid: true };
        
        default:
          return { isValid: true };
      }
    } catch (error) {
      return {
        isValid: false,
        message: rule.message || 'Validation error occurred',
        details: error,
      };
    }
  }
  
  private generateCacheKey(
    fieldName: string,
    value: any,
    rules: ValidationRule[]
  ): string {
    const ruleHash = rules
      .map(rule => `${rule.rule}-${rule.async ? 'async' : 'sync'}`)
      .join('|');
    
    return `${fieldName}:${JSON.stringify(value)}:${ruleHash}`;
  }
}

// ===== IN-MEMORY CACHE IMPLEMENTATION =====

class InMemoryValidationCache implements ValidationCache {
  private cache: Map<string, { result: ValidationResult; expiry: number }>;
  private hits: number;
  private misses: number;
  
  constructor() {
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
  }
  
  async get(key: string): Promise<ValidationResult | null> {
    const cached = this.cache.get(key);
    
    if (cached && cached.expiry > Date.now()) {
      this.hits++;
      return cached.result;
    }
    
    this.misses++;
    return null;
  }
  
  async set(key: string, result: ValidationResult, ttl = 300000): Promise<void> {
    this.cache.set(key, {
      result,
      expiry: Date.now() + ttl,
    });
  }
  
  async invalidate(key: string): Promise<void> {
    this.cache.delete(key);
  }
  
  async clear(): Promise<void> {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }
  
  getStats(): { size: number; hitRate: number } {
    const total = this.hits + this.misses;
    return {
      size: this.cache.size,
      hitRate: total > 0 ? this.hits / total : 0,
    };
  }
}

// ===== VALIDATION UTILITIES =====

const commonValidationRules = {
  required: (message?: string): ValidationRule => ({
    rule: 'required',
    message: message || 'This field is required',
  }),
  
  email: (message?: string): ValidationRule => ({
    rule: 'email',
    message: message || 'Invalid email format',
  }),
  
  phone: (message?: string): ValidationRule => ({
    rule: 'phone',
    message: message || 'Invalid phone number',
  }),
  
  url: (message?: string): ValidationRule => ({
    rule: 'url',
    message: message || 'Invalid URL format',
  }),
  
  custom: (
    validator: (value: any) => boolean | Promise<boolean>,
    message?: string,
    isAsync = false
  ): ValidationRule => ({
    rule: 'custom',
    params: validator,
    message: message || 'Validation failed',
    async: isAsync,
  }),
};

// ===== EXPORTS =====

export default ValidationEngine;
export { InMemoryValidationCache, commonValidationRules };
export type { ValidationResult, ValidationRule, ValidationCache };