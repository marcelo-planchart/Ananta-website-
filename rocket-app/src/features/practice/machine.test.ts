import { rocket1 } from '@/data/sequences';
import type { ResolvedStep } from '@/data/types';
import {
  currentBreath,
  initialState,
  practiceProgress,
  practiceReducer,
  remainingInStep,
  shouldAutoAdvance,
  type PracticeAction,
  type PracticeState,
} from './machine';
import { resolveByLength } from './resolve';

const steps: ResolvedStep[] = resolveByLength(rocket1, 'short', 5).steps;

/** Applies a list of actions in order, for readable multi-step tests. */
function run(actions: PracticeAction[], from: PracticeState = initialState()): PracticeState {
  return actions.reduce((state, action) => practiceReducer(state, action, steps), from);
}

describe('practiceReducer', () => {
  it('starts idle and runs on start', () => {
    expect(initialState().status).toBe('idle');
    expect(run([{ type: 'start' }]).status).toBe('running');
  });

  it('toggles between running and paused', () => {
    const paused = run([{ type: 'start' }, { type: 'toggle' }]);
    expect(paused.status).toBe('paused');
    expect(run([{ type: 'toggle' }], paused).status).toBe('running');
  });

  it('does not advance the clock while paused', () => {
    const state = run([{ type: 'start' }, { type: 'toggle' }, { type: 'tick', seconds: 10 }]);
    expect(state.elapsedInStep).toBe(0);
    expect(state.elapsedTotal).toBe(0);
  });

  it('accumulates elapsed time while running', () => {
    const state = run([{ type: 'start' }, { type: 'tick', seconds: 3 }, { type: 'tick', seconds: 2 }]);
    expect(state.elapsedInStep).toBe(5);
    expect(state.elapsedTotal).toBe(5);
  });

  it('resets the step clock but keeps the total when moving on', () => {
    const state = run([{ type: 'start' }, { type: 'tick', seconds: 8 }, { type: 'advance' }]);
    expect(state.index).toBe(1);
    expect(state.elapsedInStep).toBe(0);
    expect(state.elapsedTotal).toBe(8);
  });

  it('records a skip when the practitioner moves on early, but not when the hold runs out', () => {
    const skipped = run([{ type: 'start' }, { type: 'tick', seconds: 1 }, { type: 'next' }]);
    expect(skipped.skipped).toHaveLength(1);

    const completed = run([
      { type: 'start' },
      { type: 'tick', seconds: steps[0]!.seconds },
      { type: 'next' },
    ]);
    expect(completed.skipped).toHaveLength(0);

    const autoAdvanced = run([{ type: 'start' }, { type: 'tick', seconds: 1 }, { type: 'advance' }]);
    expect(autoAdvanced.skipped).toHaveLength(0);
  });

  it('completes at the end of the last step instead of running off the list', () => {
    const atEnd: PracticeState = { ...initialState(), index: steps.length - 1, status: 'running' };
    const state = practiceReducer(atEnd, { type: 'advance' }, steps);
    expect(state.status).toBe('complete');
    expect(state.index).toBe(steps.length - 1);
  });

  it('restarts the current pose when going back mid-hold', () => {
    const state = run([{ type: 'start' }, { type: 'advance' }, { type: 'tick', seconds: 9 }, { type: 'back' }]);
    expect(state.index).toBe(1);
    expect(state.elapsedInStep).toBe(0);
  });

  it('steps to the previous pose when going back at the very start of a hold', () => {
    const state = run([{ type: 'start' }, { type: 'advance' }, { type: 'tick', seconds: 1 }, { type: 'back' }]);
    expect(state.index).toBe(0);
  });

  it('cannot go back past the first pose', () => {
    const state = run([{ type: 'start' }, { type: 'back' }]);
    expect(state.index).toBe(0);
  });

  it('clamps a jump to the bounds of the practice', () => {
    expect(run([{ type: 'jump', index: -5 }]).index).toBe(0);
    expect(run([{ type: 'jump', index: 9999 }]).index).toBe(steps.length - 1);
  });

  it('buys more time in a pose with extend, never going below zero', () => {
    const state = run([{ type: 'start' }, { type: 'tick', seconds: 10 }, { type: 'extend', seconds: 4 }]);
    expect(state.elapsedInStep).toBe(6);

    const floored = run([{ type: 'start' }, { type: 'tick', seconds: 2 }, { type: 'extend', seconds: 30 }]);
    expect(floored.elapsedInStep).toBe(0);
  });

  it('ignores toggle once the practice is complete', () => {
    const complete = run([{ type: 'start' }, { type: 'finish' }]);
    expect(practiceReducer(complete, { type: 'toggle' }, steps).status).toBe('complete');
  });
});

describe('derived values', () => {
  it('auto-advances only once the hold has run out, and never while paused', () => {
    const first = steps[0]!;
    const running = run([{ type: 'start' }, { type: 'tick', seconds: first.seconds - 1 }]);
    expect(shouldAutoAdvance(running, steps)).toBe(false);

    const finished = run([{ type: 'tick', seconds: 1 }], running);
    expect(shouldAutoAdvance(finished, steps)).toBe(true);

    const paused = run([{ type: 'toggle' }], finished);
    expect(shouldAutoAdvance(paused, steps)).toBe(false);
  });

  it('counts down the remaining seconds and floors at zero', () => {
    const first = steps[0]!;
    const state = run([{ type: 'start' }, { type: 'tick', seconds: 2 }]);
    expect(remainingInStep(state, steps)).toBe(first.seconds - 2);

    const over = run([{ type: 'tick', seconds: 999 }], state);
    expect(remainingInStep(over, steps)).toBe(0);
  });

  it('counts breaths from one and never exceeds the pose count', () => {
    const first = steps[0]!;
    expect(currentBreath(run([{ type: 'start' }]), steps, 5)).toBe(1);
    expect(currentBreath(run([{ type: 'start' }, { type: 'tick', seconds: 5 }]), steps, 5)).toBe(2);

    const over = run([{ type: 'start' }, { type: 'tick', seconds: first.seconds + 60 }]);
    expect(currentBreath(over, steps, 5)).toBe(first.breaths);
  });

  it('reports progress across the whole practice', () => {
    expect(practiceProgress(initialState(), steps)).toBe(0);

    const atEnd: PracticeState = {
      ...initialState(),
      index: steps.length - 1,
      elapsedInStep: steps[steps.length - 1]!.seconds,
    };
    expect(practiceProgress(atEnd, steps)).toBe(1);
  });

  it('never reports progress above one, however long a pose is held', () => {
    const overrun: PracticeState = { ...initialState(), index: 0, elapsedInStep: 100_000 };
    expect(practiceProgress(overrun, steps)).toBe(1);
  });
});
