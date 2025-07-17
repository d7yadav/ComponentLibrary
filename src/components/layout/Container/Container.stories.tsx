import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Button } from '@/components/core/Button';
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

import { 
  CONTAINER_VARIANTS,
  CONTAINER_MAX_WIDTHS,
  CONTAINER_BREAKPOINTS
} from './Container.constants';

import { 
  Container,
  FluidContainer,
  CenteredContainer,
  SectionContainer,
  HeroContainer,
  ContentContainer
} from './';

/**
 * Container provides consistent width constraints and centering for page content.
 * It offers responsive breakpoints and variant configurations for different layout needs.
 * 
 * ## Features
 * - Responsive width constraints with breakpoint support
 * - Multiple variants (fluid, fixed, constrained)
 * - Consistent gutters and padding across devices
 * - Specialized container components for common patterns
 * - Accessibility support with proper landmark roles
 * - Dark theme support via enhanced theme system
 */
const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Responsive container component with consistent width constraints and centering for page content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(CONTAINER_VARIANTS),
      description: 'The container variant that determines width behavior',
    },
    maxWidth: {
      control: 'select',
      options: Object.values(CONTAINER_MAX_WIDTHS),
      description: 'Maximum width constraint for the container',
    },
    fixed: {
      control: 'boolean',
      description: 'Whether to use fixed widths at breakpoints',
    },
    disableGutters: {
      control: 'boolean',
      description: 'Whether to disable horizontal gutters/padding',
    },
    centerContent: {
      control: 'boolean',
      description: 'Whether to center content horizontally',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Whether to take full viewport height',
    },
    elevated: {
      control: 'boolean',
      description: 'Whether to add elevation shadow',
    },
    component: {
      control: 'text',
      description: 'The component used for the root node',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    children: (
      <Box p={3} bgcolor="primary.light" borderRadius={1}>
        <Typography variant="h4" gutterBottom>
          Default Container
        </Typography>
        <Typography variant="body1">
          This is the default container with responsive width constraints and automatic centering.
          Resize your browser window to see how it responds to different screen sizes.
        </Typography>
      </Box>
    ),
    variant: 'fluid',
    maxWidth: 'lg',
  },
};

// ===== CONTAINER VARIANTS =====
export const ContainerVariants: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" align="center" gutterBottom>
        Container Variants
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" paragraph>
        Each variant demonstrates different width and behavior patterns
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>Fluid Container</Typography>
        <Container variant="fluid" maxWidth="lg">
          <Box p={3} bgcolor="primary.light" borderRadius={1}>
            <Typography variant="body1">
              <strong>Fluid Container:</strong> Responsive width that grows and shrinks with the viewport,
              but respects maximum width constraints at larger screen sizes.
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Fixed Container</Typography>
        <Container variant="fixed" maxWidth="md">
          <Box p={3} bgcolor="secondary.light" borderRadius={1}>
            <Typography variant="body1">
              <strong>Fixed Container:</strong> Uses fixed widths at specific breakpoints 
              for more predictable layouts across different screen sizes.
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Constrained Container</Typography>
        <Container variant="constrained" maxWidth="sm">
          <Box p={3} bgcolor="success.light" borderRadius={1}>
            <Typography variant="body1">
              <strong>Constrained Container:</strong> Maintains consistent width constraints 
              with enhanced content-focused design for better readability.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Stack>
  ),
};

// ===== MAX WIDTH OPTIONS =====
export const MaxWidthOptions: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" align="center" gutterBottom>
        Maximum Width Options
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" paragraph>
        Different maximum width constraints for various content types
      </Typography>
      
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((maxWidth) => (
        <Box key={maxWidth}>
          <Typography variant="h6" gutterBottom>
            MaxWidth: {maxWidth.toUpperCase()}
          </Typography>
          <Container maxWidth={maxWidth}>
            <Box 
              p={3} 
              bgcolor="info.light" 
              borderRadius={1}
              border="1px solid"
              borderColor="info.main"
            >
              <Typography variant="body1">
                <strong>{maxWidth.toUpperCase()} Container:</strong> {
                  maxWidth === 'xs' ? 'Extra small - perfect for mobile-first narrow content' :
                  maxWidth === 'sm' ? 'Small - ideal for single-column layouts and forms' :
                  maxWidth === 'md' ? 'Medium - great for article content and documentation' :
                  maxWidth === 'lg' ? 'Large - suitable for most application layouts' :
                  'Extra large - for wide desktop layouts and dashboards'
                }
              </Typography>
            </Box>
          </Container>
        </Box>
      ))}
    </Stack>
  ),
};

