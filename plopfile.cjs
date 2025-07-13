/**
 * @fileoverview AI-Enhanced Plop Code Generator Configuration
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * This configuration provides AI-friendly code generation templates for
 * rapid component, hook, and pattern creation with consistent structure.
 */

const fs = require('fs');
const path = require('path');

module.exports = function (plop) {
  // Set custom helpers
  plop.setHelper('capitalize', (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  plop.setHelper('camelCase', (text) => {
    return text.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  });

  plop.setHelper('constantCase', (text) => {
    return text.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '');
  });

  // AI-Enhanced Component Generator
  plop.setGenerator('component', {
    description: '🤖 AI-Enhanced Component Generator with comprehensive structure',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
        validate: (value) => {
          if (!value) return 'Component name is required';
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
            return 'Component name must be in PascalCase (e.g., Button, TextField)';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'category',
        message: 'Component category:',
        choices: [
          { name: 'Core (Button, Chip, etc.)', value: 'core' },
          { name: 'Forms (TextField, Select, etc.)', value: 'forms' },
          { name: 'Layout (Container, Grid, etc.)', value: 'layout' },
          { name: 'Feedback (Alert, Snackbar, etc.)', value: 'feedback' },
          { name: 'Navigation (Tabs, Menu, etc.)', value: 'navigation' },
          { name: 'Data Display (Table, Card, etc.)', value: 'data-display' },
          { name: 'Surfaces (Modal, Dialog, etc.)', value: 'surfaces' }
        ]
      },
      {
        type: 'list',
        name: 'complexity',
        message: 'Component complexity:',
        choices: [
          { name: 'Simple - Basic component with minimal props', value: 'simple' },
          { name: 'Medium - Standard component with variants', value: 'medium' },
          { name: 'Complex - Advanced component with multiple features', value: 'complex' }
        ],
        default: 'medium'
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Select component features:',
        choices: [
          { name: 'Multiple variants', value: 'variants', checked: true },
          { name: 'Loading states', value: 'loading' },
          { name: 'Icon support', value: 'icons' },
          { name: 'Form integration', value: 'forms' },
          { name: 'Animation support', value: 'animation' },
          { name: 'Responsive design', value: 'responsive', checked: true },
          { name: 'Dark theme optimized', value: 'darkTheme', checked: true },
          { name: 'Accessibility enhanced', value: 'a11y', checked: true }
        ]
      },
      {
        type: 'confirm',
        name: 'generateTests',
        message: 'Generate test file?',
        default: true
      },
      {
        type: 'confirm',
        name: 'generateStories',
        message: 'Generate Storybook stories?',
        default: true
      },
      {
        type: 'confirm',
        name: 'generateDocs',
        message: 'Generate AI documentation?',
        default: true
      }
    ],
    actions: (data) => {
      const componentPath = `src/components/{{category}}/{{name}}`;
      const actions = [];

      // Main component file
      actions.push({
        type: 'add',
        path: `${componentPath}/{{name}}.tsx`,
        templateFile: 'templates/component/Component.tsx.hbs',
        data
      });

      // Types file
      actions.push({
        type: 'add',
        path: `${componentPath}/{{name}}.types.ts`,
        templateFile: 'templates/component/Component.types.ts.hbs',
        data
      });

      // Styles file
      actions.push({
        type: 'add',
        path: `${componentPath}/{{name}}.styles.ts`,
        templateFile: 'templates/component/Component.styles.ts.hbs',
        data
      });

      // Constants file
      actions.push({
        type: 'add',
        path: `${componentPath}/{{name}}.constants.ts`,
        templateFile: 'templates/component/Component.constants.ts.hbs',
        data
      });

      // Index file
      actions.push({
        type: 'add',
        path: `${componentPath}/index.ts`,
        templateFile: 'templates/component/index.ts.hbs',
        data
      });

      // Test file
      if (data.generateTests) {
        actions.push({
          type: 'add',
          path: `${componentPath}/{{name}}.test.tsx`,
          templateFile: 'templates/component/Component.test.tsx.hbs',
          data
        });
      }

      // Storybook stories
      if (data.generateStories) {
        actions.push({
          type: 'add',
          path: `${componentPath}/{{name}}.stories.tsx`,
          templateFile: 'templates/component/Component.stories.tsx.hbs',
          data
        });
      }

      // AI documentation
      if (data.generateDocs) {
        actions.push({
          type: 'add',
          path: `${componentPath}/{{name}}.md`,
          templateFile: 'templates/component/Component.md.hbs',
          data
        });

        actions.push({
          type: 'add',
          path: `${componentPath}/{{name}}.ai-guide.md`,
          templateFile: 'templates/component/Component.ai-guide.md.hbs',
          data
        });

        actions.push({
          type: 'add',
          path: `${componentPath}/{{name}}.examples.md`,
          templateFile: 'templates/component/Component.examples.md.hbs',
          data
        });
      }

      // Update category index
      actions.push({
        type: 'modify',
        path: `src/components/{{category}}/index.ts`,
        pattern: /(\/\/ PLOP_INJECT_EXPORT)/g,
        template: `export * from './{{name}}';\n$1`
      });

      // Update main components index
      actions.push({
        type: 'modify',
        path: 'src/components/index.ts',
        pattern: /(\/\/ PLOP_INJECT_EXPORT)/g,
        template: `export * from './{{category}}/{{name}}';\n$1`
      });

      return actions;
    }
  });

  // AI-Enhanced Hook Generator
  plop.setGenerator('hook', {
    description: '🪝 AI-Enhanced Custom Hook Generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name (without "use" prefix):',
        validate: (value) => {
          if (!value) return 'Hook name is required';
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
            return 'Hook name must be in PascalCase (e.g., LocalStorage, Debounce)';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'category',
        message: 'Hook category:',
        choices: [
          { name: 'State Management', value: 'state' },
          { name: 'Side Effects', value: 'effects' },
          { name: 'Performance', value: 'performance' },
          { name: 'UI/UX', value: 'ui' },
          { name: 'Data Fetching', value: 'data' },
          { name: 'Utilities', value: 'utilities' }
        ]
      },
      {
        type: 'input',
        name: 'description',
        message: 'Hook description:'
      },
      {
        type: 'confirm',
        name: 'generateTests',
        message: 'Generate test file?',
        default: true
      },
      {
        type: 'confirm',
        name: 'generateDocs',
        message: 'Generate documentation?',
        default: true
      }
    ],
    actions: (data) => {
      const hookPath = `src/hooks`;
      const hookName = `use${data.name}`;
      const actions = [];

      // Main hook file
      actions.push({
        type: 'add',
        path: `${hookPath}/${hookName}.ts`,
        templateFile: 'templates/hook/useHook.ts.hbs',
        data: { ...data, hookName }
      });

      // Test file
      if (data.generateTests) {
        actions.push({
          type: 'add',
          path: `${hookPath}/${hookName}.test.ts`,
          templateFile: 'templates/hook/useHook.test.ts.hbs',
          data: { ...data, hookName }
        });
      }

      // Documentation
      if (data.generateDocs) {
        actions.push({
          type: 'add',
          path: `${hookPath}/${hookName}.md`,
          templateFile: 'templates/hook/useHook.md.hbs',
          data: { ...data, hookName }
        });
      }

      // Update hooks index
      actions.push({
        type: 'modify',
        path: `${hookPath}/index.ts`,
        pattern: /(\/\/ PLOP_INJECT_EXPORT)/g,
        template: `export { ${hookName} } from './${hookName}';\n$1`
      });

      return actions;
    }
  });

  // AI Pattern Generator
  plop.setGenerator('pattern', {
    description: '🎨 AI Pattern Template Generator',
    prompts: [
      {
        type: 'list',
        name: 'patternType',
        message: 'Pattern type:',
        choices: [
          { name: 'Higher-Order Component (HOC)', value: 'hoc' },
          { name: 'Render Props Pattern', value: 'render-props' },
          { name: 'Compound Component', value: 'compound' },
          { name: 'Provider Pattern', value: 'provider' },
          { name: 'Custom Hook Pattern', value: 'custom-hook' }
        ]
      },
      {
        type: 'input',
        name: 'name',
        message: 'Pattern name:',
        validate: (value) => {
          if (!value) return 'Pattern name is required';
          return true;
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Pattern description:'
      }
    ],
    actions: (data) => {
      const actions = [];
      const patternPath = `src/patterns/${data.patternType}`;

      switch (data.patternType) {
        case 'hoc':
          actions.push({
            type: 'add',
            path: `${patternPath}/with{{name}}.tsx`,
            templateFile: 'templates/patterns/hoc.tsx.hbs',
            data
          });
          break;
        case 'render-props':
          actions.push({
            type: 'add',
            path: `${patternPath}/{{name}}Provider.tsx`,
            templateFile: 'templates/patterns/render-props.tsx.hbs',
            data
          });
          break;
        case 'compound':
          actions.push({
            type: 'add',
            path: `${patternPath}/{{name}}/index.tsx`,
            templateFile: 'templates/patterns/compound.tsx.hbs',
            data
          });
          break;
        case 'provider':
          actions.push({
            type: 'add',
            path: `${patternPath}/{{name}}Provider.tsx`,
            templateFile: 'templates/patterns/provider.tsx.hbs',
            data
          });
          break;
        case 'custom-hook':
          actions.push({
            type: 'add',
            path: `${patternPath}/use{{name}}.ts`,
            templateFile: 'templates/patterns/custom-hook.ts.hbs',
            data
          });
          break;
      }

      // Add documentation
      actions.push({
        type: 'add',
        path: `${patternPath}/{{name}}.pattern.md`,
        templateFile: 'templates/patterns/pattern.md.hbs',
        data
      });

      return actions;
    }
  });

  // Utility Generator
  plop.setGenerator('utility', {
    description: '🔧 Utility Function Generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Utility name (camelCase):',
        validate: (value) => {
          if (!value) return 'Utility name is required';
          if (!/^[a-z][a-zA-Z0-9]*$/.test(value)) {
            return 'Utility name must be in camelCase';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'category',
        message: 'Utility category:',
        choices: [
          { name: 'String manipulation', value: 'string' },
          { name: 'Array operations', value: 'array' },
          { name: 'Object utilities', value: 'object' },
          { name: 'Date/Time', value: 'date' },
          { name: 'Validation', value: 'validation' },
          { name: 'Performance', value: 'performance' },
          { name: 'Accessibility', value: 'accessibility' }
        ]
      },
      {
        type: 'input',
        name: 'description',
        message: 'Utility description:'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/utils/{{category}}/{{name}}.ts',
        templateFile: 'templates/utility/utility.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/utils/{{category}}/{{name}}.test.ts',
        templateFile: 'templates/utility/utility.test.ts.hbs'
      },
      {
        type: 'modify',
        path: 'src/utils/{{category}}/index.ts',
        pattern: /(\/\/ PLOP_INJECT_EXPORT)/g,
        template: `export { {{name}} } from './{{name}}';\n$1`
      }
    ]
  });

  // Theme Extension Generator
  plop.setGenerator('theme-extension', {
    description: '🎨 Theme Extension Generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Theme extension name:',
        validate: (value) => {
          if (!value) return 'Extension name is required';
          return true;
        }
      },
      {
        type: 'list',
        name: 'type',
        message: 'Extension type:',
        choices: [
          { name: 'Color palette', value: 'palette' },
          { name: 'Typography variant', value: 'typography' },
          { name: 'Component variant', value: 'component' },
          { name: 'Animation', value: 'animation' },
          { name: 'Gradient', value: 'gradient' }
        ]
      }
    ],
    actions: (data) => {
      const actions = [];
      const themePath = 'src/theme';

      switch (data.type) {
        case 'palette':
          actions.push({
            type: 'add',
            path: `${themePath}/palettes/{{name}}.ts`,
            templateFile: 'templates/theme/palette.ts.hbs',
            data
          });
          break;
        case 'typography':
          actions.push({
            type: 'modify',
            path: `${themePath}/typography.ts`,
            pattern: /(\/\/ PLOP_INJECT_VARIANT)/g,
            template: `  {{name}}: {\n    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',\n    fontSize: '1rem',\n    fontWeight: 400,\n    lineHeight: 1.5,\n    letterSpacing: '0em',\n  },\n$1`
          });
          break;
        case 'animation':
          actions.push({
            type: 'modify',
            path: `${themePath}/animations.ts`,
            pattern: /(\/\/ PLOP_INJECT_ANIMATION)/g,
            template: `  {{camelCase name}}: 'cubic-bezier(0.4, 0, 0.2, 1)',\n$1`
          });
          break;
      }

      return actions;
    }
  });

  // AI Workflow Generator
  plop.setGenerator('ai-workflow', {
    description: '🤖 AI Workflow Template Generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Workflow name:',
        validate: (value) => {
          if (!value) return 'Workflow name is required';
          return true;
        }
      },
      {
        type: 'list',
        name: 'type',
        message: 'Workflow type:',
        choices: [
          { name: 'Component Analysis', value: 'component-analysis' },
          { name: 'Code Generation', value: 'code-generation' },
          { name: 'Quality Validation', value: 'quality-validation' },
          { name: 'Documentation Generation', value: 'documentation' },
          { name: 'Performance Optimization', value: 'performance' }
        ]
      },
      {
        type: 'input',
        name: 'description',
        message: 'Workflow description:'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/ai-workflow/workflows/{{dashCase name}}.ts',
        templateFile: 'templates/ai-workflow/workflow.ts.hbs'
      },
      {
        type: 'add',
        path: 'src/ai-workflow/workflows/{{dashCase name}}.test.ts',
        templateFile: 'templates/ai-workflow/workflow.test.ts.hbs'
      }
    ]
  });

  // Helper to check if path exists
  plop.setHelper('pathExists', (path) => {
    return fs.existsSync(path);
  });

  // Helper to ensure directory exists
  plop.setActionType('ensureDir', (answers, config) => {
    const dir = plop.renderString(config.path, answers);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return `Created directory: ${dir}`;
  });

  // Custom action to update AI component registry
  plop.setActionType('updateAIRegistry', (answers, config) => {
    const registryPath = 'src/ai-context/component-registry.json';
    const registry = fs.existsSync(registryPath) 
      ? JSON.parse(fs.readFileSync(registryPath, 'utf8'))
      : { components: {}, lastUpdated: new Date().toISOString() };

    registry.components[answers.name] = {
      name: answers.name,
      category: answers.category,
      complexity: answers.complexity,
      features: answers.features,
      created: new Date().toISOString(),
      path: `src/components/${answers.category}/${answers.name}`
    };

    registry.lastUpdated = new Date().toISOString();

    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
    return `Updated AI component registry for ${answers.name}`;
  });

  // Add post-generation hook
  plop.setGenerator('component').actions.push({
    type: 'updateAIRegistry'
  });
};