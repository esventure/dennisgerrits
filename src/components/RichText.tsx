import DOMPurify from "dompurify";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface RichTextProps {
  html: string;
  fallback?: string;
  className?: string;
}

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
];

const ALLOWED_ATTR = ["href", "target", "rel"];

const isLikelyHtml = (s: string) => /<\/?[a-z][\s\S]*>/i.test(s);

/**
 * DOMPurify needs a real DOM. During static HTML generation (Node) we use a
 * conservative tag/attribute allow-list instead, so pages still ship real
 * markup to crawlers. In the browser DOMPurify does the sanitizing.
 */
const sanitizeOnServer = (source: string) =>
  source
    .replace(/<\s*(script|style)[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*\/?\s*([a-z0-9]+)([^>]*)>/gi, (match, rawTag: string, attrs: string) => {
      const tag = rawTag.toLowerCase();
      if (!ALLOWED_TAGS.includes(tag)) return "";
      if (match.startsWith("</")) return `</${tag}>`;
      const kept = Array.from(
        attrs.matchAll(/([a-z-]+)\s*=\s*"([^"]*)"/gi),
      )
        .filter(([, name]) => ALLOWED_ATTR.includes(name.toLowerCase()))
        .filter(([, name, val]) => name.toLowerCase() !== "href" || !/^\s*javascript:/i.test(val))
        .map(([, name, val]) => ` ${name.toLowerCase()}="${val}"`)
        .join("");
      return `<${tag}${kept}>`;
    });

/**
 * Renders sanitized rich text (HTML) coming from the CMS.
 * Falls back to a plain-text paragraph if the value contains no HTML tags
 * (which is the case for legacy content saved before rich text was enabled).
 */
const RichText = ({ html, fallback = "", className }: RichTextProps) => {
  const value = html && html.trim() !== "" ? html : fallback;

  const sanitized = useMemo(() => {
    if (!value) return "";
    const source = isLikelyHtml(value)
      ? value
      : `<p>${value.replace(/\n+/g, "</p><p>")}</p>`;
    const clean =
      typeof window === "undefined" || typeof DOMPurify.sanitize !== "function"
        ? sanitizeOnServer(source)
        : DOMPurify.sanitize(source, {
            ALLOWED_TAGS,
            ALLOWED_ATTR,
          });

    // Force every link to be safe regardless of source.
    return clean.replace(
      /<a /g,
      '<a target="_blank" rel="noopener noreferrer" ',
    );
  }, [value]);

  if (!sanitized) return null;

  return (
    <div
      className={cn("rich-text", className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};

export default RichText;
