#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Fixing import statement syntax errors...\n');

let fixedCount = 0;
let errorCount = 0;

// Find all TypeScript files
const files = glob.sync('src/**/*.{ts,tsx}', {
  ignore: ['**/node_modules/**']
});

console.log(`Found ${files.length} TypeScript files to check\n`);

files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Fix pattern: import statements ending with comma instead of semicolon
    // This regex matches import statements that end with a comma followed by another import
    content = content.replace(
      /^(import\s+(?:type\s+)?(?:\*\s+as\s+\w+|{[^}]+}|\w+)\s+from\s+['"][^'"]+['"]),\s*\n(import\s)/gm,
      '$1;\n$2'
    );
    
    // Also fix any standalone import statements ending with comma
    content = content.replace(
      /^(import\s+(?:type\s+)?(?:\*\s+as\s+\w+|{[^}]+}|\w+)\s+from\s+['"][^'"]+['"]),\s*$/gm,
      '$1;'
    );
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
      fixedCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    errorCount++;
  }
});

console.log(`\n✨ Summary:`);
console.log(`  - Fixed ${fixedCount} files`);
console.log(`  - Errors: ${errorCount}`);
console.log('\n💡 Run "npm run build:storybook" to verify the fix');