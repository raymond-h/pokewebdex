import fs from 'fs';
import path from 'path';
import childProcess from 'child_process';

import Promise from 'bluebird';
import parseCsv from 'csv-parse';
import Tree from 'skywalker';
import _ from 'lodash';

Promise.promisifyAll(fs);
Promise.promisifyAll(childProcess);
const parseCsvAsync = Promise.promisify(parseCsv);

const GITHUB_URL = 'https://github.com/veekun/pokedex';

async function walkTree(p) {
    const files = [];

    const tree =
        Tree(p)
        .extensionFilter('csv', function(next) {
            files.push(this._.path);
            next();
        });

    await Promise.fromNode(::tree.start);

    return await Promise.resolve(files);
}

function typesForKeys(data) {
    const keys = {};

    for(const row of data) {
        for(const key of _.keys(row)) {
            keys[key] = keys[key] != null ? keys[key] : {};
            const cell = row[key];

            if(cell == null || cell === '') {
                keys[key].nullable = true;
            }
            else if(_.isNumber(cell)) {
                keys[key].type = 'number';
                keys[key].integer = Number.isInteger(cell);

                if(keys[key].bool !== false) {
                    keys[key].bool = cell === 0 || cell === 1;
                }
            }
            else if(_.isString(cell)) {
                keys[key].type = 'string';
            }
            else {
                throw new Error('Unknown type of cell ' + cell);
            }
        }
    }

    return keys;
}

async function createTableFor(knex, tableName, csv) {
    const types = typesForKeys(csv);

    await knex.schema
    .dropTableIfExists(tableName)
    .createTable(tableName, (table) => {

        for(const key of _.keys(types)) {
            const { type, integer, bool, nullable } = types[key];
            let column;

            if(type === 'string') { column = table.text(key); }
            else if(type === 'number') {
                if(integer) {
                    if(bool) {
                        column = table.boolean(key);
                    }
                    else {
                        column = table.integer(key);
                    }
                }
                else {
                    column = table.decimal(key);
                }
            }

            if(!nullable) { column = column.notNullable(); }

            if(key === 'id') {
                column = column.primary().unique();
            }
        }
    });
}

export default async function writeToDatabase(knex, tables) {
    const alreadyCloned = await new Promise((resolve) => {
        fs.exists('./pokedex', (exists) => resolve(exists));
    });

    if(!alreadyCloned) {
        console.log('Cloning repo...');
        await childProcess.execAsync(`git clone ${GITHUB_URL} --depth 1`);
    }
    else {
        console.log('Pulling changes...');
        await childProcess.execAsync(`git pull`, { cwd: './pokedex' });
    }

    const files = await walkTree('./pokedex/pokedex/data/csv');

    for(const file of files) {
        const tableName = path.basename(file, '.csv');

        if(_.isArray(tables) && !_.includes(tables, tableName)) continue;

        const data = await fs.readFileAsync(file);
        const csv = await parseCsvAsync(data.toString(), {
            columns: true, auto_parse: true // eslint-disable-line camelcase
        });

        if(csv.length === 0) { continue; }

        console.log('Creating table ' + tableName);

        await createTableFor(knex, tableName, csv);

        const columnCount = _.keys(csv[0]).length;
        const chunkSize = Math.floor(10 / columnCount * 80);
        console.log('\tChunk size: ' + chunkSize);

        const chunks = _.chunk(csv, chunkSize);
        for(const chunk of chunks) {
            await knex(tableName).insert(chunk);
        }

        console.log('\tInserted ' + csv.length + ' rows');
    }
}

// Promise.resolve(writeToDatabase()).done();
