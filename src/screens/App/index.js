import React from 'react'
import {connect} from 'react-redux'
import {createRouteNodeSelector} from 'redux-router5'

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
  route?: {name: string},
}

class App extends React.Component<Props> {
  static defaultProps = {
    route: {name: ''},
  }

  constructor(props, context) {
    super(props, context)

    this.router = context.router
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
})

export default connect(mapStateToProps)(App)
