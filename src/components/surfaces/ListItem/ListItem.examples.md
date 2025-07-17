# ListItem Usage Examples

@author dilip.yadav@shorelineiot.com

## Basic ListItem

```tsx
import { ListItem } from '@/components/surfaces/ListItem';

// Basic usage of ListItem
<ListItem>Simple List Item</ListItem>
```

## ListItem with Icon

```tsx
import { ListItem } from '@/components/surfaces/ListItem';
import { ListItemIcon } from '@/components/surfaces/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';

// ListItem with an icon at the start
<ListItem>
  <ListItemIcon>
    <HomeIcon />
  </ListItemIcon>
  Home
</ListItem>
```

## ListItem with Secondary Action

```tsx
import { ListItem } from '@/components/surfaces/ListItem';
import { ListItemSecondaryAction } from '@/components/surfaces/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// ListItem with a secondary action (delete button)
<ListItem>
  List Item with Action
  <ListItemSecondaryAction>
    <IconButton edge="end" aria-label="delete">
      <DeleteIcon />
    </IconButton>
  </ListItemSecondaryAction>
</ListItem>
```

## ListItem with Custom Content

```tsx
import { ListItem } from '@/components/surfaces/ListItem';
import { ListItemText } from '@/components/surfaces/ListItemText';

// ListItem with primary and secondary text
<ListItem>
  <ListItemText primary="Primary Text" secondary="Secondary Text" />
</ListItem>
``` 