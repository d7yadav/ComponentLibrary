# Modal Component AI Guide

## 🤖 AI Assistant Instructions

### Component Overview
The Modal component provides a sophisticated overlay system with comprehensive accessibility, multiple variants, animations, and responsive design. It serves as the foundation for dialogs, popups, and overlay interfaces.

### Key Features for AI Implementation
- **5 Modal Variants**: basic, centered, fullscreen, drawer, popover
- **Position Control**: center, top, bottom, left, right, custom positioning
- **4 Backdrop Styles**: blur, solid, transparent, none  
- **6 Animation Types**: fade, slide, zoom, scale, drawer, none
- **Accessibility**: Complete WCAG 2.1 AA compliance with focus management
- **Mobile Support**: Responsive with automatic fullscreen on mobile
- **Advanced Controls**: Controlled/uncontrolled modes, custom close behaviors

## 🎯 AI Usage Patterns

### 1. Basic Modal Implementation
```typescript
// Simple confirmation modal
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  variant="centered"
  animation="fade"
>
  <Typography variant="body1" gutterBottom>
    Are you sure you want to delete this item?
  </Typography>
  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
    <Button variant="outlined" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="contained" color="error" onClick={handleConfirm}>
      Delete
    </Button>
  </Box>
</Modal>

// Content modal with header and footer
<Modal
  open={isOpen}
  onClose={handleClose}
  title="User Profile"
  size="lg"
  variant="centered"
  animation="zoom"
  header={
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar src={user.avatar} />
      <Typography variant="h6">{user.name}</Typography>
    </Box>
  }
  footer={
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
      <Button variant="outlined" onClick={handleClose}>
        Close
      </Button>
      <Button variant="contained" onClick={handleSave}>
        Save Changes
      </Button>
    </Box>
  }
>
  <UserProfileForm />
</Modal>
```

### 2. Advanced Modal Variants
```typescript
// Fullscreen modal for mobile-first design
<Modal
  open={isOpen}
  onClose={handleClose}
  variant="fullscreen"
  mobileFullscreen={true}
  animation="slide"
  title="Create New Project"
>
  <ProjectCreationWizard />
</Modal>

// Drawer-style modal from side
<Modal
  open={isOpen}
  onClose={handleClose}
  variant="drawer"
  position="right"
  animation="drawer"
  size="md"
  backdrop="blur"
>
  <NavigationPanel />
</Modal>

// Popover-style modal
<Modal
  open={isOpen}
  onClose={handleClose}
  variant="popover"
  position="top"
  animation="scale"
  customPosition={{ top: 64, left: 200 }}
  backdrop="transparent"
>
  <QuickActionsMenu />
</Modal>
```

### 3. Accessibility-First Implementation
```typescript
// Comprehensive accessibility features
<Modal
  open={isOpen}
  onClose={handleClose}
  aria-label="Account settings dialog"
  aria-describedby="settings-description"
  title="Account Settings"
  closeOnEscape={true}
  closeOnBackdropClick={false}
  disableAutoFocus={false}
>
  <Typography id="settings-description" variant="body2" sx={{ mb: 2 }}>
    Modify your account preferences and security settings
  </Typography>
  
  <TextField
    data-autofocus
    label="Display Name"
    fullWidth
    margin="normal"
  />
  
  <FormControlLabel
    control={<Switch />}
    label="Email notifications"
  />
</Modal>

// Focus trap with custom focus management
<Modal
  open={isOpen}
  onClose={handleClose}
  disableEnforceFocus={false}
  disableAutoFocus={false}
  disableRestoreFocus={false}
>
  <form onSubmit={handleSubmit}>
    <TextField
      data-autofocus
      label="First Name"
      required
      autoComplete="given-name"
    />
    <TextField
      label="Last Name" 
      required
      autoComplete="family-name"
    />
    <Button type="submit">Submit</Button>
  </form>
</Modal>
```

## 🎨 Styling and Animation Guidelines

### Modal Variants and Positioning
```typescript
// Centered modal (default)
<Modal variant="centered" position="center">
  Standard centered modal content
</Modal>

// Positioned modals
<Modal variant="basic" position="top">
  Top-positioned modal
</Modal>

<Modal variant="basic" position="bottom">
  Bottom sheet style modal
</Modal>

// Custom positioning
<Modal 
  variant="popover"
  customPosition={{ 
    top: '20%', 
    left: '50%', 
    transform: 'translateX(-50%)' 
  }}
>
  Custom positioned content
</Modal>
```

### Animation and Backdrop Effects
```typescript
// Smooth animations
<Modal animation="fade" animationDuration={300}>
  Fade in/out animation
</Modal>

<Modal animation="slide" position="bottom">
  Slide up from bottom
</Modal>

<Modal animation="zoom" backdrop="blur">
  Zoom with blurred backdrop
</Modal>

// Custom backdrop styles
<Modal backdrop="solid">
  Solid dark backdrop
</Modal>

<Modal backdrop="transparent">
  No backdrop, content only
</Modal>

<Modal backdrop="none">
  No backdrop at all
</Modal>
```

### Size and Responsive Design
```typescript
// Size variants
<Modal size="sm">Small modal (400px max)</Modal>
<Modal size="md">Medium modal (600px max)</Modal>
<Modal size="lg">Large modal (900px max)</Modal>
<Modal size="xl">Extra large modal (1200px max)</Modal>

// Custom dimensions
<Modal 
  maxWidth="80vw" 
  maxHeight="90vh"
  size="md"
>
  Custom sized modal
</Modal>

// Mobile-responsive behavior
<Modal
  size="lg"
  mobileFullscreen={true}
  variant="centered"
>
  Automatic fullscreen on mobile
</Modal>
```

## 🔄 State Management Patterns

