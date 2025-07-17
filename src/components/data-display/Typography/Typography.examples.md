# Typography Component Examples

## 📚 Comprehensive Usage Examples

### 1. Basic Typography Variants

#### Headings
```typescript
// Primary heading
<Typography variant="h1" component="h1">
  Main Page Title
</Typography>

// Section headings with proper semantic HTML
<Typography variant="h2" component="h2" gutterBottom>
  Section Title
</Typography>

<Typography variant="h3" component="h3">
  Subsection Heading
</Typography>

// Using HeadingTypography for quick setup
<HeadingTypography variant="h4">
  Quick Heading with Defaults
</HeadingTypography>
```

#### Body Text
```typescript
// Standard body text
<Typography variant="body1" paragraph>
  This is the primary body text variant. It's used for most content and provides
  excellent readability across different screen sizes.
</Typography>

<Typography variant="body2" color="text.secondary">
  This is the secondary body text variant, typically used for less prominent content.
</Typography>

// Using BodyTypography for paragraphs
<BodyTypography>
  Quick paragraph setup with automatic paragraph spacing and proper semantics.
</BodyTypography>
```

#### UI Text
```typescript
// Button text
<Typography variant="button" textTransform="uppercase">
  Button Label
</Typography>

// Caption text
<Typography variant="caption" color="text.secondary">
  Image caption or metadata
</Typography>

// Overline text
<Typography variant="overline">
  Category Label
</Typography>

// Subtitles
<Typography variant="subtitle1" fontWeight="medium">
  Primary Subtitle
</Typography>

<Typography variant="subtitle2">
  Secondary Subtitle
</Typography>
```

### 2. Advanced Typography Features

#### Multi-line Truncation
```typescript
// Truncate after 3 lines
<Typography 
  variant="body1" 
  maxLines={3}
  title="This is the full text content that will be available to screen readers and shown on hover"
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
  pariatur.
</Typography>

// Single line truncation
<Typography variant="h6" noWrap>
  This heading will be truncated with ellipsis if it's too long for the container
</Typography>
```

#### Interactive Typography
```typescript
// Clickable text with proper accessibility
<Typography 
  variant="body1"
  component="button"
  role="button"
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  tabIndex={0}
  sx={{ 
    cursor: 'pointer',
    textDecoration: 'underline',
    color: 'primary.main',
    background: 'none',
    border: 'none',
    padding: 0,
    '&:hover': {
      color: 'primary.dark',
    }
  }}
>
  Click to learn more
</Typography>

// Link-style typography
<Typography 
  variant="body2"
  component="a"
  href="/learn-more"
  sx={{
    color: 'primary.main',
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
    }
  }}
>
  External link text
</Typography>
```

#### Gradient Typography
```typescript
// Gradient heading
<Typography 
  variant="h2"
  component="h1"
  sx={{
    background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: 'bold',
  }}
>
  Gradient Heading Text
</Typography>

// Multi-color gradient
<Typography 
  variant="h3"
  sx={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    fontWeight: 'bold',
  }}
>
  Beautiful Gradient Effect
</Typography>
```

### 3. Responsive Typography

#### Responsive Font Sizes
```typescript
// Responsive heading
<Typography 
  variant="h1"
  component="h1"
  sx={{
    fontSize: {
      xs: '2rem',    // Mobile
      sm: '2.5rem',  // Tablet
      md: '3.5rem',  // Desktop
      lg: '4rem',    // Large screens
    },
    lineHeight: {
      xs: 1.2,
      md: 1.1,
    }
  }}
>
  Responsive Heading
</Typography>

// Dynamic text sizing
<Typography 
  variant="body1"
  responsive={true}
  sx={{
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
  }}
>
  Text that scales smoothly with viewport
</Typography>
```

#### Breakpoint-Specific Variants
```typescript
// Different variants at different breakpoints
<Typography 
  variant="h4"
  sx={{
    typography: {
      xs: 'h6',
      sm: 'h5',
      md: 'h4',
    }
  }}
>
  Adaptive Typography Variant
</Typography>
```

### 4. Accessibility Examples

#### Proper Heading Hierarchy
```typescript
<article>
  <Typography variant="h1" component="h1" id="main-title">
    Article Title
  </Typography>
  
  <Typography variant="h2" component="h2" aria-level={2}>
    Section 1: Introduction
  </Typography>
  
  <BodyTypography>
    Article introduction content...
  </BodyTypography>
  
  <Typography variant="h3" component="h3" aria-level={3}>
    Subsection 1.1
  </Typography>
  
  <BodyTypography>
    Subsection content...
  </BodyTypography>
</article>
```

#### ARIA Labels and Descriptions
```typescript
// Content with descriptive labels
<div>
  <Typography 
    variant="h5" 
    component="h2"
    id="status-heading"
    aria-label="Current system status"
  >
    System Status
  </Typography>
  
  <Typography 
    variant="body1"
    color="success.main"
    aria-describedby="status-heading"
    role="status"
    aria-live="polite"
  >
    All systems operational
  </Typography>
</div>

// Error messages with proper ARIA
<Typography 
  variant="body2"
  color="error.main"
  role="alert"
  aria-live="assertive"
  id="error-message"
>
  Please correct the errors above
</Typography>
```

#### Screen Reader Optimizations
```typescript
// Hidden content for screen readers
<>
  <Typography variant="h3" component="h3">
    Financial Summary
  </Typography>
  <Typography variant="body1" sx={{ position: 'absolute', left: '-10000px' }}>
    The following table contains financial data for the quarter
  </Typography>
  <Typography variant="body1" aria-hidden="true">
    💰 Revenue: $1.2M
  </Typography>
  <Typography variant="body1" sx={{ position: 'absolute', left: '-10000px' }}>
    Revenue: 1.2 million dollars
  </Typography>
</>
```

