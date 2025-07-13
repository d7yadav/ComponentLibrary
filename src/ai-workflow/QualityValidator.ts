/**
 * @fileoverview Quality Validator - Code Quality Validation Engine
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * This module provides comprehensive code quality validation including
 * pattern validation, TypeScript compliance, accessibility checking,
 * performance impact assessment, and code quality scoring.
 */

import type { ComponentCategory, ComplexityLevel } from '../types';

/**
 * Quality validation result
 */
export interface QualityValidationResult {
  overall: QualityScore;
  categories: QualityCategoryResults;
  violations: QualityViolation[];
  warnings: QualityWarning[];
  recommendations: QualityRecommendation[];
  metrics: QualityMetrics;
  passedChecks: string[];
  failedChecks: string[];
  timestamp: Date;
  validatorVersion: string;
}

/**
 * Quality score breakdown
 */
export interface QualityScore {
  score: number; // 0-100
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
  level: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  confidence: number; // 0-100
  factors: QualityFactor[];
}

/**
 * Quality factor contributing to score
 */
export interface QualityFactor {
  name: string;
  weight: number; // 0-1
  score: number; // 0-100
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  evidence: string[];
}

/**
 * Quality category results
 */
export interface QualityCategoryResults {
  codePatterns: CategoryResult;
  typeScript: CategoryResult;
  accessibility: CategoryResult;
  performance: CategoryResult;
  security: CategoryResult;
  maintainability: CategoryResult;
  testing: CategoryResult;
  documentation: CategoryResult;
}

/**
 * Individual category result
 */
export interface CategoryResult {
  score: number; // 0-100
  status: 'pass' | 'warning' | 'fail';
  checks: QualityCheck[];
  summary: string;
  criticalIssues: number;
  warnings: number;
  suggestions: number;
}

/**
 * Quality check definition and result
 */
export interface QualityCheck {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  status: 'pass' | 'fail' | 'skip';
  message?: string;
  details?: any;
  rule: string;
  autoFixable: boolean;
  performance: {
    executionTime: number;
    memoryUsage: number;
  };
}

/**
 * Quality violation (failed check)
 */
export interface QualityViolation {
  checkId: string;
  severity: 'error' | 'critical';
  message: string;
  location: CodeLocation;
  rule: string;
  suggestion: string;
  autoFixable: boolean;
  examples: string[];
}

/**
 * Quality warning (warning check)
 */
export interface QualityWarning {
  checkId: string;
  message: string;
  location: CodeLocation;
  rule: string;
  suggestion: string;
  impact: 'low' | 'medium' | 'high';
}

/**
 * Quality recommendation for improvement
 */
export interface QualityRecommendation {
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  benefits: string[];
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  implementation: string[];
  resources: string[];
}

/**
 * Code location for violations/warnings
 */
export interface CodeLocation {
  file: string;
  line: number;
  column: number;
  length?: number;
  context: string;
}

/**
 * Quality metrics
 */
export interface QualityMetrics {
  linesOfCode: number;
  complexity: number;
  maintainabilityIndex: number;
  technicalDebt: number; // minutes
  testCoverage: number; // percentage
  duplicateCode: number; // percentage
  codeSmells: number;
  bugs: number;
  vulnerabilities: number;
  bundleSize: number; // bytes
  performanceScore: number;
  accessibilityScore: number;
}

/**
 * Validation configuration
 */
export interface ValidationConfiguration {
  enabledCategories: string[];
  strictMode: boolean;
  typeScriptStrict: boolean;
  accessibilityLevel: 'A' | 'AA' | 'AAA';
  performanceBudget: {
    bundleSize: number; // bytes
    loadTime: number; // ms
    renderTime: number; // ms
  };
  customRules: CustomRule[];
  ignorePaths: string[];
  ruleOverrides: Record<string, 'error' | 'warning' | 'off'>;
}

/**
 * Custom validation rule
 */
export interface CustomRule {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  pattern: RegExp | string;
  validator: (code: string, context: ValidationContext) => boolean;
  message: string;
  suggestion: string;
  autoFix?: (code: string) => string;
}

/**
 * Validation context
 */
export interface ValidationContext {
  filePath: string;
  fileContent: string;
  componentType?: ComponentCategory;
  complexity?: ComplexityLevel;
  dependencies: string[];
  imports: string[];
  exports: string[];
  tsConfig?: any;
  metadata: Record<string, any>;
}

/**
 * Code pattern validation rules
 */
export interface PatternRule {
  id: string;
  name: string;
  pattern: RegExp | string | ((code: string) => boolean);
  required: boolean;
  message: string;
  category: 'naming' | 'structure' | 'imports' | 'exports' | 'props' | 'hooks';
  severity: 'info' | 'warning' | 'error' | 'critical';
  autoFix?: (code: string) => string;
  examples: {
    good: string[];
    bad: string[];
  };
}

/**
 * Quality Validator - Comprehensive Code Quality Analysis
 * 
 * Provides real-time validation of code patterns, TypeScript compliance,
 * accessibility standards, performance impact, and overall code quality.
 */
export class QualityValidator {
  private readonly version = '1.0.0';
  private patternRules: PatternRule[];
  private configuration: ValidationConfiguration;

  constructor(configuration?: Partial<ValidationConfiguration>) {
    this.configuration = {
      enabledCategories: [
        'codePatterns',
        'typeScript', 
        'accessibility',
        'performance',
        'security',
        'maintainability',
        'testing',
        'documentation'
      ],
      strictMode: true,
      typeScriptStrict: true,
      accessibilityLevel: 'AA',
      performanceBudget: {
        bundleSize: 150000, // 150KB
        loadTime: 2000, // 2s
        renderTime: 100 // 100ms
      },
      customRules: [],
      ignorePaths: ['node_modules', 'dist', 'build'],
      ruleOverrides: {},
      ...configuration
    };

    this.patternRules = this.initializePatternRules();
  }

