import React, {Component} from 'react';

import './GenerationButtons.css';

class GenerationButtons extends Component {
  constructor(props) {
    super(props);
    this.generationClick = this.generationClick.bind(this);
    this.state = {active: "Generation One"};
  }
  
  generationClick(generation) {
    this.props.onGenerationChange(generation);
    this.setState({active: generation});
  }

  render() {
    const generationList = [
      "Generation One",
      "Generation Two",
      "Generation Three",
      "Generation Four",
      "Generation Five",
      "Generation Six"
    ];

    let active = this.state.active;
    const generationSingle = generationList.map(generation =>
      <button className={"gen-button " + ((active === generation)? 'button-active': '')} key={generation} onClick={() => this.generationClick(generation)}>
        {generation}
      </button>
    );
    return <div className="button-container">{generationSingle}</div>;
  }
}

export default GenerationButtons;
