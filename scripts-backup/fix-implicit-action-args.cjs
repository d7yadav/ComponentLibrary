#!/usr/bin/env node

/**
 * Fix Implicit Action Args in Storybook Stories
 * 
 * This script fixes the "implicit action arg" error in Storybook stories
 * by ensuring all callback props (onClose, onClick, etc.) are properly
 * handled with explicit spy functions from @storybook/test.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Console colors for better output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log(`\n${colors.bold}${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}${title}${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
}

/**
 * Fix wrapper components that use setState without calling args.callback
 */
function fixWrapperComponent(content, callbackName) {
  // Pattern 1: onClose={() => setOpen(false)}
  const pattern1 = new RegExp(`${callbackName}={\\(\\)\\s*=>\\s*set\\w+\\(\\w+\\)}`, 'g');
  content = content.replace(pattern1, `${callbackName}={handle${callbackName.charAt(2).toUpperCase() + callbackName.slice(3)}}`);
  
  // Pattern 2: onClick={() => setOpen(!open)}
  const togglePattern = new RegExp(`${callbackName}={\\(\\)\\s*=>\\s*set\\w+\\(!\\w+\\)}`, 'g');
  content = content.replace(togglePattern, `${callbackName}={handle${callbackName.charAt(2).toUpperCase() + callbackName.slice(3)}}`);
  
  return content;
}

/**
 * Add handler function for callbacks
 */
function addHandlerFunction(content, callbackName) {
  const handlerName = `handle${callbackName.charAt(2).toUpperCase() + callbackName.slice(3)}`;
  
  // Check if handler already exists
  if (content.includes(`const ${handlerName}`)) {
    return content;
  }
  
  let handlerFunction;
  if (callbackName === 'onClose') {
    handlerFunction = `  const ${handlerName} = () => {
    setOpen(false);
    props.${callbackName}?.();
  };`;
  } else if (callbackName === 'onCollapseChange') {
    handlerFunction = `  const ${handlerName} = (newCollapsed: boolean) => {
    setCollapsed(newCollapsed);
    props.${callbackName}?.(newCollapsed);
  };`;
  } else {
    handlerFunction = `  const ${handlerName} = (...args: any[]) => {
    props.${callbackName}?.(...args);
  };`;
  }
  
  // Find where to insert the handler (after useState declarations)
  const useStatePattern = /const\s+\[\w+,\s*set\w+\]\s*=\s*useState\([^)]*\);/g;
  const matches = [...content.matchAll(useStatePattern)];
  
  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    const insertIndex = lastMatch.index + lastMatch[0].length;
    content = content.slice(0, insertIndex) + '\n\n' + handlerFunction + content.slice(insertIndex);
  }
  
  return content;
}

/**
 * Fix render functions that don't accept args
 */
function fixRenderFunction(content) {
  // Fix: render: () => { to render: (args) => {
  content = content.replace(/render:\s*\(\)\s*=>\s*\{/g, 'render: (args) => {');
  
  // Add {...args} to component props where missing
  content = content.replace(/<(Modal|Drawer|Dialog)(\s+[^>]*?)>/g, (match, componentName, props) => {
    if (!props.includes('{...args}')) {
      return `<${componentName} {...args}${props}>`;
    }
    return match;
  });
  
  return content;
}

/**
 * Ensure fn() imports are present
 */
function ensureFnImport(content) {
  if (!content.includes("import { fn } from '@storybook/test'")) {
    // Add import after existing storybook imports
    content = content.replace(
      /import type { Meta, StoryObj } from '@storybook\/react';/,
      `import type { Meta, StoryObj } from '@storybook/react';\nimport { fn } from '@storybook/test';`
    );
  }
  return content;
}

/**
 * Fix a single story file
 */
function fixStoryFile(filePath) {
  try {
    log('blue', `Processing: ${path.relative(process.cwd(), filePath)}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Ensure fn import is present
    content = ensureFnImport(content);
    
    // Fix render functions to accept args
    content = fixRenderFunction(content);
    
    // Fix common callback patterns
    const callbacks = ['onClose', 'onCollapseChange', 'onClick', 'onChange'];
    
    callbacks.forEach(callbackName => {
      // Add handler functions
      content = addHandlerFunction(content, callbackName);
      
      // Fix wrapper component usage
      content = fixWrapperComponent(content, callbackName);
    });
    
    // Fix specific pattern: Button onClick that calls setOpen directly
    content = content.replace(
      /onClick={\\(\\)\\s*=>\\s*setOpen\\(([^)]+)\\)}/g,
      'onClick={() => setOpen($1)}'
    );
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      log('green', '  ✅ Fixed implicit action args');
      return true;
    } else {
      log('yellow', '  ⚪ No changes needed');
      return false;
    }
    
  } catch (error) {
    log('red', `  ❌ Error processing ${filePath}: ${error.message}`);
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  logSection('🔧 Fixing Implicit Action Args in Storybook Stories');
  
  // Find all story files in surfaces components
  const storyFiles = glob.sync('src/components/surfaces/**/*.stories.tsx', {
    cwd: process.cwd(),
    absolute: true
  });
  
  if (storyFiles.length === 0) {
    log('yellow', 'No story files found in src/components/surfaces/');
    return;
  }
  
  log('cyan', `Found ${storyFiles.length} story files to process:`);
  storyFiles.forEach(file => {
    log('cyan', `  - ${path.relative(process.cwd(), file)}`);
  });
  
  console.log('');
  
  let fixedCount = 0;
  let totalCount = storyFiles.length;
  
  for (const filePath of storyFiles) {
    if (fixStoryFile(filePath)) {
      fixedCount++;
    }
  }
  
  console.log('');
  logSection('📊 Fix Summary');
  log('green', `✅ Fixed: ${fixedCount} files`);
  log('blue', `📁 Total: ${totalCount} files`);
  log('yellow', `⚪ Unchanged: ${totalCount - fixedCount} files`);
  
  if (fixedCount > 0) {
    console.log('');
    log('cyan', '🎯 Next steps:');
    log('cyan', '  1. Run yarn ai:validate:storybook to test fixes');
    log('cyan', '  2. Check Storybook UI for any remaining issues');
    log('cyan', '  3. Manually review complex story patterns if needed');
  }
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    log('red', `❌ Script failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { fixStoryFile, main };