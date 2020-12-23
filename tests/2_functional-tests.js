import app from '../server';
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { highlights as testStrings } from './test-strings.js';
chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('POST request to /api/translate', () => {
    const endpoint = '/api/translate';

    test('Translation with text and locale fields', () => {
      const { input: text, direction: locale, expected } = testStrings[0];
      chai.request(app).post(endpoint).send({ text, locale })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, 200);
          assert.equal(res.body.translation, expected);
        });
    });

    test('Translation with text and invalid locale field', () => {
      const { input: text } = testStrings[1];
      chai.request(app).post(endpoint).send({ text, locale: 'indonesian-to-swahili' })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'Invalid value for locale field');
        });
    });

    test('Translation with missing text field', () => {
      const { direction: locale } = testStrings[2];
      chai.request(app).post(endpoint).send({ locale })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, 400);
          assert.match(res.body.error, /Required field.* missing/);
        });
    });

    test('Translation with missing locale field', () => {
      const { input: text } = testStrings[3];
      chai.request(app).post(endpoint).send({ text })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, 400);
          assert.match(res.body.error, /Required field.* missing/);
        });
    });

    test('Translation with empty text', () => {
      const { direction: locale } = testStrings[1];
      chai.request(app).post(endpoint).send({ text: '', locale })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'No text to translate');
        });
    });

    test('Translation with text that needs no translation', () => {
      const { direction: locale } = testStrings[1];
      chai.request(app).post(endpoint).send({ text: 'No translation required.', locale })
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.status, 200);
          assert.equal(res.body.translation, 'Everything looks good to me!');
        });
    });
  });
});
