import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Button } from '@/components/core/Button';
import { Chip } from '@/components/core/Chip'; // Replaced MUI Chip with internal wrapper as per migration guidelines
import { Avatar } from '@/components/data-display/Avatar'; // Replaced MUI Avatar with internal wrapper as per migration guidelines
import { Typography } from '@/components/data-display/Typography';
import { LinearProgress } from '@/components/feedback/Progress/LinearProgress'; // Replaced MUI LinearProgress with internal wrapper as per migration guidelines
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

import { CardContent } from './CardContent';

import { Card, CardHeader, CardActions } from './index';
// TODO: Create Avatar, Chip, and LinearProgress wrapper components

/**
 * CardContent provides the main content area of a Card with proper spacing and typography.
 * It handles consistent padding, text flow, and responsive behavior for card content.
 * 
 * ## Features
 * - Consistent padding and spacing
 * - Responsive typography scaling
 * - Proper text flow and hierarchy
 * - Support for any content type
 * - Accessibility compliance
 * - Dark theme compatibility
 */
const meta: Meta<typeof CardContent> = {
  title: 'Data Display/Card/CardContent',
  component: CardContent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card content component for displaying the main content area of cards.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'The content to display within the card',
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
    children: (
      <>
        <Typography variant="h5" component="h2" gutterBottom>
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is the main content area of the card. It can contain any type of content
          including text, images, lists, and other components.
        </Typography>
      </>
    ),
  
    onFocus: fn(),
    onBlur: fn(),
  },
};

// ===== TYPOGRAPHY VARIANTS =====
export const TypographyContent: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Main Heading
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom color="text.secondary">
            Subheading
          </Typography>
          <Typography variant="body1" paragraph>
            This is the primary body text. It provides detailed information about the card's 
            content and maintains good readability with proper line height and spacing.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is secondary body text, often used for supplementary information or metadata.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="overline" display="block" gutterBottom>
            Category
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Article Title
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Published on March 15, 2024
          </Typography>
          <Typography variant="body1">
            Article excerpt that gives readers a preview of the content they'll find 
            if they choose to read the full article.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== CONTENT TYPES =====
export const ListContent: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Features
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Responsive design</li>
            <li>Dark theme support</li>
            <li>Accessibility compliant</li>
            <li>TypeScript support</li>
            <li>Customizable styling</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Specifications
          </Typography>
          <Box component="dl" sx={{ m: 0 }}>
            <Box component="dt" sx={{ fontWeight: 'bold', mt: 1 }}>Processor:</Box>
            <Box component="dd" sx={{ ml: 2, color: 'text.secondary' }}>Apple M3 Pro</Box>
            
            <Box component="dt" sx={{ fontWeight: 'bold', mt: 1 }}>Memory:</Box>
            <Box component="dd" sx={{ ml: 2, color: 'text.secondary' }}>16GB Unified Memory</Box>
            
            <Box component="dt" sx={{ fontWeight: 'bold', mt: 1 }}>Storage:</Box>
            <Box component="dd" sx={{ ml: 2, color: 'text.secondary' }}>512GB SSD</Box>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  ),
};

export const MediaContent: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Progress Tracking
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Course Completion: 75%
            </Typography>
            <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 4 }} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Quiz Score: 85%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={85} 
              color="success" 
              sx={{ height: 8, borderRadius: 4 }} 
            />
          </Box>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip label="React" size="small" color="primary" />
            <Chip label="TypeScript" size="small" color="secondary" />
            <Chip label="Material-UI" size="small" color="success" />
            <Chip label="Storybook" size="small" color="info" />
            <Chip label="Testing" size="small" color="warning" />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== LAYOUT VARIANTS =====
export const FlexLayouts: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {/* TODO: Replace with internal icon wrapper */}
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2" color="text.secondary">
                Software Engineer
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2">
            Experienced developer with 5+ years in React and TypeScript development.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
            <Box>
              <Typography variant="h6">Product Name</Typography>
              <Typography variant="body2" color="text.secondary">
                Premium Quality
              </Typography>
            </Box>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              $299
            </Typography>
          </Box>
          <Typography variant="body2">
            High-quality product with excellent features and outstanding customer reviews.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

