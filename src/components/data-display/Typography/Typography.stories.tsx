import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Divider } from '@/components/data-display/Divider'; // Replaced MUI Divider with internal wrapper as per migration guidelines
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Paper } from '@/components/surfaces/Paper';

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
// Note: Using MUI Divider temporarily until we create a wrapper component

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
    onClick: { 
      action: 'clicked',
      description: 'Callback fired when click occurs',
    },
  },
  args: {
    children: 'Typography text content',
  
    onClick: fn(),
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
  render: (args) => (
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
          {/* TODO: Replace with internal icon wrapper */}
          <Typography variant="caption" color="action">
            Last updated 2 hours ago
          </Typography>
        </Box>
      </Stack>
    </Paper>
  ),
};

// ===== THEME INTEGRATION =====
export const ThemeIntegration: Story = {
  render: (args) => (
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
  render: (args) => (
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

// ===== MISSING MANDATORY CATEGORIES =====

// ===== VARIANTS =====
export const Variants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h1">h1. Heading Level 1</Typography>
        <Typography variant="h2">h2. Heading Level 2</Typography>
        <Typography variant="h3">h3. Heading Level 3</Typography>
        <Typography variant="h4">h4. Heading Level 4</Typography>
        <Typography variant="h5">h5. Heading Level 5</Typography>
        <Typography variant="h6">h6. Heading Level 6</Typography>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>subtitle1. Large subtitle text</Typography>
        <Typography variant="subtitle2" gutterBottom>subtitle2. Medium subtitle text</Typography>
        <Typography variant="body1" paragraph>body1. Primary body text with good readability and comfortable line height for longer content.</Typography>
        <Typography variant="body2" paragraph>body2. Secondary body text, often used for less prominent content or additional information.</Typography>
        <Typography variant="button">BUTTON TEXT</Typography>
        <Typography variant="caption" display="block">caption. Small text for annotations</Typography>
        <Typography variant="overline" display="block">OVERLINE TEXT</Typography>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Specialized Variants</Typography>
        <HeadingTypography level={2}>Custom Heading Component</HeadingTypography>
        <BodyTypography>Custom Body Component with enhanced features</BodyTypography>
        <CaptionTypography>Custom Caption Component</CaptionTypography>
        <LabelTypography>Custom Label Component</LabelTypography>
      </Paper>
    </Stack>
  ),
};

// ===== STATES =====
export const States: Story = {
  render: (args) => (
    <Stack spacing={3}>
      {/* Normal State */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Normal State</Typography>
        <Typography variant="h4" gutterBottom>Heading Typography</Typography>
        <Typography variant="body1" paragraph>
          Typography in normal state with full readability and proper contrast ratios for accessibility.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Secondary text with appropriate color hierarchy and semantic meaning.
        </Typography>
      </Paper>
      
      {/* Hover State */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Hover State</Typography>
        <Typography 
          variant="h5" 
          component="span"
          href="#"
          onClick={fn()}
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            display: 'block',
            marginBottom: 2,
            '&:hover': {
              color: 'primary.dark',
              textDecoration: 'underline',
              transform: 'translateY(-1px)',
            }
          }}
        >
          Interactive Heading with Hover Effects
        </Typography>
        <Typography 
          variant="body1" 
          component="span"
          sx={{
            color: 'secondary.main',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: 'secondary.dark',
              backgroundColor: 'secondary.light',
              padding: '2px 4px',
              borderRadius: '4px',
            }
          }}
          onClick={fn()}
        >
          Hover over this text to see background highlighting and color changes.
        </Typography>
      </Paper>
      
      {/* Focus State */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Focus State</Typography>
        <Typography 
          variant="body1" 
          component="span" // TODO: button semantics
          tabIndex={0}
          onClick={fn()}
          sx={{
            border: 'none',
            background: 'none',
            color: 'info.main',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '4px',
            transition: 'all 0.2s ease-in-out',
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '2px',
              backgroundColor: 'info.light',
              color: 'info.dark',
            }
          }}
        >
          Tab to this button text to see focus outline and background changes
        </Typography>
        <br />
        <Typography 
          variant="body2" 
          component="a" // TODO: anchor semantics
          href="#"
          onClick={fn()}
          sx={{
            color: 'primary.main',
            textDecoration: 'underline',
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '2px',
              backgroundColor: 'primary.light',
              color: 'primary.dark',
              padding: '2px 4px',
              borderRadius: '4px',
            }
          }}
        >
          Focusable link text with accessibility indicators
        </Typography>
      </Paper>
      
      {/* Active State */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Active State</Typography>
        <Typography 
          variant="h5" 
          component="span" // TODO: button semantics
          onClick={fn()}
          sx={{
            border: 'none',
            background: 'none',
            color: 'success.main',
            cursor: 'pointer',
            transition: 'all 0.1s ease-in-out',
            padding: '8px 16px',
            borderRadius: '8px',
            marginBottom: 2,
            display: 'block',
            '&:active': {
              transform: 'scale(0.98)',
              backgroundColor: 'success.main',
              color: 'success.contrastText',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
            }
          }}
        >
          Click and Hold for Active State
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Press and hold the heading above to see active state feedback.
        </Typography>
      </Paper>
      
      {/* Disabled State */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Disabled State</Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'text.disabled',
            opacity: 0.6,
            filter: 'grayscale(0.3)',
          }}
        >
          Disabled Heading Text
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.disabled',
            opacity: 0.6,
            pointerEvents: 'none',
            cursor: 'not-allowed',
          }}
        >
          Disabled typography with reduced opacity and no user interactions.
        </Typography>
        <Typography 
          variant="body2" 
          color="text.disabled"
          sx={{ mt: 1 }}
        >
          All text styling maintains proper semantic hierarchy even in disabled state.
        </Typography>
      </Paper>
      
      {/* Loading State */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Loading State</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
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
          <Typography variant="body1" color="text.secondary">
            Loading content...
          </Typography>
        </Box>
        {/* Skeleton text */}
        <Stack spacing={1}>
          <Box 
            sx={{ 
              height: 24, 
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
          <Box 
            sx={{ 
              height: 16, 
              width: '80%',
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
          <Box 
            sx={{ 
              height: 16, 
              width: '60%',
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
        </Stack>
      </Paper>
      
      {/* Error State */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Error State</Typography>
        <Typography 
          variant="h5" 
          color="error.main"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
        >
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
              flexShrink: 0,
            }}
          >
            !
          </Box>
          Error Message Heading
        </Typography>
        <Typography variant="body1" color="error.main" paragraph>
          Error text with appropriate error color for validation messages and warnings.
        </Typography>
        <Typography variant="body2" color="error.dark">
          Additional error details with slightly darker error color for hierarchy.
        </Typography>
      </Paper>
      
      {/* Success State */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Success State</Typography>
        <Typography 
          variant="h5" 
          color="success.main"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
        >
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
              flexShrink: 0,
            }}
          >
            ✓
          </Box>
          Success Message Heading
        </Typography>
        <Typography variant="body1" color="success.main" paragraph>
          Success text with positive color indicating successful completion.
        </Typography>
        <Typography variant="body2" color="success.dark">
          Additional success details with darker success color for better hierarchy.
        </Typography>
      </Paper>
      
      {/* Warning State */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Warning State</Typography>
        <Typography 
          variant="h5" 
          color="warning.main"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
        >
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
              flexShrink: 0,
            }}
          >
            ⚠
          </Box>
          Warning Message Heading
        </Typography>
        <Typography variant="body1" color="warning.main" paragraph>
          Warning text with attention-grabbing color for important notifications.
        </Typography>
        <Typography variant="body2" color="warning.dark">
          Additional warning details with darker warning color for proper text hierarchy.
        </Typography>
      </Paper>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all interaction and status states for Typography including normal, hover, focus, active, disabled, loading, error, success, and warning states. Each state provides appropriate visual feedback and maintains accessibility standards.',
      },
    },
  },
};

