
import type { TaskContext, TechnicalChallenge, RiskAssessment } from './TaskAnalyzer';

export interface DecisionAnalysis {
  decision: string,
  description: string,
  confidenceScore: number; // 0-100
  certaintyLevel: 'very-low' | 'low' | 'medium' | 'high' | 'very-high',
  alternatives: Alternative[],
  recommendation: string,
  reasoning: string[],
  assumptions: string[],
  risksConsidered: string[],
  evidenceSupporting: string[],
  evidenceAgainst: string[],
  contextFactors: string[],
}

export interface Alternative {
  id: string,
  name: string,
  description: string,
  pros: string[],
  cons: string[],
  effort: 'low' | 'medium' | 'high' | 'very-high',
  complexity: 'low' | 'medium' | 'high' | 'very-high',
  risk: 'low' | 'medium' | 'high' | 'critical',
  timeline: string,
  confidence: number,
  viability: number; // 0-100
  strategicAlignment: number; // 0-100
}

export interface MultiFrameworkAnalysis {
  technicalFeasibility: FrameworkAnalysis,
  businessImpact: FrameworkAnalysis,
  userExperience: FrameworkAnalysis,
  performance: FrameworkAnalysis,
  security: FrameworkAnalysis,
  maintainability: FrameworkAnalysis,
  scalability: FrameworkAnalysis,
  costAnalysis: FrameworkAnalysis,
  riskAssessment: FrameworkAnalysis,
  complianceAnalysis: FrameworkAnalysis,
  strategicAlignment: FrameworkAnalysis,
  innovationPotential: FrameworkAnalysis,
}

export interface FrameworkAnalysis {
  framework: string,
  score: number; // 0-100
  factors: AnalysisFactor[],
  summary: string,
  keyInsights: string[],
  concerns: string[],
  recommendations: string[],
  confidence: number,
}

export interface AnalysisFactor {
  name: string,
  weight: number; // 0-1
  score: number; // 0-100
  rationale: string,
  evidence: string[],
  assumptions: string[],
}

export interface DecisionContext {
  question: string,
  background: string,
  constraints: string[],
  objectives: string[],
  stakeholders: string[],
  timeline: string,
  budget?: string,
  strategicImportance: 'low' | 'medium' | 'high' | 'critical',
  reversibility: 'irreversible' | 'difficult' | 'moderate' | 'easy',
  uncertainty: 'low' | 'medium' | 'high' | 'very-high',
}

export interface RiskRewardCalculation {
  expectedValue: number,
  bestCaseScenario: Scenario,
  worstCaseScenario: Scenario,
  mostLikelyScenario: Scenario,
  riskAdjustedValue: number,
  volatility: number,
  downsideRisk: number,
  upsidePotential: number,
}

export interface Scenario {
  name: string,
  probability: number; // 0-1
  outcome: string,
  impact: number; // -100 to 100
  timeframe: string,
  triggers: string[],
  mitigation: string[],
}

export interface ComplexityAssessment {
  overall: ComplexityDimension,
  technical: ComplexityDimension,
  organizational: ComplexityDimension,
  temporal: ComplexityDimension,
  cognitive: ComplexityDimension,
  integration: ComplexityDimension,
  dependencies: ComplexityDimension,
}

export interface ComplexityDimension {
  level: 'trivial' | 'simple' | 'moderate' | 'complex' | 'chaotic',
  score: number; // 0-100
  factors: string[],
  mitigations: string[],
  indicators: string[],
}

export class OverthinkingMode {
  private readonly analysisFrameworks = [
    'technical-feasibility',
    'business-impact', 
    'user-experience',
    'performance',
    'security',
    'maintainability',
    'scalability',
    'cost-analysis',
    'risk-assessment',
    'compliance-analysis',
    'strategic-alignment',
    'innovation-potential'
  ],

