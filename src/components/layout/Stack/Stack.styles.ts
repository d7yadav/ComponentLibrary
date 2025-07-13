import { styled } from '@mui/material/styles';
import { Stack as MuiStack, Divider } from '@mui/material';
import { STACK_BORDER_RADIUS, DIVIDER_CONFIGS } from './Stack.constants';

/**
 * StyledStack component
 * 
 * @returns JSX element
 */
export const StyledStack = styled(MuiStack, {
  shouldForwardProp: (prop) => !['customFullWidth', 'customFullHeight', 'customMinHeight', 'customMaxHeight', 'customMinWidth', 'customMaxWidth', 'customBgcolor', 'customPadding', 'customMargin', 'customRounded', 'customBorderRadius', 'customBordered', 'customBorderColor', 'customBorderWidth', 'customElevation', 'customStretch', 'customCentered', 'customEqualWidth', 'customEqualHeight', 'customGap', 'customRowGap', 'customColumnGap'].includes(prop as string),
})<any>((props: any) => {
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
    ...(customFullWidth && {
      width: '100%',
    }),
    
    ...(customFullHeight && {
      height: '100%',
    }),
    
    ...(customMinHeight && {
      minHeight: typeof customMinHeight === 'number' ? `${customMinHeight}px` : customMinHeight,
    }),
    
    ...(customMaxHeight && {
      maxHeight: typeof customMaxHeight === 'number' ? `${customMaxHeight}px` : customMaxHeight,
    }),
    
    ...(customMinWidth && {
      minWidth: typeof customMinWidth === 'number' ? `${customMinWidth}px` : customMinWidth,
    }),
    
    ...(customMaxWidth && {
      maxWidth: typeof customMaxWidth === 'number' ? `${customMaxWidth}px` : customMaxWidth,
    }),
    
    // Background color
    ...(customBgcolor && {
      backgroundColor: customBgcolor.includes('.') 
        ? theme.palette[customBgcolor.split('.')[0] as keyof typeof theme.palette]?.main || customBgcolor
        : customBgcolor,
    }),
    
    // Padding
    ...(customPadding && {
      padding: typeof customPadding === 'number' ? theme.spacing(customPadding) : customPadding,
    }),
    
    // Margin
    ...(customMargin && {
      margin: typeof customMargin === 'number' ? theme.spacing(customMargin) : customMargin,
    }),
    
    // Border radius
    ...(customRounded && {
      borderRadius: customBorderRadius 
        ? (typeof customBorderRadius === 'number' ? customBorderRadius : customBorderRadius)
        : STACK_BORDER_RADIUS.md,
    }),
    
    // Border
    ...(customBordered && {
      border: `${customBorderWidth || 1}px solid ${
        customBorderColor?.includes('.') 
          ? theme.palette[customBorderColor.split('.')[0] as keyof typeof theme.palette]?.main || customBorderColor
          : customBorderColor || theme.palette.divider
      }`,
    }),
    
    // Elevation
    ...(customElevation > 0 && {
      boxShadow: theme.shadows[Math.min(customElevation, 24)],
    }),
    
    // Stretch children
    ...(customStretch && {
      '& > *': {
        flexGrow: 1,
      },
    }),
    
    // Center content
    ...(customCentered && {
      alignItems: 'center',
      justifyContent: 'center',
    }),
    
    // Equal width children
    ...(customEqualWidth && {
      '& > *': {
        flex: '1 1 0px',
        minWidth: 0,
      },
    }),
    
    // Equal height children
    ...(customEqualHeight && {
      '& > *': {
        flex: '1 1 0px',
        minHeight: 0,
      },
    }),
    
    // Gap properties (alternative to spacing)
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
});

// Stack divider component
/**
 * StackDivider component
 * 
 * @returns JSX element
 */
