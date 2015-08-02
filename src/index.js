import path from 'path';

import express from 'express';
import serveStatic from 'serve-static';
import morgan from 'morgan';

import Pokemon from './models/pokemon';
import { SpeciesName } from './models/language';

const app = express();

app.use(morgan());
app.use(serveStatic(path.join(__dirname, '..', 'public')));

app.get('/api/pokemon', async (req, res) => {
    const pkmn = await Pokemon.forge().fetchAll({
        withRelated: ['species']
    });

    res.json(pkmn);
});

app.get('/api/pokemon/:id/names', async (req, res) => {
    const { id } = req.params;

    const pkmn = await Pokemon.forge({ id }).fetch({
        withRelated: ['species']
    });

    const names = await SpeciesName.where({
        pokemon_species_id: pkmn.related('species').get('id')
    }).fetchAll();

    res.json(names);
});

app.get('/api/pokemon/:id', async (req, res) => {
    const { id } = req.params;

    const pkmn = await Pokemon.forge({ id }).fetch({
        withRelated: ['species.names.language']
    });

    res.json(pkmn);
});

app.listen(80);
