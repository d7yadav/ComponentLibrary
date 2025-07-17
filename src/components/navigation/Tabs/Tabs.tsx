/**
 * @fileoverview Tabs Component Implementation
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * A comprehensive tabs component with full accessibility support,
 * keyboard navigation, responsive behavior, and Material-UI integration.
 */

import {
  Tab as MuiTab,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import { memo, useState, useCallback, useMemo, type KeyboardEvent } from 'react';

import {
  TABS_DEFAULTS,
  TABS_ACCESSIBILITY,
  TABS_ANIMATIONS,
  TABS_KEYBOARD,
  TABS_ERRORS,
} from './Tabs.constants';
import {
  TabsContainer,
  StyledTabs,
  StyledTabPanel,
  TabsLoadingOverlay,
} from './Tabs.styles';
import type { TabsProps, TabPanelProps, TabData } from './Tabs.types';


/**
 * TabPanel component for content display
 */
const TabPanel = memo<TabPanelProps>(({
  children,
  value,
  index,
  sx,
  id,
  'aria-labelledby': ariaLabelledBy,
  ...props
}) => {
  const isHidden = value !== index;
  
  return (
    <StyledTabPanel
      role={TABS_ACCESSIBILITY.tabpanelRole}
      hidden={isHidden}
      id={id || `tabpanel-${index}`}
      aria-labelledby={ariaLabelledBy || `tab-${index}`}
      sx={sx}
      {...props}
    >
      {!isHidden && children}
    </StyledTabPanel>
  );
});

TabPanel.displayName = 'TabPanel';

/**
 * Main Tabs component
 */
const Tabs = memo<TabsProps>(({
  tabs,
  value: controlledValue,
  defaultValue,
  onChange,
  orientation = TABS_DEFAULTS.orientation,
  variant = TABS_DEFAULTS.variant,
  indicatorColor = TABS_DEFAULTS.indicatorColor,
  textColor = TABS_DEFAULTS.textColor,
  centered = TABS_DEFAULTS.centered,
  scrollButtons = TABS_DEFAULTS.scrollButtons,
  allowScrollButtonsMobile = TABS_DEFAULTS.allowScrollButtonsMobile,
  className,
  sx,
  showPanels = TABS_DEFAULTS.showPanels,
  panelSx,
  disabled = TABS_DEFAULTS.disabled,
  loading = TABS_DEFAULTS.loading,
  loadingIndicator,
  'aria-label': ariaLabel,
  id,
  'data-testid': dataTestId = 'tabs',
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? tabs[0]?.value ?? tabs[0]?.id ?? 0
  );
  
  // Use controlled or uncontrolled value
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  
  // Validate tabs prop
  if (!tabs || tabs.length === 0) {
    throw new Error(TABS_ERRORS.emptyTabs);
  }
  
  /**
   * Handle tab change with validation
   */
  const handleChange = useCallback((event: any, newValue: any) => {
    if (disabled || loading) return;
    
    // Update internal state for uncontrolled usage
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    // Call external onChange handler
    onChange?.(event, newValue);
  }, [controlledValue, disabled, loading, onChange]);
  
  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (disabled || loading) return;
    
    const { key } = event;
    const currentIndex = tabs.findIndex(tab => (tab.value ?? tab.id) === currentValue);
    let nextIndex = currentIndex;
    
    switch (key) {
      case TABS_KEYBOARD.arrowLeft:
      case TABS_KEYBOARD.arrowUp:
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case TABS_KEYBOARD.arrowRight:
      case TABS_KEYBOARD.arrowDown:
        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case TABS_KEYBOARD.home:
        nextIndex = 0;
        break;
      case TABS_KEYBOARD.end:
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    
    event.preventDefault();
    
    // Skip disabled tabs
    while (tabs[nextIndex]?.disabled && nextIndex !== currentIndex) {
      if (key === TABS_KEYBOARD.arrowLeft || key === TABS_KEYBOARD.arrowUp) {
        nextIndex = nextIndex > 0 ? nextIndex - 1 : tabs.length - 1;
      } else {
        nextIndex = nextIndex < tabs.length - 1 ? nextIndex + 1 : 0;
      }
    }
    
    const nextValue = tabs[nextIndex]?.value ?? tabs[nextIndex]?.id ?? nextIndex;
    handleChange(event, nextValue);
  }, [currentValue, disabled, handleChange, loading, tabs]);
  
  /**
   * Render individual tab
   */
  const renderTab = useCallback((tab: TabData, index: number) => {
    const tabValue = tab.value ?? tab.id ?? index;
    const tabId = `tab-${tabValue}`;
    const panelId = `tabpanel-${tabValue}`;
    
    return (
      <MuiTab
        key={tabValue}
        id={tabId}
        label={tab.label}
        value={tabValue}
        disabled={tab.disabled || disabled}
        icon={tab.icon as React.ReactElement | undefined}
        aria-controls={panelId}
        aria-label={tab['aria-label']}
        data-testid={`${dataTestId}-tab-${index}`}
      />
    );
  }, [disabled, dataTestId]);
  
  /**
   * Render tab panels
   */
  const renderPanels = useMemo(() => {
    if (!showPanels) return null;
    
    return tabs.map((tab, index) => {
      const tabValue = tab.value ?? tab.id ?? index;
      const tabId = `tab-${tabValue}`;
      const panelId = `tabpanel-${tabValue}`;
      
      return (
        <TabPanel
          key={panelId}
          value={currentValue}
          index={tabValue}
          id={panelId}
          aria-labelledby={tabId}
          sx={panelSx}
        >
          {tab.content}
        </TabPanel>
      );
    });
  }, [showPanels, tabs, currentValue, panelSx]);
  
  /**
   * Render loading indicator
   */
  const renderLoadingIndicator = () => {
    if (loadingIndicator) {
      return loadingIndicator;
    }
    
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={2}
        data-testid={`${dataTestId}-loading`}
      >
        <CircularProgress size={24} aria-label="Loading tabs" />
      </Box>
    );
  };
  
  return (
    <TabsContainer data-testid={dataTestId}>
      <StyledTabs
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        orientation={orientation}
        variant={variant}
        indicatorColor={indicatorColor}
        textColor={textColor}
        centered={centered && !isMobile}
        scrollButtons={allowScrollButtonsMobile ? (scrollButtons === 'auto' ? 'auto' : scrollButtons === 'on') : (isMobile ? false : (scrollButtons === 'auto' ? 'auto' : scrollButtons === 'on'))}
        allowScrollButtonsMobile={allowScrollButtonsMobile}
        className={className}
        sx={sx}
        aria-label={ariaLabel || TABS_ACCESSIBILITY.defaultAriaLabel}
        id={id}
        {...props}
      >
        {tabs.map(renderTab)}
      </StyledTabs>
      
      {loading && renderLoadingIndicator()}
      {renderPanels}
    </TabsContainer>
  );
});

Tabs.displayName = 'Tabs';

export { Tabs, TabPanel };