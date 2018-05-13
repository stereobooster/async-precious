import React, { Component } from "react";
import styles from "./index.module.css";
import CloudDownload from "./CloudDownload";
import CloudOff from "./CloudOff";
import Warning from "./Warning";
// import Progress from "./Progress";

export default class Precious extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onLine: true,
      mediaState: "initial" // loading, loaded, error
    };
    this.updateOnlineStatus = () => this.setState({ onLine: navigator.onLine });
  }

  componentDidMount() {
    this.updateOnlineStatus();
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  }

  renderProp({ props, mediaState, onLine }) {
    const state = `${mediaState}-${onLine ? "on" : "off"}`;
    switch (state) {
      case "initial-off":
      case "error-off":
        return <CloudOff className={styles.icon} fill="#fff" size="64" />;
      case "initial-on":
        return <CloudDownload className={styles.icon} fill="#fff" size="64" />;
      case "loaded-on":
      case "loaded-off":
        return (
          <img
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
          />
        );
      case "loading-on":
      case "loading-off":
        // return <Progress className={styles.icon} fill="#fff" size="64" />;
        // todo show spinner if loading takes more than 200ms
        return null;
      case "error-on":
        return <Warning className={styles.icon} fill="#fff" size="64" />;
      default:
        throw new Error(`Wrong state: ${state}`);
    }
  }

  onClick() {
    const { mediaState, onLine } = this.state;
    if (!onLine) return;
    const { src } = this.props;
    switch (mediaState) {
      case "initial":
      case "error":
        // load
        this.setState({ mediaState: "loading" });
        const image = new Image();
        image.onload = () => this.setState({ mediaState: "loaded" });
        image.onerror = () => this.setState({ mediaState: "error" });
        image.onabort = () => this.setState({ mediaState: "error" });
        image.src = src;
        return;
      case "loaded":
        // nothing
        return;
      case "loading":
        // nothing, but can be cancel
        return;
      default:
        throw new Error(`Wrong state: ${mediaState}`);
    }
  }

  render() {
    const props = this.props;
    const { mediaState } = this.state;
    return (
      <div
        className={styles.adaptive}
        style={{ backgroundImage: `url(${props.preview}` }}
        title={props.alt}
        onClick={() => this.onClick()}
      >
        {mediaState !== "loaded" && (
          <svg width={props.width} height={props.height} />
        )}
        {this.renderProp({ props, ...this.state })}
      </div>
    );
  }
}
