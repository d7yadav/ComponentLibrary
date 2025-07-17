import type { GridSize, GridDirection, GridWrap, GridJustify, GridAlign, GridSpacing } from './Grid.types';

export const GRID_SIZES: Record<string, GridSize> = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  auto: 'auto',
  true: true,
} as const;

export const GRID_DIRECTIONS: Record<GridDirection, GridDirection> = {
  row: 'row',
  'row-reverse': 'row-reverse',
  column: 'column',
  'column-reverse': 'column-reverse',
} as const;

export const GRID_WRAPS: Record<GridWrap, GridWrap> = {
  nowrap: 'nowrap',
  wrap: 'wrap',
  'wrap-reverse': 'wrap-reverse',
} as const;

export const GRID_JUSTIFY_CONTENT: Record<GridJustify, GridJustify> = {
  'flex-start': 'flex-start',
  center: 'center',
  'flex-end': 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
} as const;

export const GRID_ALIGN_ITEMS: Record<GridAlign, GridAlign> = {
  'flex-start': 'flex-start',
  center: 'center',
  'flex-end': 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
} as const;

export const GRID_SPACING_VALUES: Record<GridSpacing, GridSpacing> = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
} as const;

export const GRID_BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

export const GRID_COLUMN_COUNT = 12;

export const GRID_GUTTER_WIDTH = 24; // Default gutter width in pixels

export const AUTO_LAYOUT_CONFIGS = {
  cards: {
    minWidth: 280,
    maxWidth: 320,
    fit: true,
    fill: false,
  },
  tiles: {
    minWidth: 200,
    maxWidth: 250,
    fit: true,
    fill: false,
  },
  thumbnails: {
    minWidth: 120,
    maxWidth: 150,
    fit: true,
    fill: false,
  },
  responsive: {
    minWidth: 300,
    maxWidth: '1fr',
    fit: false,
    fill: true,
  },
} as const;

export const CSS_GRID_TEMPLATES = {
  // Common layout patterns
  twoColumn: 'repeat(2, 1fr)',
  threeColumn: 'repeat(3, 1fr)',
  fourColumn: 'repeat(4, 1fr)',
  autoFit: (minWidth: number | string) => `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
  autoFill: (minWidth: number | string) => `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
  
  // Responsive patterns
  responsive: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
    xl: 'repeat(6, 1fr)',
  },
  
  // Layout areas
  sidebar: `
    "header header"
    "sidebar main"
    "footer footer"
  `,
  hero: `
    "hero hero hero"
    "content content sidebar"
    "footer footer footer"
  `,
} as const;

export const ACCESSIBILITY_CONSTANTS = {
  containerRole: 'grid',
  itemRole: 'gridcell',
  listRole: 'list',
  listItemRole: 'listitem',
  regionRole: 'region',
  defaultLabel: 'Grid layout',
} as const;

export const RESPONSIVE_GRID_PATTERNS = {
  // Mobile-first responsive patterns
  mobileFirst: {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  },
  
  // Desktop-first responsive patterns
  desktopFirst: {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 4,
    xl: 3,
  },
  
  // Equal columns
  equal: {
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6,
  },
  
  // Main content with sidebar
  mainSidebar: {
    main: {
      xs: 12,
      sm: 12,
      md: 8,
      lg: 9,
      xl: 9,
    },
    sidebar: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 3,
      xl: 3,
    },
  },
} as const;

export const DEFAULT_GRID_PROPS = {
  container: false,
  item: false,
  spacing: GRID_SPACING_VALUES[0],
  direction: GRID_DIRECTIONS.row,
  wrap: GRID_WRAPS.wrap,
  justifyContent: GRID_JUSTIFY_CONTENT['flex-start'],
  alignItems: GRID_ALIGN_ITEMS.stretch,
  autoFit: false,
  autoFill: false,
  useCssGrid: false,
} as const;