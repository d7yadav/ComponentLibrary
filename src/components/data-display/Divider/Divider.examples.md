# Divider Examples

## Basic Horizontal Divider
```tsx
import { Divider } from '@/components/data-display/Divider';

<Divider />
```

## Inset Divider
```tsx
<Divider variant="inset" />
```

## Vertical Divider in Flex Layout
```tsx
<div style={{ display: 'flex', alignItems: 'center' }}>
  <span>Left</span>
  <Divider orientation="vertical" style={{ height: 40 }} />
  <span>Right</span>
</div>
```

## Custom Color Divider
```tsx
<Divider color="#1976d2" />
```

## Flex Item Divider
```tsx
<div style={{ display: 'flex' }}>
  <div>Item 1</div>
  <Divider flexItem orientation="vertical" />
  <div>Item 2</div>
</div>
``` 