import React, { Component } from "react";
import styles from "./index.module.css";

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

  renderProp({ props, mediaState, onLine, controledLoad }) {
    const fill = props.iconColor || "#fff";
    const size = props.iconSize || "64";
    const className = `${styles.icon} ${props.noscript}`;
    switch (mediaState) {
      case loaded:
        return null;
      case loading:
        // nothing, but can be spinner
        // return <Progress className={className} fill={fill} size={size} />
        return null;
      case initial:
        if (controledLoad) return null;
        return onLine ? (
          <CloudDownload className={className} fill={fill} size={size} />
        ) : (
          <CloudOff className={className} fill={fill} size={size} />
        );
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
    // decode seems to downgrade performance. Not sure why
    // if (image.decode) {
    //   image
    //     .decode()
    //     .then(onload)
    //     .catch(onerror);
    // }
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
