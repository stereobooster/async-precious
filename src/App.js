import React from 'react'

import image1 from './images/andre-spieker-238-unsplash.json'
import image2 from './images/jairo-alzate-45522-unsplash.json'
import image3 from './images/vincent-van-zalinge-408523-unsplash.json'
import image4 from './images/marvin-meyer-188676-unsplash.json'
import image5 from './images/nidhin-mundackal-281287-unsplash.json'

const src = ({name, ext, digest, width}) =>
  `./images/${name}-${width}.${digest}.${ext}`

const props = obj => ({
  width: obj.width,
  height: obj.height,
  srcSet: obj.sizes.map(({width, format}) => {
    const ext = format === 'jpeg' ? 'jpg' : 'webp'
    return `${src({...obj, ext, width})} ${width}w`
  }),
  style: {width: '100%', height: 'auto', marginBottom: '-4px'},
})

const App = () => (
  <React.Fragment>
    <img alt="doggo 1" {...props(image1)} />
    <img alt="doggo 2" {...props(image2)} />
    <img alt="doggo 3" {...props(image3)} />
    <img alt="doggo 4" {...props(image4)} />
    <img alt="doggo 5" {...props(image5)} />
  </React.Fragment>
)

export default App
