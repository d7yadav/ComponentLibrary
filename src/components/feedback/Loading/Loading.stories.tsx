import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, {  useState  } from 'react';

import { Button } from '@/components/core/Button';
import { Card, CardContent } from '@/components/data-display/Card';
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

import { Loading } from './Loading';

/**
 * Loading provides various loading indicators and skeleton placeholders for different use cases.
 * It supports multiple spinner types, overlay modes, and customizable messaging.
 * 
 * ## Features
 * - 9 different spinner types (circular, dots, bars, pulse, bounce, ring, wave, ripple, skeleton)
 * - Multiple variants (inline, overlay, page, fullscreen)
 * - Customizable size, color, and animation speed
 * - Backdrop and overlay support
 * - Auto-timeout functionality
 * - Accessibility compliance
 * - Performance optimization
 */
const meta: Meta<typeof Loading> = {
  title: 'Feedback/Loading',
  component: Loading,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Loading component for displaying various loading states and spinner animations.',
      },
    },

  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['circular', 'dots', 'bars', 'pulse', 'bounce', 'ring', 'wave', 'ripple', 'skeleton'],
      description: 'The type of loading animation to display',
    },
    variant: {
      control: 'select',
      options: ['inline', 'overlay', 'page', 'fullscreen'],
      description: 'The display variant of the loading component',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the loading indicator',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'The color theme of the loading indicator',
    },
    message: {
      control: 'text',
      description: 'Optional message to display with the loading indicator',
    },
    backdrop: {
      control: 'boolean',
      description: 'Whether to show a backdrop behind the loading indicator',
    },
    backdropOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Opacity of the backdrop (0-1)',
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the loading indicator',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the loading indicator takes full width',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Whether the loading indicator takes full height',
    },
    timeout: {
      control: 'number',
      description: 'Auto-timeout duration in milliseconds',
    },
    onTimeout: { action: 'timeout' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    type: 'circular',
    size: 'medium',
    message: 'Loading...',
  
    onClick: fn(),
  },
};

