#!/usr/bin/env node

/**
 * @fileoverview AI Story Coverage Validator
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * Comprehensive validation that ensures Storybook stories cover all possible use cases,
 * component variants, states, and accessibility scenarios for maximum UX coverage.
 */

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');
const { promisify } = require('util');

class StoryCoverageValidator {
  constructor() {
    this.validationResults = {};
    this.coverageMetrics = {};
    this.missingScenarios = [];
    this.uxIssues = [];
  }

  /**
   * Main validation method
   */
  async validateStoryCoverage(componentPath = 'src/components') {
    console.log('🎯 AI Story Coverage Validation Starting...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
      const components = await this.findComponents(componentPath);
      
      for (const component of components) {
        await this.validateComponentStories(component);
      }
      
      await this.generateCoverageReport();
      return this.validationResults;
      
    } catch (error) {
      console.error(`❌ Story coverage validation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Find all components with stories
   */
  async findComponents(basePath) {
    const globAsync = promisify(glob);
    const storyFiles = await globAsync(`${basePath}/**/*.stories.@(ts|tsx|js|jsx)`, {
      ignore: 'node_modules/**'
    });
    
    const components = [];
    for (const storyFile of storyFiles) {
      const componentDir = path.dirname(storyFile);
      const componentName = path.basename(componentDir);
      const componentFile = path.join(componentDir, `${componentName}.tsx`);
      const typesFile = path.join(componentDir, `${componentName}.types.ts`);
      
      if (await this.fileExists(componentFile)) {
        components.push({
          name: componentName,
          path: componentDir,
          storyFile,
          componentFile,
          typesFile: await this.fileExists(typesFile) ? typesFile : null
        });
      }
    }
    
    return components;
  }

  /**
   * Validate individual component story coverage
   */
  async validateComponentStories(component) {
    console.log(`\n🔍 Analyzing ${component.name} component...`);
    
    try {
      // Parse component props and variants
      const componentProps = await this.parseComponentProps(component);
      const storyExports = await this.parseStoryExports(component.storyFile);
      
      // Analyze coverage
      const coverage = this.analyzeCoverage(component, componentProps, storyExports);
      
      // Store results
      this.validationResults[component.name] = coverage;
      
      // Report findings
      this.reportComponentFindings(component.name, coverage);
      
    } catch (error) {
      console.error(`❌ Failed to validate ${component.name}: ${error.message}`);
      this.validationResults[component.name] = {
        error: error.message,
        coverageScore: 0
      };
    }
  }

  /**
   * Parse component props from TypeScript interfaces
   */
  async parseComponentProps(component) {
    const props = {
      variants: [],
      states: [],
      sizes: [],
      colors: [],
      booleanProps: [],
      complexProps: []
    };

    try {
      if (component.typesFile) {
        const typesContent = await fs.readFile(component.typesFile, 'utf-8');
        
        // Extract prop types using regex patterns
        props.variants = this.extractEnumValues(typesContent, /type\s+\w*Variant\s*=\s*([^;]+)/g);
        props.sizes = this.extractEnumValues(typesContent, /type\s+\w*Size\s*=\s*([^;]+)/g);
        props.colors = this.extractEnumValues(typesContent, /type\s+\w*Color\s*=\s*([^;]+)/g);
        
        // Extract boolean props
        const interfaceMatch = typesContent.match(/interface\s+\w+Props\s*{([^}]+)}/s);
        if (interfaceMatch) {
          const interfaceContent = interfaceMatch[1];
          props.booleanProps = this.extractBooleanProps(interfaceContent);
          props.complexProps = this.extractComplexProps(interfaceContent);
        }
      }
      
      // Parse component constants for additional variants
      const constantsFile = path.join(component.path, `${component.name}.constants.ts`);
      if (await this.fileExists(constantsFile)) {
        const constantsContent = await fs.readFile(constantsFile, 'utf-8');
        const additionalVariants = this.extractConstantArrays(constantsContent);
        
        props.variants = [...new Set([...props.variants, ...additionalVariants.variants])];
        props.sizes = [...new Set([...props.sizes, ...additionalVariants.sizes])];
        props.colors = [...new Set([...props.colors, ...additionalVariants.colors])];
      }
      
    } catch (error) {
      console.warn(`⚠️ Could not parse props for ${component.name}: ${error.message}`);
    }

    return props;
  }

  /**
   * Extract enum values from TypeScript type definitions
   */
  extractEnumValues(content, regex) {
    const values = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      const enumContent = match[1];
      const enumValues = enumContent.match(/'([^']+)'/g);
      if (enumValues) {
        values.push(...enumValues.map(v => v.replace(/'/g, '')));
      }
    }
    return [...new Set(values)];
  }

  /**
   * Extract boolean props from interface
   */
  extractBooleanProps(interfaceContent) {
    const booleanProps = [];
    const lines = interfaceContent.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.includes('boolean') && !trimmed.startsWith('//') && !trimmed.startsWith('*')) {
        const propMatch = trimmed.match(/(\w+)\??:\s*boolean/);
        if (propMatch) {
          booleanProps.push(propMatch[1]);
        }
      }
    }
    
    return booleanProps;
  }

  /**
   * Extract complex props that need special testing
   */
  extractComplexProps(interfaceContent) {
    const complexProps = [];
    const lines = interfaceContent.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('//') && !trimmed.startsWith('*')) {
        // Look for array props, function props, or union types
        if (trimmed.includes('[]') || trimmed.includes('()') || trimmed.includes('|')) {
          const propMatch = trimmed.match(/(\w+)\??:/);
          if (propMatch) {
            complexProps.push(propMatch[1]);
          }
        }
      }
    }
    
    return complexProps;
  }

  /**
   * Extract constant arrays from constants file
   */
  extractConstantArrays(content) {
    const result = { variants: [], sizes: [], colors: [] };
    
    // Extract arrays containing variants, sizes, colors
    const arrayMatches = content.match(/export const \w+.*=\s*\[([\s\S]*?)\]/g);
    if (arrayMatches) {
      for (const arrayMatch of arrayMatches) {
        const values = arrayMatch.match(/'([^']+)'/g);
        if (values) {
          const cleanValues = values.map(v => v.replace(/'/g, ''));
          
          if (arrayMatch.toLowerCase().includes('variant')) {
            result.variants.push(...cleanValues);
          } else if (arrayMatch.toLowerCase().includes('size')) {
            result.sizes.push(...cleanValues);
          } else if (arrayMatch.toLowerCase().includes('color')) {
            result.colors.push(...cleanValues);
          }
        }
      }
    }
    
    return result;
  }

  /**
   * Parse story exports from story file
   */
  async parseStoryExports(storyFile) {
    const storyContent = await fs.readFile(storyFile, 'utf-8');
    const stories = [];
    
    // Find all story exports
    const storyMatches = storyContent.match(/export const (\w+): Story/g);
    if (storyMatches) {
      for (const match of storyMatches) {
        const storyName = match.match(/export const (\w+):/)[1];
        
        // Get story content
        const storyRegex = new RegExp(`export const ${storyName}: Story = \\{([\\s\\S]*?)\\};`, 'm');
        const storyMatch = storyContent.match(storyRegex);
        
        if (storyMatch) {
          const storyArgs = this.parseStoryArgs(storyMatch[1]);
          stories.push({
            name: storyName,
            args: storyArgs,
            category: this.categorizeStory(storyName, storyArgs)
          });
        }
      }
    }
    
    return stories;
  }

  /**
   * Parse story arguments from story definition
   */
  parseStoryArgs(storyContent) {
    const args = {};
    
    // Extract args object
    const argsMatch = storyContent.match(/args:\s*\{([^}]*)\}/s);
    if (argsMatch) {
      const argsContent = argsMatch[1];
      
      // Parse simple key-value pairs
      const argLines = argsContent.split(',');
      for (const line of argLines) {
        const trimmed = line.trim();
        if (trimmed) {
          const keyValueMatch = trimmed.match(/(\w+):\s*([^,\n]+)/);
          if (keyValueMatch) {
            const key = keyValueMatch[1];
            const value = keyValueMatch[2].replace(/['"`]/g, '').trim();
            args[key] = value;
          }
        }
      }
    }
    
    return args;
  }

  /**
   * Categorize story based on name and args
   */
  categorizeStory(storyName, storyArgs) {
    const name = storyName.toLowerCase();
    
    if (name.includes('default') || name === 'primary') return 'default';
    if (name.includes('variant') || name.includes('primary') || name.includes('secondary')) return 'variants';
    if (name.includes('size') || name.includes('small') || name.includes('large')) return 'sizes';
    if (name.includes('color')) return 'colors';
    if (name.includes('disabled') || name.includes('loading') || name.includes('error')) return 'states';
    if (name.includes('accessibility') || name.includes('focus') || name.includes('keyboard')) return 'accessibility';
    if (name.includes('responsive') || name.includes('mobile')) return 'responsive';
    if (name.includes('edge') || name.includes('complex') || name.includes('overflow')) return 'edge-cases';
    if (name.includes('dark') || name.includes('theme')) return 'themes';
    
    return 'other';
  }

  /**
   * Analyze coverage based on component props and stories
   */
  analyzeCoverage(component, componentProps, stories) {
    const coverage = {
      componentName: component.name,
      totalStories: stories.length,
      categories: this.analyzeCategoryCompletion(stories),
      propCoverage: this.analyzePropCoverage(componentProps, stories),
      missingScenarios: [],
      coverageScore: 0,
      recommendations: []
    };

    // Calculate missing scenarios
    coverage.missingScenarios = this.findMissingScenarios(componentProps, stories, coverage.categories);
    
    // Calculate coverage score
    coverage.coverageScore = this.calculateCoverageScore(coverage);
    
    // Generate recommendations
    coverage.recommendations = this.generateRecommendations(coverage);

    return coverage;
  }

  /**
   * Analyze story category completion
   */
  analyzeCategoryCompletion(stories) {
    const categories = {
      default: { required: true, stories: [] },
      variants: { required: true, stories: [] },
      sizes: { required: true, stories: [] },
      colors: { required: false, stories: [] },
      states: { required: true, stories: [] },
      accessibility: { required: true, stories: [] },
      responsive: { required: false, stories: [] },
      'edge-cases': { required: false, stories: [] },
      themes: { required: true, stories: [] },
      other: { required: false, stories: [] }
    };

    for (const story of stories) {
      if (categories[story.category]) {
        categories[story.category].stories.push(story);
      }
    }

    // Add completion status
    for (const [category, data] of Object.entries(categories)) {
      data.isComplete = data.stories.length > 0;
      data.isMissing = data.required && data.stories.length === 0;
    }

    return categories;
  }

  /**
   * Analyze prop coverage
   */
  analyzePropCoverage(componentProps, stories) {
    const coverage = {};
    
    for (const [propType, values] of Object.entries(componentProps)) {
      if (Array.isArray(values) && values.length > 0) {
        coverage[propType] = {
          total: values.length,
          covered: [],
          missing: []
        };

        // Check which values are covered in stories
        for (const value of values) {
          const isCovered = stories.some(story => 
            Object.values(story.args).some(arg => 
              String(arg).toLowerCase() === value.toLowerCase()
            )
          );
          
          if (isCovered) {
            coverage[propType].covered.push(value);
          } else {
            coverage[propType].missing.push(value);
          }
        }
        
        coverage[propType].coveragePercentage = Math.round(
          (coverage[propType].covered.length / coverage[propType].total) * 100
        );
      }
    }
    
    return coverage;
  }

  /**
   * Find missing scenarios that should be covered
   */
  findMissingScenarios(componentProps, stories, categories) {
    const missing = [];

    // Check for missing mandatory categories
    for (const [category, data] of Object.entries(categories)) {
      if (data.isMissing) {
        missing.push({
          type: 'category',
          category,
          description: `Missing ${category} stories - this is required for comprehensive coverage`
        });
      }
    }

    // Check for missing prop combinations
    for (const [propType, coverage] of Object.entries(this.analyzePropCoverage(componentProps, stories))) {
      if (coverage.missing.length > 0) {
        missing.push({
          type: 'props',
          propType,
          missing: coverage.missing,
          description: `Missing stories for ${propType}: ${coverage.missing.join(', ')}`
        });
      }
    }

    // Check for missing accessibility scenarios
    const accessibilityScenarios = [
      'keyboard navigation',
      'screen reader support',
      'focus management',
      'high contrast mode'
    ];

    const hasAccessibilityStories = categories.accessibility.stories.length > 0;
    if (!hasAccessibilityStories) {
      missing.push({
        type: 'accessibility',
        scenarios: accessibilityScenarios,
        description: 'Missing accessibility testing scenarios'
      });
    }

    return missing;
  }

  /**
   * Calculate overall coverage score
   */
  calculateCoverageScore(coverage) {
    let score = 0;
    let maxScore = 0;

    // Category completion (40% of score)
    const requiredCategories = Object.values(coverage.categories).filter(c => c.required);
    const completedCategories = requiredCategories.filter(c => c.isComplete);
    score += (completedCategories.length / requiredCategories.length) * 40;
    maxScore += 40;

    // Prop coverage (40% of score)
    const propCoverages = Object.values(coverage.propCoverage);
    if (propCoverages.length > 0) {
      const avgPropCoverage = propCoverages.reduce((sum, prop) => sum + prop.coveragePercentage, 0) / propCoverages.length;
      score += (avgPropCoverage / 100) * 40;
    }
    maxScore += 40;

    // Story quantity (20% of score)
    const minStories = 10; // Minimum expected stories per component
    const storyScore = Math.min(coverage.totalStories / minStories, 1) * 20;
    score += storyScore;
    maxScore += 20;

    return Math.round((score / maxScore) * 100);
  }

  /**
   * Generate actionable recommendations
   */
  generateRecommendations(coverage) {
    const recommendations = [];

    // Missing categories
    for (const [category, data] of Object.entries(coverage.categories)) {
      if (data.isMissing) {
        recommendations.push(`Add ${category} stories to cover essential use cases`);
      }
    }

    // Prop coverage improvements
    for (const [propType, propCoverage] of Object.entries(coverage.propCoverage)) {
      if (propCoverage.coveragePercentage < 80) {
        recommendations.push(`Improve ${propType} coverage: add stories for ${propCoverage.missing.join(', ')}`);
      }
    }

    // Story quantity
    if (coverage.totalStories < 10) {
      recommendations.push('Consider adding more comprehensive stories for edge cases and complex scenarios');
    }

    // Accessibility
    const hasAccessibility = coverage.categories.accessibility.isComplete;
    if (!hasAccessibility) {
      recommendations.push('Add accessibility-focused stories for keyboard navigation, screen readers, and focus management');
    }

    return recommendations;
  }

  /**
   * Report findings for individual component
   */
  reportComponentFindings(componentName, coverage) {
    const scoreEmoji = coverage.coverageScore >= 90 ? '🟢' : coverage.coverageScore >= 70 ? '🟡' : '🔴';
    console.log(`${scoreEmoji} ${componentName}: ${coverage.coverageScore}/100`);
    
    if (coverage.missingScenarios.length > 0) {
      console.log(`   📋 Missing scenarios (${coverage.missingScenarios.length}):`);
      coverage.missingScenarios.slice(0, 3).forEach(scenario => {
        console.log(`      • ${scenario.description}`);
      });
      if (coverage.missingScenarios.length > 3) {
        console.log(`      • ... and ${coverage.missingScenarios.length - 3} more`);
      }
    }

    if (coverage.recommendations.length > 0) {
      console.log(`   💡 Top recommendation: ${coverage.recommendations[0]}`);
    }
  }

  /**
   * Generate comprehensive coverage report
   */
  async generateCoverageReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.generateSummary(),
      components: this.validationResults,
      recommendations: this.generateGlobalRecommendations()
    };

    // Save report
    const reportsDir = path.join(process.cwd(), '.ai-reports');
    await fs.mkdir(reportsDir, { recursive: true });
    
    const reportFile = path.join(reportsDir, `story-coverage-${report.timestamp.replace(/[:.]/g, '-')}.json`);
    await fs.writeFile(reportFile, JSON.stringify(report, null, 2));

    // Display summary
    this.displaySummary(report);
    
    console.log(`\n📄 Detailed report saved: ${reportFile}`);
    
    return report;
  }

  /**
   * Generate summary statistics
   */
  generateSummary() {
    const components = Object.values(this.validationResults).filter(c => !c.error);
    const totalComponents = components.length;
    
    if (totalComponents === 0) return { error: 'No valid components found' };

    const avgScore = Math.round(
      components.reduce((sum, c) => sum + c.coverageScore, 0) / totalComponents
    );
    
    const excellentComponents = components.filter(c => c.coverageScore >= 90).length;
    const goodComponents = components.filter(c => c.coverageScore >= 70 && c.coverageScore < 90).length;
    const needsWorkComponents = components.filter(c => c.coverageScore < 70).length;

    return {
      totalComponents,
      averageScore: avgScore,
      distribution: {
        excellent: excellentComponents,
        good: goodComponents,
        needsWork: needsWorkComponents
      }
    };
  }

  /**
   * Generate global recommendations
   */
  generateGlobalRecommendations() {
    const allRecommendations = [];
    
    for (const component of Object.values(this.validationResults)) {
      if (component.recommendations) {
        allRecommendations.push(...component.recommendations);
      }
    }

    // Count frequency of recommendations
    const recommendationCounts = {};
    for (const rec of allRecommendations) {
      const key = rec.split(':')[0]; // Get recommendation type
      recommendationCounts[key] = (recommendationCounts[key] || 0) + 1;
    }

    // Sort by frequency and return top recommendations
    const sortedRecs = Object.entries(recommendationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([rec, count]) => `${rec} (affects ${count} components)`);

    return sortedRecs;
  }

  /**
   * Display summary in console
   */
  displaySummary(report) {
    console.log('\n📊 STORY COVERAGE VALIDATION REPORT');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (report.summary.error) {
      console.log(`❌ ${report.summary.error}`);
      return;
    }

    console.log(`📈 Average Coverage Score: ${report.summary.averageScore}/100`);
    console.log(`📊 Component Distribution:`);
    console.log(`   🟢 Excellent (90-100): ${report.summary.distribution.excellent}`);
    console.log(`   🟡 Good (70-89): ${report.summary.distribution.good}`);
    console.log(`   🔴 Needs Work (<70): ${report.summary.distribution.needsWork}`);
    
    if (report.recommendations.length > 0) {
      console.log('\n🎯 Top Global Recommendations:');
      report.recommendations.forEach(rec => console.log(`   • ${rec}`));
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
  const validator = new StoryCoverageValidator();
  
  try {
    const componentPath = process.argv[2] || 'src/components';
    const results = await validator.validateStoryCoverage(componentPath);
    
    // Exit with appropriate code based on results
    const avgScore = validator.generateSummary().averageScore;
    if (avgScore < 70) {
      console.log('\n⚠️ Story coverage below recommended threshold (70%). Consider adding more comprehensive stories.');
      process.exit(1);
    } else {
      console.log('\n✅ Story coverage validation passed!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { StoryCoverageValidator };