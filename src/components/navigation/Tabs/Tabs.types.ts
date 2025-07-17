
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode, SyntheticEvent } from 'react';

export type TabsOrientation = 'horizontal' | 'vertical';

export type TabsVariant = 'standard' | 'scrollable' | 'fullWidth';

export type TabsIndicatorColor = 'primary' | 'secondary';

export type TabsScrollButtons = 'auto' | 'desktop' | 'on' | 'off';

export type TabChangeHandler = (event: SyntheticEvent, newValue: string | number) => void;

export interface TabData {
  /** Unique identifier for the tab */
  id: string;
  /** Display label for the tab */
  label: ReactNode;
  /** Tab content panel */
  content?: ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Icon to display before the label */
  icon?: ReactNode;
  /** Custom value for the tab */
  value?: string | number;
  /** Accessibility label */
  'aria-label'?: string;
}

export interface TabPanelProps {
  /** Panel content */
  children?: ReactNode;
  /** Current active tab value */
  value: string | number;
  /** This panel's tab value */
  index: string | number;
  /** Custom styling */
  sx?: SxProps<Theme>;
  /** Accessibility ID */
  id?: string;
  /** Associated tab element ID */
  'aria-labelledby'?: string;
}

export interface TabsProps {
  /** Array of tab data */
  tabs: TabData[];
  /** Currently active tab value */
  value?: string | number;
  /** Default active tab value for uncontrolled usage */
  defaultValue?: string | number;
  /** Tab change event handler */
  onChange?: TabChangeHandler;
  /** Tab orientation */
  orientation?: TabsOrientation;
  /** Tab variant behavior */
  variant?: TabsVariant;
  /** Indicator color */
  indicatorColor?: TabsIndicatorColor;
  /** Text color */
  textColor?: 'inherit' | 'primary' | 'secondary';
  /** Whether tabs are centered */
  centered?: boolean;
  /** Scroll button visibility */
  scrollButtons?: TabsScrollButtons;
  /** Allow scrolling past tab boundaries */
  allowScrollButtonsMobile?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styling */
  sx?: SxProps<Theme>;
  /** Whether to show content panels */
  showPanels?: boolean;
  /** Custom tab panel container styling */
  panelSx?: SxProps<Theme>;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Custom loading indicator */
  loadingIndicator?: ReactNode;
  /** Accessibility label for the tabs container */
  'aria-label'?: string;
  /** ID for the tabs container */
  id?: string;
  /** Test ID for automated testing */
  'data-testid'?: string;
}

export interface TabsTheme {
  tabs: {
    root: object;
    indicator: object;
    tab: object;
    panel: object;
    loading: object;
  };
}

export interface TabsDefaultProps {
  orientation: TabsOrientation;
  variant: TabsVariant;
  indicatorColor: TabsIndicatorColor;
  textColor: 'primary';
  centered: false;
  scrollButtons: TabsScrollButtons;
  allowScrollButtonsMobile: false;
  showPanels: true;
  disabled: false;
  loading: false;
}

// Note: Types are exported inline above