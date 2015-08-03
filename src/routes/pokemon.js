import Species from '../models/species';
import { DexNumber } from '../models/pokedex';

export default (app) => {

    app.get('/api/pokemon', async (req, res) => {
        const pkmns = await Species.fetchAll({
            withRelated: ['pokemon']
        });

        res.json(pkmns);
    });

    app.get('/api/pokemon/:speciesId', async (req, res) => {
        res.json(req.species);
    });

    app.get('/api/pokemon/:speciesId/dex', async (req, res) => {
        const dexNums = await DexNumber.where({
            species_id: req.species.get('id')
        }).fetchAll();

        res.json(dexNums);
    });

    app.get('/api/pokemon/:speciesId/dex/:pokedexId', async (req, res) => {
        const dexNum = await req.pokedex.dexNumber(req.species).fetch();

        res.json(dexNum);
    });
};
