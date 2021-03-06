import _polyfill from 'babel/polyfill';

import _ from 'lodash';
import React from 'react';

import api from './api';

import PokemonList from './components/list';
import PokemonDetails from './components/details';

function mapPokemon(pkmn, language, pokedex) {
    const name = _.findWhere(pkmn.names, { local_language_id: language.id });
    const dexNumber = _.findWhere(pkmn.dexNumbers, { pokedex_id: pokedex.id });

    return {
        id: pkmn.id,
        name: name.name,
        dexNumber: dexNumber.pokedex_number
    };
}

class App extends React.Component {
    constructor() {
        super();

        this.state = { pokemon: [], pokedexes: [], pokedex: 'national', selectedPokemonId: -1 };
    }

    async componentDidMount() {
        const pokemon = await api.getAllPokemon();
        const language = await api.getLanguage('en');
        const pokedexes = await api.getPokedexes();

        this.setState({ pokemon, language, pokedexes });
    }

    onClickPokemon(pkmn) {
        this.setState({ selectedPokemonId: pkmn.id });
    }

    onChangePokedex(event) {
        this.setState({ pokedex: event.target.value, selectedPokemonId: -1 });
    }

    render() {
        const pokedex = _.findWhere(this.state.pokedexes, { identifier: this.state.pokedex });

        const pokemon = _(this.state.pokemon)
            .filter((pkmn) => _.any(pkmn.dexNumbers, { pokedex_id: pokedex.id }))
            .map((pkmn) => mapPokemon(pkmn, this.state.language, pokedex))
            .sortBy('dexNumber')
            .value();

        const selectedPokemon = this.state.selectedPokemonId ?
            _.findWhere(pokemon, { id: this.state.selectedPokemonId }) : null;

        return <div>
            <div class="sidebar" style={{ float: 'left', height: '100vh', overflow: 'scroll' }}>
                <select onChange={::this.onChangePokedex} value={this.state.pokedex}>
                    {
                        this.state.pokedexes.map(pokedex =>
                            <option key={pokedex.id} value={pokedex.identifier}>
                                {pokedex.identifier}
                            </option>
                        )
                    }
                </select>
                <PokemonList pokemon={pokemon} onClick={::this.onClickPokemon} />
            </div>
            <PokemonDetails pokemon={selectedPokemon} language={this.state.language} />
        </div>;
    }
}

React.render(
    <App />,
    document.getElementById('content')
);
