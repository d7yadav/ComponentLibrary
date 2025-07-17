import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Button } from '@/components/core/Button';
import { Typography } from '@/components/data-display/Typography';
import { Stack } from '@/components/layout/Stack';

import { 
  BOX_DISPLAYS,
  BOX_POSITIONS,
  BOX_FLEX_DIRECTIONS,
  BOX_JUSTIFY_CONTENTS,
  BOX_ALIGN_ITEMS,
  COMMON_BOX_PATTERNS,
  BOX_SPACING_VALUES
} from './Box.constants';

import { 
  Box,
  FlexBox,
  FlexCenterBox,
  FlexBetweenBox,
  FlexColumnBox,
  GridBox,
  GridCenterBox,
  CardBox,
  HeroBox,
  SectionBox,
  ContainerBox,
  SidebarBox,
  OverlayBox,
  AspectRatioBox,
  StickyBox,
  ScrollableBox,
  ClickableBox
} from './';

/**
 * Box is a versatile layout component that provides comprehensive styling utilities.
 * It serves as a building block for creating flexible layouts with responsive design support.
 * 
 * ## Features
 * - General-purpose styling with spacing, sizing, positioning
 * - Responsive prop support for all style properties
 * - Flexbox and CSS Grid utilities built-in
 * - Custom styling shortcuts (centered, rounded, elevated)
 * - Accessibility support with ARIA attributes
 * - Performance optimized with shouldForwardProp
 * - Dark theme support via enhanced theme system
 */
const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Versatile layout component with comprehensive styling utilities and responsive design support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    component: {
      control: 'text',
      description: 'The component used for the root node',
    },
    display: {
      control: 'select',
      options: Object.values(BOX_DISPLAYS),
      description: 'CSS display property',
    },
    position: {
      control: 'select',
      options: Object.values(BOX_POSITIONS),
      description: 'CSS position property',
    },
    flexDirection: {
      control: 'select',
      options: Object.values(BOX_FLEX_DIRECTIONS),
      description: 'CSS flex-direction property',
    },
    justifyContent: {
      control: 'select',
      options: Object.values(BOX_JUSTIFY_CONTENTS),
      description: 'CSS justify-content property',
    },
    alignItems: {
      control: 'select',
      options: Object.values(BOX_ALIGN_ITEMS),
      description: 'CSS align-items property',
    },
    centered: {
      control: 'boolean',
      description: 'Centers content both horizontally and vertically',
    },
    rounded: {
      control: 'boolean',
      description: 'Applies rounded corners',
    },
    elevated: {
      control: 'boolean',
      description: 'Adds elevation shadow',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Takes full width of container',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Takes full height of container',
    },
    clickable: {
      control: 'boolean',
      description: 'Makes the box interactive with cursor pointer',
    },
    p: {
      control: 'select',
      options: BOX_SPACING_VALUES,
      description: 'Padding on all sides',
    },
    m: {
      control: 'select',
      options: BOX_SPACING_VALUES,
      description: 'Margin on all sides',
    },
    bgcolor: {
      control: 'color',
      description: 'Background color',
    },
    color: {
      control: 'color',
      description: 'Text color',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    children: 'Default Box component with basic styling',
    p: 2,
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1,
  
    onClick: fn(),
  },
};

