# 🎯 Component Architecture & Development Guidelines

## 📋 **Overview**

This document establishes the **mandatory** architectural patterns and development standards for our AI-friendly Material-UI component library. These guidelines ensure consistency, maintainability, and proper abstraction across all components.

## 🏗️ **Core Architecture Principles**

### **1. Wrapper Component Architecture**

**CRITICAL RULE**: All components must use our internal wrapper components instead of directly importing from `@mui/material`.

#### **✅ CORRECT Pattern:**
```typescript
// ✅ Use our wrapper components
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/core/Button';
```

#### **❌ INCORRECT Pattern:**
```typescript
// ❌ NEVER import directly from @mui/material
import { Typography, Box, Stack, Button } from '@mui/material';
```

### **2. Import Hierarchy Rules**

#### **Material-UI Import Restrictions:**
- **Wrapper Components Only**: `@mui/material` imports are ONLY allowed in wrapper component files
- **Story Files**: Must use wrapper components exclusively  
- **Application Components**: Must use wrapper components exclusively
- **Icons Exception**: `@mui/icons-material` can be imported directly (no wrapper needed)

#### **Import Pattern Examples:**

```typescript
// ✅ CORRECT: In wrapper component (src/components/data-display/Typography/Typography.tsx)
import { Typography as MuiTypography } from '@mui/material';
import { TypographyProps as MuiTypographyProps } from '@mui/material';

// ✅ CORRECT: In story files and other components  
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';

// ✅ CORRECT: Icons can be imported directly
import { Person, LocationOn, Email } from '@mui/icons-material';
```

### **3. Export Patterns**

#### **Wrapper Components:**
```typescript
// ✅ CORRECT: Named exports only (except stories)
export { Typography, HeadingTypography, BodyTypography } from './Typography';
export type { TypographyProps, TypographyVariant } from './Typography.types';
```

#### **Story Files Exception:**
```typescript
// ✅ CORRECT: Stories require default export for Storybook CSF
const meta: Meta<typeof Typography> = { /* ... */ };
export default meta; // Required by Storybook

export const Default: Story = { /* ... */ };
export const Variants: Story = { /* ... */ };
```

## 📁 **Component Structure Standards**

### **Mandatory File Structure:**
```
ComponentName/
├── ComponentName.tsx        # React component implementation
├── ComponentName.types.ts   # TypeScript interfaces
├── ComponentName.styles.ts  # Emotion/MUI styled components  
├── ComponentName.constants.ts# Component constants
├── ComponentName.stories.tsx# Storybook documentation ⭐
├── ComponentName.test.tsx   # Comprehensive tests ⭐
├── ComponentName.ai-guide.md# AI coding instructions ⭐
├── ComponentName.examples.md# Code examples library ⭐
├── README.md               # General documentation
└── index.ts                # Barrel export
```

**⭐ = Mandatory files for all components**

### **File Content Standards:**

#### **ComponentName.tsx:**
```typescript
import React from 'react';
import { ComponentNameProps } from './ComponentName.types';
import { StyledComponentName } from './ComponentName.styles';
import { DEFAULT_PROPS } from './ComponentName.constants';

/**
 * ComponentName provides [brief description].
 * 
 * @param props - ComponentName props
 * @returns ComponentName component
 */
export const ComponentName = React.memo<ComponentNameProps>((props) => {
  const { variant = DEFAULT_PROPS.variant, ...restProps } = props;
  
  return (
    <StyledComponentName
      variant={variant}
      {...restProps}
    />
  );
});

ComponentName.displayName = 'ComponentName';
```

#### **ComponentName.types.ts:**
```typescript
import { Theme } from '@mui/material/styles';

// Base props extending MUI component
export interface ComponentNameProps extends BaseProps {
  /** Component variant */
  variant?: 'primary' | 'secondary';
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  sx?: SxProps<Theme>;
  /** Component children */
  children?: React.ReactNode;
}

// Style-related types
export interface ComponentNameStyleProps {
  theme: Theme;
  variant: ComponentNameProps['variant'];
}
```

## 📖 **Story Creation Standards**

### **Mandatory Story Categories:**

Every component MUST include these story categories:

1. **Default** - Basic usage example
2. **Variants** - All component variants  
3. **States** - Interactive states (hover, focus, disabled, loading)
4. **Theme** - Light/dark theme compatibility
5. **Accessibility** - WCAG 2.1 AA compliance examples
6. **Boolean Props** - All boolean prop combinations
7. **Sizes** - All size variants (if applicable)
8. **Real World** - Practical usage scenarios

### **Story File Template:**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';
// ✅ Use wrapper components in stories
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Typography } from '@/components/data-display/Typography';

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Component description for AI and developers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Component variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== MANDATORY STORIES =====

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Default content',
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2}>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack spacing={2}>
      <ComponentName>Normal</ComponentName>
      <ComponentName disabled>Disabled</ComponentName>
      <ComponentName loading>Loading</ComponentName>
    </Stack>
  ),
};

