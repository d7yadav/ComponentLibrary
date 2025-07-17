#!/usr/bin/env node

/**
 * @fileoverview AI Test Coverage Validator
 * @description Validates test coverage and quality for all components
 * @author AI-Enhanced Development System
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

/**
 * Test Quality Assessment Criteria
 */
const TEST_QUALITY_CRITERIA = {
  // Required test sections
  requiredSections: [
    'Rendering',
    'Props',
    'Interactions',
    'Accessibility',
    'Theme Integration',
    'Performance',
    'Edge Cases',
    'Snapshots'
  ],
  
  // Required test cases per section
  minimumTestCases: {
    'Rendering': 4,      // Basic render, children, testid, className
    'Props': 2,          // Variant/size tests minimum
    'Interactions': 1,   // At least one interaction test
    'Accessibility': 4,  // WCAG, screen reader, keyboard, ARIA
    'Theme Integration': 2, // Theme customization, dark mode
    'Performance': 1,    // Performance test
    'Edge Cases': 3,     // Empty, null, undefined handling
    'Snapshots': 1       // At least default snapshot
  },
  
  // Required imports for comprehensive testing
  requiredImports: [
    '@testing-library/react',
    '@testing-library/user-event',
    'jest-axe',
    '@mui/material/styles'
  ],
  
  // Component-specific test requirements
  componentSpecificTests: {
    Button: ['click events', 'keyboard navigation', 'loading state'],
    TextField: ['input changes', 'validation states', 'form integration'],
    Card: ['hover states', 'media loading', 'interactive variants'],
    Alert: ['severity variants', 'auto-hide functionality'],
    Snackbar: ['positioning', 'auto-hide', 'action buttons'],
    Progress: ['determinate/indeterminate', 'animation states'],
    Loading: ['spinner variants', 'skeleton states'],
    Tabs: ['tab switching', 'keyboard navigation', 'scroll behavior'],
    Breadcrumbs: ['navigation', 'separator variants', 'truncation']
  }
};

/**
 * Analyze test file quality
 */
function analyzeTestFile(filePath, componentName) {
  const analysis = {
    exists: false,
    score: 0,
    issues: [],
    strengths: [],
    sections: {},
    testCount: 0,
    coverage: {
      rendering: false,
      props: false,
      interactions: false,
      accessibility: false,
      theming: false,
      performance: false,
      edgeCases: false,
      snapshots: false
    }
  };

  // Check if test file exists
  if (!fs.existsSync(filePath)) {
    analysis.issues.push('❌ Test file does not exist');
    return analysis;
  }

  analysis.exists = true;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Analyze imports
  const imports = content.match(/import .+ from ['""].+['""]/g) || [];
  const importScore = analyzeImports(imports, analysis);
  
  // Analyze test structure
  const structureScore = analyzeTestStructure(content, analysis);
  
  // Analyze test coverage
  const coverageScore = analyzeTestCoverage(content, componentName, analysis);
  
  // Analyze component-specific tests
  const specificScore = analyzeComponentSpecificTests(content, componentName, analysis);
  
  // Calculate overall score
  analysis.score = Math.round((importScore + structureScore + coverageScore + specificScore) / 4);
  
  return analysis;
}

/**
 * Analyze import quality
 */
function analyzeImports(imports, analysis) {
  let score = 0;
  const importText = imports.join('\n');
  
  TEST_QUALITY_CRITERIA.requiredImports.forEach(requiredImport => {
    if (importText.includes(requiredImport)) {
      score += 25;
      analysis.strengths.push(`✅ Imports ${requiredImport}`);
    } else {
      analysis.issues.push(`⚠️ Missing import: ${requiredImport}`);
    }
  });
  
  // Check for additional quality imports
  if (importText.includes('vi.fn()') || importText.includes('jest.fn()')) {
    analysis.strengths.push('✅ Uses mock functions');
  }
  
  if (importText.includes('waitFor')) {
    analysis.strengths.push('✅ Uses async testing utilities');
  }
  
  return Math.min(score, 100);
}

/**
 * Analyze test structure and organization
 */
