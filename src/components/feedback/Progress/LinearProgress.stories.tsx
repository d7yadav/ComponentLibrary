import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, {  useState, useEffect  } from 'react';

import { Button } from '@/components/core/Button';
import { Card, CardContent } from '@/components/data-display/Card';
import { Typography } from '@/components/data-display/Typography';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';

import { LinearProgress } from './LinearProgress';


/**
 * LinearProgress shows the progress of a task in a linear format.
 * It supports determinate, indeterminate, and buffer modes with customizable styling.
 * 
 * ## Features
 * - Determinate and indeterminate modes
 * - Buffer progress with secondary indicator
 * - Multiple color themes
 * - Size variants (small, medium, large)
 * - Striped and animated patterns
 * - Value display options
 * - Accessibility compliance
 */
const meta: Meta<typeof LinearProgress> = {
  title: 'Feedback/Progress/LinearProgress',
  component: LinearProgress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Linear progress indicator for showing task completion status.',
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
      options: ['determinate', 'indeterminate', 'buffer'],
      description: 'The variant of progress indicator',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The progress value (0-100)',
    },
    valueBuffer: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The buffer value for buffer variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'The color theme of the progress bar',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the progress bar',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show the progress value',
    },
    label: {
      control: 'text',
      description: 'Optional label text',
    },
    striped: {
      control: 'boolean',
      description: 'Whether to show striped pattern',
    },
    stripedAnimated: {
      control: 'boolean',
      description: 'Whether to animate the striped pattern',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether to use rounded corners',
    },
    elevated: {
      control: 'boolean',
      description: 'Whether to show elevation shadow',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ===== DEFAULT STORY =====
export const Default: Story = {
  args: {
    variant: 'determinate',
    value: 65,
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
      <Stack data-testid="linearprogress.stories" spacing={4}>
        <Box>
          <Typography variant="h6" gutterBottom>Determinate Progress</Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            label="File Upload"
            showValue
          />
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>Indeterminate Progress</Typography>
          <LinearProgress 
            variant="indeterminate" 
            label="Processing..."
            color="secondary"
          />
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>Buffer Progress</Typography>
          <LinearProgress 
            variant="buffer" 
            value={progress} 
            valueBuffer={progress + 10}
            label="Stream Loading"
            color="info"
            showValue
          />
        </Box>
      </Stack>
    );
  },
};

// ===== COLOR THEMES =====
export const ColorThemes: Story = {
  render: (args) => (
    <Stack data-testid="linearprogress.stories" spacing={3}>
      <LinearProgress variant="determinate" value={75} color="primary" label="Primary" showValue />
      <LinearProgress variant="determinate" value={60} color="secondary" label="Secondary" showValue />
      <LinearProgress variant="determinate" value={85} color="success" label="Success" showValue />
      <LinearProgress variant="determinate" value={45} color="warning" label="Warning" showValue />
      <LinearProgress variant="determinate" value={30} color="error" label="Error" showValue />
      <LinearProgress variant="determinate" value={90} color="info" label="Info" showValue />
    </Stack>
  ),
};

// ===== SIZE VARIANTS =====
export const SizeVariants: Story = {
  render: (args) => (
    <Stack data-testid="linearprogress.stories" spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Small Size</Typography>
        <LinearProgress 
          variant="determinate" 
          value={65} 
          size="small"
          label="Small Progress"
          showValue
        />
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Medium Size</Typography>
        <LinearProgress 
          variant="determinate" 
          value={65} 
          size="medium"
          label="Medium Progress"
          showValue
        />
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Large Size</Typography>
        <LinearProgress 
          variant="determinate" 
          value={65} 
          size="large"
          label="Large Progress"
          showValue
        />
      </Box>
    </Stack>
  ),
};

// ===== STYLING OPTIONS =====
export const StylingOptions: Story = {
  render: (args) => (
    <Stack data-testid="linearprogress.stories" spacing={4}>
      <Box>
        <Typography variant="h6" gutterBottom>Standard</Typography>
        <LinearProgress variant="determinate" value={75} showValue />
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Rounded Corners</Typography>
        <LinearProgress 
          variant="determinate" 
          value={75} 
          rounded
          showValue
        />
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Elevated</Typography>
        <LinearProgress 
          variant="determinate" 
          value={75} 
          elevated
          showValue
        />
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Striped</Typography>
        <LinearProgress 
          variant="determinate" 
          value={75} 
          striped
          showValue
        />
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Striped Animated</Typography>
        <LinearProgress 
          variant="determinate" 
          value={75} 
          striped
          stripedAnimated
          showValue
        />
      </Box>
      
      <Box>
        <Typography variant="h6" gutterBottom>Combined Styling</Typography>
        <LinearProgress 
          variant="determinate" 
          value={75} 
          size="large"
          color="success"
          rounded
          elevated
          striped
          stripedAnimated
          label="Premium Upload"
          showValue
        />
      </Box>
    </Stack>
  ),
};

