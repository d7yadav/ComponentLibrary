import { ExpandMore, ChevronRight } from '@mui/icons-material';
import type { SyntheticEvent } from 'react';
import React, { forwardRef, memo, useCallback, useMemo } from 'react';

import {
  ACCORDION_VARIANTS,
  ACCORDION_SIZES,
  ACCORDION_ICON_POSITIONS,
  ACCORDION_TRANSITIONS,
  ACCORDION_FOCUS_COLORS,
  ANIMATION_DURATIONS,
  DEFAULT_PROPS,
  ACCESSIBILITY_CONSTANTS,
  TEST_IDS,
} from './Accordion.constants';
import {
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  StyledAccordionActions,
  SummaryContent,
  SummaryTitle,
  SummarySubtitle,
  IconWrapper,
  StyledDivider,
  loadingSpinKeyframes,
} from './Accordion.styles';
import type { AccordionProps, AccordionSummaryProps, AccordionDetailsProps, AccordionActionsProps } from './Accordion.types';

/**
 * Enhanced Accordion component with multiple variants, animations, and accessibility features
 * 
 * Features:
 * - 5 variants: standard, outlined, elevated, flat, card
 * - 3 sizes: compact, comfortable, spacious
 * - Flexible icon positioning: start, end, both, none
 * - Smooth animations with customizable timing
 * - Single and multiple expand modes
 * - Comprehensive accessibility (WCAG 2.1 AA)
 * - Custom expand/collapse icons
 * - Summary subtitles and actions
 * - Mobile-optimized touch interactions
 * - Dark theme support
 */
const AccordionComponent = forwardRef<HTMLDivElement, AccordionProps>(({
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
  expandMode = DEFAULT_PROPS.expandMode,
  iconPosition = DEFAULT_PROPS.iconPosition,
  transition = DEFAULT_PROPS.transition,
  expanded = DEFAULT_PROPS.expanded,
  onChange,
  disabled = DEFAULT_PROPS.disabled,
  disableGutters = DEFAULT_PROPS.disableGutters,
  showDivider = DEFAULT_PROPS.showDivider,
  expandIcon,
  collapseIcon,
  startIcon,
  endIcon,
  summary,
  children,
  actions,
  subtitle,
  disableToggle = DEFAULT_PROPS.disableToggle,
  elevation = DEFAULT_PROPS.elevation,
  square = DEFAULT_PROPS.square,
  className,
  summaryClassName,
  detailsClassName,
  actionsClassName,
  style,
  summaryStyle,
  detailsStyle,
  actionsStyle,
  animationDuration = DEFAULT_PROPS.animationDuration,
  dense = DEFAULT_PROPS.dense,
  focusColor = DEFAULT_PROPS.focusColor,
  'data-testid': dataTestId = TEST_IDS.accordion,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...other
}, ref) => {
  // Handle accordion expansion
  const handleChange = useCallback((event: SyntheticEvent, isExpanded: boolean) => {
    if (disabled || disableToggle) return;
    onChange?.(event, isExpanded);
  }, [onChange, disabled, disableToggle]);

  // Determine expand icon
  const getExpandIcon = useMemo(() => {
    if (iconPosition === ACCORDION_ICON_POSITIONS.none) return null;
    
    if (expandIcon && collapseIcon) {
      return expanded ? collapseIcon : expandIcon;
    }
    
    if (expandIcon) return expandIcon;
    
    // Default icons based on position
    if (iconPosition === ACCORDION_ICON_POSITIONS.start) {
      return <ChevronRight />;
    }
    
    return <ExpandMore />;
  }, [iconPosition, expandIcon, collapseIcon, expanded]);

  // Generate unique IDs for accessibility
  const summaryId = useMemo(() => `accordion-summary-${Math.random().toString(36).substr(2, 9)}`, []);
  const detailsId = useMemo(() => `accordion-details-${Math.random().toString(36).substr(2, 9)}`, []);

  // Accessibility props
  const accordionAccessibilityProps = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy || summaryId,
    'aria-describedby': ariaDescribedBy || detailsId,
    role: ACCESSIBILITY_CONSTANTS.accordionRole,
  };

  const summaryAccessibilityProps = {
    id: summaryId,
    'aria-controls': detailsId,
    'aria-expanded': expanded,
    'aria-label': typeof summary === 'string' ? summary : ariaLabel || ACCESSIBILITY_CONSTANTS.expandLabel,
  };

  const detailsAccessibilityProps = {
    id: detailsId,
    'aria-labelledby': summaryId,
    role: 'region',
  };

  // Style props for styled components
  const accordionStyleProps = {
    variant,
    size,
    expanded: Boolean(expanded),
    disabled: Boolean(disabled),
    elevation,
    square: Boolean(square),
    transition,
    animationDuration,
  };

  const summaryStyleProps = {
    variant,
    size,
    iconPosition,
    dense: Boolean(dense),
    focusColor,
    showDivider: Boolean(showDivider),
    disabled: Boolean(disabled),
    expanded: Boolean(expanded),
  };

  const detailsStyleProps = {
    variant,
    size,
    expanded: Boolean(expanded),
  };

  const actionsStyleProps = {
    variant,
    size,
    alignLeft: false, // Default to right alignment
  };

  return (
    <>
      <style>{loadingSpinKeyframes}</style>
      <StyledAccordion
        ref={ref}
        expanded={expanded}
        onChange={handleChange}
        disabled={disabled}
        disableGutters={disableGutters}
        square={square}
        elevation={variant === ACCORDION_VARIANTS.elevated ? elevation : 0}
        className={className}
        style={style}
        data-testid={dataTestId}
        {...accordionAccessibilityProps}
        {...other}
      >
        <StyledAccordionSummary
          expandIcon={getExpandIcon}
          className={summaryClassName}
          style={summaryStyle}
          data-testid={`${dataTestId}-${TEST_IDS.summary}`}
          {...summaryStyleProps}
          {...summaryAccessibilityProps}
        >
          {/* Start icon */}
          {startIcon && iconPosition !== ACCORDION_ICON_POSITIONS.none && (
            <IconWrapper 
              position="start" 
              size={size}
              data-testid={`${dataTestId}-${TEST_IDS.startIcon}`}
            >
              {startIcon}
            </IconWrapper>
          )}

          {/* Summary content */}
          <SummaryContent 
            hasSubtitle={Boolean(subtitle)}
            iconPosition={iconPosition}
          >
            <SummaryTitle>
              {summary}
            </SummaryTitle>
            {subtitle && (
              <SummarySubtitle data-testid={`${dataTestId}-${TEST_IDS.subtitle}`}>
                {subtitle}
              </SummarySubtitle>
            )}
          </SummaryContent>

          {/* End icon */}
          {endIcon && iconPosition !== ACCORDION_ICON_POSITIONS.none && (
            <IconWrapper 
              position="end" 
              size={size}
              data-testid={`${dataTestId}-${TEST_IDS.endIcon}`}
            >
              {endIcon}
            </IconWrapper>
          )}
        </StyledAccordionSummary>

        {/* Divider between summary and details */}
        {showDivider && expanded && (
          <StyledDivider data-testid={`${dataTestId}-${TEST_IDS.divider}`} />
        )}

        <StyledAccordionDetails
          className={detailsClassName}
          style={detailsStyle}
          data-testid={`${dataTestId}-${TEST_IDS.details}`}
          {...detailsStyleProps}
          {...detailsAccessibilityProps}
        >
          {children}
        </StyledAccordionDetails>

        {/* Actions */}
        {actions && (
          <StyledAccordionActions
            className={actionsClassName}
            style={actionsStyle}
            data-testid={`${dataTestId}-${TEST_IDS.actions}`}
            {...actionsStyleProps}
          >
            {actions}
          </StyledAccordionActions>
        )}
      </StyledAccordion>
    </>
  );
});

