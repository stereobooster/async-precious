import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import Media from '../Media'
import {icons, loadStates} from '../constants'
import {xhrLoader, timeout, combineCancel} from '../loaders'
import supportsWebp from '../webp'

const {initial, loading, loaded, error} = loadStates

const ssr =
  typeof window === 'undefined' || window.navigator.userAgent === 'ReactSnap'

const nativeConnection =
  typeof window !== 'undefined' && !!window.navigator.connection

const getScreenWidth = () => {
  if (typeof window === 'undefined') return 0
  const devicePixelRatio = window.devicePixelRatio || 1
  const {screen} = window
  const angle = (screen.orientation && screen.orientation.angle) || 0
  const {width, height} = screen
  // return Math.max(width, height)
  const rotated = Math.floor(angle / 90) % 2 !== 0
  return (rotated ? height : width) * devicePixelRatio
}

const screenWidth = getScreenWidth()

export default class AdaptiveLoad extends Component {
  constructor(props) {
    super(props)
    const controledOnLine = props.onLine !== undefined
    const pickedSrc = this.getSrc({srcset: this.props.srcset, screenWidth})
    if (!pickedSrc.src && !this.props.getUrl) {
      throw new Error('src required')
    }
    this.state = {
      loadState: initial,
      connection: nativeConnection
        ? {
            downlink: navigator.connection.downlink, // megabits per second
            rtt: navigator.connection.rtt, // ms
            effectiveType: navigator.connection.effectiveType, // 'slow-2g', '2g', '3g', or '4g'
          }
        : null,
      onLine: controledOnLine ? props.onLine : true,
      controledOnLine,
      overThreshold: false,
      inViewport: false,
      userTriggered: false,
      possiblySlowNetwork: false,
      pickedSrc,
    }
  }

