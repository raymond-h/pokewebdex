import bookshelf from '../bookshelf';

import Species from './species';

export default class Pokedex extends bookshelf.Model {
    dexNumbers() {
        return this.hasMany(DexNumber, 'pokedex_id');
    }
}
Pokedex.prototype.tableName = 'pokedexes';

export class DexNumber extends bookshelf.Model {
    species() {
        return this.belongsTo(Species, 'species_id');
    }

    pokedex() {
        return this.belongsTo(Pokedex, 'pokedex_id');
    }
}
DexNumber.prototype.tableName = 'pokemon_dex_numbers';