AccordionComponent.displayName = 'Accordion';

// Export memoized component for performance optimization
export const Accordion = memo(AccordionComponent);

// Enhanced AccordionSummary component for standalone use
const AccordionSummaryComponent = forwardRef<HTMLDivElement, AccordionSummaryProps>(({
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
  iconPosition = DEFAULT_PROPS.iconPosition,
  expandIcon,
  startIcon,
  endIcon,
  dense = DEFAULT_PROPS.dense,
  focusColor = DEFAULT_PROPS.focusColor,
  showDivider = DEFAULT_PROPS.showDivider,
  subtitle,
  children,
  ...other
}, ref) => {
  const styleProps = {
    variant,
    size,
    iconPosition,
    dense,
    focusColor,
    showDivider,
    disabled: false,
    expanded: false,
  };

  return (
    <StyledAccordionSummary
      ref={ref}
      expandIcon={expandIcon}
      {...styleProps}
      {...other}
    >
      {startIcon && (
        <IconWrapper position="start" size={size}>
          {startIcon}
        </IconWrapper>
      )}
      
      <SummaryContent hasSubtitle={Boolean(subtitle)} iconPosition={iconPosition}>
        <SummaryTitle>{children}</SummaryTitle>
        {subtitle && <SummarySubtitle>{subtitle}</SummarySubtitle>}
      </SummaryContent>
      
      {endIcon && (
        <IconWrapper position="end" size={size}>
          {endIcon}
        </IconWrapper>
      )}
    </StyledAccordionSummary>
  );
});

AccordionSummaryComponent.displayName = 'AccordionSummary';

export const AccordionSummary = memo(AccordionSummaryComponent);

// Enhanced AccordionDetails component for standalone use
const AccordionDetailsComponent = forwardRef<HTMLDivElement, AccordionDetailsProps>(({
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
  children,
  ...other
}, ref) => {
  const styleProps = {
    variant,
    size,
    expanded: true,
  };

  return (
    <StyledAccordionDetails
      ref={ref}
      {...styleProps}
      {...other}
    >
      {children}
    </StyledAccordionDetails>
  );
});

AccordionDetailsComponent.displayName = 'AccordionDetails';

export const AccordionDetails = memo(AccordionDetailsComponent);

// Enhanced AccordionActions component for standalone use
const AccordionActionsComponent = forwardRef<HTMLDivElement, AccordionActionsProps>(({
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
  alignLeft = false,
  children,
  ...other
}, ref) => {
  const styleProps = {
    variant,
    size,
    alignLeft,
  };

  return (
    <StyledAccordionActions
      ref={ref}
      {...styleProps}
      {...other}
    >
      {children}
    </StyledAccordionActions>
  );
});

AccordionActionsComponent.displayName = 'AccordionActions';

export const AccordionActions = memo(AccordionActionsComponent);