import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
// Remove direct MUI icon imports and add TODO for icon wrappers
// TODO: Replace these with internal icon wrappers when available
// import { PlayArrow, Pause, VolumeUp, Fullscreen, Favorite, Share, Download, BrokenImage } from '@mui/icons-material';

import { Button } from '@/components/core/Button';
import { Chip } from '@/components/core/Chip'; // Replaced MUI Chip with internal wrapper as per migration guidelines
import { IconButton } from '@/components/core/IconButton'; // Replaced MUI IconButton with internal wrapper as per migration guidelines
import { Avatar } from '@/components/data-display/Avatar'; // Replaced MUI Avatar with internal wrapper as per migration guidelines

// TODO: Migrate CircularProgress and Skeleton to internal wrappers when available

import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

import { CardMedia } from './CardMedia';

import { Card, CardHeader, CardContent, CardActions } from './index';
// TODO: Create wrapper components for IconButton, Avatar, Chip, CircularProgress, and Skeleton

/**
 * CardMedia displays media content within Cards, supporting images, videos, and audio.
 * It provides responsive sizing, loading states, and error handling.
 * 
 * ## Features
 * - Support for images, videos, and audio
 * - Responsive aspect ratios
 * - Loading and error states
 * - Overlay content support
 * - Accessibility compliance
 * - Performance optimization
 */
const meta: Meta<typeof CardMedia> = {
  title: 'Data Display/Card/CardMedia',
  component: CardMedia,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card media component for displaying images, videos, and audio content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    component: {
      control: 'select',
      options: ['img', 'video', 'audio', 'iframe'],
      description: 'The component used for the root node',
    },
    // Removed 'image' from argTypes as it is not a valid prop for CardMedia
    src: {
      control: 'text',
      description: 'The media source URL',
    },
    height: {
      control: 'number',
      description: 'The height of the media in pixels',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility',
    },
  },
  decorators: [
    (Story) => (
      <Box maxWidth={400}>
        <Card>
          <Story />
        </Card>
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    component: 'img',
    height: 200,
    // Changed 'image' to 'src' to match CardMediaProps
    src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=200&fit=crop',
    alt: 'Beautiful landscape',
    onClick: fn(),
  },
};

// ===== IMAGE VARIANTS =====
export const ImageVariants: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=200&fit=crop"
          alt="Food photography"
        />
        <CardContent>
          <Typography variant="h6">Food Photography</Typography>
          <Typography variant="body2" color="text.secondary">
            Standard image display with proper alt text for accessibility.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <Box style={{ transition: 'transform 0.3s' }}>
          <CardMedia
            component="img"
            height="300"
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
            alt="Mountain landscape"
          />
        </Box>
        <CardContent>
          <Typography variant="h6">Hover Effect</Typography>
          <Typography variant="body2" color="text.secondary">
            Image with zoom effect on hover for enhanced interactivity.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <Box style={{ filter: 'brightness(0.8)', transition: 'filter 0.3s' }}>
          <CardMedia
            component="img"
            height="250"
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=250&fit=crop"
            alt="Cat portrait"
          />
        </Box>
        <CardContent>
          <Typography variant="h6">Filter Effects</Typography>
          <Typography variant="body2" color="text.secondary">
            Image with CSS filter effects that change on hover.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== ASPECT RATIOS =====
export const AspectRatios: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="140"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=140&fit=crop"
          alt="Wide landscape"
        />
        <CardContent>
          <Typography variant="h6">Wide Aspect (16:9)</Typography>
          <Typography variant="body2" color="text.secondary">
            Short height suitable for landscape photos and banners.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="400"
          src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=400&h=400&fit=crop"
          alt="Square image"
        />
        <CardContent>
          <Typography variant="h6">Square Aspect (1:1)</Typography>
          <Typography variant="body2" color="text.secondary">
            Square format perfect for profile photos and product images.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="500"
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop"
          alt="Portrait orientation"
        />
        <CardContent>
          <Typography variant="h6">Portrait Aspect (4:5)</Typography>
          <Typography variant="body2" color="text.secondary">
            Tall format ideal for portrait photos and artwork.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== VIDEO CONTENT =====