  /**
   * Validate code quality for a file or component
   */
  public async validateCode(context: ValidationContext): Promise<QualityValidationResult> {
    const startTime = Date.now();

    try {
      // Initialize result structure
      const result: QualityValidationResult = {
        overall: { score: 0, grade: 'F', level: 'critical', confidence: 0, factors: [] },
        categories: this.initializeCategoryResults(),
        violations: [],
        warnings: [],
        recommendations: [],
        metrics: this.initializeMetrics(),
        passedChecks: [],
        failedChecks: [],
        timestamp: new Date(),
        validatorVersion: this.version
      };

      // Calculate metrics first
      result.metrics = await this.calculateMetrics(context);

      // Run validation categories
      if (this.configuration.enabledCategories.includes('codePatterns')) {
        result.categories.codePatterns = await this.validateCodePatterns(context);
      }

      if (this.configuration.enabledCategories.includes('typeScript')) {
        result.categories.typeScript = await this.validateTypeScript(context);
      }

      if (this.configuration.enabledCategories.includes('accessibility')) {
        result.categories.accessibility = await this.validateAccessibility(context);
      }

      if (this.configuration.enabledCategories.includes('performance')) {
        result.categories.performance = await this.validatePerformance(context, result.metrics);
      }

      if (this.configuration.enabledCategories.includes('security')) {
        result.categories.security = await this.validateSecurity(context);
      }

      if (this.configuration.enabledCategories.includes('maintainability')) {
        result.categories.maintainability = await this.validateMaintainability(context, result.metrics);
      }

      if (this.configuration.enabledCategories.includes('testing')) {
        result.categories.testing = await this.validateTesting(context);
      }

      if (this.configuration.enabledCategories.includes('documentation')) {
        result.categories.documentation = await this.validateDocumentation(context);
      }

      // Collect violations and warnings
      this.collectViolationsAndWarnings(result);

      // Calculate overall score
      result.overall = this.calculateOverallScore(result.categories);

      // Generate recommendations
      result.recommendations = this.generateRecommendations(result);

      return result;

    } catch (error) {
      throw new Error(`Quality validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Validate multiple files in batch
   */
  public async validateBatch(contexts: ValidationContext[]): Promise<QualityValidationResult[]> {
    const results = await Promise.all(
      contexts.map(context => this.validateCode(context))
    );

    return results;
  }

  /**
   * Get validation summary for multiple results
   */
  public generateSummary(results: QualityValidationResult[]): QualitySummary {
    const totalFiles = results.length;
    const totalViolations = results.reduce((sum, r) => sum + r.violations.length, 0);
    const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
    const averageScore = results.reduce((sum, r) => sum + r.overall.score, 0) / totalFiles;

    const categoryScores = Object.keys(results[0].categories).reduce((acc, category) => {
      acc[category] = results.reduce((sum, r) => 
        sum + r.categories[category as keyof QualityCategoryResults].score, 0) / totalFiles;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalFiles,
      totalViolations,
      totalWarnings,
      averageScore,
      grade: this.scoreToGrade(averageScore),
      categoryScores,
      worstPerformers: results
        .sort((a, b) => a.overall.score - b.overall.score)
        .slice(0, 5)
        .map(r => ({ file: r.metrics.linesOfCode > 0 ? 'component' : 'unknown', score: r.overall.score })),
      recommendations: this.aggregateRecommendations(results)
    };
  }

  // Private validation methods

  private initializePatternRules(): PatternRule[] {
    return [
      // Naming conventions
      {
        id: 'component-naming',
        name: 'Component Naming Convention',
        pattern: /^[A-Z][a-zA-Z0-9]*\.tsx?$/,
        required: true,
        message: 'Component files must use PascalCase naming',
        category: 'naming',
        severity: 'error',
        examples: {
          good: ['Button.tsx', 'TextField.tsx', 'CardHeader.tsx'],
          bad: ['button.tsx', 'text-field.tsx', 'card_header.tsx']
        }
      },
      
      // Import patterns
      {
        id: 'absolute-imports',
        name: 'Absolute Import Pattern',
        pattern: /^import.*from\s+['"]@\//,
        required: true,
        message: 'Use absolute imports with @ prefix for internal modules',
        category: 'imports',
        severity: 'warning',
        examples: {
          good: ["import { Button } from '@/components/core/Button'"],
          bad: ["import { Button } from '../core/Button'"]
        }
      },

      // Export patterns
      {
        id: 'named-exports',
        name: 'Named Exports Only',
        pattern: (code: string) => !code.includes('export default'),
        required: true,
        message: 'Use named exports only, avoid default exports',
        category: 'exports',
        severity: 'error',
        examples: {
          good: ['export { Button }', 'export const Button = () => {}'],
          bad: ['export default Button']
        }
      },

      // Props patterns
      {
        id: 'props-interface',
        name: 'Props Interface Naming',
        pattern: /interface\s+\w+Props\s*{/,
        required: true,
        message: 'Component props should use Props suffix in interface name',
        category: 'props',
        severity: 'warning',
        examples: {
          good: ['interface ButtonProps {', 'interface TextFieldProps {'],
          bad: ['interface ButtonProperties {', 'interface IButtonProps {']
        }
      },

      // Hook patterns
      {
        id: 'hook-naming',
        name: 'Hook Naming Convention',
        pattern: /^use[A-Z]/,
        required: true,
        message: 'Custom hooks must start with "use" prefix',
        category: 'hooks',
        severity: 'error',
        examples: {
          good: ['useTheme', 'useLocalStorage', 'useDebounce'],
          bad: ['getTheme', 'localStorageHook', 'debounce']
        }
      },

      // Structure patterns
      {
        id: 'component-structure',
        name: 'Component File Structure',
        pattern: (code: string) => {
          const hasInterface = code.includes('interface') && code.includes('Props');
          const hasComponent = code.includes('const ') && code.includes('= (');
          const hasExport = code.includes('export {') || code.includes('export const');
          return hasInterface && hasComponent && hasExport;
        },
        required: true,
        message: 'Component file must include Props interface, component implementation, and named export',
        category: 'structure',
        severity: 'error',
        examples: {
          good: [
            'interface ButtonProps { /* props */ }',
            'const Button = (props: ButtonProps) => { /* implementation */ }',
            'export { Button };'
          ],
          bad: ['Missing props interface', 'Missing component export']
        }
      }
    ];
  }

  private initializeCategoryResults(): QualityCategoryResults {
    const defaultCategory: CategoryResult = {
      score: 0,
      status: 'pass',
      checks: [],
      summary: '',
      criticalIssues: 0,
      warnings: 0,
      suggestions: 0
    };

    return {
      codePatterns: { ...defaultCategory },
      typeScript: { ...defaultCategory },
      accessibility: { ...defaultCategory },
      performance: { ...defaultCategory },
      security: { ...defaultCategory },
      maintainability: { ...defaultCategory },
      testing: { ...defaultCategory },
      documentation: { ...defaultCategory }
    };
  }

  private initializeMetrics(): QualityMetrics {
    return {
      linesOfCode: 0,
      complexity: 0,
      maintainabilityIndex: 0,
      technicalDebt: 0,
      testCoverage: 0,
      duplicateCode: 0,
      codeSmells: 0,
      bugs: 0,
      vulnerabilities: 0,
      bundleSize: 0,
      performanceScore: 0,
      accessibilityScore: 0
    };
  }

  private async calculateMetrics(context: ValidationContext): Promise<QualityMetrics> {
    const metrics = this.initializeMetrics();

    // Calculate lines of code
    metrics.linesOfCode = context.fileContent.split('\n').filter(line => 
      line.trim() && !line.trim().startsWith('//') && !line.trim().startsWith('*')
    ).length;

    // Calculate cyclomatic complexity (simplified)
    metrics.complexity = this.calculateComplexity(context.fileContent);

    // Estimate maintainability index
    metrics.maintainabilityIndex = this.calculateMaintainabilityIndex(context.fileContent, metrics.complexity);

    // Estimate technical debt (simplified)
    metrics.technicalDebt = this.estimateTechnicalDebt(context.fileContent);

    // Placeholder for other metrics (would integrate with actual tools)
    metrics.testCoverage = 85; // Would come from coverage reports
    metrics.duplicateCode = 5; // Would come from code analysis tools
    metrics.bundleSize = context.fileContent.length; // Simplified

    return metrics;
  }

  private calculateComplexity(code: string): number {
    // Simplified cyclomatic complexity calculation
    const patterns = [
      /\bif\b/g,
      /\belse\b/g,
      /\bwhile\b/g,
      /\bfor\b/g,
      /\bswitch\b/g,
      /\bcase\b/g,
      /\bcatch\b/g,
      /\b&&\b/g,
      /\b\|\|\b/g,
      /\?\s*.*:/g // ternary operators
    ];

    let complexity = 1; // Base complexity
    patterns.forEach(pattern => {
      const matches = code.match(pattern);
      if (matches) {
        complexity += matches.length;
      }
    });

    return complexity;
  }

  private calculateMaintainabilityIndex(code: string, complexity: number): number {
    const loc = code.split('\n').length;
    const volume = Math.log2(loc) * loc; // Simplified Halstead volume
    
    // Simplified maintainability index formula
    const maintainabilityIndex = Math.max(0, 
      (171 - 5.2 * Math.log(volume) - 0.23 * complexity - 16.2 * Math.log(loc)) / 171 * 100
    );

    return Math.round(maintainabilityIndex);
  }

  private estimateTechnicalDebt(code: string): number {
    let debt = 0;

    // Code smells that contribute to technical debt
    if (code.includes('any')) debt += 5; // Type any usage
    if (code.includes('// TODO')) debt += 10; // TODO comments
    if (code.includes('// FIXME')) debt += 15; // FIXME comments
    if (code.includes('console.log')) debt += 2; // Debug statements
    if (code.length > 5000) debt += 20; // Large files
    if (this.calculateComplexity(code) > 10) debt += 30; // High complexity

    return debt;
  }

  private async validateCodePatterns(context: ValidationContext): Promise<CategoryResult> {
    const checks: QualityCheck[] = [];
    let criticalIssues = 0;
    let warnings = 0;

    for (const rule of this.patternRules) {
      const check: QualityCheck = {
        id: rule.id,
        name: rule.name,
        description: rule.message,
        category: 'codePatterns',
        severity: rule.severity,
        status: 'pass',
        rule: rule.id,
        autoFixable: !!rule.autoFix,
        performance: { executionTime: 0, memoryUsage: 0 }
      };

      const startTime = Date.now();
      let passed = false;

      try {
        if (typeof rule.pattern === 'function') {
          passed = rule.pattern(context.fileContent);
        } else if (rule.pattern instanceof RegExp) {
          passed = rule.pattern.test(context.fileContent);
        } else {
          passed = context.fileContent.includes(rule.pattern);
        }

        if (rule.required && !passed) {
          check.status = 'fail';
          check.message = rule.message;
          
          if (rule.severity === 'critical' || rule.severity === 'error') {
            criticalIssues++;
          } else if (rule.severity === 'warning') {
            warnings++;
          }
        }
      } catch (error) {
        check.status = 'fail';
        check.message = `Pattern validation error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        criticalIssues++;
      }

      check.performance.executionTime = Date.now() - startTime;
      checks.push(check);
    }

    const score = this.calculateCategoryScore(checks);

    return {
      score,
      status: criticalIssues > 0 ? 'fail' : warnings > 0 ? 'warning' : 'pass',
      checks,
      summary: `Code patterns validation: ${checks.length} checks run, ${criticalIssues} critical issues, ${warnings} warnings`,
      criticalIssues,
      warnings,
      suggestions: checks.filter(c => c.severity === 'info').length
    };
  }

