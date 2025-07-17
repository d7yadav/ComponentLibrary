// TODO: Replace with internal icon wrappers when available
// import {
//   ExpandMore,
//   ChevronRight,
//   Settings,
//   Info,
//   Warning,
//   Error,
//   CheckCircle,
//   Help,
//   Person,
//   Security,
//   Notifications,
//   Language,
//   Palette,
//   Storage,
//   Edit,
//   Delete,
//   Share,
//   Download,
//   Favorite,
//   BookmarkBorder,
// } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';

import { Button } from '@/components/core/Button';
import { Chip } from '@/components/core/Chip'; // Replaced MUI Chip with internal wrapper
import { IconButton } from '@/components/core/IconButton'; // Replaced MUI IconButton with internal wrapper
// TODO: Migrate FormControlLabel to internal wrapper when available

import { Typography } from '@/components/data-display/Typography';
import { Alert } from '@/components/feedback/Alert';
import { Switch } from '@/components/forms/Switch'; // Replaced MUI Switch with internal wrapper
import { TextField } from '@/components/forms/TextField';
import { Box } from '@/components/layout/Box';
// TODO: Create wrapper components for Chip, IconButton, FormControlLabel, and Switch

import { Accordion, AccordionSummary, AccordionDetails, AccordionActions } from './Accordion';
import { 
  ACCORDION_VARIANTS,
  ACCORDION_SIZES,
  ACCORDION_ICON_POSITIONS,
  ACCORDION_TRANSITIONS,
  ACCORDION_FOCUS_COLORS,
} from './Accordion.constants';

