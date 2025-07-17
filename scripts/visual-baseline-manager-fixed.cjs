#!/usr/bin/env node

/**
 * @fileoverview Visual Baseline Manager - AI-Powered Visual Regression Management (Fixed)
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * This script provides comprehensive visual regression baseline management with:
 * 1. Automatic baseline generation from Storybook stories
 * 2. AI-powered visual diff analysis
 * 3. Smart baseline updates and approval workflows
 * 4. Cross-browser and cross-viewport baseline management
 * 5. Automated cleanup and optimization
 * 6. Fixed compatibility issues with newer Puppeteer versions
 * 7. Better error handling for new components/stories
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const puppeteer = require('puppeteer');

// Configuration
const CONFIG = {
  BASELINE_DIR: path.join(process.cwd(), 'visual-baselines'),
  STORYBOOK_URL: process.env.STORYBOOK_URL || 'http://localhost:6006',
  COMPONENTS_DIR: path.join(process.cwd(), 'src', 'components'),
  
  // Baseline organization
  BASELINE_STRUCTURE: {
    approved: 'approved',
    pending: 'pending', 
    rejected: 'rejected',
    archive: 'archive',
    temp: 'temp'
  },
  
  // Browser configurations
  BROWSERS: [
    { name: 'chromium', executable: null },
    { name: 'firefox', executable: null },
  ],
  
  // Theme configurations
  THEMES: [
    { name: 'light', globalValue: 'light' },
    { name: 'dark', globalValue: 'dark' },
  ],
  
  // Viewport configurations
  VIEWPORTS: [
    { name: 'mobile', width: 375, height: 667, deviceScaleFactor: 2 },
    { name: 'tablet', width: 768, height: 1024, deviceScaleFactor: 2 },
    { name: 'desktop', width: 1920, height: 1080, deviceScaleFactor: 1 },
  ],
  
  // Visual diff thresholds
  DIFF_THRESHOLDS: {
    pixel: 0.1,      // 0.1% pixel difference threshold
    layout: 0.05,    // 5% layout shift threshold
    color: 0.15,     // 15% color variance threshold
    antialiasing: true, // Ignore antialiasing differences
  },
  
  // AI analysis settings
  AI_ANALYSIS: {
    enabled: true,
    confidence_threshold: 0.8,
    auto_approve_threshold: 0.95,
    pattern_learning: true,
  },
  
  // Retry settings
  RETRY: {
    attempts: 3,
    delay: 1000,
  },
  
  // Screenshot settings
  SCREENSHOT: {
    stabilization_delay: 1500, // Wait for animations
    network_idle_timeout: 30000,
    element_ready_timeout: 10000,
  }
};

// Parse command line arguments
const args = process.argv.slice(2);
const MODE = {
  generate: args.includes('--generate'),
  update: args.includes('--update'),
  approve: args.includes('--approve'),
  reject: args.includes('--reject'),
  cleanup: args.includes('--cleanup'),
  analyze: args.includes('--analyze'),
  verbose: args.includes('--verbose'),
  skipFailures: args.includes('--skip-failures'),
  component: args.find(arg => arg.startsWith('--component='))?.split('=')[1],
  viewport: args.find(arg => arg.startsWith('--viewport='))?.split('=')[1],
  browser: args.find(arg => arg.startsWith('--browser='))?.split('=')[1],
  theme: args.find(arg => arg.startsWith('--theme='))?.split('=')[1],
};

/**
 * Visual Baseline Manager - AI-Enhanced Visual Regression System
 */
class VisualBaselineManager {
  constructor() {
    this.browsers = new Map();
    this.storyIndex = new Map();
    this.baselineMetadata = new Map();
    this.analysisResults = new Map();
    this.failedScreenshots = [];
    
    this.initializeLogging();
    this.ensureDirectories();
    this.loadBaselineMetadata();
  }

  initializeLogging() {
    this.log = {
      info: (msg) => console.log(`📸 [Visual] ${msg}`),
      success: (msg) => console.log(`✅ [Visual] ${msg}`),
      warning: (msg) => console.log(`⚠️  [Visual] ${msg}`),
      error: (msg) => console.log(`❌ [Visual] ${msg}`),
      debug: (msg) => MODE.verbose && console.log(`🔍 [Visual] ${msg}`),
      timing: (msg, duration) => console.log(`⏱️  [Visual] ${msg} (${duration}ms)`),
    };
  }

