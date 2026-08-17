import {
  computeLongestStreak,
  computeStreak,
  computeTotals,
  dayKey,
  lastSevenDays,
  type PracticeSession,
} from './streak';

const TODAY = new Date('2026-08-17T09:00:00');

function session(dateIso: string, overrides: Partial<PracticeSession> = {}): PracticeSession {
  return {
    id: dateIso,
    sequenceId: 'rocket-1',
    sequenceName: 'Rocket 1',
    lengthKey: 'full',
    startedAt: dateIso,
    durationSeconds: 45 * 60,
    stepsCompleted: 40,
    stepsTotal: 40,
    skippedCount: 0,
    finished: true,
    ...overrides,
  };
}

describe('computeStreak', () => {
  it('is zero with no history', () => {
    expect(computeStreak([], TODAY)).toBe(0);
  });

  it('counts consecutive days ending today', () => {
    const sessions = [
      session('2026-08-17T07:00:00'),
      session('2026-08-16T07:00:00'),
      session('2026-08-15T07:00:00'),
    ];
    expect(computeStreak(sessions, TODAY)).toBe(3);
  });

  it('stays alive on a day you have not practised yet', () => {
    // Practised yesterday, not yet today: the streak is still standing.
    const sessions = [session('2026-08-16T07:00:00'), session('2026-08-15T07:00:00')];
    expect(computeStreak(sessions, TODAY)).toBe(2);
  });

  it('breaks after a missed day', () => {
    const sessions = [session('2026-08-15T07:00:00'), session('2026-08-14T07:00:00')];
    expect(computeStreak(sessions, TODAY)).toBe(0);
  });

  it('counts two practices in one day as a single day', () => {
    const sessions = [
      session('2026-08-17T07:00:00'),
      session('2026-08-17T18:00:00'),
      session('2026-08-16T07:00:00'),
    ];
    expect(computeStreak(sessions, TODAY)).toBe(2);
  });

  it('counts across a month boundary', () => {
    const sessions = [
      session('2026-08-02T07:00:00'),
      session('2026-08-01T07:00:00'),
      session('2026-07-31T07:00:00'),
    ];
    expect(computeStreak(sessions, new Date('2026-08-02T20:00:00'))).toBe(3);
  });
});

describe('computeLongestStreak', () => {
  it('finds the longest run in a broken history', () => {
    const sessions = [
      session('2026-08-17T07:00:00'),
      session('2026-08-14T07:00:00'),
      session('2026-08-13T07:00:00'),
      session('2026-08-12T07:00:00'),
      session('2026-08-10T07:00:00'),
    ];
    expect(computeLongestStreak(sessions)).toBe(3);
  });

  it('is zero with no history and one for a single practice', () => {
    expect(computeLongestStreak([])).toBe(0);
    expect(computeLongestStreak([session('2026-08-17T07:00:00')])).toBe(1);
  });
});

describe('computeTotals', () => {
  it('sums minutes and counts practices per sequence', () => {
    const sessions = [
      session('2026-08-17T07:00:00', { durationSeconds: 30 * 60 }),
      session('2026-08-16T07:00:00', { sequenceId: 'rocket-2', durationSeconds: 60 * 60 }),
      session('2026-08-15T07:00:00', { durationSeconds: 30 * 60 }),
    ];
    const totals = computeTotals(sessions, TODAY);
    expect(totals.sessionCount).toBe(3);
    expect(totals.totalMinutes).toBe(120);
    expect(totals.bySequence['rocket-1']).toBe(2);
    expect(totals.bySequence['rocket-2']).toBe(1);
    expect(totals.currentStreak).toBe(3);
  });

  it('only counts the last seven days in the week strip', () => {
    const sessions = [session('2026-08-17T07:00:00'), session('2026-08-01T07:00:00')];
    const totals = computeTotals(sessions, TODAY);
    expect(totals.daysThisWeek).toEqual(['2026-08-17']);
  });
});

describe('day helpers', () => {
  it('formats a local day key', () => {
    expect(dayKey(new Date('2026-01-05T23:30:00'))).toBe('2026-01-05');
  });

  it('lists seven days ending today, oldest first', () => {
    const days = lastSevenDays(TODAY);
    expect(days).toHaveLength(7);
    expect(days[0]).toBe('2026-08-11');
    expect(days[6]).toBe('2026-08-17');
  });
});
