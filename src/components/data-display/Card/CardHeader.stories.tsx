import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
// Remove direct MUI icon imports and add TODO for icon wrappers
// TODO: Replace these with internal icon wrappers when available
// import { MoreVert, Person, Business, Settings, Star, Verified, Edit, Delete, Share, Bookmark } from '@mui/icons-material';

import { Button } from '@/components/core/Button';
import { Chip } from '@/components/core/Chip'; // Replaced MUI Chip with internal wrapper as per migration guidelines
import { IconButton } from '@/components/core/IconButton'; // Replaced MUI IconButton with internal wrapper as per migration guidelines
import { Avatar } from '@/components/data-display/Avatar'; // Replaced MUI Avatar with internal wrapper as per migration guidelines
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

import { CardHeader } from './CardHeader';

import { Card, CardContent, CardActions } from './index';
// TODO: Create Avatar, IconButton, and Chip wrapper components

/**
 * CardHeader provides a formatted header area for Cards with support for avatars, titles, 
 * subtitles, and action elements. It ensures consistent spacing and alignment.
 * 
 * ## Features
 * - Support for avatar, title, and subtitle
 * - Action menu integration
 * - Responsive typography
 * - Consistent spacing and alignment
 * - Accessibility compliance
 * - Dark theme compatibility
 */
const meta: Meta<typeof CardHeader> = {
  title: 'Data Display/Card/CardHeader',
  component: CardHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card header component for displaying titles, subtitles, avatars, and actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    avatar: {
      control: false,
      description: 'The Avatar for the Card Header',
    },
    title: {
      control: 'text',
      description: 'The title to display in the header',
    },
    subtitle: {
      control: 'text', 
      description: 'The subtitle to display below the title',
    },
    action: {
      control: false,
      description: 'The action to display in the top-right corner',
    },
    onClick: {
      action: 'onClick',
      description: 'Callback fired when click occurs',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the header is disabled',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
  },
  decorators: [
    (Story) => (
      <Box maxWidth={400}>
        <Card>
          <Story />
          <CardContent>
            <p>This is the card content area that follows the header.</p>
          </CardContent>
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
    title: 'Card Title',
    subtitle: 'Card subtitle with additional information',
    onClick: fn(),
  },
};

// ===== AVATAR VARIANTS =====
export const AvatarOptions: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar aria-label="user">U</Avatar>}
          title="With Letter Avatar"
          subtitle="Using initials in avatar"
        />
        <CardContent>
          <p>Content with a letter-based avatar in the header.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="user">
              <Person />
            </Avatar>
          }
          title="With Icon Avatar"
          subtitle="Using an icon in avatar"
        />
        <CardContent>
          <p>Content with an icon-based avatar in the header.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Avatar 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" 
              aria-label="user profile"
            />
          }
          title="With Image Avatar"
          subtitle="Using a profile image"
        />
        <CardContent>
          <p>Content with a profile image avatar in the header.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <Business />
            </Avatar>
          }
          title="Large Avatar"
          subtitle="Using a larger avatar size"
        />
        <CardContent>
          <p>Content with a larger avatar in the header.</p>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== ACTION VARIANTS =====
export const ActionOptions: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar>M</Avatar>}
          title="More Actions Menu"
          subtitle="With overflow menu"
          action={
            <IconButton aria-label="settings" onClick={fn()}>
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header with a more actions menu button.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'success.main' }}>S</Avatar>}
          title="Settings Action"
          subtitle="With settings button"
          action={
            <IconButton aria-label="settings" onClick={fn()}>
              <Settings />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header with a settings action button.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'warning.main' }}>R</Avatar>}
          title="Rating Display"
          subtitle="With star rating"
          action={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ color: 'gold' }} />
              <span>4.8</span>
            </Box>
          }
        />
        <CardContent>
          <p>Header with a star rating display.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'info.main' }}>V</Avatar>}
          title="Verified Account"
          subtitle="Premium member"
          action={
            <Chip 
              icon={<Verified />} 
              label="Verified" 
              size="small" 
              color="primary"
            />
          }
        />
        <CardContent>
          <p>Header with a verification badge.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'error.main' }}>A</Avatar>}
          title="Multiple Actions"
          subtitle="With action group"
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton aria-label="edit" size="small" onClick={fn()}>
                <Edit />
              </IconButton>
              <IconButton aria-label="delete" size="small" onClick={fn()}>
                <Delete />
              </IconButton>
              <IconButton aria-label="share" size="small" onClick={fn()}>
                <Share />
              </IconButton>
            </Box>
          }
        />
        <CardContent>
          <p>Header with multiple action buttons.</p>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== TITLE VARIANTS =====
