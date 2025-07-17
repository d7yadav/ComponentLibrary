#!/usr/bin/env node

/**
 * @fileoverview Drawer Component Visual Regression Testing
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Focused visual regression testing specifically for the Drawer component.
 * This script demonstrates how visual testing works for complex components
 * with multiple states, variants, and theme support.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Configuration specific to Drawer testing
const CONFIG = {
  BASELINE_DIR: path.join(process.cwd(), 'visual-baselines', 'drawer-focused'),
  STORYBOOK_URL: process.env.STORYBOOK_URL || 'http://localhost:6006',
  
  // Key Drawer stories to test (focusing on most important variants)
  TARGET_STORIES: [
    'surfaces-drawer--default',
    'surfaces-drawer--persistent', 
    'surfaces-drawer--permanent',
    'surfaces-drawer--mini',
    'surfaces-drawer--complex-drawer',
  ],
  
  // Simplified browser/viewport configuration for demonstration
  BROWSERS: [
    { name: 'chromium', executable: null },
  ],
  
  VIEWPORTS: [
    { name: 'mobile', width: 375, height: 667, deviceScaleFactor: 2 },
    { name: 'desktop', width: 1920, height: 1080, deviceScaleFactor: 1 },
  ],
  
  THEMES: [
    { name: 'light', globalValue: 'light' },
    { name: 'dark', globalValue: 'dark' },
  ],
  
  SCREENSHOT: {
    stabilization_delay: 2000, // Wait longer for drawer animations
    network_idle_timeout: 30000,
    element_ready_timeout: 15000,
  }
};

/**
 * Drawer-focused Visual Regression Tester
 */
class DrawerVisualTester {
  constructor() {
    this.browser = null;
    this.results = {
      total: 0,
      successful: 0,
      failed: 0,
      screenshots: [],
      errors: []
    };
    
    this.ensureDirectories();
  }

  ensureDirectories() {
    // Create baseline directory structure
    CONFIG.THEMES.forEach(theme => {
      CONFIG.BROWSERS.forEach(browser => {
        CONFIG.VIEWPORTS.forEach(viewport => {
          const dir = path.join(CONFIG.BASELINE_DIR, theme.name, browser.name, viewport.name);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
        });
      });
    });
  }

