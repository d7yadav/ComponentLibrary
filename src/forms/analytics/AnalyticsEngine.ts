// 🚀 Analytics Engine - Performance Tracking and User Insights
import { debounce } from 'lodash';

import type {
  AnalyticsConfig,
  AnalyticsEvent,
  FormInsights,
  FormMetrics,
} from '../types';

// ===== ANALYTICS ENGINE =====

export class AnalyticsEngine {
  private config: AnalyticsConfig;
  private events: AnalyticsEvent[] = [];
  private metrics: FormMetrics;
  private startTime: number;
  private fieldInteractionTimes: Map<string, number> = new Map();
  private fieldErrorCounts: Map<string, number> = new Map();
  private fieldCompletionTimes: Map<string, number> = new Map();
  private dropoffPoints: Set<string> = new Set();
  private isTracking: boolean = false;
  
  constructor(config: AnalyticsConfig) {
    this.config = config;
    this.startTime = Date.now();
    this.metrics = {
      renderCount: 0,
      fieldUpdates: 0,
      validationTime: 0,
      lastUpdate: Date.now(),
    };
    
    // Start tracking if enabled
    if (config.enabled) {
      this.startTracking();
    }
  }
  
  // ===== TRACKING METHODS =====
  
  startTracking(): void {
    if (this.isTracking) return;
    
    this.isTracking = true;
    this.startTime = Date.now();
    
    this.trackEvent({
      name: 'form_started',
      category: 'form',
      action: 'start',
      label: this.config.trackingId,
    });
  }
  
  stopTracking(): void {
    if (!this.isTracking) return;
    
    this.isTracking = false;
    
    this.trackEvent({
      name: 'form_stopped',
      category: 'form',
      action: 'stop',
      label: this.config.trackingId,
      value: Date.now() - this.startTime,
    });
  }
  
  // ===== EVENT TRACKING =====
  
  trackEvent(event: AnalyticsEvent): void {
    if (!this.config.enabled) return;
    
    const enhancedEvent: AnalyticsEvent = {
      ...event,
      customData: {
        ...event.customData,
        timestamp: Date.now(),
        formId: this.config.trackingId,
        sessionId: this.generateSessionId(),
        userAgent: navigator.userAgent,
        ...this.config.customDimensions,
      },
    };
    
    this.events.push(enhancedEvent);
    
    // Send to analytics service
    this.sendEvent(enhancedEvent);
    
    // Update metrics based on event
    this.updateMetricsFromEvent(enhancedEvent);
  }
  
  // ===== FIELD TRACKING =====
  
  trackFieldInteraction(fieldName: string, interactionType: 'focus' | 'blur' | 'change'): void {
    const timestamp = Date.now();
    
    switch (interactionType) {
      case 'focus':
        this.fieldInteractionTimes.set(fieldName, timestamp);
        this.trackEvent({
          name: 'field_focus',
          category: 'field',
          action: 'focus',
          label: fieldName,
        });
        break;
      
      case 'blur':
        const startTime = this.fieldInteractionTimes.get(fieldName);
        if (startTime) {
          const duration = timestamp - startTime;
          this.fieldCompletionTimes.set(fieldName, duration);
          
          this.trackEvent({
            name: 'field_blur',
            category: 'field',
            action: 'blur',
            label: fieldName,
            value: duration,
          });
        }
        break;
      
      case 'change':
        this.trackEvent({
          name: 'field_change',
          category: 'field',
          action: 'change',
          label: fieldName,
        });
        break;
    }
  }
  
  trackFieldError(fieldName: string, errorMessage: string): void {
    const currentCount = this.fieldErrorCounts.get(fieldName) || 0;
    this.fieldErrorCounts.set(fieldName, currentCount + 1);
    
    this.trackEvent({
      name: 'field_error',
      category: 'validation',
      action: 'error',
      label: fieldName,
      customData: {
        errorMessage,
        errorCount: currentCount + 1,
      },
    });
  }
  
  trackFieldValidation(fieldName: string, isValid: boolean, validationTime: number): void {
    this.trackEvent({
      name: 'field_validation',
      category: 'validation',
      action: isValid ? 'success' : 'failure',
      label: fieldName,
      value: validationTime,
    });
  }
  
  // ===== FORM TRACKING =====
  
  trackFormSubmission(isSuccessful: boolean, data?: any): void {
    const duration = Date.now() - this.startTime;
    
    this.trackEvent({
      name: 'form_submission',
      category: 'form',
      action: isSuccessful ? 'submit_success' : 'submit_failure',
      label: this.config.trackingId,
      value: duration,
      customData: {
        fieldCount: data ? Object.keys(data).length : 0,
        completionTime: duration,
      },
    });
  }
  
