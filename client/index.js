import _polyfill from 'babel/polyfill';

import _ from 'lodash';
import React from 'react';
import Promise from 'bluebird';

import { PokemonCollection } from './api';

class App extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
    }

    async componentDidMount() {
        const pkmn = await Promise.resolve(new PokemonCollection().fetch());

        console.log(pkmn);

        this.setState({ data: pkmn });
    }

    render() {
        return <div>
            {
                this.state.data.map((pkmn) =>
                    <PokemonDisplay pokemon={this.state.data} language="en" />
                )
            }
        </div>;
    }
}

class PokemonDisplay extends React.Component {
    isThisLang(name) {
        return name.language.identifier === this.props.language;
    }

    getNameObj() {
        return _.find(this.props.pokemon.species.names, ::this.isThisLang);
    }

    render() {
        return <p>
            { this.getNameObj().name }, the { this.getNameObj().genus } Pokemon.
        </p>;
    }
}

React.render(
    <App />,
    document.getElementById('content')
);
