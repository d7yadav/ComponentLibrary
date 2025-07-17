#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

const STORYBOOK_URL = 'http://localhost:6006';
const OUTPUT_DIR = './visual-baselines/drawer-test';

// Drawer stories to test
const DRAWER_STORIES = [
  'surfaces-drawer--default',
  'surfaces-drawer--temporary-left', 
  'surfaces-drawer--persistent',
  'surfaces-drawer--permanent',
  'surfaces-drawer--mini',
  'surfaces-drawer--complex-drawer'
];

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'desktop', width: 1920, height: 1080 }
];

const THEMES = ['light', 'dark'];

async function createOutputDir() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  for (const theme of THEMES) {
    for (const viewport of VIEWPORTS) {
      await fs.mkdir(path.join(OUTPUT_DIR, theme, viewport.name), { recursive: true });
    }
  }
}

async function captureDrawerStories() {
  console.log('🎭 Starting Drawer Visual Regression Testing...');
  
  await createOutputDir();
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  let totalCaptures = 0;
  let successfulCaptures = 0;
  
  try {
    for (const theme of THEMES) {
      console.log(`\n🎨 Testing ${theme} theme...`);
      
      for (const viewport of VIEWPORTS) {
        console.log(`📱 ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
        
        const page = await browser.newPage();
        await page.setViewport({ width: viewport.width, height: viewport.height });
        
        for (const story of DRAWER_STORIES) {
          totalCaptures++;
          
          try {
            const storyUrl = `${STORYBOOK_URL}/iframe.html?id=${story}&globals=theme:${theme}`;
            console.log(`  📸 Capturing: ${story}`);
            
            // Navigate to story
            await page.goto(storyUrl, { waitUntil: 'networkidle0', timeout: 15000 });
            
            // Wait for component to load
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Click "Open Drawer" button if present (for temporary drawers)
            try {
              const openButton = await page.$('button');
              if (openButton) {
                const buttonText = await page.evaluate(el => el.textContent, openButton);
                if (buttonText && buttonText.includes('Open')) {
                  await openButton.click();
                  await new Promise(resolve => setTimeout(resolve, 1000));
                }
              }
            } catch (e) {
              // Button might not exist for all stories
            }
            
            // Capture screenshot
            const filename = `${story.replace('surfaces-drawer--', 'drawer-')}.png`;
            const filepath = path.join(OUTPUT_DIR, theme, viewport.name, filename);
            
            await page.screenshot({
              path: filepath,
              fullPage: false,
              clip: { x: 0, y: 0, width: viewport.width, height: viewport.height }
            });
            
            successfulCaptures++;
            console.log(`    ✅ Saved: ${filepath}`);
            
          } catch (error) {
            console.log(`    ❌ Failed ${story}: ${error.message}`);
          }
        }
        
        await page.close();
      }
    }
    
  } finally {
    await browser.close();
  }
  
  console.log(`\n📊 Visual Regression Summary:`);
  console.log(`   Total attempts: ${totalCaptures}`);
  console.log(`   Successful captures: ${successfulCaptures}`);
  console.log(`   Success rate: ${Math.round((successfulCaptures/totalCaptures)*100)}%`);
  console.log(`   Output directory: ${OUTPUT_DIR}`);
  
  if (successfulCaptures > 0) {
    console.log(`\n🎉 Drawer visual regression testing completed!`);
    console.log(`   Generated ${successfulCaptures} visual baselines for Drawer component`);
  }
}

// Check if Storybook is running
async function checkStorybook() {
  try {
    const http = require('http');
    return new Promise((resolve) => {
      const req = http.get(STORYBOOK_URL, (res) => {
        resolve(res.statusCode === 200);
      });
      req.on('error', () => resolve(false));
      req.setTimeout(5000, () => {
        req.destroy();
        resolve(false);
      });
    });
  } catch (error) {
    return false;
  }
}

async function main() {
  const isStorybookRunning = await checkStorybook();
  
  if (!isStorybookRunning) {
    console.log('❌ Storybook is not running on http://localhost:6006');
    console.log('   Please start Storybook first: yarn storybook');
    process.exit(1);
  }
  
  await captureDrawerStories();
}

if (require.main === module) {
  main().catch(console.error);
}