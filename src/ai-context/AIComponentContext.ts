
import type { ComponentCategory, ComplexityLevel } from '@/types';

export interface AIComponentContext {
  name: string,
  category: ComponentCategory,
  complexity: ComplexityLevel,
  dependencies: string[],
  props: AIPropertyContext[],
  variants: AIVariantContext[],
  usage: AIUsageContext[],
  patterns: AIPatternContext[],
  accessibility: AIAccessibilityContext,
  performance: AIPerformanceContext,
  testing: AITestingContext,
  examples: AIExampleContext[],
  relationships: AIRelationshipContext[],
  lastUpdated: string,
  version: string,
}

export interface AIPropertyContext {
  name: string,
  type: string,
  required: boolean,
  description: string,
  defaultValue?: any,
  validation?: {
    rules: string[],
    examples: {
      valid: any[],
      invalid: any[],
    },
  },
  aiGuidance: {
    purpose: string,
    bestPractices: string[],
    commonMistakes: string[],
    relatedProps: string[],
  },
}

export interface AIVariantContext {
  name: string,
  description: string,
  useCases: string[],
  requiredProps: string[],
  optionalProps: string[],
  styling: {
    approach: 'emotion' | 'styled-components' | 'css-modules' | 'inline',
    customization: string[],
    themeSupport: boolean,
  },
  aiGuidance: {
    whenToUse: string[],
    implementation: string[],
    pitfalls: string[],
  },
}

export interface AIUsageContext {
  scenario: string,
  description: string,
  complexity: ComplexityLevel,
  codeExample: string,
  explanation: string,
  prerequisites: string[],
  relatedConcepts: string[],
  aiNotes: {
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert',
    keyPoints: string[],
    troubleshooting: string[],
  },
}

export interface AIPatternContext {
  pattern: string,
  type: 'design' | 'implementation' | 'integration' | 'testing' | 'performance',
  description: string,
  codeExample: string,
  benefits: string[],
  drawbacks: string[],
  alternatives: string[],
  aiGuidance: {
    implementation: string[],
    validation: string[],
    optimization: string[],
  },
}

export interface AIAccessibilityContext {
  level: 'A' | 'AA' | 'AAA',
  features: {
    keyboardNavigation: boolean,
    screenReaderSupport: boolean,
    highContrast: boolean,
    reducedMotion: boolean,
    focusManagement: boolean,
  },
  ariaAttributes: {
    required: string[],
    optional: string[],
    examples: Record<string, string>,
  },
  testing: {
    tools: string[],
    checklist: string[],
    automation: string[],
  },
  aiGuidance: {
    implementation: string[],
    testing: string[],
    commonIssues: string[],
  },
}

export interface AIPerformanceContext {
  metrics: {
    bundleSize: {
      min: number,
      max: number,
      target: number,
      unit: 'bytes' | 'KB' | 'MB',
    },
    renderTime: {
      target: number,
      unit: 'ms',
    },
    memoryUsage: {
      baseline: number,
      peak: number,
      unit: 'MB',
    },
  },
  optimizations: {
    lazyLoading: boolean,
    memoization: boolean,
    virtualization: boolean,
    treeshaking: boolean,
  },
  bottlenecks: {
    potential: string[],
    mitigation: string[],
  },
  aiGuidance: {
    optimization: string[],
    monitoring: string[],
    profiling: string[],
  },
}

export interface AITestingContext {
  strategies: {
    unit: TestingStrategy,
    integration: TestingStrategy,
    e2e: TestingStrategy,
    visual: TestingStrategy,
    accessibility: TestingStrategy,
    performance: TestingStrategy,
  },
  coverage: {
    target: number,
    current?: number,
    criticalAreas: string[],
  },
  tools: {
    framework: string,
    utilities: string[],
    mocking: string[],
    assertions: string[],
  },
  aiGuidance: {
    testGeneration: string[],
    patterns: string[],
    maintenance: string[],
  },
}

export interface TestingStrategy {
  enabled: boolean,
  approach: string,
  tools: string[],
  patterns: string[],
  examples: string[],
  coverage: number,
}

export interface AIExampleContext {
  title: string,
  description: string,
  category: 'basic' | 'intermediate' | 'advanced' | 'edge-case',
  code: string,
  explanation: string,
  highlights: string[],
  relatedExamples: string[],
  aiAnnotations: {
    learningObjectives: string[],
    keyTakeaways: string[],
    extensions: string[],
  },
}

