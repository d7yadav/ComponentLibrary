# 📖 RadioGroup Examples

## Basic Usage

```typescript
import { RadioGroup } from '@/components/forms/RadioGroup';

// Basic usage
const Example = () => {
  return (
    <RadioGroup>
      Basic RadioGroup example
    </RadioGroup>
  );
};
```

## Advanced Examples

```typescript
// Advanced configuration
const AdvancedExample = () => {
  const [value, setValue] = useState('');
  
  return (
    <RadioGroup
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
      Advanced RadioGroup
    </RadioGroup>
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
    <RadioGroup
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
  <RadioGroup disabled>
    No content available
  </RadioGroup>
);

// Edge case: Error states
const ErrorState = () => (
  <RadioGroup 
    error
    helperText="Something went wrong"
  />
);

// Edge case: Loading states
const LoadingState = () => (
  <RadioGroup 
    loading
    disabled
  />
);
```

## Performance Optimization Examples

```typescript
// Memoized component for performance
const OptimizedRadioGroup = React.memo((props: RadioGroupProps) => {
  const memoizedValue = useMemo(() => {
    // Expensive calculation
    return heavyComputation(props.value);
  }, [props.value]);

  return (
    <RadioGroup 
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
        <RadioGroup key={index}>
          Item {index}
        </RadioGroup>
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
    <RadioGroup
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
      Accessible RadioGroup
    </RadioGroup>
  );
};

// High contrast mode support
const HighContrastExample = () => {
  return (
    <RadioGroup
      sx={{
        '@media (prefers-contrast: high)': {
          borderWidth: 2,
          borderColor: 'text.primary',
        },
      }}
    >
      High contrast support
    </RadioGroup>
  );
};
```

---

*These examples demonstrate real-world usage patterns and best practices for the RadioGroup component.*
