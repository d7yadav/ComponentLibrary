import type { ReactNode, LiHTMLAttributes } from 'react';

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;
  disabled?: boolean;
} 