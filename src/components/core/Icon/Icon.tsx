import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';
import { CircularProgress } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useRef, memo, useMemo, useState, useEffect } from 'react';
// Pre-import most common icons to avoid dynamic import warnings

import { ICON_DEFAULTS, COMMON_ICONS } from './Icon.constants';
import { StyledIcon, LoadingSpinner, IconContainer } from './Icon.styles';
import type { IconProps, IconRef, ExtendedIconState } from './Icon.types';

/**
 * Pre-loaded common icons to avoid dynamic imports for frequently used icons
 */
const PRELOADED_ICONS: Record<string, React.ComponentType<any>> = {
  'search': SearchIcon,
  'home': HomeIcon,
  'settings': SettingsIcon,
  'star': StarIcon,
  'favorite': FavoriteIcon,
  // Map common icon names to components
  'Search': SearchIcon,
  'Home': HomeIcon,
  'Settings': SettingsIcon,
  'Star': StarIcon,
  'Favorite': FavoriteIcon,
};

/**
 * Icon cache for better performance
 */
const iconCache = new Map<string, React.ComponentType<any> | null>();

/**
 * Dynamically import Material-UI icons with caching
 */
const importMaterialIcon = async (iconName: string): Promise<React.ComponentType<any> | null> => {
  // Check cache first
  if (iconCache.has(iconName)) {
    return iconCache.get(iconName) || null;
  }

  // Check preloaded icons first (avoids dynamic imports)
  if (PRELOADED_ICONS[iconName]) {
    const IconComponent = PRELOADED_ICONS[iconName];
    iconCache.set(iconName, IconComponent);
    return IconComponent;
  }

  try {
    let IconComponent: React.ComponentType<any> | null = null;
    
    // Try to import from common icons mapping
    const commonIconName = COMMON_ICONS[iconName as keyof typeof COMMON_ICONS];
    if (commonIconName) {
      // Check if common icon is preloaded
      if (PRELOADED_ICONS[commonIconName]) {
        IconComponent = PRELOADED_ICONS[commonIconName];
      } else {
        try {
          // Use dynamic import with proper Vite handling
          const module = await import(/* @vite-ignore */ `@mui/icons-material/${commonIconName}`);
          IconComponent = module.default || module[commonIconName];
        } catch (err) {
          // If common icon fails, try direct import
        }
      }
    }
    
    // Try direct import if common icon didn't work
    if (!IconComponent) {
      try {
        const module = await import(/* @vite-ignore */ `@mui/icons-material/${iconName}`);
        IconComponent = module.default || module[iconName];
      } catch (err) {
        // Icon not found
      }
    }
    
    // Cache the result (even if null)
    iconCache.set(iconName, IconComponent);
    
    if (!IconComponent) {
      console.warn(`Icon "${iconName}" not found in Material-UI icons library`);
    }
    
    return IconComponent;
  } catch (error) {
    console.warn(`Error importing icon "${iconName}":`, error);
    iconCache.set(iconName, null);
    return null;
  }
};

/**
 * 🎯 Icon Component
 * 
 * A comprehensive icon wrapper system that provides consistent theming,
 * animations, and accessibility features across all icon usage.
 * 
 * Features:
 * - Material-UI icon integration with dynamic imports
 * - 4 sizes: small, medium, large, xl
 * - 10 colors: inherit, primary, secondary, tertiary, quaternary, success, warning, error, info, disabled
 * - 5 variants: filled, outlined, rounded, sharp, twoTone
 * - Transform support: rotation, flip horizontal/vertical
 * - Animation support with presets
 * - Loading states
 * - Accessibility compliant (WCAG 2.1 AA)
 * - Theme-aware styling with CSS variables
 * - Bundle size optimized with dynamic imports
 * 
 * @example
 * ```tsx
 * // Basic usage with icon name
 * <Icon name="search" />
 * 
 * // Advanced usage
 * <Icon
 *   name="star"
 *   size="large"
 *   color="primary"
 *   variant="filled"
 *   animated={true}
 *   rotation={45}
 *   aria-label="Favorite item"
 * />
 * 
 * // Custom component
 * <Icon component={CustomIcon} size="medium" color="secondary" />
 * ```
 */