  trackFormAbandon(currentField?: string): void {
    const duration = Date.now() - this.startTime;
    
    if (currentField) {
      this.dropoffPoints.add(currentField);
    }
    
    this.trackEvent({
      name: 'form_abandon',
      category: 'form',
      action: 'abandon',
      label: this.config.trackingId,
      value: duration,
      customData: {
        dropoffField: currentField,
        duration,
      },
    });
  }
  
  trackFormProgress(completedFields: string[], totalFields: number): void {
    const progressPercentage = (completedFields.length / totalFields) * 100;
    
    this.trackEvent({
      name: 'form_progress',
      category: 'form',
      action: 'progress',
      label: this.config.trackingId,
      value: progressPercentage,
      customData: {
        completedFields,
        totalFields,
        progressPercentage,
      },
    });
  }
  
  // ===== PERFORMANCE TRACKING =====
  
  trackPerformanceMetric(metricName: string, value: number, unit: string = 'ms'): void {
    this.trackEvent({
      name: 'performance_metric',
      category: 'performance',
      action: metricName,
      label: this.config.trackingId,
      value,
      customData: {
        unit,
        timestamp: Date.now(),
      },
    });
  }
  
  trackRenderMetrics(renderCount: number, renderTime: number): void {
    this.metrics.renderCount = renderCount;
    this.metrics.lastUpdate = Date.now();
    
    this.trackPerformanceMetric('render_time', renderTime);
    this.trackPerformanceMetric('render_count', renderCount, 'count');
  }
  
  trackValidationMetrics(validationTime: number, fieldName: string): void {
    this.metrics.validationTime = validationTime;
    this.metrics.lastUpdate = Date.now();
    
    this.trackPerformanceMetric('validation_time', validationTime);
    this.trackFieldValidation(fieldName, true, validationTime);
  }
  
  // ===== USER EXPERIENCE TRACKING =====
  
  trackUserExperience(experienceType: 'frustration' | 'satisfaction' | 'confusion', context?: any): void {
    this.trackEvent({
      name: 'user_experience',
      category: 'ux',
      action: experienceType,
      label: this.config.trackingId,
      customData: {
        context,
        timestamp: Date.now(),
      },
    });
  }
  
  trackAccessibilityUsage(feature: string, usage: 'screen_reader' | 'keyboard' | 'voice'): void {
    this.trackEvent({
      name: 'accessibility_usage',
      category: 'accessibility',
      action: usage,
      label: feature,
      customData: {
        formId: this.config.trackingId,
      },
    });
  }
  
  // ===== INSIGHTS GENERATION =====
  
  generateInsights(): FormInsights {
    const totalEvents = this.events.length;
    const submissionEvents = this.events.filter(e => e.name === 'form_submission');
    const errorEvents = this.events.filter(e => e.name === 'field_error');
    const abandonEvents = this.events.filter(e => e.name === 'form_abandon');
    
    // Calculate completion rate
    const completionRate = totalEvents > 0 ? (submissionEvents.length / totalEvents) * 100 : 0;
    
    // Calculate average time
    const completionTimes = submissionEvents.map(e => e.value || 0);
    const averageTime = completionTimes.length > 0 
      ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length 
      : 0;
    
    // Get dropoff points
    const dropoffPoints = Array.from(this.dropoffPoints);
    
    // Get error fields
    const errorFields = Array.from(this.fieldErrorCounts.keys()).sort(
      (a, b) => (this.fieldErrorCounts.get(b) || 0) - (this.fieldErrorCounts.get(a) || 0)
    );
    
    // Get popular fields (most interacted with)
    const fieldInteractions = new Map<string, number>();
    this.events.forEach(event => {
      if (event.category === 'field') {
        const count = fieldInteractions.get(event.label || '') || 0;
        fieldInteractions.set(event.label || '', count + 1);
      }
    });
    
    const popularFields = Array.from(fieldInteractions.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([field]) => field);
    
    return {
      completionRate,
      averageTime,
      dropoffPoints,
      errorFields,
      popularFields,
    };
  }
  
  // ===== REPORTING =====
  
  getMetrics(): FormMetrics {
    return { ...this.metrics };
  }
  
  getEventHistory(): AnalyticsEvent[] {
    return [...this.events];
  }
  
