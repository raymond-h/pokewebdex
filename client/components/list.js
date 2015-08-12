import _ from 'lodash';
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
    render() {
        return <p className='pokemon-entry'>
            #{ this.props.pokemon.dexNumber }: { this.props.pokemon.name }
        </p>;
    }
}
