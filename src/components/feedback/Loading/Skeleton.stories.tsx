import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, {  useState  } from 'react';

import { Button } from '@/components/core/Button';
import { Avatar } from '@/components/data-display/Avatar';
import { Card, CardContent } from '@/components/data-display/Card';
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';

import { Skeleton } from './Skeleton';

/**
 * Skeleton provides placeholder loading components that mimic the shape of content
 * before it loads. It offers better perceived performance than traditional spinners.
 * 
 * ## Features
 * - Multiple variants (text, rectangular, circular)
 * - Customizable dimensions and styling
 * - Animation options (wave, pulse, none)
 * - Responsive behavior
 * - Accessibility support
 * - Performance optimized
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Loading/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Skeleton component for showing placeholder content while data is loading.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rectangular', 'circular'],
      description: 'The type of skeleton to display',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', false],
      description: 'The animation type',
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the skeleton',
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the skeleton',
    },
    lines: {
      control: 'number',
      description: 'Number of lines for text variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    variant: 'text',
    animation: 'wave',
  },
};

// ===== VARIANT TYPES =====
export const VariantTypes: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Text Variants</Typography>
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Rectangular Variants</Typography>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width={200} height={100} />
          <Skeleton variant="rectangular" width="50%" height={80} />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Circular Variants</Typography>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="circular" width={64} height={64} />
          <Skeleton variant="circular" width={80} height={80} />
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== ANIMATION TYPES =====
export const AnimationTypes: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Wave Animation</Typography>
        <Stack spacing={1}>
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" width="80%" />
          <Skeleton variant="rectangular" animation="wave" width="100%" height={60} />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Pulse Animation</Typography>
        <Stack spacing={1}>
          <Skeleton variant="text" animation="pulse" />
          <Skeleton variant="text" animation="pulse" width="80%" />
          <Skeleton variant="rectangular" animation="pulse" width="100%" height={60} />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>No Animation</Typography>
        <Stack spacing={1}>
          <Skeleton variant="text" animation={false} />
          <Skeleton variant="text" animation={false} width="80%" />
          <Skeleton variant="rectangular" animation={false} width="100%" height={60} />
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== TEXT SKELETON PATTERNS =====
export const TextSkeletonPatterns: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Single Line Text</Typography>
        <Skeleton variant="text" />
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Multiple Lines</Typography>
        <Skeleton variant="text" lines={3} />
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Paragraph with Varying Widths</Typography>
        <Stack spacing={1}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="95%" />
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="85%" />
          <Skeleton variant="text" width="70%" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Article Structure</Typography>
        <Stack spacing={2}>
          <Skeleton variant="text" sx={{ fontSize: '2rem' }} width="60%" />
          <Skeleton variant="text" sx={{ fontSize: '1.2rem' }} width="40%" />
          <Stack spacing={1} sx={{ mt: 2 }}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="85%" />
          </Stack>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>List Items</Typography>
        <Stack spacing={1}>
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Skeleton variant="circular" width={8} height={8} />
              <Skeleton variant="text" width={`${Math.random() * 40 + 60}%`} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== CARD SKELETON LAYOUTS =====
export const CardSkeletonLayouts: Story = {
  render: (args) => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3 }}>
      {/* Basic Card Skeleton */}
      <Card data-testid="skeleton.stories">
        <CardContent>
          <Typography variant="h6" gutterBottom>Basic Card</Typography>
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width="100%" height={140} />
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
          </Stack>
        </CardContent>
      </Card>
      
      {/* Profile Card Skeleton */}
      <Card data-testid="skeleton.stories">
        <CardContent>
          <Typography variant="h6" gutterBottom>Profile Card</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Skeleton variant="circular" width={56} height={56} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" sx={{ fontSize: '1.2rem' }} width="80%" />
              <Skeleton variant="text" width="60%" />
            </Box>
          </Box>
          <Stack spacing={1}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="70%" />
          </Stack>
        </CardContent>
      </Card>
      
      {/* Media Card Skeleton */}
      <Card data-testid="skeleton.stories">
        <CardContent>
          <Typography variant="h6" gutterBottom>Media Card</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="40%" />
              </Box>
            </Box>
            <Skeleton variant="rectangular" width="100%" height={160} />
            <Stack spacing={1}>
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      
      {/* Product Card Skeleton */}
      <Card data-testid="skeleton.stories">
        <CardContent>
          <Typography variant="h6" gutterBottom>Product Card</Typography>
          <Stack spacing={2}>
            <Skeleton variant="rectangular" width="100%" height={120} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" sx={{ fontSize: '1.2rem' }} width="80%" />
                <Skeleton variant="text" width="60%" />
              </Box>
              <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={60} />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant="rectangular" width={60} height={24} />
              <Skeleton variant="rectangular" width={60} height={24} />
            </Box>
          </Stack>
        </CardContent>
      </Card>
      
      {/* Dashboard Card Skeleton */}
      <Card data-testid="skeleton.stories">
        <CardContent>
          <Typography variant="h6" gutterBottom>Dashboard Widget</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton variant="text" sx={{ fontSize: '1.2rem' }} width="60%" />
              <Skeleton variant="circular" width={24} height={24} />
            </Box>
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} width="40%" />
            <Skeleton variant="rectangular" width="100%" height={80} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="text" width="30%" />
            </Box>
          </Stack>
        </CardContent>
      </Card>
      
      {/* Comment Card Skeleton */}
      <Card data-testid="skeleton.stories">
        <CardContent>
          <Typography variant="h6" gutterBottom>Comment Thread</Typography>
          <Stack spacing={2}>
            {[1, 2, 3].map((comment) => (
              <Box key={comment} sx={{ display: 'flex', gap: 2 }}>
                <Skeleton variant="circular" width={32} height={32} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="80%" />
                </Box>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  ),
};

// ===== TABLE SKELETON =====
export const TableSkeleton: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Table Skeleton Patterns
      </Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Simple Table</Typography>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', p: 2, bgcolor: 'grey.50' }}>
            {[1, 2, 3, 4].map((col) => (
              <Box key={col} sx={{ flex: 1, mr: col < 4 ? 2 : 0 }}>
                <Skeleton variant="text" width="80%" />
              </Box>
            ))}
          </Box>
          
          {/* Rows */}
          {[1, 2, 3, 4, 5].map((row) => (
            <Box key={row} sx={{ display: 'flex', p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              {[1, 2, 3, 4].map((col) => (
                <Box key={col} sx={{ flex: 1, mr: col < 4 ? 2 : 0 }}>
                  <Skeleton variant="text" width={`${Math.random() * 40 + 60}%`} />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Data Table with Actions</Typography>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
          {[1, 2, 3, 4].map((row) => (
            <Box key={row} sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              p: 2, 
              borderBottom: row < 4 ? '1px solid' : 'none',
              borderColor: 'divider'
            }}>
              <Skeleton variant="circular" width={32} height={32} sx={{ mr: 2 }} />
              <Box sx={{ flex: 1, mr: 2 }}>
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="50%" />
              </Box>
              <Skeleton variant="rectangular" width={60} height={24} sx={{ mr: 1 }} />
              <Skeleton variant="rectangular" width={60} height={24} />
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== LIST SKELETON =====
export const ListSkeleton: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Simple List</Typography>
        <Stack spacing={1}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton key={item} variant="text" width={`${Math.random() * 30 + 70}%`} />
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Contact List</Typography>
        <Stack spacing={2}>
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Skeleton variant="circular" width={48} height={48} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </Box>
              <Skeleton variant="rectangular" width={80} height={32} />
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Message List</Typography>
        <Stack spacing={2}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Box key={item} sx={{ display: 'flex', gap: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="20%" />
                </Box>
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="70%" />
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>File List</Typography>
        <Stack spacing={1}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
              <Skeleton variant="rectangular" width={24} height={24} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" />
              </Box>
              <Skeleton variant="text" width="15%" />
              <Skeleton variant="text" width="20%" />
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== INTERACTIVE SKELETON =====
export const InteractiveSkeleton: Story = {
  render: (args) => {
    const [showContent, setShowContent] = useState(false);
    const [loadingType, setLoadingType] = useState<'profile' | 'article' | 'gallery'>('profile');

    const toggleContent = (type: 'profile' | 'article' | 'gallery') => {
      setLoadingType(type);
      setShowContent(false);
      // Simulate loading
      setTimeout(() => setShowContent(true), 2000);
    };

    const renderSkeletonContent = () => {
      if (showContent) {
        switch (loadingType) {
          case 'profile':
            return (
              <Card data-testid="skeleton.stories">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar>JD</Avatar>
                    <Box>
                      <Typography variant="h6">John Doe</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Software Engineer
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    Passionate developer with 5+ years of experience building modern web applications.
                  </Typography>
                </CardContent>
              </Card>
            );
          case 'article':
            return (
              <Box>
                <Typography variant="h4" gutterBottom>
                  Understanding React Hooks
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  A comprehensive guide to modern React development
                </Typography>
                <Typography variant="body1" paragraph>
                  React Hooks have revolutionized how we write React components...
                </Typography>
                <Typography variant="body1">
                  In this article, we'll explore the most commonly used hooks and their applications.
                </Typography>
              </Box>
            );
          case 'gallery':
            return (
              <Grid container spacing={2}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Grid item xs={4} key={item}>
                    <Box
                      sx={{
                        aspectRatio: '1',
                        bgcolor: 'grey.200',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      Image {item}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            );
          default:
            return null;
        }
      }

      // Show skeleton based on type
      switch (loadingType) {
        case 'profile':
          return (
            <Card data-testid="skeleton.stories">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Skeleton variant="circular" width={56} height={56} />
                  <Box>
                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={120} />
                    <Skeleton variant="text" width={100} />
                  </Box>
                </Box>
                <Skeleton variant="text" lines={2} />
              </CardContent>
            </Card>
          );
        case 'article':
          return (
            <Box>
              <Skeleton variant="text" sx={{ fontSize: '2rem' }} width="60%" />
              <Skeleton variant="text" sx={{ fontSize: '1.2rem' }} width="80%" />
              <Box sx={{ mt: 2 }}>
                <Skeleton variant="text" lines={4} />
              </Box>
            </Box>
          );
        case 'gallery':
          return (
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={4} key={item}>
                  <Skeleton variant="rectangular" sx={{ aspectRatio: '1' }} />
                </Grid>
              ))}
            </Grid>
          );
        default:
          return null;
      }
    };

    return (
      <Stack spacing={3}>
        <Typography variant="h6" gutterBottom>
          Interactive Skeleton Demo
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <Button 
            onClick={() => toggleContent('profile')}
            variant={loadingType === 'profile' ? 'contained' : 'outlined'}
            size="small"
          >
            Load Profile
          </Button>
          <Button 
            onClick={() => toggleContent('article')}
            variant={loadingType === 'article' ? 'contained' : 'outlined'}
            size="small"
          >
            Load Article
          </Button>
          <Button 
            onClick={() => toggleContent('gallery')}
            variant={loadingType === 'gallery' ? 'contained' : 'outlined'}
            size="small"
          >
            Load Gallery
          </Button>
        </Stack>
        
        <Box sx={{ minHeight: 200 }}>
          {renderSkeletonContent()}
        </Box>
      </Stack>
    );
  },
};

// ===== RESPONSIVE SKELETON =====
export const ResponsiveSkeleton: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h6" gutterBottom>
        Responsive Skeleton Layouts
      </Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Mobile-First Card</Typography>
        <Card data-testid="skeleton.stories" sx={{ maxWidth: 400 }}>
          <CardContent>
            <Stack spacing={2}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', sm: 'flex-start' },
                gap: 2 
              }}>
                <Skeleton variant="circular" width={64} height={64} />
                <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                  <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="80%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Box>
              <Skeleton variant="rectangular" height={120} />
              <Stack spacing={1}>
                <Skeleton variant="text" />
                <Skeleton variant="text" width="70%" />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Responsive Grid</Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Stack spacing={1}>
                <Skeleton variant="rectangular" height={100} />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  ),
};

// ===== ACCESSIBILITY FEATURES =====
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h6" gutterBottom>
        Accessibility Features
      </Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Screen Reader Support
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Skeleton components include proper ARIA attributes for screen readers.
        </Typography>
        <Skeleton 
          variant="text" 
          lines={3}
          aria-label="Loading article content"
          role="status"
        />
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Reduced Motion Support
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Animations respect user's motion preferences for accessibility.
        </Typography>
        <Stack spacing={1}>
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="pulse" />
          <Skeleton variant="text" animation={false} />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          High Contrast Compatibility
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Skeleton components maintain visibility in high contrast mode.
        </Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Stack spacing={1}>
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="rectangular" height={60} />
          </Stack>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== MISSING MANDATORY CATEGORIES =====

// ===== THEMES =====
export const Themes: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Skeleton in Different Themes</Typography>
      
      <Card data-testid="skeleton.stories" sx={{ maxWidth: 400, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>Light Theme Skeleton</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Skeleton components optimized for light backgrounds with proper contrast.
          </Typography>
          <Stack spacing={1}>
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" width="80%" />
            <Skeleton variant="rectangular" height={60} animation="wave" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Skeleton variant="circular" width={40} height={40} animation="wave" />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" animation="wave" />
                <Skeleton variant="text" width="40%" animation="wave" />
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      
      <Card data-testid="skeleton.stories" 
        sx={{ 
          maxWidth: 400,
          bgcolor: 'background.paper',
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>Dark Theme Skeleton</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Skeleton components adapted for dark backgrounds with enhanced visibility.
          </Typography>
          <Stack spacing={1}>
            <Skeleton 
              variant="text" 
              animation="wave"
              sx={{ 
                bgcolor: 'action.hover',
                '&::after': {
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                }
              }}
            />
            <Skeleton 
              variant="text" 
              width="80%" 
              animation="wave"
              sx={{ 
                bgcolor: 'action.hover',
                '&::after': {
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                }
              }}
            />
            <Skeleton 
              variant="rectangular" 
              height={60} 
              animation="wave"
              sx={{ 
                bgcolor: 'action.hover',
                '&::after': {
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Skeleton 
                variant="circular" 
                width={40} 
                height={40} 
                animation="wave"
                sx={{ 
                  bgcolor: 'action.hover',
                  '&::after': {
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                  }
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton 
                  variant="text" 
                  width="60%" 
                  animation="wave"
                  sx={{ 
                    bgcolor: 'action.hover',
                    '&::after': {
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                    }
                  }}
                />
                <Skeleton 
                  variant="text" 
                  width="40%" 
                  animation="wave"
                  sx={{ 
                    bgcolor: 'action.hover',
                    '&::after': {
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                    }
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      
      <Card data-testid="skeleton.stories" sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>Theme-Aware Animation</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Skeleton animations that adapt to theme colors and maintain accessibility.
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary">Pulse Animation</Typography>
              <Skeleton 
                variant="rectangular" 
                height={40} 
                animation="pulse"
                sx={{
                  bgcolor: 'action.hover',
                  '@keyframes pulse': {
                    '0%': {
                      opacity: 1,
                    },
                    '50%': {
                      opacity: 0.4,
                    },
                    '100%': {
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Wave Animation</Typography>
              <Skeleton 
                variant="rectangular" 
                height={40} 
                animation="wave"
                sx={{
                  bgcolor: 'action.hover',
                  '&::after': {
                    background: `linear-gradient(90deg, transparent, ${
                      'rgba(255,255,255,0.1)'
                    }, transparent)`,
                  }
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates Skeleton components in both light and dark themes with proper contrast and theme-aware animations.',
      },
    },
  },
};

// ===== VARIANTS =====
export const Variants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Skeleton Variants</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Text Variant</Typography>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Circular Variant</Typography>
        <Stack direction="row" spacing={1}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={56} height={56} />
          <Skeleton variant="circular" width={72} height={72} />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Rectangular Variant</Typography>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width="70%" height={40} />
          <Skeleton variant="rectangular" width="50%" height={80} />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Rounded Variant</Typography>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width="100%" height={60} />
          <Skeleton variant="rounded" width="80%" height={40} />
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== STATES =====
export const States: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Skeleton States</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Normal State</Typography>
        <Skeleton variant="rectangular" width="100%" height={60} animation="pulse" />
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Wave Animation</Typography>
        <Skeleton variant="rectangular" width="100%" height={60} animation="wave" />
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>No Animation</Typography>
        <Skeleton variant="rectangular" width="100%" height={60} animation={false} />
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Custom Speed</Typography>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={60} 
          sx={{
            animationDuration: '0.5s'
          }}
        />
      </Box>
    </Stack>
  ),
};

// ===== BOOLEAN PROPS =====
export const BooleanProps: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Boolean Properties</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>animation Property</Typography>
        <Skeleton variant="text" animation={true} sx={{ mb: 1 }} />
        <Typography variant="caption">animation: true - Shows pulsing animation</Typography>
        
        <Skeleton variant="text" animation={false} sx={{ mb: 1, mt: 2 }} />
        <Typography variant="caption">animation: false - Static skeleton without animation</Typography>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Different Animation Types</Typography>
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="rectangular" height={40} animation="pulse" />
          <Typography variant="caption">animation: "pulse" - Pulse animation effect</Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="rectangular" height={40} animation="wave" />
          <Typography variant="caption">animation: "wave" - Wave animation effect</Typography>
        </Box>
        
        <Box>
          <Skeleton variant="rectangular" height={40} animation={false} />
          <Typography variant="caption">animation: false - No animation</Typography>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== SIZES =====
export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Skeleton Sizes</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Small Skeleton</Typography>
        <Stack spacing={0.5}>
          <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} width="60%" />
          <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} width="40%" />
          <Skeleton variant="rectangular" height={30} width="50%" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Medium Skeleton (Default)</Typography>
        <Stack spacing={1}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="rectangular" height={60} width="70%" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Large Skeleton</Typography>
        <Stack spacing={1.5}>
          <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="60%" />
          <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="40%" />
          <Skeleton variant="rectangular" height={120} width="80%" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Custom Dimensions</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={60} height={60} />
          <Skeleton variant="circular" width={80} height={80} />
        </Stack>
      </Box>
    </Stack>
  ),
};