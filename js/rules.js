// rules.js
export const vowelWeights = {
  a: 10, // very common
  â: 8, // common
  e: 10, // very common
  i: 10, // very common
  y: 6, // medium
  u: 8, // common
  o: 10, // very common
  û: 6, // medium
  æ: 2, // rare
  å: 4, // uncommon
  ø: 1, // very rare
  ü: 1, // very rare
};

export const consonantWeights = {
  n: 10, // very common
  m: 8, // common
  r: 6, // medium
  l: 8, // common
  t: 10, // very common
  d: 6, // medium
  k: 8, // common
  g: 4, // uncommon
  p: 6, // medium
  s: 10, // very common
  f: 6, // medium
  þ: 2, // rare
  š: 2, // rare
  q: 2, // rare
  w: 2, // rare
  j: 4, // uncommon
};

export const prefixRules = {
  a: ["n", "l", "j", "þ", "s", "š", "d", "t", "k"],
  â: ["m", "n", "r", "j", "q", "þ", "s", "š", "d", "t", "k"],
  e: ["n", "r", "l", "q", "þ", "s", "f", "š", "d", "g", "t", "k"],
  i: ["m", "n", "r", "l", "q", "þ", "s", "f", "š", "d", "g", "p", "k"],
  y: ["m", "n", "r", "w", "þ", "s", "f", "š", "d", "p", "t", "k"],
  u: ["n", "r", "q", "s", "f", "š", "g", "k"],
  o: ["m", "r", "l", "j", "q", "þ", "s", "š", "g", "t", "k"],
  û: ["m", "l", "j", "q", "s", "f", "š", "d", "p", "t", "k"],
  æ: ["m", "n", "l", "q", "þ", "s", "š", "d", "p", "k"],
  å: ["n", "r", "l", "j", "q", "þ", "s", "f", "g", "t", "k"],
  ø: ["m", "r", "w", "j", "q", "s", "f", "š", "d", "g", "p", "t"],
  ü: ["m", "l", "w", "q", "þ", "s", "f", "š", "d", "t"],
};

export const suffixRules = {
  a: ["n", "l", "j", "þ", "s", "š", "d", "t", "k"],
  â: ["m", "n", "r", "j", "q", "þ", "s", "š", "d", "t", "k"],
  e: ["n", "r", "l", "q", "þ", "s", "f", "š", "d", "g", "t", "k"],
  i: ["m", "n", "r", "l", "q", "þ", "s", "f", "š", "d", "g", "p", "k"],
  y: ["m", "n", "r", "w", "þ", "s", "f", "š", "d", "p", "t", "k"],
  u: ["n", "r", "q", "s", "f", "š", "g", "k"],
  o: ["m", "r", "l", "j", "q", "þ", "s", "š", "g", "t", "k"],
  û: ["m", "l", "j", "q", "s", "f", "š", "d", "p", "t", "k"],
  æ: ["m", "n", "l", "q", "þ", "s", "š", "d", "p", "k"],
  å: ["n", "r", "l", "j", "q", "þ", "s", "f", "g", "t", "k"],
  ø: ["m", "r", "w", "j", "q", "s", "f", "š", "d", "g", "p", "t"],
  ü: ["m", "l", "w", "q", "þ", "s", "f", "š", "d", "t"],
};

export const bannedConsonantPairs = [
  "šs",
  "sš", // š combinations
  "šš", // doubled š
  "jš", // j + š
  "þš",
  "šþ", // þ combinations
  "þþ", // doubled þ
  "tp",
  "qs",
  "gk",
  "gp"
  // We can add more as we discover them
];

export const endingVowelWeights = {
  â: 10,
  û: 10,
  æ: 8,
  å: 8,
  ø: 4,
  ü: 6,
  y: 10,
  a: 0,
  e: 2,
  i: 0,
  o: 4,
  u: 2,
};

export const bannedVowelPairs = [
  "oo",
  "ee",
  "ea",
  "ai",
  "oa",
  "ou", // English digraphs
  "aa",
  "ââ",
  "ee",
  "ii",
  "oo",
  "uu",
  "yy", // Same vowels
  "aâ",
  "âa",
  "iy", // Other problematic pairs
  "âu",
  "eo",
  "ææ"
  // Add other vowel combinations we want to prevent
];
