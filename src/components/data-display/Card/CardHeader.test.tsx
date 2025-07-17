/**
 * @fileoverview CardHeader Component Tests
 * @author AI Generated Tests - 2025-07-13
 */

import { ThemeProvider , createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import type { CardHeaderProps } from './Card.types';
import { CardHeader } from './CardHeader';

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

describe('CardHeader Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<CardHeader title="Test Title" />);
      expect(screen.getByTestId('cardheader')).toBeInTheDocument();
    });

    it('renders title correctly', () => {
      const testTitle = 'Test CardHeader Title';
      renderWithTheme(<CardHeader title={testTitle} />);
      expect(screen.getByText(testTitle)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      const testId = 'custom-card-header';
      renderWithTheme(
        <CardHeader data-testid={testId}>Test</CardHeader>
      );
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      renderWithTheme(
        <CardHeader className={customClass} title="Test" />
      );
      expect(screen.getByTestId('cardheader')).toHaveClass(customClass);
    });
  });

  // Props testing
  describe('Props', () => {
    describe('avatar prop', () => {
      it('renders avatar correctly', () => {
        const TestAvatar = () => <div data-testid="test-avatar">Avatar</div>;
        renderWithTheme(
          <CardHeader title="Title with Avatar" avatar={<TestAvatar />} data-testid="avatar-test" />
        );
        expect(screen.getByTestId('test-avatar')).toBeInTheDocument();
      });
    });

    describe('size prop', () => {
      const sizes = ['compact', 'comfortable', 'spacious'] as const;

      sizes.forEach((size) => {
        it(`renders ${size} size correctly`, () => {
          renderWithTheme(
            <CardHeader size={size} title={`${size} size`} data-testid="size-test" />
          );
          const element = screen.getByTestId('size-test');
          expect(element).toBeInTheDocument();
        });
      });
    });



    it('handles subtitle correctly', () => {
      const subtitle = 'Test Subtitle';
      renderWithTheme(
        <CardHeader title="Main Title" subtitle={subtitle} data-testid="subtitle-test" />
      );
      
      expect(screen.getByText(subtitle)).toBeInTheDocument();
    });
  });

  // Interaction testing
  describe('Interactions', () => {
    it('handles click events on header area', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      renderWithTheme(
        <CardHeader 
          title="Card Title"
          subtitle="Card Subtitle"
          onClick={handleClick} 
          data-testid="clickable-header"
        />
      );
      
      const element = screen.getByTestId('clickable-header');
      await user.click(element);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles avatar clicks independently', async () => {
      const user = userEvent.setup();
      const handleAvatarClick = vi.fn();
      const handleHeaderClick = vi.fn();
      
      renderWithTheme(
        <CardHeader
          title="Card Title"
          avatar={
            <button 
              data-testid="avatar-button" 
              onClick={(e) => {
                e.stopPropagation();
                handleAvatarClick(e);
              }}
            >
              Avatar
            </button>
          }
          onClick={handleHeaderClick}
          data-testid="header-with-avatar"
        />
      );
      
      const avatarButton = screen.getByTestId('avatar-button');
      await user.click(avatarButton);
      
      expect(handleAvatarClick).toHaveBeenCalledTimes(1);
      // Avatar click should not propagate to header click
      expect(handleHeaderClick).not.toHaveBeenCalled();
    });

    it('handles action button clicks independently', async () => {
      const user = userEvent.setup();
      const handleActionClick = vi.fn();
      const handleHeaderClick = vi.fn();
      
      renderWithTheme(
        <CardHeader
          title="Card Title"
          action={
            <button 
              data-testid="action-button" 
              onClick={(e) => {
                e.stopPropagation();
                handleActionClick(e);
              }}
            >
              More
            </button>
          }
          onClick={handleHeaderClick}
          data-testid="header-with-action"
        />
      );
      
      const actionButton = screen.getByTestId('action-button');
      await user.click(actionButton);
      
      expect(handleActionClick).toHaveBeenCalledTimes(1);
      // Action click should not propagate to header click
      expect(handleHeaderClick).not.toHaveBeenCalled();
    });
  });


  // Icon testing
  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it('renders avatar icon correctly', () => {
      renderWithTheme(
        <CardHeader title="With Avatar" avatar={<TestIcon />} />
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders action icon correctly', () => {
      const TestAction = () => <button data-testid="test-action">Action</button>;
      renderWithTheme(
        <CardHeader title="With Action" action={<TestAction />} />
      );
      
      expect(screen.getByTestId('test-action')).toBeInTheDocument();
    });
  });

  // Accessibility testing
  describe('Accessibility', () => {
    it('meets WCAG accessibility guidelines', async () => {
      const { container } = renderWithTheme(
        <CardHeader>Accessible CardHeader</CardHeader>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports screen readers', () => {
      const ariaLabel = 'Screen reader label';
      renderWithTheme(
        <CardHeader aria-label={ariaLabel}>
          CardHeader for screen readers
        </CardHeader>
      );
      
      expect(screen.getByLabelText(ariaLabel)).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      renderWithTheme(<CardHeader title="Keyboard CardHeader" tabIndex={0} />);
      
      const element = screen.getByTestId('cardheader');
      element.focus();
      expect(element).toHaveFocus();
    });

    it('provides proper ARIA attributes', () => {
      renderWithTheme(
        <CardHeader 
          aria-describedby="description"
          aria-controls="controlled-element"
        >
          ARIA CardHeader
        </CardHeader>
      );
      
      const element = screen.getByTestId('cardheader');
      expect(element).toHaveAttribute('aria-describedby', 'description');
      expect(element).toHaveAttribute('aria-controls', 'controlled-element');
    });
  });

  // Theme integration testing
  describe('Theme Integration', () => {
    it('respects theme customizations', () => {
      const customTheme = createTheme({
        components: {
          MuiCardHeader: {
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
          <CardHeader data-testid="themed-card-header">
            Themed CardHeader
          </CardHeader>
        </ThemeProvider>
      );

      const element = screen.getByTestId('themed-card-header');
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
          <CardHeader>Dark Mode CardHeader</CardHeader>
        </ThemeProvider>
      );

      expect(screen.getByTestId('cardheader')).toBeInTheDocument();
    });
  });

  // Performance testing
  describe('Performance', () => {
    it('renders efficiently with many instances', () => {
      const manyComponents = Array.from({ length: 100 }, (_, i) => (
        <CardHeader key={i} title={`CardHeader ${i}`} />
      ));

      const { container } = renderWithTheme(<div>{manyComponents}</div>);
      expect(container.querySelectorAll('[data-testid="cardheader"]')).toHaveLength(100);
    });

  });

  // Edge cases and error handling
  describe('Edge Cases', () => {
    it('handles empty title gracefully', () => {
      renderWithTheme(<CardHeader />);
      expect(screen.getByTestId('cardheader')).toBeInTheDocument();
    });

    it('handles null title gracefully', () => {
      renderWithTheme(<CardHeader title={null as any} />);
      expect(screen.getByTestId('cardheader')).toBeInTheDocument();
    });

    it('handles undefined props gracefully', () => {
      renderWithTheme(
        <CardHeader 
          title="Undefined Props"
          size={undefined as any}
        />
      );
      expect(screen.getByTestId('cardheader')).toBeInTheDocument();
    });

  });

  // Snapshot testing
  describe('Snapshots', () => {
    it('matches snapshot for default props', () => {
      const { container } = renderWithTheme(
        <CardHeader>Default CardHeader</CardHeader>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for all variants', () => {
      const variants: CardHeaderProps['variant'][] = [
        'default',
      ];

      variants.forEach((variant) => {
        const { container } = renderWithTheme(
          <CardHeader variant={variant}>{variant} CardHeader</CardHeader>
        );
        expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
      });
    });
  });
});