  private async validateTypeScript(context: ValidationContext): Promise<CategoryResult> {
    const checks: QualityCheck[] = [];
    let criticalIssues = 0;
    let warnings = 0;

    // TypeScript strict mode checks
    const typeScriptChecks = [
      {
        id: 'no-any-types',
        name: 'No Any Types',
        test: () => !context.fileContent.includes(': any') && !context.fileContent.includes('<any>'),
        severity: 'error' as const,
        message: 'Avoid using "any" type, use specific types instead'
      },
      {
        id: 'strict-null-checks',
        name: 'Strict Null Checks',
        test: () => !context.fileContent.includes('!.') || context.fileContent.includes('// @ts-ignore'),
        severity: 'warning' as const,
        message: 'Avoid non-null assertion operator, handle null/undefined explicitly'
      },
      {
        id: 'typed-props',
        name: 'Typed Props',
        test: () => context.fileContent.includes('Props') && context.fileContent.includes('interface'),
        severity: 'error' as const,
        message: 'Component props must be properly typed with interface'
      },
      {
        id: 'return-types',
        name: 'Function Return Types',
        test: () => {
          const functionMatches = context.fileContent.match(/const\s+\w+\s*=\s*\(/g);
          const typedMatches = context.fileContent.match(/\):\s*\w+\s*=>/g);
          return !functionMatches || (typedMatches && typedMatches.length >= functionMatches.length * 0.8);
        },
        severity: 'warning' as const,
        message: 'Functions should have explicit return types'
      }
    ];

    for (const tsCheck of typeScriptChecks) {
      const check: QualityCheck = {
        id: tsCheck.id,
        name: tsCheck.name,
        description: tsCheck.message,
        category: 'typeScript',
        severity: tsCheck.severity,
        status: tsCheck.test() ? 'pass' : 'fail',
        rule: tsCheck.id,
        autoFixable: false,
        performance: { executionTime: 0, memoryUsage: 0 }
      };

      if (check.status === 'fail') {
        check.message = tsCheck.message;
        if (tsCheck.severity === 'error') {
          criticalIssues++;
        } else if (tsCheck.severity === 'warning') {
          warnings++;
        }
      }

      checks.push(check);
    }

    const score = this.calculateCategoryScore(checks);

    return {
      score,
      status: criticalIssues > 0 ? 'fail' : warnings > 0 ? 'warning' : 'pass',
      checks,
      summary: `TypeScript validation: ${checks.length} checks run, ${criticalIssues} critical issues, ${warnings} warnings`,
      criticalIssues,
      warnings,
      suggestions: 0
    };
  }

