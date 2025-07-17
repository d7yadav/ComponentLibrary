// @author dilip.yadav@shorelineiot.com

import { Stack as MuiStack, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';
import { STACK_BORDER_RADIUS } from './Stack.constants';

/**
 * Utility to safely extract .main from palette values by key.
 */
function getPaletteMainFromTheme(theme: Theme | undefined, key: string): string | undefined {
  if (!theme) return undefined;
  const paletteValue = ((theme.palette as unknown) as Record<string, unknown>)[key];
  if (paletteValue && typeof paletteValue === 'object' && 'main' in paletteValue && typeof (paletteValue as { main?: unknown }).main === 'string') {
    return (paletteValue as { main: string }).main;
  }
  return undefined;
}

/**
 * Props for the StyledStack component.
 */
export interface StyledStackProps {
  theme?: Theme;
  customFullWidth?: boolean;
  customFullHeight?: boolean;
  customMinHeight?: number | string;
  customMaxHeight?: number | string;
  customMinWidth?: number | string;
  customMaxWidth?: number | string;
  customBgcolor?: string;
  customPadding?: number | string;
  customMargin?: number | string;
  customRounded?: boolean;
  customBorderRadius?: number | string;
  customBordered?: boolean;
  customBorderColor?: string;
  customBorderWidth?: number | string;
  customElevation?: number;
  customStretch?: boolean;
  customCentered?: boolean;
  customEqualWidth?: boolean;
  customEqualHeight?: boolean;
  customGap?: number | string;
  customRowGap?: number | string;
  customColumnGap?: number | string;
  children?: ReactNode;
}

/**
 * Strongly-typed styled Stack component with custom layout props.
 */
export const StyledStack = styled(MuiStack, {
  shouldForwardProp: (prop) => ![
    'customFullWidth', 'customFullHeight', 'customMinHeight', 'customMaxHeight',
    'customMinWidth', 'customMaxWidth', 'customBgcolor', 'customPadding', 'customMargin',
    'customRounded', 'customBorderRadius', 'customBordered', 'customBorderColor',
    'customBorderWidth', 'customElevation', 'customStretch', 'customCentered',
    'customEqualWidth', 'customEqualHeight', 'customGap', 'customRowGap', 'customColumnGap'
  ].includes(prop as string),
})<StyledStackProps>((props) => {
  const {
    theme,
    customFullWidth,
    customFullHeight,
    customMinHeight,
    customMaxHeight,
    customMinWidth,
    customMaxWidth,
    customBgcolor,
    customPadding,
    customMargin,
    customRounded,
    customBorderRadius,
    customBordered,
    customBorderColor,
    customBorderWidth,
    customElevation,
    customStretch,
    customCentered,
    customEqualWidth,
    customEqualHeight,
    customGap,
    customRowGap,
    customColumnGap
  } = props;

  return {
    // Size constraints
    ...(customFullWidth && { width: '100%' }),
    ...(customFullHeight && { height: '100%' }),
    ...(customMinHeight && { minHeight: typeof customMinHeight === 'number' ? `${customMinHeight}px` : customMinHeight }),
    ...(customMaxHeight && { maxHeight: typeof customMaxHeight === 'number' ? `${customMaxHeight}px` : customMaxHeight }),
    ...(customMinWidth && { minWidth: typeof customMinWidth === 'number' ? `${customMinWidth}px` : customMinWidth }),
    ...(customMaxWidth && { maxWidth: typeof customMaxWidth === 'number' ? `${customMaxWidth}px` : customMaxWidth }),
    // Background color
    ...(customBgcolor && (() => {
      if (typeof customBgcolor === 'string' && customBgcolor.includes('.')) {
        const key = customBgcolor.split('.')[0];
        if (typeof key === 'string') {
          return { backgroundColor: getPaletteMainFromTheme(theme, key) || customBgcolor };
        }
      }
      return { backgroundColor: customBgcolor };
    })()),
    // Padding
    ...(customPadding && { padding: typeof customPadding === 'number' ? theme?.spacing(customPadding) : customPadding }),
    // Margin
    ...(customMargin && { margin: typeof customMargin === 'number' ? theme?.spacing(customMargin) : customMargin }),
    // Border radius
    ...(customRounded && {
      borderRadius: customBorderRadius
        ? (typeof customBorderRadius === 'number' ? customBorderRadius : customBorderRadius)
        : STACK_BORDER_RADIUS.md,
    }),
    // Border
    ...(customBordered && (() => {
      if (typeof customBorderColor === 'string' && customBorderColor.includes('.')) {
        const key = customBorderColor.split('.')[0];
        if (typeof key === 'string') {
          return { border: `${customBorderWidth || 1}px solid ${getPaletteMainFromTheme(theme, key) || customBorderColor}` };
        }
      }
      return { border: `${customBorderWidth || 1}px solid ${customBorderColor || (theme?.palette.divider as string)}` };
    })()),
    // Elevation
    ...(customElevation && { boxShadow: theme?.shadows[Math.min(customElevation, 24)] }),
    // Stretch children
    ...(customStretch && { '& > *': { flexGrow: 1 } }),
    // Center content
    ...(customCentered && { alignItems: 'center', justifyContent: 'center' }),
    // Equal width children
    ...(customEqualWidth && { '& > *': { flex: '1 1 0px', minWidth: 0 } }),
    // Equal height children
    ...(customEqualHeight && { '& > *': { flex: '1 1 0px', minHeight: 0 } }),
    // Gap properties
    ...(customGap && { gap: typeof customGap === 'number' ? theme?.spacing(customGap) : customGap }),
    ...(customRowGap && { rowGap: typeof customRowGap === 'number' ? theme?.spacing(customRowGap) : customRowGap }),
    ...(customColumnGap && { columnGap: typeof customColumnGap === 'number' ? theme?.spacing(customColumnGap) : customColumnGap }),
  };
});

/**
 * Props for the StackDivider component.
 */
export interface StackDividerProps {
  theme?: Theme;
  customThickness?: number | string;
  customLength?: number | string;
  customVariant?: 'solid' | 'dashed' | 'dotted';
  customColor?: string;
}

/**
 * Strongly-typed styled Divider for use in Stack layouts.
 */
export const StackDivider = styled(Divider, {
  shouldForwardProp: (prop) => !['customThickness', 'customLength', 'customVariant', 'customColor'].includes(prop as string),
})<StackDividerProps>((props) => {
  const { theme, customThickness, customLength, customVariant = 'solid', customColor } = props;
  return {
    ...(customThickness && { borderWidth: typeof customThickness === 'number' ? `${customThickness}px` : customThickness }),
    ...(customLength && { width: typeof customLength === 'number' ? `${customLength}px` : customLength }),
    borderStyle: customVariant,
    ...(customColor && (() => {
      if (typeof customColor === 'string' && customColor.includes('.')) {
        const key = customColor.split('.')[0];
        if (typeof key === 'string') {
          return { borderColor: getPaletteMainFromTheme(theme, key) || customColor };
        }
      }
      return { borderColor: customColor };
    })()),
  };
});

/**
 * Specialized horizontal stack (row direction).
 */
export const HStack = styled(StyledStack)<StyledStackProps>(() => ({
  flexDirection: 'row',
}));

/**
 * Specialized vertical stack (column direction).
 */
export const VStack = styled(StyledStack)<StyledStackProps>(() => ({
  flexDirection: 'column',
}));

/**
 * Centered stack (both axes).
 */
export const CenterStack = styled(StyledStack)<StyledStackProps>(() => ({
  alignItems: 'center',
  justifyContent: 'center',
}));

/**
 * Space-between stack (row direction).
 */
export const SpaceBetweenStack = styled(StyledStack)<StyledStackProps>(() => ({
  justifyContent: 'space-between',
}));

/**
 * Card-style stack with padding, border radius, and shadow.
 */
export const CardStack = styled(StyledStack)<StyledStackProps>(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: STACK_BORDER_RADIUS.md,
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
}));