function analyzeTestStructure(content, analysis) {
  let score = 0;
  
  // Check for required describe blocks
  TEST_QUALITY_CRITERIA.requiredSections.forEach(section => {
    const regex = new RegExp(`describe\\(['"]${section}['"]`, 'g');
    const matches = content.match(regex);
    
    if (matches) {
      analysis.sections[section] = matches.length;
      score += 12.5; // 100 / 8 sections
      analysis.strengths.push(`✅ Has ${section} test section`);
      
      // Update coverage flags
      switch(section) {
        case 'Rendering': analysis.coverage.rendering = true; break;
        case 'Props': analysis.coverage.props = true; break;
        case 'Interactions': analysis.coverage.interactions = true; break;
        case 'Accessibility': analysis.coverage.accessibility = true; break;
        case 'Theme Integration': analysis.coverage.theming = true; break;
        case 'Performance': analysis.coverage.performance = true; break;
        case 'Edge Cases': analysis.coverage.edgeCases = true; break;
        case 'Snapshots': analysis.coverage.snapshots = true; break;
      }
    } else {
      analysis.issues.push(`❌ Missing ${section} test section`);
    }
  });
  
  // Count total test cases
  const testCases = content.match(/it\(['"][^'"]*['"]|\s*test\(['"][^'"]*['"]/g) || [];
  analysis.testCount = testCases.length;
  
  if (analysis.testCount >= 20) {
    analysis.strengths.push(`✅ Comprehensive test coverage (${analysis.testCount} tests)`);
  } else if (analysis.testCount >= 10) {
    analysis.strengths.push(`✅ Good test coverage (${analysis.testCount} tests)`);
  } else {
    analysis.issues.push(`⚠️ Limited test coverage (${analysis.testCount} tests)`);
  }
  
  return Math.min(score, 100);
}

/**
 * Analyze test coverage quality
 */
function analyzeTestCoverage(content, componentName, analysis) {
  let score = 0;
  
  // Check for accessibility testing
  if (content.includes('axe(container)')) {
    score += 20;
    analysis.strengths.push('✅ Uses automated accessibility testing');
  } else {
    analysis.issues.push('❌ Missing automated accessibility testing');
  }
  
  // Check for user interaction testing
  if (content.includes('userEvent.')) {
    score += 20;
    analysis.strengths.push('✅ Tests user interactions');
  } else {
    analysis.issues.push('❌ Missing user interaction tests');
  }
  
  // Check for async testing
  if (content.includes('waitFor') || content.includes('await')) {
    score += 15;
    analysis.strengths.push('✅ Tests async behavior');
  }
  
  // Check for error handling
  if (content.includes('toThrow') || content.includes('error')) {
    score += 15;
    analysis.strengths.push('✅ Tests error handling');
  }
  
  // Check for snapshot testing
  if (content.includes('toMatchSnapshot')) {
    score += 15;
    analysis.strengths.push('✅ Uses snapshot testing');
  } else {
    analysis.issues.push('⚠️ Missing snapshot testing');
  }
  
  // Check for theme testing
  if (content.includes('ThemeProvider') && content.includes('createTheme')) {
    score += 15;
    analysis.strengths.push('✅ Tests theme integration');
  } else {
    analysis.issues.push('❌ Missing theme integration tests');
  }
  
  return Math.min(score, 100);
}

/**
 * Analyze component-specific test requirements
 */
function analyzeComponentSpecificTests(content, componentName, analysis) {
  const specificTests = TEST_QUALITY_CRITERIA.componentSpecificTests[componentName];
  
  if (!specificTests) {
    return 100; // No specific requirements
  }
  
  let score = 0;
  const pointsPerTest = 100 / specificTests.length;
  
  specificTests.forEach(testRequirement => {
    const keywords = testRequirement.toLowerCase().split(' ');
    const hasTest = keywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
    
    if (hasTest) {
      score += pointsPerTest;
      analysis.strengths.push(`✅ Tests ${testRequirement}`);
    } else {
      analysis.issues.push(`⚠️ Missing ${componentName}-specific test: ${testRequirement}`);
    }
  });
  
  return Math.min(score, 100);
}

/**
 * Validate test coverage for all components
 */
function validateTestCoverage() {
  console.log('🤖 AI Test Coverage Validator - Starting comprehensive analysis...\n');
  
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    scores: [],
    components: {}
  };
  
  // Find all component directories
  const componentsDir = 'src/components';
  
  function scanComponents(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && item[0] === item[0].toUpperCase()) {
        // This is a component directory
        const componentName = item;
        const testFilePath = path.join(fullPath, `${componentName}.test.tsx`);
        
        console.log(`🔄 Analyzing: ${componentName}`);
        
        const analysis = analyzeTestFile(testFilePath, componentName);
        results.components[componentName] = analysis;
        results.total++;
        results.scores.push(analysis.score);
        
        if (analysis.score >= 80) {
          results.passed++;
          console.log(`✅ ${componentName}: ${analysis.score}/100 (Excellent)`);
        } else if (analysis.score >= 60) {
          results.passed++;
          console.log(`✅ ${componentName}: ${analysis.score}/100 (Good)`);
        } else {
          results.failed++;
          console.log(`❌ ${componentName}: ${analysis.score}/100 (Needs Improvement)`);
        }
      } else if (stat.isDirectory()) {
        scanComponents(fullPath);
      }
    }
  }
  
  scanComponents(componentsDir);
  
  // Calculate overall statistics
  const averageScore = results.scores.length > 0 
    ? Math.round(results.scores.reduce((a, b) => a + b, 0) / results.scores.length)
    : 0;
  
  const coveragePercentage = results.total > 0 
    ? Math.round((results.passed / results.total) * 100)
    : 0;
  
  // Display summary
  console.log('\n📊 Test Coverage Analysis Summary:');
  console.log(`📈 Components Analyzed: ${results.total}`);
  console.log(`✅ Passing Quality Threshold: ${results.passed}`);
  console.log(`❌ Below Quality Threshold: ${results.failed}`);
  console.log(`📊 Average Test Quality Score: ${averageScore}/100`);
  console.log(`📊 Coverage Percentage: ${coveragePercentage}%`);
  
  // Detailed results for failing components
  if (results.failed > 0) {
    console.log('\n🔍 Components Needing Improvement:');
    
    for (const [componentName, analysis] of Object.entries(results.components)) {
      if (analysis.score < 80) {
        console.log(`\n📋 ${componentName} (Score: ${analysis.score}/100):`);
        
        if (analysis.issues.length > 0) {
          console.log('  Issues:');
          analysis.issues.slice(0, 5).forEach(issue => console.log(`    ${issue}`));
        }
        
        if (analysis.strengths.length > 0) {
          console.log('  Strengths:');
          analysis.strengths.slice(0, 3).forEach(strength => console.log(`    ${strength}`));
        }
      }
    }
  }
  
  // Recommendations
  console.log('\n💡 Recommendations:');
  
  if (averageScore < 70) {
    console.log('  🎯 Focus on improving test quality across all components');
    console.log('  📚 Add missing test sections (Accessibility, Performance, Edge Cases)');
    console.log('  🔧 Use yarn gen:tests to regenerate improved test files');
  } else if (averageScore < 85) {
    console.log('  🎯 Good foundation - focus on component-specific test requirements');
    console.log('  🔍 Add more detailed interaction and edge case testing');
  } else {
    console.log('  🎉 Excellent test coverage! Consider adding integration tests');
  }
  
  // Quality gates
  console.log('\n🚨 Quality Gates:');
  console.log(`  📊 Minimum Average Score (80): ${averageScore >= 80 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  📊 Minimum Coverage (90%): ${coveragePercentage >= 90 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  📊 Zero Missing Tests: ${results.total > 0 && Object.values(results.components).every(c => c.exists) ? '✅ PASS' : '❌ FAIL'}`);
  
  return {
    passed: averageScore >= 80 && coveragePercentage >= 90,
    score: averageScore,
    coverage: coveragePercentage,
    results
  };
}

