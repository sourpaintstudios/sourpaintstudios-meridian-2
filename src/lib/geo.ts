import * as THREE from "three";

/** Match SphereGeometry UVs used by standard Earth equirectangular maps. */
export function latLngToVector3(lat: number, lng: number, radius: number, target = new THREE.Vector3()) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return target.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function formatLatLng(lat: number, lng: number) {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(3)}° ${ns}, ${Math.abs(lng).toFixed(3)}° ${ew}`;
}

export function formatDeg(value: number, positive: string, negative: string) {
  const dir = value >= 0 ? positive : negative;
  return `${Math.abs(value).toFixed(1)}° ${dir}`;
}

export function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

/** Arc along Earth's sphere so the camera never tunnels through the planet. */
export function lerpRadial(from: THREE.Vector3, to: THREE.Vector3, t: number, out: THREE.Vector3) {
  const fromR = from.length();
  const toR = to.length();
  if (fromR < 1e-8 || toR < 1e-8) return out.lerpVectors(from, to, t);
  const fromN = from.clone().multiplyScalar(1 / fromR);
  const toN = to.clone().multiplyScalar(1 / toR);
  const q = new THREE.Quaternion().setFromUnitVectors(fromN, toN);
  const qT = new THREE.Quaternion().slerpQuaternions(new THREE.Quaternion(), q, t);
  out.copy(fromN).applyQuaternion(qT);
  return out.multiplyScalar(fromR + (toR - fromR) * t);
}
