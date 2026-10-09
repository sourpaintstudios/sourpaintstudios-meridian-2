import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as Canvas, c as BufferGeometry, d as Matrix4, f as Quaternion, g as Vector3, h as TOUCH, i as Line, l as Float32BufferAttribute, m as ShaderMaterial, n as OrbitControls, o as useFrame, p as SRGBColorSpace, r as useTexture, s as useThree, t as Stars, u as MathUtils, v as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { _ as Eraser, a as Sunset, b as ArrowLeft, c as SunMoon, d as Plus, f as Moon, g as LoaderCircle, h as MapPin, l as SkipForward, m as Menu, n as VolumeX, o as Sunrise, p as Minus, r as Volume2, s as Sun, t as X, u as Search, v as Crosshair, y as Calendar } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BEAMfAAS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CLASSICAL = [
	{
		id: "bach-air",
		composer: "Bach",
		title: "Air on the G String",
		src: "/audio/air-on-the-g-string.mp3"
	},
	{
		id: "satie-1",
		composer: "Satie",
		title: "Gymnopédie No. 1",
		src: "/audio/gymnopedie-1.mp3"
	},
	{
		id: "satie-2",
		composer: "Satie",
		title: "Gymnopédie No. 2",
		src: "/audio/gymnopedie-2.mp3"
	},
	{
		id: "satie-3",
		composer: "Satie",
		title: "Gymnopédie No. 3",
		src: "/audio/gymnopedie-3.mp3"
	},
	{
		id: "pachelbel",
		composer: "Pachelbel",
		title: "Canon in D",
		src: "/audio/canon-in-d.mp3"
	},
	{
		id: "air-prelude",
		composer: "MacLeod",
		title: "Air Prelude",
		src: "/audio/air-prelude.mp3"
	},
	{
		id: "string-impromptu",
		composer: "MacLeod",
		title: "String Impromptu",
		src: "/audio/string-impromptu.mp3"
	},
	{
		id: "virtutes",
		composer: "MacLeod",
		title: "Virtutes Instrumenti",
		src: "/audio/virtutes.mp3"
	},
	{
		id: "sovereign",
		composer: "MacLeod",
		title: "Sovereign",
		src: "/audio/sovereign.mp3"
	},
	{
		id: "descent",
		composer: "MacLeod",
		title: "The Descent",
		src: "/audio/the-descent.mp3"
	},
	{
		id: "folk-round",
		composer: "MacLeod",
		title: "Folk Round",
		src: "/audio/folk-round.mp3"
	},
	{
		id: "court",
		composer: "MacLeod",
		title: "Court of the Queen",
		src: "/audio/court-of-the-queen.mp3"
	},
	{
		id: "dreamy",
		composer: "MacLeod",
		title: "Dreamy Flashback",
		src: "/audio/dreamy-flashback.mp3"
	},
	{
		id: "thinking",
		composer: "MacLeod",
		title: "Thinking Music",
		src: "/audio/thinking-music.mp3"
	}
];
function tagged(country, tracks) {
	return tracks.map((t) => ({
		...t,
		country,
		id: `${country}-${t.id}`
	}));
}
function placeCountry(place) {
	if (!place) return null;
	const hay = `${place.name} ${place.detail}`;
	if (/united states|usa|u\.s\.a?\.?/i.test(hay) || /,\s*[A-Z]{2}\s+\d{5}\b/.test(place.detail)) return "United States";
	if (/japan|日本/i.test(hay)) return "Japan";
	if (/france|francia/i.test(hay)) return "France";
	const bits = place.detail.split(",").map((s) => s.trim()).filter(Boolean);
	return bits[bits.length - 1] || null;
}
function playlistFor(country) {
	if (!country) return [];
	return tagged(country, CLASSICAL);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var MUTE_KEY = "meridian-mute-v2";
function AudioBed({ place }) {
	const audio = (0, import_react.useRef)(null);
	const [muted, setMuted] = (0, import_react.useState)(() => {
		try {
			return localStorage.getItem(MUTE_KEY) === "1";
		} catch {
			return false;
		}
	});
	const [mode, setMode] = (0, import_react.useState)("classical");
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [kick, setKick] = (0, import_react.useState)(0);
	const [countryTracks, setCountryTracks] = (0, import_react.useState)([]);
	const country = placeCountry(place);
	const list = mode === "country" && countryTracks.length ? countryTracks : CLASSICAL;
	const track = list[idx % list.length] ?? CLASSICAL[0];
	(0, import_react.useEffect)(() => {
		try {
			localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
		} catch {}
	}, [muted]);
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		const el = audio.current;
		if (!el) return;
		el.volume = .34;
		if (muted) {
			el.pause();
			return;
		}
		try {
			if (el.ended || el.paused) el.currentTime = 0;
		} catch {}
		el.play().catch(() => {});
	}, [
		muted,
		track.id,
		idx,
		kick
	]);
	function next() {
		setIdx((i) => i + 1);
		setKick((k) => k + 1);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "music-deck pointer-events-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				ref: audio,
				src: track.src,
				preload: "auto",
				onEnded: next
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: cn("paint-chip music-btn", !muted && "paint-live text-brand"),
				"aria-label": muted ? "Unmute" : "Mute",
				onClick: () => setMuted((m) => !m),
				children: [muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MUTE" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: cn("paint-chip music-now", mode === "classical" && "paint-live"),
				onClick: () => {
					setMode("classical");
					setIdx(0);
					setKick((k) => k + 1);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "music-mode",
					children: "CLASSICAL"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "music-title",
					children: mode === "classical" ? track.composer : "Bach"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: cn("paint-chip music-now", mode === "country" && country && "paint-live"),
				disabled: !country,
				onClick: () => {
					if (!country || !countryTracks.length) return;
					setMode("country");
					setIdx(0);
					setKick((k) => k + 1);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "music-mode",
					children: country ? country : "COUNTRY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "music-title",
					children: country ? mode === "country" ? track.title : "Play" : "—"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "paint-chip music-btn",
				"aria-label": "Next track",
				onClick: next,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NEXT" })]
			})
		]
	});
}
var buttonVariants = cva("paint-chip inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium text-fg transition-[opacity,transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "paint-live",
			ghost: "bg-transparent text-fg hover:opacity-90",
			outline: "text-fg hover:opacity-95"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Input$1({ className, type = "text", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("paint-chip flex h-11 w-full px-3 text-sm text-fg shadow-none", "placeholder:text-muted-more outline-none transition-[box-shadow] duration-[var(--motion-quick)]", "focus-visible:ring-2 focus-visible:ring-brand/50", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
/**
* Compact solar/lunar geometry (Jean Meeus / SunCalc-style, MIT-era formulas).
* Positions are geocentric: where the Sun or Moon is overhead on Earth.
*/
var PI = Math.PI;
var RAD = PI / 180;
var DAY_MS$1 = 864e5;
var J1970$1 = 2440588;
var J2000$1 = 2451545;
var OBLIQUITY = 23.4397 * RAD;
function toJulian(date) {
	return date.valueOf() / DAY_MS$1 - .5 + J1970$1;
}
function toDays$1(date) {
	return toJulian(date) - J2000$1;
}
function sind(a) {
	return Math.sin(a);
}
function cosd(a) {
	return Math.cos(a);
}
function rightAscension(l, b) {
	return Math.atan2(sind(l) * Math.cos(OBLIQUITY) - Math.tan(b) * Math.sin(OBLIQUITY), cosd(l));
}
function declination(l, b) {
	return Math.asin(sind(b) * Math.cos(OBLIQUITY) + cosd(b) * Math.sin(OBLIQUITY) * sind(l));
}
function solarMeanAnomaly(d) {
	return RAD * (357.5291 + .98560028 * d);
}
function eclipticLongitude(M) {
	const C = RAD * (1.9148 * sind(M) + .02 * sind(2 * M) + 3e-4 * sind(3 * M));
	const P = RAD * 102.9372;
	return M + C + P + PI;
}
function sunCoords(d) {
	const L = eclipticLongitude(solarMeanAnomaly(d));
	return {
		dec: declination(L, 0),
		ra: rightAscension(L, 0)
	};
}
function greenwichSidereal(d) {
	return RAD * (280.16 + 360.9856235 * d);
}
function wrapLng(deg) {
	return ((deg + 180) % 360 + 360) % 360 - 180;
}
function raDecToLatLng(ra, dec, d) {
	const lng = wrapLng((ra - greenwichSidereal(d)) * 180 / PI);
	return {
		lat: dec * 180 / PI,
		lng
	};
}
function subsolarPoint(date) {
	const d = toDays$1(date);
	const c = sunCoords(d);
	return raDecToLatLng(c.ra, c.dec, d);
}
function moonCoords(d) {
	const L = RAD * (218.316 + 13.176396 * d);
	const M = RAD * (134.963 + 13.064993 * d);
	const F = RAD * (93.272 + 13.22935 * d);
	const l = L + RAD * 6.289 * sind(M);
	const b = RAD * 5.128 * sind(F);
	const dist = 385001 - 20905 * cosd(M);
	return {
		ra: rightAscension(l, b),
		dec: declination(l, b),
		dist
	};
}
function sublunarPoint(date) {
	const d = toDays$1(date);
	const c = moonCoords(d);
	return {
		...raDecToLatLng(c.ra, c.dec, d),
		distanceKm: c.dist
	};
}
function moonIllumination(date) {
	const d = toDays$1(date);
	const s = sunCoords(d);
	const m = moonCoords(d);
	const phi = Math.acos(Math.sin(s.dec) * Math.sin(m.dec) + Math.cos(s.dec) * Math.cos(m.dec) * Math.cos(s.ra - m.ra));
	const inc = Math.atan2(149598e3 * Math.sin(phi), m.dist - 149598e3 * Math.cos(phi));
	const angle = Math.atan2(Math.cos(s.dec) * Math.sin(s.ra - m.ra), Math.sin(s.dec) * Math.cos(m.dec) - Math.cos(s.dec) * Math.sin(m.dec) * Math.cos(s.ra - m.ra));
	return {
		fraction: (1 + Math.cos(inc)) / 2,
		phase: .5 + .5 * inc * (angle < 0 ? -1 : 1) / PI,
		angle
	};
}
function siderealTime(d, lw) {
	return greenwichSidereal(d) - lw;
}
function altitudeAzimuth(H, phi, dec) {
	const altitude = Math.asin(sind(phi) * sind(dec) + cosd(phi) * cosd(dec) * cosd(H));
	const azimuth = Math.atan2(sind(H), cosd(H) * sind(phi) - Math.tan(dec) * cosd(phi));
	return {
		altitude: altitude * 180 / PI,
		azimuth: ((azimuth * 180 / PI + 180) % 360 + 360) % 360
	};
}
function equatorialToAltAz(date, lat, lng, raHours, decDeg) {
	const d = toDays$1(date);
	const lw = -lng * RAD;
	const phi = lat * RAD;
	const ra = raHours * 15 * RAD;
	const dec = decDeg * RAD;
	return altitudeAzimuth(siderealTime(d, lw) - ra, phi, dec);
}
function equatorialToGeo(date, raHours, decDeg) {
	const d = toDays$1(date);
	return raDecToLatLng(raHours * 15 * RAD, decDeg * RAD, d);
}
function sunPosition(date, lat, lng) {
	const d = toDays$1(date);
	const c = sunCoords(d);
	const lw = -lng * RAD;
	const phi = lat * RAD;
	return altitudeAzimuth(siderealTime(d, lw) - c.ra, phi, c.dec);
}
function moonPosition(date, lat, lng) {
	const d = toDays$1(date);
	const c = moonCoords(d);
	const lw = -lng * RAD;
	const phi = lat * RAD;
	return {
		...altitudeAzimuth(siderealTime(d, lw) - c.ra, phi, c.dec),
		distanceKm: c.dist
	};
}
function phaseLabel(fraction, angle) {
	const waxing = angle >= 0;
	if (fraction < .04) return "New moon";
	if (fraction < .35) return waxing ? "Waxing crescent" : "Waning crescent";
	if (fraction < .65) return waxing ? "First quarter" : "Last quarter";
	if (fraction < .96) return waxing ? "Waxing gibbous" : "Waning gibbous";
	return "Full moon";
}
/** Moon if it is up, else the sun if it is up, else the night sky toward whichever is closer to rising. */
function pickSkyFocus(moonAltDeg, sunAltDeg) {
	if (moonAltDeg > 0) return "moon";
	if (sunAltDeg > 0) return "sun";
	return "horizon";
}
var J0 = 9e-4;
function fromJulian(j) {
	return /* @__PURE__ */ new Date((j + .5 - J1970$1) * DAY_MS$1);
}
function julianCycle(d, lw) {
	return Math.round(d - J0 - lw / (2 * PI));
}
function approxTransit(Ht, lw, n) {
	return J0 + (Ht + lw) / (2 * PI) + n;
}
function solarTransitJ(ds, M, L) {
	return J2000$1 + ds + .0053 * Math.sin(M) - .0069 * Math.sin(2 * L);
}
function hourAngle(h, phi, dec) {
	const cosHA = (Math.sin(h) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec));
	if (!Number.isFinite(cosHA) || cosHA < -1 || cosHA > 1) return null;
	return Math.acos(cosHA);
}
function sunTimes(date, lat, lng) {
	const lw = -lng * RAD;
	const phi = lat * RAD;
	const n = julianCycle(toDays$1(date), lw);
	const ds = approxTransit(0, lw, n);
	const M = solarMeanAnomaly(ds);
	const L = eclipticLongitude(M);
	const dec = declination(L, 0);
	const Jnoon = solarTransitJ(ds, M, L);
	const w = hourAngle(-.833 * RAD, phi, dec);
	const solarNoon = fromJulian(Jnoon);
	if (w == null) return {
		sunrise: null,
		sunset: null,
		solarNoon,
		polar: sunPosition(solarNoon, lat, lng).altitude > 0 ? "up" : "down"
	};
	const Jset = solarTransitJ(approxTransit(w, lw, n), M, L);
	return {
		sunrise: fromJulian(Jnoon - (Jset - Jnoon)),
		sunset: fromJulian(Jset),
		solarNoon,
		polar: null
	};
}
function formatClock(date) {
	return date.toLocaleTimeString(void 0, {
		hour: "numeric",
		minute: "2-digit"
	});
}
/** Match SphereGeometry UVs used by standard Earth equirectangular maps. */
function latLngToVector3(lat, lng, radius, target = new Vector3()) {
	const phi = (90 - lat) * Math.PI / 180;
	const theta = (lng + 180) * Math.PI / 180;
	return target.set(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
}
function formatLatLng(lat, lng) {
	const ns = lat >= 0 ? "N" : "S";
	const ew = lng >= 0 ? "E" : "W";
	return `${Math.abs(lat).toFixed(3)}° ${ns}, ${Math.abs(lng).toFixed(3)}° ${ew}`;
}
function formatDeg(value, positive, negative) {
	const dir = value >= 0 ? positive : negative;
	return `${Math.abs(value).toFixed(1)}° ${dir}`;
}
function easeInOutQuint(t) {
	return t < .5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}
/** Arc along Earth's sphere so the camera never tunnels through the planet. */
function lerpRadial(from, to, t, out) {
	const fromR = from.length();
	const toR = to.length();
	if (fromR < 1e-8 || toR < 1e-8) return out.lerpVectors(from, to, t);
	const fromN = from.clone().multiplyScalar(1 / fromR);
	const toN = to.clone().multiplyScalar(1 / toR);
	const q = new Quaternion().setFromUnitVectors(fromN, toN);
	const qT = new Quaternion().slerpQuaternions(new Quaternion(), q, t);
	out.copy(fromN).applyQuaternion(qT);
	return out.multiplyScalar(fromR + (toR - fromR) * t);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
function parseUsZip(q) {
	const postal = parsePostal(q);
	return postal && /^\d{5}$/.test(postal) ? postal : null;
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
var searchPlaces = createServerFn({ method: "POST" }).validator(Input).handler(createSsrRpc("33d678bbd3293e97edbdec6667561944b41aad741d99f3636ecf3eadf833e3e1"));
async function findPlaces(q) {
	const query = normalizePlaceQuery(q);
	const us = parseUsZip(query);
	if (us) {
		const local = await lookupZip(us);
		if (local.length) return local;
	}
	return searchPlaces({ data: { q: query } });
}
function toDateTimeLocalValue(date) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function ControlDock({ date, onDate, place, onPlace, firstPerson, onFirstPerson, showConstellations, onConstellations, showPlanets, onPlanets, onScientific }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const sky = (0, import_react.useMemo)(() => {
		if (!place) return null;
		return {
			sun: sunPosition(date, place.lat, place.lng),
			moon: moonPosition(date, place.lat, place.lng),
			illum: moonIllumination(date),
			times: sunTimes(date, place.lat, place.lng)
		};
	}, [date, place]);
	const canSearch = Boolean(parsePostal(q) || q.trim().replace(/[.,;:/]+/g, " ").trim().length >= 3);
	async function lookup(e) {
		e?.preventDefault();
		const query = q.trim();
		if (!canSearch) return;
		setBusy(true);
		setErr(null);
		try {
			const results = await findPlaces(query);
			setHits(results.length > 1 ? results : []);
			if (results[0]) {
				onPlace(results[0]);
				if (results.length === 1) setQ(parsePostal(query) ?? results[0].name);
			} else setErr(parsePostal(query) ? "Postal code not found." : "No match for that place.");
		} catch {
			setErr("Lookup failed. Try a city or postal code.");
		} finally {
			setBusy(false);
			if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
		}
	}
	const looking = firstPerson && sky ? sky.sun.altitude > 0 ? "Standing at the horizon in daylight" : sky.moon.altitude > 0 ? "Standing at the horizon — moon is up" : "Standing at the horizon" : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "pointer-events-auto flex w-[min(100%,11.75rem)] flex-col",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "paint-panel",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex max-h-[32dvh] flex-col gap-1.5 overflow-y-auto p-1.5 sm:max-h-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-col gap-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8px] font-medium tracking-[0.16em] text-brand uppercase",
							children: "Sour Paint Studios"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-[13px] leading-none tracking-tight text-fg",
							children: "Meridian 4.0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: lookup,
						className: "flex flex-col gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "zip",
								className: "sr-only",
								children: "City or postal code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "pointer-events-none absolute top-1/2 left-1.5 size-2.5 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										id: "zip",
										value: q,
										onChange: (e) => setQ(e.target.value),
										placeholder: "City or postal code",
										className: "h-6 pl-6 text-[11px]",
										autoComplete: "off",
										enterKeyHint: "search",
										maxLength: 48
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									size: "sm",
									className: "h-6 px-1.5 text-[10px] [&_svg]:size-3",
									disabled: busy || !canSearch,
									"aria-label": "Find place",
									children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Find"
									})]
								})]
							}),
							err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-danger",
								children: err
							}) : null,
							hits.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "paint-chip flex flex-col overflow-hidden",
								children: hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										onPlace(hit);
										setQ(hit.name);
										setHits([]);
									},
									className: cn("flex w-full flex-col items-start gap-0 px-1.5 py-1 text-left text-[11px]", "hover:bg-fg/6", place?.id === hit.id ? "bg-fg/8" : ""),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-fg",
										children: hit.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-muted",
										children: hit.detail
									})]
								}) }, hit.id))
							}) : null
						]
					}),
					place ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "dock-city",
						title: place.detail,
						children: place.name
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "when",
								className: "sr-only",
								children: "Date and time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "pointer-events-none absolute top-1/2 left-1.5 size-2.5 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									id: "when",
									type: "datetime-local",
									value: toDateTimeLocalValue(date),
									onChange: (e) => {
										if (!e.target.value) return;
										onDate(new Date(e.target.value));
									},
									suppressHydrationWarning: true,
									className: "h-6 pl-6 text-[11px]"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								className: "h-6 px-1.5 text-[10px]",
								onClick: () => onDate(/* @__PURE__ */ new Date()),
								children: "Now"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						className: "h-6 w-full text-[10px]",
						variant: firstPerson ? "default" : "outline",
						"aria-pressed": firstPerson,
						disabled: !place,
						title: place ? firstPerson ? "Leave the horizon" : "Stand on the pin" : "Drop a pin first",
						onClick: () => onFirstPerson(!firstPerson),
						children: firstPerson ? "Back to Earth" : "First Person"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							className: "h-6 px-1 text-[10px]",
							variant: showConstellations ? "default" : "outline",
							"aria-pressed": showConstellations,
							onClick: () => onConstellations(!showConstellations),
							children: "Constellations"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							className: "h-6 px-1 text-[10px]",
							variant: showPlanets ? "default" : "outline",
							"aria-pressed": showPlanets,
							onClick: () => onPlanets(!showPlanets),
							children: "Planets"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						className: "h-6 w-full px-1 text-[10px] [&_svg]:size-3",
						variant: "outline",
						onClick: onScientific,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "size-3" }), "Scientific"]
					}),
					place && sky ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center justify-between gap-1 border-t border-border pt-1 font-mono text-[10px] leading-none text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-0.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sunrise, { className: "size-2.5 text-brand" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8px] tracking-wide text-muted uppercase",
									children: "Rise"
								}),
								sky.times.polar === "up" ? "all day" : sky.times.polar === "down" ? "—" : sky.times.sunrise ? formatClock(sky.times.sunrise) : "—"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-0.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sunset, { className: "size-2.5 text-brand" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8px] tracking-wide text-muted uppercase",
									children: "Set"
								}),
								sky.times.polar === "down" ? "all day" : sky.times.polar === "up" ? "—" : sky.times.sunset ? formatClock(sky.times.sunset) : "—"
							]
						})]
					}) : null,
					looking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] leading-snug text-muted",
						children: [
							looking,
							". Drag to look around.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 block text-[9px] text-muted-more",
								children: "Sky matches this time and place — daylight, twilight, or night."
							})
						]
					}) : null,
					place && sky ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-2 gap-1 border-t border-border pt-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-[9px] tracking-wide text-muted uppercase",
									children: "Pinned"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "text-[11px] text-fg",
									children: [place.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 font-mono text-[9px] text-muted",
										children: formatLatLng(place.lat, place.lng)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-2.5" }),
								label: "Sun",
								value: formatDeg(sky.sun.altitude, "up", "down"),
								sub: `Az ${sky.sun.azimuth.toFixed(0)}°`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-2.5" }),
								label: "Moon",
								value: phaseLabel(sky.illum.fraction, sky.illum.angle),
								sub: `${Math.round(sky.illum.fraction * 100)}% · ${formatDeg(sky.moon.altitude, "up", "down")}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "col-span-2 text-[9px] leading-snug text-muted",
								children: "Gold line on Earth is sunrise / sunset for this pin."
							})
						]
					}) : null
				]
			})
		})
	});
}
function Stat({ icon, label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "paint-chip px-1.5 py-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
				className: "flex items-center gap-0.5 text-[9px] tracking-wide text-muted uppercase",
				children: [icon, label]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "text-[11px] leading-tight text-fg",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "font-mono text-[9px] text-muted",
				children: sub
			})
		]
	});
}
var DEG = Math.PI / 180;
var OBL = 23.4397 * DEG;
var DAY_MS = 864e5;
var J1970 = 2440588;
var J2000 = 2451545;
function toDays(date) {
	return date.valueOf() / DAY_MS - .5 + J1970 - J2000;
}
function wrap360(x) {
	return (x % 360 + 360) % 360;
}
function kepler(M, e) {
	let E = M;
	for (let n = 0; n < 10; n++) E = M + e * Math.sin(E);
	return E;
}
var ORBITS = [
	{
		name: "Mercury",
		color: "#c8c0b4",
		N0: 48.3313,
		N1: 324587e-10,
		i0: 7.0047,
		i1: 5e-8,
		w0: 29.1241,
		w1: 101444e-10,
		a: .387098,
		e0: .205635,
		e1: 559e-12,
		M0: 168.6562,
		M1: 4.0923344368
	},
	{
		name: "Venus",
		color: "#e8d9a8",
		N0: 76.6799,
		N1: 24659e-9,
		i0: 3.3946,
		i1: 2.75e-8,
		w0: 54.891,
		w1: 138374e-10,
		a: .72333,
		e0: .006773,
		e1: -1.302e-9,
		M0: 48.0052,
		M1: 1.6021302244
	},
	{
		name: "Mars",
		color: "#d08060",
		N0: 49.5574,
		N1: 211081e-10,
		i0: 1.8497,
		i1: -1.78e-8,
		w0: 286.5016,
		w1: 292961e-10,
		a: 1.523688,
		e0: .093405,
		e1: 2.516e-9,
		M0: 18.6021,
		M1: .5240207766
	},
	{
		name: "Jupiter",
		color: "#e0c9a0",
		N0: 100.4542,
		N1: 276854e-10,
		i0: 1.303,
		i1: -1.557e-7,
		w0: 273.8777,
		w1: 164505e-10,
		a: 5.20256,
		e0: .048498,
		e1: 4.469e-9,
		M0: 19.895,
		M1: .0830853001
	},
	{
		name: "Saturn",
		color: "#dcc8a0",
		N0: 113.6634,
		N1: 23898e-9,
		i0: 2.4886,
		i1: -1.081e-7,
		w0: 339.3939,
		w1: 297661e-10,
		a: 9.55475,
		e0: .055546,
		e1: -9.499e-9,
		M0: 316.967,
		M1: .0334442282
	},
	{
		name: "Uranus",
		color: "#7ec8d4",
		N0: 74.0005,
		N1: 139796e-10,
		i0: .7733,
		i1: 19e-9,
		w0: 96.6612,
		w1: 30565e-9,
		a: 19.18171,
		e0: .047318,
		e1: 7.45e-9,
		M0: 142.5905,
		M1: .011725806
	},
	{
		name: "Neptune",
		color: "#4d7cff",
		N0: 131.7806,
		N1: 30173e-9,
		i0: 1.77,
		i1: -255e-9,
		w0: 272.8461,
		w1: -6027e-9,
		a: 30.05826,
		e0: .008606,
		e1: 2.15e-9,
		M0: 260.2471,
		M1: .005995147
	}
];
var EARTH = {
	name: "Mercury",
	color: "#fff",
	N0: 0,
	N1: 0,
	i0: 0,
	i1: 0,
	w0: 282.9404,
	w1: 470935e-10,
	a: 1,
	e0: .016709,
	e1: -1.151e-9,
	M0: 356.047,
	M1: .9856002585
};
function helio(d, p) {
	const N = wrap360(p.N0 + p.N1 * d) * DEG;
	const i = (p.i0 + p.i1 * d) * DEG;
	const w = wrap360(p.w0 + p.w1 * d) * DEG;
	const e = p.e0 + p.e1 * d;
	const E = kepler(wrap360(p.M0 + p.M1 * d) * DEG, e);
	const xv = p.a * (Math.cos(E) - e);
	const yv = p.a * Math.sqrt(Math.max(0, 1 - e * e)) * Math.sin(E);
	const v = Math.atan2(yv, xv);
	const r = Math.sqrt(xv * xv + yv * yv);
	const lon = v + w;
	return {
		x: r * (Math.cos(N) * Math.cos(lon) - Math.sin(N) * Math.sin(lon) * Math.cos(i)),
		y: r * (Math.sin(N) * Math.cos(lon) + Math.cos(N) * Math.sin(lon) * Math.cos(i)),
		z: r * Math.sin(lon) * Math.sin(i)
	};
}
function equatorialFromHelio(p, e) {
	const x = p.x - e.x;
	const y = p.y - e.y;
	const z = p.z - e.z;
	const xe = x;
	const ye = y * Math.cos(OBL) - z * Math.sin(OBL);
	const ze = y * Math.sin(OBL) + z * Math.cos(OBL);
	const ra = Math.atan2(ye, xe);
	const dec = Math.atan2(ze, Math.sqrt(xe * xe + ye * ye));
	return {
		raHours: (ra / DEG + 360) % 360 / 15,
		decDeg: dec / DEG
	};
}
var SKY_BLURB = {
	Mercury: "Closest planet to the Sun. Small, fast, and almost no air.",
	Venus: "Earth's twin in size — and the hottest planet, wrapped in thick cloud.",
	Mars: "The red planet. Fourth from the Sun, with rust-colored dust and two tiny moons.",
	Jupiter: "The largest planet. A gas giant with a centuries-old Great Red Spot.",
	Saturn: "A pale gas giant, famous for those wide, bright rings.",
	Uranus: "An ice giant, tipped on its side. Faint rings, pale blue-green.",
	Neptune: "The farthest planet. Deep blue, windy, and a long way out.",
	Sun: "Our star. Everything in this sky is circling it.",
	Earth: "Home. Third planet from the Sun — the globe you're looking at.",
	Moon: "Earth's Moon — our companion. The light you see is sunlight on gray rock.",
	"Earth's Moon": "Earth's Moon — our companion. The light you see is sunlight on gray rock.",
	Polaris: "Polaris — the North Star. It sits almost still above Earth's north pole, which is why the sky turns around it.",
	"North Star": "Polaris — the North Star. It sits almost still above Earth's north pole, which is why the sky turns around it."
};
function skyBlurb(name) {
	return SKY_BLURB[name] ?? "A bright star in this sky.";
}
var PLANET_SPACE = {
	Mercury: {
		dist: 4.6,
		size: .055,
		skyDist: 44,
		skySize: .038
	},
	Venus: {
		dist: 5.9,
		size: .082,
		skyDist: 40,
		skySize: .052
	},
	Mars: {
		dist: 8.8,
		size: .07,
		skyDist: 48,
		skySize: .044
	},
	Jupiter: {
		dist: 13.4,
		size: .16,
		skyDist: 54,
		skySize: .072
	},
	Saturn: {
		dist: 17.2,
		size: .14,
		skyDist: 58,
		skySize: .062
	},
	Uranus: {
		dist: 28,
		size: .11,
		skyDist: 62,
		skySize: .05
	},
	Neptune: {
		dist: 34,
		size: .1,
		skyDist: 66,
		skySize: .046
	}
};
function planetStates(date) {
	const d = toDays(date);
	const earth = helio(d, EARTH);
	return ORBITS.map((orb) => {
		const eq = equatorialFromHelio(helio(d, orb), earth);
		const geo = equatorialToGeo(date, eq.raHours, eq.decDeg);
		return {
			name: orb.name,
			color: orb.color,
			raHours: eq.raHours,
			decDeg: eq.decDeg,
			lat: geo.lat,
			lng: geo.lng
		};
	});
}
function planetAltAz(date, lat, lng, planet) {
	return equatorialToAltAz(date, lat, lng, planet.raHours, planet.decDeg);
}
var BRIGHT_STARS = [
	{
		n: "Sirius",
		ra: 6.7525,
		dec: -16.716,
		mag: -1.46,
		sp: "A"
	},
	{
		n: "Canopus",
		ra: 6.3992,
		dec: -52.696,
		mag: -.74,
		sp: "F"
	},
	{
		n: "Rigil Kentaurus",
		ra: 14.6601,
		dec: -60.835,
		mag: -.27,
		sp: "G"
	},
	{
		n: "Arcturus",
		ra: 14.261,
		dec: 19.182,
		mag: -.05,
		sp: "K"
	},
	{
		n: "Vega",
		ra: 18.6156,
		dec: 38.783,
		mag: .03,
		sp: "A"
	},
	{
		n: "Capella",
		ra: 5.2782,
		dec: 45.998,
		mag: .08,
		sp: "G"
	},
	{
		n: "Rigel",
		ra: 5.2423,
		dec: -8.202,
		mag: .13,
		sp: "B"
	},
	{
		n: "Procyon",
		ra: 7.655,
		dec: 5.225,
		mag: .34,
		sp: "F"
	},
	{
		n: "Betelgeuse",
		ra: 5.9195,
		dec: 7.407,
		mag: .42,
		sp: "M"
	},
	{
		n: "Achernar",
		ra: 1.6286,
		dec: -57.237,
		mag: .46,
		sp: "B"
	},
	{
		n: "Hadar",
		ra: 14.0637,
		dec: -60.373,
		mag: .61,
		sp: "B"
	},
	{
		n: "Altair",
		ra: 19.8464,
		dec: 8.868,
		mag: .76,
		sp: "A"
	},
	{
		n: "Acrux",
		ra: 12.4433,
		dec: -63.099,
		mag: .76,
		sp: "B"
	},
	{
		n: "Aldebaran",
		ra: 4.5987,
		dec: 16.509,
		mag: .85,
		sp: "K"
	},
	{
		n: "Antares",
		ra: 16.4901,
		dec: -26.432,
		mag: .96,
		sp: "M"
	},
	{
		n: "Spica",
		ra: 13.4199,
		dec: -11.161,
		mag: .98,
		sp: "B"
	},
	{
		n: "Pollux",
		ra: 7.7553,
		dec: 28.026,
		mag: 1.14,
		sp: "K"
	},
	{
		n: "Fomalhaut",
		ra: 22.9608,
		dec: -29.622,
		mag: 1.16,
		sp: "A"
	},
	{
		n: "Deneb",
		ra: 20.6905,
		dec: 45.28,
		mag: 1.25,
		sp: "A"
	},
	{
		n: "Mimosa",
		ra: 12.7953,
		dec: -59.689,
		mag: 1.25,
		sp: "B"
	},
	{
		n: "Regulus",
		ra: 10.1395,
		dec: 11.967,
		mag: 1.35,
		sp: "B"
	},
	{
		n: "Adhara",
		ra: 6.9771,
		dec: -28.972,
		mag: 1.5,
		sp: "B"
	},
	{
		n: "Castor",
		ra: 7.5767,
		dec: 31.888,
		mag: 1.58,
		sp: "A"
	},
	{
		n: "Shaula",
		ra: 17.5601,
		dec: -37.104,
		mag: 1.62,
		sp: "B"
	},
	{
		n: "Gacrux",
		ra: 12.5197,
		dec: -57.113,
		mag: 1.63,
		sp: "M"
	},
	{
		n: "Bellatrix",
		ra: 5.4188,
		dec: 6.35,
		mag: 1.64,
		sp: "B"
	},
	{
		n: "Elnath",
		ra: 5.4382,
		dec: 28.608,
		mag: 1.65,
		sp: "B"
	},
	{
		n: "Miaplacidus",
		ra: 9.2201,
		dec: -69.717,
		mag: 1.67,
		sp: "A"
	},
	{
		n: "Alnilam",
		ra: 5.6036,
		dec: -1.202,
		mag: 1.69,
		sp: "B"
	},
	{
		n: "Alioth",
		ra: 12.9004,
		dec: 55.96,
		mag: 1.76,
		sp: "A"
	},
	{
		n: "Alnitak",
		ra: 5.6793,
		dec: -1.943,
		mag: 1.77,
		sp: "O"
	},
	{
		n: "Dubhe",
		ra: 11.0621,
		dec: 61.751,
		mag: 1.79,
		sp: "K"
	},
	{
		n: "Mirfak",
		ra: 3.4054,
		dec: 49.861,
		mag: 1.79,
		sp: "F"
	},
	{
		n: "Wezen",
		ra: 7.1399,
		dec: -26.393,
		mag: 1.83,
		sp: "F"
	},
	{
		n: "Sargas",
		ra: 17.621,
		dec: -43,
		mag: 1.84,
		sp: "F"
	},
	{
		n: "Kaus Australis",
		ra: 18.4029,
		dec: -34.385,
		mag: 1.85,
		sp: "B"
	},
	{
		n: "Avior",
		ra: 8.3752,
		dec: -59.51,
		mag: 1.86,
		sp: "K"
	},
	{
		n: "Alkaid",
		ra: 13.7923,
		dec: 49.313,
		mag: 1.86,
		sp: "B"
	},
	{
		n: "Menkalinan",
		ra: 5.991,
		dec: 44.947,
		mag: 1.9,
		sp: "A"
	},
	{
		n: "Atria",
		ra: 16.8111,
		dec: -69.028,
		mag: 1.91,
		sp: "K"
	},
	{
		n: "Alhena",
		ra: 6.6285,
		dec: 16.399,
		mag: 1.93,
		sp: "A"
	},
	{
		n: "Peacock",
		ra: 20.4275,
		dec: -56.735,
		mag: 1.94,
		sp: "B"
	},
	{
		n: "Alsephina",
		ra: 8.7458,
		dec: -54.709,
		mag: 1.95,
		sp: "A"
	},
	{
		n: "Mirzam",
		ra: 6.3783,
		dec: -17.956,
		mag: 1.98,
		sp: "B"
	},
	{
		n: "Polaris",
		ra: 2.5303,
		dec: 89.264,
		mag: 1.98,
		sp: "F"
	},
	{
		n: "Alphard",
		ra: 9.4598,
		dec: -8.659,
		mag: 1.98,
		sp: "K"
	},
	{
		n: "Hamal",
		ra: 2.1195,
		dec: 23.463,
		mag: 2,
		sp: "K"
	},
	{
		n: "Algieba",
		ra: 10.3329,
		dec: 19.842,
		mag: 2.01,
		sp: "K"
	},
	{
		n: "Diphda",
		ra: .7265,
		dec: -17.987,
		mag: 2.04,
		sp: "K"
	},
	{
		n: "Nunki",
		ra: 18.9211,
		dec: -26.297,
		mag: 2.05,
		sp: "B"
	},
	{
		n: "Menkent",
		ra: 14.111,
		dec: -36.37,
		mag: 2.06,
		sp: "K"
	},
	{
		n: "Alpheratz",
		ra: .1398,
		dec: 29.09,
		mag: 2.07,
		sp: "B"
	},
	{
		n: "Mirach",
		ra: 1.1622,
		dec: 35.62,
		mag: 2.07,
		sp: "M"
	},
	{
		n: "Saiph",
		ra: 5.796,
		dec: -9.67,
		mag: 2.09,
		sp: "B"
	},
	{
		n: "Kochab",
		ra: 14.8451,
		dec: 74.155,
		mag: 2.08,
		sp: "K"
	},
	{
		n: "Rasalhague",
		ra: 17.5822,
		dec: 12.56,
		mag: 2.08,
		sp: "A"
	},
	{
		n: "Algol",
		ra: 3.1361,
		dec: 40.955,
		mag: 2.12,
		sp: "B"
	},
	{
		n: "Denebola",
		ra: 11.8177,
		dec: 14.572,
		mag: 2.14,
		sp: "A"
	},
	{
		n: "Cih",
		ra: .945,
		dec: 60.717,
		mag: 2.15,
		sp: "B"
	},
	{
		n: "Alnair",
		ra: 22.1372,
		dec: -46.961,
		mag: 1.74,
		sp: "B"
	},
	{
		n: "Alioth",
		ra: 12.9004,
		dec: 55.96,
		mag: 1.76,
		sp: "A"
	},
	{
		n: "Suhail",
		ra: 9.1333,
		dec: -43.433,
		mag: 2.21,
		sp: "K"
	},
	{
		n: "Mintaka",
		ra: 5.5334,
		dec: -.299,
		mag: 2.23,
		sp: "O"
	},
	{
		n: "Caph",
		ra: .1529,
		dec: 59.15,
		mag: 2.28,
		sp: "F"
	},
	{
		n: "Mizar",
		ra: 13.3987,
		dec: 54.925,
		mag: 2.23,
		sp: "A"
	},
	{
		n: "Alphecca",
		ra: 15.5781,
		dec: 26.715,
		mag: 2.23,
		sp: "A"
	},
	{
		n: "Schedar",
		ra: .6751,
		dec: 56.537,
		mag: 2.24,
		sp: "K"
	},
	{
		n: "Eltanin",
		ra: 17.9434,
		dec: 51.489,
		mag: 2.23,
		sp: "K"
	},
	{
		n: "Dschubba",
		ra: 16.0056,
		dec: -22.622,
		mag: 2.29,
		sp: "B"
	},
	{
		n: "Larawag",
		ra: 17.7933,
		dec: -37.044,
		mag: 2.29,
		sp: "K"
	},
	{
		n: "Merak",
		ra: 11.0307,
		dec: 56.382,
		mag: 2.37,
		sp: "A"
	},
	{
		n: "Izar",
		ra: 14.7498,
		dec: 27.074,
		mag: 2.37,
		sp: "K"
	},
	{
		n: "Enif",
		ra: 21.7364,
		dec: 9.875,
		mag: 2.38,
		sp: "K"
	},
	{
		n: "Phecda",
		ra: 11.8972,
		dec: 53.695,
		mag: 2.41,
		sp: "A"
	},
	{
		n: "Scheat",
		ra: 23.0629,
		dec: 28.083,
		mag: 2.42,
		sp: "M"
	},
	{
		n: "Alderamin",
		ra: 21.3096,
		dec: 62.586,
		mag: 2.45,
		sp: "A"
	},
	{
		n: "Markab",
		ra: 23.0793,
		dec: 15.205,
		mag: 2.49,
		sp: "B"
	},
	{
		n: "Gienah",
		ra: 12.2634,
		dec: -17.542,
		mag: 2.58,
		sp: "B"
	},
	{
		n: "Ankaa",
		ra: .438,
		dec: -42.306,
		mag: 2.4,
		sp: "K"
	},
	{
		n: "Almach",
		ra: 2.064,
		dec: 42.33,
		mag: 2.1,
		sp: "K"
	},
	{
		n: "Sadr",
		ra: 20.3705,
		dec: 40.257,
		mag: 2.23,
		sp: "F"
	},
	{
		n: "Albireo",
		ra: 19.5123,
		dec: 27.96,
		mag: 3.05,
		sp: "K"
	},
	{
		n: "Meissa",
		ra: 5.5856,
		dec: 9.934,
		mag: 3.39,
		sp: "O"
	},
	{
		n: "Megrez",
		ra: 12.2571,
		dec: 57.033,
		mag: 3.31,
		sp: "A"
	},
	{
		n: "Imai",
		ra: 12.2524,
		dec: -58.749,
		mag: 2.79,
		sp: "B"
	},
	{
		n: "Naos",
		ra: 8.0597,
		dec: -40.003,
		mag: 2.21,
		sp: "O"
	},
	{
		n: "Aludra",
		ra: 7.4016,
		dec: -29.303,
		mag: 2.45,
		sp: "B"
	},
	{
		n: "Phact",
		ra: 5.6608,
		dec: -34.074,
		mag: 2.65,
		sp: "B"
	},
	{
		n: "Unukalhai",
		ra: 15.7378,
		dec: 6.426,
		mag: 2.63,
		sp: "K"
	},
	{
		n: "Cebalrai",
		ra: 17.7245,
		dec: 4.567,
		mag: 2.76,
		sp: "K"
	},
	{
		n: "Rasalgethi",
		ra: 17.2441,
		dec: 14.39,
		mag: 3.37,
		sp: "M"
	},
	{
		n: "Kornephoros",
		ra: 16.5037,
		dec: 21.49,
		mag: 2.81,
		sp: "G"
	},
	{
		n: "Cursa",
		ra: 5.1338,
		dec: -5.086,
		mag: 2.79,
		sp: "A"
	},
	{
		n: "Aspidiske",
		ra: 9.2848,
		dec: -59.275,
		mag: 2.21,
		sp: "A"
	},
	{
		n: "Gomeisa",
		ra: 7.4525,
		dec: 8.29,
		mag: 2.89,
		sp: "B"
	},
	{
		n: "Algenib",
		ra: .2206,
		dec: 15.184,
		mag: 2.83,
		sp: "B"
	},
	{
		n: "Tarazed",
		ra: 19.7703,
		dec: 10.613,
		mag: 2.72,
		sp: "K"
	},
	{
		n: "Porrima",
		ra: 12.6943,
		dec: -1.449,
		mag: 2.74,
		sp: "F"
	}
];
var SP = {
	O: [
		.62,
		.7,
		1
	],
	B: [
		.67,
		.75,
		1
	],
	A: [
		.82,
		.87,
		1
	],
	F: [
		.95,
		.94,
		1
	],
	G: [
		1,
		.95,
		.88
	],
	K: [
		1,
		.82,
		.62
	],
	M: [
		1,
		.72,
		.52
	]
};
function starRgb(sp) {
	return SP[sp] ?? SP.A;
}
function starSize(mag) {
	return Math.max(1.4, 8.4 * Math.pow(2.512, -mag * .38));
}
var CONSTELLATIONS = [
	{
		name: "Orion",
		lines: [
			["Betelgeuse", "Bellatrix"],
			["Bellatrix", "Mintaka"],
			["Mintaka", "Alnilam"],
			["Alnilam", "Alnitak"],
			["Alnitak", "Saiph"],
			["Saiph", "Rigel"],
			["Rigel", "Mintaka"],
			["Betelgeuse", "Meissa"],
			["Bellatrix", "Meissa"],
			["Betelgeuse", "Alnitak"]
		]
	},
	{
		name: "Ursa Major",
		lines: [
			["Dubhe", "Merak"],
			["Merak", "Phecda"],
			["Phecda", "Megrez"],
			["Megrez", "Alioth"],
			["Alioth", "Mizar"],
			["Mizar", "Alkaid"],
			["Dubhe", "Megrez"]
		]
	},
	{
		name: "Ursa Minor",
		lines: [["Polaris", "Kochab"]]
	},
	{
		name: "Cassiopeia",
		lines: [["Caph", "Schedar"], ["Schedar", "Cih"]]
	},
	{
		name: "Cygnus",
		lines: [["Deneb", "Sadr"], ["Sadr", "Albireo"]]
	},
	{
		name: "Scorpius",
		lines: [
			["Dschubba", "Antares"],
			["Antares", "Shaula"],
			["Shaula", "Larawag"],
			["Larawag", "Sargas"]
		]
	},
	{
		name: "Crux",
		lines: [["Acrux", "Gacrux"], ["Mimosa", "Imai"]]
	},
	{
		name: "Taurus",
		lines: [["Aldebaran", "Elnath"]]
	},
	{
		name: "Gemini",
		lines: [["Castor", "Pollux"], ["Pollux", "Alhena"]]
	},
	{
		name: "Leo",
		lines: [["Regulus", "Algieba"], ["Algieba", "Denebola"]]
	},
	{
		name: "Canis Major",
		lines: [
			["Sirius", "Mirzam"],
			["Sirius", "Adhara"],
			["Adhara", "Wezen"],
			["Wezen", "Aludra"]
		]
	},
	{
		name: "Canis Minor",
		lines: [["Procyon", "Gomeisa"]]
	},
	{
		name: "Auriga",
		lines: [["Capella", "Menkalinan"]]
	},
	{
		name: "Boötes",
		lines: [["Arcturus", "Izar"]]
	},
	{
		name: "Pegasus",
		lines: [
			["Markab", "Scheat"],
			["Scheat", "Alpheratz"],
			["Markab", "Algenib"]
		]
	},
	{
		name: "Andromeda",
		lines: [["Alpheratz", "Mirach"], ["Mirach", "Almach"]]
	},
	{
		name: "Lyra",
		lines: [["Vega", "Deneb"]]
	},
	{
		name: "Aquila",
		lines: [["Altair", "Tarazed"]]
	},
	{
		name: "Virgo",
		lines: [["Spica", "Porrima"]]
	},
	{
		name: "Sagittarius",
		lines: [["Kaus Australis", "Nunki"]]
	}
];
function uniqueStars() {
	const map = /* @__PURE__ */ new Map();
	for (const s of BRIGHT_STARS) map.set(s.n, s);
	return [...map.values()];
}
var skyTagsApi = { current: [] };
var systemRefApi = { labels: false };
var POOL = 40;
function SkyTagHud({ muted = false }) {
	const root = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const host = root.current;
		if (!host) return;
		const els = [];
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
				if (t.kind === "constellation") el.className = cn("rounded-sm px-1 font-mono tracking-[0.16em] uppercase", muted ? "text-[9px] text-muted/80" : "text-[10px] text-muted");
				else if (t.kind === "planet") el.className = cn("paint-chip px-1 py-0.5 font-mono leading-none text-fg", muted ? "text-[9px]" : "text-[10px]");
				else el.className = cn("paint-chip px-1 py-0.5 font-mono leading-none text-fg", muted ? "text-[9px]" : "text-[10px]");
			}
			id = requestAnimationFrame(tick);
		};
		id = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(id);
			for (const el of els) el.remove();
		};
	}, [muted]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: root,
		className: "pointer-events-none absolute inset-0 z-10 overflow-hidden"
	});
}
var EARTH_R$1 = 1.15;
var STAR_DIST = 68;
var CELESTIAL_R = 36;
function localFrame$1(lat, lng) {
	const up = latLngToVector3(lat, lng, 1).normalize();
	const east = new Vector3(0, 1, 0).cross(up);
	if (east.lengthSq() < 1e-10) east.set(1, 0, 0);
	else east.normalize();
	return {
		up,
		east,
		north: new Vector3().crossVectors(up, east).normalize()
	};
}
function skyPoint$1(lat, lng, azimuthDeg, altitudeDeg, distance) {
	const { up, east, north } = localFrame$1(lat, lng);
	const eye = up.clone().multiplyScalar(1.172);
	const az = azimuthDeg * Math.PI / 180;
	const alt = altitudeDeg * Math.PI / 180;
	const dir = new Vector3().addScaledVector(north, Math.cos(az) * Math.cos(alt)).addScaledVector(east, Math.sin(az) * Math.cos(alt)).addScaledVector(up, Math.sin(alt)).normalize();
	return eye.addScaledVector(dir, distance);
}
var starVert = `
  attribute float aSize;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (220.0 / max(1.0, -mv.z));
    gl_Position = projectionMatrix * mv;
  }
