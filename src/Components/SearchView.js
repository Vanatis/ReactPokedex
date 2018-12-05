import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SearchView.css';

const SearchView = ({ searchfield, searchChange, searchClick }) => {
  return (
    <div className="searchview">
      <div className="layout-header">
        <h2 className=" pa2 ma0">Search Pokémon</h2>
        <div className="pa2">
          <input
            className="search-input"
            type="search"
            placeholder="Search by name"
            onChange={searchChange}
          />
          <button
            className="search-button"
            onClick={searchClick}
          >
            <FontAwesomeIcon icon="search" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchView;
