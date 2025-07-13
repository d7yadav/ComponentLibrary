# Breadcrumbs Component AI Implementation Guide

## Component Overview
The Breadcrumbs component provides hierarchical navigation with intelligent collapse functionality, full accessibility support, and comprehensive customization options.

## AI Implementation Instructions

### 1. Core Component Structure
```typescript
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator | ReactNode;
  maxItems?: number;
  itemsAfterCollapse?: number;
  itemsBeforeCollapse?: number;
  size?: BreadcrumbSize;
  variant?: BreadcrumbVariant;
  expandOnClick?: boolean;
  // ... accessibility and styling props
}
```

### 2. Essential Features to Implement

#### Collapse Functionality
- **Smart Collapse**: Automatically collapses when items exceed `maxItems`
- **Configurable Display**: Control items shown before/after collapse
- **Expand on Demand**: Toggle expansion with click or keyboard
- **Visual Indicator**: Shows "..." or custom collapse indicator

#### Accessibility Requirements
- **Navigation Role**: `role="navigation"` on container
- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Support**: Space/Enter to expand, Arrow keys for navigation
- **Current Page**: `aria-current="page"` for active breadcrumb
- **Focus Management**: Proper focus indicators and tab order

#### Responsive Behavior
- **Adaptive Collapse**: Adjust collapse threshold for mobile
- **Touch-Friendly**: Larger tap targets on mobile devices
- **Overflow Handling**: Graceful text truncation when needed

### 3. Implementation Patterns

#### Item Rendering Logic
```typescript
const renderBreadcrumbItem = useCallback((item: BreadcrumbItem, index: number) => {
  // Handle different item types: link, button, or text
  if (item.href && !item.current) {
    return <BreadcrumbLink href={item.href}>{content}</BreadcrumbLink>;
  }
  if (item.onClick && !item.current) {
    return <BreadcrumbButton onClick={item.onClick}>{content}</BreadcrumbButton>;
  }
  return <BreadcrumbText>{content}</BreadcrumbText>;
}, []);
```

#### Collapse State Management
```typescript
const visibleItems = useMemo(() => {
  if (!shouldCollapse || isExpanded) return items;
  
  return {
    before: items.slice(0, itemsBeforeCollapse),
    after: items.slice(-itemsAfterCollapse),
    hasCollapsed: true
  };
}, [items, shouldCollapse, isExpanded, itemsBeforeCollapse, itemsAfterCollapse]);
```

### 4. Styling Guidelines

#### Theme Integration
- Use theme spacing for consistent gaps
- Respect theme colors for text and separators
- Apply proper contrast ratios for accessibility
- Support both light and dark themes

#### Visual Hierarchy
- Current page should be visually distinct (bold, different color)
- Links should have hover states and focus indicators
- Separators should be subtle but visible
- Collapsed indicator should be interactive

#### Size Variants
```typescript
const SIZE_CONFIGS = {
  small: { fontSize: '0.75rem', padding: '4px 6px', iconSize: '14px' },
  medium: { fontSize: '0.875rem', padding: '6px 8px', iconSize: '16px' },
  large: { fontSize: '1rem', padding: '8px 12px', iconSize: '18px' }
};
```

### 5. Performance Optimizations

#### Memoization Strategy
- Memo the main component to prevent unnecessary re-renders
- Use useCallback for event handlers
- Memoize computed values like visibleItems
- Optimize separator rendering

#### Efficient Updates
- Only re-render when items or state actually changes
- Batch state updates for expansion/collapse
- Use efficient array operations for item slicing

### 6. Testing Requirements

#### Unit Tests
- Test collapse/expand functionality
- Verify accessibility attributes
- Test keyboard navigation
- Validate click handlers
- Test different separator types

#### Integration Tests
- Test with various item configurations
- Verify responsive behavior
- Test with screen readers
- Validate focus management

### 7. Common Use Cases

#### E-commerce Navigation
```typescript
const ecommerceItems = [
  { id: '1', label: 'Store', href: '/', icon: <Home /> },
  { id: '2', label: 'Electronics', href: '/electronics' },
  { id: '3', label: 'Laptops', href: '/electronics/laptops' },
  { id: '4', label: 'Gaming Laptop XYZ', current: true }
];
```

#### File System Navigation
```typescript
const fileSystemItems = [
  { id: '1', label: 'Root', href: '/', icon: <Folder /> },
  { id: '2', label: 'Documents', href: '/documents' },
  { id: '3', label: 'index.html', current: true, icon: <Description /> }
];
```

#### Application Navigation
```typescript
const appNavItems = [
  { id: '1', label: 'Dashboard', onClick: navigateTo('/dashboard') },
  { id: '2', label: 'Settings', onClick: navigateTo('/settings') },
  { id: '3', label: 'Profile', current: true }
];
```

### 8. Advanced Features

#### Custom Separators
- Support React elements as separators
- Provide common separator presets
- Allow themed separator styling

#### Dynamic Loading
- Support async item loading
- Show loading states for breadcrumbs
- Handle loading errors gracefully

#### URL Integration
- Sync with browser history
- Support query parameters
- Handle deep linking scenarios

### 9. Error Handling

#### Validation
- Ensure items array is not empty
- Validate collapse configuration
- Check for required item properties
- Warn about accessibility issues

#### Fallbacks
- Graceful degradation for missing icons
- Fallback text for failed link navigation
- Default separators if custom ones fail

### 10. Maintenance Guidelines

#### Code Organization
- Keep rendering logic in separate functions
- Extract reusable utilities
- Maintain consistent naming conventions
- Document complex algorithms

#### Future Enhancements
- Consider animation for expand/collapse
- Add support for item tooltips
- Implement breadcrumb trails persistence
- Add support for structured data markup

## Implementation Checklist

- [ ] Core breadcrumb rendering with items array
- [ ] Separator support (built-in and custom)
- [ ] Collapse functionality with configurable thresholds
- [ ] Expand/collapse toggle with keyboard support
- [ ] Full accessibility implementation
- [ ] Size and variant support
- [ ] Icon support for breadcrumb items
- [ ] Click handlers for navigation
- [ ] Responsive design considerations
- [ ] Theme integration and styling
- [ ] Performance optimizations
- [ ] Comprehensive testing
- [ ] Error handling and validation
- [ ] Documentation and examples

## AI Assistant Notes

When implementing or modifying this component:

1. **Prioritize Accessibility**: This is a navigation component - accessibility is crucial
2. **Test Collapse Logic**: The collapse/expand functionality is complex - test thoroughly
3. **Consider Performance**: With many items, rendering can be expensive - optimize accordingly
4. **Validate Props**: Ensure collapse configuration makes sense mathematically
5. **Support Flexibility**: Different apps need different breadcrumb behaviors - keep it configurable
6. **Mobile-First**: Breadcrumbs are especially important on mobile - design for touch
7. **SEO Considerations**: Proper markup helps with search engine understanding
8. **Testing Priority**: Focus on keyboard navigation and screen reader compatibility