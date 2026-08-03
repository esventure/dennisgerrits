import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LOVABLE_ASSET_ORIGIN =
  "https://id-preview--d8f5b35b-ed2f-4aed-a9c2-4376af53467e.lovable.app";

/**
 * Custom-domain redirects currently intercept root-relative Lovable asset
 * routes. Point CDN assets at the project host so they remain reachable on
 * the preview, Lovable URL, and custom domain.
 */
export function lovableAssetUrl(path: string) {
  return path.startsWith("/__l5e/assets-v1/")
    ? `${LOVABLE_ASSET_ORIGIN}${path}`
    : path;
}