// ===== SPINNER TYPES =====
export const SpinnerTypes: Story = {
  render: (args) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        All Available Spinner Types
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: 3,
        mt: 2
      }}>
        {[
          'circular',
          'dots', 
          'bars',
          'pulse',
          'bounce',
          'ring',
          'wave',
          'ripple',
          'skeleton'
        ].map((type) => (
          <Box key={type} sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Loading type={type as any} size="medium" />
            <Typography variant="caption" display="block" sx={{ mt: 1, textTransform: 'capitalize' }}>
              {type}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  ),
};

// ===== SIZE VARIANTS =====
export const SizeVariants: Story = {
  render: (args) => (
    <Stack data-testid="loading.stories" spacing={3}>
      <Box>
        <Typography variant="h6" gutterBottom>Small Size</Typography>
        <Stack data-testid="loading.stories" direction="row" spacing={3} alignItems="center">
          <Loading type="circular" size="small" />
          <Loading type="dots" size="small" />
          <Loading type="bars" size="small" />
          <Loading type="pulse" size="small" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Medium Size</Typography>
        <Stack data-testid="loading.stories" direction="row" spacing={3} alignItems="center">
          <Loading type="circular" size="medium" />
          <Loading type="dots" size="medium" />
          <Loading type="bars" size="medium" />
          <Loading type="pulse" size="medium" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Large Size</Typography>
        <Stack data-testid="loading.stories" direction="row" spacing={3} alignItems="center">
          <Loading type="circular" size="large" />
          <Loading type="dots" size="large" />
          <Loading type="bars" size="large" />
          <Loading type="pulse" size="large" />
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== COLOR VARIANTS =====
export const ColorVariants: Story = {
  render: (args) => (
    <Stack data-testid="loading.stories" spacing={2}>
      <Typography variant="h6" gutterBottom>
        Different Color Themes
      </Typography>
      <Stack data-testid="loading.stories" direction="row" spacing={3} alignItems="center" flexWrap="wrap" gap={2}>
        <Box sx={{ textAlign: 'center' }}>
          <Loading type="circular" color="primary" size="medium" />
          <Typography variant="caption" display="block">Primary</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Loading type="circular" color="secondary" size="medium" />
          <Typography variant="caption" display="block">Secondary</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Loading type="circular" color="success" size="medium" />
          <Typography variant="caption" display="block">Success</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Loading type="circular" color="warning" size="medium" />
          <Typography variant="caption" display="block">Warning</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Loading type="circular" color="error" size="medium" />
          <Typography variant="caption" display="block">Error</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Loading type="circular" color="info" size="medium" />
          <Typography variant="caption" display="block">Info</Typography>
        </Box>
      </Stack>
    </Stack>
  ),
};

// ===== VARIANT TYPES =====
export const VariantTypes: Story = {
  render: (args) => (
    <Stack data-testid="loading.stories" spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Inline Variant</Typography>
        <Box sx={{ p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: 1 }}>
          <Typography variant="body2" gutterBottom>
            This is inline loading: <Loading type="dots" variant="inline" size="small" /> Please wait...
          </Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Centered Variant</Typography>
        <Box sx={{ height: 150, border: '1px dashed', borderColor: 'divider', borderRadius: 1, position: 'relative' }}>
          <Loading 
            type="circular" 
            size="medium" 
            message="Loading content..." 
            centered
          />
        </Box>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Full Width Variant</Typography>
        <Box sx={{ border: '1px dashed', borderColor: 'divider', borderRadius: 1, p: 2 }}>
          <Loading 
            type="bars" 
            size="medium" 
            message="Processing data..." 
            fullWidth
          />
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== WITH MESSAGES =====
export const WithMessages: Story = {
  render: (args) => (
    <Stack data-testid="loading.stories" spacing={3}>
      <Loading 
        type="circular" 
        size="medium" 
        message="Loading user data..." 
        centered
      />
      
      <Loading 
        type="dots" 
        size="large" 
        message="Processing your request. This may take a few moments." 
        centered
      />
      
      <Loading 
        type="pulse" 
        size="medium" 
        message="Synchronizing files..." 
        color="info"
        centered
      />
      
      <Loading 
        type="wave" 
        size="large" 
        message="Uploading images (3 of 10)" 
        color="success"
        centered
      />
    </Stack>
  ),
};

// ===== OVERLAY EXAMPLES =====
export const OverlayExamples: Story = {
  render: (args) => {
    const [overlayStates, setOverlayStates] = useState({
      card1: false,
      card2: false,
      card3: false,
    });

    const toggleOverlay = (key: keyof typeof overlayStates) => {
      setOverlayStates(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <Stack data-testid="loading.stories" spacing={3}>
        <Typography variant="h6" gutterBottom>
          Overlay Loading Examples
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
          <Card>
            <Box sx={{ position: 'relative' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Content Card 1</Typography>
                <Typography variant="body2">
                  This card demonstrates overlay loading with backdrop.
                </Typography>
                <Button 
                  sx={{ mt: 2 }} 
                  onClick={() => toggleOverlay('card1')}
                  variant="outlined"
                  size="small"
                >
                  Toggle Loading
                </Button>
              </CardContent>
              
              {overlayStates.card1 && (
                <Loading 
                  type="circular"
                  variant="overlay"
                  message="Loading data..."
                  backdrop
                  backdropOpacity={0.7}
                  onTimeout={() => toggleOverlay('card1')}
                  timeout={3000}
                />
              )}
            </Box>
          </Card>
          
          <Card>
            <Box sx={{ position: 'relative' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Content Card 2</Typography>
                <Typography variant="body2">
                  This card shows overlay loading without backdrop.
                </Typography>
                <Button 
                  sx={{ mt: 2 }} 
                  onClick={() => toggleOverlay('card2')}
                  variant="outlined"
                  size="small"
                >
                  Toggle Loading
                </Button>
              </CardContent>
              
              {overlayStates.card2 && (
                <Loading 
                  type="ripple"
                  variant="overlay"
                  message="Syncing..."
                  color="secondary"
                  centered
                  onTimeout={() => toggleOverlay('card2')}
                  timeout={3000}
                />
              )}
            </Box>
          </Card>
          
          <Card>
            <Box sx={{ position: 'relative' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Content Card 3</Typography>
                <Typography variant="body2">
                  This card demonstrates skeleton loading overlay.
                </Typography>
                <Button 
                  sx={{ mt: 2 }} 
                  onClick={() => toggleOverlay('card3')}
                  variant="outlined"
                  size="small"
                >
                  Toggle Loading
                </Button>
              </CardContent>
              
              {overlayStates.card3 && (
                <Loading 
                  type="skeleton"
                  variant="overlay"
                  fullWidth
                  fullHeight
                  onTimeout={() => toggleOverlay('card3')}
                  timeout={3000}
                />
              )}
            </Box>
          </Card>
        </Box>
      </Stack>
    );
  },
};

// ===== PAGE LOADING =====
export const PageLoading: Story = {
  render: (args) => {
    const [showPageLoading, setShowPageLoading] = useState(false);

    const triggerPageLoading = () => {
      setShowPageLoading(true);
    };

    return (
      <Stack data-testid="loading.stories" spacing={2}>
        <Typography variant="h6" gutterBottom>
          Page-Level Loading
        </Typography>
        
        <Button 
          onClick={triggerPageLoading}
          variant="contained"
          disabled={showPageLoading}
        >
          Trigger Page Loading (5s)
        </Button>
        
        <Typography variant="body2" color="text.secondary">
          Click the button to see a page-level loading overlay that covers the entire viewport.
        </Typography>
        
        {showPageLoading && (
          <Loading 
            type="circular"
            variant="page"
            size="large"
            message="Loading page content..."
            backdrop
            backdropOpacity={0.8}
            onTimeout={() => setShowPageLoading(false)}
            timeout={5000}
          />
        )}
      </Stack>
    );
  },
};

// ===== CUSTOM ANIMATIONS =====
export const CustomAnimations: Story = {
  render: (args) => (
    <Stack data-testid="loading.stories" spacing={3}>
      <Typography variant="h6" gutterBottom>
        Different Animation Styles
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3 }}>
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Loading type="bounce" size="medium" color="primary" />
          <Typography variant="body2" sx={{ mt: 1 }}>Bounce Animation</Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Loading type="pulse" size="medium" color="secondary" />
          <Typography variant="body2" sx={{ mt: 1 }}>Pulse Animation</Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Loading type="wave" size="medium" color="success" />
          <Typography variant="body2" sx={{ mt: 1 }}>Wave Animation</Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Loading type="ripple" size="medium" color="warning" />
          <Typography variant="body2" sx={{ mt: 1 }}>Ripple Animation</Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Loading type="ring" size="medium" color="error" />
          <Typography variant="body2" sx={{ mt: 1 }}>Ring Animation</Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Loading type="bars" size="medium" color="info" />
          <Typography variant="body2" sx={{ mt: 1 }}>Bars Animation</Typography>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== REAL-WORLD SCENARIOS =====
export const RealWorldScenarios: Story = {
  render: (args) => {
    const [scenarios, setScenarios] = useState({
      login: false,
      upload: false,
      search: false,
      save: false,
    });

    const toggleScenario = (key: keyof typeof scenarios) => {
      setScenarios(prev => ({ ...prev, [key]: !prev[key] }));
      // Auto-reset after 3 seconds
      setTimeout(() => {
        setScenarios(prev => ({ ...prev, [key]: false }));
      }, 3000);
    };

    return (
      <Stack data-testid="loading.stories" spacing={3}>
        <Typography variant="h6" gutterBottom>
          Real-World Loading Scenarios
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
          {/* Login Loading */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>User Login</Typography>
              <Typography variant="body2" paragraph>
                Authenticating user credentials...
              </Typography>
              <Button 
                onClick={() => toggleScenario('login')}
                disabled={scenarios.login}
                variant="contained"
                fullWidth
              >
                {scenarios.login ? (
                  <Loading type="dots" variant="inline" size="small" color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </CardContent>
          </Card>
          
          {/* File Upload */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>File Upload</Typography>
              <Typography variant="body2" paragraph>
                Uploading documents to server...
              </Typography>
              <Button 
                onClick={() => toggleScenario('upload')}
                disabled={scenarios.upload}
                variant="outlined"
                fullWidth
              >
                {scenarios.upload ? (
                  <>
                    <Loading type="bars" variant="inline" size="small" color="inherit" />
                    <span style={{ marginLeft: '8px' }}>Uploading...</span>
                  </>
                ) : (
                  'Upload Files'
                )}
              </Button>
            </CardContent>
          </Card>
          
          {/* Search Results */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Search Results</Typography>
              <Typography variant="body2" paragraph>
                Finding relevant content...
              </Typography>
              <Button 
                onClick={() => toggleScenario('search')}
                disabled={scenarios.search}
                variant="text"
                fullWidth
              >
                {scenarios.search ? (
                  <>
                    <Loading type="pulse" variant="inline" size="small" color="inherit" />
                    <span style={{ marginLeft: '8px' }}>Searching...</span>
                  </>
                ) : (
                  'Search'
                )}
              </Button>
            </CardContent>
          </Card>
          
          {/* Save Operation */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Save Changes</Typography>
              <Typography variant="body2" paragraph>
                Saving your work to the cloud...
              </Typography>
              <Button 
                onClick={() => toggleScenario('save')}
                disabled={scenarios.save}
                variant="contained"
                color="success"
                fullWidth
              >
                {scenarios.save ? (
                  <>
                    <Loading type="circular" variant="inline" size="small" color="inherit" />
                    <span style={{ marginLeft: '8px' }}>Saving...</span>
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    );
  },
};

// ===== ACCESSIBILITY FEATURES =====
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Stack data-testid="loading.stories" spacing={3}>
      <Typography variant="h6" gutterBottom>
        Accessibility Features
      </Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Screen Reader Announcements
        </Typography>
        <Loading 
          type="circular" 
          size="medium" 
          message="Loading user profile data. Please wait."
          aria-label="Loading user profile data"
          role="status"
          centered
        />
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Reduced Motion Support
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Loading animations respect user's motion preferences for accessibility.
        </Typography>
        <Loading 
          type="pulse" 
          size="medium" 
          message="Content loading with reduced motion support"
          centered
        />
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          High Contrast Compatible
        </Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Loading 
            type="bars" 
            size="medium" 
            message="Loading optimized for high contrast mode"
            color="primary"
            centered
          />
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Keyboard Navigation Support
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Loading states maintain proper focus management during async operations.
        </Typography>
        <Button 
          variant="outlined"
          sx={{
            '&:focus-visible': {
              outline: '2px solid #1976d2',
              outlineOffset: '2px'
            }
          }}
        >
          Focusable Element During Loading
        </Button>
      </Box>
    </Stack>
  ),
};

// ===== PERFORMANCE OPTIMIZATION =====
export const PerformanceOptimization: Story = {
  render: (args) => (
    <Stack data-testid="loading.stories" spacing={3}>
      <Typography variant="h6" gutterBottom>
        Performance Optimized Loading
      </Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Skeleton Loading (Fastest)
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Skeleton loading provides immediate visual feedback with minimal rendering overhead.
        </Typography>
        <Box sx={{ maxWidth: 400 }}>
          <Loading type="skeleton" fullWidth />
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Lazy Loaded Spinners
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Complex animations are loaded only when needed to maintain performance.
        </Typography>
        <Stack data-testid="loading.stories" direction="row" spacing={2}>
          <Loading type="circular" size="small" />
          <Loading type="dots" size="small" />
          <Loading type="pulse" size="small" />
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Memory Efficient
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Loading components are optimized to prevent memory leaks during long operations.
        </Typography>
        <Loading 
          type="wave" 
          size="medium" 
          message="Long running operation with memory optimization"
          centered
        />
      </Box>
    </Stack>
  ),
};

// ===== MISSING MANDATORY CATEGORIES =====

// ===== VARIANTS =====
export const Variants: Story = {
  render: (args) => (
    <Stack data-testid="loading.stories" spacing={3}>
      <Typography variant="h6" gutterBottom>Loading Variants</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Inline Variant</Typography>
        <Typography variant="body1">
          Loading inline with text: <Loading type="dots" variant="inline" size="small" /> Please wait...
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Overlay Variant</Typography>
        <Box sx={{ position: 'relative', height: 120, border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
          <Typography variant="body2">Content behind overlay loading</Typography>
          <Loading 
            type="circular" 
            variant="overlay" 
            message="Loading..." 
            backdrop 
            backdropOpacity={0.5}
          />
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Page Variant</Typography>
        <Typography variant="body2" color="text.secondary">
          Page variant covers the entire viewport (demo shows contained version)
        </Typography>
        <Box sx={{ position: 'relative', height: 100, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <Loading 
            type="ring" 
            variant="page" 
            size="large" 
            message="Loading page content..." 
            backdrop
          />
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Fullscreen Variant</Typography>
        <Typography variant="body2" color="text.secondary">
          Fullscreen variant covers the entire browser window (demo shows contained version)
        </Typography>
        <Box sx={{ position: 'relative', height: 120, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <Loading 
            type="pulse" 
            variant="fullscreen" 
            size="large" 
            message="Processing..." 
            backdrop 
            backdropOpacity={0.8}
          />
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== STATES =====
export const States: Story = {
  render: (args) => (
    <Stack data-testid="loading.stories" spacing={3}>
      <Typography variant="h6" gutterBottom>Loading States</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Normal State</Typography>
        <Loading type="circular" size="medium" message="Normal loading state" centered />
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Loading with Message</Typography>
        <Loading 
          type="dots" 
          size="medium" 
          message="Loading user data, please wait..." 
          color="primary" 
          centered 
        />
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Loading with Timeout</Typography>
        <Loading 
          type="bars" 
          size="medium" 
          message="This loading will timeout in 5 seconds" 
          color="warning" 
          timeout={5000}
          centered 
        />
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Error State</Typography>
        <Loading 
          type="pulse" 
          size="medium" 
          message="Loading failed, retrying..." 
          color="error" 
          centered 
        />
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Success State</Typography>
        <Loading 
          type="wave" 
          size="medium" 
          message="Loading completed successfully" 
          color="success" 
          centered 
        />
      </Box>
    </Stack>
  ),
};

// ===== BOOLEAN PROPS =====
export const BooleanProps: Story = {
  render: (args) => (
    <Stack data-testid="loading.stories" spacing={3}>
      <Typography variant="h6" gutterBottom>Boolean Properties</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>backdrop Property</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box sx={{ position: 'relative', height: 100, border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
            <Typography variant="caption">backdrop: false</Typography>
            <Loading type="circular" variant="overlay" backdrop={false} />
          </Box>
          <Box sx={{ position: 'relative', height: 100, border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
            <Typography variant="caption">backdrop: true</Typography>
            <Loading type="circular" variant="overlay" backdrop={true} backdropOpacity={0.6} />
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>centered Property</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box sx={{ height: 80, border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>centered: false</Typography>
            <Loading type="dots" size="small" centered={false} />
          </Box>
          <Box sx={{ height: 80, border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>centered: true</Typography>
            <Loading type="dots" size="small" centered={true} />
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>fullWidth Property</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>fullWidth: false</Typography>
            <Loading type="bars" size="small" fullWidth={false} />
          </Box>
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>fullWidth: true</Typography>
            <Loading type="bars" size="small" fullWidth={true} />
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>fullHeight Property</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, height: 120 }}>
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>fullHeight: false</Typography>
            <Loading type="pulse" size="small" fullHeight={false} />
          </Box>
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
            <Typography variant="caption" display="block" gutterBottom>fullHeight: true</Typography>
            <Loading type="pulse" size="small" fullHeight={true} />
          </Box>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== SIZES =====
export const Sizes: Story = {
  render: (args) => (
    <Stack data-testid="loading.stories" spacing={3}>
      <Typography variant="h6" gutterBottom>Loading Sizes</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Small Size</Typography>
        <Stack data-testid="loading.stories" direction="row" spacing={3} alignItems="center">
          <Loading type="circular" size="small" />
          <Loading type="dots" size="small" />
          <Loading type="bars" size="small" />
          <Loading type="pulse" size="small" />
        </Stack>
        <Typography variant="caption" color="text.secondary">Perfect for inline loading within text or small UI elements</Typography>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Medium Size (Default)</Typography>
        <Stack data-testid="loading.stories" direction="row" spacing={3} alignItems="center">
          <Loading type="circular" size="medium" />
          <Loading type="dots" size="medium" />
          <Loading type="bars" size="medium" />
          <Loading type="pulse" size="medium" />
        </Stack>
        <Typography variant="caption" color="text.secondary">Standard size for most loading scenarios and general UI feedback</Typography>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Large Size</Typography>
        <Stack data-testid="loading.stories" direction="row" spacing={3} alignItems="center">
          <Loading type="circular" size="large" />
          <Loading type="dots" size="large" />
          <Loading type="bars" size="large" />
          <Loading type="pulse" size="large" />
        </Stack>
        <Typography variant="caption" color="text.secondary">Prominent loading for important operations or page-level loading states</Typography>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Size Comparison with Messages</Typography>
        <Stack data-testid="loading.stories" spacing={2}>
          <Loading type="wave" size="small" message="Small loading with message" centered />
          <Loading type="wave" size="medium" message="Medium loading with message" centered />
          <Loading type="wave" size="large" message="Large loading with message" centered />
        </Stack>
      </Box>
    </Stack>
  ),
};