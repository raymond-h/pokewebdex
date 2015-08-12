import Species from './models/species';
import Pokedex from './models/pokedex';
import Language from './models/language';

export default (app) => {

    app.param('speciesId', async (req, res, next, id) => {
        try {
            req.species = await Species
                .query({ where: { id }, orWhere: { identifier: id } })
                .fetch({
                    withRelated: ['pokemon', 'dexNumbers', 'names.language']
                });

            next();
        }
        catch(e) { next(e); }
    });

    app.param('pokedexId', async (req, res, next, id) => {
        try {
            req.pokedex = await Pokedex
                .query({ where: { id }, orWhere: { identifier: id } })
                .fetch();

            next();
        }
        catch(e) { next(e); }
    });

    app.param('languageId', async (req, res, next, id) => {
        try {
            req.language = await Language
                .query({ where: { id }, orWhere: { identifier: id } })
                .fetch();

            next();
        }
        catch(e) { next(e); }
    });
};
