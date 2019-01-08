import React, {Component} from "react";
import './FilterView.css';

class FilterView extends Component {
  render() {
    let {filterChange} = this.props;
    return (
      <div className="searchview">
        <div className="layout-header">
          <h2 className=" pa2 ma0">Filter Pokémon</h2>
          <div className="pa2">
            <label htmlFor="search" style={{display: 'none'}}>Filter</label>
            <input
              className="search-input"
              type="search"
              placeholder="Filter by name"
              aria-label="Filter"
              id="search"
              onChange={filterChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FilterView;
