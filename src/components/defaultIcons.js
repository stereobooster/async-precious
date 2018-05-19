import DownloadIcon from "./Icon/Download";
import OfflineIcon from "./Icon/Offline";
import WarningIcon from "./Icon/Warning";

import { icons } from "./constants";
const { load, loading, loaded, error, noicon, offline } = icons;

export default {
  [load]: DownloadIcon,
  [loading]: null,
  [loaded]: null,
  [error]: WarningIcon,
  [noicon]: null,
  [offline]: OfflineIcon
};
