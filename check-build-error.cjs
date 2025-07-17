#!/usr/bin/env node
const { execSync } = require('child_process');

console.log('🔍 Checking for build errors...\n');

try {
  const result = execSync('yarn build', { 
    encoding: 'utf8',
    stdio: 'pipe' 
  });
  
  console.log('✅ Build successful!');
  console.log('All .styles.ts files are working correctly.');
  
} catch (error) {
  const output = error.stdout || error.stderr || error.message;
  
  // Extract the specific file and error from the output
  const fileMatch = output.match(/\[vite:react-babel\] ([^:]+):/);
  const errorMatch = output.match(/: (.+) \(\d+:\d+\)/);
  
  if (fileMatch && errorMatch) {
    const file = fileMatch[1];
    const errorMsg = errorMatch[1];
    
    console.log(`❌ Build Error Found:`);
    console.log(`📁 File: ${file}`);
    console.log(`⚠️  Error: ${errorMsg}`);
    console.log(`\nNext step: Fix this specific error in the file.`);
    
  } else {
    console.log('❌ Build failed with unknown error:');
    console.log(output.substring(0, 500));
  }
}