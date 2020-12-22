import Translator from '../controllers';

module.exports = function userRoutes (app) {
  const translator = new Translator();

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
        const translation = translator.translate(text, locale);
        res.json({ text, translation });
      } catch (err) {
        res.error(err);
      };
    });
};