export const TitleVariants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="Short Title"
          subtitle="Simple one-line title"
        />
        <CardContent>
          <p>Content with a short, simple title.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="This is a Much Longer Title That Demonstrates Text Wrapping Behavior"
          subtitle="How long titles behave"
        />
        <CardContent>
          <p>Content with a long title that wraps to multiple lines.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              Custom Title Component
              <Verified sx={{ color: 'primary.main', fontSize: '1rem' }} />
            </Box>
          }
          subtitle="With custom title element"
          disableTypography
        />
        <CardContent>
          <p>Content with a custom title component including an icon.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="No Subtitle"
        />
        <CardContent>
          <p>Content with only a title, no subtitle.</p>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== SUBTITLE VARIANTS =====
export const SubtitleVariants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar>D</Avatar>}
          title="Date Subtitle"
          subtitle="March 15, 2024"
        />
        <CardContent>
          <p>Header with a date-based subtitle.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>T</Avatar>}
          title="Time Ago Subtitle"
          subtitle="2 hours ago"
        />
        <CardContent>
          <p>Header with a relative time subtitle.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'success.main' }}>L</Avatar>}
          title="Location Subtitle"
          subtitle="San Francisco, CA"
        />
        <CardContent>
          <p>Header with a location-based subtitle.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'warning.main' }}>S</Avatar>}
          title="Status Subtitle"
          subtitle="Online • Active 5 minutes ago"
        />
        <CardContent>
          <p>Header with a status indicator subtitle.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'info.main' }}>M</Avatar>}
          title="Multi-line Subtitle"
          subtitle="This is a longer subtitle that demonstrates how text wraps when it exceeds the available width"
        />
        <CardContent>
          <p>Header with a longer subtitle that wraps to multiple lines.</p>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== WITHOUT AVATAR =====
export const WithoutAvatar: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="Article Title"
          subtitle="Published on March 15, 2024"
          action={
            <IconButton aria-label="bookmark" onClick={fn()}>
              <Bookmark />
            </IconButton>
          }
        />
        <CardContent>
          <p>Article content without an avatar in the header.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="Product Name"
          subtitle="$299.99 • In Stock"
          action={
            <Chip label="Sale" color="error" size="small" />
          }
        />
        <CardContent>
          <p>Product card without an avatar, focusing on title and price.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="Event Announcement"
          subtitle="March 20, 2024 • 7:00 PM PST"
          action={
            <Box sx={{ textAlign: 'right' }}>
              <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                50 attending
              </Box>
              <Chip label="Free" color="success" size="small" />
            </Box>
          }
        />
        <CardContent>
          <p>Event card with detailed information in the action area.</p>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== INTERACTIVE EXAMPLES =====
export const InteractiveHeaders: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main', cursor: 'pointer' }}>
              U
            </Avatar>
          }
          title="User Profile"
          subtitle="Click avatar to view profile"
          action={
            <IconButton 
              aria-label="more options"
              onClick={fn()}
            >
              <MoreVert />
            </IconButton>
          }
          sx={{
            '& .MuiCardHeader-avatar': {
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }
          }}
        />
        <CardContent>
          <p>Interactive header with clickable avatar and hover effects.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>E</Avatar>}
          title="Editable Content"
          subtitle="Click to edit"
          action={
            <IconButton 
              aria-label="edit"
              onClick={fn()}
              sx={{
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'rotate(15deg)'
                }
              }}
            >
              <Edit />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header with an edit action that provides visual feedback on hover.</p>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== ACCESSIBILITY FEATURES =====
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Avatar 
              aria-label="John Doe profile picture"
              sx={{ bgcolor: 'primary.main' }}
            >
              JD
            </Avatar>
          }
          title="John Doe"
          subtitle="Software Engineer at TechCorp"
          action={
            <IconButton 
              aria-label="Open user menu for John Doe"
              onClick={fn()}
              sx={{
                '&:focus-visible': {
                  outline: '2px solid #1976d2',
                  outlineOffset: '2px'
                }
              }}
            >
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header with comprehensive ARIA labels for screen reader accessibility.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'success.main' }}>A</Avatar>}
          title={
            <Box component="h2" sx={{ margin: 0, fontSize: 'inherit' }}>
              Semantic Article Title
            </Box>
          }
          subtitle={
            <Box component="time" dateTime="2024-03-15">
              March 15, 2024
            </Box>
          }
          action={
            <IconButton 
              aria-label="Share this article"
              onClick={fn()}
              tabIndex={0}
            >
              <Share />
            </IconButton>
          }
          disableTypography
        />
        <CardContent>
          <p>Header using semantic HTML elements for better accessibility.</p>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== THEMES =====
