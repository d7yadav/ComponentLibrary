#!/usr/bin/env node

/**
 * Fix ALL Implicit Action Args in Storybook Stories - Global Fix
 * 
 * This script fixes the "implicit action arg" error across ALL component stories
 * by ensuring all callback props are properly handled with explicit spy functions.
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
 * Common callback patterns to handle
 */
const COMMON_CALLBACKS = [
  'onClick', 'onClose', 'onChange', 'onSubmit', 'onReset', 'onFocus', 'onBlur',
  'onSelect', 'onToggle', 'onExpand', 'onCollapse', 'onDelete', 'onEdit',
  'onCancel', 'onConfirm', 'onSave', 'onLoad', 'onError', 'onSuccess',
  'onCollapseChange', 'onOpened', 'onClosed', 'onDragStart', 'onDragEnd',
  'onDrop', 'onSortEnd', 'onPageChange', 'onRowsPerPageChange',
  'onSelectionChange', 'onFilterChange', 'onSearchChange'
];

/**
 * Check if file needs fn() import
 */
function needsFnImport(content) {
  return !content.includes("import { fn } from '@storybook/test'") && 
         !content.includes("from '@storybook/test'");
}

/**
 * Add fn() import if needed
 */
function ensureFnImport(content) {
  if (needsFnImport(content)) {
    // Add import after existing storybook imports or at the top
    if (content.includes("import type { Meta, StoryObj } from '@storybook/react'")) {
      content = content.replace(
        /import type { Meta, StoryObj } from '@storybook\/react';/,
        `import type { Meta, StoryObj } from '@storybook/react';\nimport { fn } from '@storybook/test';`
      );
    } else {
      content = `import { fn } from '@storybook/test';\n${content}`;
    }
  }
  return content;
}

/**
 * Find callbacks used in component but not in argTypes
 */
function findMissingCallbacks(content) {
  const argTypesMatch = content.match(/argTypes:\s*\{([^}]+)\}/s);
  const existingArgTypes = argTypesMatch ? argTypesMatch[1] : '';
  
  const missingCallbacks = [];
  
  COMMON_CALLBACKS.forEach(callback => {
    // Check if callback is used in stories but not in argTypes
    const usedInStories = content.includes(`${callback}:`) || content.includes(`${callback}=`);
    const inArgTypes = existingArgTypes.includes(`${callback}:`);
    
    if (usedInStories && !inArgTypes) {
      missingCallbacks.push(callback);
    }
  });
  
  return missingCallbacks;
}

/**
 * Add missing callbacks to argTypes
 */
function addMissingCallbacksToArgTypes(content, missingCallbacks) {
  if (missingCallbacks.length === 0) return content;
  
  const argTypesPattern = /(\s+)(\},\s*tags:\s*\['autodocs'\])/;
  const match = content.match(argTypesPattern);
  
  if (match) {
    const indent = match[1];
    const callbacksString = missingCallbacks.map(callback => 
      `${indent}${callback}: {\n${indent}  action: '${callback}',\n${indent}  description: 'Callback fired when ${callback.replace('on', '').toLowerCase()} occurs',\n${indent}},`
    ).join('\n');
    
    content = content.replace(
      argTypesPattern,
      `${callbacksString}\n${match[1]}${match[2]}`
    );
  }
  
  return content;
}

/**
 * Add fn() to meta args if missing
 */
function ensureMetaArgs(content, callbacks) {
  if (callbacks.length === 0) return content;
  
  // Check if meta already has args
  if (content.includes('  args: {')) {
    // Add missing callbacks to existing args
    const argsPattern = /(\s+args:\s*\{[^}]*)(},)/s;
    const match = content.match(argsPattern);
    
    if (match) {
      const existingArgs = match[1];
      const missingInArgs = callbacks.filter(cb => !existingArgs.includes(`${cb}:`));
      
      if (missingInArgs.length > 0) {
        const newArgsString = missingInArgs.map(cb => `    ${cb}: fn(),`).join('\n');
        content = content.replace(
          argsPattern,
          `${match[1]}\n${newArgsString}\n  ${match[2]}`
        );
      }
    }
  } else {
    // Add args block if it doesn't exist
    const argsString = callbacks.map(cb => `    ${cb}: fn(),`).join('\n');
    const insertPattern = /(\s+tags:\s*\['autodocs'\],\s*)(};)/;
    
    content = content.replace(
      insertPattern,
      `$1\n  args: {\n${argsString}\n  },\n$2`
    );
  }
  
  return content;
}

