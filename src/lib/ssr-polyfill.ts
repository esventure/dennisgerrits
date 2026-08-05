/**
 * Minimal in-memory storage shims so modules that touch `localStorage`
 * at import time (e.g. the Supabase auth client) can be evaluated in
 * Node during static HTML generation. No-op in the browser.
 */
const createMemoryStorage = (): Storage => {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    removeItem: (key: string) => store.delete(key),
    setItem: (key: string, value: string) => void store.set(key, String(value)),
  } as Storage;
};

const g = globalThis as typeof globalThis & {
  localStorage?: Storage;
  sessionStorage?: Storage;
};

if (typeof g.localStorage === "undefined") g.localStorage = createMemoryStorage();
if (typeof g.sessionStorage === "undefined") g.sessionStorage = createMemoryStorage();

export {};
