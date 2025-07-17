// 🚀 Expert Form Provider - Enhanced Context with Advanced Features
import React, { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { z, type ZodSchema } from 'zod';

import type {
  SmartFormConfig,
  FormMetrics,
  PersistenceConfig,
  CollaborationConfig,
  AnalyticsConfig,
  AccessibilityConfig,
  I18nConfig,
  SecurityConfig,
  FormTheme,
  AdvancedFormReturn,
  ValidationCache,
} from '../../types';

// ===== CONTEXT INTERFACES =====

interface FormProviderContextValue {
  // Core form instance
  form: AdvancedFormReturn;
  
  // Configuration
  config: SmartFormConfig;
  
  // Enhanced features
  metrics: FormMetrics;
  theme: FormTheme;
  i18n: I18nConfig;
  
  // Advanced capabilities
  persistence: PersistenceConfig;
  collaboration: CollaborationConfig;
  analytics: AnalyticsConfig;
  accessibility: AccessibilityConfig;
  security: SecurityConfig;
  
  // Validation cache
  validationCache: ValidationCache;
  
  // State management
  isOnline: boolean;
  syncStatus: 'idle' | 'syncing' | 'error' | 'success';
  
  // Methods
  saveForm: (key?: string) => Promise<void>;
  loadForm: (key?: string) => Promise<void>;
  clearForm: () => void;
  exportForm: (format: 'json' | 'csv' | 'pdf') => Promise<Blob>;
  
  // Analytics
  trackEvent: (eventName: string, data?: Record<string, any>) => void;
  
  // Accessibility
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
  
  // i18n
  t: (key: string, params?: Record<string, any>) => string;
  
  // Collaboration
  startCollaboration: (config: CollaborationConfig) => Promise<void>;
  stopCollaboration: () => void;
  collaborators: Array<{ id: string; name: string; status: string }>;
  
  // Performance
  optimizePerformance: () => void;
  getPerformanceMetrics: () => FormMetrics;
}

// ===== CONTEXT CREATION =====

const FormProviderContext = createContext<FormProviderContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormProviderContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

// ===== PROVIDER COMPONENT =====

interface SmartFormProviderProps {
  children: React.ReactNode;
  form: AdvancedFormReturn;
  config: SmartFormConfig;
  theme?: FormTheme;
  onSubmit?: (data: any) => void | Promise<void>;
  onError?: (errors: any) => void;
}

export const SmartFormProvider: React.FC<SmartFormProviderProps> = ({
  children,
  form,
  config,
  theme = defaultTheme,
  onSubmit,
  onError,
}) => {
  // ===== STATE MANAGEMENT =====
  
  const [metrics, setMetrics] = useState<FormMetrics>({
    renderCount: 0,
    fieldUpdates: 0,
    validationTime: 0,
    lastUpdate: Date.now(),
  });
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error' | 'success'>('idle');
  const [collaborators, setCollaborators] = useState<Array<{ id: string; name: string; status: string }>>([]);
  
  // ===== CONFIGURATION WITH DEFAULTS =====
  
  const mergedConfig = useMemo(() => ({
    mode: 'onChange' as const,
    reValidateMode: 'onChange' as const,
    performance: {
      debounceMs: 300,
      enabledWatching: true,
      optimizeRerenders: true,
    },
    persistence: {
      enabled: false,
      key: 'smart-form',
      storage: 'localStorage' as const,
    },
    analytics: {
      enabled: false,
      trackingId: '',
      events: [],
    },
    i18n: {
      locale: 'en',
      messages: {},
    },
    ...config,
  }), [config]);
  
  // ===== VALIDATION CACHE =====
  
  const validationCache = useMemo<ValidationCache>(() => ({
    cache: new Map(),
    
    async get(key: string) {
      const cached = this.cache.get(key);
      if (cached && cached.expiry > Date.now()) {
        return cached.result;
      }
      return null;
    },
    
    async set(key: string, result: any, ttl = 300000) { // 5 minutes default
      this.cache.set(key, {
        result,
        expiry: Date.now() + ttl,
      });
    },
    
    async invalidate(key: string) {
      this.cache.delete(key);
    },
    
    async clear() {
      this.cache.clear();
    },
  }), []);
  
  // ===== ONLINE STATUS MONITORING =====
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // ===== FORM PERSISTENCE =====
  
  const saveForm = useCallback(async (key?: string) => {
    if (!mergedConfig.persistence?.enabled) return;
    
    const formData = form.getValues();
    const storageKey = key || mergedConfig.persistence.key;
    
    try {
      setSyncStatus('syncing');
      
      if (mergedConfig.persistence.storage === 'localStorage') {
        localStorage.setItem(storageKey, JSON.stringify(formData));
      } else if (mergedConfig.persistence.storage === 'sessionStorage') {
        sessionStorage.setItem(storageKey, JSON.stringify(formData));
      }
      
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 2000);
    } catch (error) {
      setSyncStatus('error');
      console.error('Failed to save form:', error);
    }
  }, [form, mergedConfig.persistence]);
  
  const loadForm = useCallback(async (key?: string) => {
    if (!mergedConfig.persistence?.enabled) return;
    
    const storageKey = key || mergedConfig.persistence.key;
    
    try {
      let savedData: string | null = null;
      
      if (mergedConfig.persistence.storage === 'localStorage') {
        savedData = localStorage.getItem(storageKey);
      } else if (mergedConfig.persistence.storage === 'sessionStorage') {
        savedData = sessionStorage.getItem(storageKey);
      }
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
      }
    } catch (error) {
      console.error('Failed to load form:', error);
    }
  }, [form, mergedConfig.persistence]);
  
  const clearForm = useCallback(() => {
    form.reset();
    if (mergedConfig.persistence?.enabled) {
      const storageKey = mergedConfig.persistence.key;
      localStorage.removeItem(storageKey);
      sessionStorage.removeItem(storageKey);
    }
  }, [form, mergedConfig.persistence]);
  
  // ===== ANALYTICS =====
  
  const trackEvent = useCallback((eventName: string, data?: Record<string, any>) => {
    if (!mergedConfig.analytics?.enabled) return;
    
    const eventData = {
      event: eventName,
      timestamp: Date.now(),
      formId: mergedConfig.analytics.trackingId,
      ...data,
    };
    
    // Send to analytics service
    console.log('Analytics Event:', eventData);
  }, [mergedConfig.analytics]);
  
  // ===== ACCESSIBILITY =====
  
  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);
  
  // ===== INTERNATIONALIZATION =====
  
  const t = useCallback((key: string, params?: Record<string, any>) => {
    const messages = mergedConfig.i18n?.messages || {};
    let message = messages[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        message = message.replace(`{{${param}}}`, String(value));
      });
    }
    
    return message;
  }, [mergedConfig.i18n]);
  
  // ===== COLLABORATION =====
  
  const startCollaboration = useCallback(async (config: CollaborationConfig) => {
    try {
      // WebSocket implementation would go here
      console.log('Starting collaboration:', config);
      setCollaborators([
        { id: '1', name: 'John Doe', status: 'active' },
        { id: '2', name: 'Jane Smith', status: 'idle' },
      ]);
    } catch (error) {
      console.error('Failed to start collaboration:', error);
    }
  }, []);
  
  const stopCollaboration = useCallback(() => {
    setCollaborators([]);
  }, []);
  
  // ===== PERFORMANCE OPTIMIZATION =====
  
  const optimizePerformance = useCallback(() => {
    // Implement performance optimizations
    setMetrics(prev => ({
      ...prev,
      renderCount: prev.renderCount + 1,
      lastUpdate: Date.now(),
    }));
  }, []);
  
  const getPerformanceMetrics = useCallback(() => metrics, [metrics]);
  
  // ===== EXPORT FUNCTIONALITY =====
  
  const exportForm = useCallback(async (format: 'json' | 'csv' | 'pdf'): Promise<Blob> => {
    const formData = form.getValues();
    
    switch (format) {
      case 'json':
        return new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
      case 'csv':
        // Convert to CSV format
        const csv = Object.entries(formData)
          .map(([key, value]) => `${key},${value}`)
          .join('\n');
        return new Blob([csv], { type: 'text/csv' });
      case 'pdf':
        // PDF generation would require a library like jsPDF
        return new Blob(['PDF export not implemented'], { type: 'application/pdf' });
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }, [form]);
  
  // ===== CONTEXT VALUE =====
  
  const contextValue = useMemo<FormProviderContextValue>(() => ({
    form,
    config: mergedConfig,
    metrics,
    theme,
    i18n: mergedConfig.i18n,
    persistence: mergedConfig.persistence,
    collaboration: {} as CollaborationConfig,
    analytics: mergedConfig.analytics,
    accessibility: {} as AccessibilityConfig,
    security: {} as SecurityConfig,
    validationCache,
    isOnline,
    syncStatus,
    saveForm,
    loadForm,
    clearForm,
    exportForm,
    trackEvent,
    announceToScreenReader,
    t,
    startCollaboration,
    stopCollaboration,
    collaborators,
    optimizePerformance,
    getPerformanceMetrics,
  }), [
    form,
    mergedConfig,
    metrics,
    theme,
    validationCache,
    isOnline,
    syncStatus,
    saveForm,
    loadForm,
    clearForm,
    exportForm,
    trackEvent,
    announceToScreenReader,
    t,
    startCollaboration,
    stopCollaboration,
    collaborators,
    optimizePerformance,
    getPerformanceMetrics,
  ]);
  
  return (
    <FormProviderContext.Provider value={contextValue}>
      {children}
    </FormProviderContext.Provider>
  );
};

// ===== DEFAULT THEME =====

const defaultTheme: FormTheme = {
  name: 'default',
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    success: '#4caf50',
    text: '#212121',
    background: '#ffffff',
    surface: '#f5f5f5',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
};

// ===== EXPORTS =====

export type { FormProviderContextValue };
export { FormProviderContext };