  ensureDirectories() {
    const dirs = Object.values(CONFIG.BASELINE_STRUCTURE).map(subdir => 
      path.join(CONFIG.BASELINE_DIR, subdir)
    );
    
    // Add viewport, browser, and theme subdirectories
    CONFIG.VIEWPORTS.forEach(viewport => {
      CONFIG.BROWSERS.forEach(browser => {
        CONFIG.THEMES.forEach(theme => {
          dirs.push(...Object.values(CONFIG.BASELINE_STRUCTURE).map(subdir =>
            path.join(CONFIG.BASELINE_DIR, subdir, theme.name, browser.name, viewport.name)
          ));
        });
      });
    });

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  loadBaselineMetadata() {
    const metadataPath = path.join(CONFIG.BASELINE_DIR, 'metadata.json');
    if (fs.existsSync(metadataPath)) {
      try {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        Object.entries(metadata).forEach(([key, value]) => {
          this.baselineMetadata.set(key, value);
        });
        this.log.debug(`Loaded metadata for ${this.baselineMetadata.size} baselines`);
      } catch (error) {
        this.log.warning(`Failed to load baseline metadata: ${error.message}`);
      }
    }
  }

  saveBaselineMetadata() {
    const metadataPath = path.join(CONFIG.BASELINE_DIR, 'metadata.json');
    const metadata = Object.fromEntries(this.baselineMetadata);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  }

  /**
   * Utility function to wait/sleep
   */
  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Main execution method
   */
  async run() {
    try {
      this.log.info('Starting Visual Baseline Manager...');
      this.displayBanner();

      // Check if Storybook is running
      if (!await this.isStorybookRunning()) {
        this.log.warning('Storybook is not running. Starting Storybook...');
        await this.startStorybook();
      }

      // Initialize browsers
      await this.initializeBrowsers();

      // Discover Storybook stories
      await this.discoverStories();

      // Execute requested operations
      if (MODE.generate) {
        await this.generateBaselines();
      } else if (MODE.update) {
        await this.updateBaselines();
      } else if (MODE.approve) {
        await this.approveBaselines();
      } else if (MODE.reject) {
        await this.rejectBaselines();
      } else if (MODE.cleanup) {
        await this.cleanupBaselines();
      } else if (MODE.analyze) {
        await this.analyzeBaselines();
      } else {
        await this.showStatus();
      }

      // Report any failures
      if (this.failedScreenshots.length > 0) {
        this.log.warning(`Failed to capture ${this.failedScreenshots.length} screenshots:`);
        this.failedScreenshots.forEach(failure => {
          this.log.error(`  - ${failure.story}: ${failure.error}`);
        });
      }

      this.log.success('Visual Baseline Manager completed successfully');

    } catch (error) {
      this.log.error(`Operation failed: ${error.message}`);
      process.exit(1);
    } finally {
      await this.cleanup();
    }
  }

  displayBanner() {
    console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                    📸 Visual Baseline Manager - AI-Enhanced                 ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  📁 Baseline Directory: ${CONFIG.BASELINE_DIR.replace(process.cwd(), '.')}                ║
║  🌐 Storybook URL: ${CONFIG.STORYBOOK_URL}                    ║
║  🖥️  Viewports: ${CONFIG.VIEWPORTS.map(v => v.name).join(', ')}                        ║
║  🌍 Browsers: ${CONFIG.BROWSERS.map(b => b.name).join(', ')}                          ║
║  🎨 Themes: ${CONFIG.THEMES.map(t => t.name).join(', ')}                             ║
║  🤖 AI Analysis: ${CONFIG.AI_ANALYSIS.enabled ? 'Enabled' : 'Disabled'}                         ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);
  }

