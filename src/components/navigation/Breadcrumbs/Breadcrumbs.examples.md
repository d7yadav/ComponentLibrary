# Breadcrumbs Component Examples

## 📚 Comprehensive Usage Examples

### 1. Basic Breadcrumb Navigation

#### Simple Text Breadcrumbs
```typescript
// Basic breadcrumb trail
<Breadcrumbs aria-label="breadcrumb navigation">
  <Typography color="text.primary">Home</Typography>
  <Typography color="text.primary">Products</Typography>
  <Typography color="text.secondary">Electronics</Typography>
</Breadcrumbs>

// With custom separators
<Breadcrumbs 
  separator="›" 
  aria-label="breadcrumb navigation"
  maxItems={4}
>
  <Typography color="text.primary">Dashboard</Typography>
  <Typography color="text.primary">Analytics</Typography>
  <Typography color="text.primary">Reports</Typography>
  <Typography color="text.secondary">Monthly Summary</Typography>
</Breadcrumbs>
```

#### Link-Based Breadcrumbs
```typescript
// Interactive breadcrumb links
<Breadcrumbs aria-label="breadcrumb navigation">
  <Link 
    component={RouterLink} 
    to="/" 
    color="inherit" 
    underline="hover"
  >
    Home
  </Link>
  <Link 
    component={RouterLink} 
    to="/catalog" 
    color="inherit" 
    underline="hover"
  >
    Catalog
  </Link>
  <Link 
    component={RouterLink} 
    to="/catalog/electronics" 
    color="inherit" 
    underline="hover"
  >
    Electronics
  </Link>
  <Typography color="text.primary">
    Smartphones
  </Typography>
</Breadcrumbs>

// With Next.js Link integration
<Breadcrumbs aria-label="breadcrumb navigation">
  <NextLink href="/" passHref legacyBehavior>
    <Link color="inherit" underline="hover">
      Home
    </Link>
  </NextLink>
  <NextLink href="/products" passHref legacyBehavior>
    <Link color="inherit" underline="hover">
      Products
    </Link>
  </NextLink>
  <Typography color="text.primary">
    Current Page
  </Typography>
</Breadcrumbs>
```

### 2. Icon-Enhanced Breadcrumbs

#### With Leading Icons
```typescript
// Breadcrumbs with icons for better visual hierarchy
<Breadcrumbs aria-label="breadcrumb navigation">
  <Link 
    component={RouterLink} 
    to="/" 
    color="inherit" 
    underline="hover"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
    Home
  </Link>
  <Link 
    component={RouterLink} 
    to="/settings" 
    color="inherit" 
    underline="hover"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <SettingsIcon sx={{ mr: 0.5, fontSize: 20 }} />
    Settings
  </Link>
  <Typography 
    color="text.primary"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <AccountCircleIcon sx={{ mr: 0.5, fontSize: 20 }} />
    Profile
  </Typography>
</Breadcrumbs>

// Category-specific icons
<Breadcrumbs aria-label="breadcrumb navigation">
  <Link 
    component={RouterLink} 
    to="/" 
    color="inherit"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <DashboardIcon sx={{ mr: 0.5, fontSize: 18 }} />
    Dashboard
  </Link>
  <Link 
    component={RouterLink} 
    to="/analytics" 
    color="inherit"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <BarChartIcon sx={{ mr: 0.5, fontSize: 18 }} />
    Analytics
  </Link>
  <Typography 
    color="text.primary"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <TrendingUpIcon sx={{ mr: 0.5, fontSize: 18 }} />
    Performance
  </Typography>
</Breadcrumbs>
```

#### Custom Icon Separators
```typescript
// Using custom icons as separators
<Breadcrumbs 
  separator={<ChevronRightIcon fontSize="small" color="action" />}
  aria-label="breadcrumb navigation"
>
  <Link component={RouterLink} to="/" color="inherit">
    Home
  </Link>
  <Link component={RouterLink} to="/docs" color="inherit">
    Documentation
  </Link>
  <Typography color="text.primary">
    Components
  </Typography>
</Breadcrumbs>

// Arrow separators for modern UI
<Breadcrumbs 
  separator={<ArrowForwardIosIcon sx={{ fontSize: 12, color: 'text.disabled' }} />}
  aria-label="breadcrumb navigation"
>
  <Link component={RouterLink} to="/" color="inherit">
    Projects
  </Link>
  <Link component={RouterLink} to="/project/123" color="inherit">
    Website Redesign
  </Link>
  <Typography color="text.primary">
    Design Assets
  </Typography>
</Breadcrumbs>
```

