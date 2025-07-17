# 📖 FormLabel Examples

## Basic Usage

```typescript
import { FormLabel } from '@/components/forms/FormLabel';

// Basic usage
const Example = () => {
  return (
    <FormLabel>
      Basic FormLabel example
    </FormLabel>
  );
};
```

## Advanced Examples

```typescript
// Advanced configuration
const AdvancedExample = () => {
  const [value, setValue] = useState('');
  
  return (
    <FormLabel
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
      Advanced FormLabel
    </FormLabel>
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
    <FormLabel
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
  <FormLabel disabled>
    No content available
  </FormLabel>
);

// Edge case: Error states
const ErrorState = () => (
  <FormLabel 
    error
    helperText="Something went wrong"
  />
);

// Edge case: Loading states
const LoadingState = () => (
  <FormLabel 
    loading
    disabled
  />
);
```

## Performance Optimization Examples

```typescript
// Memoized component for performance
const OptimizedFormLabel = React.memo((props: FormLabelProps) => {
  const memoizedValue = useMemo(() => {
    // Expensive calculation
    return heavyComputation(props.value);
  }, [props.value]);

  return (
    <FormLabel 
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
        <FormLabel key={index}>
          Item {index}
        </FormLabel>
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
    <FormLabel
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
      Accessible FormLabel
    </FormLabel>
  );
};

// High contrast mode support
const HighContrastExample = () => {
  return (
    <FormLabel
      sx={{
        '@media (prefers-contrast: high)': {
          borderWidth: 2,
          borderColor: 'text.primary',
        },
      }}
    >
      High contrast support
    </FormLabel>
  );
};
```

---

*These examples demonstrate real-world usage patterns and best practices for the FormLabel component.*
