import bookshelf from '../bookshelf';

export default class Language extends bookshelf.Model {
}
Language.prototype.tableName = 'languages';


export class SpeciesName extends bookshelf.Model {
    language() {
        return this.belongsTo(Language, 'local_language_id');
    }
}
SpeciesName.prototype.tableName = 'pokemon_species_names';