const meta: Meta<typeof Accordion> = {
  title: 'Surfaces/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Accordion Component

A comprehensive accordion component with multiple variants, animations, and accessibility features.

## Features
- 5 variants: standard, outlined, elevated, flat, card
- 3 sizes: compact, comfortable, spacious
- Flexible icon positioning: start, end, both, none
- Smooth animations with customizable timing
- Single and multiple expand modes
- Summary subtitles and actions
- Comprehensive accessibility (WCAG 2.1 AA)
- Mobile-optimized touch interactions
- Dark theme support

## Usage
\`\`\`tsx
import { Accordion } from '@/components/surfaces';

<Accordion
  variant="outlined"
  size="comfortable"
  summary="Accordion Title"
  subtitle="Optional subtitle"
  expanded={expanded}
  onChange={(event, isExpanded) => setExpanded(isExpanded)}
>
  Accordion content goes here
</Accordion>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(ACCORDION_VARIANTS),
      description: 'The visual variant of the accordion',
    },
    size: {
      control: 'select',
      options: Object.values(ACCORDION_SIZES),
      description: 'The size of the accordion',
    },
    iconPosition: {
      control: 'select',
      options: Object.values(ACCORDION_ICON_POSITIONS),
      description: 'Position of expand/collapse icons',
    },
    transition: {
      control: 'select',
      options: Object.values(ACCORDION_TRANSITIONS),
      description: 'Animation transition timing',
    },
    focusColor: {
      control: 'select',
      options: Object.values(ACCORDION_FOCUS_COLORS),
      description: 'Focus indicator color',
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the accordion is expanded',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    showDivider: {
      control: 'boolean',
      description: 'Show divider between summary and details',
    },
    dense: {
      control: 'boolean',
      description: 'Use dense summary layout',
    },
    square: {
      control: 'boolean',
      description: 'Remove border radius',
    },
    summary: {
      control: 'text',
      description: 'Summary content',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle content',
    },
    onChange: {
      action: 'onChange',
      description: 'Callback fired when change occurs',
    },
  },
  args: {
    onChange: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Basic Stories
/**
 * Default component
 * 
 * @returns JSX element
 */
export const Default: Story = {
  args: {
    summary: 'Default Accordion',
    children: 'This is the default accordion content. It demonstrates the basic functionality with standard styling.',
  
    onChange: fn(),
  },
};

/**
 * Expanded component
 * 
 * @returns JSX element
 */
export const Expanded: Story = {
  args: {
    summary: 'Expanded Accordion',
    expanded: true,
    children: 'This accordion starts in an expanded state.',
  },
};

/**
 * Disabled component
 * 
 * @returns JSX element
 */
export const Disabled: Story = {
  args: {
    summary: 'Disabled Accordion',
    disabled: true,
    children: 'This accordion is disabled and cannot be interacted with.',
  },
};

// Variant Stories
/**
 * StandardVariant component
 * 
 * @returns JSX element
 */
export const StandardVariant: Story = {
  args: {
    variant: 'standard',
    summary: 'Standard Variant',
    children: 'Standard variant with minimal styling and border separators.',
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
    summary: 'Outlined Variant',
    children: 'Outlined variant with visible borders and hover effects.',
  },
};

/**
 * ElevatedVariant component
 * 
 * @returns JSX element
 */
export const ElevatedVariant: Story = {
  args: {
    variant: 'elevated',
    summary: 'Elevated Variant',
    children: 'Elevated variant with shadow effects and hover animations.',
  },
};

/**
 * FlatVariant component
 * 
 * @returns JSX element
 */
export const FlatVariant: Story = {
  args: {
    variant: 'flat',
    summary: 'Flat Variant',
    children: 'Flat variant with subtle background colors.',
  },
};

/**
 * CardVariant component
 * 
 * @returns JSX element
 */
export const CardVariant: Story = {
  args: {
    variant: 'card',
    summary: 'Card Variant',
    children: 'Card variant with rounded corners, shadows, and spacing.',
  },
};

// Size Stories
/**
 * CompactSize component
 * 
 * @returns JSX element
 */
export const CompactSize: Story = {
  args: {
    size: 'compact',
    variant: 'outlined',
    summary: 'Compact Size',
    children: 'Compact size with reduced padding and smaller text.',
  },
};

/**
 * ComfortableSize component
 * 
 * @returns JSX element
 */
export const ComfortableSize: Story = {
  args: {
    size: 'comfortable',
    variant: 'outlined',
    summary: 'Comfortable Size (Default)',
    children: 'Comfortable size with balanced padding and text size.',
  },
};

/**
 * SpaciousSize component
 * 
 * @returns JSX element
 */
export const SpaciousSize: Story = {
  args: {
    size: 'spacious',
    variant: 'outlined',
    summary: 'Spacious Size',
    children: 'Spacious size with generous padding and larger text.',
  },
};

// Icon Position Stories
/**
 * IconStart component
 * 
 * @returns JSX element
 */
export const IconStart: Story = {
  args: {
    iconPosition: 'start',
    variant: 'outlined',
    summary: 'Icon at Start',
    children: 'Expand icon positioned at the start of the summary.',
  },
};

/**
 * IconEnd component
 * 
 * @returns JSX element
 */
export const IconEnd: Story = {
  args: {
    iconPosition: 'end',
    variant: 'outlined',
    summary: 'Icon at End (Default)',
    children: 'Expand icon positioned at the end of the summary.',
  },
};

/**
 * IconBoth component
 * 
 * @returns JSX element
 */
export const IconBoth: Story = {
  args: {
    iconPosition: 'both',
    variant: 'outlined',
    summary: 'Icons at Both Ends',
    startIcon: <span>▶️</span>,
    endIcon: <span>🔽</span>,
    children: 'Different icons at both start and end positions.',
  },
};

/**
 * NoIcon component
 * 
 * @returns JSX element
 */
export const NoIcon: Story = {
  args: {
    iconPosition: 'none',
    variant: 'outlined',
    summary: 'No Icons',
    children: 'Accordion without any expand/collapse icons.',
  },
};

// Custom Icons Stories
/**
 * CustomExpandIcon component
 * 
 * @returns JSX element
 */
export const CustomExpandIcon: Story = {
  args: {
    variant: 'outlined',
    summary: 'Custom Expand Icon',
    expandIcon: <span>⚙️</span>,
    children: 'Accordion with a custom expand icon.',
  },
};

/**
 * CustomStartEndIcons component
 * 
 * @returns JSX element
 */
export const CustomStartEndIcons: Story = {
  args: {
    variant: 'outlined',
    iconPosition: 'both',
    summary: 'Custom Start & End Icons',
    startIcon: <span>ℹ️</span>,
    endIcon: <span>❓</span>,
    children: 'Accordion with custom icons at both ends.',
  },
};

// Subtitle Stories
/**
 * WithSubtitle component
 * 
 * @returns JSX element
 */
export const WithSubtitle: Story = {
  args: {
    variant: 'outlined',
    summary: 'Accordion with Subtitle',
    subtitle: 'This is a helpful subtitle that provides additional context',
    children: 'Content area with subtitle in the summary.',
  },
};

/**
 * SubtitleAndIcons component
 * 
 * @returns JSX element
 */
export const SubtitleAndIcons: Story = {
  args: {
    variant: 'card',
    iconPosition: 'both',
    summary: 'Main Title',
    subtitle: 'Subtitle with custom icons',
    startIcon: <span>⚙️</span>,
    endIcon: <span>🔽</span>,
    children: 'Combination of subtitle and custom icons.',
  },
};

// Actions Stories
/**
 * WithActions component
 * 
 * @returns JSX element
 */
export const WithActions: Story = {
  args: {
    variant: 'outlined',
    summary: 'Accordion with Actions',
    children: 'This accordion includes action buttons in the footer.',
    actions: (
      <>
        <Button size="small">Cancel</Button>
        <Button size="small" variant="contained">Save</Button>
      </>
    ),
  },
};

/**
 * ActionsOnly component
 * 
 * @returns JSX element
 */
export const ActionsOnly: Story = {
  args: {
    variant: 'card',
    summary: 'Actions Only',
    children: 'Content with footer actions but no other special features.',
    actions: (
      <>
        <IconButton size="small" aria-label="edit">
          <span>✏️</span>
        </IconButton>
        <IconButton size="small" aria-label="delete">
          <span>🗑️</span>
        </IconButton>
        <IconButton size="small" aria-label="share">
          <span>🔗</span>
        </IconButton>
      </>
    ),
  },
};

// Dense Layout Stories
/**
 * DenseLayout component
 * 
 * @returns JSX element
 */
export const DenseLayout: Story = {
  args: {
    variant: 'outlined',
    dense: true,
    summary: 'Dense Layout',
    subtitle: 'Reduced padding for compact display',
    children: 'Dense layout reduces the summary padding for more compact display.',
  },
};

// Divider Stories
/**
 * WithDivider component
 * 
 * @returns JSX element
 */
export const WithDivider: Story = {
  args: {
    variant: 'standard',
    summary: 'Accordion with Divider',
    showDivider: true,
    expanded: true,
    children: 'A divider separates the summary from the details when expanded.',
  },
};

// Transition Stories
/**
 * FastTransition component
 * 
 * @returns JSX element
 */
export const FastTransition: Story = {
  args: {
    variant: 'outlined',
    transition: 'fast',
    summary: 'Fast Transition',
    children: 'This accordion uses a fast transition animation.',
  },
};

/**
 * SlowTransition component
 * 
 * @returns JSX element
 */
export const SlowTransition: Story = {
  args: {
    variant: 'outlined',
    transition: 'slow',
    summary: 'Slow Transition',
    children: 'This accordion uses a slow transition animation.',
  },
};

/**
 * NoTransition component
 * 
 * @returns JSX element
 */
export const NoTransition: Story = {
  args: {
    variant: 'outlined',
    transition: 'none',
    summary: 'No Transition',
    children: 'This accordion has no transition animation.',
  },
};

// Complex Content Stories
/**
 * RichContent component
 * 
 * @returns JSX element
 */
export const RichContent: Story = {
  args: {
    variant: 'card',
    summary: 'Rich Content Example',
    subtitle: 'Demonstrates complex content formatting',
    children: (
      <Box data-testid="accordion.stories">
        <Typography variant="h6" gutterBottom>
          Formatted Content
        </Typography>
        <Typography variant="body2" paragraph>
          This accordion contains rich content including typography, lists, and other components.
        </Typography>
        <ul>
          <li>Feature one with detailed description</li>
          <li>Feature two with additional information</li>
          <li>Feature three with examples</li>
        </ul>
        <Box data-testid="accordion.stories" sx={{ mt: 2 }}>
          <Chip label="Tag 1" size="small" sx={{ mr: 1 }} />
          <Chip label="Tag 2" size="small" sx={{ mr: 1 }} />
          <Chip label="Tag 3" size="small" />
        </Box>
      </Box>
    ),
  },
};

/**
 * FormContent component
 * 
 * @returns JSX element
 */
export const FormContent: Story = {
  args: {
    variant: 'outlined',
    summary: 'Form Content',
    subtitle: 'Interactive form elements inside accordion',
    expanded: true,
    children: (
      <Box data-testid="accordion.stories" component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          size="small"
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          size="small"
          fullWidth
        />
        <Switch
          label="Subscribe to newsletter"
        />
      </Box>
    ),
    actions: (
      <>
        <Button size="small">Reset</Button>
        <Button size="small" variant="contained">Submit</Button>
      </>
    ),
  },
};

// Status/Alert Content Stories
/**
 * SuccessContent component
 * 
 * @returns JSX element
 */
export const SuccessContent: Story = {
  args: {
    variant: 'outlined',
    summary: 'Success Status',
    startIcon: <span>✅</span>,
    children: (
      <Alert severity="success" variant="outlined">
        Operation completed successfully! All changes have been saved.
      </Alert>
    ),
  },
};

/**
 * WarningContent component
 * 
 * @returns JSX element
 */
export const WarningContent: Story = {
  args: {
    variant: 'outlined',
    summary: 'Warning Status',
    startIcon: <span>⚠️</span>,
    children: (
      <Alert severity="warning" variant="outlined">
        Please review the following items before proceeding with the action.
      </Alert>
    ),
  },
};

/**
 * ErrorContent component
 * 
 * @returns JSX element
 */
export const ErrorContent: Story = {
  args: {
    variant: 'outlined',
    summary: 'Error Status',
    startIcon: <span>❌</span>,
    children: (
      <Alert severity="error" variant="outlined">
        An error occurred while processing your request. Please try again.
      </Alert>
    ),
  },
};

// Controlled Accordion Group Story
/**
 * ControlledGroup component
 * 
 * @returns JSX element
 */
export const ControlledGroup: Story = {
  render: (args) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
      <Box data-testid="accordion.stories">
        <Typography variant="h6" gutterBottom>
          Controlled Accordion Group (Single Expand)
        </Typography>
        <Box data-testid="accordion.stories" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Accordion
            variant="outlined"
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            summary="General Settings"
            startIcon={<span>⚙️</span>}
          >
            <Typography variant="body2" paragraph>
              Configure general application settings including theme, language, and preferences.
            </Typography>
            <Switch
              label="Enable notifications"
            />
          </Accordion>

          <Accordion
            variant="outlined"
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
            summary="Account Settings"
            startIcon={<span>👤</span>}
          >
            <Typography variant="body2" paragraph>
              Manage your account information, security settings, and privacy preferences.
            </Typography>
            <Button size="small" variant="outlined">
              Change Password
            </Button>
          </Accordion>

          <Accordion
            variant="outlined"
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
            summary="Security Settings"
            startIcon={<span>🔒</span>}
          >
            <Typography variant="body2" paragraph>
              Configure security options including two-factor authentication and login alerts.
            </Typography>
            <Switch />
          </Accordion>
        </Box>
      </Box>
    );
  },
};

// Multiple Expand Group Story
/**
 * MultipleExpandGroup component
 * 
 * @returns JSX element
 */
export const MultipleExpandGroup: Story = {
  render: (args) => {
    const [expandedPanels, setExpandedPanels] = useState<Set<string>>(new Set());

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      const newExpanded = new Set(expandedPanels);
      if (isExpanded) {
        newExpanded.add(panel);
      } else {
        newExpanded.delete(panel);
      }
      setExpandedPanels(newExpanded);
    };

    return (
      <Box data-testid="accordion.stories">
        <Typography variant="h6" gutterBottom>
          Multiple Expand Accordion Group
        </Typography>
        <Box data-testid="accordion.stories" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Accordion
            variant="card"
            expanded={expandedPanels.has('panel1')}
            onChange={handleChange('panel1')}
            summary="Notifications"
            startIcon={<span>🔔</span>}
            subtitle="Configure notification preferences"
          >
            <Switch
              label="Email notifications"
            />
            <Switch />
            <Switch
              label="SMS notifications"
            />
          </Accordion>

          <Accordion
            variant="card"
            expanded={expandedPanels.has('panel2')}
            onChange={handleChange('panel2')}
            summary="Language & Region"
            startIcon={<span>🌍</span>}
            subtitle="Set your language and regional preferences"
          >
            <TextField
              select
              label="Language"
              size="small"
              defaultValue="en"
              fullWidth
              sx={{ mb: 2 }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </TextField>
            <TextField
              select
              label="Time Zone"
              size="small"
              defaultValue="utc"
              fullWidth
              SelectProps={{
                native: true,
              }}
            >
              <option value="utc">UTC</option>
              <option value="est">Eastern</option>
              <option value="pst">Pacific</option>
              <option value="cst">Central</option>
            </TextField>
          </Accordion>

          <Accordion
            variant="card"
            expanded={expandedPanels.has('panel3')}
            onChange={handleChange('panel3')}
            summary="Appearance"
            startIcon={<span>🎨</span>}
            subtitle="Customize the visual appearance"
          >
            <Switch />
            <Switch
              label="High contrast"
            />
            <Switch />
          </Accordion>

          <Accordion
            variant="card"
            expanded={expandedPanels.has('panel4')}
            onChange={handleChange('panel4')}
            summary="Storage & Privacy"
            startIcon={<span>💾</span>}
            subtitle="Manage data storage and privacy settings"
          >
            <Typography variant="body2" paragraph>
              Current storage usage: 2.3 GB of 10 GB
            </Typography>
            <Button size="small" variant="outlined" sx={{ mr: 1 }}>
              Clear Cache
            </Button>
            <Button size="small" variant="outlined">
              Export Data
            </Button>
          </Accordion>
        </Box>
      </Box>
    );
  },
};

// FAQ Example Story
/**
 * FAQExample component
 * 
 * @returns JSX element
 */
export const FAQExample: Story = {
  render: (args) => {
    const [expanded, setExpanded] = useState<string | false>('faq1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const faqs = [
      {
        id: 'faq1',
        question: 'How do I reset my password?',
        answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address and follow the instructions sent to your email.',
      },
      {
        id: 'faq2',
        question: 'Can I change my username?',
        answer: 'Yes, you can change your username in the Account Settings section. Note that changing your username may affect how others find you on the platform.',
      },
      {
        id: 'faq3',
        question: 'How do I delete my account?',
        answer: 'Account deletion is permanent and cannot be undone. To delete your account, go to Settings > Account > Delete Account and follow the confirmation process.',
      },
      {
        id: 'faq4',
        question: 'Is my data secure?',
        answer: 'We take data security seriously. All data is encrypted in transit and at rest. We follow industry best practices and comply with relevant data protection regulations.',
      },
      {
        id: 'faq5',
        question: 'How can I contact support?',
        answer: 'You can contact our support team through the Help Center, by email at support@example.com, or through the live chat feature available 24/7.',
      },
    ];

    return (
      <Box data-testid="accordion.stories">
        <Typography variant="h5" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Find answers to commonly asked questions below.
        </Typography>
        
        <Box data-testid="accordion.stories" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              variant="standard"
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              summary={faq.question}
              startIcon={<span>❓</span>}
            >
              <Typography variant="body2">
                {faq.answer}
              </Typography>
            </Accordion>
          ))}
        </Box>
      </Box>
    );
  },
};

// Accessibility Story
/**
 * AccessibilityDemo component
 * 
 * @returns JSX element
 */
export const AccessibilityDemo: Story = {
  render: (args) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
      <Box data-testid="accordion.stories">
        <Typography variant="h6" gutterBottom>
          Accessibility Features Demo
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This demo showcases accessibility features including keyboard navigation, 
          focus management, and screen reader support.
        </Typography>
        
        <Box data-testid="accordion.stories" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Accordion
            variant="outlined"
            expanded={expanded === 'a11y1'}
            onChange={handleChange('a11y1')}
            summary="Keyboard Navigation"
            aria-label="Keyboard navigation information"
            focusColor="primary"
          >
            <Typography variant="body2" paragraph>
              Use the following keyboard shortcuts:
            </Typography>
            <ul>
              <li><strong>Tab:</strong> Navigate between accordions</li>
              <li><strong>Enter/Space:</strong> Expand/collapse accordion</li>
              <li><strong>Arrow keys:</strong> Navigate between accordion items</li>
            </ul>
          </Accordion>

          <Accordion
            variant="outlined"
            expanded={expanded === 'a11y2'}
            onChange={handleChange('a11y2')}
            summary="Screen Reader Support"
            aria-label="Screen reader support information"
            focusColor="secondary"
          >
            <Typography variant="body2" paragraph>
              This accordion provides proper ARIA attributes:
            </Typography>
            <ul>
              <li>aria-expanded indicates expansion state</li>
              <li>aria-controls links summary to content</li>
              <li>Proper heading structure for navigation</li>
              <li>Descriptive labels for all interactive elements</li>
            </ul>
          </Accordion>

          <Accordion
            variant="outlined"
            expanded={expanded === 'a11y3'}
            onChange={handleChange('a11y3')}
            summary="Focus Management"
            aria-label="Focus management information"
          >
            <Typography variant="body2" paragraph>
              Focus is properly managed throughout interactions:
            </Typography>
            <ul>
              <li>Focus remains on summary when expanding</li>
              <li>Focus indicators are clearly visible</li>
              <li>Tab order is logical and predictable</li>
              <li>Focus is restored when appropriate</li>
            </ul>
          </Accordion>
        </Box>
      </Box>
    );
  },
};

// Theme Stories
/**
 * LightTheme component
 * 
 * @returns JSX element
 */
export const LightTheme: Story = {
  args: {
    variant: 'outlined',
    summary: 'Light Theme Accordion',
    subtitle: 'Default light theme styling',
    children: 'This accordion demonstrates the light theme styling with proper contrast and colors.',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

/**
 * DarkTheme component
 * 
 * @returns JSX element
 */
export const DarkTheme: Story = {
  args: {
    variant: 'outlined',
    summary: 'Dark Theme Accordion',
    subtitle: 'Dark theme with enhanced contrast',
    children: 'This accordion demonstrates the dark theme styling with enhanced contrast for OLED displays.',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      theme: 'dark',
    },
  },
};

// Performance Demo Story
/**
 * PerformanceDemo component
 * 
 * @returns JSX element
 */
export const PerformanceDemo: Story = {
  render: (args) => {
    const [accordions] = useState(() => 
      Array.from({ length: 20 }, (_, i) => ({
        id: `perf-${i}`,
        title: `Performance Item ${i + 1}`,
        content: `This is content for performance test item ${i + 1}. It demonstrates how the accordion component handles multiple instances efficiently.`,
      }))
    );

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
      <Box data-testid="accordion.stories">
        <Typography variant="h6" gutterBottom>
          Performance Demo (20 Accordions)
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This demo shows how the accordion component performs with many instances.
          All accordions are memoized for optimal performance.
        </Typography>
        
        <Box data-testid="accordion.stories" sx={{ maxHeight: 400, overflow: 'auto' }}>
          {accordions.map((item) => (
            <Accordion
              key={item.id}
              variant="standard"
              expanded={expanded === item.id}
              onChange={handleChange(item.id)}
              summary={item.title}
              dense
            >
              <Typography variant="body2">
                {item.content}
              </Typography>
            </Accordion>
          ))}
        </Box>
      </Box>
    );
  },
};