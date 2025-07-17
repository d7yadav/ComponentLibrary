import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Button } from '@/components/core/Button';
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';

import { 
  GRID_SIZES,
  GRID_DIRECTIONS,
  GRID_SPACING_VALUES,
  GRID_JUSTIFY_CONTENT,
  GRID_ALIGN_ITEMS,
  AUTO_LAYOUT_CONFIGS,
  CSS_GRID_TEMPLATES
} from './Grid.constants';

import { 
  Grid,
  CssGrid,
  AutoGrid,
  MasonryGrid,
  HolyGrailGrid,
  ResponsiveCardGrid
} from './';

/**
 * Grid provides a flexible layout system using CSS Grid and Flexbox.
 * It supports both MUI-style responsive grid system and modern CSS Grid layouts.
 * 
 * ## Features
 * - Responsive 12-column grid system compatible with MUI Grid
 * - Modern CSS Grid layouts with auto-fit and auto-fill
 * - Flexible spacing system with responsive breakpoints
 * - Specialized grid components for common patterns
 * - Auto-layout configurations for dynamic content
 * - Accessibility support with proper landmark roles
 * - Performance optimized with minimal re-renders
 */
const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flexible grid layout system supporting both traditional 12-column responsive grids and modern CSS Grid layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    container: {
      control: 'boolean',
      description: 'If true, the component will have the flex container behavior',
    },
    item: {
      control: 'boolean',
      description: 'If true, the component will have the flex item behavior',
    },
    xs: {
      control: 'select',
      options: [false, 'auto', ...Array.from({ length: 12 }, (_, i) => i + 1)],
      description: 'Grid size for extra small screens',
    },
    sm: {
      control: 'select',
      options: [false, 'auto', ...Array.from({ length: 12 }, (_, i) => i + 1)],
      description: 'Grid size for small screens',
    },
    md: {
      control: 'select',
      options: [false, 'auto', ...Array.from({ length: 12 }, (_, i) => i + 1)],
      description: 'Grid size for medium screens',
    },
    lg: {
      control: 'select',
      options: [false, 'auto', ...Array.from({ length: 12 }, (_, i) => i + 1)],
      description: 'Grid size for large screens',
    },
    xl: {
      control: 'select',
      options: [false, 'auto', ...Array.from({ length: 12 }, (_, i) => i + 1)],
      description: 'Grid size for extra large screens',
    },
    spacing: {
      control: 'select',
      options: GRID_SPACING_VALUES,
      description: 'Spacing between grid items',
    },
    direction: {
      control: 'select',
      options: Object.values(GRID_DIRECTIONS),
      description: 'Grid flow direction',
    },
    justifyContent: {
      control: 'select',
      options: Object.values(GRID_JUSTIFY_CONTENT),
      description: 'Horizontal alignment of grid items',
    },
    alignItems: {
      control: 'select',
      options: Object.values(GRID_ALIGN_ITEMS),
      description: 'Vertical alignment of grid items',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Grid wrapping behavior',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    container: true,
    spacing: 2,
    children: (
      <>
        <Grid item xs={12} md={6}>
          <Box p={2} bgcolor="primary.light" borderRadius={1}>
            <Typography>Grid Item 1 (xs=12, md=6)</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={2} bgcolor="secondary.light" borderRadius={1}>
            <Typography>Grid Item 2 (xs=12, md=6)</Typography>
          </Box>
        </Grid>
      </>
    ),
  },
};

