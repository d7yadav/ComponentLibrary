#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = 'src/components/data-display/Avatar/Avatar.styles.ts';

console.log('🔧 Checking for missing closing parentheses in Avatar.styles.ts...\n');

try {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for parentheses balance
  let openParens = 0;
  let openBraces = 0;
  let openBrackets = 0;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    if (char === '(') openParens++;
    else if (char === ')') openParens--;
    else if (char === '{') openBraces++;
    else if (char === '}') openBraces--;
    else if (char === '[') openBrackets++;
    else if (char === ']') openBrackets--;
  }
  
  console.log('Balance check:');
  console.log(`  Parentheses: ${openParens} (should be 0)`);
  console.log(`  Braces: ${openBraces} (should be 0)`);
  console.log(`  Brackets: ${openBrackets} (should be 0)`);
  
  // Fix the specific syntax error
  const fixedContent = content.replace(
    /(\s*\}\s*;\s*\n\s*\}\s*),\s*\n\s*\/\*\*/g,
    '$1);\n\n/**'
  );
  
  if (fixedContent !== content) {
    fs.writeFileSync(filePath, fixedContent);
    console.log('\n✅ Fixed missing closing parenthesis');
  } else {
    console.log('\n❌ No obvious fix found');
  }
  
} catch (error) {
  console.error('Error:', error.message);
}