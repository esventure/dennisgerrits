import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Story {
  id: string;
  title: string;
  intro: string;
  body: string;
}

interface StoryBookProps {
  stories: Story[];
  initialStoryId?: string;
}

/* A real-feeling notebook resting on the page.
   Two-page spread on tablet/desktop, single page on mobile.
   Page-turn = corner curl. Navigation lives on the book itself
   (dog-ear next, ribbon bookmark = previous / TOC). */
const StoryBook = ({ stories, initialStoryId }: StoryBookProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (initialStoryId) {
      const idx = stories.findIndex((s) => s.id === initialStoryId);
      if (idx >= 0) setCurrentPage(idx);
    }
  }, [initialStoryId, stories]);

  const goTo = useCallback(
    (page: number) => {
      if (page < 0 || page >= stories.length) return;
      setDirection(page > currentPage ? 1 : -1);
      setCurrentPage(page);
      setTocOpen(false);
    },
    [currentPage, stories.length]
  );

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(currentPage + 1);
      else if (e.key === "ArrowLeft") goTo(currentPage - 1);
      else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(stories.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage, stories.length, goTo]);

  const story = stories[currentPage];
  if (!story) return null;

  const leftPageNumber = currentPage * 2 + 12; // arbitrary offset to feel mid-book
  const rightPageNumber = leftPageNumber + 1;

  // Spread enter/exit: subtle paper drift, no full card flip.
  const variants = {
    enter: (dir: number) => ({
      x: reduceMotion ? 0 : dir > 0 ? 24 : -24,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: reduceMotion ? 0 : dir > 0 ? -24 : 24,
      opacity: 0,
    }),
  };

  return (
    <div className="relative">
      {/* Handwritten margin note above the book */}
      <p
        className="text-2xl md:text-3xl mb-6 -rotate-[3deg] pl-2 md:pl-12"
        style={{
          fontFamily: "'Caveat', cursive",
          color: "hsl(var(--heritage-bordeaux))",
        }}
        aria-hidden
      >
        from my notebook —
      </p>

      {/* Cast shadow on the page surface */}
      <div
        aria-hidden
        className="absolute -bottom-6 left-[6%] right-[6%] h-10 rounded-[50%] blur-2xl opacity-40"
        style={{ backgroundColor: "hsl(var(--heritage-dark))" }}
      />

      <div
        className="relative mx-auto max-w-4xl"
        style={{ transform: "rotate(-1.1deg)" }}
        role="group"
        aria-roledescription="book"
        aria-label="Notes from the city, a notebook of short stories"
      >
        {/* Hardcover (linen taupe) — sits behind and around the pages */}
        <div
          className="absolute -inset-3 md:-inset-4 rounded-[6px]"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--heritage-taupe)) 0%, hsl(var(--heritage-taupe-soft)) 50%, hsl(var(--heritage-taupe)) 100%)",
            boxShadow:
              "inset 0 0 0 1px hsl(var(--heritage-bordeaux) / 0.25), inset 0 0 30px hsl(var(--heritage-dark) / 0.15), 0 18px 40px -18px hsl(var(--heritage-dark) / 0.45)",
          }}
        >
          {/* Linen weave texture */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18] rounded-[6px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, hsl(var(--heritage-dark) / 0.08) 0 1px, transparent 1px 3px), repeating-linear-gradient(-45deg, hsl(var(--heritage-dark) / 0.06) 0 1px, transparent 1px 3px)",
            }}
          />
          {/* Foil title on top edge */}
          <p
            className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] md:text-xs tracking-[0.4em] uppercase font-body"
            style={{ color: "hsl(var(--heritage-orange))" }}
            aria-hidden
          >
            Notes from the City · D.G.
          </p>
        </div>

        {/* Stacked page edges (top & bottom & outer) */}
        <div
          aria-hidden
          className="absolute -top-1.5 left-3 right-3 h-1.5 rounded-t-sm"
          style={{
            background:
              "repeating-linear-gradient(90deg, hsl(40 30% 96%) 0 2px, hsl(35 22% 88%) 2px 3px)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-1.5 left-3 right-3 h-1.5 rounded-b-sm"
          style={{
            background:
              "repeating-linear-gradient(90deg, hsl(40 30% 96%) 0 2px, hsl(35 22% 86%) 2px 3px)",
          }}
        />

        {/* Ribbon bookmark — also acts as TOC trigger / previous */}
        <button
          type="button"
          onClick={() => setTocOpen((v) => !v)}
          aria-label={tocOpen ? "Close table of contents" : "Open table of contents"}
          className="absolute -top-3 right-10 md:right-16 z-20 group"
          style={{ width: "22px" }}
        >
          <div
            className="relative"
            style={{
              width: "22px",
              height: `${72 + (currentPage / Math.max(1, stories.length - 1)) * 60}px`,
              transition: "height 400ms ease-out",
              backgroundColor: "hsl(var(--heritage-bordeaux))",
              boxShadow:
                "1px 0 2px hsl(var(--heritage-dark) / 0.3), inset -2px 0 0 hsl(var(--heritage-dark) / 0.2)",
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%)",
            }}
          />
        </button>

        {/* Spread */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-2 rounded-[3px] overflow-hidden min-h-[520px] md:min-h-[560px]"
          style={{
            background: "linear-gradient(135deg, hsl(40 30% 96%), hsl(35 25% 93%))",
            boxShadow:
              "inset 0 0 80px hsl(30 20% 80% / 0.5), 0 2px 0 hsl(0 0% 100% / 0.6)",
          }}
        >
          {/* Center gutter shadow */}
          <div
            aria-hidden
            className="hidden md:block absolute inset-y-0 left-1/2 w-12 -translate-x-1/2 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--heritage-dark) / 0.18) 50%, transparent)",
            }}
          />

          {/* Faint ruled lines */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 31px, hsl(0 0% 30%) 31px 32px)",
              backgroundPosition: "0 90px",
            }}
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="contents"
            >
              {/* LEFT PAGE — title + intro */}
              <div className="relative p-8 md:p-10 lg:p-14 flex flex-col">
                <p
                  className="text-base mb-6 -rotate-[2deg]"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    color: "hsl(var(--heritage-bordeaux))",
                  }}
                >
                  chapter {currentPage + 1}
                </p>
                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary leading-[1.05] mb-6">
                  {story.title}
                </h3>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "hsl(var(--heritage-bordeaux) / 0.3)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "hsl(var(--heritage-orange))" }}
                  >
                    ✦
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "hsl(var(--heritage-bordeaux) / 0.3)" }}
                  />
                </div>
                <p className="font-body text-base md:text-lg italic leading-relaxed text-foreground/85 flex-1">
                  {story.intro}
                </p>
                <p
                  className="text-xs tracking-widest mt-8 self-start"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "1rem",
                    color: "hsl(var(--heritage-bordeaux) / 0.6)",
                  }}
                  aria-hidden
                >
                  {leftPageNumber}
                </p>
              </div>

              {/* RIGHT PAGE — body + signature */}
              <div className="relative p-8 md:p-10 lg:p-14 flex flex-col border-t md:border-t-0 md:border-l border-foreground/5">
                <p className="font-body text-base md:text-[17px] text-foreground/85 leading-[1.85] flex-1 first-letter:font-heading first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-[0.9] first-letter:text-primary">
                  {story.body}
                </p>
                <p
                  className="text-xl md:text-2xl mt-6 self-end -rotate-[4deg]"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    color: "hsl(var(--heritage-bordeaux))",
                  }}
                  aria-hidden
                >
                  — D.
                </p>
                <p
                  className="text-xs tracking-widest mt-2 self-end"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "1rem",
                    color: "hsl(var(--heritage-bordeaux) / 0.6)",
                  }}
                  aria-hidden
                >
                  {rightPageNumber}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* TOC overlay */}
          <AnimatePresence>
            {tocOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-20 flex items-stretch"
              >
                <div
                  className="hidden md:block w-1/2"
                  style={{ backgroundColor: "transparent" }}
                  onClick={() => setTocOpen(false)}
                />
                <div
                  className="w-full md:w-1/2 p-8 md:p-10 lg:p-14 overflow-y-auto"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(40 30% 96%), hsl(35 25% 93%))",
                  }}
                >
                  <p
                    className="text-base mb-6 -rotate-[2deg]"
                    style={{
                      fontFamily: "'Caveat', cursive",
                      color: "hsl(var(--heritage-bordeaux))",
                    }}
                  >
                    contents
                  </p>
                  <ul className="space-y-3">
                    {stories.map((s, i) => (
                      <li key={s.id}>
                        <button
                          onClick={() => goTo(i)}
                          className={cn(
                            "text-left font-body w-full transition-colors",
                            i === currentPage
                              ? "text-primary font-medium"
                              : "text-foreground/70 hover:text-primary"
                          )}
                        >
                          <span
                            className="inline-block w-8 text-xs tracking-widest"
                            style={{ color: "hsl(var(--heritage-orange))" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-base md:text-lg">{s.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dog-ear corner — primary "next" affordance */}
          {currentPage < stories.length - 1 && (
            <button
              type="button"
              onClick={() => goTo(currentPage + 1)}
              aria-label="Turn to next story"
              className="group absolute bottom-0 right-0 z-30"
              style={{ width: "64px", height: "64px" }}
            >
              <div
                className="absolute inset-0 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 50%, hsl(35 22% 88%) 50%, hsl(30 18% 80%) 100%)",
                  boxShadow:
                    "-3px -3px 6px hsl(var(--heritage-dark) / 0.12)",
                }}
              />
            </button>
          )}

          {/* Previous corner (subtle, bottom-left) */}
          {currentPage > 0 && (
            <button
              type="button"
              onClick={() => goTo(currentPage - 1)}
              aria-label="Turn to previous story"
              className="group absolute bottom-0 left-0 z-30"
              style={{ width: "44px", height: "44px" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "linear-gradient(225deg, transparent 50%, hsl(35 22% 90%) 50%, hsl(30 18% 84%) 100%)",
                  boxShadow:
                    "3px -3px 6px hsl(var(--heritage-dark) / 0.1)",
                }}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryBook;
