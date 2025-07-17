# Modal Component Examples

## 📚 Comprehensive Usage Examples

### 1. Basic Modal Implementations

#### Simple Confirmation Modal
```typescript
// Basic confirmation dialog
const ConfirmDeleteModal = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button 
        variant="contained" 
        color="error" 
        onClick={() => setOpen(true)}
      >
        Delete Item
      </Button>
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        variant="centered"
        size="sm"
        animation="zoom"
        title="Confirm Delete"
        closeOnBackdropClick={false}
      >
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this item? This action cannot be undone.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
          <Button 
            variant="outlined" 
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => {
              handleDelete();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
};

// Information modal with auto-focus
const InfoModal = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      variant="centered"
      size="md"
      animation="fade"
      title="About This Feature"
      aria-describedby="info-description"
    >
      <Typography id="info-description" variant="body1" paragraph>
        This feature allows you to manage your account settings and preferences.
        You can update your profile information, change notification settings,
        and configure security options.
      </Typography>
      
      <Typography variant="body2" color="text.secondary">
        For more information, visit our help documentation.
      </Typography>
      
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Button 
          variant="contained" 
          onClick={() => setOpen(false)}
          data-autofocus
        >
          Got it
        </Button>
      </Box>
    </Modal>
  );
};
```

#### Form Modal
```typescript
// Registration form modal
const RegistrationModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await registerUser(formData);
      onClose();
      showSuccessMessage('Registration successful!');
    } catch (error) {
      setErrors(error.fieldErrors || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="centered"
      size="md"
      animation="slide"
      title="Create Account"
      closeOnBackdropClick={!isSubmitting}
      closeOnEscape={!isSubmitting}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          data-autofocus
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          margin="normal"
          required
        />
        
        <TextField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
          required
        />
        
        <TextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          margin="normal"
          required
        />
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
          <Button 
            variant="outlined" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={16} /> : <PersonAddIcon />}
          >
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </Button>
        </Box>
      </form>
    </Modal>
  );
};
```

### 2. Advanced Modal Variants

#### Fullscreen Content Modal
```typescript
// Image gallery fullscreen modal
const ImageGalleryModal = ({ open, onClose, images, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="fullscreen"
      animation="fade"
      backdrop="solid"
      aria-label={`Image ${currentIndex + 1} of ${images.length}`}
    >
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'black'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          color: 'white'
        }}>
          <Typography variant="h6">
            {images[currentIndex].title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              {currentIndex + 1} / {images.length}
            </Typography>
            <IconButton 
              onClick={onClose} 
              sx={{ color: 'white' }}
              aria-label="Close gallery"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        
        {/* Image container */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative',
          p: 2
        }}>
          <IconButton 
            onClick={prevImage}
            sx={{ 
              position: 'absolute', 
              left: 16, 
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          
          <img 
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
          
          <IconButton 
            onClick={nextImage}
            sx={{ 
              position: 'absolute', 
              right: 16, 
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
        
        {/* Thumbnail strip */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          p: 2, 
          justifyContent: 'center',
          overflowX: 'auto'
        }}>
          {images.map((image, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 60,
                height: 60,
                border: index === currentIndex ? 2 : 0,
                borderColor: 'primary.main',
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                opacity: index === currentIndex ? 1 : 0.7,
                '&:hover': { opacity: 1 }
              }}
            >
              <img 
                src={image.thumbnail}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};
```

#### Drawer-Style Navigation Modal
```typescript
// Mobile navigation drawer
const NavigationDrawer = ({ open, onClose }) => {
  const [selectedSection, setSelectedSection] = useState('dashboard');
  
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChartIcon },
    { id: 'reports', label: 'Reports', icon: DescriptionIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="drawer"
      position="left"
      animation="drawer"
      size="sm"
      backdrop="blur"
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h6">
            Navigation
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Navigation items */}
        <Box sx={{ flex: 1, py: 1 }}>
          {navigationItems.map((item) => (
            <ListItem
              key={item.id}
              button
              selected={selectedSection === item.id}
              onClick={() => {
                setSelectedSection(item.id);
                onClose();
                // Navigate to section
              }}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </Box>
        
        {/* Footer */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button 
            fullWidth 
            variant="outlined" 
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
```

### 3. Popover and Context Modals

#### Context Menu Modal
```typescript
// Right-click context menu
const ContextMenuModal = ({ open, onClose, position, target }) => {
  const menuItems = [
    { label: 'Edit', icon: EditIcon, action: handleEdit },
    { label: 'Copy', icon: ContentCopyIcon, action: handleCopy },
    { label: 'Delete', icon: DeleteIcon, action: handleDelete, danger: true },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="popover"
      animation="scale"
      backdrop="transparent"
      customPosition={position}
      closeOnBackdropClick={true}
      showCloseButton={false}
    >
      <Paper elevation={8} sx={{ minWidth: 150 }}>
        <MenuList>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                item.action(target);
                onClose();
              }}
              sx={{
                color: item.danger ? 'error.main' : 'text.primary',
                '&:hover': {
                  bgcolor: item.danger ? 'error.light' : 'action.hover'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    </Modal>
  );
};
```

