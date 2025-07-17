import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Divider } from '@/components/data-display/Divider/Divider';
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box/Box';
import { Stack } from '@/components/layout/Stack/Stack';


const meta: Meta<typeof Divider> = {
  title: 'Data Display/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Divider component creates a visual separator between content. Supports horizontal and vertical orientations with various styling options.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation'
    },
    variant: {
      control: 'select',
      options: ['fullWidth', 'inset', 'middle'],
      description: 'Divider variant'
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment when children are present'
    },
    flexItem: {
      control: 'boolean',
      description: 'Whether the divider is a flex item'
    },
    absolute: {
      control: 'boolean',
      description: 'Whether the divider has absolute positioning'
    },
    children: {
      control: 'text',
      description: 'Text content to display in the divider'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Divider>;

/**
 * Default horizontal divider
 */
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'fullWidth',
  },
  render: (args) => (
    <Box sx={{ width: 300 }}>
      <Typography variant="body1">Content above</Typography>
      <Divider {...args} />
      <Typography variant="body1">Content below</Typography>
    </Box>
  )
};

/**
 * Divider Variants - Different styles
 */
export const Variants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Box>
        <Typography variant="body2" gutterBottom>Full Width</Typography>
        <Typography variant="body1">Content above</Typography>
        <Divider variant="fullWidth" />
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body2" gutterBottom>Inset</Typography>
        <Typography variant="body1">Content above</Typography>
        <Divider variant="inset" />
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body2" gutterBottom>Middle</Typography>
        <Typography variant="body1">Content above</Typography>
        <Divider variant="middle" />
        <Typography variant="body1">Content below</Typography>
      </Box>
    </Stack>
  ),
};

/**
 * Divider Orientations - Horizontal and vertical
 */
export const Orientations: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="body2" gutterBottom>Horizontal</Typography>
        <Box sx={{ width: 300 }}>
          <Typography variant="body1">Content above</Typography>
          <Divider orientation="horizontal" />
          <Typography variant="body1">Content below</Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="body2" gutterBottom>Vertical</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', height: 60 }}>
          <Typography variant="body1">Left content</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">Right content</Typography>
        </Box>
      </Box>
    </Stack>
  ),
};

/**
 * Divider with Text - Content dividers
 */
export const WithText: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Box>
        <Typography variant="body1">Content above</Typography>
        <Divider textAlign="center">Center Text</Divider>
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body1">Content above</Typography>
        <Divider textAlign="left">Left Text</Divider>
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body1">Content above</Typography>
        <Divider textAlign="right">Right Text</Divider>
        <Typography variant="body1">Content below</Typography>
      </Box>
    </Stack>
  ),
};

/**
 * Divider Sizes - Different thicknesses and spacings
 */
export const Sizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Box>
        <Typography variant="body2" gutterBottom>Thin Divider (default)</Typography>
        <Typography variant="body1">Content above</Typography>
        <Divider sx={{ borderWidth: '0.5px' }} />
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body2" gutterBottom>Medium Divider</Typography>
        <Typography variant="body1">Content above</Typography>
        <Divider sx={{ borderWidth: '1px' }} />
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body2" gutterBottom>Thick Divider</Typography>
        <Typography variant="body1">Content above</Typography>
        <Divider sx={{ borderWidth: '2px' }} />
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body2" gutterBottom>Extra Thick Divider</Typography>
        <Typography variant="body1">Content above</Typography>
        <Divider sx={{ borderWidth: '3px' }} />
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body2" gutterBottom>Vertical Sizes</Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ height: 60 }}>
          <Typography variant="body1">Left</Typography>
          <Divider orientation="vertical" flexItem sx={{ borderWidth: '0.5px' }} />
          <Typography variant="body1">Thin</Typography>
          <Divider orientation="vertical" flexItem sx={{ borderWidth: '1px' }} />
          <Typography variant="body1">Medium</Typography>
          <Divider orientation="vertical" flexItem sx={{ borderWidth: '2px' }} />
          <Typography variant="body1">Thick</Typography>
          <Divider orientation="vertical" flexItem sx={{ borderWidth: '3px' }} />
          <Typography variant="body1">Extra</Typography>
        </Stack>
      </Box>
    </Stack>
  ),
};

/**
 * Divider States - Different usage scenarios
 */
export const States: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Box>
        <Typography variant="body2" gutterBottom>Basic</Typography>
        <Typography variant="body1">Content above</Typography>
        <Divider />
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body2" gutterBottom>With Flex Item</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', height: 40 }}>
          <Typography variant="body1">Left</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body1">Right</Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="body2" gutterBottom>Loading State</Typography>
        <Typography variant="body1">Content above</Typography>
        <Divider sx={{ opacity: 0.3, borderStyle: 'dashed' }} />
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body2" gutterBottom>Active State</Typography>
        <Typography variant="body1">Content above</Typography>
        <Divider sx={{ borderColor: 'primary.main', borderWidth: '2px' }} />
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body2" gutterBottom>Error State</Typography>
        <Typography variant="body1">Content above</Typography>
        <Divider sx={{ borderColor: 'error.main', borderWidth: '1px' }} />
        <Typography variant="body1">Content below</Typography>
      </Box>
    </Stack>
  ),
};

/**
 * Divider Theme - Light and dark theme compatibility
 */
export const Theme: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Box>
        <Typography variant="body1">Content above</Typography>
        <Divider />
        <Typography variant="body1">Content below</Typography>
      </Box>
      
      <Box>
        <Typography variant="body1">Content above</Typography>
        <Divider>With Text</Divider>
        <Typography variant="body1">Content below</Typography>
      </Box>
    </Stack>
  ),
};

/**
 * Divider Accessibility - Proper ARIA attributes
 */
export const Accessibility: Story = {
  render: () => (
    <Box sx={{ width: 300 }}>
      <Typography variant="body1" id="section1">First section</Typography>
      <Divider role="separator" aria-orientation="horizontal" />
      <Typography variant="body1" id="section2">Second section</Typography>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dividers include proper ARIA attributes for screen readers and accessibility compliance.'
      }
    }
  }
}; 