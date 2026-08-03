import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Move, ZoomIn, RotateCcw } from "lucide-react";
import FadeIn from "./FadeIn";
import RichText from "./RichText";
import { useSiteContent } from "@/hooks/useSiteContent";
import { lovableAssetUrl } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────
   Two icon-less variations of the About / "Person & Guide"
   section. Same content, different editorial treatment, so
   Dennis can pick which composition feels most like him.
   ──────────────────────────────────────────────────────────── */

const PERSON_FALLBACK =
  "I have always been drawn to stories, people and places that move you in some way.\n\nAmsterdam became that place for me. I’ve called this city home for more than twenty years now, and over time it became an integral part of who I am.\n\nThis city gave me freedom. It connected me to the world and shaped me into the person I am today. Curious, creative and fascinated by culture, art, architecture, nature, and the rhythm of life.";
const GUIDE_FALLBACK =
  "For me, discovering places should feel personal, relaxed and natural. More like spending time with a local friend.\n\nI always listen first. Every person experiences a place differently, which is why I take the time to understand who you are and what inspires you.\n\nI carefully shape each day around you, creating experiences that feel meaningful. More than anything, I’m simply somebody who walks beside you during your trip.";

import dennisPersonAsset from "@/assets/dennis-person-original.jpg.asset.json";
import dennisGuideAsset from "@/assets/dennis-guide-original.jpg.asset.json";
const dennisPersonBike = lovableAssetUrl(dennisPersonAsset.url);
const dennisGuideHands = lovableAssetUrl(dennisGuideAsset.url);


/* ── Photo adjustment helpers ── */
type PhotoSetting = { x: number; y: number; zoom: number; rotate: number; ratio: number };
type PhotoAdjustments = {
  person: PhotoSetting;
  guide: PhotoSetting;
};

const ASPECT_PRESETS = [
  { label: "4:5", value: 4 / 5 },
  { label: "1:1", value: 1 },
  { label: "3:2", value: 3 / 2 },
  { label: "16:9", value: 16 / 9 },
] as const;

const DEFAULT_ADJUSTMENTS: PhotoAdjustments = {
  person: { x: 50, y: 55, zoom: 100, rotate: 0, ratio: 4 / 5 },
  guide: { x: 72, y: 48, zoom: 100, rotate: 0, ratio: 4 / 5 },
};


const STORAGE_KEY = "about-photo-adjustments-v4";

const loadAdjustments = (): PhotoAdjustments => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ADJUSTMENTS;
    const parsed = JSON.parse(raw);
    return {
      person: { ...DEFAULT_ADJUSTMENTS.person, ...parsed.person },
      guide: { ...DEFAULT_ADJUSTMENTS.guide, ...parsed.guide },
    };
  } catch {
    return DEFAULT_ADJUSTMENTS;
  }
};

const saveAdjustments = (a: PhotoAdjustments) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    // ignore
  }
};

