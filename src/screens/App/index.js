import React from 'react'
import {connect} from 'react-redux'
import {createRouteNodeSelector} from 'redux-router5'

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
    const {route} = this.props
    let content = null

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
