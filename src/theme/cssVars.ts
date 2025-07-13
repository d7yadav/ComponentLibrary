/**
 * @fileoverview CSS Variables configuration for runtime theming
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

/**
 * CSS Variable definitions for ultra-fast runtime theming
 * Leverages MUI v7's CSS Variables 2.0 system
 */
export const cssVarPrefix = 'dilip-mui';

/**
 * Custom CSS variables for advanced theming features
 */
export const customCssVars = {
  // Gradient variables
  '--gradient-primary': 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
  '--gradient-secondary': 'linear-gradient(45deg, #dc004e 30%, #ff5983 90%)',
  '--gradient-success': 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
  '--gradient-error': 'linear-gradient(45deg, #d32f2f 30%, #ef5350 90%)',
  '--gradient-warning': 'linear-gradient(45deg, #ed6c02 30%, #ff9800 90%)',
  '--gradient-info': 'linear-gradient(45deg, #0288d1 30%, #03a9f4 90%)',
  
  // Glass morphism variables
  '--glass-blur': '10px',
  '--glass-opacity': '0.8',
  '--glass-border': '1px solid rgba(255, 255, 255, 0.18)',
  
  // Animation variables
  '--transition-duration-shortest': '150ms',
  '--transition-duration-short': '300ms',
  '--transition-duration-standard': '450ms',
  '--transition-duration-complex': '600ms',
  '--transition-easing-standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
  '--transition-easing-decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
  '--transition-easing-accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
  '--transition-easing-sharp': 'cubic-bezier(0.4, 0, 0.6, 1)',
  
  // Dark theme optimizations
  '--dark-elevation-1': 'rgba(255, 255, 255, 0.05)',
  '--dark-elevation-2': 'rgba(255, 255, 255, 0.07)',
  '--dark-elevation-3': 'rgba(255, 255, 255, 0.08)',
  '--dark-elevation-4': 'rgba(255, 255, 255, 0.09)',
  '--dark-elevation-5': 'rgba(255, 255, 255, 0.10)',
};