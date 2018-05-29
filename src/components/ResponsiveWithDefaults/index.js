import React from 'react'
import Responsive from '../Responsive'
import icons from '../icons'
import theme from '../theme'

const ResponsiveWithDefaults = props => <Responsive {...props} />

ResponsiveWithDefaults.defaultProps = {
  ...Responsive.defaultProps,
  icons,
  theme,
}

// eslint-disable-next-line react/forbid-foreign-prop-types
ResponsiveWithDefaults.propTypes = Responsive.propTypes

export default ResponsiveWithDefaults
