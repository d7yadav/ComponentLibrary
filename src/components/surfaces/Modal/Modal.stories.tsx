import {
  Cancel,
  CheckCircle,
  Delete,
  Edit,
  Email,
  Error,
  Favorite,
  Info,
  LocationOn,
  MoreVert,
  Person,
  Phone,
  Save,
  Settings,
  Warning
} from '@mui/icons-material';
import { FormControlLabel, ListItemAvatar, ListItemText } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, {  useState  } from 'react';

import { Button } from '@/components/core/Button';
import { IconButton } from '@/components/core/IconButton'; // Replaced MUI IconButton with internal wrapper
import { Avatar } from '@/components/data-display/Avatar'; // Replaced MUI Avatar with internal wrapper
import { Card, CardContent } from '@/components/data-display/Card';
import { Divider } from '@/components/data-display/Divider'; // Replaced MUI Divider with internal wrapper
import { Typography } from '@/components/data-display/Typography';
import { Checkbox } from '@/components/forms/Checkbox'; // Replaced MUI Checkbox with internal wrapper
import { FormControl } from '@/components/forms/FormControl'; // Replaced MUI FormControl with internal wrapper
import { FormLabel } from '@/components/forms/FormLabel'; // Replaced MUI FormLabel with internal wrapper
import { Radio } from '@/components/forms/Radio'; // Replaced MUI Radio with internal wrapper
import { RadioGroup } from '@/components/forms/RadioGroup'; // Replaced MUI RadioGroup with internal wrapper
import { Switch } from '@/components/forms/Switch'; // Replaced MUI Switch with internal wrapper
// TODO: Migrate ListItemText, ListItemAvatar, FormControlLabel to internal wrappers when available
import { TextField } from '@/components/forms/TextField';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { List } from '@/components/surfaces/List'; // Replaced MUI List with internal wrapper
import { ListItem } from '@/components/surfaces/ListItem'; // Replaced MUI ListItem with internal wrapper

import { Modal } from './Modal';
import {
  MODAL_ANIMATIONS,
  MODAL_BACKDROPS,
  MODAL_POSITIONS,
  MODAL_SIZES,
  MODAL_VARIANTS
} from './Modal.constants';

// TODO: Create wrapper components for form controls, list components, Avatar, IconButton, and Divider

/**
 * The Modal component is a flexible overlay that displays content above the page.
 * It supports multiple variants, positioning options, animations, and accessibility features.
 * 
 * ## Features
 * - 5 variants: basic, centered, fullscreen, drawer, popover
 * - Multiple positioning options with custom coordinates
 * - 4 backdrop styles: blur, solid, transparent, none
 * - 6 animation types: fade, slide, zoom, scale, drawer, none
 * - Focus trap and keyboard navigation
 * - Mobile-responsive with fullscreen option
 * - WCAG 2.1 AA accessibility compliance
 * - Both controlled and uncontrolled modes
 */