// ===== RESPONSIVE GRID SYSTEM =====
export const ResponsiveGridSystem: Story = {
  render: (args) => (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <Typography variant="h5" gutterBottom>
          12-Column Responsive Grid System
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Resize your browser window to see how grid items respond to different breakpoints
        </Typography>
        
        <Box>
          <Typography variant="h6" gutterBottom>Equal Width Columns</Typography>
          <Grid container spacing={2}>
            {Array.from({ length: 4 }, (_, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box p={2} bgcolor="primary.light" borderRadius={1} textAlign="center">
                  <Typography variant="body2">
                    Item {i + 1}<br />
                    xs=12, sm=6, md=3
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>Variable Width Layout</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box p={2} bgcolor="secondary.light" borderRadius={1}>
                <Typography>Main Content (xs=12, md=8)</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box p={2} bgcolor="success.light" borderRadius={1}>
                <Typography>Sidebar (xs=12, md=4)</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>Complex Responsive Layout</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box p={2} bgcolor="info.light" borderRadius={1} textAlign="center">
                <Typography>Header (xs=12)</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box p={2} bgcolor="warning.light" borderRadius={1}>
                <Typography variant="body2">Navigation (xs=12, sm=6, md=3)</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box p={2} bgcolor="primary.light" borderRadius={1}>
                <Typography variant="body2">Content (xs=12, sm=6, md=6)</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Box p={2} bgcolor="success.light" borderRadius={1}>
                <Typography variant="body2">Aside (xs=12, sm=12, md=3)</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box p={2} bgcolor="error.light" borderRadius={1} textAlign="center">
                <Typography>Footer (xs=12)</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Container>
  ),
};

// ===== SPACING SYSTEM =====
export const SpacingSystem: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" gutterBottom>
        Grid Spacing System
      </Typography>
      
      {[0, 1, 2, 3, 4, 6, 8].map((spacing) => (
        <Box key={spacing}>
          <Typography variant="h6" gutterBottom>
            Spacing: {spacing}
          </Typography>
          <Grid container spacing={spacing}>
            {Array.from({ length: 3 }, (_, i) => (
              <Grid item xs={4} key={i}>
                <Box 
                  p={1} 
                  bgcolor="primary.light" 
                  borderRadius={1} 
                  textAlign="center"
                  border="1px solid"
                  borderColor="primary.main"
                >
                  <Typography variant="caption">Item {i + 1}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Stack>
  ),
};

// ===== GRID ALIGNMENT =====
export const GridAlignment: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" gutterBottom>
        Grid Alignment Options
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>Justify Content</Typography>
        <Stack spacing={2}>
          {(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const).map((justify) => (
            <Box key={justify}>
              <Typography variant="subtitle2" gutterBottom>
                justifyContent: {justify}
              </Typography>
              <Grid container spacing={1} justifyContent={justify} sx={{ minHeight: 60, bgcolor: 'grey.100', borderRadius: 1, p: 1 }}>
                <Grid item xs="auto">
                  <Box p={1} bgcolor="primary.main" color="white" borderRadius={0.5}>A</Box>
                </Grid>
                <Grid item xs="auto">
                  <Box p={1} bgcolor="secondary.main" color="white" borderRadius={0.5}>B</Box>
                </Grid>
                <Grid item xs="auto">
                  <Box p={1} bgcolor="success.main" color="white" borderRadius={0.5}>C</Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Align Items</Typography>
        <Stack spacing={2}>
          {(['flex-start', 'center', 'flex-end', 'stretch'] as const).map((align) => (
            <Box key={align}>
              <Typography variant="subtitle2" gutterBottom>
                alignItems: {align}
              </Typography>
              <Grid container spacing={1} alignItems={align} sx={{ minHeight: 80, bgcolor: 'grey.100', borderRadius: 1, p: 1 }}>
                <Grid item xs="auto">
                  <Box p={1} bgcolor="info.main" color="white" borderRadius={0.5} height={30}>A</Box>
                </Grid>
                <Grid item xs="auto">
                  <Box p={1} bgcolor="warning.main" color="white" borderRadius={0.5} height={50}>B</Box>
                </Grid>
                <Grid item xs="auto">
                  <Box p={1} bgcolor="error.main" color="white" borderRadius={0.5} height={40}>C</Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Direction</Typography>
        <Box display="flex" gap={2}>
          <Box flex={1}>
            <Typography variant="subtitle2" gutterBottom>direction: row</Typography>
            <Grid container spacing={1} direction="row" sx={{ bgcolor: 'grey.100', borderRadius: 1, p: 1 }}>
              <Grid item>
                <Box p={1} bgcolor="primary.main" color="white" borderRadius={0.5}>1</Box>
              </Grid>
              <Grid item>
                <Box p={1} bgcolor="primary.main" color="white" borderRadius={0.5}>2</Box>
              </Grid>
              <Grid item>
                <Box p={1} bgcolor="primary.main" color="white" borderRadius={0.5}>3</Box>
              </Grid>
            </Grid>
          </Box>
          <Box flex={1}>
            <Typography variant="subtitle2" gutterBottom>direction: column</Typography>
            <Grid container spacing={1} direction="column" sx={{ bgcolor: 'grey.100', borderRadius: 1, p: 1 }}>
              <Grid item>
                <Box p={1} bgcolor="secondary.main" color="white" borderRadius={0.5}>1</Box>
              </Grid>
              <Grid item>
                <Box p={1} bgcolor="secondary.main" color="white" borderRadius={0.5}>2</Box>
              </Grid>
              <Grid item>
                <Box p={1} bgcolor="secondary.main" color="white" borderRadius={0.5}>3</Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== CSS GRID LAYOUTS =====
export const CssGridLayouts: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" gutterBottom>
        Modern CSS Grid Layouts
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>Auto-fit Grid</Typography>
        <AutoGrid minItemWidth="200px" gap={2}>
          {Array.from({ length: 6 }, (_, i) => (
            <Box key={i} p={2} bgcolor="primary.light" borderRadius={1} textAlign="center">
              <Typography>Auto Item {i + 1}</Typography>
            </Box>
          ))}
        </AutoGrid>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>CSS Grid with Template Areas</Typography>
        <CssGrid
          gridTemplateColumns="1fr 3fr 1fr"
          gridTemplateRows="auto 1fr auto"
          gap={2}
          minHeight={300}
        >
          <Box gridColumn="1 / -1" p={2} bgcolor="info.light" borderRadius={1} textAlign="center">
            <Typography>Header (spans all columns)</Typography>
          </Box>
          <Box p={2} bgcolor="warning.light" borderRadius={1}>
            <Typography>Sidebar</Typography>
          </Box>
          <Box p={2} bgcolor="primary.light" borderRadius={1}>
            <Typography>Main Content</Typography>
          </Box>
          <Box p={2} bgcolor="success.light" borderRadius={1}>
            <Typography>Aside</Typography>
          </Box>
          <Box gridColumn="1 / -1" p={2} bgcolor="error.light" borderRadius={1} textAlign="center">
            <Typography>Footer (spans all columns)</Typography>
          </Box>
        </CssGrid>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Masonry-style Grid</Typography>
        <MasonryGrid columns={3} gap={2}>
          {[60, 100, 80, 120, 90, 110, 70, 95, 130].map((height, i) => (
            <Box 
              key={i} 
              p={2} 
              bgcolor="secondary.light" 
              borderRadius={1}
              height={height}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography>Item {i + 1}</Typography>
            </Box>
          ))}
        </MasonryGrid>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Responsive Card Grid</Typography>
        <ResponsiveCardGrid>
          {Array.from({ length: 8 }, (_, i) => (
            <Box key={i} p={3} bgcolor="success.light" borderRadius={2} textAlign="center">
              <Typography variant="h6" gutterBottom>Card {i + 1}</Typography>
              <Typography variant="body2">
                Responsive card that adapts to screen size with auto-fit behavior.
              </Typography>
              <Button size="small" sx={{ mt: 1 }}>
                Action
              </Button>
            </Box>
          ))}
        </ResponsiveCardGrid>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Holy Grail Layout</Typography>
        <HolyGrailGrid minHeight={400}>
          <Box gridArea="header" p={2} bgcolor="info.light" borderRadius={1} textAlign="center">
            <Typography variant="h6">Header</Typography>
          </Box>
          <Box gridArea="nav" p={2} bgcolor="warning.light" borderRadius={1}>
            <Typography variant="h6">Navigation</Typography>
            <Typography variant="body2">Sidebar navigation menu</Typography>
          </Box>
          <Box gridArea="main" p={2} bgcolor="primary.light" borderRadius={1}>
            <Typography variant="h6">Main Content</Typography>
            <Typography variant="body2" paragraph>
              This is the main content area that expands to fill available space.
            </Typography>
            <Typography variant="body2">
              It automatically adjusts when sidebar content changes height.
            </Typography>
          </Box>
          <Box gridArea="aside" p={2} bgcolor="success.light" borderRadius={1}>
            <Typography variant="h6">Aside</Typography>
            <Typography variant="body2">Secondary content or advertisements</Typography>
          </Box>
          <Box gridArea="footer" p={2} bgcolor="error.light" borderRadius={1} textAlign="center">
            <Typography variant="h6">Footer</Typography>
          </Box>
        </HolyGrailGrid>
      </Box>
    </Stack>
  ),
};

// ===== ACCESSIBILITY FEATURES =====
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" gutterBottom>
        Accessibility Features
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>Semantic Structure</Typography>
        <Grid 
          container 
          spacing={2}
          component="section"
          role="region"
          aria-label="Product grid"
        >
          {Array.from({ length: 4 }, (_, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box 
                p={2} 
                bgcolor="primary.light" 
                borderRadius={1}
                role="article"
                aria-labelledby={`product-${i}`}
              >
                <Typography id={`product-${i}`} variant="h6" gutterBottom>
                  Product {i + 1}
                </Typography>
                <Typography variant="body2">
                  Product description with proper ARIA labeling
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Keyboard Navigation</Typography>
        <Grid container spacing={2}>
          {Array.from({ length: 3 }, (_, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box 
                p={2} 
                bgcolor="secondary.light" 
                borderRadius={1}
                tabIndex={0}
                sx={{
                  cursor: 'pointer',
                  '&:focus-visible': {
                    outline: '2px solid #1976d2',
                    outlineOffset: '2px',
                  }
                }}
                onClick={fn()}
              >
                <Typography variant="body1">
                  Focusable Grid Item {i + 1}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Tab to navigate, Enter to select
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Screen Reader Support</Typography>
        <Grid 
          container 
          spacing={2}
          aria-live="polite"
          aria-label="Dynamic content grid"
        >
          <Grid item xs={12}>
            <Box p={2} bgcolor="info.light" borderRadius={1}>
              <Typography variant="body1">
                Grid with live region support for dynamic content updates.
                Screen readers will announce changes to this grid's content.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>High Contrast Compatible</Typography>
        <Grid container spacing={2}>
          {Array.from({ length: 3 }, (_, i) => (
            <Grid item xs={12} md={4} key={i}>
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
                <Typography variant="body1">
                  High Contrast Item {i + 1}
                </Typography>
                <Typography variant="body2">
                  Adapts to user's contrast preferences
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  ),
};

// ===== MISSING MANDATORY CATEGORIES =====

// ===== VARIANTS =====
export const Variants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Grid Variants</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Container Grid</Typography>
        <Grid container spacing={2} sx={{ bgcolor: 'primary.light', p: 1, borderRadius: 1 }}>
          <Grid item xs={6}>
            <Box p={1} bgcolor="white" borderRadius={0.5}>Item 1</Box>
          </Grid>
          <Grid item xs={6}>
            <Box p={1} bgcolor="white" borderRadius={0.5}>Item 2</Box>
          </Grid>
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>CSS Grid</Typography>
        <CssGrid gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          <Box p={2} bgcolor="secondary.light" borderRadius={1}>CSS Grid Item 1</Box>
          <Box p={2} bgcolor="secondary.light" borderRadius={1}>CSS Grid Item 2</Box>
          <Box p={2} bgcolor="secondary.light" borderRadius={1}>CSS Grid Item 3</Box>
        </CssGrid>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Auto Grid</Typography>
        <AutoGrid minItemWidth="150px" gap={2}>
          <Box p={2} bgcolor="success.light" borderRadius={1}>Auto 1</Box>
          <Box p={2} bgcolor="success.light" borderRadius={1}>Auto 2</Box>
          <Box p={2} bgcolor="success.light" borderRadius={1}>Auto 3</Box>
          <Box p={2} bgcolor="success.light" borderRadius={1}>Auto 4</Box>
        </AutoGrid>
      </Box>
    </Stack>
  ),
};

// ===== STATES =====
export const States: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Grid States</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Normal State</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box p={2} bgcolor="background.paper" border="1px solid" borderColor="divider" borderRadius={1}>
              Normal grid item with standard styling
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box p={2} bgcolor="background.paper" border="1px solid" borderColor="divider" borderRadius={1}>
              Another normal item
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Interactive State</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box 
              p={2} 
              bgcolor="primary.light" 
              borderRadius={1}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  transform: 'translateY(-1px)',
                }
              }}
              onClick={fn()}
            >
              Interactive grid item (hover me)
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box 
              p={2} 
              bgcolor="secondary.light" 
              borderRadius={1}
              tabIndex={0}
              sx={{
                '&:focus-visible': {
                  outline: '2px solid #1976d2',
                  outlineOffset: '2px',
                }
              }}
            >
              Focusable grid item (tab to focus)
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Loading State</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box p={2} bgcolor="grey.200" borderRadius={1} sx={{ opacity: 0.6 }}>
              Loading...
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box p={2} bgcolor="grey.200" borderRadius={1} sx={{ opacity: 0.6 }}>
              Loading...
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box p={2} bgcolor="grey.200" borderRadius={1} sx={{ opacity: 0.6 }}>
              Loading...
            </Box>
          </Grid>
        </Grid>
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
        <Typography variant="subtitle2" gutterBottom>container Property</Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" display="block" gutterBottom>container: false (item mode)</Typography>
            <Box bgcolor="grey.100" p={1} borderRadius={1}>
              <Grid item xs={6} sx={{ bgcolor: 'primary.light', p: 1, borderRadius: 0.5 }}>
                Grid item without container behavior
              </Grid>
            </Box>
          </Box>
          <Box>
            <Typography variant="caption" display="block" gutterBottom>container: true (container mode)</Typography>
            <Grid container spacing={1} sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
              <Grid item xs={6}>
                <Box p={1} bgcolor="primary.light" borderRadius={0.5}>Item 1</Box>
              </Grid>
              <Grid item xs={6}>
                <Box p={1} bgcolor="primary.light" borderRadius={0.5}>Item 2</Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>item Property</Typography>
        <Grid container spacing={1} sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
          <Grid item={false} sx={{ bgcolor: 'warning.light', p: 1, borderRadius: 0.5, mr: 1 }}>
            item: false
          </Grid>
          <Grid item={true} xs={6} sx={{ bgcolor: 'success.light', p: 1, borderRadius: 0.5 }}>
            item: true (with xs=6)
          </Grid>
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>zeroMinWidth Property</Typography>
        <Grid container spacing={1} sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
          <Grid item xs={6} zeroMinWidth={false}>
            <Box p={1} bgcolor="error.light" borderRadius={0.5}>
              <Typography noWrap>
                zeroMinWidth: false - This very long text will not truncate properly and may overflow the container
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} zeroMinWidth={true}>
            <Box p={1} bgcolor="success.light" borderRadius={0.5}>
              <Typography noWrap>
                zeroMinWidth: true - This very long text will truncate properly with ellipsis
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  ),
};

// ===== SIZES =====
export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Grid Sizes</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>12-Column System</Typography>
        <Grid container spacing={1}>
          {Array.from({ length: 12 }, (_, i) => (
            <Grid item xs={1} key={i}>
              <Box 
                p={0.5} 
                bgcolor="primary.light" 
                borderRadius={0.5} 
                textAlign="center"
                minHeight={40}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="caption">{i + 1}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Common Size Combinations</Typography>
        <Stack spacing={1}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box p={1} bgcolor="info.light" borderRadius={0.5} textAlign="center">
                <Typography variant="caption">xs=12 (Full Width)</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box p={1} bgcolor="secondary.light" borderRadius={0.5} textAlign="center">
                <Typography variant="caption">xs=6 (Half)</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box p={1} bgcolor="secondary.light" borderRadius={0.5} textAlign="center">
                <Typography variant="caption">xs=6 (Half)</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Box p={1} bgcolor="success.light" borderRadius={0.5} textAlign="center">
                <Typography variant="caption">xs=4</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box p={1} bgcolor="success.light" borderRadius={0.5} textAlign="center">
                <Typography variant="caption">xs=4</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box p={1} bgcolor="success.light" borderRadius={0.5} textAlign="center">
                <Typography variant="caption">xs=4</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Box p={1} bgcolor="warning.light" borderRadius={0.5} textAlign="center">
                <Typography variant="caption">xs=3</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box p={1} bgcolor="warning.light" borderRadius={0.5} textAlign="center">
                <Typography variant="caption">xs=3</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box p={1} bgcolor="warning.light" borderRadius={0.5} textAlign="center">
                <Typography variant="caption">xs=3</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box p={1} bgcolor="warning.light" borderRadius={0.5} textAlign="center">
                <Typography variant="caption">xs=3</Typography>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Auto Sizing</Typography>
        <Grid container spacing={1}>
          <Grid item xs="auto">
            <Box p={1} bgcolor="error.light" borderRadius={0.5}>
              <Typography variant="caption">xs="auto" (content-based)</Typography>
            </Box>
          </Grid>
          <Grid item xs>
            <Box p={1} bgcolor="primary.light" borderRadius={0.5} textAlign="center">
              <Typography variant="caption">xs (fills remaining space)</Typography>
            </Box>
          </Grid>
          <Grid item xs="auto">
            <Box p={1} bgcolor="error.light" borderRadius={0.5}>
              <Typography variant="caption">xs="auto"</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Responsive Sizing</Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Box 
              p={2} 
              bgcolor="gradient.primary" 
              borderRadius={1} 
              textAlign="center"
              color="white"
            >
              <Typography variant="caption">
                xs=12, sm=6, md=4, lg=3, xl=2
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={9} xl={10}>
            <Box 
              p={2} 
              bgcolor="gradient.secondary" 
              borderRadius={1} 
              textAlign="center"
              color="white"
            >
              <Typography variant="caption">
                xs=12, sm=6, md=8, lg=9, xl=10
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  ),
};

// ===== THEME =====
export const Theme: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Theme Integration</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Theme Colors</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              p={2} 
              bgcolor="primary.main" 
              color="primary.contrastText"
              borderRadius={1} 
              textAlign="center"
            >
              <Typography variant="body2">Primary</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              p={2} 
              bgcolor="secondary.main" 
              color="secondary.contrastText"
              borderRadius={1} 
              textAlign="center"
            >
              <Typography variant="body2">Secondary</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              p={2} 
              bgcolor="success.main" 
              color="success.contrastText"
              borderRadius={1} 
              textAlign="center"
            >
              <Typography variant="body2">Success</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              p={2} 
              bgcolor="error.main" 
              color="error.contrastText"
              borderRadius={1} 
              textAlign="center"
            >
              <Typography variant="body2">Error</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Dark Mode Compatible</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box 
              p={2} 
              bgcolor="background.paper" 
              borderRadius={1}
              border="1px solid"
              borderColor="divider"
            >
              <Typography variant="body1" gutterBottom>Card Content</Typography>
              <Typography variant="body2" color="text.secondary">
                This grid item adapts to both light and dark themes automatically.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              p={2} 
              bgcolor="background.default" 
              borderRadius={1}
              border="1px solid"
              borderColor="divider"
            >
              <Typography variant="body1" gutterBottom>Background Default</Typography>
              <Typography variant="body2" color="text.secondary">
                Uses theme background.default for consistent theming.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Gradient Backgrounds</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box 
              p={3} 
              bgcolor="gradient.primary" 
              borderRadius={1} 
              textAlign="center"
              color="white"
            >
              <Typography variant="h6">Primary Gradient</Typography>
              <Typography variant="body2">Enhanced theme gradient support</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box 
              p={3} 
              bgcolor="gradient.secondary" 
              borderRadius={1} 
              textAlign="center"
              color="white"
            >
              <Typography variant="h6">Secondary Gradient</Typography>
              <Typography variant="body2">Smooth color transitions</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Glass Morphism</Typography>
        <Box 
          p={2} 
          bgcolor="gradient.primary" 
          borderRadius={2}
          position="relative"
          minHeight={200}
          display="flex"
          alignItems="center"
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                p={2} 
                bgcolor="glass.light" 
                borderRadius={1}
                sx={{
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: 'rgba(255,255,255,0.2)',
                }}
              >
                <Typography variant="body1" color="white">Glass Effect</Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  Semi-transparent background with blur
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                p={2} 
                bgcolor="glass.dark" 
                borderRadius={1}
                sx={{
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.2)',
                }}
              >
                <Typography variant="body1" color="white">Dark Glass</Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  Alternative glass morphism style
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid component with comprehensive theme integration including colors, gradients, and glass morphism effects.'
      }
    }
  }
};