`;
var starFrag = `
  varying vec3 vColor;
  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    float d = dot(p, p);
    if (d > 1.0) discard;
    float a = exp(-d * 3.2);
    gl_FragColor = vec4(vColor, a);
  }
`;
function SkyPick({ items, onHover, onIdentify, scientific }) {
	const { camera, gl } = useThree();
	const list = (0, import_react.useRef)(items);
	list.current = items;
	const scratch = (0, import_react.useMemo)(() => new Vector3(), []);
	const start = (0, import_react.useRef)(null);
	const pending = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = gl.domElement;
		const hitTest = (cx, cy) => {
			const rect = el.getBoundingClientRect();
			const pad = scientific ? 8 : 0;
			let best = null;
			for (const it of list.current) {
				scratch.copy(it.position).project(camera);
				if (scratch.z < -1.05 || scratch.z > 1.25) continue;
				const x = (scratch.x * .5 + .5) * rect.width;
				const y = (-scratch.y * .5 + .5) * rect.height;
				const d = Math.hypot(cx - rect.left - x, cy - rect.top - y);
				if (d < it.hit + pad && (!best || d < best.d)) best = {
					item: it,
					x,
					y,
					d
				};
			}
			return best;
		};
		const onMove = (e) => {
			const hit = hitTest(e.clientX, e.clientY);
			onHover(hit ? {
				name: hit.item.name,
				x: hit.x,
				y: hit.y
			} : null);
		};
		const onDown = (e) => {
			start.current = {
				x: e.clientX,
				y: e.clientY
			};
			const hit = hitTest(e.clientX, e.clientY);
			pending.current = hit ? {
				name: hit.item.name,
				blurb: skyBlurb(hit.item.name)
			} : null;
		};
		const onUp = (e) => {
			const s = start.current;
			const picked = pending.current;
			start.current = null;
			pending.current = null;
			if (!s) return;
			if (Math.hypot(e.clientX - s.x, e.clientY - s.y) > 10) return;
			onIdentify(picked);
		};
		const onLeave = () => onHover(null);
		el.addEventListener("pointermove", onMove);
		el.addEventListener("pointerdown", onDown, { capture: true });
		el.addEventListener("pointerup", onUp, { capture: true });
		el.addEventListener("pointerleave", onLeave);
		return () => {
			el.removeEventListener("pointermove", onMove);
			el.removeEventListener("pointerdown", onDown, true);
			el.removeEventListener("pointerup", onUp, true);
			el.removeEventListener("pointerleave", onLeave);
		};
	}, [
		camera,
		gl,
		onHover,
		onIdentify,
		scientific,
		scratch
	]);
	useFrame(() => {});
	return null;
}
function SkyLayer({ date, marker, firstPerson, showConstellations, showPlanets, scientific, planets, sun, moon, onHover, onIdentify }) {
	const stars = (0, import_react.useMemo)(() => uniqueStars(), []);
	const starByName = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const s of stars) m.set(s.n, s);
		return m;
	}, [stars]);
	const fp = Boolean(firstPerson && marker);
	const lat = marker?.lat ?? 0;
	const lng = marker?.lng ?? 0;
	const starGeom = (0, import_react.useMemo)(() => {
		const pos = [];
		const col = [];
		const siz = [];
		const scale = scientific ? .55 : 1;
		if (fp) {
			const sunAlt = sunPosition(date, lat, lng).altitude;
			const fade = sunAlt < -6 ? 1 : MathUtils.clamp((2 - sunAlt) / 8, .12, 1);
			for (const s of stars) {
				const { altitude, azimuth } = equatorialToAltAz(date, lat, lng, s.ra, s.dec);
				if (altitude < -1.2) continue;
				const p = skyPoint$1(lat, lng, azimuth, altitude, STAR_DIST);
				pos.push(p.x, p.y, p.z);
				const rgb = starRgb(s.sp);
				col.push(rgb[0], rgb[1], rgb[2]);
				siz.push(starSize(s.mag) * scale * fade);
			}
		} else for (const s of stars) {
			const g = equatorialToGeo(date, s.ra, s.dec);
			const p = latLngToVector3(g.lat, g.lng, CELESTIAL_R);
			pos.push(p.x, p.y, p.z);
			const rgb = starRgb(s.sp);
			col.push(rgb[0], rgb[1], rgb[2]);
			siz.push(starSize(s.mag) * scale * 1.35);
		}
		const geom = new BufferGeometry();
		geom.setAttribute("position", new Float32BufferAttribute(pos, 3));
		geom.setAttribute("color", new Float32BufferAttribute(col, 3));
		geom.setAttribute("aSize", new Float32BufferAttribute(siz, 1));
		return geom;
	}, [
		date,
		fp,
		lat,
		lng,
		scientific,
		stars
	]);
	(0, import_react.useEffect)(() => () => starGeom.dispose(), [starGeom]);
	const constSegs = (0, import_react.useMemo)(() => {
		const segs = [];
		if (!showConstellations) return segs;
		if (fp) for (const c of CONSTELLATIONS) for (const [a, b] of c.lines) {
			const sa = starByName.get(a);
			const sb = starByName.get(b);
			if (!sa || !sb) continue;
			const pa = equatorialToAltAz(date, lat, lng, sa.ra, sa.dec);
			const pb = equatorialToAltAz(date, lat, lng, sb.ra, sb.dec);
			if (pa.altitude < -8 && pb.altitude < -8) continue;
			segs.push([skyPoint$1(lat, lng, pa.azimuth, pa.altitude, STAR_DIST), skyPoint$1(lat, lng, pb.azimuth, pb.altitude, STAR_DIST)]);
		}
		else for (const c of CONSTELLATIONS) for (const [a, b] of c.lines) {
			const sa = starByName.get(a);
			const sb = starByName.get(b);
			if (!sa || !sb) continue;
			const ga = equatorialToGeo(date, sa.ra, sa.dec);
			const gb = equatorialToGeo(date, sb.ra, sb.dec);
			segs.push([latLngToVector3(ga.lat, ga.lng, CELESTIAL_R), latLngToVector3(gb.lat, gb.lng, CELESTIAL_R)]);
		}
		return segs;
	}, [
		date,
		fp,
		lat,
		lng,
		showConstellations,
		starByName
	]);
	const polaris = (0, import_react.useMemo)(() => {
		const s = starByName.get("Polaris");
		if (!s) return null;
		if (fp) {
			const sky = equatorialToAltAz(date, lat, lng, s.ra, s.dec);
			return {
				pos: skyPoint$1(lat, lng, sky.azimuth, sky.altitude, STAR_DIST),
				up: sky.altitude > -4,
				r: .028
			};
		}
		return {
			pos: latLngToVector3(89.35, 0, 1.9699999999999998),
			up: true,
			r: .016
		};
	}, [
		date,
		fp,
		lat,
		lng,
		starByName
	]);
	const pickItems = (0, import_react.useMemo)(() => {
		const items = [];
		if (fp) {
			const sunSky = sunPosition(date, lat, lng);
			if (sunSky.altitude > -2) items.push({
				name: "Sun",
				position: skyPoint$1(lat, lng, sunSky.azimuth, sunSky.altitude, 22),
				kind: "body",
				hit: 44
			});
			const moonSky = moonPosition(date, lat, lng);
			if (moonSky.altitude > -2) items.push({
				name: "Earth's Moon",
				position: skyPoint$1(lat, lng, moonSky.azimuth, moonSky.altitude, 16),
				kind: "body",
				hit: 72
			});
			for (const s of stars) {
				if (s.mag > 1.35) continue;
				const { altitude, azimuth } = equatorialToAltAz(date, lat, lng, s.ra, s.dec);
				if (altitude < 0) continue;
				items.push({
					name: s.n,
					position: skyPoint$1(lat, lng, azimuth, altitude, STAR_DIST),
					kind: "star",
					hit: 22
				});
			}
		} else {
			items.push({
				name: "Sun",
				position: latLngToVector3(sun.lat, sun.lng, 22),
				kind: "body",
				hit: 48
			});
			items.push({
				name: "Moon",
				position: latLngToVector3(moon.lat, moon.lng, 3.4),
				kind: "body",
				hit: 48
			});
		}
		if (showPlanets) for (const p of planets) {
			const space = PLANET_SPACE[p.name];
			if (fp) {
				const sky = planetAltAz(date, lat, lng, p);
				if (sky.altitude < -2) continue;
				items.push({
					name: p.name,
					position: skyPoint$1(lat, lng, sky.azimuth, sky.altitude, space.skyDist),
					kind: "planet",
					hit: 52
				});
			} else items.push({
				name: p.name,
				position: latLngToVector3(p.lat, p.lng, space.dist),
				kind: "planet",
				hit: 72
			});
		}
		if (polaris?.up) items.push({
			name: "North Star",
			position: polaris.pos,
			kind: "star",
			hit: fp ? 36 : 28
		});
		return items;
	}, [
		date,
		fp,
		lat,
		lng,
		moon.lat,
		moon.lng,
		planets,
		polaris,
		showPlanets,
		stars,
		sun.lat,
		sun.lng
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		starGeom.getAttribute("position")?.count ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("points", {
			frustumCulled: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", {
				object: starGeom,
				attach: "geometry"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
				vertexShader: starVert,
				fragmentShader: starFrag,
				vertexColors: true,
				transparent: true,
				depthWrite: false,
				blending: 2
			})]
		}) : null,
		constSegs.map((pts, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
			points: pts,
			color: scientific ? "#b8c0b4" : "#efe8d2",
			lineWidth: scientific ? 1 : fp ? 1.35 : 1.6,
			transparent: true,
			opacity: scientific ? .45 : fp ? .72 : .7,
			frustumCulled: false
		}, i)),
		polaris?.up ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: polaris.pos,
			frustumCulled: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				polaris.r,
				12,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#e8f3ff" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				scale: 2.4,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					polaris.r,
					10,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#b7d4ff",
					transparent: true,
					opacity: .42,
					depthWrite: false
				})]
			})]
		}) : null,
		showPlanets ? planets.map((p) => {
			const space = PLANET_SPACE[p.name];
			if (fp) {
				const sky = planetAltAz(date, lat, lng, p);
				if (sky.altitude < -2) return null;
				const pos = skyPoint$1(lat, lng, sky.azimuth, sky.altitude, space.skyDist);
				const r = space.skySize * (scientific ? 1.1 : 1.85);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: pos,
					frustumCulled: false,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						r,
						16,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: p.color })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						scale: 2.8,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							r,
							10,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							color: p.color,
							transparent: true,
							opacity: .32,
							depthWrite: false
						})]
					})]
				}, p.name);
			}
			const pos = latLngToVector3(p.lat, p.lng, space.dist);
			const r = space.size * (scientific ? .7 : 1);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: pos,
				frustumCulled: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					r,
					16,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: p.color })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					scale: 1.7,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						r,
						10,
						10
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: p.color,
						transparent: true,
						opacity: .18,
						depthWrite: false
					})]
				})]
			}, p.name);
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkyPick, {
			items: pickItems,
			onHover,
			onIdentify,
			scientific
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkyTagger, {
			date,
			lat,
			lng,
			fp,
			showConstellations,
			polaris,
			showPlanets,
			planets,
			starByName,
			sun,
			moon
		})
	] });
}
function SkyTagger({ date, lat, lng, fp, showConstellations, polaris, showPlanets, planets, starByName, sun, moon }) {
	const { camera, gl } = useThree();
	const scratch = (0, import_react.useMemo)(() => new Vector3(), []);
	const mid = (0, import_react.useMemo)(() => new Vector3(), []);
	const earthTag = (0, import_react.useMemo)(() => new Vector3(), []);
	const moonTag = (0, import_react.useMemo)(() => new Vector3(), []);
	const sunTag = (0, import_react.useMemo)(() => new Vector3(), []);
	const planetTag = (0, import_react.useMemo)(() => new Vector3(), []);
	const sunAlt = fp ? sunPosition(date, lat, lng).altitude : -90;
	useFrame(() => {
		const rect = gl.domElement.getBoundingClientRect();
		const tags = [];
		const project = (pos, name, kind) => {
			scratch.copy(pos).project(camera);
			if (scratch.z < -1 || scratch.z > 1) return;
			if (Math.abs(scratch.x) > .98 || Math.abs(scratch.y) > .96) return;
			tags.push({
				name,
				x: (scratch.x * .5 + .5) * rect.width,
				y: (-scratch.y * .5 + .5) * rect.height,
				kind
			});
		};
		if (!fp) {
			if (systemRefApi.labels) {
				earthTag.copy(camera.position).setLength(EARTH_R$1);
				project(earthTag, "Earth", "body");
				project(latLngToVector3(moon.lat, moon.lng, 3.4, moonTag), "Moon", "body");
				project(latLngToVector3(sun.lat, sun.lng, 22, sunTag), "Sun", "body");
			} else if (polaris?.up) project(polaris.pos, "North Star", "planet");
			if (showPlanets) {
				const camLen = camera.position.length();
				const earthAng = Math.asin(Math.min(1, EARTH_R$1 / Math.max(camLen, 1.2)));
				for (const p of planets) {
					const space = PLANET_SPACE[p.name];
					latLngToVector3(p.lat, p.lng, space.dist, planetTag);
					earthTag.copy(planetTag).sub(camera.position);
					if (earthTag.angleTo(sunTag.copy(camera.position).negate()) < earthAng && earthTag.length() > camLen - EARTH_R$1) continue;
					project(planetTag, p.name, "planet");
				}
			}
			skyTagsApi.current = tags;
			return;
		}
		if (polaris?.up) project(polaris.pos, "North Star", "planet");
		const sunSky = sunPosition(date, lat, lng);
		if (sunSky.altitude > -1) project(skyPoint$1(lat, lng, sunSky.azimuth, sunSky.altitude, 22), "Sun", "body");
		const moonSky = moonPosition(date, lat, lng);
		if (moonSky.altitude > -1) project(skyPoint$1(lat, lng, moonSky.azimuth, moonSky.altitude, 16), "Earth's Moon", "body");
		if (showPlanets) for (const p of planets) {
			const sky = planetAltAz(date, lat, lng, p);
			if (sky.altitude < -1) continue;
			const space = PLANET_SPACE[p.name];
			project(skyPoint$1(lat, lng, sky.azimuth, sky.altitude, space.skyDist), p.name, "planet");
		}
		if (showConstellations && sunAlt < 2) for (const c of CONSTELLATIONS) {
			let x = 0;
			let y = 0;
			let z = 0;
			let n = 0;
			const seen = /* @__PURE__ */ new Set();
			for (const [a, b] of c.lines) for (const name of [a, b]) {
				if (seen.has(name)) continue;
				seen.add(name);
				const s = starByName.get(name);
				if (!s) continue;
				const sky = equatorialToAltAz(date, lat, lng, s.ra, s.dec);
				if (sky.altitude < 4) continue;
				const p = skyPoint$1(lat, lng, sky.azimuth, sky.altitude, STAR_DIST);
				x += p.x;
				y += p.y;
				z += p.z;
				n += 1;
			}
			if (n < 2) continue;
			mid.set(x / n, y / n, z / n);
			project(mid, c.name, "constellation");
		}
		skyTagsApi.current = tags;
	});
	return null;
}
var headingApi = { current: {
	first: false,
	headingDeg: 0,
	roseDeg: 0
} };
var CARDINALS = [
	"N",
	"NNE",
	"NE",
	"ENE",
	"E",
	"ESE",
	"SE",
	"SSE",
	"S",
	"SSW",
	"SW",
	"WSW",
	"W",
	"WNW",
	"NW",
	"NNW"
];
var TAPE = [
	{
		deg: 0,
		label: "N"
	},
	{
		deg: 45,
		label: "NE"
	},
	{
		deg: 90,
		label: "E"
	},
	{
		deg: 135,
		label: "SE"
	},
	{
		deg: 180,
		label: "S"
	},
	{
		deg: 225,
		label: "SW"
	},
	{
		deg: 270,
		label: "W"
	},
	{
		deg: 315,
		label: "NW"
	}
];
var PX = 1.15;
var LOOPS = [
	-360,
	0,
	360
];
function cardinal(deg) {
	return CARDINALS[Math.round((deg % 360 + 360) % 360 / 22.5) % 16];
}
function CompassHud({ muted = false }) {
	const tape = (0, import_react.useRef)(null);
	const read = (0, import_react.useRef)(null);
	const rose = (0, import_react.useRef)(null);
	const globe = (0, import_react.useRef)(null);
	const sky = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let id = 0;
		const tick = () => {
			const h = headingApi.current;
			if (sky.current) sky.current.style.display = h.first ? "flex" : "none";
			if (globe.current) globe.current.style.display = h.first ? "none" : "flex";
			if (tape.current) tape.current.style.transform = `translateX(${120 - h.headingDeg * PX}px)`;
			if (read.current) read.current.textContent = `${Math.round(h.headingDeg).toString().padStart(3, "0")}° ${cardinal(h.headingDeg)}`;
			if (rose.current) rose.current.style.transform = `rotate(${h.roseDeg}deg)`;
			id = requestAnimationFrame(tick);
		};
		id = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute top-3 left-1/2 z-10 -translate-x-1/2 sm:top-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: globe,
			className: "flex flex-col items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("paint-chip relative size-12", muted ? "opacity-70" : "backdrop-blur-sm"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: rose,
					className: "absolute inset-0 will-change-transform",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-0.5 left-1/2 -translate-x-1/2 font-mono text-[10px] font-semibold text-brand",
							children: "N"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-1/2 right-1 -translate-y-1/2 font-mono text-[9px] text-muted",
							children: "E"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute bottom-0.5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-muted",
							children: "S"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-1/2 left-1 -translate-y-1/2 font-mono text-[9px] text-muted",
							children: "W"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1/2 left-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg/80" })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: sky,
			className: "hidden w-[240px] flex-col items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("paint-chip relative h-8 w-full overflow-hidden", muted ? "opacity-70" : "backdrop-blur-sm"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: tape,
						className: "absolute top-0 left-0 h-full will-change-transform",
						children: LOOPS.flatMap((shift) => TAPE.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("absolute top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[11px]", m.label === "N" ? "font-semibold text-brand" : "text-muted"),
							style: { left: (m.deg + shift) * PX },
							children: m.label
						}, `${shift}-${m.deg}`)))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-0 left-1/2 h-1 w-px -translate-x-1/2 bg-brand" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-0 bottom-0 left-0 h-px bg-border" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				ref: read,
				className: "mt-0.5 font-mono text-[10px] tracking-wide text-fg",
				children: "000° N"
			})]
		})]
	});
}
var EARTH_R = 1.15;
var MIN_DIST = 1.72;
var MAX_DIST = 360;
var VIEW_DIST = 6.05;
var GLOBE_NEAR = .08;
var FP_NEAR = .002;
var GLOBE_FOV = 40;
var FP_FOV = 92;
var FP_FOV_MIN = 30;
var FP_FOV_MAX = 120;
var TRANSITION_SEC = 1.7;
var SUN_DIST = 22;
var MOON_DIST = 3.4;
var SKY_MOON_DIST = 16;
var SKY_SUN_DIST = 22;
var SKY_MOON_SIZE = .88;
var SKY_SUN_SIZE = .14;
var LOOK_PITCH_MIN = -.38;
var LOOK_PITCH_MAX = 1.45;
var HORIZON_ALT = -7;
var zoomApi = {
	cam: null,
	controls: null,
	first: false,
	look: null,
	clearDest: () => {}
};
var frameApi = {
	seq: 0,
	pending: false
};
var homeApi = {
	seq: 0,
	pending: false
};
function systemViewPose(sun, moon, from, aspect) {
	const s = latLngToVector3(sun.lat, sun.lng, SUN_DIST);
	const m = latLngToVector3(moon.lat, moon.lng, MOON_DIST);
	const target = s.clone().multiplyScalar(.38);
	let axis = new Vector3().crossVectors(s, m);
	if (axis.lengthSq() < 1e-4) {
		axis.crossVectors(s, new Vector3(0, 1, 0));
		if (axis.lengthSq() < 1e-4) axis.set(1, 0, 0);
	}
	axis.normalize();
	if (from.lengthSq() > 1e-8 && axis.dot(from) < 0) axis.negate();
	let polar = Math.acos(MathUtils.clamp(axis.y, -1, 1));
	const minP = .28;
	const maxP = Math.PI - .28;
	if (polar < minP || polar > maxP) {
		const aim = polar < minP ? minP : maxP;
		const xz = Math.hypot(axis.x, axis.z) || 1e-6;
		const r = Math.sin(aim);
		axis.set(axis.x / xz * r, Math.cos(aim), axis.z / xz * r).normalize();
	}
	const vHalf = Math.tan(GLOBE_FOV * Math.PI / 360);
	const hHalf = vHalf * Math.max(aspect, .38);
	const half = Math.min(vHalf, hHalf);
	const span = Math.max(target.length() + EARTH_R, s.distanceTo(target) + 1.15, m.distanceTo(target) + .55);
	const dist = MathUtils.clamp(span / Math.max(half, .08) * 1.3, 32, MAX_DIST);
	return {
		pos: target.clone().addScaledVector(axis, dist),
		target
	};
}
function snapSystemView(cam, controls, sun, moon) {
	const pose = systemViewPose(sun, moon, cam.position, cam.aspect || 1);
	cam.position.copy(pose.pos);
	cam.up.set(0, 1, 0);
	cam.lookAt(pose.target);
	cam.near = GLOBE_NEAR;
	cam.fov = GLOBE_FOV;
	cam.updateProjectionMatrix();
	if (controls) {
		controls.target.copy(pose.target);
		controls.update();
	}
}
function applyZoom(dir) {
	systemRefApi.labels = false;
	if (zoomApi.first && zoomApi.look) {
		const next = zoomApi.look.fov * (dir < 0 ? .78 : 1.28);
		zoomApi.look.fov = MathUtils.clamp(next, FP_FOV_MIN, FP_FOV_MAX);
		return;
	}
	const cam = zoomApi.cam;
	if (!cam) return;
	const len = cam.position.length();
	const next = MathUtils.clamp(len * (dir < 0 ? .7 : 1.48), MIN_DIST, MAX_DIST);
	cam.position.multiplyScalar(next / Math.max(len, .001));
	zoomApi.controls?.update();
	zoomApi.clearDest();
}
function snapHomeView(cam, controls, lat, lng, moon) {
	const pin = latLngToVector3(lat, lng, 1);
	const dist = latLngToVector3(moon.lat, moon.lng, MOON_DIST).normalize().dot(pin) > .08 ? 7.2 : VIEW_DIST;
	cam.position.copy(pin).multiplyScalar(dist);
	cam.up.set(0, 1, 0);
	cam.lookAt(0, 0, 0);
	cam.near = GLOBE_NEAR;
	cam.fov = GLOBE_FOV;
	cam.updateProjectionMatrix();
	if (controls) {
		controls.target.set(0, 0, 0);
		controls.update();
	}
}
function requestHomeView(hasPin, exitFirst) {
	if (!hasPin) return;
	systemRefApi.labels = false;
	if (zoomApi.first) {
		homeApi.pending = true;
		homeApi.seq++;
		exitFirst?.(false);
		return;
	}
	homeApi.pending = false;
	homeApi.seq++;
}
function requestSystemView(exitFirst) {
	systemRefApi.labels = true;
	if (zoomApi.first) {
		frameApi.pending = true;
		frameApi.seq++;
		exitFirst?.(false);
		return;
	}
	frameApi.pending = false;
	frameApi.seq++;
}
var _hFwd = new Vector3();
var _hEast = new Vector3();
var _hNorth = new Vector3();
var _hUp = new Vector3();
var _hRight = new Vector3();
var _hNadir = new Vector3();
var _hHoriz = new Vector3();
var _lookDir = new Vector3();
var _lookRight = new Vector3();
var _lookCamUp = new Vector3();
var _lookBack = new Vector3();
var _lookMat = new Matrix4();
var _lookEye = new Vector3();
function publishHeading(cam, first, lat, lng, yaw) {
	headingApi.current.first = first;
	if (first && lat != null && lng != null) {
		const frame = localFrame(lat, lng);
		_hFwd.set(0, 0, -1).applyQuaternion(cam.quaternion);
		_hHoriz.copy(_hFwd).addScaledVector(frame.up, -_hFwd.dot(frame.up));
		if (_hHoriz.lengthSq() > 1e-8) {
			_hHoriz.normalize();
			headingApi.current.headingDeg = (Math.atan2(_hHoriz.dot(frame.east), _hHoriz.dot(frame.north)) * 180 / Math.PI % 360 + 360) % 360;
		} else headingApi.current.headingDeg = (yaw * 180 / Math.PI % 360 + 360) % 360;
	} else headingApi.current.headingDeg = (yaw * 180 / Math.PI % 360 + 360) % 360;
	_hNadir.copy(cam.position).normalize();
	_hEast.set(0, 1, 0).cross(_hNadir);
	if (_hEast.lengthSq() < 1e-10) _hEast.set(1, 0, 0);
	else _hEast.normalize();
	_hNorth.crossVectors(_hNadir, _hEast).normalize();
	_hRight.set(1, 0, 0).applyQuaternion(cam.quaternion);
	_hUp.set(0, 1, 0).applyQuaternion(cam.quaternion);
	headingApi.current.roseDeg = Math.atan2(_hNorth.dot(_hRight), _hNorth.dot(_hUp)) * 180 / Math.PI;
}
var earthVert = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
var earthFrag = `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform vec3 uSun;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  void main() {
    vec3 n = normalize(vWorldNormal);
    vec3 l = normalize(uSun);
    float ndl = dot(n, l);

    vec3 dayTex = texture2D(uDay, vUv).rgb;
    vec3 day = pow(dayTex, vec3(0.82)) * 1.85 + vec3(0.03, 0.04, 0.07);

    vec3 nightTex = texture2D(uNight, vUv).rgb;
    float lights = smoothstep(0.08, 0.36, dot(nightTex, vec3(0.33)));
    vec3 nightLand = dayTex * 0.38 + vec3(0.01, 0.015, 0.03);
    vec3 night = nightLand + nightTex * 1.55 * lights;

    float t = smoothstep(-0.0025, 0.0025, ndl);
    vec3 color = mix(night, day, t);

    float line = exp(-ndl * ndl * 9000.0);
    float halo = exp(-ndl * ndl * 2200.0);
    color += vec3(1.0, 0.48, 0.1) * halo * 0.4;
    color = mix(color, vec3(1.0, 0.86, 0.45), line * 0.85);

    float spec = pow(max(ndl, 0.0), 28.0) * 0.18 * t;
    gl_FragColor = vec4(color + vec3(spec), 1.0);
  }
