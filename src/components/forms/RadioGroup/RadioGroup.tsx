import React, { memo } from 'react';

import { DEFAULT_PROPS } from './RadioGroup.constants';
import { StyledRadioGroup } from './RadioGroup.styles';
import type { RadioGroupProps } from './RadioGroup.types';

/**
 * RadioGroup component provides a group of radio buttons for exclusive selection.
 *
 * @author dilip.yadav@shorelineiot.com
 * @param props - RadioGroup props
 * @returns RadioGroup component
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({ children, ...rest }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Handle keyboard activation
    }
  };

  return (
    <StyledRadioGroup
      onKeyDown={handleKeyDown}
      {...DEFAULT_PROPS}
      {...rest}
    >
      {children}
    </StyledRadioGroup>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default memo(RadioGroup);