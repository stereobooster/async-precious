import React, { Component } from "react";
// import styles from "./index.module.css";
import styles from "./index.module.js";
import { universalStyle } from "../../utils";

// icons
import CloudDownload from "./CloudDownload";
import CloudOff from "./CloudOff";
import Warning from "./Warning";
// import Progress from "./Progress";

// states
const initial = 1; //"initial";
const loading = 2; //"loading";
const loaded = 3; //"loaded";
const error = 4; //"error";

// props.noscript - class which will hide elements if JS is disabled

export default class Precious extends Component {
  constructor(props) {
    super(props);
    const controledOnLine = props.onLine !== undefined;
    const controledLoad = props.load !== undefined;
    this.state = {
      onLine: controledOnLine ? props.onLine : true,
      controledLoad,
      controledOnLine,
      mediaState: controledOnLine ? initial : props.load ? loaded : initial
    };
  }

  componentDidMount() {
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
    const fill = props.iconColor || "#fff";
    const size = props.iconSize || "64";
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
    return (
      <div
        {...universalStyle(styles.adaptive, {
          backgroundImage: `url(${props.lqip})`
        })}
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
