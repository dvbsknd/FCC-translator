import HTMLHighlighter from '../controllers/highlighter';
import Translator, { convertTime } from '../controllers/translator';
import { testStrings, highlights } from './test-strings.js';
import chai from 'chai';
const assert = chai.assert;
const translator = new Translator();
const highlighter = new HTMLHighlighter();

suite('Unit Tests', () => {
  suite('HTMLHighlighter', () => {
    const string = 'The quick brown fox jumped, yes, over the lazy dog!';
    const expected = 'The <span class="highlight">quick</span> brown fox jumped, yes, over the <span class="highlight">lazy</span> dog!';

    test('Returns an HTML string with a <span> wrapped around supplied words', () => {
      const words = ['quick', 'lazy'];
      const highlighted = highlighter.highlight(string, words);
      assert.equal(highlighted, expected);
    });
  });

  suite('convertTime ', () => {
    const string = 'Lunch is at 12:15 today.';
    const direction = 'american-to-british';
    const expected = 'Lunch is at 12.15 today.';

    test('Formats the time in a string from British to American', () => {
      const result = convertTime(string, direction);
      assert.equal(result.translation, expected);
    });
  });

  suite('Translations', () => {
    testStrings.forEach(testString => {
      const { input, direction, output } = testString;
      test(input, () => {
        const { translation } = translator.translate(input, direction);
        assert.equal(translation, output);
      });
    });
  });

  suite('Highlights', () => {
    highlights.forEach(testString => {
      const { input, translation, replacements, expected } = testString;
      const words = replacements.map(tuple => tuple[1]);
      test(input, () => {
        const highlighted = highlighter.highlight(translation, words);
        assert.equal(highlighted, expected);
      });
    });
  });
});
