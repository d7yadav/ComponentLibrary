#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing common syntax errors caused by automated script...\n');

// Function to fix common syntax errors
function fixSyntaxErrors(content) {
  let fixed = content;
  
  // Fix semicolons in array literals
  fixed = fixed.replace(/(\[[^\]]*?)'([^']*?)';(\s*'[^']*?')/g, "$1'$2',$3");
  
  // Fix semicolons before return statements
  fixed = fixed.replace(/(\s+)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*([^,;]+),(\s*return\s)/g, '$1$2 = $3;$4');
  
  // Fix quoted parameter names in function definitions
  fixed = fixed.replace(/(function\s*\([^)]*?|=>\s*\([^)]*?|,\s*)'([a-zA-Z_$][a-zA-Z0-9_$]*)'\s*:/g, '$1$2:');
  
  // Fix return statement structure issues
  fixed = fixed.replace(/(\s+)return\s+([^;]+),(\s*})/g, '$1return $2;$3');
  
  // Fix comma/semicolon issues in object literals
  fixed = fixed.replace(/(\s+})(\s*},)/g, '$1$2');
  
  return fixed;
}

// Files to process (those most likely to have been corrupted)
const filesToFix = [
  'src/components/core/Icon/Icon.constants.ts',
  'src/components/core/IconButton/IconButton.styles.ts',
  'src/components/forms/DatePicker/DatePicker.constants.ts',
  'src/components/forms/Autocomplete/Autocomplete.constants.ts',
  'src/components/data-display/Card/Card.styles.ts',
  'src/components/surfaces/Modal/Modal.styles.ts',
  'src/components/layout/Stack/Stack.styles.ts',
  'src/components/feedback/Alert/Alert.styles.ts'
];

let fixedCount = 0;

filesToFix.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (fs.existsSync(fullPath)) {
    console.log(`Processing: ${filePath}`);
    
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      const fixed = fixSyntaxErrors(content);
      
      if (content !== fixed) {
        fs.writeFileSync(fullPath, fixed);
        console.log(`  ✅ Fixed syntax errors`);
        fixedCount++;
      } else {
        console.log(`  ⚪ No changes needed`);
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  } else {
    console.log(`  ⚠️  File not found: ${filePath}`);
  }
});

console.log(`\n🎉 Fixed ${fixedCount} files`);
console.log('\nNote: This script addresses common syntax errors.');
console.log('Run the build to check for any remaining issues.');