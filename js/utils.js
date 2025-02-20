// utils.js
import { consonantWeights, bannedConsonantPairs } from './rules.js';

export function weightedRandom(weights) {
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (const [item, weight] of Object.entries(weights)) {
        random -= weight;
        if (random <= 0) return item;
    }
}

export function getValidWeightedConsonants(vowel, rules, type = 'prefix') {
    const validConsonants = rules[vowel];
    const weights = {};
    
    for (const consonant of validConsonants) {
        weights[consonant] = consonantWeights[consonant];
    }
    
    return weights;
}

// utils.js
export function isConsonant(char) {
    return 'mnrltkgpsfþšqwjd'.includes(char);
}

export function isVowel(char) {
    return 'aâeiuoûæåøyü'.includes(char);
}

export function isValidConsonantPair(c1, c2) {
    return !bannedConsonantPairs.includes(c1 + c2);
}