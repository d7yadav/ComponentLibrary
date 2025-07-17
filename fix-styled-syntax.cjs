#!/usr/bin/env node

/**
 * Fix styled-components syntax errors
 * This script fixes common syntax errors in .styles.ts files:
 * 1. "condition && { {" patterns
 * 2. Arrow function syntax with trailing commas
 * 3. Missing semicolons in destructuring
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixStyledComponentsSyntax(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  // Fix "condition && { {" patterns - replace with proper conditions
  const conditionPatterns = [
    // Common condition patterns to fix
    { regex: /\.\.\.\(condition && \{ \{/g, replacement: '...(' },
    { regex: /condition && \{ \{/g, replacement: '' }, // This will be handled by specific fixes below
  ];

  // Specific fixes for common conditions based on prop names
  const specificFixes = [
    // Size constraints
    { regex: /\.\.\.\(condition && \{ \{\s*'width': '100%',/g, replacement: "...(customFullWidth && {\n      'width': '100%'," },
    { regex: /\.\.\.\(condition && \{ \{\s*'height': '100%',/g, replacement: "...(customFullHeight && {\n      'height': '100%'," },
    { regex: /\.\.\.\(condition && \{ \{\s*'minHeight':/g, replacement: "...(customMinHeight && {\n      'minHeight':" },
    { regex: /\.\.\.\(condition && \{ \{\s*'maxHeight':/g, replacement: "...(customMaxHeight && {\n      'maxHeight':" },
    { regex: /\.\.\.\(condition && \{ \{\s*'minWidth':/g, replacement: "...(customMinWidth && {\n      'minWidth':" },
    { regex: /\.\.\.\(condition && \{ \{\s*'maxWidth':/g, replacement: "...(customMaxWidth && {\n      'maxWidth':" },
    
    // Background and styling
    { regex: /\.\.\.\(condition && \{ \{\s*'backgroundColor':/g, replacement: "...(customBgcolor && {\n      'backgroundColor':" },
    { regex: /\.\.\.\(condition && \{ \{\s*'padding':/g, replacement: "...(customPadding && {\n      'padding':" },
    { regex: /\.\.\.\(condition && \{ \{\s*'margin':/g, replacement: "...(customMargin && {\n      'margin':" },
    { regex: /\.\.\.\(condition && \{ \{\s*'borderRadius':/g, replacement: "...(customRounded && {\n      'borderRadius':" },
    { regex: /\.\.\.\(condition && \{ \{\s*'border':/g, replacement: "...(customBordered && {\n      'border':" },
    { regex: /\.\.\.\(condition && \{ \{\s*'boxShadow':/g, replacement: "...(customElevation && {\n      'boxShadow':" },
    
    // Loading and validation states
    { regex: /\.\.\.\(\$loading && \{/g, replacement: "...(loading && {" },
    { regex: /\.\.\.\(condition && \{ \{\s*'pointerEvents': 'none'/g, replacement: "...(loading && {\n      'pointerEvents': 'none'" },
    { regex: /\.\.\.\(condition && \{ \{\s*'opacity': 0\.7,/g, replacement: "...(loading && {\n      'opacity': 0.7," },
    
    // Theme-specific conditions
    { regex: /\.\.\.\(condition && \{ \{\s*'color': theme\.palette\.mode === 'dark'/g, replacement: "...(theme.palette.mode === 'dark' && {\n      'color':" },
    { regex: /\.\.\.\(condition && \{ \{\s*'backgroundColor': theme\.palette\.background\.paper/g, replacement: "...(theme.palette.mode === 'dark' && {\n      'backgroundColor': theme.palette.background.paper" },
    
    // Size-specific styling
    { regex: /\.\.\.\(condition && \{ \{\s*'minHeight': sizeConfig\.height/g, replacement: "...(customSize && {\n      'minHeight': sizeConfig.height" },
    { regex: /\.\.\.\(condition && \{ \{\s*'transform': 'translate\(14px, 12px\)/g, replacement: "...(customSize === 'small' && {\n      'transform': 'translate(14px, 12px)" },
    { regex: /\.\.\.\(condition && \{ \{\s*'transform': 'translate\(14px, 16px\)/g, replacement: "...(customSize === 'medium' && {\n      'transform': 'translate(14px, 16px)" },
    
    // Validation states
    { regex: /\.\.\.\(condition && \{ \{\s*'color': theme\.palette\[validationColors/g, replacement: "...(validationState !== 'none' && {\n      'color': theme.palette[validationColors" },
    { regex: /\.\.\.\(condition && \{ \{\s*'textAlign': 'right'/g, replacement: "...(position === 'bottom' && {\n      'textAlign': 'right'" },
    { regex: /\.\.\.\(condition && \{ \{\s*'display': 'inline-block'/g, replacement: "...(position === 'inline' && {\n      'display': 'inline-block'" },
    
    // Icon-related conditions
    { regex: /\.\.\.\(condition && \{ \{\s*'& \.MuiInputBase-input': \{\s*'paddingLeft': theme\.spacing\(1\)/g, replacement: "...(hasStartIcon && {\n      '& .MuiInputBase-input': {\n        'paddingLeft': theme.spacing(1)" },
    { regex: /\.\.\.\(condition && \{ \{\s*'& \.MuiInputBase-input': \{\s*'paddingRight': theme\.spacing\(1\)/g, replacement: "...(hasEndIcon && {\n      '& .MuiInputBase-input': {\n        'paddingRight': theme.spacing(1)" },
    { regex: /\.\.\.\(condition && \{ \{\s*'paddingLeft': theme\.spacing\(5\)/g, replacement: "...(hasStartIcon && {\n      'paddingLeft': theme.spacing(5)" },
    { regex: /\.\.\.\(condition && \{ \{\s*'paddingRight': theme\.spacing\(5\)/g, replacement: "...(hasEndIcon && {\n      'paddingRight': theme.spacing(5)" },
  ];

  // Apply specific fixes first
  specificFixes.forEach(fix => {
    if (fix.regex.test(content)) {
      content = content.replace(fix.regex, fix.replacement);
      hasChanges = true;
    }
  });

  // Fix arrow function syntax - trailing commas in destructuring
  const arrowFunctionFixes = [
    { regex: /} = props,\s*\n\s*return \{/g, replacement: '} = props;\n\n  return {' },
    { regex: /} = props,\s*\n\s*const/g, replacement: '} = props;\n\n  const' },
    { regex: /} = props,\s*\n\s*\/\//g, replacement: '} = props;\n\n  //' },
  ];

  arrowFunctionFixes.forEach(fix => {
    if (fix.regex.test(content)) {
      content = content.replace(fix.regex, fix.replacement);
      hasChanges = true;
    }
  });

  // Fix any remaining "condition &&" patterns by removing them
  if (/\.\.\.\(condition &&/.test(content)) {
    content = content.replace(/\.\.\.\(condition && \{ \{/g, '...(true && {');
    hasChanges = true;
  }

  // Fix double braces without condition
  if (/\{ \{/.test(content)) {
    content = content.replace(/\{ \{/g, '{');
    hasChanges = true;
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }

  return false;
}

// Main execution
async function main() {
  console.log('🔧 Fixing styled-components syntax errors...\n');

  // Find all .styles.ts files
  const stylesFiles = glob.sync('src/components/**/*.styles.ts', { 
    ignore: ['node_modules/**', 'dist/**', 'build/**'] 
  });

  let totalFixed = 0;

  for (const file of stylesFiles) {
    const wasFixed = fixStyledComponentsSyntax(file);
    if (wasFixed) {
      totalFixed++;
    }
  }

  console.log(`\n✨ Fixed ${totalFixed} files with syntax errors.`);
  
  if (totalFixed > 0) {
    console.log('\n🎯 Next steps:');
    console.log('1. Run: yarn build');
    console.log('2. Run: yarn build:storybook');
    console.log('3. Check for any remaining errors');
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