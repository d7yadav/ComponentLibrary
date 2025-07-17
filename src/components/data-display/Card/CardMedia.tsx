import React, { forwardRef, useState, memo } from 'react';

import { CircularProgress } from '@/components/feedback/Progress';
import { Box } from '@/components/layout/Box';

import { CARD_MEDIA_DEFAULTS } from './Card.constants';
import { StyledCardMedia } from './Card.styles';
import type { CardMediaProps } from './Card.types';

/**
 * CardMedia component for displaying images, videos, or custom media content
 * 
 * Features:
 * - Image and video support
 * - Lazy loading for performance
 * - Loading states with placeholder
 * - Proper aspect ratio handling
 * - Object fit customization
 * - Accessibility support
 */
export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(({
  src,
  alt,
  component = 'img',
  height = CARD_MEDIA_DEFAULTS.height,
  width,
  objectFit = CARD_MEDIA_DEFAULTS.objectFit,
  loading = CARD_MEDIA_DEFAULTS.loading,
  showLoading = true,
  className,
  children,
  ...other
}, ref) => {
  const [isLoading, setIsLoading] = useState(Boolean(src));
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const renderMedia = () => {
    if (children) {
      return children;
    }

    if (!src) {
      return null;
    }

    if (hasError) {
      return (
        <Box data-testid="cardmedia"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}
        >
          Failed to load media
        </Box>
      );
    }

    const mediaProps = {
      src,
      alt: alt || '', // Always provide alt text for accessibility
      style: { 
        opacity: isLoading && showLoading ? 0 : 1,
        transition: 'opacity 0.3s ease',
      },
      onLoad: handleLoad,
      onError: handleError,
      ...(loading && { loading }),
      ...(width && { width }),
    };

    if (component === 'video') {
      return (
        <video
          {...mediaProps}
          controls
          playsInline
          muted
        />
      );
    }

    return <img {...mediaProps} />;
  };

  return (
    <StyledCardMedia
      ref={ref}
      height={height}
      objectFit={objectFit}
      className={className}
      {...other}
    >
      {renderMedia()}
      
      {isLoading && showLoading && src && (
        <Box data-testid="cardmedia" className="card-media-loading">
          <CircularProgress size={24} />
        </Box>
      )}
    </StyledCardMedia>
  );
});

CardMedia.displayName = 'CardMedia';