/**
 * Generate test coverage report
 */
function generateCoverageReport(results) {
  const reportPath = 'test-coverage-report.json';
  
  const averageScore = results.scores && results.scores.length > 0 
    ? results.scores.reduce((a, b) => a + b, 0) / results.scores.length
    : 0;
  const coveragePercentage = results.total > 0 
    ? (results.passed / results.total) * 100
    : 0;

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalComponents: results.total,
      passed: results.passed,
      failed: results.failed,
      averageScore: averageScore,
      coveragePercentage: coveragePercentage
    },
    components: results.components,
    qualityGates: {
      minimumScore: averageScore >= 80,
      minimumCoverage: coveragePercentage >= 90,
      allTestsExist: results.components ? Object.values(results.components).every(c => c.exists) : false
    }
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  return report;
}

/**
 * Main execution
 */
if (require.main === module) {
  // Check if running in correct directory
  if (!fs.existsSync('src/components')) {
    console.error('❌ Error: Must be run from project root directory');
    process.exit(1);
  }
  
  const results = validateTestCoverage();
  generateCoverageReport(results);
  
  // Exit with appropriate code
  process.exit(results.passed ? 0 : 1);
}

module.exports = {
  validateTestCoverage,
  analyzeTestFile,
  generateCoverageReport,
  TEST_QUALITY_CRITERIA
};