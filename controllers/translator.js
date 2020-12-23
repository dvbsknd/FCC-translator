import americanToBritishSpelling from './dictionaries/american-to-british-spelling.js';
import americanToBritishTitles from './dictionaries/american-to-british-titles';
import americanOnly from './dictionaries/american-only';
import britishOnly from './dictionaries/british-only';

export default function Translator () {};

Translator.prototype.translate = function (inputText, translationDirection) {
  if (inputText === '') throw new Error('No text to translate');
  if (!inputText || !translationDirection) throw new Error('Required field(s) missing');

  const {
    translation: spellingTranslation,
    replacements: spellingReplacements
  } = translateSpelling(inputText, translationDirection);

  const {
    translation,
    replacements: timeReplacements
  } = convertTime(spellingTranslation, translationDirection);

  return {
    translation,
    replacements: [...spellingReplacements, ...timeReplacements]
  };
};

export function translateSpelling (string, translationDirection) {

  const dictionary = generateDictionary(translationDirection);
  const searchTerms = Object.keys(dictionary);

  const replaceables = searchTerms.reduce((acc, curr) => {
    const caseInsensitiveRegex = new RegExp(escapeRegExp(curr), 'ig');
    const matches = string.match(caseInsensitiveRegex);
    if (matches) return acc.concat(matches);
    else return acc;
  }, []);

  const replacements = replaceables.map(word => {
    const replacement = titleCase.check(word)
      ? titleCase(dictionary[word.toLowerCase()])
      : dictionary[word];
    return [word, replacement];
  });

  const translation = replace(string, replacements);
  return { translation, replacements };
};

export function convertTime (string, translationDirection) {
  const separators = {
    'american-to-british': '.',
    'british-to-american': ':',
  };
  const replacements = [];
  const translation = string.replace(/(\d{1,2})[.:](\d{2})/g, (match, p1, p2) => {
    const replacement = p1 + separators[translationDirection] + p2;
    replacements.push([ match, replacement ]);
    return replacement;
  });
  return { translation, replacements };
};

export function replace (string, replacements) {
  if (replacements.length === 0) return string;
  else {
    const word = replacements[0][0];
    const replacement = replacements[0][1];
    const caseSensitiveRegex = new RegExp(escapeRegExp(word), 'g');
    const newString = string.replace(caseSensitiveRegex, replacement);
    return replace(newString, replacements.slice(1));
  };
};

export function escapeRegExp (string) {
  return `\\b${string.replace(/\.$/g, '\\$&')}(?=\\b|\\s)`;
};

export function titleCase (string) {
  return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
};
titleCase.check = function (string) {
  return /^[A-Z]/.test(string);
};

export function invertWordMap (wordMap) {
  const inverted = {};
  Object.keys(wordMap).forEach(key => {
    inverted[wordMap[key]] = key;
  });
  return inverted;
};

export function generateDictionary (translationDirection) {
  if (translationDirection === 'american-to-british') {
    return Object.assign({},
      americanToBritishSpelling,
      americanToBritishTitles,
      americanOnly);
  } else if (translationDirection === 'british-to-american') {
    return Object.assign({},
      invertWordMap(americanToBritishSpelling),
      invertWordMap(americanToBritishTitles),
      britishOnly);
  } else throw new Error('Invalid value for locale field');
};
