#!/usr/bin/env node

/**
 * @fileoverview AI Build Component Automation Script
 * @description Orchestrates the full AI workflow for a given component name and type.
 * If the component needs to be created, use the Senior Engineer workflow to generate a specification/checklist doc first.
 * This doc is then used and updated as you progress in the implementation (docs, tests, stories, validation).
 * For existing components, you can skip the first step and just run docs/tests/stories/validation.
 *
 * Usage:
 *   node scripts/ai-build-component.cjs <ComponentName> [ComponentType] [ComponentPath]
 *
 * Examples:
 *   node scripts/ai-build-component.cjs FormControl
 *   node scripts/ai-build-component.cjs Button core
 *   node scripts/ai-build-component.cjs Card data-display src/components/data-display/Card/Card.tsx
 *
 * @author dilip.sm.yadav@gmail.com
 */

const { execSync } = require('child_process');
const path = require('path');

function runStep(description, command) {
  console.log(`\n\u25B6️ ${description}`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`\u2705 ${description} complete.`);
  } catch (err) {
    console.error(`\u274C ${description} failed.`);
    process.exit(1);
  }
}

function printUsage() {
  console.log(`\nUsage: node scripts/ai-build-component.cjs <ComponentName> [ComponentType] [ComponentPath]\n`);
  console.log('  <ComponentName>   Name of the component (e.g., FormControl)');
  console.log('  [ComponentType]   (Optional) core, forms, layout, feedback, navigation, data-display, surfaces (default: forms)');
  console.log('  [ComponentPath]   (Optional) Custom path to the component .tsx file');
  console.log('\nExamples:');
  console.log('  node scripts/ai-build-component.cjs FormControl');
  console.log('  node scripts/ai-build-component.cjs Button core');
  console.log('  node scripts/ai-build-component.cjs Card data-display src/components/data-display/Card/Card.tsx');
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    printUsage();
    process.exit(1);
  }
  const componentName = args[0];
  const componentType = args[1] || 'forms';
  const validTypes = ['core', 'forms', 'layout', 'feedback', 'navigation', 'data-display', 'surfaces'];
  if (args[1] && !validTypes.includes(componentType)) {
    console.warn(`Unknown component type '${componentType}'. Using as custom type.`);
  }
  const componentPath = args[2] || `src/components/${componentType}/${componentName}/${componentName}.tsx`;

  // 1. AI Senior Engineer workflow (for new components)
  runStep(
    `AI Senior Engineer analysis for ${componentName}`,
    `node scripts/ai-senior-engineer.cjs --task "Create ${componentName}" "Wrapper for MUI ${componentName} with full accessibility, theming, and story coverage"`
  );

  // 2. Documentation generation (always use yarn ai:docs)
  runStep(
    `AI documentation generation for ${componentName}`,
    `yarn ai:docs --component ${componentPath}`
  );

  // 3. Test generation
  runStep(
    `AI test generation for ${componentName}`,
    `yarn ai:test:generate`
  );

  // 4. Story generation (if available)
  try {
    runStep(
      `AI story generation for ${componentName}`,
      `yarn gen:stories`
    );
  } catch (err) {
    console.warn('Story generation step skipped (gen:stories not available).');
  }

  // 5. Validation pipeline
  runStep('AI code validation', 'yarn ai:validate');
  runStep('AI Storybook runtime validation', 'yarn ai:validate:storybook');
  runStep('AI story coverage validation', 'yarn ai:validate:coverage');
  runStep('AI UX pattern validation', 'yarn ai:validate:ux');

  console.log(`\n\u2728 All steps complete for ${componentName}!`);
}

main(); 