### 3. Advanced Breadcrumb Patterns

#### Responsive Breadcrumbs with Collapse
```typescript
// Breadcrumbs that collapse on mobile
<Breadcrumbs 
  maxItems={3}
  itemsBeforeCollapse={1}
  itemsAfterCollapse={2}
  aria-label="breadcrumb navigation"
  sx={{
    '& .MuiBreadcrumbs-separator': {
      mx: { xs: 0.5, sm: 1 }
    }
  }}
>
  <Link component={RouterLink} to="/" color="inherit">
    Home
  </Link>
  <Link component={RouterLink} to="/category" color="inherit">
    Category
  </Link>
  <Link component={RouterLink} to="/category/subcategory" color="inherit">
    Subcategory
  </Link>
  <Link component={RouterLink} to="/category/subcategory/items" color="inherit">
    Items
  </Link>
  <Typography color="text.primary">
    Current Item
  </Typography>
</Breadcrumbs>

// Smart mobile collapse with custom behavior
<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
  {/* Full breadcrumbs for desktop */}
  <Breadcrumbs aria-label="breadcrumb navigation">
    <Link component={RouterLink} to="/" color="inherit">Home</Link>
    <Link component={RouterLink} to="/products" color="inherit">Products</Link>
    <Link component={RouterLink} to="/products/electronics" color="inherit">Electronics</Link>
    <Link component={RouterLink} to="/products/electronics/phones" color="inherit">Phones</Link>
    <Typography color="text.primary">iPhone 14</Typography>
  </Breadcrumbs>
</Box>

<Box sx={{ display: { xs: 'block', sm: 'none' } }}>
  {/* Simplified breadcrumbs for mobile */}
  <Breadcrumbs aria-label="breadcrumb navigation">
    <Link component={RouterLink} to="/products/electronics/phones" color="inherit">
      ← Phones
    </Link>
    <Typography color="text.primary">iPhone 14</Typography>
  </Breadcrumbs>
</Box>
```

#### Dynamic Breadcrumbs from Route Data
```typescript
// Generate breadcrumbs from route configuration
const BreadcrumbsFromRoute = ({ pathname }) => {
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  const breadcrumbData = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { path: '/users', label: 'Users', icon: PeopleIcon },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];
  
  const buildBreadcrumbs = () => {
    let currentPath = '';
    
    return pathSegments.map((segment, index) => {
      currentPath += `/${segment}`;
      const breadcrumb = breadcrumbData.find(item => item.path === currentPath);
      const isLast = index === pathSegments.length - 1;
      
      if (isLast) {
        return (
          <Typography 
            key={currentPath}
            color="text.primary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {breadcrumb?.icon && <breadcrumb.icon sx={{ mr: 0.5, fontSize: 18 }} />}
            {breadcrumb?.label || segment}
          </Typography>
        );
      }
      
      return (
        <Link
          key={currentPath}
          component={RouterLink}
          to={currentPath}
          color="inherit"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {breadcrumb?.icon && <breadcrumb.icon sx={{ mr: 0.5, fontSize: 18 }} />}
          {breadcrumb?.label || segment}
        </Link>
      );
    });
  };
  
  return (
    <Breadcrumbs aria-label="breadcrumb navigation">
      <Link component={RouterLink} to="/" color="inherit">
        <HomeIcon sx={{ fontSize: 18 }} />
      </Link>
      {buildBreadcrumbs()}
    </Breadcrumbs>
  );
};
```

### 4. E-commerce Breadcrumb Examples

