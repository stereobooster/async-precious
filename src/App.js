import React from "react";
import lqip from "lqip.macro";
import Precious from "./components/WaypointPrecious";

import coverImage1 from "./images/andre-spieker-238-unsplash.jpg";
import coverImage2 from "./images/jairo-alzate-45522-unsplash.jpg";
import coverImage3 from "./images/vincent-van-zalinge-408523-unsplash.jpg";
import coverImage4 from "./images/marvin-meyer-188676-unsplash.jpg";
import coverImage5 from "./images/nidhin-mundackal-281287-unsplash.jpg";

const preview1 = lqip("./images/andre-spieker-238-unsplash.jpg");
const preview2 = lqip("./images/jairo-alzate-45522-unsplash.jpg");
const preview3= lqip("./images/vincent-van-zalinge-408523-unsplash.jpg");
const preview4 = lqip("./images/marvin-meyer-188676-unsplash.jpg");
const preview5 = lqip("./images/nidhin-mundackal-281287-unsplash.jpg");

const App = () => (
  <React.Fragment>
    <Precious
      preview={preview1}
      src={coverImage1}
      alt="doggo 1"
      width="3500"
      height="2095"
    />
    <Precious
      preview={preview2}
      src={coverImage2}
      alt="doggo 2"
      width="3534"
      height="2366"
    />
    <Precious
      preview={preview3}
      src={coverImage3}
      alt="doggo 3"
      width="3204"
      height="4800"
    />
    <Precious
      preview={preview4}
      src={coverImage4}
      alt="doggo 4"
      width="7952"
      height="5304"
    />
    <Precious
      preview={preview5}
      src={coverImage5}
      alt="doggo 5"
      width="6016"
      height="4016"
    />
  </React.Fragment>
);

export default App;
