import type { AccordionProps as MuiAccordionProps } from '@mui/material/Accordion';
import type { AccordionActionsProps as MuiAccordionActionsProps } from '@mui/material/AccordionActions';
import type { AccordionDetailsProps as MuiAccordionDetailsProps } from '@mui/material/AccordionDetails';
import type { AccordionSummaryProps as MuiAccordionSummaryProps } from '@mui/material/AccordionSummary';
import type { ReactNode, SyntheticEvent } from 'react';

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
  variant?: AccordionVariant;
  
  size?: AccordionSize;
  
  expandMode?: AccordionExpandMode;
  
  iconPosition?: AccordionIconPosition;
  
  transition?: AccordionTransition;
  
  expanded?: boolean;
  
  onChange?: (event: SyntheticEvent, expanded: boolean) => void;
  
  disabled?: boolean;
  
  disableGutters?: boolean;
  
  showDivider?: boolean;
  
  expandIcon?: ReactNode;
  
  collapseIcon?: ReactNode;
  
  startIcon?: ReactNode;
  
  endIcon?: ReactNode;
  
  summary: ReactNode;
  
  children: ReactNode;
  
  actions?: ReactNode;
  
  subtitle?: ReactNode;
  
  disableToggle?: boolean;
  
  elevation?: number;
  
  square?: boolean;
  
  className?: string;
  
  summaryClassName?: string;
  
  detailsClassName?: string;
  
  actionsClassName?: string;
  
  style?: React.CSSProperties;
  
  summaryStyle?: React.CSSProperties;
  
  detailsStyle?: React.CSSProperties;
  
  actionsStyle?: React.CSSProperties;
  
  animationDuration?: number;
  
  dense?: boolean;
  
  focusColor?: 'primary' | 'secondary';
  
  'data-testid'?: string;
  
  'aria-label'?: string;
  
  'aria-labelledby'?: string;
  
  'aria-describedby'?: string;
}

export interface AccordionSummaryProps extends Omit<MuiAccordionSummaryProps, 'expandIcon'> {
  variant?: AccordionVariant;
  
  size?: AccordionSize;
  
  iconPosition?: AccordionIconPosition;
  
  expandIcon?: ReactNode;
  
  startIcon?: ReactNode;
  
  endIcon?: ReactNode;
  
  dense?: boolean;
  
  focusColor?: 'primary' | 'secondary';
  
  showDivider?: boolean;
  
  subtitle?: ReactNode;
}

export interface AccordionDetailsProps extends MuiAccordionDetailsProps {
  variant?: AccordionVariant;
  
  size?: AccordionSize;
}

export interface AccordionActionsProps extends MuiAccordionActionsProps {
  variant?: AccordionVariant;
  
  size?: AccordionSize;
  
  alignLeft?: boolean;
}

export interface AccordionGroupProps {
  expandMode?: AccordionExpandMode;
  
  children: ReactNode;
  
  onChange?: (expandedPanels: string[]) => void;
  
  defaultExpanded?: string[];
  
  expanded?: string[];
  
  className?: string;
  
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