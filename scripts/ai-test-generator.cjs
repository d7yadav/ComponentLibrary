#!/usr/bin/env node

/**
 * @fileoverview AI Test Generator Script
 * @description Automatically generates comprehensive test files for components
 * @author AI-Enhanced Development System
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

/**
 * Component Analysis Configuration
 */
const COMPONENT_CONFIGS = {
  Button: {
    category: 'core',
    complexity: 'medium',
    features: ['variants', 'icons', 'animation', 'responsive', 'darkTheme', 'a11y', 'loading'],
    role: 'button',
    variants: ['primary', 'secondary', 'tertiary', 'quaternary', 'gradient', 'glass', 'outline', 'text'],
    sizes: ['small', 'medium', 'large']
  },
  TextField: {
    category: 'forms',
    complexity: 'complex',
    features: ['variants', 'icons', 'forms', 'responsive', 'darkTheme', 'a11y', 'loading'],
    role: 'textbox',
    variants: ['filled', 'outlined', 'standard'],
    sizes: ['small', 'medium']
  },
  Card: {
    category: 'data-display',
    complexity: 'complex',
    features: ['variants', 'animation', 'responsive', 'darkTheme', 'a11y'],
    role: 'article',
    variants: ['elevated', 'outlined', 'filled', 'glass', 'gradient', 'interactive'],
    sizes: ['compact', 'comfortable', 'spacious']
  },
  CardActions: {
    category: 'data-display',
    complexity: 'simple',
    features: ['responsive', 'darkTheme', 'a11y'],
    role: 'group',
    variants: ['default'],
    sizes: ['medium']
  },
  CardContent: {
    category: 'data-display',
    complexity: 'simple',
    features: ['responsive', 'darkTheme', 'a11y'],
    role: 'region',
    variants: ['default'],
    sizes: ['medium']
  },
  CardHeader: {
    category: 'data-display',
    complexity: 'medium',
    features: ['icons', 'responsive', 'darkTheme', 'a11y'],
    role: 'banner',
    variants: ['default'],
    sizes: ['medium']
  },
  CardMedia: {
    category: 'data-display',
    complexity: 'medium',
    features: ['loading', 'responsive', 'darkTheme', 'a11y'],
    role: 'img',
    variants: ['default'],
    sizes: ['medium']
  },
  Container: {
    category: 'layout',
    complexity: 'medium',
    features: ['responsive', 'darkTheme', 'a11y'],
    role: 'main',
    variants: ['fluid', 'fixed', 'constrained'],
    sizes: ['small', 'medium', 'large']
  },
  Grid: {
    category: 'layout',
    complexity: 'complex',
    features: ['responsive', 'darkTheme', 'a11y'],
    role: 'grid',
    variants: ['container', 'item'],
    sizes: ['auto', 'true']
  },
  Stack: {
    category: 'layout',
    complexity: 'medium',
    features: ['responsive', 'darkTheme', 'a11y'],
    role: 'group',
    variants: ['vertical', 'horizontal'],
    sizes: ['small', 'medium', 'large']
  },
  Box: {
    category: 'layout',
    complexity: 'simple',
    features: ['responsive', 'darkTheme', 'a11y'],
    role: 'generic',
    variants: ['default'],
    sizes: ['auto']
  },
  Alert: {
    category: 'feedback',
    complexity: 'medium',
    features: ['variants', 'icons', 'responsive', 'darkTheme', 'a11y'],
    role: 'alert',
    variants: ['standard', 'outlined', 'filled'],
    severities: ['success', 'info', 'warning', 'error']
  },
  Snackbar: {
    category: 'feedback',
    complexity: 'medium',
    features: ['variants', 'responsive', 'darkTheme', 'a11y'],
    role: 'status',
    variants: ['default'],
    positions: ['top', 'bottom', 'left', 'right', 'center']
  },
  Progress: {
    category: 'feedback',
    complexity: 'medium',
    features: ['variants', 'animation', 'responsive', 'darkTheme', 'a11y'],
    role: 'progressbar',
    variants: ['determinate', 'indeterminate'],
    sizes: ['small', 'medium', 'large']
  },
  CircularProgress: {
    category: 'feedback',
    complexity: 'medium',
    features: ['variants', 'animation', 'responsive', 'darkTheme', 'a11y'],
    role: 'progressbar',
    variants: ['determinate', 'indeterminate'],
    sizes: ['small', 'medium', 'large']
  },
  LinearProgress: {
    category: 'feedback',
    complexity: 'medium',
    features: ['variants', 'animation', 'responsive', 'darkTheme', 'a11y'],
    role: 'progressbar',
    variants: ['determinate', 'indeterminate', 'buffer', 'query'],
    sizes: ['small', 'medium', 'large']
  },
  Loading: {
    category: 'feedback',
    complexity: 'complex',
    features: ['variants', 'animation', 'responsive', 'darkTheme', 'a11y'],
    role: 'status',
    variants: ['circular', 'dots', 'bars', 'pulse', 'bounce', 'ring', 'wave', 'ripple', 'skeleton'],
    sizes: ['small', 'medium', 'large']
  },
  Skeleton: {
    category: 'feedback',
    complexity: 'medium',
    features: ['variants', 'animation', 'responsive', 'darkTheme', 'a11y'],
    role: 'presentation',
    variants: ['text', 'rectangular', 'circular'],
    sizes: ['small', 'medium', 'large']
  },
  Tabs: {
    category: 'navigation',
    complexity: 'complex',
    features: ['variants', 'icons', 'responsive', 'darkTheme', 'a11y'],
    role: 'tablist',
    variants: ['standard', 'scrollable', 'fullWidth'],
    orientations: ['horizontal', 'vertical']
  },
  Breadcrumbs: {
    category: 'navigation',
    complexity: 'medium',
    features: ['icons', 'responsive', 'darkTheme', 'a11y'],
    role: 'navigation',
    variants: ['default'],
    sizes: ['small', 'medium', 'large']
  }
};

