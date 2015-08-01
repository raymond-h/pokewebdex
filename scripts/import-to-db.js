import path from 'path';

import Promise from 'bluebird';
import Knex from 'knex';

import writeToDatabase from './data-importer';
import { database } from '../config.json';

async function writeToDb(tables) {
    if(database.client === 'sqlite3') {
        database.connection.filename =
            path.join('..', database.connection.filename);
    }

    const knex = Knex(database);

    await writeToDatabase(knex, tables);
}

Promise.try(() => writeToDb(['pokemon']))
.done(() => {
    console.log('WE DONE HERE');
    process.exit(0);
});
