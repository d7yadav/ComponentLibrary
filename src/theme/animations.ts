/**
 * @fileoverview Physics-based animation system
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

/**
 * Physics-based easing functions for natural animations
 */
export const easings = {
  // Standard Material Design easings
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  
  // Physics-based easings
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.5)',
  
  // Custom easings
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  swift: 'cubic-bezier(0.55, 0, 0.1, 1)',
} as const;

/**
 * Animation durations optimized for performance
 */
export const durations = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195,
} as const;

/**
 * CSS Keyframe animations
 */
export const keyframes = {
  /**
   * Gradient shift animation for animated gradients
   */
  gradientShift: `
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `,
  
  /**
   * Pulse animation for loading states
   */
  pulse: `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
  `,
  
  /**
   * Wave animation for ripple effects
   */
  wave: `
    @keyframes wave {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `,
  
  /**
   * Shimmer animation for loading skeletons
   */
  shimmer: `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `,
  
  /**
   * Fade in animation
   */
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  
  /**
   * Slide up animation
   */
  slideUp: `
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
};

/**
 * Animation utility functions
 */
export const animationUtils = {
  /**
   * Creates a transition string
   */
  createTransition: (
    properties: string[],
    duration = durations.standard,
    easing = easings.standard,
    delay = 0
  ): string => {
    return properties
      .map(prop => `${prop} ${duration}ms ${easing} ${delay}ms`)
      .join(', ');
  },
  
  /**
   * Creates a spring animation
   */
  createSpringAnimation: (property: string, duration = durations.complex) => ({
    transition: `${property} ${duration}ms ${easings.spring}`,
  }),
  
  /**
   * Creates a reduced motion safe animation
   */
  createReducedMotion: (animation: Record<string, any>) => ({
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
      transition: 'none',
    },
    '@media (prefers-reduced-motion: no-preference)': animation,
  }),
};