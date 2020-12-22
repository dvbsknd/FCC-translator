import americanToBritishSpelling from './dictionaries/american-to-british-spelling.js';
import americanToBritishTitles from './dictionaries/american-to-british-titles';
import americanOnly from './dictionaries/american-only';
import britishOnly from './dictionaries/british-only';

export default function Translator () {
};

Translator.prototype.translate = function (inputText, translationDirection) {
  const dictionary = generateDictionary(translationDirection);
  return inputText.split(' ').map(word => dictionary[word] || word).join(' ');
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
  } else throw new Error('Invalid translation direction');
};