  static propTypes = {
    /** how much to wait in ms until concider download to slow */
    threshold: PropTypes.number,
    /** function which decides if image should be downloaded */
    shouldAutoDownload: PropTypes.func,
    /** function to generate src based on width and format */
    getUrl: PropTypes.func,
    /** array of sources */
    srcset: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
        width: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        format: PropTypes.oneOf(['jpeg', 'webp']).isRequired,
      }),
    ).isRequired,
    /** If you will not pass this value, component will detect onLine status based on browser API, otherwise will use passed value */
    onLine: PropTypes.bool,
  }

  static defaultProps = {
    /**
     * @returns {boolean} - is connection good enough to auto load the image
     */
    shouldAutoDownload: ({
      connection,
      size,
      threshold,
      possiblySlowNetwork,
    }) => {
      if (possiblySlowNetwork) return false
      const {downlink, rtt, effectiveType} = connection || {}
      switch (effectiveType) {
        case 'slow-2g':
        case '2g':
          return false
        case '3g':
          if (downlink && size && threshold) {
            return size * 8 / (downlink * 1000) + rtt < threshold
          }
          return false
        case '4g':
        default:
          return true
      }
    },
  }

  getSrc({srcset, screenWidth}) {
    if (srcset.length === 0) throw new Error('Need at least one item in srcset')
    let supportedFormat
    if (supportsWebp) {
      supportedFormat = srcset.filter(x => x.format === 'webp')
      if (supportedFormat.length === 0) supportedFormat = srcset
    } else {
      supportedFormat = srcset.filter(x => x.format !== 'webp')
      if (supportedFormat.length === 0)
        throw new Error('Need at least one item in srcset')
    }
    let widths = supportedFormat.filter(x => x.width >= screenWidth)
    if (widths.length === 0) widths = supportedFormat
    const width = Math.min.apply(null, widths.map(x => x.width))
    return supportedFormat.filter(x => x.width === width)[0]
  }

  componentDidMount() {
    if (nativeConnection) {
      this.updateConnection = () => {
        if (!navigator.onLine) return
        if (this.state.loadState === initial) {
          this.setState({
            connection: {
              effectiveType: navigator.connection.effectiveType,
              downlink: navigator.connection.downlink,
              rtt: navigator.connection.rtt,
            },
          })
        }
      }
      navigator.connection.addEventListener('onchange', this.updateConnection)
    } else if (this.props.threshold) {
      this.possiblySlowNetworkListener = e => {
        if (this.state.loadState !== initial) return
        const {possiblySlowNetwork} = e.detail
        if (!this.state.possiblySlowNetwork && possiblySlowNetwork) {
          this.setState({possiblySlowNetwork})
        }
      }
      window.document.addEventListener(
        'possiblySlowNetwork',
        this.possiblySlowNetworkListener,
      )
    }
    if (!this.state.controledOnLine) {
      this.updateOnlineStatus = () => this.setState({onLine: navigator.onLine})
      this.updateOnlineStatus()
      window.addEventListener('online', this.updateOnlineStatus)
      window.addEventListener('offline', this.updateOnlineStatus)
    }
  }

  componentWillUnmount() {
    this.clear()
    if (nativeConnection) {
      navigator.connection.removeEventListener(
        'onchange',
        this.updateConnection,
      )
    } else if (this.props.threshold) {
      window.document.removeEventListener(
        'possiblySlowNetwork',
        this.possiblySlowNetworkListener,
      )
    }
    if (!this.state.controledOnLine) {
      window.removeEventListener('online', this.updateOnlineStatus)
      window.removeEventListener('offline', this.updateOnlineStatus)
    }
  }

  // TODO: fix this
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.controledOnLine) {
      if (nextProps.onLine === undefined) {
        throw new Error('You should pass onLine value to controlled component')
      } else {
        this.setState({onLine: nextProps.onLine})
      }
    }
    if (nextProps.src !== this.props.src) this.cancel(false)
  }

  onClick = () => {
    const {loadState, onLine, overThreshold} = this.state
    if (!onLine) return
    switch (loadState) {
      case loading:
        if (overThreshold) this.cancel(true)
        return
      case loaded:
        // nothing
        return
      case initial:
      case error:
        this.load(true)
        return
      default:
        throw new Error(`Wrong state: ${loadState}`)
    }
  }

  clear() {
    if (this.loader) {
      this.loader.cancel()
      this.loader = undefined
    }
  }

  cancel(userTriggered) {
    if (loading !== this.state.loadState) return
    this.clear()
    this.loadStateChange(initial, userTriggered)
  }

  loadStateChange(loadState, userTriggered) {
    this.setState({
      loadState,
      overThreshold: false,
      userTriggered: !!userTriggered,
    })
  }

  getUrl() {
    const {getUrl} = this.props
    const {pickedSrc} = this.state
    if (getUrl) {
      return getUrl(pickedSrc)
    } else {
      return pickedSrc.src
    }
  }

  load = userTriggered => {
    const {loadState} = this.state
    if (ssr || loaded === loadState || loading === loadState) return
    this.loadStateChange(loading, userTriggered)

    const {threshold} = this.props
    const url = this.getUrl()
    const imageLoader = xhrLoader(url)
    imageLoader
      .then(() => {
        this.clear()
        this.loadStateChange(loaded, false)
      })
      .catch(() => {
        this.clear()
        // if (e.status === 404) {
        //   this.setState({errorMeassage: 'Image not found'})
        // }
        this.loadStateChange(error, false)
      })

    if (threshold) {
      const timeoutLoader = timeout(threshold)
      timeoutLoader.then(() => {
        if (!this.loader) return
        window.document.dispatchEvent(
          new CustomEvent('possiblySlowNetwork', {
            detail: {possiblySlowNetwork: true},
          }),
        )
        this.setState({overThreshold: true})
        if (!this.state.userTriggered) this.cancel(true)
      })
      this.loader = combineCancel(imageLoader, timeoutLoader)
    } else {
      this.loader = imageLoader
    }
  }

  shouldAutoDownload() {
    const shouldAutoDownload = this.props.shouldAutoDownload
    const {pickedSrc} = this.state
    return shouldAutoDownload({...this.state, size: pickedSrc.size})
  }

  stateToIcon(state) {
    const {loadState, onLine, overThreshold, userTriggered} = state
    const shouldAutoDownload = this.shouldAutoDownload()
    if (ssr) return icons.noicon
    switch (loadState) {
      case loaded:
        return icons.loaded
      case loading:
        return overThreshold ? icons.loading : icons.noicon
      case initial:
        if (onLine) {
          return userTriggered || !shouldAutoDownload
            ? icons.load
            : icons.noicon
        } else {
          return icons.offline
        }
      case error:
        return onLine ? icons.error : icons.offline
      default:
        throw new Error(`Wrong state: ${loadState}`)
    }
  }

  onEnter = () => {
    if (this.state.inViewport) return
    this.setState({inViewport: true})
    if (this.shouldAutoDownload()) this.load(false)
  }

  onLeave = () => {
    if (this.state.loadState === loading && !this.state.userTriggered) {
      this.setState({inViewport: false})
      this.cancel(false)
    }
  }

  render() {
    return (
      <Waypoint onEnter={this.onEnter} onLeave={this.onLeave}>
        <Media
          {...this.props}
          onClick={this.onClick}
          icon={this.stateToIcon(this.state)}
          src={this.getUrl()}
        />
      </Waypoint>
    )
  }
}