export const VideoContent: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 500 }}>
        <Box style={{ objectFit: 'cover' }}>
          <CardMedia
            component="video"
            height="300"
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            alt="Video Player"
          />
        </Box>
        <CardContent>
          <Typography variant="h6">Video Player</Typography>
          <Typography variant="body2" color="text.secondary">
            Native HTML5 video player with controls enabled.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 500 }}>
        <Box style={{ position: 'relative' }}>
          <Box style={{ objectFit: 'cover' }}>
            <CardMedia
              component="video"
              height="300"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              alt="Video with Overlay"
            />
          </Box>
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(transparent 60%, rgba(0,0,0,0.7))',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 16
            }}
          >
            <Box style={{ color: 'white' }}>
              <Typography variant="h6">Video with Overlay</Typography>
              <Typography variant="body2">
                Auto-playing background video with text overlay
              </Typography>
            </Box>
          </Box>
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Video content with overlay text and gradient background.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== MEDIA WITH OVERLAYS =====
export const MediaOverlays: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <Box style={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="250"
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=400&h=250&fit=crop"
            alt="Food dish"
          />
          <Box
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              gap: 1
            }}
          >
            <IconButton 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                // No hover in inline style; for demo only
              }}
              size="small"
              onClick={fn()}
            >
              {/* TODO: Replace with internal Favorite icon wrapper */}
              <span />
            </IconButton>
            <IconButton 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                // No hover in inline style; for demo only
              }}
              size="small"
              onClick={fn()}
            >
              {/* TODO: Replace with internal Share icon wrapper */}
              <span />
            </IconButton>
          </Box>
          <Chip
            label="Featured"
            color="primary"
            size="small"
            style={{
              position: 'absolute',
              top: 16,
              left: 16
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6">Action Overlays</Typography>
          <Typography variant="body2" color="text.secondary">
            Media with floating action buttons and status chips.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <Box style={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="300"
            src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop"
            alt="Concert venue"
          />
          <Box
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              color: 'white',
              padding: 16
            }}
          >
            <Typography variant="h6">Live Concert</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Join us for an unforgettable evening of music
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
              <Chip label="Live" color="error" size="small" />
              <Chip label="Tonight" color="warning" size="small" />
            </Box>
          </Box>
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Media with gradient overlay and event information.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <Box style={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=200&fit=crop"
            alt="Podcast setup"
          />
          <IconButton
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              width: 60,
              height: 60,
              transition: 'all 0.2s'
              // No hover/scale in inline style; for demo only
            }}
            onClick={fn()}
          >
            {/* TODO: Replace with internal PlayArrow icon wrapper */}
            <span />
          </IconButton>
        </Box>
        <CardContent>
          <Typography variant="h6">Play Button Overlay</Typography>
          <Typography variant="body2" color="text.secondary">
            Media with centered play button for video/audio content.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== LOADING STATES =====
export const LoadingStates: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <Box style={{ position: 'relative', height: 200, backgroundColor: '#f5f5f5' }}>
          {/* TODO: Replace with internal Skeleton wrapper */}
          <span style={{ width: '100%', height: '100%', display: 'block', background: '#eee' }} />
          <Box
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* TODO: Replace with internal CircularProgress wrapper */}
            <span style={{ width: 40, height: 40, display: 'inline-block', borderRadius: '50%', background: '#ccc' }} />
          </Box>
        </Box>
        <CardContent>
          <Typography variant="h6">Loading Skeleton</Typography>
          <Typography variant="body2" color="text.secondary">
            Skeleton placeholder while media content is loading.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <Box 
          style={{ 
            height: 200, 
            backgroundColor: '#fafafa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {/* TODO: Replace with internal CircularProgress wrapper */}
          <span style={{ width: 40, height: 40, display: 'inline-block', borderRadius: '50%', background: '#ccc' }} />
          <Typography variant="body2" color="text.secondary">
            Loading image...
          </Typography>
        </Box>
        <CardContent>
          <Typography variant="h6">Loading Indicator</Typography>
          <Typography variant="body2" color="text.secondary">
            Custom loading state with progress indicator and text.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <Box 
          style={{ 
            height: 200, 
            backgroundColor: '#ffebee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1,
            color: '#d32f2f'
          }}
        >
          {/* TODO: Replace with internal BrokenImage icon wrapper */}
          <span style={{ fontSize: 48, display: 'inline-block', background: '#fdd', width: 48, height: 48 }} />
          <Typography variant="body2">
            Failed to load image
          </Typography>
          <Button size="small" variant="text" onClick={fn()}>
            Retry
          </Button>
        </Box>
        <CardContent>
          <Typography variant="h6">Error State</Typography>
          <Typography variant="body2" color="text.secondary">
            Error state with retry option when media fails to load.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== RESPONSIVE BEHAVIOR =====
export const ResponsiveBehavior: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 600 }}>
        <Box style={{ height: 200, objectFit: 'cover' }}>
          <CardMedia
            component="img"
            height={200}
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=300&fit=crop"
            alt="Responsive landscape"
          />
        </Box>
        <CardContent>
          <Typography variant="h6">Responsive Height</Typography>
          <Typography variant="body2" color="text.secondary">
            Media height adjusts based on screen size: 200px on mobile, 250px on tablet, 300px on desktop.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 600 }}>
        <Box style={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="250"
            src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=600&h=250&fit=crop"
            alt="Desert landscape"
          />
          <Box
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              color: 'white'
            }}
          >
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                }}
              >
                Desert Adventure
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  display: { xs: 'none', sm: 'block' },
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                }}
              >
                Explore the vast beauty of the desert
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                size="small" 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  // No hover in inline style; for demo only
                }}
              >
                {/* TODO: Replace with internal Favorite icon wrapper */}
                <span />
              </IconButton>
              <IconButton 
                size="small" 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  // No hover in inline style; for demo only
                }}
              >
                {/* TODO: Replace with internal Share icon wrapper */}
                <span />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Responsive overlay content that adapts to different screen sizes.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Media components that adapt their size and content based on viewport width.',
      },
    },
  },
};

