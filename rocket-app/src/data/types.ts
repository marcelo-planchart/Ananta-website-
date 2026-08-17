/**
 * Content model for the pose library and the Rocket sequences.
 *
 * Two ideas drive this shape:
 *
 *  1. A sequence is authored ONCE, in full, and the app derives shorter
 *     practices from it by tier (see `StepTier`). We never maintain a separate
 *     "30 minute Rocket 1" list that can drift from the real thing.
 *  2. Timing is expressed in BREATHS, not seconds. Seconds are computed at
 *     runtime from the practitioner's own breath pace, which is how the
 *     practice is actually counted.
 */

export type PoseFamily =
  | 'surya'
  | 'standing'
  | 'balance'
  | 'forward-fold'
  | 'hip-opener'
  | 'twist'
  | 'backbend'
  | 'arm-balance'
  | 'inversion'
  | 'core'
  | 'seated'
  | 'finishing'
  | 'rest';

/** Whether a pose is performed once, or once per side. */
export type PoseSide = 'none' | 'both';

/**
 * Tier controls which poses survive when a practitioner asks for a shorter
 * practice. `core` is the spine of the sequence and is never dropped.
 *
 *  core     — the sequence is not itself without these
 *  standard — a normal full-length class includes them
 *  full     — the complete traditional sequence, taught unabridged
 */
export type StepTier = 'core' | 'standard' | 'full';

export interface Pose {
  id: string;
  /** Transliterated Sanskrit name. */
  sanskrit: string;
  /** Common English name. */
  english: string;
  family: PoseFamily;
  /** Default breath count when a sequence does not override it. */
  breaths: number;
  side: PoseSide;
  /** 1 = accessible to a first-time student, 5 = advanced. */
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Short spoken-style cues, in the order a teacher would give them. */
  cues: string[];
  /** Accessible variations — central to how the Rocket is taught. */
  modifications: string[];
  /** Gaze point, where the tradition specifies one. */
  drishti?: string;
  /** Shown prominently in the player when present. */
  safety?: string;
}

export interface SequenceStep {
  poseId: string;
  tier: StepTier;
  /** Overrides the pose's default breath count for this position in the flow. */
  breaths?: number;
  /** Repeat count, e.g. three Surya Namaskara A. */
  repeat?: number;
  /** Teaching note specific to this moment in the sequence. */
  note?: string;
}

export type SequenceReviewStatus =
  /** Authored from published descriptions of the system; not yet signed off. */
  | 'draft-pending-owner-review'
  /** Confirmed by the style owner. */
  | 'approved'
  /** Built by the practitioner in the app. */
  | 'user-authored';

export interface Sequence {
  id: string;
  /** Display name, e.g. "Rocket 1". */
  name: string;
  /** One line, e.g. "Forward folds and hips". */
  subtitle: string;
  /** A paragraph on what this practice is and who it serves. */
  description: string;
  /** Key into theme.sequenceColor. */
  accentKey: string;
  /** Traditional day(s) this practice is taught on, 0 = Sunday. */
  traditionalDays: number[];
  steps: SequenceStep[];
  reviewStatus: SequenceReviewStatus;
}

/** A step after side-expansion and repeats — one entry per thing you do. */
export interface ResolvedStep {
  /** Stable key for lists and resume state. */
  key: string;
  pose: Pose;
  breaths: number;
  /** Which side, when the pose is performed twice. */
  side: 'right' | 'left' | null;
  /** 1-based round number when a pose repeats. */
  round: number | null;
  totalRounds: number | null;
  note?: string;
  tier: StepTier;
  /** Computed hold length in seconds at the active breath pace. */
  seconds: number;
}