// ===== BOOLEAN PROPS =====
export const BooleanProps: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>noWrap Property</Typography>
        <Box sx={{ width: 200, border: '1px dashed grey.300', p: 1, mb: 2 }}>
          <Typography variant="body1" noWrap={false}>
            noWrap: false - This long text will wrap to multiple lines when it exceeds the container width.
          </Typography>
        </Box>
        <Box sx={{ width: 200, border: '1px dashed grey.300', p: 1 }}>
          <Typography variant="body1" noWrap={true}>
            noWrap: true - This long text will be truncated with ellipsis when it exceeds container width.
          </Typography>
        </Box>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>paragraph Property</Typography>
        <Typography variant="body1" paragraph={false}>
          paragraph: false - No bottom margin applied to this text.
        </Typography>
        <Typography variant="body1" paragraph={true}>
          paragraph: true - Bottom margin applied for paragraph spacing.
        </Typography>
        <Typography variant="body1">Following text to show spacing difference.</Typography>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>gutterBottom Property</Typography>
        <Typography variant="h4" gutterBottom={false}>
          gutterBottom: false
        </Typography>
        <Typography variant="body2">No gutter bottom margin applied above.</Typography>
        
        <Typography variant="h4" gutterBottom={true}>
          gutterBottom: true
        </Typography>
        <Typography variant="body2">Gutter bottom margin applied above for proper spacing.</Typography>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>responsive Property</Typography>
        <Typography variant="h3" responsive={false} gutterBottom>
          responsive: false - Fixed size
        </Typography>
        <Typography variant="h3" responsive={true} gutterBottom>
          responsive: true - Scales with breakpoints
        </Typography>
        <Typography variant="body2">Resize the viewport to see the difference in responsive scaling.</Typography>
      </Paper>
    </Stack>
  ),
};

// ===== SIZES =====  
export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Custom Font Sizes</Typography>
        <Typography variant="h4" fontSize="1rem" gutterBottom>
          fontSize: 1rem - Small heading
        </Typography>
        <Typography variant="h4" fontSize="1.5rem" gutterBottom>
          fontSize: 1.5rem - Medium heading  
        </Typography>
        <Typography variant="h4" fontSize="2rem" gutterBottom>
          fontSize: 2rem - Large heading
        </Typography>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Custom Line Heights</Typography>
        <Typography variant="body1" lineHeight={1.2} paragraph>
          lineHeight: 1.2 - Tight line spacing for compact text that needs to fit in limited space while maintaining readability.
        </Typography>
        <Typography variant="body1" lineHeight={1.6} paragraph>
          lineHeight: 1.6 - Standard line spacing for optimal readability in most content scenarios and general purpose text.
        </Typography>
        <Typography variant="body1" lineHeight={2.0} paragraph>
          lineHeight: 2.0 - Loose line spacing for enhanced readability in accessible designs or when extra breathing room is needed.
        </Typography>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Custom Letter Spacing</Typography>
        <Typography variant="h4" letterSpacing={-0.5} gutterBottom>
          letterSpacing: -0.5px - Tight
        </Typography>
        <Typography variant="h4" letterSpacing={0} gutterBottom>
          letterSpacing: 0px - Normal
        </Typography>
        <Typography variant="h4" letterSpacing={2} gutterBottom>
          letterSpacing: 2px - Wide
        </Typography>
      </Paper>
    </Stack>
  ),
};