export interface AIRelationshipContext {
  type: 'composition' | 'dependency' | 'similar' | 'alternative' | 'extension',
  target: string,
  description: string,
  strength: 'weak' | 'moderate' | 'strong',
  examples: string[],
  aiGuidance: {
    integration: string[],
    migration: string[],
    alternatives: string[],
  },
}

export interface ComponentMetadata {
  id: string,
  name: string,
  path: string,
  category: ComponentCategory,
  complexity: ComplexityLevel,
  status: 'draft' | 'review' | 'stable' | 'deprecated',
  version: string,
  author: string,
  created: string,
  lastModified: string,
  tags: string[],
  keywords: string[],
}

export interface AILearningPattern {
  id: string,
  name: string,
  type: 'anti-pattern' | 'best-practice' | 'optimization' | 'integration',
  description: string,
  detection: {
    indicators: string[],
    codePatterns: string[],
    context: string[],
  },
  resolution: {
    steps: string[],
    examples: string[],
    tools: string[],
  },
  prevention: {
    guidelines: string[],
    checks: string[],
    automation: string[],
  },
}

export interface AIKnowledgeEntry {
  id: string,
  title: string,
  type: 'concept' | 'technique' | 'troubleshooting' | 'best-practice',
  description: string,
  content: string,
  examples: string[],
  references: string[],
  relatedEntries: string[],
  tags: string[],
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert',
  lastUpdated: string,
}

export interface AIWorkflowContext {
  id: string,
  name: string,
  description: string,
  steps: AIWorkflowStep[],
  triggers: string[],
  conditions: string[],
  outputs: string[],
  metrics: {
    efficiency: number,
    accuracy: number,
    confidence: number,
  },
}

export interface AIWorkflowStep {
  id: string,
  name: string,
  type: 'analysis' | 'generation' | 'validation' | 'optimization' | 'documentation',
  description: string,
  inputs: string[],
  outputs: string[],
  aiEngine: string,
  configuration: Record<string, any>,
  validation: string[],
}

export interface ComponentAnalysisResult {
  component: string,
  timestamp: string,
  analysis: {
    complexity: ComplexityAnalysis,
    patterns: PatternAnalysis,
    quality: QualityAnalysis,
    performance: PerformanceAnalysis,
    accessibility: AccessibilityAnalysis,
  },
  recommendations: Recommendation[],
  confidence: number,
}

export interface ComplexityAnalysis {
  score: number,
  factors: {
    cyclomatic: number,
    cognitive: number,
    maintainability: number,
    dependencies: number,
  },
  breakdown: {
    functions: number,
    branches: number,
    loops: number,
    nesting: number,
  },
  recommendations: string[],
}

export interface PatternAnalysis {
  detected: DetectedPattern[],
  violations: PatternViolation[],
  adherence: {
    naming: number,
    structure: number,
    imports: number,
    exports: number,
  },
  recommendations: string[],
}

export interface DetectedPattern {
  pattern: string,
  confidence: number,
  location: {
    line: number,
    column: number,
    length: number,
  },
  context: string,
  classification: 'positive' | 'negative' | 'neutral',
}

export interface PatternViolation {
  pattern: string,
  severity: 'low' | 'medium' | 'high' | 'critical',
  description: string,
  location: {
    line: number,
    column: number,
    length: number,
  },
  suggestion: string,
  autoFixable: boolean,
}

export interface QualityAnalysis {
  score: number,
  categories: {
    structure: number,
    naming: number,
    documentation: number,
    testing: number,
    performance: number,
  },
  issues: QualityIssue[],
  suggestions: string[],
}

export interface QualityIssue {
  type: string,
  severity: 'info' | 'warning' | 'error' | 'critical',
  description: string,
  location?: {
    line: number,
    column: number,
  },
  fix: string,
  impact: string,
}

export interface PerformanceAnalysis {
  score: number,
  metrics: {
    bundleSize: number,
    renderTime: number,
    memoryUsage: number,
    reRenders: number,
  },
  bottlenecks: PerformanceBottleneck[],
  optimizations: string[],
}

export interface PerformanceBottleneck {
  type: 'rendering' | 'memory' | 'computation' | 'network',
  description: string,
  impact: 'low' | 'medium' | 'high' | 'critical',
  location?: {
    function: string,
    line: number,
  },
  solution: string,
  effort: 'low' | 'medium' | 'high',
}

export interface AccessibilityAnalysis {
  score: number,
  level: 'A' | 'AA' | 'AAA',
  violations: AccessibilityViolation[],
  features: {
    keyboardNavigation: boolean,
    screenReader: boolean,
    colorContrast: boolean,
    focusManagement: boolean,
  },
  recommendations: string[],
}

