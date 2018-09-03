import React from 'react'
import {notification} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {createRouteNodeSelector} from 'redux-router5'

import {notificationActions as actions} from '../../actions'

import {getUser} from '../../helpers/authHelpers'

import Signin from '../Signin'
import NotFound from '../NotFound'
import Dashboard from '../Dashboard'
import ResetPassword from '../ResetPassword'
import ForgotPassword from '../ForgotPassword'

import '../../content/zmdi.less'
import '../../content/antd.less'

require('../../content/img/favicon.ico')

type Props = {
  errors: [],
  route?: {name: string},
  successes: [],

  // functions
  clearErrors: () => void,
  clearSuccesses: () => void,
}

class App extends React.Component<Props> {
  static defaultProps = {
    route: {name: ''},
  }

  constructor(props, context) {
    super(props, context)

    this.router = context.router
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors.length < this.props.errors.length) {
      this.props.errors.map(error => this.openNotification('error', error))
      this.props.clearErrors()
    }

    if (prevProps.successes.length < this.props.successes.length) {
      this.props.successes.map(success =>
        this.openNotification('success', success),
      )
      this.props.clearSuccesses()
    }
  }

  openNotification = (type: string, description: string) => {
    const message = type === 'success' ? 'Success' : 'Error'

    notification[type]({
      message,
      description,
    })
  }

  render() {
    const user = getUser()
    const {route} = this.props
    const unauthenticatedRoutes = ['signin', 'forgotPassword', 'resetPassword']

    if (!user && !unauthenticatedRoutes.includes(route.name)) {
      return <Signin />
    }

    if (user && unauthenticatedRoutes.includes(route.name)) {
      return <Dashboard />
    }

    let content: React.ReactNode = null

    switch (route.name) {
      case 'signin':
        content = <Signin />
        break

      case 'forgotPassword':
        content = <ForgotPassword />
        break

      case 'resetPassword':
        content = <ResetPassword />
        break

      case 'dashboard':
        content = <Dashboard />
        break

      default:
        content = <NotFound />
        break
    }

    return content
  }
}

const mapStateToProps = state => ({
  ...createRouteNodeSelector('')(state),
  errors: state.notifications.errors,
  successes: state.notifications.successes,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearErrors: actions.clearErrors,
      clearSuccesses: actions.clearSuccesses,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
