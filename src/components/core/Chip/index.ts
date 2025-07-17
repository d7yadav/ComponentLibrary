
// Main component
export { default as Chip } from './Chip';

// Type definitions
export type {
  ChipProps,
  ChipRef,
  ChipState,
  ChipVariant,
  ChipSize,
  ChipColor,
  ChipShape,
  ChipIconPosition,
  ChipClickConfig,
  ChipDeleteConfig,
  ChipIconConfig,
  ChipAnimationConfig,
  ChipAccessibilityConfig,
  StyledChipProps,
  StyledChipLabelProps,
  StyledChipIconProps,
  StyledChipDeleteProps
} from './Chip.types';

// Constants
export {
  CHIP_VARIANTS,
  CHIP_SIZES,
  CHIP_COLORS,
  CHIP_SHAPES,
  CHIP_ANIMATIONS,
  CHIP_ELEVATIONS,
  CHIP_A11Y,
  CHIP_THEME_COLORS,
  CHIP_BADGE,
  CHIP_LOADING,
  CHIP_ICON_SPACING,
  CHIP_DEFAULTS
} from './Chip.constants';

// Styled components (prefixed to avoid conflicts)
export {
  StyledChip,
  StyledChipLabel,
  StyledChipIcon,
  StyledChipAvatar,
  StyledChipDelete,
  LoadingSpinner as ChipLoadingSpinner,
  BadgeContainer as ChipBadgeContainer
} from './Chip.styles';