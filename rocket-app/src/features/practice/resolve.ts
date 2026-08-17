import { requirePose } from '@/data/poses';
import type { ResolvedStep, Sequence, SequenceStep, StepTier } from '@/data/types';

/**
 * Turns an authored sequence into the flat list of things you actually do.
 *
 * Deliberately free of any react-native import so it can be unit tested in
 * plain node and reused by the teacher's sequence builder unchanged.
 */

/** Seconds per breath. Five is an unhurried ujjayi breath. */
export const DEFAULT_PACE_SECONDS = 5;
export const MIN_PACE_SECONDS = 3;
export const MAX_PACE_SECONDS = 8;

export interface PracticeLength {
  key: 'short' | 'full' | 'complete';
  label: string;
  /** What gets left in. */
  tiers: StepTier[];
  description: string;
}

/**
 * Three lengths, derived from one authored sequence. There is no separate
 * "short Rocket 1" list to fall out of sync — shortening only ever removes
 * poses, never reorders or substitutes them.
 */
export const PRACTICE_LENGTHS: PracticeLength[] = [
  {
    key: 'short',
    label: 'Short',
    tiers: ['core'],
    description: 'The spine of the sequence. For the mornings you have twenty minutes.',
  },
  {
    key: 'full',
    label: 'Full',
    tiers: ['core', 'standard'],
    description: 'A normal class. What you would walk into at a studio.',
  },
  {
    key: 'complete',
    label: 'Complete',
    tiers: ['core', 'standard', 'full'],
    description: 'The whole sequence, unabridged, nothing dropped.',
  },
];

export function getPracticeLength(key: PracticeLength['key']): PracticeLength {
  const found = PRACTICE_LENGTHS.find((length) => length.key === key);
  if (!found) throw new Error(`Unknown practice length: "${key}"`);
  return found;
}

export interface ResolveOptions {
  /** Which tiers to keep. */
  tiers: StepTier[];
  /** Seconds per breath. */
  pace: number;
  /**
   * Cap the closing rest, so a twenty-minute practice does not spend a quarter
   * of itself in savasana. Null leaves the authored count alone.
   */
  maxRestBreaths?: number | null;
}

export interface ResolvedPractice {
  sequence: Sequence;
  steps: ResolvedStep[];
  totalSeconds: number;
  pace: number;
  tiers: StepTier[];
}

/** Sides in the order they are traditionally taken. */
const SIDES: Array<'right' | 'left'> = ['right', 'left'];

function expandStep(step: SequenceStep, pace: number, maxRestBreaths: number | null): ResolvedStep[] {
  const pose = requirePose(step.poseId);
  const rounds = Math.max(1, step.repeat ?? 1);
  const authoredBreaths = step.breaths ?? pose.breaths;
  const breaths =
    maxRestBreaths !== null && pose.family === 'rest'
      ? Math.min(authoredBreaths, maxRestBreaths)
      : authoredBreaths;

  const out: ResolvedStep[] = [];
  for (let round = 1; round <= rounds; round += 1) {
    const sides = pose.side === 'both' ? SIDES : [null];
    for (const side of sides) {
      out.push({
        key: `${step.poseId}:${round}:${side ?? 'single'}`,
        pose,
        breaths,
        side,
        round: rounds > 1 ? round : null,
        totalRounds: rounds > 1 ? rounds : null,
        note: step.note,
        tier: step.tier,
        seconds: breaths * pace,
      });
    }
  }
  return out;
}

export function resolveSequence(sequence: Sequence, options: ResolveOptions): ResolvedPractice {
  const { tiers, pace } = options;
  const maxRestBreaths = options.maxRestBreaths ?? null;
  const kept = sequence.steps.filter((step) => tiers.includes(step.tier));

  const steps: ResolvedStep[] = [];
  kept.forEach((step, stepIndex) => {
    for (const resolved of expandStep(step, pace, maxRestBreaths)) {
      // Prefix with the authored position so repeated poses (Paschimottanasana
      // appears twice in every sequence) still get unique, stable keys.
      steps.push({ ...resolved, key: `${stepIndex}-${resolved.key}` });
    }
  });

  return {
    sequence,
    steps,
    totalSeconds: steps.reduce((sum, step) => sum + step.seconds, 0),
    pace,
    tiers,
  };
}

/** Convenience wrapper for the common case of a named length. */
export function resolveByLength(
  sequence: Sequence,
  lengthKey: PracticeLength['key'],
  pace: number = DEFAULT_PACE_SECONDS,
  maxRestBreaths: number | null = null,
): ResolvedPractice {
  return resolveSequence(sequence, {
    tiers: getPracticeLength(lengthKey).tiers,
    pace,
    maxRestBreaths,
  });
}

/** Minutes, rounded to the nearest whole, for display. */
export function estimateMinutes(
  sequence: Sequence,
  lengthKey: PracticeLength['key'],
  pace: number = DEFAULT_PACE_SECONDS,
): number {
  return Math.round(resolveByLength(sequence, lengthKey, pace).totalSeconds / 60);
}

/**
 * Picks the length that best fits the time available, preferring to come in
 * under the limit rather than over it — running long is worse than finishing
 * early when you have to be somewhere.
 */
export function chooseLengthForMinutes(
  sequence: Sequence,
  minutes: number,
  pace: number = DEFAULT_PACE_SECONDS,
): PracticeLength {
  const withEstimates = PRACTICE_LENGTHS.map((length) => ({
    length,
    minutes: estimateMinutes(sequence, length.key, pace),
  }));

  const fitting = withEstimates.filter((entry) => entry.minutes <= minutes);
  if (fitting.length > 0) {
    // Longest practice that still fits.
    return fitting[fitting.length - 1]!.length;
  }
  // Nothing fits; take the shortest and let the UI show the real number.
  return withEstimates[0]!.length;
}

/** "1h 12m" / "48m" — for cards and summaries. */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.round(totalSeconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}

/** "4:05" — for the player's countdown. */
export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/** Full label for a step, e.g. "Utthita Trikonasana · right · 2 of 3". */
export function describeStep(step: ResolvedStep): string {
  const parts = [step.pose.sanskrit];
  if (step.side) parts.push(step.side);
  if (step.round && step.totalRounds) parts.push(`${step.round} of ${step.totalRounds}`);
  return parts.join(' · ');
}
