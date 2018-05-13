import React from "react";

import Precious from "./components/Precious";
import coverImage from "./andre-spieker-238-unsplash.jpg";
import lqip from "lqip.macro";
const preview = lqip("./andre-spieker-238-unsplash.jpg");

const App = () => (
  <Precious
    preview={preview}
    src={coverImage}
    alt="doggo"
    width="3500"
    height="2095"
  />
);

export default App;
