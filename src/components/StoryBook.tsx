import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const StoryBook = ({ stories, initialStoryId }: StoryBookProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (initialStoryId) {
      const idx = stories.findIndex((s) => s.id === initialStoryId);
      if (idx >= 0) setCurrentPage(idx);
    }
  }, [initialStoryId, stories]);

  const goTo = (page: number) => {
    if (page < 0 || page >= stories.length) return;
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  };

  const story = stories[currentPage];
  if (!story) return null;

  const variants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Book container */}
      <div
        className="relative rounded-sm overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        {/* Book cover / spine effect */}
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-primary/20 to-transparent z-10 rounded-l-sm" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: direction > 0 ? "left center" : "right center" }}
            className="relative"
          >
            {/* Page */}
            <div
              className="relative p-10 md:p-16 min-h-[480px] md:min-h-[560px] flex flex-col"
              style={{
                background: "linear-gradient(135deg, hsl(40 30% 96%), hsl(35 25% 93%))",
                boxShadow:
                  "inset 0 0 60px hsl(30 20% 88% / 0.5), 4px 4px 20px hsl(0 0% 0% / 0.1), 8px 8px 40px hsl(0 0% 0% / 0.05)",
              }}
            >
              {/* Page texture lines */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 31px, hsl(0 0% 50%) 31px, hsl(0 0% 50%) 32px)",
                  backgroundPosition: "0 80px",
                }}
              />

              {/* Page number */}
              <p className="font-body text-xs text-muted-foreground/60 mb-8 tracking-widest uppercase">
                Story {currentPage + 1} of {stories.length}
              </p>

              {/* Title */}
              <h3 className="font-heading text-3xl md:text-4xl text-primary leading-tight mb-6">
                {story.title}
              </h3>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-secondary/20" />
                <span className="text-secondary/40 text-sm">✦</span>
                <div className="h-px flex-1 bg-secondary/20" />
              </div>

              {/* Intro */}
              <p className="font-body text-base md:text-lg text-muted-foreground italic leading-relaxed mb-6">
                {story.intro}
              </p>

              {/* Body */}
              <p className="font-body text-base text-foreground/85 leading-[1.9] flex-1">
                {story.body}
              </p>

              {/* Page curl effect */}
              <div
                className="absolute bottom-0 right-0 w-12 h-12"
                style={{
                  background: "linear-gradient(135deg, transparent 50%, hsl(30 15% 88%) 50%, hsl(35 20% 85%) 100%)",
                  boxShadow: "-2px -2px 4px hsl(0 0% 0% / 0.05)",
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 0}
          className={cn(
            "flex items-center gap-2 font-body text-sm transition-all duration-200",
            currentPage === 0
              ? "text-muted-foreground/30 cursor-not-allowed"
              : "text-primary hover:text-secondary"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous story
        </button>

        {/* Page dots */}
        <div className="flex items-center gap-2">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === currentPage
                  ? "bg-secondary w-6"
                  : "bg-border hover:bg-secondary/40"
              )}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === stories.length - 1}
          className={cn(
            "flex items-center gap-2 font-body text-sm transition-all duration-200",
            currentPage === stories.length - 1
              ? "text-muted-foreground/30 cursor-not-allowed"
              : "text-primary hover:text-secondary"
          )}
        >
          Next story
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StoryBook;
