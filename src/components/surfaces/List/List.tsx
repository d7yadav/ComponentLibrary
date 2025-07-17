import React, { memo } from 'react';

import { DEFAULT_PROPS } from './List.constants';
import { StyledList } from './List.styles';
import type { ListProps } from './List.types';

/**
 * List component provides a container for list items with consistent spacing and accessibility.
 *
 * @author dilip.yadav@shorelineiot.com
 * @param props - List props
 * @returns List component
 */
export const List: React.FC<ListProps> = ({ children, ...rest }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Handle keyboard activation
    }
  };

  return (
    <StyledList 
      data-testid="list-root" 
      onKeyDown={handleKeyDown}
      {...DEFAULT_PROPS}
      {...rest}
    >
      {children}
    </StyledList>
  );
};

List.displayName = 'List';

export default memo(List);