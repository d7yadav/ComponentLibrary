/**
 * @fileoverview Global Test Setup - AI-Enhanced Testing Environment
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Global setup for Playwright tests including AI test automation
 * initialization, browser setup, and test environment preparation.
 */

import { chromium, FullConfig } from '@playwright/test';
import { TestAutomationAI } from '../../src/ai-workflow/TestAutomationAI';

/**
 * Global setup function for AI-enhanced testing
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting AI-Enhanced Test Environment Setup...');
  
  // Initialize AI Test Automation Engine
  console.log('🤖 Initializing AI Test Automation Engine...');
  const aiTesting = new TestAutomationAI({
    browsers: ['chromium', 'firefox', 'webkit'],
    ai: {
      testGeneration: true,
      smartRetry: true,
      predictiveAnalysis: true,
      selfHealing: true,
    },
  });

  // Wait for Storybook server to be ready
  console.log('📚 Waiting for Storybook server...');
  const baseURL = config.projects[0]?.use?.baseURL || 'http://localhost:6006';
  
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    let retries = 0;
    const maxRetries = 30; // 30 seconds timeout
    
    while (retries < maxRetries) {
      try {
        await page.goto(baseURL, { timeout: 2000 });
        const title = await page.title();
        
        if (title.includes('Storybook')) {
          console.log('✅ Storybook server is ready');
          break;
        }
      } catch (error) {
        retries++;
        if (retries === maxRetries) {
          throw new Error(`Storybook server not ready after ${maxRetries} seconds`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    await browser.close();
  } catch (error) {
    console.error('❌ Failed to connect to Storybook server:', error);
    throw error;
  }

  // Generate AI test scenarios for all components
  console.log('🧠 Generating AI test scenarios...');
  try {
    // Mock component paths - in real implementation, would scan for actual components
    const componentPaths = [
      'src/components/core/Button/Button.tsx',
      'src/components/data-display/Card/Card.tsx',
      'src/components/forms/TextField/TextField.tsx',
    ];
    
    for (const componentPath of componentPaths) {
      try {
        await aiTesting.generateTestScenarios(componentPath);
        console.log(`✅ Generated test scenarios for ${componentPath}`);
      } catch (error) {
        console.warn(`⚠️ Failed to generate scenarios for ${componentPath}:`, error.message);
      }
    }
  } catch (error) {
    console.warn('⚠️ AI test scenario generation failed:', error.message);
  }

  // Setup visual regression baselines
  console.log('📸 Preparing visual regression testing...');
  
  // Create test artifacts directory
  const fs = require('fs');
  const path = require('path');
  
  const testResultsDir = path.join(process.cwd(), 'test-results');
  const screenshotsDir = path.join(testResultsDir, 'screenshots');
  const reportsDir = path.join(testResultsDir, 'reports');
  
  [testResultsDir, screenshotsDir, reportsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Setup accessibility testing
  console.log('♿ Configuring accessibility testing...');
  
  // Create accessibility test configuration
  const a11yConfig = {
    rules: {
      'color-contrast': { enabled: true },
      'keyboard-navigation': { enabled: true },
      'aria-labels': { enabled: true },
      'focus-management': { enabled: true },
      'semantic-html': { enabled: true },
    },
    tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
    level: 'AA',
  };
  
  // Store configuration for test runtime
  fs.writeFileSync(
    path.join(testResultsDir, 'a11y-config.json'),
    JSON.stringify(a11yConfig, null, 2)
  );

  // Setup performance monitoring
  console.log('⚡ Configuring performance monitoring...');
  
  const performanceConfig = {
    metrics: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB'],
    thresholds: {
      loadTime: 3000,
      renderTime: 1000,
      interactionTime: 100,
    },
    monitoring: true,
  };
  
  fs.writeFileSync(
    path.join(testResultsDir, 'performance-config.json'),
    JSON.stringify(performanceConfig, null, 2)
  );

  // Setup test environment variables
  process.env.AI_TESTING_ENABLED = 'true';
  process.env.VISUAL_REGRESSION_ENABLED = 'true';
  process.env.ACCESSIBILITY_TESTING_ENABLED = 'true';
  process.env.PERFORMANCE_MONITORING_ENABLED = 'true';
  process.env.TEST_RESULTS_DIR = testResultsDir;

  console.log('✅ AI-Enhanced Test Environment Setup Complete');
  console.log(`📁 Test Results Directory: ${testResultsDir}`);
  console.log('🎯 Ready for intelligent test execution');
}

export default globalSetup;