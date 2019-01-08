import React, { Component } from 'react';
import PokemonList from '../Components/PokemonList';
import FilterView from '../Components/FilterView';
//import FuzzySearchView from '../Components/FuzzySearchView';
import ErrorBoundry from '../Components/ErrorBoundry';

import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faSpinner, faDesktop, faSearch, faChevronCircleUp, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(faTimes, faSpinner, faDesktop, faSearch, faChevronCircleUp, faChevronCircleDown, fab);

class App extends Component {
  constructor() {
    super()
    this.state = {
      filterField: '',
      typefilter: [],
      pokemons: [],
    }
  }

  onFilterChange = (event) => {
    this.setState({ filterField: event.target.value })
  }

  /*
  onFuzzySearch = (event) => {
    this.setState({ searchfield: event.name});
  }
  */

  render() {
    return (
      <div>
        <h1 className='f1 tc'>Pokédex</h1>
          <FilterView filterChange={this.onFilterChange}/>
          <ErrorBoundry>
            <PokemonList filterField={this.state.filterField}/>
          </ErrorBoundry>

          {/*
          {this.state.pokemons.length > 0 ?
            <FuzzySearchView onSearchChange={this.onSearchChange} onFuzzySearch={this.onFuzzySearch} pokemons={this.state.pokemons}/> :
            null
          }
          */}
      </div>
    );
  }
}

export default App
