import { render, screen } from '@testing-library/react';
import React from 'react';

import { Select } from './Select';

// Simple test to check if component renders
describe('Select Component', () => {
  const basicOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ];

  test('renders basic select component', () => {
    render(
      <Select
        label="Test Select"
        options={basicOptions}
        data-testid="test-select"
      />
    );

    expect(screen.getByTestId('test-select')).toBeInTheDocument();
    expect(screen.getByText('Test Select')).toBeInTheDocument();
  });
});