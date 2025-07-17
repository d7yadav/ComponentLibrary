import React, { memo } from 'react';

import { DEFAULT_PROPS } from './ListItem.constants';
import { StyledListItem } from './ListItem.styles';
import type { ListItemProps } from './ListItem.types';

/**
 * ListItem component provides a styled, accessible list item for use within List.
 *
 * @author dilip.yadav@shorelineiot.com
 * @param props - ListItem props
 * @returns ListItem component
 */
export const ListItem: React.FC<ListItemProps> = ({ children, selected = false, disabled = false, className, ...rest }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Handle keyboard activation
    }
  };

  return (
    <StyledListItem
      data-testid="list-item"
      selected={selected}
      disabled={disabled}
      className={className}
      onKeyDown={handleKeyDown}
      {...DEFAULT_PROPS}
      {...rest}
    >
      {children}
    </StyledListItem>
  );
};

ListItem.displayName = 'ListItem';

export default memo(ListItem);