import Promise from 'bluebird';

import Pokemon from './models/pokemon';
import Language from './models/language';
import Species from './models/species';

async function pokeName() {
    const pkmn = await Pokemon.forge({ identifier: 'swampert' })
        .fetch({ withRelated: ['species'] });

    const lang = await Language.forge({ identifier: 'en' }).fetch();

    const name = await pkmn.related('species').name(lang).fetch();

    console.log(`${name.get('name')}, ${name.get('genus')} Pokemon`);
}

async function pokeEvos() {
    const lang = await Language.forge({ identifier: 'ja' }).fetch();

    const pkmn = await Species.forge({ identifier: 'koffing' })
        .fetch({ withRelated: ['evolutions'] });

    const name = await pkmn.name(lang).fetch();
    const evoNames = await Promise.all(
        pkmn.related('evolutions').map((evo) => evo.name(lang).fetch({ require: true }))
    );

    console.log(name.get('name'), 'evolves into:');
    console.log(evoNames.map((evo) => '-- ' + evo.get('name')).join('\n'));
}

async function main() {
    // await pokeName();
    await pokeEvos();
}

import bookshelf from './bookshelf';

Promise.resolve(main())
.done(() => {
    bookshelf.knex.destroy();
});