/**
 * Handlebars Template for Test Files
 */
const TEST_TEMPLATE = `/**
 * @fileoverview {{name}} Component Tests
 * @author AI Generated Tests - {{timestamp}}
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { {{name}} } from './{{name}}';
import type { {{name}}Props } from './{{name}}.types';
{{#if hasConstants}}
import { {{constantCase name}}_CONSTANTS } from './{{name}}.constants';
{{/if}}

// Add jest-axe matcher
expect.extend(toHaveNoViolations);

// Test theme
const testTheme = createTheme();

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
);

// Helper function to render component with theme
const renderWithTheme = (ui: React.ReactElement, options = {}) => {
  return render(ui, { wrapper: TestWrapper, ...options });
};

describe('{{name}} Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<{{name}}>Test content</{{name}}>);
      {{#if (eq role 'button')}}
      expect(screen.getByRole('button')).toBeInTheDocument();
      {{else if (eq role 'textbox')}}
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      {{else if (eq role 'generic')}}
      expect(screen.getByTestId('{{dashCase name}}-root')).toBeInTheDocument();
      {{else}}
      expect(screen.getByRole('{{role}}')).toBeInTheDocument();
      {{/if}}
    });

    it('renders children correctly', () => {
      const testContent = 'Test {{name}} Content';
      renderWithTheme(<{{name}}>{testContent}</{{name}}>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-{{dashCase name}}';
      renderWithTheme(
        <{{name}} data-testid={testId}>Test</{{name}}>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <{{name}} className={customClass}>Test</{{name}}>
      );
      {{#if (eq role 'generic')}}
      expect(screen.getByTestId('{{dashCase name}}-root')).toHaveClass(customClass);
      {{else}}
      expect(screen.getByRole('{{role}}')).toHaveClass(customClass);
      {{/if}}
    });
  });

  // Props testing
  describe('Props', () => {
    {{#if variants}}
    describe('variant prop', () => {
      const variants: {{name}}Props['variant'][] = [
        {{#each variants}}
        '{{this}}',
        {{/each}}
      ];

      variants.forEach((variant) => {
        it(\`renders \${variant} variant correctly\`, () => {
          renderWithTheme(
            <{{name}} variant={variant} data-testid="variant-test">
              {variant} variant
            </{{name}}>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });
    {{/if}}

    {{#if sizes}}
    describe('size prop', () => {
      const sizes: {{name}}Props['size'][] = [
        {{#each sizes}}
        '{{this}}',
        {{/each}}
      ];

      sizes.forEach((size) => {
        it(\`renders \${size} size correctly\`, () => {
          renderWithTheme(
            <{{name}} size={size} data-testid="size-test">
              {size} size
            </{{name}}>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });
    {{/if}}

    {{#if severities}}
    describe('severity prop', () => {
      const severities: {{name}}Props['severity'][] = [
        {{#each severities}}
        '{{this}}',
        {{/each}}
      ];

      severities.forEach((severity) => {
        it(\`renders \${severity} severity correctly\`, () => {
          renderWithTheme(
            <{{name}} severity={severity} data-testid="severity-test">
              {severity} alert
            </{{name}}>
          );
          const element = screen.getByTestId('severity-test');
          expect(element).toBeInTheDocument();
        });
      });
    });
    {{/if}}

    {{#if (includes features 'loading')}}
    it('handles loading state correctly', () => {
      renderWithTheme(
        <{{name}} loading data-testid="loading-test">
          Loading {{name}}
        </{{name}}>
      );
      
      const element = screen.getByTestId('loading-test');
      expect(element).toHaveAttribute('aria-busy', 'true');
    });
    {{/if}}

    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <{{name}} disabled onClick={handleClick} data-testid="disabled-test">
          Disabled {{name}}
        </{{name}}>
      );
      
      const element = screen.getByTestId('disabled-test');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    {{#if (eq role 'button')}}
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <{{name}} onClick={handleClick}>
          Clickable {{name}}
        </{{name}}>
      );
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation - Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <{{name}} onClick={handleClick}>
          Keyboard {{name}}
        </{{name}}>
      );
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation - Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <{{name}} onClick={handleClick}>
          Keyboard {{name}}
        </{{name}}>
      );
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    {{/if}}

    {{#if (eq role 'textbox')}}
    it('handles input changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      renderWithTheme(
        <{{name}} onChange={handleChange} />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test input');
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles focus and blur events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      
      renderWithTheme(
        <{{name}} onFocus={handleFocus} onBlur={handleBlur} />
      );
      
      const input = screen.getByRole('textbox');
      input.focus();
      expect(handleFocus).toHaveBeenCalled();
      
      input.blur();
      expect(handleBlur).toHaveBeenCalled();
    });
    {{/if}}
  });

  {{#if (includes features 'forms')}}
  // Form integration testing
  describe('Form Integration', () => {
    it('integrates with form libraries', () => {
      const handleChange = vi.fn();
      
      renderWithTheme(
        <{{name}} 
          name="test-field"
          value="test-value"
          onChange={handleChange}
        />
      );
      
      const element = screen.getByRole('{{role}}');
      expect(element).toHaveAttribute('name', 'test-field');
    });

    it('handles validation states', () => {
      renderWithTheme(
        <{{name}} 
          error
          errorText="Error message"
          helperText="Helper text"
        />
      );
      
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });
  {{/if}}

  {{#if (includes features 'icons')}}
  // Icon testing
  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it('renders start icon correctly', () => {
      renderWithTheme(
        <{{name}} startIcon={<TestIcon />}>
          With Start Icon
        </{{name}}>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders end icon correctly', () => {
      renderWithTheme(
        <{{name}} endIcon={<TestIcon />}>
          With End Icon
        </{{name}}>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });
  {{/if}}

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <{{name}}>Accessible {{name}}</{{name}}>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <{{name}} aria-label={ariaLabel}>
          {{name}} for screen readers
        </{{name}}>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<{{name}}>Keyboard {{name}}</{{name}}>);
      
      {{#if (eq role 'button')}}
      const element = screen.getByRole('button');
      expect(element).toHaveAttribute('tabIndex', '0');
      {{else if (eq role 'textbox')}}
      const element = screen.getByRole('textbox');
      expect(element).toHaveAttribute('tabIndex', '0');
      {{else}}
      const element = screen.getByRole('{{role}}');
      element.focus();
      expect(element).toHaveFocus();
      {{/if}}
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <{{name}} 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA {{name}}
        </{{name}}>
      );
      
      {{#if (eq role 'generic')}}
      const element = screen.getByTestId('{{dashCase name}}-root');
      {{else}}
      const element = screen.getByRole('{{role}}');
      {{/if}}
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          Mui{{name}}: {
            defaultProps: {
              {{#if variants}}
              variant: '{{variants.[0]}}',
              {{/if}}
            },
            styleOverrides: {
              root: {
                backgroundColor: 'rgb(255, 0, 0)',
              },
            },
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <{{name}} data-testid="themed-{{dashCase name}}">
            Themed {{name}}
          </{{name}}>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-{{dashCase name}}');
      expect(element).toBeInTheDocument();
    });

    it('supports dark mode', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      render(
        <ThemeProvider theme={darkTheme}>
          <{{name}}>Dark Mode {{name}}</{{name}}>
        </ThemeProvider>
      );

      {{#if (eq role 'generic')}}
      expect(screen.getByTestId('{{dashCase name}}-root')).toBeInTheDocument();
      {{else}}
      expect(screen.getByRole('{{role}}')).toBeInTheDocument();
      {{/if}}
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <{{name}} key={i}>{{name}} {i}</{{name}}>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      {{#if (eq role 'generic')}}
      expect(container.querySelectorAll('[data-testid*="{{dashCase name}}"]')).toHaveLength(100);
      {{else}}
      expect(container.querySelectorAll('[role="{{role}}"]')).toHaveLength(100);
      {{/if}}
    });

    {{#if (includes features 'animation')}}
    it('respects reduced motion preferences', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      renderWithTheme(
        <{{name}} animate={false}>
          No Animation {{name}}
        </{{name}}>
      );

      {{#if (eq role 'generic')}}
      expect(screen.getByTestId('{{dashCase name}}-root')).toBeInTheDocument();
      {{else}}
      expect(screen.getByRole('{{role}}')).toBeInTheDocument();
      {{/if}}
    });
    {{/if}}
  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<{{name}} />);
      {{#if (eq role 'generic')}}
      expect(screen.getByTestId('{{dashCase name}}-root')).toBeInTheDocument();
      {{else}}
      expect(screen.getByRole('{{role}}')).toBeInTheDocument();
      {{/if}}
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<{{name}}>{null}</{{name}}>);
      {{#if (eq role 'generic')}}
      expect(screen.getByTestId('{{dashCase name}}-root')).toBeInTheDocument();
      {{else}}
      expect(screen.getByRole('{{role}}')).toBeInTheDocument();
      {{/if}}
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <{{name}} 
          {{#if variants}}
          variant={undefined as any} 
          {{/if}}
          {{#if sizes}}
          size={undefined as any}
          {{/if}}
        >
          Undefined Props
        </{{name}}>
      );
      {{#if (eq role 'generic')}}
      expect(screen.getByTestId('{{dashCase name}}-root')).toBeInTheDocument();
      {{else}}
      expect(screen.getByRole('{{role}}')).toBeInTheDocument();
      {{/if}}
    });

    {{#if (eq complexity 'complex')}}
    it('handles complex configurations', () => {
      renderWithTheme(
        <{{name}}
          {{#if variants}}
          variant="{{variants.[0]}}"
          {{/if}}
          {{#if sizes}}
          size="{{sizes.[0]}}"
          {{/if}}
          disabled={false}
          {{#if (includes features 'loading')}}
          loading={false}
          {{/if}}
          {{#if (includes features 'animation')}}
          animate={true}
          {{/if}}
        >
          Complex {{name}}
        </{{name}}>
      );
      
      {{#if (eq role 'generic')}}
      expect(screen.getByTestId('{{dashCase name}}-root')).toBeInTheDocument();
      {{else}}
      expect(screen.getByRole('{{role}}')).toBeInTheDocument();
      {{/if}}
    });
    {{/if}}
  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <{{name}}>Default {{name}}</{{name}}>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    {{#if variants}}
    it('matches snapshot for all variants', () => {
      const variants: {{name}}Props['variant'][] = [
        {{#each variants}}
        '{{this}}',
        {{/each}}
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <{{name}} variant={variant}>{variant} {{name}}</{{name}}>
        );
        expect(container.firstChild).toMatchSnapshot(\`variant-\${variant}\`);
      });
    });
    {{/if}}
  });
});
`;

