import type { AvatarVariant, AvatarSize } from './Avatar.types';

export const DEFAULT_PROPS = {
  alt: 'Avatar',
  variant: 'circular' as AvatarVariant,
  size: 'medium' as AvatarSize,
};

export const AVATAR_VARIANTS: AvatarVariant[] = ['circular', 'rounded', 'square'];

export const AVATAR_SIZES: AvatarSize[] = ['small', 'medium', 'large'];

export const AVATAR_SIZE_MAP = {
  small: 32,
  medium: 40,
  large: 56,
} as const;

export const AVATAR_BORDER_RADIUS_MAP = {
  circular: '50%',
  rounded: '8px',
  square: '0px',
} as const; 