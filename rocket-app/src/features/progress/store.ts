import { createStore, useStore } from '@/lib/createStore';
import { StorageKeys, readJson, writeJson } from '@/lib/storage';
import type { PracticeSession } from './streak';
import { computeTotals } from './streak';

/** Newest first. */
const store = createStore<PracticeSession[]>([]);

export function useSessions(): PracticeSession[] {
  return useStore(store);
}

export function useTotals() {
  const sessions = useSessions();
  return computeTotals(sessions);
}

export function getSessions(): PracticeSession[] {
  return store.getState();
}

export async function logSession(session: Omit<PracticeSession, 'id'>): Promise<PracticeSession> {
  const entry: PracticeSession = {
    ...session,
    id: `${session.startedAt}-${session.sequenceId}`,
  };
  const next = [entry, ...store.getState()];
  store.setState(next);
  await writeJson(StorageKeys.sessions, next);
  return entry;
}

export async function clearSessions(): Promise<void> {
  store.setState([]);
  await writeJson(StorageKeys.sessions, []);
}

export async function hydrateSessions(): Promise<void> {
  const stored = await readJson<PracticeSession[]>(StorageKeys.sessions, []);
  store.setState(stored);
}

export type { PracticeSession };
