/**
 * Compact solar/lunar geometry (Jean Meeus / SunCalc-style, MIT-era formulas).
 * Positions are geocentric: where the Sun or Moon is overhead on Earth.
 */

const PI = Math.PI;
const RAD = PI / 180;
const DAY_MS = 86400000;
const J1970 = 2440588;
const J2000 = 2451545;
const OBLIQUITY = 23.4397 * RAD;

function toJulian(date: Date) {
  return date.valueOf() / DAY_MS - 0.5 + J1970;
}

function toDays(date: Date) {
  return toJulian(date) - J2000;
}

function sind(a: number) {
  return Math.sin(a);
}
function cosd(a: number) {
  return Math.cos(a);
}

function rightAscension(l: number, b: number) {
  return Math.atan2(sind(l) * Math.cos(OBLIQUITY) - Math.tan(b) * Math.sin(OBLIQUITY), cosd(l));
}

function declination(l: number, b: number) {
  return Math.asin(sind(b) * Math.cos(OBLIQUITY) + cosd(b) * Math.sin(OBLIQUITY) * sind(l));
}

function solarMeanAnomaly(d: number) {
  return RAD * (357.5291 + 0.98560028 * d);
}

function eclipticLongitude(M: number) {
  const C = RAD * (1.9148 * sind(M) + 0.02 * sind(2 * M) + 0.0003 * sind(3 * M));
  const P = RAD * 102.9372;
  return M + C + P + PI;
}

function sunCoords(d: number) {
  const M = solarMeanAnomaly(d);
  const L = eclipticLongitude(M);
  return { dec: declination(L, 0), ra: rightAscension(L, 0) };
}

function greenwichSidereal(d: number) {
  return RAD * (280.16 + 360.9856235 * d);
}

function wrapLng(deg: number) {
  return ((((deg + 180) % 360) + 360) % 360) - 180;
}

function raDecToLatLng(ra: number, dec: number, d: number) {
  const gst = greenwichSidereal(d);
  const lng = wrapLng(((ra - gst) * 180) / PI);
  const lat = (dec * 180) / PI;
  return { lat, lng };
}

export type GeoPoint = { lat: number; lng: number };

export function subsolarPoint(date: Date): GeoPoint {
  const d = toDays(date);
  const c = sunCoords(d);
  return raDecToLatLng(c.ra, c.dec, d);
}

function moonCoords(d: number) {
  const L = RAD * (218.316 + 13.176396 * d);
  const M = RAD * (134.963 + 13.064993 * d);
  const F = RAD * (93.272 + 13.22935 * d);
  const l = L + RAD * 6.289 * sind(M);
  const b = RAD * 5.128 * sind(F);
  const dist = 385001 - 20905 * cosd(M);
  return { ra: rightAscension(l, b), dec: declination(l, b), dist };
}

export function sublunarPoint(date: Date): GeoPoint & { distanceKm: number } {
  const d = toDays(date);
  const c = moonCoords(d);
  return { ...raDecToLatLng(c.ra, c.dec, d), distanceKm: c.dist };
}

export function moonIllumination(date: Date) {
  const d = toDays(date);
  const s = sunCoords(d);
  const m = moonCoords(d);
  const phi = Math.acos(Math.sin(s.dec) * Math.sin(m.dec) + Math.cos(s.dec) * Math.cos(m.dec) * Math.cos(s.ra - m.ra));
  const inc = Math.atan2(149598000 * Math.sin(phi), m.dist - 149598000 * Math.cos(phi));
  const angle = Math.atan2(
    Math.cos(s.dec) * Math.sin(s.ra - m.ra),
    Math.sin(s.dec) * Math.cos(m.dec) - Math.cos(s.dec) * Math.sin(m.dec) * Math.cos(s.ra - m.ra),
  );
  const fraction = (1 + Math.cos(inc)) / 2;
  const phase = 0.5 + (0.5 * inc * (angle < 0 ? -1 : 1)) / PI;
  return { fraction, phase, angle };
}

function siderealTime(d: number, lw: number) {
  return greenwichSidereal(d) - lw;
}

