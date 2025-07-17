#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = 'src/components/layout/Stack/Stack.styles.ts';

console.log('🔧 Fixing Stack.styles.ts syntax errors...\n');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Fix all instances of }), that should be });
  content = content.replace(/\}\),(\s*\n\s*\/\*\*)/g, '});$1');
  
  // Fix any remaining }), at the end of styled components
  content = content.replace(/\}\),(\s*\n\s*\/\/)/g, '});$1');
  
  // Fix any }), before export statements
  content = content.replace(/\}\),(\s*\n\s*export)/g, '});$1');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log('✅ Fixed Stack.styles.ts syntax errors');
    
    // Count the number of fixes
    const fixes = originalContent.match(/\}\),(\s*\n\s*(?:\/\*\*|\/\/|export))/g);
    console.log(`📝 Applied ${fixes ? fixes.length : 0} fixes`);
  } else {
    console.log('❌ No syntax errors found to fix');
  }
  
} catch (error) {
  console.error('Error:', error.message);
}