  getFieldStatistics(): Record<string, {
    interactionCount: number;
    errorCount: number;
    averageCompletionTime: number;
  }> {
    const stats: Record<string, any> = {};
    
    // Count interactions
    this.events.forEach(event => {
      if (event.category === 'field' && event.label) {
        if (!stats[event.label]) {
          stats[event.label] = {
            interactionCount: 0,
            errorCount: 0,
            averageCompletionTime: 0,
          };
        }
        stats[event.label].interactionCount++;
      }
    });
    
    // Add error counts
    this.fieldErrorCounts.forEach((count, fieldName) => {
      if (stats[fieldName]) {
        stats[fieldName].errorCount = count;
      }
    });
    
    // Add completion times
    this.fieldCompletionTimes.forEach((time, fieldName) => {
      if (stats[fieldName]) {
        stats[fieldName].averageCompletionTime = time;
      }
    });
    
    return stats;
  }
  
  generateReport(): {
    summary: FormInsights;
    metrics: FormMetrics;
    fieldStats: Record<string, any>;
    eventHistory: AnalyticsEvent[];
  } {
    return {
      summary: this.generateInsights(),
      metrics: this.getMetrics(),
      fieldStats: this.getFieldStatistics(),
      eventHistory: this.getEventHistory(),
    };
  }
  
  // ===== PRIVATE METHODS =====
  
  private sendEvent(event: AnalyticsEvent): void {
    // In a real implementation, this would send to analytics service
    // For now, we'll just log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
    
    // Send to Google Analytics, Adobe Analytics, etc.
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameter: event.customData,
      });
    }
  }
  
  private updateMetricsFromEvent(event: AnalyticsEvent): void {
    switch (event.name) {
      case 'field_change':
        this.metrics.fieldUpdates++;
        break;
      case 'field_validation':
        if (event.value) {
          this.metrics.validationTime = event.value;
        }
        break;
    }
    
    this.metrics.lastUpdate = Date.now();
  }
  
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// ===== DEBOUNCED ANALYTICS =====

export class DebouncedAnalyticsEngine extends AnalyticsEngine {
  private debouncedTrackEvent: ReturnType<typeof debounce>;
  
  constructor(config: AnalyticsConfig, debounceMs: number = 300) {
    super(config);
    
    this.debouncedTrackEvent = debounce(
      (event: AnalyticsEvent) => super.trackEvent(event),
      debounceMs
    );
  }
  
  trackEvent(event: AnalyticsEvent): void {
    // Use debounced version for frequent events
    const frequentEvents = ['field_change', 'field_validation', 'form_progress'];
    
    if (frequentEvents.includes(event.name)) {
      this.debouncedTrackEvent(event);
    } else {
      super.trackEvent(event);
    }
  }
}

// ===== FACTORY FUNCTIONS =====

export const createAnalyticsEngine = (config: AnalyticsConfig): AnalyticsEngine => {
  return new AnalyticsEngine(config);
};

export const createDebouncedAnalyticsEngine = (
  config: AnalyticsConfig,
  debounceMs: number = 300
): DebouncedAnalyticsEngine => {
  return new DebouncedAnalyticsEngine(config, debounceMs);
};

export const createAnalyticsConfig = (
  trackingId: string,
  enabled: boolean = true,
  events: string[] = [],
  customDimensions?: Record<string, any>
): AnalyticsConfig => {
  return {
    enabled,
    trackingId,
    events: events.map(name => ({ name, category: 'form', action: name })),
    customDimensions,
  };
};

// ===== ANALYTICS UTILITIES =====

export const trackFormLifecycle = (analytics: AnalyticsEngine, formId: string) => {
  return {
    onMount: () => {
      analytics.trackEvent({
        name: 'form_mounted',
        category: 'form',
        action: 'mount',
        label: formId,
      });
    },
    
    onUnmount: () => {
      analytics.trackEvent({
        name: 'form_unmounted',
        category: 'form',
        action: 'unmount',
        label: formId,
      });
    },
    
    onFieldFocus: (fieldName: string) => {
      analytics.trackFieldInteraction(fieldName, 'focus');
    },
    
    onFieldBlur: (fieldName: string) => {
      analytics.trackFieldInteraction(fieldName, 'blur');
    },
    
    onFieldChange: (fieldName: string) => {
      analytics.trackFieldInteraction(fieldName, 'change');
    },
    
    onValidationError: (fieldName: string, error: string) => {
      analytics.trackFieldError(fieldName, error);
    },
    
    onSubmit: (success: boolean, data?: any) => {
      analytics.trackFormSubmission(success, data);
    },
    
    onAbandon: (currentField?: string) => {
      analytics.trackFormAbandon(currentField);
    },
  };
};

// ===== EXPORTS =====

export default AnalyticsEngine;
export {
  DebouncedAnalyticsEngine,
  createAnalyticsEngine,
  createDebouncedAnalyticsEngine,
  createAnalyticsConfig,
  trackFormLifecycle,
};
export type { AnalyticsConfig, AnalyticsEvent, FormInsights, FormMetrics };