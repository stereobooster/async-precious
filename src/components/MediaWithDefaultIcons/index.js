import React from "react";
import Media from "../Media";
import defaultIcons from "../defaultIcons";

const MediaWithDefaultIcons = props => <Media {...props} />;

MediaWithDefaultIcons.propTypes = Media.propTypes;
MediaWithDefaultIcons.defaultProps = {
  ...Media.defaultProps,
  icons: defaultIcons
};

export default MediaWithDefaultIcons;
