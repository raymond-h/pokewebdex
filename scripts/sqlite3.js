import Promise from 'bluebird';
import Knex from 'knex';

import writeToDatabase from './data-importer';

async function writeSqlite() {
    const knex = Knex({
        client: 'sqlite3',
        connection: {
            filename: './pokedex.sqlite'
        }
    });

    await writeToDatabase(knex);
}

Promise.resolve(writeSqlite()).done(
    () => {
        console.log('WE DONE HERE');
        process.exit(0);
    }
);
