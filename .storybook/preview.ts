import type { Preview } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import React from 'react';

import { lightTheme, darkTheme } from '../src/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      extractComponentDescription: (component, { notes }) => {
        if (notes) {
          return typeof notes === 'string' ? notes : notes.markdown || notes.text;
        }
        return null;
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#000000',
        },
        {
          name: 'oled-dark',
          value: '#000000',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
      // Sync backgrounds with theme state
      grid: {
        cellSize: 20,
        opacity: 0.5,
        cellAmount: 5,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
          {
            id: 'keyboard',
            enabled: true,
          },
        ],
      },
    },
    options: {
      storySort: {
        order: [
          'Documentation',
          ['Introduction', 'Getting Started', 'Theming', 'Accessibility'],
          'Core',
          ['Button', 'IconButton', 'Chip'],
          'Forms',
          ['TextField', 'Select', 'Checkbox', 'Radio', 'Switch'],
          'Data Display',
          ['Card', 'List', 'Table', 'Tooltip'],
          'Layout',
          ['Container', 'Grid', 'Stack', 'Box'],
          'Navigation',
          ['Tabs', 'Menu', 'Breadcrumbs'],
          'Feedback',
          ['Alert', 'Snackbar', 'Progress'],
          'Surfaces',
          ['Modal', 'Dialog', 'Drawer'],
          'Examples',
          '*',
        ],
      },
    },
  },
  
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? darkTheme : lightTheme;
      const isDarkTheme = context.globals.theme === 'dark';
      
      // Automatically sync background with theme
      React.useEffect(() => {
        if (typeof window !== 'undefined') {
          const iframe = window.parent?.document?.querySelector('#storybook-preview-iframe') as HTMLIFrameElement;
          if (iframe) {
            const backgroundColor = isDarkTheme ? '#000000' : '#ffffff';
            iframe.style.backgroundColor = backgroundColor;
          }
        }
      }, [isDarkTheme]);
      
      return React.createElement(
        ThemeProvider,
        { theme },
        React.createElement(CssBaseline),
        React.createElement(
          'div',
          {
            style: {
              backgroundColor: isDarkTheme ? '#000000' : '#ffffff',
              minHeight: '100vh',
              transition: 'background-color 0.3s ease',
            }
          },
          React.createElement(Story)
        )
      );
    },
  ],

  tags: ['autodocs'],
};

export default preview;