import React, { Component } from 'react';
import PokemonList from '../Components/PokemonList';
import SearchView from '../Components/SearchView';
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
      searchfield: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  onSearchClick = (event) => {
  }

  render() {
    return (
      <div>
        <h1 className='f1 tc'>Pokédex</h1>
        <SearchView searchChange={this.onSearchChange} searchClick={this.onSearchClick} />
          <ErrorBoundry>
            <PokemonList searchfield={this.state.searchfield}/>
          </ErrorBoundry>
      </div>
    );
  }
}

export default App
