import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

import { Button } from '@/components/core/Button';
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Container } from '@/components/layout/Container';

import { 
  STACK_DIRECTIONS,
  STACK_JUSTIFY_CONTENT,
  STACK_ALIGN_ITEMS,
  STACK_SPACING_VALUES,
  COMMON_STACK_PATTERNS
} from './Stack.constants';

import { 
  Stack,
  StackDivider,
  HStack,
  VStack,
  CenterStack,
  SpaceBetweenStack,
  CardStack,
  NavbarStack,
  SidebarStack,
  HeroStack,
  FormStack,
  ButtonGroupStack,
  ListStack,
  ResponsiveStack
} from './';

/**
 * Stack provides a flexible layout for arranging components in vertical or horizontal stacks.
 * It offers consistent spacing, alignment, and responsive behavior for common layout patterns.
 * 
 * ## Features
 * - Flexible direction control (row, column, responsive)
 * - Consistent spacing system with responsive support
 * - Alignment and justification options
 * - Divider support for visual separation
 * - Specialized stack components for common patterns
 * - Responsive direction and spacing changes
 * - Accessibility support with proper semantic structure
 * - Performance optimized with minimal re-renders
 */
const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flexible layout component for arranging components in vertical or horizontal stacks with consistent spacing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: Object.values(STACK_DIRECTIONS),
      description: 'The flex direction of the stack',
    },
    spacing: {
      control: 'select',
      options: STACK_SPACING_VALUES,
      description: 'Spacing between stack items',
    },
    justifyContent: {
      control: 'select',
      options: Object.values(STACK_JUSTIFY_CONTENT),
      description: 'How to justify content along the main axis',
    },
    alignItems: {
      control: 'select',
      options: Object.values(STACK_ALIGN_ITEMS),
      description: 'How to align items along the cross axis',
    },
    divider: {
      control: 'boolean',
      description: 'Whether to show dividers between items',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'How items wrap when they overflow',
    },
    useFlexGap: {
      control: 'boolean',
      description: 'Whether to use CSS gap property instead of margins',
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
    direction: 'column',
    spacing: 2,
    children: (
      <>
        <Box p={2} bgcolor="primary.light" borderRadius={1}>
          <Typography>Stack Item 1</Typography>
        </Box>
        <Box p={2} bgcolor="secondary.light" borderRadius={1}>
          <Typography>Stack Item 2</Typography>
        </Box>
        <Box p={2} bgcolor="success.light" borderRadius={1}>
          <Typography>Stack Item 3</Typography>
        </Box>
      </>
    ),
  },
};

