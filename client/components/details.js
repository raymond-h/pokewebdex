import _ from 'lodash';
import React from 'react';

import api from '../api';

export default class PokemonDetails extends React.Component {
    constructor() {
        super();
        this.state = { pokemonNameData: null };
    }

    async componentWillReceiveProps(newProps) {
        if(!newProps.pokemon) return this.setState({ pokemonNameData: null });

        const pokemonNameData = await api.getPokemonName(newProps.pokemon.id, newProps.language.id);

        this.setState({ pokemonNameData });
    }

    render() {
        if(!this.state.pokemonNameData) return <p className='pokemon-details'>???</p>;

        const { name, genus } = this.state.pokemonNameData;

        return <p className='pokemon-details'>{ name }, the { genus } Pokemon.</p>;
    }
}
