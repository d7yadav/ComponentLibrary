/**
 * @fileoverview Gradient design system with performance optimization
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

/**
 * Performance-optimized gradient system
 * Uses CSS custom properties for runtime updates
 */
export interface GradientOptions {
  primary: string;
  secondary: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  // Advanced gradients
  aurora: string;
  sunset: string;
  ocean: string;
  forest: string;
  // Glass morphism effects
  glass: {
    light: string;
    dark: string;
  };
  // Animated gradients
  animated: {
    wave: string;
    pulse: string;
    shimmer: string;
  };
}

/**
 * Light theme gradients
 */
export const lightGradients: GradientOptions = {
  primary: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
  secondary: 'linear-gradient(45deg, #dc004e 30%, #ff5983 90%)',
  success: 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
  error: 'linear-gradient(45deg, #d32f2f 30%, #ef5350 90%)',
  warning: 'linear-gradient(45deg, #ed6c02 30%, #ff9800 90%)',
  info: 'linear-gradient(45deg, #0288d1 30%, #03a9f4 90%)',
  
  // Advanced gradients
  aurora: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #667eea 100%)',
  sunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ocean: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)',
  forest: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  
  // Glass morphism
  glass: {
    light: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    dark: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
  },
  
  // Animated gradients (using CSS variables for performance)
  animated: {
    wave: 'linear-gradient(90deg, var(--gradient-start) 0%, var(--gradient-middle) 50%, var(--gradient-end) 100%)',
    pulse: 'radial-gradient(circle, var(--pulse-inner) 0%, var(--pulse-outer) 100%)',
    shimmer: 'linear-gradient(105deg, transparent 40%, var(--shimmer-color) 50%, transparent 60%)',
  },
};

/**
 * Dark theme gradients (OLED optimized)
 */
export const darkGradients: GradientOptions = {
  primary: 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)',
  secondary: 'linear-gradient(45deg, #f48fb1 30%, #f06292 90%)',
  success: 'linear-gradient(45deg, #66bb6a 30%, #4caf50 90%)',
  error: 'linear-gradient(45deg, #f44336 30%, #ef5350 90%)',
  warning: 'linear-gradient(45deg, #ffa726 30%, #ff9800 90%)',
  info: 'linear-gradient(45deg, #29b6f6 30%, #03a9f4 90%)',
  
  // Advanced gradients (darker variants)
  aurora: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
  sunset: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
  ocean: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  forest: 'linear-gradient(135deg, #0f0c29 0%, #11998e 100%)',
  
  // Glass morphism (darker)
  glass: {
    light: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
    dark: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)',
  },
  
  // Animated gradients
  animated: {
    wave: 'linear-gradient(90deg, var(--gradient-start) 0%, var(--gradient-middle) 50%, var(--gradient-end) 100%)',
    pulse: 'radial-gradient(circle, var(--pulse-inner) 0%, var(--pulse-outer) 100%)',
    shimmer: 'linear-gradient(105deg, transparent 40%, var(--shimmer-color) 50%, transparent 60%)',
  },
};

/**
 * Gradient utility functions
 */
export const gradientUtils = {
  /**
   * Creates a glass morphism effect
   */
  createGlassEffect: (opacity = 0.1, blur = '10px') => ({
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur})`,
    WebkitBackdropFilter: `blur(${blur})`,
    border: '1px solid rgba(255, 255, 255, 0.18)',
  }),
  
  /**
   * Creates an animated gradient
   */
  createAnimatedGradient: (duration = '3s', direction = 'normal') => ({
    backgroundSize: '200% 200%',
    animation: `gradientShift ${duration} ease infinite ${direction}`,
  }),
};