export const Icon = memo(forwardRef<IconRef, IconProps>(({
  // Core props
  name,
  component: CustomComponent,
  variant = ICON_DEFAULTS.variant,
  size = ICON_DEFAULTS.size,
  color = ICON_DEFAULTS.color,
  library = ICON_DEFAULTS.library,
  
  // Animation props
  animated = ICON_DEFAULTS.animated,
  animationDuration = ICON_DEFAULTS.animationDuration,
  
  // Transform props
  rotation = ICON_DEFAULTS.rotation,
  flipX = ICON_DEFAULTS.flipX,
  flipY = ICON_DEFAULTS.flipY,
  
  // State props
  loading = ICON_DEFAULTS.loading,
  loadingIcon,
  
  // Standard props
  className,
  style,
  'aria-label': ariaLabel,
  'data-testid': testId,
  
  ...rest
}, ref) => {
  // Consolidated state for the icon component
  const [state, setState] = useState<ExtendedIconState>({
    isLoading: loading,
    isAnimating: animated,
    iconComponent: CustomComponent || null,
  });
  
  const iconRef = useRef<SVGSVGElement>(null);
  
  // Load Material-UI icon dynamically
  useEffect(() => {
    if (name && library === 'material' && !CustomComponent) {
      setState(prev => ({ ...prev, isLoading: true }));
      importMaterialIcon(name)
        .then((IconComponent) => {
          setState(prev => ({
            ...prev,
            iconComponent: IconComponent,
            isLoading: false,
          }));
        })
        .catch(() => {
          setState(prev => ({ ...prev, isLoading: false }));
        });
    } else if (CustomComponent) {
      setState(prev => ({
        ...prev,
        iconComponent: CustomComponent,
        isLoading: false,
      }));
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [name, library, CustomComponent]);
  
  // Update loading state when prop changes
  useEffect(() => {
    setState(prev => ({ 
      ...prev, 
      isLoading: loading 
    }));
  }, [loading]);
  
  // Update animation state when prop changes
  useEffect(() => {
    setState(prev => ({ 
      ...prev, 
      isAnimating: animated 
    }));
  }, [animated]);
  
  // Expose ref methods
  useImperativeHandle(ref, () => ({
    getElement: () => iconRef.current,
    focus: () => iconRef.current?.focus(),
    blur: () => iconRef.current?.blur(),
  }), []);
  
  // Determine which component to render
  const IconComponent = useMemo(() => {
    return state.iconComponent;
  }, [state.iconComponent]);
  
  // Build accessibility props
  const accessibilityProps = useMemo(() => {
    if (ariaLabel) {
      return {
        'aria-label': ariaLabel,
        role: 'img',
      };
    }
    return {
      'aria-hidden': true,
    };
  }, [ariaLabel]);
  
  // Custom style with transforms
  const customStyle = useMemo(() => ({
    ...style,
  }), [style]);
  
  // If no icon to render and not loading, return null
  if (!IconComponent && !state.isLoading && !loadingIcon) {
    return null;
  }

  return (
    <IconContainer 
      $size={size} 
      $loading={state.isLoading}
      data-testid={testId}
    >
      {/* Main icon */}
      {IconComponent && !state.isLoading && (
        <StyledIcon
          ref={iconRef}
          className={className}
          style={customStyle}
          $size={size}
          $color={color}
          $rotation={rotation}
          $flipX={flipX}
          $flipY={flipY}
          $animated={state.isAnimating}
          $animationDuration={animationDuration}
          $loading={state.isLoading}
          {...accessibilityProps}
          {...rest}
        >
          {/* Render the actual icon as a child, not as a prop */}
          <IconComponent />
        </StyledIcon>
      )}
      
      {/* Loading state */}
      {state.isLoading && (
        loadingIcon || <LoadingSpinner $size={size} $color={color} />
      )}
    </IconContainer>
  );
}));

// Display name for debugging
Icon.displayName = 'Icon';

export { Icon as default };