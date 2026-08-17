import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Thin JSON wrapper over AsyncStorage.
 *
 * Everything the app remembers — practice history, settings, custom sequences —
 * lives on the device. There is no account and no server yet, so a read that
 * fails should degrade to "no data" rather than take the screen down with it.
 */

const PREFIX = 'rocket:';

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // A failed write loses one session's log. Not worth interrupting practice.
  }
}

export async function removeKey(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(PREFIX + key);
  } catch {
    // Ignore.
  }
}

export const StorageKeys = {
  sessions: 'sessions.v1',
  settings: 'settings.v1',
  customSequences: 'custom-sequences.v1',
} as const;
