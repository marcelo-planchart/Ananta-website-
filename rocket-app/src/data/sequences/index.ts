import type { Sequence } from '../types';
import { rocket1 } from './rocket1';
import { rocket2 } from './rocket2';
import { rocket3 } from './rocket3';

/** The three built-in practices, in teaching order. */
export const builtInSequences: Sequence[] = [rocket1, rocket2, rocket3];

export const sequenceById: Record<string, Sequence> = Object.fromEntries(
  builtInSequences.map((sequence) => [sequence.id, sequence]),
);

export function getBuiltInSequence(id: string): Sequence | undefined {
  return sequenceById[id];
}

/**
 * The traditional weekly rotation: Rocket 1 to start and end the working week,
 * Rocket 2 midweek, Rocket 3 on the days with time to spare. Returns the
 * practice for a given day, or Rocket 1 as a sane default.
 *
 * @param dayOfWeek 0 = Sunday, matching Date#getDay.
 */
export function sequenceForDay(dayOfWeek: number): Sequence {
  const match = builtInSequences.find((sequence) => sequence.traditionalDays.includes(dayOfWeek));
  return match ?? rocket1;
}

export { rocket1, rocket2, rocket3 };
