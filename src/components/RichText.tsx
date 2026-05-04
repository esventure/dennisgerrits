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
    const clean = DOMPurify.sanitize(source, {
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