/**
 * Handlebars Helpers
 */
Handlebars.registerHelper('includes', function(array, value) {
  if (!Array.isArray(array)) return false;
  return array.includes(value);
});

Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

Handlebars.registerHelper('dashCase', function(str) {
  return str.replace(/([A-Z])/g, (match, letter) => `-${letter.toLowerCase()}`).replace(/^-/, '');
});

Handlebars.registerHelper('constantCase', function(str) {
  return str.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '');
});

/**
 * Generate test file for a component
 */
function generateTestFile(componentPath, componentName) {
  const config = COMPONENT_CONFIGS[componentName];
  if (!config) {
    console.warn(`⚠️  No configuration found for component: ${componentName}`);
    return false;
  }

  const testPath = path.join(componentPath, `${componentName}.test.tsx`);
  
  // Check if test file already exists
  if (fs.existsSync(testPath)) {
    console.log(`ℹ️  Test file already exists: ${testPath}`);
    return false;
  }

  // Check if constants file exists
  const constantsPath = path.join(componentPath, `${componentName}.constants.ts`);
  const hasConstants = fs.existsSync(constantsPath);

  // Prepare template data
  const templateData = {
    name: componentName,
    ...config,
    hasConstants,
    timestamp: new Date().toISOString().split('T')[0]
  };

  try {
    // Compile and render template
    const template = Handlebars.compile(TEST_TEMPLATE);
    const testContent = template(templateData);

    // Write test file
    fs.writeFileSync(testPath, testContent, 'utf8');
    console.log(`✅ Generated test file: ${testPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to generate test file for ${componentName}:`, error.message);
    return false;
  }
}