#### Product Category Navigation
```typescript
// E-commerce product breadcrumbs
<Breadcrumbs aria-label="product navigation">
  <Link component={RouterLink} to="/" color="inherit" underline="hover">
    <StorefrontIcon sx={{ mr: 0.5, fontSize: 18 }} />
    Store
  </Link>
  <Link 
    component={RouterLink} 
    to="/category/electronics" 
    color="inherit" 
    underline="hover"
  >
    Electronics
  </Link>
  <Link 
    component={RouterLink} 
    to="/category/electronics/computers" 
    color="inherit" 
    underline="hover"
  >
    Computers
  </Link>
  <Link 
    component={RouterLink} 
    to="/category/electronics/computers/laptops" 
    color="inherit" 
    underline="hover"
  >
    Laptops
  </Link>
  <Typography color="text.primary">
    MacBook Pro 16"
  </Typography>
</Breadcrumbs>

// With product count indicators
<Box>
  <Breadcrumbs aria-label="category navigation" sx={{ mb: 1 }}>
    <Link component={RouterLink} to="/" color="inherit">Home</Link>
    <Link component={RouterLink} to="/women" color="inherit">
      Women <Chip label="2,847" size="small" sx={{ ml: 0.5, height: 16 }} />
    </Link>
    <Link component={RouterLink} to="/women/clothing" color="inherit">
      Clothing <Chip label="1,203" size="small" sx={{ ml: 0.5, height: 16 }} />
    </Link>
    <Typography color="text.primary">
      Dresses <Chip label="87" size="small" sx={{ ml: 0.5, height: 16 }} />
    </Typography>
  </Breadcrumbs>
</Box>
```

#### Shopping Cart Process
```typescript
// Multi-step process breadcrumbs
<Breadcrumbs 
  separator={<ChevronRightIcon fontSize="small" />}
  aria-label="checkout process"
>
  <Typography 
    color="success.main"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <CheckCircleIcon sx={{ mr: 0.5, fontSize: 18 }} />
    Cart
  </Typography>
  <Typography 
    color="success.main"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <CheckCircleIcon sx={{ mr: 0.5, fontSize: 18 }} />
    Shipping
  </Typography>
  <Typography 
    color="primary.main"
    sx={{ 
      display: 'flex', 
      alignItems: 'center',
      fontWeight: 'medium'
    }}
  >
    <RadioButtonCheckedIcon sx={{ mr: 0.5, fontSize: 18 }} />
    Payment
  </Typography>
  <Typography 
    color="text.disabled"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <RadioButtonUncheckedIcon sx={{ mr: 0.5, fontSize: 18 }} />
    Confirmation
  </Typography>
</Breadcrumbs>
```

### 5. Application-Specific Examples

#### Admin Dashboard Navigation
```typescript
// Admin panel breadcrumbs with role indicators
<Breadcrumbs aria-label="admin navigation">
  <Link 
    component={RouterLink} 
    to="/admin" 
    color="inherit"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <AdminPanelSettingsIcon sx={{ mr: 0.5, fontSize: 18 }} />
    Admin
  </Link>
  <Link 
    component={RouterLink} 
    to="/admin/users" 
    color="inherit"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <GroupIcon sx={{ mr: 0.5, fontSize: 18 }} />
    User Management
  </Link>
  <Typography 
    color="text.primary"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <PersonIcon sx={{ mr: 0.5, fontSize: 18 }} />
    John Doe
    <Chip 
      label="Admin" 
      size="small" 
      color="primary" 
      sx={{ ml: 1, height: 20 }} 
    />
  </Typography>
</Breadcrumbs>

// With permission-based visibility
<Breadcrumbs aria-label="content management">
  <Link component={RouterLink} to="/" color="inherit">Dashboard</Link>
  <Link component={RouterLink} to="/content" color="inherit">Content</Link>
  {user.permissions.includes('edit_articles') && (
    <Link component={RouterLink} to="/content/articles" color="inherit">
      Articles
    </Link>
  )}
  <Typography color="text.primary">
    {articleTitle}
  </Typography>
</Breadcrumbs>
```

#### Documentation Site Navigation
```typescript
// Documentation breadcrumbs with version info
<Breadcrumbs aria-label="documentation navigation">
  <Link 
    component={RouterLink} 
    to="/docs" 
    color="inherit"
    sx={{ display: 'flex', alignItems: 'center' }}
  >
    <MenuBookIcon sx={{ mr: 0.5, fontSize: 18 }} />
    Docs
    <Chip 
      label="v2.1" 
      size="small" 
      variant="outlined" 
      sx={{ ml: 1, height: 18 }} 
    />
  </Link>
  <Link component={RouterLink} to="/docs/components" color="inherit">
    Components
  </Link>
  <Link component={RouterLink} to="/docs/components/navigation" color="inherit">
    Navigation
  </Link>
  <Typography color="text.primary">
    Breadcrumbs
  </Typography>
</Breadcrumbs>

// API documentation breadcrumbs
<Breadcrumbs 
  separator="/"
  aria-label="api documentation"
  sx={{
    fontFamily: 'monospace',
    backgroundColor: 'grey.100',
    px: 2,
    py: 1,
    borderRadius: 1,
  }}
>
  <Typography variant="body2" color="text.secondary">api</Typography>
  <Typography variant="body2" color="text.secondary">v1</Typography>
  <Typography variant="body2" color="primary.main">users</Typography>
  <Typography variant="body2" color="text.primary">{userId}</Typography>
</Breadcrumbs>
```

