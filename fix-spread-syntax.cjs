#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const corruptedPattern = /\.\.\.\(conditions \.\.\.\(\.\*\{\,\.\.\.\(\.\*\{,/g;

const fixSpreadSyntax = (filePath, content) => {
  let fixed = content;
  
  // Common replacements based on context
  const replacements = [
    // Loading state patterns
    {
      pattern: /\/\/ Loading state\s*\.\.\.\(conditions \.\.\.\(\.\*\{\,\.\.\.\(\.\*\{,\s*\{\s*'pointerEvents': 'none'/g,
      replacement: "// Loading state\n  ...($loading && {\n    'pointerEvents': 'none'"
    },
    // Start icon patterns
    {
      pattern: /\/\/ Start icon spacing\s*\.\.\.\(conditions \.\.\.\(\.\*\{\,\.\.\.\(\.\*\{,\s*\{\s*'paddingLeft'/g,
      replacement: "// Start icon spacing\n  ...($startIcon && {\n    'paddingLeft'"
    },
    // End icon patterns
    {
      pattern: /\/\/ End icon spacing\s*\.\.\.\(conditions \.\.\.\(\.\*\{\,\.\.\.\(\.\*\{,\s*\{\s*'paddingRight'/g,
      replacement: "// End icon spacing\n  ...($endIcon && {\n    'paddingRight'"
    },
    // Disabled state patterns
    {
      pattern: /\/\/ Disabled state\s*\.\.\.\(conditions \.\.\.\(\.\*\{\,\.\.\.\(\.\*\{,/g,
      replacement: "// Disabled state\n  ...($disabled && {"
    },
    // Error state patterns
    {
      pattern: /\/\/ Error state\s*\.\.\.\(conditions \.\.\.\(\.\*\{\,\.\.\.\(\.\*\{,/g,
      replacement: "// Error state\n  ...($error && {"
    },
    // Focus state patterns
    {
      pattern: /\/\/ Focus state\s*\.\.\.\(conditions \.\.\.\(\.\*\{\,\.\.\.\(\.\*\{,/g,
      replacement: "// Focus state\n  ...($focused && {"
    },
    // Selected state patterns
    {
      pattern: /\/\/ Selected state\s*\.\.\.\(conditions \.\.\.\(\.\*\{\,\.\.\.\(\.\*\{,/g,
      replacement: "// Selected state\n  ...($selected && {"
    },
    // Hover state patterns
    {
      pattern: /\/\/ Hover state\s*\.\.\.\(conditions \.\.\.\(\.\*\{\,\.\.\.\(\.\*\{,/g,
      replacement: "// Hover state\n  ...($hover && {"
    },
    // Animation patterns
    {
      pattern: /\/\/ Animation\s*\.\.\.\(conditions \.\.\.\(\.\*\{\,\.\.\.\(\.\*\{,/g,
      replacement: "// Animation\n  ...($animated && {"
    },
    // Generic fallback
    {
      pattern: /\.\.\.\(conditions \.\.\.\(\.\*\{\,\.\.\.\(\.\*\{,/g,
      replacement: "...(condition && {"
    }
  ];

  replacements.forEach(({ pattern, replacement }) => {
    fixed = fixed.replace(pattern, replacement);
  });

  return fixed;
};

// Find all .styles.ts files
const styleFiles = glob.sync('src/components/**/*.styles.ts', { cwd: __dirname });

console.log(`🔧 Fixing spread syntax in ${styleFiles.length} files...`);

let fixedCount = 0;

styleFiles.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  
  if (content.includes('conditions ...(.*{,...(.*{,')) {
    const fixed = fixSpreadSyntax(filePath, content);
    fs.writeFileSync(fullPath, fixed);
    console.log(`✅ Fixed: ${filePath}`);
    fixedCount++;
  }
});

console.log(`🎉 Fixed ${fixedCount} files with corrupted spread syntax.`);