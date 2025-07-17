import React, { memo } from 'react';

import { DEFAULT_PROPS } from './FormLabel.constants';
import { StyledFormLabel } from './FormLabel.styles';
import type { FormLabelProps } from './FormLabel.types';

/**
 * FormLabel component provides accessible labeling for form fields.
 *
 * @author dilip.yadav@shorelineiot.com
 * @param props - FormLabel props
 * @returns FormLabel component
 */
export const FormLabel: React.FC<FormLabelProps> = ({ children, ...rest }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Handle keyboard activation
    }
  };

  return (
    <StyledFormLabel
      onKeyDown={handleKeyDown}
      {...DEFAULT_PROPS}
      {...rest}
    >
      {children}
    </StyledFormLabel>
  );
};

FormLabel.displayName = 'FormLabel';

export default memo(FormLabel);