// ===== INTERACTIVE EXAMPLES =====
export const InteractiveExamples: Story = {
  render: (args) => {
    const [downloads, setDownloads] = useState({
      file1: 0,
      file2: 0,
      file3: 0,
    });
    
    const [isDownloading, setIsDownloading] = useState({
      file1: false,
      file2: false,
      file3: false,
    });

    const startDownload = (fileId: keyof typeof downloads) => {
      setIsDownloading(prev => ({ ...prev, [fileId]: true }));
      setDownloads(prev => ({ ...prev, [fileId]: 0 }));

      const interval = setInterval(() => {
        setDownloads(prev => {
          const newProgress = prev[fileId] + Math.random() * 15;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsDownloading(current => ({ ...current, [fileId]: false }));
            return { ...prev, [fileId]: 100 };
          }
          return { ...prev, [fileId]: newProgress };
        });
      }, 200);
    };

    return (
      <Stack data-testid="linearprogress.stories" spacing={3}>
        <Typography variant="h6" gutterBottom>
          File Download Manager
        </Typography>
        
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">document.pdf</Typography>
              <Button 
                size="small" 
                onClick={() => startDownload('file1')}
                disabled={isDownloading.file1}
                variant="outlined"
              >
                {isDownloading.file1 ? 'Downloading...' : 'Download'}
              </Button>
            </Box>
            <LinearProgress 
              variant={isDownloading.file1 ? 'determinate' : 'determinate'}
              value={downloads.file1}
              color="primary"
              showValue
              striped={isDownloading.file1}
              stripedAnimated={isDownloading.file1}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">presentation.pptx</Typography>
              <Button 
                size="small" 
                onClick={() => startDownload('file2')}
                disabled={isDownloading.file2}
                variant="outlined"
              >
                {isDownloading.file2 ? 'Downloading...' : 'Download'}
              </Button>
            </Box>
            <LinearProgress 
              variant={isDownloading.file2 ? 'determinate' : 'determinate'}
              value={downloads.file2}
              color="secondary"
              showValue
              rounded
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">video.mp4</Typography>
              <Button 
                size="small" 
                onClick={() => startDownload('file3')}
                disabled={isDownloading.file3}
                variant="outlined"
              >
                {isDownloading.file3 ? 'Downloading...' : 'Download'}
              </Button>
            </Box>
            <LinearProgress 
              variant={isDownloading.file3 ? 'determinate' : 'determinate'}
              value={downloads.file3}
              color="success"
              size="large"
              showValue
              elevated
            />
          </CardContent>
        </Card>
      </Stack>
    );
  },
};

// ===== REAL-WORLD SCENARIOS =====
export const RealWorldScenarios: Story = {
  render: (args) => {
    const [scenarioProgress, setScenarioProgress] = useState({
      backup: 45,
      sync: 78,
      install: 23,
      upload: 92,
    });

    return (
      <Stack data-testid="linearprogress.stories" spacing={4}>
        <Typography variant="h6" gutterBottom>
          Real-World Progress Scenarios
        </Typography>
        
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            System Backup
          </Typography>
          <LinearProgress 
            variant="determinate"
            value={scenarioProgress.backup}
            label="Backing up system files..."
            color="info"
            showValue
            striped
            stripedAnimated
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Estimated time remaining: 15 minutes
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Cloud Synchronization
          </Typography>
          <LinearProgress 
            variant="buffer"
            value={scenarioProgress.sync}
            valueBuffer={scenarioProgress.sync + 5}
            label="Syncing with cloud storage..."
            color="primary"
            showValue
            rounded
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {Math.round((scenarioProgress.sync / 100) * 1247)} / 1247 files synchronized
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Software Installation
          </Typography>
          <LinearProgress 
            variant="determinate"
            value={scenarioProgress.install}
            label="Installing updates..."
            color="secondary"
            size="large"
            showValue
            elevated
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Installing package 3 of 12
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            File Upload
          </Typography>
          <LinearProgress 
            variant="determinate"
            value={scenarioProgress.upload}
            label="Uploading to server..."
            color="success"
            showValue
            striped
            rounded
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Upload speed: 2.3 MB/s
          </Typography>
        </Box>
      </Stack>
    );
  },
};

// ===== ACCESSIBILITY FEATURES =====
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Stack data-testid="linearprogress.stories" spacing={4}>
      <Typography variant="h6" gutterBottom>
        Accessibility Features
      </Typography>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Screen Reader Support
        </Typography>
        <LinearProgress 
          variant="determinate"
          value={75}
          label="File processing progress"
          showValue
          aria-label="File processing progress: 75% complete"
          role="progressbar"
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Includes proper ARIA attributes for screen reader announcements.
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          High Contrast Compatibility
        </Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <LinearProgress 
            variant="determinate"
            value={60}
            label="High contrast progress"
            showValue
            color="primary"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Progress bars maintain visibility in high contrast mode.
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Reduced Motion Support
        </Typography>
        <LinearProgress 
          variant="indeterminate"
          label="Respects motion preferences"
          color="secondary"
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Animations respect user's reduced motion preferences.
        </Typography>
      </Box>
    </Stack>
  ),
};