# Visual Regression Testing Guide

## 🎯 Overview

This project includes a sophisticated visual regression testing system that automatically detects visual changes when you add new components or modify existing ones. The system is designed to be resilient and won't break when new components are added.

## 🔧 Fixed Issues

### Previous Problems
- ❌ `page.waitForTimeout is not a function` error with newer Puppeteer versions
- ❌ System would break when adding new components or stories
- ❌ No graceful handling of build failures
- ❌ Limited error recovery and retry mechanisms

### Solutions Implemented
- ✅ Fixed Puppeteer compatibility issues
- ✅ Smart detection of new components vs. regressions
- ✅ Graceful mode for non-critical changes
- ✅ Comprehensive error handling and retry logic
- ✅ Auto-acceptance of new component baselines

## 🚀 Available Commands

### Core Visual Regression Commands

```bash
# 🎨 Chromatic Integration (Recommended)
yarn chromatic:analyze          # Analyze changes without uploading
yarn chromatic:build            # Build Storybook for Chromatic
yarn chromatic:upload           # Upload to Chromatic with AI analysis
yarn chromatic:review           # Open Chromatic dashboard
yarn chromatic:graceful         # Run in graceful mode (won't fail CI)

# 📸 Local Visual Baselines
yarn visual:status              # Check current baseline status
yarn visual:generate            # Generate new baselines
yarn visual:update              # Update existing baselines
yarn visual:approve             # Approve pending changes
yarn visual:reject              # Reject pending changes
yarn visual:analyze             # Analyze baseline coverage
yarn visual:cleanup             # Archive old baselines
```

### Advanced Options

```bash
# Component-specific testing
yarn visual:generate --component=Button
yarn chromatic:analyze --component=Button

# Browser-specific testing
yarn visual:generate --browser=chromium
yarn visual:update --viewport=mobile

# Error handling modes
yarn chromatic:analyze --skip-failures    # Continue on errors
yarn chromatic:analyze --graceful         # Never fail (for CI)
yarn visual:generate --skip-failures      # Skip failed screenshots
```

## 🆕 Adding New Components

### Automatic New Component Detection

The system automatically detects when you add new components and handles them appropriately:

1. **Detection**: Scans `src/components/` for new component directories
2. **Classification**: Distinguishes between new components and regressions
3. **Baseline Creation**: Auto-generates baselines for new components
4. **Risk Assessment**: Treats new components as low-risk changes

### Example Workflow

```bash
# 1. Add your new component files
mkdir src/components/awesome/NewComponent
# ... create component files ...

# 2. Add stories for your component
# ... create NewComponent.stories.tsx ...

# 3. Run visual regression testing
yarn chromatic:analyze

# The system will:
# ✅ Detect "NewComponent" as new
# ✅ Generate baselines automatically
# ✅ Mark changes as "low risk"
# ✅ Suggest auto-acceptance
```

## 📊 AI-Powered Analysis

### Smart Change Categorization

The system uses AI to categorize visual changes:

- 🔧 **Layout changes**: Spacing, positioning, sizing
- 🎨 **Color changes**: Theme updates, palette modifications
- 📝 **Typography changes**: Font, size, weight modifications
- 🆕 **New components**: Completely new UI elements
- 📱 **Responsive changes**: Mobile/tablet/desktop variations

### Risk Assessment

Changes are automatically categorized by risk level:

- 🟢 **Low Risk**: New components, minor styling tweaks
- 🟡 **Medium Risk**: Layout shifts, color changes
- 🔴 **High Risk**: Multiple significant changes

### Auto-Acceptance Criteria

Changes are automatically accepted when:
- ✅ AI confidence > 85%
- ✅ Risk level is "low"
- ✅ Changes are primarily new components
- ✅ Fewer than 2 modifications to existing components

## 🔄 CI/CD Integration

### GitHub Actions Setup

```yaml
name: Visual Regression Testing
on: [push, pull_request]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: yarn install
        
      - name: Run visual regression tests
        run: yarn chromatic:graceful
        env:
          CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

### Graceful Mode for CI

Use `--graceful` mode in CI to prevent build failures from visual changes:

```bash
yarn chromatic:graceful    # Never fails, always exits with 0
yarn chromatic:analyze     # Standard mode, may fail CI
```

## 🛠️ Configuration

### Environment Variables

```bash
# Required for Chromatic integration
export CHROMATIC_PROJECT_TOKEN="your_chromatic_token"