### Controlled Modal State
```typescript
const useModalState = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);
  
  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};

// Usage
const MyComponent = () => {
  const modal = useModalState();
  
  return (
    <>
      <Button onClick={modal.openModal}>Open Modal</Button>
      <Modal
        open={modal.isOpen}
        onClose={modal.closeModal}
        title="My Modal"
      >
        Modal content here
      </Modal>
    </>
  );
};
```

### Complex Modal Logic
```typescript
// Modal with async operations
const useAsyncModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const openModal = () => {
    setIsOpen(true);
    setError(null);
  };
  
  const closeModal = () => {
    if (!isLoading) {
      setIsOpen(false);
      setError(null);
    }
  };
  
  const performAction = async (action: () => Promise<void>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await action();
      setIsOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isOpen,
    isLoading,
    error,
    openModal,
    closeModal,
    performAction,
  };
};
```

## 🧩 Common AI Patterns

### 1. Confirmation Dialogs
```typescript
const ConfirmationModal = ({ 
  open, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false 
}) => (
  <Modal
    open={open}
    onClose={onClose}
    title={title}
    variant="centered"
    size="sm"
    animation="zoom"
    closeOnBackdropClick={false}
  >
    <Typography variant="body1" sx={{ mb: 3 }}>
      {message}
    </Typography>
    
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
      <Button variant="outlined" onClick={onClose}>
        {cancelText}
      </Button>
      <Button 
        variant="contained" 
        color={danger ? "error" : "primary"}
        onClick={onConfirm}
      >
        {confirmText}
      </Button>
    </Box>
  </Modal>
);
```

### 2. Form Modals
```typescript
const FormModal = ({ open, onClose, onSubmit, title, children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="md"
      variant="centered"
      closeOnBackdropClick={!isSubmitting}
      closeOnEscape={!isSubmitting}
    >
      <form onSubmit={handleSubmit}>
        {children}
        
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
          >
            {isSubmitting ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </Box>
      </form>
    </Modal>
  );
};
```

### 3. Image/Media Viewer
```typescript
const MediaViewerModal = ({ open, onClose, mediaUrl, title }) => (
  <Modal
    open={open}
    onClose={onClose}
    variant="fullscreen"
    animation="fade"
    backdrop="solid"
    showCloseButton={true}
    aria-label={`Viewing ${title}`}
  >
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      p: 2 
    }}>
      <img 
        src={mediaUrl} 
        alt={title}
        style={{ 
          maxWidth: '100%', 
          maxHeight: '100%', 
          objectFit: 'contain' 
        }}
      />
      
      <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
        {title}
      </Typography>
    </Box>
  </Modal>
);
```

### 4. Loading States
```typescript
const LoadingModal = ({ open, message = "Loading..." }) => (
  <Modal
    open={open}
    onClose={() => {}} // Prevent closing during loading
    variant="centered"
    size="sm"
    animation="fade"
    backdrop="blur"
    closeOnBackdropClick={false}
    closeOnEscape={false}
    showCloseButton={false}
  >
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      py: 3 
    }}>
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="body1">
        {message}
      </Typography>
    </Box>
  </Modal>
);
```

## 🚨 Common Pitfalls to Avoid

### ❌ Incorrect Usage
```typescript
// Don't forget to handle modal state
<Modal open={true}> // Always open - no way to close

// Don't ignore accessibility
<Modal open={open} onClose={onClose}>
  <div>Content without proper structure</div>
</Modal>

// Don't nest modals without proper z-index management
<Modal open={modal1Open}>
  <Modal open={modal2Open}> // Can cause focus issues
```

### ✅ Correct Usage
```typescript
// Proper state management
const [isOpen, setIsOpen] = useState(false);
<Modal open={isOpen} onClose={() => setIsOpen(false)}>

// Proper accessibility structure
<Modal 
  open={open} 
  onClose={onClose}
  aria-label="Modal title"
  title="Clear title"
>
  <Typography component="h2">Semantic structure</Typography>
</Modal>

// Handle nested modals properly
<Modal open={modal1Open} zIndex={1300}>
  <Modal open={modal2Open} zIndex={1400}>
```

## 📊 Performance Considerations

1. **Lazy Content Loading**: Only render expensive content when modal is open
2. **Animation Performance**: Use CSS transforms over layout properties
3. **Focus Management**: Leverage built-in focus trap for accessibility
4. **Memory Management**: Clean up event listeners automatically handled
5. **Backdrop Optimization**: Blur effects are GPU-accelerated when possible

## 🔍 Testing Recommendations

```typescript
// Test modal open/close
fireEvent.click(screen.getByText('Open Modal'));
expect(screen.getByRole('dialog')).toBeInTheDocument();

fireEvent.click(screen.getByLabelText('Close'));
expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

// Test accessibility
expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
expect(screen.getByRole('dialog')).toHaveAttribute('aria-label');

// Test keyboard navigation
fireEvent.keyDown(document, { key: 'Escape' });
expect(onClose).toHaveBeenCalled();
```

## 🎯 AI Decision Tree

**When to use Modal variants:**
- `basic`: Simple overlays, tooltips, quick actions
- `centered`: Main dialogs, forms, confirmations
- `fullscreen`: Complex workflows, media viewers, mobile interfaces
- `drawer`: Side navigation, filters, secondary content
- `popover`: Context menus, small interactive content

**When to use animations:**
- `fade`: Subtle, professional interfaces
- `slide`: Mobile-first, drawer-style interactions
- `zoom`: Attention-grabbing, confirmations
- `scale`: Quick popups, context menus
- `drawer`: Side panel, navigation
- `none`: Performance-critical or reduced motion preferences

This component provides comprehensive modal functionality while maintaining accessibility and performance standards.