// ===== SPACING SYSTEM =====
export const SpacingSystem: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Spacing System</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Padding Examples</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {[0, 1, 2, 3, 4].map((spacing) => (
            <Box 
              key={spacing} 
              p={spacing} 
              bgcolor="primary.light" 
              border="1px solid"
              borderColor="primary.main"
              borderRadius={1}
              sx={{ minWidth: 60, textAlign: 'center' }}
            >
              <Typography variant="caption">p={spacing}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Margin Examples</Typography>
        <Box bgcolor="grey.100" p={2} borderRadius={1}>
          {[0, 1, 2, 3, 4].map((spacing) => (
            <Box 
              key={spacing} 
              m={spacing} 
              p={1}
              bgcolor="secondary.light" 
              border="1px solid"
              borderColor="secondary.main"
              borderRadius={1}
              display="inline-block"
              sx={{ minWidth: 60, textAlign: 'center' }}
            >
              <Typography variant="caption">m={spacing}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== DISPLAY VARIANTS =====
export const DisplayVariants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Display Variants</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Block Display</Typography>
        <Box display="block" bgcolor="info.light" p={2} borderRadius={1} mb={1}>
          Block element takes full width
        </Box>
        <Box display="block" bgcolor="info.light" p={2} borderRadius={1}>
          Another block element on new line
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Inline-block Display</Typography>
        <Box display="inline-block" bgcolor="warning.light" p={2} borderRadius={1} mr={1}>
          Inline-block 1
        </Box>
        <Box display="inline-block" bgcolor="warning.light" p={2} borderRadius={1}>
          Inline-block 2
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Flex Display</Typography>
        <Box display="flex" gap={2}>
          <Box bgcolor="success.light" p={2} borderRadius={1} flex={1}>
            Flex item 1
          </Box>
          <Box bgcolor="success.light" p={2} borderRadius={1} flex={1}>
            Flex item 2
          </Box>
          <Box bgcolor="success.light" p={2} borderRadius={1} flex={1}>
            Flex item 3
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Grid Display</Typography>
        <Box 
          display="grid" 
          gridTemplateColumns="repeat(3, 1fr)" 
          gap={2}
        >
          <Box bgcolor="error.light" p={2} borderRadius={1}>Grid 1</Box>
          <Box bgcolor="error.light" p={2} borderRadius={1}>Grid 2</Box>
          <Box bgcolor="error.light" p={2} borderRadius={1}>Grid 3</Box>
          <Box bgcolor="error.light" p={2} borderRadius={1}>Grid 4</Box>
          <Box bgcolor="error.light" p={2} borderRadius={1}>Grid 5</Box>
          <Box bgcolor="error.light" p={2} borderRadius={1}>Grid 6</Box>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== FLEXBOX UTILITIES =====
export const FlexboxUtilities: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Flexbox Utilities</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Justify Content</Typography>
        <Stack spacing={1}>
          {['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map((justify) => (
            <Box key={justify}>
              <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
                justifyContent: {justify}
              </Typography>
              <Box 
                display="flex" 
                justifyContent={justify as any}
                bgcolor="grey.100" 
                p={1} 
                borderRadius={1}
                minHeight={60}
              >
                <Box bgcolor="primary.main" color="white" p={1} borderRadius={0.5}>A</Box>
                <Box bgcolor="secondary.main" color="white" p={1} borderRadius={0.5}>B</Box>
                <Box bgcolor="success.main" color="white" p={1} borderRadius={0.5}>C</Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Align Items</Typography>
        <Stack spacing={1}>
          {['flex-start', 'center', 'flex-end', 'stretch', 'baseline'].map((align) => (
            <Box key={align}>
              <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
                alignItems: {align}
              </Typography>
              <Box 
                display="flex" 
                alignItems={align as any}
                bgcolor="grey.100" 
                p={1} 
                borderRadius={1}
                minHeight={80}
              >
                <Box bgcolor="primary.main" color="white" p={1} borderRadius={0.5} height={30}>A</Box>
                <Box bgcolor="secondary.main" color="white" p={1} borderRadius={0.5} height={50}>B</Box>
                <Box bgcolor="success.main" color="white" p={1} borderRadius={0.5} height={40}>C</Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Flex Direction</Typography>
        <Box display="flex" gap={2}>
          <Box flex={1}>
            <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
              flexDirection: row
            </Typography>
            <Box 
              display="flex" 
              flexDirection="row"
              bgcolor="grey.100" 
              p={1} 
              borderRadius={1}
              gap={1}
            >
              <Box bgcolor="info.main" color="white" p={1} borderRadius={0.5}>1</Box>
              <Box bgcolor="info.main" color="white" p={1} borderRadius={0.5}>2</Box>
              <Box bgcolor="info.main" color="white" p={1} borderRadius={0.5}>3</Box>
            </Box>
          </Box>
          <Box flex={1}>
            <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>
              flexDirection: column
            </Typography>
            <Box 
              display="flex" 
              flexDirection="column"
              bgcolor="grey.100" 
              p={1} 
              borderRadius={1}
              gap={1}
            >
              <Box bgcolor="warning.main" color="white" p={1} borderRadius={0.5}>1</Box>
              <Box bgcolor="warning.main" color="white" p={1} borderRadius={0.5}>2</Box>
              <Box bgcolor="warning.main" color="white" p={1} borderRadius={0.5}>3</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== SPECIALIZED BOX COMPONENTS =====
export const SpecializedComponents: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Specialized Box Components</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>FlexBox</Typography>
        <FlexBox gap={2} p={2} bgcolor="primary.light" borderRadius={1}>
          <Box bgcolor="white" p={1} borderRadius={0.5}>Item 1</Box>
          <Box bgcolor="white" p={1} borderRadius={0.5}>Item 2</Box>
          <Box bgcolor="white" p={1} borderRadius={0.5}>Item 3</Box>
        </FlexBox>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>FlexCenterBox</Typography>
        <FlexCenterBox p={3} bgcolor="secondary.light" borderRadius={1} minHeight={100}>
          <Typography>Perfectly Centered Content</Typography>
        </FlexCenterBox>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>FlexBetweenBox</Typography>
        <FlexBetweenBox p={2} bgcolor="success.light" borderRadius={1}>
          <Typography>Left Content</Typography>
          <Typography>Right Content</Typography>
        </FlexBetweenBox>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>GridBox</Typography>
        <GridBox 
          gridTemplateColumns="repeat(auto-fit, minmax(120px, 1fr))" 
          gap={2} 
          p={2} 
          bgcolor="warning.light" 
          borderRadius={1}
        >
          <Box bgcolor="white" p={2} borderRadius={0.5}>Grid 1</Box>
          <Box bgcolor="white" p={2} borderRadius={0.5}>Grid 2</Box>
          <Box bgcolor="white" p={2} borderRadius={0.5}>Grid 3</Box>
          <Box bgcolor="white" p={2} borderRadius={0.5}>Grid 4</Box>
        </GridBox>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>CardBox</Typography>
        <CardBox p={3} maxWidth={300}>
          <Typography variant="h6" gutterBottom>Card Title</Typography>
          <Typography variant="body2">
            This is a card-style box with proper elevation and spacing.
          </Typography>
          <Button sx={{ mt: 2 }} size="small">Action</Button>
        </CardBox>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>AspectRatioBox</Typography>
        <AspectRatioBox ratio="16:9" maxWidth={400} bgcolor="info.light" borderRadius={1}>
          <FlexCenterBox height="100%">
            <Typography>16:9 Aspect Ratio</Typography>
          </FlexCenterBox>
        </AspectRatioBox>
      </Box>
    </Stack>
  ),
};

// ===== RESPONSIVE DESIGN =====
export const ResponsiveDesign: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Responsive Design</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Resize your browser window to see responsive behavior.
      </Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Responsive Padding</Typography>
        <Box 
          p={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          bgcolor="primary.light" 
          borderRadius={1}
          border="2px dashed"
          borderColor="primary.main"
        >
          <Typography>
            Padding changes based on screen size: xs=1, sm=2, md=3, lg=4
          </Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Responsive Display</Typography>
        <Box 
          display={{ xs: 'block', md: 'flex' }}
          gap={2}
        >
          <Box bgcolor="secondary.light" p={2} borderRadius={1} flex={1}>
            <Typography>Block on mobile, flex on desktop</Typography>
          </Box>
          <Box bgcolor="secondary.light" p={2} borderRadius={1} flex={1}>
            <Typography>Responsive layout item 2</Typography>
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Responsive Sizing</Typography>
        <Box 
          width={{ xs: '100%', sm: '75%', md: '50%', lg: '25%' }}
          height={80}
          bgcolor="success.light" 
          borderRadius={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" align="center">
            Width: xs=100%, sm=75%, md=50%, lg=25%
          </Typography>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== INTERACTIVE EXAMPLES =====
export const InteractiveExamples: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Interactive Examples</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Clickable Box</Typography>
        <ClickableBox 
          p={2} 
          bgcolor="primary.light" 
          borderRadius={1}
          onClick={fn()}
          sx={{
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'white',
              transform: 'translateY(-2px)',
            }
          }}
        >
          <Typography>Click me! I have hover effects.</Typography>
        </ClickableBox>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Scrollable Box</Typography>
        <ScrollableBox 
          maxHeight={150} 
          p={2} 
          bgcolor="secondary.light" 
          borderRadius={1}
          border="1px solid"
          borderColor="secondary.main"
        >
          {Array.from({ length: 20 }, (_, i) => (
            <Typography key={i} variant="body2" paragraph={i < 19}>
              Scrollable content line {i + 1}. This box has a maximum height and scrollable overflow.
            </Typography>
          ))}
        </ScrollableBox>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Overlay Box</Typography>
        <Box position="relative" height={200} bgcolor="grey.100" borderRadius={1}>
          <Typography p={2}>Base content behind overlay</Typography>
          <OverlayBox 
            bgcolor="rgba(0, 0, 0, 0.7)" 
            color="white"
            borderRadius={1}
          >
            <FlexCenterBox height="100%">
              <Typography align="center">
                Overlay Content<br />
                Positioned absolutely
              </Typography>
            </FlexCenterBox>
          </OverlayBox>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== ACCESSIBILITY FEATURES =====
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Accessibility Features</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>ARIA Labels</Typography>
        <Box 
          role="button"
          tabIndex={0}
          aria-label="Accessible clickable box"
          p={2} 
          bgcolor="info.light" 
          borderRadius={1}
          sx={{
            cursor: 'pointer',
            '&:focus-visible': {
              outline: '2px solid #1976d2',
              outlineOffset: '2px',
            }
          }}
          onClick={fn()}
        >
          <Typography>
            Accessible box with ARIA label and keyboard navigation
          </Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Landmark Roles</Typography>
        <Box 
          component="section"
          role="region"
          aria-label="Example content section"
          p={2} 
          bgcolor="warning.light" 
          borderRadius={1}
        >
          <Typography>
            Semantic section with landmark role for screen readers
          </Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>High Contrast Compatible</Typography>
        <Box 
          p={2} 
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
          <Typography>
            Box with high contrast mode support
          </Typography>
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
      <Typography variant="h6" gutterBottom>Box in Different Themes</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Light Theme Boxes</Typography>
        <Stack spacing={2}>
          <Box 
            p={2} 
            bgcolor="background.paper" 
            color="text.primary"
            border="1px solid" 
            borderColor="divider" 
            borderRadius={1}
          >
            <Typography>Light theme box with proper contrast and border visibility</Typography>
          </Box>
          <Box 
            p={2} 
            bgcolor="primary.light" 
            color="primary.contrastText"
            borderRadius={1}
          >
            <Typography>Primary colored box optimized for light theme</Typography>
          </Box>
          <Box 
            p={2} 
            bgcolor="background.default" 
            color="text.primary"
            border="2px solid" 
            borderColor="primary.main" 
            borderRadius={1}
          >
            <Typography>Default background with primary border for light theme</Typography>
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Dark Theme Boxes</Typography>
        <Stack spacing={2}>
          <Box 
            p={2} 
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
            <Typography>Dark theme box with enhanced border visibility and proper contrast</Typography>
          </Box>
          <Box 
            p={2} 
            bgcolor="primary.dark" 
            color="primary.contrastText"
            borderRadius={1}
          >
            <Typography>Primary dark variant optimized for dark theme backgrounds</Typography>
          </Box>
          <Box 
            p={2} 
            bgcolor="grey.900" 
            color="text.primary"
            border="2px solid" 
            borderColor="secondary.main" 
            borderRadius={1}
          >
            <Typography sx={{ color: 'common.white' }}>
              Dark background with secondary border for enhanced dark theme visibility
            </Typography>
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Theme-Aware Interactive Boxes</Typography>
        <Stack spacing={2}>
          <Box 
            clickable
            p={2} 
            bgcolor="action.hover" 
            color="text.primary"
            borderRadius={1}
            onClick={fn()}
            sx={{
              transition: 'all 0.2s ease-in-out',
              border: '1px solid',
              borderColor: 'transparent',
              '&:hover': {
                bgcolor: 'action.selected',
                borderColor: 'primary.main',
                transform: 'translateY(-1px)',
              },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              }
            }}
          >
            <Typography>Theme-aware interactive box with hover and focus states</Typography>
          </Box>
          
          <FlexBetweenBox 
            p={2} 
            bgcolor="background.paper" 
            borderRadius={1}
            border="1px solid"
            borderColor="divider"
            sx={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                boxShadow: (theme) => theme.shadows[4],
                borderColor: 'primary.main',
              }
            }}
          >
            <Typography color="text.primary">Theme-responsive layout box</Typography>
            <Box 
              px={2} 
              py={0.5} 
              bgcolor="primary.main" 
              color="primary.contrastText"
              borderRadius={2}
              sx={{ fontSize: '0.75rem' }}
            >
              Status
            </Box>
          </FlexBetweenBox>
          
          <AspectRatioBox 
            ratio="16:9" 
            maxWidth={400} 
            bgcolor="gradient.primary"
            borderRadius={2}
            sx={{
              background: (theme) => 
                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'white',
            }}
          >
            <FlexCenterBox height="100%">
              <Typography variant="h6" align="center">
                Gradient Box with Theme Colors
              </Typography>
            </FlexCenterBox>
          </AspectRatioBox>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates Box components in both light and dark themes with proper contrast, theme-aware styling, and accessibility.',
      },
    },
  },
};

// ===== VARIANTS =====
export const Variants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Box Variants</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Standard Box</Typography>
        <Box p={2} bgcolor="background.paper" border="1px solid" borderColor="divider" borderRadius={1}>
          Standard box with basic styling and border
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Centered Box</Typography>
        <Box centered p={2} bgcolor="primary.light" borderRadius={1} minHeight={80}>
          Centered content both horizontally and vertically
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Rounded Box</Typography>
        <Box rounded p={2} bgcolor="secondary.light">
          Box with enhanced rounded corners
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Elevated Box</Typography>
        <Box elevated p={2} bgcolor="background.paper" borderRadius={1}>
          Box with elevation shadow for depth
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Clickable Box</Typography>
        <Box clickable p={2} bgcolor="success.light" borderRadius={1} onClick={fn()}>
          Interactive box with cursor pointer and click handler
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== STATES =====
export const States: Story = {
  render: (args) => (
    <Stack spacing={3}>
      {/* Normal State */}
      <Box>
        <Typography variant="h6" gutterBottom>Normal State</Typography>
        <Box 
          p={3} 
          bgcolor="background.paper" 
          border="1px solid" 
          borderColor="divider" 
          borderRadius={1}
          sx={{ minHeight: 80, display: 'flex', alignItems: 'center' }}
        >
          <Typography>
            Box in normal state with standard styling, full interactivity, and proper accessibility.
          </Typography>
        </Box>
      </Box>
      
      {/* Hover State */}
      <Box>
        <Typography variant="h6" gutterBottom>Hover State</Typography>
        <Box 
          p={3} 
          bgcolor="primary.light" 
          borderRadius={1}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              transform: 'translateY(-2px)',
              boxShadow: (theme) => theme.shadows[4],
            }
          }}
        >
          <Typography>
            Hover over this box to see elevation, color change, and smooth transitions.
          </Typography>
        </Box>
      </Box>
      
      {/* Focus State */}
      <Box>
        <Typography variant="h6" gutterBottom>Focus State</Typography>
        <Box 
          tabIndex={0}
          p={3} 
          bgcolor="secondary.light" 
          borderRadius={1}
          sx={{
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '2px',
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              boxShadow: (theme) => theme.shadows[2],
            }
          }}
        >
          <Typography>
            Tab to this box to see keyboard focus outline and background changes for accessibility.
          </Typography>
        </Box>
      </Box>
      
      {/* Active State */}
      <Box>
        <Typography variant="h6" gutterBottom>Active State</Typography>
        <Box 
          p={3} 
          bgcolor="success.light" 
          borderRadius={1}
          sx={{
            cursor: 'pointer',
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.1s ease-in-out',
            '&:active': {
              transform: 'scale(0.98) translateY(1px)',
              bgcolor: 'success.dark',
              color: 'success.contrastText',
              boxShadow: (theme) => theme.shadows[1],
            }
          }}
          onClick={fn()}
        >
          <Typography>
            Click and hold this box to see active press state with scale and color feedback.
          </Typography>
        </Box>
      </Box>
      
      {/* Disabled State */}
      <Box>
        <Typography variant="h6" gutterBottom>Disabled State</Typography>
        <Box 
          p={3} 
          bgcolor="action.disabledBackground" 
          color="text.disabled"
          borderRadius={1}
          sx={{ 
            opacity: 0.6,
            pointerEvents: 'none',
            filter: 'grayscale(0.3)',
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography color="text.disabled">
            Disabled box with reduced opacity, grayscale filter, and no user interactions.
          </Typography>
        </Box>
      </Box>
      
      {/* Loading State */}
      <Box>
        <Typography variant="h6" gutterBottom>Loading State</Typography>
        <Box 
          p={3} 
          bgcolor="info.light" 
          borderRadius={1}
          sx={{ 
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            position: 'relative',
          }}
        >
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
          <Typography>
            Box showing loading state with spinner and pending content indication.
          </Typography>
        </Box>
      </Box>
      
      {/* Error State */}
      <Box>
        <Typography variant="h6" gutterBottom>Error State</Typography>
        <Box 
          p={3} 
          bgcolor="error.light" 
          borderRadius={1}
          sx={{ 
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            borderLeft: '4px solid',
            borderLeftColor: 'error.main',
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              bgcolor: 'error.main',
              color: 'error.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              flexShrink: 0,
            }}
          >
            !
          </Box>
          <Typography color="error.dark">
            Box displaying error state with error colors and warning indicators.
          </Typography>
        </Box>
      </Box>
      
      {/* Success State */}
      <Box>
        <Typography variant="h6" gutterBottom>Success State</Typography>
        <Box 
          p={3} 
          bgcolor="success.light" 
          borderRadius={1}
          sx={{ 
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            borderLeft: '4px solid',
            borderLeftColor: 'success.main',
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              bgcolor: 'success.main',
              color: 'success.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              flexShrink: 0,
            }}
          >
            ✓
          </Box>
          <Typography color="success.dark">
            Box showing success state with positive colors and completion indicators.
          </Typography>
        </Box>
      </Box>
      
      {/* Warning State */}
      <Box>
        <Typography variant="h6" gutterBottom>Warning State</Typography>
        <Box 
          p={3} 
          bgcolor="warning.light" 
          borderRadius={1}
          sx={{ 
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            borderLeft: '4px solid',
            borderLeftColor: 'warning.main',
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              bgcolor: 'warning.main',
              color: 'warning.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              flexShrink: 0,
            }}
          >
            ⚠
          </Box>
          <Typography color="warning.dark">
            Box displaying warning state with attention colors and caution indicators.
          </Typography>
        </Box>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all interaction and status states for Box including normal, hover, focus, active, disabled, loading, error, success, and warning states. Each state provides appropriate visual feedback and maintains accessibility standards.',
      },
    },
  },
};

