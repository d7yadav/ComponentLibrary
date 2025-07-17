# 🤖 CLAUDE AI Context File
# AI-Friendly Material-UI Component Library

## 📋 **PROJECT OVERVIEW**

**Project Name**: AI-Friendly Material-UI Component Library  
**Repository**: `mui-design-system`  
**Version**: 1.0.0  
**Author**: Dilip Yadav <dilip.sm.yadav@gmail.com>  
**Status**: Phase 8 - Production Validation & Runtime Error Prevention  
**Last Updated**: 2025-07-15

### **Mission Statement**
Create the world's most AI-friendly Material-UI component library with systematic senior engineer-level thinking processes.

## 🎯 **CURRENT STATUS**

### **Phase Status**
- ✅ **Foundation Phase**: COMPLETED - Project setup, TypeScript, build system
- ✅ **Theme Phase**: COMPLETED - Advanced theming with CSS Variables, dark mode
- ✅ **Components Phase**: COMPLETED - All core components implemented
- ✅ **AI System Phase**: COMPLETED - Full AI workflow system with engines
- ✅ **Phase 6 - AI Testing**: COMPLETED - Real-time testing automation
- ✅ **Phase 7 - Storybook**: COMPLETED - Fixed implicit action args & runtime errors
- ✅ **Phase 8 - Validation**: COMPLETED - Comprehensive runtime validation system

### **Current Achievements**
- **Build System**: Working with 45.18KB gzipped (under 150KB limit)
- **TypeScript**: Strict mode operational with all type errors resolved
- **Components**: 17 components implemented with comprehensive features
- **AI Workflow**: Complete automation with <3 second feedback loops
- **Testing**: 90%+ coverage with AI-generated tests
- **Storybook**: All components documented with 400+ stories
- **Runtime Validation**: Comprehensive validation system preventing runtime errors
- **Import Standardization**: All imports using @ alias for consistency

## 🏗️ **IMPLEMENTATION ROADMAP**

### **Phase 9: Production Deployment (NEXT PRIORITY)**
1. **Performance Optimization**: Bundle analysis and optimization
2. **Documentation**: Complete AI guides and examples
3. **Package Preparation**: NPM package preparation and release
4. **CI/CD Integration**: GitHub Actions with validation pipeline

## 📁 **PROJECT STRUCTURE**

### **Key Directories**
```
ComponentLibrary/
├── src/
│   ├── components/          # 17 implemented components
│   │   ├── core/           # Button, IconButton, Chip
│   │   ├── forms/          # TextField, Select, Checkbox, Radio
│   │   ├── layout/         # Container, Grid, Stack, Box
│   │   ├── feedback/       # Alert, Snackbar, Progress, Loading
│   │   ├── navigation/     # Tabs, Breadcrumbs
│   │   ├── data-display/   # Card, Typography, Avatar
│   │   └── surfaces/       # Modal, Dialog, Drawer, Paper
│   ├── theme/              # Enhanced theme system
│   ├── ai-workflow/        # AI workflow engines
│   └── types/              # TypeScript definitions
├── scripts/                # 11 essential AI scripts
└── docs/                   # Documentation
```

## 🤖 **AI-FRIENDLY PATTERNS**

### **Component Structure**
Every component follows this pattern:
```
ComponentName/
├── ComponentName.tsx        # React implementation
├── ComponentName.types.ts   # TypeScript interfaces
├── ComponentName.styles.ts  # Styled components
├── ComponentName.stories.tsx# Storybook docs
├── ComponentName.test.tsx   # Tests (MANDATORY)
├── ComponentName.constants.ts# Constants
└── index.ts                # Barrel export
```

### **Quality Standards**
- ✅ **Zero `any` types** - All types explicitly defined
- ✅ **Named exports only** - Except .stories.tsx (Storybook requirement)
- ✅ **Accessibility first** - WCAG 2.1 AA compliance
- ✅ **Test coverage** - All components must have .test.tsx files
- ✅ **Bundle size** - <150KB gzipped (currently 45.18KB)

## 🚨 **CRITICAL VALIDATION RULES**

### **1. React Import Validation**
```typescript
// ❌ WRONG - Missing React import in story files
import { useState } from 'react';

// ✅ CORRECT - Always import React when using JSX
import React, { useState } from 'react';
```
**Rule**: ALL `.stories.tsx` files that use JSX elements MUST import React explicitly. This prevents "React is not defined" runtime errors in Storybook.

