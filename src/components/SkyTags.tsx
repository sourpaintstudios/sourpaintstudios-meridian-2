import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type SkyTag = {
  name: string;
  x: number;
  y: number;
  kind: "constellation" | "planet" | "body";
};

export const skyTagsApi = { current: [] as SkyTag[] };
export const systemRefApi = { labels: false };

const POOL = 40;

export function SkyTagHud({ muted = false }: { muted?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const els: HTMLSpanElement[] = [];
    for (let i = 0; i < POOL; i++) {
      const el = document.createElement("span");
      el.style.position = "absolute";
      el.style.display = "none";
      el.style.transform = "translate(-50%, -120%)";
      el.style.whiteSpace = "nowrap";
      el.style.pointerEvents = "none";
      host.appendChild(el);
      els.push(el);
    }
    let id = 0;
    const tick = () => {
      const tags = skyTagsApi.current;
      for (let i = 0; i < POOL; i++) {
        const el = els[i];
        const t = tags[i];
        if (!t) {
          el.style.display = "none";
          continue;
        }
        el.style.display = "block";
        el.style.left = `${t.x}px`;
        el.style.top = `${t.y}px`;
        el.textContent = t.name;
        if (t.kind === "constellation") {
          el.className = cn(
            "rounded-sm px-1 font-mono tracking-[0.16em] uppercase",
            muted ? "text-[9px] text-muted/80" : "text-[10px] text-muted",
          );
        } else if (t.kind === "planet") {
          el.className = cn(
            "paint-chip px-1 py-0.5 font-mono leading-none text-fg",
            muted ? "text-[9px]" : "text-[10px]",
          );
        } else {
          el.className = cn(
            "paint-chip px-1 py-0.5 font-mono leading-none text-fg",
            muted ? "text-[9px]" : "text-[10px]",
          );
        }
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(id);
      for (const el of els) el.remove();
    };
  }, [muted]);

  return <div ref={root} className="pointer-events-none absolute inset-0 z-10 overflow-hidden" />;
}
