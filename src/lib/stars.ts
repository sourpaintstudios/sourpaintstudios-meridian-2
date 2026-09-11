/** Brightest night-sky stars, J2000. ra is hours, dec degrees, mag visual. */
export type CatalogStar = { n: string; ra: number; dec: number; mag: number; sp: string };

export const BRIGHT_STARS: CatalogStar[] = [
  { n: "Sirius", ra: 6.7525, dec: -16.716, mag: -1.46, sp: "A" },
  { n: "Canopus", ra: 6.3992, dec: -52.696, mag: -0.74, sp: "F" },
  { n: "Rigil Kentaurus", ra: 14.6601, dec: -60.835, mag: -0.27, sp: "G" },
  { n: "Arcturus", ra: 14.261, dec: 19.182, mag: -0.05, sp: "K" },
  { n: "Vega", ra: 18.6156, dec: 38.783, mag: 0.03, sp: "A" },
  { n: "Capella", ra: 5.2782, dec: 45.998, mag: 0.08, sp: "G" },
  { n: "Rigel", ra: 5.2423, dec: -8.202, mag: 0.13, sp: "B" },
  { n: "Procyon", ra: 7.655, dec: 5.225, mag: 0.34, sp: "F" },
  { n: "Betelgeuse", ra: 5.9195, dec: 7.407, mag: 0.42, sp: "M" },
  { n: "Achernar", ra: 1.6286, dec: -57.237, mag: 0.46, sp: "B" },
  { n: "Hadar", ra: 14.0637, dec: -60.373, mag: 0.61, sp: "B" },
  { n: "Altair", ra: 19.8464, dec: 8.868, mag: 0.76, sp: "A" },
  { n: "Acrux", ra: 12.4433, dec: -63.099, mag: 0.76, sp: "B" },
  { n: "Aldebaran", ra: 4.5987, dec: 16.509, mag: 0.85, sp: "K" },
  { n: "Antares", ra: 16.4901, dec: -26.432, mag: 0.96, sp: "M" },
  { n: "Spica", ra: 13.4199, dec: -11.161, mag: 0.98, sp: "B" },
  { n: "Pollux", ra: 7.7553, dec: 28.026, mag: 1.14, sp: "K" },
  { n: "Fomalhaut", ra: 22.9608, dec: -29.622, mag: 1.16, sp: "A" },
  { n: "Deneb", ra: 20.6905, dec: 45.28, mag: 1.25, sp: "A" },
  { n: "Mimosa", ra: 12.7953, dec: -59.689, mag: 1.25, sp: "B" },
  { n: "Regulus", ra: 10.1395, dec: 11.967, mag: 1.35, sp: "B" },
  { n: "Adhara", ra: 6.9771, dec: -28.972, mag: 1.5, sp: "B" },
  { n: "Castor", ra: 7.5767, dec: 31.888, mag: 1.58, sp: "A" },
  { n: "Shaula", ra: 17.5601, dec: -37.104, mag: 1.62, sp: "B" },
  { n: "Gacrux", ra: 12.5197, dec: -57.113, mag: 1.63, sp: "M" },
  { n: "Bellatrix", ra: 5.4188, dec: 6.35, mag: 1.64, sp: "B" },
  { n: "Elnath", ra: 5.4382, dec: 28.608, mag: 1.65, sp: "B" },
  { n: "Miaplacidus", ra: 9.2201, dec: -69.717, mag: 1.67, sp: "A" },
  { n: "Alnilam", ra: 5.6036, dec: -1.202, mag: 1.69, sp: "B" },
  { n: "Alioth", ra: 12.9004, dec: 55.96, mag: 1.76, sp: "A" },
  { n: "Alnitak", ra: 5.6793, dec: -1.943, mag: 1.77, sp: "O" },
  { n: "Dubhe", ra: 11.0621, dec: 61.751, mag: 1.79, sp: "K" },
  { n: "Mirfak", ra: 3.4054, dec: 49.861, mag: 1.79, sp: "F" },
  { n: "Wezen", ra: 7.1399, dec: -26.393, mag: 1.83, sp: "F" },
  { n: "Sargas", ra: 17.621, dec: -43.0, mag: 1.84, sp: "F" },
  { n: "Kaus Australis", ra: 18.4029, dec: -34.385, mag: 1.85, sp: "B" },
  { n: "Avior", ra: 8.3752, dec: -59.51, mag: 1.86, sp: "K" },
  { n: "Alkaid", ra: 13.7923, dec: 49.313, mag: 1.86, sp: "B" },
  { n: "Menkalinan", ra: 5.991, dec: 44.947, mag: 1.9, sp: "A" },
  { n: "Atria", ra: 16.8111, dec: -69.028, mag: 1.91, sp: "K" },
  { n: "Alhena", ra: 6.6285, dec: 16.399, mag: 1.93, sp: "A" },
  { n: "Peacock", ra: 20.4275, dec: -56.735, mag: 1.94, sp: "B" },
  { n: "Alsephina", ra: 8.7458, dec: -54.709, mag: 1.95, sp: "A" },
  { n: "Mirzam", ra: 6.3783, dec: -17.956, mag: 1.98, sp: "B" },
  { n: "Polaris", ra: 2.5303, dec: 89.264, mag: 1.98, sp: "F" },
  { n: "Alphard", ra: 9.4598, dec: -8.659, mag: 1.98, sp: "K" },
  { n: "Hamal", ra: 2.1195, dec: 23.463, mag: 2.0, sp: "K" },
  { n: "Algieba", ra: 10.3329, dec: 19.842, mag: 2.01, sp: "K" },
  { n: "Diphda", ra: 0.7265, dec: -17.987, mag: 2.04, sp: "K" },
  { n: "Nunki", ra: 18.9211, dec: -26.297, mag: 2.05, sp: "B" },
  { n: "Menkent", ra: 14.111, dec: -36.37, mag: 2.06, sp: "K" },
  { n: "Alpheratz", ra: 0.1398, dec: 29.09, mag: 2.07, sp: "B" },
  { n: "Mirach", ra: 1.1622, dec: 35.62, mag: 2.07, sp: "M" },
  { n: "Saiph", ra: 5.796, dec: -9.67, mag: 2.09, sp: "B" },
  { n: "Kochab", ra: 14.8451, dec: 74.155, mag: 2.08, sp: "K" },
  { n: "Rasalhague", ra: 17.5822, dec: 12.56, mag: 2.08, sp: "A" },
  { n: "Algol", ra: 3.1361, dec: 40.955, mag: 2.12, sp: "B" },
  { n: "Denebola", ra: 11.8177, dec: 14.572, mag: 2.14, sp: "A" },
  { n: "Cih", ra: 0.945, dec: 60.717, mag: 2.15, sp: "B" },
  { n: "Alnair", ra: 22.1372, dec: -46.961, mag: 1.74, sp: "B" },
  { n: "Alioth", ra: 12.9004, dec: 55.96, mag: 1.76, sp: "A" },
  { n: "Suhail", ra: 9.1333, dec: -43.433, mag: 2.21, sp: "K" },
  { n: "Mintaka", ra: 5.5334, dec: -0.299, mag: 2.23, sp: "O" },
  { n: "Caph", ra: 0.1529, dec: 59.15, mag: 2.28, sp: "F" },
  { n: "Mizar", ra: 13.3987, dec: 54.925, mag: 2.23, sp: "A" },
  { n: "Alphecca", ra: 15.5781, dec: 26.715, mag: 2.23, sp: "A" },
  { n: "Schedar", ra: 0.6751, dec: 56.537, mag: 2.24, sp: "K" },
  { n: "Eltanin", ra: 17.9434, dec: 51.489, mag: 2.23, sp: "K" },
  { n: "Dschubba", ra: 16.0056, dec: -22.622, mag: 2.29, sp: "B" },
  { n: "Larawag", ra: 17.7933, dec: -37.044, mag: 2.29, sp: "K" },
  { n: "Merak", ra: 11.0307, dec: 56.382, mag: 2.37, sp: "A" },
  { n: "Izar", ra: 14.7498, dec: 27.074, mag: 2.37, sp: "K" },
  { n: "Enif", ra: 21.7364, dec: 9.875, mag: 2.38, sp: "K" },
  { n: "Phecda", ra: 11.8972, dec: 53.695, mag: 2.41, sp: "A" },
  { n: "Scheat", ra: 23.0629, dec: 28.083, mag: 2.42, sp: "M" },
  { n: "Alderamin", ra: 21.3096, dec: 62.586, mag: 2.45, sp: "A" },
  { n: "Markab", ra: 23.0793, dec: 15.205, mag: 2.49, sp: "B" },
  { n: "Gienah", ra: 12.2634, dec: -17.542, mag: 2.58, sp: "B" },
  { n: "Ankaa", ra: 0.438, dec: -42.306, mag: 2.4, sp: "K" },
  { n: "Almach", ra: 2.064, dec: 42.33, mag: 2.1, sp: "K" },
  { n: "Sadr", ra: 20.3705, dec: 40.257, mag: 2.23, sp: "F" },
  { n: "Albireo", ra: 19.5123, dec: 27.96, mag: 3.05, sp: "K" },
  { n: "Meissa", ra: 5.5856, dec: 9.934, mag: 3.39, sp: "O" },
  { n: "Megrez", ra: 12.2571, dec: 57.033, mag: 3.31, sp: "A" },
  { n: "Imai", ra: 12.2524, dec: -58.749, mag: 2.79, sp: "B" },
  { n: "Naos", ra: 8.0597, dec: -40.003, mag: 2.21, sp: "O" },
  { n: "Aludra", ra: 7.4016, dec: -29.303, mag: 2.45, sp: "B" },
  { n: "Phact", ra: 5.6608, dec: -34.074, mag: 2.65, sp: "B" },
  { n: "Unukalhai", ra: 15.7378, dec: 6.426, mag: 2.63, sp: "K" },
  { n: "Cebalrai", ra: 17.7245, dec: 4.567, mag: 2.76, sp: "K" },
  { n: "Rasalgethi", ra: 17.2441, dec: 14.39, mag: 3.37, sp: "M" },
  { n: "Kornephoros", ra: 16.5037, dec: 21.49, mag: 2.81, sp: "G" },
  { n: "Cursa", ra: 5.1338, dec: -5.086, mag: 2.79, sp: "A" },
  { n: "Aspidiske", ra: 9.2848, dec: -59.275, mag: 2.21, sp: "A" },
  { n: "Gomeisa", ra: 7.4525, dec: 8.29, mag: 2.89, sp: "B" },
  { n: "Algenib", ra: 0.2206, dec: 15.184, mag: 2.83, sp: "B" },
  { n: "Tarazed", ra: 19.7703, dec: 10.613, mag: 2.72, sp: "K" },
  { n: "Porrima", ra: 12.6943, dec: -1.449, mag: 2.74, sp: "F" },
];