  public analyzeDecision(context: DecisionContext): DecisionAnalysis {
    const alternatives = this.generateAlternatives(context),
    const frameworkAnalysis = this.performMultiFrameworkAnalysis(context, alternatives),
    const confidenceScore = this.calculateOverallConfidence(frameworkAnalysis),
    const recommendation = this.synthesizeRecommendation(alternatives, frameworkAnalysis),
    
    return {
      decision: context.question,
      description: context.background,
      confidenceScore,
      certaintyLevel: this.mapConfidenceToLevel(confidenceScore),
      alternatives,
      recommendation: recommendation.choice,
      reasoning: recommendation.reasoning,
      assumptions: this.extractAssumptions(context, frameworkAnalysis),
      risksConsidered: this.extractRisks(frameworkAnalysis),
      evidenceSupporting: recommendation.supportingEvidence,
      evidenceAgainst: recommendation.contraEvidence,
      contextFactors: this.identifyContextFactors(context)
    },
  }

  public generateAlternatives(context: DecisionContext): Alternative[] {
    const alternatives: Alternative[] = [],

    // Generate conservative approach
    alternatives.push(this.generateConservativeAlternative(context)),
    
    // Generate innovative approach
    alternatives.push(this.generateInnovativeAlternative(context)),
    
    // Generate hybrid approach
    alternatives.push(this.generateHybridAlternative(context)),
    
    // Generate minimal viable approach
    alternatives.push(this.generateMinimalViableAlternative(context)),

    // Generate custom alternatives based on context
    alternatives.push(...this.generateContextSpecificAlternatives(context)),

    return alternatives.map(alt => ({
      ...alt,
      viability: this.calculateViability(alt, context),
      strategicAlignment: this.calculateStrategicAlignment(alt, context)
    })),
  }

  public performMultiFrameworkAnalysis(
    context: DecisionContext, 
    alternatives: Alternative[]
  ): MultiFrameworkAnalysis {
    return {
      technicalFeasibility: this.analyzeTechnicalFeasibility(context, alternatives),
      businessImpact: this.analyzeBusinessImpact(context, alternatives),
      userExperience: this.analyzeUserExperience(context, alternatives),
      performance: this.analyzePerformance(context, alternatives),
      security: this.analyzeSecurity(context, alternatives),
      maintainability: this.analyzeMaintainability(context, alternatives),
      scalability: this.analyzeScalability(context, alternatives),
      costAnalysis: this.analyzeCosts(context, alternatives),
      riskAssessment: this.analyzeRisks(context, alternatives),
      complianceAnalysis: this.analyzeCompliance(context, alternatives),
      strategicAlignment: this.analyzeStrategicAlignment(context, alternatives),
      innovationPotential: this.analyzeInnovationPotential(context, alternatives)
    },
  }

  public calculateRiskReward(alternative: Alternative, context: DecisionContext): RiskRewardCalculation {
    const scenarios = this.generateScenarios(alternative, context),
    const expectedValue = this.calculateExpectedValue(scenarios),
    const riskAdjustedValue = this.adjustForRisk(expectedValue, scenarios),
    
    return {
      expectedValue,
      bestCaseScenario: scenarios.find(s => s.name === 'best-case')!,
      worstCaseScenario: scenarios.find(s => s.name === 'worst-case')!,
      mostLikelyScenario: scenarios.find(s => s.name === 'most-likely')!,
      riskAdjustedValue,
      volatility: this.calculateVolatility(scenarios),
      downsideRisk: this.calculateDownsideRisk(scenarios),
      upsidePotential: this.calculateUpsidePotential(scenarios)
    },
  }

  public assessComplexity(alternative: Alternative, context: DecisionContext): ComplexityAssessment {
    const technical = this.assessTechnicalComplexity(alternative, context),
    const organizational = this.assessOrganizationalComplexity(alternative, context),
    const temporal = this.assessTemporalComplexity(alternative, context),
    const cognitive = this.assessCognitiveComplexity(alternative, context),
    const integration = this.assessIntegrationComplexity(alternative, context),
    const dependencies = this.assessDependencyComplexity(alternative, context),
    
    const overall = this.synthesizeOverallComplexity([
      technical, organizational, temporal, cognitive, integration, dependencies
    ]),

    return {
      overall,
      technical,
      organizational,
      temporal,
      cognitive,
      integration,
      dependencies
    },
  }

  // Private methods for alternative generation

  private generateConservativeAlternative(context: DecisionContext): Alternative {
    return {
      id: 'conservative',
      name: 'Conservative Approach',
      description: 'Low-risk approach using proven patterns and established technologies',
      pros: [
        'Low implementation risk',
        'Proven track record',
        'Easier to estimate and plan',
        'Lower learning curve'
      ],
      cons: [
        'May not address all requirements optimally',
        'Limited innovation potential',
        'May become technical debt',
        'Potentially higher long-term costs'
      ],
      effort: 'medium',
      complexity: 'low',
      risk: 'low',
      timeline: 'Shorter term',
      confidence: 85
    },
  }

