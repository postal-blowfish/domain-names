// nameGenerator.js
import {
  vowelWeights,
  consonantWeights,
  prefixRules,
  suffixRules,
  bannedConsonantPairs,
  endingVowelWeights,
  bannedVowelPairs,
} from "./rules.js";
import {
  weightedRandom,
  getValidWeightedConsonants,
  isVowel,
  isConsonant,
  isValidConsonantPair,
} from "./utils.js";

function generateSyllable(isFinal = false) {
    // Pick a weighted vowel - use different weights for final syllable
    const vowel = isFinal 
        ? weightedRandom(endingVowelWeights)
        : weightedRandom(vowelWeights);
    
    // Rest of generateSyllable stays the same
    const usePrefix = Math.random() < 0.7;
    const useSuffix = Math.random() < 0.6;
    
    let syllable = '';
    
    if (usePrefix && prefixRules[vowel]) {
        const validPrefixWeights = getValidWeightedConsonants(vowel, prefixRules);
        syllable += weightedRandom(validPrefixWeights);
    }
    
    syllable += vowel;
    
    if (useSuffix && suffixRules[vowel]) {
        const validSuffixWeights = getValidWeightedConsonants(vowel, suffixRules, 'suffix');
        syllable += weightedRandom(validSuffixWeights);
    }
    
    return syllable;
}

export function generateName() {
  const rand = Math.random();
  let numSyllables;
  if (rand < 0.25) numSyllables = 1;
  else if (rand < 0.75) numSyllables = 2;
  else if (rand < 0.95) numSyllables = 3;
  else numSyllables = 4;

  let syllables;
  let name;
  let attempts = 0;
  
  do {
      syllables = [];
      // Generate array of syllables
      for (let i = 0; i < numSyllables; i++) {
          syllables.push(generateSyllable(i === numSyllables - 1));
      }
      
      // If we have duplicates, continue to next iteration
      if (hasDuplicateSyllables(syllables)) {
          continue;
      }
      
      // Join syllables into name and process
      name = syllables.join('');
      name = handleRepeatedConsonants(name);
      
      attempts++;
      if (attempts > 100) {
          name = generateSyllable(true);
          break;
      }
  } while (name.length < 3 || !areSequencesValid(name));
  
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function checkSameCVC(syllable) {
  if (
    syllable.length === 3 &&
    isConsonant(syllable[0]) &&
    isVowel(syllable[1]) &&
    isConsonant(syllable[2]) &&
    syllable[0] === syllable[2]
  ) {
    if (Math.random() < 0.9) {
      // Get valid suffix consonants for this vowel
      const validSuffixes = suffixRules[syllable[1]];
      // Filter out the current consonant
      const possibleConsonants = validSuffixes.filter((c) => c !== syllable[2]);
      if (possibleConsonants.length > 0) {
        return (
          syllable.slice(0, 2) +
          possibleConsonants[
            Math.floor(Math.random() * possibleConsonants.length)
          ]
        );
      }
    }
  }
  return syllable;
}

// Within generateName, after creating the full name:
function areSequencesValid(word) {
  if (!word) return false;

  for (let i = 1; i < word.length; i++) {
    // Check consonant pairs
    if (isConsonant(word[i - 1]) && isConsonant(word[i])) {
      const pair = word[i - 1] + word[i];
      if (bannedConsonantPairs.includes(pair)) {
        return false;
      }
    }

    // Check vowel pairs, allowing y+vowel combinations
    if (isVowel(word[i - 1]) && isVowel(word[i])) {
      const pair = word[i - 1] + word[i];
      if (word[i - 1] !== "y" && bannedVowelPairs.includes(pair)) {
        return false;
      }
    }
  }
  return true;
}

function handleRepeatedConsonants(word) {
    let result = word;
    for (let i = 1; i < word.length; i++) {
        if (isConsonant(word[i-1]) && isConsonant(word[i])) {
            // If they're the same consonant and not in banned pairs
            if (word[i-1] === word[i] && !bannedConsonantPairs.includes(word[i-1] + word[i])) {
                // 90% chance to insert glottal stop
                if (Math.random() < 0.9) {
                    result = result.slice(0, i) + "'" + result.slice(i);
                    i++; // Skip the inserted character
                }
            }
        }
    }
    return result;
}

function hasDuplicateSyllables(syllables) {
  for (let i = 0; i < syllables.length; i++) {
      for (let j = i + 1; j < syllables.length; j++) {
          if (syllables[i] === syllables[j] && Math.random() < 0.9) {
              return true; // Found a duplicate that should be regenerated
          }
      }
  }
  return false;
}