// ===== BOOLEAN PROPS =====
export const BooleanProps: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Boolean Properties</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>centered Property</Typography>
        <Box display="flex" gap={2}>
          <Box flex={1} height={100} border="1px solid" borderColor="divider" borderRadius={1} centered={false} p={1}>
            <Typography variant="caption">centered: false - content aligned to start</Typography>
          </Box>
          <Box flex={1} height={100} border="1px solid" borderColor="divider" borderRadius={1} centered={true}>
            <Typography variant="caption">centered: true - content perfectly centered</Typography>
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>rounded Property</Typography>
        <Box display="flex" gap={2}>
          <Box flex={1} p={2} bgcolor="primary.light" rounded={false}>
            <Typography variant="caption">rounded: false - square corners</Typography>
          </Box>
          <Box flex={1} p={2} bgcolor="primary.light" rounded={true}>
            <Typography variant="caption">rounded: true - enhanced rounded corners</Typography>
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>elevated Property</Typography>
        <Box display="flex" gap={2}>
          <Box flex={1} p={2} bgcolor="background.paper" elevated={false} borderRadius={1}>
            <Typography variant="caption">elevated: false - flat appearance</Typography>
          </Box>
          <Box flex={1} p={2} bgcolor="background.paper" elevated={true} borderRadius={1}>
            <Typography variant="caption">elevated: true - shadow elevation</Typography>
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>fullWidth Property</Typography>
        <Box border="1px dashed" borderColor="divider" p={1}>
          <Box p={1} bgcolor="secondary.light" fullWidth={false} borderRadius={1} mb={1}>
            <Typography variant="caption">fullWidth: false - content-based width</Typography>
          </Box>
          <Box p={1} bgcolor="secondary.light" fullWidth={true} borderRadius={1}>
            <Typography variant="caption">fullWidth: true - stretches to container width</Typography>
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>clickable Property</Typography>
        <Box display="flex" gap={2}>
          <Box flex={1} p={2} bgcolor="success.light" clickable={false} borderRadius={1}>
            <Typography variant="caption">clickable: false - no cursor change</Typography>
          </Box>
          <Box flex={1} p={2} bgcolor="success.light" clickable={true} borderRadius={1} onClick={fn()}>
            <Typography variant="caption">clickable: true - cursor pointer and interactive</Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== SIZES =====
