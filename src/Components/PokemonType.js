import React, {Component} from 'react';
import {TYPE_COLORS} from '../Constants/Constants';

import './PokemonType.css';

class PokemonType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
    };
  }

  componentDidMount() {
    let propsTypes = this.props.types.sort((a, b) => a["slot"] - b["slot"]);
    let types = propsTypes.map((type) => {
      let typeName = type["type"]["name"];
      let typeColor = TYPE_COLORS[typeName];

      return {name: typeName, color: typeColor};
    });

    this.setState({types: types});
  }

  render() {
    const {types} = this.state;
    if (types.length === 0)
    {
      return null;
    }

    let typeBoxes = types.map((type, index) => {
      return (
        <div key={type["name"]} className="pokemon-type-box" style={{"backgroundColor": `${type["color"]}`}}>
          <p className="pokemon-type-text">{type["name"]}</p>
        </div>
      );
    })

    return (
      <div className="pokemon-type-container">
        {typeBoxes}
      </div>
    );
  }
}

export default PokemonType;
