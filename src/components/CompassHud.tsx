import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const headingApi = {
  current: { first: false, headingDeg: 0, roseDeg: 0 },
};

const CARDINALS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
const TAPE = [
  { deg: 0, label: "N" },
  { deg: 45, label: "NE" },
  { deg: 90, label: "E" },
  { deg: 135, label: "SE" },
  { deg: 180, label: "S" },
  { deg: 225, label: "SW" },
  { deg: 270, label: "W" },
  { deg: 315, label: "NW" },
];
const PX = 1.15;
const LOOPS = [-360, 0, 360];

function cardinal(deg: number) {
  return CARDINALS[Math.round((((deg % 360) + 360) % 360) / 22.5) % 16];
}

export function CompassHud({ muted = false }: { muted?: boolean }) {
  const tape = useRef<HTMLDivElement>(null);
  const read = useRef<HTMLSpanElement>(null);
  const rose = useRef<HTMLDivElement>(null);
  const globe = useRef<HTMLDivElement>(null);
  const sky = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id = 0;
    const tick = () => {
      const h = headingApi.current;
      if (sky.current) sky.current.style.display = h.first ? "flex" : "none";
      if (globe.current) globe.current.style.display = h.first ? "none" : "flex";
      if (tape.current) {
        tape.current.style.transform = `translateX(${120 - h.headingDeg * PX}px)`;
      }
      if (read.current) {
        read.current.textContent = `${Math.round(h.headingDeg).toString().padStart(3, "0")}° ${cardinal(h.headingDeg)}`;
      }
      if (rose.current) {
        rose.current.style.transform = `rotate(${h.roseDeg}deg)`;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="pointer-events-none absolute top-3 left-1/2 z-10 -translate-x-1/2 sm:top-4">
      <div ref={globe} className="flex flex-col items-center">
        <div
          className={cn(
            "paint-chip relative size-12",
            muted ? "opacity-70" : "backdrop-blur-sm",
          )}
        >
          <div ref={rose} className="absolute inset-0 will-change-transform">
            <span className="absolute top-0.5 left-1/2 -translate-x-1/2 font-mono text-[10px] font-semibold text-brand">
              N
            </span>
            <span className="absolute top-1/2 right-1 -translate-y-1/2 font-mono text-[9px] text-muted">E</span>
            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted">S</span>
            <span className="absolute top-1/2 left-1 -translate-y-1/2 font-mono text-[9px] text-muted">W</span>
          </div>
          <span className="absolute top-1/2 left-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg/80" />
        </div>
      </div>

      <div ref={sky} className="hidden w-[240px] flex-col items-center">
        <div
          className={cn(
            "paint-chip relative h-8 w-full overflow-hidden",
            muted ? "opacity-70" : "backdrop-blur-sm",
          )}
        >
          <div ref={tape} className="absolute top-0 left-0 h-full will-change-transform">
            {LOOPS.flatMap((shift) =>
              TAPE.map((m) => (
                <span
                  key={`${shift}-${m.deg}`}
                  className={cn(
                    "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[11px]",
                    m.label === "N" ? "font-semibold text-brand" : "text-muted",
                  )}
                  style={{ left: (m.deg + shift) * PX }}
                >
                  {m.label}
                </span>
              )),
            )}
          </div>
          <span className="absolute top-0 left-1/2 h-1 w-px -translate-x-1/2 bg-brand" />
          <span className="absolute right-0 bottom-0 left-0 h-px bg-border" />
        </div>
        <span ref={read} className="mt-0.5 font-mono text-[10px] tracking-wide text-fg">
          000° N
        </span>
      </div>
    </div>
  );
}
