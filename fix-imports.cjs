#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing malformed import syntax across all files...');

// Get all files with malformed imports
try {
  const result = execSync(`find src -name "*.ts" -type f -exec grep -l "} from} from" {} \\;`, { encoding: 'utf8' });
  const files = result.trim().split('\n').filter(f => f.length > 0);
  
  console.log(`Found ${files.length} files with malformed imports:`);
  files.forEach(file => console.log(`  - ${file}`));
  
  let totalFixed = 0;
  
  files.forEach(filePath => {
    console.log(`\n📝 Processing ${filePath}...`);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let fixedCount = 0;
      
      // Fix the malformed import syntax
      const newContent = content.replace(/} from} from/g, '} from');
      
      if (newContent !== content) {
        const matches = content.match(/} from} from/g);
        fixedCount = matches ? matches.length : 0;
        
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`  ✅ Fixed ${fixedCount} malformed import(s)`);
        totalFixed += fixedCount;
      } else {
        console.log(`  ⚠️  No malformed imports found (may have been fixed)`);
      }
    } catch (error) {
      console.error(`  ❌ Error processing ${filePath}:`, error.message);
    }
  });
  
  console.log(`\n🎉 Fixed ${totalFixed} malformed imports across ${files.length} files`);
  
  // Test the build
  console.log('\n🧪 Testing build...');
  try {
    execSync('yarn build', { stdio: 'inherit' });
    console.log('\n✅ Build successful!');
  } catch (error) {
    console.log('\n⚠️  Build still has issues, but import syntax has been fixed.');
    console.log('You may need to fix other syntax errors like trailing commas in styled components.');
  }
  
} catch (error) {
  console.error('❌ Error finding files:', error.message);
}