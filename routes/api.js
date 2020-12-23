import Translator from '../controllers/translator.js';
import HTMLHighlight from '../controllers/highlighter.js';

module.exports = function userRoutes (app) {
  const translator = new Translator();
  const highlighter = new HTMLHighlight();

  app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') console.log('[API]', req.method, req.body);
    next();
  });

  app.use((req, res, next) => {
    res.error = (err) => {
      if (process.env.NODE_ENV !== 'test') console.log('[API] Error:', err);
      res.status(400);
      res.json({ error: err.message });
    };
    next();
  });

  app.route('/api/translate')
    .post((req, res) => {
      try {
        const { text, locale } = req.body;
        const { translation: rawTranslation, replacements } = translator.translate(text, locale);
        const translation = highlighter.highlight(rawTranslation, replacements);
        console.log('[API] Response', { text, replacements, translation });
        res.json({ text, translation });
      } catch (err) {
        res.error(err);
      };
    });
};
