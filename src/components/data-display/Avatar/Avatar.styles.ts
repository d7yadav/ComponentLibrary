import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

import { AVATAR_SIZE_MAP, AVATAR_BORDER_RADIUS_MAP } from './Avatar.constants';
import type { AvatarVariant, AvatarSize } from './Avatar.types';

interface StyledAvatarProps {
  variant: AvatarVariant;
  size: AvatarSize;
  $hasImage?: boolean;
}

/**
 * StyledAvatar - Main avatar container
 */
export const StyledAvatar: React.ComponentType<StyledAvatarProps & { theme?: Theme }> = styled('div')<StyledAvatarProps>(({ theme, variant, size, $hasImage }) => {
  const sizeValue = AVATAR_SIZE_MAP[size];
  const borderRadius = AVATAR_BORDER_RADIUS_MAP[variant];

  return {
    width: sizeValue,
    height: sizeValue,
    borderRadius,
    backgroundColor: $hasImage ? 'transparent' : theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    overflow: 'hidden',
    position: 'relative',
    userSelect: 'none',
    textTransform: 'uppercase',
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
    // Hover states
    '&:hover': {
      backgroundColor: $hasImage ? 'transparent' : theme.palette.primary.dark,
    },
    // Focus states for accessibility
    '&:focus': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },
  };
});

/**
 * StyledAvatarImage - Avatar image styling
 */
export const StyledAvatarImage: React.ComponentType<React.ImgHTMLAttributes<HTMLImageElement>> = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

/**
 * StyledAvatarFallback - Fallback content styling
 */
export const StyledAvatarFallback: React.ComponentType<React.HTMLAttributes<HTMLSpanElement>> = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
}); 