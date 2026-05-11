import { useState } from "react";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/FadeIn";

export interface PolaroidItem {
  id: string;
  title: string;
  caption: string;
  note: string;
  image: string;
  rotate: number; // degrees
  pin: "tape-tl" | "tape-tr" | "tape-gl" | "tape-gr";
}

interface PolaroidWallProps {
  items: PolaroidItem[];
  /** Show vertical jitter on md+ to feel hand-pinned. Off for small previews. */
  jitter?: boolean;
  /** Show floating Caveat scribbles + decorative wall objects in the gutter. */
  decorate?: boolean;
  /** Tailwind grid columns class override. */
  columnsClass?: string;
}

const scribbles = [
  { text: "↳ this one is my favourite", color: "hsl(var(--heritage-green))", rot: -6, top: "12%", left: "62%" },
  { text: "ask me first", color: "hsl(var(--heritage-bordeaux))", rot: 4, top: "44%", left: "8%" },
  { text: "we'll need a boat", color: "hsl(var(--heritage-orange))", rot: -3, top: "74%", left: "70%" },
];

const Stamp = ({ style }: { style: React.CSSProperties }) => (
  <div
    aria-hidden
    className="absolute pointer-events-none select-none hidden md:block"
    style={style}
  >
    <div
      className="font-heading tracking-[0.25em] text-xl px-3 py-1 border-2 rounded-sm"
      style={{
        color: "hsl(var(--heritage-orange))",
        borderColor: "hsl(var(--heritage-orange) / 0.7)",
        transform: "rotate(-9deg)",
        opacity: 0.75,
      }}
    >
      AMS · 020
    </div>
  </div>
);

const Ticket = ({ style }: { style: React.CSSProperties }) => (
  <div
    aria-hidden
    className="absolute pointer-events-none select-none hidden md:block"
    style={style}
  >
    <svg width="86" height="40" viewBox="0 0 86 40" style={{ transform: "rotate(7deg)", opacity: 0.85 }}>
      <path
        d="M2 6 L78 4 L84 18 L80 36 L4 38 Z"
        fill="hsl(40 38% 92%)"
        stroke="hsl(var(--heritage-bordeaux) / 0.55)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      <text
        x="10"
        y="24"
        fontFamily="'Caveat', cursive"
        fontSize="16"
        fill="hsl(var(--heritage-bordeaux))"
      >
        admit one
      </text>
    </svg>
  </div>
);

const Leaf = ({ style }: { style: React.CSSProperties }) => (
  <div
    aria-hidden
    className="absolute pointer-events-none select-none hidden md:block"
    style={style}
  >
    <svg width="54" height="64" viewBox="0 0 54 64" style={{ transform: "rotate(-14deg)", opacity: 0.7 }}>
      <path
        d="M27 4 C 8 18, 6 44, 26 60 C 46 44, 46 18, 27 4 Z"
        fill="hsl(var(--heritage-green) / 0.18)"
        stroke="hsl(var(--heritage-green) / 0.7)"
        strokeWidth="1.2"
      />
      <path d="M27 8 L27 58" stroke="hsl(var(--heritage-green) / 0.7)" strokeWidth="1" />
      <path d="M27 22 L18 28 M27 32 L17 40 M27 42 L19 50" stroke="hsl(var(--heritage-green) / 0.55)" strokeWidth="0.9" />
    </svg>
  </div>
);

const IndexCard = ({ style, text }: { style: React.CSSProperties; text: string }) => (
  <div
    aria-hidden
    className="absolute pointer-events-none select-none hidden lg:block"
    style={style}
  >
    <div
      className="px-3 py-2 shadow-sm"
      style={{
        background: "hsl(40 38% 96%)",
        transform: "rotate(5deg)",
        borderTop: "1px solid hsl(var(--heritage-bordeaux) / 0.4)",
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent 0 14px, hsl(var(--heritage-bordeaux) / 0.12) 14px 15px)",
        width: 130,
      }}
    >
      <span
        style={{
          fontFamily: "'Caveat', cursive",
          color: "hsl(var(--heritage-bordeaux))",
          fontSize: 18,
          lineHeight: 1.1,
        }}
      >
        {text}
      </span>
    </div>
  </div>
);