  private generateInnovativeAlternative(context: DecisionContext): Alternative {
    return {
      id: 'innovative',
      name: 'Innovative Approach',
      description: 'Cutting-edge solution using latest technologies and patterns',
      pros: [
        'Addresses requirements optimally',
        'Future-proof solution',
        'Competitive advantage',
        'Learning and growth opportunity'
      ],
      cons: [
        'Higher implementation risk',
        'Uncertain outcomes',
        'Steeper learning curve',
        'Potential stability issues'
      ],
      effort: 'high',
      complexity: 'high',
      risk: 'high',
      timeline: 'Longer term',
      confidence: 60
    },
  }

  private generateHybridAlternative(context: DecisionContext): Alternative {
    return {
      id: 'hybrid',
      name: 'Hybrid Approach',
      description: 'Balanced solution combining proven and innovative elements',
      pros: [
        'Balanced risk/reward',
        'Leverages existing knowledge',
        'Includes innovation elements',
        'Flexible implementation path'
      ],
      cons: [
        'Complexity in integration',
        'May require more coordination',
        'Potential architectural inconsistencies',
        'Moderate risk in multiple areas'
      ],
      effort: 'medium',
      complexity: 'medium',
      risk: 'medium',
      timeline: 'Medium term',
      confidence: 75
    },
  }

  private generateMinimalViableAlternative(context: DecisionContext): Alternative {
    return {
      id: 'mvp',
      name: 'Minimal Viable Approach',
      description: 'Simplest solution that meets core requirements',
      pros: [
        'Fastest time to delivery',
        'Lowest initial cost',
        'Reduced complexity',
        'Quick validation'
      ],
      cons: [
        'Limited functionality',
        'May require rework later',
        'Potential scalability issues',
        'May not satisfy all stakeholders'
      ],
      effort: 'low',
      complexity: 'low',
      risk: 'medium',
      timeline: 'Short term',
      confidence: 90
    },
  }

  private generateContextSpecificAlternatives(context: DecisionContext): Alternative[] {
    const alternatives: Alternative[] = [],

    // Generate based on strategic importance
    if (context.strategicImportance === 'critical') {
      alternatives.push({
        id: 'enterprise',
        name: 'Enterprise-Grade Solution',
        description: 'Comprehensive solution with enterprise-level features',
        pros: ['Maximum capability', 'Enterprise support', 'Scalability', 'Compliance'],
        cons: ['High cost', 'Complex implementation', 'Over-engineering risk'],
        effort: 'very-high',
        complexity: 'very-high',
        risk: 'medium',
        timeline: 'Long term',
        confidence: 70
      }),
    }

    // Generate based on reversibility
    if (context.reversibility === 'irreversible') {
      alternatives.push({
        id: 'reversible-architecture',
        name: 'Reversible Architecture',
        description: 'Design with easy rollback and migration capabilities',
        pros: ['Reduced decision risk', 'Flexibility', 'Easy migration'],
        cons: ['Additional complexity', 'Performance overhead', 'Higher initial cost'],
        effort: 'high',
        complexity: 'high',
        risk: 'low',
        timeline: 'Medium term',
        confidence: 80
      }),
    }

    return alternatives,
  }

  // Framework analysis methods

