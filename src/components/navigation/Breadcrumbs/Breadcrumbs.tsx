/**
 * @fileoverview Breadcrumbs Component Implementation
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 * 
 * A comprehensive breadcrumbs component with full accessibility support,
 * keyboard navigation, collapse functionality, and Material-UI integration.
 */

import { memo, useState, useCallback, useMemo, type KeyboardEvent } from 'react';
import { MoreHoriz, NavigateNext, NavigateBefore, FiberManualRecord } from '@mui/icons-material';

import type { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs.types';
import {
  BREADCRUMBS_DEFAULTS,
  BREADCRUMBS_ACCESSIBILITY,
  BREADCRUMBS_KEYBOARD,
  SEPARATOR_CONFIGS,
} from './Breadcrumbs.constants';
import {
  BreadcrumbsContainer,
  BreadcrumbItem as StyledBreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  CollapseIndicator,
  BreadcrumbIcon,
  BreadcrumbText,
  ExpandedItemsContainer,
} from './Breadcrumbs.styles';

/**
 * Main Breadcrumbs component
 */
const Breadcrumbs = memo<BreadcrumbsProps>(({
  items,
  separator = BREADCRUMBS_DEFAULTS.separator,
  maxItems = BREADCRUMBS_DEFAULTS.maxItems,
  itemsAfterCollapse = BREADCRUMBS_DEFAULTS.itemsAfterCollapse,
  itemsBeforeCollapse = BREADCRUMBS_DEFAULTS.itemsBeforeCollapse,
  size = BREADCRUMBS_DEFAULTS.size,
  variant = BREADCRUMBS_DEFAULTS.variant,
  expandOnClick = BREADCRUMBS_DEFAULTS.expandOnClick,
  className,
  sx,
  disabled = BREADCRUMBS_DEFAULTS.disabled,
  'aria-label': ariaLabel,
  id,
  'data-testid': dataTestId = 'breadcrumbs',
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(!expandOnClick);

  /**
   * Handle expand/collapse toggle
   */
  const handleExpandToggle = useCallback(() => {
    if (expandOnClick) {
      setIsExpanded(!isExpanded);
    }
  }, [expandOnClick, isExpanded]);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (BREADCRUMBS_KEYBOARD.clickKeys.includes(event.key)) {
      event.preventDefault();
      handleExpandToggle();
    }
  }, [handleExpandToggle]);

  /**
   * Handle breadcrumb item click
   */
  const handleItemClick = useCallback((item: BreadcrumbItem) => (event: any) => {
    if (disabled || item.disabled || item.current) {
      event.preventDefault();
      return;
    }
    
    if (item.onClick) {
      item.onClick(event, item.id);
    }
  }, [disabled]);

  /**
   * Determine if items should be collapsed
   */
  const shouldCollapse = useMemo(() => {
    return items.length > maxItems && expandOnClick;
  }, [items.length, maxItems, expandOnClick]);

  /**
   * Get visible items based on collapse state
   */
  const visibleItems = useMemo(() => {
    if (!shouldCollapse || isExpanded) {
      return items;
    }

    const totalVisible = itemsBeforeCollapse + itemsAfterCollapse;
    if (items.length <= totalVisible) {
      return items;
    }

    const beforeItems = items.slice(0, itemsBeforeCollapse);
    const afterItems = items.slice(-itemsAfterCollapse);
    
    return {
      before: beforeItems,
      after: afterItems,
      hasCollapsed: true,
    };
  }, [items, shouldCollapse, isExpanded, itemsBeforeCollapse, itemsAfterCollapse]);

  /**
   * Get separator content
   */
  const getSeparatorContent = useCallback(() => {
    if (typeof separator === 'string' && separator in SEPARATOR_CONFIGS) {
      const config = SEPARATOR_CONFIGS[separator as keyof typeof SEPARATOR_CONFIGS];
      
      switch (separator) {
        case 'chevron':
          return <NavigateNext fontSize="small" />;
        case 'arrow':
          return <NavigateBefore style={{ transform: 'scaleX(-1)' }} fontSize="small" />;
        case 'dot':
          return <FiberManualRecord fontSize="small" />;
        case 'slash':
        default:
          return config.content;
      }
    }
    
    return separator;
  }, [separator]);

  /**
   * Render separator element
   */
  const renderSeparator = useCallback((index: number) => (
    <BreadcrumbSeparator
      key={`separator-${index}`}
      size={size}
      aria-hidden={BREADCRUMBS_ACCESSIBILITY.ariaHidden}
      data-testid={`${dataTestId}-separator-${index}`}
    >
      {getSeparatorContent()}
    </BreadcrumbSeparator>
  ), [size, getSeparatorContent, dataTestId]);

  /**
   * Render individual breadcrumb item
   */
  const renderBreadcrumbItem = useCallback((item: BreadcrumbItem, index: number, isLast: boolean) => {
    const itemContent = (
      <>
        {item.icon && (
          <BreadcrumbIcon size={size} data-testid={`${dataTestId}-icon-${index}`}>
            {item.icon}
          </BreadcrumbIcon>
        )}
        <BreadcrumbText size={size} truncate>
          {item.label}
        </BreadcrumbText>
      </>
    );

    const commonProps = {
      'data-testid': `${dataTestId}-item-${index}`,
      'aria-label': item['aria-label'],
      ...(item.current && { 'aria-current': BREADCRUMBS_ACCESSIBILITY.ariaCurrent }),
    };

    return (
      <StyledBreadcrumbItem
        key={item.id}
        size={size}
        current={item.current}
        disabled={disabled || item.disabled}
        role={BREADCRUMBS_ACCESSIBILITY.listItemRole}
        {...commonProps}
      >
        {item.href && !item.current && !item.disabled ? (
          <BreadcrumbLink
            href={item.href}
            size={size}
            variant={variant}
            onClick={handleItemClick(item)}
            tabIndex={disabled ? -1 : 0}
          >
            {itemContent}
          </BreadcrumbLink>
        ) : item.onClick && !item.current && !item.disabled ? (
          <BreadcrumbLink
            component="button"
            size={size}
            variant={variant}
            onClick={handleItemClick(item)}
            tabIndex={disabled ? -1 : 0}
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          >
            {itemContent}
          </BreadcrumbLink>
        ) : (
          itemContent
        )}
      </StyledBreadcrumbItem>
    );
  }, [size, variant, disabled, dataTestId, handleItemClick]);

  /**
   * Render collapse indicator
   */
  const renderCollapseIndicator = useCallback(() => (
    <CollapseIndicator
      size={size}
      onClick={handleExpandToggle}
      onKeyDown={handleKeyDown}
      aria-label={BREADCRUMBS_ACCESSIBILITY.expandButtonLabel}
      aria-expanded={isExpanded}
      data-testid={`${dataTestId}-expand-button`}
    >
      <MoreHoriz />
    </CollapseIndicator>
  ), [size, handleExpandToggle, handleKeyDown, isExpanded, dataTestId]);

  /**
   * Render breadcrumbs content
   */
  const renderContent = useCallback(() => {
    if (Array.isArray(visibleItems)) {
      // Simple case: all items visible
      return visibleItems.map((item, index) => {
        const isLast = index === visibleItems.length - 1;
        return (
          <span key={`breadcrumb-${index}`}>
            {renderBreadcrumbItem(item, index, isLast)}
            {!isLast && renderSeparator(index)}
          </span>
        );
      });
    }

    // Collapsed case: show before items, collapse indicator, and after items
    const { before, after, hasCollapsed } = visibleItems as any;
    const elements = [];

    // Render before items
    before.forEach((item: BreadcrumbItem, index: number) => {
      elements.push(
        <span key={`before-${index}`}>
          {renderBreadcrumbItem(item, index, false)}
          {renderSeparator(index)}
        </span>
      );
    });

    // Render collapse indicator
    if (hasCollapsed) {
      elements.push(
        <span key="collapse-indicator">
          {renderCollapseIndicator()}
          {after.length > 0 && renderSeparator(before.length)}
        </span>
      );
    }

    // Render after items
    after.forEach((item: BreadcrumbItem, index: number) => {
      const actualIndex = items.length - after.length + index;
      const isLast = index === after.length - 1;
      elements.push(
        <span key={`after-${index}`}>
          {renderBreadcrumbItem(item, actualIndex, isLast)}
          {!isLast && renderSeparator(actualIndex)}
        </span>
      );
    });

    return elements;
  }, [visibleItems, items.length, renderBreadcrumbItem, renderSeparator, renderCollapseIndicator]);

  return (
    <BreadcrumbsContainer
      component="nav"
      role={BREADCRUMBS_ACCESSIBILITY.navigationRole}
      aria-label={ariaLabel || BREADCRUMBS_ACCESSIBILITY.defaultAriaLabel}
      size={size}
      variant={variant}
      className={className}
      sx={sx}
      id={id}
      data-testid={dataTestId}
      {...props}
    >
      <ol
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0,
          flexWrap: 'wrap',
        }}
        role={BREADCRUMBS_ACCESSIBILITY.listRole}
      >
        {renderContent()}
      </ol>
    </BreadcrumbsContainer>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs };