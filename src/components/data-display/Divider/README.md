# Divider

Internal wrapper for MUI Divider, providing consistent theming and usage across the component library.

## Features
- Horizontal and vertical orientation
- Full width, inset, and middle variants
- Custom color and style support
- TypeScript strict mode
- Storybook documentation
- Accessibility compliance

## Quick Start
```tsx
import { Divider } from '@/components/data-display/Divider';

<Divider orientation="horizontal" variant="fullWidth" />
```

## API Reference
| Prop         | Type                              | Default      | Description                  |
|--------------|-----------------------------------|--------------|------------------------------|
| orientation  | 'horizontal' \| 'vertical'        | 'horizontal' | Divider orientation          |
| variant      | 'fullWidth' \| 'inset' \| 'middle'| 'fullWidth'  | Divider variant              |
| color        | string                            | -            | Custom border color          |
| flexItem     | boolean                           | false        | If true, flex item           |
| className    | string                            | -            | Custom class name            |
| style        | React.CSSProperties               | -            | Custom styles                |

## Accessibility
- Uses native `<hr>` or `<div>` for correct semantics
- Supports ARIA attributes via props

## Related Components
- [Box](../Box/README.md)
- [Typography](../Typography/README.md)

---
*Part of the AI-Friendly Material-UI Component Library* 