const meta: Meta<typeof Modal> = {
  title: 'Surfaces/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Enhanced Modal component with multiple variants, animations, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(MODAL_VARIANTS),
      description: 'The variant of the modal',
    },
    position: {
      control: 'select',
      options: Object.values(MODAL_POSITIONS),
      description: 'The position of the modal',
    },
    backdrop: {
      control: 'select',
      options: Object.values(MODAL_BACKDROPS),
      description: 'The backdrop style of the modal',
    },
    animation: {
      control: 'select',
      options: Object.values(MODAL_ANIMATIONS),
      description: 'The animation type for the modal',
    },
    size: {
      control: 'select',
      options: Object.values(MODAL_SIZES),
      description: 'The size of the modal',
    },
    open: {
      control: 'boolean',
      description: 'If true, the modal is open',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'If true, clicking the backdrop will close the modal',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'If true, pressing escape will close the modal',
    },
    mobileFullscreen: {
      control: 'boolean',
      description: 'If true, the modal will be fullscreen on mobile',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'If true, will show a close button in the header',
    },
    elevation: {
      control: 'boolean',
      description: 'If true, the modal will have a paper-like elevation',
    },
    title: {
      control: 'text',
      description: 'The title of the modal',
    },
    onClose: { action: 'closed' },
    onEntered: { action: 'entered' },
    onExited: { action: 'exited' },
  },
  args: {
    onClose: fn(),
    onEntered: fn(),
    onExited: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Interactive wrapper component for stories
interface ModalStoryProps extends Omit<React.ComponentProps<typeof Modal>, 'children'> {
  children: React.ReactNode;
}
const ModalStory: React.FC<ModalStoryProps> = ({ children, ...props }) => {
  const [open, setOpen] = useState(false);
  
  const handleClose = (): void => {
    setOpen(false);
    props.onClose?.();
  };

  const handleClick = (): void => {
    setOpen(true);
  };
  
  return (
    <>
      <Button variant="outline" onClick={handleClick}>
        Open Modal
      </Button>
      <Modal
        {...props}
        open={open}
        onClose={handleClose}
      >
        {children}
      </Modal>
    </>
  );
};

/**
 * Default Modal
 * Basic modal with standard configuration
 */
export const Default: Story = {
  render: (args) => (
    <ModalStory {...args}>
      <Typography variant="h6" component="h2" gutterBottom>
        Welcome to the Modal
      </Typography>
      <Typography>
        This is a basic modal with default settings. It includes a backdrop,
        fade animation, and can be closed by clicking outside or pressing escape.
      </Typography>
    </ModalStory>
  ),
  args: {
    title: 'Default Modal',
    variant: 'basic',
    size: 'md',
  },
};

/**
 * Modal Variants
 * Showcases all available modal variants
 */
export const Variants: Story = {
  render: (args) => {
    const [openModals, setOpenModals] = useState<Record<string, boolean>>({});
    
    const toggleModal = (variant: string): void => {
      setOpenModals(prev => ({ ...prev, [variant]: !prev[variant] }));
    };
    
    return (
      <Stack data-testid="modal.stories" spacing={2} direction="row" flexWrap="wrap">
        {Object.values(MODAL_VARIANTS).map((variant) => (
          <Box key={variant}>
            <Button
              variant="outline"
              onClick={() => toggleModal(variant)}
              sx={{ textTransform: 'capitalize' }}
            >
              {variant} Modal
            </Button>
            <Modal {...args}
              variant={variant}
              open={!!openModals[variant]}
              onClose={() => toggleModal(variant)}
              title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Modal`}
              size={variant === 'popover' ? 'sm' : 'md'}
            >
              <Typography>
                This is a <strong>{variant}</strong> modal variant. 
                Each variant has unique styling and behavior characteristics.
              </Typography>
              {variant === 'fullscreen' && (
                <Box mt={2}>
                  <Typography variant="h6">Fullscreen Content</Typography>
                  <Typography>
                    This fullscreen modal takes up the entire viewport,
                    perfect for immersive experiences or complex forms.
                  </Typography>
                </Box>
              )}
            </Modal>
          </Box>
        ))}
      </Stack>
    );
  },
};

/**
 * Modal Positions
 * Demonstrates different positioning options
 */
export const Positions: Story = {
  render: (args) => {
    const [openModals, setOpenModals] = useState<Record<string, boolean>>({});
    
    const toggleModal = (position: string): void => {
      setOpenModals(prev => ({ ...prev, [position]: !prev[position] }));
    };
    
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Modal Positions
        </Typography>
        <Stack data-testid="modal.stories" spacing={2} direction="row" flexWrap="wrap">
          {Object.values(MODAL_POSITIONS).filter(p => p !== 'custom').map((position) => (
            <Box key={position}>
              <Button
                variant="outline"
                onClick={() => toggleModal(position)}
                sx={{ textTransform: 'capitalize' }}
              >
                {position.replace('-', ' ')}
              </Button>
              <Modal {...args}
                position={position}
                open={!!openModals[position]}
                onClose={() => toggleModal(position)}
                title={`${position.charAt(0).toUpperCase() + position.slice(1)} Position`}
                size="sm"
              >
                <Typography>
                  Modal positioned at: <strong>{position}</strong>
                </Typography>
              </Modal>
            </Box>
          ))}
        </Stack>
      </Box>
    );
  },
};

/**
 * Custom Position
 * Shows custom positioning capability
 */
export const CustomPosition: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    const handleClose = (): void => {
      setOpen(false);
      args.onClose?.();
    };

    const handleClick = (): void => {
      setOpen(true);
    };
    
    return (
      <>
        <Button variant="outline" onClick={handleClick}>
          Open Custom Positioned Modal
        </Button>
        <Modal
          {...args}
          position="custom"
          customPosition={{
            top: '20%',
            right: '10%',
          }}
          open={open}
          onClose={handleClose}
          title="Custom Position"
          size="sm"
        >
          <Typography>
            This modal is positioned at custom coordinates: 
            top: 20%, right: 10%
          </Typography>
        </Modal>
      </>
    );
  },
};

/**
 * Modal Sizes
 * Demonstrates all available sizes
 */
export const Sizes: Story = {
  render: (args) => {
    const [openModals, setOpenModals] = useState<Record<string, boolean>>({});
    
    const toggleModal = (size: string): void => {
      setOpenModals(prev => ({ ...prev, [size]: !prev[size] }));
    };
    
    return (
      <Stack data-testid="modal.stories" spacing={2} direction="row" flexWrap="wrap">
        {Object.values(MODAL_SIZES).map((size) => (
          <Box key={size}>
            <Button
                variant="outline"
              onClick={() => toggleModal(size)}
              sx={{ textTransform: 'uppercase' }}
            >
              {size} Size
            </Button>
            <Modal {...args}
              size={size}
              open={!!openModals[size]}
              onClose={() => toggleModal(size)}
              title={`${size.toUpperCase()} Size Modal`}
            >
              <Typography>
                This is a <strong>{size}</strong> sized modal.
              </Typography>
              <Typography mt={1}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Modal>
          </Box>
        ))}
      </Stack>
    );
  },
};

/**
 * Backdrop Styles
 * Shows different backdrop options
 */
export const BackdropStyles: Story = {
  render: (args) => {
    const [openModals, setOpenModals] = useState<Record<string, boolean>>({});
    
    const toggleModal = (backdrop: string): void => {
      setOpenModals(prev => ({ ...prev, [backdrop]: !prev[backdrop] }));
    };
    
    return (
      <Stack data-testid="modal.stories" spacing={2} direction="row" flexWrap="wrap">
        {Object.values(MODAL_BACKDROPS).map((backdrop) => (
          <Box key={backdrop}>
            <Button
              variant="outline"
              onClick={() => toggleModal(backdrop)}
              sx={{ textTransform: 'capitalize' }}
            >
              {backdrop} Backdrop
            </Button>
            <Modal {...args}
              backdrop={backdrop}
              open={!!openModals[backdrop]}
              onClose={() => toggleModal(backdrop)}
              title={`${backdrop.charAt(0).toUpperCase() + backdrop.slice(1)} Backdrop`}
              size="sm"
            >
              <Typography>
                Modal with <strong>{backdrop}</strong> backdrop style.
              </Typography>
            </Modal>
          </Box>
        ))}
      </Stack>
    );
  },
};

/**
 * Animation Types
 * Demonstrates all animation options
 */
export const Animations: Story = {
  render: (args) => {
    const [openModals, setOpenModals] = useState<Record<string, boolean>>({});
    
    const toggleModal = (animation: string): void => {
      setOpenModals(prev => ({ ...prev, [animation]: !prev[animation] }));
    };
    
    return (
      <Stack data-testid="modal.stories" spacing={2} direction="row" flexWrap="wrap">
        {Object.values(MODAL_ANIMATIONS).map((animation) => (
          <Box key={animation}>
            <Button
              variant="outline"
              onClick={() => toggleModal(animation)}
              sx={{ textTransform: 'capitalize' }}
            >
              {animation} Animation
            </Button>
            <Modal {...args}
              animation={animation}
              open={!!openModals[animation]}
              onClose={() => toggleModal(animation)}
              title={`${animation.charAt(0).toUpperCase() + animation.slice(1)} Animation`}
              size="sm"
            >
              <Typography>
                Modal with <strong>{animation}</strong> animation.
              </Typography>
            </Modal>
          </Box>
        ))}
      </Stack>
    );
  },
};

/**
 * With Header and Footer
 * Shows modal with custom header and footer content
 */
export const WithHeaderAndFooter: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const handleClose = (): void => {
      setOpen(false);
      args.onClose?.();
    };
    const handleClick = (): void => {
      setOpen(true);
    };
    return (
      <>
        <Button variant="outline" onClick={handleClick}>
          Open Modal with Header & Footer
        </Button>
        <Modal
          {...args}
          open={open}
          onClose={handleClose}
          title="Settings"
          showCloseButton={true}
          footer={
            <Stack data-testid="modal.stories" direction="row" spacing={2}>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="outline" startIcon={<Save />}>
                Save Changes
              </Button>
            </Stack>
          }
        >
          <Stack data-testid="modal.stories" spacing={2}>
            <TextField label="Username" fullWidth />
            <TextField label="Email" type="email" fullWidth />
            <FormControl>
              <FormLabel>Notifications</FormLabel>
              <Stack data-testid="modal.stories">
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Email notifications"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="SMS notifications"
                />
              </Stack>
            </FormControl>
          </Stack>
        </Modal>
      </>
    );
  },
};

/**
 * Custom Header
 * Modal with completely custom header content
 */
export const CustomHeader: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open Modal with Custom Header
        </Button>
        <Modal {...args}
          open={open}
          onClose={() => setOpen(false)}
          header={
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="h6">John Doe</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Administrator
                  </Typography>
                </Box>
              </Box>
              <Stack data-testid="modal.stories" direction="row" spacing={1}>
                <IconButton size="small" aria-label="Edit profile">
                  <Edit />
                </IconButton>
                <IconButton size="small" aria-label="More options">
                  <MoreVert />
                </IconButton>
                <IconButton size="small" onClick={() => setOpen(false)} aria-label="Close modal">
                  <Cancel />
                </IconButton>
              </Stack>
            </Box>
          }
        >
          <Stack data-testid="modal.stories" spacing={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Email color="action" />
              <Typography>john.doe@example.com</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Phone color="action" />
              <Typography>+1 (555) 123-4567</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <LocationOn color="action" />
              <Typography>New York, NY</Typography>
            </Box>
          </Stack>
        </Modal>
      </>
    );
  },
};

/**
 * Form Modal
 * Complex form in a modal with validation
 */
export const FormModal: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      role: 'user',
      notifications: false,
    });
    
    const handleSubmit = (): void => {
      setOpen(false);
    };
    
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Create New User
        </Button>
        <Modal {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="Create New User"
          size="md"
          footer={
            <Stack data-testid="modal.stories" direction="row" spacing={2}>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSubmit}>
                Create User
              </Button>
            </Stack>
          }
        >
          <Stack data-testid="modal.stories" spacing={3}>
            <TextField
              label="Full Name"
              required
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
            <TextField
              label="Email Address"
              type="email"
              required
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
            <FormControl>
              <FormLabel>Role</FormLabel>
              <RadioGroup
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              >
                <FormControlLabel value="user" control={<Radio />} label="User" />
                <FormControlLabel value="admin" control={<Radio />} label="Administrator" />
                <FormControlLabel value="moderator" control={<Radio />} label="Moderator" />
              </RadioGroup>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.notifications}
                  onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
                />
              }
              label="Enable email notifications"
            />
          </Stack>
        </Modal>
      </>
    );
  },
};

/**
 * Confirmation Dialog
 * Modal used as a confirmation dialog
 */
export const ConfirmationDialog: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="outline" color="error" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
        <Modal {...args}
          open={open}
          onClose={() => setOpen(false)}
          size="sm"
          variant="centered"
          header={
            <Box display="flex" alignItems="center" gap={2}>
              <Warning color="warning" />
              <Typography variant="h6">Confirm Deletion</Typography>
            </Box>
          }
          footer={
            <Stack data-testid="modal.stories" direction="row" spacing={2}>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline" color="error" startIcon={<Delete />}>
                Delete Account
              </Button>
            </Stack>
          }
        >
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
            All your data will be permanently removed from our servers.
          </Typography>
        </Modal>
      </>
    );
  },
};

/**
 * Alert Modal
 * Modal used for displaying alerts with different severities
 */
export const AlertModal: Story = {
  render: (args) => {
    const [openModals, setOpenModals] = useState<Record<string, boolean>>({});
    
    const alerts = [
      { type: 'success', icon: CheckCircle, color: 'success' as const, title: 'Success!', message: 'Your changes have been saved successfully.' },
      { type: 'info', icon: Info, color: 'info' as const, title: 'Information', message: 'Please note that this feature is in beta.' },
      { type: 'warning', icon: Warning, color: 'warning' as const, title: 'Warning', message: 'Your session will expire in 5 minutes.' },
      { type: 'error', icon: Error, color: 'error' as const, title: 'Error', message: 'Failed to save changes. Please try again.' },
    ];
    const toggleModal = (type: string): void => {
      setOpenModals((prevState: Record<string, boolean>) => ({
        ...prevState,
        [type]: !prevState[type]
      }));
    };
    return (
      <Stack data-testid="modal.stories" spacing={2} direction="row" flexWrap="wrap">
        {alerts.map((alert) => (
          <Box key={alert.type}>
            <Button
              variant="outline"
              color={alert.color}
              onClick={() => toggleModal(alert.type)}
              sx={{ textTransform: 'capitalize' }}
            >
              {alert.type} Alert
            </Button>
            <Modal {...args}
              open={!!openModals[alert.type]}
              onClose={() => toggleModal(alert.type)}
              size="sm"
              variant="centered"
              header={
                <Box display="flex" alignItems="center" gap={2}>
                  <alert.icon color={alert.color} />
                  <Typography variant="h6">{alert.title}</Typography>
                </Box>
              }
              footer={
                <Button variant="outline" onClick={() => toggleModal(alert.type)}>
                  OK
                </Button>
              }
            >
              <Typography>{alert.message}</Typography>
            </Modal>
          </Box>
        ))}
      </Stack>
    );
  },
};

/**
 * Drawer Modal
 * Modal that behaves like a drawer
 */
export const DrawerModal: Story = {
  render: (args) => {
    const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({});
    
    const positions = ['left', 'right', 'top', 'bottom'];
    
    const toggleDrawer = (position: string): void => {
      setOpenDrawers(prev => ({ ...prev, [position]: !prev[position] }));
    };
    
    return (
      <Stack data-testid="modal.stories" spacing={2} direction="row" flexWrap="wrap">
        {positions.map((position) => (
          <Box key={position}>
            <Button
              variant="outline"
              onClick={() => toggleDrawer(position)}
              sx={{ textTransform: 'capitalize' }}
            >
              {position} Drawer
            </Button>
            <Modal {...args}
              variant="drawer"
              position={position as 'left' | 'right' | 'top' | 'bottom'} // Type-safe position prop using literal union type
              animation="drawer"
              open={!!openDrawers[position]}
              onClose={() => toggleDrawer(position)}
              title={`${position.charAt(0).toUpperCase() + position.slice(1)} Drawer`}
            >
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><Person /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Profile" secondary="View and edit profile" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><Settings /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Settings" secondary="App preferences" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><Favorite /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Favorites" secondary="Saved items" />
                </ListItem>
              </List>
            </Modal>
          </Box>
        ))}
      </Stack>
    );
  },
};

/**
 * Gallery Modal
 * Modal for displaying images or media content
 */
export const GalleryModal: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          View Gallery
        </Button>
        <Modal {...args}
          open={open}
          onClose={() => setOpen(false)}
          variant="fullscreen"
          animation="zoom"
          showCloseButton={true}
          backdrop="solid"
        >
          <Box display="flex" flexDirection="column" height="100%">
            <Typography variant="h4" gutterBottom align="center" mt={2}>
              Image Gallery
            </Typography>
            <Box 
              display="grid" 
              gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" 
              gap={2}
              flex={1}
              p={2}
              overflow="auto"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <Card key={i}>
                  <Box
                    sx={{
                      height: 200,
                      background: `linear-gradient(45deg, ${i % 2 ? '#FF6B6B' : '#4ECDC4'}, ${i % 2 ? '#4ECDC4' : '#45B7D1'})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h6" color="text.primary">
                      Image {i + 1}
                    </Typography>
                  </Box>
                  <CardContent>
                    <Typography variant="body2">
                      Sample image description for image {i + 1}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Modal>
      </>
    );
  },
};

/**
 * Mobile Responsive
 * Modal that becomes fullscreen on mobile devices
 */
export const MobileResponsive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open Mobile-Responsive Modal
        </Button>
        <Modal {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="Mobile Responsive Modal"
          mobileFullscreen={true}
          size="lg"
          footer={
            <Stack data-testid="modal.stories" direction="row" spacing={2}>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline">
                Confirm
              </Button>
            </Stack>
          }
        >
          <Typography gutterBottom>
            This modal automatically becomes fullscreen on mobile devices.
            Resize your browser window to see the responsive behavior.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            On desktop, this modal has a maximum width. On mobile devices (screens smaller than 768px),
            it will expand to fill the entire screen for better usability.
          </Typography>
        </Modal>
      </>
    );
  },
};

/**
 * Accessibility Features
 * Demonstrates accessibility features and keyboard navigation
 */
export const AccessibilityFeatures: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open Accessible Modal
        </Button>
        <Modal {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="Accessibility Demo"
          aria-describedby="modal-description"
          footer={
            <Stack data-testid="modal.stories" direction="row" spacing={2}>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline" data-autofocus>
                Focus Me First
              </Button>
            </Stack>
          }
        >
          <Box id="modal-description">
            <Typography gutterBottom>
              This modal demonstrates accessibility features:
            </Typography>
            <List>
              <ListItem>
                <Typography>• Focus trap: Tab navigation stays within modal</Typography>
              </ListItem>
              <ListItem>
                <Typography>• ESC key closes the modal</Typography>
              </ListItem>
              <ListItem>
                <Typography>• Screen reader support with ARIA attributes</Typography>
              </ListItem>
              <ListItem>
                <Typography>• Auto-focus on the designated button</Typography>
              </ListItem>
              <ListItem>
                <Typography>• Focus restoration when closed</Typography>
              </ListItem>
            </List>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Try using keyboard navigation (Tab, Shift+Tab, ESC) to experience
              the accessibility features.
            </Typography>
          </Box>
        </Modal>
      </>
    );
  },
};

