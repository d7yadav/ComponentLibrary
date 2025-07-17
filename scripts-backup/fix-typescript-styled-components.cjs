#!/usr/bin/env node

/**
 * Fix TypeScript TS2742 errors in styled components
 * Adds explicit type annotations to resolve styled component inference issues
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

console.log('🔧 Fixing TypeScript TS2742 errors in styled components...\n');

// Get all .styles.ts files
const pattern = 'src/**/*.styles.ts';
const files = glob.sync(pattern, { cwd: process.cwd() });

console.log(`📁 Found ${files.length} style files to process:`);
files.forEach(file => console.log(`   • ${file}`));
console.log('');

let totalFixed = 0;

files.forEach(filePath => {
  const fullPath = path.resolve(filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Pattern to match styled component exports that need type annotation
  // Looking for: export const ComponentName = styled(
  const styledExportPattern = /export const (\w+) = styled\(/g;
  
  // Find all styled exports in the file
  const matches = [...content.matchAll(styledExportPattern)];
  
  if (matches.length === 0) {
    console.log(`⏭️ ${filePath}: No styled exports found`);
    return;
  }
  
  let updatedContent = content;
  let fixedInFile = 0;
  
  matches.forEach(match => {
    const componentName = match[1];
    
    // Look for the pattern: export const ComponentName = styled(...)
    // We want to add : React.ComponentType<any> after the component name
    const exportPattern = new RegExp(
      `(export const ${componentName}) = styled\\(`,
      'g'
    );
    
    // Check if it already has a type annotation
    const hasTypeAnnotation = new RegExp(
      `export const ${componentName}\\s*:\\s*\\w+`,
      'g'
    ).test(updatedContent);
    
    if (!hasTypeAnnotation) {
      updatedContent = updatedContent.replace(
        exportPattern,
        `$1: React.ComponentType<any> = styled(`
      );
      fixedInFile++;
      console.log(`   ✅ Fixed ${componentName} in ${filePath}`);
    } else {
      console.log(`   ⏭️ ${componentName} already has type annotation`);
    }
  });
  
  // Add React import if we made fixes and React isn't already imported
  if (fixedInFile > 0) {
    // Check if React is already imported
    const hasReactImport = /import.*React.*from ['"]react['"]/.test(updatedContent);
    
    if (!hasReactImport) {
      // Add React import at the top
      const importIndex = updatedContent.indexOf('import');
      if (importIndex !== -1) {
        updatedContent = updatedContent.slice(0, importIndex) + 
          "import React from 'react';\n" + 
          updatedContent.slice(importIndex);
        console.log(`   📦 Added React import to ${filePath}`);
      }
    }
    
    // Write the updated content
    fs.writeFileSync(fullPath, updatedContent, 'utf8');
    totalFixed += fixedInFile;
    console.log(`✅ ${filePath}: Fixed ${fixedInFile} styled components\n`);
  } else {
    console.log(`⏭️ ${filePath}: No fixes needed\n`);
  }
});

console.log(`🎉 Fixed ${totalFixed} styled component type annotations across ${files.length} files!`);

// Also check for common exactOptionalPropertyTypes issues
console.log('\n🔍 Checking for exactOptionalPropertyTypes issues...');

// This would require more complex AST parsing, so for now just report
const buildResult = require('child_process').execSync('yarn build', { 
  encoding: 'utf8',
  stdio: 'pipe',
  cwd: process.cwd()
}).toString();

const remainingTS2742 = (buildResult.match(/TS2742/g) || []).length;
const exactOptionalErrors = (buildResult.match(/exactOptionalPropertyTypes/g) || []).length;

console.log(`📊 Remaining Issues:`);
console.log(`   • TS2742 errors: ${remainingTS2742}`);
console.log(`   • exactOptionalPropertyTypes errors: ${exactOptionalErrors}`);

if (remainingTS2742 === 0 && exactOptionalErrors === 0) {
  console.log('\n🎉 All TypeScript compilation errors fixed!');
} else {
  console.log('\n⚠️ Some TypeScript errors remain. Manual review may be needed.');
}