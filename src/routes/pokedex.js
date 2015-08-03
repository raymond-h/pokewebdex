import Pokedex from '../models/pokedex';

export default (app) => {
    app.get('/api/pokedexes', async (req, res) => {
        const dexes = await Pokedex.fetchAll();

        res.json(dexes);
    });

    app.get('/api/pokedexes/:pokedexId', async (req, res) => {
        res.json(req.pokedex);
    });

    app.get('/api/pokedexes/:pokedexId/dexnums', async (req, res) => {
        const dexnums = await req.pokedex.dexNumbers().fetch();

        res.json(dexnums);
    });
};
