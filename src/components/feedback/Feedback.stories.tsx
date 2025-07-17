import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';

import { Button } from '@/components/core/Button';
import { Box } from '@/components/layout/Box';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';

import { 
  Alert, 
  Snackbar, 
  LinearProgress, 
  CircularProgress, 
  Loading,
  Skeleton
} from './index';

const meta: Meta = {
  title: 'Feedback/Overview',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Feedback Components

A comprehensive collection of feedback components for user interaction and system status communication.

## Components Included
- **Alert**: Contextual feedback messages with multiple severity levels
- **Snackbar**: Temporary notification messages with positioning
- **Progress**: Linear and circular progress indicators
- **Loading**: Various loading spinners and skeleton placeholders

## Features
- Multiple severity levels (error, warning, info, success)
- Responsive design and positioning options
- Auto-hide functionality with customizable durations
- Accessibility compliance (WCAG 2.1 AA)
- Animation support for enhanced user experience
- Dark theme compatibility
- TypeScript support with strict typing
        `
      }
    }
  },
  argTypes: {
    onClick: {
      action: 'onClick',
      description: 'Callback fired when click occurs',
  },
    onClose: {
      action: 'onClose',
      description: 'Callback fired when close occurs',
    },
  },
  tags: ['autodocs'],

  args: {
    onClick: fn(),
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj;

// Alert Examples
/**
 * AlertVariants component
 * 
 * @returns JSX element
 */
export const AlertVariants: Story = {
  render: (args) => (
    <Container data-testid="feedback.stories" maxWidth="md">
      <Stack spacing={3}>
        <Box>
          <h2>Alert Components</h2>
          <p>Contextual feedback messages with multiple severity levels and styling options.</p>
        </Box>
        
        <Stack spacing={2}>
          <h3>Severity Levels</h3>
          <Alert severity="success" title="Success">
            Your changes have been saved successfully!
          </Alert>
          
          <Alert severity="info" title="Information">
            Here's some helpful information for you to review.
          </Alert>
          
          <Alert severity="warning" title="Warning">
            Please review the following before proceeding.
          </Alert>
          
          <Alert severity="error" title="Error">
            There was an error processing your request.
          </Alert>
        </Stack>
        
        <Stack spacing={2}>
          <h3>Variants</h3>
          <Alert severity="info" variant="standard" title="Standard Variant">
            This is a standard alert with background color.
          </Alert>
          
          <Alert severity="info" variant="outlined" title="Outlined Variant">
            This is an outlined alert with border.
          </Alert>
          
          <Alert severity="info" variant="filled" title="Filled Variant">
            This is a filled alert with solid background.
          </Alert>
        </Stack>
        
        <Stack spacing={2}>
          <h3>Sizes and Features</h3>
          <Alert severity="success" size="small" closable>
            Small alert with close button
          </Alert>
          
          <Alert 
            severity="warning" 
            size="medium" 
            title="Medium Alert"
            closable
            actions={[
              { label: 'Action', onClick: () => console.log('Action clicked') },
              { label: 'Dismiss', onClick: () => console.log('Dismiss clicked') }
            ]}
          >
            Medium alert with title, actions, and close button
          </Alert>
          
          <Alert 
            severity="error" 
            size="large" 
            title="Large Alert"
            elevated
            rounded
            autoHide
            autoHideDuration={5000}
          >
            Large alert that auto-hides in 5 seconds with elevation and rounded corners
          </Alert>
        </Stack>
      </Stack>
    </Container>
  )
};

// Snackbar Examples
/**
 * SnackbarExamples component
 * 
 * @returns JSX element
 */
export const SnackbarExamples: Story = {
  render: (args) => {
    const [snackbars, setSnackbars] = useState({
      success: false,
      error: false,
      warning: false,
      info: false,
    });

    const handleOpen = (type: keyof typeof snackbars) => {
      setSnackbars(prev => ({ ...prev, [type]: true }));
    };

    const handleClose = (type: keyof typeof snackbars) => {
      setSnackbars(prev => ({ ...prev, [type]: false }));
    };

    return (
      <Container data-testid="feedback.stories" maxWidth="md">
        <Stack spacing={3}>
          <Box>
            <h2>Snackbar Components</h2>
            <p>Temporary notification messages with positioning and auto-hide functionality.</p>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="primary" 
                fullWidth
                onClick={() => handleOpen('success')}
              >
                Success Snackbar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="secondary" 
                fullWidth
                onClick={() => handleOpen('info')}
              >
                Info Snackbar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="outline" 
                fullWidth
                onClick={() => handleOpen('warning')}
              >
                Warning Snackbar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="text" 
                fullWidth
                onClick={() => handleOpen('error')}
              >
                Error Snackbar
              </Button>
            </Grid>
          </Grid>
          
          {/* Snackbars */}
          <Snackbar
            open={snackbars.success}
            onClose={() => handleClose('success')}
            severity="success"
            message="Operation completed successfully!"
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          />
          
          <Snackbar
            open={snackbars.info}
            onClose={() => handleClose('info')}
            severity="info"
            title="Information"
            message="Here's some helpful information for you."
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            closable
          />
          
          <Snackbar
            open={snackbars.warning}
            onClose={() => handleClose('warning')}
            severity="warning"
            message="Please review your settings before continuing."
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            actions={[
              { label: 'Review', onClick: () => console.log('Review clicked') },
              { label: 'Later', onClick: () => handleClose('warning') }
            ]}
          />
          
          <Snackbar
            open={snackbars.error}
            onClose={() => handleClose('error')}
            severity="error"
            title="Error Occurred"
            message="Unable to save changes. Please try again."
            autoHideDuration={null}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            closable
            actions={[
              { label: 'Retry', onClick: () => console.log('Retry clicked') }
            ]}
          />
        </Stack>
      </Container>
    );
  }
};

// Progress Examples
/**
 * ProgressIndicators component
 * 
 * @returns JSX element
 */
export const ProgressIndicators: Story = {
  render: (args) => {
    const [progress, setProgress] = useState(0);
    
    React.useEffect(() => {
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
      <Container data-testid="feedback.stories" maxWidth="lg">
        <Stack spacing={4}>
          <Box>
            <h2>Progress Indicators</h2>
            <p>Linear and circular progress indicators with various styles and configurations.</p>
          </Box>
          
          <Grid container spacing={4}>
            {/* Linear Progress */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <h3>Linear Progress</h3>
                
                <Box>
                  <h4>Determinate Progress</h4>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    label="Upload Progress"
                    showValue
                  />
                </Box>
                
                <Box>
                  <h4>Indeterminate Progress</h4>
                  <LinearProgress 
                    variant="indeterminate" 
                    color="secondary"
                    label="Loading..."
                  />
                </Box>
                
                <Box>
                  <h4>Buffer Progress</h4>
                  <LinearProgress 
                    variant="buffer" 
                    value={progress} 
                    valueBuffer={progress + 10}
                    color="info"
                    showValue
                    striped
                  />
                </Box>
                
                <Box>
                  <h4>Styled Progress</h4>
                  <LinearProgress 
                    variant="determinate" 
                    value={75} 
                    color="success"
                    size="large"
                    rounded
                    elevated
                    striped
                    stripedAnimated
                    showValue
                    label="Processing..."
                  />
                </Box>
              </Stack>
            </Grid>
            
            {/* Circular Progress */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <h3>Circular Progress</h3>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box textAlign="center">
                      <h4>Determinate</h4>
                      <CircularProgress 
                        variant="determinate" 
                        value={progress}
                        showValue
                        centered
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Box textAlign="center">
                      <h4>Indeterminate</h4>
                      <CircularProgress 
                        variant="indeterminate" 
                        color="secondary"
                        centered
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Box textAlign="center">
                      <h4>With Label</h4>
                      <CircularProgress 
                        variant="determinate" 
                        value={progress}
                        color="success"
                        label="Upload"
                        showValue
                        centered
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Box textAlign="center">
                      <h4>Large Size</h4>
                      <CircularProgress 
                        variant="determinate" 
                        value={85}
                        color="warning"
                        size="large"
                        showTrack
                        rounded
                        showValue
                        centered
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    );
  }
};

// Loading Examples
/**
 * LoadingStates component
 * 
 * @returns JSX element
 */
export const LoadingStates: Story = {
  render: (args) => {
    const [loadingStates, setLoadingStates] = useState({
      page: false,
      content: false,
      button: false,
      overlay: false,
    });

    const handleToggle = (type: keyof typeof loadingStates) => {
      setLoadingStates(prev => ({ ...prev, [type]: !prev[type] }));
    };

    return (
      <Container data-testid="feedback.stories" maxWidth="lg">
        <Stack spacing={4}>
          <Box>
            <h2>Loading Components</h2>
            <p>Various loading spinners and skeleton placeholders for different use cases.</p>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="primary" 
                fullWidth
                onClick={() => handleToggle('page')}
              >
                Page Loading
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="secondary" 
                fullWidth
                onClick={() => handleToggle('content')}
              >
                Content Loading
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="outline" 
                fullWidth
                onClick={() => handleToggle('button')}
                loading={loadingStates.button}
              >
                Button Loading
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                variant="text" 
                fullWidth
                onClick={() => handleToggle('overlay')}
              >
                Overlay Loading
              </Button>
            </Grid>
          </Grid>
          
          <Grid container spacing={4}>
            {/* Spinner Types */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <h3>Spinner Types</h3>
                
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Loading type="circular" size="medium" />
                      <Box mt={1} fontSize="0.75rem">Circular</Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Loading type="dots" size="medium" />
                      <Box mt={1} fontSize="0.75rem">Dots</Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Loading type="bars" size="medium" />
                      <Box mt={1} fontSize="0.75rem">Bars</Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Loading type="pulse" size="medium" />
                      <Box mt={1} fontSize="0.75rem">Pulse</Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Loading type="ring" size="medium" />
                      <Box mt={1} fontSize="0.75rem">Ring</Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Loading type="wave" size="medium" />
                      <Box mt={1} fontSize="0.75rem">Wave</Box>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            
            {/* Skeleton Examples */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <h3>Skeleton Placeholders</h3>
                
                <Box>
                  <h4>Text Skeleton</h4>
                  <Skeleton variant="text" lines={3} animation="wave" />
                </Box>
                
                <Box>
                  <h4>Card Skeleton</h4>
                  <Stack spacing={1}>
                    <Skeleton variant="rectangular" height={140} animation="pulse" />
                    <Skeleton variant="text" animation="wave" />
                    <Skeleton variant="text" width="60%" animation="wave" />
                  </Stack>
                </Box>
                
                <Box>
                  <h4>Avatar + Text</h4>
                  <Box display="flex" gap={2}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box flex={1}>
                      <Skeleton variant="text" animation="wave" />
                      <Skeleton variant="text" width="80%" animation="wave" />
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          
          {/* Loading States */}
          {loadingStates.page && (
            <Loading 
              type="circular"
              variant="page"
              size="large"
              message="Loading page content..."
              backdrop
              onTimeout={() => handleToggle('page')}
              timeout={5000}
            />
          )}
          
          {loadingStates.content && (
            <Box 
              bgcolor="grey.50" 
              p={3} 
              borderRadius={2}
              position="relative"
              minHeight={200}
            >
              <Loading 
                type="skeleton"
                variant="overlay"
                fullWidth
                fullHeight
              >
                <h4>Content Area</h4>
                <p>This content is hidden when loading.</p>
              </Loading>
            </Box>
          )}
          
          {loadingStates.overlay && (
            <Box 
              bgcolor="background.paper" 
              p={3} 
              borderRadius={2}
              border={1}
              borderColor="divider"
              position="relative"
              minHeight={150}
            >
              <h4>Content with Overlay</h4>
              <p>This content has an overlay loading state.</p>
              
              <Loading 
                type="ripple"
                variant="overlay"
                centered
                backdrop
                backdropOpacity={0.3}
                message="Processing..."
              />
            </Box>
          )}
        </Stack>
      </Container>
    );
  }
};

// Comprehensive Example
/**
 * FeedbackWorkflow component
 * 
 * @returns JSX element
 */
export const FeedbackWorkflow: Story = {
  render: (args) => {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const steps = [
      'Initialize',
      'Process Data',
      'Validate',
      'Complete'
    ];

    const handleNext = () => {
      if (step < steps.length - 1) {
        setStep(step + 1);
        setProgress((step + 1) * 25);
      } else {
        setShowSuccess(true);
        setStep(0);
        setProgress(0);
      }
    };

    const handleError = () => {
      setShowError(true);
    };

    const handleReset = () => {
      setStep(0);
      setProgress(0);
      setShowSuccess(false);
      setShowError(false);
    };

    return (
      <Container data-testid="feedback.stories" maxWidth="md">
        <Stack spacing={4}>
          <Box>
            <h2>Feedback Workflow Example</h2>
            <p>A complete workflow demonstrating all feedback components working together.</p>
          </Box>
          
          {/* Progress Section */}
          <Box 
            bgcolor="background.paper" 
            p={3} 
            borderRadius={2} 
            border={1} 
            borderColor="divider"
          >
            <h3>Processing Steps</h3>
            <LinearProgress 
              variant="determinate" 
              value={progress}
              label={`Step ${step + 1}: ${steps[step]}`}
              showValue
              size="large"
              color="primary"
              rounded
              striped={progress > 0 && progress < 100}
              stripedAnimated={progress > 0 && progress < 100}
            />
            
            <Box mt={2} display="flex" gap={2}>
              <Button 
                variant="primary" 
                onClick={handleNext}
                disabled={progress >= 100}
              >
                Next Step
              </Button>
              <Button 
                variant="outline" 
                onClick={handleError}
              >
                Simulate Error
              </Button>
              <Button 
                variant="text" 
                onClick={handleReset}
              >
                Reset
              </Button>
            </Box>
          </Box>
          
          {/* Status Alerts */}
          {progress > 0 && progress < 100 && (
            <Alert 
              severity="info" 
              title="Processing"
              closable={false}
              animated
            >
              Currently processing step {step + 1} of {steps.length}: {steps[step]}
            </Alert>
          )}
          
          {progress === 100 && (
            <Alert 
              severity="success" 
              title="Complete"
              autoHide
              autoHideDuration={3000}
              onClose={fn()}
            >
              All steps completed successfully!
            </Alert>
          )}
          
          {/* Snackbar Notifications */}
          <Snackbar
            open={showSuccess}
            onClose={() => setShowSuccess(false)}
            severity="success"
            title="Success!"
            message="Workflow completed successfully"
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            actions={[
              { label: 'View Details', onClick: () => console.log('View details') }
            ]}
          />
          
          <Snackbar
            open={showError}
            onClose={() => setShowError(false)}
            severity="error"
            title="Error Occurred"
            message="An error occurred during processing"
            autoHideDuration={null}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            closable
            actions={[
              { label: 'Retry', onClick: () => setShowError(false) },
              { label: 'Report', onClick: () => console.log('Report error') }
            ]}
          />
          
          {/* Loading States */}
          {(step === 1 || step === 2) && (
            <Box textAlign="center" py={2}>
              <Loading 
                type={step === 1 ? 'bars' : 'wave'}
                size="large"
                message={step === 1 ? 'Processing data...' : 'Validating results...'}
                color="primary"
              />
            </Box>
          )}
        </Stack>
      </Container>
    );
  }
};

// Accessibility Features
/**
 * AccessibilityFeatures component
 * 
 * @returns JSX element
 */
export const AccessibilityFeatures: Story = {
  render: (args) => (
    <Container data-testid="feedback.stories" maxWidth="md">
      <Stack spacing={4}>
        <Box>
          <h2>Accessibility Features</h2>
          <p>All feedback components include comprehensive accessibility support.</p>
        </Box>
        
        <Alert 
          severity="info" 
          title="Screen Reader Support"
          aria-label="Screen reader accessibility information"
          role="region"
        >
          All components include proper ARIA labels, roles, and live regions for screen readers.
        </Alert>
        
        <Box>
          <h3>Keyboard Navigation</h3>
          <Stack spacing={2}>
            <Alert 
              severity="warning" 
              title="Keyboard Accessible"
              closable
              actions={[
                { label: 'Action 1', onClick: () => {} },
                { label: 'Action 2', onClick: () => {} }
              ]}
            >
              Use Tab to navigate, Enter/Space to activate, Escape to close.
            </Alert>
            
            <Box>
              <LinearProgress 
                variant="determinate" 
                value={75}
                label="Accessible Progress"
                showValue
                aria-label="File upload progress: 75% complete"
              />
            </Box>
          </Stack>
        </Box>
        
        <Box>
          <h3>High Contrast Support</h3>
          <Stack spacing={2}>
            <Alert severity="error" variant="outlined" title="High Contrast">
              Components maintain readability in high contrast mode.
            </Alert>
            
            <Alert severity="success" variant="filled" title="Color Blind Friendly">
              Icons and patterns provide context beyond color alone.
            </Alert>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
};