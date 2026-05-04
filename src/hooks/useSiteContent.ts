import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, string>;

let cache: ContentMap | null = null;
const listeners = new Set<(c: ContentMap) => void>();

async function load() {
  const { data } = await supabase.from("site_content").select("key,value");
  const map: ContentMap = {};
  (data || []).forEach((r) => (map[r.key] = r.value));
  cache = map;
  listeners.forEach((l) => l(map));
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

  return (key: string, fallback: string) =>
    cache && cache[key] !== undefined && cache[key] !== "" ? cache[key] : fallback;
}

export async function refreshSiteContent() {
  await load();
}
