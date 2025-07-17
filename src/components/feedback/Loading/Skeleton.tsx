import React, { forwardRef, memo } from 'react';

import {
  SKELETON_VARIANTS,
  SKELETON_DEFAULTS,
  ACCESSIBILITY_CONSTANTS,
} from './Loading.constants';
import { 
  SkeletonText,
  SkeletonRectangular,
  SkeletonCircular
} from './Loading.styles';
import type { SkeletonProps } from './Loading.types';

/**
 * Skeleton component for loading placeholders
 * 
 * Features:
 * - 3 variants: text, rectangular, circular
 * - 2 animation types: pulse, wave
 * - Customizable dimensions
 * - Multiple text lines support
 * - Accessibility compliance
 * - TypeScript support
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((
  {
    variant = SKELETON_VARIANTS.text,
    width = SKELETON_DEFAULTS.textWidth,
    height,
    animation = 'pulse',
    lines = SKELETON_DEFAULTS.lines,
    className,
    sx,
    ...other
  },
  ref
) => {
  // Get default height based on variant
  const getDefaultHeight = () => {
    switch (variant) {
      case 'text':
        return SKELETON_DEFAULTS.textHeight;
      case 'rectangular':
        return SKELETON_DEFAULTS.rectangularHeight;
      case 'circular':
        return SKELETON_DEFAULTS.circularSize;
      default:
        return SKELETON_DEFAULTS.textHeight;
    }
  };

  const effectiveHeight = height || getDefaultHeight();

  // Accessibility props
  const accessibilityProps = {
    'aria-label': ACCESSIBILITY_CONSTANTS.skeletonLabel,
    role: 'status',
    'aria-live': 'polite',
  };

  // Common props
  const commonProps = {
    ref,
    className,
    sx: {
      width,
      height: effectiveHeight,
      ...sx,
    },
    customAnimation: animation,
    ...accessibilityProps,
    ...other,
  };

  // Render based on variant
  switch (variant) {
    case 'text':
      return <SkeletonText lines={lines} {...commonProps} />;
    
    case 'rectangular':
      return <SkeletonRectangular {...commonProps} />;
    
    case 'circular':
      return (
        <SkeletonCircular data-testid="skeleton" 
          {...commonProps}
          sx={{
            width: effectiveHeight, // Make it square for circular
            height: effectiveHeight,
            ...sx,
          }}
        />
      );
    
    default:
      return <SkeletonText {...commonProps} />;
  }
});

Skeleton.displayName = 'Skeleton';