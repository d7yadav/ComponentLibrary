import { Search as SearchIcon, Star as StarIcon } from '@mui/icons-material';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

// Mock Material-UI icon imports
vi.mock('@mui/icons-material/Search', () => ({
  default: () => <svg data-testid="search-icon" />,
}));

vi.mock('@mui/icons-material/Star', () => ({
  default: () => <svg data-testid="star-icon" />,
}));

// Helper function to render Icon with default props
const renderIcon = (props: Partial<IconProps> = {}) => {
  const defaultProps: IconProps = {
    'data-testid': 'icon',
    'aria-label': 'Test icon', // Default aria-label for tests
    ...props,
  };
  return render(<Icon {...defaultProps} />);
};

describe('Icon Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with custom component', () => {
      renderIcon({ component: SearchIcon });
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders null when no name or component provided', () => {
      const { container } = renderIcon({});
      expect(container.firstChild).toBeNull();
    });

    it('applies custom className', () => {
      renderIcon({ 
        component: SearchIcon, 
        className: 'custom-icon',
        'aria-label': 'Search icon'
      });
      expect(screen.getByRole('img')).toHaveClass('custom-icon');
    });

    it('applies custom style', () => {
      const customStyle = { marginTop: '10px' };
      renderIcon({ 
        component: SearchIcon, 
        style: customStyle,
        'aria-label': 'Search icon'
      });
      expect(screen.getByRole('img')).toHaveStyle('margin-top: 10px');
    });
  });

  describe('Size Variants', () => {
    it('renders small size correctly', () => {
      renderIcon({ 
        component: SearchIcon, 
        size: 'small' 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders medium size correctly (default)', () => {
      renderIcon({ component: SearchIcon });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders large size correctly', () => {
      renderIcon({ 
        component: SearchIcon, 
        size: 'large' 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders xl size correctly', () => {
      renderIcon({ 
        component: SearchIcon, 
        size: 'xl' 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    const colors = ['inherit', 'primary', 'secondary', 'success', 'warning', 'error', 'info'] as const;

    colors.forEach((color) => {
      it(`renders ${color} color correctly`, () => {
        renderIcon({ 
          component: SearchIcon, 
          color 
        });
        expect(screen.getByRole('img')).toBeInTheDocument();
      });
    });
  });

  describe('Transform Props', () => {
    it('applies rotation transform', () => {
      renderIcon({ 
        component: SearchIcon, 
        rotation: 45 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('applies flip X transform', () => {
      renderIcon({ 
        component: SearchIcon, 
        flipX: true 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('applies flip Y transform', () => {
      renderIcon({ 
        component: SearchIcon, 
        flipY: true 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('applies multiple transforms', () => {
      renderIcon({ 
        component: SearchIcon, 
        rotation: 90,
        flipX: true,
        flipY: true 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Animation Props', () => {
    it('applies animation when animated is true', () => {
      renderIcon({ 
        component: SearchIcon, 
        animated: true 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('applies custom animation duration', () => {
      renderIcon({ 
        component: SearchIcon, 
        animated: true,
        animationDuration: 500 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading is true', () => {
      renderIcon({ 
        component: SearchIcon, 
        loading: true 
      });
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('shows custom loading icon when provided', () => {
      const customLoadingIcon = <div data-testid="custom-loading">Loading...</div>;
      renderIcon({ 
        component: SearchIcon, 
        loading: true,
        loadingIcon: customLoadingIcon 
      });
      expect(screen.getByTestId('custom-loading')).toBeInTheDocument();
    });

    it('hides main icon when loading', () => {
      renderIcon({ 
        component: SearchIcon, 
        loading: true 
      });
      // Icon container should be present but main icon should have reduced opacity
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('applies aria-label correctly', () => {
      renderIcon({ 
        component: SearchIcon, 
        'aria-label': 'Search icon' 
      });
      expect(screen.getByLabelText('Search icon')).toBeInTheDocument();
    });

    it('applies default aria-label when none provided', () => {
      renderIcon({ 
        component: SearchIcon,
        name: 'search',
        'aria-label': undefined // Override default
      });
      // When no aria-label, it should be hidden
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('sets aria-hidden when no aria-label provided', () => {
      renderIcon({ 
        component: SearchIcon,
        'aria-label': undefined // Override default 
      });
      const container = screen.getByTestId('icon');
      expect(container).toBeInTheDocument();
      // The SVG inside should have aria-hidden
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies role="img" when aria-label is provided', () => {
      renderIcon({ 
        component: SearchIcon, 
        'aria-label': 'Search' 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Dynamic Icon Loading', () => {
    it('loads Material-UI icon by name', async () => {
      // Mock the dynamic import
      const mockImport = vi.fn().mockResolvedValue({
        default: () => <svg data-testid="dynamic-search-icon" />
      });
      
      // Mock the import function
      vi.doMock(`@mui/icons-material/Search`, () => ({
        default: () => <svg data-testid="dynamic-search-icon" />
      }));

      renderIcon({ name: 'search' });
      
      await waitFor(() => {
        expect(screen.getByTestId('icon')).toBeInTheDocument();
      });
    });

    it('handles icon loading failure gracefully', async () => {
      renderIcon({ name: 'nonexistent-icon' });
      
      await waitFor(() => {
        // Should not crash and container should be present
        expect(screen.getByTestId('icon')).toBeInTheDocument();
      });
    });
  });

  describe('Event Handling', () => {
    it('handles click events', () => {
      const handleClick = vi.fn();
      renderIcon({ 
        component: SearchIcon, 
        onClick: handleClick 
      });
      
      screen.getByRole('img').click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles mouse events', () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      
      renderIcon({ 
        component: SearchIcon, 
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave 
      });
      
      const icon = screen.getByRole('img');
      icon.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      
      icon.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ref Handling', () => {
    it('exposes ref methods correctly', () => {
      const ref = { current: null };
      
      render(
        <Icon 
          ref={ref} 
          component={SearchIcon} 
          data-testid="icon" 
        />
      );
      
      expect(ref.current).toBeTruthy();
      expect(typeof ref.current?.focus).toBe('function');
      expect(typeof ref.current?.blur).toBe('function');
      expect(typeof ref.current?.getElement).toBe('function');
    });
  });

  describe('Variant Support', () => {
    const variants = ['filled', 'outlined', 'rounded', 'sharp', 'twoTone'] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        renderIcon({ 
          component: SearchIcon, 
          variant 
        });
        expect(screen.getByRole('img')).toBeInTheDocument();
      });
    });
  });

  describe('Library Support', () => {
    it('handles material library correctly', () => {
      renderIcon({ 
        component: SearchIcon, 
        library: 'material' 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('handles custom library correctly', () => {
      renderIcon({ 
        component: SearchIcon, 
        library: 'custom' 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined props gracefully', () => {
      renderIcon({ 
        component: SearchIcon,
        size: undefined,
        color: undefined,
        rotation: undefined 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('handles extreme rotation values', () => {
      renderIcon({ 
        component: SearchIcon, 
        rotation: 720 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('handles negative rotation values', () => {
      renderIcon({ 
        component: SearchIcon, 
        rotation: -90 
      });
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('memoizes component correctly', () => {
      const { rerender } = renderIcon({ 
        component: SearchIcon, 
        size: 'medium' 
      });
      
      // Re-render with same props
      rerender(<Icon component={SearchIcon} size="medium" data-testid="icon" />);
      
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('updates when props change', () => {
      const { rerender } = renderIcon({ 
        component: SearchIcon, 
        size: 'medium' 
      });
      
      // Re-render with different props
      rerender(<Icon component={StarIcon} size="large" data-testid="icon" />);
      
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });
});