// ===== DIRECTION EXAMPLES =====
export const DirectionExamples: Story = {
  render: (args) => (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <Typography variant="h5" gutterBottom>
          Stack Direction Examples
        </Typography>
        
        <Box>
          <Typography variant="h6" gutterBottom>Column Direction (Default)</Typography>
          <Stack direction="column" spacing={2} sx={{ maxWidth: 300 }}>
            <Box p={2} bgcolor="primary.light" borderRadius={1}>
              <Typography>Item 1</Typography>
            </Box>
            <Box p={2} bgcolor="secondary.light" borderRadius={1}>
              <Typography>Item 2</Typography>
            </Box>
            <Box p={2} bgcolor="success.light" borderRadius={1}>
              <Typography>Item 3</Typography>
            </Box>
          </Stack>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>Row Direction</Typography>
          <Stack direction="row" spacing={2}>
            <Box p={2} bgcolor="info.light" borderRadius={1}>
              <Typography>Item 1</Typography>
            </Box>
            <Box p={2} bgcolor="warning.light" borderRadius={1}>
              <Typography>Item 2</Typography>
            </Box>
            <Box p={2} bgcolor="error.light" borderRadius={1}>
              <Typography>Item 3</Typography>
            </Box>
          </Stack>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>Responsive Direction</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Changes from column on mobile to row on desktop
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Box p={2} bgcolor="primary.light" borderRadius={1}>
              <Typography>Responsive Item 1</Typography>
            </Box>
            <Box p={2} bgcolor="secondary.light" borderRadius={1}>
              <Typography>Responsive Item 2</Typography>
            </Box>
            <Box p={2} bgcolor="success.light" borderRadius={1}>
              <Typography>Responsive Item 3</Typography>
            </Box>
          </Stack>
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
        Stack Spacing System
      </Typography>
      
      {[0, 0.5, 1, 2, 3, 4, 6, 8].map((spacing) => (
        <Box key={spacing}>
          <Typography variant="h6" gutterBottom>
            Spacing: {spacing}
          </Typography>
          <Stack direction="row" spacing={spacing}>
            <Box 
              p={1} 
              bgcolor="primary.light" 
              borderRadius={1}
              border="1px solid"
              borderColor="primary.main"
              minWidth={60}
              textAlign="center"
            >
              <Typography variant="caption">A</Typography>
            </Box>
            <Box 
              p={1} 
              bgcolor="secondary.light" 
              borderRadius={1}
              border="1px solid"
              borderColor="secondary.main"
              minWidth={60}
              textAlign="center"
            >
              <Typography variant="caption">B</Typography>
            </Box>
            <Box 
              p={1} 
              bgcolor="success.light" 
              borderRadius={1}
              border="1px solid"
              borderColor="success.main"
              minWidth={60}
              textAlign="center"
            >
              <Typography variant="caption">C</Typography>
            </Box>
          </Stack>
        </Box>
      ))}
      
      <Box>
        <Typography variant="h6" gutterBottom>Responsive Spacing</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Spacing changes based on screen size: xs=1, sm=2, md=3, lg=4
        </Typography>
        <Stack 
          direction="row" 
          spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}
        >
          <Box p={1} bgcolor="primary.main" color="white" borderRadius={0.5}>
            Responsive
          </Box>
          <Box p={1} bgcolor="secondary.main" color="white" borderRadius={0.5}>
            Spacing
          </Box>
          <Box p={1} bgcolor="success.main" color="white" borderRadius={0.5}>
            Items
          </Box>
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== ALIGNMENT OPTIONS =====
export const AlignmentOptions: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" gutterBottom>
        Stack Alignment Options
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>Justify Content (Main Axis)</Typography>
        <Stack spacing={2}>
          {(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const).map((justify) => (
            <Box key={justify}>
              <Typography variant="subtitle2" gutterBottom>
                justifyContent: {justify}
              </Typography>
              <Stack 
                direction="row" 
                spacing={1} 
                justifyContent={justify}
                sx={{ 
                  minHeight: 60, 
                  bgcolor: 'grey.100', 
                  borderRadius: 1, 
                  p: 1,
                  border: '1px dashed',
                  borderColor: 'grey.400'
                }}
              >
                <Box p={1} bgcolor="primary.main" color="white" borderRadius={0.5}>A</Box>
                <Box p={1} bgcolor="secondary.main" color="white" borderRadius={0.5}>B</Box>
                <Box p={1} bgcolor="success.main" color="white" borderRadius={0.5}>C</Box>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Align Items (Cross Axis)</Typography>
        <Stack spacing={2}>
          {(['flex-start', 'center', 'flex-end', 'stretch'] as const).map((align) => (
            <Box key={align}>
              <Typography variant="subtitle2" gutterBottom>
                alignItems: {align}
              </Typography>
              <Stack 
                direction="row" 
                spacing={1} 
                alignItems={align}
                sx={{ 
                  minHeight: 80, 
                  bgcolor: 'grey.100', 
                  borderRadius: 1, 
                  p: 1,
                  border: '1px dashed',
                  borderColor: 'grey.400'
                }}
              >
                <Box p={1} bgcolor="info.main" color="white" borderRadius={0.5} height={30}>A</Box>
                <Box p={1} bgcolor="warning.main" color="white" borderRadius={0.5} height={50}>B</Box>
                <Box p={1} bgcolor="error.main" color="white" borderRadius={0.5} height={40}>C</Box>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== DIVIDERS =====
export const DividersExample: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" gutterBottom>
        Stack Dividers
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>Column Stack with Dividers</Typography>
        <Stack 
          direction="column" 
          spacing={2}
          divider={<StackDivider />}
          sx={{ maxWidth: 400 }}
        >
          <Box p={2}>
            <Typography variant="h6">Section 1</Typography>
            <Typography variant="body2">Content for the first section</Typography>
          </Box>
          <Box p={2}>
            <Typography variant="h6">Section 2</Typography>
            <Typography variant="body2">Content for the second section</Typography>
          </Box>
          <Box p={2}>
            <Typography variant="h6">Section 3</Typography>
            <Typography variant="body2">Content for the third section</Typography>
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Row Stack with Dividers</Typography>
        <Stack 
          direction="row" 
          spacing={3}
          divider={<StackDivider orientation="vertical" />}
        >
          <Box p={2} textAlign="center">
            <Typography variant="h6">Item 1</Typography>
            <Typography variant="body2">First item</Typography>
          </Box>
          <Box p={2} textAlign="center">
            <Typography variant="h6">Item 2</Typography>
            <Typography variant="body2">Second item</Typography>
          </Box>
          <Box p={2} textAlign="center">
            <Typography variant="h6">Item 3</Typography>
            <Typography variant="body2">Third item</Typography>
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Custom Styled Dividers</Typography>
        <Stack 
          direction="column" 
          spacing={2}
          divider={
            <StackDivider 
              sx={{ 
                borderColor: 'primary.main', 
                borderWidth: 2,
                borderStyle: 'dashed'
              }} 
            />
          }
          sx={{ maxWidth: 400 }}
        >
          <Box p={2} bgcolor="primary.light" borderRadius={1}>
            <Typography>Item with custom divider</Typography>
          </Box>
          <Box p={2} bgcolor="secondary.light" borderRadius={1}>
            <Typography>Another item</Typography>
          </Box>
          <Box p={2} bgcolor="success.light" borderRadius={1}>
            <Typography>Final item</Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== SPECIALIZED STACK COMPONENTS =====
export const SpecializedComponents: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" gutterBottom>
        Specialized Stack Components
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>HStack (Horizontal Stack)</Typography>
        <HStack spacing={2}>
          <Box p={2} bgcolor="primary.light" borderRadius={1}>Item 1</Box>
          <Box p={2} bgcolor="secondary.light" borderRadius={1}>Item 2</Box>
          <Box p={2} bgcolor="success.light" borderRadius={1}>Item 3</Box>
        </HStack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>VStack (Vertical Stack)</Typography>
        <VStack spacing={2} sx={{ maxWidth: 300 }}>
          <Box p={2} bgcolor="info.light" borderRadius={1}>Item 1</Box>
          <Box p={2} bgcolor="warning.light" borderRadius={1}>Item 2</Box>
          <Box p={2} bgcolor="error.light" borderRadius={1}>Item 3</Box>
        </VStack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>CenterStack</Typography>
        <CenterStack spacing={2} sx={{ minHeight: 120, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="h6">Perfectly Centered</Typography>
          <Typography variant="body2">Content is centered both horizontally and vertically</Typography>
        </CenterStack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>SpaceBetweenStack</Typography>
        <SpaceBetweenStack sx={{ minHeight: 80, bgcolor: 'primary.light', borderRadius: 1, p: 2 }}>
          <Typography>Left Content</Typography>
          <Typography>Right Content</Typography>
        </SpaceBetweenStack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>CardStack</Typography>
        <CardStack spacing={3} sx={{ maxWidth: 400 }}>
          <Box>
            <Typography variant="h6" gutterBottom>Card 1</Typography>
            <Typography variant="body2">First card content with enhanced spacing</Typography>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>Card 2</Typography>
            <Typography variant="body2">Second card content with proper elevation</Typography>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>Card 3</Typography>
            <Typography variant="body2">Third card content with consistent styling</Typography>
          </Box>
        </CardStack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>ButtonGroupStack</Typography>
        <ButtonGroupStack spacing={1}>
          <Button variant="contained">Primary</Button>
          <Button variant="outlined">Secondary</Button>
          <Button variant="text">Tertiary</Button>
        </ButtonGroupStack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>FormStack</Typography>
        <FormStack spacing={3} sx={{ maxWidth: 400 }}>
          <Box>
            <Typography variant="body2" gutterBottom>Name</Typography>
            <Box p={2} bgcolor="grey.100" borderRadius={1}>
              <Typography variant="body2">Input field placeholder</Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" gutterBottom>Email</Typography>
            <Box p={2} bgcolor="grey.100" borderRadius={1}>
              <Typography variant="body2">Input field placeholder</Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" gutterBottom>Message</Typography>
            <Box p={2} bgcolor="grey.100" borderRadius={1} minHeight={80}>
              <Typography variant="body2">Textarea placeholder</Typography>
            </Box>
          </Box>
        </FormStack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>ListStack</Typography>
        <ListStack spacing={1} sx={{ maxWidth: 300 }}>
          {['First item', 'Second item', 'Third item', 'Fourth item'].map((item, index) => (
            <Box key={index} p={2} bgcolor="background.paper" border="1px solid" borderColor="divider" borderRadius={1}>
              <Typography>{item}</Typography>
            </Box>
          ))}
        </ListStack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>ResponsiveStack</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Automatically switches between column and row based on screen size
        </Typography>
        <ResponsiveStack spacing={2}>
          <Box p={2} bgcolor="gradient.primary" color="white" borderRadius={1}>
            Responsive Item 1
          </Box>
          <Box p={2} bgcolor="gradient.secondary" color="white" borderRadius={1}>
            Responsive Item 2
          </Box>
          <Box p={2} bgcolor="gradient.hero" color="white" borderRadius={1}>
            Responsive Item 3
          </Box>
        </ResponsiveStack>
      </Box>
    </Stack>
  ),
};

// ===== WRAP BEHAVIOR =====
export const WrapBehavior: Story = {
  render: (args) => (
    <Stack spacing={4}>
      <Typography variant="h5" gutterBottom>
        Stack Wrap Behavior
      </Typography>
      
      <Box>
        <Typography variant="h6" gutterBottom>No Wrap (Default)</Typography>
        <Stack 
          direction="row" 
          spacing={2} 
          wrap="nowrap"
          sx={{ 
            width: 300, 
            bgcolor: 'grey.100', 
            p: 2, 
            borderRadius: 1,
            overflow: 'auto'
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <Box 
              key={i} 
              p={1} 
              bgcolor="primary.main" 
              color="white" 
              borderRadius={0.5}
              minWidth={60}
              textAlign="center"
            >
              {i + 1}
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Wrap</Typography>
        <Stack 
          direction="row" 
          spacing={2} 
          wrap="wrap"
          sx={{ 
            width: 300, 
            bgcolor: 'grey.100', 
            p: 2, 
            borderRadius: 1
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <Box 
              key={i} 
              p={1} 
              bgcolor="secondary.main" 
              color="white" 
              borderRadius={0.5}
              minWidth={60}
              textAlign="center"
            >
              {i + 1}
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Wrap Reverse</Typography>
        <Stack 
          direction="row" 
          spacing={2} 
          wrap="wrap-reverse"
          sx={{ 
            width: 300, 
            bgcolor: 'grey.100', 
            p: 2, 
            borderRadius: 1
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <Box 
              key={i} 
              p={1} 
              bgcolor="success.main" 
              color="white" 
              borderRadius={0.5}
              minWidth={60}
              textAlign="center"
            >
              {i + 1}
            </Box>
          ))}
        </Stack>
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
        <Stack 
          component="nav"
          role="navigation"
          aria-label="Main navigation"
          direction="row"
          spacing={2}
        >
          <Button aria-current="page">Home</Button>
          <Button>About</Button>
          <Button>Services</Button>
          <Button>Contact</Button>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>List Stack with Landmarks</Typography>
        <Stack 
          component="section"
          role="region"
          aria-labelledby="features-heading"
          spacing={2}
          sx={{ maxWidth: 400 }}
        >
          <Typography id="features-heading" variant="h6">
            Key Features
          </Typography>
          {['Feature 1', 'Feature 2', 'Feature 3'].map((feature, index) => (
            <Box 
              key={index}
              p={2} 
              bgcolor="primary.light" 
              borderRadius={1}
              role="listitem"
            >
              <Typography>{feature}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Keyboard Navigation</Typography>
        <Stack direction="row" spacing={2}>
          {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
            <Box 
              key={index}
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
              <Typography>{option}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Screen Reader Support</Typography>
        <Stack 
          spacing={2}
          aria-live="polite"
          aria-label="Dynamic content stack"
          sx={{ maxWidth: 400 }}
        >
          <Box p={2} bgcolor="info.light" borderRadius={1}>
            <Typography>
              Stack with live region support for dynamic content updates.
              Screen readers will announce changes to this stack's content.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  ),
};

// ===== MISSING MANDATORY CATEGORIES =====

// ===== VARIANTS =====
export const Variants: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Stack Variants</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Vertical Stack (Column)</Typography>
        <VStack spacing={1} sx={{ maxWidth: 200 }}>
          <Box p={1} bgcolor="primary.light" borderRadius={1}>Vertical Item 1</Box>
          <Box p={1} bgcolor="primary.light" borderRadius={1}>Vertical Item 2</Box>
          <Box p={1} bgcolor="primary.light" borderRadius={1}>Vertical Item 3</Box>
        </VStack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Horizontal Stack (Row)</Typography>
        <HStack spacing={1}>
          <Box p={1} bgcolor="secondary.light" borderRadius={1}>Horizontal 1</Box>
          <Box p={1} bgcolor="secondary.light" borderRadius={1}>Horizontal 2</Box>
          <Box p={1} bgcolor="secondary.light" borderRadius={1}>Horizontal 3</Box>
        </HStack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Center Stack</Typography>
        <CenterStack spacing={1} sx={{ minHeight: 100, bgcolor: 'success.light', borderRadius: 1 }}>
          <Typography>Centered</Typography>
          <Typography>Content</Typography>
        </CenterStack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Space Between Stack</Typography>
        <SpaceBetweenStack sx={{ bgcolor: 'warning.light', p: 2, borderRadius: 1 }}>
          <Typography>Left</Typography>
          <Typography>Right</Typography>
        </SpaceBetweenStack>
      </Box>
    </Stack>
  ),
};

// ===== STATES =====
export const States: Story = {
  render: (args) => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>Stack States</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Normal State</Typography>
        <Stack direction="row" spacing={2}>
          <Box p={2} bgcolor="background.paper" border="1px solid" borderColor="divider" borderRadius={1}>
            Normal stack item
          </Box>
          <Box p={2} bgcolor="background.paper" border="1px solid" borderColor="divider" borderRadius={1}>
            Another normal item
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Interactive State</Typography>
        <Stack direction="row" spacing={2}>
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
            Hoverable item
          </Box>
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
            Focusable item
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Loading State</Typography>
        <Stack direction="row" spacing={2}>
          <Box p={2} bgcolor="grey.200" borderRadius={1} sx={{ opacity: 0.6 }}>
            Loading...
          </Box>
          <Box p={2} bgcolor="grey.200" borderRadius={1} sx={{ opacity: 0.6 }}>
            Loading...
          </Box>
          <Box p={2} bgcolor="grey.200" borderRadius={1} sx={{ opacity: 0.6 }}>
            Loading...
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Error State</Typography>
        <Stack direction="row" spacing={2}>
          <Box p={2} bgcolor="error.light" color="error.dark" borderRadius={1} border="1px solid" borderColor="error.main">
            Error item
          </Box>
          <Box p={2} bgcolor="error.light" color="error.dark" borderRadius={1} border="1px solid" borderColor="error.main">
            Another error
          </Box>
        </Stack>
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
        <Typography variant="subtitle2" gutterBottom>divider Property</Typography>
        <Box display="flex" gap={4}>
          <Box flex={1}>
            <Typography variant="caption" display="block" gutterBottom>divider: false</Typography>
            <Stack direction="column" spacing={1} divider={false}>
              <Box p={1} bgcolor="primary.light" borderRadius={1}>Item 1</Box>
              <Box p={1} bgcolor="primary.light" borderRadius={1}>Item 2</Box>
              <Box p={1} bgcolor="primary.light" borderRadius={1}>Item 3</Box>
            </Stack>
          </Box>
          <Box flex={1}>
            <Typography variant="caption" display="block" gutterBottom>divider: true</Typography>
            <Stack direction="column" spacing={1} divider={<StackDivider />}>
              <Box p={1} bgcolor="secondary.light" borderRadius={1}>Item 1</Box>
              <Box p={1} bgcolor="secondary.light" borderRadius={1}>Item 2</Box>
              <Box p={1} bgcolor="secondary.light" borderRadius={1}>Item 3</Box>
            </Stack>
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>useFlexGap Property</Typography>
        <Box display="flex" gap={4}>
          <Box flex={1}>
            <Typography variant="caption" display="block" gutterBottom>useFlexGap: false (margins)</Typography>
            <Stack direction="row" spacing={2} useFlexGap={false} sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
              <Box p={1} bgcolor="success.light" borderRadius={1}>Margin</Box>
              <Box p={1} bgcolor="success.light" borderRadius={1}>Based</Box>
              <Box p={1} bgcolor="success.light" borderRadius={1}>Spacing</Box>
            </Stack>
          </Box>
          <Box flex={1}>
            <Typography variant="caption" display="block" gutterBottom>useFlexGap: true (CSS gap)</Typography>
            <Stack direction="row" spacing={2} useFlexGap={true} sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
              <Box p={1} bgcolor="warning.light" borderRadius={1}>CSS</Box>
              <Box p={1} bgcolor="warning.light" borderRadius={1}>Gap</Box>
              <Box p={1} bgcolor="warning.light" borderRadius={1}>Spacing</Box>
            </Stack>
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
      <Typography variant="h6" gutterBottom>Stack Sizes and Spacing</Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Spacing Scale</Typography>
        <Stack spacing={2}>
          {[0, 0.5, 1, 2, 3, 4, 6, 8].map((spacing) => (
            <Box key={spacing}>
              <Typography variant="caption" gutterBottom>spacing: {spacing}</Typography>
              <Stack direction="row" spacing={spacing} sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Box p={1} bgcolor="primary.main" color="white" borderRadius={0.5} minWidth={40} textAlign="center">
                  A
                </Box>
                <Box p={1} bgcolor="secondary.main" color="white" borderRadius={0.5} minWidth={40} textAlign="center">
                  B
                </Box>
                <Box p={1} bgcolor="success.main" color="white" borderRadius={0.5} minWidth={40} textAlign="center">
                  C
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Responsive Spacing</Typography>
        <Stack spacing={1}>
          <Typography variant="caption">xs: 1, sm: 2, md: 3, lg: 4</Typography>
          <Stack 
            direction="row" 
            spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1 }}
          >
            <Box p={1} bgcolor="white" borderRadius={1}>Responsive</Box>
            <Box p={1} bgcolor="white" borderRadius={1}>Spacing</Box>
            <Box p={1} bgcolor="white" borderRadius={1}>Items</Box>
          </Stack>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Container Sizes</Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption">Small Container (max-width: 300px)</Typography>
            <Stack direction="row" spacing={2} sx={{ maxWidth: 300, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
              <Box p={1} bgcolor="white" borderRadius={1} flex={1}>Small 1</Box>
              <Box p={1} bgcolor="white" borderRadius={1} flex={1}>Small 2</Box>
            </Stack>
          </Box>
          <Box>
            <Typography variant="caption">Medium Container (max-width: 600px)</Typography>
            <Stack direction="row" spacing={2} sx={{ maxWidth: 600, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
              <Box p={1} bgcolor="white" borderRadius={1} flex={1}>Medium 1</Box>
              <Box p={1} bgcolor="white" borderRadius={1} flex={1}>Medium 2</Box>
              <Box p={1} bgcolor="white" borderRadius={1} flex={1}>Medium 3</Box>
            </Stack>
          </Box>
          <Box>
            <Typography variant="caption">Large Container (max-width: 900px)</Typography>
            <Stack direction="row" spacing={2} sx={{ maxWidth: 900, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
              <Box p={1} bgcolor="white" borderRadius={1} flex={1}>Large 1</Box>
              <Box p={1} bgcolor="white" borderRadius={1} flex={1}>Large 2</Box>
              <Box p={1} bgcolor="white" borderRadius={1} flex={1}>Large 3</Box>
              <Box p={1} bgcolor="white" borderRadius={1} flex={1}>Large 4</Box>
            </Stack>
          </Box>
        </Stack>
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
        <Stack direction="row" spacing={2}>
          <Box 
            p={2} 
            bgcolor="primary.main" 
            color="primary.contrastText"
            borderRadius={1}
            flex={1}
            textAlign="center"
          >
            <Typography variant="body2">Primary</Typography>
          </Box>
          <Box 
            p={2} 
            bgcolor="secondary.main" 
            color="secondary.contrastText"
            borderRadius={1}
            flex={1}
            textAlign="center"
          >
            <Typography variant="body2">Secondary</Typography>
          </Box>
          <Box 
            p={2} 
            bgcolor="success.main" 
            color="success.contrastText"
            borderRadius={1}
            flex={1}
            textAlign="center"
          >
            <Typography variant="body2">Success</Typography>
          </Box>
          <Box 
            p={2} 
            bgcolor="error.main" 
            color="error.contrastText"
            borderRadius={1}
            flex={1}
            textAlign="center"
          >
            <Typography variant="body2">Error</Typography>
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Dark Mode Compatible</Typography>
        <Stack direction="column" spacing={2}>
          <Box 
            p={2} 
            bgcolor="background.paper" 
            borderRadius={1}
            border="1px solid"
            borderColor="divider"
          >
            <Typography variant="body1" gutterBottom>Paper Background</Typography>
            <Typography variant="body2" color="text.secondary">
              This stack item uses background.paper and adapts to theme changes automatically.
            </Typography>
          </Box>
          <Box 
            p={2} 
            bgcolor="background.default" 
            borderRadius={1}
            border="1px solid"
            borderColor="divider"
          >
            <Typography variant="body1" gutterBottom>Default Background</Typography>
            <Typography variant="body2" color="text.secondary">
              This item uses background.default for consistent theming.
            </Typography>
          </Box>
          <Box 
            p={2} 
            bgcolor="action.selected" 
            borderRadius={1}
            border="1px solid"
            borderColor="divider"
          >
            <Typography variant="body1" gutterBottom>Selected State</Typography>
            <Typography variant="body2" color="text.secondary">
              Uses action.selected for theme-aware selected states.
            </Typography>
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Gradient Stacks</Typography>
        <Stack direction="row" spacing={2}>
          <Box 
            p={3} 
            bgcolor="gradient.primary" 
            borderRadius={1} 
            flex={1}
            textAlign="center"
            color="white"
          >
            <Typography variant="h6">Primary</Typography>
            <Typography variant="body2">Gradient Stack</Typography>
          </Box>
          <Box 
            p={3} 
            bgcolor="gradient.secondary" 
            borderRadius={1} 
            flex={1}
            textAlign="center"
            color="white"
          >
            <Typography variant="h6">Secondary</Typography>
            <Typography variant="body2">Gradient Stack</Typography>
          </Box>
          <Box 
            p={3} 
            bgcolor="gradient.hero" 
            borderRadius={1} 
            flex={1}
            textAlign="center"
            color="white"
          >
            <Typography variant="h6">Hero</Typography>
            <Typography variant="body2">Gradient Stack</Typography>
          </Box>
        </Stack>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Glass Morphism Stack</Typography>
        <Box 
          p={2} 
          bgcolor="gradient.primary" 
          borderRadius={2}
          position="relative"
          minHeight={150}
        >
          <Stack direction="row" spacing={2} alignItems="center" height="100%">
            <Box 
              p={2} 
              bgcolor="glass.light" 
              borderRadius={1}
              flex={1}
              textAlign="center"
              sx={{
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: 'rgba(255,255,255,0.2)',
              }}
            >
              <Typography variant="body1" color="white">Light Glass</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                Semi-transparent
              </Typography>
            </Box>
            <Box 
              p={2} 
              bgcolor="glass.dark" 
              borderRadius={1}
              flex={1}
              textAlign="center"
              sx={{
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: 'rgba(0,0,0,0.2)',
              }}
            >
              <Typography variant="body1" color="white">Dark Glass</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                Alternative style
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>Responsive Theme Stack</Typography>
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={2}
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box 
            p={2} 
            bgcolor="primary.light" 
            borderRadius={1}
            flex={1}
            textAlign="center"
          >
            <Typography variant="body1" color="primary.dark">
              Responsive Item 1
            </Typography>
          </Box>
          <Box 
            p={2} 
            bgcolor="secondary.light" 
            borderRadius={1}
            flex={1}
            textAlign="center"
          >
            <Typography variant="body1" color="secondary.dark">
              Responsive Item 2
            </Typography>
          </Box>
          <Box 
            p={2} 
            bgcolor="success.light" 
            borderRadius={1}
            flex={1}
            textAlign="center"
          >
            <Typography variant="body1" color="success.dark">
              Responsive Item 3
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stack component with comprehensive theme integration including colors, gradients, glass morphism, and responsive design.'
      }
    }
  }
};