function altitudeAzimuth(H: number, phi: number, dec: number) {
  const altitude = Math.asin(sind(phi) * sind(dec) + cosd(phi) * cosd(dec) * cosd(H));
  const azimuth = Math.atan2(sind(H), cosd(H) * sind(phi) - Math.tan(dec) * cosd(phi));
  return {
    altitude: (altitude * 180) / PI,
    azimuth: (((azimuth * 180) / PI + 180) % 360 + 360) % 360,
  };
}

export function equatorialToAltAz(date: Date, lat: number, lng: number, raHours: number, decDeg: number) {
  const d = toDays(date);
  const lw = -lng * RAD;
  const phi = lat * RAD;
  const ra = raHours * 15 * RAD;
  const dec = decDeg * RAD;
  const H = siderealTime(d, lw) - ra;
  return altitudeAzimuth(H, phi, dec);
}

export function equatorialToGeo(date: Date, raHours: number, decDeg: number): GeoPoint {
  const d = toDays(date);
  return raDecToLatLng(raHours * 15 * RAD, decDeg * RAD, d);
}

export function sunPosition(date: Date, lat: number, lng: number) {
  const d = toDays(date);
  const c = sunCoords(d);
  const lw = -lng * RAD;
  const phi = lat * RAD;
  const H = siderealTime(d, lw) - c.ra;
  return altitudeAzimuth(H, phi, c.dec);
}

export function moonPosition(date: Date, lat: number, lng: number) {
  const d = toDays(date);
  const c = moonCoords(d);
  const lw = -lng * RAD;
  const phi = lat * RAD;
  const H = siderealTime(d, lw) - c.ra;
  return { ...altitudeAzimuth(H, phi, c.dec), distanceKm: c.dist };
}

export function phaseLabel(fraction: number, angle: number) {
  const waxing = angle >= 0;
  if (fraction < 0.04) return "New moon";
  if (fraction < 0.35) return waxing ? "Waxing crescent" : "Waning crescent";
  if (fraction < 0.65) return waxing ? "First quarter" : "Last quarter";
  if (fraction < 0.96) return waxing ? "Waxing gibbous" : "Waning gibbous";
  return "Full moon";
}

export type SkyFocus = "moon" | "sun" | "horizon";

/** Moon if it is up, else the sun if it is up, else the night sky toward whichever is closer to rising. */
export function pickSkyFocus(moonAltDeg: number, sunAltDeg: number): SkyFocus {
  if (moonAltDeg > 0) return "moon";
  if (sunAltDeg > 0) return "sun";
  return "horizon";
}

const J0 = 0.0009;

function fromJulian(j: number) {
  return new Date((j + 0.5 - J1970) * DAY_MS);
}

function julianCycle(d: number, lw: number) {
  return Math.round(d - J0 - lw / (2 * PI));
}

function approxTransit(Ht: number, lw: number, n: number) {
  return J0 + (Ht + lw) / (2 * PI) + n;
}

function solarTransitJ(ds: number, M: number, L: number) {
  return J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
}

function hourAngle(h: number, phi: number, dec: number) {
  const cosHA = (Math.sin(h) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec));
  if (!Number.isFinite(cosHA) || cosHA < -1 || cosHA > 1) return null;
  return Math.acos(cosHA);
}

export function sunTimes(date: Date, lat: number, lng: number) {
  const lw = -lng * RAD;
  const phi = lat * RAD;
  const d = toDays(date);
  const n = julianCycle(d, lw);
  const ds = approxTransit(0, lw, n);
  const M = solarMeanAnomaly(ds);
  const L = eclipticLongitude(M);
  const dec = declination(L, 0);
  const Jnoon = solarTransitJ(ds, M, L);
  const w = hourAngle(-0.833 * RAD, phi, dec);
  const solarNoon = fromJulian(Jnoon);
  if (w == null) {
    const alt = sunPosition(solarNoon, lat, lng).altitude;
    return { sunrise: null, sunset: null, solarNoon, polar: alt > 0 ? ("up" as const) : ("down" as const) };
  }
  const Jset = solarTransitJ(approxTransit(w, lw, n), M, L);
  const Jrise = Jnoon - (Jset - Jnoon);
  return { sunrise: fromJulian(Jrise), sunset: fromJulian(Jset), solarNoon, polar: null };
}

export function formatClock(date: Date) {
  return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}
