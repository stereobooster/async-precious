import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ManualLoad from '../ManualLoad'
import LazyLoad from '../LazyLoad'
import {loadStates} from '../constants'

const nativeConnection =
  typeof window !== undefined && !!window.navigator.connection

export default class AdaptiveLoad extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadState: loadStates.initial,
      downlink: nativeConnection
        ? navigator.connection.downlink // megabits per second
        : null,
      rtt: nativeConnection
        ? navigator.connection.rtt // ms
        : null,
      connection: nativeConnection
        ? navigator.connection.effectiveType // 'slow-2g', '2g', '3g', or '4g'
        : null,
      canceled: false,
      overThreshold: false,
    }
  }

  static propTypes = {
    threshold: PropTypes.number,
    connectionToLoad: PropTypes.func,
  }

  static defaultProps = {
    /**
     * @returns {boolean} - is connection good enough to auto load the image
     */
    connectionToLoad: ({connection, downlink, rtt, size, threshold}) => {
      if (downlink && size && threshold) {
        return (size * 8 / (downlink * 1000) + rtt) < threshold
      }
      switch (connection) {
        case 'slow-2g':
        case '2g':
        case '3g':
            return false
        case '4g':
          return true
        default:
          return true
      }
    },
  }

  componentDidMount() {
    if (!this.state.controledConnection) {
      if (nativeConnection) {
        this.updateConnection = () => {
          if (!navigator.onLine) return
          if (this.state.loadState === loadStates.initial) {
            this.setState({
              connection: navigator.connection.effectiveType,
              downlink: navigator.connection.downlink,
              rtt: navigator.connection.rtt,
            })
          }
        }
        navigator.connection.addEventListener('onchange', this.updateConnection)
      } else if (this.props.threshold) {
        this.overThresholdListener = e => {
          if (this.state.loadState !== loadStates.initial) return
          const {overThreshold} = e.detail
          if (!this.state.overThreshold && overThreshold) {
            this.setState({overThreshold})
          }
        }
        window.document.addEventListener(
          'overThreshold',
          this.overThresholdListener,
        )
      }
    }
  }

  componentWillUnmount() {
    if (!this.state.controledOnLine) {
      if (nativeConnection) {
        navigator.connection.removeEventListener(
          'onchange',
          this.updateConnection,
        )
      } else if (this.props.threshold) {
        window.document.removeEventListener(
          'overThreshold',
          this.overThresholdListener,
        )
      }
    }
  }

  stateToComponent() {
    const {canceled, overThreshold} = this.state
    const autoLoad = nativeConnection
      ? this.props.connectionToLoad({...this.props, ...this.state})
      : true
    if (canceled || overThreshold || !autoLoad) {
      return ManualLoad
    } else {
      return LazyLoad
    }
  }

  render() {
    return React.createElement(this.stateToComponent(), {
      onLoadStateChange: loadState => {
        if (loadState === loadStates.error) return
        this.setState({
          loadState,
          canceled: loadState === loadStates.initial,
        })
      },
      ...this.props,
    })
  }
}
