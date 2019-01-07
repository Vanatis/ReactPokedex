import React, {Component} from 'react';
import {Collapse} from 'react-collapse';
import {presets} from 'react-motion';
import LazyLoad from 'react-lazy-load';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Pokedex from 'pokedex-promise-v2';
import './Pokemon.css';

class PokemonOld extends Component {
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

  handleClick() {
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
            <p>
            Height: {pokemonData["height"]} <br />
            Weight: {pokemonData["weight"]}
            </p>
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

    /*---------------*/
    /*TYPE CODE*/
    /*---------------*/
    let typeDiv = "";
    let pokemonTypeStyles = {};
    if (!this.state.bPokemonDataPending && pokemonData !== null) {
      let typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
      };

      let currentTypes = [];
      let currentColors = [];
      pokemonData["types"] = pokemonData["types"].sort((a, b) => a["slot"] - b["slot"]);
      pokemonData["types"].map((type) => {
        currentTypes.push(type["type"]["name"]);
        currentColors.push(typeColors[type["type"]["name"]]);
      });

      console.log(currentTypes);
      console.log(currentColors);

      if (currentColors.length === 1) {
        typeDiv = (
        <div className="pokemon-type" style={{background: currentColors[0]}}>
          <p className="pokemon-type-text>{currentTypes[0]}</p>
        </div>);
      } else if (currentColors.length === 2) {
        typeDiv = (
        <div className="pokemon-type" style={{background: `linear-gradient(45deg, ${currentColors[0]} 50%, ${currentColors[1]} 50%)`}}>
          <p className="pokemon-type-text">{currentTypes[0]} - {currentTypes[1]}</p>
        </div>
        );
      }
    }
    /*---------------*/
    /*TYPE CODE*/
    /*---------------*/

    if (bShowData) { singleBodyClassName += " w-100"};
    return (
      <div className={singleBodyClassName} onClick={() => this.handleClick()}>
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
          {typeDiv}
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


/*
  background: linear-gradient(45deg, #7AC74C 50%, #A33EA1 50%);
  Type colors:
  Normal Type: A8A77A
  Fire Type:  EE8130
  Water Type:  6390F0
  Electric Type:  F7D02C
  Grass Type:  7AC74C
  Ice Type:  96D9D6
  Fighting Type:  C22E28
  Poison Type:  A33EA1
  Ground Type:  E2BF65
  Flying Type:  A98FF3
  Psychic Type:  F95587
  Bug Type:  A6B91A
  Rock Type:  B6A136
  Ghost Type:  735797
  Dragon Type:  6F35FC
  Dark Type:  705746
  Steel Type:  B7B7CE
  Fairy Type:  D685AD
*/

export default PokemonOld;
