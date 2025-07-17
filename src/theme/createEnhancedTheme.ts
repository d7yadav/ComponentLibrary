
import type { Theme } from '@mui/material/styles';
import { createTheme as muiCreateTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { easings, durations, keyframes } from './animations';
import { breakpoints } from './breakpoints';
import { components } from './components';
import { customCssVars } from './cssVars';
import { darkPalette } from './darkPalette';
import { lightGradients, darkGradients, type GradientOptions } from './gradients';
import { palette } from './palette';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { typography } from './typography';

export interface EnhancedTheme extends Theme {
  gradients: GradientOptions,
  animations: {
    easings: typeof easings,
    durations: typeof durations,
    keyframes: typeof keyframes,
  },
  cssVars: typeof customCssVars,
}

export interface EnhancedThemeOptions {
  mode?: 'light' | 'dark',
  primaryColor?: string,
  secondaryColor?: string,
  enableGradients?: boolean,
  enableAnimations?: boolean,
  enableCssVars?: boolean,
}

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
  
  return enhancedTheme;
};

export const lightTheme = createEnhancedTheme({ mode: 'light' });
export const darkTheme = createEnhancedTheme({ mode: 'dark' });