// ===== SPECIALIZED CONTAINERS =====
export const SpecializedContainers: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" align="center" gutterBottom>
        Specialized Container Components
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>FluidContainer</Typography>
        <FluidContainer>
          <Box p={3} bgcolor="primary.light" borderRadius={1}>
            <Typography variant="body1">
              <strong>FluidContainer:</strong> Pre-configured fluid container with optimal defaults
              for responsive layouts that need to adapt to any screen size.
            </Typography>
          </Box>
        </FluidContainer>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>CenteredContainer</Typography>
        <CenteredContainer maxWidth="md">
          <Box p={3} bgcolor="secondary.light" borderRadius={1}>
            <Typography variant="body1" align="center">
              <strong>CenteredContainer:</strong> Ensures perfect horizontal centering
              with enhanced spacing for content that needs prominent placement.
            </Typography>
          </Box>
        </CenteredContainer>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>SectionContainer</Typography>
        <SectionContainer>
          <Box p={4} bgcolor="success.light" borderRadius={1}>
            <Typography variant="h5" gutterBottom>Section Title</Typography>
            <Typography variant="body1">
              <strong>SectionContainer:</strong> Designed for page sections with appropriate 
              spacing, padding, and semantic structure for better content organization.
            </Typography>
          </Box>
        </SectionContainer>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>HeroContainer</Typography>
        <HeroContainer>
          <Box p={6} bgcolor="warning.light" borderRadius={1} textAlign="center">
            <Typography variant="h3" gutterBottom>
              Hero Section
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Subtitle for hero content
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>HeroContainer:</strong> Optimized for hero sections with enhanced spacing,
              full-width capabilities, and prominent content presentation.
            </Typography>
            <Button variant="contained" size="large">
              Call to Action
            </Button>
          </Box>
        </HeroContainer>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>ContentContainer</Typography>
        <ContentContainer maxWidth="md">
          <Box p={3} bgcolor="info.light" borderRadius={1}>
            <Typography variant="h5" gutterBottom>Content Title</Typography>
            <Typography variant="body1" paragraph>
              <strong>ContentContainer:</strong> Specifically designed for article content, 
              blog posts, and documentation with optimal line length and reading experience.
            </Typography>
            <Typography variant="body1" paragraph>
              This container maintains ideal text width for readability while providing 
              consistent spacing and typography alignment throughout the content.
            </Typography>
            <Typography variant="body1">
              Perfect for long-form content that needs to be easy to read and well-structured.
            </Typography>
          </Box>
        </ContentContainer>
      </Box>
    </Stack>
  ),
};

