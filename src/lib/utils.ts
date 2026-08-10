import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Images are served from the project's own /public/images folder, so they work
 * identically on the preview, the Lovable URL and the custom domain. Legacy
 * CDN pointer URLs are mapped to their local counterpart by filename.
 */
export function lovableAssetUrl(path: string) {
  if (path.startsWith("/__l5e/assets-v1/")) {
    const filename = path.split("/").pop();
    return `/images/${filename}`;
  }
  return path;
}