export const Themes: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>L</Avatar>}
          title="Light Theme Header"
          subtitle="Typography and colors optimized for light backgrounds"
          action={
            <IconButton color="primary" aria-label="more actions">
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header with proper contrast and spacing for light theme environments.</p>
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
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
              D
            </Avatar>
          }
          title="Dark Theme Header"
          subtitle="Typography and colors optimized for dark backgrounds"
          action={
            <IconButton color="primary" aria-label="more actions">
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header with enhanced visibility and contrast for dark theme environments.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.05)',
                }
              }}
            >
              T
            </Avatar>
          }
          title="Theme-Aware Interactions"
          subtitle="Hover and focus states adapt to current theme"
          action={
            <IconButton 
              aria-label="theme aware action"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'action.hover',
                },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                }
              }}
            >
              <Settings />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header elements with theme-aware interactive states and accessibility.</p>
        </CardContent>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates CardHeader in both light and dark themes with proper contrast, typography, and theme-aware interactions.',
      },
    },
  },
};

// ===== THEME INTEGRATION (LEGACY) =====
export const ThemeIntegration: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>L</Avatar>}
          title="Light Theme Header"
          subtitle="Optimized for light backgrounds"
          action={
            <IconButton color="primary">
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header designed for light theme usage.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ 
        maxWidth: 400, 
        bgcolor: 'grey.900', 
        color: 'white',
        '& .MuiCardHeader-subheader': {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>D</Avatar>}
          title="Dark Theme Header"
          subtitle="Optimized for dark backgrounds"
          action={
            <IconButton sx={{ color: 'white' }}>
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <p style={{ color: 'rgba(255, 255, 255, 0.87)' }}>
            Header designed for dark theme usage.
          </p>
        </CardContent>
      </Card>
    </Stack>
  ),
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#121212' },
      ],
    },
  },
};

