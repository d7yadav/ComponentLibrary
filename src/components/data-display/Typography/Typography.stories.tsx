import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { 
  Typography, 
  HeadingTypography, 
  BodyTypography, 
  CaptionTypography, 
  LabelTypography 
} from './Typography';
import { 
  TYPOGRAPHY_VARIANTS, 
  TYPOGRAPHY_COLORS, 
  TYPOGRAPHY_ALIGNMENTS,
  TYPOGRAPHY_TRANSFORMS,
  TYPOGRAPHY_WEIGHTS,
  GRADIENT_PRESETS
} from './Typography.constants';
import { Stack, Box, Paper, Divider } from '@mui/material';
import { Link, Email, Phone, AccessTime } from '@mui/icons-material';

/**
 * The Typography component provides comprehensive text rendering with extensive customization options,
 * accessibility features, and theme integration.
 * 
 * ## Features
 * - 13 typography variants (h1-h6, body1-2, button, caption, overline, subtitle1-2)
 * - Multiple color variants with theme integration
 * - Text alignment and transformation options
 * - Responsive typography scaling
 * - Multi-line truncation support
 * - Interactive states for clickable text
 * - Gradient text support
 * - Enhanced accessibility compliance (WCAG 2.1 AA)
 * - Font feature settings for advanced typography
 */
const meta: Meta<typeof Typography> = {
  title: 'Data Display/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Enhanced Material-UI Typography component with comprehensive variant support and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(TYPOGRAPHY_VARIANTS),
      description: 'The typography variant to use',
    },
    color: {
      control: 'select',
      options: Object.values(TYPOGRAPHY_COLORS),
      description: 'The color of the text',
    },
    align: {
      control: 'select',
      options: Object.values(TYPOGRAPHY_ALIGNMENTS),
      description: 'The alignment of the text',
    },
    textTransform: {
      control: 'select',
      options: Object.values(TYPOGRAPHY_TRANSFORMS),
      description: 'The text transformation to apply',
    },
    fontWeight: {
      control: 'select',
      options: Object.values(TYPOGRAPHY_WEIGHTS),
      description: 'The font weight to apply',
    },
    noWrap: {
      control: 'boolean',
      description: 'If true, the text will not wrap but instead will truncate with ellipsis',
    },
    paragraph: {
      control: 'boolean',
      description: 'If true, the text will have a paragraph margin bottom',
    },
    gutterBottom: {
      control: 'boolean',
      description: 'If true, the text will have gutters (margin bottom)',
    },
    responsive: {
      control: 'boolean',
      description: 'If true, enables responsive typography scaling',
    },
    maxLines: {
      control: 'number',
      description: 'Maximum number of lines to display before truncating',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Typography text content',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    variant: 'body1',
    children: 'This is the default typography component with body1 variant.',
  },
};

// ===== VARIANT STORIES =====
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="h1">Heading 1 - Main page title</Typography>
      <Typography variant="h2">Heading 2 - Section title</Typography>
      <Typography variant="h3">Heading 3 - Subsection title</Typography>
      <Typography variant="h4">Heading 4 - Component title</Typography>
      <Typography variant="h5">Heading 5 - Small section</Typography>
      <Typography variant="h6">Heading 6 - Smallest heading</Typography>
      <Divider />
      <Typography variant="subtitle1">Subtitle 1 - Larger subtitle text</Typography>
      <Typography variant="subtitle2">Subtitle 2 - Smaller subtitle text</Typography>
      <Divider />
      <Typography variant="body1">Body 1 - Primary body text for main content and paragraphs</Typography>
      <Typography variant="body2">Body 2 - Secondary body text for supporting content</Typography>
      <Divider />
      <Typography variant="button">BUTTON TEXT - Used for button labels</Typography>
      <Typography variant="caption">Caption text - Used for image captions and small details</Typography>
      <Typography variant="overline">OVERLINE TEXT - Used for labels and categories</Typography>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All typography variants displayed with semantic usage examples.',
      },
    },
  },
};

export const HeadingVariants: Story = {
  render: () => (
    <Stack spacing={1}>
      <Typography variant="h1" gutterBottom>Heading 1</Typography>
      <Typography variant="h2" gutterBottom>Heading 2</Typography>
      <Typography variant="h3" gutterBottom>Heading 3</Typography>
      <Typography variant="h4" gutterBottom>Heading 4</Typography>
      <Typography variant="h5" gutterBottom>Heading 5</Typography>
      <Typography variant="h6" gutterBottom>Heading 6</Typography>
    </Stack>
  ),
};

export const BodyVariants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="body1" paragraph>
        Body 1 text is used for primary content. It provides excellent readability for longer 
        text passages and maintains proper line height for comfortable reading experiences.
      </Typography>
      <Typography variant="body2" paragraph>
        Body 2 text is slightly smaller and used for secondary content, captions, or 
        supporting information that complements the main content.
      </Typography>
    </Stack>
  ),
};

