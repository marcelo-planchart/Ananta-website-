/**
 * ============================================================================
 *  BRAND PLACEHOLDERS — AWAITING OFFICIAL ROCKET ASSETS
 * ============================================================================
 *
 *  Everything the style owner controls lives in the `brand` object below and
 *  nowhere else. No screen, component or stylesheet in this app hardcodes a
 *  color, font family or logo path — they all read from here through
 *  `useTheme()`. When the official palette, typefaces and marks arrive:
 *
 *    1. Replace the values in `brand` (and drop font files in assets/fonts).
 *    2. Register real font families in `src/theme/fonts.ts`.
 *    3. Nothing else needs to change.
 *
 *  The current values are a deliberately neutral dark scheme chosen to be
 *  legible on a mat at arm's length in a dim room. They are NOT a proposed
 *  Rocket identity and no official mark, wordmark or color is reproduced here.
 * ============================================================================
 */

export const brand = {
  /** Awaiting official palette. Neutral dark placeholders. */
  color: {
    /** Deepest background — the player's canvas. */
    void: '#0B0B0F',
    /** Default screen background. */
    base: '#12131A',
    /** Raised cards and sheets. */
    surface: '#1B1D26',
    /** Surface pressed / selected. */
    surfaceHigh: '#242733',
    /** Hairlines and dividers. */
    line: '#2E323F',

    textPrimary: '#F4F4F6',
    textSecondary: '#A8ACBB',
    textMuted: '#6C7183',
    /** Text on top of an accent fill. */
    textOnAccent: '#0B0B0F',

    /** Primary interactive accent. PLACEHOLDER. */
    accent: '#E8B647',
    accentDim: '#8A6C25',
    /** Success / completion. */
    positive: '#5FBF8A',
    /** Warnings and safety notes on advanced poses. */
    caution: '#E0784A',
  },

  /**
   * Per-sequence accents. Rocket 1/2/3 read visually distinct at a glance so
   * you know which practice you are in from across the room. PLACEHOLDER hues.
   */
  sequenceColor: {
    rocket1: '#5FA8D3',
    rocket2: '#E0784A',
    rocket3: '#A683D9',
    custom: '#7F8899',
  },

  /**
   * Font families. Currently the platform system stack — no brand typeface is
   * bundled. Swap for the official faces once licensed.
   */
  font: {
    /** Headlines, pose names, counters. */
    display: undefined as string | undefined,
    /** Body copy, cues, UI. */
    body: undefined as string | undefined,
    /** Tabular numerals for timers and counts. */
    mono: undefined as string | undefined,
  },

  /** Logo/mark asset paths. Empty until the owner supplies artwork. */
  asset: {
    wordmark: null as string | null,
    mark: null as string | null,
  },
} as const;

/** 4pt base spacing scale. */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  huge: 64,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
} as const;

/**
 * Type scale. Sizes are deliberately large: this app is read from a mat, at
 * distance, often mid-pose and upside down.
 */
export const type = {
  hero: { fontSize: 44, lineHeight: 48, letterSpacing: -1 },
  title: { fontSize: 30, lineHeight: 36, letterSpacing: -0.5 },
  heading: { fontSize: 22, lineHeight: 28, letterSpacing: -0.2 },
  subheading: { fontSize: 18, lineHeight: 24 },
  body: { fontSize: 16, lineHeight: 24 },
  small: { fontSize: 14, lineHeight: 20 },
  label: { fontSize: 12, lineHeight: 16, letterSpacing: 1.2 },
  /** Player pose name — the single largest text in the app. */
  poseName: { fontSize: 34, lineHeight: 40, letterSpacing: -0.8 },
  /** Breath countdown. */
  counter: { fontSize: 72, lineHeight: 76, letterSpacing: -2 },
} as const;

export const motion = {
  /** Snappy feedback on taps. */
  fast: 140,
  /** Standard transitions. */
  base: 260,
  /** Slow, breath-paced reveals. */
  breath: 900,
} as const;

export const opacity = {
  disabled: 0.38,
  subtle: 0.6,
} as const;