// ===== RESPONSIVE BEHAVIOR =====
export const ResponsiveBehavior: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" align="center" gutterBottom>
        Responsive Behavior
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" paragraph>
        Resize your browser window to see how containers adapt to different screen sizes
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>Responsive Padding</Typography>
        <Container 
          maxWidth="lg"
          sx={{
            px: { xs: 1, sm: 2, md: 3, lg: 4 },
            py: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box 
            p={2} 
            bgcolor="primary.light" 
            borderRadius={1}
            border="2px dashed"
            borderColor="primary.main"
          >
            <Typography variant="body1">
              Container with responsive padding: xs=1, sm=2, md=3, lg=4 (horizontal) 
              and xs=2, sm=3, md=4 (vertical)
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Breakpoint Visibility</Typography>
        <Container maxWidth="xl">
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            <Box 
              p={1} 
              bgcolor="error.main" 
              color="white" 
              borderRadius={1}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              XS (Mobile)
            </Box>
            <Box 
              p={1} 
              bgcolor="warning.main" 
              color="white" 
              borderRadius={1}
              sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}
            >
              SM (Tablet)
            </Box>
            <Box 
              p={1} 
              bgcolor="info.main" 
              color="white" 
              borderRadius={1}
              sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}
            >
              MD (Small Desktop)
            </Box>
            <Box 
              p={1} 
              bgcolor="success.main" 
              color="white" 
              borderRadius={1}
              sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}
            >
              LG (Desktop)
            </Box>
            <Box 
              p={1} 
              bgcolor="secondary.main" 
              color="white" 
              borderRadius={1}
              sx={{ display: { xs: 'none', xl: 'block' } }}
            >
              XL (Large Desktop)
            </Box>
          </Stack>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Current breakpoint indicator - resize to see changes
          </Typography>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Fixed vs Fluid Comparison</Typography>
        <Stack spacing={2}>
          <Container variant="fixed" maxWidth="md">
            <Box p={2} bgcolor="secondary.light" borderRadius={1}>
              <Typography variant="body2">
                <strong>Fixed Container:</strong> Uses discrete breakpoint widths
              </Typography>
            </Box>
          </Container>
          <Container variant="fluid" maxWidth="md">
            <Box p={2} bgcolor="primary.light" borderRadius={1}>
              <Typography variant="body2">
                <strong>Fluid Container:</strong> Smoothly scales with viewport
              </Typography>
            </Box>
          </Container>
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== ACCESSIBILITY FEATURES =====
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" align="center" gutterBottom>
        Accessibility Features
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>Semantic Structure</Typography>
        <Container 
          component="main"
          role="main"
          aria-label="Main content area"
          maxWidth="lg"
        >
          <Box p={3} bgcolor="primary.light" borderRadius={1}>
            <Typography variant="body1">
              <strong>Semantic Container:</strong> Uses proper HTML5 semantic elements
              and ARIA attributes for screen reader navigation and accessibility.
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Landmark Roles</Typography>
        <Container 
          component="section"
          role="region"
          aria-labelledby="section-heading"
          maxWidth="md"
        >
          <Box p={3} bgcolor="secondary.light" borderRadius={1}>
            <Typography id="section-heading" variant="h6" gutterBottom>
              Accessible Section
            </Typography>
            <Typography variant="body1">
              Container with landmark role and proper heading association
              for better screen reader navigation and content structure.
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Focus Management</Typography>
        <Container maxWidth="sm">
          <Box 
            p={3} 
            bgcolor="info.light" 
            borderRadius={1}
            tabIndex={0}
            sx={{
              '&:focus-visible': {
                outline: '2px solid #1976d2',
                outlineOffset: '2px',
              }
            }}
          >
            <Typography variant="body1">
              <strong>Focusable Container:</strong> Supports keyboard navigation
              with visible focus indicators (tab to focus this container).
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>High Contrast Support</Typography>
        <Container maxWidth="md">
          <Box 
            p={3} 
            border="2px solid"
            borderColor="text.primary"
            borderRadius={1}
            sx={{
              '@media (prefers-contrast: high)': {
                borderWidth: '3px',
                fontWeight: 'bold',
              }
            }}
          >
            <Typography variant="body1">
              <strong>High Contrast Compatible:</strong> Container adapts styling
              for users with high contrast preferences and visual accessibility needs.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Stack>
  ),
};

// ===== MISSING MANDATORY CATEGORIES =====

