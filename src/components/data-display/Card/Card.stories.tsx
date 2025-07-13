import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardMedia } from './CardMedia';
import { CardActions } from './CardActions';
import { CARD_VARIANTS, CARD_ELEVATIONS, CARD_SIZES, CARD_ORIENTATIONS } from './Card.constants';
import { Button } from '../../core/Button';
import { 
  Avatar, 
  IconButton, 
  Typography, 
  Stack, 
  Box,
  Chip,
  Rating 
} from '@mui/material';
import { 
  MoreVert, 
  Favorite, 
  Share, 
  BookmarkBorder,
  Person,
  LocationOn,
  Event
} from '@mui/icons-material';

/**
 * The Card component is a versatile container for displaying content with multiple variants,
 * elevation levels, and comprehensive subcomponent support.
 * 
 * ## Features
 * - 6 variants: elevated, outlined, filled, glass, gradient, interactive
 * - Multiple elevation levels (0-24)
 * - Size variants: compact, comfortable, spacious
 * - Orientation: vertical, horizontal layouts
 * - Full subcomponent system: CardHeader, CardContent, CardMedia, CardActions
 * - Interactive states with animations
 * - WCAG 2.1 AA accessibility compliance
 */
const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Enhanced Material-UI Card component with 6 variants and advanced features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(CARD_VARIANTS),
      description: 'The variant of the card',
    },
    elevation: {
      control: 'select',
      options: Object.values(CARD_ELEVATIONS),
      description: 'The elevation level of the card',
    },
    size: {
      control: 'select',
      options: Object.values(CARD_SIZES),
      description: 'The size/spacing variant of the card',
    },
    orientation: {
      control: 'select',
      options: Object.values(CARD_ORIENTATIONS),
      description: 'The orientation of the card layout',
    },
    interactive: {
      control: 'boolean',
      description: 'If true, the card will be interactive',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the card will be disabled',
    },
    selected: {
      control: 'boolean',
      description: 'If true, the card will be selected',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample image for stories
const sampleImage = 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=200&fit=crop';
const sampleAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face';

// Default story
export const Default: Story = {
  args: {
    variant: 'elevated',
    elevation: 1,
    size: 'comfortable',
    children: (
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a simple card with default settings. It demonstrates the basic card structure
          with content and proper spacing.
        </Typography>
      </CardContent>
    ),
  },
};

// ===== VARIANT STORIES =====
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    elevation: 3,
    children: (
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Elevated Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card uses elevation to create depth and shadow effects.
        </Typography>
      </CardContent>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Outlined Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card has a border instead of elevation for a cleaner look.
        </Typography>
      </CardContent>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filled Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card has a subtle background fill for distinction.
        </Typography>
      </CardContent>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: (
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Glass Morphism Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card uses glass morphism effects with backdrop blur.
        </Typography>
      </CardContent>
    ),
  },
  parameters: {
    backgrounds: { default: 'gray' },
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: (
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Gradient Card
        </Typography>
        <Typography variant="body2">
          This card features gradient backgrounds from the theme system.
        </Typography>
      </CardContent>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    onClick: fn(),
    children: (
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Interactive Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card responds to hover and click interactions with animations.
        </Typography>
      </CardContent>
    ),
  },
};

// ===== ELEVATION STORIES =====
export const ElevationLevel0: Story = {
  args: {
    elevation: 0,
    children: (
      <CardContent>
        <Typography variant="body2">Elevation 0 - Flat</Typography>
      </CardContent>
    ),
  },
};

export const ElevationLevel1: Story = {
  args: {
    elevation: 1,
    children: (
      <CardContent>
        <Typography variant="body2">Elevation 1 - Subtle</Typography>
      </CardContent>
    ),
  },
};

export const ElevationLevel4: Story = {
  args: {
    elevation: 4,
    children: (
      <CardContent>
        <Typography variant="body2">Elevation 4 - Moderate</Typography>
      </CardContent>
    ),
  },
};

export const ElevationLevel8: Story = {
  args: {
    elevation: 8,
    children: (
      <CardContent>
        <Typography variant="body2">Elevation 8 - High</Typography>
      </CardContent>
    ),
  },
};

export const ElevationLevel16: Story = {
  args: {
    elevation: 16,
    children: (
      <CardContent>
        <Typography variant="body2">Elevation 16 - Very High</Typography>
      </CardContent>
    ),
  },
};

export const ElevationLevel24: Story = {
  args: {
    elevation: 24,
    children: (
      <CardContent>
        <Typography variant="body2">Elevation 24 - Maximum</Typography>
      </CardContent>
    ),
  },
};

// ===== SIZE STORIES =====
export const CompactSize: Story = {
  args: {
    size: 'compact',
    children: (
      <CardContent size="compact">
        <Typography variant="body2">
          Compact size with reduced padding for dense layouts.
        </Typography>
      </CardContent>
    ),
  },
};

export const ComfortableSize: Story = {
  args: {
    size: 'comfortable',
    children: (
      <CardContent size="comfortable">
        <Typography variant="body2">
          Comfortable size with standard padding for most use cases.
        </Typography>
      </CardContent>
    ),
  },
};

export const SpaciousSize: Story = {
  args: {
    size: 'spacious',
    children: (
      <CardContent size="spacious">
        <Typography variant="body2">
          Spacious size with generous padding for emphasis.
        </Typography>
      </CardContent>
    ),
  },
};

// ===== ORIENTATION STORIES =====
export const VerticalOrientation: Story = {
  args: {
    orientation: 'vertical',
    children: [
      <CardMedia key="media" src={sampleImage} alt="Sample vertical layout" />,
      <CardContent key="content">
        <Typography variant="h6" gutterBottom>
          Vertical Layout
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Content flows vertically from top to bottom.
        </Typography>
      </CardContent>,
    ],
  },
};

export const HorizontalOrientation: Story = {
  args: {
    orientation: 'horizontal',
    style: { maxWidth: 400 },
    children: [
      <CardMedia 
        key="media" 
        src={sampleImage} 
        alt="Sample horizontal layout" 
        width={150}
      />,
      <CardContent key="content">
        <Typography variant="h6" gutterBottom>
          Horizontal Layout
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Content flows horizontally side by side.
        </Typography>
      </CardContent>,
    ],
  },
};

// ===== STATE STORIES =====
export const SelectedState: Story = {
  args: {
    selected: true,
    children: (
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Selected Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card is in a selected state with visual indicators.
        </Typography>
      </CardContent>
    ),
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    children: (
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Disabled Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card is disabled and cannot be interacted with.
        </Typography>
      </CardContent>
    ),
  },
};

export const InteractiveHover: Story = {
  args: {
    interactive: true,
    onClick: fn(),
    children: (
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Hover Me
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hover over this card to see the interactive animation effects.
        </Typography>
      </CardContent>
    ),
  },
};

// ===== SUBCOMPONENT STORIES =====
export const WithHeader: Story = {
  args: {
    children: [
      <CardHeader
        key="header"
        avatar={<Avatar src={sampleAvatar} />}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="John Doe"
        subtitle="2 hours ago"
      />,
      <CardContent key="content">
        <Typography variant="body2" color="text.secondary">
          This card includes a header with avatar, title, subtitle, and action.
        </Typography>
      </CardContent>,
    ],
  },
};

export const WithMedia: Story = {
  args: {
    children: [
      <CardMedia 
        key="media"
        src={sampleImage}
        alt="Beautiful landscape"
        height={200}
      />,
      <CardContent key="content">
        <Typography variant="h6" gutterBottom>
          Beautiful Landscape
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card includes media content with proper aspect ratio handling.
        </Typography>
      </CardContent>,
    ],
  },
};

export const WithActions: Story = {
  args: {
    children: [
      <CardContent key="content">
        <Typography variant="h6" gutterBottom>
          Card with Actions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card includes action buttons at the bottom.
        </Typography>
      </CardContent>,
      <CardActions key="actions">
        <Button size="small" startIcon={<Favorite />}>
          Like
        </Button>
        <Button size="small" startIcon={<Share />}>
          Share
        </Button>
        <IconButton aria-label="bookmark">
          <BookmarkBorder />
        </IconButton>
      </CardActions>,
    ],
  },
};

export const CompleteCard: Story = {
  args: {
    children: [
      <CardHeader
        key="header"
        avatar={<Avatar src={sampleAvatar} />}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Travel Photography"
        subtitle="Shared by John Doe • 3 hours ago"
      />,
      <CardMedia 
        key="media"
        src={sampleImage}
        alt="Mountain landscape photography"
        height={200}
      />,
      <CardContent key="content">
        <Typography variant="h6" gutterBottom>
          Mountain Adventure
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Captured during my recent hiking trip to the mountains. The view was absolutely breathtaking!
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Photography" size="small" />
          <Chip label="Travel" size="small" />
          <Chip label="Nature" size="small" />
        </Stack>
      </CardContent>,
      <CardActions key="actions">
        <Button size="small" startIcon={<Favorite />}>
          24 Likes
        </Button>
        <Button size="small" startIcon={<Share />}>
          Share
        </Button>
        <IconButton aria-label="bookmark">
          <BookmarkBorder />
        </IconButton>
      </CardActions>,
    ],
  },
};

// ===== COMPREHENSIVE SHOWCASES =====
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        All Card Variants
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={2}>
        {Object.values(CARD_VARIANTS).map((variant) => (
          <Card key={variant} variant={variant}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {variant.charAt(0).toUpperCase() + variant.slice(1)} Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is the {variant} variant of the card component.
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllElevations: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        All Elevation Levels
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={2}>
        {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
          <Card key={elevation} elevation={elevation as any}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Elevation {elevation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Shadow depth level {elevation}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        All Card Sizes
      </Typography>
      <Stack spacing={2}>
        {Object.values(CARD_SIZES).map((size) => (
          <Card key={size} size={size}>
            <CardContent size={size}>
              <Typography variant="h6" gutterBottom>
                {size.charAt(0).toUpperCase() + size.slice(1)} Size
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This card uses {size} size spacing and padding.
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
  },
};

// ===== ACCESSIBILITY STORIES =====
export const AccessibilityDemo: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Accessibility Features
      </Typography>
      <Stack spacing={2}>
        <Card
          interactive
          onClick={fn()}
          aria-label="Interactive product card for Mountain Bike Pro"
          role="button"
          tabIndex={0}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Mountain Bike Pro
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click to view product details
            </Typography>
          </CardContent>
        </Card>
        
        <Card role="article" aria-labelledby="article-title">
          <CardContent>
            <Typography id="article-title" variant="h6" gutterBottom>
              News Article
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This card represents an article with proper semantic structure.
            </Typography>
          </CardContent>
        </Card>
        
        <Card disabled aria-label="This content is currently unavailable">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Unavailable Content
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This card is disabled and properly announced to screen readers.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
        ],
      },
    },
  },
};