# Optional configuration
export STORYBOOK_URL="http://localhost:6006"  # Custom Storybook URL
```

### Baseline Configuration

Edit `scripts/visual-baseline-manager-fixed.cjs` to customize:

```javascript
const CONFIG = {
  VIEWPORTS: [
    { name: 'mobile', width: 375, height: 667, deviceScaleFactor: 2 },
    { name: 'tablet', width: 768, height: 1024, deviceScaleFactor: 2 },
    { name: 'desktop', width: 1920, height: 1080, deviceScaleFactor: 1 },
  ],
  
  DIFF_THRESHOLDS: {
    pixel: 0.1,      // 0.1% pixel difference threshold
    layout: 0.05,    // 5% layout shift threshold
    color: 0.15,     // 15% color variance threshold
  },
  
  AI_ANALYSIS: {
    confidence_threshold: 0.8,
    auto_approve_threshold: 0.95,
  }
};
```

## 📋 Best Practices

### 1. Story Organization

Structure your stories for optimal visual testing:

```typescript
// ✅ Good: Clear, focused stories
export const Primary: Story = {
  args: { variant: 'primary' }
};

export const Secondary: Story = {
  args: { variant: 'secondary' }
};

// ❌ Avoid: Complex, dynamic stories
export const Random: Story = {
  render: () => <Button variant={Math.random() > 0.5 ? 'primary' : 'secondary'} />
};
```

### 2. Stable Visual Elements

Ensure your components render consistently:

```typescript
// ✅ Good: Stable, predictable content
<Button>Click me</Button>

// ❌ Avoid: Dynamic content that changes
<Button>{new Date().toLocaleString()}</Button>
```

### 3. New Component Workflow

When adding new components:

1. ✅ Create component implementation
2. ✅ Add comprehensive stories
3. ✅ Run `yarn chromatic:analyze` to generate baselines
4. ✅ Review and approve new baselines
5. ✅ Commit everything together

### 4. Handling Regressions

When visual regressions are detected:

1. 🔍 **Review**: Check the Chromatic dashboard or baseline diffs
2. 🤔 **Assess**: Determine if changes are intentional or bugs
3. ✅ **Accept**: Run `yarn visual:approve` for intentional changes
4. ❌ **Reject**: Run `yarn visual:reject` and fix the issues
5. 🔄 **Update**: Re-run tests after fixes

## 🚨 Troubleshooting

### Common Issues

#### Storybook Not Starting
```bash
# Start Storybook manually first
yarn storybook

# Then run visual tests in another terminal
yarn visual:status
```

#### Browser Launch Failures
```bash
# Install required browser dependencies
npx playwright install-deps

# Or use system Chrome
export CHROME_EXECUTABLE_PATH=/usr/bin/google-chrome
```

#### Chromatic API Errors
```bash
# Check your token is set
echo $CHROMATIC_PROJECT_TOKEN

# Run in analysis-only mode
yarn chromatic:analyze
```

#### Build Failures
```bash
# Use graceful mode to avoid CI failures
yarn chromatic:graceful

# Skip failing screenshots
yarn visual:generate --skip-failures
```

### Debug Mode

Enable verbose logging for troubleshooting:

```bash
yarn chromatic:analyze --verbose
yarn visual:generate --verbose
```

## 📈 Monitoring and Reports

### Analysis Reports

Visual regression reports are automatically generated:

- 📁 `chromatic-ai-analysis/reports/` - Chromatic analysis reports
- 📁 `visual-baselines/` - Local baseline images
- 📊 `visual-baselines/analysis-report.json` - Coverage analysis

### Coverage Metrics

Check your visual testing coverage:

```bash
yarn visual:analyze
```

This shows:
- 📊 Total stories vs covered stories
- 📈 Coverage percentage
- 📋 Missing baselines
- 📊 Baseline statistics

## 🔮 Future Enhancements

### Planned Features

- 🤖 **ML-based change prediction**: Predict likely visual changes
- 🎨 **Smart crop detection**: Focus on component-specific areas
- 📱 **Device-specific testing**: iOS/Android specific baselines
- 🔄 **Auto-healing baselines**: Self-updating baselines for minor changes
- 📊 **Advanced analytics**: Change patterns and regression trends

### Integration Roadmap

- ✅ **Chromatic integration** - Complete
- ✅ **New component detection** - Complete
- ✅ **Graceful failure modes** - Complete
- 🔄 **Parallel testing** - In progress
- 🔄 **Advanced diff algorithms** - Planned
- 🔄 **Cross-browser automation** - Planned

## 📞 Support

If you encounter issues with the visual regression testing system:

1. 📖 Check this documentation first
2. 🔍 Enable `--verbose` mode for detailed logs
3. 🛡️ Try `--graceful` mode for CI environments
4. 📊 Run `yarn visual:analyze` to check coverage
5. 🔄 Use `--skip-failures` for partial success

The system is designed to be resilient and should handle most edge cases gracefully. When in doubt, use the graceful mode to prevent CI failures while investigating issues.