  private async validateAccessibility(context: ValidationContext): Promise<CategoryResult> {
    const checks: QualityCheck[] = [];
    let criticalIssues = 0;
    let warnings = 0;

    // Accessibility checks
    const a11yChecks = [
      {
        id: 'aria-labels',
        name: 'ARIA Labels',
        test: () => {
          const hasAriaProps = context.fileContent.includes('aria-') || context.fileContent.includes('aria');
          const hasInteractiveElements = context.fileContent.includes('onClick') || 
                                      context.fileContent.includes('button') ||
                                      context.fileContent.includes('input');
          return !hasInteractiveElements || hasAriaProps;
        },
        severity: 'error' as const,
        message: 'Interactive elements must have appropriate ARIA labels'
      },
      {
        id: 'keyboard-navigation',
        name: 'Keyboard Navigation',
        test: () => {
          return context.fileContent.includes('onKeyDown') || 
                 context.fileContent.includes('onKeyPress') ||
                 !context.fileContent.includes('onClick');
        },
        severity: 'warning' as const,
        message: 'Components with onClick should support keyboard navigation'
      },
      {
        id: 'semantic-html',
        name: 'Semantic HTML',
        test: () => {
          const hasSemanticElements = /\b(button|input|label|nav|main|section|article|aside|header|footer)\b/.test(context.fileContent);
          const hasDivSpan = /\b(div|span)\b/.test(context.fileContent);
          return !hasDivSpan || hasSemanticElements;
        },
        severity: 'warning' as const,
        message: 'Prefer semantic HTML elements over generic div/span'
      },
      {
        id: 'color-contrast',
        name: 'Color Contrast Consideration',
        test: () => {
          // Check if component uses theme colors (good practice)
          return context.fileContent.includes('theme.palette') || 
                 context.fileContent.includes('theme.colors') ||
                 !context.fileContent.includes('color:');
        },
        severity: 'info' as const,
        message: 'Use theme colors to ensure proper contrast ratios'
      }
    ];

    for (const a11yCheck of a11yChecks) {
      const check: QualityCheck = {
        id: a11yCheck.id,
        name: a11yCheck.name,
        description: a11yCheck.message,
        category: 'accessibility',
        severity: a11yCheck.severity,
        status: a11yCheck.test() ? 'pass' : 'fail',
        rule: a11yCheck.id,
        autoFixable: false,
        performance: { executionTime: 0, memoryUsage: 0 }
      };

      if (check.status === 'fail') {
        check.message = a11yCheck.message;
        if (a11yCheck.severity === 'error') {
          criticalIssues++;
        } else if (a11yCheck.severity === 'warning') {
          warnings++;
        }
      }

      checks.push(check);
    }

    const score = this.calculateCategoryScore(checks);

    return {
      score,
      status: criticalIssues > 0 ? 'fail' : warnings > 0 ? 'warning' : 'pass',
      checks,
      summary: `Accessibility validation: ${checks.length} checks run, ${criticalIssues} critical issues, ${warnings} warnings`,
      criticalIssues,
      warnings,
      suggestions: checks.filter(c => c.severity === 'info').length
    };
  }

