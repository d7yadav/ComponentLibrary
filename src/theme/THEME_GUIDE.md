# 🎨 Theme System Guide

## Overview

The AI-Friendly MUI Component Library features an advanced theme system built on Material-UI v7 with:

- **CSS Variables 2.0**: Ultra-fast runtime theming
- **OLED-Friendly Dark Mode**: True black backgrounds for power efficiency
- **Gradient Design System**: Performance-optimized gradients
- **Physics-Based Animations**: Natural motion with spring easings
- **Glass Morphism**: Modern blur effects with fallbacks

## Basic Usage

```tsx
import { ThemeProvider, CssBaseline, createTheme } from '@dilip-design/mui-components';

// Use default light theme
const App = () => (
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <YourApp />
  </ThemeProvider>
);
```

## Theme Modes

### Light Theme (Default)
```tsx
import { lightTheme } from '@dilip-design/mui-components';
```

### Dark Theme (OLED Optimized)
```tsx
import { darkTheme } from '@dilip-design/mui-components';
```

## Custom Theme Creation

```tsx
const customTheme = createTheme({
  mode: 'dark',
  primaryColor: '#8b5cf6',
  secondaryColor: '#ec4899',
  enableGradients: true,
  enableAnimations: true,
  enableCssVars: true,
});
```

## Gradient System

### Using Gradients
```tsx
// In component styles
const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.gradients.primary,
  '&:hover': {
    background: theme.gradients.secondary,
  },
}));
```

### Available Gradients
- `primary`, `secondary`, `success`, `error`, `warning`, `info`
- Advanced: `aurora`, `sunset`, `ocean`, `forest`
- Glass effects: `glass.light`, `glass.dark`
- Animated: `animated.wave`, `animated.pulse`, `animated.shimmer`

## Animation System

### Using Animations
```tsx
import { animationUtils } from '@dilip-design/mui-components';

const StyledCard = styled(Card)(({ theme }) => ({
  ...animationUtils.createSpringAnimation('transform'),
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));
```

### Available Easings
- Standard: `standard`, `decelerate`, `accelerate`, `sharp`
- Physics: `spring`, `bounce`, `elastic`
- Custom: `smooth`, `swift`

## CSS Variables

The theme automatically injects CSS variables for runtime theming:

```css
/* Use in CSS */
.custom-gradient {
  background: var(--gradient-primary);
  transition-duration: var(--transition-duration-standard);
  transition-timing-function: var(--transition-easing-standard);
}
```

## Dark Theme Optimizations

The dark theme is optimized for OLED displays:

- True black (`#000000`) background
- Enhanced contrast ratios
- Reduced blue light emission
- Power-efficient color choices

## Performance Considerations

1. **Gradients**: Use CSS variables for runtime updates
2. **Animations**: Hardware-accelerated transforms only
3. **Glass Effects**: Automatic fallbacks for unsupported browsers
4. **Bundle Size**: Theme utilities are tree-shakeable

## Accessibility

All theme colors meet WCAG 2.1 AA standards:
- Minimum 4.5:1 contrast ratio for normal text
- 3:1 for large text and UI components
- High contrast mode support built-in

## TypeScript Support

Full TypeScript support with enhanced types:

```tsx
import type { EnhancedTheme } from '@dilip-design/mui-components';

const MyComponent = styled('div')<{ theme: EnhancedTheme }>(({ theme }) => ({
  background: theme.gradients.primary,
  transition: theme.animations.createTransition(['background']),
}));
```