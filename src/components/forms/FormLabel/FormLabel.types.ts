import type { ReactNode, LabelHTMLAttributes } from 'react';

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode,
  htmlFor?: string,
  className?: string,
  style?: React.CSSProperties,
} 