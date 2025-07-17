# 📖 FormControl Examples

## Basic Usage

```typescript
import { FormControl } from '@/components/forms/FormControl';

// Basic usage
const Example = () => {
  return (
    <FormControl>
      Basic FormControl example
    </FormControl>
  );
};
```

## Advanced Examples

```typescript
// Advanced configuration
const AdvancedExample = () => {
  const [value, setValue] = useState('');
  
  return (
    <FormControl
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
      Advanced FormControl
    </FormControl>
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
    <FormControl
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
  <FormControl disabled>
    No content available
  </FormControl>
);

// Edge case: Error states
const ErrorState = () => (
  <FormControl 
    error
    helperText="Something went wrong"
  />
);

// Edge case: Loading states
const LoadingState = () => (
  <FormControl 
    loading
    disabled
  />
);
```

## Performance Optimization Examples

```typescript
// Memoized component for performance
const OptimizedFormControl = React.memo((props: FormControlProps) => {
  const memoizedValue = useMemo(() => {
    // Expensive calculation
    return heavyComputation(props.value);
  }, [props.value]);

  return (
    <FormControl 
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
        <FormControl key={index}>
          Item {index}
        </FormControl>
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
    <FormControl
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
      Accessible FormControl
    </FormControl>
  );
};

// High contrast mode support
const HighContrastExample = () => {
  return (
    <FormControl
      sx={{
        '@media (prefers-contrast: high)': {
          borderWidth: 2,
          borderColor: 'text.primary',
        },
      }}
    >
      High contrast support
    </FormControl>
  );
};
```

---

*These examples demonstrate real-world usage patterns and best practices for the FormControl component.*