const Polaroid = ({
  item,
  index,
  open,
  onToggle,
  jitter,
}: {
  item: PolaroidItem;
  index: number;
  open: boolean;
  onToggle: () => void;
  jitter: boolean;
}) => {
  const noteColor =
    index % 3 === 0
      ? "hsl(var(--heritage-bordeaux))"
      : index % 3 === 1
      ? "hsl(var(--heritage-green))"
      : "hsl(var(--heritage-orange))";

  // vertical jitter pattern: -, +, 0, +, -, 0, ...
  const jitterY = jitter
    ? [0, 18, -12, 22, -8, 14, 0, 20, -16, 10, -6, 18][index % 12]
    : 0;

  return (
    <div
      className="relative flex justify-center"
      style={{ paddingTop: jitterY > 0 ? jitterY : 0, paddingBottom: jitterY < 0 ? -jitterY : 0 }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "group relative block text-left w-full max-w-[260px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4",
          "transition-transform duration-500 ease-out will-change-transform",
        )}
        style={{
          transform: `rotate(${open ? 0 : item.rotate}deg) translateY(0)`,
        }}
      >
        {/* hover lift + un-rotate */}
        <div
          className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
          style={{ transform: "rotate(0deg)" }}
        >
          <div
            className="relative bg-[hsl(0_0%_99%)] pt-3 pb-4 px-3 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.45)] group-hover:shadow-[0_18px_36px_-18px_rgba(0,0,0,0.55)] transition-shadow"
            style={{
              borderRadius: 2,
            }}
          >
            {/* Tape strip */}
            {item.pin === "tape-tl" && (
              <span
                aria-hidden
                className="absolute -top-3 left-4 h-5 w-16"
                style={{
                  background: "hsl(48 60% 80% / 0.85)",
                  transform: "rotate(-8deg)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                }}
              />
            )}
            {item.pin === "tape-tr" && (
              <span
                aria-hidden
                className="absolute -top-3 right-4 h-5 w-16"
                style={{
                  background: "hsl(48 60% 80% / 0.85)",
                  transform: "rotate(7deg)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                }}
              />
            )}
            {item.pin === "tape-gl" && (
              <span
                aria-hidden
                className="absolute top-6 -left-3 w-5 h-14"
                style={{
                  background: "hsl(40 10% 35% / 0.55)",
                  transform: "rotate(-3deg)",
                }}
              />
            )}
            {item.pin === "tape-gr" && (
              <span
                aria-hidden
                className="absolute top-6 -right-3 w-5 h-14"
                style={{
                  background: "hsl(40 10% 35% / 0.55)",
                  transform: "rotate(3deg)",
                }}
              />
            )}

            {/* Photo */}
            <div className="relative aspect-[4/5] bg-muted overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              {/* faint paper grain on photo */}
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-multiply opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
                  backgroundSize: "3px 3px",
                }}
              />
            </div>

            {/* Polaroid bottom margin: hand-written caption + printed title */}
            <div className="pt-3 pb-1 px-1 text-center">
              <p
                className="leading-none mb-1"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: "hsl(var(--foreground) / 0.55)",
                  fontSize: 18,
                  transform: "rotate(-1deg)",
                }}
              >
                {item.title.toLowerCase()}
              </p>
              <h3 className="font-heading text-xl md:text-2xl text-primary leading-tight tracking-wide">
                {item.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Expanded description + note (click to reveal) */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-out px-2",
            open ? "max-h-56 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0",
          )}
        >
          <p className="font-body text-sm md:text-base text-foreground/80 leading-snug mb-2">
            {item.caption}
          </p>
          <p
            className="text-lg leading-tight inline-block"
            style={{
              fontFamily: "'Caveat', cursive",
              color: noteColor,
              transform: "rotate(-1.5deg)",
            }}
          >
            <span aria-hidden className="mr-1">↳</span>
            {item.note}
          </p>
        </div>
      </button>
    </div>
  );
};

const PolaroidWall = ({
  items,
  jitter = true,
  decorate = true,
  columnsClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: PolaroidWallProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Decorative wall objects + scribbles */}
      {decorate && (
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {scribbles.slice(0, items.length > 6 ? 3 : 1).map((s, i) => (
            <span
              key={i}
              className="absolute select-none"
              style={{
                top: s.top,
                left: s.left,
                color: s.color,
                fontFamily: "'Caveat', cursive",
                fontSize: 22,
                transform: `rotate(${s.rot}deg)`,
                opacity: 0.85,
              }}
            >
              {s.text}
            </span>
          ))}
          {items.length > 6 && (
            <>
              <Stamp style={{ top: "30%", left: "32%" }} />
              <Ticket style={{ top: "58%", left: "44%" }} />
              <Leaf style={{ top: "82%", left: "20%" }} />
              <IndexCard style={{ top: "6%", left: "30%" }} text={"keep these\nin mind"} />
            </>
          )}
          {items.length <= 6 && <Ticket style={{ top: "62%", left: "48%" }} />}
        </div>
      )}

      <div className={cn("relative grid gap-x-6 md:gap-x-10 gap-y-10 md:gap-y-14", columnsClass)}>
        {items.map((item, i) => (
          <FadeIn key={item.id} delay={Math.min(i, 6) * 0.06}>
            <Polaroid
              item={item}
              index={i}
              open={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              jitter={jitter}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default PolaroidWall;