// ===== REAL-WORLD EXAMPLES =====
export const RealWorldExamples: Story = {
  render: (args) => (
    <Stack spacing={3} direction={{ xs: 'column', lg: 'row' }}>
      <Card sx={{ maxWidth: 350 }}>
        <CardHeader
          avatar={
            <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" />
          }
          title="Sarah Johnson"
          subtitle="2 hours ago"
          action={
            <IconButton aria-label="more options">
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <p>Just finished reading an amazing book about sustainable design. 
          Highly recommend it to anyone interested in environmental consciousness! 📚🌱</p>
        </CardContent>
        <CardActions>
          <Button size="small">Like</Button>
          <Button size="small">Share</Button>
          <Button size="small">Comment</Button>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 350 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Business />
            </Avatar>
          }
          title="TechCorp Inc."
          subtitle="Job Posting • 1 day ago"
          action={
            <Chip label="Hiring" color="success" size="small" />
          }
        />
        <CardContent>
          <h4 style={{ margin: '0 0 8px 0' }}>Senior Frontend Developer</h4>
          <p>We're looking for an experienced React developer to join our growing team. 
          Remote work available with competitive salary and benefits.</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary">Apply Now</Button>
          <Button size="small">Learn More</Button>
          <IconButton aria-label="save job">
            <Bookmark />
          </IconButton>
        </CardActions>
      </Card>
      
      <Card sx={{ maxWidth: 350 }}>
        <CardHeader
          title="Spring Sale Event"
          subtitle="March 20-27, 2024 • Limited Time"
          action={
            <Box sx={{ textAlign: 'right' }}>
              <Chip label="50% OFF" color="error" size="small" />
              <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.5 }}>
                Ends in 5 days
              </Box>
            </Box>
          }
        />
        <CardContent>
          <h4 style={{ margin: '0 0 8px 0' }}>Everything Must Go!</h4>
          <p>Don't miss our biggest sale of the year. Save up to 50% on all items. 
          Free shipping on orders over $50.</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="primary">Shop Now</Button>
          <Button size="small">View Catalog</Button>
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
        <CardHeader
          title="Standard Header"
          subtitle="Default header layout with title and subtitle"
        />
        <CardContent>
          <p>Header with basic title and subtitle configuration.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={<Avatar>A</Avatar>}
          title="Avatar Header"
          subtitle="Header with avatar component"
        />
        <CardContent>
          <p>Header including avatar for user profiles or branding.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="Action Header" 
          subtitle="Header with action button"
          action={
            <IconButton aria-label="settings">
              <Settings />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header with action button for settings or menu access.</p>
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
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>N</Avatar>}
          title="Normal State"
          subtitle="Header in normal, fully interactive state"
          action={
            <IconButton aria-label="more options" onClick={fn()}>
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header displaying all elements with full functionality and proper interaction states.</p>
        </CardContent>
      </Card>
      
      {/* Hover State */}
      <Card 
        sx={{ 
          maxWidth: 400,
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: (theme) => theme.shadows[4],
            '& .MuiCardHeader-avatar': {
              transform: 'scale(1.1)',
            },
            '& .MuiCardHeader-action': {
              transform: 'scale(1.1)',
              color: 'primary.main',
            },
            '& .MuiCardHeader-title': {
              color: 'primary.main',
            }
          }
        }}
      >
        <CardHeader
          avatar={
            <Avatar 
              sx={{ 
                bgcolor: 'secondary.main',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              H
            </Avatar>
          }
          title="Hover State"
          subtitle="Hover over this card to see interactive effects"
          action={
            <IconButton 
              aria-label="hover action"
              onClick={fn()}
              sx={{ transition: 'all 0.2s ease-in-out' }}
            >
              <Star />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header with enhanced hover effects on avatar, title, and action elements.</p>
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
          }
        }}
      >
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: 'info.main' }}>F</Avatar>}
          title="Focus State"
          subtitle="Tab to this card to see keyboard focus outline"
          action={
            <IconButton 
              aria-label="focus action"
              onClick={fn()}
              sx={{
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                  backgroundColor: 'action.hover',
                }
              }}
            >
              <Settings />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header with proper focus management for keyboard navigation accessibility.</p>
        </CardContent>
      </Card>
      
      {/* Active State */}
      <Card 
        sx={{ 
          maxWidth: 400,
          cursor: 'pointer',
          transition: 'all 0.1s ease-in-out',
          '&:active': {
            transform: 'scale(0.99)',
            boxShadow: (theme) => theme.shadows[1],
            '& .MuiCardHeader-avatar': {
              transform: 'scale(0.95)',
            },
            '& .MuiCardHeader-action': {
              transform: 'scale(0.9)',
            }
          }
        }}
      >
        <CardHeader
          avatar={
            <Avatar 
              sx={{ 
                bgcolor: 'warning.main',
                transition: 'all 0.1s ease-in-out',
              }}
            >
              A
            </Avatar>
          }
          title="Active State"
          subtitle="Click and hold to see press feedback"
          action={
            <IconButton 
              aria-label="active action"
              onClick={fn()}
              sx={{ transition: 'all 0.1s ease-in-out' }}
            >
              <Edit />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header with active press states providing tactile feedback during interaction.</p>
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
        <CardHeader
          avatar={
            <Avatar 
              sx={{ 
                bgcolor: 'action.disabled',
                color: 'text.disabled',
              }}
            >
              D
            </Avatar>
          }
          title="Disabled State"
          subtitle="Header with all interactions disabled"
          titleTypographyProps={{ color: 'text.disabled' }}
          subtitleTypographyProps={{ color: 'text.disabled' }}
          action={
            <IconButton disabled aria-label="disabled action">
              <MoreVert />
            </IconButton>
          }
          sx={{ pointerEvents: 'none' }}
        />
        <CardContent>
          <p style={{ color: 'rgba(0, 0, 0, 0.38)' }}>
            Header with disabled styling including reduced opacity and disabled text colors.
          </p>
        </CardContent>
      </Card>
      
      {/* Loading State */}
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '2px solid',
                borderColor: 'action.disabled',
                borderTopColor: 'primary.main',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
          }
          title="Loading State"
          subtitle="Header with loading indicators"
          action={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
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
            </Box>
          }
        />
        <CardContent>
          <p>Header showing loading state with spinner animations in avatar and action areas.</p>
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
          <Box>
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
        </CardContent>
      </Card>
      
      {/* Error State */}
      <Card 
        sx={{ 
          maxWidth: 400,
          borderLeft: '4px solid',
          borderLeftColor: 'error.main',
          backgroundColor: 'error.light',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'error.main', color: 'error.contrastText' }}>
              !
            </Avatar>
          }
          title="Error State"
          subtitle="Header displaying error information"
          titleTypographyProps={{ color: 'error.main' }}
          subtitleTypographyProps={{ color: 'error.dark' }}
          action={
            <IconButton 
              aria-label="retry action"
              onClick={fn()}
              sx={{
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'error.main',
                  color: 'error.contrastText',
                }
              }}
            >
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <p style={{ color: 'darkred' }}>
            Header with error styling including error colors and warning indicators.
          </p>
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
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'success.main', color: 'success.contrastText' }}>
              ✓
            </Avatar>
          }
          title="Success State"
          subtitle="Header showing successful completion"
          titleTypographyProps={{ color: 'success.main' }}
          subtitleTypographyProps={{ color: 'success.dark' }}
          action={
            <IconButton 
              aria-label="success action"
              onClick={fn()}
              sx={{
                color: 'success.main',
                '&:hover': {
                  backgroundColor: 'success.main',
                  color: 'success.contrastText',
                }
              }}
            >
              <Star />
            </IconButton>
          }
        />
        <CardContent>
          <p style={{ color: 'darkgreen' }}>
            Header with success styling including success colors and positive indicators.
          </p>
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
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'warning.main', color: 'warning.contrastText' }}>
              ⚠
            </Avatar>
          }
          title="Warning State"
          subtitle="Header displaying warning information"
          titleTypographyProps={{ color: 'warning.main' }}
          subtitleTypographyProps={{ color: 'warning.dark' }}
          action={
            <IconButton 
              aria-label="warning action"
              onClick={fn()}
              sx={{
                color: 'warning.main',
                '&:hover': {
                  backgroundColor: 'warning.main',
                  color: 'warning.contrastText',
                }
              }}
            >
              <Settings />
            </IconButton>
          }
        />
        <CardContent>
          <p style={{ color: '#e65100' }}>
            Header with warning styling including warning colors and attention indicators.
          </p>
        </CardContent>
      </Card>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all interaction and status states for CardHeader including normal, hover, focus, active, disabled, loading, error, success, and warning states. Each state provides appropriate visual feedback and maintains accessibility standards.',
      },
    },
  },
};

