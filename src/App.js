import React from 'react'
import rpi from 'rpi.macro'

import coverImage1 from './images/andre-spieker-238-unsplash.jpg'
import coverImage2 from './images/jairo-alzate-45522-unsplash.jpg'
import coverImage3 from './images/vincent-van-zalinge-408523-unsplash.jpg'
import coverImage4 from './images/marvin-meyer-188676-unsplash.jpg'
import coverImage5 from './images/nidhin-mundackal-281287-unsplash.jpg'

// import {AdaptiveLoad} from 'react-precious-image'
import AdaptiveLoad from './components/AdaptiveLoad'
import icons from './components/icons'
import theme from './components/theme.module.css'

const Al = props => <AdaptiveLoad {...props} />

Al.defaultProps = {
  ...AdaptiveLoad.defaultProps,
  icons,
  theme,
  threshold: 2500,
}

const meta1 = rpi('./images/andre-spieker-238-unsplash.jpg')
const meta2 = rpi('./images/jairo-alzate-45522-unsplash.jpg')
const meta3 = rpi('./images/vincent-van-zalinge-408523-unsplash.jpg')
const meta4 = rpi('./images/marvin-meyer-188676-unsplash.jpg')
const meta5 = rpi('./images/nidhin-mundackal-281287-unsplash.jpg')

const App = () => (
  <React.Fragment>
    <Al {...meta1} src={coverImage1} alt="doggo 1" noscript={'noscript'} />
    <Al {...meta2} src={coverImage2} alt="doggo 2" noscript={'noscript'} />
    <Al {...meta3} src={coverImage3} alt="doggo 3" noscript={'noscript'} />
    <Al {...meta4} src={coverImage4} alt="doggo 4" noscript={'noscript'} />
    <Al {...meta5} src={coverImage5} alt="doggo 5" noscript={'noscript'} />
  </React.Fragment>
)

export default App
