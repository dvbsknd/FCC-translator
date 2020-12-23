import HTMLHighlighter from '../controllers/highlighter';
import { convertTime } from '../controllers/translator';
const chai = require('chai');
const assert = chai.assert;

// const Translator = require('../controllers/translator.js');

suite('Unit Tests', () => {
  suite('HTMLHighlighter', () => {
    const highlighter = new HTMLHighlighter();
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
      assert.equal(result, expected);
    });
  });
});
