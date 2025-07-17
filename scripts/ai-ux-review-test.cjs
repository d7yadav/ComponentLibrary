#!/usr/bin/env node

/**
 * @fileoverview Simple UX Review Test Script
 * Test version to debug issues quickly
 */

const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');

class UXReviewTest {
  constructor() {
    this.storybookUrl = 'http://localhost:6006';
  }

  async discoverStories() {
    console.log('🔍 Discovering available stories...');
    
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      
      // Navigate to Storybook index
      await page.goto(`${this.storybookUrl}`, { waitUntil: 'networkidle0', timeout: 10000 });
      await this.delay(3000);
      
      // Get stories from the index
      const stories = await page.evaluate(() => {
        // Try to find story data in the page
        const storyElements = document.querySelectorAll('[data-item-id]');
        return Array.from(storyElements).map(el => el.getAttribute('data-item-id')).filter(Boolean);
      });
      
      console.log(`📚 Found ${stories.length} stories:`);
      stories.slice(0, 10).forEach(story => console.log(`   - ${story}`));
      
      return stories;
      
    } finally {
      await browser.close();
    }
  }

  async testBasicCapture() {
    console.log('🧪 Testing basic screenshot capture...');
    
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      
      // Test working stories from the Storybook index
      const testUrls = [
        `${this.storybookUrl}/iframe.html?id=core-button--default&viewMode=story`,
        `${this.storybookUrl}/iframe.html?id=core-chip--default&viewMode=story`,
        `${this.storybookUrl}/iframe.html?id=core-iconbutton--default&viewMode=story`,
        `${this.storybookUrl}/iframe.html?id=forms-textfield--default&viewMode=story`
      ];
      
      for (const [index, testUrl] of testUrls.entries()) {
        console.log(`\n📷 Testing Button URL ${index + 1}: ${testUrl}`);
        
        try {
          await page.goto(testUrl, { waitUntil: 'networkidle0', timeout: 10000 });
          console.log('✅ Navigation successful');
          
          await this.delay(2000);
          
          // Quick check for content
          const hasContent = await page.evaluate(() => {
            const root = document.querySelector('#storybook-root');
            return root && (root.children.length > 0 || root.getBoundingClientRect().height > 10);
          });
          
          if (hasContent) {
            console.log('🎉 Found working URL!');
            const buttonUrl = testUrl;
            
            // Continue with the detailed test
            break;
          } else {
            console.log('❌ No content found');
          }
          
        } catch (error) {
          console.log('❌ Navigation failed:', error.message);
        }
      }
      
      // Use the first URL for detailed testing
      const buttonUrl = testUrls[0];
      
      try {
        await page.goto(buttonUrl, { waitUntil: 'networkidle0', timeout: 15000 });
        console.log('✅ Navigation successful');
        
        // Wait for component to load with improved logic
        await this.waitForStorybookToLoad(page);
        
        // Debug: Check what's actually in the page
        const pageInfo = await page.evaluate(() => {
          const root = document.querySelector('#storybook-root');
          const docRoot = document.querySelector('#root');
          const body = document.body;
          
          return {
            hasStorybookRoot: !!root,
            storybookRootHTML: root ? root.innerHTML.substring(0, 200) : null,
            storybookRootChildren: root ? root.children.length : 0,
            hasDocRoot: !!docRoot,
            docRootHTML: docRoot ? docRoot.innerHTML.substring(0, 200) : null,
            bodyHTML: body.innerHTML.substring(0, 300),
            allIds: Array.from(document.querySelectorAll('[id]')).map(el => el.id),
            allClassesWithStory: Array.from(document.querySelectorAll('[class*="story"], [class*="Story"]')).map(el => el.className)
          };
        });
        
        console.log('🔍 Page analysis:');
        console.log('   Has #storybook-root:', pageInfo.hasStorybookRoot);
        console.log('   Storybook root children:', pageInfo.storybookRootChildren);
        console.log('   Has #root:', pageInfo.hasDocRoot);
        console.log('   All IDs found:', pageInfo.allIds.slice(0, 10));
        console.log('   Story classes:', pageInfo.allClassesWithStory.slice(0, 5));
        
        if (pageInfo.hasStorybookRoot) {
          console.log('   Storybook content preview:', pageInfo.storybookRootHTML);
        }
        
        // Try to find component using various selectors
        const storyRoot = await page.$('#storybook-root');
        if (storyRoot) {
          console.log('✅ Found storybook-root');
          
          // Check if it has content
          const hasContent = await page.evaluate(() => {
            const root = document.querySelector('#storybook-root');
            if (!root) return false;
            
            // Check for various types of content
            const hasChildren = root.children.length > 0;
            const hasText = root.textContent && root.textContent.trim().length > 0;
            const hasElements = root.querySelector('*') !== null;
            
            return { hasChildren, hasText, hasElements, innerHTML: root.innerHTML.substring(0, 500) };
          });
          
          console.log('📋 Content analysis:', hasContent);
          
          const bounds = await storyRoot.boundingBox();
          console.log('📏 Component bounds:', bounds);
          
          // Take screenshot regardless of content verification
          const screenshotPath = path.join(process.cwd(), '.ai-reports', 'test-screenshot-debug.png');
          await fs.mkdir(path.dirname(screenshotPath), { recursive: true });
          
          await page.screenshot({ 
            path: screenshotPath,
            fullPage: true
          });
          
          console.log(`✅ Full page screenshot saved: ${screenshotPath}`);
          
          // Also try clipped screenshot
          if (bounds && bounds.width > 0 && bounds.height > 0) {
            const clippedPath = path.join(process.cwd(), '.ai-reports', 'test-screenshot-clipped.png');
            await page.screenshot({ 
              path: clippedPath,
              clip: bounds
            });
            console.log(`✅ Clipped screenshot saved: ${clippedPath}`);
          }
          
        } else {
          console.log('❌ storybook-root not found');
          
          // Take full page screenshot for debugging
          const debugPath = path.join(process.cwd(), '.ai-reports', 'debug-no-root.png');
          await fs.mkdir(path.dirname(debugPath), { recursive: true });
          await page.screenshot({ path: debugPath, fullPage: true });
          console.log(`🐛 Debug screenshot saved: ${debugPath}`);
          
          // Check for other possible containers
          const rootSelectors = ['#root', '.sb-show-main', '[data-testid]', '.docs-story'];
          for (const selector of rootSelectors) {
            const element = await page.$(selector);
            if (element) {
              console.log(`✅ Found alternative: ${selector}`);
              const altBounds = await element.boundingBox();
              console.log(`   Bounds:`, altBounds);
            }
          }
        }
        
      } catch (error) {
        console.error('❌ Navigation failed:', error.message);
      }
      
    } finally {
      await browser.close();
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
          console.log('✅ Storybook component loaded');
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

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run test
async function main() {
  try {
    const test = new UXReviewTest();
    
    // First discover available stories
    await test.discoverStories();
    
    // Then test screenshot capture
    await test.testBasicCapture();
    
    console.log('\n✅ Test completed');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { UXReviewTest };