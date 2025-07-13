import { 
  BoxDisplay, 
  BoxPosition, 
  BoxOverflow, 
  BoxTextAlign, 
  BoxVerticalAlign,
  BoxFlexDirection,
  BoxFlexWrap,
  BoxJustifyContent,
  BoxAlignItems,
  BoxAlignContent
} from './Box.types';

/**
 * BOX_DISPLAYS component
 * 
 * @returns JSX element
 */
export const BOX_DISPLAYS: Record<BoxDisplay, BoxDisplay> = {
  block: 'block',
  inline: 'inline',
  'inline-block': 'inline-block',
  flex: 'flex',
  'inline-flex': 'inline-flex',
  grid: 'grid',
  'inline-grid': 'inline-grid',
  none: 'none',
  contents: 'contents',
} as const;

/**
 * BOX_POSITIONS component
 * 
 * @returns JSX element
 */
export const BOX_POSITIONS: Record<BoxPosition, BoxPosition> = {
  static: 'static',
  relative: 'relative',
  absolute: 'absolute',
  fixed: 'fixed',
  sticky: 'sticky',
} as const;

/**
 * BOX_OVERFLOWS component
 * 
 * @returns JSX element
 */
export const BOX_OVERFLOWS: Record<BoxOverflow, BoxOverflow> = {
  visible: 'visible',
  hidden: 'hidden',
  scroll: 'scroll',
  auto: 'auto',
} as const;

/**
 * BOX_TEXT_ALIGNS component
 * 
 * @returns JSX element
 */
export const BOX_TEXT_ALIGNS: Record<BoxTextAlign, BoxTextAlign> = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
  start: 'start',
  end: 'end',
} as const;

/**
 * BOX_VERTICAL_ALIGNS component
 * 
 * @returns JSX element
 */
export const BOX_VERTICAL_ALIGNS: Record<BoxVerticalAlign, BoxVerticalAlign> = {
  baseline: 'baseline',
  top: 'top',
  middle: 'middle',
  bottom: 'bottom',
  'text-top': 'text-top',
  'text-bottom': 'text-bottom',
} as const;

/**
 * BOX_FLEX_DIRECTIONS component
 * 
 * @returns JSX element
 */
export const BOX_FLEX_DIRECTIONS: Record<BoxFlexDirection, BoxFlexDirection> = {
  row: 'row',
  'row-reverse': 'row-reverse',
  column: 'column',
  'column-reverse': 'column-reverse',
} as const;

/**
 * BOX_FLEX_WRAPS component
 * 
 * @returns JSX element
 */
export const BOX_FLEX_WRAPS: Record<BoxFlexWrap, BoxFlexWrap> = {
  nowrap: 'nowrap',
  wrap: 'wrap',
  'wrap-reverse': 'wrap-reverse',
} as const;

/**
 * BOX_JUSTIFY_CONTENTS component
 * 
 * @returns JSX element
 */
export const BOX_JUSTIFY_CONTENTS: Record<BoxJustifyContent, BoxJustifyContent> = {
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  center: 'center',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
} as const;

/**
 * BOX_ALIGN_ITEMS component
 * 
 * @returns JSX element
 */
export const BOX_ALIGN_ITEMS: Record<BoxAlignItems, BoxAlignItems> = {
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
} as const;

/**
 * BOX_ALIGN_CONTENTS component
 * 
 * @returns JSX element
 */
export const BOX_ALIGN_CONTENTS: Record<BoxAlignContent, BoxAlignContent> = {
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  center: 'center',
  'space-between': 'space-between',
  'space-around': 'space-around',
  stretch: 'stretch',
} as const;

/**
 * BOX_BREAKPOINTS component
 * 
 * @returns JSX element
 */
export const BOX_BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

/**
 * BOX_SPACING_VALUES component
 * 
 * @returns JSX element
 */
