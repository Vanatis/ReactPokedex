import React, {Component} from "react";
import FuzzySearch from "react-fuzzy";
import './FuzzySearchView.css';

class FuzzySearchView extends Component {
  render() {
    let {pokemons, onSearchChange, onFuzzySearch} = this.props;

    const pokemonList = pokemons.slice(0, 721).map((pokemon, index) => {
      return {name: pokemon["name"], id: index + 1};
    });

    return (
      <div className="fuzzy-searchview">
        <div className="layout-header">
          <h2 className=" pa2 ma0">Search Pokémon</h2>

          <FuzzySearch
            list={pokemonList}
            keys={["name", "id"]}
            placeholder={"Search by name or id"}
            onSelect={onSearchChange}
            className={"fuzzy-search-input"}
            resultsTemplate={(props, state, styles, clickHandler) => {
              return state.results.slice(0, 4).map((value, index) => {
                return (
                  <div
                    key={index}
                    className={state.selectedIndex === index ? "fuzzy-search-input-result fuzzy-search-input-result-selected" : "fuzzy-search-input-result"}
                    onClick={() => clickHandler(index)}
                  >
                    {value.id} - {value.name}
                  </div>
                );
              });
            }}
          />
        </div>
      </div>
    );
  }

  onSelect() {
    console.log("test");
  }
}

export default FuzzySearchView;
