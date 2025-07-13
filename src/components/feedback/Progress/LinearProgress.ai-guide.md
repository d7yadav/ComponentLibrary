# 🤖 AI Coding Guide: LinearProgress

## Component Overview

**Category**: feedback  
**Complexity**: medium  
**AI Suitability**: High - Well-structured for AI development

## Quick AI Reference

### Props Interface
No specific props defined.

### Available Variants
No specific variants defined.

## AI Implementation Guide

### Step-by-Step Implementation

1. **Import the component**:
   ```typescript
   import { LinearProgress } from '@/components/feedback/LinearProgress';
   ```

2. **Define props interface** (if extending):
   ```typescript
   interface MyLinearProgressProps extends LinearProgressProps {
     // Additional props
   }
   ```

3. **Implement with proper TypeScript**:
   ```typescript
   const MyLinearProgress = (props: MyLinearProgressProps) => {
     return <LinearProgress {...props} />;
   };
   ```

### AI-Specific Guidelines

- Always use TypeScript strict mode
- Implement proper prop validation
- Include accessibility attributes
- Follow component naming conventions
- Use absolute imports with @ prefix

## Common AI Coding Mistakes

### Mistakes to Avoid

1. **❌ Using default exports**
   ```typescript
   // Wrong
   export default LinearProgress;
   ```
   
   **✅ Use named exports**
   ```typescript
   // Correct
   export { LinearProgress };
   ```

2. **❌ Missing TypeScript types**
   ```typescript
   // Wrong
   const props: any = { ... };
   ```
   
   **✅ Proper typing**
   ```typescript
   // Correct
   const props: LinearProgressProps = { ... };
   ```

3. **❌ Inline styles without theme**
   ```typescript
   // Wrong
   <LinearProgress style={{ color: 'red' }} />
   ```
   
   **✅ Theme-based styling**
   ```typescript
   // Correct
   <LinearProgress sx={{ color: 'error.main' }} />
   ```

4. **❌ Missing accessibility attributes**
   ```typescript
   // Wrong
   <LinearProgress onClick={handler} />
   ```
   
   **✅ Proper accessibility**
   ```typescript
   // Correct
   <LinearProgress 
     onClick={handler}
     aria-label="Descriptive action"
     role="button"
   />
   ```

## AI Quality Checklist

### Pre-Implementation Checklist

- [ ] Component follows naming conventions (PascalCase)
- [ ] Props interface is properly typed with `LinearProgressProps`
- [ ] Component uses named exports only
- [ ] Absolute imports are used (`@/components/...`)
- [ ] Theme integration is implemented
- [ ] Accessibility attributes are included
- [ ] Component is responsive
- [ ] Error boundaries are considered
- [ ] Performance optimizations are applied

### Code Quality Checklist

- [ ] TypeScript strict mode compliance
- [ ] No `any` types used
- [ ] Proper error handling
- [ ] Consistent code formatting
- [ ] JSDoc documentation added
- [ ] Component is testable
- [ ] Storybook stories created
- [ ] Accessibility tested

### Performance Checklist

- [ ] React.memo used if appropriate
- [ ] Expensive operations memoized
- [ ] Bundle size impact considered
- [ ] Re-render optimization implemented
- [ ] Props destructuring optimized

## AI Testing Patterns

### Recommended Testing Approach

1. **Unit Tests**:
   ```typescript
   import { render, screen } from '@testing-library/react';
   import { LinearProgress } from './LinearProgress';
   
   describe('LinearProgress', () => {
     it('renders with default props', () => {
       render(<LinearProgress />);
       expect(screen.getByRole('...')).toBeInTheDocument();
     });
   });
   ```

2. **Props Testing**:
   ```typescript
   it('handles all prop combinations', () => {
     const props: LinearProgressProps = {
       // Test all required props
     };
     render(<LinearProgress {...props} />);
   });
   ```

3. **Accessibility Testing**:
   ```typescript
   import { axe, toHaveNoViolations } from 'jest-axe';
   
   it('meets accessibility standards', async () => {
     const { container } = render(<LinearProgress />);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   ```

4. **Interaction Testing**:
   ```typescript
   import userEvent from '@testing-library/user-event';
   
   it('handles user interactions', async () => {
     const user = userEvent.setup();
     const handleClick = vi.fn();
     render(<LinearProgress onClick={handleClick} />);
     
     await user.click(screen.getByRole('...'));
     expect(handleClick).toHaveBeenCalled();
   });
   ```

## AI Recommendations

🧪 **Missing Tests**: Implement comprehensive test suite with >95% coverage
📚 **Missing Storybook**: Create comprehensive Storybook stories for documentation
⚡ **Performance**: Use React.memo and useMemo for optimization
♿ **Accessibility**: Ensure WCAG 2.1 AA compliance
🎨 **Theming**: Leverage theme system for consistent styling

---

*This guide is optimized for AI-assisted development. Follow these patterns for consistent, high-quality component implementation.*
