import type { Place } from "@/lib/geocode";

export type Track = {
  id: string;
  composer: string;
  title: string;
  src: string;
  country?: string;
};

export const CLASSICAL: Track[] = [
  { id: "bach-air", composer: "Bach", title: "Air on the G String", src: "/audio/air-on-the-g-string.mp3" },
  { id: "satie-1", composer: "Satie", title: "Gymnopédie No. 1", src: "/audio/gymnopedie-1.mp3" },
  { id: "satie-2", composer: "Satie", title: "Gymnopédie No. 2", src: "/audio/gymnopedie-2.mp3" },
  { id: "satie-3", composer: "Satie", title: "Gymnopédie No. 3", src: "/audio/gymnopedie-3.mp3" },
  { id: "pachelbel", composer: "Pachelbel", title: "Canon in D", src: "/audio/canon-in-d.mp3" },
  { id: "air-prelude", composer: "MacLeod", title: "Air Prelude", src: "/audio/air-prelude.mp3" },
  { id: "string-impromptu", composer: "MacLeod", title: "String Impromptu", src: "/audio/string-impromptu.mp3" },
  { id: "virtutes", composer: "MacLeod", title: "Virtutes Instrumenti", src: "/audio/virtutes.mp3" },
  { id: "sovereign", composer: "MacLeod", title: "Sovereign", src: "/audio/sovereign.mp3" },
  { id: "descent", composer: "MacLeod", title: "The Descent", src: "/audio/the-descent.mp3" },
  { id: "folk-round", composer: "MacLeod", title: "Folk Round", src: "/audio/folk-round.mp3" },
  { id: "court", composer: "MacLeod", title: "Court of the Queen", src: "/audio/court-of-the-queen.mp3" },
  { id: "dreamy", composer: "MacLeod", title: "Dreamy Flashback", src: "/audio/dreamy-flashback.mp3" },
  { id: "thinking", composer: "MacLeod", title: "Thinking Music", src: "/audio/thinking-music.mp3" },
];

function tagged(country: string, tracks: Track[]): Track[] {
  return tracks.map((t) => ({ ...t, country, id: `${country}-${t.id}` }));
}

export function placeCountry(place: Place | null): string | null {
  if (!place) return null;
  const hay = `${place.name} ${place.detail}`;
  if (/united states|usa|u\.s\.a?\.?/i.test(hay) || /,\s*[A-Z]{2}\s+\d{5}\b/.test(place.detail)) {
    return "United States";
  }
  if (/japan|日本/i.test(hay)) return "Japan";
  if (/france|francia/i.test(hay)) return "France";
  const bits = place.detail.split(",").map((s) => s.trim()).filter(Boolean);
  return bits[bits.length - 1] || null;
}

export function playlistFor(country: string | null): Track[] {
  if (!country) return [];
  return tagged(country, CLASSICAL);
}
