import _ from 'lodash';
import React from 'react';
import VirtualList from 'react-virtual-list/dist/VirtualList';

export default class PokemonList extends React.Component {
    renderItem(pkmn) {
        return <PokemonEntry key={pkmn.id} {...this.props} pokemon={pkmn} onClick={this.props.onClick} />;
    }

    render() {
        return <div className='pokemon-list'>
            {
                this.props.pokemon.map(::this.renderItem)
            }
        </div>;
    }
}

export class PokemonEntry extends React.Component {
    onClick() {
        this.props.onClick(this.props.pokemon);
    }

    render() {
        return <p className='pokemon-entry' onClick={::this.onClick}>
            #{ this.props.pokemon.dexNumber }: { this.props.pokemon.name }
        </p>;
    }
}
