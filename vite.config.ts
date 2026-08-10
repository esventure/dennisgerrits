import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Fetch notebook slugs from the same source the /notebook route loader uses,
// so new stories are statically generated without editing this config.
async function fetchStorySlugs(env: Record<string, string>): Promise<string[]> {
  const url = env.VITE_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const key =
    env.VITE_SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";
  if (!url || !key) return [];
  try {
    const res = await fetch(`${url}/rest/v1/stories?select=slug&order=sort_order.asc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return [];
    const rows = (await res.json()) as { slug: string }[];
    return rows.map((r) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && !isSsrBuild && componentTagger()].filter(Boolean),
  ssgOptions: {
    script: "async",
    formatting: "minify",
    dirStyle: "nested",
    // Admin screens are private and must never be prerendered or indexed.
    includedRoutes: async (paths: string[]) => {
      const slugs = await fetchStorySlugs(env);
      const storyPaths = slugs.map((s) => `/notebook/${s}`);
      const base = paths.filter(
        (p) => !p.startsWith("/admin") && !p.includes(":") && p !== "/*",
      );
      return Array.from(new Set([...base, ...storyPaths]));
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  };
});