/**
 * Fix render functions that don't accept args
 */
function fixRenderFunctions(content) {
  // Fix: render: () => { to render: (args) => {
  content = content.replace(/render:\s*\(\)\s*=>\s*\(/g, 'render: (args) => (');
  content = content.replace(/render:\s*\(\)\s*=>\s*\{/g, 'render: (args) => {');
  
  return content;
}

/**
 * Fix wrapper components that use callbacks without calling args
 */
function fixWrapperComponents(content) {
  // Find wrapper component definitions
  const wrapperPattern = /const\s+(\w+(?:Wrapper|Template|Story))\s*=\s*\(\s*\{\s*([^}]*)\s*\}\s*:\s*any\)\s*=>\s*\{/g;
  
  let match;
  while ((match = wrapperPattern.exec(content)) !== null) {
    const wrapperName = match[1];
    const props = match[2];
    
    // Check if this wrapper uses callbacks but doesn't handle args properly
    COMMON_CALLBACKS.forEach(callback => {
      const callbackUsagePattern = new RegExp(`${callback}={\\(\\)\\s*=>\\s*[^}]+}`, 'g');
      if (content.match(callbackUsagePattern)) {
        // Add handler function
        const handlerName = `handle${callback.charAt(2).toUpperCase() + callback.slice(3)}`;
        const handlerPattern = new RegExp(`const ${handlerName}`);
        
        if (!content.match(handlerPattern)) {
          // Insert handler function after state declarations
          const insertAfterPattern = new RegExp(
            `(const\\s+\\[\\w+,\\s*set\\w+\\]\\s*=\\s*useState[^;]+;)`,
            'g'
          );
          
          const handlerCode = `\n  const ${handlerName} = (...args: any[]) => {\n    props.${callback}?.(...args);\n  };`;
          
          content = content.replace(insertAfterPattern, `$1${handlerCode}`);
        }
      }
    });
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
    
    // Step 1: Ensure fn import is present
    content = ensureFnImport(content);
    
    // Step 2: Find missing callbacks
    const missingCallbacks = findMissingCallbacks(content);
    
    if (missingCallbacks.length > 0) {
      log('yellow', `  Found missing callbacks: ${missingCallbacks.join(', ')}`);
      
      // Step 3: Add missing callbacks to argTypes
      content = addMissingCallbacksToArgTypes(content, missingCallbacks);
      
      // Step 4: Ensure meta args has fn() for all callbacks
      content = ensureMetaArgs(content, missingCallbacks);
    }
    
    // Step 5: Fix render functions to accept args
    content = fixRenderFunctions(content);
    
    // Step 6: Fix wrapper components
    content = fixWrapperComponents(content);
    
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
  logSection('🔧 Fixing ALL Implicit Action Args in Storybook Stories');
  
  // Find ALL story files across the entire project
  const storyFiles = glob.sync('src/**/*.stories.tsx', {
    cwd: process.cwd(),
    absolute: true
  });
  
  if (storyFiles.length === 0) {
    log('yellow', 'No story files found in src/');
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
  logSection('📊 Global Fix Summary');
  log('green', `✅ Fixed: ${fixedCount} files`);
  log('blue', `📁 Total: ${totalCount} files`);
  log('yellow', `⚪ Unchanged: ${totalCount - fixedCount} files`);
  
  if (fixedCount > 0) {
    console.log('');
    log('cyan', '🎯 Next steps:');
    log('cyan', '  1. Run yarn ai:validate:storybook to test fixes');
    log('cyan', '  2. Start Storybook to verify all components work');
    log('cyan', '  3. Check for any remaining implicit action arg warnings');
  }
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    log('red', `❌ Global fix failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { fixStoryFile, main };