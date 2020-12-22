import HTMLHighlighter from '../controllers/highlighter';
const chai = require('chai');
const assert = chai.assert;

// const Translator = require('../controllers/translator.js');

suite('Unit Tests', () => {
  suite('HTMLHighlighter', () => {
    const highlighter = new HTMLHighlighter();
    const string = 'The quick brown fox jumped, yes, over the lazy dog!';
    const result = 'The <span class="highlight">quick</span> brown fox jumped, yes, over the <span class="highlight">lazy</span> dog!';
    test('Returns an HTML string with a <span> wrapped around supplied words', () => {
      const words = ['quick', 'lazy'];
      const highlighted = highlighter.highlight(string, words);
      assert.equal(highlighted, result);
    });
  });
});
