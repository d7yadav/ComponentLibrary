import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_COLORS } from './Button.constants';
import { Add, Download, Send, Favorite, Star } from '@mui/icons-material';
import { Stack, Typography, Box } from '@mui/material';

/**
 * The Button component is a versatile, accessible button with 8 variants, multiple sizes,
 * loading states, and comprehensive theming support.
 * 
 * ## Features
 * - 8 variants: primary, secondary, tertiary, quaternary, gradient, glass, outline, text
 * - 3 sizes: small, medium, large
 * - Loading states with customizable spinners
 * - Start/end icon support
 * - WCAG 2.1 AA accessibility compliance
 * - Dark theme support
 * - Interactive animations
 */
const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Enhanced Material-UI Button component with 8 variants and advanced features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(BUTTON_VARIANTS),
      description: 'The variant of the button',
    },
    size: {
      control: 'select',
      options: Object.values(BUTTON_SIZES),
      description: 'The size of the button',
    },
    color: {
      control: 'select',
      options: Object.values(BUTTON_COLORS),
      description: 'The color theme of the button',
    },
    loading: {
      control: 'boolean',
      description: 'If true, the button will show a loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the button will be disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the button will take the full width of its container',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    onClick: fn(),
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    color: 'primary',
  },
};

// ===== VARIANT STORIES =====
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const Quaternary: Story = {
  args: {
    variant: 'quaternary',
    children: 'Quaternary Button',
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Gradient Button',
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: 'Glass Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
};

// ===== SIZE STORIES =====
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

// ===== COLOR STORIES =====
export const PrimaryColor: Story = {
  args: {
    color: 'primary',
    children: 'Primary Color',
  },
};

export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
    children: 'Secondary Color',
  },
};

export const TertiaryColor: Story = {
  args: {
    color: 'tertiary',
    children: 'Tertiary Color',
  },
};

export const QuaternaryColor: Story = {
  args: {
    color: 'quaternary',
    children: 'Quaternary Color',
  },
};

export const SuccessColor: Story = {
  args: {
    color: 'success',
    children: 'Success Color',
  },
};

export const WarningColor: Story = {
  args: {
    color: 'warning',
    children: 'Warning Color',
  },
};

export const ErrorColor: Story = {
  args: {
    color: 'error',
    children: 'Error Color',
  },
};

export const InfoColor: Story = {
  args: {
    color: 'info',
    children: 'Info Color',
  },
};

// ===== STATE STORIES =====
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const LoadingDisabled: Story = {
  args: {
    loading: true,
    disabled: true,
    children: 'Loading & Disabled',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

// ===== ICON STORIES =====
export const WithStartIcon: Story = {
  args: {
    startIcon: <Add />,
    children: 'Add Item',
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: <Send />,
    children: 'Send Message',
  },
};

export const WithBothIcons: Story = {
  args: {
    startIcon: <Download />,
    endIcon: <Star />,
    children: 'Download & Star',
  },
};

export const LoadingWithIcon: Story = {
  args: {
    loading: true,
    startIcon: <Favorite />,
    children: 'Loading with Icon',
  },
};

// ===== COMPREHENSIVE SHOWCASES =====
export const AllVariants: Story = {
  render: () => (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h6" gutterBottom>
        All Button Variants
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
        {Object.values(BUTTON_VARIANTS).map((variant) => (
          <Button key={variant} variant={variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </Stack>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h6" gutterBottom>
        All Button Sizes
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        {Object.values(BUTTON_SIZES).map((size) => (
          <Button key={size} size={size}>
            {size.charAt(0).toUpperCase() + size.slice(1)}
          </Button>
        ))}
      </Stack>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllColors: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        All Button Colors
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={2}>
        {Object.values(BUTTON_COLORS).map((color) => (
          <Button key={color} color={color}>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Button>
        ))}
      </Box>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const InteractiveStates: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Interactive States
      </Typography>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="outline">Outline Normal</Button>
          <Button variant="outline" disabled>Outline Disabled</Button>
          <Button variant="outline" loading>Outline Loading</Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="text">Text Normal</Button>
          <Button variant="text" disabled>Text Disabled</Button>
          <Button variant="text" loading>Text Loading</Button>
        </Stack>
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
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        Accessibility Features
      </Typography>
      <Stack spacing={2}>
        <Button
          aria-label="Add new item to your cart"
          startIcon={<Add />}
        >
          Add to Cart
        </Button>
        <Button
          aria-describedby="download-description"
          endIcon={<Download />}
        >
          Download File
        </Button>
        <Button
          loading
          aria-label="Processing your request, please wait"
        >
          Processing...
        </Button>
        <Button
          disabled
          aria-label="This action is currently unavailable"
        >
          Unavailable Action
        </Button>
      </Stack>
      <Typography
        id="download-description"
        variant="caption"
        color="text.secondary"
      >
        Downloads will start immediately after clicking
      </Typography>
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

// ===== THEME STORIES =====
export const ThemeVariations: Story = {
  render: () => (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Theme Variations
      </Typography>
      <Stack spacing={2}>
        <Typography variant="subtitle2">Light Theme Optimized</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="primary">Primary</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="glass">Glass</Button>
        </Stack>
        
        <Typography variant="subtitle2">Dark Theme Optimized</Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.900', borderRadius: 1 }}>
          <Stack direction="row" spacing={2}>
            <Button variant="primary">Primary</Button>
            <Button variant="gradient">Gradient</Button>
            <Button variant="glass">Glass</Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  ),
  parameters: {
    layout: 'padded',
  },
};