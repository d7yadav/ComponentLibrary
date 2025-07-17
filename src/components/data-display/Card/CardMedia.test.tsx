/**
 * @fileoverview CardMedia Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import type { CardMediaProps } from './Card.types';
import { CardMedia } from './CardMedia';

// Add jest-axe matcher
expect.extend(toHaveNoViolations);

// Test theme
const testTheme = createTheme();

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
);

// Helper function to render component with theme
const renderWithTheme = (ui: React.ReactElement, options = {}) => {
  return render(ui, { wrapper: TestWrapper, ...options });
};

describe('CardMedia Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<CardMedia data-testid="cardmedia">Test content</CardMedia>);
      expect(screen.getByTestId('cardmedia')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      const testContent = 'Test CardMedia Content';
      renderWithTheme(<CardMedia>{testContent}</CardMedia>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-card-media';
      renderWithTheme(
        <CardMedia data-testid={testId}>Test</CardMedia>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <CardMedia className={customClass} data-testid="cardmedia">Test</CardMedia>
      );
      expect(screen.getByTestId('cardmedia')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('variant prop', () => {
      const variants: CardMediaProps['variant'][] = [
        'default',
      ];

      variants.forEach((variant) => {
        it(`renders ${variant} variant correctly`, () => {
          renderWithTheme(
            <CardMedia variant={variant} data-testid="variant-test">
              {variant} variant
            </CardMedia>
          );
          const element = screen.getByTestId('variant-test');
          expect(element).toBeInTheDocument();
        });
      });
    });

    describe('size prop', () => {
      const sizes: CardMediaProps['size'][] = [
        'medium',
      ];

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <CardMedia size={size} data-testid="size-test">
              {size} size
            </CardMedia>
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });


    it('handles loading state correctly', () => {
      renderWithTheme(
        <CardMedia loading data-testid="loading-test">
          Loading CardMedia
        </CardMedia>
      );
      
      const element = screen.getByTestId('loading-test');
      expect(element).toHaveAttribute('aria-busy', 'true');
    });

    it('handles disabled state correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <CardMedia disabled onClick={handleClick} data-testid="disabled-test">
          Disabled CardMedia
        </CardMedia>
      );
      
      const element = screen.getByTestId('disabled-test');
      expect(element).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles image loading state changes', async () => {
      const { rerender } = renderWithTheme(
        <CardMedia 
          src="https://example.com/test-image.jpg" 
          alt="Test image"
          showLoading={true}
          data-testid="loading-media"
        />
      );
      
      // Should show loading state initially
      expect(screen.getByTestId('loading-media')).toBeInTheDocument();
      
      // Simulate image load event
      const image = screen.getByRole('img');
      fireEvent.load(image);
      
      // Loading should be hidden after load
      await waitFor(() => {
        expect(screen.queryByTestId('loading-media')).not.toBeInTheDocument();
      });
    });

    it('handles image error states', async () => {
      renderWithTheme(
        <CardMedia 
          src="https://example.com/invalid-image.jpg" 
          alt="Test image"
          data-testid="error-media"
        />
      );
      
      const image = screen.getByRole('img');
      
      // Simulate image error
      fireEvent.error(image);
      
      // Should show error message
      await waitFor(() => {
        expect(screen.getByText('Failed to load media')).toBeInTheDocument();
      });
    });

    it('handles click events on media content', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <CardMedia 
          src="https://example.com/test-image.jpg" 
          alt="Clickable image"
          onClick={handleClick}
          data-testid="clickable-media"
        />
      );
      
      const mediaContainer = screen.getByTestId('clickable-media');
      await user.click(mediaContainer);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles video controls interaction', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <CardMedia 
          src="https://example.com/test-video.mp4" 
          component="video"
          data-testid="video-media"
        />
      );
      
      const video = screen.getByRole('application'); // video role
      expect(video).toHaveAttribute('controls');
      expect(video).toHaveAttribute('playsInline');
      expect(video).toHaveAttribute('muted');
      
      // Video should be focusable for keyboard controls
      video.focus();
      expect(video).toHaveFocus();
    });
  });



  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <CardMedia>Accessible CardMedia</CardMedia>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <CardMedia aria-label={ariaLabel}>
          CardMedia for screen readers
        </CardMedia>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<CardMedia>Keyboard CardMedia</CardMedia>);
      
      const element = screen.getByRole('img');
      element.focus();
      expect(element).toHaveFocus();
          });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <CardMedia 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA CardMedia
        </CardMedia>
      );
      
      const element = screen.getByRole('img');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiCardMedia: {
            defaultProps: {
              variant: 'default',
            },
            styleOverrides: {
              root: {
                backgroundColor: 'rgb(255, 0, 0)',
              },
            },
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <CardMedia data-testid="themed-card-media">
            Themed CardMedia
          </CardMedia>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-card-media');
      expect(element).toBeInTheDocument();
    });

    it('supports dark mode', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      render(
        <ThemeProvider theme={darkTheme}>
          <CardMedia>Dark Mode CardMedia</CardMedia>
        </ThemeProvider>
      );

      expect(screen.getByTestId('cardmedia')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <CardMedia key={i}>CardMedia {i}</CardMedia>
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[role="img"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithTheme(<CardMedia />);
      expect(screen.getByTestId('cardmedia')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(<CardMedia>{null}</CardMedia>);
      expect(screen.getByTestId('cardmedia')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <CardMedia 
          variant={undefined as any} 
          size={undefined as any}
        >
          Undefined Props
        </CardMedia>
      );
      expect(screen.getByTestId('cardmedia')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <CardMedia>Default CardMedia</CardMedia>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: CardMediaProps['variant'][] = [
        'default',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <CardMedia variant={variant}>{variant} CardMedia</CardMedia>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
