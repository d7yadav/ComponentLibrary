import type { DividerOrientation, DividerVariant, DividerTextAlign } from './Divider.types';

export const DEFAULT_PROPS = {
  orientation: 'horizontal' as DividerOrientation,
  variant: 'fullWidth' as DividerVariant,
  flexItem: false,
  absolute: false,
  textAlign: 'center' as DividerTextAlign,
};

export const DIVIDER_ORIENTATIONS: DividerOrientation[] = ['horizontal', 'vertical'];

export const DIVIDER_VARIANTS: DividerVariant[] = ['fullWidth', 'inset', 'middle'];

export const DIVIDER_TEXT_ALIGNMENTS: DividerTextAlign[] = ['left', 'center', 'right']; 