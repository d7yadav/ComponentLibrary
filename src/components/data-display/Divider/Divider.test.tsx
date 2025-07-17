import { render, screen } from '@testing-library/react';

import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    render(<Divider data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders vertical divider', () => {
    render(<Divider orientation="vertical" data-testid="divider-vertical" />);
    const divider = screen.getByTestId('divider-vertical');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('applies custom color', () => {
    render(<Divider color="#1976d2" data-testid="divider-color" />);
    const divider = screen.getByTestId('divider-color');
    expect(divider).toHaveStyle({ borderColor: '#1976d2' });
  });
}); 