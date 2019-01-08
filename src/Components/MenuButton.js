import React, {Component} from "react";
import './MenuButton.css';

class MenuButton extends Component {
  render() {
    let {name} = this.props;
    return (
      <div className="menu-button-container">
        {name}
      </div>
    );
  }
}

export default MenuButton;