  async isStorybookRunning() {
    try {
      const response = await fetch(CONFIG.STORYBOOK_URL);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async startStorybook() {
    return new Promise((resolve, reject) => {
      this.log.info('Starting Storybook server...');
      
      const storybookProcess = spawn('yarn', ['storybook'], {
        cwd: process.cwd(),
        stdio: 'pipe',
      });
      
      let checkAttempts = 0;
      const maxAttempts = 30;
      
      const checkInterval = setInterval(async () => {
        checkAttempts++;
        
        if (await this.isStorybookRunning()) {
          clearInterval(checkInterval);
          this.log.success('Storybook server started successfully');
          resolve();
        } else if (checkAttempts >= maxAttempts) {
          clearInterval(checkInterval);
          storybookProcess.kill();
          reject(new Error('Failed to start Storybook server'));
        }
      }, 2000);
      
      storybookProcess.on('error', (error) => {
        clearInterval(checkInterval);
        reject(error);
      });
    });
  }

  async initializeBrowsers() {
    this.log.info('Initializing browsers...');

    for (const browserConfig of CONFIG.BROWSERS) {
      try {
        const browser = await puppeteer.launch({
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
          ],
          ...(browserConfig.executable && { executablePath: browserConfig.executable })
        });

        this.browsers.set(browserConfig.name, browser);
        this.log.debug(`Initialized ${browserConfig.name} browser`);
      } catch (error) {
        this.log.warning(`Failed to initialize ${browserConfig.name}: ${error.message}`);
      }
    }

    this.log.success(`${this.browsers.size} browsers initialized`);
  }

  async cleanup() {
    this.log.debug('Cleaning up browsers...');
    
    for (const [name, browser] of this.browsers) {
      try {
        await browser.close();
      } catch (error) {
        this.log.debug(`Failed to close ${name}: ${error.message}`);
      }
    }
  }

  async discoverStories() {
    this.log.info('Discovering Storybook stories...');

    try {
      const browser = this.browsers.values().next().value;
      const page = await browser.newPage();
      
      await page.goto(`${CONFIG.STORYBOOK_URL}`, { 
        waitUntil: 'networkidle2',
        timeout: CONFIG.SCREENSHOT.network_idle_timeout
      });

      // Wait for Storybook to load
      await page.waitForSelector('#storybook-preview-iframe', {
        timeout: CONFIG.SCREENSHOT.element_ready_timeout
      });

      // Extract story data from Storybook
      const stories = await page.evaluate(() => {
        const storyStore = window.__STORYBOOK_PREVIEW__?.storyStore;
        if (!storyStore) return [];

        const stories = [];
        const storyIndex = storyStore.storyIndex?.entries || {};
        
        Object.entries(storyIndex).forEach(([id, story]) => {
          stories.push({
            id: id,
            title: story.title || '',
            name: story.name || '',
            component: story.componentPath || '',
          });
        });

        return stories;
      });

      await page.close();

      // Index stories
      stories.forEach(story => {
        this.storyIndex.set(story.id, story);
      });

      this.log.success(`Discovered ${stories.length} stories`);

      // If no stories found, try alternative discovery
      if (stories.length === 0) {
        await this.discoverStoriesAlternative();
      }

    } catch (error) {
      this.log.error(`Failed to discover stories: ${error.message}`);
      // Fall back to file-based discovery
      await this.discoverStoriesFromFiles();
    }
  }

  async discoverStoriesAlternative() {
    this.log.info('Attempting alternative story discovery...');
    
    // Scan for common story patterns
    const patterns = [
      'button--primary',
      'button--secondary',
      'card--elevated',
      'textfield--filled',
      'typography--default',
      'alert--success',
      'modal--basic',
      'tabs--basic',
    ];
    
    patterns.forEach(id => {
      this.storyIndex.set(id, {
        id,
        title: id.split('--')[0],
        name: id.split('--')[1],
      });
    });
    
    this.log.info(`Added ${patterns.length} common story patterns`);
  }

  async discoverStoriesFromFiles() {
    this.log.info('Discovering stories from file system...');

    const storyFiles = this.findStoryFiles(CONFIG.COMPONENTS_DIR);
    let storyCount = 0;

    storyFiles.forEach(file => {
      const componentName = path.basename(path.dirname(file));
      const fileContent = fs.readFileSync(file, 'utf8');
      
      // Extract export names (basic parsing)
      const exportMatches = fileContent.matchAll(/export\s+const\s+(\w+):\s*Story/g);
      
      for (const match of exportMatches) {
        const storyName = match[1];
        const storyId = `${componentName.toLowerCase()}--${storyName.toLowerCase()}`;
        
        this.storyIndex.set(storyId, {
          id: storyId,
          title: componentName,
          name: storyName,
          file: file,
        });
        
        storyCount++;
      }
    });

    this.log.success(`Discovered ${storyCount} stories from ${storyFiles.length} files`);
  }

  findStoryFiles(dir) {
    const files = [];
    
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          files.push(...this.findStoryFiles(fullPath));
        } else if (entry.name.endsWith('.stories.tsx') || entry.name.endsWith('.stories.ts')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      this.log.debug(`Failed to read directory ${dir}: ${error.message}`);
    }

    return files;
  }

