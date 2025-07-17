import { forwardRef, memo } from 'react';

import {
  DEFAULT_PROGRESS_PROPS,
  ACCESSIBILITY_CONSTANTS,
  PROGRESS_VALUE_FORMATTERS,
} from './Progress.constants';
import { 
  StyledLinearProgress, 
  ProgressContainer,
  ProgressLabel,
  ProgressValue
} from './Progress.styles';
import type { LinearProgressProps } from './Progress.types';

// Extracted style objects to prevent re-renders
const progressWrapperBaseStyle = {
  display: 'flex' as const,
  alignItems: 'center' as const,
  gap: 8,
};

const createProgressWrapperStyle = (fullWidth: boolean) => ({
  ...progressWrapperBaseStyle,
  width: fullWidth ? '100%' : 'auto',
});

/**
 * Enhanced Linear Progress component with comprehensive styling and accessibility
 * 
 * Features:
 * - 4 variants: determinate, indeterminate, buffer, query
 * - Multiple sizes: small, medium, large
 * - Color themes: primary, secondary, error, warning, info, success
 * - Striped and animated patterns
 * - Value display with custom formatters
 * - Accessibility compliance (WCAG 2.1 AA)
 * - TypeScript support with strict typing
 * - Dark theme support via enhanced theme system
 */
export const LinearProgress = forwardRef<HTMLDivElement, LinearProgressProps>((
  {
    variant = DEFAULT_PROGRESS_PROPS.variant,
    value,
    valueBuffer,
    color = DEFAULT_PROGRESS_PROPS.color,
    size = DEFAULT_PROGRESS_PROPS.size,
    thickness,
    label,
    showValue = DEFAULT_PROGRESS_PROPS.showValue,
    valueFormat = PROGRESS_VALUE_FORMATTERS.percentage,
    animated = DEFAULT_PROGRESS_PROPS.animated,
    animationDuration,
    striped = DEFAULT_PROGRESS_PROPS.striped,
    stripedAnimated = DEFAULT_PROGRESS_PROPS.stripedAnimated,
    bgcolor,
    progressColor,
    fullWidth = DEFAULT_PROGRESS_PROPS.fullWidth,
    height,
    rounded = DEFAULT_PROGRESS_PROPS.rounded,
    borderRadius,
    elevated = DEFAULT_PROGRESS_PROPS.elevated,
    elevation,
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
    <StyledLinearProgress
      ref={ref}
      variant={variant}
      value={value}
      valueBuffer={valueBuffer}
      color={color}
      className={className}
      sx={sx}
      // Custom props for styled component
      customSize={size}
      customHeight={height || thickness}
      customFullWidth={fullWidth}
      customRounded={rounded}
      customBorderRadius={borderRadius}
      customElevated={elevated}
      customElevation={elevation}
      customAnimated={animated}
      customAnimationDuration={animationDuration}
      customStriped={striped}
      customStripedAnimated={stripedAnimated}
      customBgcolor={bgcolor}
      customProgressColor={progressColor}
      {...accessibilityProps}
      {...other}
    />
  );

  // If no label or value display, return just the progress bar
  if (!label && !showValue) {
    return progressElement;
  }

  // Return progress with label and/or value
  return (
    <ProgressContainer data-testid="linearprogress" customCentered={false}>
      {label && (
        <ProgressLabel customSize={size} className="progress-label-top">
          {label}
        </ProgressLabel>
      )}
      <div style={createProgressWrapperStyle(fullWidth)}>
        {progressElement}
        {showValue && value !== undefined && (
          <ProgressValue customSize={size}>
            {formatValue(value)}
          </ProgressValue>
        )}
      </div>
    </ProgressContainer>
  );
});

LinearProgress.displayName = 'LinearProgress';