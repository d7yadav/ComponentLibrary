# ListItem Component AI Guide

@author dilip.yadav@shorelineiot.com

## Overview

`ListItem` is a strongly-typed, accessible, and customizable React component designed for use within lists. It follows Material-UI and project best practices, supporting flexible content, actions, and styling.

## Usage

- Use as a direct child of a `List` component.
- Supports custom content, icons, and actions.
- Fully accessible and keyboard-navigable.

## Props

See `ListItem.types.ts` for all available props and their types.

## Best Practices

- Use absolute import paths via alias for all imports.
- Always provide a unique `key` when rendering in a list.
- Use with `ListItemText`, `ListItemIcon`, and `ListItemSecondaryAction` for complex layouts.
- Avoid deprecated props or patterns.
- Use selectors or hooks to access store values if needed.

## Accessibility

- Follows WAI-ARIA best practices for list items.
- Supports keyboard navigation and focus management.

## Example

```tsx
import { ListItem } from '@/components/surfaces/ListItem';

<ListItem selected onClick={() => console.log('Clicked!')}>
  List Item Content
</ListItem>
```

## Customization

- Style using the `className` or `sx` prop.
- Extend with custom components as children.

## Related Components

- `List`
- `ListItemText`
- `ListItemIcon`
- `ListItemSecondaryAction`

## References

- [Material-UI ListItem Documentation](https://mui.com/material-ui/react-list/#listitem) 