/**
 * Scan and generate tests for all components
 */
function generateAllTests() {
  console.log('🤖 AI Test Generator - Starting comprehensive test generation...\n');

  const componentsDir = 'src/components';
  let generated = 0;
  let skipped = 0;
  let errors = 0;

  // Find all component TypeScript files
  const componentFiles = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.tsx') && !item.includes('.stories') && !item.includes('.test')) {
        // Extract component name from file
        const componentName = path.basename(item, '.tsx');
        if (componentName && componentName[0] === componentName[0].toUpperCase()) {
          componentFiles.push({
            path: path.dirname(fullPath),
            name: componentName
          });
        }
      }
    }
  }

  scanDirectory(componentsDir);

  console.log(`📊 Found ${componentFiles.length} components to process\n`);

  // Generate test files
  for (const { path: componentPath, name: componentName } of componentFiles) {
    console.log(`🔄 Processing: ${componentName}`);
    
    try {
      const wasGenerated = generateTestFile(componentPath, componentName);
      if (wasGenerated) {
        generated++;
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${componentName}:`, error.message);
      errors++;
    }
  }

  // Summary
  console.log('\n📈 Test Generation Summary:');
  console.log(`✅ Generated: ${generated} test files`);
  console.log(`⏭️  Skipped: ${skipped} (already exist)`);
  console.log(`❌ Errors: ${errors}`);
  console.log(`📊 Total processed: ${componentFiles.length}`);

  if (generated > 0) {
    console.log('\n🎉 Test generation completed successfully!');
    console.log('📝 Next steps:');
    console.log('   1. Run: yarn test to execute all tests');
    console.log('   2. Run: yarn ai:validate to validate code quality');
    console.log('   3. Review and customize generated tests as needed');
  }

  return { generated, skipped, errors, total: componentFiles.length };
}

/**
 * Main execution
 */
if (require.main === module) {
  // Check if running in correct directory
  if (!fs.existsSync('src/components')) {
    console.error('❌ Error: Must be run from project root directory');
    process.exit(1);
  }

  // Check if Handlebars is available
  try {
    require('handlebars');
  } catch (error) {
    console.error('❌ Error: Handlebars not found. Run: yarn add -D handlebars');
    process.exit(1);
  }

  generateAllTests();
}

module.exports = {
  generateTestFile,
  generateAllTests,
  COMPONENT_CONFIGS
};