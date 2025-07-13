#!/usr/bin/env node
/**
 * @fileoverview AI Documentation Generator
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * This script automatically generates comprehensive AI-friendly documentation
 * for components including .ai-guide.md and .examples.md files.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Logger utility for consistent output
 */
class Logger {
  static info(message) {
    console.log(`${colors.blue}ℹ${colors.reset} ${message}`);
  }

  static success(message) {
    console.log(`${colors.green}✅${colors.reset} ${message}`);
  }

  static warning(message) {
    console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
  }

  static error(message) {
    console.log(`${colors.red}❌${colors.reset} ${message}`);
  }

  static step(step, total, message) {
    console.log(`${colors.cyan}[${step}/${total}]${colors.reset} ${message}`);
  }

  static header(message) {
    console.log(`\n${colors.bright}${colors.magenta}🤖 ${message}${colors.reset}\n`);
  }
}

/**
 * Component analyzer for extracting metadata
 */
class ComponentAnalyzer {
  constructor() {
    this.componentPatterns = {
      interface: /interface\s+(\w+Props)\s*{([^}]*)}/g,
      component: /(?:const|export\s+const)\s+(\w+)\s*=.*?forwardRef|(?:const|export\s+const)\s+(\w+)\s*=.*?\(/g,
      imports: /import\s+.*?from\s+['"]([^'"]*)['"]/g,
      exports: /export\s*{([^}]*)}/g,
      variants: /variant\s*[?:].*?['"](\w+)['"]|variant.*?=.*?['"](\w+)['"]/g,
      props: /(\w+)[?:]:\s*([^;,\n]+)/g
    };
  }

