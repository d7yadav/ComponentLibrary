#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Fixing Stack.styles.ts object syntax errors...\n');

const filePath = 'src/components/layout/Stack/Stack.styles.ts';

try {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Fix semicolons inside return object that should be commas
  content = content.replace(/\}\);(\s*\n\s*\/\/ [A-Za-z])/g, '}),\n$1');
  content = content.replace(/\}\);(\s*\n\s*\.\.\.\()/g, '}),\n$1');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log('✅ Fixed Stack.styles.ts object syntax errors');
    
    // Count the number of fixes
    const fixes = (originalContent.match(/\}\);(\s*\n\s*(?:\/\/|\.\.\.\())/g) || []).length;
    console.log(`📝 Applied ${fixes} fixes`);
  } else {
    console.log('❌ No syntax errors found to fix');
  }
  
} catch (error) {
  console.error('Error:', error.message);
}