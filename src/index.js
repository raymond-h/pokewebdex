import path from 'path';

import express from 'express';
import serveStatic from 'serve-static';
import morgan from 'morgan';

import Pokemon from './models/pokemon';
import Species from './models/species';
import Pokedex, { DexNumber } from './models/pokedex';
import { SpeciesName } from './models/language';

const app = express();

app.use(morgan());
app.use(serveStatic(path.join(__dirname, '..', 'public')));

app.get('/api/pokemon', async (req, res) => {
    const pkmns = await Species.fetchAll({
        withRelated: ['names.language', 'pokemon']
    });

    res.json(pkmns);
});

app.get('/api/pokemon/:id', async (req, res) => {
    const { id } = req.params;

    const pkmn = await Species.where({ id }).fetch({
        withRelated: ['names.language', 'pokemon']
    });

    res.json(pkmn);
});

app.get('/api/pokemon/:id/dex', async (req, res) => {
    const { id } = req.params;

    const dexNums = await DexNumber.where({ species_id: id }).fetchAll();

    res.json(dexNums);
});

app.get('/api/pokemon/:id/dex/:dex', async (req, res) => {
    const { id, dex } = req.params;

    const pokedex = await Pokedex.where({ identifier: dex }).fetch();
    const pkmn = await Species.forge({ id }).fetch();

    const dexNum = await pokedex.dexNumber(pkmn).fetch();

    res.json(dexNum);
});

app.get('/api/pokedexes', async (req, res) => {
    const dexes = await Pokedex.fetchAll();

    res.json(dexes);
});

app.get('/api/pokedexes/:id', async (req, res) => {
    const { id } = req.params;

    const dex = await Pokedex.where({ identifier: id }).fetch();

    res.json(dex);
});

app.get('/api/pokedexes/:id/dexnums', async (req, res) => {
    const { id } = req.params;

    const dex = await Pokedex.where({ identifier: id }).fetch();

    const dexnums = await dex.dexNumbers().fetch();

    res.json(dexnums);
});

app.listen(80);
