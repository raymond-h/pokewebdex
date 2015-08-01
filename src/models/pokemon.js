import bookshelf from '../bookshelf';

import Species from './species';

export default class Pokemon extends bookshelf.Model {
    species() {
        return this.belongsTo(Species, 'species_id');
    }
}
Pokemon.prototype.tableName = 'pokemon';