  /**
   * Analyze component file and extract metadata
   */
  analyzeComponent(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const componentName = this.extractComponentName(filePath);
      
      return {
        name: componentName,
        path: filePath,
        content,
        interfaces: this.extractInterfaces(content),
        props: this.extractProps(content),
        imports: this.extractImports(content),
        exports: this.extractExports(content),
        variants: this.extractVariants(content),
        complexity: this.calculateComplexity(content),
        category: this.determineCategory(filePath),
        hasStories: this.hasStorybookStories(filePath),
        hasTests: this.hasTestFile(filePath)
      };
    } catch (error) {
      Logger.error(`Failed to analyze component ${filePath}: ${error.message}`);
      return null;
    }
  }

  extractComponentName(filePath) {
    const fileName = path.basename(filePath, path.extname(filePath));
    return fileName;
  }

  extractInterfaces(content) {
    const interfaces = [];
    let match;
    
    while ((match = this.componentPatterns.interface.exec(content)) !== null) {
      interfaces.push({
        name: match[1],
        content: match[2].trim()
      });
    }
    
    return interfaces;
  }

  extractProps(content) {
    const props = [];
    const interfaces = this.extractInterfaces(content);
    
    interfaces.forEach(interfaceItem => {
      let propMatch;
      while ((propMatch = this.componentPatterns.props.exec(interfaceItem.content)) !== null) {
        props.push({
          name: propMatch[1],
          type: propMatch[2].trim(),
          required: !propMatch[0].includes('?'),
          interface: interfaceItem.name
        });
      }
    });
    
    return props;
  }

  extractImports(content) {
    const imports = [];
    let match;
    
    while ((match = this.componentPatterns.imports.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    return imports;
  }

  extractExports(content) {
    const exports = [];
    let match;
    
    while ((match = this.componentPatterns.exports.exec(content)) !== null) {
      const exportItems = match[1].split(',').map(item => item.trim());
      exports.push(...exportItems);
    }
    
    return exports;
  }

  extractVariants(content) {
    const variants = [];
    let match;
    
    while ((match = this.componentPatterns.variants.exec(content)) !== null) {
      const variant = match[1] || match[2];
      if (variant && !variants.includes(variant)) {
        variants.push(variant);
      }
    }
    
    return variants;
  }

  calculateComplexity(content) {
    const lines = content.split('\n').length;
    const conditionals = (content.match(/if|else|switch|case|\?|&&|\|\|/g) || []).length;
    const functions = (content.match(/const\s+\w+\s*=|function\s+\w+/g) || []).length;
    
    const score = Math.min(100, (lines / 10) + (conditionals * 2) + (functions * 3));
    
    if (score < 20) return 'simple';
    if (score < 50) return 'medium';
    if (score < 80) return 'complex';
    return 'very-complex';
  }

  determineCategory(filePath) {
    const pathParts = filePath.split(path.sep);
    
    if (pathParts.includes('core')) return 'core';
    if (pathParts.includes('forms')) return 'forms';
    if (pathParts.includes('layout')) return 'layout';
    if (pathParts.includes('feedback')) return 'feedback';
    if (pathParts.includes('navigation')) return 'navigation';
    if (pathParts.includes('data-display')) return 'data-display';
    if (pathParts.includes('surfaces')) return 'surfaces';
    
    return 'utility';
  }

  hasStorybookStories(filePath) {
    const storyFile = filePath.replace(/\.tsx?$/, '.stories.tsx');
    return fs.existsSync(storyFile);
  }

  hasTestFile(filePath) {
    const testFile = filePath.replace(/\.tsx?$/, '.test.tsx');
    return fs.existsSync(testFile);
  }
}

/**
 * Documentation generator for creating AI-friendly docs
 */
class DocumentationGenerator {
  constructor() {
    this.templates = {
      aiGuide: this.createAIGuideTemplate(),
      examples: this.createExamplesTemplate(),
      readme: this.createReadmeTemplate()
    };
  }

  /**
   * Generate AI guide documentation
   */
  generateAIGuide(analysis) {
    const template = this.templates.aiGuide;
    
    return template
      .replace(/{{COMPONENT_NAME}}/g, analysis.name)
      .replace(/{{CATEGORY}}/g, analysis.category)
      .replace(/{{COMPLEXITY}}/g, analysis.complexity)
      .replace(/{{PROPS_LIST}}/g, this.generatePropsList(analysis.props))
      .replace(/{{VARIANTS_LIST}}/g, this.generateVariantsList(analysis.variants))
      .replace(/{{IMPLEMENTATION_GUIDE}}/g, this.generateImplementationGuide(analysis))
      .replace(/{{COMMON_MISTAKES}}/g, this.generateCommonMistakes(analysis))
      .replace(/{{QUALITY_CHECKLIST}}/g, this.generateQualityChecklist(analysis))
      .replace(/{{TESTING_PATTERNS}}/g, this.generateTestingPatterns(analysis))
      .replace(/{{AI_RECOMMENDATIONS}}/g, this.generateAIRecommendations(analysis));
  }

  /**
   * Generate examples documentation
   */
  generateExamples(analysis) {
    const template = this.templates.examples;
    
    return template
      .replace(/{{COMPONENT_NAME}}/g, analysis.name)
      .replace(/{{BASIC_EXAMPLE}}/g, this.generateBasicExample(analysis))
      .replace(/{{ADVANCED_EXAMPLES}}/g, this.generateAdvancedExamples(analysis))
      .replace(/{{INTEGRATION_EXAMPLES}}/g, this.generateIntegrationExamples(analysis))
      .replace(/{{EDGE_CASES}}/g, this.generateEdgeCases(analysis))
      .replace(/{{PERFORMANCE_EXAMPLES}}/g, this.generatePerformanceExamples(analysis))
      .replace(/{{ACCESSIBILITY_EXAMPLES}}/g, this.generateAccessibilityExamples(analysis));
  }

  /**
   * Generate README documentation
   */
  generateReadme(analysis) {
    const template = this.templates.readme;
    
    return template
      .replace(/{{COMPONENT_NAME}}/g, analysis.name)
      .replace(/{{DESCRIPTION}}/g, this.generateDescription(analysis))
      .replace(/{{FEATURES_LIST}}/g, this.generateFeaturesList(analysis))
      .replace(/{{QUICK_START}}/g, this.generateQuickStart(analysis))
      .replace(/{{API_REFERENCE}}/g, this.generateAPIReference(analysis))
      .replace(/{{EXAMPLES_SECTION}}/g, this.generateExamplesSection(analysis))
      .replace(/{{ACCESSIBILITY_SECTION}}/g, this.generateAccessibilitySection(analysis));
  }

  // Template creation methods

  createAIGuideTemplate() {
    return `# 🤖 AI Coding Guide: {{COMPONENT_NAME}}

## Component Overview

**Category**: {{CATEGORY}}  
**Complexity**: {{COMPLEXITY}}  
**AI Suitability**: High - Well-structured for AI development

## Quick AI Reference

### Props Interface
{{PROPS_LIST}}

### Available Variants
{{VARIANTS_LIST}}

## AI Implementation Guide

{{IMPLEMENTATION_GUIDE}}

## Common AI Coding Mistakes

{{COMMON_MISTAKES}}

## AI Quality Checklist

{{QUALITY_CHECKLIST}}

## AI Testing Patterns

{{TESTING_PATTERNS}}

## AI Recommendations

{{AI_RECOMMENDATIONS}}

---

*This guide is optimized for AI-assisted development. Follow these patterns for consistent, high-quality component implementation.*
`;
  }

  createExamplesTemplate() {
    return `# 📖 {{COMPONENT_NAME}} Examples

## Basic Usage

{{BASIC_EXAMPLE}}

## Advanced Examples

{{ADVANCED_EXAMPLES}}

## Integration Examples

{{INTEGRATION_EXAMPLES}}

## Edge Cases

{{EDGE_CASES}}

## Performance Optimization Examples

{{PERFORMANCE_EXAMPLES}}

## Accessibility Examples

{{ACCESSIBILITY_EXAMPLES}}

---

*These examples demonstrate real-world usage patterns and best practices for the {{COMPONENT_NAME}} component.*
`;
  }

  createReadmeTemplate() {
    return `# {{COMPONENT_NAME}}

{{DESCRIPTION}}

## Features

{{FEATURES_LIST}}

## Quick Start

{{QUICK_START}}

## API Reference

{{API_REFERENCE}}

## Examples

{{EXAMPLES_SECTION}}

## Accessibility

{{ACCESSIBILITY_SECTION}}

## Related Components

- [Button](../Button/README.md) - For interactive actions
- [TextField](../../forms/TextField/README.md) - For form inputs
- [Card](../../data-display/Card/README.md) - For content containers

---

*Part of the AI-Friendly Material-UI Component Library*
`;
  }

  // Content generation methods

  generatePropsList(props) {
    if (!props.length) return 'No specific props defined.';
    
    return props.map(prop => 
      `- **\`${prop.name}\`** (\`${prop.type}\`)${prop.required ? ' - Required' : ' - Optional'}`
    ).join('\n');
  }

  generateVariantsList(variants) {
    if (!variants.length) return 'No specific variants defined.';
    
    return variants.map(variant => `- \`${variant}\``).join('\n');
  }

  generateImplementationGuide(analysis) {
    return `### Step-by-Step Implementation

1. **Import the component**:
   \`\`\`typescript
   import { ${analysis.name} } from '@/components/${analysis.category}/${analysis.name}';
   \`\`\`

2. **Define props interface** (if extending):
   \`\`\`typescript
   interface My${analysis.name}Props extends ${analysis.name}Props {
     // Additional props
   }
   \`\`\`

3. **Implement with proper TypeScript**:
   \`\`\`typescript
   const My${analysis.name} = (props: My${analysis.name}Props) => {
     return <${analysis.name} {...props} />;
   };
   \`\`\`

### AI-Specific Guidelines

- Always use TypeScript strict mode
- Implement proper prop validation
- Include accessibility attributes
- Follow component naming conventions
- Use absolute imports with @ prefix`;
  }

  generateCommonMistakes(analysis) {
    return `### Mistakes to Avoid

1. **❌ Using default exports**
   \`\`\`typescript
   // Wrong
   export default ${analysis.name};
   \`\`\`
   
   **✅ Use named exports**
   \`\`\`typescript
   // Correct
   export { ${analysis.name} };
   \`\`\`

2. **❌ Missing TypeScript types**
   \`\`\`typescript
   // Wrong
   const props: any = { ... };
   \`\`\`
   
   **✅ Proper typing**
   \`\`\`typescript
   // Correct
   const props: ${analysis.name}Props = { ... };
   \`\`\`

3. **❌ Inline styles without theme**
   \`\`\`typescript
   // Wrong
   <${analysis.name} style={{ color: 'red' }} />
   \`\`\`
   
   **✅ Theme-based styling**
   \`\`\`typescript
   // Correct
   <${analysis.name} sx={{ color: 'error.main' }} />
   \`\`\`

4. **❌ Missing accessibility attributes**
   \`\`\`typescript
   // Wrong
   <${analysis.name} onClick={handler} />
   \`\`\`
   
   **✅ Proper accessibility**
   \`\`\`typescript
   // Correct
   <${analysis.name} 
     onClick={handler}
     aria-label="Descriptive action"
     role="button"
   />
   \`\`\``;
  }

  generateQualityChecklist(analysis) {
    return `### Pre-Implementation Checklist

- [ ] Component follows naming conventions (PascalCase)
- [ ] Props interface is properly typed with \`${analysis.name}Props\`
- [ ] Component uses named exports only
- [ ] Absolute imports are used (\`@/components/...\`)
- [ ] Theme integration is implemented
- [ ] Accessibility attributes are included
- [ ] Component is responsive
- [ ] Error boundaries are considered
- [ ] Performance optimizations are applied

### Code Quality Checklist

- [ ] TypeScript strict mode compliance
- [ ] No \`any\` types used
- [ ] Proper error handling
- [ ] Consistent code formatting
- [ ] JSDoc documentation added
- [ ] Component is testable
- [ ] Storybook stories created
- [ ] Accessibility tested

### Performance Checklist

- [ ] React.memo used if appropriate
- [ ] Expensive operations memoized
- [ ] Bundle size impact considered
- [ ] Re-render optimization implemented
- [ ] Props destructuring optimized`;
  }

  generateTestingPatterns(analysis) {
    return `### Recommended Testing Approach

1. **Unit Tests**:
   \`\`\`typescript
   import { render, screen } from '@testing-library/react';
   import { ${analysis.name} } from './${analysis.name}';
   
   describe('${analysis.name}', () => {
     it('renders with default props', () => {
       render(<${analysis.name} />);
       expect(screen.getByRole('...')).toBeInTheDocument();
     });
   });
   \`\`\`

2. **Props Testing**:
   \`\`\`typescript
   it('handles all prop combinations', () => {
     const props: ${analysis.name}Props = {
       // Test all required props
     };
     render(<${analysis.name} {...props} />);
   });
   \`\`\`

3. **Accessibility Testing**:
   \`\`\`typescript
   import { axe, toHaveNoViolations } from 'jest-axe';
   
   it('meets accessibility standards', async () => {
     const { container } = render(<${analysis.name} />);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   \`\`\`

4. **Interaction Testing**:
   \`\`\`typescript
   import userEvent from '@testing-library/user-event';
   
   it('handles user interactions', async () => {
     const user = userEvent.setup();
     const handleClick = vi.fn();
     render(<${analysis.name} onClick={handleClick} />);
     
     await user.click(screen.getByRole('...'));
     expect(handleClick).toHaveBeenCalled();
   });
   \`\`\``;
  }

  generateAIRecommendations(analysis) {
    const complexity = analysis.complexity;
    const hasTests = analysis.hasTests;
    const hasStories = analysis.hasStories;
    
    let recommendations = [];
    
    if (complexity === 'very-complex') {
      recommendations.push('🔍 **High Complexity Detected**: Consider breaking down into smaller components');
    }
    
    if (!hasTests) {
      recommendations.push('🧪 **Missing Tests**: Implement comprehensive test suite with >95% coverage');
    }
    
    if (!hasStories) {
      recommendations.push('📚 **Missing Storybook**: Create comprehensive Storybook stories for documentation');
    }
    
    recommendations.push('⚡ **Performance**: Use React.memo and useMemo for optimization');
    recommendations.push('♿ **Accessibility**: Ensure WCAG 2.1 AA compliance');
    recommendations.push('🎨 **Theming**: Leverage theme system for consistent styling');
    
    return recommendations.join('\n');
  }

  generateBasicExample(analysis) {
    return `\`\`\`typescript
import { ${analysis.name} } from '@/components/${analysis.category}/${analysis.name}';

// Basic usage
const Example = () => {
  return (
    <${analysis.name}>
      Basic ${analysis.name} example
    </${analysis.name}>
  );
};
\`\`\``;
  }

  generateAdvancedExamples(analysis) {
    const variants = analysis.variants.length > 0 ? analysis.variants[0] : 'primary';
    
    return `\`\`\`typescript
// Advanced configuration
const AdvancedExample = () => {
  const [value, setValue] = useState('');
  
  return (
    <${analysis.name}
      variant="${variants}"
      disabled={false}
      onChange={(e) => setValue(e.target.value)}
      sx={{
        borderRadius: 2,
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      Advanced ${analysis.name}
    </${analysis.name}>
  );
};
\`\`\``;
  }

  generateIntegrationExamples(analysis) {
    return `\`\`\`typescript
// Integration with form libraries
import { useController, Control } from 'react-hook-form';

interface FormIntegrationProps {
  name: string;
  control: Control;
}

const FormIntegration = ({ name, control }: FormIntegrationProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <${analysis.name}
      {...field}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};
\`\`\``;
  }

  generateEdgeCases(analysis) {
    return `\`\`\`typescript
// Edge case: Empty states
const EmptyState = () => (
  <${analysis.name} disabled>
    No content available
  </${analysis.name}>
);

// Edge case: Error states
const ErrorState = () => (
  <${analysis.name} 
    error
    helperText="Something went wrong"
  />
);

// Edge case: Loading states
const LoadingState = () => (
  <${analysis.name} 
    loading
    disabled
  />
);
\`\`\``;
  }

  generatePerformanceExamples(analysis) {
    return `\`\`\`typescript
// Memoized component for performance
const Optimized${analysis.name} = React.memo((props: ${analysis.name}Props) => {
  const memoizedValue = useMemo(() => {
    // Expensive calculation
    return heavyComputation(props.value);
  }, [props.value]);

  return (
    <${analysis.name} 
      {...props}
      value={memoizedValue}
    />
  );
});

// Lazy loading for large lists
const LazyList = () => {
  return (
    <VirtualizedList
      itemCount={1000}
      renderItem={({ index }) => (
        <${analysis.name} key={index}>
          Item {index}
        </${analysis.name}>
      )}
    />
  );
};
\`\`\``;
  }

  generateAccessibilityExamples(analysis) {
    return `\`\`\`typescript
// Full accessibility implementation
const AccessibleExample = () => {
  return (
    <${analysis.name}
      aria-label="Descriptive label for screen readers"
      aria-describedby="helper-text"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleAction();
        }
      }}
    >
      Accessible ${analysis.name}
    </${analysis.name}>
  );
};

// High contrast mode support
const HighContrastExample = () => {
  return (
    <${analysis.name}
      sx={{
        '@media (prefers-contrast: high)': {
          borderWidth: 2,
          borderColor: 'text.primary',
        },
      }}
    >
      High contrast support
    </${analysis.name}>
  );
};
\`\`\``;
  }

  generateDescription(analysis) {
    return `The ${analysis.name} component is a ${analysis.complexity} ${analysis.category} component that provides [brief description of functionality]. It's built with accessibility, performance, and developer experience in mind.`;
  }

  generateFeaturesList(analysis) {
    const features = [
      '✅ TypeScript strict mode support',
      '✅ Theme integration with Material-UI',
      '✅ WCAG 2.1 AA accessibility compliance',
      '✅ Responsive design support',
      '✅ Comprehensive Storybook documentation',
      '✅ Performance optimized with React.memo'
    ];

    if (analysis.variants.length > 0) {
      features.push(`✅ Multiple variants: ${analysis.variants.join(', ')}`);
    }

    if (analysis.hasTests) {
      features.push('✅ Comprehensive test coverage');
    }

    return features.join('\n');
  }

  generateQuickStart(analysis) {
    return `\`\`\`typescript
import { ${analysis.name} } from '@/components/${analysis.category}/${analysis.name}';

const App = () => {
  return (
    <${analysis.name}>
      Hello World
    </${analysis.name}>
  );
};
\`\`\``;
  }

  generateAPIReference(analysis) {
    if (!analysis.props.length) {
      return 'No specific props documented. Extends standard HTML attributes.';
    }

    return `
### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
${analysis.props.map(prop => 
  `| \`${prop.name}\` | \`${prop.type}\` | - | ${prop.required ? 'Required' : 'Optional'} prop |`
).join('\n')}
`;
  }

  generateExamplesSection(analysis) {
    return `See [Examples](${analysis.name}.examples.md) for comprehensive usage examples including:

- Basic usage patterns
- Advanced configurations
- Integration with forms
- Performance optimization
- Accessibility implementation`;
  }

  generateAccessibilitySection(analysis) {
    return `This component follows WCAG 2.1 AA guidelines and includes:

- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management
- Proper ARIA attributes

See [AI Guide](${analysis.name}.ai-guide.md) for implementation details.`;
  }
}

/**
 * File manager for documentation operations
 */
class DocumentationFileManager {
  constructor() {
    this.analyzer = new ComponentAnalyzer();
    this.generator = new DocumentationGenerator();
  }

  /**
   * Find all component files in the project
   */
  findComponentFiles() {
    const componentsDir = path.join(process.cwd(), 'src', 'components');
    
    if (!fs.existsSync(componentsDir)) {
      Logger.error('Components directory not found');
      return [];
    }

    return this.findFilesRecursively(componentsDir, /\.tsx$/)
      .filter(file => !file.includes('.stories.') && !file.includes('.test.'))
      .filter(file => !file.includes('index.ts'));
  }

  findFilesRecursively(dir, pattern) {
    let results = [];
    
    try {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          results = results.concat(this.findFilesRecursively(filePath, pattern));
        } else if (pattern.test(file)) {
          results.push(filePath);
        }
      }
    } catch (error) {
      Logger.warning(`Could not read directory ${dir}: ${error.message}`);
    }
    
    return results;
  }

  /**
   * Generate documentation for a single component
   */
  generateDocumentationForComponent(filePath) {
    Logger.info(`Analyzing component: ${path.relative(process.cwd(), filePath)}`);
    
    const analysis = this.analyzer.analyzeComponent(filePath);
    if (!analysis) {
      return false;
    }

    const componentDir = path.dirname(filePath);
    
    try {
      // Generate AI guide
      const aiGuide = this.generator.generateAIGuide(analysis);
      const aiGuidePath = path.join(componentDir, `${analysis.name}.ai-guide.md`);
      fs.writeFileSync(aiGuidePath, aiGuide);
      Logger.success(`Generated AI guide: ${analysis.name}.ai-guide.md`);

      // Generate examples
      const examples = this.generator.generateExamples(analysis);
      const examplesPath = path.join(componentDir, `${analysis.name}.examples.md`);
      fs.writeFileSync(examplesPath, examples);
      Logger.success(`Generated examples: ${analysis.name}.examples.md`);

      // Generate README
      const readme = this.generator.generateReadme(analysis);
      const readmePath = path.join(componentDir, 'README.md');
      fs.writeFileSync(readmePath, readme);
      Logger.success(`Generated README: README.md`);

      return true;
    } catch (error) {
      Logger.error(`Failed to generate documentation for ${analysis.name}: ${error.message}`);
      return false;
    }
  }

  /**
   * Generate documentation for all components
   */
  generateAllDocumentation() {
    const componentFiles = this.findComponentFiles();
    
    if (componentFiles.length === 0) {
      Logger.warning('No component files found');
      return;
    }

    Logger.header(`Generating AI Documentation for ${componentFiles.length} components`);

    let successCount = 0;
    let errorCount = 0;

    componentFiles.forEach((filePath, index) => {
      Logger.step(index + 1, componentFiles.length, `Processing ${path.basename(filePath)}`);
      
      if (this.generateDocumentationForComponent(filePath)) {
        successCount++;
      } else {
        errorCount++;
      }
    });

    Logger.header('Documentation Generation Complete');
    Logger.success(`Successfully generated documentation for ${successCount} components`);
    
    if (errorCount > 0) {
      Logger.warning(`Failed to generate documentation for ${errorCount} components`);
    }

    // Generate summary report
    this.generateSummaryReport(componentFiles.length, successCount, errorCount);
  }

  /**
   * Generate summary report
   */
  generateSummaryReport(total, success, errors) {
    const timestamp = new Date().toISOString();
    const report = {
      timestamp,
      total,
      success,
      errors,
      successRate: ((success / total) * 100).toFixed(1)
    };

    const reportPath = path.join(process.cwd(), 'ai-docs-generation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    Logger.info(`Generation report saved to: ai-docs-generation-report.json`);
    Logger.info(`Success rate: ${report.successRate}%`);
  }

  /**
   * Update existing documentation
   */
  updateDocumentation(componentPath) {
    if (!fs.existsSync(componentPath)) {
      Logger.error(`Component file not found: ${componentPath}`);
      return false;
    }

    Logger.info(`Updating documentation for: ${path.basename(componentPath)}`);
    return this.generateDocumentationForComponent(componentPath);
  }
}

/**
 * Main execution function
 */
function main() {
  const args = process.argv.slice(2);
  const fileManager = new DocumentationFileManager();

  // Handle command line arguments
  if (args.length === 0) {
    // Generate all documentation
    fileManager.generateAllDocumentation();
  } else if (args[0] === '--component' && args[1]) {
    // Generate documentation for specific component
    const componentPath = path.resolve(args[1]);
    fileManager.updateDocumentation(componentPath);
  } else if (args[0] === '--help') {
    console.log(`
${colors.bright}🤖 AI Documentation Generator${colors.reset}

Usage:
  node generate-ai-docs.js                     Generate docs for all components
  node generate-ai-docs.js --component <path>  Generate docs for specific component
  node generate-ai-docs.js --help              Show this help message

Examples:
  node generate-ai-docs.js
  node generate-ai-docs.js --component src/components/core/Button/Button.tsx

Generated files:
  - ComponentName.ai-guide.md    AI-specific implementation guide
  - ComponentName.examples.md    Comprehensive usage examples
  - README.md                    General component documentation
`);
  } else {
    Logger.error('Invalid arguments. Use --help for usage information.');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  try {
    main();
  } catch (error) {
    Logger.error(`Script execution failed: ${error.message}`);
    process.exit(1);
  }
}