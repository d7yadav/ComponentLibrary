
// Main component
export { default as IconButton } from './IconButton';

// Type definitions
export type {
  IconButtonProps,
  IconButtonRef,
  IconButtonState,
  IconButtonVariant,
  IconButtonSize,
  IconButtonColor,
  IconButtonShape,
  IconButtonLoadingConfig,
  IconButtonAnimationConfig,
  IconButtonAccessibilityConfig,
  StyledIconButtonProps
} from './IconButton.types';

// Constants
export {
  ICON_BUTTON_VARIANTS,
  ICON_BUTTON_SIZES,
  ICON_BUTTON_COLORS,
  ICON_BUTTON_SHAPES,
  ICON_BUTTON_ANIMATIONS,
  ICON_BUTTON_ELEVATIONS,
  ICON_BUTTON_A11Y,
  ICON_BUTTON_THEME_COLORS,
  ICON_BUTTON_LOADING,
  ICON_BUTTON_DEFAULTS
} from './IconButton.constants';

// Styled components (prefixed to avoid conflicts)
export {
  StyledIconButton,
  LoadingSpinner as IconButtonLoadingSpinner,
  IconContainer,
  BadgeContainer as IconButtonBadgeContainer
} from './IconButton.styles';