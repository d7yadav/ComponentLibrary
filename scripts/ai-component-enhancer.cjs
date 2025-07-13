#!/usr/bin/env node

/**
 * @fileoverview AI Component Enhancement Workflow
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * This script uses our AI workflow engines to automatically enhance existing
 * components based on validation feedback, implementing best practices and
 * fixing common issues identified by the AI validator.
 */

const fs = require('fs').promises;
const path = require('path');
const { AICodeValidator } = require('./ai-code-validator-enhanced.cjs');

/**
 * AI Component Enhancement Engine
 */
class AIComponentEnhancer {
  constructor() {
    this.validator = new AICodeValidator();
    this.enhancementPatterns = new Map();
    this.enhancedFiles = [];
    this.initializeEnhancementPatterns();
  }

  /**
   * Initialize enhancement patterns based on common issues
   */
  initializeEnhancementPatterns() {
    // JSDoc enhancement
    this.enhancementPatterns.set('jsdoc-missing', {
      name: 'Add JSDoc Comments',
      priority: 'high',
      enhancer: this.addJSDocComments.bind(this),
      automated: true,
    });

    // Data-testid enhancement
    this.enhancementPatterns.set('testid-missing', {
      name: 'Add data-testid attributes',
      priority: 'high',
      enhancer: this.addTestIds.bind(this),
      automated: true,
    });

    // React.memo enhancement
    this.enhancementPatterns.set('memo-suggestion', {
      name: 'Add React.memo optimization',
      priority: 'medium',
      enhancer: this.addReactMemo.bind(this),
      automated: true,
    });

    // Default export fix
    this.enhancementPatterns.set('default-export', {
      name: 'Convert to named exports',
      priority: 'high',
      enhancer: this.convertToNamedExports.bind(this),
      automated: true,
    });

    // Inline objects extraction
    this.enhancementPatterns.set('inline-objects', {
      name: 'Extract inline objects',
      priority: 'medium',
      enhancer: this.extractInlineObjects.bind(this),
      automated: false, // Complex transformation
    });
  }

  /**
   * Enhance components based on validation results
   */
  async enhanceComponents(componentPath) {
    try {
      console.log('🤖 AI Component Enhancement Starting...');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      // First, validate to get current issues
      const validationResults = await this.validateComponent(componentPath);
      
      if (!validationResults || validationResults.length === 0) {
        console.log('✅ No components found to enhance');
        return;
      }

      // Group issues by enhancement pattern
      const enhancementPlan = this.createEnhancementPlan(validationResults);
      
      // Execute enhancements
      await this.executeEnhancementPlan(enhancementPlan);
      
      // Re-validate to show improvements
      await this.showImprovements(componentPath);
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✨ AI Component Enhancement Complete!');
      
    } catch (error) {
      console.error('❌ Enhancement failed:', error.message);
      throw error;
    }
  }

  /**
   * Validate component to get issues
   */
  async validateComponent(componentPath) {
    // Create a temporary validator instance
    const validator = new AICodeValidator();
    await validator.validateProject(componentPath);
    
    return validator.results.filter(result => 
      result.issues.length > 0 && 
      (result.path.endsWith('.tsx') || result.path.endsWith('.ts'))
    );
  }

  /**
   * Create enhancement plan based on validation results
   */
  createEnhancementPlan(validationResults) {
    const plan = new Map();
    
    for (const result of validationResults) {
      const filePlan = {
        filePath: result.path,
        fullPath: path.resolve(process.cwd(), result.path),
        currentScore: result.score,
        enhancements: [],
        estimatedScoreImprovement: 0,
      };
      
      for (const issue of result.issues) {
        const pattern = this.enhancementPatterns.get(issue.type);
        if (pattern && pattern.automated) {
          filePlan.enhancements.push({
            type: issue.type,
            pattern: pattern,
            issue: issue,
            line: issue.line,
          });
          
          // Estimate score improvement
          switch (issue.severity) {
            case 'error': filePlan.estimatedScoreImprovement += 10; break;
            case 'warning': filePlan.estimatedScoreImprovement += 5; break;
            case 'suggestion': filePlan.estimatedScoreImprovement += 2; break;
          }
        }
      }
      
      if (filePlan.enhancements.length > 0) {
        plan.set(result.path, filePlan);
      }
    }
    
    return plan;
  }

