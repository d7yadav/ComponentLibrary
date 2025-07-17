# 📖 List Examples

## Basic Usage

```typescript
import { List } from '@/components/surfaces/List';

// Basic usage
const Example = () => {
  return (
    <List>
      Basic List example
    </List>
  );
};
```

## Advanced Examples

```typescript
// Advanced configuration
const AdvancedExample = () => {
  const [value, setValue] = useState('');
  
  return (
    <List
      variant="primary"
      disabled={false}
      onChange={(e) => setValue(e.target.value)}
      sx={{
        borderRadius: 2,
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      Advanced List
    </List>
  );
};
```

## Integration Examples

```typescript
// Integration with form libraries
import { useController, Control } from 'react-hook-form';

interface FormIntegrationProps {
  name: string;
  control: Control;
}

const FormIntegration = ({ name, control }: FormIntegrationProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <List
      {...field}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};
```

## Edge Cases

```typescript
// Edge case: Empty states
const EmptyState = () => (
  <List disabled>
    No content available
  </List>
);

// Edge case: Error states
const ErrorState = () => (
  <List 
    error
    helperText="Something went wrong"
  />
);

// Edge case: Loading states
const LoadingState = () => (
  <List 
    loading
    disabled
  />
);
```

## Performance Optimization Examples

```typescript
// Memoized component for performance
const OptimizedList = React.memo((props: ListProps) => {
  const memoizedValue = useMemo(() => {
    // Expensive calculation
    return heavyComputation(props.value);
  }, [props.value]);

  return (
    <List 
      {...props}
      value={memoizedValue}
    />
  );
});

// Lazy loading for large lists
const LazyList = () => {
  return (
    <VirtualizedList
      itemCount={1000}
      renderItem={({ index }) => (
        <List key={index}>
          Item {index}
        </List>
      )}
    />
  );
};
```

## Accessibility Examples

```typescript
// Full accessibility implementation
const AccessibleExample = () => {
  return (
    <List
      aria-label="Descriptive label for screen readers"
      aria-describedby="helper-text"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleAction();
        }
      }}
    >
      Accessible List
    </List>
  );
};

// High contrast mode support
const HighContrastExample = () => {
  return (
    <List
      sx={{
        '@media (prefers-contrast: high)': {
          borderWidth: 2,
          borderColor: 'text.primary',
        },
      }}
    >
      High contrast support
    </List>
  );
};
```

---

*These examples demonstrate real-world usage patterns and best practices for the List component.*
