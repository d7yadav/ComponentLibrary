#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

console.log('🔧 Fixing styled component export syntax errors...\n');

// Find all .styles.ts files
const styleFiles = glob.sync('src/**/*.styles.ts', { cwd: process.cwd() });

let totalFixedFiles = 0;
let totalFixes = 0;

styleFiles.forEach((filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Fix pattern: }), followed by newline and export
    const fixedContent = content.replace(/\}\),(\s*\n\s*(?:\/\*\*|export))/g, '});$1');
    
    if (fixedContent !== originalContent) {
      fs.writeFileSync(filePath, fixedContent);
      const fixes = (originalContent.match(/\}\),(\s*\n\s*(?:\/\*\*|export))/g) || []).length;
      totalFixedFiles++;
      totalFixes += fixes;
      console.log(`✅ Fixed ${filePath} (${fixes} fixes)`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}: ${error.message}`);
  }
});

console.log(`\n📝 Summary: Fixed ${totalFixedFiles} files with ${totalFixes} total fixes`);