  /**
   * Execute the enhancement plan
   */
  async executeEnhancementPlan(enhancementPlan) {
    console.log(`\n📋 Enhancement Plan (${enhancementPlan.size} files):`);
    
    for (const [filePath, plan] of enhancementPlan) {
      console.log(`\n🔧 Enhancing: ${filePath}`);
      console.log(`   Current Score: ${plan.currentScore}/100`);
      console.log(`   Planned Improvements: +${plan.estimatedScoreImprovement} points`);
      
      try {
        let content = await fs.readFile(plan.fullPath, 'utf8');
        let modified = false;
        
        // Apply enhancements in order of priority
        const sortedEnhancements = plan.enhancements.sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.pattern.priority] - priorityOrder[a.pattern.priority];
        });
        
        for (const enhancement of sortedEnhancements) {
          console.log(`     ✨ ${enhancement.pattern.name}...`);
          
          const result = await enhancement.pattern.enhancer(content, plan.fullPath, enhancement.issue);
          if (result.modified) {
            content = result.content;
            modified = true;
            console.log(`     ✅ ${enhancement.pattern.name} applied`);
          } else {
            console.log(`     ⚠️ ${enhancement.pattern.name} skipped: ${result.reason || 'No changes needed'}`);
          }
        }
        
        // Write enhanced content back to file
        if (modified) {
          await fs.writeFile(plan.fullPath, content);
          this.enhancedFiles.push({
            path: filePath,
            improvements: plan.enhancements.length,
            estimatedImprovement: plan.estimatedScoreImprovement,
          });
          console.log(`   ✅ File enhanced successfully`);
        } else {
          console.log(`   ℹ️ No modifications needed`);
        }
        
      } catch (error) {
        console.error(`   ❌ Enhancement failed: ${error.message}`);
      }
    }
  }

  /**
   * Show improvements after enhancement
   */
  async showImprovements(componentPath) {
    if (this.enhancedFiles.length === 0) {
      return;
    }
    
    console.log('\n📊 Enhancement Results:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Re-validate to get new scores
    const newValidationResults = await this.validateComponent(componentPath);
    const newScores = new Map();
    
    for (const result of newValidationResults) {
      newScores.set(result.path, result.score);
    }
    
    for (const enhanced of this.enhancedFiles) {
      const newScore = newScores.get(enhanced.path) || 100;
      console.log(`📈 ${enhanced.path}: +${enhanced.improvements} improvements`);
    }
    
    const totalImprovements = this.enhancedFiles.reduce((sum, f) => sum + f.improvements, 0);
    console.log(`\n✨ Total: ${totalImprovements} enhancements applied to ${this.enhancedFiles.length} files`);
  }

  /**
   * Enhancement pattern implementations
   */

  /**
   * Add JSDoc comments to exported functions/components
   */
  async addJSDocComments(content, filePath, issue) {
    try {
      const lines = content.split('\n');
      let modified = false;
      
      // Find export statements that need JSDoc
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check for component exports
        if (line.match(/^export\s+(const|function|class)\s+\w+/) && 
            i > 0 && !lines[i-1].trim().startsWith('/**')) {
          
          const componentName = line.match(/\b(\w+)\s*[=:]/)?.[1] || 
                               line.match(/function\s+(\w+)/)?.[1] ||
                               line.match(/class\s+(\w+)/)?.[1];
          
          if (componentName) {
            const jsdoc = this.generateJSDoc(componentName, line);
            lines.splice(i, 0, jsdoc);
            modified = true;
            i++; // Skip the line we just added
          }
        }
      }
      
      return {
        modified,
        content: lines.join('\n'),
        reason: modified ? null : 'No suitable export statements found',
      };
    } catch (error) {
      return { modified: false, content, reason: error.message };
    }
  }

  /**
   * Add data-testid attributes to components
   */
  async addTestIds(content, filePath, issue) {
    try {
      let modified = false;
      
      // Find component return statements with JSX
      const componentMatch = content.match(/return\s*\(\s*<(\w+)/);
      if (componentMatch) {
        const componentName = path.basename(filePath, '.tsx');
        const testId = componentName.toLowerCase();
        
        // Add data-testid to the root element
        const rootElementPattern = new RegExp(`(<${componentMatch[1]}[^>]*?)(?!.*data-testid)`, 'g');
        const newContent = content.replace(rootElementPattern, (match) => {
          if (!match.includes('data-testid')) {
            return match + ` data-testid="${testId}"`;
          }
          return match;
        });
        
        modified = newContent !== content;
        
        return {
          modified,
          content: newContent,
          reason: modified ? null : 'data-testid already exists or no suitable element found',
        };
      }
      
      return { modified: false, content, reason: 'No JSX return statement found' };
    } catch (error) {
      return { modified: false, content, reason: error.message };
    }
  }

  /**
   * Add React.memo optimization
   */
  async addReactMemo(content, filePath, issue) {
    try {
      // Check if React.memo is already used
      if (content.includes('React.memo') || content.includes('memo(')) {
        return { modified: false, content, reason: 'React.memo already applied' };
      }
      
      // Check if it's a component file
      if (!filePath.endsWith('.tsx') || filePath.includes('.stories.')) {
        return { modified: false, content, reason: 'Not a component file' };
      }
      
      let modified = false;
      let newContent = content;
      
      // Add React import if not present
      if (!content.includes('import React') && !content.includes('import { memo }')) {
        if (content.includes('import {')) {
          // Add memo to existing React import
          newContent = newContent.replace(
            /import\s*{\s*([^}]+)\s*}\s*from\s*['"]react['"]/,
            (match, imports) => {
              if (!imports.includes('memo')) {
                return `import { ${imports.trim()}, memo } from 'react'`;
              }
              return match;
            }
          );
        } else {
          // Add new React import
          newContent = `import { memo } from 'react';\n${newContent}`;
        }
        modified = true;
      }
      
      // Wrap component export with memo
      const exportPattern = /export\s*{\s*(\w+)\s*}/;
      const exportMatch = newContent.match(exportPattern);
      
      if (exportMatch) {
        const componentName = exportMatch[1];
        const memoComponentName = `Memoized${componentName}`;
        
        // Add memo wrapper before export
        const memoWrapper = `\nconst ${memoComponentName} = memo(${componentName});\n${memoComponentName}.displayName = '${componentName}';\n`;
        newContent = newContent.replace(exportPattern, `${memoWrapper}\nexport { ${memoComponentName} as ${componentName} }`);
        modified = true;
      }
      
      return {
        modified,
        content: newContent,
        reason: modified ? null : 'Could not identify component to wrap with memo',
      };
    } catch (error) {
      return { modified: false, content, reason: error.message };
    }
  }

  /**
   * Convert default exports to named exports
   */
  async convertToNamedExports(content, filePath, issue) {
    try {
      // Skip story files - Storybook requires default exports for meta
      if (filePath.includes('.stories.')) {
        return { modified: false, content, reason: 'Skipping story files - Storybook requires default exports' };
      }
      
      if (!content.includes('export default')) {
        return { modified: false, content, reason: 'No default exports found' };
      }
      
      let modified = false;
      let newContent = content;
      
      // Find default export
      const defaultExportMatch = newContent.match(/export\s+default\s+(\w+)/);
      if (defaultExportMatch) {
        const componentName = defaultExportMatch[1];
        
        // Replace with named export
        newContent = newContent.replace(/export\s+default\s+\w+/, `export { ${componentName} }`);
        modified = true;
      }
      
      return {
        modified,
        content: newContent,
        reason: modified ? null : 'Could not convert default export',
      };
    } catch (error) {
      return { modified: false, content, reason: error.message };
    }
  }

  /**
   * Extract inline objects (placeholder - complex transformation)
   */
  async extractInlineObjects(content, filePath, issue) {
    // This would require more sophisticated AST manipulation
    // For now, just provide guidance
    return {
      modified: false,
      content,
      reason: 'Complex transformation - requires manual refactoring',
    };
  }

  /**
   * Generate appropriate JSDoc comment
   */
  generateJSDoc(componentName, exportLine) {
    const isComponent = exportLine.includes('tsx') || 
                       exportLine.match(/[A-Z]/); // Capitalized name suggests component
    
    if (isComponent) {
      return `/**
 * ${componentName} component
 * 
 * @returns JSX element
 */`;
    } else {
      return `/**
 * ${componentName}
 * 
 * @description TODO: Add description
 */`;
    }
  }
}

/**
 * CLI Interface
 */
async function main() {
  const enhancer = new AIComponentEnhancer();
  
  const componentPath = process.argv[2] || 'src/components';
  
  try {
    await enhancer.enhanceComponents(componentPath);
  } catch (error) {
    console.error('💥 Enhancement failed:', error.message);
    process.exit(1);
  }
}

// Export for use in other scripts
module.exports = { AIComponentEnhancer };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}