### 5. Form Typography Examples

#### Form Labels
```typescript
// Required field labels
<Box component="fieldset">
  <Typography variant="h6" component="legend">
    Contact Information
  </Typography>
  
  <Box sx={{ mb: 2 }}>
    <LabelTypography htmlFor="email" sx={{ display: 'block', mb: 0.5 }}>
      Email Address
      <Typography component="span" color="error.main" aria-label="required">
        *
      </Typography>
    </LabelTypography>
    <TextField id="email" type="email" fullWidth />
  </Box>
  
  <Box sx={{ mb: 2 }}>
    <LabelTypography htmlFor="phone" sx={{ display: 'block', mb: 0.5 }}>
      Phone Number
    </LabelTypography>
    <TextField id="phone" type="tel" fullWidth />
    <CaptionTypography color="text.secondary">
      Optional: We'll only use this for order updates
    </CaptionTypography>
  </Box>
</Box>
```

#### Form Validation Messages
```typescript
// Success message
<Typography 
  variant="body2" 
  color="success.main"
  role="status"
  aria-live="polite"
  sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
>
  <CheckCircleIcon sx={{ mr: 0.5, fontSize: 16 }} />
  Email address is valid
</Typography>

// Warning message
<Typography 
  variant="body2" 
  color="warning.main"
  role="alert"
  aria-live="polite"
>
  ⚠️ Please verify this email address
</Typography>

// Error message
<Typography 
  variant="body2" 
  color="error.main"
  role="alert"
  aria-live="assertive"
>
  ❌ This field is required
</Typography>
```

### 6. Content Layout Examples

#### Article Content
```typescript
<Box sx={{ maxWidth: 'md', mx: 'auto', p: 3 }}>
  <Typography variant="h3" component="h1" gutterBottom>
    Understanding React Performance
  </Typography>
  
  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
    A comprehensive guide to optimizing your React applications
  </Typography>
  
  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
    Published on March 15, 2024 • 8 min read
  </Typography>
  
  <BodyTypography>
    React applications can sometimes feel slow, especially as they grow in complexity. 
    Understanding the root causes of performance issues and knowing how to address them 
    is crucial for building fast, responsive user interfaces.
  </BodyTypography>
  
  <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>
    Common Performance Bottlenecks
  </Typography>
  
  <BodyTypography>
    Let's explore the most common performance issues developers encounter...
  </BodyTypography>
</Box>
```

#### Card Content Typography
```typescript
<Card sx={{ maxWidth: 345 }}>
  <CardContent>
    <Typography variant="h5" component="h2" gutterBottom>
      Product Title
    </Typography>
    
    <Typography variant="h6" color="primary.main" gutterBottom>
      $99.99
    </Typography>
    
    <Typography variant="body2" color="text.secondary" paragraph>
      This is a brief description of the product that explains its key features 
      and benefits in a concise manner.
    </Typography>
    
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <CaptionTypography>
        ⭐ 4.8 (124 reviews)
      </CaptionTypography>
      <CaptionTypography color="success.main">
        In Stock
      </CaptionTypography>
    </Box>
  </CardContent>
</Card>
```

### 7. Status and Feedback Examples

#### Loading States
```typescript
<Box sx={{ textAlign: 'center', py: 4 }}>
  <CircularProgress sx={{ mb: 2 }} />
  <Typography variant="h6" gutterBottom>
    Loading Content
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Please wait while we fetch your data...
  </Typography>
</Box>
```

#### Empty States
```typescript
<Box sx={{ textAlign: 'center', py: 8 }}>
  <Typography variant="h4" gutterBottom color="text.secondary">
    No Results Found
  </Typography>
  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
    We couldn't find any items matching your search criteria.
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Try adjusting your filters or search terms.
  </Typography>
</Box>
```

#### Success/Error Feedback
```typescript
// Success notification
<Alert severity="success">
  <Typography variant="body2" fontWeight="medium">
    Operation Completed Successfully
  </Typography>
  <Typography variant="body2">
    Your changes have been saved and will take effect immediately.
  </Typography>
</Alert>

// Error notification
<Alert severity="error">
  <Typography variant="body2" fontWeight="medium">
    Unable to Process Request
  </Typography>
  <Typography variant="body2">
    Please check your internet connection and try again.
  </Typography>
</Alert>
```

### 8. Advanced Layout Examples

#### Two-Column Content
```typescript
<Grid container spacing={4}>
  <Grid item xs={12} md={8}>
    <Typography variant="h4" component="h1" gutterBottom>
      Main Content
    </Typography>
    <BodyTypography>
      Primary article content goes here...
    </BodyTypography>
  </Grid>
  <Grid item xs={12} md={4}>
    <Typography variant="h6" gutterBottom>
      Related Articles
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Sidebar content and related links...
    </Typography>
  </Grid>
</Grid>
```

#### Dynamic Content with Conditional Styling
```typescript
const BlogPost = ({ post, isFeature }) => (
  <Box>
    <Typography 
      variant={isFeature ? "h3" : "h5"} 
      component="h2"
      color={isFeature ? "primary.main" : "text.primary"}
      gutterBottom
    >
      {post.title}
    </Typography>
    
    <Typography 
      variant="body2" 
      color="text.secondary"
      sx={{ 
        fontSize: isFeature ? '1rem' : '0.875rem',
        mb: 2 
      }}
    >
      {post.excerpt}
    </Typography>
    
    <CaptionTypography>
      {formatDate(post.publishedAt)} • {post.readTime} min read
    </CaptionTypography>
  </Box>
);
```

These examples demonstrate the versatility and power of the Typography component system, showing how to create accessible, responsive, and visually appealing text content for any application.