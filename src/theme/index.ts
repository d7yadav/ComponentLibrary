
// Export enhanced theme system
export { 
  createEnhancedTheme as createTheme,
  lightTheme,
  darkTheme,
  type EnhancedTheme,
  type EnhancedThemeOptions,
} from './createEnhancedTheme';

// Export theme components
export { palette } from './palette';
export { darkPalette } from './darkPalette';
export { typography } from './typography';
export { spacing } from './spacing';
export { shadows } from './shadows';
export { breakpoints } from './breakpoints';
export { components } from './components';
export { lightGradients, darkGradients, gradientUtils, type GradientOptions } from './gradients';
export { easings, durations, keyframes, animationUtils } from './animations';
export { cssVarPrefix, customCssVars } from './cssVars';

// Re-export Material-UI theme utilities
export { ThemeProvider, CssBaseline } from '@mui/material';
export type { Theme } from '@mui/material/styles';

// Default theme instance
import { lightTheme } from './createEnhancedTheme';
export const defaultTheme = lightTheme;