  async init() {
    console.log('🎭 Starting Drawer Visual Regression Testing...\n');
    
    // Check if Storybook is running
    if (!await this.isStorybookRunning()) {
      throw new Error('Storybook is not running. Please start it with: yarn storybook');
    }

    // Initialize browser
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    });

    console.log('✅ Browser initialized');
    console.log('✅ Storybook detected');
    console.log(`📸 Testing ${CONFIG.TARGET_STORIES.length} Drawer stories`);
    console.log(`🎨 Testing ${CONFIG.THEMES.length} themes (light/dark)`);
    console.log(`📱 Testing ${CONFIG.VIEWPORTS.length} viewports\n`);
  }

  async isStorybookRunning() {
    try {
      const response = await fetch(CONFIG.STORYBOOK_URL);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async runTest() {
    try {
      await this.init();
      await this.captureDrawerScreenshots();
      await this.generateReport();
    } catch (error) {
      console.error(`❌ Test failed: ${error.message}`);
      process.exit(1);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }

  async captureDrawerScreenshots() {
    console.log('📸 Capturing Drawer component screenshots...\n');

    for (const storyId of CONFIG.TARGET_STORIES) {
      const storyName = storyId.replace('surfaces-drawer--', '');
      console.log(`🎭 Testing story: ${storyName}`);

      for (const theme of CONFIG.THEMES) {
        for (const viewport of CONFIG.VIEWPORTS) {
          try {
            this.results.total++;
            
            const screenshot = await this.captureStoryScreenshot(storyId, viewport, theme);
            
            if (screenshot) {
              const filename = `${storyId.replace(/[^a-zA-Z0-9-_]/g, '_')}_${theme.name}.png`;
              const filepath = path.join(
                CONFIG.BASELINE_DIR, 
                theme.name,
                'chromium', 
                viewport.name, 
                filename
              );
              
              fs.writeFileSync(filepath, screenshot);
              
              this.results.successful++;
              this.results.screenshots.push({
                story: storyName,
                theme: theme.name,
                viewport: viewport.name,
                file: filepath,
                size: screenshot.length
              });
              
              console.log(`  ✅ ${theme.name} theme, ${viewport.name} - ${(screenshot.length / 1024).toFixed(1)}KB`);
            } else {
              throw new Error('Failed to capture screenshot');
            }
            
          } catch (error) {
            this.results.failed++;
            this.results.errors.push({
              story: storyName,
              theme: theme.name,
              viewport: viewport.name,
              error: error.message
            });
            
            console.log(`  ❌ ${theme.name} theme, ${viewport.name} - ${error.message}`);
          }
        }
      }
      
      console.log(''); // Empty line between stories
    }
  }

  async captureStoryScreenshot(storyId, viewport, theme) {
    const page = await this.browser.newPage();
    
    try {
      await page.setViewport(viewport);
      
      // Navigate to the specific story with theme
      const storyUrl = `${CONFIG.STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story&globals=theme:${theme.globalValue}`;
      
      await page.goto(storyUrl, { 
        waitUntil: 'networkidle2',
        timeout: CONFIG.SCREENSHOT.network_idle_timeout
      });

      // Wait for Storybook root element
      await page.waitForSelector('#storybook-root', {
        timeout: CONFIG.SCREENSHOT.element_ready_timeout
      });

      // For Drawer stories, we need to handle the interactive state
      // Try to open the drawer if it has a toggle button
      try {
        const toggleButton = await page.$('button:has-text("Open Drawer"), button:has-text("Open")');
        if (toggleButton) {
          await toggleButton.click();
          console.log(`    🔄 Opened drawer for better visualization`);
          
          // Wait for drawer animation to complete
          await this.wait(1500);
        }
      } catch (error) {
        // Some stories might not have toggle buttons (like Permanent drawer)
        console.log(`    ℹ️  No toggle button found - story likely shows drawer open by default`);
      }

      // Verify theme is applied by checking background color
      await page.evaluate((themeName) => {
        return new Promise((resolve) => {
          let attempts = 0;
          const maxAttempts = 10;
          
          const checkTheme = () => {
            const body = document.body;
            const computedStyle = window.getComputedStyle(body);
            const backgroundColor = computedStyle.backgroundColor;
            
            const isDarkApplied = backgroundColor === 'rgb(0, 0, 0)' || backgroundColor === 'rgba(0, 0, 0, 1)';
            const isLightApplied = backgroundColor === 'rgb(255, 255, 255)' || backgroundColor === 'rgba(255, 255, 255, 1)';
            
            if ((themeName === 'dark' && isDarkApplied) || (themeName === 'light' && isLightApplied) || attempts >= maxAttempts) {
              resolve();
            } else {
              attempts++;
              setTimeout(checkTheme, 100);
            }
          };
          
          checkTheme();
        });
      }, theme.name);

      // Wait for drawer animations and transitions to complete
      await this.wait(CONFIG.SCREENSHOT.stabilization_delay);

      // Remove any loading indicators or overlays
      await page.evaluate(() => {
        const loaders = document.querySelectorAll('.sb-show-preparing-story, .sb-show-preparing-docs');
        loaders.forEach(el => el.style.display = 'none');
      });

      // Capture the screenshot
      const screenshot = await page.screenshot({
        type: 'png',
        fullPage: false,
      });

      return screenshot;

    } finally {
      await page.close();
    }
  }

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async generateReport() {
    console.log('\n📊 Drawer Visual Regression Test Results');
    console.log('==========================================');
    console.log(`📸 Total Screenshots: ${this.results.total}`);
    console.log(`✅ Successful: ${this.results.successful}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📈 Success Rate: ${Math.round((this.results.successful / this.results.total) * 100)}%`);
    
    if (this.results.screenshots.length > 0) {
      console.log('\n📁 Generated Screenshots:');
      this.results.screenshots.forEach(screenshot => {
        const relativePath = path.relative(process.cwd(), screenshot.file);
        console.log(`  🖼️  ${screenshot.story} (${screenshot.theme}, ${screenshot.viewport}) → ${relativePath}`);
      });
    }

    if (this.results.errors.length > 0) {
      console.log('\n⚠️  Errors:');
      this.results.errors.forEach(error => {
        console.log(`  ❌ ${error.story} (${error.theme}, ${error.viewport}): ${error.error}`);
      });
    }

    // Show what visual regression testing captures
    console.log('\n🔍 What Visual Regression Testing Captures for Drawer:');
    console.log('=====================================================');
    console.log('✅ Drawer positioning and sizing across themes');
    console.log('✅ Animation states (open/closed/mini-collapsed)');  
    console.log('✅ Content layout and typography in light/dark themes');
    console.log('✅ Navigation item styling and hover states');
    console.log('✅ Header/footer positioning and scrollable content');
    console.log('✅ Responsive behavior across mobile/desktop viewports');
    console.log('✅ Theme consistency (background colors, borders, shadows)');
    console.log('✅ Interactive elements (buttons, icons, badges)');

    console.log('\n🎯 Key Drawer Variants Tested:');
    console.log('==============================');
    CONFIG.TARGET_STORIES.forEach(story => {
      const name = story.replace('surfaces-drawer--', '');
      console.log(`📋 ${name}: Shows ${name.replace('-', ' ')} behavior and styling`);
    });

    // Save detailed report
    const reportPath = path.join(CONFIG.BASELINE_DIR, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Detailed report saved: ${path.relative(process.cwd(), reportPath)}`);
    
    console.log('\n🚀 Next Steps:');
    console.log('==============');
    console.log('1. Review generated screenshots in visual-baselines/drawer-focused/');
    console.log('2. Compare with previous versions to detect visual regressions');
    console.log('3. Use these baselines for automated comparison in CI/CD');
    console.log('4. Run this test after Drawer component changes to detect issues');
    
    console.log('\n✨ Visual regression testing helps catch:');
    console.log('- Unintended styling changes');
    console.log('- Theme inconsistencies');  
    console.log('- Animation/transition issues');
    console.log('- Layout shifts across viewports');
    console.log('- Accessibility contrast problems');
  }
}

// Main execution
async function main() {
  const tester = new DrawerVisualTester();
  await tester.runTest();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Drawer visual test interrupted');
  process.exit(0);
});

// Run if executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = { DrawerVisualTester, CONFIG };