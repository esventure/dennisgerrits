import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, string>;

let cache: ContentMap | null = null;
let overrides: ContentMap | null = null;
const listeners = new Set<(c: ContentMap) => void>();

async function load() {
  // Public site only ever sees the published "value" column.
  const { data } = await supabase.from("site_content").select("key,value");
  const map: ContentMap = {};
  (data || []).forEach((r) => (map[r.key] = r.value));
  cache = map;
  notify();
}

function notify() {
  listeners.forEach((l) => l(cache || {}));
}

// Allow an admin preview window to inject draft values without saving.
if (typeof window !== "undefined") {
  window.addEventListener("message", (event) => {
    if (event.source !== window.parent) return;
    const data = event.data as { type?: string; values?: ContentMap } | null;
    if (data && data.type === "site-content-preview" && data.values) {
      overrides = data.values;
      notify();
    }
  });
  if (window.parent && window.parent !== window) {
    try {
      window.parent.postMessage({ type: "site-content-preview-ready" }, "*");
    } catch {
      // ignore
    }
  }
}

export function useSiteContent(): (key: string, fallback: string) => string {
  const [, setTick] = useState(0);

  useEffect(() => {
    const fn = () => setTick((t) => t + 1);
    listeners.add(fn);
    if (cache === null) load();
    return () => {
      listeners.delete(fn);
    };
  }, []);

  return (key: string, fallback: string) => {
    if (overrides && overrides[key] !== undefined && overrides[key] !== "") {
      return overrides[key];
    }
    return cache && cache[key] !== undefined && cache[key] !== "" ? cache[key] : fallback;
  };
}

export async function refreshSiteContent() {
  await load();
}
