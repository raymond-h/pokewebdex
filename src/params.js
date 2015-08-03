import Species from './models/species';
import Pokedex from './models/pokedex';

export default (app) => {

    app.param('speciesId', async (req, res, next, id) => {
        req.species = await Species.where({ id }).fetch({
            withRelated: ['pokemon']
        });
        next();
    });

    app.param('pokedexId', async (req, res, next, id) => {
        req.pokedex = await Pokedex.where({ id }).fetch();
        next();
    });
};