export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Box Sizes and Spacing</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Padding Sizes</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {[0, 0.5, 1, 2, 3, 4, 6, 8].map((size) => (
            <Box 
              key={size}
              p={size}
              bgcolor="primary.light" 
              border="1px solid"
              borderColor="primary.main"
              borderRadius={1}
              textAlign="center"
              minWidth={60}
            >
              <Typography variant="caption">p={size}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Fixed Dimensions</Typography>
        <Stack direction="row" spacing={2} alignItems="flex-end">
          <Box width={50} height={50} bgcolor="secondary.main" borderRadius={1} display="flex" alignItems="center" justifyContent="center">
            <Typography variant="caption" color="white">50px</Typography>
          </Box>
          <Box width={80} height={80} bgcolor="secondary.main" borderRadius={1} display="flex" alignItems="center" justifyContent="center">
            <Typography variant="caption" color="white">80px</Typography>
          </Box>
          <Box width={120} height={120} bgcolor="secondary.main" borderRadius={1} display="flex" alignItems="center" justifyContent="center">
            <Typography variant="caption" color="white">120px</Typography>
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Responsive Sizes</Typography>
        <Box 
          width={{ xs: '100%', sm: '75%', md: '50%' }}
          height={{ xs: 60, sm: 80, md: 100 }}
          bgcolor="success.main" 
          borderRadius={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          <Typography variant="caption" align="center">
            Responsive: xs=100%/60px, sm=75%/80px, md=50%/100px
          </Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Min and Max Sizes</Typography>
        <Stack spacing={1}>
          <Box 
            minWidth={200}
            maxWidth={400}
            width="50%"
            p={2}
            bgcolor="warning.light" 
            borderRadius={1}
            border="1px solid"
            borderColor="warning.main"
          >
            <Typography variant="caption">
              minWidth: 200px, maxWidth: 400px, width: 50%
            </Typography>
          </Box>
          <Box 
            minHeight={60}
            maxHeight={120}
            height="100px"
            width={300}
            p={2}
            bgcolor="info.light" 
            borderRadius={1}
            border="1px solid"
            borderColor="info.main"
          >
            <Typography variant="caption">
              minHeight: 60px, maxHeight: 120px, height: 100px
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  ),
};