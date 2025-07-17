#!/usr/bin/env node

/**
 * Comprehensive styled-components syntax fixer
 * Fixes all known syntax issues in .styles.ts files
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixAllSyntaxIssues(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  console.log(`Checking: ${filePath}`);

  // Fix 1: $variable patterns
  const dollarVariableFixes = [
    { regex: /\.\.\.\(\$loading && \{/g, replacement: '...(loading && {' },
    { regex: /\.\.\.\(\$disabled && \{/g, replacement: '...(disabled && {' },
    { regex: /\.\.\.\(\$animated && \{/g, replacement: '...(customAnimated && {' },
    { regex: /\.\.\.\(\$focused && \{/g, replacement: '...(focused && {' },
    { regex: /\.\.\.\(\$error && \{/g, replacement: '...(error && {' },
    { regex: /\.\.\.\(\$success && \{/g, replacement: '...(success && {' },
    { regex: /\.\.\.\(\$warning && \{/g, replacement: '...(warning && {' },
  ];

  dollarVariableFixes.forEach(fix => {
    if (fix.regex.test(content)) {
      content = content.replace(fix.regex, fix.replacement);
      hasChanges = true;
    }
  });

  // Fix 2: Fix "...(true &&" patterns that should be more specific
  const trueConditionFixes = [
    { regex: /\.\.\.\(true && \{/g, replacement: '// Removed always true condition - ' },
  ];

  trueConditionFixes.forEach(fix => {
    if (fix.regex.test(content)) {
      content = content.replace(fix.regex, fix.replacement);
      hasChanges = true;
    }
  });

  // Fix 3: Arrow function syntax issues
  const arrowFunctionFixes = [
    // Fix trailing comma in arrow functions
    { regex: /}\s*=\s*props,\s*\n/g, replacement: '} = props;\n' },
    { regex: /}\s*=\s*props,\s*\n\s*return\s*\{/g, replacement: '} = props;\n\n  return {' },
    { regex: /}\s*=\s*props,\s*\n\s*\/\//g, replacement: '} = props;\n\n  //' },
    { regex: /}\s*=\s*props,\s*\n\s*const/g, replacement: '} = props;\n\n  const' },
  ];

  arrowFunctionFixes.forEach(fix => {
    if (fix.regex.test(content)) {
      content = content.replace(fix.regex, fix.replacement);
      hasChanges = true;
    }
  });

  // Fix 4: Invalid CSS property syntax
  const cssPropertyFixes = [
    // Fix hover state syntax
    { regex: /'\&:hover':\s*!\s*disabled\s*&&\s*\{/g, replacement: "'&:hover': {\n      ...(disabled ? {} : {" },
    { regex: /'\&:hover':\s*!disabled\s*&&\s*\{/g, replacement: "'&:hover': {\n      ...(disabled ? {} : {" },
  ];

  cssPropertyFixes.forEach(fix => {
    if (fix.regex.test(content)) {
      content = content.replace(fix.regex, fix.replacement);
      hasChanges = true;
    }
  });

  // Fix 5: Remove commented-out always true conditions
  content = content.replace(/\/\/ Removed always true condition - \s*\n/g, '');

  // Fix 6: Clean up invalid object syntax
  const objectSyntaxFixes = [
    // Fix incomplete spread operations
    { regex: /\.\.\.\(\s*&&\s*\{/g, replacement: '// Invalid condition removed' },
    { regex: /\.\.\.\(\s*\|\|\s*\{/g, replacement: '// Invalid condition removed' },
    { regex: /\.\.\.\(\s*\?\s*\{/g, replacement: '// Invalid condition removed' },
  ];

  objectSyntaxFixes.forEach(fix => {
    if (fix.regex.test(content)) {
      content = content.replace(fix.regex, fix.replacement);
      hasChanges = true;
    }
  });

  // Fix 7: Fix malformed hover states
  const hoverStateFixes = [
    { regex: /'&:hover':\s*!disabled\s*&&\s*\{([^}]+)\}/g, replacement: "'&:hover': {\n        ...(disabled ? {} : {\n$1\n        }),\n      }," },
  ];

  hoverStateFixes.forEach(fix => {
    if (fix.regex.test(content)) {
      content = content.replace(fix.regex, fix.replacement);
      hasChanges = true;
    }
  });

  // Fix 8: Clean up invalid comment lines
  content = content.replace(/\/\/ Invalid condition removed\s*\n/g, '');

  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } else {
    console.log(`✓ Clean: ${filePath}`);
    return false;
  }
}

// Find files that might have syntax errors based on common patterns
function findSyntaxErrors() {
  const stylesFiles = glob.sync('src/components/**/*.styles.ts', { 
    ignore: ['node_modules/**', 'dist/**', 'build/**'] 
  });

  const errorPatterns = [
    /\$\w+\s*&&/,
    /condition\s*&&/,
    /true\s*&&\s*\{/,
    /!\s*\w+\s*&&\s*\{/,
    /}\s*=\s*props,/,
    /'&:hover':\s*!\w+/,
  ];

  const problematicFiles = [];

  stylesFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const hasErrors = errorPatterns.some(pattern => pattern.test(content));
    
    if (hasErrors) {
      problematicFiles.push(file);
    }
  });

  return problematicFiles;
}

// Main execution
async function main() {
  console.log('🔧 Comprehensive styled-components syntax fixer...\n');

  // Find problematic files
  const problematicFiles = findSyntaxErrors();
  
  if (problematicFiles.length === 0) {
    console.log('✅ No syntax errors found in styled-components files!');
    return;
  }

  console.log(`Found ${problematicFiles.length} files with potential syntax errors:\n`);
  
  let totalFixed = 0;

  for (const file of problematicFiles) {
    const wasFixed = fixAllSyntaxIssues(file);
    if (wasFixed) {
      totalFixed++;
    }
  }

  console.log(`\n✨ Fixed ${totalFixed} files with syntax errors.`);
  
  if (totalFixed > 0) {
    console.log('\n🎯 Next steps:');
    console.log('1. Run: yarn build');
    console.log('2. Check for remaining errors');
    console.log('3. Manual fixes may be needed for complex cases');
  }
}

// Error handling
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main().catch(console.error);