export const GridLayouts: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'auto 1fr', 
            gap: 2, 
            alignItems: 'center' 
          }}>
            {/* TODO: Replace with internal icon wrapper */}
            <LocationOn color="action" />
            <Typography variant="body2">123 Main St, Anytown, ST 12345</Typography>
            
            {/* TODO: Replace with internal icon wrapper */}
            <Email color="action" />
            <Typography variant="body2">contact@example.com</Typography>
            
            {/* TODO: Replace with internal icon wrapper */}
            <Phone color="action" />
            <Typography variant="body2">+1 (555) 123-4567</Typography>
          </Box>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Statistics
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 3 
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">1.2K</Typography>
              <Typography variant="body2" color="text.secondary">Followers</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="secondary">456</Typography>
              <Typography variant="body2" color="text.secondary">Following</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">89</Typography>
              <Typography variant="body2" color="text.secondary">Posts</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">4.8</Typography>
              <Typography variant="body2" color="text.secondary">Rating</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== SPACING VARIANTS =====
export const SpacingOptions: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Default Spacing
          </Typography>
          <Typography variant="body2">
            This card uses the default CardContent spacing which provides consistent 
            padding around the content area.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent sx={{ p: 1 }}>
          <Typography variant="h6" gutterBottom>
            Compact Spacing
          </Typography>
          <Typography variant="body2">
            This card uses reduced padding for a more compact layout suitable 
            for dense information display.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Spacious Layout
          </Typography>
          <Typography variant="body2">
            This card uses increased padding for a more spacious and breathable 
            layout suitable for important content.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== INTERACTIVE CONTENT =====
export const InteractiveElements: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Form Content
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1 }}>
                Name
              </Typography>
              <input 
                type="text" 
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px' 
                }} 
              />
            </Box>
            <Box>
              <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1 }}>
                Message
              </Typography>
              <textarea 
                rows={3}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }} 
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Settings Panel
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">Enable notifications</Typography>
              <input type="checkbox" defaultChecked />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">Dark mode</Typography>
              <input type="checkbox" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">Auto-save</Typography>
              <input type="checkbox" defaultChecked />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== RESPONSIVE CONTENT =====
export const ResponsiveContent: Story = {
  render: (args) => (
    <Card sx={{ maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Responsive Card Content
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 2,
          mb: 2
        }}>
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>Column 1</Typography>
            <Typography variant="body2">Content that adapts to screen size</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>Column 2</Typography>
            <Typography variant="body2">On mobile: stacks vertically</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>Column 3</Typography>
            <Typography variant="body2">On tablet/desktop: side by side</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Resize the viewport to see how the content adapts to different screen sizes.
        </Typography>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content that automatically adapts to different screen sizes using responsive grid layout.',
      },
    },
  },
};