  private analyzeTechnicalFeasibility(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    const factors: AnalysisFactor[] = [
      {
        name: 'Technology Maturity',
        weight: 0.3,
        score: 85,
        rationale: 'Using well-established React and Material-UI technologies',
        evidence: ['React 18+ stable release', 'Material-UI v7 active development'],
        assumptions: ['Technology continues to be supported']
      },
      {
        name: 'Team Expertise',
        weight: 0.25,
        score: 75,
        rationale: 'Team has good React knowledge, learning curve for advanced patterns',
        evidence: ['Previous React projects', 'TypeScript experience'],
        assumptions: ['Team can acquire missing skills']
      },
      {
        name: 'Integration Complexity',
        weight: 0.25,
        score: 70,
        rationale: 'Some complexity in theme system integration',
        evidence: ['Existing theme system', 'Component interdependencies'],
        assumptions: ['Integration patterns can be established']
      },
      {
        name: 'Performance Requirements',
        weight: 0.2,
        score: 80,
        rationale: 'Performance requirements are achievable with optimization',
        evidence: ['Bundle size targets', 'Performance benchmarks'],
        assumptions: ['Optimization techniques will be effective']
      }
    ],

    const score = this.calculateWeightedScore(factors),

    return {
      framework: 'Technical Feasibility',
      score,
      factors,
      summary: 'Technical implementation is feasible with moderate complexity',
      keyInsights: [
        'Strong foundation with React and Material-UI',
        'Team capability requires some skill development',
        'Performance targets are achievable'
      ],
      concerns: [
        'Integration complexity may cause delays',
        'New team members may need training',
        'Performance optimization requires expertise'
      ],
      recommendations: [
        'Invest in team training for advanced patterns',
        'Create integration guidelines early',
        'Set up performance monitoring from start'
      ],
      confidence: 80
    },
  }

  private analyzeBusinessImpact(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    const factors: AnalysisFactor[] = [
      {
        name: 'Development Velocity',
        weight: 0.3,
        score: 85,
        rationale: 'Component library will significantly speed up development',
        evidence: ['Reduced development time', 'Consistent patterns'],
        assumptions: ['Adoption across teams occurs']
      },
      {
        name: 'Maintenance Cost',
        weight: 0.25,
        score: 75,
        rationale: 'Lower long-term maintenance with standardized components',
        evidence: ['Centralized updates', 'Reduced duplication'],
        assumptions: ['Component library is properly maintained']
      },
      {
        name: 'User Experience',
        weight: 0.25,
        score: 90,
        rationale: 'Consistent UX across applications improves user satisfaction',
        evidence: ['Design system benefits', 'Accessibility improvements'],
        assumptions: ['Users value consistency']
      },
      {
        name: 'Competitive Advantage',
        weight: 0.2,
        score: 70,
        rationale: 'AI-friendly features provide competitive edge',
        evidence: ['Unique AI integration', 'Developer productivity gains'],
        assumptions: ['AI features are valued by market']
      }
    ],

    const score = this.calculateWeightedScore(factors),

    return {
      framework: 'Business Impact',
      score,
      factors,
      summary: 'Strong positive business impact expected across multiple dimensions',
      keyInsights: [
        'Significant development velocity improvements',
        'User experience consistency benefits',
        'Competitive differentiation through AI features'
      ],
      concerns: [
        'Adoption timeline may be longer than expected',
        'Initial investment in component library',
        'Ongoing maintenance commitment required'
      ],
      recommendations: [
        'Develop adoption strategy with clear incentives',
        'Measure and communicate ROI regularly',
        'Establish dedicated maintenance team'
      ],
      confidence: 85
    },
  }

  private analyzeUserExperience(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    return this.createFrameworkAnalysis(
      'User Experience',
      [
        { name: 'Accessibility', weight: 0.3, score: 95 },
        { name: 'Consistency', weight: 0.25, score: 90 },
        { name: 'Performance', weight: 0.25, score: 80 },
        { name: 'Mobile Experience', weight: 0.2, score: 85 }
      ],
      'Excellent user experience expected with strong accessibility and consistency',
      ['WCAG 2.1 AA compliance', 'Consistent design language', 'Responsive design'],
      ['Performance optimization complexity'],
      ['Implement accessibility testing', 'Create UX guidelines']
    ),
  }

  private analyzePerformance(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    return this.createFrameworkAnalysis(
      'Performance',
      [
        { name: 'Bundle Size', weight: 0.3, score: 75 },
        { name: 'Runtime Performance', weight: 0.3, score: 80 },
        { name: 'Load Time', weight: 0.25, score: 85 },
        { name: 'Memory Usage', weight: 0.15, score: 80 }
      ],
      'Good performance expected with proper optimization',
      ['Tree shaking support', 'React optimization patterns', 'CSS-in-JS efficiency'],
      ['Bundle size monitoring needed', 'Complex animations may impact performance'],
      ['Implement bundle analysis', 'Set performance budgets', 'Use React Profiler']
    ),
  }

