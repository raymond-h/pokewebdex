import bookshelf from '../bookshelf';

import Pokemon from './pokemon';
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

    evolutionMethod() {
        return this.hasOne(EvolutionMethod, 'evolved_species_id');
    }

    name(language) {
        return SpeciesName.forge({
            pokemon_species_id: this.get('id'),
            local_language_id: language.get('id')
        });
    }
}
Species.prototype.tableName = 'pokemon_species';
