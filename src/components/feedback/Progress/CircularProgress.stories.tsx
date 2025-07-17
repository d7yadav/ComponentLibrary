import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, {  useState, useEffect  } from 'react';

import { Button } from '@/components/core/Button';
import { Card, CardContent } from '@/components/data-display/Card';
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

import { CircularProgress } from './CircularProgress';


/**
 * CircularProgress displays progress in a circular format.
 * It supports determinate and indeterminate modes with various styling options.
 * 
 * ## Features
 * - Determinate and indeterminate modes
 * - Multiple size variants
 * - Color customization
 * - Value display options
 * - Track visibility control
 * - Label integration
 * - Accessibility compliance
 */
const meta: Meta<typeof CircularProgress> = {
  title: 'Feedback/Progress/CircularProgress',
  component: CircularProgress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Circular progress indicator for showing task completion status.',
      },
    },
  onClick: {

    action: 'onClick',

    description: 'Callback fired when click occurs',

  },

  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'The variant of progress indicator',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The progress value (0-100)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the circular progress',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'The color theme of the progress indicator',
    },
    thickness: {
      control: { type: 'range', min: 1, max: 10, step: 0.5 },
      description: 'The thickness of the progress ring',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show the progress value',
    },
    showTrack: {
      control: 'boolean',
      description: 'Whether to show the background track',
    },
    label: {
      control: 'text',
      description: 'Optional label text',
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the progress indicator',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether to use rounded line caps',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    variant: 'determinate',
    value: 75,
    showValue: true,
  
    onClick: fn(),
  },
};

// ===== VARIANTS =====
export const Variants: Story = {
  render: (args) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
      <Stack data-testid="circularprogress.stories" direction="row" spacing={6} alignItems="center">
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={progress}
            showValue
            showTrack
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Determinate
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="indeterminate"
            color="secondary"
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Indeterminate
          </Typography>
        </Box>
      </Stack>
    );
  },
};

// ===== SIZE VARIANTS =====
export const SizeVariants: Story = {
  render: (args) => (
    <Stack data-testid="circularprogress.stories" direction="row" spacing={4} alignItems="center">
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress 
          variant="determinate" 
          value={75} 
          size="small"
          showValue
        />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Small
        </Typography>
      </Box>
      
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress 
          variant="determinate" 
          value={75} 
          size="medium"
          showValue
        />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Medium
        </Typography>
      </Box>
      
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress 
          variant="determinate" 
          value={75} 
          size="large"
          showValue
        />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Large
        </Typography>
      </Box>
    </Stack>
  ),
};

