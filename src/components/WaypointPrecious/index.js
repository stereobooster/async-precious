import React, { Component } from "react";
import Waypoint from "react-waypoint";
import Precious from "../Precious";

export default class WaypointPrecious extends Component {
  constructor(props) {
    super(props);
    this.state = { inViewport: false };
    this.onEnter = () => this.setState({ inViewport: true });
  }
  render() {
    return this.state.inViewport ? (
      <Precious {...this.props} load={this.state.inViewport} />
    ) : (
      <Waypoint onEnter={this.onEnter}>
        <Precious {...this.props} load={this.state.inViewport} />
      </Waypoint>
    );
  }
}
