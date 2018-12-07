import React, {Component} from 'react';
import {Motion, StaggeredMotion, spring} from 'react-motion';

import './PokemonButton.css'

class PokemonButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bIsOpen: false,
      childButtons: [
        "Kanto",
        "Johto",
        "Hoenn",
        "Sinnoh",
        "Unova",
        "Kalos"
      ],
      active: 0,
      mainButtonDiameter: 64,
      childButtonDiameter: 45,
      flyOutRadius: 110,
      separationAngle: 30,
      childButtonScaleMin: 0.5,
      childButtonScaleMax: 1.0,
      springConfig: {stiffness: 400, damping: 28}
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    window.addEventListener('click', this.closeMenu);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeMenu);
  }

  toggleMenu(event) {
    event.stopPropagation();
    this.setState({ bIsOpen: !this.state.bIsOpen });
  }

  closeMenu() {
    this.setState({ bIsOpen: false });
  }

  onChildButtonClick(event, index) {
    event.stopPropagation();

    if (index !== this.state.active) {
      this.setState({ active: index });
      this.props.onGenerationChange(this.state.childButtons[index]);
      window.scrollTo(0, 0);
    }
    this.closeMenu();
  }

  render() {
    const {bIsOpen} = this.state;
    const mainButtonRotation = bIsOpen ?
      {rotate: spring(0, {stiffness: 500, damping: 30})} :
      {rotate: spring(-360, {stiffness: 500, damping: 30})};

    return (
      <div className="circular-button-border">
        <div className="circular-button-container">
          {this.renderChildButtons()}
          <Motion style={mainButtonRotation}>
            {({rotate}) =>
              <div
                className="main-circular-button"
                style={{transform: `rotate(${rotate}deg)`}}
                onClick={this.toggleMenu}>
              </div>
            }
          </Motion>
          {bIsOpen ? <div className="fullscreen-overlay"></div> : null}
  			</div>
      </div>
    );
  }

  renderChildButtons() {
    const {childButtons, bIsOpen, active, childButtonScaleMin, childButtonScaleMax} = this.state;

    const targetButtonStylesInitObject = childButtons.map((buttonName, index) => {
      return bIsOpen ? this.openChildButtonStylesInit(index) : this.closedChildButtonStylesInit();
    });
    const targetButtonStylesInit = Object.keys(targetButtonStylesInitObject).map(key => targetButtonStylesInitObject[key]);

    const targetButtonStyles = childButtons.map((buttonName, index) => {
      return bIsOpen ? this.openChildButtonStyles(index) : this.closedChildButtonStyles();
    });

    let calculateStylesForNextFrame = prevFrameStyles => {
      const nextFrameTargetStyles = prevFrameStyles.map((buttonStyleInPreviousFrame, i) => {
        if (i === 0) {
          return targetButtonStyles[i];
        }

        const prevButtonScale = prevFrameStyles[i - 1].scale;
        const bApplyTargetStyle = (bIsOpen) ?
          prevButtonScale >= childButtonScaleMin + 0.2:
          prevButtonScale <= childButtonScaleMax - 0.2;

        return (bApplyTargetStyle) ? targetButtonStyles[i] : buttonStyleInPreviousFrame;
      });

      return nextFrameTargetStyles;
    };

    return (
      <StaggeredMotion
        defaultStyles={targetButtonStylesInit}
        styles={calculateStylesForNextFrame}>
        {
          interpolatedStyles => {
            return (
              <div>
                {interpolatedStyles.map(({height, left, rotate, scale, top, width}, index) => {
                  return (
                    <div
                      className={"child-circular-button " + ((active === index)? "button-active": "")}
                      key={index}
                      style= {{left, height, top, transform: `rotate(${rotate}deg) scale(${scale})`, width}}
                      onClick={(event) => {this.onChildButtonClick(event, index)}}>
                      {childButtons[index]}
                    </div>
                  )
                })}
              </div>
            )
          }
        }
      </StaggeredMotion>
    )
  }

  closedChildButtonStylesInit() {
    const {mainButtonDiameter, childButtonDiameter, childButtonScaleMin} = this.state;
    return {
      width: childButtonDiameter,
      height: childButtonDiameter,
      top: (mainButtonDiameter / 2) - (childButtonDiameter / 2),
      left: -(childButtonDiameter / 2),
      rotate: -180,
      scale: childButtonScaleMin
    };
  }

  closedChildButtonStyles() {
    const {mainButtonDiameter, childButtonDiameter, childButtonScaleMin, springConfig} = this.state;
    return {
      width: childButtonDiameter,
      height: childButtonDiameter,
      top: spring((mainButtonDiameter / 2) - (childButtonDiameter / 2), springConfig),
      left: spring(-(childButtonDiameter / 2), springConfig),
      rotate: spring(-180, springConfig),
      scale: spring(childButtonScaleMin, springConfig)
    };
  }

  openChildButtonStylesInit(index) {
    const {mainButtonDiameter, childButtonDiameter, childButtonScaleMax} = this.state;
    const { deltaX, deltaY } = this.calcOpenChildButtonOffset(index);

    return {
      width: childButtonDiameter,
      height: childButtonDiameter,
      top: (mainButtonDiameter / 2) - deltaY,
      left: deltaX,
      rotate: 0,
      scale: childButtonScaleMax
    };
  }

  openChildButtonStyles(index) {
    const {mainButtonDiameter, childButtonDiameter, childButtonScaleMax, springConfig} = this.state;
    const { deltaX, deltaY } = this.calcOpenChildButtonOffset(index);

    return {
      width: childButtonDiameter,
      height: childButtonDiameter,
      top: spring((mainButtonDiameter / 2) - deltaY, springConfig),
      left: spring(deltaX, springConfig),
      rotate: spring(0, springConfig),
      scale: spring(childButtonScaleMax, springConfig)
    };
  }

  calcOpenChildButtonOffset(index) {
    const {childButtons, childButtonDiameter, separationAngle, flyOutRadius} = this.state;

    const fanAngle = (childButtons.length - 1) * separationAngle;
    const angle = ((180 - fanAngle) / 2) + (index * separationAngle);
    return {
      deltaX: flyOutRadius * Math.cos(this.toRadians(180 - angle)) - (childButtonDiameter / 2),
      deltaY: flyOutRadius * Math.sin(this.toRadians(180 - angle)) + (childButtonDiameter / 2),
    }
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
}

export default PokemonButton;
