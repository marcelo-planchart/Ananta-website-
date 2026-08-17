import { rocket1, rocket2, rocket3 } from '@/data/sequences';
import type { Sequence } from '@/data/types';
import {
  PRACTICE_LENGTHS,
  chooseLengthForMinutes,
  describeStep,
  estimateMinutes,
  formatClock,
  formatDuration,
  resolveByLength,
  resolveSequence,
} from './resolve';

const tiny: Sequence = {
  id: 'test',
  name: 'Test',
  subtitle: '',
  description: '',
  accentKey: 'custom',
  traditionalDays: [],
  reviewStatus: 'user-authored',
  steps: [
    { poseId: 'surya-namaskara-a', tier: 'core', repeat: 3 },
    { poseId: 'utthita-trikonasana', tier: 'core' }, // two sides
    { poseId: 'bakasana', tier: 'standard', breaths: 10 },
    { poseId: 'savasana', tier: 'core', breaths: 60 },
  ],
};

describe('resolveSequence', () => {
  it('expands repeats into separate rounds', () => {
    const { steps } = resolveSequence(tiny, { tiers: ['core'], pace: 5 });
    const rounds = steps.filter((step) => step.pose.id === 'surya-namaskara-a');
    expect(rounds).toHaveLength(3);
    expect(rounds.map((step) => step.round)).toEqual([1, 2, 3]);
    expect(rounds[0]?.totalRounds).toBe(3);
  });

  it('expands two-sided poses into right then left', () => {
    const { steps } = resolveSequence(tiny, { tiers: ['core'], pace: 5 });
    const sides = steps.filter((step) => step.pose.id === 'utthita-trikonasana');
    expect(sides.map((step) => step.side)).toEqual(['right', 'left']);
  });

  it('drops steps outside the requested tiers', () => {
    const core = resolveSequence(tiny, { tiers: ['core'], pace: 5 });
    expect(core.steps.some((step) => step.pose.id === 'bakasana')).toBe(false);

    const withStandard = resolveSequence(tiny, { tiers: ['core', 'standard'], pace: 5 });
    expect(withStandard.steps.some((step) => step.pose.id === 'bakasana')).toBe(true);
  });

  it('honours a per-step breath override', () => {
    const { steps } = resolveSequence(tiny, { tiers: ['core', 'standard'], pace: 5 });
    const crow = steps.find((step) => step.pose.id === 'bakasana');
    expect(crow?.breaths).toBe(10);
    expect(crow?.seconds).toBe(50);
  });

  it('scales every hold with the breath pace', () => {
    const slow = resolveSequence(tiny, { tiers: ['core'], pace: 6 });
    const fast = resolveSequence(tiny, { tiers: ['core'], pace: 3 });
    expect(slow.totalSeconds).toBe(fast.totalSeconds * 2);
  });

  it('caps the closing rest when asked, leaving other poses alone', () => {
    const capped = resolveSequence(tiny, { tiers: ['core'], pace: 5, maxRestBreaths: 24 });
    const savasana = capped.steps.find((step) => step.pose.id === 'savasana');
    const surya = capped.steps.find((step) => step.pose.id === 'surya-namaskara-a');
    expect(savasana?.breaths).toBe(24);
    expect(surya?.breaths).toBe(9);
  });

  it('gives every resolved step a unique key even when a pose repeats', () => {
    // Paschimottanasana appears twice in each real sequence.
    const { steps } = resolveByLength(rocket1, 'complete');
    const keys = steps.map((step) => step.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('throws on an unknown pose id rather than silently skipping it', () => {
    const broken: Sequence = { ...tiny, steps: [{ poseId: 'not-a-pose', tier: 'core' }] };
    expect(() => resolveSequence(broken, { tiers: ['core'], pace: 5 })).toThrow(/not-a-pose/);
  });
});

describe('practice lengths', () => {
  const sequences = [rocket1, rocket2, rocket3];

  it('gets longer as the tier set widens', () => {
    for (const sequence of sequences) {
      const short = estimateMinutes(sequence, 'short');
      const full = estimateMinutes(sequence, 'full');
      const complete = estimateMinutes(sequence, 'complete');
      expect(short).toBeLessThan(full);
      expect(full).toBeLessThan(complete);
    }
  });

  it('produces practices in a plausible range for a real class', () => {
    for (const sequence of sequences) {
      expect(estimateMinutes(sequence, 'short')).toBeGreaterThanOrEqual(15);
      expect(estimateMinutes(sequence, 'short')).toBeLessThanOrEqual(40);
      expect(estimateMinutes(sequence, 'complete')).toBeGreaterThanOrEqual(45);
      expect(estimateMinutes(sequence, 'complete')).toBeLessThanOrEqual(150);
    }
  });

  it('never drops a core pose when shortening', () => {
    for (const sequence of sequences) {
      const shortIds = resolveByLength(sequence, 'short').steps.map((step) => step.pose.id);
      const coreIds = sequence.steps.filter((step) => step.tier === 'core').map((step) => step.poseId);
      for (const id of coreIds) {
        expect(shortIds).toContain(id);
      }
    }
  });

  it('keeps the authored order after shortening', () => {
    const complete = resolveByLength(rocket1, 'complete').steps.map((step) => step.pose.id);
    const short = resolveByLength(rocket1, 'short').steps.map((step) => step.pose.id);
    let cursor = -1;
    for (const id of short) {
      const found = complete.indexOf(id, cursor + 1);
      expect(found).toBeGreaterThan(cursor);
      cursor = found;
    }
  });

  it('picks the longest practice that fits the time available', () => {
    const complete = estimateMinutes(rocket1, 'complete');
    expect(chooseLengthForMinutes(rocket1, complete + 30).key).toBe('complete');
    expect(chooseLengthForMinutes(rocket1, estimateMinutes(rocket1, 'short')).key).toBe('short');
  });

  it('falls back to the shortest practice when nothing fits', () => {
    expect(chooseLengthForMinutes(rocket1, 5).key).toBe('short');
  });

  it('exposes the three lengths shortest first', () => {
    expect(PRACTICE_LENGTHS.map((length) => length.key)).toEqual(['short', 'full', 'complete']);
  });
});

describe('formatting', () => {
  it('formats durations for cards', () => {
    expect(formatDuration(48 * 60)).toBe('48m');
    expect(formatDuration(72 * 60)).toBe('1h 12m');
    expect(formatDuration(120 * 60)).toBe('2h');
  });

  it('formats the player clock', () => {
    expect(formatClock(65)).toBe('1:05');
    expect(formatClock(0)).toBe('0:00');
    expect(formatClock(-4)).toBe('0:00');
  });

  it('describes a step with its side and round', () => {
    const { steps } = resolveByLength(rocket1, 'complete');
    const triangle = steps.find((step) => step.pose.id === 'utthita-trikonasana');
    expect(describeStep(triangle!)).toBe('Utthita Trikonasana · right');

    const surya = steps.find((step) => step.pose.id === 'surya-namaskara-a' && step.round === 2);
    expect(describeStep(surya!)).toBe('Surya Namaskara A · 2 of 3');
  });
});
