#!/usr/bin/env node

/**
 * @fileoverview AI Storybook Validator
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Enhanced Storybook validation that catches runtime issues that TypeScript compilation misses.
 * This addresses the critical gap identified where components pass TypeScript validation but fail at runtime.
 */

const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

class StorybookValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validationResults = {};
  }

  /**
   * Main validation method
   */
  async validateStorybook() {
    console.log('🤖 AI Storybook Validation Starting...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
      // Step 1: Validate story file structure
      await this.validateStoryFiles();
      
      // Step 2: Test Storybook build
      await this.testStorybookBuild();
      
      // Step 3: Validate runtime loading
      await this.validateRuntimeLoading();
      
      // Step 4: Generate report
      await this.generateReport();
      
      return this.validationResults;
      
    } catch (error) {
      console.error(`❌ Storybook validation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Validate story file structure and exports
   */
  async validateStoryFiles() {
    console.log('📋 Validating story file structure...');
    
    const storyFiles = await this.findStoryFiles();
    const issues = [];
    
    for (const filePath of storyFiles) {
      const content = await fs.readFile(filePath, 'utf-8');
      const relativePath = path.relative(process.cwd(), filePath);
      
      // Check for required Storybook patterns
      const validationResults = this.validateStoryContent(content, relativePath);
      if (validationResults.length > 0) {
        issues.push(...validationResults);
      }
    }
    
    if (issues.length > 0) {
      console.log(`⚠️  Found ${issues.length} story file issues:`);
      issues.forEach(issue => console.log(`   - ${issue}`));
      this.warnings.push(...issues);
    } else {
      console.log('✅ All story files have correct structure');
    }
  }

  /**
   * Find all story files in the project
   */
  async findStoryFiles() {
    const glob = require('glob');
    const { promisify } = require('util');
    const globAsync = promisify(glob);
    
    const patterns = [
      'src/**/*.stories.@(js|jsx|ts|tsx)',
      'stories/**/*.stories.@(js|jsx|ts|tsx)'
    ];
    
    const files = [];
    for (const pattern of patterns) {
      const matches = await globAsync(pattern, { ignore: 'node_modules/**' });
      files.push(...matches);
    }
    
    return files;
  }

  /**
   * Validate individual story file content
   */
  validateStoryContent(content, filePath) {
    const issues = [];
    
    // Check for default export (required by Storybook)
    if (!content.match(/export\s+default\s+/)) {
      issues.push(`${filePath}: Missing default export for meta object`);
    }
    
    // Check for meta object
    if (!content.includes('Meta<') && !content.includes(': Meta')) {
      issues.push(`${filePath}: Missing Meta type definition`);
    }
    
    // Check for at least one story export
    const storyExports = content.match(/export\s+const\s+\w+:\s*Story/g);
    if (!storyExports || storyExports.length === 0) {
      issues.push(`${filePath}: No story exports found`);
    }
    
    // Check for component import
    const hasComponentImport = content.match(/import.*from\s+['"]\.\//);
    if (!hasComponentImport) {
      issues.push(`${filePath}: Missing component import`);
    }
    
    return issues;
  }

  /**
   * Test Storybook build process
   */
  async testStorybookBuild() {
    console.log('🔨 Testing Storybook build...');
    
    return new Promise((resolve, reject) => {
      const storybookProcess = spawn('yarn', ['storybook', '--port', '6009', '--quiet'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: false
      });
      
      let stdout = '';
      let stderr = '';
      let hasStarted = false;
      
      storybookProcess.stdout.on('data', (data) => {
        stdout += data.toString();
        
        // Check if Storybook started successfully
        if (stdout.includes('Storybook') && stdout.includes('started')) {
          hasStarted = true;
          
          // Kill the process after successful start
          setTimeout(() => {
            storybookProcess.kill('SIGTERM');
            console.log('✅ Storybook builds and starts successfully');
            resolve();
          }, 2000);
        }
      });
      
      storybookProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });
      
      storybookProcess.on('close', (code) => {
        if (!hasStarted) {
          const errorOutput = stderr || stdout;
          console.log('❌ Storybook failed to start');
          console.log('Error output:', errorOutput);
          this.errors.push('Storybook build failed');
          reject(new Error('Storybook failed to start'));
        }
      });
      
      // Timeout after 30 seconds
      setTimeout(() => {
        if (!hasStarted) {
          storybookProcess.kill('SIGTERM');
          console.log('⏰ Storybook startup timeout');
          this.errors.push('Storybook startup timeout');
          reject(new Error('Storybook startup timeout'));
        }
      }, 30000);
    });
  }

  /**
   * Validate runtime loading of stories
   */
  async validateRuntimeLoading() {
    console.log('🚀 Validating runtime story loading...');
    
    // This could be enhanced with headless browser testing
    // For now, we'll check for common runtime issues in the code
    
    const storyFiles = await this.findStoryFiles();
    const runtimeIssues = [];
    
    for (const filePath of storyFiles) {
      const content = await fs.readFile(filePath, 'utf-8');
      const relativePath = path.relative(process.cwd(), filePath);
      
      // Check for potential runtime issues
      const issues = this.checkRuntimeIssues(content, relativePath);
      runtimeIssues.push(...issues);
    }
    
    if (runtimeIssues.length > 0) {
      console.log(`⚠️  Found ${runtimeIssues.length} potential runtime issues:`);
      runtimeIssues.forEach(issue => console.log(`   - ${issue}`));
      this.warnings.push(...runtimeIssues);
    } else {
      console.log('✅ No obvious runtime issues detected');
    }
  }

  /**
   * Check for common runtime issues in story files
   */
  checkRuntimeIssues(content, filePath) {
    const issues = [];
    
    // Check for undefined imports
    const importMatches = content.match(/import\s+.*\s+from\s+['"][^'"]*['"]/g);
    if (importMatches) {
      importMatches.forEach(importStatement => {
        if (importStatement.includes('./') && !importStatement.includes('.stories')) {
          // Check if relative import might be incorrect
          const pathMatch = importStatement.match(/from\s+['"]([^'"]*)['"]/);
          if (pathMatch && !pathMatch[1].includes('.')) {
            issues.push(`${filePath}: Relative import without extension: ${pathMatch[1]}`);
          }
        }
      });
    }
    
    // Check for missing component in meta
    if (content.includes('component:') && !content.match(/component:\s*\w+/)) {
      issues.push(`${filePath}: Invalid component reference in meta`);
    }
    
    // Check for story args that might cause issues
    const storyMatches = content.match(/export\s+const\s+\w+:\s*Story\s*=\s*{[\s\S]*?};/g);
    if (storyMatches) {
      storyMatches.forEach(storyContent => {
        if (storyContent.includes('render:') && !storyContent.includes('(args)')) {
          issues.push(`${filePath}: Custom render function should accept args parameter`);
        }
      });
    }
    
    return issues;
  }

  /**
   * Generate validation report
   */
  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      status: this.errors.length === 0 ? 'PASSED' : 'FAILED',
      summary: {
        errors: this.errors.length,
        warnings: this.warnings.length,
        storybookBuildStatus: this.errors.length === 0 ? 'SUCCESS' : 'FAILED'
      },
      issues: {
        errors: this.errors,
        warnings: this.warnings
      },
      recommendations: this.generateRecommendations()
    };
    
    // Save report
    const reportsDir = path.join(process.cwd(), '.ai-reports');
    await fs.mkdir(reportsDir, { recursive: true });
    
    const reportFile = path.join(reportsDir, `storybook-validation-${report.timestamp.replace(/[:.]/g, '-')}.json`);
    await fs.writeFile(reportFile, JSON.stringify(report, null, 2));
    
    // Display summary
    console.log('\n📊 STORYBOOK VALIDATION REPORT');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Status: ${report.status === 'PASSED' ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`Errors: ${report.summary.errors}`);
    console.log(`Warnings: ${report.summary.warnings}`);
    console.log(`Build Status: ${report.summary.storybookBuildStatus}`);
    
    if (report.recommendations.length > 0) {
      console.log('\n🎯 Recommendations:');
      report.recommendations.forEach(rec => console.log(`   • ${rec}`));
    }
    
    console.log(`\n📄 Detailed report saved: ${reportFile}`);
    
    this.validationResults = report;
  }

  /**
   * Generate actionable recommendations
   */
  generateRecommendations() {
    const recommendations = [];
    
    if (this.errors.length > 0) {
      recommendations.push('Fix all errors before proceeding - Storybook cannot function with build failures');
    }
    
    if (this.warnings.some(w => w.includes('Missing default export'))) {
      recommendations.push('Ensure all story files have default exports for the meta object');
    }
    
    if (this.warnings.some(w => w.includes('Missing component import'))) {
      recommendations.push('Verify all story files properly import their associated components');
    }
    
    if (this.warnings.length > 5) {
      recommendations.push('Consider running the AI component enhancer to fix common issues');
    }
    
    return recommendations;
  }
}

// Main execution
async function main() {
  const validator = new StorybookValidator();
  
  try {
    const results = await validator.validateStorybook();
    
    // Exit with appropriate code
    if (results.status === 'FAILED') {
      process.exit(1);
    } else {
      console.log('✅ Storybook validation passed!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { StorybookValidator };