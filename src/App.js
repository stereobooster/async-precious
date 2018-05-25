import React from 'react'
import rpi from 'rpi.macro'
import size from 'filesize.macro'

import imageJ1 from './images/andre-spieker-238-unsplash.jpg'
import imageJ2 from './images/jairo-alzate-45522-unsplash.jpg'
import imageJ3 from './images/vincent-van-zalinge-408523-unsplash.jpg'
import imageJ4 from './images/marvin-meyer-188676-unsplash.jpg'
import imageJ5 from './images/nidhin-mundackal-281287-unsplash.jpg'

import imageW1 from './images/andre-spieker-238-unsplash.webp'
import imageW2 from './images/jairo-alzate-45522-unsplash.webp'
import imageW3 from './images/vincent-van-zalinge-408523-unsplash.webp'
import imageW4 from './images/marvin-meyer-188676-unsplash.webp'
import imageW5 from './images/nidhin-mundackal-281287-unsplash.webp'

// import {AdaptiveLoad} from 'react-precious-image'
import AdaptiveLoad from './components/AdaptiveLoad'
import icons from './components/icons'
import theme from './components/theme.module.css'

const Al = props => <AdaptiveLoad {...props} />

Al.defaultProps = {
  ...AdaptiveLoad.defaultProps,
  icons,
  theme,
  threshold: 1000,
}

const meta1 = rpi('./images/andre-spieker-238-unsplash.jpg')
const meta2 = rpi('./images/jairo-alzate-45522-unsplash.jpg')
const meta3 = rpi('./images/vincent-van-zalinge-408523-unsplash.jpg')
const meta4 = rpi('./images/marvin-meyer-188676-unsplash.jpg')
const meta5 = rpi('./images/nidhin-mundackal-281287-unsplash.jpg')

const size1 = size('./images/andre-spieker-238-unsplash.webp')
const size2 = size('./images/jairo-alzate-45522-unsplash.webp')
const size3 = size('./images/vincent-van-zalinge-408523-unsplash.webp')
const size4 = size('./images/marvin-meyer-188676-unsplash.webp')
const size5 = size('./images/nidhin-mundackal-281287-unsplash.webp')

const App = () => (
  <React.Fragment>
    <Al
      {...meta1}
      src={imageJ1}
      alt="doggo 1"
      webp={imageW1}
      webpSize={size1}
    />
    <Al
      {...meta2}
      src={imageJ2}
      alt="doggo 2"
      webp={imageW2}
      webpSize={size2}
    />
    <Al
      {...meta3}
      src={imageJ3}
      alt="doggo 3"
      webp={imageW3}
      webpSize={size3}
    />
    <Al
      {...meta4}
      src={imageJ4}
      alt="doggo 4"
      webp={imageW4}
      webpSize={size4}
    />
    <Al
      {...meta5}
      src={imageJ5}
      alt="doggo 5"
      webp={imageW5}
      webpSize={size5}
    />
  </React.Fragment>
)

export default App
