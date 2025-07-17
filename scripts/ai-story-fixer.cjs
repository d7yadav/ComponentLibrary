#!/usr/bin/env node

/**
 * @fileoverview AI Story Fixer - Automatically fixes story file issues
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * This script automatically fixes common story file issues:
 * - Missing React imports in story files with JSX
 * - Relative imports that should use @ alias
 * - CSS-in-JS syntax errors
 * - Malformed arrow functions
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

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

class StoryFixer {
  constructor() {
    this.fixes = [];
    this.errors = [];
    this.startTime = Date.now();
  }

  /**
   * Main fix entry point
   */
  async fix() {
    console.log(`${colors.cyan}${colors.bright}🔧 AI Story Fixer${colors.reset}`);
    console.log(`${colors.blue}Automatically fixing story file issues...${colors.reset}\n`);

    // Find all story files
    const storyFiles = glob.sync('src/**/*.stories.tsx', { absolute: true });
    console.log(`${colors.blue}Found ${storyFiles.length} story files${colors.reset}`);

    // Fix story files
    await this.fixStoryFiles(storyFiles);

    // Fix CSS-in-JS syntax
    const styleFiles = glob.sync('src/**/*.styles.ts', { absolute: true });
    await this.fixCSSInJS(styleFiles);

    // Generate report
    this.generateReport();
  }

  /**
   * Fix React imports and other issues in story files
   */
  async fixStoryFiles(storyFiles) {
    console.log(`${colors.yellow}📚 Fixing story files...${colors.reset}`);
    
    for (const filePath of storyFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(process.cwd(), filePath);
        let modified = false;
        let newContent = content;

        // Check for JSX usage
        const hasJSX = /<[A-Z]/.test(content);
        const hasReactImport = /import\s+React/.test(content);
        
        if (hasJSX && !hasReactImport) {
          // Fix missing React import
          const reactImportMatch = content.match(/import\s+.*from\s+['"]react['"];?/);
          if (reactImportMatch) {
            // Update existing React import
            const existingImport = reactImportMatch[0];
            const newImport = existingImport.replace(
              /import\s+{([^}]+)}\s+from\s+['"]react['"];?/,
              'import React, { $1 } from \'react\';'
            );
            newContent = newContent.replace(existingImport, newImport);
          } else {
            // Add React import at the top
            const importSection = newContent.match(/^(import.*\n)*/m);
            if (importSection) {
              const lastImportIndex = importSection[0].length;
              newContent = newContent.slice(0, lastImportIndex) + 
                          'import React from \'react\';\n' + 
                          newContent.slice(lastImportIndex);
            } else {
              newContent = 'import React from \'react\';\n' + newContent;
            }
          }
          modified = true;
          
          this.fixes.push({
            type: 'REACT_IMPORT',
            file: relativePath,
            description: 'Added missing React import for JSX usage'
          });
        }

        // Fix relative imports
        const relativeImportPattern = /import\s+([^;]+)\s+from\s+['"](\.\.[^'"]+)['"];?/g;
        let match;
        while ((match = relativeImportPattern.exec(content)) !== null) {
          const [fullMatch, importContent, relativePath] = match;
          const absolutePath = this.convertToAbsolutePath(relativePath, filePath);
          
          if (absolutePath) {
            const newImport = `import ${importContent} from '${absolutePath}';`;
            newContent = newContent.replace(fullMatch, newImport);
            modified = true;
            
            this.fixes.push({
              type: 'IMPORT_PATH',
              file: path.relative(process.cwd(), filePath),
              description: `Converted relative import: ${relativePath} → ${absolutePath}`
            });
          }
        }

        // Fix arrow function syntax
        const malformedArrowPattern = /=>\s*return\s+([^;]+);?/g;
        const arrowMatches = newContent.match(malformedArrowPattern);
        if (arrowMatches) {
          for (const match of arrowMatches) {
            const fixed = match.replace(/=>\s*return\s+([^;]+);?/, '=> {\n  return $1;\n}');
            newContent = newContent.replace(match, fixed);
            modified = true;
            
            this.fixes.push({
              type: 'ARROW_FUNCTION',
              file: path.relative(process.cwd(), filePath),
              description: 'Fixed malformed arrow function syntax'
            });
          }
        }

        // Write changes if modified
        if (modified) {
          fs.writeFileSync(filePath, newContent, 'utf-8');
          console.log(`${colors.green}✅ Fixed: ${path.relative(process.cwd(), filePath)}${colors.reset}`);
        }
        
      } catch (error) {
        this.errors.push({
          file: path.relative(process.cwd(), filePath),
          error: error.message
        });
        console.log(`${colors.red}❌ Error fixing ${path.relative(process.cwd(), filePath)}: ${error.message}${colors.reset}`);
      }
    }
  }

  /**
   * Fix CSS-in-JS syntax issues
   */
  async fixCSSInJS(styleFiles) {
    console.log(`${colors.yellow}🎨 Fixing CSS-in-JS syntax...${colors.reset}`);
    
    for (const filePath of styleFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(process.cwd(), filePath);
        let modified = false;
        let newContent = content;

        // Fix unquoted CSS selectors
        const unquotedSelectorPattern = /([^'"]\s*)(&:[a-zA-Z-]+)\s*{/g;
        const matches = [...content.matchAll(unquotedSelectorPattern)];
        
        for (const match of matches) {
          const [fullMatch, prefix, selector] = match;
          const quotedSelector = `${prefix}'${selector}': {`;
          newContent = newContent.replace(fullMatch, quotedSelector);
          modified = true;
        }

        // Fix semicolons in CSS objects (should be commas)
        const semicolonPattern = /([a-zA-Z0-9)'"]\s*);(\s*\n)/g;
        const semicolonMatches = [...content.matchAll(semicolonPattern)];
        
        for (const match of semicolonMatches) {
          const [fullMatch, beforeSemi, afterSemi] = match;
          const withComma = `${beforeSemi},${afterSemi}`;
          newContent = newContent.replace(fullMatch, withComma);
          modified = true;
        }

        if (modified) {
          fs.writeFileSync(filePath, newContent, 'utf-8');
          console.log(`${colors.green}✅ Fixed CSS-in-JS: ${relativePath}${colors.reset}`);
          
          this.fixes.push({
            type: 'CSS_IN_JS',
            file: relativePath,
            description: 'Fixed CSS-in-JS syntax (quoted selectors, commas)'
          });
        }
        
      } catch (error) {
        this.errors.push({
          file: path.relative(process.cwd(), filePath),
          error: error.message
        });
        console.log(`${colors.red}❌ Error fixing ${path.relative(process.cwd(), filePath)}: ${error.message}${colors.reset}`);
      }
    }
  }

  /**
   * Convert relative path to absolute @ alias path
   */
  convertToAbsolutePath(relativePath, currentFilePath) {
    const currentDir = path.dirname(currentFilePath);
    const resolved = path.resolve(currentDir, relativePath);
    const srcPath = path.resolve(process.cwd(), 'src');
    
    if (resolved.startsWith(srcPath)) {
      const relativeToSrc = path.relative(srcPath, resolved);
      return `@/${relativeToSrc}`;
    }
    
    return null;
  }

  /**
   * Generate fix report
   */
  generateReport() {
    const duration = Date.now() - this.startTime;
    const fixesByType = this.fixes.reduce((acc, fix) => {
      acc[fix.type] = (acc[fix.type] || 0) + 1;
      return acc;
    }, {});

    console.log(`\n${colors.cyan}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}📊 AI STORY FIXER REPORT${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    
    // Summary
    console.log(`\n${colors.white}${colors.bright}📈 Summary:${colors.reset}`);
    console.log(`  ⏱️  Duration: ${duration}ms`);
    console.log(`  🔧 Total Fixes: ${this.fixes.length}`);
    console.log(`  ❌ Errors: ${this.errors.length}`);
    
    // Fixes by type
    console.log(`\n${colors.white}${colors.bright}🔧 Fixes by Type:${colors.reset}`);
    Object.entries(fixesByType).forEach(([type, count]) => {
      const emoji = {
        REACT_IMPORT: '⚛️',
        IMPORT_PATH: '📦',
        ARROW_FUNCTION: '🏹',
        CSS_IN_JS: '🎨'
      }[type] || '🔧';
      console.log(`  ${emoji} ${type}: ${count}`);
    });
    
    // Detailed fixes
    if (this.fixes.length > 0) {
      console.log(`\n${colors.green}${colors.bright}✅ FIXES APPLIED:${colors.reset}`);
      this.fixes.forEach((fix, index) => {
        console.log(`\n${colors.green}${index + 1}. ${fix.type}${colors.reset}`);
        console.log(`   📁 File: ${fix.file}`);
        console.log(`   💬 Description: ${fix.description}`);
      });
    }
    
    // Errors
    if (this.errors.length > 0) {
      console.log(`\n${colors.red}${colors.bright}❌ ERRORS:${colors.reset}`);
      this.errors.forEach((error, index) => {
        console.log(`\n${colors.red}${index + 1}. ${error.file}${colors.reset}`);
        console.log(`   💬 Error: ${error.error}`);
      });
    }
    
    // Overall status
    const overallStatus = this.errors.length === 0 ? 'SUCCESS' : 'PARTIAL_SUCCESS';
    const statusColor = this.errors.length === 0 ? colors.green : colors.yellow;
    const statusEmoji = this.errors.length === 0 ? '✅' : '⚠️';
    
    console.log(`\n${colors.white}${colors.bright}🎯 Overall Status:${colors.reset}`);
    console.log(`${statusColor}${colors.bright}${statusEmoji} ${overallStatus}${colors.reset}`);
    
    console.log(`\n${colors.cyan}${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    
    // Save report to file
    const reportPath = path.join(process.cwd(), '.ai-reports', `story-fixes-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    const reportData = {
      timestamp: new Date().toISOString(),
      duration,
      fixes: this.fixes,
      errors: this.errors,
      status: overallStatus
    };
    
    // Ensure reports directory exists
    const reportsDir = path.dirname(reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\n📄 Detailed report saved: ${reportPath}`);
    
    // Recommendations
    console.log(`\n${colors.yellow}💡 Next Steps:${colors.reset}`);
    console.log(`  1. Run: ${colors.cyan}npm run ai:validate:runtime${colors.reset} to verify fixes`);
    console.log(`  2. Run: ${colors.cyan}npm run build:storybook${colors.reset} to test Storybook build`);
    console.log(`  3. Run: ${colors.cyan}npm run storybook${colors.reset} to test stories manually`);
    
    if (this.fixes.length > 0) {
      console.log(`\n${colors.green}🎉 ${this.fixes.length} issues have been automatically fixed!${colors.reset}`);
    }
  }
}

// Run fixer
const fixer = new StoryFixer();
fixer.fix().catch(error => {
  console.error(`${colors.red}❌ Story fixing failed:${colors.reset}`, error);
  process.exit(1);
});