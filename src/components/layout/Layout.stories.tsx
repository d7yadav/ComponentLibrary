import type { Meta, StoryObj } from '@storybook/react';
import { 
  Container, 
  Grid, 
  Stack, 
  Box,
  FlexBox,
  GridBox,
  CardStack,
  HeroBox,
  SectionBox
} from './index';
import { Card, CardContent, CardHeader } from '../data-display/Card';
import { Button } from '../core/Button';
import { TextField } from '../forms/TextField';
import React from 'react';

const meta: Meta = {
  title: 'Layout/Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Layout Components

A comprehensive set of layout components for building responsive user interfaces.

## Components Included
- **Container**: Responsive container with breakpoint support
- **Grid**: Advanced grid system with auto-layout
- **Stack**: Flexible layout with spacing control
- **Box**: General-purpose styling component

## Features
- Responsive design with breakpoint support
- Flexbox and CSS Grid utilities
- Spacing and sizing systems
- Dark theme support
- Accessibility compliance (WCAG 2.1 AA)
- TypeScript support
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Container Examples
/**
 * ContainerVariants component
 * 
 * @returns JSX element
 */
export const ContainerVariants: Story = {
  render: () => (
    <Stack spacing={4}>
      <Box>
        <h2>Container Variants</h2>
        <p>Different container types for various layout needs.</p>
      </Box>
      
      <Stack spacing={3}>
        <Box>
          <h3>Fluid Container (Full Width)</h3>
          <Container variant="fluid" bgcolor="primary.50" padding={2} rounded>
            <Box textAlign="center" color="primary.main">
              This is a fluid container that takes the full width
            </Box>
          </Container>
        </Box>
        
        <Box>
          <h3>Fixed Container (Max Width)</h3>
          <Container variant="fixed" maxWidth="md" bgcolor="secondary.50" padding={2} rounded>
            <Box textAlign="center" color="secondary.main">
              This is a fixed container with maximum width
            </Box>
          </Container>
        </Box>
        
        <Box>
          <h3>Constrained Container (Reading Width)</h3>
          <Container variant="constrained" bgcolor="success.50" padding={2} rounded>
            <Box textAlign="center" color="success.main">
              This is a constrained container optimized for reading
            </Box>
          </Container>
        </Box>
      </Stack>
    </Stack>
  )
};

// Grid Examples
/**
 * GridLayouts component
 * 
 * @returns JSX element
 */
export const GridLayouts: Story = {
  render: () => (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <Box>
          <h2>Grid Layouts</h2>
          <p>Responsive grid system with auto-layout capabilities.</p>
        </Box>
        
        <Box>
          <h3>Basic Grid (3 Columns)</h3>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Box 
                  bgcolor="primary.100" 
                  p={2} 
                  rounded 
                  textAlign="center"
                  color="primary.dark"
                >
                  Item {item}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box>
          <h3>Auto-Fit Grid</h3>
          <Grid 
            container 
            spacing={2} 
            useCssGrid 
            autoFit 
            minColumnWidth="200px"
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <Box 
                key={item}
                bgcolor="secondary.100" 
                p={2} 
                rounded 
                textAlign="center"
                color="secondary.dark"
              >
                Auto Item {item}
              </Box>
            ))}
          </Grid>
        </Box>
        
        <Box>
          <h3>Responsive Grid</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box bgcolor="info.100" p={3} rounded color="info.dark">
                <h4>Main Content</h4>
                <p>This takes 12 columns on mobile and 8 on desktop.</p>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box bgcolor="warning.100" p={3} rounded color="warning.dark">
                <h4>Sidebar</h4>
                <p>This takes 12 columns on mobile and 4 on desktop.</p>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Container>
  )
};

// Stack Examples
/**
 * StackLayouts component
 * 
 * @returns JSX element
 */
