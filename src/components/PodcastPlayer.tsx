import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import podcastCover from "@/assets/podcast-cover.jpg";

// Replace with the real episode 0 audio URL when available.
const EPISODE_AUDIO_URL =
  "https://twostoriesonecity.com/episode-0.mp3";
const EPISODE_LINK = "https://twostoriesonecity.com";

const formatTime = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const PodcastPlayer = ({ tone = "light" }: { tone?: "light" | "dark" }) => {
  const dark = tone === "dark";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const t = (Number(e.target.value) / 100) * duration;
    a.currentTime = t;
    setCurrent(t);
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-5 md:gap-7 max-w-3xl mx-auto">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause episode" : "Play episode"}
        className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 overflow-hidden rounded-sm shadow-md group"
      >
        <img
          src={podcastCover}
          alt="Two Stories, One City — podcast cover art"
          loading="lazy"
          width={256}
          height={256}
          className="w-full h-full object-cover"
        />
        <span
          className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          style={{
            backgroundColor: dark
              ? "hsl(var(--heritage-green) / 0.55)"
              : "hsl(var(--primary) / 0.5)",
            color: dark ? "hsl(0 0% 98%)" : "hsl(var(--primary-foreground))",
          }}
        >
          {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
        </span>
      </button>

      <div className="flex-1 min-w-0">
        <p
          className="font-body text-xs tracking-widest uppercase mb-1"
          style={{ color: dark ? "hsl(var(--heritage-orange))" : "hsl(var(--secondary))" }}
        >
          The Podcast · Episode 0 out now
        </p>
        <h2
          className="font-heading text-2xl md:text-3xl leading-tight"
          style={{ color: dark ? "hsl(0 0% 98%)" : "hsl(var(--primary))" }}
        >
          Two Stories, One City • AMSTERDAM
        </h2>

        {/* Progress bar */}
        <div className="mt-3 flex items-center gap-3">
          <span
            className="font-body text-xs tabular-nums w-10"
            style={{ color: dark ? "hsl(0 0% 80%)" : "hsl(var(--muted-foreground))" }}
          >
            {formatTime(current)}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={onSeek}
            aria-label="Seek"
            className={`flex-1 h-1 cursor-pointer ${dark ? "" : "accent-secondary"}`}
            style={dark ? { accentColor: "hsl(var(--heritage-orange))" } : undefined}
          />
          <span
            className="font-body text-xs tabular-nums w-10 text-right"
            style={{ color: dark ? "hsl(0 0% 80%)" : "hsl(var(--muted-foreground))" }}
          >
            {formatTime(duration)}
          </span>
        </div>

        <a
          href={EPISODE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 font-body text-sm transition-colors hover:opacity-80"
          style={{ color: dark ? "hsl(0 0% 88%)" : "hsl(var(--muted-foreground))" }}
        >
          Listen at twostoriesonecity.com →
        </a>
      </div>

      <audio ref={audioRef} src={EPISODE_AUDIO_URL} preload="metadata" />
    </div>
  );
};

export default PodcastPlayer;
