import type { ReactNode, ChangeEvent, HTMLAttributes } from 'react';

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name?: string,
  value?: string | number,
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string | number) => void,
  children?: ReactNode,
  className?: string,
  style?: React.CSSProperties,
} 