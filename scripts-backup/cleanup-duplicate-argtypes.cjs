#!/usr/bin/env node

/**
 * Clean up duplicate argTypes and formatting issues from the global fix script
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function cleanupStoryFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Fix duplicate argTypes entries
    const argTypesPattern = /argTypes:\s*\{([^}]+)\},\s*tags:/s;
    const match = content.match(argTypesPattern);
    
    if (match) {
      const argTypesContent = match[1];
      
      // Remove duplicates by extracting unique entries
      const entries = new Map();
      const entryPattern = /(\w+):\s*\{[^}]+\},?/g;
      let entryMatch;
      
      while ((entryMatch = entryPattern.exec(argTypesContent)) !== null) {
        const propName = entryMatch[1];
        const fullEntry = entryMatch[0];
        
        // Keep the first occurrence of each prop
        if (!entries.has(propName)) {
          entries.set(propName, fullEntry);
        }
      }
      
      if (entries.size > 0) {
        const cleanArgTypes = Array.from(entries.values()).join('\n    ');
        content = content.replace(
          argTypesPattern,
          `argTypes: {\n    ${cleanArgTypes}\n  },\n  tags:`
        );
      }
    }
    
    // Fix formatting around argTypes that got inserted incorrectly
    content = content.replace(/(\},\s*tags:\s*\['autodocs'\],)\s*onClick:\s*\{[^}]+\},/g, '$1');
    content = content.replace(/(\},\s*tags:\s*\['autodocs'\],)\s*onClose:\s*\{[^}]+\},/g, '$1');
    content = content.replace(/(\},\s*tags:\s*\['autodocs'\],)\s*onChange:\s*\{[^}]+\},/g, '$1');
    
    // Fix duplicate handler functions
    content = content.replace(/const handleClick = \(\.\.\.[^}]+\};\s*const handleClick = \(\.\.\.[^}]+\};/g, 
      'const handleClick = (...args: any[]) => {\n    props.onClick?.(...args);\n  };');
    
    // Fix broken wrapper components with undefined props
    content = content.replace(/const handleClick = \(\.\.\.[^}]+\};\s*const \[\w+, set\w+\]/g, 
      'const [collapsed, setCollapsed]');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned up: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`❌ Error cleaning ${filePath}: ${error.message}`);
    return false;
  }
}

// Find and clean up all story files
const storyFiles = glob.sync('src/**/*.stories.tsx', {
  cwd: process.cwd(),
  absolute: true
});

console.log('🧹 Cleaning up duplicate argTypes and formatting issues...\n');

let cleanedCount = 0;
storyFiles.forEach(filePath => {
  if (cleanupStoryFile(filePath)) {
    cleanedCount++;
  }
});

console.log(`\n📊 Cleaned up ${cleanedCount} files with formatting issues`);