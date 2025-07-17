import { render, screen } from '@testing-library/react';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders with image source and alt', () => {
    render(<Avatar src="/test.jpg" alt="Test User" data-testid="avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/test.jpg');
    expect(avatar).toHaveAttribute('alt', 'Test User');
  });

  it('renders with fallback initials', () => {
    render(<Avatar data-testid="avatar-initials">AB</Avatar>);
    const avatar = screen.getByTestId('avatar-initials');
    expect(avatar).toHaveTextContent('AB');
  });

  it('applies custom variant', () => {
    render(<Avatar variant="square" data-testid="avatar-square" />);
    const avatar = screen.getByTestId('avatar-square');
    expect(avatar.className).toMatch(/MuiAvatar-square/);
  });
}); 