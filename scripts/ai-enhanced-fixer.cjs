#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Colors for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

let fixes = {
  cssObjectSyntax: 0,
  absoluteImports: 0,
  reactImports: 0,
  errors: []
};

/**
 * Fix CSS-in-JS syntax issues in style files
 */
function fixCssObjectSyntax(content, filePath) {
  if (!filePath.endsWith('.styles.ts') && !filePath.endsWith('.styles.tsx')) {
    return content;
  }
  
  let newContent = content;
  let changesMade = false;
  
  // Fix semicolons in CSS objects (should be commas)
  const cssObjectPattern = /(['"]&?[^'"]*['"]\s*:\s*{[^}]*})/g;
  
  newContent = newContent.replace(cssObjectPattern, (match) => {
    if (match.includes(';')) {
      changesMade = true;
      fixes.cssObjectSyntax++;
      // Replace semicolons with commas, but keep the last one before }
      return match.replace(/;(\s*[^}])/g, ',$1').replace(/;(\s*})/, '$1');
    }
    return match;
  });
  
  // Fix unquoted CSS selectors
  const unquotedSelectorPattern = /(\s+)(&:[a-zA-Z-]+)\s*:/g;
  newContent = newContent.replace(unquotedSelectorPattern, (match, indent, selector) => {
    changesMade = true;
    fixes.cssObjectSyntax++;
    return `${indent}'${selector}':`;
  });
  
  return changesMade ? newContent : content;
}

/**
 * Fix relative imports to use @ alias
 */
function fixAbsoluteImports(content, filePath) {
  let newContent = content;
  let changesMade = false;
  
  // Get the directory of the current file relative to src
  const srcIndex = filePath.indexOf('/src/');
  if (srcIndex === -1) return content;
  
  const fileDir = path.dirname(filePath.substring(srcIndex + 5)); // Remove '/src/' prefix
  
  // Match all relative imports
  const importPattern = /^(import\s+(?:type\s+)?(?:{[^}]+}|\*\s+as\s+\w+|\w+)?\s*(?:,\s*(?:{[^}]+}|\w+))?\s*from\s+)['"](\.[^'"]+)['"]/gm;
  
  newContent = newContent.replace(importPattern, (match, importStart, relativePath) => {
    // Skip if it's already an absolute import
    if (!relativePath.startsWith('.')) return match;
    
    changesMade = true;
    fixes.absoluteImports++;
    
    // Resolve the absolute path
    const absolutePath = path.posix.join(fileDir, relativePath);
    const normalizedPath = path.posix.normalize(absolutePath);
    
    // Convert to @ alias
    const aliasPath = '@/' + normalizedPath;
    
    return `${importStart}'${aliasPath}'`;
  });
  
  // Also fix export statements
  const exportPattern = /^(export\s+(?:\*|\{[^}]+\})\s+from\s+)['"](\.[^'"]+)['"]/gm;
  
  newContent = newContent.replace(exportPattern, (match, exportStart, relativePath) => {
    if (!relativePath.startsWith('.')) return match;
    
    changesMade = true;
    fixes.absoluteImports++;
    
    const absolutePath = path.posix.join(fileDir, relativePath);
    const normalizedPath = path.posix.normalize(absolutePath);
    const aliasPath = '@/' + normalizedPath;
    
    return `${exportStart}'${aliasPath}'`;
  });
  
  return changesMade ? newContent : content;
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Apply fixes in order
    content = fixCssObjectSyntax(content, filePath);
    content = fixAbsoluteImports(content, filePath);
    
    // Write back if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`${colors.green}✓${colors.reset} Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`${colors.red}✗${colors.reset} Error processing ${filePath}:`, error.message);
    fixes.errors.push({ file: filePath, error: error.message });
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log(`${colors.cyan}${colors.bright}🔧 AI Enhanced Fixer${colors.reset}`);
  console.log(`${colors.blue}Fixing CSS syntax and import paths...${colors.reset}\n`);
  
  const startTime = Date.now();
  
  // Find all TypeScript files
  const files = glob.sync('src/**/*.{ts,tsx}', {
    ignore: ['**/node_modules/**', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}']
  });
  
  console.log(`${colors.blue}Found ${files.length} files to check${colors.reset}`);
  
  let fixedFiles = 0;
  
  // Process each file
  for (const file of files) {
    if (processFile(file)) {
      fixedFiles++;
    }
  }
  
  const duration = Date.now() - startTime;
  
  // Generate report
  console.log(`\n${colors.cyan}${colors.bright}${'━'.repeat(60)}${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}📊 ENHANCED FIXER REPORT${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}${'━'.repeat(60)}${colors.reset}\n`);
  
  console.log(`${colors.white}${colors.bright}📈 Summary:${colors.reset}`);
  console.log(`  ⏱️  Duration: ${duration}ms`);
  console.log(`  📁 Files Processed: ${files.length}`);
  console.log(`  🔧 Files Fixed: ${fixedFiles}`);
  console.log(`  ❌ Errors: ${fixes.errors.length}\n`);
  
  console.log(`${colors.white}${colors.bright}🔧 Fixes Applied:${colors.reset}`);
  console.log(`  🎨 CSS Object Syntax: ${fixes.cssObjectSyntax}`);
  console.log(`  📦 Absolute Imports: ${fixes.absoluteImports}`);
  console.log(`  ⚛️  React Imports: ${fixes.reactImports}\n`);
  
  if (fixes.errors.length > 0) {
    console.log(`${colors.red}${colors.bright}❌ ERRORS:${colors.reset}`);
    fixes.errors.forEach((err, index) => {
      console.log(`\n${colors.red}${index + 1}. ${err.file}${colors.reset}`);
      console.log(`   💬 ${err.error}`);
    });
  }
  
  const totalFixes = fixes.cssObjectSyntax + fixes.absoluteImports + fixes.reactImports;
  const status = fixes.errors.length === 0 ? 
    `${colors.green}${colors.bright}✅ SUCCESS${colors.reset}` : 
    `${colors.yellow}${colors.bright}⚠️  COMPLETED WITH ERRORS${colors.reset}`;
  
  console.log(`\n${colors.white}${colors.bright}🎯 Overall Status:${colors.reset}`);
  console.log(status);
  
  console.log(`\n${colors.cyan}${colors.bright}${'━'.repeat(60)}${colors.reset}\n`);
  
  // Save detailed report
  const reportPath = path.join('.ai-reports', `enhanced-fixes-${new Date().toISOString().replace(/:/g, '-')}.json`);
  const report = {
    timestamp: new Date().toISOString(),
    duration,
    filesProcessed: files.length,
    filesFixed: fixedFiles,
    fixes,
    totalFixes,
    errors: fixes.errors
  };
  
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`📄 Detailed report saved: ${reportPath}\n`);
  
  console.log(`${colors.yellow}💡 Next Steps:${colors.reset}`);
  console.log(`  1. Run: ${colors.cyan}npm run ai:validate:runtime${colors.reset} to verify fixes`);
  console.log(`  2. Run: ${colors.cyan}npm run build:storybook${colors.reset} to test Storybook build`);
  console.log(`  3. Run: ${colors.cyan}npm run storybook${colors.reset} to test stories manually\n`);
  
  process.exit(fixes.errors.length > 0 ? 1 : 0);
}

// Run the script
main().catch(error => {
  console.error(`${colors.red}${colors.bright}Fatal error:${colors.reset}`, error);
  process.exit(1);
});