// ===== COLOR THEMES =====
export const ColorThemes: Story = {
  render: (args) => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 3 }}>
      {[
        { color: 'primary', label: 'Primary' },
        { color: 'secondary', label: 'Secondary' },
        { color: 'success', label: 'Success' },
        { color: 'warning', label: 'Warning' },
        { color: 'error', label: 'Error' },
        { color: 'info', label: 'Info' },
      ].map(({ color, label }) => (
        <Box key={color} sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={75} 
            color={color as any}
            showValue
            showTrack
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
};

// ===== STYLING OPTIONS =====
export const StylingOptions: Story = {
  render: (args) => (
    <Stack data-testid="circularprogress.stories" spacing={4}>
      <Typography variant="h6" gutterBottom>
        Different Styling Options
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={75}
            showValue
            showTrack
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Default
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={75}
            showValue
            showTrack={false}
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            No Track
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={75}
            thickness={2}
            showValue
            showTrack
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Thin
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={75}
            thickness={8}
            showValue
            showTrack
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Thick
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={75}
            rounded
            showValue
            showTrack
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Rounded
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={75}
            size="large"
            color="success"
            thickness={6}
            rounded
            showValue
            showTrack
            label="Complete"
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Custom
          </Typography>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== WITH LABELS =====
export const WithLabels: Story = {
  render: (args) => (
    <Stack data-testid="circularprogress.stories" spacing={4}>
      <Typography variant="h6" gutterBottom>
        Progress with Labels
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={85}
            size="large"
            showValue
            showTrack
            label="Upload"
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            File Upload
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={60}
            size="large"
            color="secondary"
            showValue
            showTrack
            label="Sync"
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Synchronizing
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={95}
            size="large"
            color="success"
            showValue
            showTrack
            label="Done"
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Nearly Complete
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            variant="indeterminate"
            size="large"
            color="info"
            label="..."
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Processing
          </Typography>
        </Box>
      </Box>
    </Stack>
  ),
};

// ===== INTERACTIVE DASHBOARD =====
export const InteractiveDashboard: Story = {
  render: (args) => {
    const [metrics, setMetrics] = useState({
      cpu: 45,
      memory: 67,
      disk: 23,
      network: 89,
    });

    const refreshMetrics = () => {
      setMetrics({
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        disk: Math.random() * 100,
        network: Math.random() * 100,
      });
    };

    const getColor = (value: number) => {
      if (value < 30) return 'success';
      if (value < 70) return 'warning';
      return 'error';
    };

    return (
      <Stack data-testid="circularprogress.stories" spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">System Metrics Dashboard</Typography>
          <Button onClick={refreshMetrics} variant="outlined" size="small">
            Refresh
          </Button>
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CircularProgress 
                variant="determinate" 
                value={metrics.cpu}
                size="large"
                color={getColor(metrics.cpu) as any}
                showValue
                showTrack
                label="CPU"
              />
              <Typography variant="h6" sx={{ mt: 2 }}>CPU Usage</Typography>
              <Typography variant="body2" color="text.secondary">
                {metrics.cpu.toFixed(1)}% utilized
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CircularProgress 
                variant="determinate" 
                value={metrics.memory}
                size="large"
                color={getColor(metrics.memory) as any}
                showValue
                showTrack
                label="RAM"
              />
              <Typography variant="h6" sx={{ mt: 2 }}>Memory</Typography>
              <Typography variant="body2" color="text.secondary">
                {(metrics.memory * 0.16).toFixed(1)} GB / 16 GB
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CircularProgress 
                variant="determinate" 
                value={metrics.disk}
                size="large"
                color={getColor(metrics.disk) as any}
                showValue
                showTrack
                label="SSD"
              />
              <Typography variant="h6" sx={{ mt: 2 }}>Disk Space</Typography>
              <Typography variant="body2" color="text.secondary">
                {(metrics.disk * 5.12).toFixed(0)} GB / 512 GB
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CircularProgress 
                variant="determinate" 
                value={metrics.network}
                size="large"
                color={getColor(100 - metrics.network) as any}
                showValue
                showTrack
                label="NET"
              />
              <Typography variant="h6" sx={{ mt: 2 }}>Network</Typography>
              <Typography variant="body2" color="text.secondary">
                {metrics.network.toFixed(1)} Mbps
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    );
  },
};

// ===== REAL-WORLD SCENARIOS =====
export const RealWorldScenarios: Story = {
  render: (args) => {
    const [taskProgress, setTaskProgress] = useState({
      download: 78,
      backup: 45,
      sync: 92,
      install: 33,
    });

    useEffect(() => {
      const interval = setInterval(() => {
        setTaskProgress(prev => ({
          download: Math.min(prev.download + Math.random() * 2, 100),
          backup: Math.min(prev.backup + Math.random() * 1.5, 100),
          sync: prev.sync, // Keep static for this demo
          install: Math.min(prev.install + Math.random() * 3, 100),
        }));
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <Stack data-testid="circularprogress.stories" spacing={4}>
        <Typography variant="h6" gutterBottom>
          Real-World Progress Scenarios
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress 
                  variant="determinate" 
                  value={taskProgress.download}
                  color="primary"
                  showValue
                  size="medium"
                />
                <Box>
                  <Typography variant="subtitle1">File Download</Typography>
                  <Typography variant="body2" color="text.secondary">
                    document.pdf • 2.3 MB
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {taskProgress.download.toFixed(0)}% complete
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress 
                  variant="determinate" 
                  value={taskProgress.backup}
                  color="info"
                  showValue
                  size="medium"
                />
                <Box>
                  <Typography variant="subtitle1">System Backup</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Backing up 1,247 files
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {Math.round((taskProgress.backup / 100) * 1247)} files processed
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress 
                  variant="determinate" 
                  value={taskProgress.sync}
                  color="success"
                  showValue
                  size="medium"
                />
                <Box>
                  <Typography variant="subtitle1">Cloud Sync</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Synced with cloud storage
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    Up to date
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress 
                  variant="determinate" 
                  value={taskProgress.install}
                  color="secondary"
                  showValue
                  size="medium"
                />
                <Box>
                  <Typography variant="subtitle1">App Installation</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Installing updates...
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Package 3 of 8
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    );
  },
};

// ===== ACCESSIBILITY FEATURES =====
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Stack data-testid="circularprogress.stories" spacing={4}>
      <Typography variant="h6" gutterBottom>
        Accessibility Features
      </Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Screen Reader Support
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress 
            variant="determinate"
            value={75}
            showValue
            showTrack
            aria-label="Task completion progress: 75% complete"
            role="progressbar"
          />
          <Typography variant="body2">
            Includes proper ARIA attributes for screen reader announcements.
          </Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          High Contrast Compatibility
        </Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress 
            variant="determinate"
            value={60}
            showValue
            showTrack
            color="primary"
          />
          <Typography variant="body2">
            Progress indicators maintain visibility in high contrast mode.
          </Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Reduced Motion Support
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress 
            variant="indeterminate"
            color="secondary"
          />
          <Typography variant="body2">
            Animations respect user's reduced motion preferences for accessibility.
          </Typography>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Keyboard Navigation Support
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress 
            variant="determinate"
            value={85}
            showValue
            showTrack
            tabIndex={0}
            sx={{
              '&:focus-visible': {
                outline: '2px solid #1976d2',
                outlineOffset: '4px',
                borderRadius: '50%'
              }
            }}
          />
          <Typography variant="body2">
            Progress elements can receive keyboard focus when needed.
          </Typography>
        </Box>
      </Box>
    </Stack>
  ),
};