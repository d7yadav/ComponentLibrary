import type { CSSProperties, ReactNode } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';

export type DividerVariant = 'fullWidth' | 'inset' | 'middle';

export type DividerTextAlign = 'left' | 'center' | 'right';

export interface DividerProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  children?: ReactNode;
  textAlign?: DividerTextAlign;
  flexItem?: boolean;
  absolute?: boolean;
  className?: string;
  style?: CSSProperties;
  role?: string;
  'aria-orientation'?: string;
  color?: string;
} 