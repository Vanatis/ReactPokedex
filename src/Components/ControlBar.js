import React, {Component} from "react";
import PokeballButton from './PokeballButton';
import MenuButton from './MenuButton'
import './ControlBar.css';

class ControlBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      buttonsLeft: [
        "Profile",
        "Test",
      ],
      buttonsRight: [
        "Gen",
        "Search",
      ],
    }
  }

  render() {
    let {buttonsLeft, buttonsRight} = this.state;
    let {onGenerationChange} = this.props;

    return (
      <div className="controlbar-background">
        <div className="controlbar-container">

          {
            buttonsLeft.map((button) => {
              return <MenuButton key={button} name={button} />
            })
          }

          <PokeballButton onGenerationChange={onGenerationChange} />

          {
            buttonsRight.map((button) => {
              return <MenuButton key={button} name={button} />
            })
          }
        </div>
      </div>
    );
  }
}

export default ControlBar;