export const UtilityVariants: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Subtitle 1 - Section introduction</Typography>
      <Typography variant="subtitle2">Subtitle 2 - Smaller section text</Typography>
      <Typography variant="button" component="span">BUTTON LABEL</Typography>
      <Typography variant="caption" color="text.secondary">
        Caption text for images and small details
      </Typography>
      <Typography variant="overline" color="text.secondary">
        OVERLINE CATEGORY
      </Typography>
    </Stack>
  ),
};

// ===== COLOR STORIES =====
export const ColorVariants: Story = {
  render: () => (
    <Stack spacing={1}>
      <Typography color="primary">Primary color text</Typography>
      <Typography color="secondary">Secondary color text</Typography>
      <Typography color="tertiary">Tertiary color text</Typography>
      <Typography color="quaternary">Quaternary color text</Typography>
      <Typography color="success">Success color text</Typography>
      <Typography color="warning">Warning color text</Typography>
      <Typography color="error">Error color text</Typography>
      <Typography color="info">Info color text</Typography>
      <Typography color="text.primary">Text primary color</Typography>
      <Typography color="text.secondary">Text secondary color</Typography>
      <Typography color="text.disabled">Text disabled color</Typography>
      <Typography color="inherit">Inherit color text</Typography>
    </Stack>
  ),
};

export const SemanticColors: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography color="success" variant="body1">
        ✓ Success message indicating completed action
      </Typography>
      <Typography color="warning" variant="body1">
        ⚠ Warning message for important notices
      </Typography>
      <Typography color="error" variant="body1">
        ✗ Error message for failed operations
      </Typography>
      <Typography color="info" variant="body1">
        ℹ Information message for helpful tips
      </Typography>
    </Stack>
  ),
};

// ===== ALIGNMENT STORIES =====
export const TextAlignment: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography align="left">Left aligned text (default)</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
      <Typography align="justify">
        Justified text that spreads across the full width of the container. 
        This is useful for formal documents and consistent text blocks.
      </Typography>
    </Stack>
  ),
};

// ===== TRANSFORMATION STORIES =====
export const TextTransformations: Story = {
  render: () => (
    <Stack spacing={1}>
      <Typography textTransform="none">None - Original case maintained</Typography>
      <Typography textTransform="capitalize">capitalize - first letter of each word</Typography>
      <Typography textTransform="uppercase">uppercase - all letters uppercase</Typography>
      <Typography textTransform="lowercase">LOWERCASE - all letters lowercase</Typography>
    </Stack>
  ),
};

// ===== FONT WEIGHT STORIES =====
export const FontWeights: Story = {
  render: () => (
    <Stack spacing={1}>
      <Typography fontWeight="light">Light weight (300)</Typography>
      <Typography fontWeight="regular">Regular weight (400)</Typography>
      <Typography fontWeight="medium">Medium weight (500)</Typography>
      <Typography fontWeight="bold">Bold weight (700)</Typography>
      <Typography fontWeight={300}>Numeric weight 300</Typography>
      <Typography fontWeight={400}>Numeric weight 400</Typography>
      <Typography fontWeight={500}>Numeric weight 500</Typography>
      <Typography fontWeight={700}>Numeric weight 700</Typography>
    </Stack>
  ),
};

// ===== INTERACTIVE STORIES =====
export const InteractiveText: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography 
        color="primary" 
        onClick={fn()} 
        sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
      >
        Clickable text that responds to hover and click events
      </Typography>
      <Typography 
        role="button"
        tabIndex={0}
        color="secondary"
        onClick={fn()}
        sx={{ cursor: 'pointer' }}
      >
        Text with button role for accessibility
      </Typography>
      <Typography 
        component="a"
        href="#"
        color="info"
        sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
      >
        Link text with hover effects
      </Typography>
    </Stack>
  ),
};

// ===== GRADIENT STORIES =====
export const GradientText: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography 
        variant="h2" 
        sx={{ 
          background: GRADIENT_PRESETS.primary,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        Primary Gradient Heading
      </Typography>
      <Typography 
        variant="h3" 
        sx={{ 
          background: GRADIENT_PRESETS.secondary,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        Secondary Gradient Text
      </Typography>
      <Typography 
        variant="h4" 
        sx={{ 
          background: GRADIENT_PRESETS.hero,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        Hero Gradient Effect
      </Typography>
    </Stack>
  ),
};

// ===== TRUNCATION STORIES =====
export const TextTruncation: Story = {
  render: () => (
    <Box sx={{ width: 300 }}>
      <Stack spacing={2}>
        <Typography noWrap>
          This is a very long text that will be truncated with ellipsis when it exceeds the container width
        </Typography>
        <Typography maxLines={2}>
          This is a multi-line text that will be truncated after exactly two lines. 
          It demonstrates the maxLines property which uses CSS line clamping to create 
          clean truncation with ellipsis at the end of the specified number of lines.
        </Typography>
        <Typography maxLines={3}>
          This example shows three-line truncation which is commonly used for preview text, 
          card descriptions, and list items where you want to show more content while maintaining 
          a consistent layout. The text will wrap naturally until it reaches the third line, 
          then truncate with an ellipsis to indicate there's more content available.
        </Typography>
      </Stack>
    </Box>
  ),
};

// ===== RESPONSIVE STORIES =====
export const ResponsiveTypography: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="h1" responsive>
        Responsive Heading 1 - Scales with screen size
      </Typography>
      <Typography variant="h2" responsive>
        Responsive Heading 2 - Adapts to viewport
      </Typography>
      <Typography variant="body1" responsive paragraph>
        Responsive body text that automatically adjusts font size based on screen size. 
        This ensures optimal readability across all devices from mobile to desktop.
      </Typography>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography that scales responsively. Resize your browser window to see the effect.',
      },
    },
  },
};