/**
 * No Close Options
 * Modal that cannot be closed by backdrop click or escape key
 */
export const NoCloseOptions: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open Modal (No Easy Close)
        </Button>
        <Modal {...args}
          open={open}
          onClose={() => setOpen(false)}
          title="Important Notice"
          closeOnBackdropClick={false}
          closeOnEscape={false}
          showCloseButton={false}
          footer={
            <Button variant="outline" onClick={() => setOpen(false)}>
              I Understand
            </Button>
          }
        >
          <Typography gutterBottom>
            This modal cannot be closed by clicking outside or pressing escape.
            You must click the &quot;I Understand&quot; button to proceed.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This pattern is useful for critical information that users must acknowledge.
          </Typography>
        </Modal>
      </>
    );
  },
};

/**
 * Performance Test
 * Multiple modals to test performance
 */
export const PerformanceTest: Story = {
  render: (args) => {
    const [openCount, setOpenCount] = useState(0);
    const [modals, setModals] = useState<number[]>([]);
    const addModal = (): void => {
      const newId: number = openCount;
      setModals((prev: number[]): number[] => [...prev, newId]); 
      setOpenCount((prev: number): number => prev + 1);
    };
    
    const removeModal = (id: number): void => {
      setModals(prev => prev.filter(modalId => modalId !== id));
    };
    
    return (
      <>
        <Stack data-testid="modal.stories" direction="row" spacing={2} alignItems="center">
          <Button variant="outline" onClick={addModal}>
            Add Modal ({modals.length} open)
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setModals([])}
            disabled={modals.length === 0}
          >
            Close All
          </Button>
        </Stack>
        
        {modals.map((id, index) => (
          <Modal {...args}
            key={id}
            open={true}
            onClose={() => removeModal(id)}
            title={`Modal ${id + 1}`}
            size="sm"
            customPosition={{
              top: `${10 + index * 50}px`,
              left: `${10 + index * 50}px`,
            }}
            position="custom"
            zIndex={1300 + index}
          >
            <Typography>
              This is modal number {id + 1}. You can open multiple modals
              to test performance and stacking.
            </Typography>
          </Modal>
        ))}
      </>
    );
  },
};

