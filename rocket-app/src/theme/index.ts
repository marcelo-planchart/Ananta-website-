import { brand, motion, opacity, radius, space, type } from './tokens';

export type SequenceAccentKey = keyof typeof brand.sequenceColor;

export const theme = {
  color: brand.color,
  sequenceColor: brand.sequenceColor,
  font: brand.font,
  asset: brand.asset,
  space,
  radius,
  type,
  motion,
  opacity,
} as const;

export type Theme = typeof theme;
export type TypeVariant = keyof Theme['type'];

/**
 * Single accessor for design tokens. A hook (rather than a bare import) so a
 * light scheme or an owner-supplied brand pack can be introduced later behind
 * a provider without touching a single call site.
 */
export function useTheme(): Theme {
  return theme;
}

export { brand, motion, opacity, radius, space, type };
