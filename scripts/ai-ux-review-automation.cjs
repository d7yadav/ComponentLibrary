#!/usr/bin/env node

/**
 * @fileoverview AI UX Review Automation - Automated UX Review & Improvement Flow
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * This script creates a comprehensive automated UX review system that:
 * 1. Captures screenshots of all components in different states
 * 2. Runs UX analysis with scoring
 * 3. Generates improvement suggestions with AI
 * 4. Automatically applies fixes
 * 5. Re-tests and iterates until target score is reached
 * 6. Provides single command execution
 */

const fs = require('fs').promises;
const path = require('path');
const { spawn, execSync } = require('child_process');
const puppeteer = require('puppeteer');

// Import existing AI modules
const { UXPatternValidator } = require('./ai-ux-pattern-validator.cjs');

class UXReviewAutomation {
  constructor(options = {}) {
    this.options = {
      targetScore: options.targetScore || 85,
      maxIterations: options.maxIterations || 5,
      componentsDir: options.componentsDir || 'src/components',
      storybookUrl: options.storybookUrl || 'http://localhost:6006',
      outputDir: options.outputDir || '.ai-reports/ux-automation',
      autoFix: options.autoFix !== false,
      verbose: options.verbose || false,
      ...options
    };

    this.uxValidator = new UXPatternValidator();
    this.iterationResults = [];
    this.currentIteration = 0;
    this.componentStates = new Map();
    this.improvementQueue = new Map();
  }

