import type { ResolvedStep } from '@/data/types';

/**
 * The player's state machine, as a pure reducer.
 *
 * Kept separate from the React hook so the interesting behaviour — what
 * happens when a step's time runs out, what "back" means two seconds into a
 * pose, whether the practice is finished — is testable without a renderer.
 */

export interface PracticeState {
  /** Index into the resolved step list. */
  index: number;
  /** Seconds spent in the current step. */
  elapsedInStep: number;
  /** Seconds spent in the practice overall, excluding paused time. */
  elapsedTotal: number;
  status: 'idle' | 'running' | 'paused' | 'complete';
  /** Steps the practitioner skipped rather than completed. */
  skipped: string[];
}

export type PracticeAction =
  | { type: 'start' }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'toggle' }
  /** Advance the clock. `seconds` is the time since the last tick. */
  | { type: 'tick'; seconds: number }
  /** Practitioner asked for the next pose; counts as a skip when time remains. */
  | { type: 'next' }
  /** Auto-advance because the hold finished. */
  | { type: 'advance' }
  | { type: 'back' }
  | { type: 'jump'; index: number }
  /** Add time to the current hold — for when you want to stay. */
  | { type: 'extend'; seconds: number }
  | { type: 'finish' }
  | { type: 'reset' };

export function initialState(): PracticeState {
  return { index: 0, elapsedInStep: 0, elapsedTotal: 0, status: 'idle', skipped: [] };
}

/** How far back "back" goes: restart the current pose, or return to the previous one. */
const RESTART_THRESHOLD_SECONDS = 2;

export function practiceReducer(
  state: PracticeState,
  action: PracticeAction,
  steps: ResolvedStep[],
): PracticeState {
  const lastIndex = steps.length - 1;
  const current = steps[state.index];

  switch (action.type) {
    case 'start':
      return { ...state, status: 'running' };

    case 'pause':
      return state.status === 'running' ? { ...state, status: 'paused' } : state;

    case 'resume':
      return state.status === 'paused' || state.status === 'idle'
        ? { ...state, status: 'running' }
        : state;

    case 'toggle':
      if (state.status === 'running') return { ...state, status: 'paused' };
      if (state.status === 'complete') return state;
      return { ...state, status: 'running' };

    case 'tick': {
      if (state.status !== 'running' || !current) return state;
      return {
        ...state,
        elapsedInStep: state.elapsedInStep + action.seconds,
        elapsedTotal: state.elapsedTotal + action.seconds,
      };
    }

    case 'advance':
    case 'next': {
      if (!current) return state;
      // A manual "next" with time left on the clock is a skip; letting the hold
      // run out is not. The distinction shows up in the practice summary.
      const isSkip = action.type === 'next' && state.elapsedInStep < current.seconds;
      const skipped = isSkip ? [...state.skipped, current.key] : state.skipped;

      if (state.index >= lastIndex) {
        return { ...state, status: 'complete', elapsedInStep: 0, skipped };
      }
      return { ...state, index: state.index + 1, elapsedInStep: 0, skipped };
    }

    case 'back': {
      // Part-way into a pose, "back" restarts it. At the very start, it steps
      // to the previous pose — the behaviour of every audio player.
      if (state.elapsedInStep > RESTART_THRESHOLD_SECONDS) {
        return { ...state, elapsedInStep: 0 };
      }
      if (state.index === 0) return { ...state, elapsedInStep: 0 };
      return { ...state, index: state.index - 1, elapsedInStep: 0, status: 'running' };
    }

    case 'jump': {
      const index = Math.min(Math.max(0, action.index), Math.max(0, lastIndex));
      return { ...state, index, elapsedInStep: 0, status: 'running' };
    }

    case 'extend':
      return current ? { ...state, elapsedInStep: Math.max(0, state.elapsedInStep - action.seconds) } : state;

    case 'finish':
      return { ...state, status: 'complete' };

    case 'reset':
      return initialState();

    default:
      return state;
  }
}

/** Whether the current hold has run out and the player should move on. */
export function shouldAutoAdvance(state: PracticeState, steps: ResolvedStep[]): boolean {
  const current = steps[state.index];
  if (!current || state.status !== 'running') return false;
  return state.elapsedInStep >= current.seconds;
}

/** Seconds left in the current hold, floored at zero. */
export function remainingInStep(state: PracticeState, steps: ResolvedStep[]): number {
  const current = steps[state.index];
  if (!current) return 0;
  return Math.max(0, current.seconds - state.elapsedInStep);
}

/**
 * Which breath of the hold we are on, 1-based, for the on-screen count.
 * Clamped to the pose's breath count so a slow tick cannot show "6 of 5".
 */
export function currentBreath(state: PracticeState, steps: ResolvedStep[], pace: number): number {
  const current = steps[state.index];
  if (!current || pace <= 0) return 0;
  return Math.min(current.breaths, Math.floor(state.elapsedInStep / pace) + 1);
}

/** Fraction of the whole practice completed, 0..1, by time rather than count. */
export function practiceProgress(state: PracticeState, steps: ResolvedStep[]): number {
  const total = steps.reduce((sum, step) => sum + step.seconds, 0);
  if (total <= 0) return 0;
  const before = steps.slice(0, state.index).reduce((sum, step) => sum + step.seconds, 0);
  return Math.min(1, (before + state.elapsedInStep) / total);
}
