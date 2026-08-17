import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

import type { ResolvedStep } from '@/data/types';
import type { ResolvedPractice } from './resolve';
import { useSettings } from '@/features/settings/store';
import { completionFeedback, speak, stopSpeaking, transitionFeedback } from '@/lib/feedback';
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

/** Timer resolution. Fine enough for a breath count, cheap enough to ignore. */
const TICK_MS = 250;

export interface PracticeEngine {
  state: PracticeState;
  steps: ResolvedStep[];
  current: ResolvedStep | undefined;
  upcoming: ResolvedStep | undefined;
  /** Seconds left in the current hold. */
  remaining: number;
  /** 1-based breath number within the current hold. */
  breath: number;
  /** 0..1 across the whole practice. */
  progress: number;
  /** Seconds of practice completed, excluding paused time. */
  elapsedTotal: number;
  isRunning: boolean;
  isComplete: boolean;
  /** ISO timestamp of when the practice began. */
  startedAt: string;
  controls: {
    toggle: () => void;
    next: () => void;
    back: () => void;
    jump: (index: number) => void;
    extend: (seconds: number) => void;
    finish: () => void;
    restart: () => void;
  };
}

/**
 * Drives one practice from first pose to savasana.
 *
 * The reducer owns what happens; this hook owns when — the clock, the voice,
 * the vibration and keeping the screen alive while a phone sits on the floor
 * beside a mat.
 */
export function usePracticeEngine(practice: ResolvedPractice): PracticeEngine {
  const settings = useSettings();
  const steps = practice.steps;

  const reducer = useCallback(
    (state: PracticeState, action: PracticeAction) => practiceReducer(state, action, steps),
    [steps],
  );
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  const startedAtRef = useRef(new Date().toISOString());
  const lastTickRef = useRef<number | null>(null);
  /** Guards the announcement effect so a pose is spoken once, not every tick. */
  const spokenKeyRef = useRef<string | null>(null);

  const current = steps[state.index];
  const upcoming = steps[state.index + 1];

  // ------------------------------------------------------------------ clock
  useEffect(() => {
    if (state.status !== 'running') {
      lastTickRef.current = null;
      return;
    }
    lastTickRef.current = Date.now();
    const id = setInterval(() => {
      const now = Date.now();
      const previous = lastTickRef.current ?? now;
      lastTickRef.current = now;
      // Wall-clock delta rather than a fixed increment, so a backgrounded or
      // throttled timer does not quietly stretch the practice.
      dispatch({ type: 'tick', seconds: (now - previous) / 1000 });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [state.status]);

  // ----------------------------------------------------------- auto-advance
  useEffect(() => {
    if (!settings.autoAdvance) return;
    if (shouldAutoAdvance(state, steps)) {
      dispatch({ type: 'advance' });
    }
  }, [state, steps, settings.autoAdvance]);

  // ------------------------------------------------- announce the next pose
  useEffect(() => {
    if (!current || state.status === 'idle') return;
    if (spokenKeyRef.current === current.key) return;
    spokenKeyRef.current = current.key;

    if (settings.haptics) transitionFeedback();
    if (settings.voiceCues) {
      const side = current.side ? `, ${current.side} side` : '';
      const cue = current.pose.cues[0] ? ` ${current.pose.cues[0]}` : '';
      speak(`${current.pose.sanskrit}${side}.${cue}`);
    }
  }, [current, state.status, settings.voiceCues, settings.haptics]);

  // --------------------------------------------------------------- lifecycle
  useEffect(() => {
    void activateKeepAwakeAsync('rocket-practice').catch(() => undefined);
    return () => {
      deactivateKeepAwake('rocket-practice');
      stopSpeaking();
    };
  }, []);

  useEffect(() => {
    if (state.status === 'complete') {
      stopSpeaking();
      if (settings.haptics) completionFeedback();
    }
  }, [state.status, settings.haptics]);

  const controls = useMemo(
    () => ({
      toggle: () => dispatch({ type: 'toggle' }),
      next: () => dispatch({ type: 'next' }),
      back: () => dispatch({ type: 'back' }),
      jump: (index: number) => dispatch({ type: 'jump', index }),
      extend: (seconds: number) => dispatch({ type: 'extend', seconds }),
      finish: () => dispatch({ type: 'finish' }),
      restart: () => {
        startedAtRef.current = new Date().toISOString();
        spokenKeyRef.current = null;
        dispatch({ type: 'reset' });
        dispatch({ type: 'start' });
      },
    }),
    [],
  );

  // Begin as soon as the screen mounts — you opened it to practise.
  useEffect(() => {
    dispatch({ type: 'start' });
  }, []);

  return {
    state,
    steps,
    current,
    upcoming,
    remaining: remainingInStep(state, steps),
    breath: currentBreath(state, steps, practice.pace),
    progress: practiceProgress(state, steps),
    elapsedTotal: state.elapsedTotal,
    isRunning: state.status === 'running',
    isComplete: state.status === 'complete',
    startedAt: startedAtRef.current,
    controls,
  };
}
