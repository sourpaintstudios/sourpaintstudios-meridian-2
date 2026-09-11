import { useEffect, useRef, useState } from "react";

const KEY = "meridian-intro-v46";
const MAX_MS = 10800;
const FADE_MS = 480;
let INTRO_DONE = false;

export function introAlready() {
  if (INTRO_DONE) return true;
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroDone() {
  INTRO_DONE = true;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
}

export function LoaderSplash({ ready, onDone }: { ready: boolean; onDone: () => void }) {
  const [out, setOut] = useState(false);
  const [pct, setPct] = useState(0);
  const [needTap, setNeedTap] = useState(false);
  const readyRef = useRef(ready);
  const done = useRef(false);
  const videoEnded = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const walkRef = useRef<HTMLAudioElement>(null);
  const playing = useRef(false);
  readyRef.current = ready;

  useEffect(() => {
    const walk = walkRef.current;
    const tryPlay = () => {
      const a = walkRef.current;
      if (!a || done.current) return;
      a.muted = false;
      a.volume = 0.62;
      const p = a.play();
      if (p) {
        p.then(() => {
          playing.current = true;
          setNeedTap(false);
        }).catch(() => {
          if (!done.current) setNeedTap(true);
        });
      }
    };

    tryPlay();
    const t = window.setTimeout(() => {
      if (!playing.current && !done.current) setNeedTap(true);
    }, 400);

    const unlock = () => tryPlay();
    window.addEventListener("pointerdown", unlock, true);
    window.addEventListener("touchstart", unlock, true);
    window.addEventListener("click", unlock, true);
    window.addEventListener("keydown", unlock, true);

    const started = performance.now();
    const finish = () => {
      if (done.current) return;
      done.current = true;
      const v = videoRef.current;
      if (v) v.pause();
      if (walk) {
        try {
          walk.pause();
        } catch {
          /* ignore */
        }
      }
      setOut(true);
      window.setTimeout(onDone, FADE_MS);
    };
    const tick = window.setInterval(() => {
      const elapsed = performance.now() - started;
      setPct(Math.min(100, (elapsed / MAX_MS) * 100));
      if (elapsed >= MAX_MS || (videoEnded.current && elapsed >= 4000)) finish();
    }, 50);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("touchstart", unlock, true);
      window.removeEventListener("click", unlock, true);
      window.removeEventListener("keydown", unlock, true);
      if (walk) {
        try {
          walk.pause();
        } catch {
          /* ignore */
        }
      }
    };
  }, [onDone]);

  return (
    <div
      className={out ? "loader-splash loader-splash-out" : "loader-splash"}
      role="status"
      aria-label="Loading Sour Paint Studios Meridian 4.0"
      onPointerDown={() => {
        const a = walkRef.current;
        if (!a || done.current) return;
        a.muted = false;
        a.volume = 0.62;
        a.play().then(() => setNeedTap(false)).catch(() => {});
      }}
    >
      <video
        ref={videoRef}
        className="loader-film"
        src="/loader-paint.mp4"
        autoPlay
        muted
        playsInline
        onEnded={(e) => {
          videoEnded.current = true;
          e.currentTarget.pause();
        }}
      />
      <audio
        ref={walkRef}
        src="/audio/intro-walk.mp3"
        preload="auto"
        playsInline
        loop={false}
        onPlaying={() => {
          playing.current = true;
          setNeedTap(false);
        }}
      />
      <div className="loader-veil" />
      {needTap ? <p className="loader-tap">Tap for the guitar</p> : null}
      <div className="loader-meter" aria-live="polite">
        <span className="loader-meter-bar" style={{ width: `${pct}%` }} />
        <span className="loader-meter-pct">{Math.round(pct)}%</span>
      </div>
    </div>
  );
}
