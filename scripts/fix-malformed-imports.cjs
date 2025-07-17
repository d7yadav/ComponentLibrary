#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files with malformed imports reported by Storybook
const filesToFix = [
  'src/components/data-display/Card/Card.stories.tsx',
  'src/components/data-display/Card/CardHeader.stories.tsx',
  'src/components/data-display/Card/CardMedia.stories.tsx',
  'src/components/forms/Radio/Radio.stories.tsx',
  'src/components/forms/Switch/Switch.stories.tsx',
  'src/components/surfaces/ListItem/ListItem.stories.tsx'
];

console.log('🔧 Fixing malformed imports in story files...\n');

let fixedCount = 0;

filesToFix.forEach(filePath => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if file has the malformed import pattern
    if (content.includes('import { \nimport React')) {
      // Fix the malformed import
      content = content.replace(
        /import\s*{\s*\nimport React from 'react';\n/,
        "import React from 'react';\nimport { \n"
      );
      
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Fixed: ${filePath}`);
      fixedCount++;
    } else {
      console.log(`⏩ Skipped (already fixed): ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log(`\n✨ Fixed ${fixedCount} files`);
console.log('\n💡 Run "npm run build:storybook" to verify the fix');