/**
 * Modal States
 * Different states and configurations of the modal
 */
export const States: Story = {
  render: (args) => {
    const [openModals, setOpenModals] = useState<Record<string, boolean>>({});
    
    const toggleModal = (state: string): void => {
      setOpenModals(prev => ({ ...prev, [state]: !prev[state] }));
    };
    
    return (
      <Stack data-testid="modal.stories" spacing={2} direction="row" flexWrap="wrap">
        <Box>
          <Button variant="outline" onClick={() => toggleModal('open')}>
            Open State
          </Button>
          <Modal {...args}
            open={!!openModals['open']}
            onClose={() => toggleModal('open')}
            title="Open State Modal"
            size="sm"
          >
            <Typography>This modal is in the open state.</Typography>
          </Modal>
        </Box>
        
        <Box>
          <Button variant="outline" onClick={() => toggleModal('closable')}>
            Closable State
          </Button>
          <Modal {...args}
            open={!!openModals['closable']}
            onClose={() => toggleModal('closable')}
            title="Closable Modal"
            size="sm"
            closeOnBackdropClick={true}
            closeOnEscape={true}
            showCloseButton={true}
          >
            <Typography>This modal can be closed by backdrop click, escape key, or close button.</Typography>
          </Modal>
        </Box>
        
        <Box>
          <Button variant="outline" onClick={() => toggleModal('non-closable')}>
            Non-Closable State
          </Button>
          <Modal {...args}
            open={!!openModals['non-closable']}
            onClose={() => toggleModal('non-closable')}
            title="Non-Closable Modal"
            size="sm"
            closeOnBackdropClick={false}
            closeOnEscape={false}
            showCloseButton={false}
            footer={
              <Button variant="outline" onClick={() => toggleModal('non-closable')}>
                Acknowledge
              </Button>
            }
          >
            <Typography>This modal cannot be closed by backdrop click or escape key.</Typography>
          </Modal>
        </Box>
        
        <Box>
          <Button variant="outline" onClick={() => toggleModal('elevated')}>
            Elevated State
          </Button>
          <Modal {...args}
            open={!!openModals['elevated']}
            onClose={() => toggleModal('elevated')}
            title="Elevated Modal"
            size="sm"
            elevation={true}
          >
            <Typography>This modal has elevation shadow for depth.</Typography>
          </Modal>
        </Box>
        
        <Box>
          <Button variant="outline" onClick={() => toggleModal('mobile-responsive')}>
            Mobile Responsive State
          </Button>
          <Modal {...args}
            open={!!openModals['mobile-responsive']}
            onClose={() => toggleModal('mobile-responsive')}
            title="Mobile Responsive"
            size="md"
            mobileFullscreen={true}
          >
            <Typography>This modal becomes fullscreen on mobile devices.</Typography>
          </Modal>
        </Box>
        
        <Box>
          <Button variant="outline" onClick={() => toggleModal('with-header-footer')}>
            With Header & Footer
          </Button>
          <Modal {...args}
            open={!!openModals['with-header-footer']}
            onClose={() => toggleModal('with-header-footer')}
            title="Complete Modal"
            size="sm"
            showCloseButton={true}
            footer={
              <Stack data-testid="modal.stories" direction="row" spacing={2}>
                <Button variant="outline" onClick={() => toggleModal('with-header-footer')}>
                  Cancel
                </Button>
                <Button variant="outline">
                  Save
                </Button>
              </Stack>
            }
          >
            <Typography>This modal has both header and footer content.</Typography>
          </Modal>
        </Box>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different states and configurations of the Modal component including open, closable, non-closable, elevated, mobile responsive, and with header/footer.',
      },
    },
  },
};

/**
 * Dark Theme
 * Modal in dark theme context
 */
export const DarkTheme: Story = {
  render: (args) => (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', p: 2 }}>
      <ModalStory {...args}>
        <Typography variant="h6" component="h2" gutterBottom>
          Dark Theme Modal
        </Typography>
        <Typography>
          This modal automatically adapts to dark theme when the theme context
          is set to dark mode. The backdrop, paper background, and text colors
          all adjust accordingly.
        </Typography>
      </ModalStory>
    </Box>
  ),
  args: {
    title: 'Dark Theme Modal',
    variant: 'centered',
    backdrop: 'blur',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};