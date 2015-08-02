import path from 'path';

import express from 'express';
import serveStatic from 'serve-static';
import morgan from 'morgan';

import Pokemon from './models/pokemon';
import Species from './models/species';
import { SpeciesName } from './models/language';

const app = express();

app.use(morgan());
app.use(serveStatic(path.join(__dirname, '..', 'public')));

function mapPokemon(pkmn) {
    return {
        id: pkmn.get('id'),
        names: pkmn.related('names').models.map((name) => {
            return {
                name: name.get('name'),
                genus: name.get('genus'),
                languageIdentifier: name.related('language').get('identifier')
            };
        })
    };
}

app.get('/api/pokemon', async (req, res) => {
    const pkmns = await Species.fetchAll({
        withRelated: ['names.language']
    });

    res.json(pkmns.models.map(mapPokemon));
});

app.get('/api/pokemon/:id', async (req, res) => {
    const { id } = req.params;

    const pkmn = await Species.where({ id }).fetch({
        withRelated: ['names.language']
    });

    res.json(mapPokemon(pkmn));
});

app.listen(80);
