import React from 'react'
// import IdealImage from 'react-precious-image'
import IdealImage from './components/IdealImage'
import icons from './components/icons'
import theme from './components/theme.module.css'

import image1 from './images/andre-spieker-238-unsplash.json'
import image2 from './images/jairo-alzate-45522-unsplash.json'
import image3 from './images/vincent-van-zalinge-408523-unsplash.json'
import image4 from './images/marvin-meyer-188676-unsplash.json'
import image5 from './images/nidhin-mundackal-281287-unsplash.json'

const Image = props => <IdealImage {...props} />

Image.defaultProps = {
  ...IdealImage.defaultProps,
  icons,
  theme,
  threshold: 2500,
  noscript: 'noscript',
}

const src = ({name, ext, digest, width}) =>
  `./images/${name}-${width}.${digest}.${ext}`

const props = obj => ({
  width: obj.width,
  height: obj.height,
  placeholder: {lqip: obj.lqip},
  getUrl: ({width, format}) => {
    const ext = format === 'jpeg' ? 'jpg' : 'webp'
    return src({...obj, ext, width})
  },
  srcset: obj.sizes,
  // srcset: [{width: 100, format: 'jpeg', src: 'http://localhost:8000/404'}],
})

const App = () => (
  <React.Fragment>
    <Image alt="doggo 1" {...props(image1)} style={{maxWidth: '50%'}} />
    <Image alt="doggo 2" {...props(image2)} />
    <Image alt="doggo 3" {...props(image3)} />
    <Image alt="doggo 4" {...props(image4)} />
    <Image alt="doggo 5" {...props(image5)} />
  </React.Fragment>
)

export default App