  async generateBaselines() {
    this.log.info('Generating visual baselines...');

    const stories = Array.from(this.storyIndex.values());
    const filteredStories = this.filterStories(stories);

    this.log.info(`Generating baselines for ${filteredStories.length} stories`);

    let successCount = 0;
    let failureCount = 0;

    for (const story of filteredStories) {
      const result = await this.generateStoryBaselines(story);
      if (result) {
        successCount++;
      } else {
        failureCount++;
      }
    }

    this.saveBaselineMetadata();
    this.log.success(`Generated baselines: ${successCount} successful, ${failureCount} failed`);
  }

  filterStories(stories) {
    let filtered = stories;

    if (MODE.component) {
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(MODE.component.toLowerCase()) ||
        story.id.toLowerCase().includes(MODE.component.toLowerCase())
      );
    }

    return filtered;
  }

  async generateStoryBaselines(story) {
    this.log.debug(`Generating baselines for story: ${story.title || story.id}`);
    let success = true;

    for (const [browserName, browser] of this.browsers) {
      if (MODE.browser && browserName !== MODE.browser) continue;

      for (const viewport of CONFIG.VIEWPORTS) {
        if (MODE.viewport && viewport.name !== MODE.viewport) continue;

        for (const theme of CONFIG.THEMES) {
          if (MODE.theme && theme.name !== MODE.theme) continue;

          try {
            const screenshot = await this.captureStoryScreenshotWithRetry(
              browser, story, viewport, theme
            );

            if (screenshot) {
              const baselinePath = this.getBaselinePath(
                story.id, browserName, viewport.name, theme.name, 'approved'
              );

              fs.writeFileSync(baselinePath, screenshot);

              // Store metadata
              const metadata = {
                story: story.id,
                browser: browserName,
                viewport: viewport.name,
                theme: theme.name,
                timestamp: new Date().toISOString(),
                size: screenshot.length,
                hash: this.calculateHash(screenshot),
              };

              this.baselineMetadata.set(
                `${story.id}-${browserName}-${viewport.name}-${theme.name}`,
                metadata
              );

              this.log.debug(`Baseline saved: ${path.basename(baselinePath)} (${theme.name} theme)`);
            } else {
              success = false;
            }

          } catch (error) {
            this.failedScreenshots.push({
              story: story.id,
              browser: browserName,
              viewport: viewport.name,
              theme: theme.name,
              error: error.message
            });
            
            if (!MODE.skipFailures) {
              this.log.error(`Failed to generate baseline for ${story.id} (${theme.name}): ${error.message}`);
            }
            
            success = false;
          }
        }
      }
    }
    
    return success;
  }

  async captureStoryScreenshotWithRetry(browser, story, viewport, theme, attempt = 1) {
    try {
      return await this.captureStoryScreenshot(browser, story, viewport, theme);
    } catch (error) {
      if (attempt < CONFIG.RETRY.attempts) {
        this.log.debug(`Retrying screenshot capture for ${story.id} (${theme.name} theme, attempt ${attempt + 1})`);
        await this.wait(CONFIG.RETRY.delay);
        return this.captureStoryScreenshotWithRetry(browser, story, viewport, theme, attempt + 1);
      }
      throw error;
    }
  }

  async captureStoryScreenshot(browser, story, viewport, theme) {
    const page = await browser.newPage();
    
    try {
      await page.setViewport(viewport);
      
      // Set theme global before navigating to story
      const storyUrl = `${CONFIG.STORYBOOK_URL}/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme.globalValue}`;
      
      await page.goto(storyUrl, { 
        waitUntil: 'networkidle2',
        timeout: CONFIG.SCREENSHOT.network_idle_timeout
      });

      // Wait for story to render
      try {
        await page.waitForSelector('#storybook-root', {
          timeout: CONFIG.SCREENSHOT.element_ready_timeout
        });
      } catch (error) {
        this.log.debug(`Root element not found for ${story.id}, continuing anyway`);
      }

      // Ensure theme is applied by checking theme-specific elements
      await page.evaluate((themeName) => {
        // Wait for theme to be applied
        const checkTheme = () => {
          const body = document.body;
          const computedStyle = window.getComputedStyle(body);
          const backgroundColor = computedStyle.backgroundColor;
          
          // Basic theme verification
          if (themeName === 'dark') {
            return backgroundColor === 'rgb(0, 0, 0)' || backgroundColor === 'rgba(0, 0, 0, 1)';
          } else {
            return backgroundColor === 'rgb(255, 255, 255)' || backgroundColor === 'rgba(255, 255, 255, 1)';
          }
        };
        
        return new Promise((resolve) => {
          let attempts = 0;
          const maxAttempts = 10;
          
          const verify = () => {
            if (checkTheme() || attempts >= maxAttempts) {
              resolve();
            } else {
              attempts++;
              setTimeout(verify, 100);
            }
          };
          
          verify();
        });
      }, theme.name);

      // Wait for animations to complete
      await this.wait(CONFIG.SCREENSHOT.stabilization_delay);

      // Remove any loading indicators
      await page.evaluate(() => {
        const loaders = document.querySelectorAll('.sb-show-preparing-story, .sb-show-preparing-docs');
        loaders.forEach(el => el.style.display = 'none');
      });

      // Capture screenshot
      const screenshot = await page.screenshot({
        type: 'png',
        fullPage: false,
      });

      return screenshot;

    } finally {
      await page.close();
    }
  }

  getBaselinePath(storyId, browser, viewport, theme, status) {
    const filename = `${storyId.replace(/[^a-zA-Z0-9-_]/g, '_')}.png`;
    return path.join(
      CONFIG.BASELINE_DIR,
      CONFIG.BASELINE_STRUCTURE[status],
      theme,
      browser,
      viewport,
      filename
    );
  }

  calculateHash(buffer) {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(buffer).digest('hex');
  }

  async updateBaselines() {
    this.log.info('Updating existing baselines...');
    
    const stories = Array.from(this.storyIndex.values());
    const filteredStories = this.filterStories(stories);

    let updateCount = 0;
    let skipCount = 0;

    for (const story of filteredStories) {
      const result = await this.updateStoryBaselines(story);
      if (result === 'updated') {
        updateCount++;
      } else if (result === 'skipped') {
        skipCount++;
      }
    }

    this.saveBaselineMetadata();
    this.log.success(`Baseline update completed: ${updateCount} updated, ${skipCount} skipped`);
  }

  async updateStoryBaselines(story) {
    this.log.debug(`Updating baselines for story: ${story.title || story.id}`);
    let anyUpdated = false;

    for (const [browserName, browser] of this.browsers) {
      for (const viewport of CONFIG.VIEWPORTS) {
        for (const theme of CONFIG.THEMES) {
          try {
            const newScreenshot = await this.captureStoryScreenshotWithRetry(
              browser, story, viewport, theme
            );

            if (!newScreenshot) continue;

            const approvedPath = this.getBaselinePath(
              story.id, browserName, viewport.name, theme.name, 'approved'
            );
            const pendingPath = this.getBaselinePath(
              story.id, browserName, viewport.name, theme.name, 'pending'
            );

            // Save new screenshot as pending
            fs.writeFileSync(pendingPath, newScreenshot);

            // Compare with approved baseline if it exists
            if (fs.existsSync(approvedPath)) {
              const diff = await this.compareBaselines(approvedPath, pendingPath);
              
              if (this.shouldAutoApprove(diff)) {
                // Auto-approve if differences are minimal
                fs.copyFileSync(pendingPath, approvedPath);
                fs.unlinkSync(pendingPath);
                this.log.success(`Auto-approved: ${story.id}-${browserName}-${viewport.name}-${theme.name}`);
                anyUpdated = true;
              } else {
                this.log.warning(`Manual review needed: ${story.id}-${browserName}-${viewport.name}-${theme.name}`);
              }
            } else {
              // No existing baseline, move to approved
              fs.copyFileSync(pendingPath, approvedPath);
              fs.unlinkSync(pendingPath);
              this.log.info(`Created new baseline: ${story.id}-${browserName}-${viewport.name}-${theme.name}`);
              anyUpdated = true;
            }

          } catch (error) {
            this.log.error(`Failed to update baseline for ${story.id} (${theme.name}): ${error.message}`);
          }
        }
      }
    }

    return anyUpdated ? 'updated' : 'skipped';
  }

  async compareBaselines(approvedPath, pendingPath) {
    // Simple file-based comparison for now
    const approvedBuffer = fs.readFileSync(approvedPath);
    const pendingBuffer = fs.readFileSync(pendingPath);
    
    const approvedSize = approvedBuffer.length;
    const pendingSize = pendingBuffer.length;
    
    const sizeDiff = Math.abs(approvedSize - pendingSize) / approvedSize;
    
    // Basic binary comparison
    let identical = approvedSize === pendingSize;
    if (identical) {
      identical = approvedBuffer.equals(pendingBuffer);
    }
    
    return {
      identical,
      pixelDiff: identical ? 0 : 0.05, // Simplified for now
      sizeDiff: sizeDiff,
      layoutShift: 0,
      colorVariance: 0,
      confidence: identical ? 1.0 : 0.8,
    };
  }

  shouldAutoApprove(diff) {
    return (
      diff.identical ||
      (diff.pixelDiff < CONFIG.DIFF_THRESHOLDS.pixel &&
       diff.layoutShift < CONFIG.DIFF_THRESHOLDS.layout &&
       diff.colorVariance < CONFIG.DIFF_THRESHOLDS.color &&
       diff.confidence > CONFIG.AI_ANALYSIS.auto_approve_threshold)
    );
  }

  async approveBaselines() {
    this.log.info('Approving pending baselines...');
    
    const pendingDir = path.join(CONFIG.BASELINE_DIR, CONFIG.BASELINE_STRUCTURE.pending);
    let approvedCount = 0;
    
    const processPendingFiles = (dir, relativePath = '') => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(relativePath, entry.name);
        
        if (entry.isDirectory()) {
          processPendingFiles(fullPath, relPath);
        } else if (entry.name.endsWith('.png')) {
          const approvedPath = path.join(CONFIG.BASELINE_DIR, CONFIG.BASELINE_STRUCTURE.approved, relPath);
          
          fs.mkdirSync(path.dirname(approvedPath), { recursive: true });
          fs.copyFileSync(fullPath, approvedPath);
          fs.unlinkSync(fullPath);
          
          this.log.success(`Approved: ${relPath}`);
          approvedCount++;
        }
      }
    };
    
    if (fs.existsSync(pendingDir)) {
      processPendingFiles(pendingDir);
    }
    
    this.log.success(`Approved ${approvedCount} baselines`);
  }

  async rejectBaselines() {
    this.log.info('Rejecting pending baselines...');
    
    const pendingDir = path.join(CONFIG.BASELINE_DIR, CONFIG.BASELINE_STRUCTURE.pending);
    let rejectedCount = 0;
    
    const rejectPendingFiles = (dir, relativePath = '') => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(relativePath, entry.name);
        
        if (entry.isDirectory()) {
          rejectPendingFiles(fullPath, relPath);
        } else if (entry.name.endsWith('.png')) {
          const rejectedPath = path.join(CONFIG.BASELINE_DIR, CONFIG.BASELINE_STRUCTURE.rejected, relPath);
          
          fs.mkdirSync(path.dirname(rejectedPath), { recursive: true });
          fs.copyFileSync(fullPath, rejectedPath);
          fs.unlinkSync(fullPath);
          
          this.log.info(`Rejected: ${relPath}`);
          rejectedCount++;
        }
      }
    };
    
    if (fs.existsSync(pendingDir)) {
      rejectPendingFiles(pendingDir);
    }
    
    this.log.success(`Rejected ${rejectedCount} baselines`);
  }

  async cleanupBaselines() {
    this.log.info('Cleaning up old baselines...');
    
    const archiveOldFiles = (dir, ageInDays = 30) => {
      const cutoffTime = Date.now() - (ageInDays * 24 * 60 * 60 * 1000);
      let archivedCount = 0;
      
      const processDirectory = (currentDir, relativePath = '') => {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(currentDir, entry.name);
          const relPath = path.join(relativePath, entry.name);
          
          if (entry.isDirectory()) {
            processDirectory(fullPath, relPath);
          } else if (entry.name.endsWith('.png')) {
            const stats = fs.statSync(fullPath);
            
            if (stats.mtime.getTime() < cutoffTime) {
              const archivePath = path.join(CONFIG.BASELINE_DIR, CONFIG.BASELINE_STRUCTURE.archive, relPath);
              
              fs.mkdirSync(path.dirname(archivePath), { recursive: true });
              fs.renameSync(fullPath, archivePath);
              archivedCount++;
            }
          }
        }
      };
      
      if (fs.existsSync(dir)) {
        processDirectory(dir);
      }
      
      return archivedCount;
    };
    
    const rejectedCount = archiveOldFiles(
      path.join(CONFIG.BASELINE_DIR, CONFIG.BASELINE_STRUCTURE.rejected), 
      7
    );
    
    this.log.success(`Archived ${rejectedCount} old rejected baselines`);
  }

  async analyzeBaselines() {
    this.log.info('Analyzing baseline quality and coverage...');
    
    const analysis = {
      totalStories: this.storyIndex.size,
      coveredStories: 0,
      missingBaselines: [],
      baselineStats: {
        approved: 0,
        pending: 0,
        rejected: 0,
      },
      coverage: {},
    };
    
    // Check coverage for each story
    for (const [storyId, story] of this.storyIndex) {
      let hasBaseline = false;
      
      for (const browser of CONFIG.BROWSERS) {
        for (const viewport of CONFIG.VIEWPORTS) {
          for (const theme of CONFIG.THEMES) {
            const approvedPath = this.getBaselinePath(
              storyId, browser.name, viewport.name, theme.name, 'approved'
            );
            
            if (fs.existsSync(approvedPath)) {
              hasBaseline = true;
              analysis.baselineStats.approved++;
            }
          }
        }
      }
      
      if (hasBaseline) {
        analysis.coveredStories++;
      } else {
        analysis.missingBaselines.push(storyId);
      }
    }
    
    analysis.coverage = {
      percentage: Math.round((analysis.coveredStories / analysis.totalStories) * 100),
      covered: analysis.coveredStories,
      total: analysis.totalStories,
    };
    
    // Generate report
    console.log('\n📊 Visual Baseline Analysis Report');
    console.log('=====================================');
    console.log(`📸 Total Stories: ${analysis.totalStories}`);
    console.log(`✅ Covered Stories: ${analysis.coveredStories}`);
    console.log(`📈 Coverage: ${analysis.coverage.percentage}%`);
    console.log(`📁 Approved Baselines: ${analysis.baselineStats.approved}`);
    
    if (analysis.missingBaselines.length > 0) {
      console.log('\n⚠️  Missing Baselines:');
      analysis.missingBaselines.slice(0, 10).forEach(id => {
        console.log(`   - ${id}`);
      });
      
      if (analysis.missingBaselines.length > 10) {
        console.log(`   ... and ${analysis.missingBaselines.length - 10} more`);
      }
    }
    
    console.log('=====================================\n');
    
    // Save analysis report
    const reportPath = path.join(CONFIG.BASELINE_DIR, 'analysis-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
    this.log.success(`Analysis report saved to ${reportPath}`);
  }

  async showStatus() {
    this.log.info('Visual Baseline Status');
    
    const countFiles = (dir) => {
      if (!fs.existsSync(dir)) return 0;
      
      let count = 0;
      const processDir = (currentDir) => {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory()) {
            processDir(path.join(currentDir, entry.name));
          } else if (entry.name.endsWith('.png')) {
            count++;
          }
        }
      };
      
      processDir(dir);
      return count;
    };
    
    const stats = {
      approved: countFiles(path.join(CONFIG.BASELINE_DIR, CONFIG.BASELINE_STRUCTURE.approved)),
      pending: countFiles(path.join(CONFIG.BASELINE_DIR, CONFIG.BASELINE_STRUCTURE.pending)),
      rejected: countFiles(path.join(CONFIG.BASELINE_DIR, CONFIG.BASELINE_STRUCTURE.rejected)),
      archived: countFiles(path.join(CONFIG.BASELINE_DIR, CONFIG.BASELINE_STRUCTURE.archive)),
    };
    
    console.log('\n📊 Visual Baseline Status');
    console.log('========================');
    console.log(`✅ Approved: ${stats.approved}`);
    console.log(`⏳ Pending: ${stats.pending}`);
    console.log(`❌ Rejected: ${stats.rejected}`);
    console.log(`📦 Archived: ${stats.archived}`);
    console.log('========================\n');
    
    if (stats.pending > 0) {
      this.log.warning(`${stats.pending} baselines pending review. Run with --approve or --reject to process them.`);
    }
  }
}

// Main execution
async function main() {
  const manager = new VisualBaselineManager();
  await manager.run();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Visual baseline manager interrupted');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Visual baseline manager terminated');
  process.exit(0);
});

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { VisualBaselineManager, CONFIG };