export interface AccessibilityViolation {
  rule: string,
  severity: 'minor' | 'moderate' | 'serious' | 'critical',
  description: string,
  element?: string,
  fix: string,
  wcagLevel: 'A' | 'AA' | 'AAA',
}

export interface Recommendation {
  type: 'improvement' | 'optimization' | 'fix' | 'enhancement',
  priority: 'low' | 'medium' | 'high' | 'critical',
  title: string,
  description: string,
  implementation: string[],
  benefits: string[],
  effort: 'low' | 'medium' | 'high',
  impact: 'low' | 'medium' | 'high',
}

export interface AIContextRegistry {
  components: Map<string, AIComponentContext>,
  patterns: Map<string, AILearningPattern>,
  knowledge: Map<string, AIKnowledgeEntry>,
  workflows: Map<string, AIWorkflowContext>,
  metadata: Map<string, ComponentMetadata>,
}

export interface ContextSearchQuery {
  term: string,
  category?: ComponentCategory,
  complexity?: ComplexityLevel,
  tags?: string[],
  type?: 'component' | 'pattern' | 'knowledge' | 'workflow',
  filters?: {
    author?: string,
    dateRange?: {
      start: string,
      end: string,
    },
    status?: string[],
  },
}

export interface ContextSearchResult {
  type: 'component' | 'pattern' | 'knowledge' | 'workflow',
  id: string,
  title: string,
  description: string,
  relevance: number,
  highlights: string[],
  context: any,
}

export interface AIGuidanceConfig {
  verbosity: 'minimal' | 'standard' | 'detailed' | 'comprehensive',
  includeExamples: boolean,
  includeAlternatives: boolean,
  includePitfalls: boolean,
  includePerformance: boolean,
  includeAccessibility: boolean,
  customization: {
    focusAreas: string[],
    excludeAreas: string[],
    priorityLevel: 'learning' | 'production' | 'optimization',
  },
}

export interface AIContextFactory {
  createComponentContext(
    component: any,
    options?: {
      includeAnalysis?: boolean,
      includeExamples?: boolean,
      includeRelationships?: boolean,
    }
  ): Promise<AIComponentContext>,
  
  createPatternContext(
    pattern: any,
    type: AILearningPattern['type']
  ): Promise<AILearningPattern>,
  
  createKnowledgeEntry(
    content: any,
    type: AIKnowledgeEntry['type']
  ): Promise<AIKnowledgeEntry>,
  
  createWorkflowContext(
    workflow: any
  ): Promise<AIWorkflowContext>,
}

export interface AIContextValidator {
  validateComponentContext(context: AIComponentContext): ValidationResult,
  validatePattern(pattern: AILearningPattern): ValidationResult,
  validateKnowledge(knowledge: AIKnowledgeEntry): ValidationResult,
  validateWorkflow(workflow: AIWorkflowContext): ValidationResult,
}

export interface ValidationResult {
  valid: boolean,
  errors: ValidationError[],
  warnings: ValidationWarning[],
  suggestions: string[],
}

export interface ValidationError {
  field: string,
  message: string,
  code: string,
  severity: 'error' | 'critical',
}

export interface ValidationWarning {
  field: string,
  message: string,
  code: string,
  suggestion: string,
}

export interface AIContextAnalyzer {
  analyzeComponent(context: AIComponentContext): ComponentInsights,
  analyzeUsagePatterns(contexts: AIComponentContext[]): UsageInsights,
  analyzeTrends(registry: AIContextRegistry): TrendInsights,
  generateRecommendations(analysis: any): Recommendation[],
}

export interface ComponentInsights {
  complexity: {
    overall: number,
    breakdown: Record<string, number>,
    comparison: string,
  },
  usage: {
    frequency: number,
    contexts: string[],
    patterns: string[],
  },
  quality: {
    score: number,
    strengths: string[],
    weaknesses: string[],
  },
  relationships: {
    strong: string[],
    weak: string[],
    suggestions: string[],
  },
}

export interface UsageInsights {
  popular: {
    components: string[],
    patterns: string[],
    combinations: string[],
  },
  emerging: {
    trends: string[],
    technologies: string[],
    patterns: string[],
  },
  deprecated: {
    components: string[],
    patterns: string[],
    reasons: string[],
  },
}

export interface TrendInsights {
  adoption: {
    growing: string[],
    declining: string[],
    stable: string[],
  },
  complexity: {
    increasing: string[],
    decreasing: string[],
    reasons: Record<string, string>,
  },
  innovation: {
    newPatterns: string[],
    improvements: string[],
    experiments: string[],
  },
}

