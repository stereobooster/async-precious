import React, { Component } from "react";
import ManualLoad from "../ManualLoad";
import LazyLoad from "../LazyLoad";
import { loadStates } from "../constants";

const useNativeConnection = false;

export default class AdaptiveLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadState: loadStates.initial,
      connection: navigator.connection
        ? navigator.connection.effectiveType
        : null,
      canceled: false
    };
  }

  componentDidMount() {
    if (!this.state.controledConnection) {
      if (useNativeConnection && navigator.connection) {
        this.updateConnection = () => {
          if (!navigator.onLine) return;
          if (this.state.loadState === loadStates.initial) {
            this.setState({ connection: navigator.connection.effectiveType });
          }
        };
        navigator.connection.addEventListener(
          "onchange",
          this.updateConnection
        );
      } else {
        this.messageListener = e => {
          if (this.state.loadState !== loadStates.initial) return;
          const { size, time } = e.detail;
          const speed = 8 * size / time; //Kbps
          // this is not precise because browser can do parallel downloads
          if (speed < 400 && this.state.connection > "3g") {
            this.setState({ connection: "3g" });
          }
        };
        window.document.addEventListener("connection", this.messageListener);
      }
    }
  }

  componentWillUnmount() {
    if (!this.state.controledOnLine) {
      if (useNativeConnection && navigator.connection) {
        navigator.connection.removeEventListener(
          "onchange",
          this.updateConnection
        );
      } else {
        window.document.removeEventListener("connection", this.messageListener);
      }
    }
  }

  connectionToComponent({ connection, canceled }) {
    if (canceled || connection <= "3g") {
      return ManualLoad;
    } else {
      return LazyLoad;
    }
  }

  render() {
    return React.createElement(this.connectionToComponent(this.state), {
      ...this.props,
      onLoadStateChange: loadState =>
        this.setState({
          loadState,
          canceled: loadState === loadStates.initial
        })
    });
  }
}

AdaptiveLoad.props = ManualLoad.props;