export const BOX_SPACING_VALUES = {
  0: 0,
  0.5: 0.5,
  1: 1,
  1.5: 1.5,
  2: 2,
  2.5: 2.5,
  3: 3,
  3.5: 3.5,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  14: 14,
  16: 16,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
  36: 36,
  40: 40,
  44: 44,
  48: 48,
  52: 52,
  56: 56,
  60: 60,
  64: 64,
  72: 72,
  80: 80,
  96: 96,
} as const;

/**
 * BOX_BORDER_RADIUS component
 * 
 * @returns JSX element
 */
export const BOX_BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: '50%',
} as const;

/**
 * BOX_SHADOW_VALUES component
 * 
 * @returns JSX element
 */
export const BOX_SHADOW_VALUES = {
  none: 0,
  sm: 1,
  md: 3,
  lg: 6,
  xl: 12,
  '2xl': 24,
} as const;

/**
 * ACCESSIBILITY_CONSTANTS component
 * 
 * @returns JSX element
 */
export const ACCESSIBILITY_CONSTANTS = {
  regionRole: 'region',
  bannerRole: 'banner',
  mainRole: 'main',
  contentinfoRole: 'contentinfo',
  complementaryRole: 'complementary',
  navigationRole: 'navigation',
  articleRole: 'article',
  sectionRole: 'section',
  asideRole: 'aside',
  figureRole: 'figure',
  groupRole: 'group',
  presentationRole: 'presentation',
  noneRole: 'none',
} as const;

/**
 * COMMON_BOX_PATTERNS component
 * 
 * @returns JSX element
 */
export const COMMON_BOX_PATTERNS = {
  // Layout patterns
  container: {
    maxWidth: 'lg',
    mx: 'auto',
    px: 2,
  },
  
  section: {
    py: 8,
    px: 2,
  },
  
  card: {
    p: 3,
    border: 1,
    borderRadius: 2,
    bgcolor: 'background.paper',
    boxShadow: 2,
  },
  
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    textAlign: 'center',
    p: 6,
  },
  
  sidebar: {
    width: 250,
    height: '100vh',
    borderRight: 1,
    borderColor: 'divider',
    p: 2,
  },
  
  // Flexbox patterns
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  
  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  
  // Grid patterns
  gridCenter: {
    display: 'grid',
    placeItems: 'center',
  },
  
  gridTwoColumns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 2,
  },
  
  gridThreeColumns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 2,
  },
  
  gridResponsive: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    },
    gap: 2,
  },
  
  // Position patterns
  absoluteCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  
  fixed: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  
  sticky: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  
  // Utility patterns
  fullscreen: {
    width: '100vw',
    height: '100vh',
  },
  
  aspectRatio: {
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      display: 'block',
      paddingTop: '56.25%', // 16:9 aspect ratio
    },
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bgcolor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
} as const;

/**
 * RESPONSIVE_PATTERNS component
 * 
 * @returns JSX element
 */
export const RESPONSIVE_PATTERNS = {
  // Hide/show patterns
  hideOnMobile: {
    display: { xs: 'none', sm: 'block' },
  },
  
  hideOnDesktop: {
    display: { xs: 'block', sm: 'none' },
  },
  
  showOnMobile: {
    display: { xs: 'block', sm: 'none' },
  },
  
  showOnDesktop: {
    display: { xs: 'none', sm: 'block' },
  },
  
  // Responsive sizing
  responsiveWidth: {
    width: { xs: '100%', sm: 'auto' },
  },
  
  responsivePadding: {
    p: { xs: 2, sm: 3, md: 4, lg: 6 },
  },
  
  responsiveMargin: {
    m: { xs: 1, sm: 2, md: 3, lg: 4 },
  },
  
  // Responsive typography
  responsiveText: {
    fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem', lg: '1.5rem' },
  },
} as const;

/**
 * DEFAULT_BOX_PROPS component
 * 
 * @returns JSX element
 */
export const DEFAULT_BOX_PROPS = {
  component: 'div',
  centered: false,
  rounded: false,
  elevated: false,
  fullWidth: false,
  fullHeight: false,
  clickable: false,
} as const;