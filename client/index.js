import _polyfill from 'babel/polyfill';

import _ from 'lodash';
import React from 'react';

import api from './api';

import PokemonList from './components/list';

class App extends React.Component {
    constructor() {
        super();

        this.state = { pokemon: [] };
    }

    async componentDidMount() {
        const pokemon = await api.getAllPokemon();

        this.setState({ pokemon: _(pokemon).value() });
    }

    render() {
        return <PokemonList pokemon={this.state.pokemon} dex='national' />;
    }
}

React.render(
    <App />,
    document.getElementById('content')
);