// ===== SIZES =====
export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          size="compact"
          avatar={<Avatar size="small">C</Avatar>}
          title="Compact Header"
          subtitle="Minimal spacing for dense layouts"
          action={<IconButton size="small"><MoreVert /></IconButton>}
        />
        <CardContent>
          <p>Compact header size for information-dense layouts.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          size="comfortable"
          avatar={<Avatar>D</Avatar>}
          title="Comfortable Header"
          subtitle="Standard spacing for most use cases"
          action={<IconButton><Settings /></IconButton>}
        />
        <CardContent>
          <p>Default comfortable header size with balanced spacing.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          size="spacious"
          avatar={<Avatar sx={{ width: 56, height: 56 }}>S</Avatar>}
          title="Spacious Header"
          subtitle="Generous spacing for prominent display"
          action={<IconButton size="large"><Star /></IconButton>}
        />
        <CardContent>
          <p>Spacious header size for enhanced visual prominence.</p>
        </CardContent>
      </Card>
    </Stack>
  ),
};

// ===== BOOLEAN PROPS =====
export const BooleanProps: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="With Avatar"
          subtitle="Header including avatar component"
          avatar={<Avatar>A</Avatar>}
        />
        <CardContent>
          <p>Header with avatar prop populated.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="Without Avatar"
          subtitle="Header with no avatar component"
        />
        <CardContent>
          <p>Header with avatar prop omitted or null.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="With Action"
          subtitle="Header including action button"
          action={
            <IconButton aria-label="action">
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <p>Header with action prop populated.</p>
        </CardContent>
      </Card>
      
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="Without Action"
          subtitle="Header with no action button"
        />
        <CardContent>
          <p>Header with action prop omitted or null.</p>
        </CardContent>
      </Card>
    </Stack>
  ),
};