const SP: Record<string, [number, number, number]> = {
  O: [0.62, 0.7, 1],
  B: [0.67, 0.75, 1],
  A: [0.82, 0.87, 1],
  F: [0.95, 0.94, 1],
  G: [1, 0.95, 0.88],
  K: [1, 0.82, 0.62],
  M: [1, 0.72, 0.52],
};

export function starRgb(sp: string): [number, number, number] {
  return SP[sp] ?? SP.A;
}

export function starSize(mag: number) {
  return Math.max(1.4, 8.4 * Math.pow(2.512, -mag * 0.38));
}

export const CONSTELLATIONS: { name: string; lines: [string, string][] }[] = [
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
      ["Betelgeuse", "Alnitak"],
    ],
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
      ["Dubhe", "Megrez"],
    ],
  },
  {
    name: "Ursa Minor",
    lines: [["Polaris", "Kochab"]],
  },
  {
    name: "Cassiopeia",
    lines: [
      ["Caph", "Schedar"],
      ["Schedar", "Cih"],
    ],
  },
  {
    name: "Cygnus",
    lines: [
      ["Deneb", "Sadr"],
      ["Sadr", "Albireo"],
    ],
  },
  {
    name: "Scorpius",
    lines: [
      ["Dschubba", "Antares"],
      ["Antares", "Shaula"],
      ["Shaula", "Larawag"],
      ["Larawag", "Sargas"],
    ],
  },
  {
    name: "Crux",
    lines: [
      ["Acrux", "Gacrux"],
      ["Mimosa", "Imai"],
    ],
  },
  {
    name: "Taurus",
    lines: [["Aldebaran", "Elnath"]],
  },
  {
    name: "Gemini",
    lines: [
      ["Castor", "Pollux"],
      ["Pollux", "Alhena"],
    ],
  },
  {
    name: "Leo",
    lines: [
      ["Regulus", "Algieba"],
      ["Algieba", "Denebola"],
    ],
  },
  {
    name: "Canis Major",
    lines: [
      ["Sirius", "Mirzam"],
      ["Sirius", "Adhara"],
      ["Adhara", "Wezen"],
      ["Wezen", "Aludra"],
    ],
  },
  {
    name: "Canis Minor",
    lines: [["Procyon", "Gomeisa"]],
  },
  {
    name: "Auriga",
    lines: [["Capella", "Menkalinan"]],
  },
  {
    name: "Boötes",
    lines: [["Arcturus", "Izar"]],
  },
  {
    name: "Pegasus",
    lines: [
      ["Markab", "Scheat"],
      ["Scheat", "Alpheratz"],
      ["Markab", "Algenib"],
    ],
  },
  {
    name: "Andromeda",
    lines: [
      ["Alpheratz", "Mirach"],
      ["Mirach", "Almach"],
    ],
  },
  {
    name: "Lyra",
    lines: [["Vega", "Deneb"]],
  },
  {
    name: "Aquila",
    lines: [["Altair", "Tarazed"]],
  },
  {
    name: "Virgo",
    lines: [["Spica", "Porrima"]],
  },
  {
    name: "Sagittarius",
    lines: [["Kaus Australis", "Nunki"]],
  },
];

export function uniqueStars() {
  const map = new Map<string, CatalogStar>();
  for (const s of BRIGHT_STARS) map.set(s.n, s);
  return [...map.values()];
}