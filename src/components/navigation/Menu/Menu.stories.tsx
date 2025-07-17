/**
 * @fileoverview Menu component Storybook stories
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import {
  MoreVert,
  Person,
  Settings,
  ExitToApp,
  Edit,
  Delete,
  Share,
  Download,
  Print,
  ContentCopy,
  Favorite,
  Star,
  Bookmark,
  Home,
  Work,
  School,
} from '@mui/icons-material';
import { 
  Button,
  IconButton,
  Chip,
} from '@mui/material';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React, {  useState, useRef  } from 'react';

import { Menu, MenuItem, MenuList, MenuDividerComponent, MenuGroupHeaderComponent } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Enhanced Menu component with comprehensive features:

- **Context menus** - Right-click and dropdown menus
- **Keyboard navigation** - Full arrow key navigation with Home/End
- **Multiple item types** - Standard, checkbox, radio, and option items
- **Accessibility** - WCAG 2.1 AA compliant with proper ARIA attributes
- **Flexible positioning** - 12 different placement options
- **Rich content** - Icons, secondary text, dividers, and group headers

## Sub-components

- **Menu** - Main container with popover functionality
- **MenuList** - Container for menu items with keyboard navigation
- **MenuItem** - Individual menu item with support for icons and secondary text
- **MenuDivider** - Visual separator between menu sections
- **MenuGroupHeader** - Header for grouping related menu items

## Features

- ✅ **Keyboard Navigation** - Arrow keys, Home, End, Enter, Space, Escape
- ✅ **Multiple Roles** - menuitem, menuitemcheckbox, menuitemradio, option
- ✅ **Flexible Positioning** - 12 placement options with auto-adjustment
- ✅ **Rich Content** - Icons, secondary text, custom components
- ✅ **Accessibility** - Full screen reader support and keyboard navigation
        `,
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the menu is open',
    },
    variant: {
      control: 'select',
      options: ['menu', 'selectedMenu'],
      description: 'The variant of the menu',
    },
    autoFocus: {
      control: 'boolean',
      description: 'If true, the menu will auto-focus when opened',
    },
    disableAutoFocusItem: {
      control: 'boolean',
      description: 'If true, the first menu item will not auto-focus',
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'The elevation of the menu paper',
    },
    onClose: { action: 'closed' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

// Basic menu
export const Default: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          variant="contained"
          onClick={handleClick}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          Open Menu
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  },
};

// Menu with icons
export const WithIcons: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          variant="contained"
          onClick={handleClick}
          startIcon={<Person />}
        >
          Account Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} icon={<Person />}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose} icon={<Settings />}>
            Settings
          </MenuItem>
          <MenuDividerComponent />
          <MenuItem onClick={handleClose} icon={<ExitToApp />}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  },
};

// Context menu
export const ContextMenu: Story = {
  render: () => {
    const [contextMenu, setContextMenu] = useState<{
      mouseX: number;
      mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
      event.preventDefault();
      setContextMenu(
        contextMenu === null
          ? { mouseX: event.clientX + 2, mouseY: event.clientY - 6 }
          : null
      );
    };

    const handleClose = () => {
      setContextMenu(null);
    };

    return (
      <div>
        <div
          onContextMenu={handleContextMenu}
          style={{
            cursor: 'context-menu',
            padding: '20px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            textAlign: 'center',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Right-click here for context menu
        </div>
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorEl={null}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          style={{
            left: contextMenu?.mouseX ?? 0,
            top: contextMenu?.mouseY ?? 0,
          }}
        >
          <MenuItem onClick={handleClose} icon={<Edit />}>
            Edit
          </MenuItem>
          <MenuItem onClick={handleClose} icon={<ContentCopy />}>
            Copy
          </MenuItem>
          <MenuItem onClick={handleClose} icon={<Share />}>
            Share
          </MenuItem>
          <MenuDividerComponent />
          <MenuItem onClick={handleClose} icon={<Delete />}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  },
};

// Menu with checkbox items
export const WithCheckboxItems: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>(['notifications']);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleToggle = (value: string) => {
      setSelectedItems(prev => 
        prev.includes(value)
          ? prev.filter(item => item !== value)
          : [...prev, value]
      );
    };

    return (
      <div>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          Preferences
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuGroupHeaderComponent>Notifications</MenuGroupHeaderComponent>
          <MenuItem
            role="menuitemcheckbox"
            selected={selectedItems.includes('notifications')}
            onClick={() => handleToggle('notifications')}
          >
            Email notifications
          </MenuItem>
          <MenuItem
            role="menuitemcheckbox"
            selected={selectedItems.includes('push')}
            onClick={() => handleToggle('push')}
          >
            Push notifications
          </MenuItem>
          <MenuItem
            role="menuitemcheckbox"
            selected={selectedItems.includes('sms')}
            onClick={() => handleToggle('sms')}
          >
            SMS notifications
          </MenuItem>
          <MenuDividerComponent />
          <MenuGroupHeaderComponent>Privacy</MenuGroupHeaderComponent>
          <MenuItem
            role="menuitemcheckbox"
            selected={selectedItems.includes('analytics')}
            onClick={() => handleToggle('analytics')}
          >
            Analytics tracking
          </MenuItem>
          <MenuItem
            role="menuitemcheckbox"
            selected={selectedItems.includes('cookies')}
            onClick={() => handleToggle('cookies')}
          >
            Cookie consent
          </MenuItem>
        </Menu>
      </div>
    );
  },
};

// Menu with radio items
export const WithRadioItems: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedSort, setSelectedSort] = useState('name');
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSortChange = (value: string) => {
      setSelectedSort(value);
      handleClose();
    };

    return (
      <div>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          Sort by: {selectedSort}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuGroupHeaderComponent>Sort Options</MenuGroupHeaderComponent>
          <MenuItem
            role="menuitemradio"
            selected={selectedSort === 'name'}
            onClick={() => handleSortChange('name')}
          >
            Name
          </MenuItem>
          <MenuItem
            role="menuitemradio"
            selected={selectedSort === 'date'}
            onClick={() => handleSortChange('date')}
          >
            Date modified
          </MenuItem>
          <MenuItem
            role="menuitemradio"
            selected={selectedSort === 'size'}
            onClick={() => handleSortChange('size')}
          >
            File size
          </MenuItem>
          <MenuItem
            role="menuitemradio"
            selected={selectedSort === 'type'}
            onClick={() => handleSortChange('type')}
          >
            File type
          </MenuItem>
        </Menu>
      </div>
    );
  },
};

// Menu with secondary text
export const WithSecondaryText: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          File Actions
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleClose}
            icon={<Download />}
            secondaryText="Ctrl+S"
          >
            Download
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            icon={<Print />}
            secondaryText="Ctrl+P"
          >
            Print
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            icon={<Share />}
            secondaryText="Ctrl+Shift+S"
          >
            Share
          </MenuItem>
          <MenuDividerComponent />
          <MenuItem
            onClick={handleClose}
            icon={<Delete />}
            secondaryText="Delete"
          >
            Move to trash
          </MenuItem>
        </Menu>
      </div>
    );
  },
};

// Dense menu
export const Dense: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          Dense Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuList dense>
            <MenuItem dense onClick={handleClose} icon={<Home />}>
              Home
            </MenuItem>
            <MenuItem dense onClick={handleClose} icon={<Work />}>
              Work
            </MenuItem>
            <MenuItem dense onClick={handleClose} icon={<School />}>
              Education
            </MenuItem>
            <MenuItem dense onClick={handleClose} icon={<Favorite />}>
              Favorites
            </MenuItem>
            <MenuItem dense onClick={handleClose} icon={<Star />}>
              Starred
            </MenuItem>
            <MenuItem dense onClick={handleClose} icon={<Bookmark />}>
              Bookmarks
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    );
  },
};

// Menu with disabled items
export const WithDisabledItems: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          Actions Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} icon={<Edit />}>
            Edit
          </MenuItem>
          <MenuItem onClick={handleClose} icon={<ContentCopy />}>
            Copy
          </MenuItem>
          <MenuItem disabled icon={<Share />}>
            Share (Premium only)
          </MenuItem>
          <MenuDividerComponent />
          <MenuItem onClick={handleClose} icon={<Download />}>
            Download
          </MenuItem>
          <MenuItem disabled icon={<Print />}>
            Print (No printer)
          </MenuItem>
          <MenuDividerComponent />
          <MenuItem onClick={handleClose} icon={<Delete />}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  },
};

// Different menu placements
export const Placements: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [placement, setPlacement] = useState<string>('bottom-start');
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, newPlacement: string) => {
      setAnchorEl(event.currentTarget);
      setPlacement(newPlacement);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const placements = [
      'bottom-start', 'bottom', 'bottom-end',
      'top-start', 'top', 'top-end',
      'right-start', 'right', 'right-end',
      'left-start', 'left', 'left-end',
    ];

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', padding: '100px' }}>
        {placements.map((p) => (
          <Button
            key={p}
            variant={placement === p ? 'contained' : 'outlined'}
            size="small"
            onClick={(e) => handleClick(e, p)}
          >
            {p}
          </Button>
        ))}
        
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          placement={placement as any}
        >
          <MenuItem onClick={handleClose}>Item 1</MenuItem>
          <MenuItem onClick={handleClose}>Item 2</MenuItem>
          <MenuItem onClick={handleClose}>Item 3</MenuItem>
        </Menu>
      </div>
    );
  },
};

// IconButton menu
export const IconButtonMenu: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? 'icon-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="icon-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Share</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </div>
    );
  },
};