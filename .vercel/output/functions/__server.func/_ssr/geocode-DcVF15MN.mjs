import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/geocode-DcVF15MN.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var Input = object({ q: string().trim().min(2).max(240) });
/** Commas optional, case does not matter. "Delmar, Iowa" and "delmar iowa" are the same query. */
function normalizePlaceQuery(q) {
	return q.trim().replace(/[.,;:/]+/g, " ").replace(/\s+/g, " ");
}
function parsePostal(q) {
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
var STREET_TYPES = /* @__PURE__ */ new Set([
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
	"trunk"
]);
function uniquePlaces(list) {
	const seen = /* @__PURE__ */ new Set();
	return list.filter((p) => {
		if (!Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return false;
		const key = `${p.lat.toFixed(3)}:${p.lng.toFixed(3)}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
function tokensOf(q) {
	return normalizePlaceQuery(q).toLowerCase().split(" ").filter((t) => t.length >= 2);
}
function scorePlace(p, tokens) {
	const hay = `${p.name} ${p.detail}`.toLowerCase();
	let s = 0;
	for (const t of tokens) if (hay.includes(t)) s += t.length;
	if (tokens[0] && p.name.toLowerCase().startsWith(tokens[0])) s += 4;
	return s;
}
function rankPlaces(list, q) {
	const tokens = tokensOf(q);
	return uniquePlaces(list).sort((a, b) => scorePlace(b, tokens) - scorePlace(a, tokens));
}
async function timedJson(url, init, ms) {
	const ctrl = new AbortController();
	const t = setTimeout(() => ctrl.abort(), ms);
	try {
		const res = await fetch(url, {
			...init,
			signal: ctrl.signal
		});
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	} finally {
		clearTimeout(t);
	}
}
var NOMINATIM_HEADERS = {
	Accept: "application/json",
	"User-Agent": "MeridianGlobe/1.0 (https://grok.me; globe visualization)"
};
function fromNominatim(hit) {
	if (STREET_TYPES.has(hit.type || "") || STREET_TYPES.has(hit.addresstype || "")) return null;
	const lat = Number(hit.lat);
	const lng = Number(hit.lon);
	if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
	return {
		id: `n-${hit.place_id}`,
		name: hit.name || hit.display_name.split(",")[0] || hit.display_name,
		detail: hit.display_name,
		lat,
		lng
	};
}
async function lookupZip(zip) {
	const json = await timedJson(`https://api.zippopotam.us/us/${zip}`, void 0, 6e3);
	if (!json?.places?.length) return [];
	return json.places.map((place, i) => ({
		id: `z-${json["post code"]}-${i}`,
		name: place["place name"],
		detail: `${place["place name"]}, ${place["state abbreviation"]} ${json["post code"]}, United States`,
		lat: Number(place.latitude),
		lng: Number(place.longitude)
	}));
}
async function nominatimPostal(code) {
	const url = new URL("https://nominatim.openstreetmap.org/search");
	url.searchParams.set("postalcode", code);
	url.searchParams.set("format", "json");
	url.searchParams.set("limit", "6");
	return (await timedJson(url.toString(), { headers: NOMINATIM_HEADERS }, 7e3) ?? []).map(fromNominatim).filter((p) => Boolean(p));
}
async function nominatimQuery(q, settlement) {
	const url = new URL("https://nominatim.openstreetmap.org/search");
	url.searchParams.set("q", q);
	url.searchParams.set("format", "json");
	url.searchParams.set("limit", "6");
	if (settlement) url.searchParams.set("featuretype", "settlement");
	return (await timedJson(url.toString(), { headers: NOMINATIM_HEADERS }, 7e3) ?? []).map(fromNominatim).filter((p) => Boolean(p));
}
async function openMeteo(q) {
	const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
	url.searchParams.set("name", q);
	url.searchParams.set("count", "8");
	url.searchParams.set("language", "en");
	url.searchParams.set("format", "json");
	return ((await timedJson(url.toString(), void 0, 6e3))?.results ?? []).map((hit) => ({
		id: `m-${hit.id}`,
		name: hit.name,
		detail: [hit.admin1, hit.country].filter(Boolean).join(", "),
		lat: hit.latitude,
		lng: hit.longitude
	}));
}
async function openMeteoCities(q) {
	const parts = q.split(" ");
	const queries = [q];
	if (parts.length >= 2) queries.push(parts.slice(0, -1).join(" "));
	if (parts.length >= 3) queries.push(parts[0]);
	return (await Promise.all(queries.map((name) => openMeteo(name)))).flat();
}
var searchPlaces_createServerFn_handler = createServerRpc({
	id: "33d678bbd3293e97edbdec6667561944b41aad741d99f3636ecf3eadf833e3e1",
	name: "searchPlaces",
	filename: "src/lib/geocode.ts"
}, (opts) => searchPlaces.__executeServer(opts));
var searchPlaces = createServerFn({ method: "POST" }).validator(Input).handler(searchPlaces_createServerFn_handler, async ({ data }) => {
	const q = normalizePlaceQuery(data.q);
	const postal = parsePostal(q);
	if (postal) {
		const us = /^\d{5}$/.test(postal) ? lookupZip(postal) : Promise.resolve([]);
		const [zp, byCode, byQuery] = await Promise.all([
			us,
			nominatimPostal(postal),
			nominatimQuery(postal, false)
		]);
		return rankPlaces([
			...zp,
			...byCode,
			...byQuery
		], q).slice(0, 8);
	}
	const [cities, named] = await Promise.all([openMeteoCities(q), nominatimQuery(q, true)]);
	let hits = rankPlaces([...named, ...cities], q);
	if (!hits.length) hits = rankPlaces(await nominatimQuery(q, false), q);
	return hits.slice(0, 8);
});
//#endregion
export { searchPlaces_createServerFn_handler };