export const StackDivider = styled(Divider, {
  shouldForwardProp: (prop) => !['customThickness', 'customLength', 'customVariant', 'customColor'].includes(prop as string),
})<{
  customThickness?: number | string;
  customLength?: number | string;
  customVariant?: 'solid' | 'dashed' | 'dotted';
  customColor?: string;
}>((props: any) => {
  const { theme, customThickness, customLength, customVariant = 'solid', customColor } = props;
  
  return {
    ...(customThickness && {
      borderWidth: typeof customThickness === 'number' ? `${customThickness}px` : customThickness,
    }),
    
    ...(customLength && {
      width: typeof customLength === 'number' ? `${customLength}px` : customLength,
    }),
    
    borderStyle: customVariant,
    
    ...(customColor && {
      borderColor: customColor.includes('.') 
        ? theme.palette[customColor.split('.')[0] as keyof typeof theme.palette]?.main || customColor
        : customColor,
    }),
  };
});

// Specialized stack components
/**
 * HStack component
 * 
 * @returns JSX element
 */
export const HStack = styled(StyledStack)<any>(() => ({
  flexDirection: 'row',
}));

/**
 * VStack component
 * 
 * @returns JSX element
 */
export const VStack = styled(StyledStack)<any>(() => ({
  flexDirection: 'column',
}));

/**
 * CenterStack component
 * 
 * @returns JSX element
 */
export const CenterStack = styled(StyledStack)<any>(() => ({
  alignItems: 'center',
  justifyContent: 'center',
}));

/**
 * SpaceBetweenStack component
 * 
 * @returns JSX element
 */
export const SpaceBetweenStack = styled(StyledStack)<any>(() => ({
  justifyContent: 'space-between',
}));

/**
 * CardStack component
 * 
 * @returns JSX element
 */
export const CardStack = styled(StyledStack)<any>((props: any) => {
  const { theme } = props;
  return {
    padding: theme.spacing(3),
    borderRadius: STACK_BORDER_RADIUS.md,
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.background.paper,
  };
});

/**
 * NavbarStack component
 * 
 * @returns JSX element
 */
export const NavbarStack = styled(HStack)<any>((props: any) => {
  const { theme } = props;
  return {
    padding: theme.spacing(1, 2),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    minHeight: 64,
  };
});

/**
 * SidebarStack component
 * 
 * @returns JSX element
 */
export const SidebarStack = styled(VStack)<any>((props: any) => {
  const { theme } = props;
  return {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    minHeight: '100vh',
    width: 250,
  };
});

/**
 * HeroStack component
 * 
 * @returns JSX element
 */
export const HeroStack = styled(CenterStack)<any>((props: any) => {
  const { theme } = props;
  return {
    minHeight: '50vh',
    padding: theme.spacing(6),
    textAlign: 'center',
    
    [theme.breakpoints.down('md')]: {
      minHeight: '40vh',
      padding: theme.spacing(4),
    },
  };
});

/**
 * FormStack component
 * 
 * @returns JSX element
 */
export const FormStack = styled(VStack)<any>((props: any) => {
  const { theme } = props;
  return {
    gap: theme.spacing(2),
    width: '100%',
    maxWidth: 400,
  };
});

/**
 * ButtonGroupStack component
 * 
 * @returns JSX element
 */
export const ButtonGroupStack = styled(HStack)<any>((props: any) => {
  const { theme } = props;
  return {
    gap: theme.spacing(1),
    
    '& > button:not(:last-child)': {
      marginRight: 0,
    },
  };
});

/**
 * ListStack component
 * 
 * @returns JSX element
 */
export const ListStack = styled(VStack)<any>(() => ({
  gap: 0,
  
  '& > *:not(:last-child)': {
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
  },
}));

/**
 * ResponsiveStack component
 * 
 * @returns JSX element
 */
export const ResponsiveStack = styled(StyledStack)<any>((props: any) => {
  const { theme } = props;
  return {
    flexDirection: 'column',
    gap: theme.spacing(2),
    
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      gap: theme.spacing(3),
    },
    
    [theme.breakpoints.up('md')]: {
      gap: theme.spacing(4),
    },
  };
});