import React, { Component } from "react";
import PropTypes from "prop-types";
// import styles from "./index.module.css";
import styles from "./index.module.js";
import { universalStyle } from "../../utils";

// icons
import DownloadIcon from "../Icon/Download";
import OfflineIcon from "../Icon/Offline";
import WarningIcon from "../Icon/Warning";

// states - prod
// export const initial = 1;
// export const loading = 2;
// export const loaded = 3;
// export const error = 4;

// states - dev
export const initial = "initial";
export const loading = "loading";
export const loaded = "loaded";
export const error = "error";

export default class PreciousStateless extends Component {
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
    /** If browser is onLine or not */
    onLine: PropTypes.bool,
    /** Load state of the component */
    mediaState: PropTypes.oneOf([initial, loading, loaded, error]),
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
    /** If you want to disable icon */
    noIcon: PropTypes.bool,
    /** On click handler */
    onClick: PropTypes.func
  };

  static defaultProps = {
    iconColor: "#fff",
    iconSize: 64
  };

  renderProp({ props }) {
    const { mediaState, onLine, iconColor, iconSize, noIcon } = props;
    if (noIcon) return null;
    const styleOrClass = universalStyle(
      { width: iconSize, height: iconSize },
      styles.icon,
      props.noscript
    );
    switch (mediaState) {
      case loaded:
        return null;
      case loading:
        // nothing, but can be spinner
        return null;
      case initial:
        return onLine ? (
          <div {...styleOrClass}>
            <DownloadIcon fill={iconColor} size={iconSize} />
          </div>
        ) : (
          <div {...styleOrClass}>
            <OfflineIcon fill={iconColor} size={iconSize} />
          </div>
        );
      case error:
        return onLine ? (
          <div {...styleOrClass}>
            <WarningIcon fill={iconColor} size={iconSize} />
          </div>
        ) : (
          <div {...styleOrClass}>
            <OfflineIcon fill={iconColor} size={iconSize} />
          </div>
        );
      default:
        throw new Error(`Wrong state: ${mediaState}`);
    }
  }

  render() {
    const props = this.props;
    const { mediaState } = props;
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
        onClick={this.props.onClick}
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
        {this.renderProp({ props })}
      </div>
    );
  }
}