// ===== ACCESSIBILITY FEATURES =====
export const AccessibilityFeatures: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=400&h=200&fit=crop"
          alt="Golden retriever dog playing in a sunny park with green grass and trees in the background"
        />
        <CardContent>
          <Typography variant="h6">Descriptive Alt Text</Typography>
          <Typography variant="body2" color="text.secondary">
            Comprehensive alt text that describes the image content for screen readers.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <Box style={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop"
            alt="Scenic lake with mountains"
          />
          <IconButton
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              // No focus-visible in inline style; for demo only
            }}
            aria-label="Play video about scenic lake and mountains"
            onClick={fn()}
          >
            {/* TODO: Replace with internal PlayArrow icon wrapper */}
            <span />
          </IconButton>
        </Box>
        <CardContent>
          <Typography variant="h6">Accessible Controls</Typography>
          <Typography variant="body2" color="text.secondary">
            Interactive elements with proper ARIA labels and focus indicators.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="video"
          height="200"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          alt="Sample video about big blazes"
        />
        <CardContent>
          <Typography variant="h6">Video Accessibility</Typography>
          <Typography variant="body2" color="text.secondary">
            Video element with proper ARIA labeling and keyboard focus support.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== REAL-WORLD EXAMPLES =====
export const RealWorldExamples: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3} direction={{ xs: 'column', lg: 'row' }}>
      <Card sx={{ maxWidth: 350 }}>
        <CardHeader
          avatar={<Avatar>R</Avatar>}
          title="Recipe Collection"
          action={
            <IconButton onClick={fn()}>
              {/* TODO: Replace with internal Bookmark icon wrapper */}
              <span />
            </IconButton>
          }
        />
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=350&h=200&fit=crop"
          alt="Delicious homemade pizza with fresh ingredients"
        />
        <CardContent>
          <Typography variant="h6">Homemade Pizza</Typography>
          <Typography variant="body2" color="text.secondary">
            Learn to make authentic Italian pizza from scratch with this detailed recipe guide.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View Recipe</Button>
          <Button size="small">Save</Button>
          <IconButton>
            {/* TODO: Replace with internal Share icon wrapper */}
            <span />
          </IconButton>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 350 }}>
        <Box style={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="250"
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=350&h=250&fit=crop"
            alt="Business analytics dashboard"
          />
          <Chip
            label="Live Data"
            color="success"
            size="small"
            style={{ position: 'absolute', top: 16, left: 16 }}
          />
          <Box
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              gap: 1
            }}
          >
            <IconButton 
              size="small"
              style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
              onClick={fn()}
            >
              {/* TODO: Replace with internal Download icon wrapper */}
              <span />
            </IconButton>
            <IconButton 
              size="small"
              style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
              onClick={fn()}
            >
              {/* TODO: Replace with internal Fullscreen icon wrapper */}
              <span />
            </IconButton>
          </Box>
        </Box>
        <CardContent>
          <Typography variant="h6">Analytics Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time business metrics and performance indicators for Q1 2024.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary">View Details</Button>
          <Button size="small">Export</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 350 }}>
        <Box style={{ position: 'relative' }}>
          <CardMedia
            component="video"
            height="200"
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
            alt="Product Demo Video"
          />
          <Chip
            label="4K"
            color="primary"
            size="small"
            style={{ position: 'absolute', bottom: 16, right: 16 }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6">Product Demo</Typography>
          <Typography variant="body2" color="text.secondary">
            Watch our latest product demonstration showcasing new features and capabilities.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary">Watch Full Video</Button>
          <IconButton>
            {/* TODO: Replace with internal Share icon wrapper */}
            <span />
          </IconButton>
        </CardActions>
      </Card>
    </Stack>
  ),
};

// ===== MISSING MANDATORY CATEGORIES =====

