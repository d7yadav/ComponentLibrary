import { forwardRef, useState, useEffect, memo } from 'react';
import { LoadingProps } from './Loading.types';
import { 
  LoadingContainer,
  LoadingBackdrop,
  LoadingMessage,
  CircularSpinner,
  DotsSpinner,
  BarsSpinner,
  PulseSpinner,
  RingSpinner,
  WaveSpinner,
  RippleSpinner,
} from './Loading.styles';
import { Skeleton } from './Skeleton';
import {
  DEFAULT_LOADING_PROPS,
  ACCESSIBILITY_CONSTANTS,
  LOADING_SIZE_CONFIGS,
  LOADING_DOT_COUNTS,
} from './Loading.constants';

/**
 * Enhanced Loading component with different spinner types and comprehensive options
 * 
 * Features:
 * - 9 spinner types: circular, dots, bars, pulse, bounce, ring, wave, ripple, skeleton
 * - Multiple sizes: small, medium, large with custom size support
 * - Color themes: primary, secondary, error, warning, info, success, inherit
 * - Variants: default, overlay, inline, button, page
 * - Backdrop support with opacity control
 * - Delay and timeout functionality
 * - Accessibility compliance (WCAG 2.1 AA)
 * - TypeScript support with strict typing
 * - Dark theme support via enhanced theme system
 */
export const Loading = forwardRef<HTMLDivElement, LoadingProps>((
  {
    type = DEFAULT_LOADING_PROPS.type,
    size = DEFAULT_LOADING_PROPS.size,
    color = DEFAULT_LOADING_PROPS.color,
    variant = DEFAULT_LOADING_PROPS.variant,
    customSize,
    loading = DEFAULT_LOADING_PROPS.loading,
    message,
    backdrop = DEFAULT_LOADING_PROPS.backdrop,
    backdropOpacity = DEFAULT_LOADING_PROPS.backdropOpacity,
    disableBackdropClick = DEFAULT_LOADING_PROPS.disableBackdropClick,
    speed = DEFAULT_LOADING_PROPS.speed,
    centered = DEFAULT_LOADING_PROPS.centered,
    fullWidth = DEFAULT_LOADING_PROPS.fullWidth,
    fullHeight = DEFAULT_LOADING_PROPS.fullHeight,
    minHeight,
    customColor,
    children,
    delay = DEFAULT_LOADING_PROPS.delay,
    timeout = DEFAULT_LOADING_PROPS.timeout,
    onTimeout,
    zIndex = DEFAULT_LOADING_PROPS.zIndex,
    className,
    sx,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    role,
    ...other
  },
  ref
) => {
  const [visible, setVisible] = useState(delay === 0);
  const [timedOut, setTimedOut] = useState(false);

  // Handle delay
  useEffect(() => {
    if (loading && delay > 0) {
      const delayTimer = setTimeout(() => {
        setVisible(true);
      }, delay);

      return () => clearTimeout(delayTimer);
    } else if (!loading) {
      setVisible(false);
    }
  }, [loading, delay]);

  // Handle timeout
  useEffect(() => {
    if (loading && timeout > 0) {
      const timeoutTimer = setTimeout(() => {
        setTimedOut(true);
        onTimeout?.();
      }, timeout);

      return () => clearTimeout(timeoutTimer);
    }
  }, [loading, timeout, onTimeout]);

  // Reset timeout when loading changes
  useEffect(() => {
    if (!loading) {
      setTimedOut(false);
    }
  }, [loading]);

  // Get spinner size
  const getSpinnerSize = () => {
    if (customSize) return customSize;
    const sizeConfig = LOADING_SIZE_CONFIGS[size];
    return sizeConfig[type] || sizeConfig.circular;
  };

  // Render spinner based on type
  const renderSpinner = () => {
    const spinnerSize = getSpinnerSize();
    const spinnerProps = {
      customSize: spinnerSize,
      customColor: customColor,
      customSpeed: speed,
    };

    switch (type) {
      case 'circular':
        return <CircularSpinner {...spinnerProps} />;
      
      case 'dots':
        return (
          <DotsSpinner data-testid="loading" {...spinnerProps}>
            {Array.from({ length: LOADING_DOT_COUNTS.dots }, (_, i) => (
              <div key={i} className="dot" />
            ))}
          </DotsSpinner>
        );
      
      case 'bars':
        return (
          <BarsSpinner {...spinnerProps}>
            {Array.from({ length: LOADING_DOT_COUNTS.bars }, (_, i) => (
              <div key={i} className="bar" />
            ))}
          </BarsSpinner>
        );
      
      case 'pulse':
        return <PulseSpinner {...spinnerProps} />;
      
      case 'bounce':
        return (
          <DotsSpinner data-testid="loading" {...spinnerProps}>
            {Array.from({ length: LOADING_DOT_COUNTS.bounce }, (_, i) => (
              <div key={i} className="dot" />
            ))}
          </DotsSpinner>
        );
      
      case 'ring':
        return <RingSpinner {...spinnerProps} />;
      
      case 'wave':
        return (
          <WaveSpinner {...spinnerProps}>
            {Array.from({ length: LOADING_DOT_COUNTS.wave }, (_, i) => (
              <div key={i} className="wave-bar" />
            ))}
          </WaveSpinner>
        );
      
      case 'ripple':
        return (
          <RippleSpinner {...spinnerProps}>
            <div className="ripple" />
            <div className="ripple" />
          </RippleSpinner>
        );
      
      case 'skeleton':
        return (
          <Skeleton
            variant="rectangular"
            width={fullWidth ? '100%' : spinnerSize * 2}
            height={spinnerSize}
            animation="wave"
          />
        );
      
      default:
        return <CircularSpinner {...spinnerProps} />;
    }
  };

  // Accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel || ACCESSIBILITY_CONSTANTS.loadingLabel,
    'aria-describedby': ariaDescribedBy,
    role: role || ACCESSIBILITY_CONSTANTS.statusRole,
    'aria-live': ACCESSIBILITY_CONSTANTS.liveRegionPolite,
    'aria-busy': loading,
  };

  // Don't render if not loading and no children, or if delayed
  if ((!loading && !children) || (loading && !visible)) {
    return children ? <>{children}</> : null;
  }

  // Render children when not loading
  if (!loading && children) {
    return <>{children}</>;
  }

  const loadingContent = (
    <LoadingContainer
      ref={ref}
      className={className}
      sx={sx}
      customVariant={variant}
      customCentered={centered}
      customFullWidth={fullWidth}
      customFullHeight={fullHeight}
      customMinHeight={minHeight}
      customZIndex={zIndex}
      {...accessibilityProps}
      {...other}
    >
      {renderSpinner()}
      {message && (
        <LoadingMessage customSize={size}>
          {timedOut ? 'Loading is taking longer than expected...' : message}
        </LoadingMessage>
      )}
    </LoadingContainer>
  );

  // Render with backdrop if specified
  if (backdrop && (variant === 'overlay' || variant === 'page')) {
    return (
      <LoadingBackdrop
        open={loading}
        onClick={disableBackdropClick ? undefined : () => {}}
        customOpacity={backdropOpacity}
        customZIndex={zIndex - 1}
      >
        {loadingContent}
      </LoadingBackdrop>
    );
  }

  // Render with children overlay
  if (children && variant === 'overlay') {
    return (
      <div style={{ position: 'relative' }}>
        {children}
        {loading && loadingContent}
      </div>
    );
  }

  return loadingContent;
});

Loading.displayName = 'Loading';