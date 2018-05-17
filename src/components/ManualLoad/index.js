import React, { Component } from "react";
import PropTypes from "prop-types";
import Media from "../Media";
import { icons, loadStates } from "../constants";
import defaultIcons from "../defaultIcons";

const { initial, loading, loaded, error } = loadStates;

export default class ManualLoad extends Component {
  static propTypes = {
    /** URL of the image */
    src: PropTypes.string.isRequired,
    /** Width of the image in px */
    width: PropTypes.number.isRequired,
    /** Height of the image in px */
    height: PropTypes.number.isRequired,
    /** [Low Quality Image Placeholder](https://github.com/zouhir/lqip) */
    lqip: PropTypes.string.isRequired,
    /** Solid color placeholder */
    // color: PropTypes.string.isRequired,
    /** Alternative text */
    alt: PropTypes.string,
    /** If you will not pass this value, component will detect onLine status based on browser API, otherwise will use passed value */
    onLine: PropTypes.bool,
    /** If you will pass true it will immediately load image otherwise load will be controlled by user */
    load: PropTypes.bool,
    /** Color of the icon */
    iconColor: PropTypes.string,
    /** Size of the icon in px */
    iconSize: PropTypes.number,
    /** CSS class which will hide elements if JS is disabled */
    noscript: PropTypes.string,
    /** React's style attribute for root element of the component */
    style: PropTypes.object,
    /** React's className attribute for root element of the component */
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    const controledOnLine = props.onLine !== undefined;
    const controledLoad = props.load !== undefined;
    this.state = {
      onLine: controledOnLine ? props.onLine : true,
      controledLoad,
      controledOnLine,
      loadState: initial
    };
  }

  componentDidMount() {
    if (this.props.load) this.load();
    if (!this.state.controledOnLine) {
      this.updateOnlineStatus = () =>
        this.setState({ onLine: navigator.onLine });
      this.updateOnlineStatus();
      window.addEventListener("online", this.updateOnlineStatus);
      window.addEventListener("offline", this.updateOnlineStatus);
    }
  }

  componentWillUnmount() {
    if (!this.state.controledOnLine) {
      window.removeEventListener("online", this.updateOnlineStatus);
      window.removeEventListener("offline", this.updateOnlineStatus);
    }
  }

  // TODO: fix this
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.controledLoad && nextProps.load === undefined) {
      throw new Error("You should pass load value to controlled component");
    }
    if (this.state.controledOnLine) {
      if (nextProps.onLine === undefined) {
        throw new Error("You should pass onLine value to controlled component");
      } else {
        this.setState({ onLine: nextProps.onLine });
      }
    }
    if (nextProps.load === true) this.load();
    if (nextProps.src !== this.props.src)
      this.setState({ loadState: initial });
  }

  onClick() {
    const { loadState, onLine } = this.state;
    if (!onLine) return;
    switch (loadState) {
      case loading:
        // nothing, but can be cancel
        return;
      case loaded:
        // nothing
        return;
      case initial:
      case error:
        this.load();
        return;
      default:
        throw new Error(`Wrong state: ${loadState}`);
    }
  }

  load() {
    const { loadState } = this.state;
    if (loaded === loadState || loading === loadState) return;
    this.setState({ loadState: loading });
    const image = new Image();
    const onload = () => {
      image.onload = image.onerror = image.onabort = undefined;
      this.setState({ loadState: loaded });
    };
    const onerror = () => {
      image.onload = image.onerror = image.onabort = undefined;
      this.setState({ loadState: error });
    };
    image.onload = onload;
    image.onerror = onerror;
    image.onabort = onerror;
    image.src = this.props.src;
  }

  stateToIcon({ loadState, onLine }) {
    switch (loadState) {
      case loaded:
        return icons.loaded;
      case loading:
        return icons.loading;
      case initial:
        return onLine ? icons.load : icons.offline;
      case error:
        return onLine ? icons.error : icons.offline;
      default:
        throw new Error(`Wrong state: ${loadState}`);
    }
  }

  render() {
    let icon;
    if (this.props.stateToIcon) {
      icon = this.props.stateToIcon(this.state);
    }
    if (!icon) {
      icon = this.stateToIcon(this.state);
    }
    return (
      <Media
        {...this.props}
        onClick={() => this.onClick()}
        icon={icon}
        icons={defaultIcons}
      />
    );
  }
}
