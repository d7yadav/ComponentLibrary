#!/usr/bin/env node
/**
 * Context Optimizer Script
 * Automatically manages documentation bloat while preserving essential workflow scripts
 * 
 * Usage:
 * node scripts/context-optimizer.cjs --analyze    # Analyze current context usage
 * node scripts/context-optimizer.cjs --optimize   # Optimize documentation files
 * node scripts/context-optimizer.cjs --preserve   # Preserve essential scripts only
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ContextOptimizer {
  constructor() {
    this.projectRoot = process.cwd();
    this.essentialScripts = [
      'ai-monitor-enhanced.cjs',
      'ai-code-validator-enhanced.cjs',
      'ai-storybook-validator.cjs',
      'ai-story-coverage-validator.cjs',
      'ai-ux-pattern-validator.cjs',
      'ai-component-enhancer.cjs',
      'unified-ai-workflow.cjs',
      'ai-senior-engineer.cjs',
      'quality-dashboard.cjs',
      'visual-baseline-manager.cjs',
      'performance-benchmark.cjs'
    ];
    this.essentialCommands = [
      'ai:monitor',
      'ai:validate',
      'ai:validate:storybook',
      'ai:validate:coverage',
      'ai:validate:ux',
      'ai:enhance',
      'ai:workflow',
      'ai:senior-engineer',
      'quality:dashboard',
      'visual:generate',
      'perf:benchmark'
    ];
  }

  analyzeContext() {
    console.log('🔍 Analyzing current context usage...\n');
    
    const analysis = {
      documentation: this.analyzeDocumentation(),
      scripts: this.analyzeScripts(),
      packageJson: this.analyzePackageJson(),
      recommendations: []
    };

    this.generateRecommendations(analysis);
    this.displayAnalysis(analysis);
    
    return analysis;
  }

  analyzeDocumentation() {
    const docs = [];
    const docFiles = [
      'CLAUDE.md',
      'COMPREHENSIVE_PRD.md',
      'README.md'
    ];

    docFiles.forEach(file => {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').length;
        const size = Buffer.byteLength(content, 'utf-8');
        
        docs.push({
          file,
          lines,
          size: Math.round(size / 1024),
          bloatLevel: this.calculateBloatLevel(lines, size)
        });
      }
    });

    // Check for specification files
    const specFiles = fs.readdirSync(this.projectRoot)
      .filter(file => file.endsWith('-specification.md') || file.endsWith('-checklist.md'));
    
    if (specFiles.length > 0) {
      docs.push({
        file: `${specFiles.length} specification files`,
        lines: specFiles.length * 100, // Estimated
        size: specFiles.length * 4, // Estimated 4KB each
        bloatLevel: specFiles.length > 10 ? 'HIGH' : 'MEDIUM'
      });
    }

    return docs;
  }

  analyzeScripts() {
    const scriptsDir = path.join(this.projectRoot, 'scripts');
    const scripts = {
      total: 0,
      essential: 0,
      obsolete: 0,
      duplicates: 0,
      files: []
    };

    if (fs.existsSync(scriptsDir)) {
      const files = fs.readdirSync(scriptsDir).filter(file => file.endsWith('.cjs') || file.endsWith('.js'));
      scripts.total = files.length;

      files.forEach(file => {
        const isEssential = this.essentialScripts.includes(file);
        const isDuplicate = this.checkForDuplicate(file, files);
        const isObsolete = this.checkIfObsolete(file);

        if (isEssential) scripts.essential++;
        if (isDuplicate) scripts.duplicates++;
        if (isObsolete) scripts.obsolete++;

        scripts.files.push({
          file,
          isEssential,
          isDuplicate,
          isObsolete,
          size: this.getFileSize(path.join(scriptsDir, file))
        });
      });
    }

    return scripts;
  }

  analyzePackageJson() {
    const packagePath = path.join(this.projectRoot, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    
    const scripts = pkg.scripts || {};
    const aiScripts = Object.keys(scripts).filter(key => key.startsWith('ai:'));
    const totalScripts = Object.keys(scripts).length;

    return {
      totalScripts,
      aiScripts: aiScripts.length,
      essentialCommands: this.essentialCommands.filter(cmd => scripts[cmd]).length,
      obsoleteCommands: this.findObsoleteCommands(scripts)
    };
  }

  calculateBloatLevel(lines, sizeKB) {
    if (lines > 2000 || sizeKB > 80) return 'HIGH';
    if (lines > 1000 || sizeKB > 40) return 'MEDIUM';
    return 'LOW';
  }

  checkForDuplicate(file, allFiles) {
    const baseName = file.replace(/(-fixed|-enhanced|-v2)?\.cjs$/, '');
    const similar = allFiles.filter(f => f.includes(baseName) && f !== file);
    return similar.length > 0;
  }

  checkIfObsolete(file) {
    const obsoletePatterns = [
      'fix-',
      'cleanup-',
      'drawer-visual-',
      'test-ai-preview',
      '-legacy',
      '-old'
    ];
    return obsoletePatterns.some(pattern => file.includes(pattern));
  }

  getFileSize(filePath) {
    try {
      const stats = fs.statSync(filePath);
      return Math.round(stats.size / 1024);
    } catch {
      return 0;
    }
  }

  findObsoleteCommands(scripts) {
    const obsoletePatterns = [
      ':old',
      ':legacy',
      ':demo',
      ':verbose',
      'fix-',
      'cleanup-',
      'drawer-'
    ];
    
    return Object.keys(scripts).filter(cmd => 
      obsoletePatterns.some(pattern => cmd.includes(pattern))
    );
  }

  generateRecommendations(analysis) {
    const recommendations = [];

    // Documentation recommendations
    analysis.documentation.forEach(doc => {
      if (doc.bloatLevel === 'HIGH') {
        recommendations.push({
          type: 'documentation',
          priority: 'HIGH',
          action: `Condense ${doc.file} (${doc.lines} lines → ~${Math.round(doc.lines * 0.3)} lines)`
        });
      }
    });

    // Script recommendations
    if (analysis.scripts.obsolete > 0) {
      recommendations.push({
        type: 'scripts',
        priority: 'MEDIUM',
        action: `Remove ${analysis.scripts.obsolete} obsolete scripts`
      });
    }

    if (analysis.scripts.duplicates > 0) {
      recommendations.push({
        type: 'scripts',
        priority: 'MEDIUM',
        action: `Consolidate ${analysis.scripts.duplicates} duplicate scripts`
      });
    }

    // Package.json recommendations
    if (analysis.packageJson.obsoleteCommands.length > 0) {
      recommendations.push({
        type: 'package',
        priority: 'LOW',
        action: `Remove ${analysis.packageJson.obsoleteCommands.length} obsolete commands`
      });
    }

    analysis.recommendations = recommendations;
  }

  optimizeDocumentation() {
    console.log('📝 Optimizing documentation files...\n');

    // Create condensed versions
    this.condenseCLAUDEMD();
    this.condensePRD();
    this.consolidateSpecifications();

    console.log('✅ Documentation optimization complete');
  }

  condenseCLAUDEMD() {
    const filePath = path.join(this.projectRoot, 'CLAUDE.md');
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Keep essential sections, remove verbose details
    const condensedSections = [
      'PROJECT OVERVIEW',
      'CURRENT STATUS',
      'IMPLEMENTATION ROADMAP',
      'PROJECT STRUCTURE',
      'AI-FRIENDLY PATTERNS',
      'CRITICAL DEPENDENCIES',
      'NEXT SESSION PRIORITIES'
    ];

    let condensedContent = this.extractEssentialSections(content, condensedSections);
    
    // Backup original
    fs.writeFileSync(filePath + '.backup', content);
    fs.writeFileSync(filePath, condensedContent);
    
    console.log(`✅ CLAUDE.md condensed: ${lines.length} → ${condensedContent.split('\n').length} lines`);
  }

  condensePRD() {
    const filePath = path.join(this.projectRoot, 'COMPREHENSIVE_PRD.md');
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Keep only technical specifications, remove examples and verbose explanations
    const essentialSections = [
      'TECHNICAL SPECIFICATIONS',
      'COMPONENT REQUIREMENTS',
      'QUALITY STANDARDS',
      'PERFORMANCE REQUIREMENTS',
      'ACCESSIBILITY REQUIREMENTS'
    ];

    let condensedContent = this.extractEssentialSections(content, essentialSections);
    
    // Backup original
    fs.writeFileSync(filePath + '.backup', content);
    fs.writeFileSync(filePath, condensedContent);
    
    console.log(`✅ COMPREHENSIVE_PRD.md condensed: ${lines.length} → ${condensedContent.split('\n').length} lines`);
  }

  consolidateSpecifications() {
    const specFiles = fs.readdirSync(this.projectRoot)
      .filter(file => file.endsWith('-specification.md') || file.endsWith('-checklist.md'));
    
    if (specFiles.length === 0) return;

    let consolidatedContent = '# Component Development Reference\n\n';
    
    specFiles.forEach(file => {
      const content = fs.readFileSync(path.join(this.projectRoot, file), 'utf-8');
      const componentName = file.replace('-specification.md', '').replace('-checklist.md', '');
      
      consolidatedContent += `## ${componentName}\n\n`;
      consolidatedContent += this.extractKeyRequirements(content) + '\n\n';
      
      // Move to backup
      fs.renameSync(
        path.join(this.projectRoot, file),
        path.join(this.projectRoot, `backup-${file}`)
      );
    });

    fs.writeFileSync(
      path.join(this.projectRoot, 'COMPONENT_REFERENCE.md'),
      consolidatedContent
    );
    
    console.log(`✅ Consolidated ${specFiles.length} specification files → COMPONENT_REFERENCE.md`);
  }

  extractEssentialSections(content, sectionNames) {
    const lines = content.split('\n');
    let result = [];
    let currentSection = null;
    let inEssentialSection = false;

    for (const line of lines) {
      // Check if this is a section header
      if (line.startsWith('#')) {
        const sectionName = line.replace(/^#+\s*/, '').replace(/\*\*/g, '').trim();
        inEssentialSection = sectionNames.some(name => sectionName.includes(name));
        
        if (inEssentialSection) {
          result.push(line);
        }
      } else if (inEssentialSection) {
        // Keep content in essential sections, but trim verbose parts
        if (!this.isVerboseLine(line)) {
          result.push(line);
        }
      }
    }

    return result.join('\n');
  }

  extractKeyRequirements(content) {
    const lines = content.split('\n');
    return lines
      .filter(line => line.includes('✅') || line.includes('- ') || line.includes('*'))
      .slice(0, 10) // Keep only first 10 key points
      .join('\n');
  }

  isVerboseLine(line) {
    const verbosePatterns = [
      'Achievement',
      'Status:',
      'Timeline:',
      'Last Updated:',
      'Example:',
      'Note:',
      'Important:',
      'Remember:'
    ];
    return verbosePatterns.some(pattern => line.includes(pattern));
  }

  preserveEssentialScripts() {
    console.log('🔧 Preserving essential scripts only...\n');
    
    const scriptsDir = path.join(this.projectRoot, 'scripts');
    const backupDir = path.join(this.projectRoot, 'scripts-backup');
    
    // Create backup directory
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const files = fs.readdirSync(scriptsDir);
    let preserved = 0;
    let archived = 0;

    files.forEach(file => {
      const filePath = path.join(scriptsDir, file);
      const backupPath = path.join(backupDir, file);
      
      if (this.essentialScripts.includes(file)) {
        preserved++;
        console.log(`✅ Preserving: ${file}`);
      } else if (this.checkIfObsolete(file)) {
        fs.renameSync(filePath, backupPath);
        archived++;
        console.log(`📦 Archived: ${file}`);
      }
    });

    console.log(`\n✅ Preserved ${preserved} essential scripts, archived ${archived} obsolete scripts`);
  }

  cleanPackageJson() {
    console.log('📦 Cleaning package.json scripts...\n');
    
    const packagePath = path.join(this.projectRoot, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    
    // Backup original
    fs.writeFileSync(packagePath + '.backup', JSON.stringify(pkg, null, 2));
    
    const scripts = pkg.scripts || {};
    const cleanedScripts = {};
    
    // Keep essential commands
    Object.keys(scripts).forEach(key => {
      if (this.essentialCommands.includes(key) || !this.isObsoleteCommand(key)) {
        cleanedScripts[key] = scripts[key];
      }
    });
    
    pkg.scripts = cleanedScripts;
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
    
    const removed = Object.keys(scripts).length - Object.keys(cleanedScripts).length;
    console.log(`✅ Removed ${removed} obsolete script commands`);
  }

  isObsoleteCommand(command) {
    const obsoletePatterns = [
      ':old',
      ':legacy',
      ':demo',
      ':verbose',
      'fix-',
      'cleanup-',
      'drawer-'
    ];
    return obsoletePatterns.some(pattern => command.includes(pattern));
  }

  displayAnalysis(analysis) {
    console.log('📊 CONTEXT ANALYSIS REPORT\n');
    console.log('=' * 50);
    
    console.log('\n📝 DOCUMENTATION:');
    analysis.documentation.forEach(doc => {
      console.log(`  ${doc.file}: ${doc.lines} lines, ${doc.size}KB (${doc.bloatLevel} bloat)`);
    });
    
    console.log('\n🔧 SCRIPTS:');
    console.log(`  Total: ${analysis.scripts.total}`);
    console.log(`  Essential: ${analysis.scripts.essential}`);
    console.log(`  Obsolete: ${analysis.scripts.obsolete}`);
    console.log(`  Duplicates: ${analysis.scripts.duplicates}`);
    
    console.log('\n📦 PACKAGE.JSON:');
    console.log(`  Total scripts: ${analysis.packageJson.totalScripts}`);
    console.log(`  AI scripts: ${analysis.packageJson.aiScripts}`);
    console.log(`  Essential commands: ${analysis.packageJson.essentialCommands}`);
    console.log(`  Obsolete commands: ${analysis.packageJson.obsoleteCommands.length}`);
    
    console.log('\n🎯 RECOMMENDATIONS:');
    analysis.recommendations.forEach(rec => {
      console.log(`  [${rec.priority}] ${rec.action}`);
    });
    
    console.log('\n' + '=' * 50);
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  const optimizer = new ContextOptimizer();
  
  if (args.includes('--analyze')) {
    optimizer.analyzeContext();
  } else if (args.includes('--optimize')) {
    optimizer.optimizeDocumentation();
  } else if (args.includes('--preserve')) {
    optimizer.preserveEssentialScripts();
  } else if (args.includes('--clean-package')) {
    optimizer.cleanPackageJson();
  } else if (args.includes('--full')) {
    console.log('🚀 Running full context optimization...\n');
    optimizer.analyzeContext();
    optimizer.optimizeDocumentation();
    optimizer.preserveEssentialScripts();
    optimizer.cleanPackageJson();
  } else {
    console.log(`
Context Optimizer - Manage documentation bloat while preserving essential workflows

Usage:
  node scripts/context-optimizer.cjs --analyze     # Analyze current context usage
  node scripts/context-optimizer.cjs --optimize   # Optimize documentation files
  node scripts/context-optimizer.cjs --preserve   # Preserve essential scripts only
  node scripts/context-optimizer.cjs --clean-package # Clean package.json scripts
  node scripts/context-optimizer.cjs --full       # Run complete optimization

Essential Scripts Preserved:
  ${optimizer.essentialScripts.join('\n  ')}

Essential Commands Preserved:
  ${optimizer.essentialCommands.join('\n  ')}
`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { ContextOptimizer };