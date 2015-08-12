import Language from '../models/language';

export default (app) => {
    app.get('/api/languages', async (req, res) => {
        const langs = await Language.fetchAll();

        res.json(langs);
    });

    app.get('/api/languages/:languageId', async (req, res) => {
        res.json(req.language);
    });
};
