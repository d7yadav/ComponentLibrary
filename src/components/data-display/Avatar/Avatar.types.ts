import type { ReactNode, HTMLAttributes } from 'react';

export type AvatarVariant = 'circular' | 'rounded' | 'square';

export type AvatarSize = 'small' | 'medium' | 'large';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  src?: string;
  alt?: string;
  children?: ReactNode;
  variant?: AvatarVariant;
  size?: AvatarSize;
  className?: string;
  style?: React.CSSProperties;
} 