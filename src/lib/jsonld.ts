// Helpers for schema.org JSON-LD used across the site.

type Crumb = { name: string; url: string };

const HOME: Crumb = { name: "Home", url: "https://dennisgerrits.com/" };

/**
 * Build a BreadcrumbList JSON-LD object. The first item is always Home.
 * Pass the trail of pages leading to (and including) the current page.
 */
export function breadcrumbJsonLd(trail: Crumb[]) {
  const items = [HOME, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}
