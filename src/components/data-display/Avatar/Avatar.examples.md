# 📖 Avatar Examples

## Basic Usage

```typescript
import { Avatar } from '@/components/data-display/Avatar';

// Basic usage
const Example = () => {
  return (
    <Avatar>
      Basic Avatar example
    </Avatar>
  );
};
```

## Advanced Examples

```typescript
// Advanced configuration
const AdvancedExample = () => {
  const [value, setValue] = useState('');
  
  return (
    <Avatar
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
      Advanced Avatar
    </Avatar>
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
    <Avatar
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
  <Avatar disabled>
    No content available
  </Avatar>
);

// Edge case: Error states
const ErrorState = () => (
  <Avatar 
    error
    helperText="Something went wrong"
  />
);

// Edge case: Loading states
const LoadingState = () => (
  <Avatar 
    loading
    disabled
  />
);
```

## Performance Optimization Examples

```typescript
// Memoized component for performance
const OptimizedAvatar = React.memo((props: AvatarProps) => {
  const memoizedValue = useMemo(() => {
    // Expensive calculation
    return heavyComputation(props.value);
  }, [props.value]);

  return (
    <Avatar 
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
        <Avatar key={index}>
          Item {index}
        </Avatar>
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
    <Avatar
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
      Accessible Avatar
    </Avatar>
  );
};

// High contrast mode support
const HighContrastExample = () => {
  return (
    <Avatar
      sx={{
        '@media (prefers-contrast: high)': {
          borderWidth: 2,
          borderColor: 'text.primary',
        },
      }}
    >
      High contrast support
    </Avatar>
  );
};
```

---

*These examples demonstrate real-world usage patterns and best practices for the Avatar component.*