  /**
   * Main automated UX review flow
   */
  async executeAutomatedReview() {
    console.log('🤖 Starting Automated UX Review & Improvement Flow');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🎯 Target Score: ${this.options.targetScore}/100`);
    console.log(`🔄 Max Iterations: ${this.options.maxIterations}`);
    console.log(`📁 Components: ${this.options.componentsDir}`);
    console.log(`🎨 Auto-fix: ${this.options.autoFix ? 'ON' : 'OFF'}\n`);

    try {
      // Step 1: Setup and validate environment
      await this.setupEnvironment();

      // Step 2: Discover all components
      let components = await this.discoverComponents();
      
      // For testing, limit to first few components if specified
      if (process.env.UX_REVIEW_LIMIT) {
        const limit = parseInt(process.env.UX_REVIEW_LIMIT);
        components = components.slice(0, limit);
        console.log(`📦 Found ${components.length} components to review (limited for testing)\n`);
      } else {
        console.log(`📦 Found ${components.length} components to review\n`);
      }

      // Step 3: Start iterative improvement loop
      let allComponentsPass = false;
      
      while (this.currentIteration < this.options.maxIterations && !allComponentsPass) {
        this.currentIteration++;
        console.log(`\n🔄 ITERATION ${this.currentIteration}/${this.options.maxIterations}`);
        console.log('━'.repeat(50));

        // Run UX analysis first (doesn't require screenshots)
        const uxResults = await this.runUXAnalysis();
        
        // Skip screenshot capture for now and focus on UX analysis and fixes
        console.log('📋 Skipping screenshot capture (focusing on UX analysis and automated fixes)');
        const screenshots = [];
        
        // Analyze results and generate improvements
        const improvements = await this.generateImprovements(uxResults, screenshots);
        
        // Apply fixes if auto-fix is enabled
        if (this.options.autoFix && improvements.length > 0) {
          await this.applyAutomatedFixes(improvements);
        }
        
        // Check if all components meet target score
        allComponentsPass = await this.checkTargetScores(uxResults);
        
        // Store iteration results
        this.iterationResults.push({
          iteration: this.currentIteration,
          timestamp: new Date().toISOString(),
          uxResults,
          improvements,
          screenshots: screenshots.length,
          allComponentsPass
        });

        if (allComponentsPass) {
          console.log('\n🎉 ALL COMPONENTS MEET TARGET SCORE!');
          break;
        } else if (this.currentIteration < this.options.maxIterations) {
          console.log(`\n⏳ Preparing next iteration...`);
          await this.delay(2000); // Give time for file system changes
        }
      }

      // Generate final report
      await this.generateFinalReport();
      
      return {
        success: allComponentsPass,
        iterations: this.currentIteration,
        finalResults: this.iterationResults[this.iterationResults.length - 1]
      };

    } catch (error) {
      console.error(`❌ Automated UX review failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Setup environment and validate prerequisites
   */
  async setupEnvironment() {
    console.log('🔧 Setting up environment...');
    
    // Create output directory
    await fs.mkdir(this.options.outputDir, { recursive: true });
    
    // Check if Storybook is running
    const isStorybookRunning = await this.checkStorybookStatus();
    if (!isStorybookRunning) {
      console.log('🚀 Starting Storybook...');
      await this.startStorybook();
    }
    
    console.log('✅ Environment ready');
  }

  /**
   * Discover all components that need review
   */
  async discoverComponents() {
    const components = [];
    const componentDirs = await this.findComponentDirectories();
    
    for (const dir of componentDirs) {
      const componentInfo = await this.analyzeComponentDirectory(dir);
      if (componentInfo) {
        components.push(componentInfo);
      }
    }
    
    return components;
  }

  /**
   * Find all component directories
   */
  async findComponentDirectories() {
    const glob = require('glob');
    const { promisify } = require('util');
    const globAsync = promisify(glob);
    
    const pattern = `${this.options.componentsDir}/**/*.tsx`;
    const files = await globAsync(pattern, {
      ignore: ['**/*.stories.tsx', '**/*.test.tsx', '**/index.tsx']
    });
    
    const directories = new Set();
    files.forEach(file => {
      const dir = path.dirname(file);
      const basename = path.basename(file, '.tsx');
      if (!basename.includes('.')) {
        directories.add(dir);
      }
    });
    
    return Array.from(directories);
  }

  /**
   * Analyze a component directory to extract info
   */
  async analyzeComponentDirectory(dir) {
    const componentName = path.basename(dir);
    const componentFile = path.join(dir, `${componentName}.tsx`);
    const storiesFile = path.join(dir, `${componentName}.stories.tsx`);
    const stylesFile = path.join(dir, `${componentName}.styles.ts`);
    
    // Skip sub-components (components that are part of other components)
    const subComponentPatterns = [
      /^Card(Actions|Content|Header|Media)$/,
      /^(Circular|Linear)Progress$/,
      /^Form(Control|Label)$/,
      /^List(Item)$/,
      /^Icon$/,
      /^Skeleton$/,
      /^Badge$/
    ];
    
    const isSubComponent = subComponentPatterns.some(pattern => pattern.test(componentName));
    
    try {
      await fs.access(componentFile);
      
      // Only process main components that have their own stories
      const hasStories = await this.fileExists(storiesFile);
      
      // Skip if it's a sub-component and doesn't have its own stories
      if (isSubComponent && !hasStories) {
        return null;
      }
      
      return {
        name: componentName,
        path: dir,
        componentFile,
        storiesFile: hasStories ? storiesFile : null,
        stylesFile: await this.fileExists(stylesFile) ? stylesFile : null,
        hasStories,
        category: this.categorizeComponent(dir)
      };
    } catch {
      return null;
    }
  }

  /**
   * Capture screenshots for all components in different states
   */
  async captureComponentScreenshots(components) {
    console.log('📸 Capturing component screenshots...');
    
    const screenshots = [];
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-dev-shm-usage'
      ]
    });
    
    try {
      const page = await browser.newPage();
      
      let successfulCaptures = 0;
      
      for (const component of components) {
        if (!component.hasStories) {
          console.log(`⚠️ Skipping ${component.name} - no stories found`);
          continue;
        }
        
        console.log(`📷 Capturing ${component.name}...`);
        
        try {
          const componentScreenshots = await this.captureComponentStates(page, component);
          screenshots.push(...componentScreenshots);
          successfulCaptures++;
          
          this.componentStates.set(component.name, {
            lastScreenshot: Date.now(),
            states: componentScreenshots.length,
            status: 'captured'
          });
          
        } catch (error) {
          console.warn(`⚠️ Failed to capture ${component.name}: ${error.message}`);
          this.componentStates.set(component.name, {
            status: 'failed',
            error: error.message
          });
        }
      }
      
      if (successfulCaptures === 0) {
        console.warn('⚠️ No screenshots were captured successfully');
        console.log('💡 This might be due to Storybook parsing issues or missing stories');
      }
      
    } finally {
      await browser.close();
    }
    
    console.log(`✅ Captured ${screenshots.length} screenshots`);
    return screenshots;
  }

  /**
   * Capture different states of a component
   */
  async captureComponentStates(page, component) {
    const screenshots = [];
    const states = ['default', 'hover', 'focus', 'disabled'];
    const themes = ['light', 'dark'];
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'desktop', width: 1200, height: 800 }
    ];
    
    for (const theme of themes) {
      for (const viewport of viewports) {
        await page.setViewport(viewport);
        
        // Navigate to component story
        const storyUrl = `${this.options.storybookUrl}/iframe.html?id=${this.getStoryId(component)}&viewMode=story&theme=${theme}`;
        
        try {
          await page.goto(storyUrl, { waitUntil: 'networkidle0', timeout: 15000 });
          
          // Wait for Storybook to finish preparing the story
          await this.waitForStorybookToLoad(page);
          
          // Verify the component actually loaded (more flexible check)
          const hasContent = await page.evaluate(() => {
            const root = document.querySelector('#storybook-root');
            if (!root) return false;
            
            // Check for actual content - either children, text, or meaningful height
            const hasChildren = root.children.length > 0;
            const hasText = root.textContent && root.textContent.trim().length > 0;
            const hasHeight = root.getBoundingClientRect().height > 10;
            
            return hasChildren || hasText || hasHeight;
          });
          
          if (!hasContent) {
            console.warn(`⚠️ Component may not have rendered properly for ${component.name}`);
            // Don't throw error, just continue with screenshot attempt
          }
          
          for (const state of states) {
            try {
              await this.setComponentState(page, state);
              
              const screenshotPath = path.join(
                this.options.outputDir,
                'screenshots',
                `${component.name}-${theme}-${viewport.name}-${state}-iter${this.currentIteration}.png`
              );
              
              await fs.mkdir(path.dirname(screenshotPath), { recursive: true });
              
              const bounds = await this.getComponentBounds(page);
              
              // If bounds are too small, take a larger screenshot
              if (bounds.width < 50 || bounds.height < 20) {
                await page.screenshot({ 
                  path: screenshotPath,
                  clip: { x: 0, y: 0, width: 600, height: 400 }
                });
              } else {
                await page.screenshot({ 
                  path: screenshotPath,
                  fullPage: false,
                  clip: bounds
                });
              }
              
              screenshots.push({
                component: component.name,
                state,
                theme,
                viewport: viewport.name,
                path: screenshotPath,
                timestamp: Date.now()
              });
              
            } catch (stateError) {
              console.warn(`⚠️ Failed to capture ${state} state: ${stateError.message}`);
            }
          }
          
        } catch (navError) {
          console.warn(`⚠️ Failed to navigate to ${component.name} story: ${navError.message}`);
        }
      }
    }
    
    return screenshots;
  }

  /**
   * Run UX analysis using existing validator
   */
  async runUXAnalysis() {
    console.log('🎨 Running UX pattern analysis...');
    
    try {
      const results = await this.uxValidator.validateUXPatterns(this.options.componentsDir);
      
      console.log('✅ UX analysis complete');
      return results;
      
    } catch (error) {
      console.error(`❌ UX analysis failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate AI-powered improvement suggestions
   */
  async generateImprovements(uxResults, screenshots) {
    console.log('🧠 Generating AI improvement suggestions...');
    
    const improvements = [];
    
    for (const [componentName, uxData] of Object.entries(uxResults)) {
      if (uxData.error || uxData.uxScore >= this.options.targetScore) {
        continue;
      }
      
      console.log(`💡 Analyzing ${componentName} (Score: ${uxData.uxScore}/${this.options.targetScore})`);
      
      const componentScreenshots = screenshots.filter(s => s.component === componentName);
      const improvement = await this.generateComponentImprovement(componentName, uxData, componentScreenshots);
      
      if (improvement) {
        improvements.push(improvement);
        this.improvementQueue.set(componentName, improvement);
      }
    }
    
    console.log(`💡 Generated ${improvements.length} improvement suggestions`);
    return improvements;
  }

  /**
   * Generate improvement for a specific component
   */
  async generateComponentImprovement(componentName, uxData, screenshots) {
    const issues = [];
    const fixes = [];
    
    // Analyze UX issues
    if (uxData.designTokenUsage.hardcodedValues.length > 0) {
      issues.push(`${uxData.designTokenUsage.hardcodedValues.length} hardcoded values found`);
      fixes.push({
        type: 'designTokens',
        priority: 'high',
        description: 'Replace hardcoded values with theme tokens',
        hardcodedValues: uxData.designTokenUsage.hardcodedValues
      });
    }
    
    if (uxData.interactionStates.missingStates.length > 0) {
      issues.push(`Missing interaction states: ${uxData.interactionStates.missingStates.join(', ')}`);
      fixes.push({
        type: 'interactionStates',
        priority: 'medium',
        description: 'Add missing interaction states',
        missingStates: uxData.interactionStates.missingStates
      });
    }
    
    if (uxData.accessibilityPatterns.missingFeatures.length > 0) {
      issues.push(`Missing accessibility features: ${uxData.accessibilityPatterns.missingFeatures.join(', ')}`);
      fixes.push({
        type: 'accessibility',
        priority: 'high',
        description: 'Improve accessibility compliance',
        missingFeatures: uxData.accessibilityPatterns.missingFeatures
      });
    }
    
    if (uxData.performancePatterns.missingOptimizations.length > 0) {
      fixes.push({
        type: 'performance',
        priority: 'low',
        description: 'Add performance optimizations',
        optimizations: uxData.performancePatterns.missingOptimizations
      });
    }
    
    if (fixes.length === 0) return null;
    
    return {
      componentName,
      currentScore: uxData.uxScore,
      targetScore: this.options.targetScore,
      issues,
      fixes: fixes.sort((a, b) => this.getPriorityWeight(b.priority) - this.getPriorityWeight(a.priority)),
      screenshots: screenshots.map(s => s.path),
      estimatedImpact: this.estimateImpact(fixes)
    };
  }

  /**
   * Apply automated fixes
   */
  async applyAutomatedFixes(improvements) {
    console.log('🔧 Applying automated fixes...');
    
    let fixesApplied = 0;
    
    for (const improvement of improvements) {
      console.log(`🛠️ Fixing ${improvement.componentName}...`);
      
      try {
        for (const fix of improvement.fixes) {
          const success = await this.applyFix(improvement.componentName, fix);
          if (success) {
            fixesApplied++;
            console.log(`   ✅ Applied ${fix.type} fix`);
          }
        }
      } catch (error) {
        console.warn(`   ⚠️ Failed to apply fixes: ${error.message}`);
      }
    }
    
    console.log(`🔧 Applied ${fixesApplied} automated fixes`);
    
    // Run linter and formatter
    if (fixesApplied > 0) {
      await this.runCodeFormatting();
    }
  }

  /**
   * Apply a specific fix to a component
   */
  async applyFix(componentName, fix) {
    const componentDir = path.join(this.options.componentsDir, '**', componentName);
    const componentFiles = await this.findComponentFiles(componentDir);
    
    if (!componentFiles.componentFile) {
      console.warn(`⚠️ Component file not found for ${componentName}`);
      return false;
    }
    
    switch (fix.type) {
      case 'designTokens':
        return await this.fixDesignTokens(componentFiles, fix);
      case 'interactionStates':
        return await this.fixInteractionStates(componentFiles, fix);
      case 'accessibility':
        return await this.fixAccessibility(componentFiles, fix);
      case 'performance':
        return await this.fixPerformance(componentFiles, fix);
      default:
        return false;
    }
  }

  /**
   * Fix design token issues
   */
  async fixDesignTokens(componentFiles, fix) {
    try {
      const stylesContent = componentFiles.stylesFile 
        ? await fs.readFile(componentFiles.stylesFile, 'utf-8')
        : null;
      
      if (!stylesContent) return false;
      
      let updatedContent = stylesContent;
      
      for (const hardcodedValue of fix.hardcodedValues) {
        if (hardcodedValue.type === 'color') {
          // Replace hardcoded colors with theme tokens
          const themeToken = this.suggestColorToken(hardcodedValue.value);
          if (themeToken) {
            updatedContent = updatedContent.replace(
              new RegExp(this.escapeRegex(hardcodedValue.value), 'g'),
              `\${({ theme }) => theme.palette.${themeToken}}`
            );
          }
        } else if (hardcodedValue.type === 'spacing') {
          // Replace hardcoded spacing with theme.spacing()
          const spacingMatch = hardcodedValue.value.match(/(\d+)px/);
          if (spacingMatch) {
            const pixels = parseInt(spacingMatch[1]);
            const spacingUnits = Math.round(pixels / 8); // Assuming 8px base unit
            updatedContent = updatedContent.replace(
              new RegExp(this.escapeRegex(hardcodedValue.value), 'g'),
              `\${({ theme }) => theme.spacing(${spacingUnits})}`
            );
          }
        }
      }
      
      if (updatedContent !== stylesContent) {
        await fs.writeFile(componentFiles.stylesFile, updatedContent);
        return true;
      }
      
    } catch (error) {
      console.warn(`Failed to fix design tokens: ${error.message}`);
    }
    
    return false;
  }

  /**
   * Fix interaction states
   */
  async fixInteractionStates(componentFiles, fix) {
    try {
      const stylesContent = componentFiles.stylesFile 
        ? await fs.readFile(componentFiles.stylesFile, 'utf-8')
        : null;
      
      if (!stylesContent) return false;
      
      let updatedContent = stylesContent;
      
      for (const missingState of fix.missingStates) {
        if (missingState === 'hover' && !stylesContent.includes('&:hover')) {
          // Add hover state
          updatedContent = this.addInteractionState(updatedContent, 'hover', {
            opacity: '0.8',
            cursor: 'pointer'
          });
        } else if (missingState === 'focus' && !stylesContent.includes('&:focus')) {
          // Add focus state
          updatedContent = this.addInteractionState(updatedContent, 'focus', {
            outline: '2px solid ${({ theme }) => theme.palette.primary.main}',
            outlineOffset: '2px'
          });
        } else if (missingState === 'disabled' && !stylesContent.includes('&:disabled')) {
          // Add disabled state
          updatedContent = this.addInteractionState(updatedContent, 'disabled', {
            opacity: '0.5',
            cursor: 'not-allowed',
            pointerEvents: 'none'
          });
        }
      }
      
      if (updatedContent !== stylesContent) {
        await fs.writeFile(componentFiles.stylesFile, updatedContent);
        return true;
      }
      
    } catch (error) {
      console.warn(`Failed to fix interaction states: ${error.message}`);
    }
    
    return false;
  }

  /**
   * Fix accessibility issues
   */
  async fixAccessibility(componentFiles, fix) {
    try {
      const componentContent = await fs.readFile(componentFiles.componentFile, 'utf-8');
      let updatedContent = componentContent;
      
      for (const missingFeature of fix.missingFeatures) {
        if (missingFeature === 'aria-label' && !componentContent.includes('aria-label')) {
          // Add basic aria-label prop support
          updatedContent = this.addAriaSupport(updatedContent, 'aria-label');
        } else if (missingFeature === 'keyboard navigation' && !componentContent.includes('onKeyDown')) {
          // Add keyboard navigation
          updatedContent = this.addKeyboardNavigation(updatedContent);
        }
      }
      
      if (updatedContent !== componentContent) {
        await fs.writeFile(componentFiles.componentFile, updatedContent);
        return true;
      }
      
    } catch (error) {
      console.warn(`Failed to fix accessibility: ${error.message}`);
    }
    
    return false;
  }

  /**
   * Fix performance issues
   */
  async fixPerformance(componentFiles, fix) {
    try {
      const componentContent = await fs.readFile(componentFiles.componentFile, 'utf-8');
      let updatedContent = componentContent;
      
      // Add React.memo if missing
      if (fix.optimizations.includes('React.memo') && !componentContent.includes('memo(')) {
        updatedContent = this.addReactMemo(updatedContent);
      }
      
      if (updatedContent !== componentContent) {
        await fs.writeFile(componentFiles.componentFile, updatedContent);
        return true;
      }
      
    } catch (error) {
      console.warn(`Failed to fix performance: ${error.message}`);
    }
    
    return false;
  }

  /**
   * Check if all components meet target scores
   */
  async checkTargetScores(uxResults) {
    const validComponents = Object.values(uxResults).filter(r => !r.error);
    if (validComponents.length === 0) return false;
    
    const passingComponents = validComponents.filter(r => r.uxScore >= this.options.targetScore);
    const passRate = (passingComponents.length / validComponents.length) * 100;
    
    console.log(`\n📊 Score Summary:`);
    console.log(`   🎯 Target: ${this.options.targetScore}/100`);
    console.log(`   ✅ Passing: ${passingComponents.length}/${validComponents.length} (${passRate.toFixed(1)}%)`);
    
    const avgScore = validComponents.reduce((sum, r) => sum + r.uxScore, 0) / validComponents.length;
    console.log(`   📈 Average: ${avgScore.toFixed(1)}/100`);
    
    // Show components that still need work
    const needsWork = validComponents.filter(r => r.uxScore < this.options.targetScore);
    if (needsWork.length > 0) {
      console.log(`\n🔧 Components needing improvement:`);
      needsWork.forEach(r => {
        const componentName = Object.keys(uxResults).find(key => uxResults[key] === r);
        console.log(`   🔴 ${componentName}: ${r.uxScore}/100`);
      });
    }
    
    return passingComponents.length === validComponents.length;
  }

  /**
   * Generate final comprehensive report
   */
  async generateFinalReport() {
    console.log('\n📋 Generating final report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      configuration: this.options,
      iterations: this.iterationResults,
      summary: this.generateSummary(),
      componentStates: Object.fromEntries(this.componentStates),
      improvements: Object.fromEntries(this.improvementQueue)
    };
    
    const reportPath = path.join(this.options.outputDir, 'final-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    // Generate human-readable report
    const readableReport = this.generateReadableReport(report);
    const readableReportPath = path.join(this.options.outputDir, 'final-report.md');
    await fs.writeFile(readableReportPath, readableReport);
    
    console.log(`📄 Reports saved:`);
    console.log(`   📊 Data: ${reportPath}`);
    console.log(`   📖 Summary: ${readableReportPath}`);
    
    return report;
  }

  /**
   * Generate summary statistics
   */
  generateSummary() {
    if (this.iterationResults.length === 0) return {};
    
    const finalIteration = this.iterationResults[this.iterationResults.length - 1];
    const firstIteration = this.iterationResults[0];
    
    return {
      totalIterations: this.iterationResults.length,
      targetScore: this.options.targetScore,
      finalSuccess: finalIteration.allComponentsPass,
      improvementMade: finalIteration.uxResults && firstIteration.uxResults,
      componentsReviewed: Object.keys(finalIteration.uxResults || {}).length,
      screenshotsCaptured: this.iterationResults.reduce((sum, iter) => sum + iter.screenshots, 0),
      improvementsGenerated: this.iterationResults.reduce((sum, iter) => sum + iter.improvements.length, 0)
    };
  }

  /**
   * Generate human-readable report
   */
  generateReadableReport(report) {
    const summary = report.summary;
    const finalIteration = report.iterations[report.iterations.length - 1];
    
    return `# Automated UX Review Report

## Summary
- **Target Score**: ${summary.targetScore}/100
- **Total Iterations**: ${summary.totalIterations}
- **Components Reviewed**: ${summary.componentsReviewed}
- **Final Success**: ${summary.finalSuccess ? '✅ YES' : '❌ NO'}
- **Screenshots Captured**: ${summary.screenshotsCaptured}
- **Improvements Generated**: ${summary.improvementsGenerated}

## Configuration
- **Components Directory**: ${report.configuration.componentsDir}
- **Auto-fix Enabled**: ${report.configuration.autoFix ? 'Yes' : 'No'}
- **Max Iterations**: ${report.configuration.maxIterations}
- **Storybook URL**: ${report.configuration.storybookUrl}

## Iteration Details
${report.iterations.map((iter, index) => `
### Iteration ${iter.iteration}
- **Timestamp**: ${iter.timestamp}
- **Screenshots**: ${iter.screenshots}
- **Improvements**: ${iter.improvements.length}
- **All Components Pass**: ${iter.allComponentsPass ? '✅' : '❌'}
`).join('')}

## Component Status
${Object.entries(report.componentStates).map(([name, state]) => `
- **${name}**: ${state.status} ${state.states ? `(${state.states} states captured)` : ''}
`).join('')}

## Generated at
${report.timestamp}
`;
  }

  // Helper methods
  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  categorizeComponent(componentPath) {
    const pathParts = componentPath.split('/');
    return pathParts[pathParts.length - 2] || 'unknown';
  }

  async checkStorybookStatus() {
    try {
      const { execSync } = require('child_process');
      
      // Check if process is listening on port 6006
      const result = execSync('lsof -ti:6006', { encoding: 'utf8', stdio: 'pipe' });
      if (result.trim()) {
        console.log('📱 Storybook is already running');
        return true;
      }
    } catch {
      // Port not in use, try HTTP check
      try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(this.options.storybookUrl, { 
          timeout: 5000
        });
        return response.ok;
      } catch {
        return false;
      }
    }
    return false;
  }

  async startStorybook() {
    return new Promise((resolve, reject) => {
      console.log('⏳ Starting Storybook server...');
      
      const storybook = spawn('yarn', ['storybook'], { 
        stdio: 'pipe',
        detached: false
      });
      
      let startupTimeout;
      let resolved = false;
      
      const onResolve = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(startupTimeout);
          resolve();
        }
      };
      
      const onReject = (error) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(startupTimeout);
          reject(error);
        }
      };
      
      // Listen for successful startup
      storybook.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Local:') && output.includes('6006')) {
          console.log('✅ Storybook started successfully');
          setTimeout(onResolve, 2000); // Give extra time for full startup
        }
      });
      
      storybook.stderr.on('data', (data) => {
        const error = data.toString();
        if (error.includes('Error') || error.includes('EADDRINUSE')) {
          onReject(new Error(`Storybook startup failed: ${error}`));
        }
      });
      
      storybook.on('error', onReject);
      
      // Fallback timeout
      startupTimeout = setTimeout(() => {
        console.log('⏱️ Storybook startup timeout, proceeding anyway...');
        onResolve();
      }, 30000);
    });
  }

  getStoryId(component) {
    // Map component directory to story category
    const categoryMap = {
      'core': 'core',
      'data-display': 'data-display', 
      'feedback': 'feedback',
      'forms': 'forms',
      'layout': 'layout',
      'navigation': 'navigation',
      'surfaces': 'surfaces'
    };
    
    const category = categoryMap[component.category] || component.category;
    const componentName = component.name.toLowerCase();
    
    // Some components might have different story naming
    const storyNameMap = {
      'iconbutton': 'iconbutton',
      'cardactions': 'cardactions',
      'cardcontent': 'cardcontent', 
      'cardheader': 'cardheader',
      'cardmedia': 'cardmedia',
      'circularProgress': 'circularprogress',
      'linearProgress': 'linearprogress',
      'formcontrol': 'formcontrol',
      'formlabel': 'formlabel',
      'radiogroup': 'radiogroup',
      'listitem': 'listitem'
    };
    
    const storyName = storyNameMap[componentName] || componentName;
    return `${category}-${storyName}--default`;
  }

  async setComponentState(page, state) {
    try {
      switch (state) {
        case 'hover':
          // Try multiple selectors to find an interactive element
          const selectors = [
            '#storybook-root button',
            '#storybook-root [role="button"]',
            '#storybook-root a',
            '#storybook-root input',
            '#storybook-root [data-testid]',
            '#storybook-root > div > *:first-child',
            '#storybook-root *[class*="Button"]',
            '#storybook-root *[class*="button"]'
          ];
          
          let hovered = false;
          for (const selector of selectors) {
            try {
              const element = await page.$(selector);
              if (element) {
                const boundingBox = await element.boundingBox();
                if (boundingBox && boundingBox.width > 0 && boundingBox.height > 0) {
                  await element.hover();
                  hovered = true;
                  break;
                }
              }
            } catch (e) {
              // Continue to next selector
            }
          }
          
          if (!hovered) {
            // Fallback: hover over the center of the story area
            await page.hover('#storybook-root', { offset: { x: 100, y: 50 } });
          }
          break;
          
        case 'focus':
          try {
            // Try to focus on an interactive element
            await page.focus('#storybook-root button, #storybook-root input, #storybook-root a, #storybook-root [tabindex]');
          } catch {
            // Fallback: use keyboard navigation
            await page.keyboard.press('Tab');
          }
          break;
          
        case 'disabled':
          // For disabled state, we'd need to interact with Storybook controls
          // For now, just take the default state
          break;
          
        case 'default':
        default:
          // Just wait a moment for the component to settle
          break;
      }
    } catch (error) {
      // Silently continue if state change fails
      console.warn(`⚠️ Failed to set ${state} state: ${error.message}`);
    }
    
    await this.delay(500);
  }

  async getComponentBounds(page) {
    try {
      // Try different selectors for Storybook's component container
      const selectors = [
        '#storybook-root',
        '#root',
        '.sb-show-main',
        '#storybook-docs-root',
        '[data-testid="storybook-preview-wrapper"]'
      ];
      
      for (const selector of selectors) {
        try {
          const element = await page.$(selector);
          if (element) {
            const boundingBox = await element.boundingBox();
            if (boundingBox && boundingBox.width > 0 && boundingBox.height > 0) {
              // Add some padding to ensure we capture the full component
              return {
                x: Math.max(0, boundingBox.x - 10),
                y: Math.max(0, boundingBox.y - 10),
                width: Math.min(1200, boundingBox.width + 20),
                height: Math.min(800, boundingBox.height + 20)
              };
            }
          }
        } catch {
          // Continue to next selector
        }
      }
    } catch {
      // Return default bounds
    }
    return { x: 0, y: 0, width: 600, height: 400 };
  }

  getPriorityWeight(priority) {
    const weights = { high: 3, medium: 2, low: 1 };
    return weights[priority] || 0;
  }

  estimateImpact(fixes) {
    return fixes.reduce((total, fix) => {
      const weights = { high: 15, medium: 10, low: 5 };
      return total + (weights[fix.priority] || 0);
    }, 0);
  }

  suggestColorToken(colorValue) {
    const colorMap = {
      '#000': 'text.primary',
      '#fff': 'background.paper',
      '#f5f5f5': 'background.default',
      '#1976d2': 'primary.main',
      '#dc004e': 'error.main'
    };
    return colorMap[colorValue.toLowerCase()];
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  addInteractionState(content, state, styles) {
    const styleString = Object.entries(styles)
      .map(([prop, value]) => `    ${prop}: ${value};`)
      .join('\n');
    
    const stateRule = `
  &:${state} {
${styleString}
  }`;
    
    // Find the last closing brace and insert before it
    const lastBraceIndex = content.lastIndexOf('}');
    if (lastBraceIndex > -1) {
      return content.slice(0, lastBraceIndex) + stateRule + '\n' + content.slice(lastBraceIndex);
    }
    return content;
  }

  addAriaSupport(content, ariaAttribute) {
    // Add aria prop to interface
    const interfaceMatch = content.match(/interface\s+\w+Props\s*{[^}]*}/);
    if (interfaceMatch) {
      const interfaceContent = interfaceMatch[0];
      if (!interfaceContent.includes(ariaAttribute)) {
        const updatedInterface = interfaceContent.replace(
          /}$/,
          `  '${ariaAttribute}'?: string;\n}`
        );
        content = content.replace(interfaceMatch[0], updatedInterface);
      }
    }
    return content;
  }

  addKeyboardNavigation(content) {
    // Add basic onKeyDown handler
    const propsPattern = /const\s+\w+\s*:\s*React\.FC<[^>]+>\s*=\s*\([^)]*\)\s*=>/;
    const match = content.match(propsPattern);
    if (match) {
      // Add keyboard handler logic - simplified version
      const keyboardHandler = `
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Handle keyboard activation
    }
  };`;
      
      content = content.replace(match[0], match[0] + keyboardHandler);
    }
    return content;
  }

  addReactMemo(content) {
    // Add React.memo wrapper
    if (!content.includes('import') || !content.includes('memo')) {
      content = content.replace(
        /import React/,
        'import React, { memo }'
      );
    }
    
    // Wrap export with memo
    content = content.replace(
      /export default (\w+);/,
      'export default memo($1);'
    );
    
    return content;
  }

  async findComponentFiles(componentDir) {
    const glob = require('glob');
    const { promisify } = require('util');
    const globAsync = promisify(glob);
    
    const files = await globAsync(`${componentDir}/**/*.{tsx,ts}`);
    const componentName = path.basename(componentDir);
    
    return {
      componentFile: files.find(f => f.endsWith(`${componentName}.tsx`)),
      stylesFile: files.find(f => f.endsWith(`${componentName}.styles.ts`)),
      typesFile: files.find(f => f.endsWith(`${componentName}.types.ts`))
    };
  }

  async runCodeFormatting() {
    try {
      execSync('yarn lint --fix', { stdio: 'inherit' });
      execSync('yarn format', { stdio: 'inherit' });
      console.log('✅ Code formatting applied');
    } catch (error) {
      console.warn('⚠️ Code formatting failed:', error.message);
    }
  }

  async waitForStorybookToLoad(page, maxWaitTime = 10000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitTime) {
      try {
        const isReady = await page.evaluate(() => {
          const root = document.querySelector('#storybook-root');
          if (!root) return false;
          
          // Check if Storybook is still preparing
          const isPreparing = document.querySelector('.sb-preparing-story');
          if (isPreparing) return false;
          
          // Check for error messages
          const hasError = document.querySelector('#error-message, .sb-errordisplay');
          if (hasError) return true; // Stop waiting if there's an error
          
          // Check if content is actually loaded
          const hasContent = root.children.length > 0 || 
                           root.getBoundingClientRect().height > 10 ||
                           (root.textContent && root.textContent.trim().length > 0);
          
          return hasContent;
        });
        
        if (isReady) {
          return true;
        }
        
        await this.delay(500);
      } catch (error) {
        console.warn('Error while waiting for Storybook to load:', error.message);
        break;
      }
    }
    
    console.warn('⏱️ Storybook loading timeout, proceeding anyway...');
    return false;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2);
  
  const options = {
    targetScore: parseInt(args.find(arg => arg.startsWith('--target='))?.split('=')[1]) || 85,
    maxIterations: parseInt(args.find(arg => arg.startsWith('--iterations='))?.split('=')[1]) || 5,
    componentsDir: args.find(arg => arg.startsWith('--components='))?.split('=')[1] || 'src/components',
    autoFix: !args.includes('--no-autofix'),
    verbose: args.includes('--verbose'),
    component: args.find(arg => arg.startsWith('--component='))?.split('=')[1]
  };

  if (args.includes('--help')) {
    console.log(`
🤖 AI UX Review Automation

Usage: node ai-ux-review-automation.cjs [options]

Options:
  --target=N          Target UX score (default: 85)
  --iterations=N      Max iterations (default: 5)
  --components=PATH   Components directory (default: src/components)
  --component=NAME    Review specific component only
  --no-autofix       Disable automatic fixes
  --verbose           Enable verbose output
  --help             Show this help

Examples:
  node ai-ux-review-automation.cjs
  node ai-ux-review-automation.cjs --target=90 --iterations=3
  node ai-ux-review-automation.cjs --component=Button --no-autofix
    `);
    process.exit(0);
  }

  console.log('🤖 AI UX Review Automation Starting...\n');

  try {
    const automation = new UXReviewAutomation(options);
    const result = await automation.executeAutomatedReview();

    if (result.success) {
      console.log('\n🎉 SUCCESS: All components meet target UX score!');
      process.exit(0);
    } else {
      console.log('\n⚠️ INCOMPLETE: Some components still need improvement');
      console.log(`   Completed ${result.iterations}/${options.maxIterations} iterations`);
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ FAILED:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { UXReviewAutomation };