  private analyzeSecurity(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    return this.createFrameworkAnalysis(
      'Security',
      [
        { name: 'Input Sanitization', weight: 0.3, score: 85 },
        { name: 'XSS Prevention', weight: 0.25, score: 90 },
        { name: 'Dependency Security', weight: 0.25, score: 75 },
        { name: 'CSP Compliance', weight: 0.2, score: 80 }
      ],
      'Strong security posture with React and established libraries',
      ['React XSS protection', 'Material-UI security practices'],
      ['Dependency vulnerabilities', 'Custom code security'],
      ['Regular security audits', 'Automated vulnerability scanning']
    ),
  }

  private analyzeMaintainability(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    return this.createFrameworkAnalysis(
      'Maintainability',
      [
        { name: 'Code Quality', weight: 0.3, score: 90 },
        { name: 'Documentation', weight: 0.25, score: 95 },
        { name: 'Test Coverage', weight: 0.25, score: 80 },
        { name: 'Modularity', weight: 0.2, score: 85 }
      ],
      'Excellent maintainability through TypeScript and comprehensive documentation',
      ['TypeScript strict mode', 'Comprehensive AI documentation', 'Modular architecture'],
      ['Test coverage gaps', 'Complex AI workflow maintenance'],
      ['Maintain test coverage standards', 'Regular code reviews']
    ),
  }

  private analyzeScalability(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    return this.createFrameworkAnalysis(
      'Scalability',
      [
        { name: 'Component Scalability', weight: 0.3, score: 85 },
        { name: 'Team Scalability', weight: 0.25, score: 80 },
        { name: 'Performance Scalability', weight: 0.25, score: 75 },
        { name: 'Feature Scalability', weight: 0.2, score: 90 }
      ],
      'Good scalability with modular architecture and AI-friendly patterns',
      ['Modular component structure', 'AI-enhanced development', 'TypeScript support'],
      ['Performance at scale', 'Team coordination complexity'],
      ['Establish scalability guidelines', 'Monitor performance metrics']
    ),
  }

  private analyzeCosts(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    return this.createFrameworkAnalysis(
      'Cost Analysis',
      [
        { name: 'Development Cost', weight: 0.3, score: 70 },
        { name: 'Maintenance Cost', weight: 0.25, score: 85 },
        { name: 'Training Cost', weight: 0.25, score: 75 },
        { name: 'Infrastructure Cost', weight: 0.2, score: 90 }
      ],
      'Moderate upfront costs with strong long-term savings',
      ['Reduced long-term development costs', 'Low infrastructure overhead'],
      ['Initial development investment', 'Team training requirements'],
      ['Track ROI metrics', 'Optimize development process']
    ),
  }

  private analyzeRisks(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    return this.createFrameworkAnalysis(
      'Risk Assessment',
      [
        { name: 'Technical Risk', weight: 0.3, score: 75 },
        { name: 'Timeline Risk', weight: 0.25, score: 70 },
        { name: 'Adoption Risk', weight: 0.25, score: 80 },
        { name: 'Maintenance Risk', weight: 0.2, score: 85 }
      ],
      'Moderate risks with good mitigation strategies available',
      ['Proven technology stack', 'Strong documentation approach'],
      ['Timeline pressure', 'Team adoption curve'],
      ['Implement risk monitoring', 'Create contingency plans']
    ),
  }

  private analyzeCompliance(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    return this.createFrameworkAnalysis(
      'Compliance Analysis',
      [
        { name: 'Accessibility Compliance', weight: 0.4, score: 95 },
        { name: 'Design Standards', weight: 0.3, score: 90 },
        { name: 'Code Standards', weight: 0.2, score: 85 },
        { name: 'Security Compliance', weight: 0.1, score: 80 }
      ],
      'Excellent compliance expected with WCAG 2.1 AA and design standards',
      ['Built-in accessibility features', 'Material Design compliance'],
      ['Ongoing compliance monitoring needed'],
      ['Regular compliance audits', 'Automated testing']
    ),
  }

  private analyzeStrategicAlignment(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    return this.createFrameworkAnalysis(
      'Strategic Alignment',
      [
        { name: 'Technology Strategy', weight: 0.3, score: 90 },
        { name: 'Business Strategy', weight: 0.3, score: 85 },
        { name: 'Innovation Strategy', weight: 0.25, score: 95 },
        { name: 'Resource Strategy', weight: 0.15, score: 75 }
      ],
      'Strong strategic alignment with technology and innovation goals',
      ['AI-first approach', 'React ecosystem alignment', 'Innovation leadership'],
      ['Resource allocation priorities'],
      ['Regular strategy review', 'Stakeholder alignment sessions']
    ),
  }