// ===== ACCESSIBILITY STORIES =====
export const AccessibilityFeatures: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography 
        variant="h2" 
        component="h1" 
        aria-level={1}
        id="main-heading"
      >
        Accessible Main Heading
      </Typography>
      <Typography 
        variant="body1" 
        aria-describedby="main-heading"
        role="main"
      >
        This content is properly associated with the heading above through ARIA attributes.
      </Typography>
      <Typography 
        variant="caption" 
        color="text.secondary"
        aria-label="Additional context information"
      >
        Screen reader accessible caption with custom aria-label
      </Typography>
      <Typography 
        variant="body2"
        tabIndex={0}
        sx={{ 
          outline: 'none',
          '&:focus-visible': { 
            outline: '2px solid #1976d2',
            outlineOffset: '2px',
            borderRadius: 1
          }
        }}
      >
        Focusable text with enhanced focus indicators for keyboard navigation
      </Typography>
    </Stack>
  ),
};

// ===== COMPONENT VARIANTS =====
export const SpecializedComponents: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <LabelTypography>Form Label</LabelTypography>
        <BodyTypography>
          This demonstrates the specialized typography components that provide 
          pre-configured variants for common use cases.
        </BodyTypography>
      </Box>
      
      <Box>
        <HeadingTypography variant="h3">
          Section Heading
        </HeadingTypography>
        <BodyTypography>
          HeadingTypography provides semantic heading structure with proper spacing.
        </BodyTypography>
      </Box>
      
      <Box>
        <CaptionTypography>
          Image caption or supplementary information
        </CaptionTypography>
      </Box>
    </Stack>
  ),
};

// ===== REAL-WORLD USAGE STORIES =====
export const ArticleLayout: Story = {
  render: () => (
    <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
      <HeadingTypography variant="h1" gutterBottom>
        The Future of Web Typography
      </HeadingTypography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Exploring modern approaches to readable and accessible text on the web
      </Typography>
      
      <Typography variant="overline" color="primary" display="block" gutterBottom>
        DESIGN • 5 MIN READ
      </Typography>
      
      <BodyTypography>
        Typography is one of the most important aspects of web design. It affects readability, 
        user experience, and the overall aesthetic of your website. Modern web typography 
        goes beyond just selecting fonts.
      </BodyTypography>
      
      <HeadingTypography variant="h2" gutterBottom>
        Key Principles
      </HeadingTypography>
      
      <BodyTypography>
        Good typography should be readable, accessible, and enhance the user's understanding 
        of the content. It should create hierarchy and guide users through the information 
        architecture of your site.
      </BodyTypography>
      
      <CaptionTypography sx={{ mt: 2, fontStyle: 'italic' }}>
        Published on March 15, 2024 • Updated March 20, 2024
      </CaptionTypography>
    </Box>
  ),
};

export const UserInterface: Story = {
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <HeadingTypography variant="h4" gutterBottom>
        Account Settings
      </HeadingTypography>
      
      <Stack spacing={2}>
        <Box>
          <LabelTypography component="label" htmlFor="email">
            Email Address
          </LabelTypography>
          <Typography variant="body2" color="text.secondary">
            user@example.com
          </Typography>
        </Box>
        
        <Box>
          <LabelTypography component="label">
            Notification Preferences
          </LabelTypography>
          <Typography variant="body2" color="text.secondary">
            Receive updates about your account
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTime fontSize="small" color="action" />
          <CaptionTypography>
            Last updated 2 hours ago
          </CaptionTypography>
        </Box>
      </Stack>
    </Paper>
  ),
};

// ===== THEME INTEGRATION =====
export const ThemeIntegration: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="h3" gutterBottom>
        Theme Integration
      </Typography>
      <Typography variant="body1" paragraph>
        Typography seamlessly integrates with the Material-UI theme system, 
        supporting both light and dark modes with proper contrast ratios.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        All color variants respect the theme palette and provide consistent 
        visual hierarchy across your application.
      </Typography>
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

// ===== PERFORMANCE STORIES =====
export const PerformanceOptimized: Story = {
  render: () => (
    <Stack spacing={1}>
      {Array.from({ length: 50 }, (_, i) => (
        <Typography key={i} variant="body2">
          Performance optimized typography item {i + 1} - Uses React.memo for efficient re-rendering
        </Typography>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Large list demonstrating memoized typography components for optimal performance.',
      },
    },
  },
};