  private async validatePerformance(context: ValidationContext, metrics: QualityMetrics): Promise<CategoryResult> {
    const checks: QualityCheck[] = [];
    let criticalIssues = 0;
    let warnings = 0;

    // Performance checks
    const perfChecks = [
      {
        id: 'bundle-size',
        name: 'Bundle Size',
        test: () => metrics.bundleSize <= this.configuration.performanceBudget.bundleSize,
        severity: 'error' as const,
        message: `Bundle size (${metrics.bundleSize} bytes) exceeds budget (${this.configuration.performanceBudget.bundleSize} bytes)`
      },
      {
        id: 'react-memo',
        name: 'React.memo Usage',
        test: () => {
          const hasExpensiveOperations = context.fileContent.includes('useMemo') || 
                                       context.fileContent.includes('useCallback') ||
                                       metrics.complexity > 5;
          return !hasExpensiveOperations || context.fileContent.includes('React.memo') || 
                 context.fileContent.includes('memo(');
        },
        severity: 'warning' as const,
        message: 'Consider using React.memo for components with expensive operations or high complexity'
      },
      {
        id: 'unnecessary-renders',
        name: 'Unnecessary Re-renders',
        test: () => {
          // Check for common anti-patterns
          const hasInlineObjects = /\w+={{\s*\w+:/.test(context.fileContent);
          const hasInlineFunctions = /\w+={() =>/.test(context.fileContent);
          return !hasInlineObjects && !hasInlineFunctions;
        },
        severity: 'warning' as const,
        message: 'Avoid inline objects and functions in JSX props to prevent unnecessary re-renders'
      },
      {
        id: 'heavy-imports',
        name: 'Heavy Library Imports',
        test: () => {
          const heavyLibraries = ['lodash', 'moment', 'date-fns'];
          return !heavyLibraries.some(lib => context.fileContent.includes(`from '${lib}'`));
        },
        severity: 'info' as const,
        message: 'Consider tree-shaking or lighter alternatives for heavy library imports'
      }
    ];

    for (const perfCheck of perfChecks) {
      const check: QualityCheck = {
        id: perfCheck.id,
        name: perfCheck.name,
        description: perfCheck.message,
        category: 'performance',
        severity: perfCheck.severity,
        status: perfCheck.test() ? 'pass' : 'fail',
        rule: perfCheck.id,
        autoFixable: false,
        performance: { executionTime: 0, memoryUsage: 0 }
      };

      if (check.status === 'fail') {
        check.message = perfCheck.message;
        if (perfCheck.severity === 'error') {
          criticalIssues++;
        } else if (perfCheck.severity === 'warning') {
          warnings++;
        }
      }

      checks.push(check);
    }

    const score = this.calculateCategoryScore(checks);

    return {
      score,
      status: criticalIssues > 0 ? 'fail' : warnings > 0 ? 'warning' : 'pass',
      checks,
      summary: `Performance validation: ${checks.length} checks run, ${criticalIssues} critical issues, ${warnings} warnings`,
      criticalIssues,
      warnings,
      suggestions: checks.filter(c => c.severity === 'info').length
    };
  }

  private async validateSecurity(context: ValidationContext): Promise<CategoryResult> {
    const checks: QualityCheck[] = [];
    let criticalIssues = 0;
    let warnings = 0;

    // Security checks
    const securityChecks = [
      {
        id: 'no-dangerous-html',
        name: 'No dangerouslySetInnerHTML',
        test: () => !context.fileContent.includes('dangerouslySetInnerHTML'),
        severity: 'critical' as const,
        message: 'Avoid dangerouslySetInnerHTML to prevent XSS attacks'
      },
      {
        id: 'no-eval',
        name: 'No eval Usage',
        test: () => !context.fileContent.includes('eval('),
        severity: 'critical' as const,
        message: 'Never use eval() function due to security risks'
      },
      {
        id: 'prop-validation',
        name: 'Prop Validation',
        test: () => {
          const hasUserInput = context.fileContent.includes('input') || 
                              context.fileContent.includes('value') ||
                              context.fileContent.includes('onChange');
          return !hasUserInput || (context.fileContent.includes('Props') && context.fileContent.includes('interface'));
        },
        severity: 'warning' as const,
        message: 'Components handling user input should have proper prop validation'
      },
      {
        id: 'no-inline-styles-with-user-data',
        name: 'No Inline Styles with User Data',
        test: () => {
          const hasInlineStyles = context.fileContent.includes('style={{');
          const hasUserData = context.fileContent.includes('props.') && hasInlineStyles;
          return !hasUserData;
        },
        severity: 'warning' as const,
        message: 'Avoid using user data directly in inline styles'
      }
    ];

    for (const secCheck of securityChecks) {
      const check: QualityCheck = {
        id: secCheck.id,
        name: secCheck.name,
        description: secCheck.message,
        category: 'security',
        severity: secCheck.severity,
        status: secCheck.test() ? 'pass' : 'fail',
        rule: secCheck.id,
        autoFixable: false,
        performance: { executionTime: 0, memoryUsage: 0 }
      };

      if (check.status === 'fail') {
        check.message = secCheck.message;
        if (secCheck.severity === 'critical' || secCheck.severity === 'error') {
          criticalIssues++;
        } else if (secCheck.severity === 'warning') {
          warnings++;
        }
      }

      checks.push(check);
    }

    const score = this.calculateCategoryScore(checks);

    return {
      score,
      status: criticalIssues > 0 ? 'fail' : warnings > 0 ? 'warning' : 'pass',
      checks,
      summary: `Security validation: ${checks.length} checks run, ${criticalIssues} critical issues, ${warnings} warnings`,
      criticalIssues,
      warnings,
      suggestions: 0
    };
  }

  private async validateMaintainability(context: ValidationContext, metrics: QualityMetrics): Promise<CategoryResult> {
    const checks: QualityCheck[] = [];
    let criticalIssues = 0;
    let warnings = 0;

    // Maintainability checks
    const maintChecks = [
      {
        id: 'complexity-threshold',
        name: 'Complexity Threshold',
        test: () => metrics.complexity <= 10,
        severity: 'warning' as const,
        message: `Cyclomatic complexity (${metrics.complexity}) exceeds recommended threshold (10)`
      },
      {
        id: 'file-size',
        name: 'File Size',
        test: () => metrics.linesOfCode <= 300,
        severity: 'warning' as const,
        message: `File size (${metrics.linesOfCode} lines) exceeds recommended threshold (300 lines)`
      },
      {
        id: 'function-size',
        name: 'Function Size',
        test: () => {
          const functions = context.fileContent.match(/const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*{/g);
          // Simplified check - would need proper AST parsing for accuracy
          return !functions || functions.length <= 5; // Max 5 functions per file
        },
        severity: 'info' as const,
        message: 'Consider breaking down large files into smaller, focused modules'
      },
      {
        id: 'documentation-coverage',
        name: 'Documentation Coverage',
        test: () => {
          const hasJSDoc = context.fileContent.includes('/**');
          const hasTypeDoc = context.fileContent.includes('@param') || context.fileContent.includes('@returns');
          const hasExportedFunctions = context.fileContent.includes('export');
          return !hasExportedFunctions || (hasJSDoc && hasTypeDoc);
        },
        severity: 'info' as const,
        message: 'Exported functions should have JSDoc documentation'
      }
    ];

    for (const maintCheck of maintChecks) {
      const check: QualityCheck = {
        id: maintCheck.id,
        name: maintCheck.name,
        description: maintCheck.message,
        category: 'maintainability',
        severity: maintCheck.severity,
        status: maintCheck.test() ? 'pass' : 'fail',
        rule: maintCheck.id,
        autoFixable: false,
        performance: { executionTime: 0, memoryUsage: 0 }
      };

      if (check.status === 'fail') {
        check.message = maintCheck.message;
        if (maintCheck.severity === 'error') {
          criticalIssues++;
        } else if (maintCheck.severity === 'warning') {
          warnings++;
        }
      }

      checks.push(check);
    }

    const score = this.calculateCategoryScore(checks);

    return {
      score,
      status: criticalIssues > 0 ? 'fail' : warnings > 0 ? 'warning' : 'pass',
      checks,
      summary: `Maintainability validation: ${checks.length} checks run, ${criticalIssues} critical issues, ${warnings} warnings`,
      criticalIssues,
      warnings,
      suggestions: checks.filter(c => c.severity === 'info').length
    };
  }

  private async validateTesting(context: ValidationContext): Promise<CategoryResult> {
    const checks: QualityCheck[] = [];
    let warnings = 0;

    // Testing checks (informational - no critical issues for missing tests)
    const testChecks = [
      {
        id: 'test-file-exists',
        name: 'Test File Exists',
        test: () => context.filePath.includes('.test.') || context.filePath.includes('.spec.'),
        severity: 'info' as const,
        message: 'Component should have corresponding test file'
      },
      {
        id: 'testable-structure',
        name: 'Testable Structure',
        test: () => {
          const hasDataTestIds = context.fileContent.includes('data-testid');
          const hasAriaLabels = context.fileContent.includes('aria-label');
          return hasDataTestIds || hasAriaLabels;
        },
        severity: 'info' as const,
        message: 'Component should include test-friendly attributes (data-testid, aria-label)'
      }
    ];

    for (const testCheck of testChecks) {
      const check: QualityCheck = {
        id: testCheck.id,
        name: testCheck.name,
        description: testCheck.message,
        category: 'testing',
        severity: testCheck.severity,
        status: testCheck.test() ? 'pass' : 'fail',
        rule: testCheck.id,
        autoFixable: false,
        performance: { executionTime: 0, memoryUsage: 0 }
      };

      if (check.status === 'fail') {
        check.message = testCheck.message;
        warnings++;
      }

      checks.push(check);
    }

    const score = this.calculateCategoryScore(checks);

    return {
      score,
      status: warnings > 0 ? 'warning' : 'pass',
      checks,
      summary: `Testing validation: ${checks.length} checks run, 0 critical issues, ${warnings} suggestions`,
      criticalIssues: 0,
      warnings: 0,
      suggestions: warnings
    };
  }

  private async validateDocumentation(context: ValidationContext): Promise<CategoryResult> {
    const checks: QualityCheck[] = [];
    let warnings = 0;

    // Documentation checks
    const docChecks = [
      {
        id: 'component-documentation',
        name: 'Component Documentation',
        test: () => {
          const hasJSDoc = context.fileContent.includes('/**');
          const hasFileHeader = context.fileContent.includes('@fileoverview') || context.fileContent.includes('@description');
          return hasJSDoc && hasFileHeader;
        },
        severity: 'info' as const,
        message: 'Component file should include JSDoc documentation with file overview'
      },
      {
        id: 'props-documentation',
        name: 'Props Documentation',
        test: () => {
          const hasPropsInterface = context.fileContent.includes('Props');
          const hasJSDocProps = context.fileContent.includes('@param') || context.fileContent.includes('*/');
          return !hasPropsInterface || hasJSDocProps;
        },
        severity: 'info' as const,
        message: 'Component props interface should be documented'
      }
    ];

    for (const docCheck of docChecks) {
      const check: QualityCheck = {
        id: docCheck.id,
        name: docCheck.name,
        description: docCheck.message,
        category: 'documentation',
        severity: docCheck.severity,
        status: docCheck.test() ? 'pass' : 'fail',
        rule: docCheck.id,
        autoFixable: false,
        performance: { executionTime: 0, memoryUsage: 0 }
      };

      if (check.status === 'fail') {
        check.message = docCheck.message;
        warnings++;
      }

      checks.push(check);
    }

    const score = this.calculateCategoryScore(checks);

    return {
      score,
      status: warnings > 0 ? 'warning' : 'pass',
      checks,
      summary: `Documentation validation: ${checks.length} checks run, 0 critical issues, ${warnings} suggestions`,
      criticalIssues: 0,
      warnings: 0,
      suggestions: warnings
    };
  }

  private calculateCategoryScore(checks: QualityCheck[]): number {
    if (checks.length === 0) return 100;

    let totalWeight = 0;
    let weightedScore = 0;

    for (const check of checks) {
      let weight = 1;
      switch (check.severity) {
        case 'critical': weight = 4; break;
        case 'error': weight = 3; break;
        case 'warning': weight = 2; break;
        case 'info': weight = 1; break;
      }

      totalWeight += weight;
      if (check.status === 'pass') {
        weightedScore += weight;
      }
    }

    return Math.round((weightedScore / totalWeight) * 100);
  }

  private calculateOverallScore(categories: QualityCategoryResults): QualityScore {
    const categoryWeights = {
      codePatterns: 0.2,
      typeScript: 0.2,
      accessibility: 0.15,
      performance: 0.15,
      security: 0.15,
      maintainability: 0.1,
      testing: 0.05,
      documentation: 0.05
    };

    let weightedScore = 0;
    const factors: QualityFactor[] = [];

    Object.entries(categories).forEach(([category, result]) => {
      const weight = categoryWeights[category as keyof typeof categoryWeights] || 0;
      weightedScore += result.score * weight;

      factors.push({
        name: category,
        weight,
        score: result.score,
        impact: result.score >= 80 ? 'positive' : result.score >= 60 ? 'neutral' : 'negative',
        description: result.summary,
        evidence: result.checks.map(c => c.name)
      });
    });

    const finalScore = Math.round(weightedScore);
    const grade = this.scoreToGrade(finalScore);
    const level = this.scoreToLevel(finalScore);

    return {
      score: finalScore,
      grade,
      level,
      confidence: 90, // High confidence in automated validation
      factors
    };
  }

  private scoreToGrade(score: number): QualityScore['grade'] {
    if (score >= 97) return 'A+';
    if (score >= 93) return 'A';
    if (score >= 90) return 'B+';
    if (score >= 87) return 'B';
    if (score >= 83) return 'C+';
    if (score >= 80) return 'C';
    if (score >= 70) return 'D';
    return 'F';
  }

  private scoreToLevel(score: number): QualityScore['level'] {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'fair';
    if (score >= 60) return 'poor';
    return 'critical';
  }

  private collectViolationsAndWarnings(result: QualityValidationResult): void {
    Object.values(result.categories).forEach(category => {
      category.checks.forEach(check => {
        if (check.status === 'fail') {
          if (check.severity === 'critical' || check.severity === 'error') {
            result.violations.push({
              checkId: check.id,
              severity: check.severity,
              message: check.message || check.description,
              location: {
                file: 'current-file',
                line: 1,
                column: 1,
                context: 'Quality validation'
              },
              rule: check.rule,
              suggestion: `Fix ${check.name.toLowerCase()}`,
              autoFixable: check.autoFixable,
              examples: []
            });
          } else if (check.severity === 'warning') {
            result.warnings.push({
              checkId: check.id,
              message: check.message || check.description,
              location: {
                file: 'current-file',
                line: 1,
                column: 1,
                context: 'Quality validation'
              },
              rule: check.rule,
              suggestion: `Consider improving ${check.name.toLowerCase()}`,
              impact: 'medium'
            });
          }

          result.failedChecks.push(check.id);
        } else {
          result.passedChecks.push(check.id);
        }
      });
    });
  }

  private generateRecommendations(result: QualityValidationResult): QualityRecommendation[] {
    const recommendations: QualityRecommendation[] = [];

    // Generate recommendations based on violations and overall score
    if (result.overall.score < 70) {
      recommendations.push({
        category: 'Overall Quality',
        priority: 'critical',
        title: 'Improve Overall Code Quality',
        description: 'Code quality score is below acceptable threshold',
        benefits: ['Better maintainability', 'Reduced technical debt', 'Improved developer experience'],
        effort: 'high',
        impact: 'high',
        implementation: [
          'Address critical violations first',
          'Implement coding standards',
          'Add comprehensive tests',
          'Improve documentation'
        ],
        resources: ['Quality guidelines', 'Code review checklist', 'Automated tools']
      });
    }

    // Category-specific recommendations
    Object.entries(result.categories).forEach(([category, categoryResult]) => {
      if (categoryResult.score < 80 && categoryResult.criticalIssues > 0) {
        recommendations.push({
          category,
          priority: 'high',
          title: `Improve ${category} Quality`,
          description: `${category} score (${categoryResult.score}) needs improvement`,
          benefits: [`Better ${category.toLowerCase()}`, 'Compliance with standards'],
          effort: 'medium',
          impact: 'medium',
          implementation: [
            `Review ${category.toLowerCase()} violations`,
            `Apply ${category.toLowerCase()} best practices`,
            'Update code to meet standards'
          ],
          resources: [`${category} guidelines`, 'Documentation', 'Tools']
        });
      }
    });

    return recommendations;
  }

  private aggregateRecommendations(results: QualityValidationResult[]): QualityRecommendation[] {
    const aggregated = new Map<string, QualityRecommendation>();

    results.forEach(result => {
      result.recommendations.forEach(rec => {
        const key = `${rec.category}-${rec.title}`;
        if (!aggregated.has(key)) {
          aggregated.set(key, { ...rec });
        }
      });
    });

    return Array.from(aggregated.values());
  }

  // =========================================
  // AI Testing Integration Methods
  // =========================================

  /**
   * Validate test scenario quality
   */
  public async validateTestScenario(scenario: any): Promise<QualityValidationResult> {
    const context: ValidationContext = {
      fileContent: JSON.stringify(scenario, null, 2),
      filePath: `test-scenario-${scenario.id}.json`,
      componentType: scenario.component || 'unknown',
      metadata: {
        testType: scenario.type,
        priority: scenario.priority,
        estimatedDuration: scenario.estimatedDuration
      }
    };

    const result = await this.validateCode(context);
    
    // Add test-specific validations
    const testChecks = await this.performTestSpecificChecks(scenario);
    result.categories.testing.checks.push(...testChecks);

    return result;
  }

  /**
   * Validate test execution results
   */
  public async validateTestResults(results: any[]): Promise<QualityValidationResult> {
    const context: ValidationContext = {
      fileContent: JSON.stringify(results, null, 2),
      filePath: 'test-results.json',
      componentType: 'test-results',
      metadata: {
        totalTests: results.length,
        passedTests: results.filter(r => r.status === 'passed').length,
        failedTests: results.filter(r => r.status === 'failed').length
      }
    };

    const result = await this.validateCode(context);
    
    // Calculate test quality metrics
    const testQuality = this.calculateTestQuality(results);
    result.metrics.testCoverage = testQuality.coverage;
    
    // Add test execution quality assessment
    if (testQuality.successRate < 70) {
      result.violations.push({
        rule: 'test-success-rate',
        severity: 'warning',
        message: `Test success rate (${testQuality.successRate}%) below recommended threshold (70%)`,
        line: 0,
        column: 0,
        file: 'test-results',
        autoFixable: false,
        suggestion: 'Review failing tests and improve test reliability'
      });
    }

    return result;
  }

  /**
   * Perform test-specific quality checks
   */
  private async performTestSpecificChecks(scenario: any): Promise<QualityCheck[]> {
    const checks: QualityCheck[] = [];

    // Check test scenario completeness
    checks.push({
      id: 'test-scenario-completeness',
      name: 'Test Scenario Completeness',
      description: 'Validate that test scenario has all required fields',
      category: 'testing',
      severity: scenario.id && scenario.component && scenario.type ? 'info' : 'error',
      status: scenario.id && scenario.component && scenario.type ? 'pass' : 'fail',
      message: scenario.id && scenario.component && scenario.type 
        ? 'Test scenario is complete' 
        : 'Test scenario missing required fields (id, component, type)',
      rule: 'test-scenario-completeness',
      autoFixable: false,
      performance: {
        executionTime: 10,
        memoryUsage: 1024
      }
    });

    return checks;
  }

  /**
   * Calculate test quality metrics
   */
  private calculateTestQuality(results: any[]): {
    coverage: number;
    successRate: number;
    reliability: number;
    avgDuration: number;
  } {
    const total = results.length;
    const passed = results.filter(r => r.status === 'passed').length;
    
    const successRate = total > 0 ? Math.round((passed / total) * 100) : 0;
    const avgDuration = total > 0 ? results.reduce((sum, r) => sum + (r.duration || 0), 0) / total : 0;
    const coverage = Math.min(95, 60 + (successRate * 0.3));

    return {
      coverage: Math.round(coverage),
      successRate,
      reliability: Math.round((passed / total) * 100),
      avgDuration: Math.round(avgDuration)
    };
  }
}

/**
 * Quality summary interface
 */
export interface QualitySummary {
  totalFiles: number;
  totalViolations: number;
  totalWarnings: number;
  averageScore: number;
  grade: QualityScore['grade'];
  categoryScores: Record<string, number>;
  worstPerformers: Array<{ file: string; score: number }>;
  recommendations: QualityRecommendation[];
}

/**
 * Factory function to create a QualityValidator instance
 */
export const createQualityValidator = (configuration?: Partial<ValidationConfiguration>): QualityValidator => {
  return new QualityValidator(configuration);
};

/**
 * Default export for convenience
 */
export default QualityValidator;