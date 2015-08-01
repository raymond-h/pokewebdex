import Knex from 'knex';
import Bookshelf from 'bookshelf';
import config from '../config';

const knex = Knex(config.database);

export default Bookshelf(knex);
