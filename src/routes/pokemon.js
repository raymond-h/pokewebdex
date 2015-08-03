import Species from '../models/species';
import { SpeciesName } from '../models/language';
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
        const dexNum = await DexNumber.where({
            species_id: req.species.get('id'),
            pokedex_id: req.pokedex.get('id')
        }).fetch();

        res.json(dexNum);
    });

    app.get('/api/pokemon/:speciesId/name/:languageId', async (req, res) => {
        const name = await SpeciesName.where({
            pokemon_species_id: req.species.get('id'),
            local_language_id: req.language.get('id')
        }).fetch();

        res.json(name);
    });
};