export type {
  // Main interfaces
  AIComponentContext as ComponentContext,
  AIPropertyContext as PropertyContext,
  AIVariantContext as VariantContext,
  AIUsageContext as UsageContext,
  AIPatternContext as PatternContext,
  AIAccessibilityContext as AccessibilityContext,
  AIPerformanceContext as PerformanceContext,
  AITestingContext as TestingContext,
  AIExampleContext as ExampleContext,
  AIRelationshipContext as RelationshipContext,
  
  // Registry and management
  AIContextRegistry as ContextRegistry,
  AIContextFactory as ContextFactory,
  AIContextValidator as ContextValidator,
  AIContextAnalyzer as ContextAnalyzer,
  
  // Analysis and insights
  ComponentAnalysisResult as AnalysisResult,
  ComponentInsights as Insights,
  UsageInsights,
  TrendInsights,
  
  // Utilities
  ContextSearchQuery as SearchQuery,
  ContextSearchResult as SearchResult,
  AIGuidanceConfig as GuidanceConfig,
  ValidationResult,
  Recommendation
};

export const defaultAIGuidanceConfig: AIGuidanceConfig = {
  verbosity: 'standard',
  includeExamples: true,
  includeAlternatives: true,
  includePitfalls: true,
  includePerformance: true,
  includeAccessibility: true,
  customization: {
    focusAreas: [],
    excludeAreas: [],
    priorityLevel: 'production'
  }
};

export const componentContextTemplate: Partial<AIComponentContext> = {
  complexity: 'medium',
  dependencies: [],
  props: [],
  variants: [],
  usage: [],
  patterns: [],
  examples: [],
  relationships: [],
  version: '1.0.0',
  accessibility: {
    level: 'AA',
    features: {
      keyboardNavigation: true,
      screenReaderSupport: true,
      highContrast: true,
      reducedMotion: true,
      focusManagement: true
    },
    ariaAttributes: {
      required: [],
      optional: [],
      examples: {}
    },
    testing: {
      tools: ['@testing-library/react', 'axe-core'],
      checklist: [],
      automation: []
    },
    aiGuidance: {
      implementation: [],
      testing: [],
      commonIssues: []
    }
  },
  performance: {
    metrics: {
      bundleSize: {
        min: 0,
        max: 50000,
        target: 25000,
        unit: 'bytes'
      },
      renderTime: {
        target: 16,
        unit: 'ms'
      },
      memoryUsage: {
        baseline: 1,
        peak: 5,
        unit: 'MB'
      }
    },
    optimizations: {
      lazyLoading: false,
      memoization: true,
      virtualization: false,
      treeshaking: true
    },
    bottlenecks: {
      potential: [],
      mitigation: []
    },
    aiGuidance: {
      optimization: [],
      monitoring: [],
      profiling: []
    }
  },
  testing: {
    strategies: {
      unit: {
        enabled: true,
        approach: 'component-driven',
        tools: ['vitest', '@testing-library/react'],
        patterns: ['render', 'user-interaction', 'props-testing'],
        examples: [],
        coverage: 95
      },
      integration: {
        enabled: true,
        approach: 'user-journey',
        tools: ['@testing-library/react', 'msw'],
        patterns: ['component-integration', 'api-mocking'],
        examples: [],
        coverage: 80
      },
      e2e: {
        enabled: false,
        approach: 'critical-paths',
        tools: ['playwright', 'cypress'],
        patterns: ['user-flows', 'cross-browser'],
        examples: [],
        coverage: 60
      },
      visual: {
        enabled: true,
        approach: 'regression-testing',
        tools: ['chromatic', 'storybook'],
        patterns: ['snapshot-testing', 'visual-diff'],
        examples: [],
        coverage: 100
      },
      accessibility: {
        enabled: true,
        approach: 'automated-manual',
        tools: ['axe-core', '@testing-library/jest-dom'],
        patterns: ['aria-testing', 'keyboard-navigation'],
        examples: [],
        coverage: 100
      },
      performance: {
        enabled: true,
        approach: 'benchmark-driven',
        tools: ['lighthouse', 'web-vitals'],
        patterns: ['bundle-analysis', 'render-performance'],
        examples: [],
        coverage: 80
      }
    },
    coverage: {
      target: 95,
      criticalAreas: ['props-validation', 'user-interactions', 'accessibility']
    },
    tools: {
      framework: 'vitest',
      utilities: ['@testing-library/react', '@testing-library/user-event'],
      mocking: ['msw', 'vi.mock'],
      assertions: ['@testing-library/jest-dom', 'vitest/expect']
    },
    aiGuidance: {
      testGeneration: [],
      patterns: [],
      maintenance: []
    }
  }
};