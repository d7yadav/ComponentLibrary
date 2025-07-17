#!/usr/bin/env node

/**
 * @fileoverview AI Runtime Validator - Validates runtime errors and story files
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * This script validates runtime issues that build validation might miss:
 * - React imports in story files
 * - CSS-in-JS syntax errors
 * - Storybook build failures
 * - Import path consistency
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { execSync } = require('child_process');

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

class RuntimeValidator {
  constructor() {
    this.violations = [];
    this.warnings = [];
    this.checks = 0;
    this.startTime = Date.now();
  }

  /**
   * Main validation entry point
   */
  async validate() {
    console.log(`${colors.cyan}${colors.bright}🚀 AI Runtime Validator${colors.reset}`);
    console.log(`${colors.blue}Validating runtime errors and story files...${colors.reset}\n`);

    // Find all story files
    const storyFiles = glob.sync('src/**/*.stories.tsx', { absolute: true });
    console.log(`${colors.blue}Found ${storyFiles.length} story files${colors.reset}`);

    // Validate story files
    await this.validateStoryFiles(storyFiles);

    // Validate CSS-in-JS syntax
    const styleFiles = glob.sync('src/**/*.styles.ts', { absolute: true });
    await this.validateCSSInJS(styleFiles);

    // Validate import paths
    const tsFiles = glob.sync('src/**/*.{ts,tsx}', { absolute: true });
    await this.validateImportPaths(tsFiles);

    // Validate Storybook build
    await this.validateStorybookBuild();

    // Generate report
    this.generateReport();
  }

  /**
   * Validate story files for React imports and JSX usage
   */
  async validateStoryFiles(storyFiles) {
    console.log(`${colors.yellow}📚 Validating story files...${colors.reset}`);
    
    for (const filePath of storyFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(process.cwd(), filePath);
        
        // Check for JSX usage
        const hasJSX = /<[A-Z]/.test(content);
        const hasReactImport = /import\s+React/.test(content);
        
        if (hasJSX && !hasReactImport) {
          this.violations.push({
            type: 'CRITICAL',
            rule: 'react-import-stories',
            file: relativePath,
            message: 'Story file with JSX must import React explicitly',
            suggestion: 'Add "import React" to the imports section',
            example: 'import React, { useState } from \'react\';'
          });
        }
        
        // Check for proper story structure
        if (!content.includes('export default')) {
          this.warnings.push({
            type: 'WARNING',
            rule: 'story-default-export',
            file: relativePath,
            message: 'Story file should have default export',
            suggestion: 'Add default export with story metadata'
          });
        }
        
        this.checks++;
      } catch (error) {
        this.warnings.push({
          type: 'WARNING',
          rule: 'file-read-error',
          file: path.relative(process.cwd(), filePath),
          message: `Could not read file: ${error.message}`,
          suggestion: 'Ensure file exists and is readable'
        });
      }
    }
  }

  /**
   * Validate CSS-in-JS syntax
   */
  async validateCSSInJS(styleFiles) {
    console.log(`${colors.yellow}🎨 Validating CSS-in-JS syntax...${colors.reset}`);
    
    for (const filePath of styleFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(process.cwd(), filePath);
        
        // Check for unquoted CSS selectors
        const unquotedSelectors = content.match(/&:[a-zA-Z-]+\s*{/g);
        if (unquotedSelectors) {
          this.violations.push({
            type: 'ERROR',
            rule: 'css-in-js-syntax',
            file: relativePath,
            message: `Found ${unquotedSelectors.length} unquoted CSS selectors`,
            suggestion: 'Quote CSS selectors like \'&:hover\': { ... }',
            example: '\'&:hover\': { opacity: 0.8, cursor: \'pointer\' }'
          });
        }
        
        // Check for missing commas in object properties
        const missingSemicolons = content.match(/[a-zA-Z0-9)]\s*;\s*$/gm);
        if (missingSemicolons) {
          this.warnings.push({
            type: 'WARNING',
            rule: 'css-object-syntax',
            file: relativePath,
            message: `Found ${missingSemicolons.length} semicolons in CSS object (should be commas)`,
            suggestion: 'Use commas instead of semicolons in CSS-in-JS objects'
          });
        }
        
        this.checks++;
      } catch (error) {
        this.warnings.push({
          type: 'WARNING',
          rule: 'file-read-error',
          file: path.relative(process.cwd(), filePath),
          message: `Could not read file: ${error.message}`,
          suggestion: 'Ensure file exists and is readable'
        });
      }
    }
  }

  /**
   * Validate import paths
   */
  async validateImportPaths(tsFiles) {
    console.log(`${colors.yellow}📦 Validating import paths...${colors.reset}`);
    
    for (const filePath of tsFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(process.cwd(), filePath);
        
        // Check for relative imports
        const relativeImports = content.match(/import.*from\s+['"]\.\.?\//g);
        if (relativeImports) {
          this.warnings.push({
            type: 'WARNING',
            rule: 'absolute-imports',
            file: relativePath,
            message: `Found ${relativeImports.length} relative imports`,
            suggestion: 'Convert relative imports to @ alias imports',
            example: 'import { Button } from \'@/components/core/Button\';'
          });
        }
        
        this.checks++;
      } catch (error) {
        this.warnings.push({
          type: 'WARNING',
          rule: 'file-read-error',
          file: path.relative(process.cwd(), filePath),
          message: `Could not read file: ${error.message}`,
          suggestion: 'Ensure file exists and is readable'
        });
      }
    }
  }

  /**
   * Validate Storybook build
   */
  async validateStorybookBuild() {
    console.log(`${colors.yellow}🏗️  Validating Storybook build...${colors.reset}`);
    
    try {
      // Try to build Storybook
      execSync('npm run build:storybook', { 
        stdio: 'pipe',
        timeout: 60000 // 60 second timeout
      });
      
      console.log(`${colors.green}✅ Storybook build successful${colors.reset}`);
      this.checks++;
      
    } catch (error) {
      this.violations.push({
        type: 'CRITICAL',
        rule: 'storybook-build-failure',
        file: 'storybook-build',
        message: 'Storybook build failed - runtime errors detected',
        suggestion: 'Fix runtime errors in story files',
        example: 'Check for missing React imports, CSS-in-JS syntax errors'
      });
      
      console.log(`${colors.red}❌ Storybook build failed${colors.reset}`);
      console.log(`${colors.red}${error.message}${colors.reset}`);
    }
  }

  /**
   * Generate validation report
   */
  generateReport() {
    const duration = Date.now() - this.startTime;
    const totalIssues = this.violations.length + this.warnings.length;
    
    console.log(`\n${colors.cyan}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}📊 AI RUNTIME VALIDATION REPORT${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    
    // Summary
    console.log(`\n${colors.white}${colors.bright}📈 Summary:${colors.reset}`);
    console.log(`  ⏱️  Duration: ${duration}ms`);
    console.log(`  🔍 Checks: ${this.checks}`);
    console.log(`  ❌ Violations: ${this.violations.length}`);
    console.log(`  ⚠️  Warnings: ${this.warnings.length}`);
    console.log(`  📊 Total Issues: ${totalIssues}`);
    
    // Violations
    if (this.violations.length > 0) {
      console.log(`\n${colors.red}${colors.bright}❌ VIOLATIONS:${colors.reset}`);
      this.violations.forEach((violation, index) => {
        console.log(`\n${colors.red}${index + 1}. ${violation.rule}${colors.reset}`);
        console.log(`   📁 File: ${violation.file}`);
        console.log(`   💬 Message: ${violation.message}`);
        console.log(`   💡 Suggestion: ${violation.suggestion}`);
        if (violation.example) {
          console.log(`   📝 Example: ${violation.example}`);
        }
      });
    }
    
    // Warnings
    if (this.warnings.length > 0) {
      console.log(`\n${colors.yellow}${colors.bright}⚠️  WARNINGS:${colors.reset}`);
      this.warnings.forEach((warning, index) => {
        console.log(`\n${colors.yellow}${index + 1}. ${warning.rule}${colors.reset}`);
        console.log(`   📁 File: ${warning.file}`);
        console.log(`   💬 Message: ${warning.message}`);
        console.log(`   💡 Suggestion: ${warning.suggestion}`);
      });
    }
    
    // Overall status
    const overallStatus = this.violations.length === 0 ? 'PASSED' : 'FAILED';
    const statusColor = this.violations.length === 0 ? colors.green : colors.red;
    const statusEmoji = this.violations.length === 0 ? '✅' : '❌';
    
    console.log(`\n${colors.white}${colors.bright}🎯 Overall Status:${colors.reset}`);
    console.log(`${statusColor}${colors.bright}${statusEmoji} ${overallStatus}${colors.reset}`);
    
    console.log(`\n${colors.cyan}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    
    // Save report to file
    const reportPath = path.join(process.cwd(), '.ai-reports', `runtime-validation-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    const reportData = {
      timestamp: new Date().toISOString(),
      duration,
      checks: this.checks,
      violations: this.violations,
      warnings: this.warnings,
      status: overallStatus
    };
    
    // Ensure reports directory exists
    const reportsDir = path.dirname(reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\n📄 Detailed report saved: ${reportPath}`);
    
    // Exit with error code if violations found
    if (this.violations.length > 0) {
      process.exit(1);
    }
  }
}

// Run validation
const validator = new RuntimeValidator();
validator.validate().catch(error => {
  console.error(`${colors.red}❌ Runtime validation failed:${colors.reset}`, error);
  process.exit(1);
});