#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Fixing all syntax errors comprehensively...\n');

let totalFixed = 0;
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
    let fixedCount = 0;
    
    // Fix 1: Import statements ending with comma instead of semicolon
    content = content.replace(
      /^(import\s+(?:type\s+)?(?:\*\s+as\s+\w+|{[^}]+}|\w+)\s+from\s+['"][^'"]+['"]),\s*$/gm,
      (match) => {
        fixedCount++;
        return match.slice(0, -1) + ';';
      }
    );
    
    // Fix 2: Consecutive imports where first ends with comma
    content = content.replace(
      /^(import\s+(?:type\s+)?(?:\*\s+as\s+\w+|{[^}]+}|\w+)\s+from\s+['"][^'"]+['"]),\s*\n(import\s)/gm,
      (match, p1, p2) => {
        fixedCount++;
        return p1 + ';\n' + p2;
      }
    );
    
    // Fix 3: Destructuring ending with comma before return
    content = content.replace(
      /(\}\s*=\s*props),(\s*\n\s*return\s*{)/g,
      (match, p1, p2) => {
        fixedCount++;
        return p1 + ';' + p2;
      }
    );
    
    // Fix 4: Destructuring ending with comma before const
    content = content.replace(
      /(\}\s*=\s*props),(\s*\n\s*const)/g,
      (match, p1, p2) => {
        fixedCount++;
        return p1 + ';' + p2;
      }
    );
    
    // Fix 5: Fix trailing commas in export statements
    content = content.replace(
      /\}\),\s*$/gm,
      (match) => {
        // Only fix if it's at the end of a styled component definition
        const lines = content.split('\n');
        const lineIndex = lines.findIndex(line => line.includes(match));
        if (lineIndex > 0 && lines[lineIndex - 1].includes('}')) {
          fixedCount++;
          return '});';
        }
        return match;
      }
    );
    
    // Fix 6: Fix object syntax errors in story files
    if (filePath.endsWith('.stories.tsx')) {
      // Fix argTypes with missing closing braces
      content = content.replace(
        /(\s+onClick:\s*{\s*\n\s*action:\s*'onClick',\s*\n\s*description:\s*'[^']+',\s*\n)\s*},/gm,
        (match, p1) => {
          fixedCount++;
          return p1 + '  },';
        }
      );
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${fixedCount} issues in: ${filePath}`);
      totalFixed++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    errorCount++;
  }
});

console.log(`\n✨ Summary:`);
console.log(`  - Files processed: ${files.length}`);
console.log(`  - Files fixed: ${totalFixed}`);
console.log(`  - Errors: ${errorCount}`);
console.log('\n💡 Run "npm run build:storybook" to verify all fixes');