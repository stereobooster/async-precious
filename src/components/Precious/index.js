import React, { Component } from "react";
import styles from "./index.module.css";

// icons
import CloudDownload from "./CloudDownload";
import CloudOff from "./CloudOff";
import Warning from "./Warning";
// import Progress from "./Progress";

// states
const initial = "initial";
const loading = "loading";
const loaded = "loaded";
const error = "error";

// props.noscript - class which will hide elements if JS is disabled

export default class Precious extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onLine: true,
      controledLoad: props.load !== undefined,
      mediaState: initial
    };
  }

  componentDidMount() {
    if (this.props.load) this.load();
    this.updateOnlineStatus = () => this.setState({ onLine: navigator.onLine });
    this.updateOnlineStatus();
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  }

  // TODO: fix this
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.controledLoad && nextProps.load === undefined) {
      throw new Error("You should pass load value to controlled component");
    }
    if (nextProps.load === true) this.load();
    if (nextProps.src !== this.props.src)
      this.setState({ mediaState: initial });
  }

  renderProp({ props, mediaState, onLine, controledLoad }) {
    const fill = props.iconColor || "#fff";
    const size = props.iconSize || "64";
    const className = `${styles.icon} ${props.noscript}`;
    switch (mediaState) {
      case initial:
        if (controledLoad) return null;
        return onLine ? (
          <CloudDownload className={className} fill={fill} size={size} />
        ) : (
          <CloudOff className={className} fill={fill} size={size} />
        );
      case loaded:
        return null;
      case loading:
        // return <Progress className={className} fill={fill} size={size} />
        // todo show spinner if loading takes more than 200ms
        return null;
      case error:
        return onLine ? (
          <Warning className={className} fill={fill} size={size} />
        ) : (
          <CloudOff className={className} fill={fill} size={size} />
        );
      default:
        throw new Error(`Wrong state: ${mediaState}`);
    }
  }

  onClick() {
    const { mediaState, onLine } = this.state;
    if (!onLine) return;
    switch (mediaState) {
      case initial:
      case error:
        this.load();
        return;
      case loading:
        // nothing, but can be cancel
        return;
      case loaded:
        // nothing
        return;
      default:
        throw new Error(`Wrong state: ${mediaState}`);
    }
  }

  load() {
    if (this.mediaState === loading) return;
    const { src } = this.props;
    this.setState({ mediaState: loading });
    const image = new Image();
    image.src = src;
    if (image.decode) {
      image
        .decode()
        .then(() => {
          image.onload = image.onerror = image.onabort = undefined;
          this.setState({ mediaState: loaded });
        })
        .catch(() => {
          // TODO: retry
          image.onload = image.onerror = image.onabort = undefined;
          this.setState({ mediaState: error }, () => this.load());
        });
    } else {
      image.onload = () => {
        image.onload = image.onerror = image.onabort = undefined;
        this.setState({ mediaState: loaded });
      };
    }
    image.onerror = () => {
      image.onload = image.onerror = image.onabort = undefined;
      this.setState({ mediaState: error });
    };
    image.onabort = () => {
      image.onload = image.onerror = image.onabort = undefined;
      this.setState({ mediaState: error });
    };
  }

  render() {
    const props = this.props;
    const { mediaState } = this.state;
    return (
      <div
        className={styles.adaptive}
        style={{ backgroundImage: `url(${props.lqip}` }}
        title={props.alt}
        onClick={() => this.onClick()}
        ref={this.props.innerRef}
      >
        {mediaState === loaded ? (
          <img
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
          />
        ) : (
          <svg
            width={props.width}
            height={props.height}
            className={props.noscript}
          />
        )}
        {props.noscript && (
          <noscript>
            <img
              src={props.src}
              alt={props.alt}
              width={props.width}
              height={props.height}
            />
          </noscript>
        )}
        {this.renderProp({ props, ...this.state })}
      </div>
    );
  }
}
