import { forwardRef, useState, memo } from 'react';
import { CircularProgress } from '@mui/material';
import { CardMediaProps } from './Card.types';
import { StyledCardMedia } from './Card.styles';
import { CARD_MEDIA_DEFAULTS } from './Card.constants';

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
        <div data-testid="cardmedia" 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}
        >
          Failed to load media
        </div>
      );
    }

    const mediaProps = {
      src,
      style: { 
        opacity: isLoading && showLoading ? 0 : 1,
        transition: 'opacity 0.3s ease',
      },
      onLoad: handleLoad,
      onError: handleError,
      ...(loading && { loading }),
      ...(alt && { alt }),
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
        <div data-testid="cardmedia" className="card-media-loading">
          <CircularProgress size={24} />
        </div>
      )}
    </StyledCardMedia>
  );
});

CardMedia.displayName = 'CardMedia';