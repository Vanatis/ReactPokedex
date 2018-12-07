import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SearchView.css';

const SearchView = ({ searchfield, searchChange, searchClick }) => {
  return (
    <div className="searchview">
      <div className="layout-header">
        <h2 className=" pa2 ma0">Search Pokémon</h2>
        <div className="pa2">
          <label htmlFor="search" style={{display: 'none'}}>Search</label>
          <input
            className="search-input"
            type="search"
            placeholder="Search by name"
            aria-label="Search"
            id="search"
            onChange={searchChange}
          />
          <FontAwesomeIcon icon="search" />
        </div>
      </div>
    </div>
  );
}

export default SearchView;