export const StackLayouts: Story = {
  render: () => (
    <Container maxWidth="md">
      <Stack spacing={4}>
        <Box>
          <h2>Stack Layouts</h2>
          <p>Flexible layout with spacing and direction control.</p>
        </Box>
        
        <Box>
          <h3>Vertical Stack</h3>
          <Stack spacing={2} bgcolor="grey.50" p={2} rounded>
            <Box bgcolor="primary.main" color="white" p={2} rounded textAlign="center">
              Item 1
            </Box>
            <Box bgcolor="secondary.main" color="white" p={2} rounded textAlign="center">
              Item 2
            </Box>
            <Box bgcolor="success.main" color="white" p={2} rounded textAlign="center">
              Item 3
            </Box>
          </Stack>
        </Box>
        
        <Box>
          <h3>Horizontal Stack</h3>
          <Stack direction="row" spacing={2} bgcolor="grey.50" p={2} rounded>
            <Box bgcolor="error.main" color="white" p={2} rounded flex={1} textAlign="center">
              Item A
            </Box>
            <Box bgcolor="warning.main" color="white" p={2} rounded flex={1} textAlign="center">
              Item B
            </Box>
            <Box bgcolor="info.main" color="white" p={2} rounded flex={1} textAlign="center">
              Item C
            </Box>
          </Stack>
        </Box>
        
        <Box>
          <h3>Responsive Stack</h3>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            bgcolor="grey.50" 
            p={2} 
            rounded
          >
            <Box bgcolor="purple.500" color="white" p={2} rounded flex={1} textAlign="center">
              Responsive 1
            </Box>
            <Box bgcolor="pink.500" color="white" p={2} rounded flex={1} textAlign="center">
              Responsive 2
            </Box>
          </Stack>
        </Box>
        
        <Box>
          <h3>Stack with Dividers</h3>
          <Stack 
            spacing={0} 
            divider={<Box height={1} bgcolor="divider" />}
            bgcolor="background.paper" 
            border={1} 
            borderColor="divider"
            rounded
          >
            <Box p={2}>First section with content</Box>
            <Box p={2}>Second section with more content</Box>
            <Box p={2}>Third section with additional content</Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
};

// Box Examples
/**
 * BoxUtilities component
 * 
 * @returns JSX element
 */
export const BoxUtilities: Story = {
  render: () => (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <Box>
          <h2>Box Utilities</h2>
          <p>General-purpose component with comprehensive styling props.</p>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <h3>Centered Box</h3>
              <Box 
                centered 
                bgcolor="primary.100" 
                minHeight={120} 
                rounded 
                color="primary.dark"
              >
                Centered Content
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <h3>Elevated Box</h3>
              <Box 
                elevated={4} 
                bgcolor="background.paper" 
                p={3} 
                rounded 
                textAlign="center"
              >
                Elevated with Shadow
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <h3>Clickable Box</h3>
              <Box 
                clickable 
                bgcolor="secondary.100" 
                p={3} 
                rounded 
                textAlign="center"
                color="secondary.dark"
              >
                Hover me!
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Box>
          <h3>Responsive Properties</h3>
          <Box 
            p={{ xs: 2, sm: 3, md: 4 }}
            bgcolor={{ xs: 'error.100', sm: 'warning.100', md: 'success.100' }}
            textAlign="center"
            rounded
            color="text.primary"
          >
            Responsive padding and background color based on screen size
          </Box>
        </Box>
        
        <Box>
          <h3>Flexbox Utilities</h3>
          <FlexBox 
            justifyContent="space-between" 
            alignItems="center" 
            bgcolor="info.50" 
            p={2} 
            rounded
          >
            <Box bgcolor="info.main" color="white" p={1} rounded>Left</Box>
            <Box bgcolor="info.main" color="white" p={1} rounded>Center</Box>
            <Box bgcolor="info.main" color="white" p={1} rounded>Right</Box>
          </FlexBox>
        </Box>
        
        <Box>
          <h3>CSS Grid Utilities</h3>
          <GridBox 
            gridTemplateColumns="repeat(3, 1fr)" 
            gap={2} 
            bgcolor="warning.50" 
            p={2} 
            rounded
          >
            <Box bgcolor="warning.main" color="white" p={2} rounded textAlign="center">1</Box>
            <Box bgcolor="warning.main" color="white" p={2} rounded textAlign="center">2</Box>
            <Box bgcolor="warning.main" color="white" p={2} rounded textAlign="center">3</Box>
            <Box bgcolor="warning.main" color="white" p={2} rounded textAlign="center">4</Box>
            <Box bgcolor="warning.main" color="white" p={2} rounded textAlign="center">5</Box>
            <Box bgcolor="warning.main" color="white" p={2} rounded textAlign="center">6</Box>
          </GridBox>
        </Box>
      </Stack>
    </Container>
  )
};

// Complex Layout Example
/**
 * ComplexLayout component
 * 
 * @returns JSX element
 */
export const ComplexLayout: Story = {
  render: () => (
    <Container maxWidth="xl" fullWidth>
      <Stack spacing={4}>
        <Box>
          <h2>Complex Layout Example</h2>
          <p>Combining all layout components for a complete page layout.</p>
        </Box>
        
        {/* Header */}
        <Box 
          bgcolor="primary.main" 
          color="white" 
          p={2} 
          rounded
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box fontSize="1.5rem" fontWeight="bold">Logo</Box>
            <Stack direction="row" spacing={2}>
              <Button variant="text" sx={{ color: 'white' }}>Home</Button>
              <Button variant="text" sx={{ color: 'white' }}>About</Button>
              <Button variant="text" sx={{ color: 'white' }}>Contact</Button>
            </Stack>
          </Stack>
        </Box>
        
        {/* Hero Section */}
        <HeroBox bgcolor="gradient.primary" color="white" rounded>
          <Stack spacing={3} alignItems="center">
            <Box fontSize="3rem" fontWeight="bold" textAlign="center">
              Welcome to Our Platform
            </Box>
            <Box fontSize="1.25rem" textAlign="center" maxWidth="600px">
              Build amazing layouts with our comprehensive component library
            </Box>
            <Button variant="secondary" size="large">
              Get Started
            </Button>
          </Stack>
        </HeroBox>
        
        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Content Area */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <SectionBox bgcolor="background.paper" rounded elevated={2}>
                <h3>Main Content</h3>
                <p>
                  This is the main content area that adapts responsively. 
                  On mobile devices, it takes the full width, while on larger 
                  screens it shares space with the sidebar.
                </p>
                
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {[1, 2, 3, 4].map((item) => (
                    <Grid item xs={12} sm={6} key={item}>
                      <CardStack>
                        <h4>Feature {item}</h4>
                        <p>Description of feature {item} with more details.</p>
                        <Button variant="outline" size="small">
                          Learn More
                        </Button>
                      </CardStack>
                    </Grid>
                  ))}
                </Grid>
              </SectionBox>
            </Stack>
          </Grid>
          
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Box bgcolor="background.paper" p={3} rounded elevated={2}>
                <h3>Quick Actions</h3>
                <Stack spacing={2}>
                  <Button variant="primary" fullWidth>
                    Primary Action
                  </Button>
                  <Button variant="outline" fullWidth>
                    Secondary Action
                  </Button>
                </Stack>
              </Box>
              
              <Box bgcolor="background.paper" p={3} rounded elevated={2}>
                <h3>Newsletter</h3>
                <Stack spacing={2}>
                  <TextField 
                    label="Email Address" 
                    type="email" 
                    fullWidth
                    size="small"
                  />
                  <Button variant="secondary" fullWidth size="small">
                    Subscribe
                  </Button>
                </Stack>
              </Box>
              
              <Box bgcolor="info.50" p={3} rounded>
                <h4>Pro Tip</h4>
                <p>Use responsive breakpoints to create layouts that work on all devices.</p>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        
        {/* Footer */}
        <Box 
          bgcolor="grey.100" 
          p={4} 
          rounded 
          textAlign="center"
        >
          <Stack spacing={2}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              justifyContent="center" 
              spacing={4}
            >
              <Box>Privacy Policy</Box>
              <Box>Terms of Service</Box>
              <Box>Support</Box>
              <Box>Documentation</Box>
            </Stack>
            <Box color="text.secondary">
              © 2024 AI-Friendly Material-UI Component Library
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
};

// Performance Examples
/**
 * PerformanceOptimized component
 * 
 * @returns JSX element
 */
export const PerformanceOptimized: Story = {
  render: () => (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <Box>
          <h2>Performance Optimized Layouts</h2>
          <p>Examples showing efficient layout patterns for better performance.</p>
        </Box>
        
        <Box>
          <h3>Auto-Layout Grid (Efficient for Large Lists)</h3>
          <Grid 
            container 
            spacing={2} 
            useCssGrid 
            autoFit 
            minColumnWidth="250px"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Box 
                key={i}
                bgcolor="primary.100" 
                p={2} 
                rounded 
                textAlign="center"
                color="primary.dark"
              >
                Auto Item {i + 1}
              </Box>
            ))}
          </Grid>
        </Box>
        
        <Box>
          <h3>Virtualized-Ready Container</h3>
          <Box 
            height={300} 
            overflow="auto" 
            bgcolor="background.paper" 
            border={1} 
            borderColor="divider" 
            rounded
          >
            <Stack spacing={1} p={2}>
              {Array.from({ length: 50 }, (_, i) => (
                <Box 
                  key={i}
                  p={2} 
                  bgcolor={i % 2 === 0 ? 'grey.50' : 'background.paper'}
                  rounded
                >
                  List Item {i + 1} - This container is ready for virtualization
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Container>
  )
};

// Accessibility Examples
/**
 * AccessibilityFeatures component
 * 
 * @returns JSX element
 */
export const AccessibilityFeatures: Story = {
  render: () => (
    <Container maxWidth="md">
      <Stack spacing={4}>
        <Box>
          <h2>Accessibility Features</h2>
          <p>Layout components with proper ARIA attributes and keyboard navigation.</p>
        </Box>
        
        <Box>
          <h3>Semantic Layout</h3>
          <Box component="main" role="main" aria-label="Main content area">
            <Stack spacing={2}>
              <Box component="section" aria-labelledby="section-1">
                <h4 id="section-1">Section 1</h4>
                <p>This section has proper ARIA labeling for screen readers.</p>
              </Box>
              
              <Box component="aside" role="complementary" aria-label="Additional information">
                <h4>Sidebar Information</h4>
                <p>This aside provides complementary information.</p>
              </Box>
            </Stack>
          </Box>
        </Box>
        
        <Box>
          <h3>Keyboard Navigation</h3>
          <Stack direction="row" spacing={2}>
            <Box 
              clickable 
              tabIndex={0}
              role="button"
              aria-label="First clickable box"
              bgcolor="primary.100" 
              p={2} 
              rounded
              textAlign="center"
            >
              Tab 1
            </Box>
            <Box 
              clickable 
              tabIndex={0}
              role="button"
              aria-label="Second clickable box"
              bgcolor="secondary.100" 
              p={2} 
              rounded
              textAlign="center"
            >
              Tab 2
            </Box>
            <Box 
              clickable 
              tabIndex={0}
              role="button"
              aria-label="Third clickable box"
              bgcolor="success.100" 
              p={2} 
              rounded
              textAlign="center"
            >
              Tab 3
            </Box>
          </Stack>
          <Box fontSize="0.875rem" color="text.secondary" mt={1}>
            Use Tab key to navigate, Enter or Space to activate
          </Box>
        </Box>
      </Stack>
    </Container>
  )
};