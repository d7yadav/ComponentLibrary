#!/usr/bin/env node

/**
 * Fix errors introduced by the previous script
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix: Add missing handleClick handlers where referenced but not defined
  if (content.includes('onClick={handleClick}') && !content.includes('const handleClick')) {
    // Add handleClick handler after the first useState
    const useStatePattern = /const\s+\[\w+,\s*set\w+\]\s*=\s*useState\([^)]*\);/;
    const match = content.match(useStatePattern);
    if (match) {
      const insertIndex = match.index + match[0].length;
      const handlerCode = `
    
    const handleClick = () => {
      setOpen(true);
    };`;
      content = content.slice(0, insertIndex) + handlerCode + content.slice(insertIndex);
      modified = true;
    }
  }
  
  // Fix: Remove duplicate {...args} {...props} patterns
  content = content.replace(/<(\w+)\s+\{\.\.\.args\}\s*\{\.\.\.props\}/g, '<$1 {...props}');
  if (content !== fs.readFileSync(filePath, 'utf8')) modified = true;
  
  // Fix: Remove orphaned handler functions that reference undefined 'props'
  content = content.replace(/\s*const handle\w+ = \(\.\.\.args: any\[\]\) => \{\s*props\.\w+\?\.\(\.\.\.\args\);\s*\};\s*/g, '');
  if (content !== fs.readFileSync(filePath, 'utf8')) modified = true;
  
  // Fix: PerformanceTest story has broken handler placement
  if (content.includes('const [openCount, setOpenCount] = useState(0);') && content.includes('props.onChange')) {
    content = content.replace(
      /const \[openCount, setOpenCount\] = useState\(0\);\s*const handleChange[^}]+\};\s*const handleClick[^}]+\};\s*const handleCollapseChange[^}]+\};\s*const \[modals, setModals\]/,
      'const [openCount, setOpenCount] = useState(0);\n    const [modals, setModals]'
    );
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  
  return false;
}

// Find and fix all surface component stories
const storyFiles = glob.sync('src/components/surfaces/**/*.stories.tsx', {
  cwd: process.cwd(),
  absolute: true
});

console.log('🔧 Fixing script-generated errors...\n');

let fixedCount = 0;
storyFiles.forEach(filePath => {
  if (fixFile(filePath)) {
    fixedCount++;
  }
});

console.log(`\n📊 Fixed ${fixedCount} files`);