import { SkipForward, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CLASSICAL, playlistFor, placeCountry, type Track } from "@/lib/music";
import type { Place } from "@/lib/geocode";
import { cn } from "@/lib/utils";

const MUTE_KEY = "meridian-mute-v2";

export function AudioBed({ place }: { place: Place | null }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [mode, setMode] = useState<"classical" | "country">("classical");
  const [idx, setIdx] = useState(0);
  const [kick, setKick] = useState(0);
  const [countryTracks, setCountryTracks] = useState<Track[]>([]);
  const country = placeCountry(place);
  const list = mode === "country" && countryTracks.length ? countryTracks : CLASSICAL;
  const track = list[idx % list.length] ?? CLASSICAL[0];

  useEffect(() => {
    try {
      localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [muted]);

  useEffect(() => {
    if (!country) {
      setCountryTracks([]);
      setMode("classical");
      setIdx(0);
      return;
    }
    setCountryTracks(playlistFor(country));
    setMode("country");
    setIdx(0);
    setKick((k) => k + 1);
  }, [country]);

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    el.volume = 0.34;
    if (muted) {
      el.pause();
      return;
    }
    try {
      if (el.ended || el.paused) el.currentTime = 0;
    } catch {
      /* ignore */
    }
    el.play().catch(() => {});
  }, [muted, track.id, idx, kick]);

  function next() {
    setIdx((i) => i + 1);
    setKick((k) => k + 1);
  }

  return (
    <div className="music-deck pointer-events-auto">
      <audio ref={audio} src={track.src} preload="auto" onEnded={next} />
      <button
        type="button"
        className={cn("paint-chip music-btn", !muted && "paint-live text-brand")}
        aria-label={muted ? "Unmute" : "Mute"}
        onClick={() => setMuted((m) => !m)}
      >
        {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
        <span>MUTE</span>
      </button>
      <button
        type="button"
        className={cn("paint-chip music-now", mode === "classical" && "paint-live")}
        onClick={() => {
          setMode("classical");
          setIdx(0);
          setKick((k) => k + 1);
        }}
      >
        <span className="music-mode">CLASSICAL</span>
        <span className="music-title">{mode === "classical" ? track.composer : "Bach"}</span>
      </button>
      <button
        type="button"
        className={cn("paint-chip music-now", mode === "country" && country && "paint-live")}
        disabled={!country}
        onClick={() => {
          if (!country || !countryTracks.length) return;
          setMode("country");
          setIdx(0);
          setKick((k) => k + 1);
        }}
      >
        <span className="music-mode">{country ? country : "COUNTRY"}</span>
        <span className="music-title">{country ? (mode === "country" ? track.title : "Play") : "—"}</span>
      </button>
      <button type="button" className="paint-chip music-btn" aria-label="Next track" onClick={next}>
        <SkipForward className="size-3.5" />
        <span>NEXT</span>
      </button>
    </div>
  );
}
