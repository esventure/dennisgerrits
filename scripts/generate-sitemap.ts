// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
// Static routes are listed below; notebook chapters are fetched from the database
// with the same source/filters as the /notebook route loader.

import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// Load .env manually so the script works regardless of the runner.
if (existsSync(resolve(".env"))) {
  for (const line of readFileSync(resolve(".env"), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const BASE_URL = "https://dennisgerrits.com";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

// Public, indexable routes from src/routes.tsx.
// Omitted: /admin*, /interests (canonical points at /get-inspired), 404 catch-all.
const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/get-inspired", changefreq: "monthly", priority: "0.8" },
  { path: "/travel-agents", changefreq: "monthly", priority: "0.7" },
  { path: "/notebook", changefreq: "weekly", priority: "0.8" },
];

async function fetchStorySlugs(): Promise<string[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/stories?select=slug&order=sort_order.asc`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } },
    );
    if (!res.ok) return [];
    const rows = (await res.json()) as { slug: string }[];
    return rows.map((r) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

function experienceSlugsFromSource(): string[] {
  try {
    const src = readFileSync(resolve("src/data/experiences.ts"), "utf8");
    const titles = [...src.matchAll(/^\s{4}title: "([^"]+)",$/gm)].map((m) => m[1]);
    return titles.map((t) =>
      t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    );
  } catch {
    return [];
  }
}

const slugs = await fetchStorySlugs();
const entries: SitemapEntry[] = [
  ...staticEntries,
  ...experienceSlugsFromSource().map((slug) => ({
    path: `/get-inspired/${slug}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  })),
  ...slugs.map((slug) => ({
    path: `/notebook/${slug}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  })),
];

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
