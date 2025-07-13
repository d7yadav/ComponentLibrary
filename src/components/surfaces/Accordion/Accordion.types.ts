import { AccordionProps as MuiAccordionProps } from '@mui/material/Accordion';
import { AccordionSummaryProps as MuiAccordionSummaryProps } from '@mui/material/AccordionSummary';
import { AccordionDetailsProps as MuiAccordionDetailsProps } from '@mui/material/AccordionDetails';
import { AccordionActionsProps as MuiAccordionActionsProps } from '@mui/material/AccordionActions';
import { ReactNode, SyntheticEvent } from 'react';

export type AccordionVariant = 
  | 'standard'
  | 'outlined'
  | 'elevated'
  | 'flat'
  | 'card';

export type AccordionSize = 
  | 'compact'
  | 'comfortable'
  | 'spacious';

export type AccordionExpandMode = 
  | 'single'
  | 'multiple';

export type AccordionIconPosition = 
  | 'start'
  | 'end'
  | 'both'
  | 'none';

export type AccordionTransition = 
  | 'smooth'
  | 'fast'
  | 'slow'
  | 'none';

export interface AccordionProps extends Omit<MuiAccordionProps, 'expanded' | 'onChange' | 'variant'> {
  /**
   * The variant of the accordion
   */
  variant?: AccordionVariant;
  
  /**
   * The size of the accordion
   */
  size?: AccordionSize;
  
  /**
   * The expand mode for multiple accordions
   */
  expandMode?: AccordionExpandMode;
  
  /**
   * Position of expand/collapse icons
   */
  iconPosition?: AccordionIconPosition;
  
  /**
   * Transition timing for expand/collapse
   */
  transition?: AccordionTransition;
  
  /**
   * If true, the accordion is expanded
   */
  expanded?: boolean;
  
  /**
   * Callback fired when the accordion is expanded/collapsed
   */
  onChange?: (event: SyntheticEvent, expanded: boolean) => void;
  
  /**
   * If true, the accordion is disabled
   */
  disabled?: boolean;
  
  /**
   * If true, the accordion removes default spacing
   */
  disableGutters?: boolean;
  
  /**
   * If true, shows a divider between summary and details
   */
  showDivider?: boolean;
  
  /**
   * Custom expand icon
   */
  expandIcon?: ReactNode;
  
  /**
   * Custom collapse icon
   */
  collapseIcon?: ReactNode;
  
  /**
   * Custom start icon (when iconPosition includes 'start')
   */
  startIcon?: ReactNode;
  
  /**
   * Custom end icon (when iconPosition includes 'end')
   */
  endIcon?: ReactNode;
  
  /**
   * Summary content
   */
  summary: ReactNode;
  
  /**
   * Details content
   */
  children: ReactNode;
  
  /**
   * Actions content (buttons, etc.)
   */
  actions?: ReactNode;
  
  /**
   * Summary subtitle
   */
  subtitle?: ReactNode;
  
  /**
   * If true, prevents the accordion from toggling when summary is clicked
   */
  disableToggle?: boolean;
  
  /**
   * Custom elevation for elevated variant
   */
  elevation?: number;
  
  /**
   * If true, the accordion will be square (no border radius)
   */
  square?: boolean;
  
  /**
   * Additional CSS classes for the accordion
   */
  className?: string;
  
  /**
   * Additional CSS classes for the summary
   */
  summaryClassName?: string;
  
  /**
   * Additional CSS classes for the details
   */
  detailsClassName?: string;
  
  /**
   * Additional CSS classes for the actions
   */
  actionsClassName?: string;
  
  /**
   * Custom styles for the accordion
   */
  style?: React.CSSProperties;
  
  /**
   * Custom styles for the summary
   */
  summaryStyle?: React.CSSProperties;
  
  /**
   * Custom styles for the details
   */
  detailsStyle?: React.CSSProperties;
  
  /**
   * Custom styles for the actions
   */
  actionsStyle?: React.CSSProperties;
  
  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;
  
  /**
   * If true, the summary will have a dense layout
   */
  dense?: boolean;
  
  /**
   * Summary focus color
   */
  focusColor?: 'primary' | 'secondary';
  
  /**
   * Custom data attributes for testing
   */
  'data-testid'?: string;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * ARIA labelledby for accessibility
   */
  'aria-labelledby'?: string;
  
  /**
   * ARIA describedby for accessibility
   */
  'aria-describedby'?: string;
}

export interface AccordionSummaryProps extends Omit<MuiAccordionSummaryProps, 'expandIcon'> {
  /**
   * The variant of the parent accordion
   */
  variant?: AccordionVariant;
  
  /**
   * The size of the parent accordion
   */
  size?: AccordionSize;
  
  /**
   * Position of expand/collapse icons
   */
  iconPosition?: AccordionIconPosition;
  
  /**
   * Custom expand icon
   */
  expandIcon?: ReactNode;
  
  /**
   * Custom start icon
   */
  startIcon?: ReactNode;
  
  /**
   * Custom end icon
   */
  endIcon?: ReactNode;
  
  /**
   * If true, the summary will have a dense layout
   */
  dense?: boolean;
  
  /**
   * Summary focus color
   */
  focusColor?: 'primary' | 'secondary';
  
  /**
   * If true, shows a divider
   */
  showDivider?: boolean;
  
  /**
   * Summary subtitle
   */
  subtitle?: ReactNode;
}

export interface AccordionDetailsProps extends MuiAccordionDetailsProps {
  /**
   * The variant of the parent accordion
   */
  variant?: AccordionVariant;
  
  /**
   * The size of the parent accordion
   */
  size?: AccordionSize;
}

export interface AccordionActionsProps extends MuiAccordionActionsProps {
  /**
   * The variant of the parent accordion
   */
  variant?: AccordionVariant;
  
  /**
   * The size of the parent accordion
   */
  size?: AccordionSize;
  
  /**
   * If true, actions will be aligned to the left
   */
  alignLeft?: boolean;
}

export interface AccordionGroupProps {
  /**
   * The expand mode for the accordion group
   */
  expandMode?: AccordionExpandMode;
  
  /**
   * Accordion items
   */
  children: ReactNode;
  
  /**
   * Callback fired when any accordion in the group changes
   */
  onChange?: (expandedPanels: string[]) => void;
  
  /**
   * Default expanded panels (for uncontrolled mode)
   */
  defaultExpanded?: string[];
  
  /**
   * Controlled expanded panels
   */
  expanded?: string[];
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Custom styles
   */
  style?: React.CSSProperties;
}

export interface AccordionStyleProps {
  variant: AccordionVariant;
  size: AccordionSize;
  expanded: boolean;
  disabled: boolean;
  elevation?: number;
  square: boolean;
  transition: AccordionTransition;
  animationDuration: number;
}

export interface AccordionSummaryStyleProps {
  variant: AccordionVariant;
  size: AccordionSize;
  iconPosition: AccordionIconPosition;
  dense: boolean;
  focusColor: 'primary' | 'secondary';
  showDivider: boolean;
  disabled: boolean;
  expanded: boolean;
}

export interface AccordionDetailsStyleProps {
  variant: AccordionVariant;
  size: AccordionSize;
  expanded: boolean;
}

export interface AccordionActionsStyleProps {
  variant: AccordionVariant;
  size: AccordionSize;
  alignLeft: boolean;
}