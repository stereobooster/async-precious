import React, { Component } from "react";
import styles from "./index.module.css";
import CloudDownload from "./CloudDownload";
import Error from "./Error";
import Progress from "./Progress";

export default class Precious extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaState: "initial" // loading, loaded, error
    };
  }

  renderProp({ props, mediaState }) {
    switch (mediaState) {
      case "initial":
        return <CloudDownload className={styles.icon} fill="#fff" size="64" />;
      case "loaded":
        return (
          <img
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
          />
        );
      case "loading":
        // return <Progress className={styles.icon} fill="#fff" size="64" />;
        // todo show spinner if loading takes more than 200ms
        return null;
      case "error":
        return <Error className={styles.icon} fill="#fff" size="64" />;
      default:
        throw new Error(`Wrong state: ${mediaState}`);
    }
  }

  onClick() {
    const { mediaState } = this.state;
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
        {this.renderProp({ props, mediaState })}
      </div>
    );
  }
}