export const Theme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <ComponentName>Dark theme example</ComponentName>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <ComponentName 
      aria-label="Accessible component"
      role="button"
      tabIndex={0}
    >
      Accessible content
    </ComponentName>
  ),
};

export const BooleanProps: Story = {
  render: () => (
    <Stack spacing={2}>
      <ComponentName disabled={false} loading={false}>Normal</ComponentName>
      <ComponentName disabled={true} loading={false}>Disabled</ComponentName>
      <ComponentName disabled={false} loading={true}>Loading</ComponentName>
    </Stack>
  ),
};

export const RealWorld: Story = {
  render: () => (
    <Box>
      {/* Real-world usage example */}
      <ComponentName variant="primary">
        Real-world usage
      </ComponentName>
    </Box>
  ),
};
```

### **Story Coverage Requirements:**

- **Target Coverage**: 80%+ story coverage for all components
- **Boolean Props**: Every boolean prop must have dedicated test stories
- **Interaction States**: hover, focus, active, disabled states required
- **Responsive**: Mobile, tablet, desktop behavior examples
- **Edge Cases**: Empty states, error states, loading states

## 🔧 **Wrapper Component Creation Rules**

### **When to Create Wrappers:**

Create wrapper components for Material-UI components when:
- ✅ Used in 2+ places across the codebase
- ✅ Need consistent styling/behavior
- ✅ Require additional props or functionality
- ✅ Part of our design system standards

### **Wrapper Implementation Pattern:**

```typescript
// src/components/category/ComponentName/ComponentName.tsx
import React from 'react';
import { 
  ComponentName as MuiComponentName,
  ComponentNameProps as MuiComponentNameProps 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ComponentNameProps } from './ComponentName.types';

// Enhanced styled component with our design tokens
const StyledComponentName = styled(MuiComponentName, {
  shouldForwardProp: (prop) => prop !== 'customProp',
})<ComponentNameProps>(({ theme, customProp }) => ({
  // Use theme tokens instead of hardcoded values
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  
  // Custom enhancements
  ...(customProp && {
    // Custom styling
  }),
}));

export const ComponentName = React.memo<ComponentNameProps>((props) => {
  return <StyledComponentName {...props} />;
});

ComponentName.displayName = 'ComponentName';
```

### **Wrapper Export Pattern:**

```typescript
// src/components/category/ComponentName/index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
export { DEFAULT_PROPS } from './ComponentName.constants';

// src/components/category/index.ts  
export * from './ComponentName';

// src/components/index.ts
export * from './category';
```

## 🎨 **Design System Integration**

### **Theme Token Usage:**

```typescript
// ✅ CORRECT: Use theme tokens
const StyledComponent = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  spacing: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  fontFamily: theme.typography.fontFamily,
}));

// ❌ INCORRECT: Hardcoded values
const StyledComponent = styled('div')({
  color: '#333333',
  backgroundColor: '#ffffff', 
  padding: '16px',
  borderRadius: '4px',
  fontFamily: 'Roboto, sans-serif',
});
```

### **Responsive Design Patterns:**

```typescript
// ✅ CORRECT: Use theme breakpoints
const ResponsiveComponent = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
  
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
}));
```

## 🚨 **Quality Gates & Validation**

### **Pre-Commit Requirements:**

Before committing, ensure:
- ✅ No direct `@mui/material` imports in non-wrapper files
- ✅ All mandatory story categories implemented
- ✅ TypeScript compilation passes
- ✅ AI validation score >90%
- ✅ Story coverage >80%
- ✅ UX pattern score >70%

### **Validation Commands:**

```bash
# Complete validation pipeline
yarn ai:validate              # Static code quality (target: >90%)
yarn ai:validate:storybook    # Framework compatibility
yarn ai:validate:coverage     # Story coverage (target: >80%)
yarn ai:validate:ux           # UX patterns (target: >70%)

# Build verification
yarn build                    # TypeScript compilation
yarn storybook:build          # Storybook build test
```

## 🔄 **Development Workflow**

### **New Component Creation:**

1. **Create Component Structure**: Use plop template or manual creation
2. **Implement Wrapper Logic**: Follow wrapper component patterns
3. **Create Comprehensive Stories**: Include all mandatory categories
4. **Add Tests**: Implement comprehensive test coverage
5. **Run Validation**: Ensure all quality gates pass
6. **Documentation**: Create AI guides and examples
7. **Visual Regression**: Generate visual baselines

### **Story Enhancement Process:**

1. **Analyze Coverage**: Run `yarn ai:validate:coverage`
2. **Identify Gaps**: Check missing story categories
3. **Implement Stories**: Add missing mandatory stories
4. **Test Interactions**: Verify all boolean props and states
5. **Validate Quality**: Ensure coverage targets met

## ⚠️ **Common Violations & Fixes**

### **Import Violations:**

```