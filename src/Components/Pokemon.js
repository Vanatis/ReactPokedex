import React, {Component} from 'react';
import {Collapse} from 'react-collapse';
import {presets} from 'react-motion';
import LazyLoad from 'react-lazy-load';
import PokemonInfo from './PokemonInfo';
import {FixPokemonNameForImages} from '../Helpers/Helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Pokemon.css';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bShowData: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      bShowData: !prevState.bShowData
    }));

    if (this.pokemonInfoRef) {
      this.pokemonInfoRef.loadDetails();
    }
  }

  render() {
    const {bShowData} = this.state;
    const pokemon = this.props.pokemon;
    const pokemonFix = FixPokemonNameForImages(pokemon);

    let singleBodyClassName = "pokemon-single-container";
    if (bShowData) {
      singleBodyClassName += " pokemon-single-container-open"
    };

    return (
      <div className={singleBodyClassName}>
        <div className="pokemon-single-header">
          <LazyLoad
            className="pokemon-single-header-lazyload"
            debounce={false}>
            <img
              className="sprites"
              alt={this.props.pokemon}
              src={`http://pokestadium.com/sprites/xy/${pokemonFix}.gif`}
            />
          </LazyLoad>
          <div className="pokemon-name">{pokemonFix}</div>
        </div>

        <Collapse isOpened={bShowData} springConfig={presets.wobbly}>
          <PokemonInfo pokemon={pokemon} onRef={pokemonInfoRef => (this.pokemonInfoRef = pokemonInfoRef)}/>
        </Collapse>

        <div className="pokemon-expand" onClick={() => this.handleClick()}>
          {
            (!bShowData) ?
            <FontAwesomeIcon icon="chevron-circle-down" /> :
            <FontAwesomeIcon icon="chevron-circle-up" />
          }
        </div>
      </div>
    );
  }
}

export default Pokemon;