  private analyzeInnovationPotential(context: DecisionContext, alternatives: Alternative[]): FrameworkAnalysis {
    return this.createFrameworkAnalysis(
      'Innovation Potential',
      [
        { name: 'AI Integration', weight: 0.4, score: 95 },
        { name: 'Development Workflow', weight: 0.3, score: 90 },
        { name: 'Future Extensibility', weight: 0.2, score: 85 },
        { name: 'Knowledge Creation', weight: 0.1, score: 80 }
      ],
      'Exceptional innovation potential through AI-enhanced development',
      ['First-class AI integration', 'Novel development patterns', 'Learning opportunities'],
      ['Innovation complexity', 'Market readiness'],
      ['Continue AI research', 'Share learnings with community']
    ),
  }

  // Utility methods

  private createFrameworkAnalysis(
    framework: string,
    factors: { name: string; weight: number; score: number }[],
    summary: string,
    insights: string[],
    concerns: string[],
    recommendations: string[]
  ): FrameworkAnalysis {
    const fullFactors: AnalysisFactor[] = factors.map(f => ({
      ...f,
      rationale: `Analysis based on ${framework.toLowerCase()} principles`,
      evidence: [`${f.name} assessment`],
      assumptions: [`Standard ${f.name.toLowerCase()} practices apply`]
    })),

    return {
      framework,
      score: this.calculateWeightedScore(fullFactors),
      factors: fullFactors,
      summary,
      keyInsights: insights,
      concerns,
      recommendations,
      confidence: 80
    },
  }

  private calculateWeightedScore(factors: AnalysisFactor[]): number {
    return factors.reduce((sum, factor) => sum + (factor.score * factor.weight), 0),
  }

  private calculateOverallConfidence(analysis: MultiFrameworkAnalysis): number {
    const frameworks = Object.values(analysis),
    const weightedConfidence = frameworks.reduce((sum, framework) => 
      sum + framework.confidence, 0) / frameworks.length,
    
    return Math.round(weightedConfidence),
  }

  private mapConfidenceToLevel(score: number): 'very-low' | 'low' | 'medium' | 'high' | 'very-high' {
    if (score >= 90) return 'very-high',
    if (score >= 75) return 'high',
    if (score >= 60) return 'medium',
    if (score >= 40) return 'low',
    return 'very-low',
  }

  private synthesizeRecommendation(alternatives: Alternative[], analysis: MultiFrameworkAnalysis): {
    choice: string,
    reasoning: string[],
    supportingEvidence: string[],
    contraEvidence: string[],
  } {
    // Find highest scoring alternative
    const bestAlternative = alternatives.reduce((best, current) => 
      current.confidence > best.confidence ? current : best
    ),

    return {
      choice: `Recommend ${bestAlternative.name}`,
      reasoning: [
        `Highest confidence score: ${bestAlternative.confidence}%`,
        `Balanced approach addressing key requirements`,
        `Strong performance across multiple frameworks`,
        `Manageable risk profile with good mitigation strategies`
      ],
      supportingEvidence: [
        `Strong technical feasibility score: ${analysis.technicalFeasibility.score}`,
        `Positive business impact: ${analysis.businessImpact.score}`,
        `Good strategic alignment: ${analysis.strategicAlignment.score}`
      ],
      contraEvidence: [
        `Implementation complexity concerns`,
        `Timeline risk factors`,
        `Potential adoption challenges`
      ]
    },
  }

  private extractAssumptions(context: DecisionContext, analysis: MultiFrameworkAnalysis): string[] {
    const assumptions = new Set<string>(),
    
    Object.values(analysis).forEach(framework => {
      framework.factors.forEach(factor => {
        factor.assumptions.forEach(assumption => assumptions.add(assumption)),
      }),
    }),

    return Array.from(assumptions);
  }

  private extractRisks(analysis: MultiFrameworkAnalysis): string[] {
    const risks = new Set<string>(),
    
    Object.values(analysis).forEach(framework => {
      framework.concerns.forEach(concern => risks.add(concern)),
    }),

    return Array.from(risks);
  }

