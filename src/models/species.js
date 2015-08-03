import bookshelf from '../bookshelf';

import Pokemon from './pokemon';
import Pokedex, { DexNumber } from './pokedex';
import EvolutionMethod from './evolution-method';
import { SpeciesName } from './language';

export default class Species extends bookshelf.Model {
    pokemon() {
        return this.hasOne(Pokemon, 'species_id');
    }

    names() {
        return this.hasMany(SpeciesName, 'pokemon_species_id');
    }

    evolutions() {
        return this.hasMany(Species, 'evolves_from_species_id');
    }

    evolutionMethods() {
        return this.hasOne(EvolutionMethod, 'evolved_species_id');
    }

    dexNumbers() {
        return this.hasMany(DexNumber, 'species_id');
    }
}
Species.prototype.tableName = 'pokemon_species';