// ===== THEMES =====
export const Themes: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" align="center" gutterBottom>
        Container in Different Themes
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>Light Theme Containers</Typography>
        <Stack spacing={2}>
          <Container maxWidth="md">
            <Box 
              p={3} 
              bgcolor="background.paper" 
              color="text.primary"
              border="1px solid" 
              borderColor="divider" 
              borderRadius={1}
            >
              <Typography variant="h6" gutterBottom>Light Theme Standard</Typography>
              <Typography>
                Container optimized for light backgrounds with proper contrast and visibility.
                Uses background.paper with divider borders for subtle definition.
              </Typography>
            </Box>
          </Container>
          
          <Container maxWidth="md" elevated>
            <Box 
              p={3} 
              bgcolor="background.paper" 
              color="text.primary"
              borderRadius={1}
            >
              <Typography variant="h6" gutterBottom>Light Theme Elevated</Typography>
              <Typography>
                Elevated container with shadow for light theme environments.
                The shadow provides depth without overwhelming the design.
              </Typography>
            </Box>
          </Container>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Dark Theme Containers</Typography>
        <Stack spacing={2}>
          <Container maxWidth="md">
            <Box 
              p={3} 
              bgcolor="background.paper" 
              color="text.primary"
              border="1px solid" 
              borderColor="divider" 
              borderRadius={1}
              sx={{
                // Enhanced visibility for dark theme
                '@media (prefers-color-scheme: dark)': {
                  borderColor: 'grey.700',
                }
              }}
            >
              <Typography variant="h6" gutterBottom>Dark Theme Standard</Typography>
              <Typography>
                Container adapted for dark backgrounds with enhanced border visibility 
                and proper contrast ratios for improved readability.
              </Typography>
            </Box>
          </Container>
          
          <Container maxWidth="md" elevated>
            <Box 
              p={3} 
              bgcolor="background.paper" 
              color="text.primary"
              borderRadius={1}
            >
              <Typography variant="h6" gutterBottom>Dark Theme Elevated</Typography>
              <Typography>
                Elevated container with dark-theme optimized shadows that provide
                depth without creating harsh contrasts against dark backgrounds.
              </Typography>
            </Box>
          </Container>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Theme-Aware Specialized Containers</Typography>
        <Stack spacing={2}>
          <HeroContainer>
            <Box 
              p={4} 
              bgcolor="primary.main" 
              color="primary.contrastText"
              borderRadius={2}
              textAlign="center"
            >
              <Typography variant="h4" gutterBottom>
                Theme-Aware Hero
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }} gutterBottom>
                Adapts to both light and dark themes
              </Typography>
              <Typography>
                Hero container that maintains optimal contrast and readability
                across different theme variations with proper color adaptation.
              </Typography>
            </Box>
          </HeroContainer>
          
          <SectionContainer>
            <Box 
              p={3} 
              bgcolor="background.default" 
              color="text.primary"
              border="2px solid" 
              borderColor="primary.main" 
              borderRadius={1}
            >
              <Typography variant="h6" gutterBottom>
                Theme-Responsive Section
              </Typography>
              <Typography>
                Section container with theme-aware borders and backgrounds that
                automatically adjust to provide optimal contrast and visual hierarchy.
              </Typography>
            </Box>
          </SectionContainer>
          
          <ContentContainer maxWidth="sm">
            <Box 
              p={3} 
              bgcolor="action.hover" 
              color="text.primary"
              borderRadius={1}
            >
              <Typography variant="h6" gutterBottom>
                Content-Focused Theme
              </Typography>
              <Typography>
                Content container using action.hover background that provides
                subtle distinction while maintaining excellent readability in both themes.
              </Typography>
            </Box>
          </ContentContainer>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates Container components in both light and dark themes with proper contrast, theme-aware styling, and specialized container variants.',
      },
    },
  },
};

// ===== VARIANTS =====
export const Variants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Container Variants</Typography>
      
      <Container variant="fluid" maxWidth="lg">
        <Box p={2} bgcolor="primary.light" borderRadius={1}>
          <Typography><strong>Fluid Variant:</strong> Responsive container that grows and shrinks smoothly with viewport changes</Typography>
        </Box>
      </Container>
      
      <Container variant="fixed" maxWidth="lg">
        <Box p={2} bgcolor="secondary.light" borderRadius={1}>
          <Typography><strong>Fixed Variant:</strong> Uses discrete breakpoint widths for predictable layouts</Typography>
        </Box>
      </Container>
      
      <Container variant="constrained" maxWidth="lg">
        <Box p={2} bgcolor="success.light" borderRadius={1}>
          <Typography><strong>Constrained Variant:</strong> Enhanced constraints for content-focused layouts</Typography>
        </Box>
      </Container>
    </Stack>
  ),
};

// ===== STATES =====
export const States: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Container States</Typography>
      
      <Container maxWidth="md">
        <Box p={2} bgcolor="background.paper" border="1px solid" borderColor="divider" borderRadius={1}>
          <Typography><strong>Normal State:</strong> Standard container with default styling and behavior</Typography>
        </Box>
      </Container>
      
      <Container maxWidth="md" elevated>
        <Box p={2} bgcolor="background.paper" borderRadius={1}>
          <Typography><strong>Elevated State:</strong> Container with shadow elevation for visual separation</Typography>
        </Box>
      </Container>
      
      <Container maxWidth="md" fullHeight sx={{ minHeight: 200, display: 'flex', alignItems: 'center' }}>
        <Box p={2} bgcolor="primary.light" borderRadius={1} width="100%">
          <Typography><strong>Full Height State:</strong> Container that takes full viewport height</Typography>
        </Box>
      </Container>
      
      <Container maxWidth="md" centerContent>
        <Box p={2} bgcolor="secondary.light" borderRadius={1} width="fit-content">
          <Typography><strong>Centered Content State:</strong> Content is perfectly centered within container</Typography>
        </Box>
      </Container>
    </Stack>
  ),
};