  private identifyContextFactors(context: DecisionContext): string[] {
    return [
      `Strategic importance: ${context.strategicImportance}`,
      `Timeline: ${context.timeline}`,
      `Reversibility: ${context.reversibility}`,
      `Uncertainty level: ${context.uncertainty}`,
      `Number of stakeholders: ${context.stakeholders.length}`,
      `Number of constraints: ${context.constraints.length}`
    ],
  }

  // Complexity assessment methods

  private assessTechnicalComplexity(alternative: Alternative, context: DecisionContext): ComplexityDimension {
    return {
      level: alternative.complexity as ComplexityDimension['level'],
      score: this.mapComplexityToScore(alternative.complexity),
      factors: [
        'TypeScript integration complexity',
        'Material-UI customization depth',
        'Theme system integration',
        'Component interdependencies'
      ],
      mitigations: [
        'Incremental implementation approach',
        'Comprehensive testing strategy',
        'Code review processes'
      ],
      indicators: [
        'Number of dependencies',
        'API surface area',
        'Integration points'
      ]
    },
  }

  private assessOrganizationalComplexity(alternative: Alternative, context: DecisionContext): ComplexityDimension {
    return {
      level: 'moderate',
      score: 60,
      factors: [
        'Team coordination requirements',
        'Stakeholder alignment needs',
        'Change management process'
      ],
      mitigations: [
        'Clear communication plan',
        'Regular stakeholder updates',
        'Training programs'
      ],
      indicators: [
        'Number of teams involved',
        'Decision-making layers',
        'Approval processes'
      ]
    },
  }

  private assessTemporalComplexity(alternative: Alternative, context: DecisionContext): ComplexityDimension {
    return {
      level: 'moderate',
      score: 55,
      factors: [
        'Sequential dependency chains',
        'Parallel development streams',
        'Integration timing requirements'
      ],
      mitigations: [
        'Detailed project timeline',
        'Milestone tracking',
        'Buffer time allocation'
      ],
      indicators: [
        'Critical path length',
        'Number of dependencies',
        'Integration points'
      ]
    },
  }

  private assessCognitiveComplexity(alternative: Alternative, context: DecisionContext): ComplexityDimension {
    return {
      level: 'moderate',
      score: 65,
      factors: [
        'Learning curve for new patterns',
        'Mental model shifts required',
        'Context switching overhead'
      ],
      mitigations: [
        'Comprehensive documentation',
        'Training materials',
        'Pair programming'
      ],
      indicators: [
        'Number of concepts to master',
        'Abstraction levels',
        'Domain complexity'
      ]
    },
  }

  private assessIntegrationComplexity(alternative: Alternative, context: DecisionContext): ComplexityDimension {
    return {
      level: 'moderate',
      score: 70,
      factors: [
        'Multiple system interfaces',
        'Data flow complexity',
        'State management integration'
      ],
      mitigations: [
        'Integration testing',
        'API documentation',
        'Interface contracts'
      ],
      indicators: [
        'Number of integration points',
        'Protocol complexity',
        'Data transformation needs'
      ]
    },
  }

  private assessDependencyComplexity(alternative: Alternative, context: DecisionContext): ComplexityDimension {
    return {
      level: 'simple',
      score: 40,
      factors: [
        'External library dependencies',
        'Version compatibility requirements',
        'Transitive dependencies'
      ],
      mitigations: [
        'Dependency auditing',
        'Version pinning',
        'Alternative evaluations'
      ],
      indicators: [
        'Dependency tree depth',
        'Update frequency',
        'Compatibility matrices'
      ]
    },
  }

  private synthesizeOverallComplexity(dimensions: ComplexityDimension[]): ComplexityDimension {
    const averageScore = dimensions.reduce((sum, dim) => sum + dim.score, 0) / dimensions.length,
    
    return {
      level: this.mapScoreToComplexity(averageScore),
      score: Math.round(averageScore),
      factors: dimensions.flatMap(d => d.factors).slice(0, 5), // Top 5 factors
      mitigations: dimensions.flatMap(d => d.mitigations).slice(0, 5), // Top 5 mitigations
      indicators: dimensions.flatMap(d => d.indicators).slice(0, 5) // Top 5 indicators
    },
  }

