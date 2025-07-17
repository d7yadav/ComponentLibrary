import { Grid as MuiGrid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import { CSS_GRID_TEMPLATES } from './Grid.constants';
export const StyledGrid: React.ComponentType<any> = styled(MuiGrid, {
  shouldForwardProp: (prop) => !['customBgcolor', 'customMinHeight', 'customAutoFit', 'customAutoFill', 'customMinColumnWidth', 'customMaxColumnWidth', 'customColumns', 'customRows', 'customGap', 'customRowGap', 'customColumnGap', 'customTemplateAreas', 'customTemplateColumns', 'customTemplateRows', 'customUseCssGrid'].includes(prop as string),
})<any>((props: any) => {
  const {
    theme,
    customBgcolor,
    customMinHeight,
    customAutoFit,
    customAutoFill,
    customMinColumnWidth,
    customMaxColumnWidth,
    customColumns,
    customRows,
    customGap,
    customRowGap,
    customColumnGap,
    customTemplateAreas,
    customTemplateColumns,
    customTemplateRows,
    customUseCssGrid
  } = props;
  /**
   * Base styles for the grid container
   */
  const baseStyles = {
    // Background color
    ...(customBgcolor && {
      'backgroundColor': customBgcolor.includes('.')
        ? theme.palette[customBgcolor.split('.')[0] as keyof typeof theme.palette]?.main || customBgcolor
        : customBgcolor,
    }),
    // Minimum height
    ...(customMinHeight && {
      'minHeight': typeof customMinHeight === 'number' ? `${customMinHeight}px` : customMinHeight,
    }),
  };
  // CSS Grid specific styles
  if (customUseCssGrid) {
    return {
      ...baseStyles,
      'display': 'grid',
      // Grid template columns
      ...(customTemplateColumns && {
        'gridTemplateColumns': customTemplateColumns,
      }),
      // Auto-fit columns
      ...(customAutoFit && {
        'gridTemplateColumns': CSS_GRID_TEMPLATES.autoFit(customMinColumnWidth),
      }),
      // Auto-fill columns
      ...(customAutoFill && {
        'gridTemplateColumns': CSS_GRID_TEMPLATES.autoFill(customMinColumnWidth),
      }),
      // Simple column count
      ...(customColumns && {
        'gridTemplateColumns': typeof customColumns === 'number'
          ? `repeat(${customColumns}, 1fr)`
          : customColumns,
      }),
      // Grid template rows
      ...(customTemplateRows && {
        'gridTemplateRows': customTemplateRows,
      }),
      // Simple row count
      ...(customRows && {
        'gridTemplateRows': typeof customRows === 'number'
          ? `repeat(${customRows}, 1fr)`
          : customRows,
      }),
      // Grid template areas
      ...(customTemplateAreas && {
        'gridTemplateAreas': customTemplateAreas,
      }),
      // Gap properties
      ...(customGap && {
        gap: typeof customGap === 'number' ? theme.spacing(customGap) : customGap,
      }),
      ...(customRowGap && {
        rowGap: typeof customRowGap === 'number' ? theme.spacing(customRowGap) : customRowGap,
      }),
      ...(customColumnGap && {
        columnGap: typeof customColumnGap === 'number' ? theme.spacing(customColumnGap) : customColumnGap,
      }),
    };
  }
  // Default flexbox grid styles (MUI Grid behavior)
  return baseStyles;
});

// Specialized CSS Grid components - CssGrid component
export const CssGrid: React.ComponentType<any> = styled('div', {
  shouldForwardProp: (prop) => !['columns', 'rows', 'gap', 'minColumnWidth', 'autoFit', 'autoFill', 'templateAreas', 'responsive'].includes(prop as string),
})<{
  columns?: number | string,
  rows?: number | string,
  gap?: number | string,
  minColumnWidth?: number | string,
  autoFit?: boolean,
  autoFill?: boolean,
  templateAreas?: string,
  responsive?: boolean,
}>((props: any) => {
  const {
    theme,
    columns,
    rows,
    gap = 2,
    minColumnWidth = 250,
    autoFit = false,
    autoFill = false,
    templateAreas,
    responsive = false
  } = props;

  return {
    'display': 'grid',
    gap: typeof gap === 'number' ? theme.spacing(gap) : gap,
    // Auto layouts
    ...(autoFit && {
      'gridTemplateColumns': CSS_GRID_TEMPLATES.autoFit(
        typeof minColumnWidth === 'number' ? `${minColumnWidth}px` : minColumnWidth
      ),
    }),
    ...(autoFill && {
      'gridTemplateColumns': CSS_GRID_TEMPLATES.autoFill(
        typeof minColumnWidth === 'number' ? `${minColumnWidth}px` : minColumnWidth
      ),
    }),
    // Fixed columns
    ...(columns && {
      'gridTemplateColumns': typeof columns === 'number'
        ? `repeat(${columns}, 1fr)`
        : columns,
    }),
    // Fixed rows
    ...(rows && {
      'gridTemplateRows': typeof rows === 'number'
        ? `repeat(${rows}, 1fr)`
        : rows,
    }),
    // Template areas
    ...(templateAreas && {
      'gridTemplateAreas': templateAreas,
    }),
    // Responsive grid
    ...(responsive && {
      'gridTemplateColumns': CSS_GRID_TEMPLATES.responsive.xs,
      [theme.breakpoints.up('sm')]: {
        'gridTemplateColumns': CSS_GRID_TEMPLATES.responsive.sm,
      },
      [theme.breakpoints.up('md')]: {
        'gridTemplateColumns': CSS_GRID_TEMPLATES.responsive.md,
      },
      [theme.breakpoints.up('lg')]: {
        'gridTemplateColumns': CSS_GRID_TEMPLATES.responsive.lg,
      },
      [theme.breakpoints.up('xl')]: {
        'gridTemplateColumns': CSS_GRID_TEMPLATES.responsive.xl,
      },
    }),
  };
});

// Auto-layout grid for cards
export const AutoGrid: React.ComponentType<any> = styled(CssGrid)<{
  minWidth?: number | string,
  maxWidth?: number | string,
}>((props: any) => {
  const { minWidth = 280, maxWidth = '1fr' } = props;

  return {
    'gridTemplateColumns': `repeat(auto-fit, minmax(${typeof minWidth === 'number' ? `${minWidth}px` : minWidth}, ${typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth}))`,
  };
});

// Masonry-style grid
export const MasonryGrid: React.ComponentType<any> = styled('div', {
  shouldForwardProp: (prop) => !['columns', 'gap'].includes(prop as string),
})<{
  columns?: number,
  gap?: number,
}>((props: any) => {
  const { theme, columns = 3, gap = 2 } = props;

  return {
    columnCount: columns,
    columnGap: theme.spacing(gap),
    '& > *': {
      'breakInside': 'avoid',
      'marginBottom': theme.spacing(gap),
    },
    [theme.breakpoints.down('md')]: {
      columnCount: Math.max(1, columns - 1),
    },
    [theme.breakpoints.down('sm')]: {
      columnCount: Math.max(1, columns - 2),
    },
  };
});

// Holy Grail layout
export const HolyGrailGrid: React.ComponentType<any> = styled(CssGrid)((props: any) => {
  const { theme } = props;

  return {
    'gridTemplateAreas': CSS_GRID_TEMPLATES.hero,
    'gridTemplateColumns': '200px 1fr 200px',
    'gridTemplateRows': 'auto 1fr auto',
    'minHeight': '100vh',
    [theme.breakpoints.down('md')]: {
      'gridTemplateAreas': `
        "header"
        "main"
        "sidebar"
        "footer"
      `,
      'gridTemplateColumns': '1fr',
      'gridTemplateRows': 'auto 1fr auto auto',
    },
  };
});

// Responsive card grid
export const ResponsiveCardGrid: React.ComponentType<any> = styled(CssGrid)((props: any) => {
  const { theme } = props;

  return {
    'gridTemplateColumns': 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      'gridTemplateColumns': '1fr',
      gap: theme.spacing(2),
    },
    '&:hover': {
      'opacity': 0.8,
      'cursor': 'pointer',
    },
    '&:focus': {
      'outline': `2px solid ${theme.palette.primary.main}`,
      'outlineOffset': '2px',
    },
    '&:disabled': {
      'opacity': 0.5,
      'cursor': 'not-allowed',
      'pointerEvents': 'none',
    },
  };
});