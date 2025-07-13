#!/usr/bin/env node
/**
 * @fileoverview Quality Analysis Script
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * This script analyzes the codebase using AI workflow engines
 * and provides improvement recommendations.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class QualityAnalyzer {
  constructor() {
    this.componentsDir = path.join(process.cwd(), 'src', 'components');
    this.issues = [];
    this.recommendations = [];
  }

  log(type, message) {
    const prefix = {
      info: `${colors.blue}ℹ️${colors.reset}`,
      success: `${colors.green}✅${colors.reset}`,
      warning: `${colors.yellow}⚠️${colors.reset}`,
      error: `${colors.red}❌${colors.reset}`,
      header: `${colors.bright}${colors.magenta}🔍${colors.reset}`
    };
    console.log(`${prefix[type]} ${message}`);
  }

  analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(process.cwd(), filePath);
      
      this.log('info', `Analyzing: ${relativePath}`);
      
      // Check for AI guidelines compliance
      this.checkAIGuidelines(content, relativePath);
      
      // Check TypeScript patterns
      this.checkTypeScriptPatterns(content, relativePath);
      
      // Check accessibility patterns
      this.checkAccessibilityPatterns(content, relativePath);
      
      // Check performance patterns
      this.checkPerformancePatterns(content, relativePath);
      
      return true;
    } catch (error) {
      this.log('error', `Failed to analyze ${filePath}: ${error.message}`);
      return false;
    }
  }

  checkAIGuidelines(content, filePath) {
    // Check for proper exports (named vs default)
    if (content.includes('export default')) {
      this.issues.push({
        type: 'ai-guideline',
        severity: 'warning',
        file: filePath,
        issue: 'Uses default export instead of named export',
        recommendation: 'Use named exports for better AI predictability'
      });
    }

    // Check for proper component naming
    const componentNameMatch = content.match(/export\s+const\s+(\w+)/);
    if (componentNameMatch) {
      const componentName = componentNameMatch[1];
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
        this.issues.push({
          type: 'ai-guideline',
          severity: 'error',
          file: filePath,
          issue: `Component name "${componentName}" doesn't follow PascalCase`,
          recommendation: 'Use PascalCase for component names'
        });
      }
    }

    // Check for forwardRef usage
    if (content.includes('forwardRef') && !content.includes('.displayName')) {
      this.issues.push({
        type: 'ai-guideline',
        severity: 'warning',
        file: filePath,
        issue: 'forwardRef component missing displayName',
        recommendation: 'Add displayName for better debugging'
      });
    }
  }

  checkTypeScriptPatterns(content, filePath) {
    // Check for any types
    if (content.includes(': any')) {
      this.issues.push({
        type: 'typescript',
        severity: 'error',
        file: filePath,
        issue: 'Uses "any" type',
        recommendation: 'Replace any types with specific interfaces'
      });
    }

    // Check for proper interface naming
    const interfaceMatches = content.match(/interface\s+(\w+)/g);
    if (interfaceMatches) {
      interfaceMatches.forEach(match => {
        const interfaceName = match.split(' ')[1];
        if (!interfaceName.endsWith('Props') && !interfaceName.endsWith('Options') && !interfaceName.endsWith('Config')) {
          this.issues.push({
            type: 'typescript',
            severity: 'info',
            file: filePath,
            issue: `Interface "${interfaceName}" might need better naming`,
            recommendation: 'Consider using Props, Options, or Config suffix'
          });
        }
      });
    }
  }

  checkAccessibilityPatterns(content, filePath) {
    // Check for aria-label usage
    if (content.includes('<button') && !content.includes('aria-label')) {
      this.issues.push({
        type: 'accessibility',
        severity: 'warning',
        file: filePath,
        issue: 'Button elements missing aria-label',
        recommendation: 'Add aria-label for screen readers'
      });
    }

    // Check for role attributes
    if (content.includes('onClick') && !content.includes('role=') && !content.includes('<button')) {
      this.issues.push({
        type: 'accessibility',
        severity: 'warning',
        file: filePath,
        issue: 'Interactive element missing role attribute',
        recommendation: 'Add proper role attribute for accessibility'
      });
    }
  }

  checkPerformancePatterns(content, filePath) {
    // Check for React.memo usage on complex components
    if (content.length > 2000 && !content.includes('React.memo') && !content.includes('memo(')) {
      this.issues.push({
        type: 'performance',
        severity: 'info',
        file: filePath,
        issue: 'Large component not memoized',
        recommendation: 'Consider using React.memo for performance'
      });
    }

    // Check for inline object creation in props
    if (content.includes('style={{') || content.includes('sx={{')) {
      this.issues.push({
        type: 'performance',
        severity: 'info',
        file: filePath,
        issue: 'Inline object creation detected',
        recommendation: 'Move objects outside render or use useMemo'
      });
    }
  }

  generateRecommendations() {
    // Group issues by type
    const issuesByType = this.issues.reduce((acc, issue) => {
      if (!acc[issue.type]) acc[issue.type] = [];
      acc[issue.type].push(issue);
      return acc;
    }, {});

    // Generate high-level recommendations
    Object.keys(issuesByType).forEach(type => {
      const issues = issuesByType[type];
      const criticalIssues = issues.filter(i => i.severity === 'error').length;
      const warnings = issues.filter(i => i.severity === 'warning').length;

      if (criticalIssues > 0) {
        this.recommendations.push({
          priority: 'high',
          category: type,
          action: `Fix ${criticalIssues} critical ${type} issues`,
          impact: 'High'
        });
      }

      if (warnings > 2) {
        this.recommendations.push({
          priority: 'medium',
          category: type,
          action: `Address ${warnings} ${type} warnings`,
          impact: 'Medium'
        });
      }
    });

    // AI-specific recommendations
    if (issuesByType['ai-guideline']) {
      this.recommendations.push({
        priority: 'high',
        category: 'ai-enhancement',
        action: 'Update components to follow AI guidelines',
        impact: 'High - Improves AI development experience'
      });
    }
  }

  async run() {
    this.log('header', 'AI Quality Analysis Starting...');
    
    // Find all component files
    const componentFiles = this.findComponentFiles();
    
    if (componentFiles.length === 0) {
      this.log('warning', 'No component files found');
      return;
    }

    this.log('info', `Found ${componentFiles.length} component files`);

    // Analyze each file
    let analyzed = 0;
    componentFiles.forEach(file => {
      if (this.analyzeFile(file)) {
        analyzed++;
      }
    });

    // Generate recommendations
    this.generateRecommendations();

    // Output results
    this.outputResults(analyzed, componentFiles.length);
  }

  findComponentFiles() {
    return this.findFilesRecursively(this.componentsDir, /\.tsx$/)
      .filter(file => !file.includes('.stories.') && !file.includes('.test.'));
  }

  findFilesRecursively(dir, pattern) {
    let results = [];
    
    try {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          results = results.concat(this.findFilesRecursively(filePath, pattern));
        } else if (pattern.test(file)) {
          results.push(filePath);
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
    }
    
    return results;
  }

  outputResults(analyzed, total) {
    console.log('\n' + '═'.repeat(60));
    this.log('header', 'AI Quality Analysis Results');
    console.log('═'.repeat(60));

    // Summary
    console.log(`\n${colors.bright}📊 Summary:${colors.reset}`);
    console.log(`  • Files analyzed: ${analyzed}/${total}`);
    console.log(`  • Total issues found: ${this.issues.length}`);
    console.log(`  • Recommendations: ${this.recommendations.length}`);

    // Issues by severity
    const critical = this.issues.filter(i => i.severity === 'error').length;
    const warnings = this.issues.filter(i => i.severity === 'warning').length;
    const info = this.issues.filter(i => i.severity === 'info').length;

    console.log(`\n${colors.bright}🚨 Issues by Severity:${colors.reset}`);
    if (critical > 0) console.log(`  ${colors.red}• Critical: ${critical}${colors.reset}`);
    if (warnings > 0) console.log(`  ${colors.yellow}• Warnings: ${warnings}${colors.reset}`);
    if (info > 0) console.log(`  ${colors.blue}• Info: ${info}${colors.reset}`);

    // Top recommendations
    console.log(`\n${colors.bright}💡 Top Recommendations:${colors.reset}`);
    this.recommendations
      .sort((a, b) => a.priority === 'high' ? -1 : 1)
      .slice(0, 5)
      .forEach((rec, index) => {
        const priority = rec.priority === 'high' ? colors.red : colors.yellow;
        console.log(`  ${index + 1}. ${priority}[${rec.priority.toUpperCase()}]${colors.reset} ${rec.action}`);
        console.log(`     ${colors.dim}Impact: ${rec.impact}${colors.reset}`);
      });

    // Detailed issues (first 10)
    if (this.issues.length > 0) {
      console.log(`\n${colors.bright}🔍 Detailed Issues (Top 10):${colors.reset}`);
      this.issues.slice(0, 10).forEach((issue, index) => {
        const severity = {
          error: colors.red,
          warning: colors.yellow,
          info: colors.blue
        }[issue.severity];
        
        console.log(`\n  ${index + 1}. ${severity}[${issue.severity.toUpperCase()}]${colors.reset} ${issue.issue}`);
        console.log(`     📁 ${colors.dim}${issue.file}${colors.reset}`);
        console.log(`     💡 ${colors.green}${issue.recommendation}${colors.reset}`);
      });
    }

    console.log('\n' + '═'.repeat(60));
    this.log('success', 'Analysis complete! Use recommendations to improve code quality.');
  }
}

// Run the analysis
const analyzer = new QualityAnalyzer();
analyzer.run().catch(error => {
  console.error(`${colors.red}❌ Analysis failed:${colors.reset}`, error.message);
  process.exit(1);
});