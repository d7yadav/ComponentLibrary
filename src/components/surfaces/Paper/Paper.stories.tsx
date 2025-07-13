import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Button, Card, CardContent, TextField, Stack } from '@mui/material';
import { Favorite, Share, MoreVert, Image as ImageIcon } from '@mui/icons-material';
import { Paper } from './Paper';
import { 
  PAPER_VARIANTS, 
  PAPER_CORNERS, 
  PAPER_SURFACES, 
  PAPER_SIZES, 
  PAPER_GRADIENTS 
} from './Paper.constants';

const meta = {
  title: 'Surfaces/Paper',
  component: Paper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Paper Component

A foundational surface component built on MUI Paper with enhanced functionality and multiple variants.

## Features

- **5 Variants**: elevation, outlined, filled, glass, gradient
- **24 Elevation Levels**: 0-24 with proper shadow system
- **5 Corner Styles**: none, small, medium, large, circular
- **3 Surface Treatments**: flat, concave, convex
- **Interactive States**: hover effects with elevation changes
- **Glass Morphism**: backdrop blur and transparency effects
- **Gradient Overlays**: theme-integrated color gradients
- **Responsive Design**: adaptive padding and sizing
- **Print Optimization**: print-friendly styling
- **Accessibility**: WCAG 2.1 AA compliance with focus management
- **Dark Mode**: OLED optimizations and enhanced contrast

## Usage

\`\`\`tsx
import { Paper } from '@/components/surfaces/Paper';

// Basic paper
<Paper>Content goes here</Paper>

// Interactive card
<Paper variant="elevation" elevation={2} interactive>
  <Typography>Clickable paper</Typography>
</Paper>

// Glass morphism effect
<Paper variant="glass" glassMorphism>
  <Typography>Glass paper with blur</Typography>
</Paper>

// Gradient paper
<Paper variant="gradient" gradient="primary" elevation={4}>
  <Typography>Gradient background</Typography>
</Paper>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(PAPER_VARIANTS),
      description: 'The visual variant of the paper',
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'Elevation level (0-24)',
    },
    corners: {
      control: 'select',
      options: Object.values(PAPER_CORNERS),
      description: 'Corner radius style',
    },
    surface: {
      control: 'select',
      options: Object.values(PAPER_SURFACES),
      description: 'Surface treatment style',
    },
    size: {
      control: 'select',
      options: Object.values(PAPER_SIZES),
      description: 'Size variant affecting padding',
    },
    gradient: {
      control: 'select',
      options: Object.values(PAPER_GRADIENTS),
      description: 'Gradient color (gradient variant only)',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable interactive hover effects',
    },
    glassMorphism: {
      control: 'boolean',
      description: 'Enable glass morphism effects (glass variant)',
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive sizing',
    },
    printFriendly: {
      control: 'boolean',
      description: 'Enable print-friendly styling',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Paper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
/**
 * Default component
 * 
 * @returns JSX element
 */
export const Default: Story = {
  args: {
    children: (
      <Typography variant="body1">
        This is a basic Paper component with default elevation and styling.
      </Typography>
    ),
  },
};

// Variant stories
/**
 * ElevationVariant component
 * 
 * @returns JSX element
 */
export const ElevationVariant: Story = {
  args: {
    variant: 'elevation',
    elevation: 4,
    children: (
      <Stack spacing={2}>
        <Typography variant="h6">Elevation Paper</Typography>
        <Typography variant="body2">
          Uses Material Design elevation with shadow depth to create visual hierarchy.
        </Typography>
      </Stack>
    ),
  },
};

/**
 * OutlinedVariant component
 * 
 * @returns JSX element
 */
export const OutlinedVariant: Story = {
  args: {
    variant: 'outlined',
    children: (
      <Stack spacing={2}>
        <Typography variant="h6">Outlined Paper</Typography>
        <Typography variant="body2">
          Features a clean border with no elevation for a minimal look.
        </Typography>
      </Stack>
    ),
  },
};

/**
 * FilledVariant component
 * 
 * @returns JSX element
 */
export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    children: (
      <Stack spacing={2}>
        <Typography variant="h6">Filled Paper</Typography>
        <Typography variant="body2">
          Uses a subtle background color for content separation.
        </Typography>
      </Stack>
    ),
  },
};

/**
 * GlassVariant component
 * 
 * @returns JSX element
 */
export const GlassVariant: Story = {
  args: {
    variant: 'glass',
    glassMorphism: true,
    children: (
      <Stack spacing={2}>
        <Typography variant="h6">Glass Paper</Typography>
        <Typography variant="body2">
          Modern glass morphism effect with backdrop blur and transparency.
        </Typography>
      </Stack>
    ),
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

/**
 * GradientVariant component
 * 
 * @returns JSX element
 */
export const GradientVariant: Story = {
  args: {
    variant: 'gradient',
    gradient: 'primary',
    elevation: 2,
    children: (
      <Stack spacing={2}>
        <Typography variant="h6" color="inherit">Gradient Paper</Typography>
        <Typography variant="body2" color="inherit">
          Beautiful gradient backgrounds with proper contrast ratios.
        </Typography>
      </Stack>
    ),
  },
};

// Elevation levels
/**
 * ElevationLevels component
 * 
 * @returns JSX element
 */
export const ElevationLevels: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
        <Paper
          key={elevation}
          elevation={elevation as any}
          sx={{ padding: 2, minWidth: 100, textAlign: 'center' }}
        >
          <Typography variant="body2">
            Elevation {elevation}
          </Typography>
        </Paper>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different elevation levels from 0 (flat) to 24 (highest).',
      },
    },
  },
};

// Corner styles
/**
 * CornerStyles component
 * 
 * @returns JSX element
 */
export const CornerStyles: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      {Object.values(PAPER_CORNERS).map((corner) => (
        <Paper
          key={corner}
          corners={corner}
          elevation={2}
          sx={{ padding: 2, minWidth: 120, textAlign: 'center' }}
        >
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {corner}
          </Typography>
        </Paper>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different corner radius options from none to circular.',
      },
    },
  },
};

// Surface treatments
/**
 * SurfaceTreatments component
 * 
 * @returns JSX element
 */
export const SurfaceTreatments: Story = {
  render: () => (
    <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
      {Object.values(PAPER_SURFACES).map((surface) => (
        <Paper
          key={surface}
          surface={surface}
          elevation={surface === 'flat' ? 2 : 0}
          sx={{ padding: 3, minWidth: 140, textAlign: 'center' }}
        >
          <Typography variant="h6" sx={{ textTransform: 'capitalize', mb: 1 }}>
            {surface}
          </Typography>
          <Typography variant="body2">
            {surface === 'flat' && 'Standard flat surface'}
            {surface === 'concave' && 'Inward curved effect'}
            {surface === 'convex' && 'Outward curved effect'}
          </Typography>
        </Paper>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different surface treatments: flat, concave (inward), and convex (outward).',
      },
    },
  },
};

// Size variants
/**
 * SizeVariants component
 * 
 * @returns JSX element
 */
export const SizeVariants: Story = {
  render: () => (
    <Stack spacing={3}>
      {Object.values(PAPER_SIZES).map((size) => (
        <Paper
          key={size}
          size={size}
          elevation={2}
        >
          <Typography variant="h6" sx={{ textTransform: 'capitalize', mb: 1 }}>
            {size} Size
          </Typography>
          <Typography variant="body2">
            This paper uses the {size} size variant with appropriate padding and spacing.
          </Typography>
        </Paper>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants affecting padding and spacing.',
      },
    },
  },
};

// Gradient colors
/**
 * GradientColors component
 * 
 * @returns JSX element
 */
export const GradientColors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      {Object.values(PAPER_GRADIENTS).map((gradient) => (
        <Paper
          key={gradient}
          variant="gradient"
          gradient={gradient}
          elevation={2}
          sx={{ padding: 2, minWidth: 120, textAlign: 'center' }}
        >
          <Typography variant="body2" color="inherit" sx={{ textTransform: 'capitalize' }}>
            {gradient}
          </Typography>
        </Paper>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available gradient color options.',
      },
    },
  },
};

// Interactive paper
/**
 * Interactive component
 * 
 * @returns JSX element
 */
export const Interactive: Story = {
  args: {
    interactive: true,
    elevation: 2,
    hoverElevation: 6,
    pressedElevation: 1,
    onClick: () => alert('Paper clicked!'),
    children: (
      <Stack spacing={2}>
        <Typography variant="h6">Interactive Paper</Typography>
        <Typography variant="body2">
          Click me! This paper responds to hover, focus, and click interactions with elevation changes.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Hover elevation: 6, Pressed elevation: 1
        </Typography>
      </Stack>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive paper with hover effects and click handling.',
      },
    },
  },
};

// Glass morphism examples
/**
 * GlassMorphismExamples component
 * 
 * @returns JSX element
 */
export const GlassMorphismExamples: Story = {
  render: () => (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 4,
        borderRadius: 2,
        minHeight: 400,
      }}
    >
      <Stack spacing={3}>
        <Paper variant="glass" glassMorphism sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Glass Morphism Card
          </Typography>
          <Typography variant="body2">
            This card demonstrates the glass morphism effect with backdrop blur and subtle transparency.
          </Typography>
        </Paper>
        
        <Stack direction="row" spacing={2}>
          <Paper variant="glass" glassMorphism interactive sx={{ padding: 2, flex: 1 }}>
            <Typography variant="body2">Interactive Glass</Typography>
          </Paper>
          <Paper variant="glass" glassMorphism elevation={4} sx={{ padding: 2, flex: 1 }}>
            <Typography variant="body2">Glass with Elevation</Typography>
          </Paper>
        </Stack>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Glass morphism effects with backdrop blur on gradient backgrounds.',
      },
    },
  },
};

// Responsive behavior
/**
 * ResponsiveBehavior component
 * 
 * @returns JSX element
 */
export const ResponsiveBehavior: Story = {
  args: {
    responsive: true,
    elevation: 2,
    children: (
      <Stack spacing={2}>
        <Typography variant="h6">Responsive Paper</Typography>
        <Typography variant="body2">
          This paper adapts its padding and spacing based on screen size. 
          Try resizing your viewport to see the changes.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Mobile: compact • Tablet: comfortable • Desktop: spacious
        </Typography>
      </Stack>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Paper that adapts padding and spacing based on viewport size.',
      },
    },
  },
};

// Content examples
/**
 * ContentCard component
 * 
 * @returns JSX element
 */
export const ContentCard: Story = {
  render: () => (
    <Paper elevation={2} interactive sx={{ maxWidth: 400 }}>
      <Box sx={{ padding: 2 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ImageIcon color="action" />
            <Typography variant="h6">Article Title</Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            This is an example of using Paper as a content container. It provides 
            a clean surface for organizing related information with proper visual hierarchy.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              <Button size="small" startIcon={<Favorite />}>Like</Button>
              <Button size="small" startIcon={<Share />}>Share</Button>
            </Stack>
            <Button size="small">
              <MoreVert />
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of Paper used as a content card with actions.',
      },
    },
  },
};

/**
 * FormContainer component
 * 
 * @returns JSX element
 */
export const FormContainer: Story = {
  render: () => (
    <Paper variant="outlined" sx={{ maxWidth: 400, padding: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h5">Contact Form</Typography>
        
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
        />
        
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
        />
        
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={3}
          variant="outlined"
        />
        
        <Button variant="contained" size="large">
          Send Message
        </Button>
      </Stack>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Paper used as a form container with clean borders.',
      },
    },
  },
};

// Dark theme demonstration
/**
 * DarkThemeOptimized component
 * 
 * @returns JSX element
 */
export const DarkThemeOptimized: Story = {
  args: {
    elevation: 0,
    children: (
      <Stack spacing={2}>
        <Typography variant="h6">OLED Dark Theme</Typography>
        <Typography variant="body2" color="text.secondary">
          This paper uses true black background for OLED displays when elevation is 0 in dark mode.
        </Typography>
      </Stack>
    ),
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Paper optimized for dark theme with OLED true black support.',
      },
    },
  },
};

// Print optimization
/**
 * PrintOptimized component
 * 
 * @returns JSX element
 */
export const PrintOptimized: Story = {
  args: {
    printFriendly: true,
    variant: 'gradient',
    gradient: 'primary',
    children: (
      <Stack spacing={2}>
        <Typography variant="h6">Print-Friendly Paper</Typography>
        <Typography variant="body2">
          This paper will automatically optimize for print media with high contrast 
          borders and removal of background colors and shadows.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Try print preview to see the optimization in action.
        </Typography>
      </Stack>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Paper that optimizes appearance for print media.',
      },
    },
  },
};

// Custom styling
/**
 * CustomStyling component
 * 
 * @returns JSX element
 */
export const CustomStyling: Story = {
  render: () => (
    <Stack spacing={3}>
      <Paper
        backgroundColor="rgba(255, 193, 7, 0.1)"
        borderColor="warning.main"
        borderWidth={2}
        variant="outlined"
        sx={{ padding: 2 }}
      >
        <Typography variant="body1">
          Custom background and border colors
        </Typography>
      </Paper>
      
      <Paper
        elevation={8}
        corners="large"
        padding="32px"
        sx={{ 
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'white',
        }}
      >
        <Typography variant="h6">
          Custom gradient with large corners
        </Typography>
      </Paper>
      
      <Paper
        variant="glass"
        glassMorphism
        maxWidth={300}
        sx={{ 
          padding: 3,
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <Typography variant="body1">
          Enhanced glass effect with custom styling
        </Typography>
      </Paper>
    </Stack>
  ),
  decorators: [
    (Story) => (
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Examples of custom styling with background colors, borders, and enhanced effects.',
      },
    },
  },
};

// Accessibility demonstration
/**
 * AccessibilityDemo component
 * 
 * @returns JSX element
 */
export const AccessibilityDemo: Story = {
  render: () => (
    <Stack spacing={3}>
      <Paper
        interactive
        role="button"
        aria-label="Interactive card"
        tabIndex={0}
        onClick={() => alert('Accessible click!')}
        sx={{ padding: 2 }}
      >
        <Typography variant="body1">
          Accessible Interactive Paper
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Keyboard navigable with proper ARIA labels
        </Typography>
      </Paper>
      
      <Paper
        role="region"
        aria-labelledby="section-title"
        sx={{ padding: 2 }}
      >
        <Typography id="section-title" variant="h6" sx={{ mb: 1 }}>
          Content Section
        </Typography>
        <Typography variant="body2">
          This paper serves as a content region with proper semantic markup.
        </Typography>
      </Paper>
      
      <Paper
        interactive
        elevation={2}
        sx={{ 
          padding: 2,
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: '2px',
          }
        }}
      >
        <Typography variant="body1">
          Focus-visible outline
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Tab to this paper to see focus indication
        </Typography>
      </Paper>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including keyboard navigation, ARIA labels, and focus management.',
      },
    },
  },
};