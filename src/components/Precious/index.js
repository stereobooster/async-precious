import React, { Component } from "react";
import PropTypes from "prop-types";
// import styles from "./index.module.css";
import styles from "./index.module.js";
import { universalStyle } from "../../utils";

// icons
import CloudDownload from "./CloudDownload";
import CloudOff from "./CloudOff";
import Warning from "./Warning";
// import Progress from "./Progress";

// states - prod
const initial = 1;
const loading = 2;
const loaded = 3;
const error = 4;

// states - dev
// const initial = "initial";
// const loading = "loading";
// const loaded = "loaded";
// const error = "error";

export default class Precious extends Component {
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
    className: PropTypes.string,
  };

  static defaultProps = {
    iconColor: "#fff",
    iconSize: 64
  };

  constructor(props) {
    super(props);
    const controledOnLine = props.onLine !== undefined;
    const controledLoad = props.load !== undefined;
    this.state = {
      onLine: controledOnLine ? props.onLine : true,
      controledLoad,
      controledOnLine,
      mediaState: initial
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
      this.setState({ mediaState: initial });
  }

  renderProp({ props, state }) {
    const { mediaState, onLine, controledLoad } = state;
    const fill = props.iconColor;
    const size = props.iconSize;
    const styleOrClass = universalStyle(
      { width: size, height: size },
      styles.icon,
      props.noscript
    );
    switch (mediaState) {
      case loaded:
        return null;
      case loading:
        // nothing, but can be spinner
        // return <Progress {...styleOrClass} fill={fill} size={size} />
        return null;
      case initial:
        if (controledLoad) return null;
        return onLine ? (
          <div {...styleOrClass}>
            <CloudDownload fill={fill} size={size} />
          </div>
        ) : (
          <div {...styleOrClass}>
            <CloudOff fill={fill} size={size} />
          </div>
        );
      case error:
        return onLine ? (
          <div {...styleOrClass}>
            <Warning fill={fill} size={size} />
          </div>
        ) : (
          <div {...styleOrClass}>
            <CloudOff fill={fill} size={size} />
          </div>
        );
      default:
        throw new Error(`Wrong state: ${mediaState}`);
    }
  }

  onClick() {
    const { mediaState, onLine } = this.state;
    if (!onLine) return;
    switch (mediaState) {
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
        throw new Error(`Wrong state: ${mediaState}`);
    }
  }

  load() {
    const { mediaState } = this.state;
    if (loaded === mediaState || loading === mediaState) return;
    this.setState({ mediaState: loading });
    const image = new Image();
    const onload = () => {
      image.onload = image.onerror = image.onabort = undefined;
      this.setState({ mediaState: loaded });
    };
    const onerror = () => {
      image.onload = image.onerror = image.onabort = undefined;
      this.setState({ mediaState: error });
    };
    image.onload = onload;
    image.onerror = onerror;
    image.onabort = onerror;
    image.src = this.props.src;
  }

  render() {
    const props = this.props;
    const state = this.state;
    const { mediaState } = state;
    let background;
    background = {
      backgroundImage: `url(${props.lqip})`
    };
    // if (props.lqip) {
    // } else {
    //   background = {
    //     backgroundColor: props.color
    //   };
    // }
    return (
      <div
        {...universalStyle(
          styles.adaptive,
          background,
          props.style,
          props.className
        )}
        title={props.alt}
        onClick={() => this.onClick()}
        ref={this.props.innerRef}
      >
        {mediaState === loaded ? (
          <img
            {...universalStyle(styles.img, props.noscript)}
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
          />
        ) : (
          <svg
            {...universalStyle(styles.img, props.noscript)}
            width={props.width}
            height={props.height}
          />
        )}
        {props.noscript && (
          <noscript>
            <img
              {...universalStyle(styles.img)}
              src={props.src}
              alt={props.alt}
              width={props.width}
              height={props.height}
            />
          </noscript>
        )}
        {this.renderProp({ props, state })}
      </div>
    );
  }
}
