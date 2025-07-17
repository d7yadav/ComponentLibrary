import type { ReactNode, HTMLAttributes } from 'react';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
} 