### 6. Accessibility-Enhanced Examples

#### Screen Reader Optimized
```typescript
// Enhanced accessibility with detailed ARIA labels
<nav aria-label="Main navigation breadcrumb">
  <Breadcrumbs 
    aria-label="breadcrumb navigation showing your current location"
    role="navigation"
  >
    <Link 
      component={RouterLink} 
      to="/" 
      color="inherit"
      aria-label="Go to homepage"
    >
      Home
    </Link>
    <Link 
      component={RouterLink} 
      to="/products" 
      color="inherit"
      aria-label="Go to products section"
    >
      Products
    </Link>
    <Link 
      component={RouterLink} 
      to="/products/electronics" 
      color="inherit"
      aria-label="Go to electronics category"
    >
      Electronics
    </Link>
    <Typography 
      color="text.primary"
      aria-current="page"
      aria-label="Current page: Smartphones"
    >
      Smartphones
    </Typography>
  </Breadcrumbs>
</nav>

// High contrast mode support
<Breadcrumbs 
  aria-label="breadcrumb navigation"
  sx={{
    '@media (prefers-contrast: high)': {
      '& .MuiBreadcrumbs-separator': {
        color: 'text.primary',
        fontWeight: 'bold',
      },
      '& a': {
        textDecoration: 'underline',
        fontWeight: 'medium',
      }
    }
  }}
>
  <Link component={RouterLink} to="/" color="inherit">Home</Link>
  <Link component={RouterLink} to="/articles" color="inherit">Articles</Link>
  <Typography color="text.primary">Current Article</Typography>
</Breadcrumbs>
```

#### Keyboard Navigation Support
```typescript
// Enhanced keyboard navigation
<Breadcrumbs aria-label="breadcrumb navigation">
  <Link 
    component={RouterLink} 
    to="/" 
    color="inherit"
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate('/');
      }
    }}
    sx={{
      '&:focus': {
        outline: '2px solid',
        outlineColor: 'primary.main',
        outlineOffset: 2,
        borderRadius: 1,
      }
    }}
  >
    Home
  </Link>
  <Link 
    component={RouterLink} 
    to="/catalog" 
    color="inherit"
    sx={{
      '&:focus': {
        outline: '2px solid',
        outlineColor: 'primary.main',
        outlineOffset: 2,
        borderRadius: 1,
      }
    }}
  >
    Catalog
  </Link>
  <Typography color="text.primary">
    Current Page
  </Typography>
</Breadcrumbs>
```

### 7. Integration Examples

#### With Page Header
```typescript
<Box sx={{ mb: 3 }}>
  <Breadcrumbs aria-label="breadcrumb navigation" sx={{ mb: 2 }}>
    <Link component={RouterLink} to="/" color="inherit">Home</Link>
    <Link component={RouterLink} to="/blog" color="inherit">Blog</Link>
    <Typography color="text.primary">Article Title</Typography>
  </Breadcrumbs>
  
  <Typography variant="h3" component="h1" gutterBottom>
    How to Build Better User Interfaces
  </Typography>
  
  <Typography variant="subtitle1" color="text.secondary">
    A comprehensive guide to modern UI development
  </Typography>
</Box>
```

#### With Sidebar Navigation
```typescript
<Box sx={{ display: 'flex', gap: 3 }}>
  <Paper sx={{ width: 250, p: 2 }}>
    {/* Sidebar navigation */}
    <Navigation />
  </Paper>
  
  <Box sx={{ flex: 1 }}>
    <Breadcrumbs aria-label="breadcrumb navigation" sx={{ mb: 2 }}>
      <Link component={RouterLink} to="/" color="inherit">Dashboard</Link>
      <Link component={RouterLink} to="/analytics" color="inherit">Analytics</Link>
      <Typography color="text.primary">User Behavior</Typography>
    </Breadcrumbs>
    
    <Typography variant="h4" component="h1">
      User Behavior Analytics
    </Typography>
    
    {/* Main content */}
  </Box>
</Box>
```

These examples demonstrate the flexibility and accessibility features of the Breadcrumbs component, showing how to implement navigation that works well for both users and screen readers while maintaining visual hierarchy and usability.