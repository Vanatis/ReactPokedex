import React, {Component} from 'react';
import PokemonCard from './PokemonCard';
import Pokedex from 'pokedex-promise-v2';
import ControlBar from './ControlBar';
import './PokemonList.css';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.handleGenChange = this.handleGenChange.bind(this);
    this.state = {
      pokemons: [],
      generation: "Kanto"
    };
  }

  handleGenChange(generation) {
    this.setState({ generation });
  }

  componentDidMount() {
    const pokedex = new Pokedex();
    pokedex.getPokemonsList()
    .then(response => {
      this.setState({
        pokemons: response.results
      });
    })
    .catch(error => {
      console.log("There was an ERROR:", error);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    let { pokemons, generation } = this.state;
    if (generation === "Kanto") {
      pokemons = pokemons.slice(0, 151);
    } else if (generation === "Johto") {
      pokemons = pokemons.slice(151, 251);
    } else if (generation === "Hoenn") {
      pokemons = pokemons.slice(251, 386);
    } else if (generation === "Sinnoh") {
      pokemons = pokemons.slice(386, 493);
    } else if (generation === "Unova") {
      pokemons = pokemons.slice(493, 649);
    } else if (generation === "Kalos") {
      pokemons = pokemons.slice(649, 721);
    }

    const filteredPokemons = pokemons.filter(pokemon =>{
      return pokemon.name.toLowerCase().includes(this.props.filterField.toLowerCase());
    })

    let pokemonList;
    pokemonList = (
      <div>
        <div className="pokemon-container">
          {filteredPokemons.map((pokemon, index) =>
            <PokemonCard key={pokemon.name} id={index + 1} pokemon={pokemon.name}/>
          )}
        </div>
        <ControlBar onGenerationChange={this.handleGenChange} />
      </div>
    );

    return <div>{pokemonList}</div>;
  }
}

export default PokemonList;
