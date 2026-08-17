import { useSyncExternalStore } from 'react';

/**
 * Minimal external store.
 *
 * The app's shared state is small — settings, practice history, custom
 * sequences — and is written from outside React (storage hydration) as often
 * as from inside it. A subscribe/getSnapshot store handles that without
 * wrapping the tree in providers, and keeps the state modules importable by
 * tests that never render anything.
 */
export interface Store<T> {
  getState(): T;
  setState(next: T | ((previous: T) => T)): void;
  subscribe(listener: () => void): () => void;
}

export function createStore<T>(initial: T): Store<T> {
  let state = initial;
  const listeners = new Set<() => void>();

  return {
    getState: () => state,
    setState(next) {
      const value = typeof next === 'function' ? (next as (previous: T) => T)(state) : next;
      if (Object.is(value, state)) return;
      state = value;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

/** Subscribes a component to a store, optionally narrowing to a slice. */
export function useStore<T>(store: Store<T>): T;
export function useStore<T, S>(store: Store<T>, selector: (state: T) => S): S;
export function useStore<T, S>(store: Store<T>, selector?: (state: T) => S): T | S {
  return useSyncExternalStore(
    store.subscribe,
    () => (selector ? selector(store.getState()) : store.getState()),
    () => (selector ? selector(store.getState()) : store.getState()),
  );
}
