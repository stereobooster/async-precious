import React, { Component } from "react";
import Waypoint from "react-waypoint";
import Precious from "../Precious";

export default class WaypointPrecious extends Component {
  constructor(props) {
    super(props);
    this.state = { inViewport: false };
    this.onEnter = () => {
      if (!this.state.inViewport) this.setState({ inViewport: true });
    };
  }
  render() {
    return (
      <Waypoint onEnter={this.onEnter}>
        <Precious {...this.props} load={this.state.inViewport} />
      </Waypoint>
    );
  }
}

WaypointPrecious.props = Precious.props;
