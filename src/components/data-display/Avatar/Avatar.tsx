import { Person } from '@mui/icons-material';
import React, { useState, useCallback, forwardRef, memo } from 'react';

import { DEFAULT_PROPS } from './Avatar.constants';
import { StyledAvatar, StyledAvatarImage, StyledAvatarFallback } from './Avatar.styles';
import type { AvatarProps } from './Avatar.types';

/**
 * Avatar component displays a user image, initials, or fallback icon.
 * Supports multiple variants (circular, rounded, square) and sizes.
 *
 * @author dilip.yadav@shorelineiot.com
 * @param props - Avatar props
 * @returns Avatar component
 */
export const Avatar = memo(forwardRef<HTMLDivElement, AvatarProps>(({ 
  src,
  alt = DEFAULT_PROPS.alt,
  children,
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
  className,
  style,
  ...rest
}, ref) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  // Generate initials from alt text or children
  const getInitials = useCallback(() => {
    if (typeof children === 'string') {
      return children.split(' ').map(word => word[0]).join('').slice(0, 2);
    }
    if (alt) {
      return alt.split(' ').map(word => word[0]).join('').slice(0, 2);
    }
    return '';
  }, [children, alt]);

  const hasImage = src && !imageError;
  const initials = getInitials();

  return (
    <StyledAvatar
      ref={ref}
      variant={variant}
      size={size}
      $hasImage={hasImage}
      className={className}
      style={style}
      data-testid="avatar-root"
      role="img"
      aria-label={alt}
      tabIndex={0}
      {...rest}
    >
      {hasImage && (
        <StyledAvatarImage
          src={src}
          alt={alt}
          onError={handleImageError}
          onLoad={handleImageLoad}
          data-testid="avatar-image"
        />
      )}
      {!hasImage && (
        <StyledAvatarFallback data-testid="avatar-fallback">
          {initials || children || <Person />}
        </StyledAvatarFallback>
      )}
    </StyledAvatar>
  );
}));

Avatar.displayName = 'Avatar';