# Typography Component AI Guide

## 🤖 AI Assistant Instructions

### Component Overview
The Typography component is a comprehensive text rendering system with 13 typography variants, advanced accessibility features, and enhanced styling capabilities. It serves as the foundation for all text display in the design system.

### Key Features for AI Implementation
- **13 Typography Variants**: h1-h6, body1-2, button, caption, overline, subtitle1-2
- **Enhanced Accessibility**: WCAG 2.1 AA compliance with ARIA support
- **Interactive Text Support**: Click handlers and button/link roles
- **Gradient Text**: Advanced gradient text rendering
- **Multi-line Truncation**: Configurable text truncation
- **Responsive Typography**: Automatic scaling across devices
- **Font Feature Settings**: Advanced typography features

## 🎯 AI Usage Patterns

### 1. Basic Text Display
```typescript
// Simple text rendering
<Typography variant="body1">
  Standard body text content
</Typography>

// Heading with semantic HTML
<Typography variant="h2" component="h2">
  Section Heading
</Typography>
```

### 2. Enhanced Typography Features
```typescript
// Multi-line truncation
<Typography 
  variant="body1" 
  maxLines={3}
  title="Full text for accessibility"
>
  Long text content that will be truncated after 3 lines...
</Typography>

// Interactive text with click handling
<Typography 
  variant="button" 
  role="button"
  onClick={handleClick}
  sx={{ cursor: 'pointer' }}
>
  Clickable Text
</Typography>
```

### 3. Specialized Typography Components
```typescript
// Use pre-configured variants for common patterns
<HeadingTypography variant="h1">Main Title</HeadingTypography>
<BodyTypography>Standard paragraph text</BodyTypography>
<CaptionTypography>Secondary information</CaptionTypography>
<LabelTypography>Form label text</LabelTypography>
```

## 🎨 Styling Guidelines

### Color System Integration
```typescript
// Use theme colors for consistency
<Typography color="primary.main">Primary text</Typography>
<Typography color="text.secondary">Secondary text</Typography>
<Typography color="error.main">Error message</Typography>
```

### Responsive Typography
```typescript
// Enable responsive scaling (default: true)
<Typography 
  variant="h1" 
  responsive={true}
  sx={{
    fontSize: { xs: '2rem', md: '3rem', lg: '4rem' }
  }}
>
  Responsive Heading
</Typography>
```

### Gradient Text Effects
```typescript
// Advanced gradient text
<Typography 
  variant="h2"
  sx={{
    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}
>
  Gradient Heading
</Typography>
```

## ♿ Accessibility Implementation

### ARIA Support
```typescript
// Proper heading hierarchy
<Typography 
  variant="h3" 
  component="h3"
  aria-level={3}
  id="section-heading"
>
  Section Title
</Typography>

// Descriptive content
<Typography 
  variant="body2"
  aria-describedby="help-text"
  aria-label="Important notice"
>
  Content with accessibility enhancements
</Typography>
```

### Screen Reader Optimization
```typescript
// Content that may be truncated
<Typography 
  maxLines={2}
  title="Full content for screen readers"
  aria-label="Summary text, full content available on interaction"
>
  Truncated content...
</Typography>
```

## 🧩 Common AI Patterns

### 1. Content Cards
```typescript
<Card>
  <CardContent>
    <HeadingTypography variant="h5" gutterBottom>
      Card Title
    </HeadingTypography>
    <BodyTypography color="text.secondary">
      Card description content
    </BodyTypography>
    <CaptionTypography sx={{ mt: 2 }}>
      Last updated: {date}
    </CaptionTypography>
  </CardContent>
</Card>
```

### 2. Form Labels and Help Text
```typescript
<Box>
  <LabelTypography htmlFor="email-input">
    Email Address *
  </LabelTypography>
  <TextField id="email-input" />
  <CaptionTypography color="text.secondary">
    We'll never share your email address
  </CaptionTypography>
</Box>
```

### 3. Status Messages
```typescript
// Error state
<Typography 
  variant="body2" 
  color="error.main"
  role="alert"
  aria-live="polite"
>
  Validation error message
</Typography>

// Success state
<Typography 
  variant="body2" 
  color="success.main"
  role="status"
  aria-live="polite"
>
  Operation completed successfully
</Typography>
```

## 🎭 Advanced Use Cases

### Custom Typography Variants
```typescript
// Create custom variants using sx prop
<Typography
  variant="body1"
  sx={{
    fontFamily: 'monospace',
    backgroundColor: 'grey.100',
    padding: 1,
    borderRadius: 1,
    fontSize: '0.875rem',
  }}
>
  Code snippet text
</Typography>
```

### Dynamic Content Handling
```typescript
// Handle dynamic content with proper accessibility
<Typography
  variant={isImportant ? 'h6' : 'body2'}
  color={isError ? 'error.main' : 'text.primary'}
  aria-live={isError ? 'assertive' : 'polite'}
  role={isError ? 'alert' : undefined}
>
  {dynamicMessage}
</Typography>
```

### Performance Optimization
```typescript
// Use specialized components for better performance
const MemoizedHeading = memo(() => (
  <HeadingTypography variant="h2">
    {expensiveComputedTitle}
  </HeadingTypography>
));
```

## 🚨 Common Pitfalls to Avoid

### ❌ Incorrect Usage
```typescript
// Don't use div when semantic HTML is needed
<Typography variant="h1" component="div">Heading</Typography>

// Don't ignore accessibility for interactive text
<Typography onClick={handleClick}>Clickable</Typography>

// Don't use hardcoded colors
<Typography sx={{ color: '#ff0000' }}>Red text</Typography>
```

### ✅ Correct Usage
```typescript
// Use semantic HTML elements
<Typography variant="h1" component="h1">Heading</Typography>

// Proper interactive text with accessibility
<Typography 
  role="button" 
  onClick={handleClick}
  onKeyDown={handleKeyDown}
  tabIndex={0}
  sx={{ cursor: 'pointer' }}
>
  Clickable
</Typography>

// Use theme colors
<Typography color="error.main">Error text</Typography>
```

## 📊 Performance Considerations

1. **Component Selection**: Use specialized components (HeadingTypography, BodyTypography) when appropriate
2. **Memoization**: The component is already memoized, but consider memoizing parent components with expensive computations
3. **Font Features**: Advanced font features are enabled by default for better readability
4. **Responsive Scaling**: Uses CSS clamp() for optimal performance across devices

## 🔍 Testing Recommendations

```typescript
// Test accessibility features
expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
expect(screen.getByLabelText('Important notice')).toBeInTheDocument();

// Test interactive functionality
fireEvent.click(screen.getByRole('button'));
expect(mockClickHandler).toHaveBeenCalled();

// Test truncation
expect(container.querySelector('[title]')).toHaveAttribute('title', 'Full text content');
```

## 🎯 AI Decision Tree

**When to use Typography variants:**
- `h1-h6`: Semantic headings with proper hierarchy
- `body1-body2`: Standard paragraph content (body1 is larger)
- `button`: Interactive text elements
- `caption`: Secondary information, metadata
- `overline`: Category labels, small headers
- `subtitle1-subtitle2`: Section subheadings

**When to use specialized components:**
- `HeadingTypography`: Quick heading with sensible defaults
- `BodyTypography`: Paragraph text with paragraph spacing
- `CaptionTypography`: Small secondary text
- `LabelTypography`: Form labels and UI labels

This component provides comprehensive typography solutions while maintaining accessibility and performance standards.