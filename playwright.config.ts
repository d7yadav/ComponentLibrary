/**
 * @fileoverview Playwright Configuration - AI-Enhanced Testing Setup
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Configuration for Playwright end-to-end testing with AI-powered
 * test automation, multi-browser support, and visual regression testing.
 */

import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables for configuration
 */
const CI = !!process.env.CI;
const BASE_URL = process.env.BASE_URL || 'http://localhost:6006';

/**
 * AI-Enhanced Playwright Configuration
 */
export default defineConfig({
  // Test directory configuration
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  workers: CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    CI ? ['github'] : ['list'],
  ],
  
  // Global test configuration
  use: {
    // Base URL for tests
    baseURL: BASE_URL,
    
    // Browser context options
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // AI-enhanced testing features
    actionTimeout: 10000,
    navigationTimeout: 30000,
    
    // Accessibility testing
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    },
  },

  // Output directory for test artifacts
  outputDir: 'test-results/',

  // Global setup and teardown
  globalSetup: require.resolve('./tests/config/global-setup.ts'),
  globalTeardown: require.resolve('./tests/config/global-teardown.ts'),

  // Projects for different browsers and scenarios
  projects: [
    // Setup project for installing dependencies
    {
      name: 'setup',
      testMatch: '**/global-setup.ts',
    },

    // Desktop Chrome - Primary testing browser
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // AI testing optimizations
        launchOptions: {
          slowMo: CI ? 0 : 100,
        },
      },
      dependencies: ['setup'],
    },

    // Desktop Firefox - Cross-browser compatibility
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        launchOptions: {
          slowMo: CI ? 0 : 100,
        },
      },
      dependencies: ['setup'],
    },

    // Desktop Safari - WebKit engine
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        launchOptions: {
          slowMo: CI ? 0 : 100,
        },
      },
      dependencies: ['setup'],
    },

    // Mobile Chrome - Responsive testing
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        launchOptions: {
          slowMo: CI ? 0 : 100,
        },
      },
      dependencies: ['setup'],
    },

    // Mobile Safari - iOS testing
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        launchOptions: {
          slowMo: CI ? 0 : 100,
        },
      },
      dependencies: ['setup'],
    },

    // Tablet testing
    {
      name: 'Tablet',
      use: { 
        ...devices['iPad Pro'],
        launchOptions: {
          slowMo: CI ? 0 : 100,
        },
      },
      dependencies: ['setup'],
    },

    // High contrast accessibility testing
    {
      name: 'accessibility-high-contrast',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'dark',
        extraHTTPHeaders: {
          'Accept-Language': 'en-US,en;q=0.9',
        },
        launchOptions: {
          args: ['--force-prefers-reduced-motion'],
          slowMo: CI ? 0 : 100,
        },
      },
      dependencies: ['setup'],
    },

    // Performance testing with throttling
    {
      name: 'performance-throttled',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--enable-features=NetworkServiceLogging',
            '--disable-background-timer-throttling',
          ],
          slowMo: CI ? 0 : 100,
        },
      },
      dependencies: ['setup'],
    },
  ],

  // Local development server configuration
  webServer: {
    command: 'yarn storybook',
    url: BASE_URL,
    reuseExistingServer: !CI,
    timeout: 120000,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  // Test timeout configuration
  timeout: 30000,
  expect: {
    timeout: 5000,
    // Visual comparison threshold
    toHaveScreenshot: { 
      threshold: 0.1,
      mode: 'local',
    },
    toMatchSnapshot: { 
      threshold: 0.1,
    },
  },

  // Test metadata
  metadata: {
    'ai-enhanced': true,
    'storybook-integration': true,
    'visual-regression': true,
    'accessibility-testing': true,
    'performance-monitoring': true,
    'multi-browser': true,
    'responsive-testing': true,
  },
});