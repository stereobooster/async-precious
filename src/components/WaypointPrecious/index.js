import React, { Component } from "react";
import Waypoint from "react-waypoint";
import Precious, {mediaStates} from "../Precious";
import { icons } from "../PreciousStateless";

export default class WaypointPrecious extends Component {
  constructor(props) {
    super(props);
    this.state = { inViewport: false };
    this.onEnter = () => {
      if (!this.state.inViewport) this.setState({ inViewport: true });
    };
  }

  stateToIcon({ mediaState }) {
    switch (mediaState) {
      case mediaStates.initial:
        return icons.noicon;
      default:
        return undefined;
    }
  }

  render() {
    return (
      <Waypoint onEnter={this.onEnter}>
        <Precious {...this.props} load={this.state.inViewport} stateToIcon={this.stateToIcon} />
      </Waypoint>
    );
  }
}

WaypointPrecious.props = Precious.props;
