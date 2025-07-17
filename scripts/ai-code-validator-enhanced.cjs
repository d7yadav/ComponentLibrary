#!/usr/bin/env node

/**
 * @fileoverview Enhanced AI Code Pattern Validator
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * This script provides comprehensive AI-powered code validation that integrates
 * with our AI workflow engines to analyze code quality, patterns, and compliance.
 */

const fs = require('fs').promises;
const path = require('path');
const { performance } = require('perf_hooks');

/**
 * AI Code Validation Engine
 */
class AICodeValidator {
  constructor() {
    this.validationRules = new Map();
    this.metrics = {
      totalFiles: 0,
      validatedFiles: 0,
      errors: 0,
      warnings: 0,
      suggestions: 0,
      score: 0,
    };
    this.results = [];
    this.startTime = performance.now();
    
    this.initializeValidationRules();
  }

  /**
   * Initialize validation rules based on project standards
   */
  initializeValidationRules() {
    // Component structure rules
    this.validationRules.set('component-structure', {
      name: 'Component Structure Validation',
      pattern: /\.tsx$/,
      validator: this.validateComponentStructure.bind(this),
      severity: 'error',
      category: 'architecture',
    });

    // AI-friendly patterns
    this.validationRules.set('ai-patterns', {
      name: 'AI-Friendly Patterns',
      pattern: /\.(tsx|ts)$/,
      validator: this.validateAIPatterns.bind(this),
      severity: 'warning',
      category: 'ai-compliance',
    });

    // TypeScript strict compliance
    this.validationRules.set('typescript-strict', {
      name: 'TypeScript Strict Compliance',
      pattern: /\.(tsx|ts)$/,
      validator: this.validateTypeScriptStrict.bind(this),
      severity: 'error',
      category: 'typescript',
    });

    // Accessibility compliance
    this.validationRules.set('accessibility', {
      name: 'Accessibility Compliance',
      pattern: /\.tsx$/,
      validator: this.validateAccessibility.bind(this),
      severity: 'warning',
      category: 'accessibility',
    });

    // Performance patterns
    this.validationRules.set('performance', {
      name: 'Performance Best Practices',
      pattern: /\.(tsx|ts)$/,
      validator: this.validatePerformance.bind(this),
      severity: 'suggestion',
      category: 'performance',
    });

    // Documentation completeness
    this.validationRules.set('documentation', {
      name: 'Documentation Completeness',
      pattern: /\/[A-Z][a-zA-Z]+\/$/,
      validator: this.validateDocumentation.bind(this),
      severity: 'warning',
      category: 'documentation',
    });

    // Test file requirements
    this.validationRules.set('test-coverage', {
      name: 'Test File Requirements',
      pattern: /\.tsx$/,
      validator: this.validateTestCoverage.bind(this),
      severity: 'error',
      category: 'testing',
    });
  }

  /**
   * Main validation entry point
   */
  async validateProject(targetPath = 'src') {
    try {
      console.log('🤖 AI Code Validation Engine Starting...');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      const projectPath = path.resolve(process.cwd(), targetPath);
      await this.scanDirectory(projectPath);
      
      await this.generateReport();
      
      return this.metrics.score >= 85; // Pass threshold
    } catch (error) {
      console.error('❌ Validation failed:', error.message);
      return false;
    }
  }

