import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// import styles from "./index.module.css";
import styles from "./index.module.js";
import { universalStyle } from "../../utils";

// icons
import DownloadIcon from "../Icon/Download";
import OfflineIcon from "../Icon/Offline";
import WarningIcon from "../Icon/Warning";

// states - dev
export const load = "load";
export const loading = "loading";
export const loaded = "loaded";
export const error = "error";
export const noicon = "noicon";
export const offline = "offline";

export const icons = {
  load,
  loading,
  loaded,
  error,
  noicon,
  offline
};

export default class PreciousStateless extends PureComponent {
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
    /** On click handler */
    onClick: PropTypes.func,
    /** display icon */
    icon: PropTypes.oneOf([load, loading, loaded, error, noicon, offline])
  };

  static defaultProps = {
    iconColor: "#fff",
    iconSize: 64,
    icons: {
      [load]: DownloadIcon,
      [loading]: null,
      [loaded]: null,
      [error]: WarningIcon,
      [noicon]: null,
      [offline]: OfflineIcon
    }
  };

  renderIcon(props) {
    const { icon, icons, iconColor: fill, iconSize: size } = props;
    const iconToRender = icons[icon];
    if (!iconToRender) return;
    const styleOrClass = universalStyle(
      { width: size, height: size },
      styles.icon,
      props.noscript
    );
    return React.createElement(
      "div",
      styleOrClass,
      React.createElement(iconToRender, { fill, size })
    );
  }

  renderImage(props) {
    return props.icon === loaded ? (
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
    );
  }

  renderNoscript(props) {
    return props.noscript ? (
      <noscript>
        <img
          {...universalStyle(styles.img)}
          src={props.src}
          alt={props.alt}
          width={props.width}
          height={props.height}
        />
      </noscript>
    ) : null;
  }

  render() {
    const props = this.props;
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
        {this.renderImage(props)}
        {this.renderNoscript(props)}
        {this.renderIcon(props)}
      </div>
    );
  }
}