// ===== BOOLEAN PROPS =====
export const BooleanProps: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Boolean Properties</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>fixed Property</Typography>
        <Stack spacing={1}>
          <Container fixed={false} maxWidth="md">
            <Box p={1} bgcolor="primary.light" borderRadius={1}>
              <Typography variant="caption">fixed: false - fluid responsive behavior</Typography>
            </Box>
          </Container>
          <Container fixed={true} maxWidth="md">
            <Box p={1} bgcolor="primary.main" color="white" borderRadius={1}>
              <Typography variant="caption">fixed: true - discrete breakpoint widths</Typography>
            </Box>
          </Container>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>disableGutters Property</Typography>
        <Stack spacing={1}>
          <Container disableGutters={false} maxWidth="sm">
            <Box p={1} bgcolor="secondary.light" borderRadius={1}>
              <Typography variant="caption">disableGutters: false - includes horizontal padding</Typography>
            </Box>
          </Container>
          <Container disableGutters={true} maxWidth="sm">
            <Box p={1} bgcolor="secondary.main" color="white" borderRadius={1}>
              <Typography variant="caption">disableGutters: true - no horizontal padding</Typography>
            </Box>
          </Container>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>centerContent Property</Typography>
        <Stack spacing={1}>
          <Container centerContent={false} maxWidth="sm">
            <Box p={1} bgcolor="success.light" borderRadius={1} width="fit-content">
              <Typography variant="caption">centerContent: false - natural alignment</Typography>
            </Box>
          </Container>
          <Container centerContent={true} maxWidth="sm">
            <Box p={1} bgcolor="success.main" color="white" borderRadius={1} width="fit-content">
              <Typography variant="caption">centerContent: true - horizontally centered</Typography>
            </Box>
          </Container>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>elevated Property</Typography>
        <Stack spacing={1}>
          <Container elevated={false} maxWidth="sm">
            <Box p={2} bgcolor="background.paper" border="1px solid" borderColor="divider" borderRadius={1}>
              <Typography variant="caption">elevated: false - flat appearance without shadow</Typography>
            </Box>
          </Container>
          <Container elevated={true} maxWidth="sm">
            <Box p={2} bgcolor="background.paper" borderRadius={1}>
              <Typography variant="caption">elevated: true - shadow elevation effect</Typography>
            </Box>
          </Container>
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== SIZES =====
export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Container Sizes</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Extra Small (xs)</Typography>
        <Container maxWidth="xs">
          <Box p={2} bgcolor="error.light" borderRadius={1} textAlign="center">
            <Typography variant="caption">Max Width: xs (~444px) - Mobile content, forms</Typography>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Small (sm)</Typography>
        <Container maxWidth="sm">
          <Box p={2} bgcolor="warning.light" borderRadius={1} textAlign="center">
            <Typography variant="caption">Max Width: sm (~600px) - Tablet portrait, narrow content</Typography>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Medium (md)</Typography>
        <Container maxWidth="md">
          <Box p={2} bgcolor="info.light" borderRadius={1} textAlign="center">
            <Typography variant="caption">Max Width: md (~900px) - Tablet landscape, articles</Typography>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Large (lg)</Typography>
        <Container maxWidth="lg">
          <Box p={2} bgcolor="success.light" borderRadius={1} textAlign="center">
            <Typography variant="caption">Max Width: lg (~1200px) - Desktop, most applications</Typography>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Extra Large (xl)</Typography>
        <Container maxWidth="xl">
          <Box p={2} bgcolor="secondary.light" borderRadius={1} textAlign="center">
            <Typography variant="caption">Max Width: xl (~1536px) - Large desktop, dashboards</Typography>
          </Box>
        </Container>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>False (No Constraint)</Typography>
        <Container maxWidth={false}>
          <Box p={2} bgcolor="primary.light" borderRadius={1} textAlign="center">
            <Typography variant="caption">Max Width: false - Full width, no constraints</Typography>
          </Box>
        </Container>
      </Box>
    </Stack>
  ),
};