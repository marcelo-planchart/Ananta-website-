/**
 * Streak and totals math, kept pure so the edge cases — practising twice in
 * one day, crossing a month boundary, a gap of exactly one day — are covered
 * by tests rather than by hope.
 */

export interface PracticeSession {
  id: string;
  sequenceId: string;
  sequenceName: string;
  lengthKey: string;
  /** ISO timestamp of when the practice began. */
  startedAt: string;
  /** Time actually spent practising, excluding pauses. */
  durationSeconds: number;
  stepsCompleted: number;
  stepsTotal: number;
  skippedCount: number;
  /** True when the practitioner reached the end rather than leaving early. */
  finished: boolean;
}

/** Local calendar day key, e.g. "2026-08-17". */
export function dayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/**
 * Consecutive days of practice ending today.
 *
 * Today not yet practised does not break the streak — it is still live until
 * the day ends, so we start counting from yesterday in that case. Two
 * practices in one day count as one day.
 */
export function computeStreak(sessions: PracticeSession[], today: Date = new Date()): number {
  if (sessions.length === 0) return 0;
  const days = new Set(sessions.map((session) => dayKey(new Date(session.startedAt))));

  let cursor = days.has(dayKey(today)) ? today : addDays(today, -1);
  if (!days.has(dayKey(cursor))) return 0;

  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/** Longest run of consecutive practice days, ever. */
export function computeLongestStreak(sessions: PracticeSession[]): number {
  if (sessions.length === 0) return 0;
  const days = [...new Set(sessions.map((session) => dayKey(new Date(session.startedAt))))].sort();

  let longest = 1;
  let run = 1;
  for (let i = 1; i < days.length; i += 1) {
    const previous = new Date(`${days[i - 1]}T00:00:00`);
    const current = new Date(`${days[i]}T00:00:00`);
    const gapDays = Math.round((current.getTime() - previous.getTime()) / 86_400_000);
    run = gapDays === 1 ? run + 1 : 1;
    if (run > longest) longest = run;
  }
  return longest;
}

export interface ProgressTotals {
  sessionCount: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  /** Sessions per sequence id. */
  bySequence: Record<string, number>;
  /** Day keys practised in the last 7 days, for the week strip. */
  daysThisWeek: string[];
}

export function computeTotals(sessions: PracticeSession[], today: Date = new Date()): ProgressTotals {
  const bySequence: Record<string, number> = {};
  let totalSeconds = 0;

  for (const session of sessions) {
    totalSeconds += session.durationSeconds;
    bySequence[session.sequenceId] = (bySequence[session.sequenceId] ?? 0) + 1;
  }

  const weekStart = addDays(today, -6);
  const daysThisWeek = [
    ...new Set(
      sessions
        .map((session) => new Date(session.startedAt))
        .filter((date) => date >= new Date(dayKey(weekStart) + 'T00:00:00'))
        .map(dayKey),
    ),
  ];

  return {
    sessionCount: sessions.length,
    totalMinutes: Math.round(totalSeconds / 60),
    currentStreak: computeStreak(sessions, today),
    longestStreak: computeLongestStreak(sessions),
    bySequence,
    daysThisWeek,
  };
}

/** The last 7 day keys, oldest first — the x-axis of the week strip. */
export function lastSevenDays(today: Date = new Date()): string[] {
  return Array.from({ length: 7 }, (_, i) => dayKey(addDays(today, i - 6)));
}
