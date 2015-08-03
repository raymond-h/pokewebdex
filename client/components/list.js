import React from 'react';
import VirtualList from 'react-virtual-list/dist/VirtualList';

import api from '../api';

export default class PokemonList extends React.Component {
    renderItem(pkmn) {
        return <PokemonEntry key={pkmn.id} {...this.props} pokemon={pkmn} />;
    }

    render() {
        return <VirtualList items={this.props.pokemon} renderItem={::this.renderItem} itemHeight='30' />;
    }
}

export class PokemonEntry extends React.Component {
    constructor() {
        super();
        this.state = null;
    }

    async componentDidMount() {
        const { pokedex_number } = await api.getPokedexNumber({
            pkmnId: this.props.pokemon.id,
            dexId: this.props.dex
        });

        const { name, genus } = await api.getPokemonName({
            pkmnId: this.props.pokemon.id,
            langId: 'en'
        });

        this.setState({ dexNumber: pokedex_number, name, genus });
    }

    render() {
        return this.state ?
            <p className='pokemon-entry'>
                #{ this.state.dexNumber } { this.state.name }, the { this.state.genus } Pokemon.
            </p> :
            <p className='pokemon-entry'>???</p>;
    }
}
