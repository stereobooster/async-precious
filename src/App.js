import React from 'react'
// import {AdaptiveLoad} from 'react-precious-image'
import Responsive from './components/Responsive'
import icons from './components/icons'
import theme from './components/theme.module.css'

import image1 from './images/andre-spieker-238-unsplash.json'
import image2 from './images/jairo-alzate-45522-unsplash.json'
import image3 from './images/vincent-van-zalinge-408523-unsplash.json'
import image4 from './images/marvin-meyer-188676-unsplash.json'
import image5 from './images/nidhin-mundackal-281287-unsplash.json'

const Al = props => <Responsive {...props} />

Al.defaultProps = {
  ...Responsive.defaultProps,
  icons,
  theme,
  threshold: 1000,
}

const src = ({name, ext, digest, width}) =>
  `/images/${name}-${width}.${digest}.${ext}`

const props = obj => ({
  width: obj.width,
  height: obj.height,
  placeholder: {lqip: obj.lqip},
  getUrl: ({width, format}) => {
    const ext = format === 'jpeg' ? 'jpg' : 'webp'
    return src({...obj, ext, width})
  },
  srcset: obj.sizes,
})

const App = () => (
  <React.Fragment>
    <Al alt="doggo 1" {...props(image1)} />
    <Al alt="doggo 2" {...props(image2)} />
    <Al alt="doggo 3" {...props(image3)} />
    <Al alt="doggo 4" {...props(image4)} />
    <Al alt="doggo 5" {...props(image5)} />
  </React.Fragment>
)

export default App
