import _ from 'lodash';
import Backbone from 'backbone';

export class Pokemon extends Backbone.Model {
    urlRoot = '/api/pokemon';
}

export class PokemonCollection extends Backbone.Collection {
    url = '/api/pokemon';
}

Pokemon.prototype.collection = PokemonCollection;
PokemonCollection.prototype.model = Pokemon;
