#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Fixing styled component syntax errors...\n');

let fixedCount = 0;
let errorCount = 0;

// Find all .styles.ts files
const files = glob.sync('src/**/*.styles.ts', {
  ignore: ['**/node_modules/**']
});

console.log(`Found ${files.length} style files to check\n`);

files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Fix pattern: destructuring assignment ending with comma before return statement
    content = content.replace(
      /(\}\s*=\s*props),(\s*\n\s*return\s*{)/g,
      '$1;$2'
    );
    
    // Fix pattern: destructuring with theme ending with comma
    content = content.replace(
      /(\}\s*=\s*props),(\s*\n\s*const)/g,
      '$1;$2'
    );
    
    // Fix pattern: any variable declaration ending with comma before return
    content = content.replace(
      /([^,{]\s*),(\s*\n\s*return\s*{)/g,
      '$1;$2'
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