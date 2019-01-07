import React, {Component} from 'react';
import PokemonType from './PokemonType';
import PokemonEvolutionChain from './PokemonEvolutionChain';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Pokedex from 'pokedex-promise-v2';
import './PokemonInfo.css';

class PokemonInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonInfo: null,
    };
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  loadDetails() {
    const pokedex = new Pokedex();
    pokedex.getPokemonByName(this.props.pokemon)
    .then(response => {
      this.setState({pokemonInfo: response});
    })
    .catch(error => {
      console.log("There was an ERROR:", error);
    });
  }

  render() {
    const {pokemonInfo} = this.state;
    if (pokemonInfo === null) {
      return (
        <div className="pokemon-single-body">
          <p className="flavor-text">
            <FontAwesomeIcon icon="spinner" pulse /> Loading Data
          </p>
        </div>
      );
    }

    return (
      <div className="pokemon-single-body">
        <PokemonType types={pokemonInfo["types"]} />
        <PokemonEvolutionChain pokemon={pokemonInfo["species"]["name"]}/>

        <p>
          #{pokemonInfo["id"]} <br />
          Height: {pokemonInfo["height"]} <br />
          Weight: {pokemonInfo["weight"]}
        </p>
      </div>
    );

    /*
    //Flavor text
    let textEntries = [];
    if (pokemonSpecies !== null) {
      textEntries = pokemonSpecies["flavor_text_entries"]
      .filter(textEntry => {
        return textEntry["language"]["name"] === "en";
      });
    }
    */
  }
}

export default PokemonInfo;
