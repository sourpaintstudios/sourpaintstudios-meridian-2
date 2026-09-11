import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Place = {
  id: string;
  name: string;
  detail: string;
  lat: number;
  lng: number;
};

const Input = z.object({
  q: z.string().trim().min(2).max(240),
});

/** Commas optional, case does not matter. "Delmar, Iowa" and "delmar iowa" are the same query. */
export function normalizePlaceQuery(q: string) {
  return q
    .trim()
    .replace(/[.,;:/]+/g, " ")
    .replace(/\s+/g, " ");
}

export function parsePostal(q: string): string | null {
  const t = normalizePlaceQuery(q).toUpperCase();
  if (!t) return null;
  const compact = t.replace(/[-\s]/g, "");
  if (/^\d{5}(?:\d{4})?$/.test(compact)) return compact.slice(0, 5);
  if (/^\d{4,8}$/.test(compact)) return compact;
  if (/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/.test(t)) return t;
  if (/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/.test(t)) return t;
  if (/^\d{4}\s?[A-Z]{2}$/.test(t)) return t;
  if (/^\d{3}-?\d{4}$/.test(t)) return compact;
  return null;
}

export function parseUsZip(q: string) {
  const postal = parsePostal(q);
  return postal && /^\d{5}$/.test(postal) ? postal : null;
}

type NominatimHit = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  name?: string;
  class?: string;
  type?: string;
  addresstype?: string;
};

type OpenMeteoHit = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
};

type ZipPlace = {
  "place name": string;
  longitude: string;
  latitude: string;
  state: string;
  "state abbreviation": string;
};

const STREET_TYPES = new Set([
  "house",
  "yes",
  "residential",
  "unclassified",
  "primary",
  "secondary",
  "tertiary",
  "living_street",
  "pedestrian",
  "road",
  "motorway",
  "trunk",
]);

function uniquePlaces(list: Place[]) {
  const seen = new Set<string>();
  return list.filter((p) => {
    if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return false;
    const key = `${p.lat.toFixed(3)}:${p.lng.toFixed(3)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function tokensOf(q: string) {
  return normalizePlaceQuery(q)
    .toLowerCase()
    .split(" ")
    .filter((t) => t.length >= 2);
}

function scorePlace(p: Place, tokens: string[]) {
  const hay = `${p.name} ${p.detail}`.toLowerCase();
  let s = 0;
  for (const t of tokens) if (hay.includes(t)) s += t.length;
  if (tokens[0] && p.name.toLowerCase().startsWith(tokens[0])) s += 4;
  return s;
}

function rankPlaces(list: Place[], q: string) {
  const tokens = tokensOf(q);
  return uniquePlaces(list).sort((a, b) => scorePlace(b, tokens) - scorePlace(a, tokens));
}

async function timedJson<T>(url: string, init: RequestInit | undefined, ms: number): Promise<T | null> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { ...init, signal: ctrl.signal });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

const NOMINATIM_HEADERS = {
  Accept: "application/json",
  "User-Agent": "MeridianGlobe/1.0 (https://grok.me; globe visualization)",
};

function fromNominatim(hit: NominatimHit): Place | null {
  if (STREET_TYPES.has(hit.type || "") || STREET_TYPES.has(hit.addresstype || "")) return null;
  const lat = Number(hit.lat);
  const lng = Number(hit.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return {
    id: `n-${hit.place_id}`,
    name: hit.name || hit.display_name.split(",")[0] || hit.display_name,
    detail: hit.display_name,
    lat,
    lng,
  };
}

export async function lookupZip(zip: string): Promise<Place[]> {
  const json = await timedJson<{ "post code": string; places?: ZipPlace[] }>(
    `https://api.zippopotam.us/us/${zip}`,
    undefined,
    6000,
  );
  if (!json?.places?.length) return [];
  return json.places.map((place, i) => ({
    id: `z-${json["post code"]}-${i}`,
    name: place["place name"],
    detail: `${place["place name"]}, ${place["state abbreviation"]} ${json["post code"]}, United States`,
    lat: Number(place.latitude),
    lng: Number(place.longitude),
  }));
}

async function nominatimPostal(code: string): Promise<Place[]> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("postalcode", code);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "6");
  const json = await timedJson<NominatimHit[]>(url.toString(), { headers: NOMINATIM_HEADERS }, 7000);
  return (json ?? []).map(fromNominatim).filter((p): p is Place => Boolean(p));
}

async function nominatimQuery(q: string, settlement: boolean): Promise<Place[]> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", q);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "6");
  if (settlement) url.searchParams.set("featuretype", "settlement");
  const json = await timedJson<NominatimHit[]>(url.toString(), { headers: NOMINATIM_HEADERS }, 7000);
  return (json ?? []).map(fromNominatim).filter((p): p is Place => Boolean(p));
}

async function openMeteo(q: string): Promise<Place[]> {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", q);
  url.searchParams.set("count", "8");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");
  const json = await timedJson<{ results?: OpenMeteoHit[] }>(url.toString(), undefined, 6000);
  return (json?.results ?? []).map((hit) => ({
    id: `m-${hit.id}`,
    name: hit.name,
    detail: [hit.admin1, hit.country].filter(Boolean).join(", "),
    lat: hit.latitude,
    lng: hit.longitude,
  }));
}

async function openMeteoCities(q: string): Promise<Place[]> {
  const parts = q.split(" ");
  const queries = [q];
  if (parts.length >= 2) queries.push(parts.slice(0, -1).join(" "));
  if (parts.length >= 3) queries.push(parts[0]);
  const batches = await Promise.all(queries.map((name) => openMeteo(name)));
  return batches.flat();
}

export const searchPlaces = createServerFn({ method: "POST" })
  .validator(Input)
  .handler(async ({ data }) => {
    const q = normalizePlaceQuery(data.q);
    const postal = parsePostal(q);
    if (postal) {
      const us = /^\d{5}$/.test(postal) ? lookupZip(postal) : Promise.resolve([] as Place[]);
      const [zp, byCode, byQuery] = await Promise.all([us, nominatimPostal(postal), nominatimQuery(postal, false)]);
      return rankPlaces([...zp, ...byCode, ...byQuery], q).slice(0, 8);
    }
    const [cities, named] = await Promise.all([openMeteoCities(q), nominatimQuery(q, true)]);
    let hits = rankPlaces([...named, ...cities], q);
    if (!hits.length) {
      const loose = await nominatimQuery(q, false);
      hits = rankPlaces(loose, q);
    }
    return hits.slice(0, 8);
  });

export async function findPlaces(q: string): Promise<Place[]> {
  const query = normalizePlaceQuery(q);
  const us = parseUsZip(query);
  if (us) {
    const local = await lookupZip(us);
    if (local.length) return local;
  }
  return searchPlaces({ data: { q: query } });
}
