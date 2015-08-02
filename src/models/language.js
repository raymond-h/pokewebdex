import bookshelf from '../bookshelf';
import Species from './species';

export default class Language extends bookshelf.Model {
}
Language.prototype.tableName = 'languages';


export class SpeciesName extends bookshelf.Model {
    species() {
        return this.belongsTo(Species, 'pokemon_species_id');
    }

    language() {
        return this.belongsTo(Language, 'local_language_id');
    }
}
SpeciesName.prototype.tableName = 'pokemon_species_names';
