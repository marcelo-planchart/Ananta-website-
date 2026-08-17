import { DEFAULT_PACE_SECONDS, MAX_PACE_SECONDS, MIN_PACE_SECONDS } from '@/features/practice/resolve';
import { createStore, useStore } from '@/lib/createStore';
import { StorageKeys, readJson, writeJson } from '@/lib/storage';

export interface Settings {
  /** Seconds per breath — the tempo of the whole practice. */
  pace: number;
  /** Speak the pose name and first cue at each transition. */
  voiceCues: boolean;
  /** Vibrate on each change of pose. */
  haptics: boolean;
  /** Move on automatically when a hold finishes. Off means you tap through. */
  autoAdvance: boolean;
  /** Cap the closing rest, for short practices. Null keeps the authored length. */
  maxRestBreaths: number | null;
  /** Show the safety note on advanced poses. */
  showSafetyNotes: boolean;
}

export const defaultSettings: Settings = {
  pace: DEFAULT_PACE_SECONDS,
  voiceCues: true,
  haptics: true,
  autoAdvance: true,
  maxRestBreaths: null,
  showSafetyNotes: true,
};

const store = createStore<Settings>(defaultSettings);

export function useSettings(): Settings {
  return useStore(store);
}

export function getSettings(): Settings {
  return store.getState();
}

export function updateSettings(patch: Partial<Settings>): void {
  const next = { ...store.getState(), ...patch };
  next.pace = Math.min(MAX_PACE_SECONDS, Math.max(MIN_PACE_SECONDS, next.pace));
  store.setState(next);
  void writeJson(StorageKeys.settings, next);
}

/** Called once at startup, before the first screen paints. */
export async function hydrateSettings(): Promise<void> {
  const stored = await readJson<Partial<Settings>>(StorageKeys.settings, {});
  store.setState({ ...defaultSettings, ...stored });
}
