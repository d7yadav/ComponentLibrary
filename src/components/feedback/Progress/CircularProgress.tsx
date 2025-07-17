import { forwardRef, memo } from 'react';

import {
  DEFAULT_PROGRESS_PROPS,
  ACCESSIBILITY_CONSTANTS,
  PROGRESS_VALUE_FORMATTERS,
} from './Progress.constants';
import { 
  StyledCircularProgress, 
  ProgressContainer,
  ProgressLabel,
  ProgressValue
} from './Progress.styles';
import type { CircularProgressProps } from './Progress.types';

// Extracted style objects to prevent re-renders
const circularProgressWrapperStyle = {
  position: 'relative' as const,
  display: 'inline-flex' as const,
};

const centeredContentStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex' as const,
  flexDirection: 'column' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  textAlign: 'center' as const,
  pointerEvents: 'none' as const,
};

/**
 * Enhanced Circular Progress component with comprehensive styling and accessibility
 * 
 * Features:
 * - 4 variants: determinate, indeterminate, buffer, query
 * - Multiple sizes: small, medium, large with custom size support
 * - Color themes: primary, secondary, error, warning, info, success
 * - Track display with customizable colors
 * - Centered label and value display
 * - Accessibility compliance (WCAG 2.1 AA)
 * - TypeScript support with strict typing
 * - Dark theme support via enhanced theme system
 */
export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>((
  {
    variant = DEFAULT_PROGRESS_PROPS.variant,
    value,
    color = DEFAULT_PROGRESS_PROPS.color,
    size = DEFAULT_PROGRESS_PROPS.size,
    customSize,
    thickness,
    label,
    showValue = DEFAULT_PROGRESS_PROPS.showValue,
    valueFormat = PROGRESS_VALUE_FORMATTERS.percentage,
    animated = DEFAULT_PROGRESS_PROPS.animated,
    animationDuration,
    bgcolor,
    progressColor,
    showTrack = DEFAULT_PROGRESS_PROPS.showTrack,
    trackColor,
    rounded = DEFAULT_PROGRESS_PROPS.rounded,
    strokeWidth,
    centered = DEFAULT_PROGRESS_PROPS.centered,
    className,
    sx,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-valuetext': ariaValueText,
    ...other
  },
  ref
) => {
  // Format the value for display
  const formatValue = (val?: number) => {
    if (val === undefined) return '';
    return valueFormat(val);
  };

  // Accessibility props
  const accessibilityProps = {
    role: ACCESSIBILITY_CONSTANTS.progressRole,
    'aria-label': ariaLabel || ACCESSIBILITY_CONSTANTS.progressLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-valuemin': ACCESSIBILITY_CONSTANTS.minValue,
    'aria-valuemax': ACCESSIBILITY_CONSTANTS.maxValue,
    'aria-valuenow': value,
    'aria-valuetext': ariaValueText || (value !== undefined ? formatValue(value) : undefined),
  };

  const progressElement = (
    <div style={circularProgressWrapperStyle}>
      <StyledCircularProgress
        ref={ref}
        variant={variant}
        value={value}
        color={color}
        size={customSize}
        className={className}
        sx={sx}
        // Custom props for styled component
        customSize={customSize || size}
        customShowTrack={showTrack}
        customTrackColor={trackColor}
        customRounded={rounded}
        customStrokeWidth={strokeWidth || thickness}
        customAnimated={animated}
        customAnimationDuration={animationDuration}
        customProgressColor={progressColor}
        {...accessibilityProps}
        {...other}
      />
      
      {/* Centered label and/or value */}
      {(label || (showValue && value !== undefined)) && (
        <div style={centeredContentStyle}>
          {label && (
            <ProgressLabel customSize={size} className="progress-label-center">
              {label}
            </ProgressLabel>
          )}
          {showValue && value !== undefined && (
            <ProgressValue customSize={size} className="progress-value-center">
              {formatValue(value)}
            </ProgressValue>
          )}
        </div>
      )}
    </div>
  );

  // If centered, wrap in container
  if (centered) {
    return (
      <ProgressContainer data-testid="circularprogress" customCentered={true}>
        {progressElement}
      </ProgressContainer>
    );
  }

  return progressElement;
});

CircularProgress.displayName = 'CircularProgress';