#!/usr/bin/env node

/**
 * @fileoverview AI UX Pattern Validator
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Validates UX patterns and design system consistency across components,
 * ensuring proper use of design tokens, interaction patterns, and accessibility standards.
 */

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');
const { promisify } = require('util');

class UXPatternValidator {
  constructor() {
    this.validationResults = {};
    this.designTokens = {};
    this.patternViolations = [];
    this.uxScore = 0;
  }

  /**
   * Main validation method
   */
  async validateUXPatterns(componentPath = 'src/components') {
    console.log('🎨 AI UX Pattern Validation Starting...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
      // Load design tokens and patterns
      await this.loadDesignTokens();
      await this.loadUXPatterns();
      
      // Find and validate components
      const components = await this.findComponents(componentPath);
      
      for (const component of components) {
        await this.validateComponentUX(component);
      }
      
      await this.generateUXReport();
      return this.validationResults;
      
    } catch (error) {
      console.error(`❌ UX pattern validation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Load design tokens from theme files
   */
  async loadDesignTokens() {
    try {
      const themeFiles = [
        'src/theme/palette.ts',
        'src/theme/spacing.ts',
        'src/theme/typography.ts',
        'src/theme/shadows.ts',
        'src/theme/breakpoints.ts'
      ];

      this.designTokens = {
        colors: [],
        spacing: [],
        typography: [],
        shadows: [],
        breakpoints: [],
        animations: []
      };

      for (const themeFile of themeFiles) {
        if (await this.fileExists(themeFile)) {
          const content = await fs.readFile(themeFile, 'utf-8');
          await this.parseDesignTokens(content, themeFile);
        }
      }
      
      console.log(`📋 Loaded ${Object.keys(this.designTokens).length} design token categories`);
      
    } catch (error) {
      console.warn(`⚠️ Could not load design tokens: ${error.message}`);
    }
  }

  /**
   * Parse design tokens from theme files
   */
  async parseDesignTokens(content, filePath) {
    const fileName = path.basename(filePath, '.ts');
    
    // Extract color tokens
    if (fileName === 'palette') {
      this.designTokens.colors = this.extractColorTokens(content);
    }
    
    // Extract spacing tokens
    if (fileName === 'spacing') {
      this.designTokens.spacing = this.extractSpacingTokens(content);
    }
    
    // Extract typography tokens
    if (fileName === 'typography') {
      this.designTokens.typography = this.extractTypographyTokens(content);
    }
    
    // Extract shadow tokens
    if (fileName === 'shadows') {
      this.designTokens.shadows = this.extractShadowTokens(content);
    }
    
    // Extract breakpoint tokens
    if (fileName === 'breakpoints') {
      this.designTokens.breakpoints = this.extractBreakpointTokens(content);
    }
  }

  /**
   * Extract color tokens from palette file
   */
  extractColorTokens(content) {
    const colors = [];
    
    // Extract color definitions
    const colorMatches = content.match(/(primary|secondary|error|warning|info|success|text|background|action):\s*{[^}]+}/g);
    if (colorMatches) {
      for (const match of colorMatches) {
        const colorName = match.match(/(\w+):/)[1];
        const colorValues = match.match(/(main|light|dark|contrastText):\s*['"`]([^'"`]+)['"`]/g);
        
        if (colorValues) {
          for (const colorValue of colorValues) {
            const [, variant, value] = colorValue.match(/(main|light|dark|contrastText):\s*['"`]([^'"`]+)['"`]/);
            colors.push({
              name: `${colorName}.${variant}`,
              value: value,
              category: colorName
            });
          }
        }
      }
    }
    
    return colors;
  }

  /**
   * Extract spacing tokens
   */
  extractSpacingTokens(content) {
    const spacing = [];
    
    // Look for spacing function or array
    const spacingMatch = content.match(/spacing:\s*(?:\([^)]*\)|[^,\n]+)/);
    if (spacingMatch) {
      // Extract numeric spacing values
      const numbers = spacingMatch[0].match(/\d+/g);
      if (numbers) {
        spacing.push(...numbers.map(n => ({ value: n, unit: 'px' })));
      }
    }
    
    return spacing;
  }

  /**
   * Extract typography tokens
   */
  extractTypographyTokens(content) {
    const typography = [];
    
    // Extract typography variants
    const typographyMatches = content.match(/(h[1-6]|body[12]|caption|button|overline|subtitle[12]):\s*{[^}]+}/g);
    if (typographyMatches) {
      for (const match of typographyMatches) {
        const variant = match.match(/(\w+):/)[1];
        const fontSize = match.match(/fontSize:\s*['"`]([^'"`]+)['"`]/);
        const fontWeight = match.match(/fontWeight:\s*(\d+)/);
        
        typography.push({
          variant,
          fontSize: fontSize ? fontSize[1] : null,
          fontWeight: fontWeight ? fontWeight[1] : null
        });
      }
    }
    
    return typography;
  }

  /**
   * Extract shadow tokens
   */
  extractShadowTokens(content) {
    const shadows = [];
    
    // Extract shadow array or definitions
    const shadowMatches = content.match(/'[^']*shadow[^']*'/g);
    if (shadowMatches) {
      shadows.push(...shadowMatches.map((shadow, index) => ({
        level: index,
        value: shadow.replace(/'/g, '')
      })));
    }
    
    return shadows;
  }

  /**
   * Extract breakpoint tokens
   */
  extractBreakpointTokens(content) {
    const breakpoints = [];
    
    // Extract breakpoint values
    const breakpointMatches = content.match(/(xs|sm|md|lg|xl):\s*(\d+)/g);
    if (breakpointMatches) {
      for (const match of breakpointMatches) {
        const [, name, value] = match.match(/(\w+):\s*(\d+)/);
        breakpoints.push({ name, value: parseInt(value) });
      }
    }
    
    return breakpoints;
  }

  /**
   * Load UX patterns and best practices
   */
  async loadUXPatterns() {
    this.uxPatterns = {
      interactionStates: ['hover', 'focus', 'active', 'disabled'],
      accessibilityRequirements: [
        'aria-label',
        'aria-describedby',
        'role',
        'tabindex',
        'keyboard navigation'
      ],
      responsivePatterns: [
        'mobile-first design',
        'touch targets',
        'responsive typography',
        'flexible layouts'
      ],
      performancePatterns: [
        'React.memo usage',
        'useCallback optimization',
        'useMemo optimization',
        'lazy loading'
      ]
    };
  }

  /**
   * Find components to validate
   */
  async findComponents(basePath) {
    const globAsync = promisify(glob);
    const componentFiles = await globAsync(`${basePath}/**/*.tsx`, {
      ignore: ['node_modules/**', '**/*.stories.tsx', '**/*.test.tsx']
    });
    
    const components = [];
    for (const componentFile of componentFiles) {
      const componentDir = path.dirname(componentFile);
      const componentName = path.basename(componentFile, '.tsx');
      
      // Skip if it's an index file or styled component
      if (componentName === 'index' || componentName.includes('.styles')) {
        continue;
      }
      
      components.push({
        name: componentName,
        path: componentDir,
        componentFile,
        stylesFile: path.join(componentDir, `${componentName}.styles.ts`),
        storiesFile: path.join(componentDir, `${componentName}.stories.tsx`)
      });
    }
    
    return components;
  }

  /**
   * Validate UX patterns for individual component
   */
  async validateComponentUX(component) {
    console.log(`\n🎨 Analyzing ${component.name} UX patterns...`);
    
    try {
      const uxValidation = {
        componentName: component.name,
        designTokenUsage: await this.validateDesignTokenUsage(component),
        interactionStates: await this.validateInteractionStates(component),
        accessibilityPatterns: await this.validateAccessibilityPatterns(component),
        responsiveDesign: await this.validateResponsiveDesign(component),
        performancePatterns: await this.validatePerformancePatterns(component),
        uxScore: 0,
        violations: [],
        recommendations: []
      };
      
      // Calculate UX score
      uxValidation.uxScore = this.calculateUXScore(uxValidation);
      
      // Generate recommendations
      uxValidation.recommendations = this.generateUXRecommendations(uxValidation);
      
      // Store results
      this.validationResults[component.name] = uxValidation;
      
      // Report findings
      this.reportUXFindings(component.name, uxValidation);
      
    } catch (error) {
      console.error(`❌ Failed to validate UX for ${component.name}: ${error.message}`);
      this.validationResults[component.name] = {
        error: error.message,
        uxScore: 0
      };
    }
  }

  /**
   * Validate design token usage
   */
  async validateDesignTokenUsage(component) {
    const validation = {
      colorsUsed: [],
      spacingUsed: [],
      typographyUsed: [],
      hardcodedValues: [],
      score: 0
    };
    
    try {
      // Check component file for hardcoded values
      const componentContent = await fs.readFile(component.componentFile, 'utf-8');
      
      // Check styles file if exists
      let stylesContent = '';
      if (await this.fileExists(component.stylesFile)) {
        stylesContent = await fs.readFile(component.stylesFile, 'utf-8');
      }
      
      const allContent = componentContent + '\n' + stylesContent;
      
      // Look for hardcoded colors
      const hardcodedColors = allContent.match(/#[0-9a-fA-F]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)/g);
      if (hardcodedColors) {
        validation.hardcodedValues.push(...hardcodedColors.map(color => ({
          type: 'color',
          value: color,
          suggestion: 'Use theme color tokens instead'
        })));
      }
      
      // Look for hardcoded spacing
      const hardcodedSpacing = allContent.match(/(?:margin|padding|gap|top|left|right|bottom):\s*['"`]?\d+px['"`]?/g);
      if (hardcodedSpacing) {
        validation.hardcodedValues.push(...hardcodedSpacing.map(spacing => ({
          type: 'spacing',
          value: spacing,
          suggestion: 'Use theme.spacing() instead'
        })));
      }
      
      // Look for theme usage
      const themeUsage = allContent.match(/theme\.(palette|spacing|typography|shadows)/g);
      if (themeUsage) {
        validation.colorsUsed = themeUsage.filter(usage => usage.includes('palette'));
        validation.spacingUsed = themeUsage.filter(usage => usage.includes('spacing'));
        validation.typographyUsed = themeUsage.filter(usage => usage.includes('typography'));
      }
      
      // Calculate score
      const totalIssues = validation.hardcodedValues.length;
      const themeUsageCount = (validation.colorsUsed.length + validation.spacingUsed.length + validation.typographyUsed.length);
      validation.score = Math.max(0, 100 - (totalIssues * 10) + (themeUsageCount * 5));
      
    } catch (error) {
      console.warn(`⚠️ Could not validate design tokens for ${component.name}: ${error.message}`);
    }
    
    return validation;
  }

  /**
   * Validate interaction states
   */
  async validateInteractionStates(component) {
    const validation = {
      statesImplemented: [],
      missingStates: [],
      score: 0
    };
    
    try {
      const stylesContent = await this.fileExists(component.stylesFile) 
        ? await fs.readFile(component.stylesFile, 'utf-8')
        : '';
      
      const componentContent = await fs.readFile(component.componentFile, 'utf-8');
      const allContent = stylesContent + '\n' + componentContent;
      
      // Check for interaction states
      for (const state of this.uxPatterns.interactionStates) {
        const statePattern = new RegExp(`[&:]${state}|\\b${state}\\b`, 'i');
        if (statePattern.test(allContent)) {
          validation.statesImplemented.push(state);
        } else {
          validation.missingStates.push(state);
        }
      }
      
      // Calculate score
      validation.score = Math.round(
        (validation.statesImplemented.length / this.uxPatterns.interactionStates.length) * 100
      );
      
    } catch (error) {
      console.warn(`⚠️ Could not validate interaction states for ${component.name}: ${error.message}`);
    }
    
    return validation;
  }

  /**
   * Validate accessibility patterns
   */
  async validateAccessibilityPatterns(component) {
    const validation = {
      accessibilityFeatures: [],
      missingFeatures: [],
      score: 0
    };
    
    try {
      const componentContent = await fs.readFile(component.componentFile, 'utf-8');
      
      // Check for accessibility features
      for (const feature of this.uxPatterns.accessibilityRequirements) {
        const featurePattern = new RegExp(feature.replace(/[^a-zA-Z0-9]/g, '[-\\s]?'), 'i');
        if (featurePattern.test(componentContent)) {
          validation.accessibilityFeatures.push(feature);
        } else {
          validation.missingFeatures.push(feature);
        }
      }
      
      // Check for semantic HTML
      const semanticElements = componentContent.match(/<(button|input|label|fieldset|legend|nav|main|section|article|header|footer)/g);
      if (semanticElements && semanticElements.length > 0) {
        validation.accessibilityFeatures.push('semantic HTML');
      }
      
      // Calculate score
      validation.score = Math.round(
        (validation.accessibilityFeatures.length / (this.uxPatterns.accessibilityRequirements.length + 1)) * 100
      );
      
    } catch (error) {
      console.warn(`⚠️ Could not validate accessibility for ${component.name}: ${error.message}`);
    }
    
    return validation;
  }

  /**
   * Validate responsive design patterns
   */
  async validateResponsiveDesign(component) {
    const validation = {
      responsiveFeatures: [],
      missingFeatures: [],
      score: 0
    };
    
    try {
      const stylesContent = await this.fileExists(component.stylesFile) 
        ? await fs.readFile(component.stylesFile, 'utf-8')
        : '';
      
      const componentContent = await fs.readFile(component.componentFile, 'utf-8');
      const allContent = stylesContent + '\n' + componentContent;
      
      // Check for responsive patterns
      const breakpointUsage = allContent.match(/theme\.breakpoints\.(up|down|between|only)/g);
      if (breakpointUsage && breakpointUsage.length > 0) {
        validation.responsiveFeatures.push('breakpoint usage');
      }
      
      const responsiveUnits = allContent.match(/\d+(rem|em|%|vw|vh|vmin|vmax)/g);
      if (responsiveUnits && responsiveUnits.length > 0) {
        validation.responsiveFeatures.push('responsive units');
      }
      
      const flexboxUsage = allContent.match(/display:\s*['"`]?flex['"`]?|flexDirection|alignItems|justifyContent/g);
      if (flexboxUsage && flexboxUsage.length > 0) {
        validation.responsiveFeatures.push('flexible layouts');
      }
      
      // Calculate score
      const maxFeatures = 3; // breakpoints, units, flexible layouts
      validation.score = Math.round((validation.responsiveFeatures.length / maxFeatures) * 100);
      
    } catch (error) {
      console.warn(`⚠️ Could not validate responsive design for ${component.name}: ${error.message}`);
    }
    
    return validation;
  }

  /**
   * Validate performance patterns
   */
  async validatePerformancePatterns(component) {
    const validation = {
      optimizations: [],
      missingOptimizations: [],
      score: 0
    };
    
    try {
      const componentContent = await fs.readFile(component.componentFile, 'utf-8');
      
      // Check for React.memo
      if (componentContent.includes('React.memo') || componentContent.includes('memo(')) {
        validation.optimizations.push('React.memo');
      } else {
        validation.missingOptimizations.push('React.memo');
      }
      
      // Check for useCallback
      if (componentContent.includes('useCallback')) {
        validation.optimizations.push('useCallback');
      }
      
      // Check for useMemo
      if (componentContent.includes('useMemo')) {
        validation.optimizations.push('useMemo');
      }
      
      // Check for unnecessary re-renders (inline objects)
      const inlineObjects = componentContent.match(/\{\s*[^}]*:\s*[^}]*\}/g);
      if (inlineObjects && inlineObjects.length > 3) {
        validation.missingOptimizations.push('extract inline objects');
      }
      
      // Calculate score
      const totalOptimizations = validation.optimizations.length;
      const penalties = validation.missingOptimizations.length * 10;
      validation.score = Math.max(0, Math.min(100, totalOptimizations * 25 - penalties));
      
    } catch (error) {
      console.warn(`⚠️ Could not validate performance patterns for ${component.name}: ${error.message}`);
    }
    
    return validation;
  }

  /**
   * Calculate overall UX score
   */
  calculateUXScore(uxValidation) {
    const weights = {
      designTokenUsage: 0.25,
      interactionStates: 0.20,
      accessibilityPatterns: 0.25,
      responsiveDesign: 0.15,
      performancePatterns: 0.15
    };
    
    let totalScore = 0;
    totalScore += (uxValidation.designTokenUsage.score || 0) * weights.designTokenUsage;
    totalScore += (uxValidation.interactionStates.score || 0) * weights.interactionStates;
    totalScore += (uxValidation.accessibilityPatterns.score || 0) * weights.accessibilityPatterns;
    totalScore += (uxValidation.responsiveDesign.score || 0) * weights.responsiveDesign;
    totalScore += (uxValidation.performancePatterns.score || 0) * weights.performancePatterns;
    
    return Math.round(totalScore);
  }

  /**
   * Generate UX recommendations
   */
  generateUXRecommendations(uxValidation) {
    const recommendations = [];
    
    // Design token recommendations
    if (uxValidation.designTokenUsage.hardcodedValues.length > 0) {
      recommendations.push(`Replace ${uxValidation.designTokenUsage.hardcodedValues.length} hardcoded values with theme tokens`);
    }
    
    // Interaction state recommendations
    if (uxValidation.interactionStates.missingStates.length > 0) {
      recommendations.push(`Add missing interaction states: ${uxValidation.interactionStates.missingStates.join(', ')}`);
    }
    
    // Accessibility recommendations
    if (uxValidation.accessibilityPatterns.missingFeatures.length > 0) {
      recommendations.push(`Improve accessibility with: ${uxValidation.accessibilityPatterns.missingFeatures.slice(0, 2).join(', ')}`);
    }
    
    // Performance recommendations
    if (uxValidation.performancePatterns.missingOptimizations.length > 0) {
      recommendations.push(`Add performance optimizations: ${uxValidation.performancePatterns.missingOptimizations.join(', ')}`);
    }
    
    return recommendations;
  }

  /**
   * Report UX findings
   */
  reportUXFindings(componentName, uxValidation) {
    const scoreEmoji = uxValidation.uxScore >= 80 ? '🟢' : uxValidation.uxScore >= 60 ? '🟡' : '🔴';
    console.log(`${scoreEmoji} ${componentName}: ${uxValidation.uxScore}/100 UX Score`);
    
    if (uxValidation.recommendations.length > 0) {
      console.log(`   💡 Top recommendation: ${uxValidation.recommendations[0]}`);
    }
    
    // Show critical issues
    const criticalIssues = [];
    if (uxValidation.designTokenUsage.hardcodedValues.length > 0) {
      criticalIssues.push(`${uxValidation.designTokenUsage.hardcodedValues.length} hardcoded values`);
    }
    if (uxValidation.accessibilityPatterns.score < 50) {
      criticalIssues.push('low accessibility score');
    }
    
    if (criticalIssues.length > 0) {
      console.log(`   ⚠️ Critical issues: ${criticalIssues.join(', ')}`);
    }
  }

  /**
   * Generate comprehensive UX report
   */
  async generateUXReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.generateUXSummary(),
      components: this.validationResults,
      globalRecommendations: this.generateGlobalUXRecommendations()
    };

    // Save report
    const reportsDir = path.join(process.cwd(), '.ai-reports');
    await fs.mkdir(reportsDir, { recursive: true });
    
    const reportFile = path.join(reportsDir, `ux-patterns-${report.timestamp.replace(/[:.]/g, '-')}.json`);
    await fs.writeFile(reportFile, JSON.stringify(report, null, 2));

    // Display summary
    this.displayUXSummary(report);
    
    console.log(`\n📄 Detailed UX report saved: ${reportFile}`);
    
    return report;
  }

  /**
   * Generate UX summary
   */
  generateUXSummary() {
    const components = Object.values(this.validationResults).filter(c => !c.error);
    const totalComponents = components.length;
    
    if (totalComponents === 0) return { error: 'No valid components found' };

    const avgScore = Math.round(
      components.reduce((sum, c) => sum + c.uxScore, 0) / totalComponents
    );
    
    const excellentComponents = components.filter(c => c.uxScore >= 80).length;
    const goodComponents = components.filter(c => c.uxScore >= 60 && c.uxScore < 80).length;
    const needsWorkComponents = components.filter(c => c.uxScore < 60).length;

    return {
      totalComponents,
      averageUXScore: avgScore,
      distribution: {
        excellent: excellentComponents,
        good: goodComponents,
        needsWork: needsWorkComponents
      }
    };
  }

  /**
   * Generate global UX recommendations
   */
  generateGlobalUXRecommendations() {
    const allRecommendations = [];
    
    for (const component of Object.values(this.validationResults)) {
      if (component.recommendations) {
        allRecommendations.push(...component.recommendations);
      }
    }

    // Count frequency of recommendations
    const recommendationCounts = {};
    for (const rec of allRecommendations) {
      const key = rec.split(':')[0].split(' ').slice(0, 3).join(' '); // Get recommendation type
      recommendationCounts[key] = (recommendationCounts[key] || 0) + 1;
    }

    // Sort by frequency and return top recommendations
    const sortedRecs = Object.entries(recommendationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([rec, count]) => `${rec} (${count} components)`);

    return sortedRecs;
  }

  /**
   * Display UX summary
   */
  displayUXSummary(report) {
    console.log('\n🎨 UX PATTERN VALIDATION REPORT');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (report.summary.error) {
      console.log(`❌ ${report.summary.error}`);
      return;
    }

    console.log(`🎯 Average UX Score: ${report.summary.averageUXScore}/100`);
    console.log(`📊 Component Distribution:`);
    console.log(`   🟢 Excellent (80-100): ${report.summary.distribution.excellent}`);
    console.log(`   🟡 Good (60-79): ${report.summary.distribution.good}`);
    console.log(`   🔴 Needs Work (<60): ${report.summary.distribution.needsWork}`);
    
    if (report.globalRecommendations.length > 0) {
      console.log('\n🎯 Top UX Improvements Needed:');
      report.globalRecommendations.forEach(rec => console.log(`   • ${rec}`));
    }
  }

  /**
   * Utility method to check if file exists
   */
  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

// Main execution
async function main() {
  const validator = new UXPatternValidator();
  
  try {
    const componentPath = process.argv[2] || 'src/components';
    const results = await validator.validateUXPatterns(componentPath);
    
    // Exit with appropriate code based on results
    const avgScore = validator.generateUXSummary().averageUXScore;
    if (avgScore < 60) {
      console.log('\n⚠️ UX patterns below recommended threshold (60%). Consider improving design system consistency.');
      process.exit(1);
    } else {
      console.log('\n✅ UX pattern validation passed!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ UX validation failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { UXPatternValidator };