/**
 * Navbar-style stack for horizontal navigation bars.
 */
export const NavbarStack = styled(HStack)<StyledStackProps>(({ theme }) => ({
  padding: theme.spacing(1, 2),
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: 64,
}));

/**
 * Sidebar-style stack for vertical navigation.
 */
export const SidebarStack = styled(VStack)<StyledStackProps>(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  minHeight: '100vh',
  width: 250,
}));

/**
 * Hero section stack for prominent page sections.
 */
export const HeroStack = styled(CenterStack)<StyledStackProps>(({ theme }) => ({
  minHeight: '50vh',
  padding: theme.spacing(6),
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    minHeight: '40vh',
    padding: theme.spacing(4),
  },
}));

/**
 * Form layout stack with vertical gap.
 */
export const FormStack = styled(VStack)<StyledStackProps>(({ theme }) => ({
  gap: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
}));

/**
 * Button group stack with horizontal gap.
 */
export const ButtonGroupStack = styled(HStack)<StyledStackProps>(({ theme }) => ({
  gap: theme.spacing(1),
  '& > button:not(:last-child)': {
    marginRight: 0,
  },
}));

/**
 * List stack with dividers between children.
 */
export const ListStack = styled(VStack)<StyledStackProps>(() => ({
  gap: 0,
  '& > *:not(:last-child)': {
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
  },
}));

/**
 * Responsive stack with direction and gap changing by breakpoint.
 */
export const ResponsiveStack = styled(StyledStack)<StyledStackProps>(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(4),
  },
  '&:hover': {
    opacity: 0.8,
    cursor: 'pointer',
  },
  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
}));