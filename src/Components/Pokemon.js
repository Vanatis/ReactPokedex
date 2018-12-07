import React, {Component} from 'react';
import {Collapse} from 'react-collapse';
import {presets} from 'react-motion';
import LazyLoad from 'react-lazy-load';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Pokedex from 'pokedex-promise-v2';
import './Pokemon.css';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bShowData: false,
      pokemonData: null,
      pokemonSpecies: null,
      pokemonEvolutionChain: null,
      bPokemonDataPending: false,
      bIsLoaded: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(pokemon) {
    //Load only once per pokemon
    if (!this.state.bPokemonDataPending && this.state.pokemonData === null) {
      this.setState({bPokemonDataPending: true});

      const pokedex = new Pokedex();
      //Get generalInfo
      pokedex.getPokemonByName(this.props.pokemon)
      .then(response => {
        this.setState({pokemonData: response});

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
            this.setState({ bPokemonDataPending: false });
          })
          .catch(error => {
            console.log("There was an ERROR:", error);
          });
        })
        .catch(error => {
          console.log("There was an ERROR:", error);
        });
      })
      .catch(error => {
        console.log("There was an ERROR:", error);
      });
    }

    this.setState(prevState => ({
      bShowData: !prevState.bShowData
    }));
  }

  render() {
    let pokemon = this.props.pokemon;
    pokemon = this.fixNameException(pokemon);
    const { pokemonData, pokemonSpecies, pokemonEvolutionChain, bShowData } = this.state;

    //Flavor text
    let textEntries = [];
    if (pokemonSpecies !== null) {
      textEntries = pokemonSpecies["flavor_text_entries"]
      .filter(textEntry => {
        return textEntry["language"]["name"] === "en";
      });
    }

    let pokemonSingleBody;
    if (!this.state.bPokemonDataPending && pokemonData !== null && pokemonSpecies !== null && pokemonEvolutionChain !== null) {
      const evolutionChainWidth = Math.floor(100.0 / pokemonEvolutionChain.length);
      pokemonSingleBody = (
        <div className="pokemon-single-body">
          <div className="w-100">
            <p>#{pokemonData["id"]}</p>
            <p>Height: {pokemonData["height"]}</p>
            <p>Weight: {pokemonData["weight"]}</p>
          </div>
          <div className="w-100">
            <p>{textEntries[0]["flavor_text"]}</p>
          </div>
          <div className="evolution-chain-container">
            <div className="evolution-chain-title">
              <p>Evolution Chain</p>
            </div>

            {
              pokemonEvolutionChain.map((evolutionStage, indexEvolutionChain) => {
                return (
                  <div className={`w-${evolutionChainWidth} evolution-stage-container`}
                    key={`${indexEvolutionChain}-${pokemonData["id"]}`}>
                    <div className="evolution-stage-text w-100">
                      <p>Stage {indexEvolutionChain + 1}</p>
                    </div>
                    {evolutionStage.map((evolution, indexEvolutionStage) => {
                      let evolutionNameFix = this.fixNameException(evolution["species"]["name"]);
                      return (
                        <LazyLoad key={`${indexEvolutionChain}-${indexEvolutionStage}-${pokemonData["id"]}`}>
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
          <div className="pokemon-front-back-container">
            <p className="w-100">Front - Back</p>
            <LazyLoad
              className="pokemon-front-back-lazyload">
              <img
                alt={`${pokemon}front`}
                src={`http://pokestadium.com/sprites/xy/${pokemon}.gif`}
              />
            </LazyLoad>
            <LazyLoad
              className="pokemon-front-back-lazyload">
              <img
                alt={`${pokemon}back`}
                src={`http://pokestadium.com/sprites/xy/back/${pokemon}.gif`}
              />
            </LazyLoad>
          </div>

        </div>
      );
    } else {
      pokemonSingleBody = (
        <div className="pokemon-single-body">
          <p className="flavor-text">
            <FontAwesomeIcon icon="spinner" pulse /> Loading Data
          </p>
        </div>
      );
    }

    let singleBodyClassName = "pokemon-single-container";
    if (bShowData) { singleBodyClassName += " w-100"};
    return (
      <div className={singleBodyClassName} onClick={() => this.handleClick(pokemon)}>
        <div className="pokemon-single-header">
          <LazyLoad
            className="pokemon-single-header-lazyload"
            debounce={false}>
            <img
              className="sprites"
              alt={this.props.pokemon}
              src={`http://pokestadium.com/sprites/xy/${pokemon}.gif`}
            />
          </LazyLoad>
          <div className="align-bottom">{pokemon}</div>
        </div>

        <Collapse isOpened={this.state.bShowData} springConfig={presets.wobbly}>
          {pokemonSingleBody}
        </Collapse>
      </div>
    );
  }

  processEvolutionChain = (evolutionChain, evolutions) => {
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

  fixNameException = (pokemon) => {
    switch (pokemon) {
      case "nidoran-f":
        return "nidoranf";
      case "nidoran-m":
        return "nidoranm";
      case "deoxys-normal":
        return "deoxys";
      case "wormadam-plant":
        return "wormadam";
      case "giratina-altered":
        return "giratina";
      case "shaymin-land":
        return "shaymin";
      case "basculin-red-striped":
        return "basculin";
      case "darmanitan-standard":
        return "darmanitan";
      case "tornadus-incarnate":
        return "tornadus";
      case "thundurus-incarnate":
        return "thundurus";
      case "landorus-incarnate":
        return "landorus";
      case "keldeo-ordinary":
        return "keldeo";
      case "meloetta-aria":
        return "meloetta";
      case "meowstic-male":
        return "meowstic";
      case "aegislash-shield":
        return "aegislash";
      case "pumpkaboo-average":
        return "pumpkaboo";
      case "gourgeist-average":
        return "gourgeist";
      default:
        return pokemon;
    }
  }
}

export default Pokemon;