  /**
   * Recursively scan directory for files to validate
   */
  async scanDirectory(dirPath) {
    try {
      const items = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item.name);
        
        if (item.isDirectory()) {
          // Skip node_modules, dist, and other build directories
          if (!['node_modules', 'dist', '.git', '.storybook'].includes(item.name)) {
            await this.scanDirectory(fullPath);
          }
        } else if (item.isFile()) {
          await this.validateFile(fullPath);
        }
      }
    } catch (error) {
      console.warn(`⚠️ Could not scan directory ${dirPath}: ${error.message}`);
    }
  }

  /**
   * Validate individual file
   */
  async validateFile(filePath) {
    try {
      this.metrics.totalFiles++;
      
      const relativePath = path.relative(process.cwd(), filePath);
      const fileExtension = path.extname(filePath);
      const content = await fs.readFile(filePath, 'utf8');
      
      const fileResult = {
        path: relativePath,
        size: content.length,
        lines: content.split('\n').length,
        issues: [],
        score: 100,
      };

      // Apply relevant validation rules
      for (const [ruleId, rule] of this.validationRules) {
        if (rule.pattern.test(filePath) || rule.pattern.test(relativePath)) {
          const issues = await rule.validator(content, filePath, relativePath);
          fileResult.issues.push(...issues.map(issue => ({
            ...issue,
            rule: ruleId,
            category: rule.category,
            severity: rule.severity,
          })));
        }
      }

      // Calculate file score
      fileResult.score = this.calculateFileScore(fileResult.issues);
      this.results.push(fileResult);
      
      // Update metrics
      this.updateMetrics(fileResult);
      
      // Log progress for important files
      if (fileExtension === '.tsx' || filePath.includes('ai-workflow')) {
        const emoji = fileResult.score >= 90 ? '✅' : fileResult.score >= 70 ? '⚠️' : '❌';
        console.log(`${emoji} ${relativePath} (Score: ${fileResult.score})`);
      }
      
    } catch (error) {
      console.warn(`⚠️ Could not validate ${filePath}: ${error.message}`);
    }
  }

  /**
   * Validate component structure patterns
   */
  async validateComponentStructure(content, filePath, relativePath) {
    const issues = [];
    
    // Check for proper component naming
    const componentName = path.basename(filePath, '.tsx');
    if (!content.includes(`export { ${componentName} }`)) {
      issues.push({
        message: `Component should export named export: export { ${componentName} }`,
        line: 1,
        type: 'export-pattern',
      });
    }

    // Check for default export (should not exist)
    if (content.includes('export default')) {
      issues.push({
        message: 'Components should use named exports only, no default exports',
        line: this.findLineNumber(content, 'export default'),
        type: 'default-export',
      });
    }

    // Check for proper TypeScript interfaces
    if (content.includes('Props') && !content.includes(`interface ${componentName}Props`)) {
      issues.push({
        message: `Component should define interface ${componentName}Props`,
        line: 1,
        type: 'interface-missing',
      });
    }

    // Check for data-testid
    if (!content.includes('data-testid')) {
      issues.push({
        message: 'Component should include data-testid for testing',
        line: 1,
        type: 'testid-missing',
      });
    }

    return issues;
  }

  /**
   * Validate AI-friendly patterns
   */
  async validateAIPatterns(content, filePath, relativePath) {
    const issues = [];
    
    // Check for proper JSDoc comments
    if (content.includes('export') && !content.includes('/**')) {
      issues.push({
        message: 'Exported functions/components should have JSDoc comments for AI understanding',
        line: 1,
        type: 'jsdoc-missing',
      });
    }

    // Check for any types (should be explicit)
    const anyTypeMatches = content.match(/:\s*any\b/g);
    if (anyTypeMatches) {
      issues.push({
        message: `Found ${anyTypeMatches.length} 'any' type(s). Use explicit types for AI comprehension`,
        line: this.findLineNumber(content, ': any'),
        type: 'any-type',
      });
    }

    // Check for proper error boundaries in components
    if (relativePath.includes('components/') && content.includes('throw') && !content.includes('ErrorBoundary')) {
      issues.push({
        message: 'Components that can throw errors should be wrapped with ErrorBoundary',
        line: this.findLineNumber(content, 'throw'),
        type: 'error-boundary',
      });
    }

    return issues;
  }

  /**
   * Validate TypeScript strict compliance
   */
  async validateTypeScriptStrict(content, filePath, relativePath) {
    const issues = [];
    
    // Check for non-null assertions (!.) - should be minimized
    const nonNullAssertions = content.match(/\!\./g);
    if (nonNullAssertions && nonNullAssertions.length > 3) {
      issues.push({
        message: `Too many non-null assertions (${nonNullAssertions.length}). Consider proper null checking`,
        line: this.findLineNumber(content, '!.'),
        type: 'non-null-assertion',
      });
    }

    // Check for @ts-ignore comments
    if (content.includes('@ts-ignore')) {
      issues.push({
        message: 'Avoid @ts-ignore. Fix TypeScript errors properly',
        line: this.findLineNumber(content, '@ts-ignore'),
        type: 'ts-ignore',
      });
    }

    // Check for proper return types on functions
    const functionMatches = content.match(/function\s+\w+\s*\([^)]*\)\s*{/g);
    if (functionMatches) {
      functionMatches.forEach(() => {
        if (!content.includes(': ') || !content.includes('=>')) {
          // This is a simplified check
        }
      });
    }

    return issues;
  }

  /**
   * Validate accessibility compliance
   */
  async validateAccessibility(content, filePath, relativePath) {
    const issues = [];
    
    // Check for ARIA labels
    if (content.includes('<button') && !content.includes('aria-label')) {
      issues.push({
        message: 'Interactive elements should have aria-label for accessibility',
        line: this.findLineNumber(content, '<button'),
        type: 'aria-label-missing',
      });
    }

    // Check for alt text on images
    if (content.includes('<img') && !content.includes('alt=')) {
      issues.push({
        message: 'Images should have alt text for accessibility',
        line: this.findLineNumber(content, '<img'),
        type: 'alt-text-missing',
      });
    }

    // Check for proper heading structure
    const headingMatches = content.match(/<h[1-6]/g);
    if (headingMatches && headingMatches.length > 1) {
      // This would need more complex logic to validate heading hierarchy
    }

    // Check for focus management
    if (content.includes('onFocus') && !content.includes('onBlur')) {
      issues.push({
        message: 'Components with onFocus should also handle onBlur for accessibility',
        line: this.findLineNumber(content, 'onFocus'),
        type: 'focus-management',
      });
    }

    return issues;
  }

  /**
   * Validate performance best practices
   */
  async validatePerformance(content, filePath, relativePath) {
    const issues = [];
    
    // Check for React.memo usage on pure components
    if (content.includes('export') && content.includes('Props') && !content.includes('memo')) {
      const isComplexComponent = content.length > 2000 || content.includes('useState') || content.includes('useEffect');
      if (isComplexComponent) {
        issues.push({
          message: 'Consider using React.memo for performance optimization on complex components',
          line: 1,
          type: 'memo-suggestion',
        });
      }
    }

    // Check for expensive operations in render
    if (content.includes('JSON.parse') || content.includes('JSON.stringify')) {
      issues.push({
        message: 'Expensive operations like JSON.parse should be memoized with useMemo',
        line: this.findLineNumber(content, 'JSON.'),
        type: 'expensive-operation',
      });
    }

    // Check for inline object/function creation
    const inlineObjectMatches = content.match(/\{\s*\w+:/g);
    if (inlineObjectMatches && inlineObjectMatches.length > 5) {
      issues.push({
        message: 'Consider extracting inline objects to avoid re-renders',
        line: 1,
        type: 'inline-objects',
      });
    }

    return issues;
  }

  /**
   * Validate documentation completeness for component directories
   */
  async validateDocumentation(content, filePath, relativePath) {
    const issues = [];
    
    try {
      const dirItems = await fs.readdir(filePath);
      const requiredFiles = [
        'README.md',
        `${path.basename(filePath)}.ai-guide.md`,
        `${path.basename(filePath)}.examples.md`,
        `${path.basename(filePath)}.stories.tsx`,
      ];
      
      for (const requiredFile of requiredFiles) {
        if (!dirItems.includes(requiredFile)) {
          issues.push({
            message: `Missing required documentation file: ${requiredFile}`,
            line: 1,
            type: 'documentation-missing',
          });
        }
      }
    } catch (error) {
      // Not a directory or can't read - skip
    }
    
    return issues;
  }

  /**
   * Validate test file coverage for components
   */
  async validateTestCoverage(content, filePath, relativePath) {
    const issues = [];
    
    // Only validate component files (not test files, stories, etc.)
    if (relativePath.includes('.test.') || relativePath.includes('.stories.') || 
        relativePath.includes('index.ts') || !relativePath.includes('/components/')) {
      return issues;
    }
    
    const componentName = path.basename(filePath, '.tsx');
    const componentDir = path.dirname(filePath);
    const testFilePath = path.join(componentDir, `${componentName}.test.tsx`);
    
    try {
      const dirItems = await fs.readdir(componentDir);
      const testFileExists = dirItems.includes(`${componentName}.test.tsx`);
      
      if (!testFileExists) {
        issues.push({
          message: `Missing required test file: ${componentName}.test.tsx`,
          line: 1,
          type: 'test-missing',
          severity: 'error',
          category: 'testing',
        });
      } else {
        // Validate test file quality
        try {
          const testContent = await fs.readFile(testFilePath, 'utf8');
          
          // Check for basic test structure
          const requiredTestSections = [
            'Rendering',
            'Props', 
            'Accessibility',
            'Theme Integration'
          ];
          
          for (const section of requiredTestSections) {
            if (!testContent.includes(`describe('${section}'`)) {
              issues.push({
                message: `Test file missing '${section}' test section`,
                line: 1,
                type: 'test-incomplete',
                severity: 'warning',
                category: 'testing',
              });
            }
          }
          
          // Check for accessibility testing
          if (!testContent.includes('axe(container)')) {
            issues.push({
              message: 'Test file missing automated accessibility testing with axe',
              line: 1,
              type: 'test-accessibility',
              severity: 'warning',
              category: 'testing',
            });
          }
          
          // Check for user interaction testing
          if (!testContent.includes('userEvent.')) {
            issues.push({
              message: 'Test file missing user interaction testing',
              line: 1,
              type: 'test-interaction',
              severity: 'warning',
              category: 'testing',
            });
          }
          
        } catch (error) {
          issues.push({
            message: `Cannot read test file: ${error.message}`,
            line: 1,
            type: 'test-error',
            severity: 'error',
            category: 'testing',
          });
        }
      }
    } catch (error) {
      // Cannot read directory - skip validation
    }
    
    return issues;
  }

  /**
   * Calculate score for individual file
   */
  calculateFileScore(issues) {
    let score = 100;
    
    for (const issue of issues) {
      switch (issue.severity) {
        case 'error':
          score -= 10;
          break;
        case 'warning':
          score -= 5;
          break;
        case 'suggestion':
          score -= 2;
          break;
      }
    }
    
    return Math.max(0, score);
  }

  /**
   * Update overall metrics
   */
  updateMetrics(fileResult) {
    this.metrics.validatedFiles++;
    
    for (const issue of fileResult.issues) {
      switch (issue.severity) {
        case 'error':
          this.metrics.errors++;
          break;
        case 'warning':
          this.metrics.warnings++;
          break;
        case 'suggestion':
          this.metrics.suggestions++;
          break;
      }
    }
    
    // Calculate weighted average score
    const totalScore = this.results.reduce((sum, result) => sum + result.score, 0);
    this.metrics.score = Math.round(totalScore / this.results.length);
  }

  /**
   * Generate comprehensive validation report
   */
  async generateReport() {
    const endTime = performance.now();
    const duration = Math.round(endTime - this.startTime);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 AI CODE VALIDATION REPORT');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Overall metrics
    console.log(`\n📈 Overall Quality Score: ${this.getScoreEmoji(this.metrics.score)} ${this.metrics.score}/100`);
    console.log(`📁 Files Validated: ${this.metrics.validatedFiles}/${this.metrics.totalFiles}`);
    console.log(`⏱️  Validation Time: ${duration}ms`);
    
    // Issue breakdown
    console.log('\n🔍 Issue Summary:');
    console.log(`  ❌ Errors: ${this.metrics.errors}`);
    console.log(`  ⚠️  Warnings: ${this.metrics.warnings}`);
    console.log(`  💡 Suggestions: ${this.metrics.suggestions}`);
    
    // Category breakdown
    const categoryStats = this.getCategoryStats();
    if (categoryStats.size > 0) {
      console.log('\n📊 Issues by Category:');
      for (const [category, count] of categoryStats) {
        console.log(`  ${this.getCategoryEmoji(category)} ${category}: ${count}`);
      }
    }
    
    // Top issues
    const topIssues = this.getTopIssues();
    if (topIssues.length > 0) {
      console.log('\n🔥 Top Issues to Address:');
      topIssues.slice(0, 5).forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue.message} (${issue.count} occurrences)`);
      });
    }
    
    // AI recommendations
    console.log('\n🤖 AI Recommendations:');
    this.generateAIRecommendations();
    
    // Component health scores (for component files)
    const componentScores = this.getComponentScores();
    if (componentScores.length > 0) {
      console.log('\n🧩 Component Health Scores:');
      componentScores.forEach(comp => {
        const emoji = this.getScoreEmoji(comp.score);
        console.log(`  ${emoji} ${comp.name}: ${comp.score}/100`);
      });
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Save detailed report
    await this.saveDetailedReport();
    
    // Exit with appropriate code
    if (this.metrics.score >= 85) {
      console.log('✅ Code validation passed! Quality threshold met.');
      return true;
    } else {
      console.log('❌ Code validation failed. Please address the issues above.');
      return false;
    }
  }

  /**
   * Generate AI-powered recommendations
   */
  generateAIRecommendations() {
    const recommendations = [];
    
    if (this.metrics.errors > 10) {
      recommendations.push('Focus on fixing critical errors first - they have the highest impact on code quality');
    }
    
    if (this.metrics.score < 70) {
      recommendations.push('Consider running AI-assisted refactoring to improve overall code quality');
    }
    
    const categoryStats = this.getCategoryStats();
    const topCategory = Array.from(categoryStats.entries()).sort((a, b) => b[1] - a[1])[0];
    if (topCategory && topCategory[1] > 5) {
      recommendations.push(`High number of ${topCategory[0]} issues - consider focused review of ${topCategory[0]} patterns`);
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Code quality is good! Consider implementing advanced patterns like performance optimization');
    }
    
    recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
  }

  /**
   * Get category statistics
   */
  getCategoryStats() {
    const stats = new Map();
    
    for (const result of this.results) {
      for (const issue of result.issues) {
        const count = stats.get(issue.category) || 0;
        stats.set(issue.category, count + 1);
      }
    }
    
    return stats;
  }

  /**
   * Get top issues by frequency
   */
  getTopIssues() {
    const issueCount = new Map();
    
    for (const result of this.results) {
      for (const issue of result.issues) {
        const key = `${issue.type}: ${issue.message}`;
        const count = issueCount.get(key) || 0;
        issueCount.set(key, count + 1);
      }
    }
    
    return Array.from(issueCount.entries())
      .map(([message, count]) => ({ message, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get component health scores
   */
  getComponentScores() {
    return this.results
      .filter(result => result.path.includes('/components/') && result.path.endsWith('.tsx'))
      .map(result => ({
        name: path.basename(result.path, '.tsx'),
        score: result.score,
        path: result.path,
      }))
      .sort((a, b) => b.score - a.score);
  }

  /**
   * Save detailed report to file
   */
  async saveDetailedReport() {
    try {
      const reportDir = path.join(process.cwd(), '.ai-reports');
      await fs.mkdir(reportDir, { recursive: true });
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const reportPath = path.join(reportDir, `validation-report-${timestamp}.json`);
      
      const report = {
        timestamp: new Date().toISOString(),
        metrics: this.metrics,
        results: this.results,
        summary: {
          passed: this.metrics.score >= 85,
          score: this.metrics.score,
          totalIssues: this.metrics.errors + this.metrics.warnings + this.metrics.suggestions,
        },
      };
      
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      console.log(`📄 Detailed report saved: ${reportPath}`);
    } catch (error) {
      console.warn('⚠️ Could not save detailed report:', error.message);
    }
  }

  /**
   * Helper methods
   */
  findLineNumber(content, searchText) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(searchText)) {
        return i + 1;
      }
    }
    return 1;
  }

  getScoreEmoji(score) {
    if (score >= 90) return '🟢';
    if (score >= 75) return '🟡';
    if (score >= 60) return '🟠';
    return '🔴';
  }

  getCategoryEmoji(category) {
    const emojis = {
      'architecture': '🏗️',
      'ai-compliance': '🤖',
      'typescript': '📘',
      'accessibility': '♿',
      'performance': '⚡',
      'documentation': '📚',
      'testing': '🧪',
    };
    return emojis[category] || '📋';
  }
}

/**
 * CLI Interface
 */
async function main() {
  const validator = new AICodeValidator();
  
  const targetPath = process.argv[2] || 'src';
  const passed = await validator.validateProject(targetPath);
  
  process.exit(passed ? 0 : 1);
}

// Export for use in other scripts
module.exports = { AICodeValidator };

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Validation crashed:', error.message);
    process.exit(1);
  });
}