`;
if (typeof window !== "undefined") {
	useTexture.preload("/textures/earth-day.jpg");
	useTexture.preload("/textures/earth-night.png");
	useTexture.preload("/textures/moon.jpg");
}
function Earth({ sun }) {
	const [dayMap, nightMap] = useTexture(["/textures/earth-day.jpg", "/textures/earth-night.png"]);
	dayMap.colorSpace = SRGBColorSpace;
	nightMap.colorSpace = SRGBColorSpace;
	dayMap.anisotropy = 4;
	nightMap.anisotropy = 4;
	const uniforms = (0, import_react.useMemo)(() => ({
		uDay: { value: dayMap },
		uNight: { value: nightMap },
		uSun: { value: new Vector3() }
	}), [dayMap, nightMap]);
	useFrame(() => {
		latLngToVector3(sun.lat, sun.lng, 1, uniforms.uSun.value).normalize();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
		EARTH_R,
		96,
		72
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
		vertexShader: earthVert,
		fragmentShader: earthFrag,
		uniforms,
		toneMapped: false
	}, "earth-term-v5")] });
}
function Atmosphere({ sun }) {
	const uniforms = (0, import_react.useMemo)(() => ({ uSun: { value: new Vector3() } }), []);
	useFrame(() => {
		latLngToVector3(sun.lat, sun.lng, 1, uniforms.uSun.value).normalize();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		scale: 1.09,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			EARTH_R,
			48,
			32
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			side: 1,
			transparent: true,
			depthWrite: false,
			blending: 2,
			uniforms,
			vertexShader: `
          varying vec3 vNview;
          varying vec3 vNworld;
          void main() {
            vNview = normalize(normalMatrix * normal);
            vNworld = normalize(mat3(modelMatrix) * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
			fragmentShader: `
          uniform vec3 uSun;
          varying vec3 vNview;
          varying vec3 vNworld;
          void main() {
            float rim = pow(0.72 - dot(normalize(vNview), vec3(0.0, 0.0, 1.0)), 2.8);
            float ndl = dot(normalize(vNworld), normalize(uSun));
            float day = smoothstep(0.0, 0.15, ndl);
            float term = exp(-ndl * ndl * 1800.0);
            vec3 col = mix(vec3(0.01, 0.02, 0.05), vec3(0.35, 0.52, 0.95), day);
            col = mix(col, vec3(1.0, 0.55, 0.16), term * 0.7);
            float a = clamp(rim * mix(0.02, 0.4, day) + term * rim * 0.7, 0.0, 0.52);
            gl_FragColor = vec4(col, a);
          }
        `
		})]
	});
}
function DaySky({ lat, lng, date }) {
	const uniforms = (0, import_react.useMemo)(() => {
		const sun = sunPosition(date, lat, lng);
		const sky = skyPoint(lat, lng, sun.azimuth, sun.altitude, 1);
		return {
			uUp: { value: sky.up.clone() },
			uSunDir: { value: sky.dir.clone() },
			uSunAlt: { value: sun.altitude }
		};
	}, [
		date,
		lat,
		lng
	]);
	useFrame(() => {
		const sun = sunPosition(date, lat, lng);
		const sky = skyPoint(lat, lng, sun.azimuth, sun.altitude, 1);
		uniforms.uUp.value.copy(sky.up);
		uniforms.uSunDir.value.copy(sky.dir);
		uniforms.uSunAlt.value = sun.altitude;
	});
	const mat = (0, import_react.useMemo)(() => new ShaderMaterial({
		side: 1,
		depthWrite: false,
		depthTest: false,
		toneMapped: false,
		uniforms,
		vertexShader: `
          varying vec3 vWorld;
          void main() {
            vec4 w = modelMatrix * vec4(position, 1.0);
            vWorld = w.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
		fragmentShader: `
          uniform vec3 uUp;
          uniform vec3 uSunDir;
          uniform float uSunAlt;
          varying vec3 vWorld;
          void main() {
            vec3 view = normalize(vWorld - cameraPosition);
            float h = dot(view, normalize(uUp));
            float day = smoothstep(-8.0, 8.0, uSunAlt);
            float twilight = exp(-abs(uSunAlt) * 0.18) * (1.0 - day);
            float zh = smoothstep(-0.04, 0.62, h);
            vec3 dayZenith = vec3(0.32, 0.62, 0.96);
            vec3 dayHoriz = vec3(0.78, 0.9, 0.98);
            vec3 nightZenith = vec3(0.027, 0.031, 0.039);
            vec3 nightHoriz = vec3(0.07, 0.08, 0.11);
            vec3 duskHoriz = vec3(0.92, 0.48, 0.24);
            vec3 col = mix(mix(nightHoriz, nightZenith, zh), mix(dayHoriz, dayZenith, zh), day);
            col = mix(col, mix(duskHoriz, nightZenith, zh), twilight * 0.85);
            vec3 sunD = normalize(uSunDir);
            float sunDot = max(dot(view, sunD), 0.0);
            col += vec3(1.0, 0.88, 0.55) * pow(sunDot, 36.0) * day * 0.55;
            col += vec3(1.0, 0.96, 0.82) * smoothstep(0.9992, 0.9997, sunDot);
            float clouds = 0.5 + 0.5 * sin(view.x * 4.2 + view.z * 1.6);
            clouds *= 0.5 + 0.5 * sin(view.z * 3.1 - view.x * 0.8);
            clouds = smoothstep(0.58, 0.88, clouds) * smoothstep(0.04, 0.22, h) * smoothstep(0.7, 0.28, h);
            col = mix(col, vec3(1.0, 0.98, 0.96), clouds * day * 0.28);
            gl_FragColor = vec4(col, 1.0);
          }
        `
	}), [uniforms]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		renderOrder: -20,
		frustumCulled: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			120,
			32,
			20
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", {
			object: mat,
			attach: "material"
		})]
	});
}
function Marker({ lat, lng }) {
	const group = (0, import_react.useRef)(null);
	const pos = (0, import_react.useMemo)(() => latLngToVector3(lat, lng, 1.17), [lat, lng]);
	const quat = (0, import_react.useMemo)(() => {
		const q = new Quaternion();
		const dir = pos.clone().normalize();
		if (dir.lengthSq() < 1e-4) return q;
		q.setFromUnitVectors(new Vector3(0, 1, 0), dir);
		return q;
	}, [pos]);
	const ring = (0, import_react.useRef)(null);
	useFrame(({ camera, clock }) => {
		if (group.current) {
			const dist = camera.position.length();
			const s = MathUtils.clamp(dist / VIEW_DIST, .9, 2.4);
			group.current.scale.setScalar(s);
		}
		if (!ring.current) return;
		const t = (Math.sin(clock.elapsedTime * 2.2) + 1) / 2;
		const s = 1 + t * 1.15;
		ring.current.scale.set(s, s, s);
		const mat = ring.current.material;
		mat.opacity = .7 - t * .55;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		position: pos,
		quaternion: quat,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: ring,
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				renderOrder: 3,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
					.05,
					.068,
					40
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#c6ff1a",
					transparent: true,
					opacity: .55,
					side: 2,
					depthWrite: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.01,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.008,
					.008,
					.028,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#1a1a12" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.055,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.032,
					16,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#c6ff1a" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.11,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.018,
					.08,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#c6ff1a" })]
			})
		]
	});
}
function GlowSphere({ point, distance, size, color, glow, map, light }) {
	const pos = (0, import_react.useMemo)(() => latLngToVector3(point.lat, point.lng, distance), [
		point.lat,
		point.lng,
		distance
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: pos,
		children: [
			light ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				color: "#fff1d6",
				intensity: 22,
				distance: 90,
				decay: 2
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				size,
				24,
				24
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map,
				color,
				emissive: glow,
				emissiveIntensity: map ? .18 : 3.4,
				roughness: map ? .94 : .28,
				metalness: 0
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				scale: 1.55,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					size,
					16,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: glow,
					transparent: true,
					opacity: light ? .28 : .12,
					depthWrite: false
				})]
			})
		]
	});
}
function quatLook(pos, target, up) {
	const m = new Matrix4().lookAt(pos, target, up);
	return new Quaternion().setFromRotationMatrix(m);
}
function localFrame(lat, lng) {
	const up = latLngToVector3(lat, lng, 1).normalize();
	const east = new Vector3(0, 1, 0).cross(up);
	if (east.lengthSq() < 1e-10) east.set(1, 0, 0);
	else east.normalize();
	return {
		up,
		east,
		north: new Vector3().crossVectors(up, east).normalize()
	};
}
function skyPoint(lat, lng, azimuthDeg, altitudeDeg, distance) {
	const { up, east, north } = localFrame(lat, lng);
	const eye = up.clone().multiplyScalar(1.172);
	const az = azimuthDeg * Math.PI / 180;
	const alt = altitudeDeg * Math.PI / 180;
	const dir = new Vector3().addScaledVector(north, Math.cos(az) * Math.cos(alt)).addScaledVector(east, Math.sin(az) * Math.cos(alt)).addScaledVector(up, Math.sin(alt)).normalize();
	return {
		eye,
		up,
		dir,
		point: eye.clone().addScaledVector(dir, distance)
	};
}
function skyAim(lat, lng, date) {
	const sun = sunPosition(date, lat, lng);
	const moon = moonPosition(date, lat, lng);
	const focus = pickSkyFocus(moon.altitude, sun.altitude);
	return {
		sun,
		moon,
		focus,
		aim: {
			azimuth: focus === "sun" ? sun.azimuth : focus === "moon" ? moon.azimuth : moon.altitude >= sun.altitude ? moon.azimuth : sun.azimuth,
			altitude: HORIZON_ALT
		},
		dist: SKY_MOON_DIST
	};
}
function firstPersonPose(lat, lng, date) {
	const { aim, dist } = skyAim(lat, lng, date);
	const sky = skyPoint(lat, lng, aim.azimuth, aim.altitude, dist);
	return {
		pos: sky.eye,
		quat: quatLook(sky.eye, sky.point, sky.up),
		up: sky.up,
		target: sky.point,
		near: FP_NEAR,
		fov: FP_FOV
	};
}
function applyLook(camera, lat, lng, yaw, pitch, fov) {
	const { up, east, north } = localFrame(lat, lng);
	const safePitch = MathUtils.clamp(pitch, LOOK_PITCH_MIN, LOOK_PITCH_MAX);
	const cp = Math.cos(safePitch);
	_lookEye.copy(up).multiplyScalar(1.172);
	_lookDir.copy(north).multiplyScalar(Math.cos(yaw) * cp).addScaledVector(east, Math.sin(yaw) * cp).addScaledVector(up, Math.sin(safePitch));
	if (_lookDir.lengthSq() < 1e-10) _lookDir.copy(north);
	else _lookDir.normalize();
	_lookRight.crossVectors(_lookDir, up);
	if (_lookRight.lengthSq() < 1e-5) _lookRight.crossVectors(_lookDir, Math.abs(_lookDir.dot(east)) > .2 ? east : north);
	if (_lookRight.lengthSq() < 1e-5) _lookRight.set(1, 0, 0);
	_lookRight.normalize();
	_lookCamUp.crossVectors(_lookRight, _lookDir);
	if (_lookCamUp.lengthSq() < 1e-5) _lookCamUp.copy(up);
	else _lookCamUp.normalize();
	_lookBack.copy(_lookDir).multiplyScalar(-1);
	_lookMat.makeBasis(_lookRight, _lookCamUp, _lookBack);
	camera.quaternion.setFromRotationMatrix(_lookMat);
	camera.position.copy(_lookEye);
	camera.up.copy(_lookCamUp);
	if (!Number.isFinite(camera.quaternion.x) || !Number.isFinite(camera.position.x)) {
		camera.position.copy(_lookEye);
		camera.up.copy(up);
		camera.quaternion.setFromUnitVectors(new Vector3(0, 0, -1), north);
	}
	camera.near = FP_NEAR;
	camera.far = 1400;
	camera.fov = fov;
	camera.updateProjectionMatrix();
}
function globePose(lat, lng, fallback) {
	const pos = lat != null && lng != null && Number.isFinite(lat) && Number.isFinite(lng) ? latLngToVector3(lat, lng, VIEW_DIST) : fallback.clone().setLength(VIEW_DIST);
	const target = new Vector3(0, 0, 0);
	const up = new Vector3(0, 1, 0);
	return {
		pos,
		quat: quatLook(pos, target, up),
		up,
		target,
		near: GLOBE_NEAR,
		fov: GLOBE_FOV
	};
}
function capturePose(camera, target) {
	return {
		pos: camera.position.clone(),
		quat: camera.quaternion.clone(),
		up: camera.up.clone(),
		target: target.clone(),
		near: camera.near,
		fov: camera.fov
	};
}
function applyPose(camera, pose) {
	camera.position.copy(pose.pos);
	camera.quaternion.copy(pose.quat);
	camera.up.copy(pose.up);
	camera.near = pose.near;
	camera.fov = pose.fov;
	camera.updateProjectionMatrix();
}
function Rig({ lat, lng, date, firstPerson, sun, moon }) {
	const controls = (0, import_react.useRef)(null);
	const { camera, gl } = useThree();
	const [spin, setSpin] = (0, import_react.useState)(true);
	const idle = (0, import_react.useRef)(0);
	const dest = (0, import_react.useRef)(null);
	const anim = (0, import_react.useRef)(null);
	const inFirst = (0, import_react.useRef)(false);
	const reduceMotion = (0, import_react.useRef)(false);
	const [locked, setLocked] = (0, import_react.useState)(false);
	const look = (0, import_react.useRef)({
		yaw: 0,
		pitch: .2,
		fov: FP_FOV
	});
	const drag = (0, import_react.useRef)(null);
	const flick = (0, import_react.useRef)({
		yaw: 0,
		pitch: 0
	});
	const frameSeq = (0, import_react.useRef)(0);
	const homeSeq = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}, []);
	(0, import_react.useEffect)(() => {
		zoomApi.clearDest = () => {
			dest.current = null;
			setSpin(false);
			idle.current = 0;
		};
		return () => {
			zoomApi.clearDest = () => {};
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const el = gl.domElement;
		const onDown = (e) => {
			if (!inFirst.current || anim.current) return;
			drag.current = {
				id: e.pointerId,
				x: e.clientX,
				y: e.clientY
			};
			el.setPointerCapture(e.pointerId);
			el.style.cursor = "grabbing";
		};
		const onMove = (e) => {
			const d = drag.current;
			if (!d || d.id !== e.pointerId) return;
			const dx = e.clientX - d.x;
			const dy = e.clientY - d.y;
			d.x = e.clientX;
			d.y = e.clientY;
			look.current.yaw -= dx * .0034;
			const nextPitch = look.current.pitch + dy * .0028;
			look.current.pitch = MathUtils.clamp(nextPitch, LOOK_PITCH_MIN, LOOK_PITCH_MAX);
			flick.current.yaw = -dx * .0034;
			flick.current.pitch = look.current.pitch === LOOK_PITCH_MAX || look.current.pitch === LOOK_PITCH_MIN ? 0 : dy * .0028;
		};
		const onUp = (e) => {
			if (drag.current?.id !== e.pointerId) return;
			drag.current = null;
			el.style.cursor = inFirst.current ? "grab" : "";
		};
		const onWheel = (e) => {
			if (!inFirst.current || anim.current) return;
			e.preventDefault();
			const step = Math.sign(e.deltaY) * Math.min(9, Math.max(3.5, Math.abs(e.deltaY) * .045));
			const next = look.current.fov + step;
			look.current.fov = MathUtils.clamp(next, FP_FOV_MIN, FP_FOV_MAX);
		};
		el.addEventListener("pointerdown", onDown);
		el.addEventListener("pointermove", onMove);
		el.addEventListener("pointerup", onUp);
		el.addEventListener("pointercancel", onUp);
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => {
			el.removeEventListener("pointerdown", onDown);
			el.removeEventListener("pointermove", onMove);
			el.removeEventListener("pointerup", onUp);
			el.removeEventListener("pointercancel", onUp);
			el.removeEventListener("wheel", onWheel);
			el.style.cursor = "";
		};
	}, [gl]);
	const beginTransition = (0, import_react.useCallback)((wantFirst) => {
		const cam = camera;
		dest.current = null;
		drag.current = null;
		flick.current.yaw = 0;
		flick.current.pitch = 0;
		setSpin(false);
		setLocked(true);
		idle.current = 0;
		const from = capturePose(cam, new Vector3(0, 0, -1).applyQuaternion(cam.quaternion).add(cam.position));
		const to = wantFirst && lat != null && lng != null ? firstPersonPose(lat, lng, date) : globePose(lat, lng, cam.position);
		if (wantFirst && lat != null && lng != null) {
			const { aim } = skyAim(lat, lng, date);
			look.current.yaw = aim.azimuth * Math.PI / 180;
			look.current.pitch = MathUtils.clamp(aim.altitude * Math.PI / 180, LOOK_PITCH_MIN, LOOK_PITCH_MAX);
			look.current.fov = FP_FOV;
		}
		anim.current = {
			from,
			to,
			elapsed: 0,
			duration: reduceMotion.current ? .05 : TRANSITION_SEC,
			wantFirst
		};
	}, [
		camera,
		lat,
		lng,
		date
	]);
	(0, import_react.useEffect)(() => {
		const want = Boolean(firstPerson && lat != null && lng != null && Number.isFinite(lat) && Number.isFinite(lng));
		if (anim.current) return;
		if (want === inFirst.current) return;
		if (!want && firstPerson) return;
		beginTransition(want);
	}, [
		firstPerson,
		lat,
		lng,
		beginTransition
	]);
	(0, import_react.useEffect)(() => {
		if (firstPerson || inFirst.current || anim.current) return;
		if (lat == null || lng == null) return;
		if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
		dest.current = latLngToVector3(lat, lng, VIEW_DIST);
		systemRefApi.labels = false;
		setSpin(false);
		idle.current = 0;
	}, [
		lat,
		lng,
		firstPerson
	]);
	useFrame((_, delta) => {
		const d = Math.min(delta, .08);
		const c = controls.current;
		const cam = camera;
		zoomApi.cam = cam;
		zoomApi.controls = c;
		zoomApi.first = inFirst.current;
		zoomApi.look = look.current;
		const a = anim.current;
		if (a) {
			a.elapsed += d;
			const u = Math.min(1, a.elapsed / Math.max(a.duration, .001));
			const e = easeInOutQuint(u);
			lerpRadial(a.from.pos, a.to.pos, e, cam.position);
			cam.quaternion.slerpQuaternions(a.from.quat, a.to.quat, e);
			cam.up.lerpVectors(a.from.up, a.to.up, e).normalize();
			cam.near = MathUtils.lerp(a.from.near, a.to.near, e);
			cam.fov = MathUtils.lerp(a.from.fov, a.to.fov, e);
			cam.updateProjectionMatrix();
			if (u >= 1) {
				applyPose(cam, a.to);
				inFirst.current = a.wantFirst;
				anim.current = null;
				gl.domElement.style.cursor = a.wantFirst ? "grab" : "";
				if (!a.wantFirst) {
					cam.up.set(0, 1, 0);
					cam.lookAt(0, 0, 0);
					cam.near = GLOBE_NEAR;
					cam.far = 500;
					cam.fov = GLOBE_FOV;
					cam.updateProjectionMatrix();
					if (frameApi.pending) {
						frameApi.pending = false;
						frameSeq.current = frameApi.seq;
						systemRefApi.labels = true;
						snapSystemView(cam, controls.current, sun, moon);
					} else if (homeApi.pending && lat != null && lng != null) {
						homeApi.pending = false;
						homeSeq.current = homeApi.seq;
						snapHomeView(cam, controls.current, lat, lng, moon);
					}
				}
				setLocked(a.wantFirst);
			}
			publishHeading(cam, a.wantFirst || inFirst.current, lat, lng, look.current.yaw);
			return;
		}
		if (inFirst.current && lat != null && lng != null) {
			try {
				if (!drag.current) {
					look.current.yaw += flick.current.yaw;
					look.current.pitch = MathUtils.clamp(look.current.pitch + flick.current.pitch, LOOK_PITCH_MIN, LOOK_PITCH_MAX);
					flick.current.yaw *= .88;
					flick.current.pitch *= .88;
					if (Math.abs(flick.current.yaw) < 15e-5) flick.current.yaw = 0;
					if (Math.abs(flick.current.pitch) < 15e-5) flick.current.pitch = 0;
				}
				look.current.pitch = MathUtils.clamp(look.current.pitch, LOOK_PITCH_MIN, LOOK_PITCH_MAX);
				applyLook(cam, lat, lng, look.current.yaw, look.current.pitch, look.current.fov);
				cam.layers.enable(1);
				publishHeading(cam, true, lat, lng, look.current.yaw);
			} catch {
				look.current.pitch = MathUtils.clamp(look.current.pitch, -.1, .6);
				applyLook(cam, lat, lng, look.current.yaw, look.current.pitch, look.current.fov);
			}
			return;
		}
		cam.layers.disable(1);
		if (dest.current) {
			cam.position.lerp(dest.current, 1 - Math.pow(.001, d));
			if (cam.position.distanceTo(dest.current) < .03) {
				cam.position.copy(dest.current);
				dest.current = null;
			}
			c?.target.set(0, 0, 0);
			c?.update();
		}
		if (frameApi.seq !== frameSeq.current && !frameApi.pending) {
			frameSeq.current = frameApi.seq;
			dest.current = null;
			snapSystemView(cam, c, sun, moon);
			setSpin(false);
			idle.current = 0;
		}
		if (homeApi.seq !== homeSeq.current && !homeApi.pending && lat != null && lng != null) {
			homeSeq.current = homeApi.seq;
			dest.current = null;
			snapHomeView(cam, c, lat, lng, moon);
			setSpin(false);
			idle.current = 0;
		}
		if (spin) {
			idle.current = 0;
			publishHeading(cam, false, lat, lng, look.current.yaw);
			return;
		}
		idle.current += d;
		if (idle.current > 6) setSpin(true);
		publishHeading(cam, false, lat, lng, look.current.yaw);
	});
	if (firstPerson || locked) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
		ref: controls,
		makeDefault: true,
		enablePan: false,
		enableDamping: true,
		dampingFactor: .055,
		autoRotate: spin && !reduceMotion.current,
		autoRotateSpeed: .22,
		minDistance: MIN_DIST,
		maxDistance: MAX_DIST,
		zoomSpeed: 1.05,
		rotateSpeed: .28,
		minPolarAngle: .18,
		maxPolarAngle: Math.PI - .18,
		touches: {
			ONE: TOUCH.ROTATE,
			TWO: TOUCH.DOLLY_ROTATE
		},
		onStart: () => {
			dest.current = null;
			systemRefApi.labels = false;
			setSpin(false);
			idle.current = 0;
		}
	});
}
function FallbackEarth() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
		EARTH_R,
		32,
		24
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		color: "#1b2430",
		roughness: 1,
		metalness: 0
	})] });
}
function SkyMoon({ position, map }) {
	const mesh = (0, import_react.useRef)(null);
	const glow = (0, import_react.useRef)(null);
	const fill = (0, import_react.useRef)(null);
	const { camera } = useThree();
	(0, import_react.useEffect)(() => {
		mesh.current?.layers.set(1);
		glow.current?.layers.set(1);
		fill.current?.layers.set(1);
		camera.layers.enable(1);
		return () => {
			camera.layers.disable(1);
		};
	}, [camera]);
	useFrame(() => {
		mesh.current?.lookAt(camera.position);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
				ref: fill,
				intensity: .14,
				color: "#c4c0b6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: mesh,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					SKY_MOON_SIZE,
					48,
					48
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map,
					color: "#eee8dc",
					roughness: 1,
					metalness: 0
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: glow,
				scale: 1.26,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					SKY_MOON_SIZE,
					24,
					24
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#d4cfc4",
					transparent: true,
					opacity: .18,
					depthWrite: false
				})]
			})
		]
	});
}
function SceneContent(props) {
	const moonMap = useTexture("/textures/moon.jpg");
	moonMap.colorSpace = SRGBColorSpace;
	const sunPos = (0, import_react.useMemo)(() => latLngToVector3(props.sun.lat, props.sun.lng, 9), [props.sun.lat, props.sun.lng]);
	const showMarker = Boolean(props.marker && Number.isFinite(props.marker.lat) && Number.isFinite(props.marker.lng) && !props.firstPerson);
	const skyBodies = (0, import_react.useMemo)(() => {
		if (!props.firstPerson || !props.marker) return null;
		const { lat, lng } = props.marker;
		const sun = sunPosition(props.date, lat, lng);
		const moon = moonPosition(props.date, lat, lng);
		return {
			sun: skyPoint(lat, lng, sun.azimuth, sun.altitude, SKY_SUN_DIST).point,
			moon: skyPoint(lat, lng, moon.azimuth, moon.altitude, SKY_MOON_DIST).point,
			sunUp: sun.altitude > -1,
			moonUp: moon.altitude > -1,
			sunAlt: sun.altitude
		};
	}, [
		props.firstPerson,
		props.marker,
		props.date
	]);
	const day = skyBodies ? MathUtils.clamp((skyBodies.sunAlt + 8) / 16, 0, 1) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: [skyBodies ? day > .45 ? "#6aa4e0" : "#07080a" : "#07080a"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: props.firstPerson ? .28 + day * .4 : .22 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#9eb6ff",
			"#1a120c",
			props.firstPerson ? .32 + day * .3 : .35
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			color: "#fff6e8",
			intensity: props.firstPerson ? .55 + day * 1.05 : 1.7,
			position: sunPos
		}),
		skyBodies ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySky, {
			lat: props.marker.lat,
			lng: props.marker.lng,
			date: props.date
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { sun: props.sun }),
		props.firstPerson ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, { sun: props.sun }),
		props.firstPerson ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
			radius: 110,
			depth: 50,
			count: props.scientific ? 400 : 1600,
			factor: props.scientific ? 1.2 : 2.6,
			saturation: 0,
			fade: true,
			speed: .12
		}),
		skyBodies ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [skyBodies.sunUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: skyBodies.sun,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					color: "#fff1d6",
					intensity: 14,
					distance: 48,
					decay: 2,
					ref: (light) => {
						light?.layers.enable(1);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					SKY_SUN_SIZE,
					24,
					24
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#fff6d8" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					scale: 2.4,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						SKY_SUN_SIZE,
						16,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: "#ffe4bd",
						transparent: true,
						opacity: .22,
						depthWrite: false
					})]
				})
			]
		}) : null, skyBodies.moonUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkyMoon, {
			position: skyBodies.moon,
			map: moonMap
		}) : null] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowSphere, {
			point: props.sun,
			distance: SUN_DIST,
			size: .42,
			color: "#fff7ea",
			glow: "#ffe4bd",
			light: true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowSphere, {
			point: props.moon,
			distance: MOON_DIST,
			size: .24,
			color: "#d8d4ce",
			glow: "#9aa3b0",
			map: moonMap
		})] }),
		showMarker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, {
			lat: props.marker.lat,
			lng: props.marker.lng
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkyLayer, {
			date: props.date,
			marker: props.marker,
			firstPerson: props.firstPerson,
			showConstellations: props.showConstellations,
			showPlanets: props.showPlanets,
			scientific: props.scientific,
			planets: props.planets,
			sun: props.sun,
			moon: props.moon,
			onHover: props.onHover,
			onIdentify: props.onIdentify
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {
			lat: props.marker?.lat ?? null,
			lng: props.marker?.lng ?? null,
			date: props.date,
			firstPerson: props.firstPerson,
			sun: props.sun,
			moon: props.moon
		})
	] });
}
var CanvasGuard = class extends import_react.Component {
	state = { crashed: false };
	static getDerivedStateFromError() {
		return { crashed: true };
	}
	componentDidCatch() {
		this.props.onError();
	}
	render() {
		if (this.state.crashed) return null;
		return this.props.children;
	}
};
function GlobeScene(props) {
	const [rendererId, setRendererId] = (0, import_react.useState)(0);
	const recover = (0, import_react.useCallback)(() => {
		window.setTimeout(() => setRendererId((n) => n + 1), 120);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 h-full w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasGuard, {
				onError: recover,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
					camera: {
						position: [
							0,
							.62,
							VIEW_DIST
						],
						fov: GLOBE_FOV,
						near: GLOBE_NEAR,
						far: 500
					},
					dpr: [1, 1.5],
					gl: {
						antialias: false,
						alpha: false,
						powerPreference: "default",
						failIfMajorPerformanceCaveat: false
					},
					style: {
						width: "100%",
						height: "100%",
						display: "block",
						touchAction: "none"
					},
					className: "h-full w-full touch-none",
					resize: { debounce: 80 },
					onCreated: ({ gl }) => {
						gl.setClearColor("#07080a");
						gl.toneMapping = 4;
						gl.toneMappingExposure = 1.05;
						const canvas = gl.domElement;
						const onLost = (event) => {
							event.preventDefault();
							recover();
						};
						canvas.addEventListener("webglcontextlost", onLost, false);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FallbackEarth, {}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneContent, { ...props })
					})
				})
			}, rendererId),
			props.scientific ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute top-1/2 right-2 z-10 flex -translate-y-1/2 flex-col gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: "outline",
						className: "pointer-events-auto size-8 [&_svg]:size-3.5",
						"aria-label": "Zoom in",
						onClick: () => applyZoom(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: "outline",
						className: "pointer-events-auto size-8 [&_svg]:size-3.5",
						"aria-label": "Zoom out",
						onClick: () => applyZoom(1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: "outline",
						className: "pointer-events-auto size-8 [&_svg]:size-3.5",
						"aria-label": "Center on pin",
						title: "Center on pin",
						disabled: !props.marker,
						onClick: () => requestHomeView(Boolean(props.marker), props.onFirstPerson),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: "outline",
						className: "pointer-events-auto size-8 [&_svg]:size-3.5",
						"aria-label": "Earth, Moon and Sun",
						title: "Earth, Moon and Sun",
						onClick: () => requestSystemView(props.onFirstPerson),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunMoon, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompassHud, { muted: props.scientific }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkyTagHud, { muted: props.scientific })
		]
	});
}
function HorizonPlaque({ place, firstPerson, menus }) {
	if (!place) return null;
	const extra = place.detail?.split(",")[0]?.trim() ?? "";
	if (menus) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "horizon-chip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "horizon-chip-city",
			children: place.name
		}), extra && extra.toLowerCase() !== place.name.toLowerCase() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "horizon-chip-extra",
			children: extra
		}) : null]
	});
	if (!firstPerson) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "horizon-plaque",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "horizon-city",
				children: place.name
			}),
			extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "horizon-extra",
				children: extra
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "horizon-brand",
				children: "Sour Paint Studios"
			})
		]
	});
}
var KEY = "meridian-intro-v46";
var MAX_MS = 10800;
var FADE_MS = 480;
var INTRO_DONE = false;
function introAlready() {
	if (INTRO_DONE) return true;
	try {
		return sessionStorage.getItem(KEY) === "1";
	} catch {
		return false;
	}
}
function markIntroDone() {
	INTRO_DONE = true;
	try {
		sessionStorage.setItem(KEY, "1");
	} catch {}
}
function LoaderSplash({ ready, onDone }) {
	const [out, setOut] = (0, import_react.useState)(false);
	const [pct, setPct] = (0, import_react.useState)(0);
	const [needTap, setNeedTap] = (0, import_react.useState)(false);
	const readyRef = (0, import_react.useRef)(ready);
	const done = (0, import_react.useRef)(false);
	const videoEnded = (0, import_react.useRef)(false);
	const videoRef = (0, import_react.useRef)(null);
	const walkRef = (0, import_react.useRef)(null);
	const playing = (0, import_react.useRef)(false);
	readyRef.current = ready;
	(0, import_react.useEffect)(() => {
		const walk = walkRef.current;
		const tryPlay = () => {
			const a = walkRef.current;
			if (!a || done.current) return;
			a.muted = false;
			a.volume = .62;
			const p = a.play();
			if (p) p.then(() => {
				playing.current = true;
				setNeedTap(false);
			}).catch(() => {
				if (!done.current) setNeedTap(true);
			});
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
			if (walk) try {
				walk.pause();
			} catch {}
			setOut(true);
			window.setTimeout(onDone, FADE_MS);
		};
		const tick = window.setInterval(() => {
			const elapsed = performance.now() - started;
			setPct(Math.min(100, elapsed / MAX_MS * 100));
			if (elapsed >= MAX_MS || videoEnded.current && elapsed >= 4e3) finish();
		}, 50);
		return () => {
			window.clearInterval(tick);
			window.clearTimeout(t);
			window.removeEventListener("pointerdown", unlock, true);
			window.removeEventListener("touchstart", unlock, true);
			window.removeEventListener("click", unlock, true);
			window.removeEventListener("keydown", unlock, true);
			if (walk) try {
				walk.pause();
			} catch {}
		};
	}, [onDone]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: out ? "loader-splash loader-splash-out" : "loader-splash",
		role: "status",
		"aria-label": "Loading Sour Paint Studios Meridian 4.0",
		onPointerDown: () => {
			const a = walkRef.current;
			if (!a || done.current) return;
			a.muted = false;
			a.volume = .62;
			a.play().then(() => setNeedTap(false)).catch(() => {});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				className: "loader-film",
				src: "/loader-paint.mp4",
				autoPlay: true,
				muted: true,
				playsInline: true,
				onEnded: (e) => {
					videoEnded.current = true;
					e.currentTarget.pause();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				ref: walkRef,
				src: "/audio/intro-walk.mp3",
				preload: "auto",
				playsInline: true,
				loop: false,
				onPlaying: () => {
					playing.current = true;
					setNeedTap(false);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "loader-veil" }),
			needTap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "loader-tap",
				children: "Tap for the guitar"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "loader-meter",
				"aria-live": "polite",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "loader-meter-bar",
					style: { width: `${pct}%` }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "loader-meter-pct",
					children: [Math.round(pct), "%"]
				})]
			})
		]
	});
}
function Home() {
	const [date, setDate] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [place, setPlace] = (0, import_react.useState)(null);
	const [firstPerson, setFirstPerson] = (0, import_react.useState)(false);
	const [showConstellations, setShowConstellations] = (0, import_react.useState)(true);
	const [showPlanets, setShowPlanets] = (0, import_react.useState)(true);
	const [scientific, setScientific] = (0, import_react.useState)(false);
	const [hover, setHover] = (0, import_react.useState)(null);
	const [identify, setIdentify] = (0, import_react.useState)(null);
	const [globeReady, setGlobeReady] = (0, import_react.useState)(false);
	const [loadGone, setLoadGone] = (0, import_react.useState)(() => introAlready());
	const goFirstPerson = (0, import_react.useCallback)((v) => {
		setFirstPerson(v);
		if (v) setScientific(true);
		else setScientific(false);
	}, []);
	const dismissLoad = (0, import_react.useCallback)(() => {
		markIntroDone();
		setLoadGone(true);
	}, []);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => setGlobeReady(true), 1800);
		return () => window.clearTimeout(t);
	}, []);
	const sun = (0, import_react.useMemo)(() => subsolarPoint(date), [date]);
	const moon = (0, import_react.useMemo)(() => sublunarPoint(date), [date]);
	const illum = (0, import_react.useMemo)(() => moonIllumination(date), [date]);
	const planets = (0, import_react.useMemo)(() => planetStates(date), [date]);
	const marker = (0, import_react.useMemo)(() => place ? {
		lat: place.lat,
		lng: place.lng,
		label: place.name
	} : null, [place]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-svh w-full overflow-hidden overscroll-none bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobeScene, {
					date,
					sun,
					moon,
					moonFraction: illum.fraction,
					marker,
					firstPerson,
					onFirstPerson: goFirstPerson,
					showConstellations,
					showPlanets,
					scientific,
					planets,
					onHover: setHover,
					onIdentify: setIdentify
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chrome-top pointer-events-none absolute top-3 left-3 z-40 flex flex-nowrap items-center gap-1",
				children: firstPerson ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "paint-chip pointer-events-auto flex h-10 shrink-0 items-center gap-1 px-2.5 text-fg",
					"aria-label": scientific ? "Show menus" : "Hide menus",
					onClick: () => setScientific((s) => !s),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-medium tracking-wide",
						children: "Menu"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "paint-chip pointer-events-auto flex h-10 shrink-0 items-center gap-1 px-2.5 text-fg",
					"aria-label": "Back to Earth",
					onClick: () => goFirstPerson(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-medium tracking-wide",
						children: "Earth"
					})]
				})] }) : scientific ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "paint-chip pointer-events-auto flex h-10 shrink-0 items-center gap-1 px-2.5 text-fg",
					"aria-label": "Show menus",
					onClick: () => setScientific(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-medium tracking-wide",
						children: "Menu"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://sourpaintstudios.com",
					target: "_blank",
					rel: "noreferrer",
					className: "paint-chip pointer-events-auto block size-10 shrink-0",
					"aria-label": "Sour Paint Studios Meridian 4.0",
					title: "Sour Paint Studios Meridian 4.0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/sour-paint-logo.png",
						alt: "Sour Paint Studios",
						className: "size-full object-cover"
					})
				})
			}),
			loadGone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: firstPerson ? "music-slot music-slot-fp" : scientific ? "music-slot music-slot-globe music-slot-globe-sci" : "music-slot music-slot-globe",
				children: [firstPerson ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizonPlaque, {
					place,
					firstPerson: true,
					menus: !scientific
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioBed, { place })]
			}) : null,
			hover && hover.name !== identify?.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "paint-chip pointer-events-none absolute z-20 px-1.5 py-0.5 font-mono text-[10px] leading-none text-fg",
				style: {
					left: hover.x + 8,
					top: hover.y - 6
				},
				children: hover.name
			}) : null,
			identify ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "paint-panel absolute top-20 left-1/2 z-20 w-[min(18rem,calc(100%-1.5rem))] -translate-x-1/2 p-2.5",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-medium tracking-[0.14em] text-muted uppercase",
							children: "That's"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-tight text-fg",
							children: identify.name
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-8 shrink-0 items-center justify-center rounded-md text-muted",
						"aria-label": "Close",
						onClick: () => setIdentify(null),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs leading-snug text-muted",
					children: identify.blurb
				})]
			}) : null,
			scientific ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: firstPerson ? "pointer-events-none absolute bottom-[4.6rem] left-4 z-10 flex justify-start p-0" : "pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:inset-auto sm:bottom-4 sm:left-4 sm:justify-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-[11.75rem] max-w-[11.75rem] flex-col items-stretch gap-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlDock, {
						date,
						onDate: setDate,
						place,
						onPlace: setPlace,
						firstPerson,
						onFirstPerson: goFirstPerson,
						showConstellations,
						onConstellations: setShowConstellations,
						showPlanets,
						onPlanets: setShowPlanets,
						onScientific: () => setScientific(true)
					})
				})
			}),
			loadGone ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderSplash, {
				ready: globeReady,
				onDone: dismissLoad
			})
		]
	});
}
//#endregion
export { Home as component };
