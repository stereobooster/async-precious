import React from "react";
import styles from "./index.module.css";

const Precious = props => (
  <div
    className={styles.adaptive}
    style={{ backgroundImage: `url(${props.preview}` }}
  >
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  </div>
);

export default Precious;
