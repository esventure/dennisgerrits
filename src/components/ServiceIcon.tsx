interface ServiceIconProps {
  src: string;
  alt?: string;
  /** Outer container size in px. Default 64. */
  size?: number;
  /** Inner padding in px so every icon has the same breathing room. Default 10. */
  padding?: number;
  /** Whether to show the soft green-tinted circular background. */
  tinted?: boolean;
  className?: string;
}

/**
 * Uniform container for the hand-drawn green icons.
 * Guarantees every icon is centered, scaled to the same visual size,
 * and has identical padding regardless of the source asset's aspect ratio.
 */
const ServiceIcon = ({
  src,
  alt = "",
  size = 64,
  padding = 10,
  tinted = false,
  className = "",
}: ServiceIconProps) => {
  const inner = size - padding * 2;
  return (
    <div
      className={`shrink-0 flex items-center justify-center ${
        tinted ? "rounded-full" : ""
      } ${className}`}
      style={{
        width: size,
        height: size,
        padding,
        backgroundColor: tinted ? "hsl(var(--heritage-green) / 0.12)" : undefined,
      }}
    >
      <img
        src={src}
        alt={alt}
        width={inner}
        height={inner}
        loading="lazy"
        className="max-w-full max-h-full object-contain"
        style={{ width: inner, height: inner }}
      />
    </div>
  );
};

export default ServiceIcon;