  // Scenario and calculation methods

  private generateScenarios(alternative: Alternative, context: DecisionContext): Scenario[] {
    return [
      {
        name: 'best-case',
        probability: 0.2,
        outcome: 'All objectives exceeded, no major issues',
        impact: 90,
        timeframe: '6 months',
        triggers: ['Team expertise high', 'No technical blockers', 'Strong adoption'],
        mitigation: []
      },
      {
        name: 'most-likely',
        probability: 0.6,
        outcome: 'Objectives met with minor adjustments',
        impact: 70,
        timeframe: '8 months',
        triggers: ['Normal development cycle', 'Expected challenges', 'Gradual adoption'],
        mitigation: ['Regular reviews', 'Proactive risk management']
      },
      {
        name: 'worst-case',
        probability: 0.2,
        outcome: 'Significant delays and reduced scope',
        impact: 30,
        timeframe: '12 months',
        triggers: ['Major technical issues', 'Team changes', 'Low adoption'],
        mitigation: ['Scope reduction', 'Additional resources', 'Timeline extension']
      }
    ],
  }

  private calculateExpectedValue(scenarios: Scenario[]): number {
    return scenarios.reduce((sum, scenario) => 
      sum + (scenario.probability * scenario.impact), 0),
  }

  private adjustForRisk(expectedValue: number, scenarios: Scenario[]): number {
    const volatility = this.calculateVolatility(scenarios),
    const riskAdjustment = volatility * 0.1; // 10% penalty per volatility unit
    return expectedValue * (1 - riskAdjustment),
  }

  private calculateVolatility(scenarios: Scenario[]): number {
    const expectedValue = this.calculateExpectedValue(scenarios),
    const variance = scenarios.reduce((sum, scenario) => 
      sum + scenario.probability * Math.pow(scenario.impact - expectedValue, 2), 0),
    return Math.sqrt(variance) / 100; // Normalize to 0-1 scale
  }

  private calculateDownsideRisk(scenarios: Scenario[]): number {
    const worstCase = Math.min(...scenarios.map(s => s.impact)),
    const worstProbability = scenarios.find(s => s.impact === worstCase)?.probability || 0,
    return worstCase * worstProbability,
  }

  private calculateUpsidePotential(scenarios: Scenario[]): number {
    const bestCase = Math.max(...scenarios.map(s => s.impact)),
    const bestProbability = scenarios.find(s => s.impact === bestCase)?.probability || 0,
    return bestCase * bestProbability,
  }

  private calculateViability(alternative: Alternative, context: DecisionContext): number {
    // Simple viability calculation based on effort, complexity, and risk
    const effortScore = this.mapEffortToScore(alternative.effort),
    const complexityScore = this.mapComplexityToScore(alternative.complexity),
    const riskScore = this.mapRiskToScore(alternative.risk),
    
    return Math.round((effortScore + complexityScore + riskScore) / 3),
  }

  private calculateStrategicAlignment(alternative: Alternative, context: DecisionContext): number {
    // Strategic alignment based on context importance and alternative characteristics
    let score = 50; // Base score
    
    if (context.strategicImportance === 'critical') score += 20,
    if (alternative.risk === 'low') score += 15,
    if (alternative.effort === 'low' || alternative.effort === 'medium') score += 10,
    
    return Math.min(100, score),
  }

  private mapEffortToScore(effort: string): number {
    const scores = { low: 90, medium: 70, high: 50, 'very-high': 30 },
    return scores[effort as keyof typeof scores] || 50,
  }

  private mapComplexityToScore(complexity: string): number {
    const scores = { low: 90, medium: 70, high: 50, 'very-high': 30 },
    return scores[complexity as keyof typeof scores] || 50,
  }

  private mapRiskToScore(risk: string): number {
    const scores = { low: 90, medium: 70, high: 50, critical: 20 },
    return scores[risk as keyof typeof scores] || 50,
  }

  private mapScoreToComplexity(score: number): ComplexityDimension['level'] {
    if (score <= 20) return 'trivial',
    if (score <= 40) return 'simple',
    if (score <= 60) return 'moderate',
    if (score <= 80) return 'complex',
    return 'chaotic',
  }
}

export const createOverthinkingMode = (): OverthinkingMode => {
  return new OverthinkingMode(),
},

export default OverthinkingMode,