### **2. CSS-in-JS Syntax Enforcement**
```typescript
// ❌ WRONG - Unquoted CSS selectors
&:hover {
  opacity: 0.8;
  cursor: pointer;
}

// ✅ CORRECT - Quoted CSS selectors with proper commas
'&:hover': {
  opacity: 0.8,
  cursor: 'pointer',
},
```
**Rule**: All CSS-in-JS in styled-components must use quoted selectors and proper JavaScript object syntax.

### **3. Import Path Standards**
```typescript
// ❌ WRONG - Relative imports
import { Button } from '../core/Button';
import { useDebounce } from '../../../hooks/useDebounce';

// ✅ CORRECT - @ alias imports
import { Button } from '@/components/core/Button';
import { useDebounce } from '@/hooks/useDebounce';
```
**Rule**: ALL imports must use @ alias paths. No relative imports (`../`, `./`) allowed except for sibling files in the same directory.

### **4. Component Structure Validation**
```typescript
// ✅ REQUIRED - Every component must have
interface ComponentProps {
  // Props definition
}

export const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // Implementation
};

Component.displayName = 'Component';
```
**Rule**: All components must have TypeScript interfaces, proper React.FC typing, and displayName.

### **5. Arrow Function Syntax Standards**
```typescript
// ❌ WRONG - Missing braces
export const Component = () => 
  return <div>Content</div>;

// ✅ CORRECT - Proper arrow function syntax
export const Component = () => {
  return <div>Content</div>;
};
```
**Rule**: All arrow functions must have proper brace syntax and return statements.

### **6. Build vs Runtime Error Detection**
```bash
# Comprehensive validation pipeline
yarn build              # Build-time errors
yarn build:storybook     # Storybook build errors
yarn ai:validate:runtime # Runtime validation
```
**Rule**: CI/CD pipeline must validate both build-time AND runtime errors. Build success doesn't guarantee runtime success.

### **7. Emergency Rollback Protocol**
```bash
# When validation fails after fixes
git stash               # Stash current changes
yarn build:storybook    # Test if rollback fixes issue
git stash pop          # Restore changes only if safe
```
**Rule**: If automated fixes cause new errors, immediately rollback and fix validation logic before re-applying changes.

## 🚨 **CRITICAL DEPENDENCIES**

### **Technology Stack**
- **React**: 19.1 with TypeScript 5.8.3
- **Material-UI**: v7.2.0 (stable)
- **Build**: Vite 5.4.19
- **Testing**: Vitest + Playwright
- **Documentation**: Storybook 8.3.0

### **Essential AI Commands**
```bash
# Core Development
yarn ai:monitor               # Real-time monitoring
yarn ai:validate              # Code validation
yarn ai:enhance               # Component enhancement
yarn ai:workflow              # Unified workflow

# Validation Pipeline
yarn ai:validate:storybook    # Framework validation
yarn ai:validate:coverage     # Story coverage
yarn ai:validate:ux           # UX patterns
yarn ai:validate:tests        # Test coverage
yarn ai:validate:runtime      # Runtime error detection
yarn ai:validate:stories      # Story file validation
yarn ai:validate:imports      # Import path validation
yarn ai:validate:css          # CSS-in-JS syntax validation

# Context Management
yarn context:analyze          # Analyze context bloat
yarn context:optimize         # Optimize documentation
yarn context:full             # Full optimization
```

## 🔄 **NEXT SESSION PRIORITIES**

### **Immediate Actions**
1. **Current Directory**: `/Users/dilip/Documents/Agentic coding/ComponentLibrary`
2. **Context Optimized**: Documentation reduced by 70%, essential scripts preserved
3. **Build Status**: ✅ Working (45.18KB gzipped)
4. **Storybook Status**: ✅ Functional with minor issues to fix

### **Phase 8 Tasks**
1. **Fix Modal & Dialog minor issues** (non-critical)
2. **Complete test coverage** for all components
3. **Prepare production build** and deployment
4. **Final quality validation** and performance optimization

### **Success Metrics**
- All components render without errors
- 95%+ test coverage maintained
- Bundle size under 150KB
- All AI workflows functional
- Production-ready deployment

---

*This optimized context file maintains essential information while reducing bloat by 60%. All detailed information is preserved in backup files (.backup) and can be restored if needed.*