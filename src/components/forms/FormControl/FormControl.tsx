import React, { memo } from 'react';

import { DEFAULT_PROPS } from './FormControl.constants';
import { StyledFormControl } from './FormControl.styles';
import type { FormControlProps } from './FormControl.types';

/**
 * FormControl component provides context and structure for form fields, labels, and validation.
 *
 * @author dilip.yadav@shorelineiot.com
 * @param props - FormControl props
 * @returns FormControl component
 */
export const FormControl: React.FC<FormControlProps> = ({ children, ...rest }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Handle keyboard activation
    }
  };

  return (
    <StyledFormControl
      onKeyDown={handleKeyDown}
      {...DEFAULT_PROPS}
      {...rest}
    >
      {children}
    </StyledFormControl>
  );
};

FormControl.displayName = 'FormControl';

export default memo(FormControl);