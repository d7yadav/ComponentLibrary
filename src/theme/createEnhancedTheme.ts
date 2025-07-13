/**
 * @fileoverview Enhanced theme creation with CSS Variables 2.0
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import { createTheme as muiCreateTheme, Theme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { palette } from './palette';
import { darkPalette } from './darkPalette';
import { typography } from './typography';
import { spacing } from './spacing';
import { shadows } from './shadows';
import { breakpoints } from './breakpoints';
import { components } from './components';
import { lightGradients, darkGradients, type GradientOptions } from './gradients';
import { easings, durations, keyframes } from './animations';
import { customCssVars } from './cssVars';

/**
 * Extended theme interface with custom properties
 */
export interface EnhancedTheme extends Theme {
  gradients: GradientOptions;
  animations: {
    easings: typeof easings;
    durations: typeof durations;
    keyframes: typeof keyframes;
  };
  cssVars: typeof customCssVars;
}

/**
 * Theme options for enhanced theme
 */
export interface EnhancedThemeOptions {
  mode?: 'light' | 'dark';
  primaryColor?: string;
  secondaryColor?: string;
  enableGradients?: boolean;
  enableAnimations?: boolean;
  enableCssVars?: boolean;
}

/**
 * Creates an enhanced Material-UI theme with advanced features
 */
export const createEnhancedTheme = (options: EnhancedThemeOptions = {}): Theme => {
  const {
    mode = 'light',
    primaryColor,
    secondaryColor,
    enableGradients = true,
    enableAnimations = true,
    enableCssVars = true,
  } = options;
  
  // Select palette based on mode
  const selectedPalette = mode === 'dark' ? darkPalette : palette;
  
  // Override primary/secondary if provided
  if (primaryColor) {
    selectedPalette.primary = { main: primaryColor };
  }
  if (secondaryColor) {
    selectedPalette.secondary = { main: secondaryColor };
  }
  
  // Create base theme
  const baseTheme = muiCreateTheme({
    palette: selectedPalette,
    typography,
    spacing,
    shadows,
    breakpoints,
    components,
  });
  
  // Extend with custom properties
  const enhancedTheme = deepmerge(baseTheme, {
    gradients: mode === 'dark' ? darkGradients : lightGradients,
    animations: {
      easings,
      durations,
      keyframes,
    },
    cssVars: customCssVars,
  });
  
  // Add CSS variables to theme
  if (enableCssVars) {
    // Add custom CSS variables
    Object.entries(customCssVars).forEach(([key, value]) => {
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(key, value);
      }
    });
    
    // Add gradient CSS variables
    if (enableGradients) {
      const gradients = mode === 'dark' ? darkGradients : lightGradients;
      Object.entries(gradients).forEach(([key, value]) => {
        if (typeof value === 'string' && typeof document !== 'undefined') {
          document.documentElement.style.setProperty(`--gradient-${key}`, value);
        }
      });
    }
  }
  
  // Inject keyframe animations
  if (enableAnimations && typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = Object.values(keyframes).join('\n');
    document.head.appendChild(styleElement);
  }
  
  return enhancedTheme as Theme;
};

/**
 * Create light and dark theme presets
 */
export const lightTheme = createEnhancedTheme({ mode: 'light' });
export const darkTheme = createEnhancedTheme({ mode: 'dark' });