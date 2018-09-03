import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {actions} from 'redux-router5'
import {bindActionCreators} from 'redux'

type Props = {
  children?: any,
  className?: string,
  noClick?: boolean,
  options?: {},
  params?: {},
  routeName: string,

  // functions
  navigateTo: (routeName: string, params: {}, options: {}) => void,
  onClick?: () => void,
}

class NavItem extends React.Component<Props> {
  static defaultProps = {
    children: null,
    className: '',
    noClick: false,
    onClick: null,
    options: {},
    params: {},
  }

  constructor(props, context) {
    super(props, context)
    this.router = context.router
  }

  render() {
    const {
      className,
      children,
      navigateTo,
      noClick,
      onClick,
      options,
      params,
      routeName,
    } = this.props
    const href = this.router.buildUrl(routeName, params)
    const handleClick = evt => {
      evt.preventDefault()
      if (onClick) {
        onClick(evt)
      }

      navigateTo(routeName, params, options)
    }

    const props = {href, className}

    if (!noClick) {
      props.onClick = handleClick
    }

    return <a {...props}>{children}</a>
  }
}

NavItem.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigateTo: actions.navigateTo,
    },
    dispatch,
  )

export default connect(
  null,
  mapDispatchToProps,
)(NavItem)
