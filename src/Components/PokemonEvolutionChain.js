import React, {Component} from 'react';
import LazyLoad from 'react-lazy-load';
import {FixPokemonNameForImages} from '../Helpers/Helpers';

import Pokedex from 'pokedex-promise-v2';
import './PokemonEvolutionChain.css';

class PokemonEvolutionChain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonSpecies: null,
      pokemonEvolutionChain: null,
    };
  }

  componentDidMount() {
    const pokedex = new Pokedex();

    //Get SpeciesInfo
    pokedex.getPokemonSpeciesByName(this.props.pokemon)
    .then(responseSpecies => {
      this.setState({ pokemonSpecies: responseSpecies });

      //Get EvolutionInfo
      pokedex.resource(responseSpecies["evolution_chain"]["url"])
      .then(responseEvolutionChain => {
        let evolutionChain = [];
        evolutionChain.push([responseEvolutionChain["chain"]]);

        const evolutions = responseEvolutionChain["chain"]["evolves_to"];
        this.processEvolutionChain(evolutionChain, evolutions);

        this.setState({ pokemonEvolutionChain: evolutionChain });
      })
      .catch(error => {
        console.log("There was an ERROR:", error);
      });
    })
    .catch(error => {
      console.log("There was an ERROR:", error);
    });
  }

  render() {
    const {pokemonSpecies, pokemonEvolutionChain} = this.state;
    if (pokemonSpecies === null || pokemonEvolutionChain === null) {
      return null;
    }

    const evolutionChainWidth = Math.floor(100.0 / pokemonEvolutionChain.length);
    return (
      <div className="evolution-chain-container">
        <div className="evolution-chain-title">
          <p>Evolution Chain</p>
        </div>
        {
          pokemonEvolutionChain.map((evolutionStage, indexEvolutionChain) => {
            return (
              <div className={`w-${evolutionChainWidth} evolution-stage-container`}
                key={`${indexEvolutionChain}`}>
                <div className="evolution-stage-text w-100">
                  <p>Stage {indexEvolutionChain + 1}</p>
                </div>
                {evolutionStage.map((evolution, indexEvolutionStage) => {
                  let evolutionNameFix = FixPokemonNameForImages(evolution["species"]["name"]);
                  return (
                    <LazyLoad key={`${indexEvolutionChain}-${indexEvolutionStage}`}>
                      <img
                        className="sprite evolution-stage-img"
                        alt={`${evolution["species"]["name"]}`}
                        src={`http://pokestadium.com/sprites/xy/${evolutionNameFix}.gif`}
                      />
                    </LazyLoad>
                  )
                })}
              </div>
            )
          }
        )}
      </div>
    );
  }

  processEvolutionChain(evolutionChain, evolutions) {
    if (evolutions === null || evolutions.length === 0) {
      return;
    }

    evolutionChain.push(evolutions);
    for (let i = 0; i < evolutions.length; ++i) {
      const evolution = evolutions[i];
      if (evolution["evolves_to"]) {
        this.processEvolutionChain(evolutionChain, evolution["evolves_to"]);
      }
    }
  }
}

export default PokemonEvolutionChain;
