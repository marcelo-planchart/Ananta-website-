import type { Sequence, SequenceStep } from '@/data/types';
import { createStore, useStore } from '@/lib/createStore';
import { StorageKeys, readJson, writeJson } from '@/lib/storage';

/**
 * PHASE 3 — TEACHER TOOLS
 *
 * Sequences the practitioner or teacher builds themselves. They use the same
 * `Sequence` shape as the built-in practices, which means the player, the
 * duration scaling and the pose library all work on them with no special
 * cases — building a class and practising it are the same code path.
 *
 * Stored on the device. Sharing a sequence with students is the next piece of
 * this phase and needs an account system behind it.
 */

const store = createStore<Sequence[]>([]);

export function useCustomSequences(): Sequence[] {
  return useStore(store);
}

export function getCustomSequence(id: string): Sequence | undefined {
  return store.getState().find((sequence) => sequence.id === id);
}

function persist(next: Sequence[]): void {
  store.setState(next);
  void writeJson(StorageKeys.customSequences, next);
}

export function createCustomSequence(name: string, steps: SequenceStep[]): Sequence {
  const sequence: Sequence = {
    id: `custom-${Date.now()}`,
    name: name.trim() || 'Untitled sequence',
    subtitle: `${steps.length} poses`,
    description: 'Your own sequence.',
    accentKey: 'custom',
    traditionalDays: [],
    reviewStatus: 'user-authored',
    steps,
  };
  persist([sequence, ...store.getState()]);
  return sequence;
}

export function updateCustomSequence(id: string, patch: Partial<Sequence>): void {
  persist(
    store.getState().map((sequence) => (sequence.id === id ? { ...sequence, ...patch, id } : sequence)),
  );
}

export function deleteCustomSequence(id: string): void {
  persist(store.getState().filter((sequence) => sequence.id !== id));
}

export async function hydrateCustomSequences(): Promise<void> {
  const stored = await readJson<Sequence[]>(StorageKeys.customSequences, []);
  store.setState(stored);
}