// ===== ACCESSIBILITY FEATURES =====
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography 
            variant="h6" 
            component="h2"
            id="accessible-heading"
            gutterBottom
          >
            Accessible Content
          </Typography>
          <Typography 
            variant="body2" 
            aria-describedby="accessible-heading"
            paragraph
          >
            This content is properly structured with semantic HTML and ARIA attributes 
            for screen reader compatibility.
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            role="note"
            aria-label="Additional information"
          >
            Important: This is supplementary information that screen readers will identify.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Focus Management
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <button 
              style={{ 
                padding: '8px 16px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.target.style.outline = '2px solid #1976d2'}
              onBlur={(e) => e.target.style.outline = 'none'}
            >
              Focusable Element 1
            </button>
            <button 
              style={{ 
                padding: '8px 16px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.target.style.outline = '2px solid #1976d2'}
              onBlur={(e) => e.target.style.outline = 'none'}
            >
              Focusable Element 2
            </button>
          </Box>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Use Tab to navigate between focusable elements
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== REAL-WORLD EXAMPLES =====
export const RealWorldExamples: Story = {
  render: (args) => (
    <Stack spacing={3} direction={{ xs: 'column', lg: 'row' }}>
      <Card sx={{ maxWidth: 350 }}>
        <CardHeader
          title="News Article"
          subheader="March 15, 2024"
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Breaking: New Technology Announcement
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            A major tech company announced their latest innovation today, promising to 
            revolutionize the way we interact with digital devices. The announcement 
            came during their annual developer conference.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="Technology" size="small" />
            <Chip label="Innovation" size="small" />
            <Chip label="Breaking News" size="small" color="error" />
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small">Read More</Button>
          <Button size="small">Share</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 350 }}>
        <CardHeader
          title="User Profile"
          subheader="Software Engineer"
        />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
              JD
            </Avatar>
            <Box>
              <Typography variant="h6">Jane Doe</Typography>
              <Typography variant="body2" color="text.secondary">
                Senior Frontend Developer
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" paragraph>
            Passionate about creating exceptional user experiences with modern web technologies. 
            Specializes in React, TypeScript, and design systems.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="primary">127</Typography>
              <Typography variant="caption">Projects</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="secondary">2.3K</Typography>
              <Typography variant="caption">Commits</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="success.main">98%</Typography>
              <Typography variant="caption">Uptime</Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary">Connect</Button>
          <Button size="small">View Profile</Button>
        </CardActions>
      </Card>
    </Stack>
  ),
};

// ===== MISSING MANDATORY CATEGORIES =====

// ===== VARIANTS =====
export const Variants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Standard Content Layout
          </Typography>
          <Typography variant="body2">
            Default CardContent with standard spacing and typography hierarchy.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Centered Content Layout
          </Typography>
          <Typography variant="body2">
            CardContent with center-aligned text for announcements or notices.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent sx={{ textAlign: 'right' }}>
          <Typography variant="h6" gutterBottom>
            Right-Aligned Content
          </Typography>
          <Typography variant="body2">
            CardContent with right-aligned text for special layouts.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== STATES =====
export const States: Story = {
  render: (args) => (
    <Stack spacing={3}>
      {/* Normal State */}
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Normal State
          </Typography>
          <Typography variant="body2" color="text.primary">
            CardContent in its normal, fully interactive state with standard styling and proper text hierarchy.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            All content is clearly readable with appropriate contrast ratios.
          </Typography>
        </CardContent>
      </Card>
      
      {/* Hover State */}
      <Card 
        sx={{ 
          maxWidth: 400,
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: (theme) => theme.shadows[8],
            transform: 'translateY(-2px)',
            '& .MuiCardContent-root': {
              backgroundColor: 'action.hover',
            }
          }
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            Hover State
          </Typography>
          <Typography variant="body2">
            Hover over this card to see the interactive hover effects including elevation and background color changes.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            The content adapts with subtle background highlighting.
          </Typography>
        </CardContent>
      </Card>
      
      {/* Focus State */}
      <Card 
        tabIndex={0}
        sx={{ 
          maxWidth: 400,
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: '2px',
            boxShadow: (theme) => theme.shadows[4],
            '& .MuiCardContent-root': {
              backgroundColor: 'action.focus',
            }
          }
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Focus State
          </Typography>
          <Typography variant="body2">
            Tab to this card to see the keyboard focus outline and background changes for accessibility.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Focus ring provides clear visual indication for keyboard navigation.
          </Typography>
        </CardContent>
      </Card>
      
      {/* Active State */}
      <Card 
        sx={{ 
          maxWidth: 400,
          cursor: 'pointer',
          transition: 'all 0.1s ease-in-out',
          '&:active': {
            transform: 'translateY(1px) scale(0.99)',
            boxShadow: (theme) => theme.shadows[2],
            '& .MuiCardContent-root': {
              backgroundColor: 'action.selected',
            }
          }
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Active State
          </Typography>
          <Typography variant="body2">
            Click and hold this card to see the active press state with slight scale and elevation changes.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Provides tactile feedback during interaction.
          </Typography>
        </CardContent>
      </Card>
      
      {/* Disabled State */}
      <Card 
        sx={{ 
          maxWidth: 400,
          opacity: 0.6,
          cursor: 'not-allowed',
          filter: 'grayscale(0.3)',
        }}
      >
        <CardContent sx={{ pointerEvents: 'none' }}>
          <Typography variant="h6" gutterBottom color="text.disabled">
            Disabled State
          </Typography>
          <Typography variant="body2" color="text.disabled">
            CardContent with disabled styling including reduced opacity, grayscale filter, and disabled text colors.
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
            All interactions are prevented in this state.
          </Typography>
        </CardContent>
      </Card>
      
      {/* Loading State */}
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Loading State
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                border: '2px solid',
                borderColor: 'action.disabled',
                borderTopColor: 'primary.main',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Loading content...
            </Typography>
          </Box>
          {/* Skeleton content */}
          <Box sx={{ mb: 1 }}>
            <Box 
              sx={{ 
                height: 16, 
                bgcolor: 'action.hover', 
                borderRadius: 1,
                animation: 'pulse 1.5s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.4 },
                  '100%': { opacity: 1 },
                },
              }} 
            />
          </Box>
          <Box sx={{ mb: 1 }}>
            <Box 
              sx={{ 
                height: 16, 
                width: '75%',
                bgcolor: 'action.hover', 
                borderRadius: 1,
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: '0.2s',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.4 },
                  '100%': { opacity: 1 },
                },
              }} 
            />
          </Box>
          <Box>
            <Box 
              sx={{ 
                height: 16, 
                width: '50%',
                bgcolor: 'action.hover', 
                borderRadius: 1,
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: '0.4s',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.4 },
                  '100%': { opacity: 1 },
                },
              }} 
            />
          </Box>
        </CardContent>
      </Card>
      
      {/* Error State */}
      <Card 
        sx={{ 
          maxWidth: 400,
          borderLeft: '4px solid',
          borderLeftColor: 'error.main',
          backgroundColor: 'error.light',
          color: 'error.contrastText',
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom color="error.main">
            Error State
          </Typography>
          <Typography variant="body2" color="error.dark">
            CardContent displaying error information with error-themed styling and appropriate visual indicators.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'error.main',
                color: 'error.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              !
            </Box>
            <Typography variant="body2" color="error.dark" sx={{ fontWeight: 500 }}>
              Action required to resolve this issue
            </Typography>
          </Box>
        </CardContent>
      </Card>
      
      {/* Success State */}
      <Card 
        sx={{ 
          maxWidth: 400,
          borderLeft: '4px solid',
          borderLeftColor: 'success.main',
          backgroundColor: 'success.light',
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom color="success.main">
            Success State
          </Typography>
          <Typography variant="body2" color="success.dark">
            CardContent showing successful completion with success-themed styling and positive visual indicators.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'success.main',
                color: 'success.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              ✓
            </Box>
            <Typography variant="body2" color="success.dark" sx={{ fontWeight: 500 }}>
              Operation completed successfully
            </Typography>
          </Box>
        </CardContent>
      </Card>
      
      {/* Warning State */}
      <Card 
        sx={{ 
          maxWidth: 400,
          borderLeft: '4px solid',
          borderLeftColor: 'warning.main',
          backgroundColor: 'warning.light',
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom color="warning.main">
            Warning State
          </Typography>
          <Typography variant="body2" color="warning.dark">
            CardContent displaying warning information with warning-themed styling for important notifications.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'warning.main',
                color: 'warning.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              ⚠
            </Box>
            <Typography variant="body2" color="warning.dark" sx={{ fontWeight: 500 }}>
              Please review before proceeding
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all interaction and status states for CardContent including normal, hover, focus, active, disabled, loading, error, success, and warning states. Each state provides appropriate visual feedback and maintains accessibility standards.',
      },
    },
  },
};

// ===== SIZES =====
export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent size="compact">
          <Typography variant="h6" gutterBottom>
            Compact Size
          </Typography>
          <Typography variant="body2">
            CardContent with compact padding for dense information layouts.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent size="comfortable">
          <Typography variant="h6" gutterBottom>
            Comfortable Size (Default)
          </Typography>
          <Typography variant="body2">
            CardContent with standard padding providing good balance of space and content.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardContent size="spacious">
          <Typography variant="h6" gutterBottom>
            Spacious Size
          </Typography>
          <Typography variant="body2">
            CardContent with generous padding for prominent content display.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== THEMES =====
export const Theme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="text.primary">
            Dark Theme Content
          </Typography>
          <Typography variant="body2" color="text.secondary">
            CardContent optimized for dark theme with proper text contrast and readability.
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            Theme Colors
          </Typography>
          <Typography variant="body2" color="secondary">
            Content using theme-aware colors for consistent appearance across themes.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  ),
};