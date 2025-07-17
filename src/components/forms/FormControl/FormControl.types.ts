import type { ReactNode, HTMLAttributes } from 'react';

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
} 