#### Quick Actions Popover
```typescript
// Floating action button menu
const QuickActionsPopover = ({ open, onClose, anchorEl }) => {
  const actions = [
    { label: 'New Document', icon: ArticleIcon, action: createDocument },
    { label: 'New Folder', icon: FolderIcon, action: createFolder },
    { label: 'Upload File', icon: UploadIcon, action: uploadFile },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="popover"
      animation="scale"
      backdrop="transparent"
      customPosition={{
        bottom: 80,
        right: 24,
      }}
    >
      <Paper elevation={6} sx={{ p: 1, minWidth: 200 }}>
        <Typography variant="subtitle2" sx={{ px: 1, py: 0.5, mb: 1 }}>
          Quick Actions
        </Typography>
        
        {actions.map((action, index) => (
          <Button
            key={index}
            fullWidth
            startIcon={<action.icon />}
            onClick={() => {
              action.action();
              onClose();
            }}
            sx={{ 
              justifyContent: 'flex-start', 
              mb: 0.5,
              textTransform: 'none'
            }}
          >
            {action.label}
          </Button>
        ))}
      </Paper>
    </Modal>
  );
};
```

### 4. Complex Multi-Step Modals

#### Wizard/Stepper Modal
```typescript
// Multi-step onboarding wizard
const OnboardingWizard = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  
  const steps = [
    'Welcome',
    'Profile Setup', 
    'Preferences',
    'Complete'
  ];
  
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  
  const handleComplete = () => {
    // Save data and close
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="centered"
      size="lg"
      animation="fade"
      closeOnBackdropClick={false}
      closeOnEscape={false}
    >
      <Box sx={{ width: '100%' }}>
        {/* Stepper header */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {/* Step content */}
        <Box sx={{ minHeight: 200, mb: 3 }}>
          {activeStep === 0 && (
            <WelcomeStep onNext={handleNext} />
          )}
          {activeStep === 1 && (
            <ProfileStep 
              data={formData}
              onChange={setFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 2 && (
            <PreferencesStep 
              data={formData}
              onChange={setFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 3 && (
            <CompleteStep onComplete={handleComplete} />
          )}
        </Box>
        
        {/* Navigation buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            onClick={onClose}
            disabled={activeStep === 3}
          >
            Cancel
          </Button>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            
            {activeStep < 3 && (
              <Button 
                variant="contained"
                onClick={handleNext}
              >
                {activeStep === 2 ? 'Finish' : 'Next'}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
```

### 5. Loading and Status Modals

#### Loading Modal with Progress
```typescript
// File upload with progress
const UploadProgressModal = ({ open, files, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [completed, setCompleted] = useState(false);

  return (
    <Modal
      open={open}
      onClose={completed ? onClose : undefined}
      variant="centered"
      size="sm"
      animation="fade"
      closeOnBackdropClick={completed}
      closeOnEscape={completed}
      showCloseButton={completed}
    >
      <Box sx={{ textAlign: 'center', py: 2 }}>
        {!completed ? (
          <>
            <CircularProgress 
              variant="determinate" 
              value={progress}
              size={60}
              sx={{ mb: 2 }}
            />
            
            <Typography variant="h6" gutterBottom>
              Uploading Files
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {currentFile}
            </Typography>
            
            <LinearProgress 
              variant="determinate" 
              value={progress}
              sx={{ mt: 2, mb: 1 }}
            />
            
            <Typography variant="caption" color="text.secondary">
              {progress}% complete
            </Typography>
          </>
        ) : (
          <>
            <CheckCircleIcon 
              sx={{ fontSize: 60, color: 'success.main', mb: 2 }}
            />
            
            <Typography variant="h6" gutterBottom>
              Upload Complete
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              {files.length} files uploaded successfully
            </Typography>
            
            <Button 
              variant="contained"
              onClick={onClose}
              sx={{ mt: 2 }}
            >
              Done
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};
```

### 6. Accessibility-Enhanced Examples

#### Screen Reader Optimized Modal
```typescript
// Comprehensive accessibility modal
const AccessibleModal = ({ open, onClose }) => {
  const [announcement, setAnnouncement] = useState('');

  return (
    <>
      {/* Screen reader announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      
      <Modal
        open={open}
        onClose={onClose}
        variant="centered"
        size="md"
        animation="fade"
        aria-label="Account settings dialog"
        aria-describedby="modal-description"
        title="Account Settings"
      >
        <Typography 
          id="modal-description" 
          variant="body2" 
          sx={{ mb: 2 }}
        >
          Update your account information and preferences. 
          Use Tab to navigate between form fields.
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            data-autofocus
            label="Display Name"
            helperText="This name will be visible to other users"
            fullWidth
            margin="normal"
            inputProps={{
              'aria-describedby': 'name-help',
            }}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel id="timezone-label">Timezone</InputLabel>
            <Select
              labelId="timezone-label"
              label="Timezone"
              aria-describedby="timezone-help"
            >
              <MenuItem value="UTC">UTC</MenuItem>
              <MenuItem value="EST">EST</MenuItem>
              <MenuItem value="PST">PST</MenuItem>
            </Select>
            <FormHelperText id="timezone-help">
              Used for displaying dates and times
            </FormHelperText>
          </FormControl>
          
          <FormControlLabel
            control={
              <Switch 
                aria-describedby="notifications-help"
              />
            }
            label="Email notifications"
          />
          <Typography 
            id="notifications-help"
            variant="caption" 
            color="text.secondary"
            display="block"
          >
            Receive updates about your account activity
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'flex-end', 
            mt: 3 
          }}>
            <Button 
              variant="outlined" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained"
              onClick={() => setAnnouncement('Settings saved successfully')}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};
```

These examples demonstrate the comprehensive capabilities of the Modal component, showing how to implement accessible, responsive, and user-friendly modal interfaces for various use cases.