/* ── Variation A — Editorial split with photo backgrounds ── */
const AboutEditorial = () => {
  const t = useSiteContent();
  const [adjustments, setAdjustments] = useState<PhotoAdjustments>(loadAdjustments);
  const [editing, setEditing] = useState(false);

  const updatePhoto = useCallback(
    (photo: keyof PhotoAdjustments, key: keyof PhotoAdjustments["person"], value: number) => {
      setAdjustments((prev) => {
        const next = { ...prev, [photo]: { ...prev[photo], [key]: value } };
        saveAdjustments(next);
        return next;
      });
    },
    []
  );

  const resetPhotos = useCallback(() => {
    setAdjustments(DEFAULT_ADJUSTMENTS);
    saveAdjustments(DEFAULT_ADJUSTMENTS);
  }, []);

  const showEditor =
    import.meta.env.DEV ||
    new URLSearchParams(window.location.search).has("edit-photos") ||
    localStorage.getItem("about-photo-editor-enabled") === "true";

  return (
    <div>
      {/* The Person: photo left, text right. Compact fixed section heights. */}
      <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] bg-background">
        <div className="relative order-first h-[18rem] sm:h-[22rem] lg:h-[28rem] overflow-hidden">
          <img
            src={dennisPersonBike}
            alt="Dennis Gerrits sitting on his bicycle on an Amsterdam bridge"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: `${adjustments.person.x}% ${adjustments.person.y}%`,
              transform: `scale(${adjustments.person.zoom / 100}) rotate(${adjustments.person.rotate}deg)`,
              transformOrigin: `${adjustments.person.x}% ${adjustments.person.y}%`,
            }}
            loading="lazy"
          />
        </div>
        <div className="flex items-center px-6 sm:px-10 md:px-16 lg:pl-10 lg:pr-[max(5rem,calc((100vw-80rem)/2+3rem))] py-10 sm:py-14 lg:py-18">
          <FadeIn className="relative z-10 w-full">
            <div className="max-w-lg">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-accent font-semibold mb-4">
              {t("about.person.kicker", "A True Amsterdammer")}
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-foreground leading-[0.95] mb-6">
              {t("about.person.title", "The Person")}
            </h2>

            {/* hand-drawn orange underline */}
            <svg aria-hidden width="96" height="10" viewBox="0 0 96 10" className="mb-6">
              <path
                d="M 2 6 Q 16 1, 32 5 T 64 5 T 94 4"
                fill="none"
                stroke="hsl(var(--heritage-orange))"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <RichText
              className="font-body text-base md:text-lg text-foreground/85 leading-relaxed"
              html={t("about.person.body", "")}
              fallback={PERSON_FALLBACK}
            />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* The Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] bg-primary">
        <div className="flex items-center px-6 sm:px-10 md:px-16 lg:pl-[max(5rem,calc((100vw-80rem)/2+3rem))] lg:pr-10 py-10 sm:py-14 lg:py-18">
          <FadeIn delay={0.15} className="relative z-10 w-full">
            <div className="max-w-lg">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-accent font-semibold mb-4">
              {t("about.guide.kicker", "Helping you find your own way")}
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-[0.95] mb-6">
              {t("about.guide.title", "The Guide")}
            </h2>

            {/* hand-drawn orange underline */}
            <svg aria-hidden width="96" height="10" viewBox="0 0 96 10" className="mb-6">
              <path
                d="M 2 6 Q 16 1, 32 5 T 64 5 T 94 4"
                fill="none"
                stroke="hsl(var(--heritage-orange))"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <RichText
              className="font-body text-base md:text-lg text-primary-foreground/90 leading-relaxed"
              html={t("about.guide.body", "")}
              fallback={GUIDE_FALLBACK}
            />
            </div>
          </FadeIn>
        </div>
        <div className="relative order-first lg:order-none h-[18rem] sm:h-[22rem] lg:h-[28rem] overflow-hidden">
          <img
            src={dennisGuideHands}
            alt="Dennis Gerrits sharing a story while guiding in Amsterdam"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition: `${adjustments.guide.x}% ${adjustments.guide.y}%`,
              transform: `scale(${adjustments.guide.zoom / 100}) rotate(${adjustments.guide.rotate}deg)`,
              transformOrigin: `${adjustments.guide.x}% ${adjustments.guide.y}%`,
            }}
            loading="lazy"
          />
        </div>
      </div>

      {showEditor && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="rounded-full px-4 py-2 text-sm font-body font-medium shadow-lg transition-transform hover:scale-105"
            style={{
              backgroundColor: "hsl(var(--heritage-orange))",
              color: "hsl(var(--primary))",
            }}
            aria-expanded={editing}
          >
            {editing ? "Close photo editor" : "Edit photos"}
          </button>

          {editing && (
            <div
              className="w-72 sm:w-80 rounded-lg p-4 shadow-xl"
              style={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--heritage-taupe))",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading text-lg text-primary">Photo position</span>
                <button
                  type="button"
                  onClick={resetPhotos}
                  className="flex items-center gap-1 text-xs font-body font-medium text-secondary hover:text-primary"
                  title="Reset to defaults"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {(["person", "guide"] as const).map((photo) => (
                <div key={photo} className="mb-4 last:mb-0">
                  <p className="font-body text-xs uppercase tracking-wider text-secondary mb-2">
                    {photo === "person" ? "The Person" : "The Guide"}
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-body text-foreground/80">
                      <Move className="w-3 h-3 shrink-0" />
                      Horizontal
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={adjustments[photo].x}
                        onChange={(e) => updatePhoto(photo, "x", Number(e.target.value))}
                        className="flex-1 accent-orange-500"
                        style={{ accentColor: "hsl(var(--heritage-orange))" }}
                      />
                      <span className="w-8 text-right tabular-nums">{adjustments[photo].x}</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-body text-foreground/80">
                      <Move className="w-3 h-3 shrink-0" />
                      Vertical
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={adjustments[photo].y}
                        onChange={(e) => updatePhoto(photo, "y", Number(e.target.value))}
                        className="flex-1"
                        style={{ accentColor: "hsl(var(--heritage-orange))" }}
                      />
                      <span className="w-8 text-right tabular-nums">{adjustments[photo].y}</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-body text-foreground/80">
                      <ZoomIn className="w-3 h-3 shrink-0" />
                      Zoom
                      <input
                        type="range"
                        min={100}
                        max={200}
                        value={adjustments[photo].zoom}
                        onChange={(e) => updatePhoto(photo, "zoom", Number(e.target.value))}
                        className="flex-1"
                        style={{ accentColor: "hsl(var(--heritage-orange))" }}
                      />
                      <span className="w-8 text-right tabular-nums">{adjustments[photo].zoom}</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-body text-foreground/80">
                      <RotateCcw className="w-3 h-3 shrink-0" />
                      Rotate
                      <input
                        type="range"
                        min={-15}
                        max={15}
                        step={0.5}
                        value={adjustments[photo].rotate}
                        onChange={(e) => updatePhoto(photo, "rotate", Number(e.target.value))}
                        className="flex-1"
                        style={{ accentColor: "hsl(var(--heritage-orange))" }}
                      />
                      <span className="w-8 text-right tabular-nums">{adjustments[photo].rotate}</span>
                    </label>
                  </div>
                </div>
              ))}

              <p className="mt-3 text-[10px] font-body text-foreground/50 leading-snug">
                Adjustments are saved in your browser. Share the values below if you want them applied to the site.
              </p>
              <pre
                className="mt-1 text-[10px] font-mono p-2 rounded overflow-x-auto"
                style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}
              >
                {JSON.stringify(adjustments, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Variation B — Magazine letter, single column ────────── */
const AboutLetter = () => {
  const t = useSiteContent();
  return (
    <div
      className="px-5 sm:px-6 md:px-12 py-14 sm:py-20 lg:py-28 min-h-[70vh] flex items-center"
      style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}
    >
      <div
        className="container mx-auto max-w-3xl rounded-sm bg-background/60 px-5 sm:px-6 md:px-12 py-10 sm:py-16 lg:py-20"
        style={{ border: "3px solid hsl(var(--heritage-orange))" }}
      >
        <FadeIn>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary text-center mb-8">
            About me
          </p>

          {/* The Person */}
          <div className="mb-12 sm:mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-3 text-center">
              {t("about.person.title", "The Person")}
            </h2>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary text-center mb-6">
              {t("about.person.kicker", "A True Amsterdammer")}
            </p>
            <RichText
              className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed text-center"
              html={t("about.person.body", "")}
              fallback={PERSON_FALLBACK}
            />
          </div>

          {/* Hand-drawn divider */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <svg
              aria-hidden
              viewBox="0 0 200 14"
              className="w-40 h-4"
            >
              <path
                d="M 6 8 C 50 2, 150 12, 194 6"
                stroke="hsl(var(--heritage-orange))"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* The Guide */}
          <div>
            <h2
              className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-3 text-center"
              style={{ color: "hsl(var(--heritage-bordeaux))" }}
            >
              {t("about.guide.title", "The Guide")}
            </h2>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary text-center mb-6">
              {t("about.guide.kicker", "Helping you find your own way")}
            </p>
            <RichText
              className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed text-center"
              html={t("about.guide.body", "")}
              fallback={GUIDE_FALLBACK}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

/* ── Variation C — Two hand-drawn people (logo-style figures) ── */
import dennisPersonLine from "@/assets/dennis-person-line.png";
import dennisGuideLine from "@/assets/dennis-guide-line.png";

const AboutFigures = () => {
  const t = useSiteContent();
  return (
    <div className="px-5 sm:px-6 md:px-12 py-14 sm:py-20 lg:py-28 min-h-[70vh] flex items-center">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* The Person */}
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div
              className="rounded-full p-6 mb-6 flex items-center justify-center border-2"
              style={{ borderColor: "hsl(var(--heritage-bordeaux) / 0.4)" }}
            >
              <img
                src={dennisPersonLine}
                alt="Hand-drawn figure of Dennis the person"
                className="w-44 md:w-60 h-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-3">
              {t("about.person.kicker", "A True Amsterdammer")}
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-4">
              {t("about.person.title", "The Person")}
            </h2>
            <div className="w-12 h-0.5 bg-accent mb-5" />
            <RichText
              className="font-body text-base md:text-lg text-foreground/80 leading-relaxed max-w-md"
              html={t("about.person.body", "")}
              fallback={PERSON_FALLBACK}
            />
          </div>
        </FadeIn>

        {/* The Guide */}
        <FadeIn delay={0.15}>
          <div className="flex flex-col items-center text-center">
            <div
              className="rounded-full p-6 mb-6 flex items-center justify-center"
              style={{ backgroundColor: "hsl(var(--heritage-purple) / 0.18)" }}
            >
              <img
                src={dennisGuideLine}
                alt="Hand-drawn figure of Dennis the guide"
                className="w-44 md:w-60 h-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-3">
              {t("about.guide.kicker", "Helping you find your own way")}
            </p>
            <h2
              className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-4"
              style={{ color: "hsl(var(--heritage-bordeaux))" }}
            >
              {t("about.guide.title", "The Guide")}
            </h2>
            <div
              className="w-12 h-0.5 mb-5"
              style={{ backgroundColor: "hsl(var(--heritage-bordeaux))" }}
            />
            <RichText
              className="font-body text-base md:text-lg text-foreground/80 leading-relaxed max-w-md"
              html={t("about.guide.body", "")}
              fallback={GUIDE_FALLBACK}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

/* ── Editable photo canvas: drag to pan, wheel/pinch to zoom ── */
const EditablePhoto = ({
  src,
  alt,
  setting,
  editable,
  onChange,
}: {
  src: string;
  alt: string;
  setting: PhotoSetting;
  editable: boolean;
  onChange: (patch: Partial<PhotoSetting>) => void;
}) => {
  const containerRef = useState<{ el: HTMLDivElement | null }>({ el: null })[0];
  const stateRef = useRef(setting);
  stateRef.current = setting;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const editableRef = useRef(editable);
  editableRef.current = editable;
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!editableRef.current) return;
      e.preventDefault();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const next = Math.min(300, Math.max(100, stateRef.current.zoom * Math.exp(-dy * 0.0015)));
      onChangeRef.current({ zoom: Math.round(next) });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!editable) return;
    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = { x: e.clientX, y: e.clientY, w: rect.width, h: rect.height };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!editable || !d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    dragRef.current = { ...d, x: e.clientX, y: e.clientY };
    const s = stateRef.current;
    onChangeRef.current({
      x: Math.round(Math.min(150, Math.max(-50, s.x - (dx / d.w) * 100))),
      y: Math.round(Math.min(150, Math.max(-50, s.y - (dy / d.h) * 100))),
    });
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  void containerRef;

  return (
    <div
      ref={nodeRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: String(setting.ratio),
        cursor: editable ? "grab" : undefined,
        touchAction: editable ? "none" : undefined,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover select-none"
        style={{
          objectPosition: `${setting.x}% ${setting.y}%`,
          transform: `scale(${setting.zoom / 100}) rotate(${setting.rotate}deg)`,
          transformOrigin: `${setting.x}% ${setting.y}%`,
        }}
        draggable={false}
        loading="lazy"
      />
      {editable && (
        <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-[hsl(var(--heritage-orange))]/70" />
      )}
    </div>
  );
};

/* ── Variation D — Vertical profile cards, magazine contributor style ── */
const AboutProfileCards = () => {
  const t = useSiteContent();
  const [adjustments, setAdjustments] = useState<PhotoAdjustments>(loadAdjustments);
  const [editing, setEditing] = useState(false);

  const updatePhoto = useCallback(
    (photo: keyof PhotoAdjustments, patch: Partial<PhotoSetting>) => {
      setAdjustments((prev) => {
        const next = { ...prev, [photo]: { ...prev[photo], ...patch } };
        saveAdjustments(next);
        return next;
      });
    },
    []
  );

  const resetPhotos = useCallback(() => {
    setAdjustments(DEFAULT_ADJUSTMENTS);
    saveAdjustments(DEFAULT_ADJUSTMENTS);
  }, []);

  const showEditor =
    import.meta.env.DEV ||
    new URLSearchParams(window.location.search).has("edit-photos") ||
    localStorage.getItem("about-photo-editor-enabled") === "true";

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* The Person — text first, photo below */}
        <div className="bg-background flex flex-col">
          <div className="flex-1 flex items-center px-6 sm:px-10 md:px-12 py-10 sm:py-14 lg:py-18">
            <FadeIn className="w-full">
              <div className="max-w-md mx-auto">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-accent font-semibold mb-4">
                  {t("about.person.kicker", "A True Amsterdammer")}
                </p>
                <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-foreground leading-[0.95] mb-6">
                  {t("about.person.title", "The Person")}
                </h2>

                {/* hand-drawn orange underline */}
                <svg aria-hidden width="96" height="10" viewBox="0 0 96 10" className="mb-6">
                  <path
                    d="M 2 6 Q 16 1, 32 5 T 64 5 T 94 4"
                    fill="none"
                    stroke="hsl(var(--heritage-orange))"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <RichText
                  className="font-body text-base md:text-lg text-foreground/85 leading-relaxed"
                  html={t("about.person.body", "")}
                  fallback={PERSON_FALLBACK}
                />
              </div>
            </FadeIn>
          </div>
          <EditablePhoto
            src={dennisPersonBike}
            alt="Dennis Gerrits sitting on his bicycle on an Amsterdam bridge"
            setting={adjustments.person}
            editable={showEditor && editing}
            onChange={(patch) => updatePhoto("person", patch)}
          />
        </div>

        {/* The Guide — text first, photo below */}
        <div className="bg-primary flex flex-col">
          <div className="flex-1 flex items-center px-6 sm:px-10 md:px-12 py-10 sm:py-14 lg:py-18">
            <FadeIn delay={0.15} className="w-full">
              <div className="max-w-md mx-auto">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-accent font-semibold mb-4">
                  {t("about.guide.kicker", "Helping you find your own way")}
                </p>
                <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-[0.95] mb-6">
                  {t("about.guide.title", "The Guide")}
                </h2>

                {/* hand-drawn orange underline */}
                <svg aria-hidden width="96" height="10" viewBox="0 0 96 10" className="mb-6">
                  <path
                    d="M 2 6 Q 16 1, 32 5 T 64 5 T 94 4"
                    fill="none"
                    stroke="hsl(var(--heritage-orange))"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <RichText
                  className="font-body text-base md:text-lg text-primary-foreground/90 leading-relaxed"
                  html={t("about.guide.body", "")}
                  fallback={GUIDE_FALLBACK}
                />
              </div>
            </FadeIn>
          </div>
          <EditablePhoto
            src={dennisGuideHands}
            alt="Dennis Gerrits sharing a story while guiding in Amsterdam"
            setting={adjustments.guide}
            editable={showEditor && editing}
            onChange={(patch) => updatePhoto("guide", patch)}
          />
        </div>
      </div>

      {showEditor && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="rounded-full px-4 py-2 text-sm font-body font-medium shadow-lg transition-transform hover:scale-105"
            style={{
              backgroundColor: "hsl(var(--heritage-orange))",
              color: "hsl(var(--primary))",
            }}
            aria-expanded={editing}
          >
            {editing ? "Close photo editor" : "Edit photos"}
          </button>

          {editing && (
            <div
              className="w-72 sm:w-80 max-h-[75vh] overflow-y-auto rounded-lg p-4 shadow-xl"
              style={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--heritage-taupe))",
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading text-lg text-primary">Photo editor</span>
                <button
                  type="button"
                  onClick={resetPhotos}
                  className="flex items-center gap-1 text-xs font-body font-medium text-secondary hover:text-primary"
                  title="Reset to defaults"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>
              <p className="mb-3 text-[10px] font-body text-foreground/50 leading-snug">
                Drag a photo to move it, scroll or pinch on it to zoom. Sliders update live.
              </p>

              {(["person", "guide"] as const).map((photo) => (
                <div key={photo} className="mb-4 last:mb-0">
                  <p className="font-body text-xs uppercase tracking-wider text-secondary mb-2">
                    {photo === "person" ? "The Person" : "The Guide"}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {ASPECT_PRESETS.map((preset) => {
                      const active = Math.abs(adjustments[photo].ratio - preset.value) < 0.001;
                      return (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => updatePhoto(photo, { ratio: preset.value })}
                          className="rounded px-2 py-1 text-[10px] font-body font-medium border transition-colors"
                          style={{
                            borderColor: "hsl(var(--heritage-taupe))",
                            backgroundColor: active
                              ? "hsl(var(--heritage-orange))"
                              : "transparent",
                            color: active ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                          }}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-body text-foreground/80">
                      <Move className="w-3 h-3 shrink-0" />
                      Horizontal
                      <input
                        type="range"
                        min={-50}
                        max={150}
                        value={adjustments[photo].x}
                        onChange={(e) => updatePhoto(photo, { x: Number(e.target.value) })}
                        className="flex-1"
                        style={{ accentColor: "hsl(var(--heritage-orange))" }}
                      />
                      <span className="w-8 text-right tabular-nums">{adjustments[photo].x}</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-body text-foreground/80">
                      <Move className="w-3 h-3 shrink-0" />
                      Vertical
                      <input
                        type="range"
                        min={-50}
                        max={150}
                        value={adjustments[photo].y}
                        onChange={(e) => updatePhoto(photo, { y: Number(e.target.value) })}
                        className="flex-1"
                        style={{ accentColor: "hsl(var(--heritage-orange))" }}
                      />
                      <span className="w-8 text-right tabular-nums">{adjustments[photo].y}</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-body text-foreground/80">
                      <ZoomIn className="w-3 h-3 shrink-0" />
                      Zoom
                      <input
                        type="range"
                        min={100}
                        max={300}
                        value={adjustments[photo].zoom}
                        onChange={(e) => updatePhoto(photo, { zoom: Number(e.target.value) })}
                        className="flex-1"
                        style={{ accentColor: "hsl(var(--heritage-orange))" }}
                      />
                      <span className="w-8 text-right tabular-nums">{adjustments[photo].zoom}</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-body text-foreground/80">
                      <RotateCcw className="w-3 h-3 shrink-0" />
                      Rotate
                      <input
                        type="range"
                        min={-15}
                        max={15}
                        step={0.5}
                        value={adjustments[photo].rotate}
                        onChange={(e) => updatePhoto(photo, { rotate: Number(e.target.value) })}
                        className="flex-1"
                        style={{ accentColor: "hsl(var(--heritage-orange))" }}
                      />
                      <span className="w-8 text-right tabular-nums">{adjustments[photo].rotate}</span>
                    </label>
                  </div>
                </div>
              ))}

              <p className="mt-3 text-[10px] font-body text-foreground/50 leading-snug">
                Adjustments are saved in your browser. Share the values below if you want them applied to the site.
              </p>
              <pre
                className="mt-1 text-[10px] font-mono p-2 rounded overflow-x-auto"
                style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}
              >
                {JSON.stringify(adjustments, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const slides = [
  { key: "editorial", label: "Editorial Split", render: () => <AboutEditorial /> },
  { key: "letter", label: "Magazine Letter", render: () => <AboutLetter /> },
  { key: "figures", label: "Drawn Figures", render: () => <AboutFigures /> },
  { key: "profile-cards", label: "Profile Cards", render: () => <AboutProfileCards /> },
];

const AboutCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 30,
  });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="about" className="relative scroll-mt-20">
      <AboutProfileCards />
    </section>
  );
};

export default AboutCarousel;