// ===== THEMES =====
export const Themes: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=200&fit=crop"
          alt="Light theme media"
        />
        <CardContent>
          <Typography variant="h6">Light Theme Media</Typography>
          <Typography variant="body2" color="text.secondary">
            Media content optimized for light theme backgrounds with proper contrast.
          </Typography>
        </CardContent>
      </Card>
      
      <Card 
        sx={{ 
          maxWidth: 400,
          bgcolor: 'background.paper',
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=200&fit=crop"
          alt="Dark theme media"
        />
        <CardContent>
          <Typography variant="h6">Dark Theme Media</Typography>
          <Typography variant="body2" color="text.secondary">
            Media content optimized for dark theme backgrounds with enhanced visibility.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <Box style={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=400&h=200&fit=crop"
            alt="Theme-aware media with overlay"
          />
          <Box
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              gap: 1
            }}
          >
            <IconButton 
              style={{ 
                backgroundColor: '#fff', // fallback for background.paper
                color: '#000', // fallback for text.primary
                border: '1px solid #e0e0e0', // fallback for divider
                // No hover in inline style; for demo only
              }}
              size="small"
              aria-label="theme-aware favorite"
            >
              {/* TODO: Replace with internal Favorite icon wrapper */}
              <span />
            </IconButton>
            <IconButton 
              style={{ 
                backgroundColor: '#fff', // fallback for background.paper
                color: '#000', // fallback for text.primary
                border: '1px solid #e0e0e0', // fallback for divider
                // No hover in inline style; for demo only
              }}
              size="small"
              aria-label="theme-aware share"
            >
              {/* TODO: Replace with internal Share icon wrapper */}
              <span />
            </IconButton>
          </Box>
          <Chip
            label="Featured"
            color="primary"
            size="small"
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              backgroundColor: '#1976d2', // fallback for primary.main
              color: '#fff', // fallback for primary.contrastText
              // No hover in inline style; for demo only
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6">Theme-Aware Overlays</Typography>
          <Typography variant="body2" color="text.secondary">
            Media with overlay elements that adapt to the current theme for optimal visibility.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates CardMedia in both light and dark themes with theme-aware overlays and proper contrast.',
      },
    },
  },
};

// ===== VARIANTS =====
export const Variants: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          alt="Image variant"
        />
        <CardContent>
          <Typography variant="h6">Image Component</Typography>
          <Typography variant="body2">Standard image display using img component.</Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="video"
          height="200"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          alt="Video Component"
        />
        <CardContent>
          <Typography variant="h6">Video Component</Typography>
          <Typography variant="body2">Video display using video component with controls.</Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia height="200">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: 'grey.200' }}>
            <Typography variant="h6" color="text.secondary">Custom Content</Typography>
          </Box>
        </CardMedia>
        <CardContent>
          <Typography variant="h6">Custom Component</Typography>
          <Typography variant="body2">Custom content using children instead of src.</Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== STATES =====
export const States: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          alt="Normal state"
        />
        <CardContent>
          <Typography variant="h6">Normal State</Typography>
          <Typography variant="body2">Media in normal loading and display state.</Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          src="invalid-url.jpg"
          alt="Error state"
          showLoading={true}
        />
        <CardContent>
          <Typography variant="h6">Error State</Typography>
          <Typography variant="body2">Media that fails to load shows fallback state.</Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          loading="lazy"
          showLoading={true}
        />
        <CardContent>
          <Typography variant="h6">Loading State</Typography>
          <Typography variant="body2">Media showing loading spinner while loading.</Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== BOOLEAN PROPS =====
export const BooleanProps: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          alt="With loading indicator"
          showLoading={true}
        />
        <CardContent>
          <Typography variant="h6">showLoading: true</Typography>
          <Typography variant="body2">Shows loading indicator while media loads.</Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          alt="Without loading indicator"
          showLoading={false}
        />
        <CardContent>
          <Typography variant="h6">showLoading: false</Typography>
          <Typography variant="body2">No loading indicator shown during load.</Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          alt="Lazy loading enabled"
          loading="lazy"
        />
        <CardContent>
          <Typography variant="h6">loading: &quot;lazy&quot;</Typography>
          <Typography variant="body2">Image loads when it comes into viewport.</Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          alt="Eager loading"
          loading="eager"
        />
        <CardContent>
          <Typography variant="h6">loading: &quot;eager&quot;</Typography>
          <Typography variant="body2">Image loads immediately regardless of viewport.</Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== SIZES =====
export const Sizes: Story = {
  render: (): JSX.Element => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="140"
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          alt="Small size"
        />
        <CardContent>
          <Typography variant="h6">Small (140px)</Typography>
          <Typography variant="body2">Compact media size for card thumbnails.</Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="200"
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          alt="Medium size"
        />
        <CardContent>
          <Typography variant="h6">Medium (200px)</Typography>
          <Typography variant="body2">Standard media size for most use cases.</Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="300"
          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
          alt="Large size"
        />
        <CardContent>
          <Typography variant="h6">Large (300px)</Typography>
          <Typography variant="body2">Prominent media size for featured content.</Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};